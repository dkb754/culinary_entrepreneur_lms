/* Level II · Week 3 (week 7) quizzes, DRAFT. Every question can be answered from the matching lesson text. */

QUIZ_BANK.w7d1 = {
  title: 'Quiz 23 · Production Systems & Capacity', passPct: 70,
  questions: [
    Q('What is a production workflow?', 'The list of steps your food goes through from order to delivery', ['A list of your suppliers', 'A menu with prices', 'A schedule of days off'], 'A production workflow is the written steps from the order to the customer having the food.'),
    Q('What three things should you write next to each workflow step?', 'How long it takes, what you need, and who does it', ['The price, the color, and the brand', 'The customer, the date, and the weather', 'The recipe, the logo, and the photo'], 'Time, needs and the person doing it show where one person has too many jobs.'),
    Q('What is a bottleneck?', 'The one step slower than all the others that limits how much you can finish', ['The fastest step in your workflow', 'A type of storage container', 'A packaging mistake'], 'Speeding up any other step will not help until the bottleneck improves.'),
    Q('An oven holds 2 trays of 12 muffins. How many muffins come from one bake?', '24', ['12', '14', '48'], '2 trays x 12 muffins = 24.'),
    Q('One cycle takes 35 minutes and you have 240 minutes. How many full cycles fit?', '6', ['7', '8', '5'], '240 / 35 is about 6.86, and only whole cycles count, so 6.'),
    Q('Top capacity is 144 muffins. What is the planning capacity at 80 percent?', 'About 115 muffins', ['About 144 muffins', 'About 64 muffins', 'About 130 muffins'], '144 x 0.80 = 115.2, so plan for about 115.'),
    Q('Why plan for less than your top capacity?', 'To leave room for slow days, mistakes and cleaning', ['Because ovens work worse when full', 'So customers pay less', 'Because the law requires 80 percent'], 'Nothing runs perfectly, so a safe planning number protects you.'),
    Q('Why does batching save time?', 'You set up once, use the tool once and clean up once', ['Food cooks faster in big batches', 'You need fewer ingredients', 'It removes the need to label food'], 'Repeated setup and clean-up is what batching avoids.'),
    Q('An order is picked up Friday at 4:00 pm. How do you build the prep schedule?', 'Work backward from the pickup time', ['Start on Friday and see how it goes', 'Make everything a week early', 'Ask the customer to pick a time'], 'Working backward shows when each step must start.'),
    Q('What is a buffer in a schedule?', 'Extra time you do not plan to use, in case something goes wrong', ['A kind of mixer', 'A discount for early orders', 'A storage shelf'], 'A cushion of about 15 to 25 percent is a good rule of thumb when you are new.'),
    Q('What should you do early about where you can make food for sale?', 'Call your local health department and ask what is allowed', ['Assume any kitchen is allowed', 'Wait for a customer to ask', 'Buy equipment first'], 'Rules differ by location and by what you make.'),
    Q('Which equipment label helps beginners avoid buying too much, too soon?', 'Must have, nice to have, or can borrow or rent', ['Shiny, new, or expensive', 'Big, medium, or small', 'Loud, quiet, or fast'], 'Sorting equipment into those groups keeps spending under control.'),
  ],
};

QUIZ_BANK.w7d2 = {
  title: 'Quiz 24 · Suppliers, Inventory & Waste', passPct: 70,
  questions: [
    Q('What is a supplier?', 'Anyone you buy ingredients or packaging from', ['A customer who orders in bulk', 'A health inspector', 'A kind of recipe'], 'Suppliers include stores, farms, distributors and bakeries.'),
    Q('Supplier A sells 10 lb of flour for $32. What is the price per pound?', '$3.20', ['$3.00', '$2.80', '$32.00'], '$32 divided by 10 lb = $3.20 per lb.'),
    Q('Supplier B sells 25 lb of flour for $70. When is it a good deal?', 'Only if you will use all of it before it goes stale or is damaged', ['Always, because it is bigger', 'Never, because it costs more', 'Only if you buy two bags'], '$2.80 per lb is cheaper, but unused flour is wasted money.'),
    Q('Why have a backup supplier for your key ingredients?', 'Your only source might run out or close', ['Backups are always cheaper', 'The law requires two suppliers', 'It gives you a longer menu'], 'Depending on one supplier is a risk.'),
    Q('What is a par level?', 'The amount you want on hand right after a delivery', ['The price of an item', 'The amount you throw away', 'The number of deliveries per week'], 'When stock drops below par, you order enough to get back up to par.'),
    Q('You use 8 lb of chicken a day, get deliveries every 3 days and keep 4 lb of safety stock. What is the par level?', '28 lb', ['24 lb', '12 lb', '32 lb'], '(8 x 3) + 4 = 28 lb.'),
    Q('Par is 28 lb and you have 10 lb on the shelf. How much should you order?', '18 lb', ['28 lb', '10 lb', '38 lb'], '28 - 10 = 18 lb.'),
    Q('What does FIFO mean?', 'First in, first out', ['Fresh in, freeze out', 'Fast ingredients, fast orders', 'First inspect, final order'], 'The oldest stock is used first so food does not get lost in the back.'),
    Q('Where should ready-to-eat food be stored compared with raw food?', 'Above raw food', ['Below raw food', 'Right next to it, touching', 'It does not matter'], 'This stops raw drips from landing on food that will not be cooked again.'),
    Q('What should a storage label show?', 'What the item is and the date it was received or made', ['Only the price', 'Only the supplier name', 'The customer who will buy it'], 'If you cannot tell what it is or how old it is, you cannot use it safely.'),
    Q('You bought 50 lb of vegetables and threw away 4 lb. What is the waste percent?', '8 percent', ['4 percent', '12 percent', '46 percent'], '4 / 50 x 100 = 8 percent.'),
    Q('4 lb of waste at $3.00 per lb cost how much?', '$12.00', ['$3.00', '$7.00', '$24.00'], '4 x $3.00 = $12.00.'),
    Q('If the same item shows up in your waste log every week, what should you do?', 'Find and fix the cause, such as over-buying or wrong storage', ['Ignore it', 'Stop keeping the log', 'Order more of it'], 'Fix the cause, not only the symptom.'),
  ],
};

QUIZ_BANK.w7d3 = {
  title: 'Quiz 25 · People, Time & Quality', passPct: 70,
  questions: [
    Q('Why list your tasks by role even if you work alone?', 'You wear many hats and the list shows how much work there really is', ['The law requires it', 'To hire staff immediately', 'To make your plan longer'], 'Seeing every role shows the hidden work.'),
    Q('Cooking 14, shopping 3, packing and delivery 5, cleaning 4, selling 4, bookkeeping 2. How many hours is that in total?', '32 hours', ['28 hours', '14 hours', '36 hours'], '14 + 3 + 5 + 4 + 4 + 2 = 32.'),
    Q('In that example, how many hours are not cooking?', '18 hours', ['14 hours', '32 hours', '10 hours'], '32 - 14 = 18.'),
    Q('What should you do before bringing in paid help?', 'Check pay, tax and safety rules with local and state offices or a qualified adviser', ['Just start, and learn the rules later', 'Ask the help to find out the rules', 'Skip the rules for small teams'], 'Rules differ by place, so do not guess.'),
    Q('What is a procedure (SOP)?', 'A short written set of steps for doing a task the same way every time', ['A kind of license', 'A list of customers', 'A recipe cost sheet'], 'SOP stands for standard operating procedure.'),
    Q('How should each step in a checklist start?', 'With a verb, such as wipe or wash', ['With a number of customers', 'With the word maybe', 'With a price'], 'Clear action words make steps easy to follow.'),
    Q('How can you test a checklist?', 'Ask a friend to follow it without your help', ['Read it to yourself once', 'Print it in color', 'Put it away for a year'], 'Places where they get stuck are steps you left out.'),
    Q('What does a standard recipe include?', 'Exact amounts, steps, times, temperatures, yield and portion size', ['Only the ingredient names', 'Only a photo', 'A pinch of this and some of that'], 'Measure instead of guessing.'),
    Q('Why use a fixed-size scoop?', 'It makes every portion nearly the same and keeps cost steady', ['It makes food cook faster', 'It removes the need to taste', 'It makes the recipe secret'], 'Consistent portions give consistent quality and cost.'),
    Q('A cake was dry because it baked too long, because the oven runs hot. What is the best fix?', 'Use an oven thermometer and adjust the time in the written recipe', ['Be more careful next time', 'Stop making cakes', 'Add more flour'], 'Keep asking why until you find the cause, then change the written method.'),
    Q('What is time blocking?', 'Choosing set chunks of the day for set jobs', ['Working without breaks', 'Blocking customers from calling', 'Doing every task at the same time'], 'Group similar tasks and protect those blocks from interruptions.'),
    Q('You make $720 profit in a week and work 36 hours. What is your hourly pay?', '$20 per hour', ['$14.40 per hour', '$25 per hour', '$36 per hour'], '$720 / 36 = $20.'),
    Q('The same $720 profit earned over 50 hours is how much per hour?', '$14.40', ['$20.00', '$16.00', '$10.00'], '$720 / 50 = $14.40.'),
  ],
};

QUIZ_BANK.w7d4 = {
  title: 'Quiz 26 · Safety, Compliance & Risk', passPct: 70,
  questions: [
    Q('What is a hazard?', 'Something that could make a person sick or hurt', ['A kind of discount', 'A type of equipment', 'A customer complaint'], 'Hazards can be biological, chemical or physical.'),
    Q('Which is a chemical hazard?', 'An unlabeled allergen or a cleaning spray', ['Bacteria on a cutting board', 'A piece of glass in food', 'A late delivery'], 'Chemical hazards include cleaners, allergens and pesticides.'),
    Q('Which is a physical hazard?', 'A piece of metal in the food', ['A virus', 'A cleaning spray', 'An allergen'], 'Physical hazards are objects like glass, metal or packaging bits.'),
    Q('What is a control in a safety plan?', 'Something you do to prevent or reduce a hazard', ['A customer survey', 'A price list', 'A sales goal'], 'Examples are handwashing, thermometers and separating raw and ready-to-eat food.'),
    Q('What is a corrective action?', 'What you do if a control is not working', ['A way to advertise', 'A type of insurance', 'A recipe change for taste'], 'For example, keep cooking the food or throw it away.'),
    Q('Where do you learn the rules you must follow where you live?', 'Your food safety training and your local health department', ['Social media', 'Your suppliers only', 'Nowhere, there are none'], 'Your plan should follow their rules, not replace them.'),
    Q('What should a good record include?', 'Date, time, what was checked, the result and who checked it', ['Only your signature', 'Only the price', 'Only the result'], 'Those details make the record useful.'),
    Q('You forgot to check the fridge temperature. What should you do?', 'Write that you forgot and check it now', ['Fill in a number you think it was', 'Skip it and hope', 'Throw away the log'], 'A made-up record is worse than a missing one because it hides a real problem.'),
    Q('What does tracing mean?', 'Following a food back to where it came from and forward to where it went', ['Drawing a floor plan', 'Copying a recipe', 'Cleaning a spill'], 'Batch records make tracing possible.'),
    Q('Which is the first step of the five-step complaint approach?', 'Listen without arguing', ['Offer a refund right away', 'Explain why the customer is wrong', 'Post a reply online'], 'Then thank them, ask for facts, fix it fairly and write it down.'),
    Q('A customer says your product made them sick. What should you do with that product?', 'Stop selling it until you understand the problem', ['Keep selling it', 'Blame the customer', 'Hide the batch records'], 'Take health complaints very seriously.'),
    Q('Risk likelihood 2 and impact 2 gives what risk score?', '4', ['2', '6', '8'], 'Likelihood x impact = 2 x 2 = 4.'),
    Q('Which of these is a way of sharing a risk?', 'Buying insurance', ['Adding a thermometer check', 'Not selling the item', 'Doing nothing about a small risk'], 'The four ways are avoid, reduce, share and accept.'),
    Q('What is a deductible?', 'The part of a loss you pay first', ['The monthly fee for insurance', 'A discount on a premium', 'A tax form'], 'The regular fee is the premium; the deductible is what you pay first.'),
  ],
};
