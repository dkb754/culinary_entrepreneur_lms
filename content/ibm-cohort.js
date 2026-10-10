// IBM SkillsBuild links supplied by CareerCircle for the cohort LMS. Every link carries the Culinary Coach tracking tags:
// keep the query string exactly as given, and never swap in a general IBM SkillsBuild address.
// tools/check-links.py lists the same links and checks them (HTTP 200 or 302 passes: SkillsBuild sends most links to its sign-in page).
// "why" lines are written at a 7th-8th grade reading level.
(function () {
  const Q = '?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach';
  const B = 'https://skills.yourlearning.ibm.com/';
  const c = (title, path, why, extra) => Object.assign({ title, url: B + path + Q, why }, extra || {});
  window.IBM_COHORT = {
    register: { title: 'Register for IBM SkillsBuild', url: B + Q },
    // Level 2: Culinary Entrepreneurship I. Each course sits under the week whose lessons it supports (`week`); Week 2 (ServSafe) has none.
    // The LMS shows them only inside those weekly modules, never as one big list.
    // Levels 3 and 4 are paid and locked: their IBM links are NOT shipped in this file until those levels can be unlocked.
    level2: [
      c('Be an Entrepreneur', 'activity/PLAN-531AD0928A0D', 'Learn what it takes to start a business and how to plan one that can work.', { week: 4 }),
      c('Entrepreneur Mindset', 'channel/CNL_LCB_1591120143256', 'Build the habits and thinking that help business owners keep going.', { week: 4 }),
      c('Project Management Fundamentals', 'activity/PLAN-B2DE5C927EEC', 'Learn to plan and organize the work it takes to open and run your business.', { week: 1 }),
      c('How Smart Is Your Spending?', 'activity/ALM-COURSE_4082738',
        'This IBM course teaches you to use AI to track your money and spot financial risks before they become problems. You will build your own tool. It takes about an hour and you earn a digital badge when you finish.', { ai: true, week: 3 }),
      c('Sales Strategy', 'activity/PLAN-E395160BCA49', 'Learn how to find customers and help them say yes.', { week: 3 }),
      c('Digital Marketing', 'activity/PLAN-967AE6EBC864', 'Learn how to get the word out about your food online.', { week: 4 }),
      c('The Marketing Funnel', 'activity/ALM-COURSE_4074183', 'See the steps a customer takes from first hearing about you to buying.', { week: 3 }),
      c('Operations Management', 'activity/URL-DF4DD5E8922A', 'Learn how the daily work of a business fits together: inputs, outputs, suppliers, and customers.', { week: 1 }),
      c('Digital Literacy', 'activity/PLAN-6B6FDF811C80', 'Get comfortable with the digital tools every business uses.', { week: 4 }),
      c('AI Literacy', 'activity/PLAN-1C903152880C', 'Learn what AI is and how it can help a small business.', { week: 4 }),
      c('Excel Training', 'activity/URL-829FEB19E9BA', 'Learn spreadsheet skills for organizing and tracking your numbers.', { week: 3 }),
    ],
  };
})();
