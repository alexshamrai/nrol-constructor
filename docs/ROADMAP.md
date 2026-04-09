# NROL Constructor — Roadmap

## v1.1 — RAMP Warmup Integration

Show the full RAMP (Range of motion, Activation, Movement prep) warmup protocol on every program page, with exercise descriptions and phase-appropriate progressions.

### What to build
- **RAMP section in ProgramConfigurator** — collapsible panel above workouts showing the 6-exercise warmup sequence for the current program phase
- **Per-exercise detail** — each warmup exercise shows: name (EN/UA), sets, reps/duration, full description with technique cues
- **Phase-specific warmup** — BT uses basic RAMP (squat-to-stand, hip raise), Hyp uses intermediate (cossack lunge, SL hip raise with pause), S&P uses advanced (deep cossack, 3s pause glute bridge)
- **RAMP in session plan** — session plan table includes a "Warmup" row at position 0 with "~10 min RAMP" note
- **RAMP in PDF/XLSX export** — export includes the warmup protocol as the first section

### Data already available
- `src/data/warmup.ts` has all 3 phase-specific protocols with EN/UA descriptions
- Types: `WarmupProtocol`, `WarmupExercise` in `src/types/index.ts`

---

## v1.2 — Interval Variations

Add the full interval exercise catalog from the book (each BT program has specific interval recommendations) and let users pick their interval exercises.

### What to build
- **Interval data layer** — new `src/data/intervals.ts` with interval exercises per program:
  - **BT I** (1 min : 2 min, 2-4 rounds): jump rope, shadow boxing, KB/DB swing, light thrusters, burpees, squat-to-curl-press, TRX mountain climbers, TRX burpees, band pull-apart + squat, farmer's walk, overhead carry
  - **BT II** (30s : 60s, 3-6 rounds): double-under jump rope, burpee with push-up, thrusters, heavy DB swing, TRX mountain climbers, TRX jump squat, band face pull + squat, farmer's walk, goblet carry
  - **BT III** (30s : 30s, 4-6 rounds): max speed jump rope, full burpees, thrusters, fast DB swings, TRX burpees, TRX mountain climbers, band squat & press, heavy farmer's walk, push-up to jump
  - **BT IV**: no intervals (metabolic circuit instead)
- **IntervalPicker component** — in the program configurator, users select 1-2 interval exercises for each workout (A and B should use different exercises)
- **Smart suggestions** — recommend intervals that don't duplicate muscles already fatigued by the strength portion (e.g., after RDL don't suggest KB swings)
- **Each interval exercise** has: name EN/UA, description EN/UA, category (cardio / strength / TRX / band / carry), which workouts it suits, equipment needed

### Data source
- All interval exercises are in the BT I-III xlsx files under "Інтервали — рекомендації" sections

---

## v1.3 — Complex Variations

Add the full complex exercise catalog for Hypertrophy programs and let users pick or customize their complexes.

### What to build
- **Complex data layer** — new `src/data/complexes.ts` with complex sequences:
  - **Hyp I Complex A**: DB RDL x8 → DB Bent-Over Row x8 → DB Push Press x8 (3-4 rounds, 90s rest)
  - **Hyp I Complex B**: DB Front Squat x8 → DB Reverse Lunge x8 → Push-Up on DBs x8
  - **Hyp II Complex A**: same sequence as Hyp I but 4-5 rounds x5
  - **Hyp II Complex B**: DB Swing x5 → Goblet Squat x5 → Push-Up x5
  - **Hyp III Complex A**: RDL x6 → Row x6 → Push Press x6 (4-5 rounds)
  - **Hyp III Complex B**: Swing x6 → Goblet Squat x6 → Push-Up x6
  - **Alternative complexes** (from xlsx):
    - Alt-1 "DB Full Body": Swing → Goblet Squat → Push Press (1 DB)
    - Alt-2 "Bodyweight": Squat → Push-Up → TRX Row
    - Alt-3 "Band Complex": Band Squat → Band Row → Band Press
    - Alt-4 "DB Upper": DB Row → Curl-Press → Skull Crusher
    - Alt-5 "TRX": TRX Row → TRX Push-Up → TRX Pike
    - Alt-6 "Lower Body": Goblet Squat → Reverse Lunge → Jump Squat
- **ComplexPicker component** — in Hyp program configurator, user picks a complex for each workout or uses the default
- **Complex detail view** — show the 3-exercise sequence with arrows, reps per exercise, total rounds, rest between rounds
- **Key rule**: all 3 exercises in a complex use the SAME weight (pick by weakest exercise)

### Data source
- Complex exercises are in the hypertrophy_1/2/3.xlsx files under "КОМПЛЕКС" and "Альтернативні комплекси" sections

---

## v1.4 — Active Workout View

Session-by-session tracker for use during training.

### What to build
- **Workout tracker page** — show current session's exercises in order
- **Set/rep logger** — log weight and reps per set
- **Rest timer** — countdown timer based on prescribed rest period (30s/60s/90s/2min+)
- **Session completion** — mark session complete, track progress
- **Progress history** — view weight/rep history across sessions for each exercise

---

## v1.5 — Year Planner Enhancements

- **Drag-and-drop** program reordering in the planner
- **Rest week insertion** — add 3-5 day rest between phases
- **Save/load plans** — persist plans to localStorage with names
- **Plan comparison** — compare different plan configurations side by side
- **Milestone tracking** — mark milestones (finish BT, start Hyp, 1RM attempts)

---

## v1.6 — PWA & Offline

- **Service worker** — cache all assets for offline use
- **PWA manifest** — installable on mobile/desktop
- **Offline indicator** — show connection status

---

## Future Ideas

- **Exercise video links** — YouTube search queries for form reference
- **Print-friendly CSS** — optimized print layouts for workout sheets
- **Data import/export** — backup/restore all configured programs as JSON
- **Supercharge tips** — show the "Supercharge It" variants from the book (mobility between sets, tri-set execution, giant set mode)
