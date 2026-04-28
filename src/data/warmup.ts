import type { WarmupExercise } from '../types';

// RAMP library — exercises from Chapter 17 of NROL Supercharged.
// R = Range of motion, A = Activation, M = Movement Preparation.
// Each workout in every program begins with RAMP (~10 minutes).
export const rampLibrary: WarmupExercise[] = [
  // ── Range of Motion ─────────────────────────────────────────────
  {
    id: 'rom_hip_flexor_stretch',
    category: 'range_of_motion',
    nameEn: 'Half-Kneeling Hip-Flexor Stretch',
    nameUa: 'Розтяжка згиначів стегна (з коліна)',
    sets: 1,
    reps: '30s per side',
    descriptionEn:
      'Kneel on a pad on one knee, other foot flat in front. Torso upright, hands on hips. Shift weight forward until you feel the stretch on the kneeling side. Hold 30s, switch.',
    descriptionUa:
      'На одному коліні (на килимку), інша нога попереду. Торс прямо, руки на стегнах. Зміститись вперед до відчуття розтяжки збоку коліна. 30с, поміняти ноги.',
    introducedIn: 'basic_training',
  },
  {
    id: 'rom_thoracic_rotation',
    category: 'range_of_motion',
    nameEn: 'Half-Kneeling Thoracic Rotation',
    nameUa: 'Ротація грудного відділу (з коліна)',
    sets: 1,
    reps: '5-8 per side',
    descriptionEn:
      'From kneeling, bend forward, one hand on the floor under your shoulder. Reach the other arm up and back, eyes following the hand. Sweep down past opposite leg. Repeat then switch.',
    descriptionUa:
      'З коліна, нахилитись вперед, одна рука під плечем на підлозі. Інша рука вгору-назад, слідкувати очима. Опустити руку повз протилежну ногу. Повтор, потім зміна.',
    introducedIn: 'basic_training',
  },

  // ── Activation ──────────────────────────────────────────────────
  {
    id: 'act_hip_raise',
    category: 'activation',
    nameEn: 'Hip Raise',
    nameUa: 'Підйом тазу',
    sets: 1,
    reps: '10',
    descriptionEn:
      'On back, knees bent, heels on floor, arms out. Push through heels, lift hips, squeeze glutes (no lower-back arch). Lower close to floor and repeat.',
    descriptionUa:
      'На спині, коліна зігнуті, п\'яти на підлозі, руки в боки. Виштовх п\'ятами, підйом тазу, стиснути сідниці (без прогину поперека). Опустити майже до підлоги, повторити.',
    introducedIn: 'basic_training',
  },
  {
    id: 'act_single_leg_hip_raise',
    category: 'activation',
    nameEn: 'Single-Leg Hip Raise',
    nameUa: 'Підйом тазу на одній нозі',
    sets: 1,
    reps: '6-8 per leg',
    descriptionEn:
      'Same as hip raise, but lift the foot of the non-working leg off the floor. Optional 3s pause at the top for max glute activation.',
    descriptionUa:
      'Як звичайний підйом тазу, але стопу неробочої ноги відірвати від підлоги. Опціонально — пауза 3с вгорі для максимальної активації сідниць.',
    introducedIn: 'hypertrophy',
  },
  {
    id: 'act_spiderman_climb',
    category: 'activation',
    nameEn: 'Spiderman Climb',
    nameUa: 'Spiderman climb',
    sets: 1,
    reps: '5 per side',
    descriptionEn:
      'From push-up position, step one foot up next to the same-side hand. Drop hips slightly to feel the stretch in lower abs / hip flexors. Return and alternate.',
    descriptionUa:
      'З позиції віджимання, поставити стопу поряд з рукою з того ж боку. Злегка опустити таз для відчуття розтяжки нижнього преса / згиначів. Повернутись, чергувати.',
    introducedIn: 'basic_training',
  },
  {
    id: 'act_spiderman_climb_reach',
    category: 'activation',
    nameEn: 'Spiderman Climb with Reach',
    nameUa: 'Spiderman climb з ротацією',
    sets: 1,
    reps: '5 per side',
    descriptionEn:
      'Same as Spiderman climb, but as the foot lands, reach up and back with the same-side hand, following with your eyes until arms are perpendicular to the floor.',
    descriptionUa:
      'Як Spiderman climb, але після постановки стопи — рукою того ж боку тягнутись вгору-назад, очі слідкують за рукою, поки руки не стануть перпендикулярно до підлоги.',
    introducedIn: 'basic_training',
  },

  // ── Movement Preparation (mobility) ─────────────────────────────
  {
    id: 'mp_squat_to_stand',
    category: 'movement_prep',
    nameEn: 'Squat to Stand',
    nameUa: 'Squat to Stand (присід-розгин)',
    sets: 1,
    reps: '5',
    descriptionEn:
      'Bend at hips, reach toward toes (legs straight). Push hips back, descend into deep squat grabbing toes. Pull shoulders back, then straighten legs while still holding toes — feel the hamstring stretch.',
    descriptionUa:
      'Нахил у тазостегнових, тягнутись до носків (ноги прямі). Таз назад, опуститись у глибокий присід, взятись за носки. Плечі назад, потім випрямити ноги тримаючи носки — відчути розтяжку біцепсу стегна.',
    introducedIn: 'basic_training',
  },
  {
    id: 'mp_reverse_lunge_reach',
    category: 'movement_prep',
    nameEn: 'Reverse Lunge with Reach',
    nameUa: 'Зворотній випад з витягуванням',
    sets: 1,
    reps: '5 per side',
    descriptionEn:
      'Long step back into a reverse lunge. Lean toward the front side and reach overhead with the opposite arm — stretch the entire lateral chain (triceps, lats, obliques, hip flexors). Alternate.',
    descriptionUa:
      'Довгий крок назад у випад. Нахил у бік передньої ноги, протилежна рука вгору — розтяжка усього бокового ланцюга (трицепс, широчайші, косі, згиначі стегна). Чергувати.',
    introducedIn: 'basic_training',
  },
  {
    id: 'mp_side_lunge_touch',
    category: 'movement_prep',
    nameEn: 'Side Lunge with Touch',
    nameUa: 'Боковий випад з торканням',
    sets: 1,
    reps: '5 per side',
    descriptionEn:
      'Long step to the side into a side lunge. Touch the floor with both hands either side of the lead foot. Return and alternate. Aim for a deep stretch on the inside of the extended leg.',
    descriptionUa:
      'Довгий крок убік у боковий випад. Торкнутись підлоги обома руками з обох боків передньої стопи. Повернутись, чергувати. Глибока розтяжка по внутрішній поверхні випрямленої ноги.',
    introducedIn: 'hypertrophy',
  },
  {
    id: 'mp_cossack_lunge',
    category: 'movement_prep',
    nameEn: 'Cossack Lunge',
    nameUa: 'Козацький випад',
    sets: 1,
    reps: '5 per side',
    descriptionEn:
      'Wide stance, knees bent, toes turned out. Keeping torso upright, lean to one side raising the toes of the other foot. Alternate, going deeper each rep. Add reps if needed for full ROM.',
    descriptionUa:
      'Широка стійка, коліна зігнуті, носки розвернуті. Торс прямо, нахил в один бік, носок протилежної стопи піднімається. Чергувати, з кожним разом глибше. За потреби — більше повторів для повної амплітуди.',
    introducedIn: 'hypertrophy',
  },

  // ── Locomotion (final warm-up — adrenaline) ─────────────────────
  {
    id: 'loc_jog',
    category: 'locomotion',
    nameEn: 'Jog',
    nameUa: 'Біг підтюпцем',
    sets: 1,
    reps: '10-20 yds × 2 (or 20-40 steps in place)',
    descriptionEn:
      'Light jog 10-20 yards and back. If no space, jog in place 20-40 steps.',
    descriptionUa:
      'Легкий біг 10-20 метрів туди й назад. Якщо немає простору — на місці 20-40 кроків.',
    introducedIn: 'basic_training',
  },
  {
    id: 'loc_side_shuffle',
    category: 'locomotion',
    nameEn: 'Side Shuffle',
    nameUa: 'Бокові пересування (shuffle)',
    sets: 1,
    reps: '10-20 yds each way',
    descriptionEn:
      'Athletic stance, side-on. Slide trailing foot to lead foot, immediately step out with lead foot. 10-20 yds, catch breath, repeat other side. No space? Shuffle 2 + reach to floor.',
    descriptionUa:
      'Атлетична стійка боком. Підтягнути задню ногу до передньої, одразу — крок передньою. 10-20 м, віддих, в інший бік. Немає простору — 2 кроки + торкнутись підлоги.',
    introducedIn: 'basic_training',
  },
  {
    id: 'loc_high_knee_run',
    category: 'locomotion',
    nameEn: 'High-Knee Run',
    nameUa: 'Біг з високим підніманням колін',
    sets: 1,
    reps: '20 steps (or 10-20 yds)',
    descriptionEn:
      'Short, explosive steps, knee as high as possible each step. Land on the balls of the feet, push off immediately. Easy to do in place.',
    descriptionUa:
      'Короткі вибухові кроки, коліно максимально вгору на кожен крок. Приземлення на подушечки стоп, миттєвий поштовх. Легко робити на місці.',
    introducedIn: 'basic_training',
  },
  {
    id: 'loc_carioca',
    category: 'locomotion',
    nameEn: 'Carioca',
    nameUa: 'Каріока',
    sets: 1,
    reps: '10-20 yds each way',
    descriptionEn:
      'Lateral drill: trailing leg alternately crosses behind and in front of the lead leg. Hips rotate; shoulders follow. Speed it up once it clicks. No space? Use crossover jumping jack.',
    descriptionUa:
      'Бокова вправа: задня нога чергує перехрест ззаду й попереду передньої. Стегна обертаються, плечі слідують. Прискорювати, коли стане звично. Немає простору — crossover jumping jack.',
    introducedIn: 'basic_training',
  },
];

// Default selection — Alwyn's recommended starter routine from Chapter 17.
// Six exercises (~10 min) covering R, A, M-mobility, M-locomotion.
export const defaultRampSelection: string[] = [
  'rom_hip_flexor_stretch',
  'rom_thoracic_rotation',
  'act_hip_raise',
  'act_spiderman_climb_reach',
  'mp_squat_to_stand',
  'loc_high_knee_run',
];

export function getRampExercises(selectedIds: string[]): WarmupExercise[] {
  // Preserve user-defined order
  const map = new Map(rampLibrary.map((ex) => [ex.id, ex]));
  return selectedIds
    .map((id) => map.get(id))
    .filter((ex): ex is WarmupExercise => ex !== undefined);
}
