import type { WarmupProtocol } from '../types';

export const warmupProtocols: WarmupProtocol[] = [
  {
    programPhase: 'basic_training',
    exercises: [
      { order: 'R1', category: 'range_of_motion', nameEn: 'Half-Kneeling Hip Flexor Stretch', nameUa: 'Розтяжка згиначів стегна (з коліна)', sets: 1, reps: '30s per side', descriptionEn: 'Kneel on one knee, shift forward, feel stretch in front of hip.', descriptionUa: 'На одному коліні, зміститись вперед, відчути розтяжку передньої частини стегна.' },
      { order: 'R2', category: 'range_of_motion', nameEn: 'Half-Kneeling Thoracic Rotation', nameUa: 'Ротація грудного відділу (з коліна)', sets: 1, reps: '5 per side', descriptionEn: 'From kneeling, one hand on floor, other reaches up with torso rotation. Follow hand with eyes.', descriptionUa: 'З коліна, одна рука на підлозі, інша тягнеться вгору з поворотом. Слідкувати очима за рукою.' },
      { order: 'A1', category: 'activation', nameEn: 'Hip Raise / Glute Bridge', nameUa: 'Підйом тазу (glute bridge)', sets: 1, reps: '10', descriptionEn: 'On back, heels on floor. Raise hips, squeeze glutes. Progress: single leg.', descriptionUa: 'На спині, п\'яти на підлозі. Підняти таз вгору, стиснути сідниці. Прогресія: на одній нозі.' },
      { order: 'A2', category: 'activation', nameEn: 'Spiderman Climb with Reach', nameUa: 'Spiderman climb з ротацією', sets: 1, reps: '5 per side', descriptionEn: 'From push-up position: bring foot to hand, rotate and reach up with same-side arm.', descriptionUa: 'З позиції віджимання: нога до руки, ротація вгору рукою з того ж боку.' },
      { order: 'M1', category: 'movement_prep', nameEn: 'Squat to Stand', nameUa: 'Присідання до стійки', sets: 1, reps: '5', descriptionEn: 'Bend down, grab toes, drop into deep squat. Straighten legs while holding toes.', descriptionUa: 'Нахилитись, взятись за носки, опуститись у глибокий присід. Випрямити ноги тримаючи носки.' },
      { order: 'M2', category: 'movement_prep', nameEn: 'High-Knee Run', nameUa: 'Біг з високим підніманням колін', sets: 1, reps: '20 steps', descriptionEn: 'Short explosive steps, knees as high as possible. Can do in place.', descriptionUa: 'Короткі вибухові кроки, коліна максимально вгору. Можна на місці.' },
    ],
  },
  {
    programPhase: 'hypertrophy',
    exercises: [
      { order: 'R1', category: 'range_of_motion', nameEn: 'Half-Kneeling Hip Flexor Stretch', nameUa: 'Розтяжка згиначів стегна', sets: 1, reps: '30s per side', descriptionEn: 'Standard for every workout.', descriptionUa: 'Стандарт для кожного тренування.' },
      { order: 'R2', category: 'range_of_motion', nameEn: 'Cossack Lunge', nameUa: 'Козацький випад', sets: 1, reps: '5 per side', descriptionEn: 'Wide stance, shift weight to one leg, other straight. Deep adductor stretch.', descriptionUa: 'Широка стійка, перенести вагу на одну ногу, друга пряма. Глибока розтяжка привідних.' },
      { order: 'A1', category: 'activation', nameEn: 'Single-Leg Hip Raise with Pause', nameUa: 'Підйом тазу на одній нозі з паузою', sets: 1, reps: '6 per leg', descriptionEn: '3s pause at top. Maximum glute activation before RDL and lunges.', descriptionUa: 'Пауза 3с вгорі. Максимальна активація сідниць перед RDL та випадами.' },
      { order: 'A2', category: 'activation', nameEn: 'Spiderman Climb with Reach', nameUa: 'Spiderman climb з ротацією', sets: 1, reps: '5 per side', descriptionEn: 'Mobility + activation.', descriptionUa: 'Мобільність + активація.' },
      { order: 'M1', category: 'movement_prep', nameEn: 'Reverse Lunge with Reach', nameUa: 'Зворотній випад з витягуванням', sets: 1, reps: '5 per side', descriptionEn: 'Step back into lunge, lean to side, arm overhead. Stretch entire lateral chain.', descriptionUa: 'Крок назад у випад, нахил вбік, рука вгору. Розтяжка всього бокового ланцюга.' },
      { order: 'M2', category: 'movement_prep', nameEn: 'High Knees + Carioca', nameUa: 'Високі коліна + каріока', sets: 1, reps: '10m + 10m', descriptionEn: '10m high knees → turn → 10m carioca. Final warm-up.', descriptionUa: '10м високі коліна → розвернутись → 10м каріока. Фінальний розігрів.' },
    ],
  },
  {
    programPhase: 'strength_power',
    exercises: [
      { order: 'R1', category: 'range_of_motion', nameEn: 'Half-Kneeling Hip Flexor Stretch', nameUa: 'Розтяжка згиначів стегна', sets: 1, reps: '30s per side', descriptionEn: 'Standard.', descriptionUa: 'Стандарт.' },
      { order: 'R2', category: 'range_of_motion', nameEn: 'Deep Cossack Lunge', nameUa: 'Козацький випад (глибокий)', sets: 1, reps: '5 per side', descriptionEn: 'Wide stance, maximum depth on one leg. Final mobility progression.', descriptionUa: 'Широка стійка, максимально глибоко на одну ногу. Фінальна прогресія мобільності.' },
      { order: 'A1', category: 'activation', nameEn: 'Single-Leg Hip Raise with 3s Pause', nameUa: 'Підйом тазу на одній нозі з паузою 3с', sets: 1, reps: '6 per leg', descriptionEn: '3s pause at top. Max glute activation.', descriptionUa: 'Пауза 3с вгорі. Макс. активація сідниць.' },
      { order: 'A2', category: 'activation', nameEn: 'Spiderman Climb with Reach', nameUa: 'Spiderman climb з ротацією', sets: 1, reps: '5 per side', descriptionEn: 'Standard — excellent mobility + full body activation.', descriptionUa: 'Стандарт — відмінна мобільність + активація всього тіла.' },
      { order: 'M1', category: 'movement_prep', nameEn: 'Reverse Lunge with Reach', nameUa: 'Зворотній випад з витягуванням', sets: 1, reps: '5 per side', descriptionEn: 'Step back, lean to side + arm up. Lateral chain stretch.', descriptionUa: 'Крок назад, нахил вбік + рука вгору. Розтяжка бокового ланцюга.' },
      { order: 'M2', category: 'movement_prep', nameEn: 'High Knees → Carioca', nameUa: 'Високі коліна → каріока', sets: 1, reps: '10m + 10m', descriptionEn: '10m high knees → turn → 10m carioca. Final warm-up before heavy lifting.', descriptionUa: '10м високі коліна → каріока. Фінальний розігрів перед важкою роботою.' },
    ],
  },
];
