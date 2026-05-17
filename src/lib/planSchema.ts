import { z } from 'zod';

const setSchema = z
  .object({
    reps: z.union([z.number(), z.string()]),
    load: z.record(z.string(), z.unknown()).optional(),
    rest_seconds: z.number().optional(),
    notes: z.string().optional(),
  })
  .catchall(z.unknown());

const itemSchema: z.ZodTypeAny = z.lazy(() =>
  z
    .object({
      kind: z.string(),
      exercise_ref: z.string().optional(),
      sets: z.array(setSchema).optional(),
      sets_template: z
        .object({
          count: z.number(),
          set: setSchema,
        })
        .optional(),
      cardio: z.record(z.string(), z.unknown()).optional(),
      items: z.array(itemSchema).optional(),
    })
    .catchall(z.unknown())
);

const daySchema = z
  .object({
    day: z.number(),
    name: z.string(),
    tags: z.array(z.string()).optional(),
    rest_day: z.boolean().optional(),
    estimated_minutes: z.number().optional(),
    blocks: z
      .array(
        z
          .object({
            type: z.string(),
            name: z.string().optional(),
            items: z.array(itemSchema).default([]),
          })
          .catchall(z.unknown())
      )
      .optional(),
  })
  .catchall(z.unknown());

const weekSchema = z
  .object({
    week: z.number(),
    name: z.string().optional(),
    deload: z.boolean().optional(),
    days: z.array(daySchema),
  })
  .catchall(z.unknown());

export const planJsonSchema = z
  .object({
    schema_version: z.literal('1.0'),
    plan: z
      .object({
        id: z.string().min(1),
        name: z.string().min(1),
        author: z.string().optional(),
        description: z.string().optional(),
        goal: z.string().min(1),
        level: z.enum(['beginner', 'intermediate', 'advanced']),
        duration_weeks: z.number().int().positive(),
        days_per_week: z.number().int().positive(),
        tags: z.array(z.string()).optional(),
      })
      .strict(),
    settings: z.record(z.string(), z.unknown()).optional(),
    exercises: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
    mesocycles: z
      .array(
        z
          .object({
            id: z.string(),
            name: z.string(),
            weeks: z.array(z.number()),
            goal: z.string().optional(),
            deload: z.boolean().optional(),
          })
          .catchall(z.unknown())
      )
      .optional(),
    weeks: z.array(weekSchema),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.weeks.length !== value.plan.duration_weeks) {
      ctx.addIssue({
        code: 'custom',
        path: ['weeks'],
        message: `weeks.length (${value.weeks.length}) must equal plan.duration_weeks (${value.plan.duration_weeks})`,
      });
    }
  });

export type PlanJson = z.infer<typeof planJsonSchema>;

export function formatPlanIssues(error: z.ZodError) {
  return error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join('.') : 'plan';
    return `${path}: ${issue.message}`;
  });
}
