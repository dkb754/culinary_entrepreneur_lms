/* Part 2 — Business Planning (weeks 5–8 of the self-paced course). DATA ONLY: day outline, quiz ids and deliverables.
 * Lesson text lives in cst-l2-lessons-w5..w8.js, practice in activities-w5..w8.js, quizzes in cst-l2-quizzes-w5..w8.js.
 * Ids follow Part 1: w{week}d{day}; week 5 is shown to students as "Part 2 · Week 1". Every day has a quiz with the same id. */
LEVEL1.weeks.push(
  { n: 5, level: 'L2', title: 'Business Planning Foundations', side: 'Business Planning', sub: 'Your concept, your market, your structure and your plan outline', note: 'About 3 hours a day, 4 days. Pass every quiz in the week (70%+) to unlock the next week.' },
  { n: 6, level: 'L2', title: 'Financials', side: 'Financials', sub: 'Startup costs, pricing, break-even and cash flow', note: 'Finish the week by submitting your Business Plan.' },
  { n: 7, level: 'L2', title: 'Operations', side: 'Operations', sub: 'Production, suppliers, people, quality and safety systems', note: 'About 3 hours a day, 4 days.' },
  { n: 8, level: 'L2', title: 'Marketing, Pitch & Operating Plan', side: 'Marketing & Pitch', sub: 'Brand, marketing, sales, your pitch and your Operating Plan', note: 'Finish Part 2 by submitting your Operating Plan.' },
);

LEVEL1.days.push(
  // ---------------- LEVEL II · WEEK 1 (week 5) ----------------
  { id: 'w5d1', week: 5, module: 'Your Business Idea & Concept', layer: '', hours: '~3 hours',
    topics: ['What problem your food business solves and for whom', 'Writing a concept statement', 'What makes you different', 'Testing an idea cheaply before you spend money'], resources: [], quiz: 'w5d1' },
  { id: 'w5d2', week: 5, module: 'Market & Competition', layer: '', hours: '~3 hours',
    topics: ['Who your customers are and how many there might be', 'Researching competitors', 'Positioning: where you fit', 'Price position: budget, mid-range or premium'], resources: [], quiz: 'w5d2' },
  { id: 'w5d3', week: 5, module: 'Business Structure & Compliance Overview', layer: '', hours: '~3 hours',
    topics: ['Sole proprietor vs LLC in plain language', 'Permits, licenses and registrations: a checklist', 'Insurance basics', 'When to ask a professional'], resources: [], quiz: 'w5d3' },
  { id: 'w5d4', week: 5, module: 'The Business Plan Outline', layer: '', hours: '~3 hours',
    topics: ['What a business plan is for', 'The eight sections of your plan', 'Writing a one-page summary', 'Starting your Business Plan'], resources: [], quiz: 'w5d4' },

  // ---------------- LEVEL II · WEEK 2 (week 6) ----------------
  { id: 'w6d1', week: 6, module: 'Startup Costs & Funding', layer: '', hours: '~3 hours',
    topics: ['One-time costs vs ongoing costs', 'Building a startup cost list', 'Where startup money can come from', 'How much you need before you open'], resources: [], quiz: 'w6d1' },
  { id: 'w6d2', week: 6, module: 'Pricing, Margins & Break-Even', layer: '', hours: '~3 hours',
    topics: ['Fixed and variable costs', 'Margin per sale', 'Break-even point', 'Checking your prices against your costs'], resources: [], quiz: 'w6d2' },
  { id: 'w6d3', week: 6, module: 'Sales Forecasts & Cash Flow', layer: '', hours: '~3 hours',
    topics: ['A simple monthly sales forecast', 'Slow and busy seasons', 'Profit vs cash: why they are different', 'A 12-month cash plan'], resources: [], quiz: 'w6d3' },
  { id: 'w6d4', week: 6, module: 'Financial Review & Your Business Plan', layer: '', hours: '~3 hours',
    topics: ['Putting your numbers together', 'Sanity checks for a financial plan', 'Common money mistakes', 'Finishing and submitting your Business Plan'], resources: [], quiz: 'w6d4',
    file: { label: 'Business Plan', due: 'End of Part 2 Week 2', blurb: 'Your Business Plan: summary, concept, market, menu and pricing, marketing, operations, financial plan, and risks and next steps. Build the sections in this week’s lessons, download them, put them together in one document, and upload it here.' } },

  // ---------------- LEVEL II · WEEK 3 (week 7) ----------------
  { id: 'w7d1', week: 7, module: 'Production Systems & Capacity', layer: '', hours: '~3 hours',
    topics: ['Your production workflow from order to delivery', 'How much you can really make', 'Batching and prep schedules', 'Equipment and space'], resources: [], quiz: 'w7d1' },
  { id: 'w7d2', week: 7, module: 'Suppliers, Inventory & Waste', layer: '', hours: '~3 hours',
    topics: ['Choosing and managing suppliers', 'Ordering and par levels', 'Storing and rotating stock', 'Cutting waste'], resources: [], quiz: 'w7d2' },
  { id: 'w7d3', week: 7, module: 'People, Time & Quality', layer: '', hours: '~3 hours',
    topics: ['Roles, even when you are the only worker', 'Writing simple procedures and checklists', 'Keeping quality the same every time', 'Managing your time and your energy'], resources: [], quiz: 'w7d3' },
  { id: 'w7d4', week: 7, module: 'Safety, Compliance & Risk', layer: '', hours: '~3 hours',
    topics: ['A written food safety plan', 'Record keeping', 'Handling a customer complaint or a safety problem', 'Insurance and risk basics'], resources: [], quiz: 'w7d4' },

  // ---------------- LEVEL II · WEEK 4 (week 8) ----------------
  { id: 'w8d1', week: 8, module: 'Brand & Customer Story', layer: '', hours: '~3 hours',
    topics: ['What a brand is', 'Your name, look and voice', 'Telling your story', 'Consistency across everything customers see'], resources: [], quiz: 'w8d1' },
  { id: 'w8d2', week: 8, module: 'Marketing Channels & Launch Plan', layer: '', hours: '~3 hours',
    topics: ['Choosing channels that fit your customer', 'Low-cost marketing for a small food business', 'Planning a launch', 'Measuring what works'], resources: [], quiz: 'w8d2' },
  { id: 'w8d3', week: 8, module: 'Sales, Service & Growth', layer: '', hours: '~3 hours',
    topics: ['Selling face to face and online', 'Customer service and repeat customers', 'Reviews and feedback', 'Growing without losing quality'], resources: [], quiz: 'w8d3' },
  { id: 'w8d4', week: 8, module: 'Your Pitch & Operating Plan', layer: '', hours: '~3 hours',
    topics: ['A 60-second pitch', 'Answering common questions', 'Pulling your operations into one Operating Plan', 'Your first 90 days'], resources: [], quiz: 'w8d4',
    file: { label: 'Operating Plan', due: 'End of Part 2', blurb: 'Your Operating Plan: production workflow and capacity, suppliers and ordering, schedule and roles, quality checklists, food safety and compliance plan, and your launch plan with your first 90 days. Build it in this week’s lessons, download it, improve it, and upload it here.' } },
);
