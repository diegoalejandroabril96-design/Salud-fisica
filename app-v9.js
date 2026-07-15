// Version 9: intelligent adaptation, radar profile and single motion diagrams.
const DAYS = [
  { day: "Lunes", title: "Superior base", focus: "Pecho, espalda y abdomen", split: "SUPERIOR", exercises: ["Flexiones inclinadas", "Remo con pesas", "Press de hombros", "Curl de biceps", "Plancha", "Dead bug"] },
  { day: "Martes", title: "Inferior base", focus: "Piernas, gluteos y estabilidad", split: "INFERIOR", exercises: ["Sentadilla con pesas", "Zancada atras", "Peso muerto rumano", "Puente de gluteos", "Elevacion de talones", "Burpee adaptado"] },
  { day: "Miercoles", title: "Superior control", focus: "Espalda, pecho y core de pie", split: "SUPERIOR", exercises: ["Remo inclinado", "Flexiones", "Press de hombros", "Rueda abdominal corta", "Rodilla-codo lateral", "Escaladores lentos"] },
  { day: "Jueves", title: "Inferior potencia", focus: "Piernas, gluteos y HIIT", split: "INFERIOR", exercises: ["Sentadilla con pesas", "Zancada atras", "Peso muerto rumano", "Puente de gluteos", "Elevacion de talones", "Rodillas arriba"] },
  { day: "Viernes", title: "Superior resistencia", focus: "Pecho, espalda, brazos y core", split: "SUPERIOR", exercises: ["Flexiones inclinadas", "Remo con pesas", "Press de hombros", "Curl de biceps", "Dead bug", "Burpee adaptado"] },
  { day: "Sabado", title: "Inferior resistencia", focus: "Piernas, gluteos y acondicionamiento", split: "INFERIOR", exercises: ["Sentadilla sin peso", "Zancada atras", "Peso muerto rumano", "Puente de gluteos", "Elevacion de talones", "Escaladores lentos"] }
];

const INFO = {
  "Marcha activa": ["Marcha elevando rodillas | Alterna rodillas hasta una altura comoda y mueve el brazo contrario. Pisa suave y mantente erguido.", "march"],
  "Cuerda suave": ["Saltos bajos y silenciosos | Gira la cuerda con las munecas, salta apenas unos centimetros y cae suave sobre la parte delantera de los pies.", "rope"],
  "Sentadilla con pesas": ["Cadera atras y pecho alto | Pesas junto al cuerpo. Baja como si fueras a sentarte y sube empujando el suelo.", "squat"],
  "Sentadilla sin peso": ["Cadera atras y rodillas alineadas | Separa los pies al ancho de hombros, baja con control y sube apretando gluteos.", "squat"],
  "Flexiones inclinadas": ["Cuerpo recto de cabeza a talones | Manos sobre una superficie firme. Dobla codos a unos 45 grados y acerca el pecho.", "push"],
  "Flexiones": ["Baja el pecho, no la cadera | Aprieta abdomen y gluteos. Apoya rodillas si no puedes mantener el cuerpo recto.", "push"],
  "Remo con pesas": ["Codos hacia atras | Torso inclinado y espalda recta. Lleva las pesas hacia las costillas sin encoger hombros.", "row"],
  "Remo inclinado": ["Junta los omoplatos | Mantén el torso estable y lleva ambos codos hacia atras con control.", "row"],
  "Puente de gluteos": ["Eleva la cadera | Pies cerca de gluteos. Empuja con talones hasta alinear hombros, cadera y rodillas.", "bridge"],
  "Plancha": ["Linea recta y abdomen firme | Apoya antebrazos y puntas de pies. Evita que la cadera caiga o quede demasiado alta.", "plank"],
  "Zancada atras": ["Paso atras y bajada vertical | Lleva un pie atras, baja con control y vuelve empujando con el pie delantero.", "lunge"],
  "Rueda abdominal corta": ["Avanza solo hasta donde controles | Desde rodillas, aprieta gluteos y abdomen; no permitas que la espalda se arquee.", "wheel"],
  "Escaladores lentos": ["Rodilla hacia el pecho | Desde plancha, acerca una rodilla al pecho sin levantar la cadera y alterna lento.", "climber"],
  "Peso muerto rumano": ["Cadera atras, espalda recta | Desliza las pesas cerca de las piernas y sube apretando gluteos.", "deadlift"],
  "Dead bug": ["Espalda baja pegada al piso | Boca arriba, extiende brazo y pierna opuestos; vuelve al centro y alterna.", "deadbug"],
  "Press de hombros": ["Pesas desde hombros hasta arriba | Aprieta abdomen y empuja verticalmente sin arquear la zona lumbar.", "press"],
  "Curl de biceps": ["Solo se mueve el antebrazo | Codos pegados al cuerpo. Sube las pesas y baja lentamente.", "curl"],
  "Rodilla-codo lateral": ["Core lateral de pie | Mano en la cabeza. Acerca rodilla y codo del mismo lado sin inclinarte hacia adelante. Alterna lados.", "standingOblique"],
  "Elevacion de talones": ["Sube y baja sobre las puntas | Mantén el cuerpo alto, pausa un segundo arriba y baja talones lentamente.", "calf"],
  "Rodillas arriba": ["Cardio vertical | Alterna rodillas con ritmo agil y aterrizaje suave. Reduce impacto marchando si lo necesitas.", "march"],
  "Movilidad completa": ["Respira lento | Mueve hombros, cadera y espalda sin dolor. Termina bajando pulsaciones.", "mobility"],
  "Burpee adaptado": ["Baja, camina atras y vuelve de pie | Apoya manos, lleva un pie y luego el otro atras, regresa caminando y ponte de pie. Salta solo si controlas.", "burpee"]
};

const EQUIPMENT = {
  "Cuerda suave": "Cuerda",
  "Rueda abdominal corta": "Rueda abdominal",
  "Sentadilla con pesas": "Pesas de 6 kg",
  "Remo con pesas": "Pesas de 6 kg",
  "Remo inclinado": "Pesas de 6 kg",
  "Peso muerto rumano": "Pesas de 6 kg",
  "Press de hombros": "Pesas de 6 kg",
  "Curl de biceps": "Pesas de 6 kg"
};

const TIME_BASED = new Set(["Plancha", "Cuerda suave", "Rodillas arriba", "Marcha activa"]);

const warmup = [
  { name: "Movilidad de hombros", duration: 40, instruction: "Circulos de hombros | De pie y con brazos sueltos, haz 5 circulos lentos hacia atras y 5 hacia delante.", art: "mobility", phase: "CALENTAMIENTO" },
  { name: "Movilidad de cuello y cadera", duration: 80, instruction: "Movimientos lentos y sin dolor | Mira a izquierda y derecha 5 veces. Luego manos en cintura y circulos de cadera por lado.", art: "hip", phase: "CALENTAMIENTO" },
  { name: "Marcha activa", duration: 90, instruction: INFO["Marcha activa"][0], art: "march", phase: "CALENTAMIENTO" },
  { name: "Sentadilla sin peso", duration: 90, instruction: "Sentadilla de preparacion | Pies al ancho de hombros, cadera atras, baja solo hasta donde controles.", art: "squat", phase: "CALENTAMIENTO" }
];

let state = { session: [], index: 0, remaining: 0, elapsed: 0, timer: null, paused: true, sound: true, selectedDay: todayIndex(), repsSaved: false, effort: 0, pauseCount: 0 };
const $ = id => document.getElementById(id);
const progress = JSON.parse(localStorage.getItem("fuerte-progress") || "{}");
const settings = JSON.parse(localStorage.getItem("fuerte-settings") || '{"time":"18:00","sound":true}');
const repHistory = JSON.parse(localStorage.getItem("fuerte-reps") || "{}");
const adaptation = JSON.parse(localStorage.getItem("fuerte-adaptation") || "{}");

function todayIndex() { const d = new Date().getDay(); return d === 0 ? 5 : d - 1; }
function dateKey() { return new Date().toISOString().slice(0, 10); }

const POSES = {
  mobility: {
    a: { head:[155,44], torso:[155,92], hip:[155,135], arms:[[155,86,101,69],[155,86,209,69]], legs:[[155,135,118,187],[155,135,192,187]], cues:["Hombros sueltos","Cuello largo"] },
    b: { head:[155,44], torso:[155,92], hip:[155,135], arms:[[155,86,93,116],[155,86,217,116]], legs:[[155,135,118,187],[155,135,192,187]], cues:["Circulo lento","Sin dolor"] },
    arrow: "rotar"
  },
  hip: {
    a: { head:[155,44], torso:[155,92], hip:[155,135], arms:[[155,92,111,118],[155,92,199,118]], legs:[[155,135,119,187],[155,135,191,187]], cues:["Manos en cintura","Torso alto"] },
    b: { head:[148,44], torso:[150,92], hip:[170,135], arms:[[150,92,110,114],[150,92,202,120]], legs:[[170,135,121,187],[170,135,198,187]], cues:["Cadera dibuja circulos","Control"] },
    arrow: "rotar"
  },
  march: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,84,116,58],[155,84,202,118]], legs:[[155,132,116,188],[155,132,202,155]], cues:["Rodilla arriba","Pisa suave"] },
    b: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,84,108,118],[155,84,197,58]], legs:[[155,132,108,155],[155,132,196,188]], cues:["Alterna brazos","Ritmo"] },
    arrow: "alternar"
  },
  squat: {
    a: { head:[155,40], torso:[155,88], hip:[155,132], arms:[[155,88,113,111],[155,88,197,111]], legs:[[155,132,119,188],[155,132,191,188]], cues:["Pecho alto","Pies firmes"] },
    b: { head:[155,58], torso:[155,103], hip:[155,145], arms:[[155,103,105,127],[155,103,205,127]], legs:[[155,145,105,168],[155,145,205,168]], cues:["Cadera atras","Rodillas alineadas"] },
    arrow: "bajar/subir", load: true
  },
  push: {
    a: { head:[85,88], torso:[150,105], hip:[215,122], arms:[[118,98,78,165],[118,98,128,165]], legs:[[215,122,255,170],[215,122,270,160]], cues:["Cuerpo recto","Manos firmes"] },
    b: { head:[86,117], torso:[150,128], hip:[214,132], arms:[[120,124,82,165],[120,124,130,165]], legs:[[214,132,255,170],[214,132,270,160]], cues:["Codos 45 grados","Pecho baja"] },
    arrow: "empujar"
  },
  row: {
    a: { head:[113,70], torso:[158,100], hip:[191,132], arms:[[155,97,139,155],[155,97,202,142]], legs:[[191,132,155,188],[191,132,223,188]], cues:["Espalda recta","Pesas abajo"], load: true },
    b: { head:[113,70], torso:[158,100], hip:[191,132], arms:[[155,97,113,113],[155,97,199,104]], legs:[[191,132,155,188],[191,132,223,188]], cues:["Codos atras","Omoplatos juntos"], load: true },
    arrow: "tirar"
  },
  bridge: {
    a: { head:[64,145], torso:[130,145], hip:[190,145], arms:[[112,145,78,178],[112,145,143,178]], legs:[[190,145,229,178],[190,145,260,178]], cues:["Pies apoyados","Talones firmes"] },
    b: { head:[64,145], torso:[130,111], hip:[190,111], arms:[[112,121,80,178],[112,121,145,178]], legs:[[190,111,229,178],[190,111,260,178]], cues:["Cadera arriba","Gluteos activos"] },
    arrow: "elevar"
  },
  plank: {
    a: { head:[69,108], torso:[148,112], hip:[224,116], arms:[[115,111,76,169],[115,111,137,169]], legs:[[224,116,260,170],[224,116,275,158]], cues:["Linea recta","Abdomen firme"] },
    b: { head:[69,108], torso:[148,112], hip:[224,116], arms:[[115,111,76,169],[115,111,137,169]], legs:[[224,116,260,170],[224,116,275,158]], cues:["No hundir cadera","Respira"] },
    arrow: "mantener"
  },
  lunge: {
    a: { head:[155,42], torso:[155,89], hip:[155,132], arms:[[155,90,113,116],[155,90,197,116]], legs:[[155,132,120,188],[155,132,195,188]], cues:["De pie","Mirada al frente"] },
    b: { head:[155,55], torso:[155,101], hip:[155,142], arms:[[155,101,111,125],[155,101,199,125]], legs:[[155,142,94,171],[155,142,207,169]], cues:["Paso atras","Baja vertical"] },
    arrow: "paso atras"
  },
  wheel: {
    a: { head:[105,79], torso:[142,111], hip:[170,145], arms:[[139,110,206,151],[139,110,218,151]], legs:[[170,145,129,188],[170,145,194,188]], cues:["Rodillas apoyadas","Abdomen firme"] },
    b: { head:[76,96], torso:[134,122], hip:[190,142], arms:[[135,121,236,155],[135,121,248,155]], legs:[[190,142,153,188],[190,142,214,188]], cues:["Avance corto","Espalda neutra"] },
    arrow: "rodar"
  },
  climber: {
    a: { head:[72,105], torso:[150,111], hip:[225,118], arms:[[115,111,76,169],[115,111,137,169]], legs:[[225,118,173,171],[225,118,270,162]], cues:["Plancha alta","Cadera estable"] },
    b: { head:[72,105], torso:[150,111], hip:[225,118], arms:[[115,111,76,169],[115,111,137,169]], legs:[[225,118,249,171],[225,118,162,153]], cues:["Rodilla al pecho","Alterna"] },
    arrow: "alternar"
  },
  deadlift: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,91,116,148],[155,91,194,148]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Pesas cerca","Pecho alto"], load: true },
    b: { head:[128,73], torso:[160,107], hip:[193,136], arms:[[160,107,122,166],[160,107,206,166]], legs:[[193,136,135,188],[193,136,211,188]], cues:["Cadera atras","Espalda recta"], load: true },
    arrow: "bisagra"
  },
  deadbug: {
    a: { head:[82,137], torso:[150,137], hip:[216,137], arms:[[150,137,110,83],[150,137,195,83]], legs:[[216,137,168,188],[216,137,249,188]], cues:["Espalda al piso","Centro firme"] },
    b: { head:[82,137], torso:[150,137], hip:[216,137], arms:[[150,137,75,122],[150,137,205,81]], legs:[[216,137,150,171],[216,137,285,162]], cues:["Opuestos se extienden","Lento"] },
    arrow: "alternar"
  },
  press: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,86,118,94],[155,86,192,94]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Pesas en hombros","Abdomen firme"], load: true },
    b: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,86,118,29],[155,86,192,29]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Empuja arriba","No arquees espalda"], load: true },
    arrow: "subir"
  },
  curl: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,88,113,145],[155,88,197,145]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Codos pegados","Hombros quietos"], load: true },
    b: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,88,116,101],[155,88,194,101]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Sube controlado","Baja lento"], load: true },
    arrow: "flexionar"
  },
  standingOblique: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,82,121,50],[155,82,197,112]], legs:[[155,132,119,188],[155,132,191,188]], cues:["De pie","Mano en cabeza"] },
    b: { head:[143,52], torso:[148,96], hip:[157,135], arms:[[148,91,116,63],[148,91,190,119]], legs:[[157,135,119,188],[157,135,204,150]], cues:["Rodilla y codo se acercan","Core lateral"] },
    arrow: "cerrar lado"
  },
  calf: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,89,118,116],[155,89,192,116]], legs:[[155,132,120,188],[155,132,190,188]], cues:["Talones abajo","Cuerpo alto"] },
    b: { head:[155,34], torso:[155,80], hip:[155,124], arms:[[155,81,118,108],[155,81,192,108]], legs:[[155,124,120,183],[155,124,190,183]], cues:["Sube a puntas","Pausa arriba"] },
    arrow: "elevar"
  },
  rope: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,88,105,117],[155,88,205,117]], legs:[[155,132,123,188],[155,132,187,188]], cues:["Saltos bajos","Munecas giran"], rope: true },
    b: { head:[155,35], torso:[155,81], hip:[155,125], arms:[[155,81,105,111],[155,81,205,111]], legs:[[155,125,126,180],[155,125,184,180]], cues:["Cae suave","Ritmo"], rope: true },
    arrow: "ritmo"
  },
  burpee: {
    a: { head:[155,42], torso:[155,88], hip:[155,132], arms:[[155,88,112,124],[155,88,198,124]], legs:[[155,132,120,188],[155,132,190,188]], cues:["De pie","Control"] },
    b: { head:[82,111], torso:[150,122], hip:[222,132], arms:[[117,119,77,172],[117,119,139,172]], legs:[[222,132,255,174],[222,132,276,159]], cues:["Camina atras","Sin salto obligatorio"] },
    arrow: "bajar"
  }
};

function restArt() {
  return `<svg viewBox="0 0 320 220" class="coach-svg"><circle cx="160" cy="102" r="70" fill="#fff" stroke="#111" stroke-width="9"/><path d="M160 54v50l36 23" fill="none" stroke="#111" stroke-width="12" stroke-linecap="round"/><path d="M118 190h84" stroke="#111" stroke-width="8" stroke-linecap="round"/><text x="160" y="35" text-anchor="middle" class="svg-label">RESPIRA Y REGISTRA</text></svg>`;
}

function figure(pose, x = 0, ghost = false) {
  const [hx, hy] = pose.head, [tx, ty] = pose.torso, [px, py] = pose.hip;
  const limb = ([x1, y1, x2, y2]) => `<path d="M${x1 + x} ${y1} L${x2 + x} ${y2}" class="limb"/>`;
  const joint = ([cx, cy]) => `<circle cx="${cx + x}" cy="${cy}" r="6" class="joint"/>`;
  const equipment = pose.load ? `<g class="load"><rect x="${pose.arms[0][2] + x - 9}" y="${pose.arms[0][3] - 7}" width="18" height="14" rx="3"/><rect x="${pose.arms[1][2] + x - 9}" y="${pose.arms[1][3] - 7}" width="18" height="14" rx="3"/></g>` : "";
  const rope = pose.rope ? `<path d="M${tx + x - 65} 58C${tx + x - 120} 100 ${tx + x - 100} 180 ${tx + x - 42} 198M${tx + x + 65} 58C${tx + x + 120} 100 ${tx + x + 100} 180 ${tx + x + 42} 198" class="rope-line"/>` : "";
  const cueText = (pose.cues || []).map((cue, i) => `<text x="${x + 155}" y="${204 + i * 13}" text-anchor="middle" class="mini-cue">${cue}</text>`).join("");
  return `<g class="${ghost ? "figure-ghost" : "figure-main"}">
    ${rope}
    <ellipse cx="${tx + x}" cy="${(ty + py) / 2}" rx="24" ry="${Math.max(25, (py - ty) / 2 + 16)}" class="torso"/>
    <circle cx="${hx + x}" cy="${hy}" r="20" class="head"/>
    ${pose.arms.map(limb).join("")}${pose.legs.map(limb).join("")}
    ${[pose.torso, pose.hip, ...pose.arms.map(a => [a[2], a[3]]), ...pose.legs.map(l => [l[2], l[3]])].map(joint).join("")}
    ${equipment}${cueText}
  </g>`;
}

function motionPath(pose) {
  const from = pose.a.hip || pose.a.torso, to = pose.b.hip || pose.b.torso;
  const mx = (from[0] + to[0]) / 2 + 15, my = Math.min(from[1], to[1]) - 28;
  return `<path d="M${from[0]} ${from[1]} Q${mx} ${my} ${to[0]} ${to[1]}" class="motion-path" marker-end="url(#arrow)"/>`;
}

function art(type, rest = false) {
  if (rest) return restArt();
  const pose = POSES[type] || POSES.mobility;
  return `<svg viewBox="0 0 430 260" class="coach-svg single-demo" aria-label="Demostracion visual del ejercicio">
    <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 Z" fill="#111"/></marker></defs>
    <rect x="12" y="8" width="406" height="240" rx="24" class="panel"/>
    <text x="30" y="34" class="svg-label">MOVIMIENTO GUIADO</text>
    <text x="400" y="34" text-anchor="end" class="svg-label">${pose.arrow}</text>
    <g transform="translate(60 18) scale(.98)">
      ${figure(pose.a, 0, true)}
      ${motionPath(pose)}
      ${figure(pose.b, 0)}
      <path d="M36 192h248" class="ground"/>
    </g>
  </svg>`;
}

function buildSession(dayIndex) {
  const ropeBlock = [
    { name: "Cuerda · ritmo suave", duration: 120, instruction: "Encuentra el ritmo | Saltos bajos, respiracion comoda y hombros relajados.", art: "rope", phase: "CARDIO 1/3" },
    { name: "Cuerda · ritmo medio", duration: 120, instruction: "Sube la velocidad | Mantén saltos pequenos y un ritmo que te permita decir una frase corta.", art: "rope", phase: "CARDIO 2/3" },
    { name: "Cuerda · minuto vigoroso", duration: 60, instruction: "Ultimo minuto mas intenso, no maximo | Aumenta el ritmo sin perder tecnica. Cambia por marcha rapida sin cuerda si sientes molestias.", art: "rope", phase: "CARDIO 3/3" },
    { name: "¿Continuar o terminar?", duration: 0, instruction: "Evalua tu esfuerzo | Desde 60% de esfuerzo percibido puedes registrar la sesion, o continuar con fuerza y HIIT.", art: "rope", phase: "CONTROL", checkpoint: true }
  ];
  const rounds = [1, 2].flatMap(round => DAYS[dayIndex].exercises.flatMap(name => {
    const [instruction, artType] = INFO[name], target = suggestedTarget(name);
    return [
      { name, duration: 12, instruction, art: artType, phase: "PREPÁRATE", prep: true, round, target },
      { name, duration: adaptiveWorkDuration(name), instruction, art: artType, phase: name === "Burpee adaptado" || name === "Rodillas arriba" ? "HIIT" : "TRABAJO", work: true, round, target },
      { name: "Registra y descansa", duration: adaptiveRestDuration(name), instruction: "Anota tu resultado y respira. El siguiente ejercicio aparece abajo.", art: "rest", phase: "DESCANSO", rest: true, exerciseName: name, round, target }
    ];
  }));
  return [...warmup, ...ropeBlock, ...rounds, { name: "Vuelta a la calma", duration: 300, instruction: "Camina suave, respira lento y estira sin dolor.", art: "mobility", phase: "RECUPERACION" }];
}

function lastResult(name) {
  const entries = repHistory[name] || [];
  return entries.length ? entries[entries.length - 1].value : 0;
}
function exerciseStats(name) {
  const records = adaptation[name] || [];
  return records.length ? records[records.length - 1] : null;
}
function suggestedTarget(name) {
  const last = lastResult(name);
  if (!last) return TIME_BASED.has(name) ? 30 : 10;
  const stats = exerciseStats(name);
  if (stats?.difficulty === "hard") return last;
  if (stats?.difficulty === "easy") return last + (last < 12 ? 2 : 3);
  return last + (last < 12 ? 1 : 2);
}
function adaptiveWorkDuration(name) {
  const stats = exerciseStats(name);
  if (stats?.difficulty === "hard" || stats?.pauseCount > 1) return 40;
  if (stats?.difficulty === "easy" && (stats.value || 0) >= suggestedTarget(name)) return 50;
  return 45;
}
function adaptiveRestDuration(name) {
  const stats = exerciseStats(name);
  if (stats?.difficulty === "hard" || stats?.pauseCount > 1) return 40;
  if (stats?.difficulty === "easy") return 25;
  return 30;
}
function unitFor(name) { return TIME_BASED.has(name) ? "seg" : "reps"; }
function equipmentForDay(dayIndex) {
  return [...new Set(["Cuerda", ...DAYS[dayIndex].exercises.map(name => EQUIPMENT[name] || "Peso corporal")])];
}
function renderPreparation() {
  const day = DAYS[state.selectedDay];
  $("prepareTitle").textContent = `${day.day} · ${day.title}`;
  $("prepareEquipment").innerHTML = equipmentForDay(state.selectedDay).map(x => `<span>${x}</span>`).join("");
  $("prepareExercises").innerHTML = `<article class="prepare-item"><b>♥</b><div><strong>Cuerda progresiva diaria</strong><small>2 min suave · 2 min medio · 1 min fuerte</small></div><span class="target-pill">5 min</span></article>` + day.exercises.map((name, i) => {
    const last = lastResult(name), target = suggestedTarget(name), unit = unitFor(name);
    return `<article class="prepare-item"><b>${i + 1}</b><div><strong>${name}</strong><small>${last ? `Anterior: ${last} ${unit}` : "Sin registro anterior"}</small></div><span class="target-pill">Meta ${target} ${unit}</span></article>`;
  }).join("");
}

function renderHome() {
  const day = DAYS[state.selectedDay];
  $("todayLabel").textContent = state.selectedDay === todayIndex() ? `HOY · ${day.day.toUpperCase()}` : day.day.toUpperCase();
  $("todayTitle").textContent = day.title;
  $("todayFocus").textContent = `${day.split} · ${day.focus}`;
  const keys = Object.keys(progress).filter(k => progress[k]?.completed);
  $("minutesValue").textContent = keys.reduce((sum, k) => sum + (progress[k].minutes || 30), 0);
  $("weekValue").textContent = `${weekCount(keys)}/6`;
  $("streakValue").textContent = streak(keys);
  renderCoachPanel(keys);
  $("weekPlan").innerHTML = DAYS.map((d, i) => {
    const done = keys.some(k => progress[k].dayIndex === i && isThisWeek(k));
    return `<article class="day-card ${i === todayIndex() ? "today" : ""} ${done ? "done" : ""}">
      <div class="day-dot">${done ? "✓" : d.day[0]}</div><div><strong>${d.day} · ${d.title}</strong><small>${d.split} · ${d.focus}</small></div>
      <button data-day="${i}">${i === state.selectedDay ? "Elegido" : "Ver"}</button></article>`;
  }).join("");
  document.querySelectorAll("[data-day]").forEach(b => b.onclick = () => { state.selectedDay = +b.dataset.day; renderHome(); scrollTo(0, 0); });
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function average(values) { return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0; }
function progressProfile(keys) {
  const records = Object.values(repHistory).flat();
  const adaptRecords = Object.values(adaptation).flat();
  const weekDone = weekCount(keys);
  const recentMinutes = keys.slice(-6).reduce((sum, k) => sum + (progress[k]?.minutes || 0), 0);
  const repValues = records.map(r => Number(r.value) || 0).filter(Boolean);
  const hardCount = adaptRecords.filter(r => r.difficulty === "hard").length;
  const easyCount = adaptRecords.filter(r => r.difficulty === "easy").length;
  const pauses = adaptRecords.reduce((sum, r) => sum + (r.pauseCount || 0), 0);
  const cardio = clamp((recentMinutes / 180) * 100, 8, 100);
  const strength = clamp((average(repValues) / 18) * 100, 8, 100);
  const consistency = clamp((weekDone / 6) * 100, 8, 100);
  const recovery = clamp(100 - pauses * 6 - hardCount * 3, 12, 100);
  const technique = clamp(70 + easyCount * 3 - hardCount * 5 - pauses * 4, 10, 100);
  const progression = clamp(records.length * 7 + easyCount * 5, 8, 100);
  return [
    { label: "Cardio", value: Math.round(cardio) },
    { label: "Fuerza", value: Math.round(strength) },
    { label: "Constancia", value: Math.round(consistency) },
    { label: "Tecnica", value: Math.round(technique) },
    { label: "Recuperacion", value: Math.round(recovery) },
    { label: "Progreso", value: Math.round(progression) }
  ];
}
function radarPoints(items, radiusScale = 1) {
  const cx = 130, cy = 118, maxR = 78 * radiusScale;
  return items.map((item, i) => {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / items.length);
    const r = maxR * (item.value / 100);
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(" ");
}
function axisPoints(items, radius = 78) {
  const cx = 130, cy = 118;
  return items.map((_, i) => {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / items.length);
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, angle];
  });
}
function renderCoachPanel(keys) {
  const items = progressProfile(keys);
  const total = Math.round(average(items.map(x => x.value)));
  const axes = axisPoints(items);
  $("progressRadar").innerHTML = `
    <polygon points="${axisPoints(items, 78).map(p => `${p[0]},${p[1]}`).join(" ")}" class="radar-grid"/>
    <polygon points="${axisPoints(items, 52).map(p => `${p[0]},${p[1]}`).join(" ")}" class="radar-grid inner"/>
    ${axes.map((p, i) => `<line x1="130" y1="118" x2="${p[0]}" y2="${p[1]}" class="radar-axis"/><text x="${130 + Math.cos(p[2]) * 104}" y="${122 + Math.sin(p[2]) * 102}" text-anchor="middle" class="radar-label">${items[i].label}</text>`).join("")}
    <polygon points="${radarPoints(items)}" class="radar-shape"/>
    <circle cx="130" cy="118" r="30" class="radar-core"/><text x="130" y="114" text-anchor="middle" class="radar-score">${total}</text><text x="130" y="132" text-anchor="middle" class="radar-small">score</text>
  `;
  const top = [...items].sort((a, b) => b.value - a.value)[0];
  const low = [...items].sort((a, b) => a.value - b.value)[0];
  $("coachHeadline").textContent = total >= 75 ? "Vas fuerte y estable" : total >= 45 ? "Buen impulso, sigamos afinando" : "Primeras bases del progreso";
  $("coachInsight").textContent = `Tu punto fuerte actual es ${top.label.toLowerCase()} (${top.value}). El siguiente enfoque inteligente es ${low.label.toLowerCase()} (${low.value}).`;
  $("coachTraits").innerHTML = items.map(x => `<span><b>${x.value}</b>${x.label}</span>`).join("");
}
function isThisWeek(key) {
  const d = new Date(key + "T12:00:00"), now = new Date(), start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7)); start.setHours(0,0,0,0);
  return d >= start;
}
function weekCount(keys) { return new Set(keys.filter(isThisWeek).map(k => progress[k].dayIndex)).size; }
function streak(keys) {
  let count = 0, d = new Date();
  while (true) { const key = d.toISOString().slice(0,10); if (keys.includes(key)) count++; else if (count || key !== dateKey()) break; d.setDate(d.getDate()-1); }
  return count;
}
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === id));
  document.body.classList.toggle("focus-mode", id !== "homeView");
  scrollTo(0, 0);
}

function openPreparation() { renderPreparation(); showView("prepareView"); }
function startWorkout() {
  state.session = buildSession(state.selectedDay); state.index = 0; state.elapsed = 0; state.paused = false; state.effort = 0;
  document.querySelectorAll("[data-effort]").forEach(x => x.classList.remove("selected"));
  $("finishEarlyBtn").disabled = true;
  $("effortMessage").textContent = "Desde 60% puedes terminar y registrar la sesion como cumplida.";
  loadStep(); showView("workoutView"); startTick(); notify("Entrenamiento iniciado", `Comienza: ${state.session[0].name}`);
}
function loadStep() {
  const step = state.session[state.index]; state.remaining = step.duration; state.repsSaved = false;
  state.pauseCount = 0;
  if (step.checkpoint) state.paused = true;
  $("phaseBadge").textContent = step.phase; $("exerciseName").textContent = step.name;
  $("exerciseArt").innerHTML = art(step.art, step.rest);
  const parts = step.instruction.split(" | ");
  $("instruction").innerHTML = parts.length > 1 ? `<strong>${parts[0]}</strong><span>${parts[1]}</span>` : `<span>${step.instruction}</span>`;
  $("workoutPosition").textContent = step.round ? `RONDA ${step.round} DE 2` : `${state.index + 1} DE ${state.session.length}`;
  $("exerciseMeta").textContent = step.target ? `Objetivo sugerido: ${step.target} ${unitFor(step.exerciseName || step.name)}${step.prep ? " · el tiempo aun no cuenta" : ""}` : "";
  $("repsPanel").classList.toggle("active", !!step.rest);
  $("checkpointPanel").classList.toggle("active", !!step.checkpoint);
  $("workoutView").classList.toggle("at-checkpoint", !!step.checkpoint);
  if (step.rest) setupRepsPanel(step);
  $("nextExercise").textContent = nextWorkName();
  $("skipRestBtn").style.visibility = step.rest ? "visible" : "hidden";
  updateTimer();
  $("totalProgress").style.width = `${Math.min(100, state.elapsed / 1800 * 100)}%`;
  if (state.index > 0) notify(step.phase, step.name); beep(step.rest ? 330 : 660);
}
function startTick() {
  clearInterval(state.timer); state.timer = setInterval(() => {
    if (state.paused) return;
    if (state.session[state.index].checkpoint) return;
    state.remaining--; if (!state.session[state.index].prep) state.elapsed++; updateTimer();
    if (state.remaining <= 0) nextStep();
  }, 1000);
}
function updateTimer() { $("timer").textContent = `${String(Math.floor(state.remaining/60)).padStart(2,"0")}:${String(state.remaining%60).padStart(2,"0")}`; }
function nextStep() {
  saveCurrentReps();
  if (state.index >= state.session.length - 1) return completeWorkout();
  state.index++; loadStep();
}
function prevStep() { saveCurrentReps(); if (state.index > 0) { state.index--; loadStep(); } }
function completeWorkout(early = false) {
  clearInterval(state.timer);
  const minutes = Math.max(1, Math.round(state.elapsed / 60));
  const effort = early ? state.effort : 100;
  progress[dateKey()] = { completed: effort >= 60, minutes, dayIndex: state.selectedDay, rating: "", effort, early };
  localStorage.setItem("fuerte-progress", JSON.stringify(progress));
  $("completeSummary").textContent = early
    ? `${DAYS[state.selectedDay].title} · ${minutes} minutos reales · esfuerzo percibido ${effort}% · sesion cumplida`
    : `${DAYS[state.selectedDay].title} · rutina completa · ${minutes} minutos registrados`;
  showView("completeView"); notify("Sesion completada", "Tu progreso quedo guardado.");
}
function setupRepsPanel(step) {
  const name = step.exerciseName, previous = lastResult(name), unit = unitFor(name);
  const stats = exerciseStats(name);
  $("previousReps").textContent = previous ? `Anterior: ${previous} ${unit}` : "Primer registro";
  const adjustment = stats?.difficulty === "hard" ? "ajuste: baja carga" : stats?.difficulty === "easy" ? "ajuste: sube reto" : "ajuste: estable";
  $("suggestedReps").textContent = `Objetivo: ${step.target} ${unit} · ${adjustment}`;
  $("repsInput").value = previous || step.target;
  $("saveRepsBtn").textContent = "Guardar resultado";
}
function saveCurrentReps() {
  const step = state.session[state.index];
  if (!step?.rest || state.repsSaved) return;
  const value = Math.max(0, Number($("repsInput").value) || 0);
  const target = step.target || suggestedTarget(step.exerciseName);
  const difficulty = value >= target + 2 && state.pauseCount === 0 ? "easy" : value < Math.max(1, target - 2) || state.pauseCount > 1 ? "hard" : "ok";
  if (!repHistory[step.exerciseName]) repHistory[step.exerciseName] = [];
  repHistory[step.exerciseName].push({ date: dateKey(), value, round: step.round });
  localStorage.setItem("fuerte-reps", JSON.stringify(repHistory));
  if (!adaptation[step.exerciseName]) adaptation[step.exerciseName] = [];
  adaptation[step.exerciseName].push({ date: dateKey(), value, target, round: step.round, pauseCount: state.pauseCount, difficulty });
  localStorage.setItem("fuerte-adaptation", JSON.stringify(adaptation));
  state.repsSaved = true; $("saveRepsBtn").textContent = "Resultado guardado ✓";
}
function nextWorkName() {
  const next = state.session.slice(state.index + 1).find(x => x.work || x.prep);
  return next ? `Siguiente: ${next.name}` : "";
}
function beep(freq) {
  if (!state.sound) return;
  try { const ctx = new AudioContext(), o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = freq; g.gain.value = .08; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + .12); } catch {}
}
function notify(title, body) {
  if ("Notification" in window && Notification.permission === "granted") navigator.serviceWorker?.ready.then(r => r.showNotification(title, { body, icon: "icon.svg", tag: "fuerte" }));
}
function scheduleReminder() {
  clearTimeout(window.reminderTimer);
  const [h,m] = settings.time.split(":").map(Number), next = new Date(); next.setHours(h,m,0,0); if (next <= new Date()) next.setDate(next.getDate()+1);
  window.reminderTimer = setTimeout(() => { notify("Es hora de entrenar", `${DAYS[todayIndex()].title}: tu sesion de 30 minutos esta lista.`); scheduleReminder(); }, next - new Date());
}

$("startBtn").onclick = openPreparation;
$("prepareBackBtn").onclick = () => showView("homeView");
$("beginBtn").onclick = startWorkout;
$("pauseBtn").onclick = () => {
  const step = state.session[state.index];
  state.paused = !state.paused;
  if (state.paused && step?.work) state.pauseCount++;
  $("pauseBtn").textContent = state.paused ? "Continuar" : "Pausar";
};
$("nextBtn").onclick = nextStep; $("prevBtn").onclick = prevStep; $("skipRestBtn").onclick = nextStep;
$("minusRepBtn").onclick = () => $("repsInput").value = Math.max(0, Number($("repsInput").value || 0) - 1);
$("plusRepBtn").onclick = () => $("repsInput").value = Number($("repsInput").value || 0) + 1;
$("saveRepsBtn").onclick = saveCurrentReps;
$("continueRoutineBtn").onclick = () => { state.paused = false; nextStep(); };
$("finishEarlyBtn").onclick = () => completeWorkout(true);
document.querySelectorAll("[data-effort]").forEach(button => button.onclick = () => {
  state.effort = Number(button.dataset.effort);
  document.querySelectorAll("[data-effort]").forEach(x => x.classList.toggle("selected", x === button));
  $("finishEarlyBtn").disabled = state.effort < 60;
  $("effortMessage").textContent = state.effort >= 60 ? `Esfuerzo ${state.effort}%: puedes registrar la sesion como cumplida.` : "Con 40% puedes descansar, pero la sesion no se marcara como cumplida.";
});
$("exitBtn").onclick = () => {
  const percent = Math.round(state.elapsed / 1800 * 100);
  if (percent >= 60 && confirm(`Llevas ${percent}% del tiempo planeado. ¿Terminar y registrar la sesion como cumplida?`)) { state.effort = Math.max(60, percent); completeWorkout(true); return; }
  if (confirm("¿Salir sin marcar la sesion como cumplida?")) { clearInterval(state.timer); showView("homeView"); }
};
$("doneBtn").onclick = () => { showView("homeView"); renderHome(); };
$("settingsBtn").onclick = () => $("settingsDialog").showModal();
$("soundBtn").onclick = () => { state.sound = !state.sound; $("soundBtn").textContent = `Sonido ${state.sound ? "✓" : "×"}`; };
$("notificationBtn").onclick = async () => { if ("Notification" in window) { const p = await Notification.requestPermission(); $("notificationBtn").textContent = p === "granted" ? "Notificaciones activadas ✓" : "Notificaciones no permitidas"; } };
$("settingsDialog").addEventListener("close", () => { settings.time = $("reminderTime").value; settings.sound = $("soundToggle").checked; state.sound = settings.sound; localStorage.setItem("fuerte-settings", JSON.stringify(settings)); scheduleReminder(); });
document.querySelectorAll("[data-rating]").forEach(b => b.onclick = () => { document.querySelectorAll("[data-rating]").forEach(x => x.classList.remove("selected")); b.classList.add("selected"); progress[dateKey()].rating = b.dataset.rating; localStorage.setItem("fuerte-progress", JSON.stringify(progress)); });

$("reminderTime").value = settings.time; $("soundToggle").checked = settings.sound; state.sound = settings.sound;
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").then(registration => registration.update());
renderHome(); scheduleReminder();
