import {
  LANGUAGE_REGION_LABELS,
  SUPPORTED_LANGS,
  type SupportedLang,
} from './supportedLanguages';
import { absoluteUrl, withBase } from './siteConfig';

export type Locale = SupportedLang;

export const DEFAULT_LOCALE: Locale = 'en';
export const SITE_LOCALES = SUPPORTED_LANGS;
export const LANGUAGE_LABELS = LANGUAGE_REGION_LABELS;

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? DeepString<Item>[]
    : T extends object
      ? { [Key in keyof T]: DeepString<T[Key]> }
      : T;

const en = {
  site: {
    description: 'A mobile app that turns any workout-plan JSON file into a beautiful, trackable training program.',
  },
  shell: {
    homeAria: 'Universal Fit home',
    primaryNav: 'Primary navigation',
    nav: {
      home: 'Home',
      plans: 'Plans',
      build: 'Build',
      support: 'Support',
      roadmap: 'Roadmap',
    },
    mobileHelp: 'Help',
    tagline: 'Portable workout plans, strict JSON validation, and offline-first training logs.',
    explore: 'Explore',
    project: 'Project',
    workoutBuilder: 'Workout builder',
    llmBrief: 'LLM brief',
    exerciseLibrary: 'Exercise library',
    github: 'GitHub',
    privacy: 'Privacy',
    language: 'Language',
  },
  common: {
    brand: 'Universal Fit',
    plans: 'Plans',
    planSingular: 'plan',
    planPlural: 'plans',
    weeks: 'weeks',
    daysPerWeek: 'days/week',
    duration: 'Duration',
    weekly: 'Weekly',
    avgDay: 'Avg day',
    by: 'By',
    source: 'Source',
    none: 'none',
    valid: 'Valid',
    needsFixes: 'Needs fixes',
    downloadJson: 'Download JSON',
    copyLlmPrompt: 'Copy LLM prompt',
    copied: 'Copied',
    viewPlan: 'View plan',
    openGithubView: 'Open GitHub view',
  },
  downloads: {
    iosComingSoon: 'iOS Coming soon',
    androidComingSoon: 'Android Coming soon',
  },
  taxonomy: {
    all: {
      Goal: 'All goals',
      Level: 'All levels',
      Modality: 'All modalities',
    },
    goal: {
      strength: 'Strength',
      hypertrophy: 'Hypertrophy',
      endurance: 'Endurance',
      power: 'Power',
      fat_loss: 'Fat loss',
      general_fitness: 'General fitness',
      sport_specific: 'Sport specific',
      mobility: 'Mobility',
      mixed: 'Mixed',
    },
    level: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    modality: {
      strength: 'Strength',
      running: 'Running',
      mobility: 'Mobility',
      hybrid: 'Hybrid',
      cardio: 'Cardio',
      bodyweight: 'Bodyweight',
    },
    exercise: {
      pattern: 'Pattern',
      primary: 'Primary',
      equipment: 'Equipment',
      experience: 'Experience',
    },
  },
  home: {
    badge: 'Portable workout JSON',
    title: 'Any plan. Any author. One app to train it.',
    intro: 'Universal Fit turns workout-plan JSON into a beautiful offline training program, whether it came from a coach, a friend, or an LLM.',
    browsePlans: 'Browse example plans',
    buildWorkout: 'Build a workout',
    why: {
      eyebrow: 'Why it exists',
      title: 'The plan is the product.',
      intro: 'Most fitness apps lock workouts inside proprietary editors. Universal Fit treats the plan as a portable file and focuses the app on rendering, tracking, and validating it well.',
      cards: [
        ['Bring your own plan', 'Import JSON from a coach, a spreadsheet exporter, a GitHub repo, or a prompt you gave your favorite LLM.'],
        ['Track it offline', 'The mobile app keeps plans, active sessions, and performed logs on-device for v1. No account required.'],
        ['It is just JSON', 'Strict schema validation means plans are inspectable, shareable, versionable, and easy to fix when an LLM gets a field wrong.'],
      ],
    },
    builder: {
      eyebrow: 'Builder',
      title: 'Create or reshape a workout in the browser.',
      intro: 'The authoring page now supports guided plan creation, pasted JSON editing, schema validation, downloads, and AI edit prompts for deeper workout changes.',
      cards: [
        ['Build from controls', 'Choose the focus, level, duration, schedule, rest, equipment, and units to generate a valid starter plan.'],
        ['Paste existing JSON', 'Load a plan schema into quick-edit controls, adjust the workout, and keep the file valid before import.'],
        ['Ask for bigger changes', 'Copy a focused AI prompt that includes the current plan and schema rules when a change needs judgment.'],
      ],
      cta: 'Open builder',
    },
    app: {
      eyebrow: 'Inside the app',
      title: 'A familiar training surface around an open format.',
      intro: 'Start a planned session, log sets, keep rest timers alive, and compare what you performed against what was prescribed.',
      cards: [
        ['Strict imports', 'Unknown fields are rejected and errors are written so they can be pasted back into an LLM.'],
        ['Plan overview', 'Weeks, days, mesocycles, deloads, and session previews stay readable on a phone.'],
        ['Session tracking', 'Set logging, quick edits, freestyle sessions, and progress history are built around actual training.'],
        ['Multi-modality', 'Strength, cardio intervals, steady runs, mobility, and bodyweight work live in one schema.'],
      ],
      phoneAlt: 'Universal Fit mobile app screen',
    },
    examples: {
      eyebrow: 'Examples',
      title: 'Start with real JSON examples.',
      intro: 'The site ships with a small static catalog first. Later the same loader can index a full curated plan library.',
    },
    project: {
      eyebrow: 'Open project',
      title: 'Support and roadmap live on GitHub.',
      intro: 'The public site points users into structured issue forms for bugs, feature ideas, schema feedback, and plan submissions.',
      support: 'Get support',
      roadmap: 'View roadmap',
    },
  },
  plansPage: {
    title: 'Plans',
    description: 'Browse Universal Fit workout-plan JSON examples.',
    eyebrow: 'Plan catalog',
    heading: 'Browse portable workout JSON examples.',
    intro: 'Every card is backed by a real downloadable JSON file. These examples are intentionally small at launch so the schema stays easy to inspect.',
  },
  planFilters: {
    searchLabel: 'Search plans',
    searchPlaceholder: 'Search goal, equipment, author...',
    goal: 'Goal',
    level: 'Level',
    modality: 'Modality',
    shown: '{{count}} {{label}} shown',
    staticCatalog: 'Static JSON catalog',
  },
  planDetail: {
    eyebrow: 'Plan JSON',
    sampleDay: 'Sample day',
    estimatedMinutes: 'Estimated {{minutes}} minutes',
    itemOne: 'item',
    itemOther: 'items',
    sets: '{{count}} sets',
    programOutline: 'Program outline',
    week: 'Week {{week}}',
    day: 'Day {{day}}',
    useThisPlan: 'Use this plan',
    useCopy: 'Download the source file or open it in the app once deep links are enabled on your device.',
    openInApp: 'Open in Universal Fit',
    prompt: 'Use this Universal Fit plan JSON as a reference example. Create a new plan that follows the same schema, but adapt it to my goal, level, equipment, and schedule.\n\nExample JSON URL: {{url}}',
  },
  generate: {
    title: 'Generate with AI',
    description: 'Generate and validate Universal Fit workout-plan JSON with an LLM.',
    eyebrow: 'Authoring',
    heading: 'Build a workout, edit JSON, or use AI as the co-author.',
    intro: 'Start from guided controls, paste an existing Universal Fit plan schema, or copy a focused prompt when you want an LLM to change the workout safely.',
    steps: [
      ['1. Copy the prompt', 'The prompt includes the rules the app expects: one JSON object, schema version 1.0, and no unknown top-level fields.', 'Copy LLM prompt'],
      ['2. Paste into an LLM', 'Use your preferred assistant and describe your goal, schedule, equipment, and level.', ''],
      ['3. Validate and save', 'The validator catches schema problems before the JSON ever reaches the app.', 'Read the brief'],
    ],
    builderEyebrow: 'Workout builder',
    builderTitle: 'Build and reshape the plan before it reaches the app.',
    builderIntro: 'Use the builder for a valid starter file, paste an existing plan JSON to edit it, then download or copy the result once it passes schema validation.',
    prompt: '{{brief}}\n\nCreate a new Universal Fit plan for me. Ask follow-up questions only if required, then output only one JSON object.',
  },
  builder: {
    modeAria: 'Workout builder mode',
    build: 'Build',
    editJson: 'Edit JSON',
    planName: 'Plan name',
    goal: 'Goal',
    goalPlaceholder: 'strength, endurance, mobility',
    level: 'Level',
    focus: 'Focus',
    weeks: 'Weeks',
    daysPerWeek: 'Days/week',
    minutes: 'Minutes',
    restSeconds: 'Rest seconds',
    equipmentTags: 'Equipment tags',
    equipmentPlaceholder: 'dumbbells, treadmill',
    units: 'Units',
    metric: 'metric',
    imperial: 'imperial',
    generate: 'Generate workout JSON',
    loadPasted: 'Load pasted JSON',
    applyQuickEdits: 'Apply quick edits',
    changeRequest: 'Change request for AI',
    copyAiEditPrompt: 'Copy AI edit prompt',
    jsonEditor: 'Workout JSON editor',
    downloadValid: 'Download valid plan',
    copyJson: 'Copy JSON',
    validation: 'Validation',
    validationValid: 'Ready to import',
    defaultPlanName: 'Custom Workout Plan',
    defaultGoal: 'general fitness',
    defaultEquipment: 'dumbbells, running shoes',
    defaultAdvancedRequest: 'Make this workout more knee-friendly while preserving the goal.',
    author: 'Universal Fit builder',
    description: '{{weeks}}-week {{focus}} plan built from the website workout builder.',
    deloadWeek: 'Deload and consolidate',
    weekName: 'Week {{week}}',
    easyDay: 'Easy {{name}}',
    notices: {
      generated: 'Generated a valid workout JSON from the builder controls.',
      pastedInvalid: 'The pasted JSON needs fixes before it can drive the builder controls.',
      loaded: 'Loaded the pasted plan into the edit controls.',
      fixFirst: 'Fix the JSON first, then quick edits can be applied safely.',
      applied: 'Applied the quick changes to the workout JSON.',
      copiedAi: 'Copied an AI edit prompt with the current workout JSON.',
      copiedJson: 'Copied the current workout JSON.',
    },
    validationMessages: {
      summary: '{{weeks}} weeks, {{days}} days/week, {{level}}',
      fixSchema: 'Fix the schema issues before importing this plan.',
      invalidJson: 'The editor does not contain valid JSON.',
    },
    aiPrompt: 'You are editing a Universal Fit workout-plan JSON file.\n\nRules:\n- Keep schema_version as "1.0".\n- Return one complete JSON object only.\n- Preserve valid fields unless the change request requires updating them.\n- Keep plan.duration_weeks equal to weeks.length.\n- Keep plan.days_per_week aligned with the number of planned training days per week.\n- Do not add unknown top-level fields.\n\nChange request:\n{{request}}\n\nCurrent plan JSON:\n{{json}}',
    defaultAiRequest: 'Improve this workout plan while keeping it valid and ready to import.',
    templates: {
      lowerStrength: 'Lower Strength',
      upperStrength: 'Upper Strength',
      fullBody: 'Full Body',
      easyRun: 'Easy Run',
      intervalRun: 'Interval Run',
      longEasyRun: 'Long Easy Run',
      mobilityFlow: 'Mobility Flow',
      stabilityReset: 'Stability Reset',
    },
  },
  support: {
    title: 'Support',
    description: 'Get support for Universal Fit through structured GitHub issue forms.',
    eyebrow: 'Support',
    heading: 'Tell us what happened, or what should exist next.',
    intro: 'Universal Fit uses GitHub Issues for public support and feedback. The forms keep reports structured so they can be triaged without follow-up churn.',
    cards: [
      ['Report an app bug', 'Use this when import, validation, tracking, or app navigation does something unexpected.', 'Open bug report'],
      ['Request a feature', 'Suggest a workflow improvement, supported plan structure, or app behavior you want to see.', 'Open feature request'],
      ['Submit a plan example', 'Share a JSON plan idea that could become part of the public example catalog.', 'Submit plan'],
      ['Schema or docs feedback', 'Tell us where the JSON brief, schema docs, or exercise library reference is unclear.', 'Send docs feedback'],
    ],
    before: {
      eyebrow: 'Before filing',
      title: 'A good report includes the JSON when the JSON matters.',
      intro: 'For import or validation problems, attach the plan file or paste the smallest JSON snippet that reproduces the problem. For app behavior, include device platform and what you expected to happen.',
      issues: 'Browse existing issues',
      brief: 'Read schema brief',
    },
  },
  privacy: {
    title: 'Privacy',
    description: 'Universal Fit privacy notes.',
    eyebrow: 'Privacy',
    heading: 'Offline-first by design.',
    intro: 'Universal Fit v1 is designed around local files and on-device training logs. The public website is static.',
    cards: [
      ['No accounts in v1', 'The app does not require a Universal Fit account for importing plans or logging sessions.'],
      ['Static website', 'This site is deployed as static files on GitHub Pages and does not run a custom backend.'],
      ['No tracking cookies', 'Analytics are off by default. If analytics are added later, they should be privacy-friendly and cookie-less.'],
    ],
  },
  roadmap: {
    title: 'Roadmap',
    description: 'Universal Fit roadmap and GitHub project links.',
    eyebrow: 'Roadmap',
    heading: 'Follow what is planned, active, and shipped.',
    intro: 'GitHub stays the source of truth for project management. This page gives app users a readable entry point without exposing private tokens or embedding project-board secrets.',
    groups: [
      ['Planned', ['Curated plan library with deeper examples', 'Universal Links and App Links for direct imports', 'Privacy-friendly analytics decision']],
      ['In progress', ['Static website and docs publishing', 'Generate-with-AI validator workflow', 'GitHub support forms and user feedback routing']],
      ['Shipped', ['Portable JSON schema brief', 'Offline-first app architecture', 'Exercise library seed data']],
    ],
    github: {
      eyebrow: 'GitHub project management',
      title: 'Use GitHub for the operational layer.',
      intro: 'Issues, milestones, labels, and project views are linked directly. If we add live status cards later, they should be generated at build time through GitHub Actions rather than using a browser-side token.',
      issues: 'Issues',
      milestones: 'Milestones',
      projects: 'Projects',
      schemaLabel: 'Schema label',
    },
  },
  docs: {
    docs: 'Docs',
    llmBrief: {
      title: 'LLM Brief',
      description: 'Universal Fit plan authoring brief for LLMs.',
      heading: 'LLM authoring brief',
      intro: 'The copy-pasteable source of truth for asking an LLM to generate a Universal Fit workout plan.',
    },
    schema: {
      title: 'Schema',
      description: 'Universal Fit workout-plan JSON schema reference.',
      heading: 'Full schema reference',
      intro: 'The implementation-focused reference for Universal Fit plan JSON, including weeks, days, blocks, items, sets, and cardio structures.',
    },
    library: {
      title: 'Exercise Library',
      description: 'Browse the bundled Universal Fit exercise library.',
      heading: 'Exercise library',
      intro: 'A browsable reference for the bundled exercise IDs plan authors can use. Showing {{shown}} of {{total}} entries.',
    },
    generateWithAi: 'Generate with AI',
    fullSchema: 'Full schema reference',
    llmBriefLink: 'LLM brief',
    exerciseLibrary: 'Exercise library',
  },
  validator: {
    pasteJson: 'Paste plan JSON',
    titleInvalid: 'Plan did not validate',
    messageInvalid: 'Fix these schema issues and try again.',
    titleParse: 'JSON parse error',
    messageParse: 'The pasted value is not valid JSON.',
    downloadValid: 'Download valid plan',
  },
  plans: {
    'beginner-strength': ['Beginner Strength 4-Week', 'A calm three-day strength plan built around squats, presses, hinges, and rows.'],
    'busy-bodybuilding-6wk': ['Busy Bodybuilding 6-Week', 'A classical upper/lower bodybuilding plan for busy lifters: short warmups, dense hypertrophy work, smart supersets, brief conditioning, and a clear deload.'],
    'couch-to-5k-base': ['Couch to 5K Base', 'A gentle run-walk progression for building consistent aerobic work without needing GPS inside the plan file.'],
    'hybrid-engine': ['Hybrid Engine 6-Week', 'Two strength days and two aerobic days for users who want lifting progress without losing their running base.'],
    'mobility-reset': ['Mobility Reset 2-Week', 'Short daily mobility sessions for stiff hips, shoulders, and ankles.'],
  },
};

export type PageMessages = DeepString<typeof en>;

const es: PageMessages = {
  ...en,
  site: { description: 'Una app móvil que convierte cualquier archivo JSON de entrenamiento en un programa bonito y fácil de seguir.' },
  shell: {
    ...en.shell,
    homeAria: 'Inicio de Universal Fit',
    primaryNav: 'Navegación principal',
    nav: { home: 'Inicio', plans: 'Planes', build: 'Crear', support: 'Soporte', roadmap: 'Ruta' },
    mobileHelp: 'Ayuda',
    tagline: 'Planes portátiles, validación JSON estricta y registros de entrenamiento sin conexión.',
    explore: 'Explorar',
    project: 'Proyecto',
    workoutBuilder: 'Constructor de entrenamientos',
    llmBrief: 'Guía para LLM',
    exerciseLibrary: 'Biblioteca de ejercicios',
    privacy: 'Privacidad',
    language: 'Idioma',
  },
  common: { ...en.common, planSingular: 'plan', planPlural: 'planes', weeks: 'semanas', daysPerWeek: 'días/semana', duration: 'Duración', weekly: 'Semanal', avgDay: 'Prom. día', by: 'Por', source: 'Fuente', none: 'ninguno', valid: 'Válido', needsFixes: 'Necesita correcciones', downloadJson: 'Descargar JSON', copyLlmPrompt: 'Copiar prompt LLM', copied: 'Copiado', viewPlan: 'Ver plan', openGithubView: 'Abrir vista de GitHub' },
  downloads: { iosComingSoon: 'iOS Próximamente', androidComingSoon: 'Android Próximamente' },
  taxonomy: {
    all: { Goal: 'Todos los objetivos', Level: 'Todos los niveles', Modality: 'Todas las modalidades' },
    goal: { strength: 'Fuerza', hypertrophy: 'Hipertrofia', endurance: 'Resistencia', power: 'Potencia', fat_loss: 'Pérdida de grasa', general_fitness: 'Condición general', sport_specific: 'Específico de deporte', mobility: 'Movilidad', mixed: 'Mixto' },
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    modality: { strength: 'Fuerza', running: 'Carrera', mobility: 'Movilidad', hybrid: 'Híbrido', cardio: 'Cardio', bodyweight: 'Peso corporal' },
    exercise: { pattern: 'Patrón', primary: 'Principal', equipment: 'Equipo', experience: 'Experiencia' },
  },
  home: {
    ...en.home,
    badge: 'JSON de entrenamiento portátil',
    title: 'Cualquier plan. Cualquier autor. Una app para entrenarlo.',
    intro: 'Universal Fit convierte JSON de planes de entrenamiento en un programa offline bonito, venga de un coach, un amigo o un LLM.',
    browsePlans: 'Explorar planes de ejemplo',
    buildWorkout: 'Crear entrenamiento',
    why: {
      eyebrow: 'Por qué existe',
      title: 'El plan es el producto.',
      intro: 'Muchas apps encierran los entrenamientos en editores propietarios. Universal Fit trata el plan como un archivo portátil y se enfoca en mostrarlo, seguirlo y validarlo bien.',
      cards: [['Trae tu propio plan', 'Importa JSON de un coach, un exportador de hojas de cálculo, un repo de GitHub o un prompt.'], ['Entrena sin conexión', 'La app móvil mantiene planes, sesiones activas y registros realizados en el dispositivo para v1. No requiere cuenta.'], ['Es solo JSON', 'La validación estricta hace que los planes sean inspeccionables, compartibles, versionables y fáciles de corregir.']],
    },
    builder: {
      eyebrow: 'Constructor',
      title: 'Crea o ajusta un entrenamiento en el navegador.',
      intro: 'La página de autoría admite creación guiada, edición de JSON pegado, validación de esquema, descargas y prompts de IA.',
      cards: [['Construye con controles', 'Elige enfoque, nivel, duración, agenda, descanso, equipo y unidades para generar un plan válido.'], ['Pega JSON existente', 'Carga un esquema de plan en controles rápidos, ajusta el entrenamiento y conserva el archivo válido.'], ['Pide cambios grandes', 'Copia un prompt enfocado con el plan actual y las reglas del esquema cuando el cambio requiere criterio.']],
      cta: 'Abrir constructor',
    },
    app: {
      eyebrow: 'Dentro de la app',
      title: 'Una superficie familiar alrededor de un formato abierto.',
      intro: 'Inicia sesiones planificadas, registra series, conserva temporizadores y compara lo realizado con lo prescrito.',
      cards: [['Importaciones estrictas', 'Los campos desconocidos se rechazan y los errores se pueden pegar de vuelta en un LLM.'], ['Vista del plan', 'Semanas, días, mesociclos, descargas y previsualizaciones siguen siendo legibles en el teléfono.'], ['Seguimiento de sesiones', 'Registro de series, ediciones rápidas, sesiones libres e historial se basan en el entrenamiento real.'], ['Multimodal', 'Fuerza, intervalos, carrera constante, movilidad y peso corporal viven en un solo esquema.']],
      phoneAlt: 'Pantalla móvil de Universal Fit',
    },
    examples: { eyebrow: 'Ejemplos', title: 'Empieza con ejemplos JSON reales.', intro: 'El sitio incluye primero un catálogo estático pequeño. Luego el mismo cargador podrá indexar una biblioteca completa.' },
    project: { eyebrow: 'Proyecto abierto', title: 'Soporte y ruta viven en GitHub.', intro: 'El sitio público dirige a formularios estructurados para errores, ideas, comentarios de esquema y envíos de planes.', support: 'Obtener soporte', roadmap: 'Ver ruta' },
  },
  plansPage: { title: 'Planes', description: 'Explora ejemplos JSON de planes Universal Fit.', eyebrow: 'Catálogo de planes', heading: 'Explora ejemplos JSON portátiles.', intro: 'Cada tarjeta se basa en un archivo JSON real descargable. Los ejemplos son pequeños al inicio para que el esquema sea fácil de inspeccionar.' },
  planFilters: { searchLabel: 'Buscar planes', searchPlaceholder: 'Buscar objetivo, equipo, autor...', goal: 'Goal', level: 'Level', modality: 'Modality', shown: '{{count}} {{label}} mostrados', staticCatalog: 'Catálogo JSON estático' },
  planDetail: { ...en.planDetail, eyebrow: 'JSON del plan', sampleDay: 'Día de ejemplo', estimatedMinutes: '{{minutes}} minutos estimados', itemOne: 'elemento', itemOther: 'elementos', sets: '{{count}} series', programOutline: 'Esquema del programa', week: 'Semana {{week}}', day: 'Día {{day}}', useThisPlan: 'Usar este plan', useCopy: 'Descarga el archivo fuente o ábrelo en la app cuando los enlaces profundos estén activos en tu dispositivo.', openInApp: 'Abrir en Universal Fit', prompt: 'Usa este JSON de Universal Fit como ejemplo de referencia. Crea un nuevo plan con el mismo esquema, adaptado a mi objetivo, nivel, equipo y agenda.\n\nURL JSON de ejemplo: {{url}}' },
  generate: { ...en.generate, title: 'Generar con IA', description: 'Genera y valida JSON de entrenamiento Universal Fit con un LLM.', eyebrow: 'Autoría', heading: 'Crea un entrenamiento, edita JSON o usa IA como coautora.', intro: 'Empieza con controles guiados, pega un esquema existente o copia un prompt enfocado para pedir cambios seguros.', steps: [['1. Copia el prompt', 'El prompt incluye las reglas esperadas por la app: un objeto JSON, esquema 1.0 y sin campos desconocidos.', 'Copiar prompt LLM'], ['2. Pégalo en un LLM', 'Usa tu asistente preferido y describe objetivo, agenda, equipo y nivel.', ''], ['3. Valida y guarda', 'El validador detecta problemas de esquema antes de que el JSON llegue a la app.', 'Leer la guía']], builderEyebrow: 'Constructor de entrenamientos', builderTitle: 'Construye y ajusta el plan antes de llevarlo a la app.', builderIntro: 'Usa el constructor para crear un archivo válido, pegar un plan existente y descargar o copiar el resultado validado.', prompt: '{{brief}}\n\nCrea un nuevo plan Universal Fit para mí. Haz preguntas solo si son necesarias y luego devuelve solo un objeto JSON.' },
  builder: { ...en.builder, build: 'Crear', editJson: 'Editar JSON', planName: 'Nombre del plan', goal: 'Objetivo', goalPlaceholder: 'fuerza, resistencia, movilidad', level: 'Nivel', focus: 'Enfoque', weeks: 'Semanas', daysPerWeek: 'Días/semana', minutes: 'Minutos', restSeconds: 'Segundos de descanso', equipmentTags: 'Etiquetas de equipo', equipmentPlaceholder: 'mancuernas, cinta', units: 'Unidades', metric: 'métrico', imperial: 'imperial', generate: 'Generar JSON', loadPasted: 'Cargar JSON pegado', applyQuickEdits: 'Aplicar ediciones rápidas', changeRequest: 'Solicitud de cambio para IA', copyAiEditPrompt: 'Copiar prompt de edición IA', jsonEditor: 'Editor JSON de entrenamiento', downloadValid: 'Descargar plan válido', copyJson: 'Copiar JSON', validation: 'Validación', validationValid: 'Listo para importar', defaultPlanName: 'Plan personalizado', defaultGoal: 'condición general', defaultEquipment: 'mancuernas, zapatillas de running', defaultAdvancedRequest: 'Haz este entrenamiento más amable para las rodillas sin cambiar el objetivo.', description: 'Plan de {{weeks}} semanas de {{focus}} creado desde el constructor web.', deloadWeek: 'Descarga y consolidación', weekName: 'Semana {{week}}', easyDay: '{{name}} suave', notices: { generated: 'Se generó un JSON válido desde los controles.', pastedInvalid: 'El JSON pegado necesita correcciones antes de alimentar los controles.', loaded: 'El plan pegado se cargó en los controles.', fixFirst: 'Corrige el JSON antes de aplicar ediciones rápidas.', applied: 'Se aplicaron las ediciones rápidas al JSON.', copiedAi: 'Se copió un prompt de IA con el JSON actual.', copiedJson: 'Se copió el JSON actual.' }, validationMessages: { summary: '{{weeks}} semanas, {{days}} días/semana, {{level}}', fixSchema: 'Corrige los problemas de esquema antes de importar.', invalidJson: 'El editor no contiene JSON válido.' }, defaultAiRequest: 'Mejora este plan manteniéndolo válido y listo para importar.', templates: { lowerStrength: 'Fuerza tren inferior', upperStrength: 'Fuerza tren superior', fullBody: 'Cuerpo completo', easyRun: 'Carrera suave', intervalRun: 'Carrera por intervalos', longEasyRun: 'Carrera larga suave', mobilityFlow: 'Flujo de movilidad', stabilityReset: 'Reinicio de estabilidad' } },
  support: { ...en.support, title: 'Soporte', description: 'Obtén soporte para Universal Fit con formularios estructurados de GitHub.', eyebrow: 'Soporte', heading: 'Cuéntanos qué ocurrió o qué debería existir.', intro: 'Universal Fit usa GitHub Issues para soporte y comentarios públicos. Los formularios mantienen los reportes ordenados.', cards: [['Reportar un error', 'Úsalo cuando importación, validación, seguimiento o navegación haga algo inesperado.', 'Abrir reporte'], ['Solicitar función', 'Sugiere una mejora de flujo, estructura de plan o comportamiento.', 'Abrir solicitud'], ['Enviar ejemplo de plan', 'Comparte una idea JSON que pueda entrar al catálogo público.', 'Enviar plan'], ['Comentarios de esquema o docs', 'Dinos dónde la guía JSON, docs o biblioteca no están claras.', 'Enviar comentario']], before: { eyebrow: 'Antes de reportar', title: 'Un buen reporte incluye el JSON cuando el JSON importa.', intro: 'Para problemas de importación o validación, adjunta el plan o pega el fragmento mínimo. Para comportamiento de app, incluye plataforma y expectativa.', issues: 'Explorar issues', brief: 'Leer guía de esquema' } },
  privacy: { ...en.privacy, title: 'Privacidad', description: 'Notas de privacidad de Universal Fit.', eyebrow: 'Privacidad', heading: 'Offline-first por diseño.', intro: 'Universal Fit v1 se diseña alrededor de archivos locales y registros en el dispositivo. El sitio público es estático.', cards: [['Sin cuentas en v1', 'La app no requiere cuenta para importar planes o registrar sesiones.'], ['Sitio estático', 'Este sitio se despliega como archivos estáticos en GitHub Pages y no ejecuta backend propio.'], ['Sin cookies de seguimiento', 'La analítica está desactivada por defecto. Si se añade después, deberá respetar la privacidad y no usar cookies.']] },
  roadmap: { ...en.roadmap, title: 'Ruta', description: 'Ruta de Universal Fit y enlaces del proyecto en GitHub.', eyebrow: 'Ruta', heading: 'Sigue lo planificado, activo y enviado.', intro: 'GitHub sigue siendo la fuente de verdad para la gestión del proyecto. Esta página ofrece una entrada legible para usuarios.', groups: [['Planificado', ['Biblioteca curada con ejemplos más profundos', 'Universal Links y App Links para importaciones directas', 'Decisión de analítica respetuosa']], ['En progreso', ['Sitio estático y publicación de docs', 'Flujo de validador Generar con IA', 'Formularios de soporte en GitHub']], ['Enviado', ['Guía de esquema JSON portátil', 'Arquitectura offline-first', 'Datos iniciales de ejercicios']]], github: { eyebrow: 'Gestión en GitHub', title: 'Usa GitHub para la capa operativa.', intro: 'Issues, hitos, etiquetas y vistas de proyecto se enlazan directamente. Si añadimos tarjetas vivas, deben generarse en build con GitHub Actions.', issues: 'Issues', milestones: 'Hitos', projects: 'Proyectos', schemaLabel: 'Etiqueta schema' } },
  docs: { ...en.docs, docs: 'Docs', llmBrief: { title: 'Guía LLM', description: 'Guía de autoría de planes Universal Fit para LLMs.', heading: 'Guía de autoría para LLM', intro: 'La fuente copiable para pedir a un LLM que genere un plan Universal Fit.' }, schema: { title: 'Esquema', description: 'Referencia del esquema JSON de Universal Fit.', heading: 'Referencia completa del esquema', intro: 'Referencia de implementación para JSON de Universal Fit: semanas, días, bloques, elementos, series y cardio.' }, library: { title: 'Biblioteca de ejercicios', description: 'Explora la biblioteca incluida de ejercicios Universal Fit.', heading: 'Biblioteca de ejercicios', intro: 'Referencia navegable de IDs de ejercicios. Mostrando {{shown}} de {{total}} entradas.' }, generateWithAi: 'Generar con IA', fullSchema: 'Referencia completa', llmBriefLink: 'Guía LLM', exerciseLibrary: 'Biblioteca de ejercicios' },
  validator: { pasteJson: 'Pegar JSON del plan', titleInvalid: 'El plan no validó', messageInvalid: 'Corrige estos problemas e inténtalo otra vez.', titleParse: 'Error al leer JSON', messageParse: 'El valor pegado no es JSON válido.', downloadValid: 'Descargar plan válido' },
  plans: { 'beginner-strength': ['Fuerza principiante 4 semanas', 'Plan tranquilo de fuerza de tres días con sentadillas, presses, bisagras y remos.'], 'busy-bodybuilding-6wk': ['Fisicoculturismo ocupado 6 semanas', 'Plan clásico superior/inferior para personas con poco tiempo: calentamientos cortos, hipertrofia densa, superseries inteligentes, acondicionamiento breve y descarga clara.'], 'couch-to-5k-base': ['Base del sofá a 5K', 'Progresión suave de correr-caminar para crear trabajo aeróbico constante sin necesitar GPS en el archivo.'], 'hybrid-engine': ['Motor híbrido 6 semanas', 'Dos días de fuerza y dos aeróbicos para progresar levantando sin perder base de carrera.'], 'mobility-reset': ['Reinicio de movilidad 2 semanas', 'Sesiones cortas diarias para caderas, hombros y tobillos rígidos.'] },
};

function fromEnglish(overrides: Partial<PageMessages>): PageMessages {
  return { ...en, ...overrides } as PageMessages;
}

const pt = fromEnglish({
  site: { description: 'Um app móvel que transforma qualquer JSON de treino em um programa bonito e rastreável.' },
  shell: { ...es.shell, nav: { home: 'Início', plans: 'Planos', build: 'Criar', support: 'Suporte', roadmap: 'Roteiro' }, mobileHelp: 'Ajuda', tagline: 'Planos portáteis, validação JSON rigorosa e registros offline.', explore: 'Explorar', project: 'Projeto', workoutBuilder: 'Construtor de treinos', llmBrief: 'Guia para LLM', exerciseLibrary: 'Biblioteca de exercícios', privacy: 'Privacidade', language: 'Idioma' },
  common: { ...es.common, planPlural: 'planos', weeks: 'semanas', daysPerWeek: 'dias/semana', weekly: 'Semanal', avgDay: 'Média dia', by: 'Por', none: 'nenhum', needsFixes: 'Precisa de ajustes', downloadJson: 'Baixar JSON', copied: 'Copiado', viewPlan: 'Ver plano' },
  home: { ...es.home, title: 'Qualquer plano. Qualquer autor. Um app para treinar.', intro: 'Universal Fit transforma JSON de treino em um programa offline bonito, vindo de um treinador, amigo ou LLM.', browsePlans: 'Ver planos de exemplo', buildWorkout: 'Criar treino' },
  plansPage: { title: 'Planos', description: 'Veja exemplos JSON de planos Universal Fit.', eyebrow: 'Catálogo de planos', heading: 'Explore exemplos JSON portáteis.', intro: 'Cada cartão vem de um arquivo JSON real para baixar. Os exemplos são pequenos para facilitar a inspeção do esquema.' },
  planFilters: { searchLabel: 'Buscar planos', searchPlaceholder: 'Buscar objetivo, equipamento, autor...', goal: 'Goal', level: 'Level', modality: 'Modality', shown: '{{count}} {{label}} exibidos', staticCatalog: 'Catálogo JSON estático' },
  docs: { ...es.docs, llmBrief: { title: 'Guia LLM', description: 'Guia de autoria de planos Universal Fit para LLMs.', heading: 'Guia de autoria para LLM', intro: 'A fonte copiável para pedir a um LLM que gere um plano Universal Fit.' }, schema: { title: 'Esquema', description: 'Referência do esquema JSON Universal Fit.', heading: 'Referência completa do esquema', intro: 'Referência de implementação para JSON Universal Fit: semanas, dias, blocos, itens, séries e cardio.' }, library: { title: 'Biblioteca de exercícios', description: 'Explore a biblioteca de exercícios Universal Fit.', heading: 'Biblioteca de exercícios', intro: 'Referência navegável dos IDs de exercícios. Mostrando {{shown}} de {{total}} entradas.' }, generateWithAi: 'Gerar com IA' },
  plans: { 'beginner-strength': ['Força iniciante 4 semanas', 'Plano calmo de força de três dias com agachamentos, presses, dobradiças e remadas.'], 'busy-bodybuilding-6wk': ['Bodybuilding ocupado 6 semanas', 'Plano clássico superior/inferior para quem tem pouco tempo: aquecimentos curtos, hipertrofia densa, superséries inteligentes, condicionamento breve e deload claro.'], 'couch-to-5k-base': ['Base do sofá aos 5K', 'Progressão suave de corrida-caminhada para criar base aeróbica sem GPS no arquivo.'], 'hybrid-engine': ['Motor híbrido 6 semanas', 'Dois dias de força e dois aeróbicos para evoluir sem perder a base de corrida.'], 'mobility-reset': ['Reinício de mobilidade 2 semanas', 'Sessões curtas diárias para quadris, ombros e tornozelos rígidos.'] },
});

const fr = fromEnglish({
  site: { description: 'Une app mobile qui transforme tout fichier JSON de programme en entraînement lisible et suivi.' },
  shell: { ...en.shell, nav: { home: 'Accueil', plans: 'Plans', build: 'Créer', support: 'Support', roadmap: 'Feuille de route' }, mobileHelp: 'Aide', tagline: 'Plans portables, validation JSON stricte et journaux hors ligne.', explore: 'Explorer', project: 'Projet', workoutBuilder: 'Créateur de séance', llmBrief: 'Guide LLM', exerciseLibrary: 'Bibliothèque d’exercices', privacy: 'Confidentialité', language: 'Langue' },
  common: { ...en.common, planPlural: 'plans', weeks: 'semaines', daysPerWeek: 'jours/semaine', duration: 'Durée', weekly: 'Hebdo', avgDay: 'Jour moy.', by: 'Par', source: 'Source', none: 'aucun', valid: 'Valide', needsFixes: 'À corriger', downloadJson: 'Télécharger JSON', copied: 'Copié', viewPlan: 'Voir le plan', openGithubView: 'Ouvrir GitHub' },
  home: { ...en.home, badge: 'JSON d’entraînement portable', title: 'Tout plan. Tout auteur. Une app pour s’entraîner.', intro: 'Universal Fit transforme les JSON de programme en entraînements hors ligne agréables, qu’ils viennent d’un coach, d’un ami ou d’un LLM.', browsePlans: 'Parcourir les exemples', buildWorkout: 'Créer une séance' },
  plansPage: { title: 'Plans', description: 'Parcourir des exemples JSON Universal Fit.', eyebrow: 'Catalogue', heading: 'Parcourir des exemples JSON portables.', intro: 'Chaque carte repose sur un vrai fichier JSON téléchargeable, volontairement court au lancement.' },
  planFilters: { searchLabel: 'Rechercher des plans', searchPlaceholder: 'Objectif, équipement, auteur...', goal: 'Goal', level: 'Level', modality: 'Modality', shown: '{{count}} {{label}} affichés', staticCatalog: 'Catalogue JSON statique' },
  docs: { ...en.docs, docs: 'Docs', generateWithAi: 'Générer avec IA', llmBrief: { title: 'Guide LLM', description: 'Guide de création de plans Universal Fit pour LLM.', heading: 'Guide de création pour LLM', intro: 'La source à copier pour demander à un LLM de générer un plan Universal Fit.' }, schema: { title: 'Schéma', description: 'Référence du schéma JSON Universal Fit.', heading: 'Référence complète du schéma', intro: 'Référence d’implémentation pour semaines, jours, blocs, éléments, séries et cardio.' }, library: { title: 'Bibliothèque d’exercices', description: 'Parcourir la bibliothèque Universal Fit.', heading: 'Bibliothèque d’exercices', intro: 'Référence des IDs d’exercices. {{shown}} entrées affichées sur {{total}}.' } },
  plans: { 'beginner-strength': ['Force débutant 4 semaines', 'Plan de force calme sur trois jours avec squats, poussées, charnières et tirages.'], 'busy-bodybuilding-6wk': ['Bodybuilding pressé 6 semaines', 'Plan haut/bas classique pour pratiquants occupés: échauffements courts, hypertrophie dense, supersets intelligents, conditioning bref et deload clair.'], 'couch-to-5k-base': ['Base canapé à 5K', 'Progression douce course-marche pour construire une base aérobie sans GPS dans le fichier.'], 'hybrid-engine': ['Moteur hybride 6 semaines', 'Deux jours de force et deux jours aérobie pour progresser sans perdre la base de course.'], 'mobility-reset': ['Réinitialisation mobilité 2 semaines', 'Courtes séances quotidiennes pour hanches, épaules et chevilles raides.'] },
});

const de = fromEnglish({
  site: { description: 'Eine mobile App, die jede Workout-Plan-JSON in ein schönes, trackbares Trainingsprogramm verwandelt.' },
  shell: { ...en.shell, nav: { home: 'Start', plans: 'Pläne', build: 'Erstellen', support: 'Support', roadmap: 'Roadmap' }, mobileHelp: 'Hilfe', tagline: 'Portable Pläne, strenge JSON-Validierung und Offline-Trainingslogs.', explore: 'Entdecken', project: 'Projekt', workoutBuilder: 'Workout-Builder', llmBrief: 'LLM-Brief', exerciseLibrary: 'Übungsbibliothek', privacy: 'Datenschutz', language: 'Sprache' },
  common: { ...en.common, planSingular: 'Plan', planPlural: 'Pläne', weeks: 'Wochen', daysPerWeek: 'Tage/Woche', duration: 'Dauer', weekly: 'Wöchentlich', avgDay: 'Ø Tag', by: 'Von', source: 'Quelle', none: 'keine', valid: 'Gültig', needsFixes: 'Korrekturen nötig', downloadJson: 'JSON herunterladen', copied: 'Kopiert', viewPlan: 'Plan ansehen', openGithubView: 'GitHub öffnen' },
  home: { ...en.home, badge: 'Portable Workout-JSON', title: 'Jeder Plan. Jeder Autor. Eine App zum Trainieren.', intro: 'Universal Fit verwandelt Workout-JSON in ein schönes Offline-Programm, egal ob vom Coach, Freund oder LLM.', browsePlans: 'Beispielpläne ansehen', buildWorkout: 'Workout erstellen' },
  plansPage: { title: 'Pläne', description: 'Universal Fit Workout-JSON-Beispiele durchsuchen.', eyebrow: 'Plankatalog', heading: 'Portable Workout-JSON-Beispiele durchsuchen.', intro: 'Jede Karte basiert auf einer echten herunterladbaren JSON-Datei. Die Beispiele bleiben zum Start bewusst klein.' },
  planFilters: { searchLabel: 'Pläne suchen', searchPlaceholder: 'Ziel, Ausrüstung, Autor...', goal: 'Goal', level: 'Level', modality: 'Modality', shown: '{{count}} {{label}} angezeigt', staticCatalog: 'Statischer JSON-Katalog' },
  docs: { ...en.docs, docs: 'Docs', generateWithAi: 'Mit KI generieren', llmBrief: { title: 'LLM-Brief', description: 'Universal Fit Autoring-Brief für LLMs.', heading: 'Autoring-Brief für LLMs', intro: 'Die kopierbare Quelle, um ein LLM einen Universal-Fit-Plan erzeugen zu lassen.' }, schema: { title: 'Schema', description: 'Universal Fit JSON-Schema-Referenz.', heading: 'Vollständige Schema-Referenz', intro: 'Implementierungsreferenz für Wochen, Tage, Blöcke, Items, Sätze und Cardio.' }, library: { title: 'Übungsbibliothek', description: 'Die Universal-Fit-Übungsbibliothek durchsuchen.', heading: 'Übungsbibliothek', intro: 'Durchsuchbare Referenz der Übungs-IDs. {{shown}} von {{total}} Einträgen.' } },
  plans: { 'beginner-strength': ['Anfänger-Kraft 4 Wochen', 'Ruhiger Drei-Tage-Kraftplan mit Kniebeugen, Drücken, Hinge-Bewegungen und Rudern.'], 'busy-bodybuilding-6wk': ['Busy Bodybuilding 6 Wochen', 'Klassischer Ober-/Unterkörper-Plan für beschäftigte Lifter: kurze Warmups, dichte Hypertrophie, kluge Supersätze, kurzes Conditioning und klarer Deload.'], 'couch-to-5k-base': ['Couch-to-5K Basis', 'Sanfte Lauf-Geh-Progression für konstante Ausdauerarbeit ohne GPS im Plan.'], 'hybrid-engine': ['Hybrid Engine 6 Wochen', 'Zwei Krafttage und zwei Ausdauertage für Fortschritt ohne Laufbasis zu verlieren.'], 'mobility-reset': ['Mobility Reset 2 Wochen', 'Kurze tägliche Mobility-Einheiten für steife Hüften, Schultern und Sprunggelenke.'] },
});

const it = fromEnglish({
  site: { description: 'Un’app mobile che trasforma qualsiasi JSON di allenamento in un programma bello e tracciabile.' },
  shell: { ...en.shell, nav: { home: 'Home', plans: 'Piani', build: 'Crea', support: 'Supporto', roadmap: 'Roadmap' }, mobileHelp: 'Aiuto', tagline: 'Piani portabili, validazione JSON rigorosa e log offline.', explore: 'Esplora', project: 'Progetto', workoutBuilder: 'Builder allenamenti', llmBrief: 'Guida LLM', exerciseLibrary: 'Libreria esercizi', privacy: 'Privacy', language: 'Lingua' },
  common: { ...en.common, planSingular: 'piano', planPlural: 'piani', weeks: 'settimane', daysPerWeek: 'giorni/settimana', duration: 'Durata', weekly: 'Settimanale', avgDay: 'Giorno medio', by: 'Di', source: 'Fonte', none: 'nessuno', valid: 'Valido', needsFixes: 'Da correggere', downloadJson: 'Scarica JSON', copied: 'Copiato', viewPlan: 'Vedi piano', openGithubView: 'Apri GitHub' },
  home: { ...en.home, badge: 'JSON di allenamento portabile', title: 'Qualsiasi piano. Qualsiasi autore. Un’app per allenarlo.', intro: 'Universal Fit trasforma JSON di allenamento in programmi offline belli, da coach, amici o LLM.', browsePlans: 'Sfoglia esempi', buildWorkout: 'Crea allenamento' },
  plansPage: { title: 'Piani', description: 'Sfoglia esempi JSON Universal Fit.', eyebrow: 'Catalogo piani', heading: 'Sfoglia esempi JSON portabili.', intro: 'Ogni scheda usa un vero file JSON scaricabile. Gli esempi sono piccoli per rendere lo schema facile da ispezionare.' },
  planFilters: { searchLabel: 'Cerca piani', searchPlaceholder: 'Cerca obiettivo, attrezzatura, autore...', goal: 'Goal', level: 'Level', modality: 'Modality', shown: '{{count}} {{label}} mostrati', staticCatalog: 'Catalogo JSON statico' },
  docs: { ...en.docs, docs: 'Docs', generateWithAi: 'Genera con IA', llmBrief: { title: 'Guida LLM', description: 'Guida Universal Fit per creare piani con LLM.', heading: 'Guida di authoring per LLM', intro: 'La fonte copiabile per chiedere a un LLM di generare un piano Universal Fit.' }, schema: { title: 'Schema', description: 'Riferimento schema JSON Universal Fit.', heading: 'Riferimento completo dello schema', intro: 'Riferimento implementativo per settimane, giorni, blocchi, elementi, serie e cardio.' }, library: { title: 'Libreria esercizi', description: 'Sfoglia la libreria esercizi Universal Fit.', heading: 'Libreria esercizi', intro: 'Riferimento navigabile degli ID esercizio. {{shown}} di {{total}} voci mostrate.' } },
  plans: { 'beginner-strength': ['Forza principiante 4 settimane', 'Piano di forza tranquillo su tre giorni con squat, spinte, hinge e rematori.'], 'busy-bodybuilding-6wk': ['Bodybuilding veloce 6 settimane', 'Classico piano upper/lower per chi ha poco tempo: warmup brevi, ipertrofia densa, superserie intelligenti, conditioning rapido e deload chiaro.'], 'couch-to-5k-base': ['Base dal divano ai 5K', 'Progressione dolce corsa-cammino per creare lavoro aerobico senza GPS nel file.'], 'hybrid-engine': ['Motore ibrido 6 settimane', 'Due giorni forza e due aerobici per progredire senza perdere base di corsa.'], 'mobility-reset': ['Reset mobilità 2 settimane', 'Sessioni brevi quotidiane per anche, spalle e caviglie rigide.'] },
});

Object.assign(pt.docs, {
  fullSchema: 'Referência completa',
  llmBriefLink: 'Guia LLM',
  exerciseLibrary: 'Biblioteca de exercícios',
});

Object.assign(pt, {
  shell: {
    ...pt.shell,
    homeAria: 'Início do Universal Fit',
    primaryNav: 'Navegação principal',
  },
  common: {
    ...pt.common,
    planSingular: 'plano',
    planPlural: 'planos',
    duration: 'Duração',
    weekly: 'Semanal',
    avgDay: 'Média/dia',
    copyLlmPrompt: 'Copiar prompt LLM',
    openGithubView: 'Abrir no GitHub',
  },
  taxonomy: {
    all: {
      Goal: 'Todos os objetivos',
      Level: 'Todos os níveis',
      Modality: 'Todas as modalidades',
    },
    goal: {
      strength: 'Força',
      hypertrophy: 'Hipertrofia',
      endurance: 'Resistência',
      power: 'Potência',
      fat_loss: 'Perda de gordura',
      general_fitness: 'Condicionamento geral',
      sport_specific: 'Específico do esporte',
      mobility: 'Mobilidade',
      mixed: 'Misto',
    },
    level: {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
    },
    modality: {
      strength: 'Força',
      running: 'Corrida',
      mobility: 'Mobilidade',
      hybrid: 'Híbrido',
      cardio: 'Cardio',
      bodyweight: 'Peso corporal',
    },
    exercise: {
      pattern: 'Padrão',
      primary: 'Principal',
      equipment: 'Equipamento',
      experience: 'Experiência',
    },
  },
  planFilters: {
    searchLabel: 'Buscar planos',
    searchPlaceholder: 'Buscar objetivo, equipamento, autor...',
    goal: 'Objetivo',
    level: 'Nível',
    modality: 'Modalidade',
    shown: '{{count}} {{label}} exibidos',
    staticCatalog: 'Catálogo JSON estático',
  },
  planDetail: {
    ...pt.planDetail,
    eyebrow: 'JSON do plano',
    sampleDay: 'Dia de exemplo',
    estimatedMinutes: '{{minutes}} minutos estimados',
    itemOne: 'item',
    itemOther: 'itens',
    sets: '{{count}} séries',
    programOutline: 'Estrutura do programa',
    week: 'Semana {{week}}',
    day: 'Dia {{day}}',
    useThisPlan: 'Usar este plano',
    useCopy: 'Baixe o arquivo fonte ou abra no app quando os deep links estiverem ativos no dispositivo.',
    openInApp: 'Abrir no Universal Fit',
    prompt: 'Use este JSON de plano Universal Fit como exemplo. Crie um novo plano com o mesmo esquema, adaptado ao meu objetivo, nível, equipamento e agenda.\n\nURL JSON de exemplo: {{url}}',
  },
  generate: {
    ...pt.generate,
    title: 'Gerar com IA',
    description: 'Gere e valide JSON de treino Universal Fit com um LLM.',
    eyebrow: 'Autoria',
    heading: 'Crie um treino, edite JSON ou use IA como coautora.',
    intro: 'Comece com controles guiados, cole um plano existente ou copie um prompt focado para alterar o treino com segurança.',
    steps: [
      ['1. Copie o prompt', 'O prompt inclui as regras esperadas pelo app: um objeto JSON, esquema 1.0 e nenhum campo desconhecido.', 'Copiar prompt LLM'],
      ['2. Cole em um LLM', 'Use seu assistente preferido e descreva objetivo, agenda, equipamento e nível.', ''],
      ['3. Valide e salve', 'O validador encontra problemas de esquema antes de o JSON chegar ao app.', 'Ler o guia'],
    ],
    builderEyebrow: 'Construtor de treinos',
    builderTitle: 'Construa e ajuste o plano antes de levá-lo ao app.',
    builderIntro: 'Use o construtor para criar um arquivo válido, colar um plano existente e baixar ou copiar o resultado validado.',
    prompt: '{{brief}}\n\nCrie um novo plano Universal Fit para mim. Faça perguntas apenas se forem necessárias e depois retorne somente um objeto JSON.',
  },
  builder: {
    ...pt.builder,
    modeAria: 'Modo do construtor de treinos',
    build: 'Criar',
    editJson: 'Editar JSON',
    planName: 'Nome do plano',
    goal: 'Objetivo',
    goalPlaceholder: 'força, resistência, mobilidade',
    level: 'Nível',
    focus: 'Foco',
    weeks: 'Semanas',
    daysPerWeek: 'Dias/semana',
    minutes: 'Minutos',
    restSeconds: 'Segundos de descanso',
    equipmentTags: 'Etiquetas de equipamento',
    equipmentPlaceholder: 'halteres, esteira',
    units: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    generate: 'Gerar JSON do treino',
    loadPasted: 'Carregar JSON colado',
    applyQuickEdits: 'Aplicar edições rápidas',
    changeRequest: 'Pedido de alteração para IA',
    copyAiEditPrompt: 'Copiar prompt de edição IA',
    jsonEditor: 'Editor JSON do treino',
    downloadValid: 'Baixar plano válido',
    copyJson: 'Copiar JSON',
    validation: 'Validação',
    validationValid: 'Pronto para importar',
    defaultPlanName: 'Plano personalizado',
    defaultGoal: 'condicionamento geral',
    defaultEquipment: 'halteres, tênis de corrida',
    defaultAdvancedRequest: 'Deixe este treino mais amigável para os joelhos sem mudar o objetivo.',
    author: 'Construtor Universal Fit',
    description: 'Plano de {{weeks}} semanas com foco em {{focus}} criado no construtor web.',
    deloadWeek: 'Deload e consolidação',
    weekName: 'Semana {{week}}',
    easyDay: '{{name}} leve',
    notices: {
      generated: 'JSON válido gerado pelos controles.',
      pastedInvalid: 'O JSON colado precisa de correções antes de alimentar os controles.',
      loaded: 'Plano colado carregado nos controles.',
      fixFirst: 'Corrija o JSON antes de aplicar edições rápidas.',
      applied: 'Edições rápidas aplicadas ao JSON.',
      copiedAi: 'Prompt de IA copiado com o JSON atual.',
      copiedJson: 'JSON atual copiado.',
    },
    validationMessages: {
      summary: '{{weeks}} semanas, {{days}} dias/semana, {{level}}',
      fixSchema: 'Corrija os problemas de esquema antes de importar.',
      invalidJson: 'O editor não contém JSON válido.',
    },
    aiPrompt: 'Você está editando um arquivo JSON de treino Universal Fit.\n\nRegras:\n- Mantenha schema_version como "1.0".\n- Retorne somente um objeto JSON completo.\n- Preserve campos válidos salvo quando o pedido exigir alteração.\n- Mantenha plan.duration_weeks igual a weeks.length.\n- Mantenha plan.days_per_week coerente com os dias de treino.\n- Não adicione campos desconhecidos no topo.\n\nPedido de alteração:\n{{request}}\n\nJSON atual:\n{{json}}',
    defaultAiRequest: 'Melhore este plano mantendo-o válido e pronto para importar.',
    templates: {
      lowerStrength: 'Força inferior',
      upperStrength: 'Força superior',
      fullBody: 'Corpo inteiro',
      easyRun: 'Corrida leve',
      intervalRun: 'Corrida intervalada',
      longEasyRun: 'Corrida longa leve',
      mobilityFlow: 'Fluxo de mobilidade',
      stabilityReset: 'Reinício de estabilidade',
    },
  },
  validator: {
    pasteJson: 'Cole o JSON do plano',
    titleInvalid: 'O plano não validou',
    messageInvalid: 'Corrija estes problemas e tente novamente.',
    titleParse: 'Erro ao ler JSON',
    messageParse: 'O valor colado não é JSON válido.',
    downloadValid: 'Baixar plano válido',
  },
});

Object.assign(fr.docs, {
  fullSchema: 'Référence complète',
  llmBriefLink: 'Guide LLM',
  exerciseLibrary: 'Bibliothèque d’exercices',
});

Object.assign(de.docs, {
  fullSchema: 'Vollständige Referenz',
  llmBriefLink: 'LLM-Brief',
  exerciseLibrary: 'Übungsbibliothek',
});

Object.assign(it.docs, {
  fullSchema: 'Riferimento completo',
  llmBriefLink: 'Guida LLM',
  exerciseLibrary: 'Libreria esercizi',
});

Object.assign(es, {
  common: {
    ...es.common,
    plans: 'Planes',
    planSingular: 'programa',
    copyLlmPrompt: 'Copiar prompt para LLM',
  },
  taxonomy: {
    ...es.taxonomy,
    modality: {
      ...es.taxonomy.modality,
      cardio: 'Cardiovascular',
    },
  },
  planFilters: {
    ...es.planFilters,
    goal: 'Objetivo',
    level: 'Nivel',
    modality: 'Modalidad',
  },
  builder: {
    ...es.builder,
    modeAria: 'Modo del constructor de entrenamientos',
    imperial: 'imperiales',
    author: 'Constructor de Universal Fit',
    aiPrompt: 'Estás editando un archivo JSON de entrenamiento Universal Fit.\n\nReglas:\n- Mantén schema_version como "1.0".\n- Devuelve solo un objeto JSON completo.\n- Conserva los campos válidos salvo que el cambio los requiera.\n- Mantén plan.duration_weeks igual a weeks.length.\n- Mantén plan.days_per_week alineado con los días de entrenamiento planificados por semana.\n- No agregues campos desconocidos en el nivel superior.\n\nSolicitud de cambio:\n{{request}}\n\nJSON actual:\n{{json}}',
  },
  roadmap: {
    ...es.roadmap,
    github: {
      ...es.roadmap.github,
      issues: 'Incidencias',
    },
  },
  docs: {
    ...es.docs,
    docs: 'Documentos',
  },
});

Object.assign(pt, {
  downloads: { iosComingSoon: 'iOS Em breve', androidComingSoon: 'Android Em breve' },
  home: {
    ...pt.home,
    badge: 'JSON de treino portátil',
    why: {
      eyebrow: 'Por que existe',
      title: 'O plano é o produto.',
      intro: 'Muitos apps prendem treinos em editores proprietários. Universal Fit trata o plano como arquivo portátil e foca em renderizar, acompanhar e validar bem.',
      cards: [
        ['Traga seu próprio plano', 'Importe JSON de um treinador, exportador de planilhas, repositório GitHub ou prompt enviado a um LLM.'],
        ['Treine offline', 'O app móvel mantém planos, sessões ativas e registros realizados no dispositivo na v1. Não precisa de conta.'],
        ['É apenas JSON', 'A validação rígida torna os planos inspecionáveis, compartilháveis, versionáveis e fáceis de corrigir.'],
      ],
    },
    builder: {
      eyebrow: 'Construtor',
      title: 'Crie ou ajuste um treino no navegador.',
      intro: 'A página de autoria suporta criação guiada, edição de JSON colado, validação de esquema, downloads e prompts de IA.',
      cards: [
        ['Monte com controles', 'Escolha foco, nível, duração, agenda, descanso, equipamento e unidades para gerar um plano válido.'],
        ['Cole JSON existente', 'Carregue um esquema de plano nos controles rápidos, ajuste o treino e mantenha o arquivo válido.'],
        ['Peça mudanças maiores', 'Copie um prompt focado com o plano atual e as regras do esquema quando a mudança exigir julgamento.'],
      ],
      cta: 'Abrir construtor',
    },
    app: {
      eyebrow: 'Dentro do app',
      title: 'Uma experiência familiar em torno de um formato aberto.',
      intro: 'Inicie sessões planejadas, registre séries, mantenha timers de descanso e compare o realizado com o prescrito.',
      cards: [
        ['Importações rígidas', 'Campos desconhecidos são rejeitados e os erros podem ser colados de volta em um LLM.'],
        ['Visão do plano', 'Semanas, dias, mesociclos, deloads e prévias de sessão continuam legíveis no telefone.'],
        ['Registro de sessões', 'Registro de séries, edições rápidas, sessões livres e histórico giram em torno do treino real.'],
        ['Multimodalidade', 'Força, intervalos, corridas contínuas, mobilidade e peso corporal vivem em um único esquema.'],
      ],
      phoneAlt: 'Tela móvel do Universal Fit',
    },
    examples: {
      eyebrow: 'Exemplos',
      title: 'Comece com exemplos JSON reais.',
      intro: 'O site começa com um pequeno catálogo estático. Depois, o mesmo carregador poderá indexar uma biblioteca curada completa.',
    },
    project: {
      eyebrow: 'Projeto aberto',
      title: 'Suporte e roteiro vivem no GitHub.',
      intro: 'O site público leva usuários a formulários estruturados para bugs, ideias, feedback de esquema e envio de planos.',
      support: 'Obter suporte',
      roadmap: 'Ver roteiro',
    },
  },
  common: {
    ...pt.common,
    plans: 'Planos',
    copyLlmPrompt: 'Copiar prompt para LLM',
  },
  taxonomy: {
    ...pt.taxonomy,
    modality: {
      ...pt.taxonomy.modality,
      cardio: 'Cardiovascular',
    },
  },
  planDetail: {
    ...pt.planDetail,
    itemOne: 'entrada',
  },
  builder: {
    ...pt.builder,
    imperial: 'sistema imperial',
  },
  support: {
    title: 'Ajuda',
    description: 'Receba suporte para Universal Fit por formulários estruturados do GitHub.',
    eyebrow: 'Ajuda',
    heading: 'Conte o que aconteceu ou o que deveria existir.',
    intro: 'Universal Fit usa GitHub Issues para suporte e feedback públicos. Os formulários mantêm os relatos organizados para triagem.',
    cards: [
      ['Relatar erro no app', 'Use quando importação, validação, acompanhamento ou navegação fizer algo inesperado.', 'Abrir relato'],
      ['Pedir recurso', 'Sugira uma melhoria de fluxo, estrutura de plano suportada ou comportamento do app.', 'Abrir pedido'],
      ['Enviar exemplo de plano', 'Compartilhe uma ideia de plano JSON que possa entrar no catálogo público.', 'Enviar plano'],
      ['Feedback de esquema ou docs', 'Diga onde o guia JSON, a documentação ou a biblioteca de exercícios ficou confusa.', 'Enviar feedback'],
    ],
    before: {
      eyebrow: 'Antes de abrir',
      title: 'Um bom relato inclui o JSON quando o JSON importa.',
      intro: 'Para problemas de importação ou validação, anexe o plano ou cole o menor trecho que reproduz o erro. Para comportamento do app, inclua a plataforma e o que esperava acontecer.',
      issues: 'Ver relatos existentes',
      brief: 'Ler guia de esquema',
    },
  },
  privacy: {
    title: 'Privacidade',
    description: 'Notas de privacidade do Universal Fit.',
    eyebrow: 'Privacidade',
    heading: 'Offline primeiro por design.',
    intro: 'Universal Fit v1 foi desenhado em torno de arquivos locais e registros de treino no dispositivo. O site público é estático.',
    cards: [
      ['Sem contas na v1', 'O app não exige conta Universal Fit para importar planos ou registrar sessões.'],
      ['Site estático', 'Este site é publicado como arquivos estáticos no GitHub Pages e não executa backend próprio.'],
      ['Sem cookies de rastreamento', 'Analytics ficam desligadas por padrão. Se forem adicionadas depois, devem respeitar privacidade e não usar cookies.'],
    ],
  },
  roadmap: {
    title: 'Roteiro',
    description: 'Roteiro do Universal Fit e links do projeto no GitHub.',
    eyebrow: 'Roteiro',
    heading: 'Acompanhe o que está planejado, ativo e enviado.',
    intro: 'GitHub continua sendo a fonte de verdade para gestão do projeto. Esta página dá aos usuários uma entrada legível.',
    groups: [
      ['Planejado', ['Biblioteca curada com exemplos mais profundos', 'Universal Links e App Links para importações diretas', 'Decisão de analytics com privacidade']],
      ['Em andamento', ['Publicação do site estático e docs', 'Fluxo de validador Gerar com IA', 'Formulários GitHub de suporte e feedback']],
      ['Lançado', ['Guia de esquema JSON portátil', 'Arquitetura offline primeiro', 'Dados iniciais da biblioteca de exercícios']],
    ],
    github: {
      eyebrow: 'Gestão no GitHub',
      title: 'Use o GitHub para a camada operacional.',
      intro: 'Relatos, marcos, etiquetas e visões de projeto são ligados diretamente. Se adicionarmos cartões vivos depois, eles devem ser gerados no build por GitHub Actions.',
      issues: 'Relatos',
      milestones: 'Marcos',
      projects: 'Projetos',
      schemaLabel: 'Etiqueta de esquema',
    },
  },
  docs: {
    ...pt.docs,
    docs: 'Documentação',
  },
});

Object.assign(fr, {
  shell: {
    ...fr.shell,
    homeAria: 'Accueil Universal Fit',
    primaryNav: 'Navigation principale',
    nav: { home: 'Accueil', plans: 'Programmes', build: 'Créer', support: 'Assistance', roadmap: 'Feuille de route' },
  },
  downloads: { iosComingSoon: 'iOS Bientôt', androidComingSoon: 'Android Bientôt' },
  common: {
    ...fr.common,
    plans: 'Programmes',
    planSingular: 'programme',
    planPlural: 'programmes',
    source: 'Origine',
    copyLlmPrompt: 'Copier le prompt pour LLM',
  },
  taxonomy: {
    all: { Goal: 'Tous les objectifs', Level: 'Tous les niveaux', Modality: 'Toutes les modalités' },
    goal: { strength: 'Force', hypertrophy: 'Hypertrophie', endurance: 'Résistance', power: 'Puissance', fat_loss: 'Perte de graisse', general_fitness: 'Condition générale', sport_specific: 'Spécifique au sport', mobility: 'Mobilité', mixed: 'Mixte' },
    level: { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' },
    modality: { strength: 'Force', running: 'Course', mobility: 'Mobilité', hybrid: 'Hybride', cardio: 'Cardiovasculaire', bodyweight: 'Poids du corps' },
    exercise: { pattern: 'Mouvement', primary: 'Principal', equipment: 'Matériel', experience: 'Expérience' },
  },
  home: {
    ...fr.home,
    why: {
      eyebrow: 'Pourquoi',
      title: 'Le programme est le produit.',
      intro: 'La plupart des apps enferment les séances dans des éditeurs propriétaires. Universal Fit traite le programme comme un fichier portable et se concentre sur l’affichage, le suivi et la validation.',
      cards: [
        ['Apportez votre programme', 'Importez du JSON depuis un coach, un export de tableur, un dépôt GitHub ou un prompt donné à un LLM.'],
        ['Entraînez-vous hors ligne', 'L’app mobile garde les programmes, sessions actives et journaux réalisés sur l’appareil pour la v1. Aucun compte requis.'],
        ['Ce n’est que du JSON', 'La validation stricte rend les programmes inspectables, partageables, versionnables et faciles à corriger.'],
      ],
    },
    builder: {
      eyebrow: 'Créateur',
      title: 'Créez ou ajustez une séance dans le navigateur.',
      intro: 'La page d’auteur prend en charge la création guidée, l’édition de JSON collé, la validation, les téléchargements et les prompts IA.',
      cards: [
        ['Créer avec des contrôles', 'Choisissez focus, niveau, durée, planning, repos, matériel et unités pour générer un programme valide.'],
        ['Coller un JSON existant', 'Chargez un schéma de programme dans les contrôles rapides, ajustez la séance et gardez le fichier valide.'],
        ['Demander de grands changements', 'Copiez un prompt ciblé avec le programme actuel et les règles du schéma quand le changement demande du jugement.'],
      ],
      cta: 'Ouvrir le créateur',
    },
    app: {
      eyebrow: 'Dans l’app',
      title: 'Une surface familière autour d’un format ouvert.',
      intro: 'Lancez une séance prévue, notez les séries, gardez les temps de repos actifs et comparez le réalisé au prescrit.',
      cards: [
        ['Imports stricts', 'Les champs inconnus sont rejetés et les erreurs peuvent être recollées dans un LLM.'],
        ['Vue du programme', 'Semaines, jours, mésocycles, deloads et aperçus de séances restent lisibles sur téléphone.'],
        ['Suivi des séances', 'Journal des séries, modifications rapides, séances libres et historique s’appuient sur l’entraînement réel.'],
        ['Multi-modalité', 'Force, intervalles cardio, courses faciles, mobilité et poids du corps vivent dans un seul schéma.'],
      ],
      phoneAlt: 'Écran mobile Universal Fit',
    },
    examples: {
      eyebrow: 'Exemples',
      title: 'Commencez avec de vrais exemples JSON.',
      intro: 'Le site embarque d’abord un petit catalogue statique. Le même chargeur pourra ensuite indexer une bibliothèque complète.',
    },
    project: {
      eyebrow: 'Projet ouvert',
      title: 'Assistance et feuille de route vivent sur GitHub.',
      intro: 'Le site public dirige vers des formulaires structurés pour bugs, idées, retours de schéma et propositions de programmes.',
      support: 'Obtenir de l’aide',
      roadmap: 'Voir la feuille',
    },
  },
  planFilters: {
    searchLabel: 'Rechercher des programmes',
    searchPlaceholder: 'Objectif, matériel, auteur...',
    goal: 'Objectif',
    level: 'Niveau',
    modality: 'Modalité',
    shown: '{{count}} {{label}} affichés',
    staticCatalog: 'Catalogue statique JSON',
  },
  plansPage: {
    ...fr.plansPage,
    title: 'Programmes',
  },
  planDetail: {
    eyebrow: 'JSON du programme',
    sampleDay: 'Jour exemple',
    estimatedMinutes: '{{minutes}} minutes estimées',
    itemOne: 'entrée',
    itemOther: 'entrées',
    sets: '{{count}} séries',
    programOutline: 'Structure du programme',
    week: 'Semaine {{week}}',
    day: 'Jour {{day}}',
    useThisPlan: 'Utiliser ce programme',
    useCopy: 'Téléchargez le fichier source ou ouvrez-le dans l’app lorsque les liens profonds sont activés sur votre appareil.',
    openInApp: 'Ouvrir dans Universal Fit',
    prompt: 'Utilise ce JSON de programme Universal Fit comme exemple de référence. Crée un nouveau programme avec le même schéma, adapté à mon objectif, mon niveau, mon matériel et mon agenda.\n\nURL JSON d’exemple : {{url}}',
  },
  generate: {
    title: 'Générer avec l’IA',
    description: 'Générer et valider du JSON de programme Universal Fit avec un LLM.',
    eyebrow: 'Création',
    heading: 'Créez une séance, éditez du JSON ou utilisez l’IA comme coauteur.',
    intro: 'Démarrez avec des contrôles guidés, collez un schéma existant ou copiez un prompt ciblé pour demander des changements sûrs.',
    steps: [
      ['1. Copiez le prompt', 'Le prompt inclut les règles attendues par l’app : un objet JSON, schéma 1.0 et aucun champ inconnu.', 'Copier le prompt LLM'],
      ['2. Collez-le dans un LLM', 'Utilisez votre assistant préféré et décrivez objectif, agenda, matériel et niveau.', ''],
      ['3. Validez et enregistrez', 'Le validateur détecte les problèmes de schéma avant que le JSON atteigne l’app.', 'Lire le guide'],
    ],
    builderEyebrow: 'Créateur de séance',
    builderTitle: 'Construisez et ajustez le programme avant l’app.',
    builderIntro: 'Utilisez le créateur pour générer un fichier valide, coller un programme existant, puis télécharger ou copier le résultat validé.',
    prompt: '{{brief}}\n\nCrée un nouveau programme Universal Fit pour moi. Pose des questions seulement si nécessaire, puis retourne uniquement un objet JSON.',
  },
  builder: {
    modeAria: 'Mode du créateur de séance',
    build: 'Créer',
    editJson: 'Éditer JSON',
    planName: 'Nom du programme',
    goal: 'Objectif',
    goalPlaceholder: 'force, endurance, mobilité',
    level: 'Niveau',
    focus: 'Orientation',
    weeks: 'Semaines',
    daysPerWeek: 'Jours/semaine',
    minutes: 'Durée',
    restSeconds: 'Secondes de repos',
    equipmentTags: 'Étiquettes matériel',
    equipmentPlaceholder: 'haltères, tapis',
    units: 'Unités',
    metric: 'métrique',
    imperial: 'impérial',
    generate: 'Générer le JSON',
    loadPasted: 'Charger le JSON collé',
    applyQuickEdits: 'Appliquer les éditions rapides',
    changeRequest: 'Demande de changement pour l’IA',
    copyAiEditPrompt: 'Copier le prompt d’édition IA',
    jsonEditor: 'Éditeur JSON de séance',
    downloadValid: 'Télécharger le programme valide',
    copyJson: 'Copier le JSON',
    validation: 'Contrôle',
    validationValid: 'Prêt à importer',
    defaultPlanName: 'Programme personnalisé',
    defaultGoal: 'condition générale',
    defaultEquipment: 'haltères, chaussures de course',
    defaultAdvancedRequest: 'Rends cette séance plus douce pour les genoux sans changer l’objectif.',
    author: 'Créateur Universal Fit',
    description: 'Programme {{focus}} de {{weeks}} semaines créé avec le créateur web.',
    deloadWeek: 'Décharge et consolidation',
    weekName: 'Semaine {{week}}',
    easyDay: '{{name}} facile',
    notices: {
      generated: 'JSON valide généré depuis les contrôles.',
      pastedInvalid: 'Le JSON collé doit être corrigé avant d’alimenter les contrôles.',
      loaded: 'Programme collé chargé dans les contrôles.',
      fixFirst: 'Corrigez le JSON avant d’appliquer les éditions rapides.',
      applied: 'Modifications rapides appliquées au JSON.',
      copiedAi: 'Prompt IA copié avec le JSON actuel.',
      copiedJson: 'JSON actuel copié.',
    },
    validationMessages: {
      summary: '{{weeks}} semaines, {{days}} jours/semaine, {{level}}',
      fixSchema: 'Corrigez les problèmes de schéma avant l’import.',
      invalidJson: 'L’éditeur ne contient pas de JSON valide.',
    },
    aiPrompt: 'Tu modifies un fichier JSON de programme Universal Fit.\n\nRègles :\n- Garde schema_version à "1.0".\n- Retourne uniquement un objet JSON complet.\n- Préserve les champs valides sauf si la demande exige de les modifier.\n- Garde plan.duration_weeks égal à weeks.length.\n- Garde plan.days_per_week aligné avec les jours d’entraînement prévus par semaine.\n- N’ajoute pas de champs inconnus au niveau supérieur.\n\nDemande de changement :\n{{request}}\n\nJSON actuel :\n{{json}}',
    defaultAiRequest: 'Améliore ce programme tout en le gardant valide et prêt à importer.',
    templates: {
      lowerStrength: 'Force bas du corps',
      upperStrength: 'Force haut du corps',
      fullBody: 'Corps complet',
      easyRun: 'Course facile',
      intervalRun: 'Course fractionnée',
      longEasyRun: 'Sortie longue facile',
      mobilityFlow: 'Flow mobilité',
      stabilityReset: 'Réinitialisation stabilité',
    },
  },
  support: {
    title: 'Assistance',
    description: 'Obtenir de l’aide pour Universal Fit via des formulaires GitHub structurés.',
    eyebrow: 'Assistance',
    heading: 'Dites ce qui s’est passé ou ce qui devrait exister.',
    intro: 'Universal Fit utilise GitHub Issues pour l’assistance et les retours publics. Les formulaires gardent les rapports structurés.',
    cards: [
      ['Signaler un bug de l’app', 'À utiliser quand import, validation, suivi ou navigation se comporte de façon inattendue.', 'Ouvrir un rapport'],
      ['Demander une fonctionnalité', 'Suggérez une amélioration de flux, une structure de programme ou un comportement d’app.', 'Ouvrir une demande'],
      ['Proposer un exemple de programme', 'Partagez une idée de JSON qui pourrait rejoindre le catalogue public.', 'Envoyer un programme'],
      ['Retour schéma ou docs', 'Dites où le guide JSON, les docs ou la bibliothèque d’exercices ne sont pas clairs.', 'Envoyer un retour'],
    ],
    before: {
      eyebrow: 'Avant d’ouvrir',
      title: 'Un bon rapport inclut le JSON quand le JSON compte.',
      intro: 'Pour les problèmes d’import ou de validation, joignez le fichier ou collez le plus petit extrait qui reproduit le problème. Pour l’app, incluez la plateforme et le résultat attendu.',
      issues: 'Voir les rapports existants',
      brief: 'Lire le guide schéma',
    },
  },
  privacy: {
    title: 'Confidentialité',
    description: 'Notes de confidentialité Universal Fit.',
    eyebrow: 'Confidentialité',
    heading: 'Hors ligne d’abord, par design.',
    intro: 'Universal Fit v1 est conçu autour de fichiers locaux et de journaux d’entraînement sur l’appareil. Le site public est statique.',
    cards: [
      ['Pas de compte en v1', 'L’app ne demande pas de compte Universal Fit pour importer des programmes ou journaliser des séances.'],
      ['Site statique', 'Ce site est déployé comme fichiers statiques sur GitHub Pages et n’exécute pas de backend personnalisé.'],
      ['Pas de cookies de suivi', 'Les analytics sont désactivées par défaut. Si elles sont ajoutées plus tard, elles devront respecter la vie privée et éviter les cookies.'],
    ],
  },
  roadmap: {
    title: 'Feuille de route',
    description: 'Feuille de route Universal Fit et liens projet GitHub.',
    eyebrow: 'Feuille de route',
    heading: 'Suivez ce qui est prévu, actif et livré.',
    intro: 'GitHub reste la source de vérité pour la gestion du projet. Cette page donne aux utilisateurs une entrée lisible.',
    groups: [
      ['Prévu', ['Bibliothèque de programmes avec exemples plus profonds', 'Universal Links et App Links pour imports directs', 'Décision analytics respectueuse de la vie privée']],
      ['En cours', ['Publication du site statique et des docs', 'Flux de validation Générer avec l’IA', 'Formulaires GitHub pour assistance et retours']],
      ['Livré', ['Guide de schéma JSON portable', 'Architecture hors ligne d’abord', 'Données initiales de bibliothèque d’exercices']],
    ],
    github: {
      eyebrow: 'Gestion de projet GitHub',
      title: 'Utilisez GitHub pour la couche opérationnelle.',
      intro: 'Tickets, jalons, étiquettes et vues projet sont liés directement. Si nous ajoutons des cartes vivantes, elles devront être générées au build avec GitHub Actions.',
      issues: 'Tickets',
      milestones: 'Jalons',
      projects: 'Projets',
      schemaLabel: 'Étiquette schéma',
    },
  },
  docs: {
    ...fr.docs,
    docs: 'Documentation',
  },
  validator: {
    pasteJson: 'Coller le JSON du programme',
    titleInvalid: 'Le programme n’a pas été validé',
    messageInvalid: 'Corrigez ces problèmes de schéma et réessayez.',
    titleParse: 'Erreur d’analyse JSON',
    messageParse: 'La valeur collée n’est pas un JSON valide.',
    downloadValid: 'Télécharger le programme valide',
  },
});

Object.assign(de, {
  shell: {
    ...de.shell,
    homeAria: 'Universal Fit Startseite',
    primaryNav: 'Hauptnavigation',
    nav: { home: 'Start', plans: 'Pläne', build: 'Erstellen', support: 'Hilfe', roadmap: 'Fahrplan' },
  },
  downloads: { iosComingSoon: 'iOS Demnächst', androidComingSoon: 'Android Demnächst' },
  common: {
    ...de.common,
    plans: 'Pläne',
    copyLlmPrompt: 'LLM-Prompt kopieren',
  },
  taxonomy: {
    all: { Goal: 'Alle Ziele', Level: 'Alle Level', Modality: 'Alle Trainingsarten' },
    goal: { strength: 'Kraft', hypertrophy: 'Muskelaufbau', endurance: 'Ausdauer', power: 'Schnellkraft', fat_loss: 'Fettabbau', general_fitness: 'Allgemeine Fitness', sport_specific: 'Sportspezifisch', mobility: 'Mobilität', mixed: 'Gemischt' },
    level: { beginner: 'Einsteiger', intermediate: 'Mittelstufe', advanced: 'Fortgeschritten' },
    modality: { strength: 'Kraft', running: 'Laufen', mobility: 'Mobilität', hybrid: 'Kombiniert', cardio: 'Ausdauer', bodyweight: 'Körpergewicht' },
    exercise: { pattern: 'Muster', primary: 'Primär', equipment: 'Ausrüstung', experience: 'Erfahrung' },
  },
  home: {
    ...de.home,
    why: {
      eyebrow: 'Warum',
      title: 'Der Plan ist das Produkt.',
      intro: 'Die meisten Fitness-Apps sperren Workouts in eigene Editoren. Universal Fit behandelt den Plan als portable Datei und konzentriert sich auf Darstellung, Tracking und Validierung.',
      cards: [
        ['Bring deinen eigenen Plan mit', 'Importiere JSON von einem Coach, Tabellenexport, GitHub-Repository oder Prompt an dein LLM.'],
        ['Offline trainieren', 'Die mobile App hält Pläne, aktive Sessions und Logs in v1 auf dem Gerät. Kein Konto nötig.'],
        ['Es ist nur JSON', 'Strenge Validierung macht Pläne prüfbar, teilbar, versionierbar und leicht zu korrigieren.'],
      ],
    },
    builder: {
      eyebrow: 'Generator',
      title: 'Erstelle oder forme ein Workout im Browser um.',
      intro: 'Die Autorenseite unterstützt geführte Erstellung, Bearbeitung eingefügter JSON-Dateien, Schemavalidierung, Downloads und KI-Prompts.',
      cards: [
        ['Mit Reglern erstellen', 'Wähle Fokus, Level, Dauer, Zeitplan, Pausen, Ausrüstung und Einheiten für einen gültigen Startplan.'],
        ['Vorhandenes JSON einfügen', 'Lade ein Planschema in Schnellregler, passe das Workout an und halte die Datei gültig.'],
        ['Größere Änderungen anfragen', 'Kopiere einen fokussierten KI-Prompt mit aktuellem Plan und Schemaregeln, wenn die Änderung Urteil braucht.'],
      ],
      cta: 'Generator öffnen',
    },
    app: {
      eyebrow: 'In der App',
      title: 'Eine vertraute Trainingsfläche rund um ein offenes Format.',
      intro: 'Starte geplante Sessions, protokolliere Sätze, halte Pausentimer aktiv und vergleiche Ist mit Soll.',
      cards: [
        ['Strikte Importe', 'Unbekannte Felder werden abgelehnt und Fehler können zurück in ein LLM kopiert werden.'],
        ['Planübersicht', 'Wochen, Tage, Mesozyklen, Deloads und Session-Vorschauen bleiben am Telefon lesbar.'],
        ['Session-Tracking', 'Satzlogs, Schnelländerungen, freie Sessions und Verlauf drehen sich um echtes Training.'],
        ['Mehrere Modalitäten', 'Kraft, Intervalle, lockere Läufe, Mobilität und Körpergewicht leben in einem Schema.'],
      ],
      phoneAlt: 'Universal Fit App-Bildschirm',
    },
    examples: {
      eyebrow: 'Beispiele',
      title: 'Starte mit echten JSON-Beispielen.',
      intro: 'Die Website liefert zunächst einen kleinen statischen Katalog. Später kann derselbe Loader eine kuratierte Bibliothek indexieren.',
    },
    project: {
      eyebrow: 'Offenes Projekt',
      title: 'Hilfe und Fahrplan liegen auf GitHub.',
      intro: 'Die öffentliche Site führt Nutzer zu strukturierten Formularen für Bugs, Ideen, Schema-Feedback und Planvorschläge.',
      support: 'Hilfe erhalten',
      roadmap: 'Fahrplan ansehen',
    },
  },
  planFilters: {
    searchLabel: 'Pläne suchen',
    searchPlaceholder: 'Ziel, Ausrüstung, Autor...',
    goal: 'Ziel',
    level: 'Stufe',
    modality: 'Trainingsart',
    shown: '{{count}} {{label}} angezeigt',
    staticCatalog: 'Statischer JSON-Katalog',
  },
  planDetail: {
    eyebrow: 'Plan-JSON',
    sampleDay: 'Beispieltag',
    estimatedMinutes: 'Geschätzt {{minutes}} Minuten',
    itemOne: 'Eintrag',
    itemOther: 'Einträge',
    sets: '{{count}} Sätze',
    programOutline: 'Programmstruktur',
    week: 'Woche {{week}}',
    day: 'Tag {{day}}',
    useThisPlan: 'Diesen Plan verwenden',
    useCopy: 'Lade die Quelldatei herunter oder öffne sie in der App, sobald Deep Links auf deinem Gerät aktiv sind.',
    openInApp: 'In Universal Fit öffnen',
    prompt: 'Nutze dieses Universal-Fit-Plan-JSON als Referenz. Erstelle einen neuen Plan mit demselben Schema, angepasst an mein Ziel, Level, Equipment und meinen Zeitplan.\n\nBeispiel-JSON-URL: {{url}}',
  },
  generate: {
    title: 'Mit KI generieren',
    description: 'Universal-Fit-Workout-JSON mit einem LLM erzeugen und validieren.',
    eyebrow: 'Autorenmodus',
    heading: 'Workout erstellen, JSON bearbeiten oder KI als Co-Autor nutzen.',
    intro: 'Starte mit geführten Reglern, füge ein vorhandenes Schema ein oder kopiere einen fokussierten Prompt für sichere Änderungen.',
    steps: [
      ['1. Prompt kopieren', 'Der Prompt enthält die App-Regeln: ein JSON-Objekt, Schema 1.0 und keine unbekannten Top-Level-Felder.', 'LLM-Prompt kopieren'],
      ['2. In ein LLM einfügen', 'Nutze deinen bevorzugten Assistenten und beschreibe Ziel, Zeitplan, Ausrüstung und Level.', ''],
      ['3. Validieren und speichern', 'Der Validator findet Schemafehler, bevor das JSON die App erreicht.', 'Brief lesen'],
    ],
    builderEyebrow: 'Workout-Generator',
    builderTitle: 'Baue und forme den Plan, bevor er in die App kommt.',
    builderIntro: 'Nutze den Generator für eine gültige Startdatei, füge vorhandenes Plan-JSON ein und lade oder kopiere das validierte Ergebnis.',
    prompt: '{{brief}}\n\nErstelle einen neuen Universal-Fit-Plan für mich. Stelle Rückfragen nur wenn nötig und gib danach ausschließlich ein JSON-Objekt aus.',
  },
  builder: {
    modeAria: 'Workout-Generator-Modus',
    build: 'Erstellen',
    editJson: 'JSON bearbeiten',
    planName: 'Planname',
    goal: 'Ziel',
    goalPlaceholder: 'Kraft, Ausdauer, Mobilität',
    level: 'Stufe',
    focus: 'Fokus',
    weeks: 'Wochen',
    daysPerWeek: 'Tage/Woche',
    minutes: 'Minuten',
    restSeconds: 'Pausensekunden',
    equipmentTags: 'Ausrüstungs-Tags',
    equipmentPlaceholder: 'Kurzhanteln, Laufband',
    units: 'Einheiten',
    metric: 'metrisch',
    imperial: 'US-Einheiten',
    generate: 'Workout-JSON erzeugen',
    loadPasted: 'Eingefügtes JSON laden',
    applyQuickEdits: 'Schnelländerungen anwenden',
    changeRequest: 'Änderungswunsch für KI',
    copyAiEditPrompt: 'KI-Bearbeitungsprompt kopieren',
    jsonEditor: 'Workout-JSON-Editor',
    downloadValid: 'Gültigen Plan herunterladen',
    copyJson: 'JSON kopieren',
    validation: 'Prüfung',
    validationValid: 'Bereit zum Import',
    defaultPlanName: 'Individueller Workout-Plan',
    defaultGoal: 'allgemeine Fitness',
    defaultEquipment: 'Kurzhanteln, Laufschuhe',
    defaultAdvancedRequest: 'Mach dieses Workout kniefreundlicher, ohne das Ziel zu ändern.',
    author: 'Universal-Fit-Generator',
    description: '{{weeks}}-Wochen-Plan mit Fokus {{focus}}, erstellt im Web-Generator.',
    deloadWeek: 'Deload und Festigung',
    weekName: 'Woche {{week}}',
    easyDay: 'Locker: {{name}}',
    notices: {
      generated: 'Gültiges Workout-JSON aus den Reglern erzeugt.',
      pastedInvalid: 'Das eingefügte JSON braucht Korrekturen, bevor es die Regler steuern kann.',
      loaded: 'Eingefügter Plan in die Regler geladen.',
      fixFirst: 'Korrigiere zuerst das JSON, dann können Schnelländerungen sicher angewendet werden.',
      applied: 'Schnelländerungen auf das Workout-JSON angewendet.',
      copiedAi: 'KI-Prompt mit dem aktuellen Workout-JSON kopiert.',
      copiedJson: 'Aktuelles JSON kopiert.',
    },
    validationMessages: {
      summary: '{{weeks}} Wochen, {{days}} Tage/Woche, {{level}}',
      fixSchema: 'Behebe die Schemafehler vor dem Import.',
      invalidJson: 'Der Editor enthält kein gültiges JSON.',
    },
    aiPrompt: 'Du bearbeitest eine Universal-Fit-Workout-JSON-Datei.\n\nRegeln:\n- Lasse schema_version bei "1.0".\n- Gib genau ein vollständiges JSON-Objekt zurück.\n- Bewahre gültige Felder, außer der Änderungswunsch verlangt Anpassungen.\n- Halte plan.duration_weeks gleich weeks.length.\n- Halte plan.days_per_week passend zur Anzahl geplanter Trainingstage pro Woche.\n- Füge keine unbekannten Top-Level-Felder hinzu.\n\nÄnderungswunsch:\n{{request}}\n\nAktuelles Plan-JSON:\n{{json}}',
    defaultAiRequest: 'Verbessere diesen Plan und halte ihn gültig sowie importbereit.',
    templates: {
      lowerStrength: 'Kraft Unterkörper',
      upperStrength: 'Kraft Oberkörper',
      fullBody: 'Ganzkörper',
      easyRun: 'Lockerer Lauf',
      intervalRun: 'Intervalllauf',
      longEasyRun: 'Langer lockerer Lauf',
      mobilityFlow: 'Mobility-Flow',
      stabilityReset: 'Stabilitäts-Reset',
    },
  },
  support: {
    title: 'Hilfe',
    description: 'Hilfe für Universal Fit über strukturierte GitHub-Formulare erhalten.',
    eyebrow: 'Hilfe',
    heading: 'Sag uns, was passiert ist oder was als Nächstes fehlen sollte.',
    intro: 'Universal Fit nutzt GitHub Issues für öffentlichen Support und Feedback. Die Formulare halten Meldungen strukturiert.',
    cards: [
      ['App-Fehler melden', 'Nutze dies, wenn Import, Validierung, Tracking oder Navigation unerwartet reagieren.', 'Fehlerbericht öffnen'],
      ['Funktion wünschen', 'Schlage eine Workflow-Verbesserung, unterstützte Planstruktur oder App-Verhalten vor.', 'Wunsch öffnen'],
      ['Planbeispiel einreichen', 'Teile eine JSON-Planidee, die Teil des öffentlichen Beispielkatalogs werden könnte.', 'Plan einreichen'],
      ['Schema- oder Docs-Feedback', 'Sag uns, wo JSON-Brief, Schemadocs oder Übungsbibliothek unklar sind.', 'Feedback senden'],
    ],
    before: {
      eyebrow: 'Vor dem Erstellen',
      title: 'Ein guter Bericht enthält das JSON, wenn das JSON relevant ist.',
      intro: 'Bei Import- oder Validierungsproblemen hänge den Plan an oder füge den kleinsten reproduzierbaren Ausschnitt ein. Bei App-Verhalten nenne Plattform und Erwartung.',
      issues: 'Bestehende Meldungen ansehen',
      brief: 'Schema-Brief lesen',
    },
  },
  privacy: {
    title: 'Datenschutz',
    description: 'Datenschutzhinweise für Universal Fit.',
    eyebrow: 'Datenschutz',
    heading: 'Offline zuerst, bewusst so gebaut.',
    intro: 'Universal Fit v1 ist um lokale Dateien und Trainingslogs auf dem Gerät herum konzipiert. Die öffentliche Website ist statisch.',
    cards: [
      ['Keine Konten in v1', 'Die App benötigt kein Universal-Fit-Konto, um Pläne zu importieren oder Sessions zu protokollieren.'],
      ['Statische Website', 'Diese Site wird als statische Dateien auf GitHub Pages veröffentlicht und betreibt kein eigenes Backend.'],
      ['Keine Tracking-Cookies', 'Analytics sind standardmäßig aus. Falls sie später kommen, sollen sie datenschutzfreundlich und cookielos sein.'],
    ],
  },
  roadmap: {
    title: 'Fahrplan',
    description: 'Universal-Fit-Fahrplan und GitHub-Projektlinks.',
    eyebrow: 'Fahrplan',
    heading: 'Verfolge, was geplant, aktiv und ausgeliefert ist.',
    intro: 'GitHub bleibt die Quelle der Wahrheit für Projektmanagement. Diese Seite bietet App-Nutzern einen lesbaren Einstieg.',
    groups: [
      ['Geplant', ['Kuratierte Planbibliothek mit tieferen Beispielen', 'Universal Links und App Links für direkte Importe', 'Datenschutzfreundliche Analytics-Entscheidung']],
      ['In Arbeit', ['Statische Website und Docs-Veröffentlichung', 'Validator-Workflow für Mit KI generieren', 'GitHub-Formulare für Support und Feedback']],
      ['Ausgeliefert', ['Portabler JSON-Schema-Brief', 'Offline-first-App-Architektur', 'Startdaten der Übungsbibliothek']],
    ],
    github: {
      eyebrow: 'GitHub-Projektmanagement',
      title: 'Nutze GitHub für die operative Ebene.',
      intro: 'Issues, Meilensteine, Labels und Projektansichten sind direkt verlinkt. Wenn später Live-Karten dazukommen, sollen sie beim Build über GitHub Actions entstehen.',
      issues: 'Meldungen',
      milestones: 'Meilensteine',
      projects: 'Projekte',
      schemaLabel: 'Schema-Label',
    },
  },
  docs: {
    ...de.docs,
    docs: 'Dokumentation',
    schema: { ...de.docs.schema, title: 'Schemareferenz' },
  },
  validator: {
    pasteJson: 'Plan-JSON einfügen',
    titleInvalid: 'Plan wurde nicht validiert',
    messageInvalid: 'Behebe diese Schemafehler und versuche es erneut.',
    titleParse: 'JSON-Lesefehler',
    messageParse: 'Der eingefügte Wert ist kein gültiges JSON.',
    downloadValid: 'Gültigen Plan herunterladen',
  },
});

Object.assign(it, {
  shell: {
    ...it.shell,
    homeAria: 'Home Universal Fit',
    primaryNav: 'Navigazione principale',
    nav: { home: 'Inizio', plans: 'Piani', build: 'Crea', support: 'Supporto', roadmap: 'Percorso' },
    privacy: 'Riservatezza',
  },
  downloads: { iosComingSoon: 'iOS Prossimamente', androidComingSoon: 'Android Prossimamente' },
  common: {
    ...it.common,
    plans: 'Piani',
    copyLlmPrompt: 'Copia prompt per LLM',
  },
  taxonomy: {
    all: { Goal: 'Tutti gli obiettivi', Level: 'Tutti i livelli', Modality: 'Tutte le modalità' },
    goal: { strength: 'Forza', hypertrophy: 'Ipertrofia', endurance: 'Resistenza', power: 'Potenza', fat_loss: 'Perdita grasso', general_fitness: 'Forma generale', sport_specific: 'Specifico sport', mobility: 'Mobilità', mixed: 'Misto' },
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' },
    modality: { strength: 'Forza', running: 'Corsa', mobility: 'Mobilità', hybrid: 'Ibrido', cardio: 'Cardiorespiratorio', bodyweight: 'Corpo libero' },
    exercise: { pattern: 'Schema', primary: 'Principale', equipment: 'Attrezzatura', experience: 'Esperienza' },
  },
  home: {
    ...it.home,
    why: {
      eyebrow: 'Perché esiste',
      title: 'Il piano è il prodotto.',
      intro: 'Molte app fitness chiudono gli allenamenti in editor proprietari. Universal Fit tratta il piano come file portabile e cura rendering, tracking e validazione.',
      cards: [
        ['Porta il tuo piano', 'Importa JSON da coach, esportatori di fogli, repository GitHub o prompt inviati a un LLM.'],
        ['Allenati offline', 'L’app mobile mantiene piani, sessioni attive e log eseguiti sul dispositivo nella v1. Nessun account richiesto.'],
        ['È solo JSON', 'La validazione rigorosa rende i piani ispezionabili, condivisibili, versionabili e facili da correggere.'],
      ],
    },
    builder: {
      eyebrow: 'Costruttore',
      title: 'Crea o rimodella un allenamento nel browser.',
      intro: 'La pagina di authoring supporta creazione guidata, modifica di JSON incollato, validazione schema, download e prompt IA.',
      cards: [
        ['Crea dai controlli', 'Scegli focus, livello, durata, calendario, recupero, attrezzatura e unità per generare un piano valido.'],
        ['Incolla JSON esistente', 'Carica uno schema di piano nei controlli rapidi, modifica l’allenamento e mantieni valido il file.'],
        ['Chiedi modifiche grandi', 'Copia un prompt mirato con il piano attuale e le regole dello schema quando serve giudizio.'],
      ],
      cta: 'Apri costruttore',
    },
    app: {
      eyebrow: 'Dentro l’app',
      title: 'Una superficie familiare attorno a un formato aperto.',
      intro: 'Avvia una sessione pianificata, registra serie, mantieni timer di recupero e confronta eseguito e prescritto.',
      cards: [
        ['Import rigidi', 'I campi sconosciuti vengono rifiutati e gli errori possono essere incollati di nuovo in un LLM.'],
        ['Panoramica piano', 'Settimane, giorni, mesocicli, deload e anteprime sessione restano leggibili sul telefono.'],
        ['Tracking sessioni', 'Log serie, modifiche rapide, sessioni libere e cronologia ruotano attorno al training reale.'],
        ['Multi-modalità', 'Forza, intervalli cardio, corse costanti, mobilità e corpo libero vivono in un solo schema.'],
      ],
      phoneAlt: 'Schermata mobile Universal Fit',
    },
    examples: {
      eyebrow: 'Esempi',
      title: 'Inizia con esempi JSON reali.',
      intro: 'Il sito parte con un piccolo catalogo statico. Più avanti lo stesso loader potrà indicizzare una libreria curata completa.',
    },
    project: {
      eyebrow: 'Progetto aperto',
      title: 'Supporto e percorso vivono su GitHub.',
      intro: 'Il sito pubblico indirizza verso form strutturati per bug, idee, feedback schema e invii di piani.',
      support: 'Ottieni supporto',
      roadmap: 'Vedi percorso',
    },
  },
  planFilters: {
    searchLabel: 'Cerca piani',
    searchPlaceholder: 'Obiettivo, attrezzatura, autore...',
    goal: 'Obiettivo',
    level: 'Livello',
    modality: 'Modalità',
    shown: '{{count}} {{label}} mostrati',
    staticCatalog: 'Catalogo JSON statico',
  },
  planDetail: {
    eyebrow: 'JSON del piano',
    sampleDay: 'Giorno esempio',
    estimatedMinutes: '{{minutes}} minuti stimati',
    itemOne: 'voce',
    itemOther: 'voci',
    sets: '{{count}} serie',
    programOutline: 'Struttura programma',
    week: 'Settimana {{week}}',
    day: 'Giorno {{day}}',
    useThisPlan: 'Usa questo piano',
    useCopy: 'Scarica il file sorgente o aprilo nell’app quando i deep link saranno attivi sul dispositivo.',
    openInApp: 'Apri in Universal Fit',
    prompt: 'Usa questo JSON di piano Universal Fit come esempio di riferimento. Crea un nuovo piano con lo stesso schema, adattato al mio obiettivo, livello, attrezzatura e calendario.\n\nURL JSON di esempio: {{url}}',
  },
  generate: {
    title: 'Genera con l’IA',
    description: 'Genera e valida JSON di piani Universal Fit con un LLM.',
    eyebrow: 'Creazione',
    heading: 'Crea un allenamento, modifica JSON o usa l’IA come coautrice.',
    intro: 'Parti dai controlli guidati, incolla uno schema esistente o copia un prompt mirato per modifiche sicure.',
    steps: [
      ['1. Copia il prompt', 'Il prompt include le regole attese dall’app: un oggetto JSON, schema 1.0 e nessun campo sconosciuto.', 'Copia prompt LLM'],
      ['2. Incollalo in un LLM', 'Usa l’assistente preferito e descrivi obiettivo, calendario, attrezzatura e livello.', ''],
      ['3. Valida e salva', 'Il validatore trova problemi di schema prima che il JSON arrivi all’app.', 'Leggi la guida'],
    ],
    builderEyebrow: 'Costruttore allenamenti',
    builderTitle: 'Costruisci e rifinisci il piano prima dell’app.',
    builderIntro: 'Usa il costruttore per creare un file valido, incollare un piano esistente e scaricare o copiare il risultato validato.',
    prompt: '{{brief}}\n\nCrea per me un nuovo piano Universal Fit. Fai domande solo se necessarie, poi restituisci soltanto un oggetto JSON.',
  },
  builder: {
    modeAria: 'Modalità costruttore allenamenti',
    build: 'Crea',
    editJson: 'Modifica JSON',
    planName: 'Nome piano',
    goal: 'Obiettivo',
    goalPlaceholder: 'forza, resistenza, mobilità',
    level: 'Livello',
    focus: 'Enfasi',
    weeks: 'Settimane',
    daysPerWeek: 'Giorni/settimana',
    minutes: 'Minuti',
    restSeconds: 'Secondi recupero',
    equipmentTags: 'Tag attrezzatura',
    equipmentPlaceholder: 'manubri, tapis roulant',
    units: 'Unità',
    metric: 'metrico',
    imperial: 'imperiale',
    generate: 'Genera JSON allenamento',
    loadPasted: 'Carica JSON incollato',
    applyQuickEdits: 'Applica modifiche rapide',
    changeRequest: 'Richiesta modifica per IA',
    copyAiEditPrompt: 'Copia prompt modifica IA',
    jsonEditor: 'Editor JSON allenamento',
    downloadValid: 'Scarica piano valido',
    copyJson: 'Copia JSON',
    validation: 'Validazione',
    validationValid: 'Pronto per importare',
    defaultPlanName: 'Piano allenamento personalizzato',
    defaultGoal: 'forma generale',
    defaultEquipment: 'manubri, scarpe da corsa',
    defaultAdvancedRequest: 'Rendi questo allenamento più gentile sulle ginocchia senza cambiare obiettivo.',
    author: 'Costruttore Universal Fit',
    description: 'Piano {{focus}} di {{weeks}} settimane creato dal costruttore web.',
    deloadWeek: 'Deload e consolidamento',
    weekName: 'Settimana {{week}}',
    easyDay: '{{name}} facile',
    notices: {
      generated: 'JSON valido generato dai controlli.',
      pastedInvalid: 'Il JSON incollato richiede correzioni prima di alimentare i controlli.',
      loaded: 'Piano incollato caricato nei controlli.',
      fixFirst: 'Correggi prima il JSON, poi potrai applicare modifiche rapide.',
      applied: 'Modifiche rapide applicate al JSON.',
      copiedAi: 'Prompt IA copiato con il JSON attuale.',
      copiedJson: 'JSON attuale copiato.',
    },
    validationMessages: {
      summary: '{{weeks}} settimane, {{days}} giorni/settimana, {{level}}',
      fixSchema: 'Correggi i problemi di schema prima di importare.',
      invalidJson: 'L’editor non contiene JSON valido.',
    },
    aiPrompt: 'Stai modificando un file JSON di allenamento Universal Fit.\n\nRegole:\n- Mantieni schema_version a "1.0".\n- Restituisci solo un oggetto JSON completo.\n- Conserva i campi validi salvo quando la richiesta impone modifiche.\n- Mantieni plan.duration_weeks uguale a weeks.length.\n- Mantieni plan.days_per_week allineato ai giorni di allenamento previsti per settimana.\n- Non aggiungere campi sconosciuti al livello superiore.\n\nRichiesta di modifica:\n{{request}}\n\nJSON attuale:\n{{json}}',
    defaultAiRequest: 'Migliora questo piano mantenendolo valido e pronto per importare.',
    templates: {
      lowerStrength: 'Forza parte bassa',
      upperStrength: 'Forza parte alta',
      fullBody: 'Corpo intero',
      easyRun: 'Corsa facile',
      intervalRun: 'Corsa a intervalli',
      longEasyRun: 'Corsa lunga facile',
      mobilityFlow: 'Flusso mobilità',
      stabilityReset: 'Reset stabilità',
    },
  },
  support: {
    title: 'Supporto',
    description: 'Ottieni supporto per Universal Fit tramite form GitHub strutturati.',
    eyebrow: 'Supporto',
    heading: 'Raccontaci cosa è successo o cosa dovrebbe esistere.',
    intro: 'Universal Fit usa GitHub Issues per supporto e feedback pubblici. I form mantengono le segnalazioni ordinate.',
    cards: [
      ['Segnala bug app', 'Usalo quando importazione, validazione, tracking o navigazione fanno qualcosa di inatteso.', 'Apri segnalazione'],
      ['Richiedi funzione', 'Suggerisci un miglioramento workflow, una struttura piano supportata o un comportamento app.', 'Apri richiesta'],
      ['Invia esempio piano', 'Condividi un’idea di piano JSON che potrebbe entrare nel catalogo pubblico.', 'Invia piano'],
      ['Feedback schema o docs', 'Dicci dove la guida JSON, i documenti o la libreria esercizi non sono chiari.', 'Invia feedback'],
    ],
    before: {
      eyebrow: 'Prima di aprire',
      title: 'Una buona segnalazione include il JSON quando il JSON conta.',
      intro: 'Per problemi di importazione o validazione, allega il piano o incolla il frammento minimo che riproduce il problema. Per comportamento app, includi piattaforma e risultato atteso.',
      issues: 'Vedi segnalazioni esistenti',
      brief: 'Leggi guida schema',
    },
  },
  privacy: {
    title: 'Riservatezza',
    description: 'Note privacy di Universal Fit.',
    eyebrow: 'Riservatezza',
    heading: 'Offline-first per scelta progettuale.',
    intro: 'Universal Fit v1 è progettato attorno a file locali e log allenamento sul dispositivo. Il sito pubblico è statico.',
    cards: [
      ['Nessun account nella v1', 'L’app non richiede un account Universal Fit per importare piani o registrare sessioni.'],
      ['Sito statico', 'Questo sito è distribuito come file statici su GitHub Pages e non esegue un backend personalizzato.'],
      ['Nessun cookie di tracciamento', 'Analytics è disattivato per impostazione predefinita. Se arriverà dopo, dovrà rispettare la privacy e non usare cookie.'],
    ],
  },
  roadmap: {
    title: 'Percorso',
    description: 'Percorso Universal Fit e link progetto GitHub.',
    eyebrow: 'Percorso',
    heading: 'Segui ciò che è pianificato, attivo e rilasciato.',
    intro: 'GitHub resta la fonte di verità per la gestione del progetto. Questa pagina dà agli utenti un ingresso leggibile.',
    groups: [
      ['Pianificato', ['Libreria piani curata con esempi più profondi', 'Universal Links e App Links per import diretti', 'Decisione analytics rispettosa della privacy']],
      ['In corso', ['Pubblicazione sito statico e docs', 'Flusso validatore Genera con IA', 'Form GitHub per supporto e feedback']],
      ['Rilasciato', ['Guida schema JSON portabile', 'Architettura app offline-first', 'Dati iniziali libreria esercizi']],
    ],
    github: {
      eyebrow: 'Gestione progetto GitHub',
      title: 'Usa GitHub per il livello operativo.',
      intro: 'Issue, milestone, label e viste progetto sono collegate direttamente. Se aggiungiamo card live, dovranno essere generate al build con GitHub Actions.',
      issues: 'Segnalazioni',
      milestones: 'Traguardi',
      projects: 'Progetti',
      schemaLabel: 'Etichetta schema',
    },
  },
  docs: {
    ...it.docs,
    docs: 'Documentazione',
    schema: { ...it.docs.schema, title: 'Riferimento schema' },
  },
  validator: {
    pasteJson: 'Incolla JSON piano',
    titleInvalid: 'Il piano non è stato validato',
    messageInvalid: 'Correggi questi problemi di schema e riprova.',
    titleParse: 'Errore lettura JSON',
    messageParse: 'Il valore incollato non è JSON valido.',
    downloadValid: 'Scarica piano valido',
  },
});

export const pageMessages: Record<Locale, PageMessages> = { en, es, pt, fr, de, it };

const TRANSLATION_IDENTITY_ALLOWLIST = new Set(['common.brand']);
const CANONICAL_UNTRANSLATED_VALUES = new Set(['Universal Fit', 'JSON', 'LLM', 'GitHub', 'iOS', 'Android']);

function isAllowedIdenticalString(path: string, value: string) {
  if (value === '') return true;
  if (TRANSLATION_IDENTITY_ALLOWLIST.has(path)) return true;
  if (CANONICAL_UNTRANSLATED_VALUES.has(value)) return true;
  return false;
}

function collectIdenticalStrings(source: unknown, localized: unknown, prefix: string, output: string[]) {
  if (typeof source === 'string' && typeof localized === 'string') {
    if (source === localized && !isAllowedIdenticalString(prefix, source)) {
      output.push(prefix);
    }
    return;
  }

  if (Array.isArray(source) && Array.isArray(localized)) {
    source.forEach((item, index) => collectIdenticalStrings(item, localized[index], `${prefix}[${index}]`, output));
    return;
  }

  if (source && localized && typeof source === 'object' && typeof localized === 'object') {
    Object.keys(source as Record<string, unknown>).forEach((key) => {
      collectIdenticalStrings(
        (source as Record<string, unknown>)[key],
        (localized as Record<string, unknown>)[key],
        prefix ? `${prefix}.${key}` : key,
        output
      );
    });
  }
}

function assertLocalizedMessages(messages: Record<Locale, PageMessages>) {
  const failures: string[] = [];
  SITE_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).forEach((locale) => {
    const identical: string[] = [];
    collectIdenticalStrings(messages[DEFAULT_LOCALE], messages[locale], '', identical);
    failures.push(...identical.map((path) => `${locale}.${path}`));
  });

  if (failures.length > 0) {
    throw new Error(`Missing localized page messages:\n${failures.join('\n')}`);
  }
}

assertLocalizedMessages(pageMessages);

export function isLocale(value: string | undefined): value is Locale {
  return !!value && SITE_LOCALES.includes(value as Locale);
}

export function getMessages(locale: Locale) {
  return pageMessages[locale];
}

export function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => String(values[key] ?? ''));
}

export function routePath(path = '/', locale: Locale = DEFAULT_LOCALE) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

export function localizedUrl(path = '/', locale: Locale = DEFAULT_LOCALE) {
  return withBase(routePath(path, locale));
}

export function absoluteLocalizedUrl(path = '/', locale: Locale = DEFAULT_LOCALE) {
  return absoluteUrl(routePath(path, locale));
}

export function alternateLinks(path = '/') {
  return SITE_LOCALES.map((locale) => ({
    locale,
    href: absoluteLocalizedUrl(path, locale),
    label: LANGUAGE_LABELS[locale],
  }));
}

export function stripLocaleFromPath(pathname: string) {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const first = clean.split('/')[1];
  if (!isLocale(first)) return clean;
  const rest = clean.slice(first.length + 1);
  return rest || '/';
}

export function labelize(value: string, locale: Locale, group?: 'goal' | 'level' | 'modality') {
  const m = getMessages(locale);
  const fromGroup = group ? (m.taxonomy[group] as Record<string, string>)[value] : undefined;
  if (fromGroup) return fromGroup;
  return value.replace(/[_-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}
