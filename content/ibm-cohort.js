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
    // Pathway 3: Culinary Entrepreneurship (shown from Day 1 in this LMS)
    pathway3: [
      c('Be an Entrepreneur', 'activity/PLAN-531AD0928A0D', 'Learn what it takes to start a business and how to plan one that can work.'),
      c('Entrepreneur Mindset', 'channel/CNL_LCB_1591120143256', 'Build the habits and thinking that help business owners keep going.'),
      c('Project Management Fundamentals', 'activity/PLAN-B2DE5C927EEC', 'Learn to plan and organize the work it takes to open and run your business.'),
      c('How Smart Is Your Spending?', 'activity/ALM-COURSE_4082738',
        'This IBM course teaches you to use AI to track your money and spot financial risks before they become problems. You will build your own tool. It takes about an hour and you earn a digital badge when you finish.',
        { ai: true }),
      c('Sales Strategy', 'activity/PLAN-E395160BCA49', 'Learn how to find customers and help them say yes.'),
      c('Digital Marketing', 'activity/PLAN-967AE6EBC864', 'Learn how to get the word out about your food online.'),
      c('The Marketing Funnel', 'activity/ALM-COURSE_4074183', 'See the steps a customer takes from first hearing about you to buying.'),
      c('Operations Management', 'activity/URL-DF4DD5E8922A', 'Learn how the daily work of a business fits together: inputs, outputs, suppliers, and customers.'),
      c('Digital Literacy', 'activity/PLAN-6B6FDF811C80', 'Get comfortable with the digital tools every business uses.'),
      c('AI Literacy', 'activity/PLAN-1C903152880C', 'Learn what AI is and how it can help a small business.'),
      c('Excel Training', 'activity/URL-829FEB19E9BA', 'Learn spreadsheet skills for organizing and tracking your numbers.'),
    ],
    // Pathway 2: Frontline Supervisor Development (Agile Explorer is pinned first)
    pathway2: [
      c('Agile Explorer', 'activity/PLAN-716FDF294AB3', 'Learn Agile ways of working to improve teamwork and handle change. You earn an IBM SkillsBuild digital credential.', { pinned: true }),
      c('Leadership Skills', 'activity/PLAN-DA092DF5FEDD', 'Build decision-making, teamwork, and people-leadership skills.'),
      c('Customer Service', 'activity/PLAN-B8A361A0B47A', 'Practice communication, problem-solving, and good service in person and online.'),
      c('Project Management Fundamentals', 'activity/PLAN-B2DE5C927EEC', 'Plan and organize work, make decisions, and solve problems with your team.'),
      c('Excel Training', 'activity/URL-829FEB19E9BA', 'Organize, track, and study workplace numbers in a spreadsheet.'),
      c('Data Driven Decision Making', 'activity/ALM-COURSE_4058990', 'Use facts and numbers to make better choices at work.'),
      c('Data Literacy', 'activity/PLAN-6B6FDF811C80', 'Learn to read and question data so you can make smart choices.'),
      c('AI Literacy', 'activity/PLAN-1C903152880C', 'Learn what AI is and how it can help at work.'),
    ],
    // Culinary Entrepreneurship II: the same set, with two courses for the planning and money chapters
    level4Extra: [
      c('Agile Explorer', 'activity/PLAN-716FDF294AB3', 'Use Agile steps to plan how your business will run day to day.'),
      c('Data Driven Decision Making', 'activity/ALM-COURSE_4058990', 'Use numbers to build and check your financial projections.'),
    ],
  };
})();
