/* ============================================================
   No Kings — 3D table view (three.js r160, vendored)
   A pure presentation layer: it never changes game state. On every render()
   the page calls T3.sync(); we work out where every card should be (deck,
   discard, each hand, standing Kings, won piles) and each card flies from
   where it was to where it now belongs. Snapshots play one after another,
   so a rival's draw is seen before the cards they then play.
   Host hooks come from window.T3_HOST (set in index.html).
   ============================================================ */
import * as THREE from './vendor/three.module.min.js';

const H = window.T3_HOST;
const CW = 1.0, CH = 1264 / 848;           // card size in world units (art is 848x1264)
const THICK = 0.006, STEP = 0.0075;        // card thickness / pile step
const DUR = 520, STAGGER = 65;             // ms per flight / delay between cards in one step

let renderer, scene, camera, wrap, tableGroup, labelGroup;
let portrait = false, ready = false, enabled = false;
const cards = new Map();                   // id -> card record
const labels = new Map();                  // player id -> sprite
let queue = [], current = null, animating = 0, rafId = 0, lastSnap = '';

/* ---------------- geometry & materials ---------------- */
function roundedRect(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function faceGeo(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 6);
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  return g;
}
let GEO = {}, MAT = {};
function buildShared() {
  const r = 0.07;
  GEO.front = faceGeo(CW, CH, r);
  GEO.back = faceGeo(CW, CH, r); GEO.back.rotateY(Math.PI);
  GEO.body = new THREE.ExtrudeGeometry(roundedRect(CW * 0.995, CH * 0.995, r), { depth: THICK, bevelEnabled: false, curveSegments: 6 });
  GEO.body.translate(0, 0, -THICK / 2);
  GEO.glow = faceGeo(CW + 0.16, CH + 0.16, r + 0.08);
  GEO.shadow = new THREE.PlaneGeometry(CW * 1.5, CH * 1.4); GEO.shadow.rotateX(-Math.PI / 2);
  MAT.body = new THREE.MeshBasicMaterial({ color: 0xe9dcc0 });
  MAT.blank = new THREE.MeshBasicMaterial({ color: 0xf3ead6 });
  MAT.back = new THREE.MeshBasicMaterial({ color: 0x5a1a1f });
  loadTex(`assets/${H.state().cfg.deck}/back.jpg`).then(t => { MAT.back.map = t; MAT.back.color.set(0xffffff); MAT.back.needsUpdate = true; kick(); });
  // soft contact shadow
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 4, 32, 32, 32); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  MAT.shadowTex = new THREE.CanvasTexture(c);
}

/* ---------------- textures (downscaled, loaded only when a face shows) ---------------- */
const texCache = new Map();  // url -> {tex, promise, used}
function loadTex(url) {
  let e = texCache.get(url);
  if (e) { e.used = performance.now(); return e.promise; }
  e = { tex: null, used: performance.now() };
  e.promise = new Promise(res => {
    const img = new Image(); img.decoding = 'async';
    img.onload = () => {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = Math.round(512 * img.height / img.width);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      e.tex = t; res(t);
    };
    img.onerror = () => res(null);
    img.src = url;
  });
  texCache.set(url, e);
  return e.promise;
}
function pruneTextures(needed) {
  if (texCache.size <= 40) return;
  const old = [...texCache.entries()].filter(([u]) => !needed.has(u) && !u.endsWith('back.jpg')).sort((a, b) => a[1].used - b[1].used);
  for (const [u, e] of old.slice(0, texCache.size - 40)) { if (e.tex) e.tex.dispose(); texCache.delete(u); }
}

/* ---------------- card records ---------------- */
function makeCard(c) {
  const g = new THREE.Group();
  const frontMat = new THREE.MeshBasicMaterial({ color: 0xffffff, map: null });
  frontMat.color.copy(MAT.blank.color);
  const front = new THREE.Mesh(GEO.front, frontMat); front.position.z = THICK / 2 + 0.0004;
  const back = new THREE.Mesh(GEO.back, MAT.back); back.position.z = -THICK / 2 - 0.0004;
  const body = new THREE.Mesh(GEO.body, MAT.body);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xf2c14e, transparent: true, opacity: 0.95, depthWrite: false });
  const glow = new THREE.Mesh(GEO.glow, glowMat); glow.position.z = -THICK / 2 - 0.002; glow.visible = false;
  g.add(glow, body, front, back);
  const shadow = new THREE.Mesh(GEO.shadow, new THREE.MeshBasicMaterial({ map: MAT.shadowTex, transparent: true, depthWrite: false, opacity: 0 }));
  shadow.renderOrder = -1;
  scene.add(g, shadow);
  const rec = { id: c.id, card: c, g, front, glow, shadow, url: `assets/${H.state().cfg.deck}/${H.artKey(c)}.jpg`,
    faceLoaded: false, rest: null, anim: null, zone: '' };
  [front, back, body].forEach(m => m.userData.cardId = c.id);
  return rec;
}
function wantFace(rec, on) {
  if (!on || rec.faceLoaded) return;
  rec.faceLoaded = true;
  loadTex(rec.url).then(t => { if (!t) return; rec.front.material.map = t; rec.front.material.color.set(0xffffff); rec.front.material.needsUpdate = true; kick(); });
}
function dropCard(rec) {
  scene.remove(rec.g, rec.shadow);
  rec.front.material.dispose(); rec.glow.material.dispose(); rec.shadow.material.dispose();
  cards.delete(rec.id);
}

/* ---------------- poses ---------------- */
const E = new THREE.Euler(), Q = new THREE.Quaternion();
function flatQ(faceUp, yaw = 0) {   // lying on the table; top of card points away from viewer (readable)
  E.set(faceUp ? -Math.PI / 2 : Math.PI / 2, 0, 0); const q = new THREE.Quaternion().setFromEuler(E);
  if (yaw) q.premultiply(Q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw));
  return q;
}
function pose(x, y, z, q, s = 1, extra = {}) { return Object.assign({ p: new THREE.Vector3(x, y, z), q, s }, extra); }
function hash(id) { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) | 0; return h; }

/* table layout (world space) */
function dims() { return portrait ? { rx: 3.1, rz: 4.1 } : { rx: 5.0, rz: 3.3 }; }
function seatAngles(m) {   /* rivals around the far side; on phones the arc wraps further down the sides */
  const a0 = portrait && m > 2 ? Math.PI * 0.8 : Math.PI, span = portrait && m > 2 ? Math.PI * 1.4 : Math.PI;
  return Array.from({ length: m }, (_, i) => a0 + span * (i + 0.5) / m);
}
const DECK = () => portrait ? new THREE.Vector3(-0.85, 0, -0.35) : new THREE.Vector3(-1.0, 0, 0.0);
const DISC = () => portrait ? new THREE.Vector3(0.85, 0, -0.35) : new THREE.Vector3(1.0, 0, 0.0);

/* viewer hand lives in camera space so it always fits the screen */
function handPoses(list, selIds) {
  const out = {}; const n = list.length; if (!n) return out;
  const d = 3.2, hh = d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), hw = hh * camera.aspect;
  const ch = Math.min(hh * (portrait ? 0.5 : 0.44), (hw * 2 * 0.92 / 3.4) * CH);   // card height on the hand plane: ~31% of view height, at least 3.4 cards across
  const s = ch / CH, w = CW * s;
  const avail = hw * 2 * 0.94 - w;
  const gap = n > 1 ? Math.min(w * 1.04, avail / (n - 1)) : 0;
  const x0 = -gap * (n - 1) / 2;
  list.forEach((c, i) => {
    const t = n > 1 ? (i / (n - 1)) * 2 - 1 : 0;
    const lift = selIds.includes(c.id) ? ch * 0.22 : 0;
    const x = x0 + gap * i, y = -hh + ch * 0.5 + hh * 0.04 - Math.abs(t) * ch * 0.04 + lift;
    const local = new THREE.Vector3(x, y, -d + i * 0.004);
    const p = camera.localToWorld(local.clone());
    const q = camera.quaternion.clone().multiply(Q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -t * 0.06)).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -0.12));
    out[c.id] = pose(p.x, p.y, p.z, q, s, { hand: true, sel: !!lift, face: true });
  });
  return out;
}

function compute() {
  const S = H.state(), G = S.G; if (!G) return null;
  const P = G.players, viewer = H.viewer();
  const vi = P.indexOf(viewer), order = P.map((_, i) => P[(vi + i) % P.length]);
  const { rx, rz } = dims(), T = {}, meta = { seats: [] };
  // deck (face down) and discard (face up, a little scattered)
  const dk = DECK(), ds = DISC();
  G.deck.forEach((c, i) => { T[c.id] = pose(dk.x, i * STEP + THICK / 2, dk.z, flatQ(false), 1, { zone: 'deck', face: false }); });
  G.discard.forEach((c, i) => {
    const h = hash(c.id), top = i >= G.discard.length - 4;
    T[c.id] = pose(ds.x + ((h % 7) - 3) * 0.02, i * STEP + THICK / 2, ds.z + (((h >> 3) % 7) - 3) * 0.02, flatQ(true, ((h >> 6) % 21 - 10) * 0.018), 1, { zone: 'discard', face: top });
  });
  const tgt = S.targetKingId;
  order.forEach((p, si) => {
    const isViewer = si === 0;
    let ang, seat;
    if (isViewer) { ang = Math.PI / 2; } else { ang = seatAngles(order.length - 1)[si - 1]; }
    seat = new THREE.Vector3(Math.cos(ang) * rx, 0, Math.sin(ang) * rz);
    const inward = seat.clone().negate().normalize(), tang = new THREE.Vector3(-inward.z, 0, inward.x);
    meta.seats.push({ id: p.id, pos: seat.clone(), name: H.pname(p), score: p.score, turn: p === H.cur(), viewer: isViewer });
    // standing Kings, face up, readable
    const ks = isViewer ? 0.82 : (portrait ? 0.86 : 0.74);
    const kc = isViewer ? new THREE.Vector3(0, 0, portrait ? 1.45 : 1.45) : seat.clone().addScaledVector(inward, portrait ? 1.35 : 1.45);
    const kn = p.kings.length, kgap = CW * ks * 1.12;
    p.kings.forEach((k, i) => {
      const off = (i - (kn - 1) / 2) * kgap, isT = tgt === k.id;
      const along = isViewer || Math.abs(inward.x) < 0.6 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);
      const pp = kc.clone().addScaledVector(along, off);
      T[k.id] = pose(pp.x, THICK / 2 + (isT ? 0.35 : 0), pp.z, flatQ(true), isT ? ks * 1.25 : ks, { zone: 'king', face: true, target: isT, promoted: !!k.promoted });
    });
    // won piles (fallen / promoted kings) — small, face up, top card shows
    const pc = isViewer ? new THREE.Vector3(portrait ? 2.35 : 3.3, 0, portrait ? 1.6 : 1.2) : seat.clone().addScaledVector(inward, 0.45).addScaledVector(tang, 1.25);
    p.points.forEach((pt, i) => {
      T[pt.card.id] = pose(pc.x + i * 0.05, i * STEP + THICK / 2, pc.z - i * 0.03, flatQ(true, -0.25), 0.55, { zone: 'won', face: i === p.points.length - 1 });
    });
    // hands
    if (isViewer && p.human) {
      Object.assign(T, handPoses(p.hand, S.sel));
    } else {
      const hc = isViewer ? new THREE.Vector3(0, 0, rz + 0.4) : seat.clone().addScaledVector(inward, 0.15);
      const n = p.hand.length, yaw = Math.atan2(inward.x, inward.z) + Math.PI;
      p.hand.forEach((c, i) => {
        const t = n > 1 ? i / (n - 1) - 0.5 : 0;
        const pp = hc.clone().addScaledVector(tang, t * Math.min(1.6, n * 0.3));
        T[c.id] = pose(pp.x, THICK / 2 + i * 0.004 + 0.02, pp.z, flatQ(false, yaw + t * 0.5), 0.6, { zone: 'opphand', face: false });
      });
    }
  });
  meta.deckTop = dk.clone().setY(G.deck.length * STEP + 0.05);
  meta.canDraw = H.canDraw();
  return { T, meta };
}

/* ---------------- snapshot queue + tweening ---------------- */
function key(snap) {
  const parts = [];
  for (const id in snap.T) { const t = snap.T[id]; parts.push(id, t.p.x.toFixed(2), t.p.y.toFixed(2), t.p.z.toFixed(2), t.s.toFixed(2), t.sel ? 1 : 0, t.target ? 1 : 0); }
  snap.meta.seats.forEach(s => parts.push(s.id, s.score, s.turn ? 1 : 0, s.name));
  return parts.join('|');
}
function sync() {
  if (!enabled || !ready) return;
  const snap = compute(); if (!snap) return;
  const k = key(snap); if (k === lastSnap) return; lastSnap = k;
  queue.push(snap);
  if (queue.length > 3) queue.splice(1, queue.length - 2);   // falling behind: skip middle steps
  kick();
}
function applySnap(snap, instant) {
  current = snap;
  const now = performance.now(), needed = new Set([MAT.back.map ? `assets/${H.state().cfg.deck}/back.jpg` : '']);
  let order = 0;
  const seen = new Set();
  for (const id in snap.T) {
    seen.add(id);
    const t = snap.T[id];
    let rec = cards.get(id);
    if (!rec) {
      const c = H.findCard(id); if (!c) continue;
      rec = makeCard(c); cards.set(id, rec);
      const start = t.zone === 'deck' || instant ? t : pose(snap.meta.deckTop.x, snap.meta.deckTop.y, snap.meta.deckTop.z, flatQ(false), 1);
      setPose(rec, start); rec.rest = start;
    }
    if (t.face) { wantFace(rec, true); needed.add(rec.url); }
    rec.zone = t.zone;
    styleGlow(rec, t);
    if (samePose(rec.rest, t)) continue;
    if (instant) { setPose(rec, t); rec.rest = t; rec.anim = null; continue; }
    const from = currentPose(rec);
    const quick = t.hand && rec.rest && rec.rest.hand;            // reshuffle / lift inside the hand
    const dist = from.p.distanceTo(t.p);
    rec.anim = { from, to: t, t0: now + (quick ? 0 : order++ * STAGGER), dur: quick ? 180 : DUR + Math.min(280, dist * 40), arc: quick ? 0 : Math.min(1.4, 0.25 + dist * 0.12) };
    rec.rest = t;
  }
  // cards no longer in play (new round): fly back into the deck and vanish
  for (const [id, rec] of cards) if (!seen.has(id)) {
    const to = pose(snap.meta.deckTop.x, snap.meta.deckTop.y, snap.meta.deckTop.z, flatQ(false), 1, { gone: true });
    if (!rec.rest || !rec.rest.gone) { rec.anim = { from: currentPose(rec), to, t0: now + order++ * 12, dur: 420, arc: 0.6 }; rec.rest = to; }
  }
  pruneTextures(needed);
  updateLabels(snap.meta);
}
function samePose(a, b) { return a && b && a.p.distanceToSquared(b.p) < 1e-6 && Math.abs(a.s - b.s) < 1e-4 && a.q.angleTo(b.q) < 1e-3; }
function currentPose(rec) { return { p: rec.g.position.clone(), q: rec.g.quaternion.clone(), s: rec.g.scale.x }; }
function setPose(rec, t) {
  rec.g.position.copy(t.p); rec.g.quaternion.copy(t.q); rec.g.scale.setScalar(t.s);
  shadowFor(rec, t.p.y, t.s, restShadow(t));
}
/* at rest only the bottom card of a pile casts a shadow (stacked shadows build a dark blob) */
function restShadow(t) { return !t.hand && !t.gone && t.p.y < STEP * 1.5; }
function shadowFor(rec, y, s, show) {
  const sh = rec.shadow; sh.visible = show && y < 3;
  if (!sh.visible) return;
  sh.position.set(rec.g.position.x + y * 0.12, 0.002, rec.g.position.z + y * 0.08);
  const k = THREE.MathUtils.clamp(y / 2, 0, 1);
  sh.scale.setScalar(s * (1 + k * 0.6)); sh.material.opacity = y < 0.05 ? 0.35 : 0.5 * (1 - k * 0.7);
}
function styleGlow(rec, t) {
  const on = t.sel || t.target || t.promoted;
  rec.glow.visible = !!on;
  if (on) rec.glow.material.color.set(t.target ? 0xff4d3d : t.sel ? 0xf2c14e : 0xb57cff);
}
const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
function step(now) {
  let active = 0;
  for (const rec of cards.values()) {
    const a = rec.anim; if (!a) continue;
    const u = THREE.MathUtils.clamp((now - a.t0) / a.dur, 0, 1); active++;
    if (u <= 0) continue;
    const e = ease(u);
    rec.g.position.lerpVectors(a.from.p, a.to.p, e); rec.g.position.y += Math.sin(Math.PI * e) * a.arc;
    rec.g.quaternion.slerpQuaternions(a.from.q, a.to.q, e);
    rec.g.scale.setScalar(a.from.s + (a.to.s - a.from.s) * e);
    shadowFor(rec, rec.g.position.y, rec.g.scale.x, u >= 1 ? restShadow(a.to) : !(a.to.hand && u > 0.6));
    if (u >= 1) { rec.anim = null; if (a.to.gone) dropCard(rec); }
  }
  return active;
}
function frame(now) {
  rafId = 0;
  animating = step(now);
  if (!animating && queue.length) { applySnap(queue.shift(), false); animating = step(now); }
  renderer.render(scene, camera);
  if (animating || queue.length) rafId = requestAnimationFrame(frame);
}
function kick() { if (ready && enabled && !rafId) rafId = requestAnimationFrame(frame); }

/* ---------------- labels (name + score at each seat) ---------------- */
function labelSprite() {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128;
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sp.renderOrder = 10; sp.userData.cv = cv; labelGroup.add(sp); return sp;
}
function drawLabel(sp, s) {
  const cv = sp.userData.cv, x = cv.getContext('2d'), k = `${s.name}|${s.score}|${s.turn}`;
  if (sp.userData.k === k) return; sp.userData.k = k;
  x.clearRect(0, 0, 512, 128);
  x.fillStyle = s.turn ? 'rgba(242,193,78,.95)' : 'rgba(28,12,15,.82)';
  x.strokeStyle = s.turn ? '#fff3c4' : 'rgba(242,193,78,.7)'; x.lineWidth = 5;
  x.beginPath(); x.roundRect(8, 14, 496, 100, 50); x.fill(); x.stroke();
  x.fillStyle = s.turn ? '#2a0f12' : '#f3e6c8'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = 'bold 46px Georgia, serif'; x.fillText(`${s.name}  ·  ${s.score}`, 256, 66, 470);
  sp.material.map.needsUpdate = true;
}
function updateLabels(meta) {
  const ids = new Set();
  meta.seats.forEach(s => {
    ids.add(s.id);
    let sp = labels.get(s.id); if (!sp) { sp = labelSprite(); labels.set(s.id, sp); }
    drawLabel(sp, s);
    const out = s.viewer ? null : s.pos.clone().normalize();
    if (s.viewer) sp.position.set(portrait ? 0 : -3.3, portrait ? 0.15 : 0.3, portrait ? 0.62 : 1.2);   /* by your own Kings, clear of the deck and hand */
    else sp.position.copy(s.pos).addScaledVector(new THREE.Vector3(out.x, 0, out.z), 0.15).setY(0.9);
    const sc = portrait ? 1.7 : 2.0; sp.scale.set(sc, sc / 4, 1);
  });
  for (const [id, sp] of labels) if (!ids.has(id)) { labelGroup.remove(sp); labels.delete(id); }
}

/* ---------------- table, camera, input ---------------- */
function buildTable() {
  if (tableGroup) { scene.remove(tableGroup); tableGroup.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); } }); }
  tableGroup = new THREE.Group();
  const { rx, rz } = dims();
  // felt with a faint NO KINGS crest
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = Math.round(1024 * rz / rx); const x = cv.getContext('2d');
  const g = x.createRadialGradient(cv.width / 2, cv.height / 2, 40, cv.width / 2, cv.height / 2, cv.width * 0.6);
  g.addColorStop(0, '#7a1620'); g.addColorStop(0.7, '#4a0c13'); g.addColorStop(1, '#2a060b');
  x.fillStyle = g; x.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < 14000; i++) { x.fillStyle = `rgba(${Math.random() < .5 ? '0,0,0' : '255,220,200'},${Math.random() * 0.05})`; x.fillRect(Math.random() * cv.width, Math.random() * cv.height, 2, 2); }
  x.strokeStyle = 'rgba(242,193,78,.28)'; x.lineWidth = 6;
  x.beginPath(); x.ellipse(cv.width / 2, cv.height / 2, cv.width * 0.44, cv.height * 0.44, 0, 0, Math.PI * 2); x.stroke();
  x.fillStyle = 'rgba(242,193,78,.13)'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = `bold ${Math.round(cv.width * 0.075)}px Georgia, serif`; x.fillText('NO  KINGS', cv.width / 2, cv.height / 2 + (portrait ? cv.height * 0.2 : cv.height * 0.27));
  const ft = new THREE.CanvasTexture(cv); ft.colorSpace = THREE.SRGBColorSpace;
  const felt = new THREE.Mesh(new THREE.CircleGeometry(1, 96), new THREE.MeshStandardMaterial({ map: ft, roughness: 0.95 }));
  felt.rotation.x = -Math.PI / 2; felt.scale.set(rx + 0.6, rz + 0.6, 1);
  // gold/wood rim
  const ring = new THREE.Shape(); ring.absellipse(0, 0, rx + 1.05, rz + 1.05, 0, Math.PI * 2);
  const hole = new THREE.Path(); hole.absellipse(0, 0, rx + 0.6, rz + 0.6, 0, Math.PI * 2, true); ring.holes.push(hole);
  const rim = new THREE.Mesh(new THREE.ExtrudeGeometry(ring, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, curveSegments: 96 }),
    new THREE.MeshStandardMaterial({ color: 0x5b3215, roughness: 0.55, metalness: 0.25 }));
  rim.rotation.x = -Math.PI / 2; rim.position.y = -0.02;
  const inlay = new THREE.Mesh(new THREE.RingGeometry(1, 1.012, 128), new THREE.MeshBasicMaterial({ color: 0xc9a043 }));
  inlay.rotation.x = -Math.PI / 2; inlay.scale.set(rx + 0.62, rz + 0.62, 1); inlay.position.y = 0.003;
  tableGroup.add(felt, rim, inlay);
  scene.add(tableGroup);
}
function fitCamera() {
  const w = wrap.clientWidth || 1, h = wrap.clientHeight || 1;
  renderer.setSize(w, h, false);
  const wasPortrait = portrait; portrait = w / h < 0.9;
  camera.aspect = w / h;
  camera.fov = portrait ? 50 : 42;
  const { rx, rz } = dims();
  const elev = THREE.MathUtils.degToRad(portrait ? 66 : 56);
  const look = new THREE.Vector3(0, 0, portrait ? 1.5 : 1.35);
  const hHalf = Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
  const dist = Math.max((rx + 1.2) / Math.tan(hHalf), (rz + 1.3) * 2.1, 8.5);
  camera.position.set(0, Math.sin(elev) * dist, look.z + Math.cos(elev) * dist);
  camera.lookAt(look); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  if (wasPortrait !== portrait || !tableGroup) buildTable();
}
function onResize() {
  if (!ready) return;
  fitCamera();
  lastSnap = ''; queue = [];
  const snap = compute(); if (snap) { lastSnap = key(snap); applySnap(snap, true); }
  renderer.render(scene, camera);
}
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let down = null;
function onDown(e) { down = { x: e.clientX, y: e.clientY, t: performance.now() }; }
function onUp(e) {
  if (!down) return; const d = down; down = null;
  if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10 || performance.now() - d.t > 700) return;
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const objs = []; for (const rec of cards.values()) if (!rec.rest || !rec.rest.gone) objs.push(rec.g);
  const hit = ray.intersectObjects(objs, true).find(h => h.object.userData.cardId);
  if (hit) {
    const rec = cards.get(hit.object.userData.cardId); if (!rec) return;
    if (rec.rest && rec.rest.hand) return H.onHandCard(rec.id);
    if (rec.zone === 'king') return H.onKing(rec.id);
    if (rec.zone === 'deck') return H.onDeck();
  }
}

/* ---------------- public API ---------------- */
function init() {
  wrap = document.getElementById('t3d');
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { return false; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
  wrap.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x140a0c);
  scene.fog = new THREE.Fog(0x140a0c, 18, 40);
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x2a0f12, 1.1));
  const sun = new THREE.DirectionalLight(0xffe2b0, 1.6); sun.position.set(3, 9, 5); scene.add(sun);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: 0x1a0c0e, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.9; scene.add(floor);
  labelGroup = new THREE.Group(); scene.add(labelGroup);
  buildShared();
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);
  new ResizeObserver(() => onResize()).observe(wrap);
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); });
  ready = true;
  return true;
}
function setEnabled(on) {
  enabled = !!on;
  if (enabled && !ready && !init()) { enabled = false; return false; }
  if (enabled) { requestAnimationFrame(() => { onResize(); sync(); }); }
  return enabled;
}
/* new game / new round: start clean so the deck appears in place */
function reset() {
  for (const rec of [...cards.values()]) dropCard(rec);
  queue = []; lastSnap = ''; current = null;
}
window.T3 = { setEnabled, sync, reset, get enabled() { return enabled; } };
H.onReady && H.onReady();
