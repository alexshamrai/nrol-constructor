import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  // ============================================================
  // SQUAT (7 exercises)
  // ============================================================
  {
    id: 'squat_1_bodyweight',
    pattern: 'squat',
    level: 1,
    nameEn: 'Body-weight squat',
    nameUa: 'Присідання з власною вагою',
    descriptionEn:
      'Feet shoulder-width apart, squat to parallel. Arms forward for balance.',
    descriptionUa:
      'Ноги на ширині плечей, присісти до паралелі. Руки вперед для балансу.',
    equipment: ['bodyweight'],
    bestFor: ['BT I', 'metabolic'],
  },
  {
    id: 'squat_2_goblet',
    pattern: 'squat',
    level: 2,
    nameEn: 'Goblet squat',
    nameUa: 'Кубкові присідання',
    descriptionEn:
      'Hold dumbbell vertically at chest with both hands. Deep squat, elbows between knees.',
    descriptionUa:
      'Гантель вертикально біля грудей обома руками. Глибокий присід, лікті між колінами.',
    equipment: ['dumbbells'],
    bestFor: ['BT I-II', 'Hyp (all reps)'],
    adaptationEn: 'Can use a weight plate instead',
    adaptationUa: 'Можна з диском',
  },
  {
    id: 'squat_2.5_kb_rack',
    pattern: 'squat',
    level: 2.5,
    nameEn: 'KB rack-position squat',
    nameUa: 'Присідання з гантеллю біля плеча',
    descriptionEn:
      'One dumbbell at shoulder (vertical). Asymmetric core loading.',
    descriptionUa:
      'Одна гантель на плечі (вертикально). Асиметричне навантаження на кор.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'fat loss'],
    adaptationEn: 'Dumbbell instead of kettlebell',
    adaptationUa: 'Гантель замість гирі (adaptation)',
  },
  {
    id: 'squat_3_front',
    pattern: 'squat',
    level: 3,
    nameEn: 'Front squat',
    nameUa: 'Фронтальні присідання',
    descriptionEn:
      'Dumbbells on shoulders (ends on delts), elbows up. Torso upright.',
    descriptionUa:
      'Гантелі на плечах (торці на дельтах), лікті вгору. Торс вертикально.',
    equipment: ['dumbbells'],
    bestFor: ['Hyp', 'S&P (all reps)'],
  },
  {
    id: 'squat_3.5_offset_overhead',
    pattern: 'squat',
    level: 3.5,
    nameEn: 'Offset overhead squat',
    nameUa: 'Офсетний присід з вагою над головою',
    descriptionEn:
      'One dumbbell overhead on extended arm. Squat while keeping it overhead.',
    descriptionUa:
      'Одна гантель над головою на витягнутій руці. Присісти тримаючи вгорі.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'fat loss'],
  },
  {
    id: 'squat_4_back',
    pattern: 'squat',
    level: 4,
    nameEn: 'Back squat',
    nameUa: 'Присідання зі штангою на спині',
    descriptionEn: 'Barbell on upper back.',
    descriptionUa: 'Штанга на верхній частині спини.',
    equipment: ['barbell'],
    bestFor: ['Hyp', 'S&P (heavy)'],
    adaptationEn: 'Heavy front squat or goblet squat instead',
    adaptationUa: 'Важкі фронтальні або goblet',
  },
  {
    id: 'squat_5_overhead',
    pattern: 'squat',
    level: 5,
    nameEn: 'Overhead squat',
    nameUa: 'Присідання з вагою над головою',
    descriptionEn:
      'Dumbbells overhead. Squat without lowering them. Mobility + stabilization.',
    descriptionUa:
      'Гантелі над головою. Присісти не опускаючи. Мобільність + стабілізація.',
    equipment: ['dumbbells'],
    bestFor: ['Advanced'],
    adaptationEn: 'Start with a stick',
    adaptationUa: 'Почати з палки',
  },

  // ============================================================
  // HINGE (7 exercises)
  // ============================================================
  {
    id: 'hinge_1_hip_ext',
    pattern: 'hinge',
    level: 1,
    nameEn: 'Supine hip extension',
    nameUa: 'Підйом тазу (glute bridge)',
    descriptionEn:
      'On back, heels on floor. Raise hips, squeeze glutes.',
    descriptionUa:
      'На спині, п\'яти на підлозі. Підняти таз, стиснути сідниці.',
    equipment: ['bodyweight'],
    bestFor: ['BT I (beginner)'],
    adaptationEn:
      'Book = swiss ball, substitute: floor or heels on bench',
    adaptationUa:
      'Книга = фітбол, заміна: підлога або п\'яти на лавці',
  },
  {
    id: 'hinge_1.5_hip_ext_leg_curl',
    pattern: 'hinge',
    level: 1.5,
    nameEn: 'Hip ext. with leg curl',
    nameUa: 'Підйом тазу зі згинанням ніг',
    descriptionEn:
      'Heels in TRX. Raise hips + pull heels to glutes.',
    descriptionUa:
      'П\'яти в TRX. Підняти таз + підтягнути п\'яти до сідниць.',
    equipment: ['trx'],
    bestFor: ['BT I (beginner)'],
    adaptationEn: 'TRX hamstring curl',
    adaptationUa: 'TRX hamstring curl',
  },
  {
    id: 'hinge_2_rdl',
    pattern: 'hinge',
    level: 2,
    nameEn: 'Romanian deadlift',
    nameUa: 'Румунська тяга',
    descriptionEn:
      'Dumbbells in front of thighs. Hips back, lower to mid-shin. Back straight.',
    descriptionUa:
      'Гантелі перед стегнами. Таз назад, опустити до середини гомілок. Спина рівна.',
    equipment: ['dumbbells'],
    bestFor: ['BT-Hyp-S&P (universal!)'],
    adaptationEn: 'Primary hinge exercise',
    adaptationUa: 'Основна hinge вправа',
  },
  {
    id: 'hinge_2_sumo_dl',
    pattern: 'hinge',
    level: 2,
    nameEn: 'DB sumo deadlift',
    nameUa: 'Сумо тяга з гантелями',
    descriptionEn:
      'Wide stance, toes out. Dumbbell(s) between legs to floor.',
    descriptionUa:
      'Широка стійка, носки назовні. Гантель(і) між ніг до підлоги.',
    equipment: ['dumbbells'],
    bestFor: ['BT I-II (alternative)'],
  },
  {
    id: 'hinge_3_rack_dl',
    pattern: 'hinge',
    level: 3,
    nameEn: 'Rack deadlift',
    nameUa: 'Тяга з підвищення',
    descriptionEn:
      'Dumbbells on step boxes at knee level. Shorter range of motion.',
    descriptionUa:
      'Гантелі на степах на рівні колін. Коротша амплітуда.',
    equipment: ['dumbbells', 'step_box'],
    bestFor: ['S&P (heavy)'],
    adaptationEn: 'Dumbbells on steps/blocks',
    adaptationUa: 'Гантелі на степи/блоки',
  },
  {
    id: 'hinge_4_deadlift',
    pattern: 'hinge',
    level: 4,
    nameEn: 'Deadlift / Sumo DL',
    nameUa: 'Класична тяга / Сумо',
    descriptionEn: 'Barbell from floor.',
    descriptionUa: 'Штанга з підлоги.',
    equipment: ['barbell'],
    bestFor: ['S&P (max strength)'],
    adaptationEn:
      'Heavy RDL or sumo with 2 heaviest dumbbells',
    adaptationUa:
      'Важка RDL або сумо з 2 найважчими гантелями',
  },
  {
    id: 'hinge_5_wide_grip_dl',
    pattern: 'hinge',
    level: 5,
    nameEn: 'Wide-grip deadlift',
    nameUa: 'Тяга широким хватом',
    descriptionEn: 'Wider grip, greater ROM.',
    descriptionUa: 'Ширший хват, більший ROM.',
    equipment: ['barbell'],
    bestFor: ['S&P III'],
    adaptationEn: 'RDL with slow eccentric 3-4s',
    adaptationUa: 'RDL з повільним ексцентриком 3-4с',
  },

  // ============================================================
  // PUSH (11 exercises)
  // ============================================================
  {
    id: 'push_0.5_pushup_elevated',
    pattern: 'push',
    level: 0.5,
    nameEn: 'Push-up, hands elevated',
    nameUa: 'Віджимання з руками на підвищенні',
    direction: 'horizontal',
    descriptionEn: 'Hands on bench. Easier variation.',
    descriptionUa: 'Руки на лавці. Легший варіант.',
    equipment: ['step_box'],
    bestFor: ['BT I (beginner)'],
  },
  {
    id: 'push_1_pushup',
    pattern: 'push',
    level: 1,
    nameEn: 'Push-up',
    nameUa: 'Віджимання від підлоги',
    direction: 'horizontal',
    descriptionEn: 'Classic push-ups. Chest to floor.',
    descriptionUa: 'Класичні віджимання. Груди до підлоги.',
    equipment: ['bodyweight'],
    bestFor: ['BT I-II', 'Hyp (high reps)'],
  },
  {
    id: 'push_1_jackknife',
    pattern: 'push',
    level: 1,
    nameEn: 'Jackknife push-up',
    nameUa: 'Віджимання \u00ABскладний ніж\u00BB',
    direction: 'vertical',
    descriptionEn:
      'Hips up (V-shape). Head toward floor. Mimics vertical press.',
    descriptionUa:
      'Таз вгору (V). Голова до підлоги. Імітація вертикального жиму.',
    equipment: ['bodyweight'],
    bestFor: ['BT II-III'],
    adaptationEn: 'Feet on bench for progression',
    adaptationUa: 'Ноги на лавці для ускладнення',
  },
  {
    id: 'push_2.5_pushup_suspended',
    pattern: 'push',
    level: 2.5,
    nameEn: 'Push-up, hands suspended',
    nameUa: 'TRX віджимання',
    direction: 'horizontal',
    descriptionEn: 'Hands in TRX. Instability makes it harder.',
    descriptionUa: 'Руки в TRX. Нестабільність ускладнює.',
    equipment: ['trx'],
    bestFor: ['BT III-IV', 'Hyp'],
  },
  {
    id: 'push_3_t_pushup',
    pattern: 'push',
    level: 3,
    nameEn: 'T push-up',
    nameUa: 'Т-віджимання',
    direction: 'horizontal',
    descriptionEn: 'Push up, then rotate, arm up (T-shape).',
    descriptionUa: 'Віджатись \u2192 поворот, рука вгору (Т).',
    equipment: ['bodyweight'],
    bestFor: ['BT II-III'],
    adaptationEn: 'Add dumbbells for weight',
    adaptationUa: 'З гантелями для ваги',
  },
  {
    id: 'push_3_t_pushup_weighted',
    pattern: 'push',
    level: 3,
    nameEn: 'T push-up with weights',
    nameUa: 'Т-віджимання з гантелями',
    direction: 'horizontal',
    descriptionEn:
      'Hands on dumbbells. Push up, then T-rotation lifting dumbbell.',
    descriptionUa:
      'Руки на гантелях. Віджатись \u2192 Т-поворот з підйомом гантелі.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'Hyp'],
    adaptationEn: 'Hex dumbbells are more stable',
    adaptationUa: 'Шестикутні гантелі стабільніші',
  },
  {
    id: 'push_4_db_bench_press',
    pattern: 'push',
    level: 4,
    nameEn: 'DB bench press',
    nameUa: 'Жим гантелей лежачи',
    direction: 'horizontal',
    descriptionEn:
      'Lying on bench, press up. Classic horizontal press.',
    descriptionUa:
      'Лежачи на лавці, жим вгору. Класичний горизонтальний жим.',
    equipment: ['dumbbells', 'bench'],
    bestFor: ['Hyp', 'S&P (heavy)'],
    adaptationEn: 'REQUIRES BENCH',
    adaptationUa: 'ПОТРЕБУЄ ЛАВКУ',
  },
  {
    id: 'push_4.1_db_single_arm_bench',
    pattern: 'push',
    level: 4.1,
    nameEn: 'DB single-arm bench press',
    nameUa: 'Жим однією рукою лежачи',
    direction: 'horizontal',
    descriptionEn:
      'One dumbbell, lying. Core stabilizes.',
    descriptionUa:
      'Одна гантель, лежачи. Кор стабілізує.',
    equipment: ['dumbbells', 'bench'],
    bestFor: ['Hyp', 'S&P (anti-rotation)'],
    adaptationEn: 'REQUIRES BENCH',
    adaptationUa: 'ПОТРЕБУЄ ЛАВКУ',
  },
  {
    id: 'push_5_db_shoulder_press',
    pattern: 'push',
    level: 5,
    nameEn: 'DB shoulder press',
    nameUa: 'Жим гантелей стоячи',
    direction: 'vertical',
    descriptionEn:
      'Standing, dumbbells at shoulders, press up. No arching.',
    descriptionUa:
      'Стоячи, гантелі на плечах \u2192 жим вгору. Без прогину.',
    equipment: ['dumbbells'],
    bestFor: ['BT I', 'Hyp', 'S&P (all reps)'],
  },
  {
    id: 'push_5_db_alt_shoulder_press',
    pattern: 'push',
    level: 5,
    nameEn: 'DB alternating shoulder press',
    nameUa: 'Жим почергово стоячи',
    direction: 'vertical',
    descriptionEn:
      'Like shoulder press, one arm at a time. More core.',
    descriptionUa:
      'Як shoulder press, одна рука за раз. Більше кор.',
    equipment: ['dumbbells'],
    bestFor: ['Hyp', 'S&P (medium reps)'],
  },
  {
    id: 'push_7.5_barbell_bench',
    pattern: 'push',
    level: 7.5,
    nameEn: 'Barbell bench press',
    nameUa: 'Жим штанги лежачи',
    direction: 'horizontal',
    descriptionEn: 'Classic barbell bench press.',
    descriptionUa: 'Класичний жим штанги.',
    equipment: ['barbell', 'bench'],
    bestFor: ['S&P (max strength)'],
    adaptationEn: 'Heavy DB bench press (L4) instead',
    adaptationUa: 'Важкий DB bench press (L4)',
  },

  // ============================================================
  // PULL (8 exercises)
  // ============================================================
  {
    id: 'pull_1_band_row',
    pattern: 'pull',
    level: 1,
    nameEn: 'Standing cable/band row',
    nameUa: 'Тяга еспандера стоячи',
    direction: 'horizontal',
    descriptionEn:
      'Standing, row to belly. Maintain posture.',
    descriptionUa:
      'Стоячи, тяга до живота. Тримати позу.',
    equipment: ['resistance_bands'],
    bestFor: ['BT I (beginner)'],
    adaptationEn: 'Band on pull-up bar',
    adaptationUa: 'Еспандер на турніку',
  },
  {
    id: 'pull_2_kneeling_pulldown',
    pattern: 'pull',
    level: 2,
    nameEn: 'Kneeling lat pulldown',
    nameUa: 'Тяга зверху з коліна',
    direction: 'vertical',
    descriptionEn:
      'Kneeling, pull band from above to shoulder.',
    descriptionUa:
      'На коліні, тяга еспандера зверху до плеча.',
    equipment: ['resistance_bands'],
    bestFor: ['BT I (vertical)'],
    adaptationEn: 'Band on pull-up bar',
    adaptationUa: 'Еспандер на турніку',
  },
  {
    id: 'pull_3_two_point_row',
    pattern: 'pull',
    level: 3,
    nameEn: 'DB two-point row',
    nameUa: 'Тяга двох гантелей в нахилі',
    direction: 'horizontal',
    descriptionEn:
      'Bend ~45 degrees, both dumbbells. Row to belly. No support \u2014 core works.',
    descriptionUa:
      'Нахил ~45\u00B0, обидві гантелі. Тяга до живота. Без опори \u2014 кор працює.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'Hyp', 'S&P'],
  },
  {
    id: 'pull_3_three_point_row',
    pattern: 'pull',
    level: 3,
    nameEn: 'DB three-point row',
    nameUa: 'Тяга однією рукою (3 точки)',
    direction: 'horizontal',
    descriptionEn:
      'One hand on bench, other rows. Classic single-arm row.',
    descriptionUa:
      'Одна рука на лавці, інша тягне. Класична одноручна тяга.',
    equipment: ['dumbbells'],
    bestFor: ['BT I-IV', 'Hyp', 'S&P (universal)'],
    adaptationEn: 'Hand on any elevated surface',
    adaptationUa: 'Рука на будь-якому підвищенні',
  },
  {
    id: 'pull_3_chest_supported_row',
    pattern: 'pull',
    level: 3,
    nameEn: 'DB chest-supported row',
    nameUa: 'Тяга з опорою грудей',
    direction: 'horizontal',
    descriptionEn:
      'Chest on inclined bench, row both dumbbells. Isolates back.',
    descriptionUa:
      'Грудьми на нахиленій лавці, тяга двох гантелей. Ізолює спину.',
    equipment: ['dumbbells', 'bench'],
    bestFor: ['Hyp', 'S&P (pure pull)'],
    adaptationEn: 'REQUIRES BENCH',
    adaptationUa: 'ПОТРЕБУЄ ЛАВКУ',
  },
  {
    id: 'pull_4_inverted_row',
    pattern: 'pull',
    level: 4,
    nameEn: 'Inverted row',
    nameUa: 'Австралійські підтягування',
    direction: 'horizontal',
    descriptionEn:
      'Body at angle, pull chest to bar.',
    descriptionUa:
      'Тіло під кутом, тягнути груди до перекладини.',
    equipment: ['pull_up_bar'],
    bestFor: ['BT II-III'],
    adaptationEn: 'If bar is too high, use TRX row',
    adaptationUa: 'Якщо турнік високо \u2192 TRX row',
  },
  {
    id: 'pull_4.5_suspended_row',
    pattern: 'pull',
    level: 4.5,
    nameEn: 'Suspended row',
    nameUa: 'TRX тяга',
    direction: 'horizontal',
    descriptionEn:
      'Lean back, pull chest to hands. Feet closer = harder.',
    descriptionUa:
      'Нахилитись назад, тягнути груди до рук. Ноги ближче = важче.',
    equipment: ['trx'],
    bestFor: ['BT II-IV', 'Hyp (all reps)'],
    adaptationEn: 'Feet on bench for progression',
    adaptationUa: 'Ноги на лавці для ускладнення',
  },
  {
    id: 'pull_5_chinup',
    pattern: 'pull',
    level: 5,
    nameEn: 'Chin-up',
    nameUa: 'Підтягування',
    direction: 'vertical',
    descriptionEn:
      'Underhand grip. With band assist or weighted.',
    descriptionUa:
      'Хват знизу. З резиною для допомоги або з вагою.',
    equipment: ['pull_up_bar', 'pull_up_assist_band'],
    bestFor: ['BT (goal)', 'Hyp', 'S&P (max)'],
    adaptationEn: 'Pull-up (overhand grip) is a variation',
    adaptationUa: 'Pull-up (хват зверху) \u2014 варіація',
  },

  // ============================================================
  // LUNGE (6 exercises)
  // ============================================================
  {
    id: 'lunge_1_split_squat',
    pattern: 'lunge',
    level: 1,
    nameEn: 'Split squat',
    nameUa: 'Спліт-присід',
    descriptionEn:
      'One foot forward, other behind. Lower vertically.',
    descriptionUa:
      'Одна нога попереду, інша позаду. Опуститись вертикально.',
    equipment: ['dumbbells'],
    bestFor: ['BT I (beginner)'],
  },
  {
    id: 'lunge_2_reverse',
    pattern: 'lunge',
    level: 2,
    nameEn: 'Reverse lunge',
    nameUa: 'Зворотній випад',
    descriptionEn:
      'Step BACK. Less knee stress.',
    descriptionUa:
      'Крок НАЗАД. Менше навантаження на коліна.',
    equipment: ['dumbbells'],
    bestFor: ['BT I-II (main)'],
    adaptationEn: 'Offset, at shoulders \u2014 variations',
    adaptationUa: 'Offset, на плечах \u2014 варіації',
  },
  {
    id: 'lunge_2.5_side',
    pattern: 'lunge',
    level: 2.5,
    nameEn: 'Side lunge',
    nameUa: 'Бічний випад',
    descriptionEn:
      'Wide step to the side, squat. Adductors + quads.',
    descriptionUa:
      'Широкий крок вбік, присісти. Привідні + квадрицепс.',
    equipment: ['dumbbells'],
    bestFor: ['BT II-III'],
  },
  {
    id: 'lunge_3_bulgarian',
    pattern: 'lunge',
    level: 3,
    nameEn: 'Split squat, rear elevated',
    nameUa: 'Болгарський спліт-присід',
    descriptionEn:
      'Rear foot on bench. Deep squat.',
    descriptionUa:
      'Задня нога на лавці. Глибокий присід.',
    equipment: ['dumbbells', 'bench'],
    bestFor: ['BT II-IV', 'Hyp (all reps)'],
    adaptationEn: 'Rear foot in TRX strap \u2014 variation',
    adaptationUa: 'Задня нога в TRX петлю \u2014 варіант',
  },
  {
    id: 'lunge_4_forward',
    pattern: 'lunge',
    level: 4,
    nameEn: 'Forward lunge',
    nameUa: 'Випад вперед',
    descriptionEn:
      'Step FORWARD. Harder due to deceleration.',
    descriptionUa:
      'Крок ВПЕРЕД. Складніше через гальмування.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'Hyp'],
  },
  {
    id: 'lunge_5_walking',
    pattern: 'lunge',
    level: 5,
    nameEn: 'Walking lunge',
    nameUa: 'Прохідні випади',
    descriptionEn:
      'Continuous forward movement. Need 5-10m of space.',
    descriptionUa:
      'Безперервний рух вперед. Потрібно 5-10м.',
    equipment: ['dumbbells'],
    bestFor: ['BT IV', 'Hyp', 'S&P'],
    adaptationEn: 'No space: reverse lunge with 2s pause',
    adaptationUa: 'Немає місця \u2192 reverse lunge з паузою 2с',
  },

  // ============================================================
  // SINGLE-LEG STANCE (7 exercises)
  // ============================================================
  {
    id: 'sls_1_stepup',
    pattern: 'single_leg_stance',
    level: 1,
    nameEn: 'Step-up',
    nameUa: 'Зашагування',
    descriptionEn:
      'Foot on box, stand up through heel. Do not push off with lower leg.',
    descriptionUa:
      'Нога на тумбі, встати через п\'яту. Не відштовхуватись нижньою.',
    equipment: ['dumbbells', 'step_box'],
    bestFor: ['BT I-II', 'Hyp (all reps)'],
    adaptationEn: 'Box height = difficulty',
    adaptationUa: 'Висота тумби = складність',
  },
  {
    id: 'sls_2_offset_stepup',
    pattern: 'single_leg_stance',
    level: 2,
    nameEn: 'Offset-loaded step-up',
    nameUa: 'Зашагування з офсетом',
    descriptionEn:
      'One dumbbell in one hand. Core stabilizes asymmetry.',
    descriptionUa:
      'Одна гантель в одній руці. Кор стабілізує асиметрію.',
    equipment: ['dumbbells', 'step_box'],
    bestFor: ['BT II-III'],
  },
  {
    id: 'sls_2.25_crossover_stepup',
    pattern: 'single_leg_stance',
    level: 2.25,
    nameEn: 'Crossover step-up',
    nameUa: 'Перехресне зашагування',
    descriptionEn:
      'Stand beside the step, far leg crosses over and steps up.',
    descriptionUa:
      'Збоку від степу, далека нога перехрещує і зашагує.',
    equipment: ['dumbbells', 'step_box'],
    bestFor: ['BT IV'],
  },
  {
    id: 'sls_2.75_overhead_stepup',
    pattern: 'single_leg_stance',
    level: 2.75,
    nameEn: 'Overhead step-up',
    nameUa: 'Зашагування з вагою над головою',
    descriptionEn:
      'Dumbbell(s) overhead, step up while keeping overhead.',
    descriptionUa:
      'Гантель(і) над головою, зашагнути тримаючи вгорі.',
    equipment: ['dumbbells', 'step_box'],
    bestFor: ['BT III-IV'],
    adaptationEn: 'Start with one light dumbbell',
    adaptationUa: 'Почати з однієї легкої',
  },
  {
    id: 'sls_3_sl_rdl',
    pattern: 'single_leg_stance',
    level: 3,
    nameEn: 'Single-leg Romanian DL',
    nameUa: 'Румунська тяга на одній нозі',
    descriptionEn:
      'Dumbbell in opposite hand. Hinge on one leg. Balance + posterior chain.',
    descriptionUa:
      'Гантель у протилежній руці. Нахил на одній нозі. Баланс + задня поверхня.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'Hyp', 'S&P'],
    adaptationEn: 'TRX with free hand for balance',
    adaptationUa: 'TRX вільною рукою для балансу',
  },
  {
    id: 'sls_4_sl_squat',
    pattern: 'single_leg_stance',
    level: 4,
    nameEn: 'Single-leg squat',
    nameUa: 'Присідання на одній нозі',
    descriptionEn:
      'Squat on one leg, other leg forward. Very challenging.',
    descriptionUa:
      'Присісти на одній нозі, друга вперед. Дуже складно.',
    equipment: ['bodyweight', 'trx'],
    bestFor: ['Advanced'],
    adaptationEn: 'TRX-assisted for balance',
    adaptationUa: 'TRX-assisted для балансу',
  },
  {
    id: 'sls_5_sl_deadlift',
    pattern: 'single_leg_stance',
    level: 5,
    nameEn: 'Single-leg deadlift',
    nameUa: 'Тяга на одній нозі (з підлоги)',
    descriptionEn:
      'Like SL RDL, but dumbbell to floor. Full range of motion.',
    descriptionUa:
      'Як SL RDL, але гантель до підлоги. Повна амплітуда.',
    equipment: ['dumbbells'],
    bestFor: ['Advanced', 'S&P'],
  },

  // ============================================================
  // CORE: STABILITY (9 exercises)
  // ============================================================
  {
    id: 'core_stab_1_plank',
    pattern: 'core_stability',
    level: 1,
    nameEn: 'Plank',
    nameUa: 'Планка',
    coreGoal: 'AE',
    descriptionEn:
      'On forearms, body straight. Goal: 60s.',
    descriptionUa:
      'На передпліччях, тіло рівне. Мета: 60с.',
    equipment: ['bodyweight'],
    bestFor: ['BT I'],
  },
  {
    id: 'core_stab_1_side_plank',
    pattern: 'core_stability',
    level: 1,
    nameEn: 'Side plank',
    nameUa: 'Бокова планка',
    coreGoal: 'ALF',
    descriptionEn:
      'On one forearm, feet stacked. Goal: 45s.',
    descriptionUa:
      'На одному передпліччі, ноги складені. Мета: 45с.',
    equipment: ['bodyweight'],
    bestFor: ['BT I'],
  },
  {
    id: 'core_stab_1_tall_kneeling_hold',
    pattern: 'core_stability',
    level: 1,
    nameEn: 'Tall kneeling hold',
    nameUa: 'Утримання еспандера з колін',
    coreGoal: 'AR',
    descriptionEn:
      'Kneeling, band from the side. Hold in front of chest, resist rotation.',
    descriptionUa:
      'На колінах, еспандер збоку. Тримати перед грудьми, опираючись ротації.',
    equipment: ['resistance_bands'],
    bestFor: ['BT I (anti-rotation)'],
    adaptationEn: 'Band instead of cable',
    adaptationUa: 'Еспандер замість кабелю',
  },
  {
    id: 'core_stab_2_plank_reduced',
    pattern: 'core_stability',
    level: 2,
    nameEn: 'Plank, reduced base',
    nameUa: 'Планка зі зменш. опорою',
    coreGoal: 'AE',
    descriptionEn:
      'Raised arm, or leg, or opposite arm + leg.',
    descriptionUa:
      'Піднята рука, або нога, або протилежні рука+нога.',
    equipment: ['bodyweight'],
    bestFor: ['BT II'],
  },
  {
    id: 'core_stab_2_side_plank_reduced',
    pattern: 'core_stability',
    level: 2,
    nameEn: 'Side plank, reduced base',
    nameUa: 'Бокова планка зі зменш. опорою',
    coreGoal: 'ALF',
    descriptionEn:
      'Top leg raised or feet at different levels.',
    descriptionUa:
      'Верхня нога піднята або ноги на різних рівнях.',
    equipment: ['bodyweight'],
    bestFor: ['BT II'],
  },
  {
    id: 'core_stab_3_feet_elevated_plank',
    pattern: 'core_stability',
    level: 3,
    nameEn: 'Feet-elevated plank',
    nameUa: 'Планка з ногами на лавці',
    coreGoal: 'AE',
    descriptionEn:
      'Feet on elevation. Significantly harder.',
    descriptionUa:
      'Ноги на підвищенні. Значно складніше.',
    equipment: ['step_box'],
    bestFor: ['BT II-III'],
  },
  {
    id: 'core_stab_3_feet_elevated_side_plank',
    pattern: 'core_stability',
    level: 3,
    nameEn: 'Feet-elevated side plank',
    nameUa: 'Бокова планка, ноги на лавці',
    coreGoal: 'ALF',
    descriptionEn:
      'Feet on bench, side plank.',
    descriptionUa:
      'Ноги на лавці, бокова планка.',
    equipment: ['step_box'],
    bestFor: ['BT III'],
  },
  {
    id: 'core_stab_4_elevated_plank_reduced',
    pattern: 'core_stability',
    level: 4,
    nameEn: 'Elevated plank, reduced base',
    nameUa: 'Планка на підв. + зменш. опора',
    coreGoal: 'AE',
    descriptionEn:
      'Feet on bench + raise arm or leg.',
    descriptionUa:
      'Ноги на лавці + підняти руку або ногу.',
    equipment: ['bench'],
    bestFor: ['BT IV', 'Hyp'],
  },
  {
    id: 'core_stab_5_plank_trx',
    pattern: 'core_stability',
    level: 5,
    nameEn: 'Plank, feet in TRX',
    nameUa: 'Планка з ногами в TRX',
    coreGoal: 'AE',
    descriptionEn:
      'Feet in TRX straps. Instability = very hard.',
    descriptionUa:
      'Ноги в петлях TRX. Нестабільність = дуже складно.',
    equipment: ['trx'],
    bestFor: ['Hyp', 'S&P'],
  },

  // ============================================================
  // CORE: DYNAMIC (12 exercises)
  // ============================================================
  {
    id: 'core_dyn_1_plank_pulldown',
    pattern: 'core_dynamic',
    level: 1,
    nameEn: 'Plank and pulldown',
    nameUa: 'Планка з тягою зверху',
    coreGoal: 'AE',
    descriptionEn:
      'Plank, one arm pulls band (from bar) down.',
    descriptionUa:
      'Планка, одна рука тягне еспандер (з турніку) вниз.',
    equipment: ['resistance_bands'],
    bestFor: ['BT I'],
    adaptationEn: 'Band instead of cable',
    adaptationUa: 'Еспандер замість кабелю',
  },
  {
    id: 'core_dyn_1_side_plank_row',
    pattern: 'core_dynamic',
    level: 1,
    nameEn: 'Side plank and row',
    nameUa: 'Бокова планка з тягою',
    coreGoal: 'ALF',
    descriptionEn:
      'Side plank, top arm rows dumbbell to hip.',
    descriptionUa:
      'Бокова планка, верхня рука тягне гантель до стегна.',
    equipment: ['dumbbells'],
    bestFor: ['BT I'],
  },
  {
    id: 'core_dyn_2_push_away',
    pattern: 'core_dynamic',
    level: 2,
    nameEn: 'Push-away / TRX fallout',
    nameUa: 'Відкочування (TRX fallout)',
    coreGoal: 'AE',
    descriptionEn:
      'Standing, hands in TRX. Extend arms forward, body leans. Return.',
    descriptionUa:
      'Стоячи, руки в TRX. Випрямити руки вперед, тіло нахиляється. Повернутись.',
    equipment: ['trx'],
    bestFor: ['BT II'],
  },
  {
    id: 'core_dyn_2_mountain_climber',
    pattern: 'core_dynamic',
    level: 2,
    nameEn: 'Mountain climber',
    nameUa: 'Альпініст',
    coreGoal: 'HF',
    descriptionEn:
      'Push-up position. Knees to chest alternating.',
    descriptionUa:
      'Позиція віджимання. Коліна до грудей по черзі.',
    equipment: ['bodyweight'],
    bestFor: ['BT II', 'metabolic'],
    adaptationEn: 'Slow = core, fast = cardio',
    adaptationUa: 'Повільно = кор, швидко = кардіо',
  },
  {
    id: 'core_dyn_3_trx_rollout',
    pattern: 'core_dynamic',
    level: 3,
    nameEn: 'TRX rollout (from knees)',
    nameUa: 'TRX розкочування з колін',
    coreGoal: 'AE',
    descriptionEn:
      'From knees, hands in TRX. Extend body forward/up.',
    descriptionUa:
      'З колін, руки в TRX. Випрямити тіло вперед/вгору.',
    equipment: ['trx'],
    bestFor: ['BT III'],
    adaptationEn: 'Instead of Swiss-ball rollout',
    adaptationUa: 'Замість Swiss-ball rollout',
  },
  {
    id: 'core_dyn_3_tall_kneeling_chop',
    pattern: 'core_dynamic',
    level: 3,
    nameEn: 'Tall kneeling chop',
    nameUa: 'Діагональна тяга з колін',
    coreGoal: 'AR',
    descriptionEn:
      'Kneeling, band high to the side. Pull diagonally to opposite hip.',
    descriptionUa:
      'На колінах, еспандер вгорі збоку. Тяга діагонально до протилежного стегна.',
    equipment: ['resistance_bands'],
    bestFor: ['BT III'],
    adaptationEn: 'Band on pull-up bar',
    adaptationUa: 'Еспандер на турніку',
  },
  {
    id: 'core_dyn_4_suspended_fallout',
    pattern: 'core_dynamic',
    level: 4,
    nameEn: 'Suspended fallout (standing)',
    nameUa: 'TRX розкочування стоячи',
    coreGoal: 'AE',
    descriptionEn:
      'Like push-away but standing, arms go overhead. Harder.',
    descriptionUa:
      'Як push-away але стоячи, руки йдуть вгору. Складніше.',
    equipment: ['trx'],
    bestFor: ['BT IV', 'Hyp'],
  },
  {
    id: 'core_dyn_4_half_kneeling_chop',
    pattern: 'core_dynamic',
    level: 4,
    nameEn: 'Half-kneeling chop',
    nameUa: 'Діагональна тяга з напівколіна',
    coreGoal: 'AR',
    descriptionEn:
      'On one knee, less support = harder.',
    descriptionUa:
      'На одному коліні, менша опора = складніше.',
    equipment: ['resistance_bands'],
    bestFor: ['Hyp'],
    adaptationEn: 'Band instead of cable',
    adaptationUa: 'Еспандер замість кабелю',
  },
  {
    id: 'core_dyn_5_trx_jackknife_pushup',
    pattern: 'core_dynamic',
    level: 5,
    nameEn: 'TRX jackknife + push-up',
    nameUa: 'TRX jackknife + віджимання',
    coreGoal: 'HF',
    descriptionEn:
      'Feet in TRX. Pull knees in, extend, push-up.',
    descriptionUa:
      'Ноги в TRX. Підтягнути коліна \u2192 випрямити \u2192 віджимання.',
    equipment: ['trx'],
    bestFor: ['Hyp', 'S&P'],
  },
  {
    id: 'core_dyn_5_chop_reverse_lunge',
    pattern: 'core_dynamic',
    level: 5,
    nameEn: 'Chop and reverse lunge',
    nameUa: 'Тяга з випадом назад',
    coreGoal: 'AR',
    descriptionEn:
      'Standing, lunge + diagonal chop simultaneously.',
    descriptionUa:
      'Стоячи, випад + діагональна тяга одночасно.',
    equipment: ['resistance_bands'],
    bestFor: ['Hyp', 'S&P'],
    adaptationEn: 'Band instead of cable',
    adaptationUa: 'Еспандер замість кабелю',
  },
  {
    id: 'core_dyn_5_turkish_getup',
    pattern: 'core_dynamic',
    level: 5,
    nameEn: 'Turkish get-up',
    nameUa: 'Турецький підйом',
    coreGoal: 'ALF',
    descriptionEn:
      'Lying, stand up with dumbbell overhead, lie back down. Hardest core exercise.',
    descriptionUa:
      'Лежачи \u2192 встати з гантеллю вгорі \u2192 лягти. Найскладніша core.',
    equipment: ['dumbbells'],
    bestFor: ['Hyp III', 'S&P'],
    adaptationEn: 'Start without weight',
    adaptationUa: 'Почати без ваги',
  },
  {
    id: 'core_dyn_0_pallof_press',
    pattern: 'core_dynamic',
    level: 3,
    nameEn: 'Pallof press',
    nameUa: 'Pallof press стоячи',
    coreGoal: 'AR',
    descriptionEn:
      'Sideways, band at chest level. Extend arms, resist rotation.',
    descriptionUa:
      'Боком, еспандер на рівні грудей. Випрямити руки, опираючись ротації.',
    equipment: ['resistance_bands'],
    bestFor: ['Hyp', 'S&P'],
    adaptationEn: 'Variations: with step, with squat',
    adaptationUa: 'Варіації: з кроком, з присіданням',
  },

  // ============================================================
  // COMBINATION (5 exercises)
  // ============================================================
  {
    id: 'combo_1_reverse_lunge_press',
    pattern: 'combination',
    level: 1,
    nameEn: 'Reverse lunge + shoulder press',
    nameUa: 'Зворотній випад + жим вгору',
    descriptionEn:
      'Step back + press simultaneously.',
    descriptionUa:
      'Крок назад + жим одночасно.',
    equipment: ['dumbbells'],
    bestFor: ['BT I'],
    adaptationEn: 'Offset (one arm) for progression',
    adaptationUa: 'Offset (одна рука) для ускладнення',
  },
  {
    id: 'combo_2_rdl_row',
    pattern: 'combination',
    level: 2,
    nameEn: 'Romanian DL + row',
    nameUa: 'Румунська тяга + тяга в нахилі',
    descriptionEn:
      'Hinge down, row to belly, stand up.',
    descriptionUa:
      'Нахил \u2192 тяга до живота \u2192 випрямитись.',
    equipment: ['dumbbells'],
    bestFor: ['BT II-III'],
  },
  {
    id: 'combo_3_squat_press',
    pattern: 'combination',
    level: 3,
    nameEn: 'Squat and press (thruster)',
    nameUa: 'Присідання + жим (трастер)',
    descriptionEn:
      'Squat, stand up + press in one movement.',
    descriptionUa:
      'Присід \u2192 встати + жим одним рухом.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV', 'Hyp'],
    adaptationEn: 'Classic thruster',
    adaptationUa: 'Класичний thruster',
  },
  {
    id: 'combo_4_pushup_row',
    pattern: 'combination',
    level: 4,
    nameEn: 'Push-up + one-arm row',
    nameUa: 'Віджимання + тяга (renegade row)',
    descriptionEn:
      'Hands on dumbbells. Push-up, row one side, push-up, row other side.',
    descriptionUa:
      'Руки на гантелях. Віджатись \u2192 тяга однією \u2192 віджатись \u2192 тяга іншою.',
    equipment: ['dumbbells'],
    bestFor: ['BT IV', 'Hyp'],
    adaptationEn: 'Hex dumbbells are more stable',
    adaptationUa: 'Шестикутні гантелі стабільніші',
  },
  {
    id: 'combo_5_offset_squat_press',
    pattern: 'combination',
    level: 5,
    nameEn: 'Offset squat + 1-arm press',
    nameUa: 'Офсетний присід + жим однією',
    descriptionEn:
      'One dumbbell. Squat, then single-arm press. Max core loading.',
    descriptionUa:
      'Одна гантель. Присід \u2192 жим однією. Макс. навантаження на кор.',
    equipment: ['dumbbells'],
    bestFor: ['BT IV', 'Hyp', 'S&P'],
    adaptationEn: 'Hardest combo exercise',
    adaptationUa: 'Найскладніша комбо',
  },

  // ============================================================
  // POWER (6 exercises)
  // ============================================================
  {
    id: 'power_1_box_jump',
    pattern: 'power',
    level: 1,
    nameEn: 'Box jump',
    nameUa: 'Стрибок на тумбу',
    descriptionEn:
      'Two-foot jump. Soft landing. Step down.',
    descriptionUa:
      'Стрибок двома ногами. М\'яке приземлення. Крок вниз.',
    equipment: ['step_box'],
    bestFor: ['BT I'],
    adaptationEn: 'Height = progression',
    adaptationUa: 'Висота = прогресія',
  },
  {
    id: 'power_2_jump_squat',
    pattern: 'power',
    level: 2,
    nameEn: 'Jump squat',
    nameUa: 'Присідання з вистрибуванням',
    descriptionEn:
      'Squat down, explode up. Bodyweight or with light dumbbells.',
    descriptionUa:
      'Присісти \u2192 вибухнути вгору. BW або з легкими гантелями.',
    equipment: ['bodyweight'],
    bestFor: ['BT I-III (main power)'],
  },
  {
    id: 'power_3.1_kb_swing',
    pattern: 'power',
    level: 3.1,
    nameEn: 'KB/DB swing',
    nameUa: 'Махи гантеллю',
    descriptionEn:
      'Explosive hip extension. Arms just hold.',
    descriptionUa:
      'Вибухове розгинання стегон. Руки лише тримають.',
    equipment: ['dumbbells'],
    bestFor: ['BT II-III', 'metabolic'],
    adaptationEn: 'Dumbbell instead of kettlebell',
    adaptationUa: 'Гантель замість гирі',
  },
  {
    id: 'power_3.2_explosive_pushup',
    pattern: 'power',
    level: 3.2,
    nameEn: 'Explosive push-up',
    nameUa: 'Вибухові віджимання',
    descriptionEn:
      'Push up explosively, hands leave floor.',
    descriptionUa:
      'Віджатись вибухово, руки від підлоги.',
    equipment: ['bodyweight'],
    bestFor: ['BT III'],
    adaptationEn: 'From elevation for easier version',
    adaptationUa: 'З підвищення для спрощення',
  },
  {
    id: 'power_4_jump_shrug',
    pattern: 'power',
    level: 4,
    nameEn: 'Jump shrug',
    nameUa: 'Стрибок зі шрагами',
    descriptionEn:
      'Explosive extension + shrugs + jump.',
    descriptionUa:
      'Вибухове випрямлення + шраги + стрибок.',
    equipment: ['dumbbells'],
    bestFor: ['BT III-IV'],
    adaptationEn: 'Preparation for snatch',
    adaptationUa: 'Підготовка до snatch',
  },
  {
    id: 'power_5_db_snatch',
    pattern: 'power',
    level: 5,
    nameEn: 'DB single-arm snatch',
    nameUa: 'Ривок гантелі однією рукою',
    descriptionEn:
      'Explosive lift, catch overhead, extend arm.',
    descriptionUa:
      'Вибухове підняття \u2192 перехоп вгорі \u2192 випрямити над головою.',
    equipment: ['dumbbells'],
    bestFor: ['BT IV', 'S&P'],
    adaptationEn: 'Learn jump shrug first',
    adaptationUa: 'Вивчити jump shrug спочатку',
  },
];
