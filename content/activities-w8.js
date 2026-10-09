/* Week 8 (w8d1 to w8d4): Marketing, Pitch & Operating Plan. DRAFT. */
ACTIVITIES.w8d1 = {
  p1: [
    { type: 'choice', title: 'What a brand is',
      items: [
        { q: 'Which best describes a brand?', opts: ['The picture and feeling people have when they think of your business', 'Only your logo', 'Only your prices', 'Only your business name'], ans: 0, why: 'A brand is the picture and feeling in customers’ heads, built by many small moments, not just a logo.' },
        { q: 'Where should a brand start?', opts: ['With your customer', 'With the cheapest logo you can find', 'With copying a big chain', 'With a long list of every food you can cook'], ans: 0, why: 'Your brand should speak to the specific customer you planned for, not to everyone.' },
        { q: 'Which is a positioning sentence?', opts: ['For busy parents, we are the fast, healthy dinner they can feel good about.', 'We sell food.', 'Our logo is red.', 'Open Monday to Friday.'], ans: 0, why: 'Positioning follows the pattern: for (who), we are (what), so they can (benefit).' },
      ] },
    { type: 'match', title: 'Match the brand job to its meaning',
      options: ['Helps people recognize you among many choices', 'Builds trust before anyone tastes the food', 'Gives a reason to pick you over a cheaper option'],
      rows: [{ label: 'Recognition', ans: 0 }, { label: 'Trust', ans: 1 }, { label: 'Preference', ans: 2 }],
      why: 'A brand helps people recognize you, trust you early, and choose you.' },
  ],
  p2: [
    { type: 'choice', title: 'Name, look and voice',
      items: [
        { q: 'A good business name is:', opts: ['Easy to say, spell and remember', 'As long as possible', 'Hard to spell so it stands out', 'Chosen without checking if others use it'], ans: 0, why: 'Say it out loud and spell it to a friend. Also check whether someone else already uses it.' },
        { q: 'How many colors and fonts does the lesson suggest?', opts: ['Two or three colors and one or two fonts', 'A new color every week', 'Ten colors', 'No fixed look'], ans: 0, why: 'Keeping the look simple and using it every time makes you easy to recognize.' },
        { q: 'Why test your logo small and in black and white?', opts: ['It must be readable on a profile picture or a to-go sticker', 'Color logos are not allowed', 'It makes the logo cheaper', 'It is a legal rule'], ans: 0, why: 'Logos appear small in many places, so they must stay readable.' },
        { q: 'You are unsure whether a name is legal to use. What does the lesson tell you to do?', opts: ['Check with your local business office or a qualified professional', 'Use it anyway', 'Guess based on a friend’s advice', 'Add a number to the end'], ans: 0, why: 'Registration and trademark rules differ by place; this course gives no legal advice.' },
      ] },
    { type: 'fill', title: 'Brand numbers',
      intro: 'Type the number from the lesson.',
      rows: [{ label: 'Number of words that describe your voice', unit: 'words', ans: 3 }, { label: 'Fewest colors to pick for your look', unit: 'colors', ans: 2 }],
      why: 'Choose three voice words and two or three colors.' },
  ],
  p3: [
    { type: 'order', title: 'Put the story pieces in order',
      intro: 'First piece at the top.',
      steps: ['The problem or need', 'What you did about it', 'What you make now', 'What you hope for the customer'],
      why: 'A simple story moves from the need, to your action, to your product, to the benefit for the customer.' },
    { type: 'choice', title: 'Telling your story honestly',
      items: [
        { q: 'Which is the strongest kind of proof in your story?', opts: ['One real, checkable fact such as years cooking or a customer comment with permission', 'Many big claims you cannot prove', 'The word "best"', 'A claim copied from a competitor'], ans: 0, why: 'One piece of real proof beats many big claims.' },
        { q: 'You want to say "all organic" on your menu. What should you do?', opts: ['Say it only if you can prove it, and check local labeling and advertising rules', 'Say it, since customers like it', 'Say it only on social media', 'Say "mostly organic" without checking'], ans: 0, why: 'Food origin and ingredient claims may be covered by rules, and they must be true.' },
        { q: 'Why have a one-sentence, a short and a longer version of your story?', opts: ['Different places need different lengths', 'So you can change the facts', 'Because the law requires three', 'To make it harder to copy'], ans: 0, why: 'A sign needs one sentence, a menu a paragraph, and a direct question a longer answer.' },
      ] },
  ],
  p4: [
    { type: 'choice', title: 'Consistency',
      items: [
        { q: 'A place where a customer meets your business, such as a menu or social page, is called a:', opts: ['Touchpoint', 'Capacity', 'Positioning', 'Launch'], ans: 0, why: 'Every place a customer sees or hears from you is a touchpoint.' },
        { q: 'A brand says "fresh" but the food is often old. What is the problem?', opts: ['The daily experience does not match the promise', 'The font is wrong', 'The logo is too small', 'Nothing; branding is only looks'], ans: 0, why: 'A brand is only as strong as the daily experience behind it.' },
        { q: 'What goes on a one-page brand sheet?', opts: ['Positioning sentence, name, colors, fonts, voice words, story and logo rules', 'Your tax records', 'Supplier invoices', 'Employee schedules'], ans: 0, why: 'The brand sheet keeps your look and voice steady as you grow or add helpers.' },
      ] },
    { type: 'reflect', title: 'Write your brand basics',
      intro: 'Use your own business idea.',
      prompts: [
        { key: 'position', label: 'Write your positioning sentence and three voice words.', help: 'Use: for (who), we are (what), so they can (benefit).', items: 1, minWords: 15, rows: 4,
          keywords: [{ match: 'for ', tip: 'name who the customer is' }, { match: 'we are|we ', tip: 'say what you are' }, { match: 'so they|so you|so customers', tip: 'state the benefit' }] },
      ],
      model: 'For busy office workers, we are the fast and healthy lunch spot so they can eat well in a short break. My voice words are friendly, honest and simple. I will use these words on the menu, signs and every message.' },
  ],
};

ACTIVITIES.w8d2 = {
  p1: [
    { type: 'choice', title: 'Choosing channels',
      items: [
        { q: 'Where should you start when picking a marketing channel?', opts: ['With where your customer already spends time', 'With the newest platform', 'With the cheapest option only', 'With every channel at once'], ans: 0, why: 'Go where the customer already is.' },
        { q: 'Why pick two or three channels instead of seven?', opts: ['You can do a few well and keep them up every week', 'Seven is illegal', 'More channels cost nothing', 'Customers dislike variety'], ans: 0, why: 'Steady work on a few channels beats scattered work on many.' },
        { q: 'Which question helps score a channel?', opts: ['Can I keep it up every week?', 'Is it popular with my friends only?', 'Does it have a long name?', 'Is it new?'], ans: 0, why: 'Score each channel on customer use, affordability and whether you can sustain it.' },
      ] },
    { type: 'match', title: 'Match the customer to the likely channel',
      options: ['Online maps and short social posts', 'A friendly market table and printed card', 'Email or text list with permission'],
      rows: [{ label: 'Office worker choosing lunch on a phone', ans: 0 }, { label: 'Older neighbor who visits the weekend market', ans: 1 }, { label: 'Past customers who already like you', ans: 2 }],
      why: 'Match the channel to how that customer finds food.' },
  ],
  p2: [
    { type: 'choice', title: 'Low-cost marketing',
      items: [
        { q: 'Why is word of mouth valuable?', opts: ['It costs almost nothing and people trust it more than ads', 'It is guaranteed', 'It needs no good food', 'It replaces all other plans'], ans: 0, why: 'Happy customers telling others is cheap and trusted.' },
        { q: 'Before featuring a customer’s face or name on social media you should:', opts: ['Ask permission', 'Just post it', 'Pay them', 'Wait a year'], ans: 0, why: 'Always ask permission first.' },
        { q: 'What should you do before planning a paid ad budget?', opts: ['Look up current prices and rules on the platform yourself', 'Assume a standard price', 'Spend your whole budget', 'Skip tracking'], ans: 0, why: 'Prices and rules vary by platform and place, so check them yourself and start with a small test.' },
        { q: 'Before adding someone to an email or text list, you should:', opts: ['Ask permission and follow local messaging rules', 'Add every phone number you find', 'Buy a list', 'Send them 10 messages'], ans: 0, why: 'Permission and local rules come first.' },
      ] },
    { type: 'match', title: 'Match the channel to its main strength',
      options: ['Lets people taste before they buy', 'Lets people find your hours and location', 'Reaches people who already like you'],
      rows: [{ label: 'Free samples', ans: 0 }, { label: 'Online map listing', ans: 1 }, { label: 'Email list', ans: 2 }],
      why: 'Samples give taste, listings give information, lists reach existing fans.' },
  ],
  p3: [
    { type: 'order', title: 'Order the launch steps',
      intro: 'First step at the top.',
      steps: ['Announce your name and story and collect names', 'Hold a soft launch for friends and neighbors', 'Fix problems the soft launch showed', 'Open to the public with a clear offer', 'Thank customers and ask for feedback'],
      why: 'Build interest, test small, fix problems, open, then follow up.' },
    { type: 'fill', title: 'Launch budget (example numbers)',
      intro: 'Example: $200 cards and signs, $60 sample ingredients, $40 photo props.',
      rows: [{ label: 'Total launch budget', unit: '$', ans: 300 }, { label: 'Money left from $350 after spending that total', unit: '$', ans: 50 }],
      why: '200 + 60 + 40 = 300, and 350 - 300 = 50.' },
  ],
  p4: [
    { type: 'fill', title: 'Cost to win a customer',
      intro: 'Example: you spend $60 on flyers and get 12 new customers.',
      rows: [{ label: 'Cost per new customer', unit: '$', ans: 5 }, { label: 'Cost per customer if $90 brought 15 customers', unit: '$', ans: 6 }],
      why: '60 / 12 = 5 and 90 / 15 = 6.' },
    { type: 'choice', title: 'Measuring',
      items: [
        { q: 'A simple way to learn which channel works is to:', opts: ['Ask each new customer how they heard about you and tally it', 'Guess', 'Ask only your family', 'Wait a year'], ans: 0, why: 'A tally in a notebook is enough.' },
        { q: 'Flyers cost $5 per customer and a free post brought customers for $0 cash. What else should you note?', opts: ['The hours your time took', 'Nothing', 'Only the flyers', 'The color of the post'], ans: 0, why: 'Your time has value too.' },
        { q: 'What is the purpose of a weekly review?', opts: ['Keep what works, change what does not', 'Do more of everything', 'Delete your notes', 'Raise prices'], ans: 0, why: 'Review, then write what you will do more or less of.' },
      ] },
  ],
};

ACTIVITIES.w8d3 = {
  p1: [
    { type: 'choice', title: 'Selling well',
      items: [
        { q: 'A customer asks if a dish has an allergen and you are not sure. What do you do?', opts: ['Say you are not sure and check', 'Guess', 'Say it is fine', 'Avoid answering'], ans: 0, why: 'Allergy mistakes can be serious, so check instead of guessing.' },
        { q: 'Why confirm the order back to the customer?', opts: ['It prevents mistakes about items, price and pickup time', 'It slows them down', 'It is a legal rule', 'It lowers prices'], ans: 0, why: 'A quick confirmation catches errors.' },
        { q: 'What should you do before joining an online ordering service?', opts: ['Read its terms and include its fees in your prices', 'Sign without reading', 'Ignore fees', 'Raise prices at random'], ans: 0, why: 'Fees and rules vary and affect your profit.' },
      ] },
    { type: 'order', title: 'Order the simple selling method',
      intro: 'First step at the top.',
      steps: ['Greet the customer', 'Ask one question', 'Suggest one or two items', 'Offer a small add-on', 'Confirm the order'],
      why: 'Greet, ask, suggest, add-on, confirm. Suggestions should help, not push.' },
  ],
  p2: [
    { type: 'fill', title: 'Loyalty card math (example)',
      intro: 'Each item sells for $5 and the tenth is free.',
      rows: [{ label: 'Money the customer pays for 10 items', unit: '$', ans: 45 }, { label: 'Average price per item', unit: '$', ans: 4.5, tol: 0.01 }],
      why: 'The customer pays for 9 items: 9 x 5 = 45. 45 / 10 = 4.50 per item.' },
    { type: 'order', title: 'Fix a customer problem',
      intro: 'First step at the top.',
      steps: ['Listen without arguing', 'Say sorry', 'Fix it as your policy allows', 'Thank them for telling you'],
      why: 'Listen, apologize, fix, thank.' },
  ],
  p3: [
    { type: 'choice', title: 'Reviews and feedback',
      items: [
        { q: 'Is it acceptable to write your own positive reviews?', opts: ['No, do not write or buy fake reviews', 'Yes, it is common', 'Yes, if short', 'Yes, if you use another name'], ans: 0, why: 'Fake reviews break review site rules and trust.' },
        { q: 'How should you reply to a bad review?', opts: ['Briefly and politely, offer to fix it, and take longer talks offline', 'Argue publicly', 'Ignore it forever', 'Delete the business page'], ans: 0, why: 'Other readers judge you by how you respond.' },
        { q: 'When is a complaint a message and not a one-off?', opts: ['When you see the same complaint repeatedly', 'When it is loud', 'When it is the first one', 'When it is about price only'], ans: 0, why: 'Patterns in a feedback log show real problems.' },
      ] },
    { type: 'match', title: 'Match the term',
      options: ['What customers tell you about food and service', 'Public feedback others can read', 'A notebook of what was said and what you did'],
      rows: [{ label: 'Feedback', ans: 0 }, { label: 'Review', ans: 1 }, { label: 'Feedback log', ans: 2 }],
      why: 'Feedback is private or public input, a review is public, and the log tracks patterns.' },
  ],
  p4: [
    { type: 'fill', title: 'Capacity math (example)',
      intro: 'You make 20 meals an hour for a 3-hour window.',
      rows: [{ label: 'Capacity for the window', unit: 'meals', ans: 60 }, { label: 'Orders you could not make well if you took 80', unit: 'meals', ans: 20 }],
      why: '20 x 3 = 60, and 80 - 60 = 20.' },
    { type: 'reflect', title: 'Your growth rule',
      intro: 'Think about your own business.',
      prompts: [
        { key: 'growth', label: 'Write a rule for when you will say yes to growth and when you will wait.', help: 'Use quality, capacity, cost and brand.', items: 1, minWords: 15, rows: 4,
          keywords: [{ match: 'quality|same|every time', tip: 'quality stays the same' }, { match: 'capacity|enough|help|equipment', tip: 'capacity or help' }, { match: 'cost|profit|money', tip: 'still makes money' }] },
      ],
      model: 'I will say yes to a new item only if I can make it the same quality every time, I have the equipment and help, and it still makes a profit after all costs. If I see more complaints, waste or late orders, I will wait and fix my system first.' },
  ],
};

ACTIVITIES.w8d4 = {
  p1: [
    { type: 'order', title: 'Order the pitch blocks',
      intro: 'First block at the top.',
      steps: ['Hook', 'What you make', 'Who it is for', 'Why you', 'How it makes money', 'The ask'],
      why: 'The six blocks run hook, product, customer, proof, money, then the ask.' },
    { type: 'fill', title: 'Pitch timing',
      intro: 'Speaking pace is about 140 words a minute.',
      rows: [{ label: 'Words in a 60-second pitch', unit: 'words', ans: 140, tol: 10 }, { label: 'Number of building blocks in the pitch', unit: 'blocks', ans: 6 }],
      why: 'About 130 to 150 words fill one minute, and there are six blocks.' },
  ],
  p2: [
    { type: 'choice', title: 'Answering questions',
      items: [
        { q: 'Someone asks "What if someone does it cheaper?" Your best answer:', opts: ['Go back to your positioning: quality, convenience, story or service', 'Say you will lower your price', 'Say nobody can', 'Change the subject'], ans: 0, why: 'Use your positioning, not just price cutting.' },
        { q: 'You do not know the answer to a rules question. What do you do?', opts: ['Say which local office you will ask and when', 'Guess', 'Say there are no rules', 'End the talk'], ans: 0, why: 'Do not guess about rules; name the next step.' },
        { q: 'Why name one or two real risks?', opts: ['Honest answers build trust', 'To scare people', 'It is required', 'It lowers your price'], ans: 0, why: 'Naming a risk and your response shows you have thought it through.' },
      ] },
    { type: 'fill', title: 'Profit per item (example)',
      intro: 'A meal sells for $12 and costs $5 to make.',
      rows: [{ label: 'Amount kept before other costs', unit: '$', ans: 7 }, { label: 'Amount kept on 10 meals before other costs', unit: '$', ans: 70 }],
      why: '12 - 5 = 7, and 7 x 10 = 70. Other costs still come out of this.' },
  ],
  p3: [
    { type: 'match', title: 'Match the Operating Plan section',
      options: ['Steps from start to finish and the most you can make well', 'Who you buy from, how often, and a backup', 'Who does what and when', 'Checks that each batch matches your standard', 'Safe handling, temperature checks, cleaning, permits', 'Launch tasks and 90-day goals'],
      rows: [{ label: 'Production workflow and capacity', ans: 0 }, { label: 'Suppliers and ordering', ans: 1 }, { label: 'Schedule and roles', ans: 2 }, { label: 'Quality checklists', ans: 3 }, { label: 'Food safety and compliance plan', ans: 4 }, { label: 'Launch plan and first 90 days', ans: 5 }],
      why: 'The six sections together show how the business runs day to day.' },
    { type: 'fill', title: 'Does the plan fit? (example)',
      intro: 'You make 15 portions an hour for 4 hours. The launch plan promises 100.',
      rows: [{ label: 'Capacity', unit: 'portions', ans: 60 }, { label: 'Portions short', unit: 'portions', ans: 40 }],
      why: '15 x 4 = 60, and 100 - 60 = 40, so the plan and the capacity must be matched.' },
  ],
  p4: [
    { type: 'choice', title: 'The first 90 days',
      items: [
        { q: 'What is the focus of days 1 to 30?', opts: ['Open, learn and make food safely and the same way each time', 'Expand to three locations', 'Stop tracking', 'Redesign the logo'], ans: 0, why: 'The first block is for opening and learning.' },
        { q: 'What is the focus of days 61 to 90?', opts: ['Compare plan with results and choose what to grow, stop or change', 'Close the business', 'Ignore results', 'Wait'], ans: 0, why: 'The last block is for review and the next plan.' },
        { q: 'Which is a countable goal?', opts: ['Serve 40 customers a week', 'Be popular', 'Do better', 'Be the best'], ans: 0, why: 'Goals you can count tell you whether it worked.' },
      ] },
    { type: 'reflect', title: 'Draft your 60-second pitch',
      intro: 'Write your pitch using the six blocks.',
      prompts: [
        { key: 'pitch', label: 'Write your pitch, ending with a clear ask.', help: 'Hook, product, customer, why you, money, ask.', items: 1, minWords: 30, rows: 8,
          keywords: [{ match: 'customer|for ', tip: 'who it is for' }, { match: '\\$|price|cost|profit', tip: 'how it makes money' }, { match: 'ask|can you|come|join|looking for|would you', tip: 'a clear ask' }] },
      ],
      model: 'Busy parents struggle to find dinner that is fast and healthy. I make fresh family meals that are ready in ten minutes. My customers are parents who work late. I have cooked for ten years and tested every recipe. Each meal sells for twelve dollars and I keep seven before other costs. Come to our opening on day one and taste a free sample.' },
  ],
};
