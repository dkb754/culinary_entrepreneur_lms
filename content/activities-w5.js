/* Part 2 · Week 1 (w5d1 to w5d4): concept, market, structure and the plan outline. DRAFT. */
ACTIVITIES.w5d1 = {
  p1: [
    {
      type: 'choice', title: 'Problem, customer, solution',
      items: [
        { q: 'Which is the clearest description of a customer?', opts: ['Busy parents who work near the school', 'Everybody who eats', 'People with money', 'Anyone who walks by'], ans: 0, why: '"Everybody" is not a customer. A clear group with a clear need is.' },
        { q: 'A new owner says, "I make great barbecue, so I will open a barbecue business." What is the better next question?', opts: ['Who will pay for my barbecue, and why will they pick me?', 'How many smokers can I buy?', 'What color should the sign be?', 'Which competitor can I copy?'], ans: 0, why: 'Start with the person, not the recipe. Food that a clear group will buy again and again is a business.' },
        { q: 'In the lesson, the solution is:', opts: ['What you sell to fix the customer\'s problem', 'The problem the customer has', 'The place you rent', 'The price of the food'], ans: 0, why: 'The solution is your food, your service, or both, aimed at the problem.' },
      ],
    },
    {
      type: 'match', title: 'Match the word to its meaning',
      options: ['Something customers want and cannot easily get', 'A specific kind of person with that problem', 'What you sell to fix the problem'],
      rows: [{ label: 'Problem', ans: 0 }, { label: 'Customer', ans: 1 }, { label: 'Solution', ans: 2 }],
      why: 'The problem is the unmet want, the customer is the specific person who has it, and the solution is what you sell.',
    },
  ],
  p2: [
    {
      type: 'match', title: 'The four questions of a concept statement',
      intro: 'Match each question to what it asks.',
      options: ['Burgers, hand pies, meal boxes', 'Busy parents near the school', 'Food truck, online orders, market stall', 'Fresh, fast, family recipe'],
      rows: [{ label: 'What do you sell?', ans: 0 }, { label: 'Who do you sell to?', ans: 1 }, { label: 'How do you sell it?', ans: 2 }, { label: 'Why will they choose you?', ans: 3 }],
      why: 'A concept statement answers what, who, how and why in two or three sentences.',
    },
    {
      type: 'choice', title: 'Is it a strong concept statement?',
      items: [
        { q: 'Which concept statement is the strongest?', opts: ['We make ready-to-heat family dinners for busy parents. Orders are online and pickup is on Friday.', 'We sell food to everyone at great prices.', 'Our restaurant is the best in town.', 'We are passionate about quality and excellence.'], ans: 0, why: 'It names what, who and how in plain words. The others are vague.' },
        { q: 'How long should a concept statement be?', opts: ['Two or three sentences', 'Ten pages', 'One word', 'As long as your menu'], ans: 0, why: 'A short statement is easier to remember and repeat.' },
        { q: 'You finish your first version. What should you do next?', opts: ['Cut every word that is not needed', 'Add more big words', 'Never change it again', 'Hide it until you open'], ans: 0, why: 'Write fast, then trim. Rewriting many times as you learn is normal.' },
      ],
    },
  ],
  p3: [
    {
      type: 'choice', title: 'Real differences and weak claims',
      items: [
        { q: 'Which is a real point of difference?', opts: ['Allergy-aware desserts made with care', 'Good food', 'Great service', 'We try hard'], ans: 0, why: 'Customers can notice and care about a special need. "Good food" is what every business says.' },
        { q: 'Why is "cheapest" a risky difference for a small business?', opts: ['Large companies can almost always buy ingredients for less', 'Customers never like low prices', 'It is against the rules', 'It means you cannot have a menu'], ans: 0, why: 'Bigger buyers get lower costs, so a small business usually cannot win on price alone.' },
        { q: 'How many differences should you pick?', opts: ['One or two that you can keep up every day', 'As many as possible', 'None', 'Ten, to be safe'], ans: 0, why: 'A difference you cannot deliver is worse than none.' },
      ],
    },
    {
      type: 'reflect', title: 'Find your point of difference',
      intro: 'Think about the food business you are planning.',
      prompts: [
        { key: 'difference', label: 'What is one thing that sets your business apart, and why would a customer care?', help: 'Pick something a customer can notice.', minWords: 12, rows: 4,
          keywords: [{ match: 'because|customer|people|they', tip: 'why the customer would care' }, { match: 'fast|fresh|family|allerg|style|story|quality|convenien|vegan|gluten', tip: 'a real difference such as speed, story, quality or special needs' }] },
        { key: 'keepup', label: 'How will you keep this difference up every single day?', help: 'Say what you will do.', minWords: 10, rows: 3,
          keywords: [{ match: 'every|daily|always|each', tip: 'how often' }] },
      ],
      model: 'My difference is allergy-aware baking, because many families near me cannot find safe birthday cakes. Customers care since a safe cake lets their child join the party. I will keep it up every day by using separate tools, reading every label and keeping a written ingredient list for each recipe.',
    },
  ],
  p4: [
    {
      type: 'order', title: 'Run a cheap test',
      intro: 'First step at the top.',
      steps: ['Decide what a good result looks like', 'Run a small test such as a taste test or pre-order', 'Write down what you learn, including bad news', 'Change the idea if the test shows a problem', 'Test again before spending a lot of money'],
      why: 'Set the goal first, test small, record the results honestly, adjust, and retest.',
    },
    {
      type: 'choice', title: 'Which signal is stronger?',
      items: [
        { q: 'Which is the strongest sign that people want your food?', opts: ['Someone pays for a pre-order', 'A friend says it sounds nice', 'A neighbor smiles at you', 'You like the recipe'], ans: 0, why: 'Someone who pays is a stronger signal than someone who says "sounds nice."' },
        { q: 'How long should a short survey be?', opts: ['Three or four questions', 'Twenty questions', 'One hundred questions', 'It should not have questions'], ans: 0, why: 'Short surveys get answered. Long ones get skipped.' },
        { q: 'A test fails. What does the lesson say?', opts: ['It has saved you a lot of money', 'You should quit food', 'You should hide the results', 'You should spend more on the same idea'], ans: 0, why: 'A cheap failed test costs little and teaches a lot.' },
      ],
    },
  ],
};

ACTIVITIES.w5d2 = {
  p1: [
    {
      type: 'fill', title: 'Estimate the market',
      intro: 'These are example numbers from the lesson. Type the answer.',
      rows: [{ label: 'People who work nearby: 5,000. About 1 in 10 might buy. Possible customers:', unit: 'people', ans: 500 }, { label: 'If 1 in 5 of the 5,000 might buy, possible customers:', unit: 'people', ans: 1000 }],
      why: '5,000 divided by 10 is 500, and 5,000 divided by 5 is 1,000. These are rough guesses and should be labeled estimates.',
    },
    {
      type: 'choice', title: 'Describing your customer',
      items: [
        { q: 'Which is a detail about where your customers are?', opts: ['The office buildings within a ten-minute walk', 'They like spicy food', 'They are 30 years old', 'They pay with cards'], ans: 0, why: 'Where means a neighborhood, school, office or website.' },
        { q: 'Which is a good free source for local numbers?', opts: ['Your library, city or county website, or sba.gov', 'A rumor from a friend', 'One number you cannot explain', 'A guess'], ans: 0, why: 'Use free official sources and never trust a number you cannot explain.' },
        { q: 'What is "market size"?', opts: ['A rough count of how many possible customers are near you', 'The size of your kitchen', 'The size of your menu', 'How much money you owe'], ans: 0, why: 'Market size estimates how many people might buy.' },
      ],
    },
  ],
  p2: [
    {
      type: 'match', title: 'Direct or indirect competitor?',
      intro: 'You sell tacos from a truck. Match each one.',
      options: ['Direct competitor', 'Indirect competitor'],
      rows: [{ label: 'Another taco truck', ans: 0 }, { label: 'A grocery store deli', ans: 1 }, { label: 'A frozen meal', ans: 1 }, { label: 'A taco stand across the street', ans: 0 }],
      why: 'Direct competitors sell nearly the same thing. Indirect competitors solve the same problem in a different way.',
    },
    {
      type: 'choice', title: 'Reading competitors',
      items: [
        { q: 'Many reviews of a nearby place say "long wait." What might this be?', opts: ['A gap you might fill', 'A reason to copy them', 'A rule to follow', 'Nothing useful'], ans: 0, why: 'Complaints show where customers are unhappy and where there is open space.' },
        { q: 'How many competitors should you study?', opts: ['Three to five', 'Exactly one', 'Every business in the country', 'None'], ans: 0, why: 'Three to five gives a clear picture without taking forever.' },
        { q: 'A market with no competitors usually means:', opts: ['There may be no demand', 'You will get rich', 'You need no plan', 'Prices should be very high'], ans: 0, why: 'Competitors often show that people do buy this kind of food.' },
      ],
    },
  ],
  p3: [
    {
      type: 'order', title: 'Build a positioning map',
      intro: 'First step at the top.',
      steps: ['Draw a cross on a page', 'Label the two lines, such as price and style', 'Put each competitor on the map as a dot', 'Add your own dot', 'Check whether your dot sits in a crowded corner or an open area'],
      why: 'Draw the cross, label it, add competitors, add yourself, then see how crowded your spot is.',
    },
    {
      type: 'choice', title: 'Positioning basics',
      items: [
        { q: 'What does positioning mean?', opts: ['The place your business holds in the customer\'s mind compared with others', 'Where you park your truck', 'The order of items on a menu', 'Your kitchen layout'], ans: 0, why: 'Positioning is how customers think of you compared with the others.' },
        { q: 'Your dot sits in a very crowded corner of the map. What does that mean?', opts: ['You will have to fight hard', 'You will win easily', 'You should raise prices', 'The map is wrong'], ans: 0, why: 'A crowded corner means lots of similar choices for customers.' },
        { q: 'What must be true about your positioning?', opts: ['What you say must match what you serve', 'It must use big words', 'It must copy a competitor', 'It must stay secret'], ans: 0, why: 'Customers notice quickly when words and food do not match.' },
      ],
    },
  ],
  p4: [
    {
      type: 'match', title: 'Match the price position',
      options: ['Budget', 'Mid-range', 'Premium'],
      rows: [{ label: 'Prices close to the average; quality and convenience carry you', ans: 1 }, { label: 'Lower prices; you need many sales and tight cost control', ans: 0 }, { label: 'Higher prices; you must give something clearly special', ans: 2 }],
      why: 'Budget needs volume, mid-range relies on quality and convenience, and premium must offer something clearly special.',
    },
    {
      type: 'reflect', title: 'Choose your price position',
      intro: 'Use example thinking only. Real prices come after you know your costs.',
      prompts: [
        { key: 'position', label: 'Will you be budget, mid-range or premium, and why does that fit your customer?', help: 'Name one level and give a reason.', minWords: 12, rows: 4,
          keywords: [{ match: 'budget|mid|premium', tip: 'name your price level' }, { match: 'because|customer|fit', tip: 'a reason tied to your customer' }] },
        { key: 'cover', label: 'What must your prices cover besides what customers will pay?', help: 'Think about costs.', minWords: 8, rows: 3,
          keywords: [{ match: 'cost|expense', tip: 'costs' }, { match: 'left over|profit|extra', tip: 'something left over' }] },
      ],
      model: 'I will be mid-range because my customers are office workers who want a fresh lunch but have limited time and budget. My prices must cover all my costs and still leave something left over, which I will work out in the financial lessons.',
    },
  ],
};

ACTIVITIES.w5d3 = {
  p1: [
    {
      type: 'match', title: 'Sole proprietor or LLC?',
      options: ['Sole proprietorship', 'LLC'],
      rows: [{ label: 'You and the business are treated as one', ans: 0 }, { label: 'The business is its own separate entity registered with your state', ans: 1 }, { label: 'Usually simplest and cheapest to start', ans: 0 }, { label: 'Can keep your personal belongings more separate from business trouble', ans: 1 }],
      why: 'A sole proprietorship is simple but personal. An LLC is separate and registered with the state, with more paperwork.',
    },
    {
      type: 'choice', title: 'Structure sense',
      items: [
        { q: 'Does an LLC protect you from your own mistakes?', opts: ['No, it is not magic protection', 'Yes, always', 'Only in winter', 'Yes, if you pay extra'], ans: 0, why: 'You also still need to keep business and personal money separate.' },
        { q: 'Where should you check the rules and costs for your structure?', opts: ['Your state business office, the SBA, or an accountant or attorney', 'A friend\'s advice only', 'A guess', 'Social media'], ans: 0, why: 'Rules, costs and taxes differ by state, so ask the official sources.' },
        { q: 'What is the main downside of a sole proprietorship?', opts: ['You are personally responsible for business debts and legal problems', 'It costs too much', 'It cannot sell food', 'It needs a state license every day'], ans: 0, why: 'Your own money and property could be at risk.' },
      ],
    },
  ],
  p2: [
    {
      type: 'match', title: 'Registration, license or permit?',
      options: ['Registration', 'License', 'Permit'],
      rows: [{ label: 'Telling the government your business exists', ans: 0 }, { label: 'Official permission to run a type of business', ans: 1 }, { label: 'Official permission for a specific activity or place', ans: 2 }],
      why: 'Registration tells, a license allows a type of business, and a permit allows a specific activity or place.',
    },
    {
      type: 'order', title: 'First steps on permits',
      intro: 'First step at the top.',
      steps: ['Call or visit your local county health department', 'Ask what you need to sell your food, and in what order', 'Write down who you talked to, the date and what they said', 'Make a checklist of the approvals you need', 'Add the list to your business plan'],
      why: 'Start with the official office, record the answers, then turn them into a checklist for your plan.',
    },
    {
      type: 'choice', title: 'Permit checklist',
      items: [
        { q: 'What is zoning?', opts: ['The city rule about what kind of business can operate in which area', 'A kind of oven', 'A tax form', 'A food handler card'], ans: 0, why: 'Zoning decides where a business may operate.' },
        { q: 'Who should you trust for current rules?', opts: ['The official office', 'A friend\'s story', 'An old rumor', 'A guess'], ans: 0, why: 'Rules change, so rely on the official office.' },
      ],
    },
  ],
  p3: [
    {
      type: 'match', title: 'Match the insurance',
      options: ['General liability', 'Property insurance', 'Commercial auto', 'Workers\' compensation'],
      rows: [{ label: 'Helps if a customer says they were hurt or got sick because of your business', ans: 0 }, { label: 'Covers your equipment and supplies from fire or theft', ans: 1 }, { label: 'For a food truck or delivery van used in the business', ans: 2 }, { label: 'For employees who are hurt on the job', ans: 3 }],
      why: 'Each type covers a different risk.',
    },
    {
      type: 'choice', title: 'Insurance basics',
      items: [
        { q: 'How should you shop for insurance?', opts: ['Talk to a licensed agent and get quotes from more than one', 'Buy the first one you see', 'Skip it', 'Ask a stranger online'], ans: 0, why: 'Compare quotes and ask for plain-language explanations.' },
        { q: 'Why might a market or landlord ask about insurance?', opts: ['They may want proof of insurance before letting you in', 'They want to sell you some', 'It is a fun question', 'They need your recipes'], ans: 0, why: 'Some markets, events and landlords require proof.' },
        { q: 'Where does the cost of insurance go in your planning?', opts: ['Into your startup budget', 'Nowhere', 'Only on your menu', 'Into your concept statement'], ans: 0, why: 'It is a real cost, so plan for it.' },
      ],
    },
  ],
  p4: [
    {
      type: 'match', title: 'Who do you ask?',
      options: ['Accountant', 'Attorney', 'Insurance agent', 'Health permit office'],
      rows: [{ label: 'Tax questions and record keeping', ans: 0 }, { label: 'Contracts, leases and trademarks', ans: 1 }, { label: 'Matching coverage to your risks', ans: 2 }, { label: 'Food rules before you open', ans: 3 }],
      why: 'Each professional covers a different kind of question.',
    },
    {
      type: 'reflect', title: 'Prepare to ask for help',
      intro: 'Plan your first call to a professional or permit office.',
      prompts: [
        { key: 'whom', label: 'Who will you ask first, and what is the question?', help: 'Name the office or person and one question.', minWords: 12, rows: 3,
          keywords: [{ match: 'health|accountant|attorney|insurance|SBA|county|state', tip: 'name who you will ask' }, { match: 'what|how|need|\\?', tip: 'a real question' }] },
        { key: 'bring', label: 'What will you bring or write down before you call?', help: 'Think about preparation.', minWords: 8, rows: 3,
          keywords: [{ match: 'concept|list|notes|questions', tip: 'your concept, notes or a list of questions' }] },
      ],
      model: 'I will call my county health department first and ask what I need to sell hand pies at a market, and in what order. Before I call I will bring my concept statement and a written list of questions, and I will write down the name, date and answers.',
    },
  ],
};

ACTIVITIES.w5d4 = {
  p1: [
    {
      type: 'choice', title: 'What is a plan for?',
      items: [
        { q: 'Which is one of the three main jobs of a business plan?', opts: ['It helps you think and turn a loose idea into clear decisions', 'It guarantees success', 'It replaces permits', 'It is only for banks'], ans: 0, why: 'A plan helps you think, helps you decide, and helps you ask others for support.' },
        { q: 'If the numbers do not work on paper, what can you do?', opts: ['Fix the idea before you spend real money', 'Ignore it', 'Open anyway', 'Hide the numbers'], ans: 0, why: 'Finding problems on paper is cheaper than finding them after you open.' },
        { q: 'Is a business plan a promise?', opts: ['No, it holds guesses and should be updated as you learn', 'Yes, it can never change', 'Yes, to the government', 'It is a school paper'], ans: 0, why: 'A plan is a living document.' },
      ],
    },
    {
      type: 'fill', title: 'How long should a plan be?',
      intro: 'From the lesson: a clear plan is better than a huge one.',
      rows: [{ label: 'Shortest length of a clear plan', unit: 'pages', ans: 10 }, { label: 'Longest length of a clear plan', unit: 'pages', ans: 20 }],
      why: 'A clear plan of ten to twenty pages is better than a huge one nobody reads.',
    },
  ],
  p2: [
    {
      type: 'order', title: 'The eight sections in order',
      intro: 'First section at the top.',
      steps: ['Summary', 'Concept', 'Market', 'Menu and pricing', 'Marketing', 'Operations', 'Financial plan', 'Risks and next steps'],
      why: 'The plan runs from summary, concept, market, menu and pricing, marketing, operations and financial plan to risks and next steps.',
    },
    {
      type: 'match', title: 'Match the section to what it covers',
      options: ['Customers, competitors and position', 'Startup costs and sales estimates', 'What could go wrong and what you will do next', 'How the work gets done day to day'],
      rows: [{ label: 'Market', ans: 0 }, { label: 'Financial plan', ans: 1 }, { label: 'Risks and next steps', ans: 2 }, { label: 'Operations', ans: 3 }],
      why: 'Each section has its own job.',
    },
  ],
  p3: [
    {
      type: 'choice', title: 'Writing the summary',
      items: [
        { q: 'How long should the summary be?', opts: ['One page', 'Ten pages', 'One word', 'It has no limit'], ans: 0, why: 'Many readers decide from this page whether to read on.' },
        { q: 'When do you write the summary?', opts: ['Last, though it goes first in the plan', 'Never', 'Before you have any ideas', 'Only after you open'], ans: 0, why: 'The summary depends on everything else, so rewrite it when the plan is finished.' },
        { q: 'Which sentence belongs in a good summary?', opts: ['Three of the five nearby places have no vegetarian lunch option.', 'We are the best in the world.', 'Our food is amazing.', 'Everyone will love us.'], ans: 0, why: 'Use real facts from research, not hype.' },
        { q: 'A friend reads your summary and cannot explain your business. What do you do?', opts: ['Rewrite it', 'Blame the friend', 'Make it longer', 'Leave it'], ans: 0, why: 'If a reader cannot repeat it back, it is not clear yet.' },
      ],
    },
    {
      type: 'reflect', title: 'Draft your summary opening',
      intro: 'Write the first three sentences of your one-page summary.',
      prompts: [
        { key: 'what', label: 'What is your business and who is it for?', help: 'Use your concept statement.', minWords: 12, rows: 3,
          keywords: [{ match: 'for|customers|serve', tip: 'who it is for' }] },
        { key: 'diff', label: 'What makes you different, and what is one fact from your research?', help: 'Use a real fact or label it as an estimate.', minWords: 12, rows: 4,
          keywords: [{ match: 'different|unlike|only|but', tip: 'what sets you apart' }, { match: 'estimate|found|five|three|nearby|\\d', tip: 'a fact or labeled estimate' }] },
      ],
      model: 'Sunday Table makes ready-to-heat family dinners for busy parents who order online and pick up on Friday. Unlike the nearby places I visited, which sell only single meals, we sell a full dinner for four, and my estimate is that most families near me have no such option.',
    },
  ],
  p4: [
    {
      type: 'order', title: 'Start your plan, step by step',
      intro: 'First step at the top.',
      steps: ['Make a document with the eight section headings', 'Paste in what you already have', 'Write bullet points under each empty heading', 'Draft a rough one-page summary', 'Read it aloud and mark unclear or untrue sentences'],
      why: 'Set up the headings, add what you have, note what is missing, draft the summary, then read it aloud.',
    },
    {
      type: 'choice', title: 'Keep it moving',
      items: [
        { q: 'What is the "Questions to answer" list for?', opts: ['Tracking what you still need to find out', 'Your menu', 'Your tax return', 'Your permits only'], ans: 0, why: 'Later lessons will help you answer them.' },
        { q: 'Where should you keep your drafts?', opts: ['In one folder or notebook', 'In many places', 'Nowhere', 'On scraps of paper'], ans: 0, why: 'One place makes it easy to put the plan together later.' },
        { q: 'Do you need to write the whole plan at once?', opts: ['No, work in small steps', 'Yes, in one night', 'Yes, before any research', 'Never write it down'], ans: 0, why: 'Small steps add up, and work now saves time later.' },
      ],
    },
  ],
};
