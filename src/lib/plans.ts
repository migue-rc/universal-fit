import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_LOCALE, getMessages, labelize, localizedUrl, type Locale } from './i18n';
import { planJsonSchema, type PlanJson } from './planSchema';
import { withBase } from './siteConfig';

export type PlanSummary = {
  slug: string;
  id: string;
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
  raw: PlanJson;
};

const plansDir = path.join(process.cwd(), 'public', 'plans');

function titleCase(value: string) {
  return value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function collectEquipment(plan: PlanJson) {
  const customEquipment = Object.values(plan.exercises || {})
    .flatMap((exercise) => (Array.isArray(exercise.equipment) ? exercise.equipment : []))
    .filter((item): item is string => typeof item === 'string');

  const tagEquipment = (plan.plan.tags || []).filter((tag) =>
    ['barbell', 'dumbbell', 'kettlebell', 'bodyweight', 'rack', 'machine', 'running'].includes(tag)
  );

  return Array.from(new Set([...customEquipment, ...tagEquipment])).slice(0, 6);
}

function inferModality(plan: PlanJson) {
  const tags = new Set((plan.plan.tags || []).map((tag) => tag.toLowerCase()));
  if (tags.has('hybrid')) return 'hybrid';
  if (tags.has('mobility') && !tags.has('strength') && !tags.has('hypertrophy')) return 'mobility';
  if (tags.has('strength') || tags.has('hypertrophy') || tags.has('bodybuilding')) return 'strength';
  if (tags.has('running') || tags.has('cardio')) return 'running';
  if (plan.plan.goal === 'endurance') return 'running';
  if (plan.plan.goal === 'mobility') return 'mobility';
  if (plan.plan.goal === 'hypertrophy' || plan.plan.goal === 'strength') return 'strength';
  return 'strength';
}

function summarizePlan(slug: string, raw: PlanJson, locale: Locale): PlanSummary {
  const days = raw.weeks.flatMap((week) => week.days.filter((day) => !day.rest_day));
  const estimatedMinutes = Math.round(
    days.reduce((total, day) => total + (day.estimated_minutes || 45), 0) / Math.max(days.length, 1)
  );
  const sampleDay = days[0] || raw.weeks[0]?.days[0];
  const localizedPlan = getMessages(locale).plans[slug as keyof ReturnType<typeof getMessages>['plans']];

  return {
    slug,
    id: raw.plan.id,
    name: localizedPlan?.[0] || raw.plan.name,
    author: raw.plan.author || 'Universal Fit',
    description: localizedPlan?.[1] || raw.plan.description || `${titleCase(raw.plan.goal)} plan for ${raw.plan.level} athletes.`,
    goal: raw.plan.goal,
    level: raw.plan.level,
    durationWeeks: raw.plan.duration_weeks,
    daysPerWeek: raw.plan.days_per_week,
    tags: raw.plan.tags || [],
    equipment: collectEquipment(raw),
    modality: inferModality(raw),
    estimatedMinutes,
    sessionCount: days.length,
    sampleDayName: sampleDay?.name || 'Training day',
    detailUrl: localizedUrl(`/plans/${slug}`, locale),
    downloadUrl: withBase(`/plans/${slug}.json`),
    raw,
  };
}

export async function loadPlans(locale: Locale = DEFAULT_LOCALE): Promise<PlanSummary[]> {
  const entries = await readdir(plansDir);
  const jsonFiles = entries.filter((entry) => entry.endsWith('.json')).sort();
  const plans = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = JSON.parse(await readFile(path.join(plansDir, file), 'utf8'));
      const parsed = planJsonSchema.parse(raw);
      return summarizePlan(file.replace(/\.json$/, ''), parsed, locale);
    })
  );

  return plans.sort((a, b) => a.name.localeCompare(b.name));
}

export async function loadPlan(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const plans = await loadPlans(locale);
  return plans.find((plan) => plan.slug === slug);
}

export function formatGoal(goal: string, locale: Locale = DEFAULT_LOCALE) {
  return labelize(goal, locale, 'goal');
}
