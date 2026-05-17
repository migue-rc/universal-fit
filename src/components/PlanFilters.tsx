import { useMemo, useState } from 'react';

export type CatalogPlan = {
  slug: string;
  name: string;
  author: string;
  description: string;
  goal: string;
  level: string;
  durationWeeks: number;
  daysPerWeek: number;
  tags: string[];
  equipment: string[];
  modality: string;
  estimatedMinutes: number;
  sessionCount: number;
  sampleDayName: string;
  detailUrl: string;
  downloadUrl: string;
};

type Props = {
  plans: CatalogPlan[];
  labels?: {
    searchLabel: string;
    searchPlaceholder: string;
    goal: string;
    level: string;
    modality: string;
    shown: string;
    staticCatalog: string;
    planSingular: string;
    planPlural: string;
    duration: string;
    weekly: string;
    avgDay: string;
    by: string;
    viewPlan: string;
    downloadJson: string;
    all: Record<string, string>;
    taxonomy: {
      goal: Record<string, string>;
      level: Record<string, string>;
      modality: Record<string, string>;
    };
  };
};

const defaultLabels = {
  searchLabel: 'Search plans',
  searchPlaceholder: 'Search goal, equipment, author...',
  goal: 'Goal',
  level: 'Level',
  modality: 'Modality',
  shown: '{{count}} {{label}} shown',
  staticCatalog: 'Static JSON catalog',
  planSingular: 'plan',
  planPlural: 'plans',
  duration: 'Duration',
  weekly: 'Weekly',
  avgDay: 'Avg day',
  by: 'By',
  viewPlan: 'View plan',
  downloadJson: 'Download JSON',
  all: {
    Goal: 'All goals',
    Level: 'All levels',
    Modality: 'All modalities',
  },
  taxonomy: {
    goal: {},
    level: {},
    modality: {},
  },
};

function label(value: string, labels: Props['labels'] = defaultLabels, group?: 'goal' | 'level' | 'modality') {
  const mapped = group ? labels.taxonomy[group][value] : labels.taxonomy.modality[value] || labels.taxonomy.goal[value] || labels.taxonomy.level[value];
  if (mapped) return mapped;
  return value.replace(/[_-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => String(values[key] ?? ''));
}

function allLabel(labelText: string, labels: Props['labels'] = defaultLabels) {
  return labels.all[labelText] || `All ${labelText.toLowerCase()}s`;
}

export default function PlanFilters({ plans, labels = defaultLabels }: Props) {
  const [query, setQuery] = useState('');
  const [goal, setGoal] = useState('all');
  const [level, setLevel] = useState('all');
  const [modality, setModality] = useState('all');

  const goals = useMemo(() => ['all', ...Array.from(new Set(plans.map((plan) => plan.goal)))], [plans]);
  const levels = useMemo(() => ['all', ...Array.from(new Set(plans.map((plan) => plan.level)))], [plans]);
  const modalities = useMemo(() => ['all', ...Array.from(new Set(plans.map((plan) => plan.modality)))], [plans]);

  const filtered = plans.filter((plan) => {
    const haystack = [plan.name, plan.author, plan.description, plan.goal, plan.level, ...plan.tags, ...plan.equipment]
      .join(' ')
      .toLowerCase();
    return (
      haystack.includes(query.toLowerCase()) &&
      (goal === 'all' || plan.goal === goal) &&
      (level === 'all' || plan.level === level) &&
      (modality === 'all' || plan.modality === modality)
    );
  });

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-[var(--radius-card)] border border-subtle bg-surface p-4">
        <label className="grid gap-2 text-sm font-semibold text-white">
          {labels.searchLabel}
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="h-12 rounded-[var(--radius-control)] border border-subtle bg-app px-4 text-white outline-none ring-accent/0 transition placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </label>
        <div className="grid gap-3 md:grid-cols-3">
          <Select labelText={labels.goal} allKey="Goal" group="goal" labels={labels} value={goal} values={goals} onChange={setGoal} />
          <Select labelText={labels.level} allKey="Level" group="level" labels={labels} value={level} values={levels} onChange={setLevel} />
          <Select labelText={labels.modality} allKey="Modality" group="modality" labels={labels} value={modality} values={modalities} onChange={setModality} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted">
          {format(labels.shown, { count: filtered.length, label: filtered.length === 1 ? labels.planSingular : labels.planPlural })}
        </p>
        <p className="text-sm text-faint">{labels.staticCatalog}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((plan) => (
          <article key={plan.slug} className="surface-card grid gap-5 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[6px] bg-accent-soft px-2.5 py-1 text-xs font-bold uppercase text-accent">
                {label(plan.goal, labels, 'goal')}
              </span>
              <span className="rounded-[6px] bg-primary-soft px-2.5 py-1 text-xs font-bold uppercase text-primary">
                {label(plan.level, labels, 'level')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight text-white">{plan.name}</h2>
              <p className="mt-2 text-sm text-muted">{labels.by} {plan.author}</p>
              <p className="mt-4 leading-7 text-muted">{plan.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <Stat value={`${plan.durationWeeks} wk`} labelText={labels.duration} />
              <Stat value={`${plan.daysPerWeek}x`} labelText={labels.weekly} />
              <Stat value={`${plan.estimatedMinutes}m`} labelText={labels.avgDay} />
            </div>
            <div className="flex flex-wrap gap-2">
              {[plan.modality, ...plan.equipment.slice(0, 4)].filter(Boolean).map((tag) => (
                <span key={tag} className="rounded-[6px] border border-subtle px-2.5 py-1 text-xs font-semibold text-muted">
                  {label(tag, labels)}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={plan.detailUrl} className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[var(--radius-control)] bg-primary px-4 text-sm font-bold text-white">
                {labels.viewPlan}
              </a>
              <a href={plan.downloadUrl} download className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[var(--radius-control)] border border-subtle px-4 text-sm font-bold text-muted">
                {labels.downloadJson}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Select({
  labelText,
  allKey,
  group,
  labels,
  value,
  values,
  onChange,
}: {
  labelText: string;
  allKey: string;
  group: 'goal' | 'level' | 'modality';
  labels: NonNullable<Props['labels']>;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white">
      {labelText}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[var(--radius-control)] border border-subtle bg-app px-3 text-white outline-none focus:border-accent"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item === 'all' ? allLabel(allKey, labels) : label(item, labels, group)}
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ value, labelText }: { value: string; labelText: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-subtle bg-app p-3">
      <strong className="block text-base text-white">{value}</strong>
      <span className="text-xs text-faint">{labelText}</span>
    </div>
  );
}
