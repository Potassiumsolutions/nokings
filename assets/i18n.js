/* ============================================================
   No Kings — internationalization (English / Spanish)
   window.t(key, vars)  -> localized string (supports {placeholders} and functions)
   window.setLang('en'|'es'), window.LANG
   Static HTML is tagged with data-i18n (textContent) / data-i18n-html (innerHTML),
   applied by applyI18n() in index.html. Dynamic game strings call t() directly.
   ============================================================ */
(function(){
'use strict';

const S = { en:{}, es:{}, fr:{} };

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
S.es['modal.winner']=v=>`¡${v.name} gana${v.you?'s':''} con ${v.score}!`;
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
   FRENCH / FRANÇAIS
   ============================================================ */
/* setup */
S.fr['setup.tag']="Renversez chaque couronne. Si l’on vous surprend avec un Roi en main, vous perdez la manche. Le premier à 50 points gagne — ou 20 pour une Partie Courte.";
S.fr['setup.players']="Joueurs";
S.fr['setup.note4']="4 couleurs (52 cartes + jokers).";
S.fr['setup.note5']="Ajoute la couleur des Enclumes (vert).";
S.fr['setup.note6']="Ajoute les couleurs Enclumes + Blé (vert + bleu).";
S.fr['setup.youvs']="Vous contre";
S.fr['mode.ai']="Ordinateur";
S.fr['mode.hotseat']="Chacun son tour";
S.fr['setup.start']="COMMENCER";
S.fr['setup.settings']="⚙ Réglages et Crédits";
S.fr['setup.about']="ⓘ À propos et Obtenir le jeu";
S.fr['foot.created']='<b><span style="color:var(--red)">NO</span> KINGS</b> &middot; Créé par Paul A.T. Ramey<br><a href="https://www.ksoldesigns.com" target="_blank" rel="noopener">www.ksoldesigns.com</a> &middot; Potassium Solutions';
/* common */
S.fr['ui.back']="‹ Retour";
S.fr['ui.rules']="📖 Règles";
S.fr['ui.printpdf']="🖨️ Imprimer / PDF";
/* settings */
S.fr['set.gamelen']="Durée de la partie";
S.fr['len.standard']="Standard · 50";
S.fr['len.short']="Courte · 20";
S.fr['set.music']="Musique de fond";
S.fr['set.track']="Piste musicale";
S.fr['set.volume']="Volume";
S.fr['set.sfx']="Effets sonores et voix";
S.fr['set.vid']="Vidéo du Roi déchu";
S.fr['set.language']="Langue";
S.fr['toggle.on']="Oui";
S.fr['toggle.off']="Non";
S.fr['credits.h']="Crédits";
S.fr['credits.design']='Conception et illustrations &mdash; <b>Paul A.T. Ramey</b>';
S.fr['credits.music']='Musique &mdash; &laquo;No Kings Table&raquo; et &laquo;Topple the Crown&raquo;';
/* about */
S.fr['about.lead']="Vous aimez le jeu ? Emportez-le à table. Commandez un jeu de cartes physique magnifiquement illustré — ou les règles imprimées — sur The Game Crafter.";
S.fr['about.std.sub']="4 couleurs · 2–4 joueurs · 54 cartes";
S.fr['about.full.sub']="6 couleurs · 2–6 joueurs · 84 cartes";
S.fr['about.rules.sub']="Les règles imprimées dépliantes";
/* game ui */
S.fr['game.deck']="Pioche {n}";
S.fr['phase.promotion']="⚔ Promotion";
S.fr['phase.reign']="Les Rois règnent";
S.fr['phase.turn']="Tour de {name}";
S.fr['game.settings']="⚙ Réglages";
S.fr['game.menu']="Menu";
S.fr['game.quit']="Quitter vers le menu ?";
S.fr['table.h3']="Rois debout sur la table";
S.fr['table.tap']="(touchez un Roi pour le viser)";
S.fr['table.none']="— aucun debout —";
S.fr['guide.title']="Renverser un Roi";
S.fr['guide.r1']='<b>Coup de palais</b> · 2 cartes hautes<span>paire Dame/Valet/Général → 1 couronne</span>';
S.fr['guide.r2']='<b>Lignée royale</b> · Dame + Général de même couleur<span>TOUTES les couronnes d’un rival</span>';
S.fr['guide.r3']='<b>Décret sacré</b> · 1 Évêque de même couleur<span>1 couronne de même couleur</span>';
S.fr['guide.r4']='<b>Deux Évêques</b><span>n’importe quelle couronne</span>';
S.fr['guide.r5']='<b>Émeute</b> · brelan (2–9)<span>1 couronne</span>';
S.fr['guide.r6']='<b>Révolte</b> · suite de même couleur de 4 / 5 / 6+<span>→ 1 / 2 / 3 couronnes</span>';
S.fr['guide.r7']='<b>Rois promus</b><span>1 Général, ou Joker + Général (après la chute de tous les Rois)</span>';
S.fr['dock.you']="Vous";
S.fr['act.draw']="Piocher";
S.fr['act.topple']="Renverser";
S.fr['act.clear']="Effacer";
S.fr['act.end']="Fin";
S.fr['act.guide']="Guide";
S.fr['dock.playlog']="Journal";
S.fr['discard.banner']='⚠ Vous avez 8 cartes — au-dessus de la limite de 7. La <u>prochaine carte touchée sera DÉFAUSSÉE</u>. (Les Valets ne peuvent pas être défaussés.)';
/* players / meta */
S.fr['player.you']="Vous";
S.fr['player.rival']="Rival {n}";
S.fr['meta.theirturn']="● son tour";
S.fr['meta.hand']="main";
S.fr['meta.crowns']="couronnes";
S.fr['meta.won']="gagnées";
S.fr['you.yourturn']="{name} — à vous";
S.fr['you.thinking']="{name} réfléchit…";
/* hints */
S.fr['hint.drawBegin']="Piochez une carte pour commencer votre tour.";
S.fr['hint.overlimit']="Au-dessus de la limite de 7 cartes — touchez une carte pour la défausser.";
S.fr['hint.noplays']="Aucun coup possible — terminez votre tour.";
S.fr['hint.playOrEnd']="Jouez une combinaison pour renverser, ou terminez votre tour.";
S.fr['hint.selectCards']="Sélectionnez des cartes pour former une combinaison.";
S.fr['hint.okTarget']=" — touchez maintenant un Roi sur la table.";
S.fr['hint.okGo']="  Touchez « Renverser ».";
S.fr['hint.noMoreEnd']="Plus de coups — terminez votre tour.";
S.fr['hint.niceAgain']="Bien joué ! Jouez une autre combinaison ou terminez votre tour.";
S.fr['hint.tapKing']="Touchez un Roi sur la table pour le viser.";
S.fr['hint.discardFirst']="Défaussez d’abord jusqu’à 7 cartes.";
S.fr['hint.goodCombo']="Bien. Jouez une combinaison ou terminez votre tour.";
S.fr['hint.jackNoDiscard']="Les Valets ne peuvent pas être défaussés — ils peuvent devenir des Rois promus. Défaussez autre chose.";
/* toasts */
S.fr['toast.overlimit']='⚠ Au-dessus de la limite de 7 cartes !<br>La <u>prochaine carte touchée sera défaussée</u>. Les Valets sont à l’abri — choisissez bien.';
/* log */
S.fr['log.drewKing']="{name} a pioché un <b>Roi</b> — joué aussitôt.";
S.fr['log.drewJack']="{name} a pioché un <b>Valet</b> — Roi promu, joué aussitôt.";
S.fr['log.youDrew']="Vous avez pioché {card}.";
S.fr['log.youDiscard']="Vous avez défaussé {card} (au-dessus de la limite).";
S.fr['log.round']="<b>Manche {n}</b> — {players} joueurs, {suits} couleurs. Le joueur le plus âgé commence.";
S.fr['log.roundBegins']="La <b>Manche {n}</b> commence.";
S.fr['log.allFallen']="<b>Tous les Rois sont tombés !</b> Les Valets deviennent des Rois promus — chacun joue ses Valets.";
S.fr['log.roundOver']="<b>Manche terminée.</b> {reason}";
S.fr['log.4thKing']="{name} a dressé un 4e Roi — une défaite pour la société. <b>{winner}</b> remporte +10.";
S.fr['log.applyCombo']=v=>`<b>${v.name}</b> ${v.desc} (+${v.n} couronne${v.n>1?'s':''})`;
/* round end / scoring */
S.fr['reason.deck']="La pioche est épuisée.";
S.fr['part.fallen']=v=>`${v.n}×Déchu +${v.p}`;
S.fr['part.promoted']=v=>`${v.n}×Promu +${v.p}`;
S.fr['part.queen']=v=>`${v.n}×Dame +${v.p}`;
S.fr['part.standing']="Couronnes debout −{n}";
S.fr['part.coup']="S’est emparé du royaume +10";
S.fr['part.caught']="Surpris avec un Roi — manche perdue (0)";
/* score modal */
S.fr['modal.gameover']="🏴 Partie terminée";
S.fr['modal.scores']="Manche {n} — Scores";
S.fr['modal.th.player']="Joueur";
S.fr['modal.th.breakdown']="Détail de la manche";
S.fr['modal.th.round']="Manche";
S.fr['modal.th.total']="Total";
S.fr['modal.winner']=v=>v.you?`Vous gagnez avec ${v.score} !`:`${v.name} gagne avec ${v.score} !`;
S.fr['modal.playagain']="Rejouer";
S.fr['modal.nextround']="Manche suivante";
/* combo descriptions */
S.fr['desc.twoBishops']="Deux Évêques déposent n’importe quelle couronne.";
S.fr['desc.bishopSame']="L’Évêque excommunie une couronne de même couleur.";
S.fr['desc.queenGeneralAll']="Une Dame et un Général de même couleur renversent TOUTES les couronnes d’un rival.";
S.fr['desc.palace']="Une paire de cartes hautes orchestre un coup de palais.";
S.fr['desc.queenGeneral']="Dame et Général renversent une couronne.";
S.fr['desc.twoGenerals']="Deux Généraux orchestrent un coup.";
S.fr['desc.queenJack']="Une Dame et un Valet renversent une couronne.";
S.fr['desc.twoJacks']="Deux Valets ambitieux renversent une couronne.";
S.fr['desc.twoQueens']="Deux Dames conspirent pour renverser une couronne.";
S.fr['desc.jackGeneral']="Un Valet et un Général renversent une couronne.";
S.fr['desc.riot']="Trois {label} se soulèvent et renversent une couronne.";
S.fr['desc.generalPromoted']="Un Général détrône un Roi promu.";
S.fr['desc.jokerCoup']="Joker et Général renversent un Roi promu ; récupérez le Valet.";
S.fr['desc.revolt']=v=>`Une révolte de ${v.n} renverse ${v.rc} couronne${v.rc>1?'s':''}.`;
/* combo error messages */
S.fr['msg.pickKingBishop']="Choisissez un Roi à éliminer avec l’Évêque.";
S.fr['msg.loneBishop']="Un Évêque seul n’élimine qu’un Roi de sa propre couleur.";
S.fr['msg.singleGeneral']="Un seul Général n’élimine qu’un Roi promu.";
S.fr['msg.jokerGeneral']="Joker et Général n’éliminent qu’un Roi promu.";
S.fr['msg.revoltRun']="Une révolte doit être une suite de cartes numériques consécutives (2-9) de même couleur.";
S.fr['msg.noTopple']="Cette combinaison ne renverse aucun Roi.";
S.fr['msg.invalid']="Combinaison invalide.";
/* near-miss hints */
S.fr['near.riot']="Deux {rk} sélectionnés — touchez <b>un {rk} de plus</b> (faites défiler votre main si besoin) pour une <b>Émeute</b>.";
S.fr['near.revolt']="Une suite de même couleur de {n} — une <b>Révolte</b> nécessite <b>4 cartes ou plus</b> à la suite.";
S.fr['near.notyet']="Pas encore une combinaison valide.";
/* feed */
S.fr['feed.empty']="Aucune couronne n’est encore tombée.";
S.fr['feed.toppled']=v=>`<b>${v.name}</b> a renversé ${v.n} couronne${v.n>1?'s':''} <span style="font-size:14px">${v.suits}</span><br><span class="who">de ${v.owner} — ${v.desc}</span>`;
/* card names */
S.fr['suit.hearts']="Cœur";   S.fr['suit.diamonds']="Carreau";
S.fr['suit.clubs']="Trèfle";  S.fr['suit.spades']="Pique";
S.fr['suit.anvils']="Enclumes"; S.fr['suit.wheat']="Blé";
S.fr['role.A']="l’Évêque"; S.fr['role.J']="le Valet"; S.fr['role.Q']="la Dame";
S.fr['role.10']="le Général"; S.fr['role.K']="le Roi";
S.fr['role.2']="le 2"; S.fr['role.3']="le 3"; S.fr['role.4']="le 4"; S.fr['role.5']="le 5";
S.fr['role.6']="le 6"; S.fr['role.7']="le 7"; S.fr['role.8']="le 8"; S.fr['role.9']="le 9";
S.fr['card.joker']="un Joker";
S.fr['card.name']=v=>{ const de = /^[aeiouhàâéèêëîïôûAEIOUHÀÂÉÈÊËÎÏÔÛ]/.test(v.suit) ? "d’" : "de "; return `${v.role} ${de}${v.suit}`; };
/* rules body (French) */
S.fr['rules.body']=`
    <p class="rules-lead">Le royaume de Cardlandia se fissure. Renversez l’ancien régime et réclamez la gloire, mais si la tyrannie s’assure un bastion avant que la révolution ne triomphe, la couronne l’emporte. Le premier à <b class="hi">50 points</b> fonde le nouvel ordre — ou choisissez une <b class="hi">Partie Courte (20 points)</b> dans les Réglages pour un soulèvement plus rapide.</p>

    <h2>Les Personnages et le Jeu</h2>
    <p>Un jeu standard de 52 cartes dont la cour est renommée, plus 4 Jokers sauvages.</p>
    <table>
      <tr><th>Carte</th><th>Qui sont-ils</th></tr>
      <tr><td><b>Rois</b> (K)</td><td>Monarques absolus. Les tyrans ne se cachent jamais : dès que vous piochez un Roi, vous <b>devez</b> le jouer face visible devant vous.</td></tr>
      <tr><td><b>Dames</b> (Q)</td><td>Comploteuses rusées, intriguant depuis l’ombre de votre main.</td></tr>
      <tr><td><b>Généraux</b> (10)</td><td>L’état-major militaire, fidèle au commandement, au coup d’État ou au chaos.</td></tr>
      <tr><td><b>Évêques</b> (A)</td><td>L’Ordre sacré, brandissant la sanction contre la Couronne.</td></tr>
      <tr><td><b>La Foule</b> (2–9)</td><td>Le petit peuple. Faible isolé, dévastateur uni.</td></tr>
      <tr><td><b>Valets</b> (J)</td><td>Héritiers ambitieux qui attendent en coulisses. Les Valets <b>ne peuvent jamais être défaussés</b>.</td></tr>
    </table>
    <p><b>Joueurs — 4 par défaut</b> (Cœur, Carreau, Trèfle, Pique). Pour <b>5–6 joueurs</b>, les corporations ouvrières se joignent avec une couleur complète chacune : la 5e est les <b style="color:#4caf50">Enclumes</b> (vert), la 6e est le <b style="color:#5b9bd5">Blé</b> (bleu).</p>

    <h2>Le Cycle Révolutionnaire</h2>
    <ol>
      <li>Le <b>joueur le plus âgé</b> joue en premier ; le jeu se déroule <b>dans le sens des aiguilles d’une montre</b>.</li>
      <li><b>Recrutez du soutien</b> — piochez une carte. Si vous piochez un <b>Roi</b>, vous vous couronnez aussitôt, face visible sur la table.</li>
      <li><b>Maintenez l’ordre</b> — la limite de main est de <b>7</b>. Défaussez l’excédent hors jeu, mais les ambitieux <b>Valets refusent d’être défaussés</b>.</li>
      <li><b>Attaquez ou complotez</b> — lancez une attaque pour renverser les Rois debout, ou gardez vos cartes pour un coup plus grand.</li>
    </ol>

    <h2>Trois Voies Révolutionnaires</h2>
    <p>Chaque renversement est l’une de trois idées simples. Un Roi renversé devient un <b>Roi déchu</b> dans votre pile de victoire ; les cartes utilisées sont défaussées.</p>
    <table>
      <tr><th>Voie</th><th>Le coup</th><th>Effet</th></tr>
      <tr><td><b>Coup de palais</b><br><span class="hi">figures et 10</span></td><td><b>N’importe quelle paire de cartes hautes</b> — deux parmi Dame / Valet / Général (p. ex. Dame+Général, Dame+Valet, deux Généraux)</td><td>renverse <b>1</b> Roi</td></tr>
      <tr><td></td><td><b>Lignée royale</b> — Dame + Général de <b>même couleur</b></td><td>renverse <b>TOUS</b> les Rois d’un joueur</td></tr>
      <tr><td><b>Décret sacré</b><br><span class="hi">Évêques / As</span></td><td><b>1 Évêque</b> de la couleur du Roi — <i>ou</i> — <b>2 Évêques</b> de n’importe quelle couleur</td><td>renverse <b>1</b> Roi</td></tr>
      <tr><td><b>La Foule</b><br><span class="hi">nombres 2–9</span></td><td><b>Émeute</b> — un brelan (trois cartes 2–9 de même valeur)</td><td>renverse <b>1</b> Roi</td></tr>
      <tr><td></td><td><b>Révolte</b> — une suite de même couleur de 2–9, de <b>4 / 5 / 6+</b></td><td>renverse <b>1 / 2 / 3</b> Rois</td></tr>
    </table>
    <p>La <b>Révolte</b> est une suite de <b>cartes numériques consécutives 2–9 de même couleur</b> — sans figure à l’intérieur de la suite — toutes dirigées vers les Rois d’<b>un seul joueur</b>. Un Évêque peut mener la marche pour l’ambiance, mais ne compte pas.</p>

    <h2>La Deuxième Vague <span style="font-weight:400;text-transform:none;color:var(--muted);font-size:12px">(l’ambition du Valet)</span></h2>
    <ul>
      <li>Quand <b>tous les vrais Rois</b> sont tombés, les ambitieux <b>Valets se dressent aussitôt en Rois promus</b> — chacun révèle ses Valets en même temps.</li>
      <li>Un seul <b>Général</b> peut écraser un Roi promu (défaussé).</li>
      <li><b>Joker + Général</b> est un assassinat éclair : éliminez un Roi promu et réclamez le Valet comme <b>Roi déchu promu</b>.</li>
      <li>Les Évêques, les paires et les Révoltes renversent les Rois promus selon leurs règles normales.</li>
    </ul>

    <h2>Le Grand Décompte <span style="font-weight:400;text-transform:none;color:var(--muted);font-size:12px">(score)</span></h2>
    <table>
      <tr><th>Exploit / pénalité</th><th style="text-align:right">Points</th></tr>
      <tr><td>Roi déchu dans votre pile de victoire</td><td class="pts">+2</td></tr>
      <tr><td>Roi déchu promu (un monarque mineur)</td><td class="pts">+1</td></tr>
      <tr><td>Dame survivante en main</td><td class="pts">+1</td></tr>
      <tr><td>4 Rois debout devant vous (ou un coup)</td><td class="pts">+10</td></tr>
      <tr><td>Chaque Roi / Roi promu debout sur la table</td><td class="pts">−1 à tous</td></tr>
      <tr><td>Surpris avec un Roi au décompte</td><td class="pts">manche = 0</td></tr>
    </table>
    <p><b>Coup des Généraux :</b> détenez <b>les 4 Généraux</b> lorsque le <b>4e Roi</b> est joué et vous pouvez réclamer les <b>+10</b> à la place de celui qui a dressé les Rois.</p>

    <h2>La Fin d’une Manche</h2>
    <p>Une manche se termine lorsque <b>soit</b> un joueur a <b>4 Rois debout</b> (une dynastie tyrannique est assurée — <i>une défaite pour la société, une victoire pour l’individu</i>), <b>soit</b> la <b>pioche a été parcourue une fois entièrement</b>. On additionne les points, on rebat les cartes, manche suivante. <b>Le premier à 50 gagne</b> — ou <b>20</b> dans une Partie Courte (choisissez la durée dans les Réglages). Les seuils de « quatre » restent à quatre même dans les parties à 5–6 joueurs.</p>`;

/* ============================================================
   runtime
   ============================================================ */
window.STR = S;
window.LANG = (function(){ const s=localStorage.getItem('nokings.lang'); return (s && S[s]) ? s : 'en'; })();

window.t = function(key, vars){
  const tbl = S[window.LANG] || S.en;
  let v = tbl[key]; if(v==null) v = S.en[key]; if(v==null) return key;
  if(typeof v==='function') return v(vars||{});
  if(vars) v = v.replace(/\{(\w+)\}/g, (m,k)=> (vars[k]!=null?vars[k]:m));
  return v;
};

window.setLang = function(l){
  window.LANG = S[l] ? l : 'en';
  localStorage.setItem('nokings.lang', window.LANG);
  document.documentElement.lang = window.LANG;
  if(typeof window.applyI18n==='function') window.applyI18n();
  if(typeof window.onLangChange==='function') window.onLangChange();
};

})();
