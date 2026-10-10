// The four Culinary Coach levels, shown on the "All Levels" page in both learning sites (same file in both).
// Each site decides which level is open for that learner. Locked levels show what they include (names only, no links),
// so a learner can see the value without reaching it. Written at a 7th-8th grade reading level.
window.CC_LEVELS = [
  { id: 'L1', num: 'Level 1', name: 'Culinary Systems Training', tag: 'Self-Paced · Online', tagClass: 'tag-async', icon: '🍳', iconClass: 'green',
    desc: 'Learn how a professional kitchen runs: work habits, food safety basics, costing, and the start of your own food business plan. You go at your own pace.',
    includes: ['4 weeks online, then business planning in Part 2', 'IBM SkillsBuild: Lifelong Professional Skills, Collaboration, Job Readiness', 'Your Concept Brief'] },
  { id: 'L2', num: 'Level 2', name: 'Culinary Entrepreneurship I', tag: 'Paid · In-Person Cohort', tagClass: 'tag-cohort', icon: '📋', iconClass: 'gold',
    desc: 'Four weeks with Chef Duane: kitchen readiness, costing and pricing, menus, and a Concept Brief for your own food business.',
    includes: ['Hands-on kitchen sessions with Chef Duane', 'ServSafe Food Handler credential', '11 IBM SkillsBuild courses: entrepreneurship, sales, marketing, operations, digital and AI skills', 'An IBM course where you build your own AI money tracker', 'IBM digital badges and a Culinary Coach certificate'] },
  { id: 'L3', num: 'Level 3', name: 'Frontline Supervisor Development', tag: 'Paid · Employer-Sponsored', tagClass: 'tag-employ', icon: '👥', iconClass: 'blue',
    desc: 'For working cooks and new supervisors: lead a team, talk clearly in a busy kitchen, and run a shift.',
    includes: ['Leading a team and running a shift', '8 IBM SkillsBuild courses, starting with Agile Explorer', 'Leadership, customer service, and data skills', 'An IBM SkillsBuild digital credential'] },
  { id: 'L4', num: 'Level 4', name: 'Culinary Entrepreneurship II', tag: 'Paid · In-Person Cohort', tagClass: 'tag-adv', icon: '🚀', iconClass: 'orange',
    desc: 'For Level 2 graduates: build your business plan and money projections, then pitch your business live.',
    includes: ['Business plan, financial projections, and a live pitch', 'ServSafe Food Manager credential', 'IBM SkillsBuild: all Level 2 courses plus Agile Explorer and Data Driven Decision Making', 'IBM digital badges and a Culinary Coach certificate'] },
];
