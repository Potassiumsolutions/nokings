const CACHE='nokings-v0-29';
const ASSETS=['./','index.html','manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const req=e.request;
  // App shell (the HTML page): NETWORK-FIRST so code/UI updates appear on the next
  // load; fall back to cache when offline.
  if(req.mode==='navigate' || req.destination==='document'){
    e.respondWith(fetch(req).then(res=>{
      const cp=res.clone(); caches.open(CACHE).then(c=>c.put('index.html',cp)).catch(()=>{}); return res;
    }).catch(()=>caches.match('index.html').then(r=>r||caches.match('./'))));
    return;
  }
  // Everything else (art, audio, video): cache-first for speed.
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{
    const cp=res.clone(); caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{}); return res;
  }).catch(()=>caches.match('index.html'))));
});
