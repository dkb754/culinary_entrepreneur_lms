/* Culinary Systems Training — Self-Paced (cst-async). Level I (weeks 1–4) + Level II (weeks 5–8). DATA ONLY.
 * No dates, no labs: progress-based. Level II days/weeks are appended by content/cst-level2.js.
 *
 *   id        w{week}d{day}; weeks 1–4 are Level I, weeks 5–8 are Level II (week 5 = "Level II · Week 1").
 *   topics    short outline shown above the lesson text
 *   quiz      id of the quiz in QUIZ_BANK (level1-quizzes.js / cst-l2-quizzes-*.js), or null
 *   file      a student upload: { label, blurb, due }  (server: FILE_ASSIGNMENTS)
 *   resources outside links shown on the day (verified by CI: tools/check-links.py)
 */
const YT = id => 'https://www.youtube.com/watch?v=' + id;

const LEVEL1 = {
  title: 'Culinary Systems Training — Self-Paced',
  levels: [
    { id: 'L1', name: 'Level I', title: 'Level I · CST Module 1', weeks: [1, 2, 3, 4] },
    { id: 'L2', name: 'Level II', title: 'Level II · Business Planning', weeks: [5, 6, 7, 8] },
  ],
  weeks: [
    { n: 1, title: 'Kitchen Readiness & Systems', side: 'Kitchen Readiness & Systems', sub: 'Mise en place, knife skills, recipes, storage and kitchen communication', note: 'About 3 hours a day, 4 days. Pass every Week 1 quiz (70%+) to unlock Week 2.' },
    { n: 2, title: 'Food Safety', side: 'Food Safety', sub: 'Foodborne illness, hygiene, time and temperature, cleaning and sanitizing', note: 'About 3 hours a day, 4 days. Pass every Week 2 quiz to unlock Week 3.' },
    { n: 3, title: 'Costing, Pricing, Menu & Business Formats', side: 'Costing, Menu & Formats', sub: 'The numbers and the shape of a food business', note: 'About 3 hours a day, 4 days. Pass every Week 3 quiz to unlock Week 4.' },
    { n: 4, title: 'Permits, Food Safety Review & Capstone', side: 'Permits & Capstone', sub: 'Licensing, a final review and your Concept Brief', note: 'Finish Level I: pass both quizzes and submit your Concept Brief to unlock Level II.' },
  ],

  days: [
    // ---------------- WEEK 1 ----------------
    {
      id: 'w1d1', week: 1, module: 'CST M1: Mise en Place',
      layer: 'KRP Phase 1 — Honest Map', hours: '~3 hours',
      topics: ['What mise en place means', 'Workstation anatomy', 'The CST philosophy', 'Professional mindset'],
      resources: [
        { t: 'video', title: 'What Is Mise en Place and Why It Matters', meta: 'YouTube', url: YT('Hf4okUst6Cw') },
      ],
      quiz: 'w1d1',
    },
    {
      id: 'w1d2', week: 1, module: 'CST M1: Knife Skills & Ingredients',
      layer: 'KRP — see the job as it really is', hours: '~3 hours',
      topics: ['Knife safety and grip', 'Classic cuts: large, medium and small dice, julienne, chiffonade', 'The 25-ingredient library'],
      resources: [
        { t: 'video', title: 'Basic Knife Skills and Cuts', meta: 'YouTube', url: YT('VJNA4vrdWec') },
        { t: 'video', title: 'The Claw Grip', meta: 'YouTube', url: YT('Uv7td6UxBXQ') },
      ],
      quiz: 'w1d2',
    },
    {
      id: 'w1d3', week: 1, module: 'CST M1: Recipe Execution & Storage',
      layer: 'KRP — keep your head clear', hours: '~3 hours',
      topics: ['Standardized recipe format', 'Unit conversion and yield', 'FIFO, labeling and temperature control', 'Cross-contamination'],
      resources: [
        { t: 'video', title: 'First-In First-Out Rotation and Labeling', meta: 'YouTube', url: YT('mMN5QKiqZf4') },
        { t: 'video', title: '5 Tips for Storing Food in a Walk-In Cooler', meta: 'YouTube', url: YT('ejh_G6-_pSM') },
      ],
      quiz: 'w1d3',
    },
    {
      id: 'w1d4', week: 1, module: 'CST M1: Production & Team Communication',
      layer: 'KRP — who you are at work', hours: '~3 hours',
      topics: ['Prep lists', 'Production timelines', 'Kitchen calls and acknowledgments', 'Line communication standards'],
      resources: [
        { t: 'video', title: '10 Phrases Used in Every Kitchen', meta: 'YouTube', url: YT('8lrZdejfe58') },
        { t: 'video', title: 'Why Chefs Say "Heard"', meta: 'YouTube', url: YT('vZGXDqrfsdA') },
      ],
      quiz: 'w1d4',
      file: {
        label: 'Honest Map', due: 'End of Week 1', krp: 'KRP Deliverable 1',
        blurb: 'Your Honest Map: an accurate picture of what working in food really involves and where you stand today. Build it in the Day 1 lesson (Part 3: The Honest Map), download your file there, improve it, and upload it here.',
      },
    },

    // ---------------- WEEK 2 ----------------
    {
      id: 'w2d1', week: 2, module: 'Food Safety: Foodborne Illness & Contamination',
      layer: 'KRP Phase 2 — Know Your Warning Signs', hours: '~3 hours',
      topics: ['Causes of foodborne illness', 'FAT TOM', 'Biological, chemical and physical hazards', 'High-risk populations'],
      resources: [
        { t: 'video', title: 'What Is FAT TOM?', meta: 'YouTube', url: YT('fdLeMQ0HqbM') },
        { t: 'video', title: 'Why Food Hygiene and Safety Matter', meta: 'YouTube', url: YT('DbXN_KMr0-A') },
      ],
      quiz: 'w2d1',
    },
    {
      id: 'w2d2', week: 2, module: 'Food Safety: Personal Hygiene & Handwashing',
      layer: '', hours: '~3 hours',
      topics: ['Handwashing steps and when to wash', 'Gloves', 'Illness reporting', 'Bare-hand contact policy'],
      resources: [
        { t: 'video', title: 'Handwashing for Food Safety Explained', meta: 'YouTube', url: YT('sSl2BkpG-vk') },
        { t: 'video', title: 'Proper Hygiene for Food Handlers', meta: 'YouTube', url: YT('toT5NBLrfJ4') },
      ],
      quiz: 'w2d2',
    },
    {
      id: 'w2d3', week: 2, module: 'Food Safety: Time-Temperature Control & Receiving',
      layer: '', hours: '~3 hours',
      topics: ['The danger zone (41–135°F)', 'Safe cooking temperatures', 'Cooling and reheating', 'Receiving inspections and rejection criteria'],
      resources: [
        { t: 'video', title: 'The Temperature Danger Zone', meta: 'YouTube', url: YT('_dxfPSdf8NE') },
        { t: 'video', title: 'Cooling Foods Quickly and Safely', meta: 'YouTube', url: YT('LTOBcoPJMxs') },
      ],
      quiz: 'w2d3',
      file: {
        label: 'Professional Identity Statement', due: 'End of Week 2', krp: 'KRP Deliverable 2',
        blurb: 'Your Professional Identity Statement: who you are as a food professional and what you are building toward. Use the prompts in the lessons to shape it.',
      },
    },
    {
      id: 'w2d4', week: 2, module: 'Food Safety: Cleaning, Sanitizing & Facilities',
      layer: '', hours: '~3 hours',
      topics: ['Cleaning vs sanitizing', 'Chemical concentrations', 'Cloth storage and dishwashing', 'Pest prevention', 'Facilities requirements'],
      resources: [
        { t: 'video', title: 'Washing and Sanitizing with a 3-Compartment Sink', meta: 'YouTube', url: YT('LfRME4l-vas') },
        { t: 'video', title: 'How to Use Sanitizer Test Strips', meta: 'YouTube', url: YT('tRutVebb54M') },
      ],
      quiz: 'w2d4',
    },

    // ---------------- WEEK 3 ----------------
    {
      id: 'w3d1', week: 3, module: 'Costing & Pricing Basics',
      layer: 'KRP Phase 2 — Change How You See Pressure', hours: '~3 hours',
      topics: ['Food cost percentage', 'Recipe costing', 'EP vs AP', 'Plate cost', 'Pricing for profit', 'Break-even intro'],
      resources: [
        { t: 'read', title: 'Calculating Food Cost Percentage', meta: 'RestaurantOwner.com', url: 'https://www.restaurantowner.com/public/4753.cfm' },
        { t: 'video', title: 'How to Price Menu Items', meta: 'YouTube', url: YT('EmOziopNT0w') },
      ],
      menuExample: true,
      quiz: 'w3d1',
    },
    {
      id: 'w3d2', week: 3, module: 'Menu Fundamentals',
      layer: '', hours: '~3 hours',
      topics: ['Menu engineering basics', 'Consistency and production capacity', 'Pricing strategy', 'What sells vs what costs'],
      resources: [
        { t: 'video', title: 'Menu Psychology and Profitability', meta: 'YouTube', url: YT('Hb35UVBddOI') },
      ],
      quiz: 'w3d2',
    },
    {
      id: 'w3d3', week: 3, module: 'Food Business Formats',
      layer: 'KRP — Build Your People', hours: '~3 hours',
      topics: ['Booth, pop-up, cottage food, catering and food truck: what each one takes', 'Pros and cons', 'Capital requirements'],
      resources: [
        { t: 'video', title: 'Starting a Cottage Food Business from Home', meta: 'YouTube', url: YT('c2aXLbaWeGg') },
        { t: 'video', title: 'Selling at Farmers Markets and Pop-Ups', meta: 'YouTube', url: YT('K432TTp7LqM') },
        { t: 'read', title: 'Virginia Home Kitchen (Cottage Food) Exemptions FAQ', meta: 'VDACS (PDF)', url: 'https://www.vdacs.virginia.gov/pdf/kitchenbillfaq.pdf' },
        { t: 'link', title: 'Find a Shared Commercial Kitchen', meta: 'The Kitchen Door', url: 'https://www.thekitchendoor.com/' },
      ],
      quiz: 'w3d3',
    },
    {
      id: 'w3d4', week: 3, module: 'Sourcing, Vendors & Customers',
      layer: '', hours: '~3 hours',
      topics: ['Where product comes from', 'Supplier relationships', 'Cost negotiation basics', 'Customer identification', 'Reading demand'],
      resources: [
        { t: 'video', title: 'Negotiating Best Vendor Pricing', meta: 'YouTube', url: YT('9KYzVWwOZFo') },
        { t: 'video', title: 'How to Find Your Target Customer', meta: 'YouTube', url: YT('6RXnRSm0xJY') },
        { t: 'link', title: 'USDA Local Food Directories', meta: 'USDA.gov', url: 'https://www.ams.usda.gov/services/local-regional/food-directories' },
        { t: 'read', title: 'Market Research and Competitive Analysis', meta: 'SBA.gov', url: 'https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis' },
      ],
      quiz: 'w3d4',
      file: {
        label: 'Recipe Cost Sheet', due: 'End of Week 3',
        blurb: 'Cost one of your recipes. Use the food-cost formula from this week: (Cost of Ingredients ÷ Sale Price) × 100.',
      },
    },

    // ---------------- WEEK 4 ----------------
    {
      id: 'w4d1', week: 4, module: 'Permits & Licensing — Intro',
      layer: 'KRP Phase 2 — Recharge So You Can Keep Going', hours: '~3 hours',
      topics: ['Virginia food handler permit', 'Home-based and cottage food law', 'Health department inspection basics', 'VDACS requirements'],
      resources: [
        { t: 'read', title: 'Applying for a Food Permit (Virginia Department of Health)', meta: 'VDH', url: 'https://www.vdh.virginia.gov/environmental-health/food-safety-in-virginia/foodapplication/' },
        { t: 'read', title: 'Applying for Licenses and Permits', meta: 'SBA.gov', url: 'https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits' },
        { t: 'video', title: 'Food Establishment Inspection', meta: 'YouTube', url: YT('02aZKqvn8tE') },
      ],
      quiz: 'w4d1',
    },
    {
      id: 'w4d2', week: 4, module: 'Food Safety Final Review',
      layer: '', hours: '~3 hours',
      topics: ['Review of the food safety domains', 'Temperature control, hygiene, cleaning and facilities', 'A study plan for the final quiz'],
      resources: [
        { t: 'video', title: 'Food Handler Practice Questions', meta: 'YouTube', url: YT('-6TvLFNQyZw') },
      ],
      quiz: 'w4d2',
    },
    {
      id: 'w4d3', week: 4, module: 'Capstone — Your Concept Brief',
      layer: 'KRP — KRP Portfolio Review', hours: '~3 hours',
      topics: ['Concept Brief template walkthrough', 'Business name, product or service, format, customer, pricing and next step'],
      resources: [],
      quiz: null,
      file: {
        label: 'Concept Brief', due: 'End of Week 4', krp: 'Level I capstone',
        blurb: 'Your Concept Brief: business name, product or service, format, customer, pricing and your next step. Build it in the Capstone lesson, download it, improve it, and upload it here. Submitting it (with every Level I quiz passed) unlocks Level II.',
      },
    },
    {
      id: 'w4d4', week: 4, module: 'KRP Portfolio & 90-Day Plan',
      layer: 'KRP Phase 3 — Post-Placement Prep', hours: '~3 hours',
      topics: ['What the first 30–90 days actually look like', 'KRP toolkit review', '90-day check-in intro'],
      resources: [],
      quiz: null,
      file: {
        label: 'KRP Portfolio', due: 'End of Week 4', krp: 'Complete portfolio',
        blurb: 'Your complete KRP Portfolio: every KRP deliverable together (Honest Map, Professional Identity Statement and your reflections on the four KRP skills).',
      },
    },
  ],

  // KRP skill clusters (Phase 2) — embedded in the weekly modules
  krp: {
    // The four Phase 2 skills, in plain language (student-facing)
    skills: [
      { name: 'Know Your Warning Signs', when: 'Level I · Week 2', day: 'w2d1', desc: 'Learn to spot when stress is building before it takes you out. You’ll identify your own signals — physical, mental, and emotional — so you can catch problems early.' },
      { name: 'Change How You See Pressure', when: 'Level I · Week 3', day: 'w3d1', desc: 'Hard moments in the kitchen are part of the job, not a sign you don’t belong. This skill teaches you to reframe high-pressure situations as performance conditions you can handle.' },
      { name: 'Build Your People', when: 'Level I · Week 3', day: 'w3d3', desc: 'No successful food business runs alone. You’ll identify the people in your corner — mentors, peers, customers — and learn how to lean on that network when things get tough.' },
      { name: 'Recharge So You Can Keep Going', when: 'Level I · Week 4', day: 'w4d1', desc: 'Burnout is real in this industry. This skill is about knowing how to recover between shifts and seasons so you stay in the game long-term.' },
    ],
    phases: [
      { n: 1, name: 'Conceptualization', weeks: 'Level I · Weeks 1–2', focus: 'Build accurate expectations and a professional identity.', out: 'Honest Map (Week 1) · Professional Identity Statement (Week 2)' },
      { n: 2, name: 'Skill Acquisition', weeks: 'Level I · Weeks 3–4', focus: 'Four skills for handling pressure, taught alongside your food training.', out: 'Know Your Warning Signs (Week 2) · Change How You See Pressure (Week 3) · Build Your People (Week 3) · Recharge So You Can Keep Going (Week 4)' },
      { n: 3, name: 'Application', weeks: 'Level I · Week 4 and after', focus: 'Your 90-day plan and first-shift preparation.', out: 'KRP Portfolio · a 90-day check-in email after you pass the Level I final quiz' },
    ],
    items: [
      { key: 'honest_map', label: 'Honest Map', day: 'w1d4', due: 'End of Week 1' },
      { key: 'identity_statement', label: 'Professional Identity Statement', day: 'w2d3', due: 'End of Week 2' },
      { key: 'portfolio', label: 'KRP Portfolio', day: 'w4d4', due: 'End of Week 4' },
    ],
  },
};
