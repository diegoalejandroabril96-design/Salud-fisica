// Version 7: balanced plan, daily progressive rope, technique silhouettes and completion checkpoint.
const DAYS = [
  { day: "Lunes", title: "Superior base", focus: "Pecho, espalda y abdomen", split: "SUPERIOR", exercises: ["Flexiones inclinadas", "Remo con pesas", "Press de hombros", "Curl de bíceps", "Plancha", "Dead bug"] },
  { day: "Martes", title: "Inferior base", focus: "Piernas, glúteos y estabilidad", split: "INFERIOR", exercises: ["Sentadilla con pesas", "Zancada atrás", "Peso muerto rumano", "Puente de glúteos", "Elevación de talones", "Burpee adaptado"] },
  { day: "Miércoles", title: "Superior control", focus: "Espalda, pecho y core lateral", split: "SUPERIOR", exercises: ["Remo inclinado", "Flexiones", "Press de hombros", "Rueda abdominal corta", "Plancha lateral", "Escaladores lentos"] },
  { day: "Jueves", title: "Inferior potencia", focus: "Piernas, glúteos y HIIT", split: "INFERIOR", exercises: ["Sentadilla con pesas", "Zancada atrás", "Peso muerto rumano", "Puente de glúteos", "Elevación de talones", "Rodillas arriba"] },
  { day: "Viernes", title: "Superior resistencia", focus: "Pecho, espalda, brazos y core", split: "SUPERIOR", exercises: ["Flexiones inclinadas", "Remo con pesas", "Press de hombros", "Curl de bíceps", "Dead bug", "Burpee adaptado"] },
  { day: "Sábado", title: "Inferior resistencia", focus: "Piernas, glúteos y acondicionamiento", split: "INFERIOR", exercises: ["Sentadilla sin peso", "Zancada atrás", "Peso muerto rumano", "Puente de glúteos", "Elevación de talones", "Escaladores lentos"] }
];

const INFO = {
  "Marcha activa": ["Calienta elevando rodillas suavemente y moviendo los brazos.", "march"],
  "Cuerda suave": ["Saltos bajos y silenciosos | Gira la cuerda con las muñecas, salta apenas unos centímetros y cae suave sobre la parte delantera de los pies.", "rope"],
  "Sentadilla con pesas": ["Cadera atrás y pecho alto | Sostén las pesas junto al cuerpo, baja como si fueras a sentarte y sube empujando el suelo.", "squat"],
  "Sentadilla sin peso": ["Cadera atrás y pecho alto | Separa los pies al ancho de hombros, baja con control y mantén las rodillas en dirección a los pies.", "squat"],
  "Flexiones inclinadas": ["Cuerpo recto de cabeza a talones | Manos sobre una mesa firme, dobla los codos a unos 45 grados y acerca el pecho.", "push"],
  "Flexiones": ["Baja el pecho, no la cadera | Aprieta abdomen y glúteos. Apoya las rodillas si no puedes mantener el cuerpo recto.", "push"],
  "Remo con pesas": ["Codos hacia atrás | Inclina el torso con espalda recta, deja caer las pesas y llévalas hacia las costillas.", "row"],
  "Remo inclinado": ["Junta los omóplatos | Mantén el torso inclinado y quieto mientras llevas ambos codos hacia atrás.", "row"],
  "Puente de glúteos": ["Eleva la cadera | Acuéstate, apoya los pies cerca de los glúteos y empuja con los talones hasta alinear hombros, cadera y rodillas.", "bridge"],
  "Plancha": ["Línea recta y abdomen firme | Apoya antebrazos y puntas de pies. Evita que la cadera caiga o quede demasiado alta.", "plank"],
  "Zancada atrás": ["Paso atrás y bajada vertical | Lleva un pie atrás, baja ambas rodillas con control y regresa empujando con el pie delantero.", "lunge"],
  "Rueda abdominal corta": ["Avanza solo hasta donde controles | Desde rodillas, aprieta glúteos y abdomen; rueda lentamente hacia delante sin arquear la espalda.", "wheel"],
  "Escaladores lentos": ["Rodilla hacia el pecho | Desde plancha, mueve una rodilla al pecho sin levantar la cadera y luego alterna.", "climber"],
  "Peso muerto rumano": ["Cadera atrás, espalda recta | Desliza las pesas cerca de las piernas mientras llevas la cadera atrás; sube apretando glúteos.", "deadlift"],
  "Dead bug": ["Espalda baja pegada al piso | Boca arriba, extiende lentamente brazo y pierna opuestos; vuelve al centro y alterna.", "deadbug"],
  "Press de hombros": ["Pesas desde hombros hasta arriba | Aprieta abdomen y empuja verticalmente sin arquear la zona lumbar.", "press"],
  "Curl de bíceps": ["Solo se mueve el antebrazo | Mantén los codos pegados al cuerpo, sube las pesas y baja lentamente.", "curl"],
  "Plancha lateral": ["Antebrazo debajo del hombro y cadera arriba | Acuéstate de lado, apoya antebrazo y pies. Eleva la cadera hasta formar una línea recta. Usa las rodillas apoyadas si es necesario.", "sideplank"],
  "Elevación de talones": ["Sube y baja sobre las puntas | Mantén el cuerpo alto, pausa un segundo arriba y baja los talones lentamente.", "calf"],
  "Rodillas arriba": ["Alterna rodillas con ritmo ágil y aterrizaje suave.", "march"],
  "Movilidad completa": ["Respira lento mientras movilizas hombros, cadera y espalda.", "mobility"]
  ,"Burpee adaptado": ["Baja, camina atrás y vuelve de pie | Desde de pie, apoya las manos, lleva un pie y luego el otro hacia atrás, regresa caminando y ponte de pie. Añade salto solo si mantienes control.", "burpee"]
};
const EQUIPMENT = {
  "Cuerda suave": "Cuerda", "Rueda abdominal corta": "Rueda abdominal",
  "Sentadilla con pesas": "Pesas de 6 kg", "Remo con pesas": "Pesas de 6 kg",
  "Remo inclinado": "Pesas de 6 kg", "Peso muerto rumano": "Pesas de 6 kg",
  "Press de hombros": "Pesas de 6 kg", "Curl de bíceps": "Pesas de 6 kg"
};
const TIME_BASED = new Set(["Plancha", "Plancha lateral", "Cuerda suave", "Rodillas arriba", "Marcha activa"]);

const warmup = [
  { name: "Movilidad de hombros", duration: 40, instruction: "Círculos de hombros | De pie y con brazos sueltos, haz 5 círculos lentos hacia atrás y 5 hacia delante. No levantes los hombros hacia las orejas.", art: "mobility", phase: "CALENTAMIENTO" },
  { name: "Movilidad de cuello y cadera", duration: 80, instruction: "Movimientos lentos y sin dolor | Mira a izquierda y derecha 5 veces, sin hacer círculos con el cuello. Después, manos en la cintura y dibuja 5 círculos de cadera por cada lado.", art: "hip", phase: "CALENTAMIENTO" },
  { name: "Marcha activa", duration: 90, instruction: "Marcha elevando rodillas | Alterna las rodillas hasta una altura cómoda y mueve el brazo contrario. Pisa suave y mantén el abdomen activo.", art: "march", phase: "CALENTAMIENTO" },
  { name: "Sentadilla sin peso", duration: 90, instruction: "Sentadilla de preparación | Separa los pies al ancho de hombros, lleva la cadera atrás y baja solo hasta donde controles. Sube apretando glúteos.", art: "squat", phase: "CALENTAMIENTO" }
];

let state = { session: [], index: 0, remaining: 0, elapsed: 0, timer: null, paused: true, sound: true, selectedDay: todayIndex(), repsSaved: false, effort: 0 };
const $ = id => document.getElementById(id);
const progress = JSON.parse(localStorage.getItem("fuerte-progress") || "{}");
const settings = JSON.parse(localStorage.getItem("fuerte-settings") || '{"time":"18:00","sound":true}');
const repHistory = JSON.parse(localStorage.getItem("fuerte-reps") || "{}");

function todayIndex() { const d = new Date().getDay(); return d === 0 ? 5 : d - 1; }
function dateKey() { return new Date().toISOString().slice(0, 10); }
function art(type, rest = false) {
  if (rest) return `<svg viewBox="0 0 300 220"><circle cx="150" cy="105" r="72" fill="none" stroke="#111" stroke-width="8"/><path d="M150 58v51l35 23" fill="none" stroke="#111" stroke-width="10" stroke-linecap="round"/><path d="M112 188h76" stroke="#111" stroke-width="7" stroke-linecap="round"/></svg>`;
  if (type === "sideplank") return `<svg viewBox="0 0 620 220" aria-label="Plancha lateral: posición inicial y posición elevada">
    <rect x="5" y="5" width="292" height="190" rx="18" fill="#fff" stroke="#d8d3ca"/><rect x="323" y="5" width="292" height="190" rx="18" fill="#fff" stroke="#d8d3ca"/>
    <text x="25" y="28" font-size="12" font-weight="900">INICIO · DE LADO</text><text x="343" y="28" font-size="12" font-weight="900">ELEVA LA CADERA</text>
    <g fill="#111" stroke="#111" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="60" cy="123" rx="17" ry="20"/><path d="M83 132L172 151" stroke-width="25"/><path d="M170 151L248 173M170 151L245 163" fill="none" stroke-width="14"/>
      <path d="M104 136L84 179M109 137L135 73" fill="none" stroke-width="14"/><circle cx="84" cy="179" r="8"/><circle cx="171" cy="151" r="7" fill="#dfff00"/>
      <ellipse cx="378" cy="84" rx="17" ry="20"/><path d="M402 96L489 129" stroke-width="25"/><path d="M487 129L570 166M487 129L565 155" fill="none" stroke-width="14"/>
      <path d="M420 103L399 174M423 102L447 42" fill="none" stroke-width="14"/><circle cx="399" cy="174" r="8"/><circle cx="488" cy="129" r="8" fill="#dfff00"/>
    </g>
    <path d="M28 188h245M345 188h245" stroke="#111" stroke-width="4"/>
    <path d="M518 143V108" stroke="#111" stroke-width="3"/><path d="m510 116 8-9 8 9" fill="none" stroke="#111" stroke-width="3"/>
    <text x="171" y="183" text-anchor="middle" font-size="10" font-weight="900">CADERA APOYADA</text>
    <text x="485" y="102" text-anchor="middle" font-size="10" font-weight="900">CADERA ARRIBA</text>
    <text x="399" y="204" text-anchor="middle" font-size="10" font-weight="900">CODO DEBAJO DEL HOMBRO</text>
  </svg>`;
  const poses = {
    mobility: ["M150 70v62M142 91 95 62M158 91l47-29M145 130l-38 57M155 130l38 57", "M150 70v62M142 91 88 110M158 91l54 19M145 130l-38 57M155 130l38 57", "↻"],
    hip: ["M150 70v62M142 94l-45 25M158 94l45 25M145 130l-42 57M155 130l42 57", "M142 70l16 62M144 94l-48 16M158 94l46 34M150 130l-53 50M158 130l35 60", "↻"],
    march: ["M150 70v62M143 92l-40-34M157 92l40 35M145 130l-38 57M155 130l49 18", "M150 70v62M143 92l-40 35M157 92l40-34M145 130l-49 18M155 130l38 57", "↑"],
    squat: ["M150 70v62M143 94l-43 30M157 94l43 30M145 130l-37 57M155 130l37 57", "M150 90v45M143 108l-47 18M157 108l47 18M145 134l-55 22 20 31M155 134l55 22-20 31", "↕"],
    push: ["M92 105l72 20 63 2M105 109l-30 58M218 127l28 40", "M92 130l72 10 63-13M105 132l-30 35M218 128l28 39", "↕"],
    row: ["M105 90l65 26 42-5M145 106l-40 50M165 113l42 60M165 105l-8 47M205 111l7 40", "M105 90l65 26 42-5M145 106l-40 50M165 113l42 60M165 105l-38 8M205 111l-38 8", "←"],
    bridge: ["M70 155l70-25 64 25M112 142l18-47M204 155h35M70 155H35", "M70 155l70-60 64 60M140 95l20-42M204 155h35M70 155H35", "↑"],
    plank: ["M70 130l82-33 78 34M70 130l-25 40M230 131l28 39", "M70 130l82-33 78 34M70 130l-25 40M230 131l28 39", "—"],
    lunge: ["M150 70v62M143 94l-43 30M157 94l43 30M145 130l-40 57M155 130l40 57", "M150 84v55M143 108l-43 20M157 108l43 20M147 138l-64 28M157 138l43 18 22 31", "↓"],
    wheel: ["M116 85l34 51 62 18M146 130l-38 56M155 135l30 51M212 154h34", "M78 112l72 30 90 17M145 140l-38 46M155 143l30 43M240 159h28", "→"],
    climber: ["M70 125l82-28 78 32M70 125l-25 43M230 129l28 39M150 98l-28 70", "M70 125l82-28 78 32M70 125l-25 43M230 129l28 39M150 98l44 64", "↔"],
    deadlift: ["M150 70v62M143 94l-43 32M157 94l43 32M145 130l-38 57M155 130l38 57", "M113 92l62 32M145 112l-45 42M170 122l38 60M145 112l-8 48M183 128l8 38", "↕"],
    deadbug: ["M75 145l75-25 72 25M140 122l-43-55M160 122l45-55M142 128l-35 57M158 128l37 57", "M75 145l75-25 72 25M140 122l-70 8M160 122l68 8M142 128l-65 34M158 128l65 34", "↔"],
    press: ["M150 70v62M143 95l-43 22M157 95l43 22M145 130l-38 57M155 130l38 57", "M150 70v62M143 94l-30-58M157 94l30-58M145 130l-38 57M155 130l38 57", "↑"],
    curl: ["M150 70v62M143 94l-45 38M157 94l45 38M145 130l-38 57M155 130l38 57", "M150 70v62M143 94l-40-3M157 94l40-3M145 130l-38 57M155 130l38 57", "↑"],
    sideplank: ["M72 150l88-48 76 45M72 150l-28 30M236 147l24 33M160 102l20-50", "M72 150l88-35 76 32M72 150l-28 30M236 147l24 33M160 115l20-63", "↑"],
    calf: ["M150 70v62M143 94l-43 28M157 94l43 28M145 130l-38 57M155 130l38 57", "M150 62v62M143 86l-43 28M157 86l43 28M145 122l-38 61M155 122l38 61", "↑"],
    rope: ["M150 70v62M143 94l-43 28M157 94l43 28M145 130l-38 57M155 130l38 57M85 60C35 95 45 175 100 196M215 60c50 35 40 115-15 136", "M150 62v62M143 86l-43 28M157 86l43 28M145 122l-38 57M155 122l38 57M85 60C35 95 45 175 100 196M215 60c50 35 40 115-15 136", "↑"]
    ,burpee: ["M150 70v62M143 94l-43 28M157 94l43 28M145 130l-38 57M155 130l38 57", "M85 125l70-25 80 31M85 125l-32 45M235 131l30 39M155 100l-25 70", "↓"]
  };
  const pose = poses[type] || poses.mobility;
  const horizontal = ["push","row","bridge","plank","wheel","climber","deadbug","sideplank"].includes(type);
  const head = horizontal ? `<ellipse cx="82" cy="88" rx="18" ry="22"/>` : `<ellipse cx="150" cy="43" rx="18" ry="22"/>`;
  const torso = horizontal
    ? `<ellipse cx="153" cy="113" rx="42" ry="17" transform="rotate(14 153 113)" fill="#111"/><circle cx="121" cy="105" r="6" fill="#dfff00"/><circle cx="181" cy="121" r="6" fill="#dfff00"/>`
    : `<path d="M132 75Q150 64 168 75L164 126Q150 140 136 126Z" fill="#111"/><circle cx="139" cy="91" r="6" fill="#dfff00"/><circle cx="161" cy="91" r="6" fill="#dfff00"/><circle cx="143" cy="130" r="6" fill="#dfff00"/><circle cx="157" cy="130" r="6" fill="#dfff00"/>`;
  const body = path => `<g>${head}${torso}<path d="${path}" fill="none" stroke="#111" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return `<svg viewBox="0 0 620 220" aria-label="Dos posiciones del ejercicio">
    <rect x="5" y="5" width="292" height="190" rx="18" fill="#fff" stroke="#d8d3ca"/><rect x="323" y="5" width="292" height="190" rx="18" fill="#fff" stroke="#d8d3ca"/>
    <text x="25" y="28" font-size="12" font-weight="900">INICIO</text><text x="343" y="28" font-size="12" font-weight="900">MOVIMIENTO</text>
    <g class="pose-a" transform="translate(30 17) scale(.78)">${body(pose[0])}<path d="M30 198h240" stroke="#111" stroke-width="4"/></g>
    <g class="pose-b" transform="translate(348 17) scale(.78)">${body(pose[1])}<path d="M30 198h240" stroke="#111" stroke-width="4"/></g>
    <text class="motion-arrow" x="310" y="105" text-anchor="middle" font-size="30" font-weight="900">${pose[2]}</text>
  </svg>`;
}

function buildSession(dayIndex) {
  const ropeBlock = [
    { name: "Cuerda · ritmo suave", duration: 120, instruction: "Encuentra el ritmo | Saltos bajos, respiración cómoda y hombros relajados.", art: "rope", phase: "CARDIO 1/3" },
    { name: "Cuerda · ritmo medio", duration: 120, instruction: "Sube la velocidad | Mantén saltos pequeños y un ritmo que te permita decir una frase corta.", art: "rope", phase: "CARDIO 2/3" },
    { name: "Cuerda · minuto vigoroso", duration: 60, instruction: "Último minuto más intenso, no máximo | Aumenta el ritmo sin perder técnica. Cambia por marcha rápida sin cuerda si sientes molestias en rodillas, tobillos o pantorrillas.", art: "rope", phase: "CARDIO 3/3" },
    { name: "¿Continuar o terminar?", duration: 0, instruction: "Evalúa tu esfuerzo | Puedes completar la sesión ahora desde 60% de esfuerzo percibido, o continuar con fuerza y HIIT.", art: "rope", phase: "CONTROL", checkpoint: true }
  ];
  const rounds = [1, 2].flatMap(round => DAYS[dayIndex].exercises.flatMap(name => {
    const [instruction, artType] = INFO[name], target = suggestedTarget(name);
    return [
      { name, duration: 12, instruction, art: artType, phase: "PREPÁRATE", prep: true, round, target },
      { name, duration: 45, instruction, art: artType, phase: name === "Burpee adaptado" || name === "Rodillas arriba" ? "HIIT" : "TRABAJO", work: true, round, target },
      { name: "Registra y descansa", duration: 30, instruction: "Anota tu resultado y respira. El siguiente ejercicio aparecerá abajo.", art: "rest", phase: "DESCANSO", rest: true, exerciseName: name, round, target }
    ];
  }));
  return [...warmup, ...ropeBlock, ...rounds, { name: "Vuelta a la calma", duration: 300, instruction: "Camina suave, respira lento y estira sin dolor.", art: "mobility", phase: "RECUPERACIÓN" }];
}

function lastResult(name) {
  const entries = repHistory[name] || [];
  return entries.length ? entries[entries.length - 1].value : 0;
}
function suggestedTarget(name) {
  const last = lastResult(name);
  if (!last) return TIME_BASED.has(name) ? 30 : 10;
  return last + (last < 12 ? 1 : 2);
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
  $("weekPlan").innerHTML = DAYS.map((d, i) => {
    const done = keys.some(k => progress[k].dayIndex === i && isThisWeek(k));
    return `<article class="day-card ${i === todayIndex() ? "today" : ""} ${done ? "done" : ""}">
      <div class="day-dot">${done ? "✓" : d.day[0]}</div><div><strong>${d.day} · ${d.title}</strong><small>${d.split} · ${d.focus}</small></div>
      <button data-day="${i}">${i === state.selectedDay ? "Elegido" : "Ver"}</button></article>`;
  }).join("");
  document.querySelectorAll("[data-day]").forEach(b => b.onclick = () => { state.selectedDay = +b.dataset.day; renderHome(); scrollTo(0, 0); });
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
  $("effortMessage").textContent = "Desde 60% puedes terminar y registrar la sesión como cumplida.";
  loadStep(); showView("workoutView"); startTick(); notify("Entrenamiento iniciado", `Comienza: ${state.session[0].name}`);
}
function loadStep() {
  const step = state.session[state.index]; state.remaining = step.duration; state.repsSaved = false;
  if (step.checkpoint) state.paused = true;
  $("phaseBadge").textContent = step.phase; $("exerciseName").textContent = step.name;
  $("exerciseArt").innerHTML = art(step.art, step.rest);
  const parts = step.instruction.split(" | ");
  $("instruction").innerHTML = parts.length > 1 ? `<strong>${parts[0]}</strong><span>${parts[1]}</span>` : `<span>${step.instruction}</span>`;
  $("workoutPosition").textContent = step.round ? `RONDA ${step.round} DE 2` : `${state.index + 1} DE ${state.session.length}`;
  $("exerciseMeta").textContent = step.target ? `Objetivo sugerido: ${step.target} ${unitFor(step.exerciseName || step.name)}${step.prep ? " · el tiempo aún no cuenta" : ""}` : "";
  $("repsPanel").classList.toggle("active", !!step.rest);
  $("checkpointPanel").classList.toggle("active", !!step.checkpoint);
  $("workoutView").classList.toggle("at-checkpoint", !!step.checkpoint);
  if (step.rest) setupRepsPanel(step);
  $("nextExercise").textContent = nextWorkName();
  $("skipRestBtn").style.visibility = step.rest ? "visible" : "hidden"; updateTimer();
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
    ? `${DAYS[state.selectedDay].title} · ${minutes} minutos reales · esfuerzo percibido ${effort}% · sesión cumplida`
    : `${DAYS[state.selectedDay].title} · rutina completa · ${minutes} minutos registrados`;
  showView("completeView"); notify("Sesión completada", "Tu progreso quedó guardado.");
}
function setupRepsPanel(step) {
  const name = step.exerciseName, previous = lastResult(name), unit = unitFor(name);
  $("previousReps").textContent = previous ? `Anterior: ${previous} ${unit}` : "Primer registro";
  $("suggestedReps").textContent = `Objetivo: ${step.target} ${unit}`;
  $("repsInput").value = previous || step.target;
  $("saveRepsBtn").textContent = "Guardar resultado";
}
function saveCurrentReps() {
  const step = state.session[state.index];
  if (!step?.rest || state.repsSaved) return;
  const value = Math.max(0, Number($("repsInput").value) || 0);
  if (!repHistory[step.exerciseName]) repHistory[step.exerciseName] = [];
  repHistory[step.exerciseName].push({ date: dateKey(), value, round: step.round });
  localStorage.setItem("fuerte-reps", JSON.stringify(repHistory));
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
  window.reminderTimer = setTimeout(() => { notify("Es hora de entrenar", `${DAYS[todayIndex()].title}: tu sesión de 30 minutos está lista.`); scheduleReminder(); }, next - new Date());
}

$("startBtn").onclick = openPreparation;
$("prepareBackBtn").onclick = () => showView("homeView");
$("beginBtn").onclick = startWorkout;
$("pauseBtn").onclick = () => { state.paused = !state.paused; $("pauseBtn").textContent = state.paused ? "Continuar" : "Pausar"; };
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
  $("effortMessage").textContent = state.effort >= 60 ? `Esfuerzo ${state.effort}%: puedes registrar la sesión como cumplida.` : "Con 40% puedes descansar, pero la sesión no se marcará como cumplida.";
});
$("exitBtn").onclick = () => {
  const percent = Math.round(state.elapsed / 1800 * 100);
  if (percent >= 60 && confirm(`Llevas ${percent}% del tiempo planeado. ¿Terminar y registrar la sesión como cumplida?`)) { state.effort = Math.max(60, percent); completeWorkout(true); return; }
  if (confirm("¿Salir sin marcar la sesión como cumplida?")) { clearInterval(state.timer); showView("homeView"); }
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
