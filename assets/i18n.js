/* ============================================================
   No Kings — internationalization (English / Spanish)
   window.t(key, vars)  -> localized string (supports {placeholders} and functions)
   window.setLang('en'|'es'), window.LANG
   Static HTML is tagged with data-i18n (textContent) / data-i18n-html (innerHTML),
   applied by applyI18n() in index.html. Dynamic game strings call t() directly.
   ============================================================ */
(function(){
'use strict';

const S = { en:{}, es:{} };

/* ---------- SETUP ---------- */
S.en['setup.tag']="Topple every crown. Get caught holding a King and forfeit the round. First to 50 points wins — or 20 for a Short Game.";
S.es['setup.tag']="Derriba cada corona. Si te pillan con un Rey en la mano, pierdes la ronda. El primero en llegar a 50 puntos gana — o 20 en la Partida Corta.";
S.en['setup.players']="Players";                 S.es['setup.players']="Jugadores";
S.en['setup.note4']="4 suits (52 cards + jokers).";        S.es['setup.note4']="4 palos (52 cartas + comodines).";
S.en['setup.note5']="Adds the Anvils suit (green).";       S.es['setup.note5']="Añade el palo de Yunques (verde).";
S.en['setup.note6']="Adds Anvils + Wheat suits (green + blue)."; S.es['setup.note6']="Añade los palos de Yunques + Trigo (verde + azul).";
S.en['setup.youvs']="You vs.";                    S.es['setup.youvs']="Tú contra";
S.en['mode.ai']="Computer";                       S.es['mode.ai']="Computadora";
S.en['mode.hotseat']="Pass & play";               S.es['mode.hotseat']="Pasar y jugar";
S.en['setup.start']="START GAME";                 S.es['setup.start']="EMPEZAR";
S.en['setup.settings']="⚙ Settings & Credits"; S.es['setup.settings']="⚙ Ajustes y Créditos";
S.en['setup.about']="ⓘ About & Get the Game";  S.es['setup.about']="ⓘ Acerca de y Consigue el Juego";
S.en['foot.created']='<b><span style="color:var(--red)">NO</span> KINGS</b> &middot; Created by Paul A.T. Ramey<br><a href="https://www.ksoldesigns.com" target="_blank" rel="noopener">www.ksoldesigns.com</a> &middot; Potassium Solutions';
S.es['foot.created']='<b><span style="color:var(--red)">NO</span> KINGS</b> &middot; Creado por Paul A.T. Ramey<br><a href="https://www.ksoldesigns.com" target="_blank" rel="noopener">www.ksoldesigns.com</a> &middot; Potassium Solutions';

/* ---------- COMMON ---------- */
S.en['ui.back']="‹ Back";                    S.es['ui.back']="‹ Atrás";
S.en['ui.rules']="📖 Rules";            S.es['ui.rules']="📖 Reglas";
S.en['ui.printpdf']="🖨️ Print / PDF"; S.es['ui.printpdf']="🖨️ Imprimir / PDF";

/* ---------- SETTINGS ---------- */
S.en['set.gamelen']="Game length";               S.es['set.gamelen']="Duración de la partida";
S.en['len.standard']="Standard · 50";        S.es['len.standard']="Estándar · 50";
S.en['len.short']="Short · 20";              S.es['len.short']="Corta · 20";
S.en['set.music']="Background music";            S.es['set.music']="Música de fondo";
S.en['set.track']="Music track";                S.es['set.track']="Pista musical";
S.en['set.volume']="Volume";                    S.es['set.volume']="Volumen";
S.en['set.sfx']="Sound effects & voices";        S.es['set.sfx']="Efectos y voces";
S.en['set.vid']="Fallen-King video";             S.es['set.vid']="Vídeo del Rey caído";
S.en['set.language']="Language";                 S.es['set.language']="Idioma";
S.en['toggle.on']="On";                          S.es['toggle.on']="Sí";
S.en['toggle.off']="Off";                        S.es['toggle.off']="No";
S.en['credits.h']="Credits";                     S.es['credits.h']="Créditos";
S.en['credits.design']='Game design &amp; art &mdash; <b>Paul A.T. Ramey</b>';
S.es['credits.design']='Diseño y arte &mdash; <b>Paul A.T. Ramey</b>';
S.en['credits.music']='Music &mdash; &ldquo;No Kings Table&rdquo; &amp; &ldquo;Topple the Crown&rdquo;';
S.es['credits.music']='Música &mdash; &laquo;No Kings Table&raquo; y &laquo;Topple the Crown&raquo;';

/* ---------- ABOUT / STORE ---------- */
S.en['about.lead']="Love the game? Bring it to the table. Order a beautifully illustrated physical deck — or the printed rules — from The Game Crafter.";
S.es['about.lead']="¿Te encanta el juego? Llévalo a la mesa. Pide una baraja física bellamente ilustrada — o las reglas impresas — en The Game Crafter.";
S.en['about.std.sub']="4 suits · 2–4 players · 54 cards"; S.es['about.std.sub']="4 palos · 2–4 jugadores · 54 cartas";
S.en['about.full.sub']="6 suits · 2–6 players · 84 cards"; S.es['about.full.sub']="6 palos · 2–6 jugadores · 84 cartas";
S.en['about.rules.sub']="The printed fold-out rules"; S.es['about.rules.sub']="Las reglas impresas plegables";

/* ---------- GAME UI ---------- */
S.en['game.deck']="Deck {n}";                    S.es['game.deck']="Mazo {n}";
S.en['phase.promotion']="⚔ Promotion";       S.es['phase.promotion']="⚔ Promoción";
S.en['phase.reign']="Kings reign";               S.es['phase.reign']="Los Reyes reinan";
S.en['phase.turn']="{name}'s turn";              S.es['phase.turn']="Turno de {name}";
S.en['game.settings']="⚙ Settings";          S.es['game.settings']="⚙ Ajustes";
S.en['game.menu']="Menu";                        S.es['game.menu']="Menú";
S.en['game.quit']="Quit to menu?";               S.es['game.quit']="¿Salir al menú?";
S.en['table.h3']="Kings standing on the table";  S.es['table.h3']="Reyes en pie sobre la mesa";
S.en['table.tap']="(tap a King to target it)";   S.es['table.tap']="(toca un Rey para marcarlo)";
S.en['table.none']="— none standing —";          S.es['table.none']="— ninguno en pie —";
S.en['guide.title']="Topple a King";             S.es['guide.title']="Derribar un Rey";
S.en['guide.r1']='<b>Palace Coup</b> · any 2 high cards<span>Q / J / General pair → 1 crown</span>';
S.es['guide.r1']='<b>Golpe de Palacio</b> · 2 cartas altas<span>par de Reina/Jota/General → 1 corona</span>';
S.en['guide.r2']='<b>Royal bloodline</b> · same-suit Queen + General<span>ALL of a rival’s crowns</span>';
S.es['guide.r2']='<b>Linaje real</b> · Reina + General del mismo palo<span>TODAS las coronas de un rival</span>';
S.en['guide.r3']='<b>Holy Decree</b> · 1 matching Bishop<span>1 same-suit crown</span>';
S.es['guide.r3']='<b>Decreto Sagrado</b> · 1 Obispo del mismo palo<span>1 corona del mismo palo</span>';
S.en['guide.r4']='<b>Two Bishops</b><span>any crown</span>';
S.es['guide.r4']='<b>Dos Obispos</b><span>cualquier corona</span>';
S.en['guide.r5']='<b>Riot</b> · three of a kind (2–9)<span>1 crown</span>';
S.es['guide.r5']='<b>Motín</b> · trío (2–9)<span>1 corona</span>';
S.en['guide.r6']='<b>Revolt</b> · same-suit run of 4 / 5 / 6+<span>→ 1 / 2 / 3 crowns</span>';
S.es['guide.r6']='<b>Revuelta</b> · escalera del mismo palo de 4 / 5 / 6+<span>→ 1 / 2 / 3 coronas</span>';
S.en['guide.r7']='<b>Promoted Kings</b><span>1 General, or Joker + General (after all Kings fall)</span>';
S.es['guide.r7']='<b>Reyes Promovidos</b><span>1 General, o Comodín + General (tras caer todos los Reyes)</span>';
S.en['dock.you']="You";                          S.es['dock.you']="Tú";
S.en['act.draw']="Draw";                         S.es['act.draw']="Robar";
S.en['act.topple']="Topple";                     S.es['act.topple']="Derribar";
S.en['act.clear']="Clear";                       S.es['act.clear']="Limpiar";
S.en['act.end']="End";                           S.es['act.end']="Fin";
S.en['act.guide']="Guide";                       S.es['act.guide']="Guía";
S.en['dock.playlog']="Play log";                 S.es['dock.playlog']="Registro";
S.en['discard.banner']='⚠ You’re holding 8 — over the limit of 7. The <u>next card you tap will be DISCARDED</u>. (Jacks can’t be discarded.)';
S.es['discard.banner']='⚠ Tienes 8 — por encima del límite de 7. La <u>próxima carta que toques será DESCARTADA</u>. (Las Jotas no se pueden descartar.)';

/* ---------- PLAYERS / OPPONENT META ---------- */
S.en['player.you']="You";                        S.es['player.you']="Tú";
S.en['player.rival']="Rival {n}";                S.es['player.rival']="Rival {n}";
S.en['meta.theirturn']="● their turn";       S.es['meta.theirturn']="● su turno";
S.en['meta.hand']="hand";                        S.es['meta.hand']="mano";
S.en['meta.crowns']="crowns";                    S.es['meta.crowns']="coronas";
S.en['meta.won']="won";                          S.es['meta.won']="ganadas";
S.en['you.yourturn']="{name} — your turn";       S.es['you.yourturn']="{name} — tu turno";
S.en['you.thinking']="{name} is thinking…";       S.es['you.thinking']="{name} está pensando…";

/* ---------- HINTS ---------- */
S.en['hint.drawBegin']="Draw a card to begin your turn.";  S.es['hint.drawBegin']="Roba una carta para empezar tu turno.";
S.en['hint.overlimit']="Over the 7-card limit — tap a card to discard it."; S.es['hint.overlimit']="Superas el límite de 7 cartas — toca una carta para descartarla.";
S.en['hint.noplays']="No plays available — end your turn."; S.es['hint.noplays']="No hay jugadas — termina tu turno.";
S.en['hint.playOrEnd']="Play a topple combo, or end your turn."; S.es['hint.playOrEnd']="Juega una combinación para derribar, o termina tu turno.";
S.en['hint.selectCards']="Select cards to form a topple combo."; S.es['hint.selectCards']="Selecciona cartas para formar una combinación.";
S.en['hint.okTarget']=" — now tap a King on the table.";   S.es['hint.okTarget']=" — ahora toca un Rey en la mesa.";
S.en['hint.okGo']="  Tap “Topple”.";              S.es['hint.okGo']="  Toca «Derribar».";
S.en['hint.noMoreEnd']="No more plays — end your turn.";    S.es['hint.noMoreEnd']="No hay más jugadas — termina tu turno.";
S.en['hint.niceAgain']="Nice. Play another combo or end your turn."; S.es['hint.niceAgain']="¡Bien! Juega otra combinación o termina tu turno.";
S.en['hint.tapKing']="Tap a King on the table to target.";  S.es['hint.tapKing']="Toca un Rey en la mesa para marcarlo.";
S.en['hint.discardFirst']="Discard down to 7 first.";       S.es['hint.discardFirst']="Primero descarta hasta 7.";
S.en['hint.goodCombo']="Good. Play a combo or end your turn."; S.es['hint.goodCombo']="Bien. Juega una combinación o termina tu turno.";
S.en['hint.jackNoDiscard']="Jacks can’t be discarded — they may rise as Promoted Kings. Discard something else."; S.es['hint.jackNoDiscard']="Las Jotas no se pueden descartar — pueden ascender a Reyes Promovidos. Descarta otra cosa.";

/* ---------- TOASTS ---------- */
S.en['toast.overlimit']='⚠ Over the 7-card limit!<br>The <u>next card you tap will be discarded</u>. Jacks are safe — pick carefully.';
S.es['toast.overlimit']='⚠ ¡Superas el límite de 7 cartas!<br>La <u>próxima carta que toques se descartará</u>. Las Jotas están a salvo — elige con cuidado.';

/* ---------- LOG ---------- */
S.en['log.drewKing']="{name} drew a <b>King</b> — played at once.";  S.es['log.drewKing']="{name} robó un <b>Rey</b> — jugado de inmediato.";
S.en['log.drewJack']="{name} drew a <b>Jack</b> — promoted King, played at once."; S.es['log.drewJack']="{name} robó una <b>Jota</b> — Rey Promovido, jugado de inmediato.";
S.en['log.youDrew']="You drew {card}.";          S.es['log.youDrew']="Robaste {card}.";
S.en['log.youDiscard']="You discarded {card} (over limit)."; S.es['log.youDiscard']="Descartaste {card} (exceso).";
S.en['log.round']="<b>Round {n}</b> — {players} players, {suits} suits. Oldest player starts."; S.es['log.round']="<b>Ronda {n}</b> — {players} jugadores, {suits} palos. Empieza el jugador de más edad.";
S.en['log.roundBegins']="<b>Round {n}</b> begins."; S.es['log.roundBegins']="Comienza la <b>Ronda {n}</b>.";
S.en['log.allFallen']="<b>All Kings have fallen!</b> Jacks are now Promoted Kings — everyone plays their Jacks."; S.es['log.allFallen']="<b>¡Han caído todos los Reyes!</b> Las Jotas ahora son Reyes Promovidos — todos juegan sus Jotas.";
S.en['log.roundOver']="<b>Round over.</b> {reason}"; S.es['log.roundOver']="<b>Fin de la ronda.</b> {reason}";
S.en['log.4thKing']="{name} raised a 4th King — a loss for society. <b>{winner}</b> claims +10."; S.es['log.4thKing']="{name} levantó un 4.º Rey — una derrota para la sociedad. <b>{winner}</b> se lleva +10.";
S.en['log.applyCombo']=v=>`<b>${v.name}</b> ${v.desc} (+${v.n} crown${v.n>1?'s':''})`;
S.es['log.applyCombo']=v=>`<b>${v.name}</b> ${v.desc} (+${v.n} corona${v.n>1?'s':''})`;

/* ---------- ROUND END / SCORING ---------- */
S.en['reason.deck']="The deck is exhausted.";     S.es['reason.deck']="El mazo se ha agotado.";
S.en['part.fallen']=v=>`${v.n}×Fallen +${v.p}`;   S.es['part.fallen']=v=>`${v.n}×Caído +${v.p}`;
S.en['part.promoted']=v=>`${v.n}×Promoted +${v.p}`; S.es['part.promoted']=v=>`${v.n}×Promovido +${v.p}`;
S.en['part.queen']=v=>`${v.n}×Queen +${v.p}`;     S.es['part.queen']=v=>`${v.n}×Reina +${v.p}`;
S.en['part.standing']="Standing crowns −{n}";     S.es['part.standing']="Coronas en pie −{n}";
S.en['part.coup']="Seized the realm +10";         S.es['part.coup']="Se apoderó del reino +10";
S.en['part.caught']="Caught holding a King — round forfeit (0)"; S.es['part.caught']="Pillado con un Rey — ronda perdida (0)";

/* ---------- SCORE MODAL ---------- */
S.en['modal.gameover']="🏴 Game Over";  S.es['modal.gameover']="🏴 Fin del Juego";
S.en['modal.scores']="Round {n} — Scores";        S.es['modal.scores']="Ronda {n} — Puntuaciones";
S.en['modal.th.player']="Player";                 S.es['modal.th.player']="Jugador";
S.en['modal.th.breakdown']="Round breakdown";     S.es['modal.th.breakdown']="Desglose de ronda";
S.en['modal.th.round']="Round";                   S.es['modal.th.round']="Ronda";
S.en['modal.th.total']="Total";                   S.es['modal.th.total']="Total";
S.en['modal.winner']=v=>`${v.name} win${v.you?'':'s'} with ${v.score}!`;
S.es['modal.winner']=v=>`¡${v.name} gana con ${v.score}!`;
S.en['modal.playagain']="Play again";             S.es['modal.playagain']="Jugar de nuevo";
S.en['modal.nextround']="Next round";             S.es['modal.nextround']="Siguiente ronda";

/* ---------- COMBO DESCRIPTIONS ---------- */
S.en['desc.twoBishops']="Two Bishops depose any crown."; S.es['desc.twoBishops']="Dos Obispos deponen cualquier corona.";
S.en['desc.bishopSame']="The Bishop excommunicates a same-suit crown."; S.es['desc.bishopSame']="El Obispo excomulga una corona del mismo palo.";
S.en['desc.queenGeneralAll']="A matched Queen & General topple ALL of a rival’s crowns."; S.es['desc.queenGeneralAll']="Una Reina y un General del mismo palo derriban TODAS las coronas de un rival.";
S.en['desc.palace']="A pair of high cards stages a palace coup."; S.es['desc.palace']="Un par de cartas altas monta un golpe de palacio.";
S.en['desc.queenGeneral']="Queen & General topple a crown."; S.es['desc.queenGeneral']="Reina y General derriban una corona.";
S.en['desc.twoGenerals']="Two Generals stage a coup."; S.es['desc.twoGenerals']="Dos Generales montan un golpe.";
S.en['desc.queenJack']="A Queen & Jack topple a crown."; S.es['desc.queenJack']="Una Reina y una Jota derriban una corona.";
S.en['desc.twoJacks']="Two ambitious Jacks topple a crown."; S.es['desc.twoJacks']="Dos Jotas ambiciosas derriban una corona.";
S.en['desc.twoQueens']="Two Queens conspire to topple a crown."; S.es['desc.twoQueens']="Dos Reinas conspiran para derribar una corona.";
S.en['desc.jackGeneral']="A Jack & General topple a crown."; S.es['desc.jackGeneral']="Una Jota y un General derriban una corona.";
S.en['desc.riot']="Three {label}s rise up and topple a crown."; S.es['desc.riot']="Tres {label} se alzan y derriban una corona.";
S.en['desc.generalPromoted']="A General unseats a Promoted King."; S.es['desc.generalPromoted']="Un General destrona a un Rey Promovido.";
S.en['desc.jokerCoup']="Joker & General fell a Promoted King; claim the Jack."; S.es['desc.jokerCoup']="Comodín y General derriban a un Rey Promovido; reclama la Jota.";
S.en['desc.revolt']=v=>`A revolt of ${v.n} topples ${v.rc} crown${v.rc>1?'s':''}.`;
S.es['desc.revolt']=v=>`Una revuelta de ${v.n} derriba ${v.rc} corona${v.rc>1?'s':''}.`;

/* ---------- COMBO ERROR MESSAGES ---------- */
S.en['msg.pickKingBishop']="Pick a King to remove with the Bishop."; S.es['msg.pickKingBishop']="Elige un Rey para eliminar con el Obispo.";
S.en['msg.loneBishop']="A lone Bishop only removes a King of its own suit."; S.es['msg.loneBishop']="Un Obispo solitario solo elimina un Rey de su propio palo.";
S.en['msg.singleGeneral']="A single General only removes a Promoted King."; S.es['msg.singleGeneral']="Un solo General solo elimina a un Rey Promovido.";
S.en['msg.jokerGeneral']="Joker & General only remove a Promoted King."; S.es['msg.jokerGeneral']="Comodín y General solo eliminan a un Rey Promovido.";
S.en['msg.revoltRun']="A revolt must be a run of consecutive number cards (2-9) in one suit."; S.es['msg.revoltRun']="Una revuelta debe ser una escalera de cartas numéricas consecutivas (2-9) del mismo palo.";
S.en['msg.noTopple']="That combination doesn’t topple a King."; S.es['msg.noTopple']="Esa combinación no derriba a ningún Rey.";
S.en['msg.invalid']="Invalid combo.";             S.es['msg.invalid']="Combinación inválida.";

/* ---------- NEAR-MISS HINTS ---------- */
S.en['near.riot']="Two {rk}s selected — tap <b>one more {rk}</b> (scroll your hand if needed) for a <b>Riot</b>."; S.es['near.riot']="Dos {rk} seleccionados — toca <b>un {rk} más</b> (desplaza tu mano si hace falta) para un <b>Motín</b>.";
S.en['near.revolt']="A same-suit run of {n} — a <b>Revolt</b> needs <b>4 or more</b> in a row."; S.es['near.revolt']="Una escalera del mismo palo de {n} — una <b>Revuelta</b> necesita <b>4 o más</b> seguidas.";
S.en['near.notyet']="Not a valid combo yet.";     S.es['near.notyet']="Aún no es una combinación válida.";

/* ---------- FEED ---------- */
S.en['feed.empty']="No crowns have fallen yet.";  S.es['feed.empty']="Aún no ha caído ninguna corona.";
S.en['feed.toppled']=v=>`<b>${v.name}</b> toppled ${v.n} crown${v.n>1?'s':''} <span style="font-size:14px">${v.suits}</span><br><span class="who">from ${v.owner} — ${v.desc}</span>`;
S.es['feed.toppled']=v=>`<b>${v.name}</b> derribó ${v.n} corona${v.n>1?'s':''} <span style="font-size:14px">${v.suits}</span><br><span class="who">de ${v.owner} — ${v.desc}</span>`;

/* ---------- CARD NAMES (suit + rank/role) ---------- */
S.en['suit.hearts']="Hearts";     S.es['suit.hearts']="Corazones";
S.en['suit.diamonds']="Diamonds"; S.es['suit.diamonds']="Diamantes";
S.en['suit.clubs']="Clubs";       S.es['suit.clubs']="Tréboles";
S.en['suit.spades']="Spades";     S.es['suit.spades']="Picas";
S.en['suit.anvils']="Anvils";     S.es['suit.anvils']="Yunques";
S.en['suit.wheat']="Wheat";       S.es['suit.wheat']="Trigo";
/* role.<rankKey> : English is the plain role word; Spanish carries its article for card names */
S.en['role.A']="Bishop";  S.es['role.A']="el Obispo";
S.en['role.J']="Jack";    S.es['role.J']="la Jota";
S.en['role.Q']="Queen";   S.es['role.Q']="la Reina";
S.en['role.10']="General";S.es['role.10']="el General";
S.en['role.K']="King";    S.es['role.K']="el Rey";
S.en['role.2']="2"; S.es['role.2']="el 2";
S.en['role.3']="3"; S.es['role.3']="el 3";
S.en['role.4']="4"; S.es['role.4']="el 4";
S.en['role.5']="5"; S.es['role.5']="el 5";
S.en['role.6']="6"; S.es['role.6']="el 6";
S.en['role.7']="7"; S.es['role.7']="el 7";
S.en['role.8']="8"; S.es['role.8']="el 8";
S.en['role.9']="9"; S.es['role.9']="el 9";
S.en['card.joker']="a Joker";   S.es['card.joker']="un Comodín";
S.en['card.name']=v=>`the ${v.role} of ${v.suit}`;
S.es['card.name']=v=>`${v.role} de ${v.suit}`;

/* ---------- RULES (full body, Spanish only; English comes from the DOM) ---------- */
S.es['rules.body']=`
    <p class="rules-lead">El reino de Cardlandia se resquebraja. Derriba al viejo régimen y reclama la gloria, pero si la tiranía asegura un bastión antes de que triunfe la revolución, gana la corona. El primero en llegar a <b class="hi">50 puntos</b> funda el nuevo orden — o elige una <b class="hi">Partida Corta (20 puntos)</b> en Ajustes para un levantamiento más rápido.</p>

    <h2>El Reparto y la Baraja</h2>
    <p>Una baraja estándar de 52 cartas con la corte renombrada, más 4 Comodines salvajes.</p>
    <table>
      <tr><th>Carta</th><th>Quiénes son</th></tr>
      <tr><td><b>Reyes</b> (K)</td><td>Monarcas Absolutos. Los tiranos nunca se esconden: en cuanto robas un Rey <b>debes</b> jugarlo boca arriba frente a ti.</td></tr>
      <tr><td><b>Reinas</b> (Q)</td><td>Astutas Conspiradoras, tramando desde la sombra de tu mano.</td></tr>
      <tr><td><b>Generales</b> (10)</td><td>La Cúpula Militar, leal al mando, al golpe o al caos.</td></tr>
      <tr><td><b>Obispos</b> (A)</td><td>La Orden Sagrada, que blande su sanción contra la Corona.</td></tr>
      <tr><td><b>La Multitud</b> (2–9)</td><td>El Pueblo Llano. Débil en solitario, devastador unido.</td></tr>
      <tr><td><b>Jotas</b> (J)</td><td>Herederos Ambiciosos que esperan entre bastidores. Las Jotas <b>nunca pueden descartarse</b>.</td></tr>
    </table>
    <p><b>Jugadores — 4 por defecto</b> (Corazones, Diamantes, Tréboles, Picas). Para <b>5–6 jugadores</b> los gremios obreros se suman con un palo completo cada uno: el 5.º son los <b style="color:#4caf50">Yunques</b> (verde), el 6.º es el <b style="color:#5b9bd5">Trigo</b> (azul).</p>

    <h2>El Ciclo Revolucionario</h2>
    <ol>
      <li>El <b>jugador de más edad</b> toma el primer turno; el juego avanza en <b>el sentido de las agujas del reloj</b>.</li>
      <li><b>Recluta apoyo</b> — roba una carta. Si robas un <b>Rey</b> te coronas al instante, boca arriba sobre la mesa.</li>
      <li><b>Mantén el orden</b> — el límite de mano es <b>7</b>. Descarta el exceso fuera de juego, pero las ambiciosas <b>Jotas se niegan a ser descartadas</b>.</li>
      <li><b>Ataca o conspira</b> — lanza un ataque para derribar a los Reyes en pie, o guarda tus cartas para un golpe mayor.</li>
    </ol>

    <h2>Tres Caminos Revolucionarios</h2>
    <p>Cada derribo es una de tres ideas sencillas. Un Rey derribado se convierte en un <b>Rey Caído</b> en tu montón de victoria; las cartas usadas se descartan.</p>
    <table>
      <tr><th>Camino</th><th>La jugada</th><th>Efecto</th></tr>
      <tr><td><b>Golpe de Palacio</b><br><span class="hi">figuras y 10</span></td><td><b>Cualquier par de cartas altas</b> — dos de Reina / Jota / General (p. ej. Reina+General, Reina+Jota, dos Generales)</td><td>derriba <b>1</b> Rey</td></tr>
      <tr><td></td><td><b>Linaje real</b> — Reina + General del <b>mismo palo</b></td><td>derriba <b>TODOS</b> los Reyes de un jugador</td></tr>
      <tr><td><b>Decreto Sagrado</b><br><span class="hi">Obispos / Ases</span></td><td><b>1 Obispo</b> del propio palo del Rey — <i>o</i> — <b>2 Obispos</b> de cualquier palo</td><td>derriba <b>1</b> Rey</td></tr>
      <tr><td><b>La Turba</b><br><span class="hi">números 2–9</span></td><td><b>Motín</b> — trío (tres cartas 2–9 del mismo valor)</td><td>derriba <b>1</b> Rey</td></tr>
      <tr><td></td><td><b>Revuelta</b> — una escalera del mismo palo de 2–9, de <b>4 / 5 / 6+</b></td><td>derriba <b>1 / 2 / 3</b> Reyes</td></tr>
    </table>
    <p><b>La Revuelta</b> es una escalera de <b>cartas numéricas consecutivas 2–9 del mismo palo</b> — sin figuras dentro de la escalera — todas dirigidas a los Reyes de <b>un mismo jugador</b>. Un Obispo puede encabezar la marcha por ambiente, pero no cuenta.</p>

    <h2>La Segunda Ola <span style="font-weight:400;text-transform:none;color:var(--muted);font-size:12px">(la ambición de la Jota)</span></h2>
    <ul>
      <li>Cuando <b>todos los Reyes verdaderos</b> han caído, las ambiciosas <b>Jotas se alzan al instante como Reyes Promovidos</b> — todos revelan sus Jotas a la vez.</li>
      <li>Un solo <b>General</b> puede aplastar a un Rey Promovido (se descarta).</li>
      <li><b>Comodín + General</b> es un asesinato veloz: elimina a un Rey Promovido y reclama la Jota como <b>Rey Caído Promovido</b>.</li>
      <li>Los Obispos, los pares y las Revueltas derriban a los Reyes Promovidos según sus reglas normales.</li>
    </ul>

    <h2>El Gran Recuento <span style="font-weight:400;text-transform:none;color:var(--muted);font-size:12px">(puntuación)</span></h2>
    <table>
      <tr><th>Hazaña / penalización</th><th style="text-align:right">Puntos</th></tr>
      <tr><td>Rey Caído en tu montón de victoria</td><td class="pts">+2</td></tr>
      <tr><td>Rey Caído Promovido (un monarca menor)</td><td class="pts">+1</td></tr>
      <tr><td>Reina superviviente en la mano</td><td class="pts">+1</td></tr>
      <tr><td>4 Reyes en pie frente a ti (o un golpe)</td><td class="pts">+10</td></tr>
      <tr><td>Cada Rey / Rey Promovido en pie sobre la mesa</td><td class="pts">−1 a todos</td></tr>
      <tr><td>Pillado con un Rey en el recuento</td><td class="pts">ronda = 0</td></tr>
    </table>
    <p><b>Golpe de los Generales:</b> ten <b>los 4 Generales</b> cuando se juegue el <b>4.º Rey</b> y podrás reclamar los <b>+10</b> en lugar de quien alzó a los Reyes.</p>

    <h2>El Final de una Ronda</h2>
    <p>Una ronda termina cuando <b>o bien</b> un jugador tiene <b>4 Reyes en pie</b> (una dinastía tiránica queda asegurada — <i>una derrota para la sociedad, una victoria para el individuo</i>), <b>o bien</b> el <b>mazo se recorre una vez por completo</b>. Se suman los puntos, se rebaraja, siguiente ronda. <b>El primero en llegar a 50 gana</b> — o <b>20</b> en una Partida Corta (elige la duración en Ajustes). Los umbrales de "cuatro" siguen siendo cuatro incluso en partidas de 5–6 jugadores.</p>`;

/* ============================================================
   runtime
   ============================================================ */
window.STR = S;
window.LANG = (localStorage.getItem('nokings.lang')==='es') ? 'es' : 'en';

window.t = function(key, vars){
  const tbl = S[window.LANG] || S.en;
  let v = tbl[key]; if(v==null) v = S.en[key]; if(v==null) return key;
  if(typeof v==='function') return v(vars||{});
  if(vars) v = v.replace(/\{(\w+)\}/g, (m,k)=> (vars[k]!=null?vars[k]:m));
  return v;
};

window.setLang = function(l){
  window.LANG = (l==='es') ? 'es' : 'en';
  localStorage.setItem('nokings.lang', window.LANG);
  document.documentElement.lang = window.LANG;
  if(typeof window.applyI18n==='function') window.applyI18n();
  if(typeof window.onLangChange==='function') window.onLangChange();
};

})();
