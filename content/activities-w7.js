/* Week 7 (w7d1 to w7d4): Level II · Week 3, Operations. Practice numbers are examples only. */

/* ---- Day 1: production, capacity, batching, equipment ------------------------------------------------------------- */
ACTIVITIES.w7d1 = {
  p1: [
    {
      type: 'order', title: 'Put the production workflow in order',
      intro: 'First step at the top. Use the arrows.',
      steps: ['Take the order', 'Confirm the date and details', 'Buy or pick up ingredients', 'Prep and cook or bake', 'Cool, portion and package', 'Label and deliver or hand off', 'Clean up and record what you made'],
      why: 'The workflow runs from the order, to confirming it, to buying, making, packaging, labeling and handing off, and ends with clean-up and records.',
    },
    {
      type: 'choice', title: 'Reading your workflow map',
      items: [
        { q: 'What three things should you write next to each step on your workflow map?', opts: ['How long it takes, what you need, and who does it', 'The price, the color, and the brand', 'The customer name, the weather, and the day', 'The recipe, the photo, and the logo'], ans: 0, why: 'Time, needs and the person doing it show you where one person is doing too many jobs at once.' },
        { q: 'Why mark handoffs and waiting on your map?', opts: ['They make the food taste better', 'Mistakes and delays often hide there', 'They are required on every label', 'They show how much to charge'], ans: 1, why: 'A handoff is where work passes from one person or place to another, and waiting is when nothing is happening. Both are where problems hide.' },
        { q: 'What is the walk-through for?', opts: ['Saying each step out loud for one pretend order and counting minutes', 'Walking customers around your kitchen', 'Exercise between prep tasks', 'Counting how many ingredients you own'], ans: 0, why: 'A walk-through finds steps you forgot, such as packaging, labeling or cleaning.' },
      ],
    },
  ],
  p2: [
    {
      type: 'fill', title: 'Muffin capacity (practice numbers)',
      intro: 'An oven holds 2 trays of 12 muffins. One full cycle (bake plus loading and unloading) takes 35 minutes. You have a 240-minute baking window.',
      rows: [
        { label: 'Muffins made in one bake', unit: 'muffins', ans: 24 },
        { label: 'Full cycles that fit in 240 minutes (whole cycles only)', unit: 'cycles', ans: 6 },
        { label: 'Top capacity for the window', unit: 'muffins', ans: 144 },
        { label: 'Planning capacity at 80 percent of top capacity', unit: 'muffins', ans: 115.2, tol: 0.5 },
      ],
      why: '2 x 12 = 24 per bake. 240 / 35 is about 6.86, so 6 whole cycles. 6 x 24 = 144. 144 x 0.80 = 115.2, so plan for about 115.',
    },
    {
      type: 'match', title: 'Match the capacity word to its meaning',
      options: ['The step slower than all others that limits output', 'The most you can make in a set time with what you have', 'The safe number you plan to use, below your top output', 'Sales you get from the units you can make'],
      rows: [{ label: 'Bottleneck', ans: 0 }, { label: 'Capacity', ans: 1 }, { label: 'Planning capacity (about 80 percent)', ans: 2 }, { label: 'Revenue from capacity (units x price)', ans: 3 }],
      why: 'The bottleneck limits output. Capacity is your top output. Planning capacity leaves room for slow days and mistakes. Units times price gives sales.',
    },
  ],
  p3: [
    {
      type: 'choice', title: 'Batching and schedules',
      items: [
        { q: 'Why is making 24 muffins in one go faster than making 6 four separate times?', opts: ['You set up once, use the tool once and clean up once', 'The oven bakes faster with more muffins', 'Muffins need less flour in big batches', 'It is not faster'], ans: 0, why: 'Batching saves the repeated setup and clean-up.' },
        { q: 'An order is picked up Friday at 4:00 pm. How do you build the prep schedule?', opts: ['Start on Friday and hope for the best', 'Work backward from the pickup time to find when each step must start', 'Make everything the week before', 'Ask the customer to come earlier'], ans: 1, why: 'Working backward from the delivery time shows when to buy, mix, bake and pack.' },
        { q: 'What is a buffer?', opts: ['A kind of mixer', 'Extra time you do not plan to use, left in case something goes wrong', 'A discount for customers', 'A type of storage shelf'], ans: 1, why: 'A cushion of about 15 to 25 percent on time estimates helps when you are new.' },
        { q: 'Before batching food far ahead, what should you decide for each item?', opts: ['The color of the label', 'How far ahead it can be made, how it is cooled and stored, and when to discard it', 'Which customer likes it', 'The name of the supplier'], ans: 1, why: 'Some foods hold well and some do not. Check local health department rules for hold times and temperatures.' },
      ],
    },
    {
      type: 'order', title: 'Backward schedule for a Friday order',
      intro: 'Order the work from earliest to latest.',
      steps: ['Wednesday: buy ingredients', 'Thursday: make the dough', 'Friday morning: bake', 'Friday 2:00 to 3:30 pm: pack and label', 'Friday 4:00 pm: pickup'],
      why: 'Working backward from the 4:00 pm pickup gives packing, then baking, then dough on Thursday, then buying on Wednesday.',
    },
  ],
  p4: [
    {
      type: 'choice', title: 'Equipment and space',
      items: [
        { q: 'A tool you could borrow or rent for now is best marked as:', opts: ['Must have', 'Can borrow or rent', 'Never needed', 'Required by law'], ans: 1, why: 'Sorting equipment into must have, nice to have and borrow or rent keeps beginners from buying too much, too soon.' },
        { q: 'Why write equipment limits as numbers (for example, a 5-quart bowl or 3 fridge shelves)?', opts: ['Numbers look professional', 'Numbers can go into your capacity math', 'The health department asks for them on your sign', 'They make recipes taste better'], ans: 1, why: 'A numbered limit lets you work out how much you can make or hold.' },
        { q: 'What should you do early about where you can make food for sale?', opts: ['Wait until your first customer complains', 'Call your local health department and ask what is allowed for your kind of business', 'Assume any kitchen is fine', 'Ask a friend to guess'], ans: 1, why: 'Rules differ by location and product, so ask before you buy equipment or promise a customer anything.' },
      ],
    },
    {
      type: 'reflect', title: 'Your Production Plan summary',
      intro: 'Think of the product you plan to sell.',
      prompts: [
        { key: 'bottleneck', label: 'Name your likely bottleneck and say how it limits how much you can make.', help: 'Use a piece of equipment or a person, and a number if you can.', items: 1, minWords: 20, rows: 5,
          keywords: [{ match: 'bottleneck|slowest|limit', tip: 'the word bottleneck or the step that limits you' }, { match: 'oven|mixer|fridge|equipment|me|myself|person', tip: 'the equipment or person that is the bottleneck' }, { match: 'per|hour|batch|tray|minutes|\\d', tip: 'a number such as trays, minutes or batches' }, { match: 'capacity|plan|80|percent', tip: 'how this connects to your planning capacity' }] },
      ],
      model: 'My bottleneck is my one oven, which holds two trays and needs about 35 minutes for each full cycle. In a four-hour window that limits me to six cycles, so I plan for about 80 percent of that top capacity and I will not promise more than that to customers.',
    },
  ],
};

/* ---- Day 2: suppliers, par levels, storage, waste ----------------------------------------------------------------- */
ACTIVITIES.w7d2 = {
  p1: [
    {
      type: 'fill', title: 'Compare unit prices (practice numbers)',
      intro: 'Supplier A sells 10 lb of flour for $32. Supplier B sells 25 lb for $70.',
      rows: [
        { label: 'Supplier A price per pound', unit: '$ per lb', ans: 3.2, tol: 0.01 },
        { label: 'Supplier B price per pound', unit: '$ per lb', ans: 2.8, tol: 0.01 },
      ],
      why: '$32 / 10 = $3.20 per lb. $70 / 25 = $2.80 per lb. B is cheaper per pound, but only a good deal if you use all 25 lb before it goes stale.',
    },
    {
      type: 'choice', title: 'Choosing suppliers',
      items: [
        { q: 'Besides price, which question should you ask a supplier?', opts: ['What is their favorite food', 'Is quality and delivery reliable, and what is the minimum order', 'How old is their building', 'What color are their trucks'], ans: 1, why: 'Quality, reliability, minimum order and problem handling matter as much as price.' },
        { q: 'Why have a backup supplier for your most important ingredients?', opts: ['If your only source runs out or closes you cannot make your product', 'Backups are cheaper', 'It is required for every business', 'It makes your menu longer'], ans: 0, why: 'Depending on one supplier is a risk.' },
        { q: 'What belongs on a supplier sheet?', opts: ['Only the supplier name', 'Name, contact, what you buy, prices and the date you last checked them', 'Your recipes', 'Your customers\' addresses'], ans: 1, why: 'A supplier sheet keeps contacts and prices in one place so you can compare and reorder.' },
      ],
    },
  ],
  p2: [
    {
      type: 'fill', title: 'Set a par level (practice numbers)',
      intro: 'You use 8 lb of chicken a day. Deliveries come every 3 days. Safety stock is 4 lb. You count 10 lb on the shelf today.',
      rows: [
        { label: 'Use between deliveries (8 lb x 3 days)', unit: 'lb', ans: 24 },
        { label: 'Par level (use between deliveries + safety stock)', unit: 'lb', ans: 28 },
        { label: 'Amount to order today (par minus on hand)', unit: 'lb', ans: 18 },
      ],
      why: '8 x 3 = 24. 24 + 4 = 28 lb par. 28 - 10 = 18 lb to order.',
    },
    {
      type: 'choice', title: 'Ordering ideas',
      items: [
        { q: 'What is a par level?', opts: ['The price of an item', 'The amount you want on hand right after a delivery', 'The amount you throw away', 'The number of suppliers you have'], ans: 1, why: 'Par is a target number. When stock falls below it, you order back up to par.' },
        { q: 'What is safety stock?', opts: ['A small extra amount kept for surprises such as a busy day or a late delivery', 'Stock you keep locked up', 'The oldest stock on the shelf', 'Stock that is on sale'], ans: 0, why: 'Safety stock covers surprises.' },
        { q: 'Which item should usually have a lower par level?', opts: ['Flour', 'Sugar', 'Fresh herbs', 'Dry rice'], ans: 2, why: 'Fast-spoiling items such as fresh herbs and dairy get a lower par than long-lasting dry goods.' },
        { q: 'What should you base your orders on?', opts: ['Your mood', 'A forecast from your orders and prep schedule, and a regular stock count', 'What the supplier recommends most', 'What you bought last month, always'], ans: 1, why: 'Count on a schedule, compare to par, and order from the plan.' },
      ],
    },
  ],
  p3: [
    {
      type: 'match', title: 'Match the storage word',
      options: ['Oldest stock gets used first', 'Sorts by the date printed on the package', 'A written record of checks over time', 'Shows what the item is and the date received or made'],
      rows: [{ label: 'FIFO', ans: 0 }, { label: 'FEFO', ans: 1 }, { label: 'Temperature log', ans: 2 }, { label: 'Label', ans: 3 }],
      why: 'FIFO is first in, first out. FEFO is first expired, first out. A log records checks. A label shows the item and date.',
    },
    {
      type: 'choice', title: 'Storing safely',
      items: [
        { q: 'Where should ready-to-eat food go compared with raw food?', opts: ['Below raw food', 'Above raw food, so drips cannot land on it', 'Mixed in together', 'It does not matter'], ans: 1, why: 'Ready-to-eat foods go above raw foods so raw drips cannot reach food that will not be cooked again.' },
        { q: 'A delivery of cold items arrives. What should you do?', opts: ['Put it away right away', 'Leave it on the counter until the end of the shift', 'Store it later when you have time', 'Check it only on the next delivery'], ans: 0, why: 'Put things away right when they arrive, especially cold items.' },
        { q: 'Where should cleaning chemicals be kept?', opts: ['Next to the flour', 'Away from food and packaging, ideally in a separate area', 'On top of the fridge', 'In the freezer'], ans: 1, why: 'Chemicals must not touch or sit over food or packaging.' },
        { q: 'Where do you find the exact fridge temperatures required where you work?', opts: ['Guess from a friend', 'Your food safety training and your local health department', 'On the supplier\'s invoice', 'Nowhere, there are no rules'], ans: 1, why: 'Follow your training and check local rules for exact numbers.' },
      ],
    },
  ],
  p4: [
    {
      type: 'fill', title: 'Waste percent and cost (practice numbers)',
      intro: 'You bought 50 lb of vegetables and threw away 4 lb. The vegetables cost $3.00 per lb.',
      rows: [
        { label: 'Waste percent (waste / bought x 100)', unit: '%', ans: 8, tol: 0.1 },
        { label: 'Cost of the wasted vegetables', unit: '$', ans: 12, tol: 0.01 },
      ],
      why: '4 / 50 x 100 = 8 percent. 4 lb x $3.00 = $12.00.',
    },
    {
      type: 'reflect', title: 'Cut waste in your own business',
      prompts: [
        { key: 'waste', label: 'Pick one ingredient that could spoil in your business and describe two ways you would cut waste on it.', help: 'Think about par levels, batch size, FIFO, using trim or pre-orders.', items: 1, minWords: 25, rows: 5,
          keywords: [{ match: 'par|order|buy|smaller|less', tip: 'ordering less or lowering a par level' }, { match: 'FIFO|rotate|label|date|oldest', tip: 'rotating stock or labeling' }, { match: 'log|track|measure|count', tip: 'tracking waste in a log' }, { match: 'pre-order|batch|trim|other recipe|use', tip: 'smaller batches, pre-orders or reusing trim' }] },
      ],
      model: 'The ingredient is fresh herbs. I would lower my par level and buy smaller amounts more often, and I would use the stems in other recipes such as sauces and stock. I would also label each bunch with the date, use the oldest first, and write what I throw away in a waste log.',
    },
  ],
};

/* ---- Day 3: roles, procedures, quality, time --------------------------------------------------------------------- */
ACTIVITIES.w7d3 = {
  p1: [
    {
      type: 'fill', title: 'Add up your weekly hours (practice numbers)',
      intro: 'Cooking 14 hours, shopping 3, packing and delivery 5, cleaning 4, selling and social media 4, bookkeeping 2.',
      rows: [
        { label: 'Total hours in the week', unit: 'hours', ans: 32 },
        { label: 'Hours that are not cooking', unit: 'hours', ans: 18 },
      ],
      why: '14 + 3 + 5 + 4 + 4 + 2 = 32. Without the 14 cooking hours, 18 hours are other work that is easy to forget.',
    },
    {
      type: 'choice', title: 'Roles',
      items: [
        { q: 'Why list every task under a role even when you work alone?', opts: ['To see how much work there really is', 'Because the law says so', 'To hire three people right away', 'To make the plan longer'], ans: 0, why: 'You wear many hats, and writing them down shows the hidden work.' },
        { q: 'What happens if you count only cooking hours when pricing?', opts: ['You will price too high', 'You will underprice and may burn out', 'Nothing changes', 'Customers will pay more'], ans: 1, why: 'Leaving out other work hides real costs.' },
        { q: 'Which task is the best candidate to hand off first?', opts: ['A repeatable, written-down task such as packing or cleaning', 'Developing your signature recipe', 'Deciding your prices', 'Any task nobody understands'], ans: 0, why: 'Repeatable and documented tasks are easiest to hand off.' },
      ],
    },
  ],
  p2: [
    {
      type: 'order', title: 'Order the steps for creating a good checklist',
      steps: ['Pick an important task such as closing or packing', 'Write it as short numbered steps starting with a verb', 'Add numbers where they matter', 'Ask a friend to follow it without your help', 'Fix the places where they got stuck', 'Date it and keep the newest version where you work'],
      why: 'Choose the task, write short steps, add numbers, test it with someone else, fix gaps and keep the dated final version where you work.',
    },
    {
      type: 'choice', title: 'Procedures and checklists',
      items: [
        { q: 'What is a procedure (SOP)?', opts: ['A short written set of steps to do a task the same way every time', 'A government license', 'A recipe cost', 'A kind of insurance'], ans: 0, why: 'SOP stands for standard operating procedure.' },
        { q: 'Which is the best step wording?', opts: ['Clean stuff', 'Wipe the table with sanitizer', 'Table should be clean', 'Try to be neat'], ans: 1, why: 'Start steps with a verb and be specific.' },
        { q: 'Why keep a checklist to about one page?', opts: ['Long ones do not get used', 'Printers are expensive', 'Law requires it', 'Short lists are always better for taste'], ans: 0, why: 'If it is too long, nobody will use it.' },
      ],
    },
  ],
  p3: [
    {
      type: 'match', title: 'Match the quality tool to its job',
      options: ['Makes every portion the same size', 'Shows the finished product should look like', 'Lists exact amounts, steps, yield and portion size', 'Removes guessing about time and doneness'],
      rows: [{ label: 'Fixed-size scoop', ans: 0 }, { label: 'Photo of a perfect one', ans: 1 }, { label: 'Standard recipe', ans: 2 }, { label: 'Timer and thermometer', ans: 3 }],
      why: 'A scoop controls portion, a photo sets the look, a standard recipe lists exact amounts, and a timer and thermometer take away guessing.',
    },
    {
      type: 'choice', title: 'Consistency and root causes',
      items: [
        { q: 'A cake came out dry. It baked too long because the oven runs hot. What is the best fix?', opts: ['Be more careful next time', 'Use an oven thermometer and adjust the time in the written recipe', 'Stop making cakes', 'Add more sugar'], ans: 1, why: 'Ask why until you find the cause, then change the written method.' },
        { q: 'Three customers say your product was too salty. What should you do?', opts: ['Ignore it', 'Change the recipe in writing so the improvement sticks', 'Tell customers they are wrong', 'Raise the price'], ans: 1, why: 'Feedback is information. Update the standard recipe.' },
        { q: 'Why weigh ingredients instead of writing a pinch?', opts: ['A pinch is different each time', 'Scales are cheap', 'Customers like scales', 'It makes batches smaller'], ans: 0, why: 'Exact amounts keep quality and cost steady.' },
      ],
    },
  ],
  p4: [
    {
      type: 'fill', title: 'Your hourly pay (practice numbers)',
      intro: 'You make $720 in profit in a week.',
      rows: [
        { label: 'Hourly pay if you worked 36 hours', unit: '$ per hour', ans: 20, tol: 0.01 },
        { label: 'Hourly pay if you worked 50 hours', unit: '$ per hour', ans: 14.4, tol: 0.01 },
      ],
      why: '$720 / 36 = $20 per hour. $720 / 50 = $14.40 per hour.',
    },
    {
      type: 'reflect', title: 'Plan your work week',
      prompts: [
        { key: 'week', label: 'Describe how you would block your time in a typical production day, and where you would put the hardest work.', help: 'Include a time for hard tasks, simple tasks, and rest.', items: 1, minWords: 25, rows: 5,
          keywords: [{ match: 'block|schedule|hours|morning|afternoon|\\d', tip: 'specific blocks or times' }, { match: 'hard|energy|focus|best', tip: 'hard work when you have the most energy' }, { match: 'break|rest|sleep|meal|day off', tip: 'breaks, meals or days off' }, { match: 'limit|cutoff|orders|no', tip: 'a limit such as an order cutoff' }] },
      ],
      model: 'I would cook from 6:00 to 10:00 when I have the most energy, pack orders from 10:00 to 11:30, and do office work and pricing in the afternoon. I would take a meal break at noon, stop taking orders after Wednesday for the weekend, and keep one full day off each week.',
    },
  ],
};

/* ---- Day 4: safety plan, records, complaints, risk --------------------------------------------------------------- */
ACTIVITIES.w7d4 = {
  p1: [
    {
      type: 'match', title: 'Match the hazard to its type',
      options: ['Biological', 'Chemical', 'Physical'],
      rows: [{ label: 'Bacteria or viruses', ans: 0 }, { label: 'Cleaning spray or an unlabeled allergen', ans: 1 }, { label: 'A piece of glass or metal in the food', ans: 2 }],
      why: 'Germs are biological, cleaners and allergens are chemical, and objects such as glass or metal are physical.',
    },
    {
      type: 'order', title: 'Build one line of the safety plan',
      intro: 'Put the parts in order, from first to last.',
      steps: ['Walk through a workflow step', 'Name the hazard', 'Write a control to prevent it', 'Write how you will monitor it', 'Write the corrective action if it fails'],
      why: 'Find the hazard in a step, add a control, decide how to monitor it, and plan what you will do if the control fails.',
    },
  ],
  p2: [
    {
      type: 'choice', title: 'Records',
      items: [
        { q: 'What should a good record include?', opts: ['The date, time, what was checked, the result and who checked it', 'Only the result', 'Only a signature', 'The price of the item'], ans: 0, why: 'Those details make a record useful as proof.' },
        { q: 'You forgot to check the fridge temperature this morning. What should you do?', opts: ['Fill in a number you think it was', 'Write that you forgot and check now', 'Throw out the sheet', 'Skip it'], ans: 1, why: 'Never invent a record. A made-up number hides a real problem.' },
        { q: 'What does tracing mean?', opts: ['Copying a recipe', 'Following a food back to where it came from and forward to where it went', 'Drawing a floor plan', 'Cleaning a spill'], ans: 1, why: 'Batch records support tracing if a supplier reports a problem.' },
        { q: 'Where should you ask how long to keep records?', opts: ['Nowhere, keep none', 'Your local health department and your insurance adviser', 'A random website', 'Your customers'], ans: 1, why: 'Time limits depend on where you are, so ask.' },
      ],
    },
    {
      type: 'match', title: 'Match the record to its purpose',
      options: ['Shows fridges and freezers stayed cold enough', 'Shows what arrived and in what condition', 'Shows what was made, when and from which ingredients', 'Shows what was thrown out and why'],
      rows: [{ label: 'Temperature log', ans: 0 }, { label: 'Receiving log', ans: 1 }, { label: 'Batch record', ans: 2 }, { label: 'Waste log', ans: 3 }],
      why: 'Each record answers a different question about your food.',
    },
  ],
  p3: [
    {
      type: 'order', title: 'Five-step complaint approach',
      steps: ['Listen without arguing', 'Thank them and say you are sorry', 'Ask for the facts', 'Fix it fairly under your written policy', 'Write it down and look for the cause'],
      why: 'Listen, apologize, gather facts, fix it, then record it and find the cause so it does not happen again.',
    },
    {
      type: 'choice', title: 'A safety problem',
      items: [
        { q: 'A customer says they got sick after eating your product. What is the first thing to do about that product?', opts: ['Keep selling while you wait', 'Stop selling it until you understand the problem', 'Tell the customer it was not your food', 'Delete your records'], ans: 1, why: 'Take health complaints seriously and stop selling the product in question.' },
        { q: 'How can your records help during a safety problem?', opts: ['They show which batches and customers could be affected', 'They replace the need to call anyone', 'They make the food safe', 'They are only for taxes'], ans: 0, why: 'Batch records help find who could be affected.' },
        { q: 'Who do you contact to learn what you must report?', opts: ['Nobody', 'Your local health department', 'A competitor', 'Your supplier only'], ans: 1, why: 'Do not guess about legal duties.' },
      ],
    },
  ],
  p4: [
    {
      type: 'fill', title: 'Risk scores (practice numbers)',
      intro: 'Risk score = likelihood x impact, each rated 1 to 3.',
      rows: [
        { label: 'Oven breaks down: likelihood 2, impact 2', unit: 'score', ans: 4 },
        { label: 'A customer gets sick: likelihood 1, impact 3', unit: 'score', ans: 3 },
        { label: 'A supplier is late: likelihood 3, impact 1', unit: 'score', ans: 3 },
      ],
      why: '2 x 2 = 4, 1 x 3 = 3 and 3 x 1 = 3. The oven is the highest score, so plan for it first.',
    },
    {
      type: 'match', title: 'Match the way of handling a risk',
      options: ['Avoid', 'Reduce', 'Share', 'Accept'],
      rows: [{ label: 'Stop selling an item with a high allergy risk', ans: 0 }, { label: 'Add a thermometer check and a log', ans: 1 }, { label: 'Buy insurance', ans: 2 }, { label: 'Live with a small delay from a late supplier', ans: 3 }],
      why: 'Avoid by not doing it, reduce with controls, share through insurance and accept small risks.',
    },
    {
      type: 'reflect', title: 'Your top risk and response',
      prompts: [
        { key: 'risk', label: 'Name the biggest risk to your food business and say how you would handle it.', help: 'Give a likelihood and impact, and use avoid, reduce, share or accept.', items: 1, minWords: 25, rows: 5,
          keywords: [{ match: 'likely|likelihood|chance|unlikely', tip: 'how likely it is' }, { match: 'impact|serious|cost|damage|harm', tip: 'how serious it would be' }, { match: 'avoid|reduce|share|accept|insurance|control', tip: 'avoid, reduce, share or accept' }, { match: 'agent|health department|quote|ask|check', tip: 'who you would ask for advice' }] },
      ],
      model: 'My biggest risk is a customer getting sick from food that was not kept cold. It is not very likely, but the impact would be serious. I would reduce it with a thermometer, a temperature log and a clear rule for throwing food away, and I would ask an insurance agent for quotes to share the risk.',
    },
  ],
};
