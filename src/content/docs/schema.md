# 02 — Workout Plan JSON Schema (v1.0)

> The internal, exhaustive reference for the plan schema. For the LLM-facing portable version see [`/LLM_BRIEF.md`](../LLM_BRIEF.md) at the repo root.

## Design principles

1. **LLM-friendly.** Field names are explicit and English-like. Examples in this doc and in `LLM_BRIEF.md` double as few-shot material for prompts.
2. **Strict.** Unknown keys are rejected, not silently dropped. Validation errors point at the exact JSON path and explain the fix.
3. **Concrete over clever.** Weekly progression is expressed by writing different numbers each week, not by progression formulas. The schema describes *what to do*, not *how it was generated*.
4. **Multi-modality from day one.** Strength, cardio (steady + intervals), bodyweight, and mobility are first-class.
5. **Two layers of indirection are enough.** `weeks → days → blocks → items → sets`.
6. **References, not duplication.** Exercises are looked up by ID. The bundled library covers ~300 common movements. Custom exercises can be defined inline.

## Top-level shape

```jsonc
{
  "$schema": "https://universalfit.app/schema/v1.0.json",
  "schema_version": "1.0",

  "plan":        { /* metadata */ },
  "settings":    { /* units, defaults */ },
  "exercises":   { /* OPTIONAL inline custom exercises */ },
  "mesocycles":  [ /* OPTIONAL phase grouping */ ],
  "weeks":       [ /* the program */ ]
}
```

| Field | Required | Notes |
|---|---|---|
| `schema_version` | yes | Must be `"1.0"` for this spec. |
| `$schema` | optional | URL to JSON Schema definition (for editor autocomplete). |
| `plan` | yes | Plan-level metadata. |
| `settings` | optional | Units and per-plan defaults. |
| `exercises` | optional | Map of `id → ExerciseDef` for custom exercises. |
| `mesocycles` | optional | Top-level phase grouping (see Mesocycles below). |
| `weeks` | yes | At least one week. |

---

## `plan` — metadata

```jsonc
{
  "plan": {
    "id": "ppl-12wk-2026q1",                 // required, unique slug
    "name": "Push/Pull/Legs 12-Week Build",  // required
    "author": "Jane Coach",                  // optional
    "description": "Hypertrophy-focused PPL with one easy run per week.",
    "goal": "hypertrophy",                   // see enum below
    "level": "intermediate",                 // beginner | intermediate | advanced
    "duration_weeks": 12,                    // required, must equal weeks.length
    "days_per_week": 6,                      // hint; UI uses for calendar
    "tags": ["strength", "running", "ppl"],
    "created_at": "2026-05-01",              // ISO-8601
    "version": "1.0.0",                      // plan's own semver (optional)
    "source_url": null
  }
}
```

**`goal` enum:** `strength` | `hypertrophy` | `endurance` | `power` | `fat_loss` | `general_fitness` | `sport_specific` | `mobility` | `mixed`

---

## `settings`

```jsonc
{
  "settings": {
    "units": {
      "weight": "kg",          // kg | lb
      "distance": "km",        // km | mi
      "body_weight": "kg"
    },
    "rest_default_seconds": 120,
    "rpe_scale": "0-10",        // 0-10 | 6-10
    "show_warmup_sets": true,
    "auto_warmup": {
      "enabled": false,
      "scheme": "default"
    }
  }
}
```

All fields optional; omitted values fall back to app-wide user settings.

---

## `exercises` — inline custom exercises

For exercises not in the bundled library. The map key is the exercise ID used in `exercise_ref`.

```jsonc
{
  "exercises": {
    "weighted_pull_through_sled": {
      "name": "Sled Pull-Through",
      "type": "strength",                    // strength | cardio | bodyweight | mobility
      "muscle_groups": ["glutes", "hamstrings"],
      "equipment": ["sled"],
      "instructions": "Face away from sled, hip-hinge to drive…",
      "video": "https://www.youtube.com/watch?v=abc123",
      "image_url": null,
      "aliases": ["sled hip thrust"]
    }
  }
}
```

References to bundled exercises share the same ID space — see [06-exercise-library.md](./06-exercise-library.md). Custom IDs should start with `custom_` by convention.

### Video field

`video` accepts a **string URL** or a **structured object**:

```jsonc
"video": "https://www.youtube.com/watch?v=ultWZbUMPL8"
```

```jsonc
"video": {
  "url": "https://www.youtube.com/watch?v=ultWZbUMPL8",
  "provider": "youtube",          // optional; auto-detected from URL
  "start_seconds": 30,             // optional jump-to point
  "end_seconds": 90                // optional stop-at point
}
```

**Providers v1:** `youtube`, `vimeo`, `mp4` (direct URL). Player: embedded web view for YouTube/Vimeo; `expo-video` for MP4. Videos require network; offline UI falls back to the bundled static image.

---

## `mesocycles` — optional phase grouping

For periodized plans where multiple consecutive weeks share a phase:

```jsonc
{
  "mesocycles": [
    {
      "id": "gpp",
      "name": "General Preparation",
      "goal": "Build aerobic base and movement quality",
      "weeks": [1, 2, 3],
      "notes": "Volume bias. Leave 3–4 RIR."
    },
    {
      "id": "spp",
      "name": "Specific Preparation",
      "weeks": [4, 5, 6]
    },
    {
      "id": "peak",
      "name": "Peak",
      "weeks": [7, 8],
      "notes": "Max intensity, low volume."
    },
    {
      "id": "deload",
      "name": "Deload",
      "weeks": [9],
      "deload": true
    }
  ]
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique within the plan. |
| `name` | yes | Human-readable. |
| `weeks` | yes | Array of week numbers. Subset of `1…plan.duration_weeks`. |
| `goal` | optional | Phase-level intent. |
| `notes` | optional | Free-form. |
| `deload` | optional | UI flags these weeks for lower-intensity expectations. |

**Rules:**
- `mesocycles` is entirely optional. Plans without it render as a flat week list.
- A given week belongs to at most one mesocycle.
- Weeks not listed in any mesocycle are "unphased."
- The UI groups consecutive same-mesocycle weeks under a collapsible phase header.

---

## `weeks`

```jsonc
{
  "weeks": [
    {
      "week": 1,                              // 1-based, required
      "name": "GPP – Base 1",                 // optional; can repeat across weeks
      "deload": false,                         // optional (overrides mesocycle hint)
      "notes": "Leave 2–3 reps in reserve.",
      "days": [ /* see below */ ]
    }
  ]
}
```

`weeks.length` must equal `plan.duration_weeks`. Each week must have at least one day.

### `days`

```jsonc
{
  "day": 1,                                  // 1-based within the week
  "name": "Push A",
  "tags": ["push", "strength"],
  "rest_day": false,                          // if true, only `name` is meaningful
  "estimated_minutes": 75,
  "notes": "Bench is the priority.",
  "blocks": [ /* see below */ ]
}
```

- `day` is 1-based within the week; need not be consecutive (Mon/Wed/Fri = `1`, `3`, `5`).
- `rest_day: true` is a no-op calendar marker.

---

## `blocks`

```jsonc
{
  "type": "main",                            // warmup | main | accessory | finisher | cooldown | mobility
  "name": "Main Bench",
  "notes": "Focus on bar path.",
  "items": [ /* see below */ ]
}
```

| Type | Working set? | Stats impact |
|---|---|---|
| `warmup` | no | Excluded from volume / PR. |
| `main` | yes | Volume, PR, adherence. |
| `accessory` | yes | Same as main. |
| `finisher` | yes | Same as main. |
| `cooldown` | no | Excluded. |
| `mobility` | no | Excluded. |

---

## `items`

| `kind` | What it is |
|---|---|
| `exercise` | A single exercise with sets (strength) or a cardio prescription. |
| `group` | Superset / circuit / drop set / giant set. |
| `emom` | Every-Minute-On-the-Minute. |
| `amrap` | As-Many-Rounds-As-Possible. |
| `rest` | Planned rest period. |

### `kind: "exercise"` (strength)

```jsonc
{
  "kind": "exercise",
  "exercise_ref": "barbell_back_squat",
  "alternate_refs": ["goblet_squat"],
  "video_override": "https://www.youtube.com/watch?v=different_cue",
  "tempo": "3-1-1-0",
  "auto_warmup": true,
  "notes": "Pause at the bottom on rep 3.",
  "sets": [
    {
      "reps": 5,
      "load": { "percent_1rm": 75 },
      "rpe_target": 8,
      "rest_seconds": 180,
      "tempo": "3-1-1-0",
      "notes": "Top set"
    }
  ]
}
```

**Sets shorthand** — N identical sets:

```jsonc
{
  "kind": "exercise",
  "exercise_ref": "barbell_back_squat",
  "sets_template": {
    "count": 5,
    "set": { "reps": 5, "load": { "percent_1rm": 75 }, "rest_seconds": 180 }
  }
}
```

The validator expands `sets_template` into `sets`. An exercise must have exactly one of `sets` or `sets_template`.

### `kind: "exercise"` (cardio)

```jsonc
{
  "kind": "exercise",
  "exercise_ref": "running",
  "video_override": "https://...",
  "cardio": { /* see Cardio section */ }
}
```

### `kind: "group"`

```jsonc
{
  "kind": "group",
  "structure": "superset",                    // superset | circuit | drop_set | giant_set
  "rounds": 3,
  "rest_between_rounds_seconds": 90,
  "notes": "Minimal rest between A1 and A2.",
  "items": [
    { "kind": "exercise", "exercise_ref": "db_row",
      "sets_template": { "count": 1, "set": { "reps": 12 } } },
    { "kind": "exercise", "exercise_ref": "db_curl",
      "sets_template": { "count": 1, "set": { "reps": 15 } } }
  ]
}
```

| `structure` | Meaning |
|---|---|
| `superset` | Two exercises back-to-back, repeated `rounds` times. |
| `giant_set` | 3+ exercises back-to-back. |
| `circuit` | Like giant set, conventionally lighter / mixed. |
| `drop_set` | Same exercise, dropping load each "round"; one inner exercise with multiple sets. |

Each inner exercise's `sets`/`sets_template` describes **one round**; the group performs `rounds` total.

### `kind: "emom"`

```jsonc
{
  "kind": "emom",
  "duration_minutes": 10,
  "minute_template": [
    { "exercise_ref": "thruster", "reps": 8, "load": { "kg": 30 } }
  ]
}
```

Multiple entries alternate across minutes.

### `kind: "amrap"`

```jsonc
{
  "kind": "amrap",
  "duration_minutes": 12,
  "round": [
    { "exercise_ref": "pullup",    "reps": 5 },
    { "exercise_ref": "pushup",    "reps": 10 },
    { "exercise_ref": "air_squat", "reps": 15 }
  ]
}
```

### `kind: "rest"`

```jsonc
{
  "kind": "rest",
  "duration_seconds": 300,
  "notes": "Recover fully before the next heavy set."
}
```

---

## Sets

```jsonc
{
  "reps": 5,
  "load": { ... },
  "rpe_target": 8,
  "rir_target": 2,
  "rest_seconds": 180,
  "tempo": "3-1-1-0",
  "notes": "Pause"
}
```

### Reps

| Value | Meaning |
|---|---|
| `5` | Exactly 5 reps. |
| `"5"` | Same as above. |
| `"6-8"` | Range. |
| `"5+"` | AMRAP, minimum 5 (Wendler-style top set). |
| `"AMRAP"` | Open AMRAP. |
| `"failure"` | To technical failure. |
| `"30s"` / `"1min"` | Time-based hold. |

### Load

Exactly one shape (or omit for pure bodyweight):

| Shape | Meaning |
|---|---|
| `{ "kg": 100 }` | Absolute kg. |
| `{ "lb": 220 }` | Absolute lb. |
| `{ "percent_1rm": 75 }` | % of recorded 1RM. App resolves at session start. |
| `{ "rpe": 8 }` | User chooses load to hit prescribed RPE. |
| `{ "bodyweight": true }` | Pure bodyweight. |
| `{ "bodyweight": true, "added_kg": 20 }` | Weighted pull-up / dip. |
| `{ "bodyweight": true, "assisted_kg": 30 }` | Band/machine-assisted. |

If both `load` and `rpe_target` are present, `load` is the prescription; `rpe_target` is informational.

### Tempo

`"E-B-C-T"` — eccentric / bottom-pause / concentric / top-pause, in seconds. `X` = explosive. Example: `"3-1-X-0"`.

---

## Cardio

When `cardio` is present, `sets`/`sets_template` must not be.

### Steady-state

```jsonc
{
  "cardio": {
    "structure": "steady",
    "modality": "running",                    // running | cycling | rowing | swimming | elliptical | other
    "target": {
      "duration_minutes": 40,
      "distance_km": 7,
      "pace": { "min_per_km": "6:00" },
      "hr_zone": 2,
      "rpe_target": 5
    }
  }
}
```

At least one of `duration_minutes` or `distance_km` is required.

### Intervals

```jsonc
{
  "cardio": {
    "structure": "intervals",
    "modality": "running",
    "warmup":  { "duration_minutes": 10, "pace": { "min_per_km": "6:30" } },
    "intervals": [
      {
        "repeat": 6,
        "work":  { "distance_m": 400, "pace": { "min_per_km": "4:00" } },
        "rest":  { "duration_seconds": 90, "type": "walk" }
      },
      {
        "repeat": 1,
        "work":  { "distance_m": 200, "pace": { "min_per_km": "3:50" } },
        "rest":  { "duration_seconds": 60, "type": "walk" }
      }
    ],
    "cooldown": { "duration_minutes": 10, "pace": { "min_per_km": "6:30" } }
  }
}
```

### Fartlek

```jsonc
{
  "cardio": {
    "structure": "fartlek",
    "modality": "running",
    "target": { "duration_minutes": 45 },
    "notes": "4–6 surges of 30–60s as you feel."
  }
}
```

---

## Validation behavior

The validator (Zod-based) is strict:

- **Unknown keys** rejected with JSON path.
- **Missing required keys** rejected.
- **Type mismatches** rejected (no silent coercion).
- **Cross-field constraints:**
  - `weeks.length === plan.duration_weeks`
  - Exactly one of `sets` / `sets_template`
  - Cardio items have no `sets`; strength items have no `cardio`
  - `exercise_ref` resolves in inline `exercises` or bundled library (with closest-match suggestion)
  - `mesocycles[].weeks` values in `1…plan.duration_weeks`, no overlaps
  - `load` shapes mutually exclusive
- **Errors carry suggestions** where possible: "Did you mean `percent_1rm` instead of `pct_1rm`?"

Errors surface in the import UI with the JSON path, the problem, a one-line fix suggestion, and a "copy error report" button for piping back to the LLM that generated the plan.

---

## Schema evolution

- `schema_version` is `"<major>.<minor>"`.
- **Major bump** = breaking change. Validator refuses unknown majors.
- **Minor bump** = additive (new optional fields). v1.0 plans validate under v1.1.
- A migration utility may convert older minors forward on import.
- Future revisions add sibling files (`02-schema-spec-v1.1.md`).

---

## Where to find more

- **Portable LLM brief:** [`/LLM_BRIEF.md`](../LLM_BRIEF.md) — copy-pasteable into any LLM.
- **Exercise library + IDs:** [06-exercise-library.md](./06-exercise-library.md).
- **Progression engine (how `percent_1rm` and `rpe` resolve):** [05-progression-engine.md](./05-progression-engine.md).
