import { useMemo, useState } from 'react';
import type { PageMessages } from '../lib/i18n';
import { formatPlanIssues, planJsonSchema, type PlanJson } from '../lib/planSchema';

type Focus = 'strength' | 'running' | 'hybrid' | 'mobility';
type Level = PlanJson['plan']['level'];
type UnitSystem = 'metric' | 'imperial';
type Panel = 'build' | 'edit';

type BuilderState = {
  name: string;
  goal: string;
  level: Level;
  focus: Focus;
  durationWeeks: number;
  daysPerWeek: number;
  sessionMinutes: number;
  restSeconds: number;
  equipment: string;
  unitSystem: UnitSystem;
};

type ValidationResult =
  | {
      ok: true;
      plan: PlanJson;
      summary: string;
      issues: string[];
    }
  | {
      ok: false;
      plan: null;
      summary: string;
      issues: string[];
    };

type DayTemplate = {
  name: string;
  tags: string[];
  buildItems: (week: number, state: BuilderState, dayIndex: number) => Array<Record<string, unknown>>;
};

type BuilderLabels = PageMessages['builder'];
type BuilderTaxonomy = PageMessages['taxonomy'];

type Props = {
  labels?: BuilderLabels;
  taxonomy?: BuilderTaxonomy;
  common?: Pick<PageMessages['common'], 'valid' | 'needsFixes' | 'weeks' | 'downloadJson'> & {
    days: string;
    sessions: string;
  };
};

const daySlots = [1, 3, 5, 2, 4, 6, 7];

const levels: Level[] = ['beginner', 'intermediate', 'advanced'];
const focuses: Focus[] = ['strength', 'running', 'hybrid', 'mobility'];

const defaultLabels: BuilderLabels = {
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
};

const defaultTaxonomy: BuilderTaxonomy = {
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
    hybrid: 'Hybrid',
    mobility: 'Mobility',
    cardio: 'Cardio',
    bodyweight: 'Bodyweight',
  },
  exercise: {
    pattern: 'Pattern',
    primary: 'Primary',
    equipment: 'Equipment',
    experience: 'Experience',
  },
};

const defaultCommon = {
  valid: 'Valid',
  needsFixes: 'Needs fixes',
  weeks: 'weeks',
  days: 'days',
  sessions: 'sessions',
  downloadJson: 'Download JSON',
};

function getDefaultBuilderState(labels: BuilderLabels): BuilderState {
  return {
    name: labels.defaultPlanName,
    goal: labels.defaultGoal,
    level: 'beginner',
    focus: 'hybrid',
    durationWeeks: 4,
    daysPerWeek: 3,
    sessionMinutes: 45,
    restSeconds: 120,
    equipment: labels.defaultEquipment,
    unitSystem: 'metric',
  };
}

function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => String(values[key] ?? ''));
}

function displayOption(value: string, taxonomy: BuilderTaxonomy, group: 'level' | 'modality') {
  return (taxonomy[group] as Record<string, string>)[value] || value;
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(Math.round(value), min), max);
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return slug || 'custom-workout-plan';
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function strengthExercise(exerciseRef: string, week: number, state: BuilderState, options: { reps?: number | string; baseSets?: number; rest?: number } = {}) {
  const levelBias = state.level === 'beginner' ? 0 : state.level === 'intermediate' ? 1 : 2;
  const progression = Math.min(2, Math.floor((week - 1) / 2));
  const deload = state.durationWeeks >= 4 && week === state.durationWeeks;
  const sets = deload ? Math.max(2, (options.baseSets ?? 3) - 1) : (options.baseSets ?? 3) + progression;
  const rpe = deload ? 6 : Math.min(9, 7 + levelBias);

  return {
    kind: 'exercise',
    exercise_ref: exerciseRef,
    sets_template: {
      count: sets,
      set: {
        reps: options.reps ?? (state.level === 'advanced' ? 6 : 8),
        load: { rpe },
        rest_seconds: options.rest ?? state.restSeconds,
      },
    },
  };
}

function cardioExercise(structure: string, week: number, state: BuilderState, dayIndex: number) {
  const minutes = Math.max(20, state.sessionMinutes + week * 2 + dayIndex * 3);

  if (structure === 'intervals') {
    return {
      kind: 'exercise',
      exercise_ref: 'running',
      cardio: {
        structure: 'intervals',
        modality: 'running',
        warmup: { duration_minutes: 10 },
        intervals: [
          {
            repeat: state.level === 'advanced' ? 8 : state.level === 'intermediate' ? 6 : 4,
            work: { duration_minutes: state.level === 'beginner' ? 1 : 2 },
            rest: { duration_seconds: 90, type: 'walk' },
          },
        ],
        cooldown: { duration_minutes: 8 },
      },
    };
  }

  return {
    kind: 'exercise',
    exercise_ref: 'running',
    cardio: {
      structure: 'steady',
      modality: 'running',
      target: {
        duration_minutes: minutes,
        hr_zone: structure === 'tempo' ? 3 : 2,
      },
    },
  };
}

function mobilityExercise(exerciseRef: string, state: BuilderState, reps = '45 seconds per side') {
  return {
    kind: 'exercise',
    exercise_ref: exerciseRef,
    sets_template: {
      count: state.level === 'advanced' ? 3 : 2,
      set: {
        reps,
        rest_seconds: Math.min(state.restSeconds, 60),
      },
    },
  };
}

function templatesForFocus(focus: Focus, labels: BuilderLabels): DayTemplate[] {
  const strengthTemplates: DayTemplate[] = [
    {
      name: labels.templates.lowerStrength,
      tags: ['strength', 'lower-body'],
      buildItems: (week, state) => [
        strengthExercise('goblet_squat', week, state, { reps: 8 }),
        strengthExercise('romanian_deadlift', week, state, { reps: 8 }),
        strengthExercise('walking_lunge', week, state, { reps: '10 per side', baseSets: 2, rest: 90 }),
      ],
    },
    {
      name: labels.templates.upperStrength,
      tags: ['strength', 'upper-body'],
      buildItems: (week, state) => [
        strengthExercise('dumbbell_bench_press', week, state, { reps: 8 }),
        strengthExercise('one_arm_dumbbell_row', week, state, { reps: '10 per side' }),
        strengthExercise('dumbbell_shoulder_press', week, state, { reps: 8, baseSets: 2, rest: 90 }),
      ],
    },
    {
      name: labels.templates.fullBody,
      tags: ['strength', 'full-body'],
      buildItems: (week, state) => [
        strengthExercise('trap_bar_deadlift', week, state, { reps: 5, rest: 150 }),
        strengthExercise('push_up', week, state, { reps: '8-12', baseSets: 3, rest: 90 }),
        strengthExercise('plank', week, state, { reps: '30-45 seconds', baseSets: 3, rest: 60 }),
      ],
    },
  ];

  const runningTemplates: DayTemplate[] = [
    {
      name: labels.templates.easyRun,
      tags: ['running', 'aerobic'],
      buildItems: (week, state, dayIndex) => [cardioExercise('steady', week, state, dayIndex)],
    },
    {
      name: labels.templates.intervalRun,
      tags: ['running', 'intervals'],
      buildItems: (week, state, dayIndex) => [cardioExercise('intervals', week, state, dayIndex)],
    },
    {
      name: labels.templates.longEasyRun,
      tags: ['running', 'endurance'],
      buildItems: (week, state, dayIndex) => [cardioExercise('steady', week + 3, state, dayIndex)],
    },
  ];

  const mobilityTemplates: DayTemplate[] = [
    {
      name: labels.templates.mobilityFlow,
      tags: ['mobility', 'recovery'],
      buildItems: (_week, state) => [
        mobilityExercise('worlds_greatest_stretch', state),
        mobilityExercise('couch_stretch', state),
        mobilityExercise('thoracic_rotation', state, '8 controlled reps per side'),
      ],
    },
    {
      name: labels.templates.stabilityReset,
      tags: ['mobility', 'stability'],
      buildItems: (_week, state) => [
        mobilityExercise('dead_bug', state, '8 per side'),
        mobilityExercise('side_plank', state, '25 seconds per side'),
        mobilityExercise('single_leg_glute_bridge', state, '10 per side'),
      ],
    },
  ];

  if (focus === 'strength') return strengthTemplates;
  if (focus === 'running') return runningTemplates;
  if (focus === 'mobility') return mobilityTemplates;

  return [strengthTemplates[0], runningTemplates[0], strengthTemplates[1], runningTemplates[1], mobilityTemplates[0]];
}

function buildDay(template: DayTemplate, week: number, state: BuilderState, labels: BuilderLabels, dayIndex: number, daySlot = daySlots[dayIndex] ?? dayIndex + 1) {
  const deload = state.durationWeeks >= 4 && week === state.durationWeeks;

  return {
    day: daySlot,
    name: deload && template.tags.includes('strength') ? format(labels.easyDay, { name: template.name }) : template.name,
    tags: template.tags,
    estimated_minutes: deload ? Math.max(25, state.sessionMinutes - 10) : state.sessionMinutes,
    blocks: [
      {
        type: 'main',
        name: template.name,
        items: template.buildItems(week, state, dayIndex),
      },
    ],
  };
}

function buildPlan(state: BuilderState, labels: BuilderLabels): PlanJson {
  const durationWeeks = clamp(state.durationWeeks, 1, 12);
  const daysPerWeek = clamp(state.daysPerWeek, 1, 6);
  const templates = templatesForFocus(state.focus, labels);
  const equipmentTags = state.equipment
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return {
    schema_version: '1.0',
    plan: {
      id: `${slugify(state.name)}-${durationWeeks}wk`,
      name: state.name.trim() || labels.defaultPlanName,
      author: labels.author,
      description: format(labels.description, { weeks: durationWeeks, focus: state.focus }),
      goal: state.goal.trim() || labels.defaultGoal,
      level: state.level,
      duration_weeks: durationWeeks,
      days_per_week: daysPerWeek,
      tags: Array.from(new Set([state.focus, state.goal.trim().toLowerCase(), state.level, ...equipmentTags].filter(Boolean))),
    },
    settings: {
      units: {
        weight: state.unitSystem === 'metric' ? 'kg' : 'lb',
        distance: state.unitSystem === 'metric' ? 'km' : 'mi',
      },
      rest_default_seconds: clamp(state.restSeconds, 30, 300),
    },
    weeks: Array.from({ length: durationWeeks }, (_, weekIndex) => {
      const week = weekIndex + 1;
      return {
        week,
        name: week === durationWeeks && durationWeeks >= 4 ? labels.deloadWeek : format(labels.weekName, { week }),
        deload: week === durationWeeks && durationWeeks >= 4 ? true : undefined,
        days: Array.from({ length: daysPerWeek }, (_day, dayIndex) => {
          const template = templates[dayIndex % templates.length];
          return buildDay(template, week, state, labels, dayIndex);
        }),
      };
    }),
  };
}

function validateJson(value: string, labels: BuilderLabels): ValidationResult {
  try {
    const parsed = JSON.parse(value);
    const checked = planJsonSchema.safeParse(parsed);
    if (checked.success) {
      const { plan } = checked.data;
      return {
        ok: true,
        plan: checked.data,
        summary: format(labels.validationMessages.summary, { weeks: plan.duration_weeks, days: plan.days_per_week, level: plan.level }),
        issues: [],
      };
    }

    return {
      ok: false,
      plan: null,
      summary: labels.validationMessages.fixSchema,
      issues: formatPlanIssues(checked.error),
    };
  } catch (error) {
    return {
      ok: false,
      plan: null,
      summary: error instanceof Error ? error.message : labels.validationMessages.invalidJson,
      issues: [],
    };
  }
}

function stateFromPlan(plan: PlanJson, labels: BuilderLabels): BuilderState {
  const fallback = getDefaultBuilderState(labels);
  const restDefault = plan.settings && typeof plan.settings.rest_default_seconds === 'number' ? plan.settings.rest_default_seconds : fallback.restSeconds;
  const units = plan.settings?.units;
  const distance = typeof units === 'object' && units !== null && 'distance' in units ? String((units as Record<string, unknown>).distance) : 'km';
  const tags = plan.plan.tags ?? [];
  const focus = focuses.find((item) => tags.includes(item) || plan.plan.goal.toLowerCase().includes(item)) ?? fallback.focus;

  return {
    name: plan.plan.name,
    goal: plan.plan.goal,
    level: plan.plan.level,
    focus,
    durationWeeks: plan.plan.duration_weeks,
    daysPerWeek: plan.plan.days_per_week,
    sessionMinutes: plan.weeks[0]?.days[0]?.estimated_minutes ?? fallback.sessionMinutes,
    restSeconds: restDefault,
    equipment: tags.filter((tag) => !focuses.includes(tag as Focus) && !levels.includes(tag as Level)).join(', '),
    unitSystem: distance === 'mi' ? 'imperial' : 'metric',
  };
}

function updateRestSeconds(value: unknown, restSeconds: number): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => updateRestSeconds(item, restSeconds));
  }

  if (value && typeof value === 'object') {
    const next: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
      next[key] = key === 'rest_seconds' ? restSeconds : updateRestSeconds(entry, restSeconds);
    });
    return next;
  }

  return value;
}

function resizeWeeks(plan: PlanJson, targetWeeks: number, labels: BuilderLabels) {
  const weeks = deepClone(plan.weeks).slice(0, targetWeeks);
  const fallbackWeek = weeks[weeks.length - 1] ?? buildPlan(getDefaultBuilderState(labels), labels).weeks[0];

  while (weeks.length < targetWeeks) {
    const nextWeek = deepClone(fallbackWeek);
    nextWeek.week = weeks.length + 1;
    nextWeek.name = format(labels.weekName, { week: nextWeek.week });
    nextWeek.deload = undefined;
    weeks.push(nextWeek);
  }

  return weeks.map((week, index) => ({
    ...week,
    week: index + 1,
  }));
}

function resizeDays(plan: PlanJson, state: BuilderState, labels: BuilderLabels) {
  const targetDays = clamp(state.daysPerWeek, 1, 6);
  const templates = templatesForFocus(state.focus, labels);

  return plan.weeks.map((week) => {
    const days = deepClone(week.days).slice(0, targetDays);

    while (days.length < targetDays) {
      const dayIndex = days.length;
      days.push(buildDay(templates[dayIndex % templates.length], week.week, state, labels, dayIndex));
    }

    return {
      ...week,
      days: days.map((day, index) => ({
        ...day,
        day: daySlots[index] ?? index + 1,
      })),
    };
  });
}

function applyQuickChanges(plan: PlanJson, state: BuilderState, labels: BuilderLabels): PlanJson {
  const next = deepClone(plan);
  const durationWeeks = clamp(state.durationWeeks, 1, 12);
  const daysPerWeek = clamp(state.daysPerWeek, 1, 6);
  const restSeconds = clamp(state.restSeconds, 30, 300);
  const equipmentTags = state.equipment
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  next.plan.name = state.name.trim() || next.plan.name;
  next.plan.id = `${slugify(next.plan.name)}-${durationWeeks}wk`;
  next.plan.goal = state.goal.trim() || next.plan.goal;
  next.plan.level = state.level;
  next.plan.duration_weeks = durationWeeks;
  next.plan.days_per_week = daysPerWeek;
  next.plan.tags = Array.from(new Set([state.focus, state.goal.trim().toLowerCase(), state.level, ...equipmentTags].filter(Boolean)));
  next.settings = {
    ...(next.settings ?? {}),
    units: {
      weight: state.unitSystem === 'metric' ? 'kg' : 'lb',
      distance: state.unitSystem === 'metric' ? 'km' : 'mi',
    },
    rest_default_seconds: restSeconds,
  };
  next.weeks = resizeWeeks(next, durationWeeks, labels);
  next.weeks = resizeDays(next, state, labels);

  return updateRestSeconds(next, restSeconds) as PlanJson;
}

function formatJson(plan: PlanJson) {
  return JSON.stringify(plan, null, 2);
}

function buildAiEditPrompt(plan: PlanJson, request: string, labels: BuilderLabels) {
  return format(labels.aiPrompt, {
    request: request.trim() || labels.defaultAiRequest,
    json: JSON.stringify(plan, null, 2),
  });
}

export default function WorkoutBuilder({ labels = defaultLabels, taxonomy = defaultTaxonomy, common = defaultCommon }: Props) {
  const initialState = useMemo(() => getDefaultBuilderState(labels), [labels]);
  const [panel, setPanel] = useState<Panel>('build');
  const [builderState, setBuilderState] = useState<BuilderState>(initialState);
  const [jsonValue, setJsonValue] = useState(() => formatJson(buildPlan(initialState, labels)));
  const [advancedRequest, setAdvancedRequest] = useState(labels.defaultAdvancedRequest);
  const [notice, setNotice] = useState('');

  const validation = useMemo(() => validateJson(jsonValue, labels), [jsonValue, labels]);

  function updateField<Field extends keyof BuilderState>(field: Field, value: BuilderState[Field]) {
    setBuilderState((current) => ({ ...current, [field]: value }));
  }

  function updateNumberField(field: keyof Pick<BuilderState, 'durationWeeks' | 'daysPerWeek' | 'sessionMinutes' | 'restSeconds'>, value: string, min: number, max: number) {
    updateField(field, clamp(Number(value), min, max));
  }

  async function copyText(text: string, message: string) {
    await navigator.clipboard.writeText(text);
    setNotice(message);
  }

  function generateFromControls() {
    const nextPlan = buildPlan(builderState, labels);
    setJsonValue(formatJson(nextPlan));
    setNotice(labels.notices.generated);
  }

  function loadPastedPlan() {
    if (!validation.ok) {
      setNotice(labels.notices.pastedInvalid);
      return;
    }

    setBuilderState(stateFromPlan(validation.plan, labels));
    setNotice(labels.notices.loaded);
    setPanel('edit');
  }

  function applyChanges() {
    if (!validation.ok) {
      setNotice(labels.notices.fixFirst);
      return;
    }

    const nextPlan = applyQuickChanges(validation.plan, builderState, labels);
    setJsonValue(formatJson(nextPlan));
    setNotice(labels.notices.applied);
  }

  function downloadJson() {
    if (!validation.ok) return;
    const blob = new Blob([jsonValue], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(validation.plan.plan.name)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[25rem_1fr]">
      <div className="tool-panel h-fit p-4 md:p-5">
        <div className="segmented-control" aria-label={labels.modeAria}>
          <button type="button" className="segmented-option" data-active={panel === 'build'} onClick={() => setPanel('build')}>
            {labels.build}
          </button>
          <button type="button" className="segmented-option" data-active={panel === 'edit'} onClick={() => setPanel('edit')}>
            {labels.editJson}
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="ui-label">
            {labels.planName}
            <input className="ui-control" value={builderState.name} onChange={(event) => updateField('name', event.target.value)} />
          </label>

          <label className="ui-label">
            {labels.goal}
            <input className="ui-control" value={builderState.goal} onChange={(event) => updateField('goal', event.target.value)} placeholder={labels.goalPlaceholder} />
          </label>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <label className="ui-label">
              {labels.level}
              <select className="ui-control" value={builderState.level} onChange={(event) => updateField('level', event.target.value as Level)}>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {displayOption(level, taxonomy, 'level')}
                  </option>
                ))}
              </select>
            </label>

            <label className="ui-label">
              {labels.focus}
              <select className="ui-control" value={builderState.focus} onChange={(event) => updateField('focus', event.target.value as Focus)}>
                {focuses.map((focus) => (
                  <option key={focus} value={focus}>
                    {displayOption(focus, taxonomy, 'modality')}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="ui-label">
              {labels.weeks}
              <input className="ui-control" type="number" min={1} max={12} value={builderState.durationWeeks} onChange={(event) => updateNumberField('durationWeeks', event.target.value, 1, 12)} />
            </label>

            <label className="ui-label">
              {labels.daysPerWeek}
              <input className="ui-control" type="number" min={1} max={6} value={builderState.daysPerWeek} onChange={(event) => updateNumberField('daysPerWeek', event.target.value, 1, 6)} />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="ui-label">
              {labels.minutes}
              <input className="ui-control" type="number" min={20} max={120} value={builderState.sessionMinutes} onChange={(event) => updateNumberField('sessionMinutes', event.target.value, 20, 120)} />
            </label>

            <label className="ui-label">
              {labels.restSeconds}
              <input className="ui-control" type="number" min={30} max={300} step={15} value={builderState.restSeconds} onChange={(event) => updateNumberField('restSeconds', event.target.value, 30, 300)} />
            </label>
          </div>

          <label className="ui-label">
            {labels.equipmentTags}
            <input className="ui-control" value={builderState.equipment} onChange={(event) => updateField('equipment', event.target.value)} placeholder={labels.equipmentPlaceholder} />
          </label>

          <label className="ui-label">
            {labels.units}
            <select className="ui-control" value={builderState.unitSystem} onChange={(event) => updateField('unitSystem', event.target.value as UnitSystem)}>
              <option value="metric">{labels.metric}</option>
              <option value="imperial">{labels.imperial}</option>
            </select>
          </label>

          {panel === 'build' ? (
            <button type="button" onClick={generateFromControls} className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-black text-on-accent">
              {labels.generate}
            </button>
          ) : (
            <div className="grid gap-3">
              <button type="button" onClick={loadPastedPlan} className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-primary px-4 text-sm font-black text-white">
                {labels.loadPasted}
              </button>
              <button type="button" onClick={applyChanges} className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-black text-on-accent">
                {labels.applyQuickEdits}
              </button>
              <label className="ui-label">
                {labels.changeRequest}
                <textarea className="ui-control min-h-28 resize-y" value={advancedRequest} onChange={(event) => setAdvancedRequest(event.target.value)} />
              </label>
              <button
                type="button"
                disabled={!validation.ok}
                onClick={() => validation.ok && copyText(buildAiEditPrompt(validation.plan, advancedRequest, labels), labels.notices.copiedAi)}
                className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] border border-subtle bg-surface-raised px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:text-faint"
              >
                {labels.copyAiEditPrompt}
              </button>
            </div>
          )}

          <p className="ui-help">
            {panel === 'build'
              ? labels.validationValid
              : labels.validation}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="tool-panel p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className={`inline-flex rounded-[6px] px-2.5 py-1 text-xs font-black uppercase ${validation.ok ? 'bg-success-soft text-success' : 'bg-[rgba(255,69,69,0.12)] text-danger'}`}>
                {validation.ok ? common.valid : common.needsFixes}
              </div>
              <h3 className="mt-3 text-2xl font-black text-white">{validation.ok ? validation.plan.plan.name : labels.jsonEditor}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{validation.summary}</p>
            </div>
            {validation.ok && (
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted">
                <div className="rounded-[var(--radius-card)] border border-subtle bg-app px-3 py-2">
                  <span className="block text-lg font-black text-white">{validation.plan.plan.duration_weeks}</span>
                  {common.weeks}
                </div>
                <div className="rounded-[var(--radius-card)] border border-subtle bg-app px-3 py-2">
                  <span className="block text-lg font-black text-white">{validation.plan.plan.days_per_week}</span>
                  {common.days}
                </div>
                <div className="rounded-[var(--radius-card)] border border-subtle bg-app px-3 py-2">
                  <span className="block text-lg font-black text-white">{validation.plan.weeks.reduce((sum, week) => sum + week.days.length, 0)}</span>
                  {common.sessions}
                </div>
              </div>
            )}
          </div>

          <label className="mt-5 grid gap-3 text-sm font-black text-white">
            {labels.jsonEditor}
            <textarea
              value={jsonValue}
              onChange={(event) => setJsonValue(event.target.value)}
              spellCheck={false}
              className="min-h-[34rem] resize-y rounded-[var(--radius-card)] border border-subtle bg-app p-4 font-mono text-sm leading-6 text-white outline-none focus:border-accent"
            />
          </label>

          {validation.issues.length > 0 && (
            <ul className="mt-4 grid gap-2">
              {validation.issues.slice(0, 6).map((issue) => (
                <li key={issue} className="rounded-[var(--radius-card)] border border-subtle bg-app p-3 text-sm leading-6 text-muted">
                  {issue}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={loadPastedPlan} className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] border border-subtle bg-surface-raised px-4 text-sm font-black text-white">
              {labels.loadPasted}
            </button>
            <button
              type="button"
              disabled={!validation.ok}
              onClick={() => validation.ok && copyText(formatJson(validation.plan), labels.notices.copiedJson)}
              className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-primary px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-faint"
            >
              {labels.copyJson}
            </button>
            <button
              type="button"
              disabled={!validation.ok}
              onClick={downloadJson}
              className="inline-flex min-h-[var(--button-height)] items-center justify-center rounded-[var(--radius-control)] bg-accent px-4 text-sm font-black text-on-accent disabled:cursor-not-allowed disabled:bg-surface-raised disabled:text-faint"
            >
              {common.downloadJson}
            </button>
          </div>

          {notice && <p className="mt-4 rounded-[var(--radius-card)] border border-subtle bg-app p-3 text-sm leading-6 text-muted">{notice}</p>}
        </div>
      </div>
    </div>
  );
}
