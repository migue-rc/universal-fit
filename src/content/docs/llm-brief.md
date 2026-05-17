# Universal Fit — Plan Authoring Brief for LLMs

You are generating a workout plan for the **Universal Fit** app. This file is the **single source of truth** for the plan format. Read it carefully, then output a JSON object that conforms exactly.

> **Critical rules:**
> 1. Output **only one JSON object**. No markdown fences, no commentary, no explanations.
> 2. **No unknown fields.** The app strictly rejects unknown keys.
> 3. Schema version must be `"1.0"`.

---

## Minimal valid plan

```json
{
  "schema_version": "1.0",
  "plan": {
    "id": "my-first-plan",
    "name": "My First Plan",
    "goal": "general_fitness",
    "level": "beginner",
    "duration_weeks": 1,
    "days_per_week": 1
  },
  "weeks": [
    {
      "week": 1,
      "days": [
        {
          "day": 1,
          "name": "Full Body",
          "blocks": [
            {
              "type": "main",
              "items": [
                {
                  "kind": "exercise",
                  "exercise_ref": "barbell_back_squat",
                  "sets_template": {
                    "count": 3,
                    "set": { "reps": 5, "load": { "rpe": 7 }, "rest_seconds": 180 }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

If you produce this, you have a valid plan. Everything else is optional or additive.

---

## Top-level keys

| Key | Required | Purpose |
|---|---|---|
| `schema_version` | yes | Must be `"1.0"`. |
| `plan` | yes | Plan metadata (name, goal, duration). |
| `settings` | no | Units and defaults. |
| `exercises` | no | Inline custom exercise definitions. |
| `mesocycles` | no | Phase grouping for periodized plans. |
| `weeks` | yes | The actual program. `weeks.length` MUST equal `plan.duration_weeks`. |

---

## `plan` block

```json
{
  "id": "ppl-12wk-2026q1",          // unique slug
  "name": "Push/Pull/Legs 12-Week",
  "author": "Jane Coach",
  "description": "Hypertrophy-focused PPL.",
  "goal": "hypertrophy",
  "level": "intermediate",
  "duration_weeks": 12,
  "days_per_week": 6,
  "tags": ["strength", "ppl"]
}
```

**`goal`** must be one of: `strength` · `hypertrophy` · `endurance` · `power` · `fat_loss` · `general_fitness` · `sport_specific` · `mobility` · `mixed`

**`level`** must be one of: `beginner` · `intermediate` · `advanced`

---

## `settings` (optional)

```json
{
  "units": { "weight": "kg", "distance": "km" },
  "rest_default_seconds": 120,
  "rpe_scale": "0-10",
  "show_warmup_sets": true,
  "auto_warmup": { "enabled": false }
}
```

`weight`: `kg` | `lb`. `distance`: `km` | `mi`. Defaults are app-side; omit anything you don't need.

---

## `mesocycles` (optional — for periodized plans)

Group consecutive weeks into phases. Pure organizational metadata; the app uses it to render phase headers.

```json
"mesocycles": [
  { "id": "gpp",    "name": "General Preparation", "weeks": [1, 2, 3], "goal": "Build base" },
  { "id": "spp",    "name": "Specific Preparation", "weeks": [4, 5, 6] },
  { "id": "peak",   "name": "Peak",                  "weeks": [7, 8] },
  { "id": "deload", "name": "Deload",               "weeks": [9], "deload": true }
]
```

Each week belongs to at most one mesocycle. Weeks not listed are "unphased."

---

## `weeks` → `days` → `blocks` → `items` → `sets`

```
weeks[]                                  // length === plan.duration_weeks
  └── days[]                             // 1-based, can be non-consecutive (Mon/Wed/Fri = 1,3,5)
       └── blocks[]                      // groups of items with a shared purpose
            └── items[]                  // the actual unit of work
                 └── sets[] or cardio    // the prescription
```

### Week

```json
{ "week": 1, "name": "GPP – Base 1", "deload": false, "notes": "...", "days": [ ... ] }
```

### Day

```json
{
  "day": 1,
  "name": "Push A",
  "tags": ["push", "strength"],
  "rest_day": false,
  "estimated_minutes": 75,
  "blocks": [ ... ]
}
```

For a rest day, set `rest_day: true` and omit `blocks`.

### Block

```json
{ "type": "main", "name": "Main Bench", "items": [ ... ] }
```

**`type`** must be one of:

| Type | Meaning | Counts toward volume? |
|---|---|---|
| `warmup` | Movement prep | no |
| `main` | Primary working movement | yes |
| `accessory` | Secondary working movement | yes |
| `finisher` | End-of-workout pump/conditioning | yes |
| `cooldown` | Post-workout movement | no |
| `mobility` | Stretching / flexibility | no |

---

## Items: the unit of work

Every item has a `kind`:

| `kind` | Use for |
|---|---|
| `exercise` | A single exercise (strength **or** cardio). |
| `group` | Superset, circuit, drop set, giant set. |
| `emom` | Every-Minute-On-the-Minute. |
| `amrap` | As-Many-Rounds-As-Possible in a time window. |
| `rest` | Planned rest period between heavy lifts. |

### Strength exercise

```json
{
  "kind": "exercise",
  "exercise_ref": "barbell_back_squat",
  "alternate_refs": ["goblet_squat"],
  "video_override": "https://www.youtube.com/watch?v=abc",
  "tempo": "3-1-1-0",
  "notes": "Pause at the bottom on rep 3.",
  "sets": [
    { "reps": 5, "load": { "percent_1rm": 70 }, "rest_seconds": 180 },
    { "reps": 5, "load": { "percent_1rm": 75 }, "rest_seconds": 180 },
    { "reps": "5+", "load": { "percent_1rm": 80 }, "rest_seconds": 180 }
  ]
}
```

For N identical sets, use `sets_template`:

```json
{
  "kind": "exercise",
  "exercise_ref": "barbell_bench_press",
  "sets_template": {
    "count": 4,
    "set": { "reps": 8, "load": { "rpe": 8 }, "rest_seconds": 120 }
  }
}
```

**Rule:** an exercise has **exactly one of** `sets` **or** `sets_template`.

### Cardio exercise

```json
{
  "kind": "exercise",
  "exercise_ref": "running",
  "cardio": { "structure": "steady", "modality": "running",
              "target": { "duration_minutes": 40, "pace": { "min_per_km": "6:00" }, "hr_zone": 2 } }
}
```

**Rule:** a cardio item has `cardio`; it does **not** have `sets` / `sets_template`.

### Group (supersets, circuits, drop sets)

```json
{
  "kind": "group",
  "structure": "superset",
  "rounds": 3,
  "rest_between_rounds_seconds": 90,
  "items": [
    { "kind": "exercise", "exercise_ref": "db_row",
      "sets_template": { "count": 1, "set": { "reps": 12, "load": { "rpe": 8 } } } },
    { "kind": "exercise", "exercise_ref": "face_pull",
      "sets_template": { "count": 1, "set": { "reps": 15, "load": { "rpe": 7 } } } }
  ]
}
```

**`structure`:** `superset` (2 ex.) · `giant_set` (3+ ex.) · `circuit` · `drop_set`. Each inner exercise's `sets`/`sets_template` describes **one round**; the group performs `rounds` total.

### EMOM

```json
{
  "kind": "emom",
  "duration_minutes": 10,
  "minute_template": [ { "exercise_ref": "thruster", "reps": 8, "load": { "kg": 30 } } ]
}
```

### AMRAP

```json
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

### Rest

```json
{ "kind": "rest", "duration_seconds": 300, "notes": "Recover fully." }
```

---

## Sets — the strength prescription

```json
{
  "reps": 5,
  "load": { "percent_1rm": 75 },
  "rpe_target": 8,
  "rir_target": 2,
  "rest_seconds": 180,
  "tempo": "3-1-1-0",
  "notes": "Top set"
}
```

### `reps`

| Value | Meaning |
|---|---|
| `5` or `"5"` | Exactly 5 reps. |
| `"6-8"` | Range: aim 6–8. |
| `"5+"` | AMRAP, minimum 5. |
| `"AMRAP"` | Open AMRAP. |
| `"failure"` | To technical failure. |
| `"30s"`, `"1min"` | Time-based hold. |

### `load` — exactly one shape

| Shape | Use when |
|---|---|
| `{ "kg": 100 }` | Absolute kg. |
| `{ "lb": 220 }` | Absolute lb. |
| `{ "percent_1rm": 75 }` | Programmed off a 1RM. |
| `{ "rpe": 8 }` | User picks load to hit this RPE. |
| `{ "bodyweight": true }` | Pure bodyweight. |
| `{ "bodyweight": true, "added_kg": 20 }` | Weighted pull-up / dip. |
| `{ "bodyweight": true, "assisted_kg": 30 }` | Band/machine-assisted. |

**Omit `load` entirely** if the exercise is bodyweight with no resistance and you don't want to flag it explicitly. Prefer `{ "bodyweight": true }` for clarity.

### `tempo`

`"E-B-C-T"` in seconds — eccentric / bottom-pause / concentric / top-pause. `X` = explosive. Example: `"3-1-X-0"`.

---

## Cardio — `cardio` block

### Steady-state

```json
{
  "structure": "steady",
  "modality": "running",
  "target": {
    "duration_minutes": 40,
    "distance_km": 7,
    "pace": { "min_per_km": "6:00" },
    "hr_zone": 2,
    "rpe_target": 5
  }
}
```

**`modality`:** `running` · `cycling` · `rowing` · `swimming` · `elliptical` · `other`.
At least one of `duration_minutes` / `distance_km`.

### Intervals

```json
{
  "structure": "intervals",
  "modality": "running",
  "warmup":  { "duration_minutes": 10, "pace": { "min_per_km": "6:30" } },
  "intervals": [
    {
      "repeat": 6,
      "work":  { "distance_m": 400, "pace": { "min_per_km": "4:00" } },
      "rest":  { "duration_seconds": 90, "type": "walk" }
    }
  ],
  "cooldown": { "duration_minutes": 10, "pace": { "min_per_km": "6:30" } }
}
```

`rest.type`: `walk` · `jog` · `stand`.

### Fartlek

```json
{
  "structure": "fartlek",
  "modality": "running",
  "target": { "duration_minutes": 45 },
  "notes": "4–6 surges of 30–60s as you feel."
}
```

---

## Custom exercises (optional)

If you need an exercise not in the bundled library, define it inline and reference it from items:

```json
"exercises": {
  "custom_sled_pull_through": {
    "name": "Sled Pull-Through",
    "type": "strength",
    "muscle_groups": ["glutes", "hamstrings"],
    "equipment": ["sled"],
    "instructions": "Face away from sled, hip-hinge to drive...",
    "video": "https://www.youtube.com/watch?v=abc123"
  }
}
```

Custom IDs **should start with `custom_`** to avoid clashing with bundled IDs.

**`video`** can be a string URL or an object:
```json
"video": { "url": "https://...", "start_seconds": 30, "end_seconds": 90 }
```

---

## What NOT to do

- ❌ Don't invent fields. `pct_1rm`, `weight`, `set_count`, `restSeconds`, `exercise`, `reps_max` — none of these exist. Use the exact field names in this doc.
- ❌ Don't put both `sets` and `sets_template` on the same exercise.
- ❌ Don't put `cardio` on a strength exercise or `sets` on a cardio exercise.
- ❌ Don't make `weeks.length` differ from `plan.duration_weeks`.
- ❌ Don't reference exercise IDs that aren't in the bundled library or inline `exercises`.
- ❌ Don't wrap the JSON in markdown fences. Output raw JSON.
- ❌ Don't write progression formulas ("add 2.5kg per week"). Write the actual numbers for each week.

---

## Bundled exercise IDs

When using `exercise_ref`, prefer these bundled IDs (full list maintained at `/schema/exercise-library.json`):

**Squat pattern:** `barbell_back_squat` · `barbell_front_squat` · `goblet_squat` · `bulgarian_split_squat` · `leg_press` · `hack_squat` · `air_squat`

**Hinge:** `conventional_deadlift` · `sumo_deadlift` · `romanian_deadlift` · `trap_bar_deadlift` · `barbell_hip_thrust` · `single_leg_rdl` · `good_morning` · `kettlebell_swing`

**Push (horizontal):** `barbell_bench_press` · `incline_barbell_bench` · `db_bench_press` · `incline_db_press` · `pushup` · `dip` · `cable_fly` · `pec_deck`

**Push (vertical):** `barbell_overhead_press` · `db_shoulder_press` · `arnold_press` · `push_press` · `landmine_press` · `handstand_pushup`

**Pull (horizontal):** `barbell_row` · `pendlay_row` · `db_row` · `cable_row` · `chest_supported_row` · `t_bar_row` · `inverted_row`

**Pull (vertical):** `pullup` · `chinup` · `lat_pulldown` · `straight_arm_pulldown`

**Arms:** `barbell_curl` · `db_curl` · `hammer_curl` · `preacher_curl` · `tricep_pushdown` · `overhead_tricep_ext` · `skull_crusher` · `close_grip_bench`

**Shoulders / posterior:** `lateral_raise` · `rear_delt_fly` · `face_pull` · `cable_lateral` · `shrug`

**Core:** `plank` · `side_plank` · `dead_bug` · `bird_dog` · `pallof_press` · `hanging_leg_raise` · `cable_crunch` · `ab_wheel`

**Cardio:** `running` · `treadmill` · `cycling` · `stationary_bike` · `rowing` · `swimming` · `elliptical` · `stair_master` · `jump_rope`

**Warmup / mobility:** `dynamic_warmup_full_body` · `dynamic_warmup_upper` · `dynamic_warmup_lower` · `foam_roll` · `couch_stretch` · `90_90_hip_stretch` · `thoracic_rotation` · `cat_cow`

If the movement you want isn't here, **define it inline under `exercises`** with a `custom_` prefix.

---

## Authoring checklist

Before emitting the JSON, verify:

- [ ] `schema_version` is `"1.0"`.
- [ ] `weeks.length === plan.duration_weeks`.
- [ ] Every exercise item has exactly one of `sets` / `sets_template` (strength) **or** `cardio` (cardio).
- [ ] Every `exercise_ref` is bundled (above) or defined inline under `exercises`.
- [ ] Mesocycle `weeks` are subsets of `1…plan.duration_weeks` with no overlap.
- [ ] No unknown fields. Field names match this brief exactly.
- [ ] Output is one JSON object, no fences, no prose.

---

## Remediation loop

If a generated plan fails validation, the user will paste the validator's error report. Read each error (it includes the JSON path, the problem, and a fix suggestion), fix only those exact issues, and re-emit the **full plan** as valid JSON. Do not re-explain; just emit the corrected JSON.
