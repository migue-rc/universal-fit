import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_LOCALE, labelize, type Locale } from './i18n';

export type ExerciseSummary = {
  id: string;
  name: string;
  type: string;
  primaryMuscle: string;
  movementPattern: string;
  equipment: string[];
  experience: string;
  cues: string[];
};

const dataFile = path.join(process.cwd(), 'public', 'data', 'exercise-library.v1.json');

function localizePhrase(value: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE) return value;

  const phraseMaps: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
    es: {
      barbell: 'barra',
      dumbbell: 'mancuerna',
      kettlebell: 'kettlebell',
      bodyweight: 'peso corporal',
      machine: 'máquina',
      bench: 'banco',
      rack: 'rack',
      strength: 'fuerza',
      mobility: 'movilidad',
      cardio: 'cardio',
      beginner: 'principiante',
      intermediate: 'intermedio',
      advanced: 'avanzado',
      quads: 'cuádriceps',
      hamstrings: 'isquios',
      glutes: 'glúteos',
      chest: 'pecho',
      shoulders: 'hombros',
      back: 'espalda',
      core: 'core',
      squat: 'sentadilla',
      hinge: 'bisagra',
      lunge: 'zancada',
      push: 'empuje',
      pull: 'tirón',
      general: 'general',
    },
    pt: {
      barbell: 'barra',
      dumbbell: 'halter',
      kettlebell: 'kettlebell',
      bodyweight: 'peso corporal',
      machine: 'máquina',
      bench: 'banco',
      rack: 'rack',
      strength: 'força',
      mobility: 'mobilidade',
      cardio: 'cardio',
      beginner: 'iniciante',
      intermediate: 'intermediário',
      advanced: 'avançado',
      quads: 'quadríceps',
      hamstrings: 'posteriores',
      glutes: 'glúteos',
      chest: 'peito',
      shoulders: 'ombros',
      back: 'costas',
      core: 'core',
      squat: 'agachamento',
      hinge: 'dobradiça',
      lunge: 'avanço',
      push: 'empurrar',
      pull: 'puxar',
      general: 'geral',
    },
    fr: {
      barbell: 'barre',
      dumbbell: 'haltère',
      kettlebell: 'kettlebell',
      bodyweight: 'poids du corps',
      machine: 'machine',
      bench: 'banc',
      rack: 'rack',
      strength: 'force',
      mobility: 'mobilité',
      cardio: 'cardio',
      beginner: 'débutant',
      intermediate: 'intermédiaire',
      advanced: 'avancé',
      quads: 'quadriceps',
      hamstrings: 'ischios',
      glutes: 'fessiers',
      chest: 'poitrine',
      shoulders: 'épaules',
      back: 'dos',
      core: 'gainage',
      squat: 'squat',
      hinge: 'charnière',
      lunge: 'fente',
      push: 'poussée',
      pull: 'tirage',
      general: 'général',
    },
    de: {
      barbell: 'Langhantel',
      dumbbell: 'Kurzhantel',
      kettlebell: 'Kettlebell',
      bodyweight: 'Körpergewicht',
      machine: 'Maschine',
      bench: 'Bank',
      rack: 'Rack',
      strength: 'Kraft',
      mobility: 'Mobilität',
      cardio: 'Cardio',
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Profi',
      quads: 'Quadrizeps',
      hamstrings: 'Hamstrings',
      glutes: 'Gesäß',
      chest: 'Brust',
      shoulders: 'Schultern',
      back: 'Rücken',
      core: 'Core',
      squat: 'Kniebeuge',
      hinge: 'Hinge',
      lunge: 'Ausfallschritt',
      push: 'Drücken',
      pull: 'Ziehen',
      general: 'allgemein',
    },
    it: {
      barbell: 'bilanciere',
      dumbbell: 'manubrio',
      kettlebell: 'kettlebell',
      bodyweight: 'corpo libero',
      machine: 'macchina',
      bench: 'panca',
      rack: 'rack',
      strength: 'forza',
      mobility: 'mobilità',
      cardio: 'cardio',
      beginner: 'principiante',
      intermediate: 'intermedio',
      advanced: 'avanzato',
      quads: 'quadricipiti',
      hamstrings: 'ischiocrurali',
      glutes: 'glutei',
      chest: 'petto',
      shoulders: 'spalle',
      back: 'schiena',
      core: 'core',
      squat: 'squat',
      hinge: 'hinge',
      lunge: 'affondo',
      push: 'spinta',
      pull: 'tirata',
      general: 'generale',
    },
  };

  const map = phraseMaps[locale as Exclude<Locale, 'en'>];
  return value
    .split(/([_\s-]+)/)
    .map((part) => map[part.toLowerCase()] ?? part)
    .join('')
    .replace(/_/g, ' ');
}

export async function loadExercises(locale: Locale = DEFAULT_LOCALE): Promise<ExerciseSummary[]> {
  const raw = JSON.parse(await readFile(dataFile, 'utf8'));
  const exercises = raw.exercises || {};
  return Object.entries(exercises)
    .map(([id, value]) => {
      const item = value as Record<string, unknown>;
      return {
        id,
        name: String(item.name || id),
        type: labelize(String(item.type || 'strength'), locale, 'modality'),
        primaryMuscle: localizePhrase(String(item.primary_muscle || 'mixed'), locale),
        movementPattern: localizePhrase(String(item.movement_pattern || 'general'), locale),
        equipment: Array.isArray(item.equipment) ? item.equipment.map((entry) => localizePhrase(String(entry), locale)) : [],
        experience: labelize(String(item.experience || 'beginner'), locale, 'level'),
        cues: Array.isArray(item.cues) ? item.cues.map(String).slice(0, 3).map((cue) => localizePhrase(cue, locale)) : [],
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
