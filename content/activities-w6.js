/* Level II · Week 2 (week 6) activities. DRAFT. */
ACTIVITIES.w6d1 = {
 "p1": [
  {
   "type": "match",
   "title": "Sort the costs",
   "intro": "Match each cost to its type.",
   "options": [
    "One-time startup cost",
    "Ongoing monthly cost"
   ],
   "rows": [
    {
     "label": "Stand mixer bought before opening",
     "ans": 0
    },
    {
     "label": "Monthly kitchen rental",
     "ans": 1
    },
    {
     "label": "Logo design",
     "ans": 0
    },
    {
     "label": "Monthly insurance",
     "ans": 1
    }
   ],
   "why": "Things you pay once to get ready are startup costs. Things that come back every month are ongoing costs."
  },
  {
   "type": "choice",
   "title": "Check the idea",
   "intro": "Pick the best answer.",
   "items": [
    {
     "q": "Which question helps you decide if a cost is ongoing?",
     "opts": [
      "Will I pay this again next month?",
      "Is it expensive?",
      "Did a friend recommend it?",
      "Is it made of metal?"
     ],
     "ans": 0,
     "why": "If you will pay it again, it is ongoing."
    },
    {
     "q": "Why should you mark each item as a need or a want?",
     "opts": [
      "So you can delay wants if money is tight",
      "So the list looks longer",
      "Because wants are always cheaper",
      "Because laws require it"
     ],
     "ans": 0,
     "why": "Needs come first. Wants can wait."
    },
    {
     "q": "Where do you find real fees for permits and licenses?",
     "opts": [
      "Your local health department or business office",
      "A guess from a friend in another state",
      "The example numbers in the lesson",
      "Social media comments"
     ],
     "ans": 0,
     "why": "Fees differ by place, so ask local offices."
    }
   ]
  },
  {
   "type": "reflect",
   "title": "Sort your own costs",
   "intro": "Think about your own food business idea.",
   "prompts": [
    {
     "key": "sort",
     "label": "List three one-time costs and three ongoing monthly costs for your business, and mark each as a need or a want.",
     "help": "Think equipment, permits, ingredients, rental, insurance.",
     "items": 1,
     "minWords": 20,
     "rows": 5,
     "keywords": [
      {
       "match": "one-time|once|startup",
       "tip": "one-time costs"
      },
      {
       "match": "month|ongoing|recurring",
       "tip": "ongoing costs"
      },
      {
       "match": "need|want",
       "tip": "need or want"
      }
     ]
    }
   ],
   "model": "One-time: a mixer (need), permits (need), a logo (want). Ongoing: kitchen rental (need), insurance (need), software for orders (want). I would delay the logo until I have earned a few sales."
  }
 ],
 "p2": [
  {
   "type": "fill",
   "title": "Add the one-time costs",
   "intro": "EXAMPLE numbers from the lesson: mixer $600, pans and tools $250, food processor $300, permits $400, opening inventory $500, packaging and labels $300, logo and website $350.",
   "rows": [
    {
     "label": "Total one-time costs",
     "unit": "$",
     "ans": 2700
    },
    {
     "label": "Contingency at 10% of one-time costs",
     "unit": "$",
     "ans": 270
    }
   ],
   "why": "600+250+300+400+500+300+350 = 2,700. Ten percent of 2,700 is 270."
  },
  {
   "type": "fill",
   "title": "Fixed monthly costs",
   "intro": "EXAMPLE: kitchen rental $400, insurance $50, phone and software $40.",
   "rows": [
    {
     "label": "Fixed costs per month",
     "unit": "$",
     "ans": 490
    },
    {
     "label": "Fixed costs for 3 months",
     "unit": "$",
     "ans": 1470
    }
   ],
   "why": "400+50+40 = 490. Times 3 is 1,470."
  },
  {
   "type": "choice",
   "title": "Build the list well",
   "intro": "",
   "items": [
    {
     "q": "Why add a contingency to your list?",
     "opts": [
      "Prices change and surprises happen",
      "To make the plan look bigger",
      "Because banks require 10%",
      "To pay yourself"
     ],
     "ans": 0,
     "why": "Contingency is extra money set aside for things you did not expect."
    },
    {
     "q": "A good way to price an equipment item is to",
     "opts": [
      "Check at least two real sellers",
      "Guess",
      "Use the highest price you can find",
      "Skip it"
     ],
     "ans": 0,
     "why": "Look up real prices from more than one seller."
    }
   ]
  }
 ],
 "p3": [
  {
   "type": "match",
   "title": "Match the funding source",
   "intro": "Match each source to its description.",
   "options": [
    "Money you put in yourself",
    "Borrowed money paid back with interest",
    "Money given for a purpose, usually not repaid, with an application",
    "Customers pay first, you buy ingredients after"
   ],
   "rows": [
    {
     "label": "Owner investment",
     "ans": 0
    },
    {
     "label": "Loan",
     "ans": 1
    },
    {
     "label": "Grant",
     "ans": 2
    },
    {
     "label": "Pre-orders",
     "ans": 3
    }
   ],
   "why": "Owner money is your own savings; a loan is repaid with interest; a grant usually is not repaid but has rules; pre-orders bring cash before you buy ingredients."
  },
  {
   "type": "fill",
   "title": "Add up the funding",
   "intro": "EXAMPLE: savings $2,000 and a family loan of $1,500.",
   "rows": [
    {
     "label": "Total funding available",
     "unit": "$",
     "ans": 3500
    },
    {
     "label": "Funding left if you need $4,440",
     "unit": "$",
     "ans": -940
    }
   ],
   "why": "2,000 + 1,500 = 3,500. 3,500 − 4,440 = −940 (a gap of 940)."
  },
  {
   "type": "choice",
   "title": "Funding sense",
   "intro": "",
   "items": [
    {
     "q": "What should you do before borrowing money?",
     "opts": [
      "Work out the monthly payment and see if your plan can handle it",
      "Borrow the biggest amount available",
      "Skip writing anything down",
      "Use money you need for rent"
     ],
     "ans": 0,
     "why": "Check you can afford the payments."
    },
    {
     "q": "Who offers free information and local advisors for small businesses?",
     "opts": [
      "The SBA and local small-business centers",
      "Anyone promising guaranteed funding",
      "Strangers online who ask for a fee first",
      "Nobody"
     ],
     "ans": 0,
     "why": "The SBA is a good place to start. Be careful with promises of guaranteed funding."
    }
   ]
  }
 ],
 "p4": [
  {
   "type": "fill",
   "title": "How much before you open?",
   "intro": "EXAMPLE: one-time costs $2,700, contingency $270, fixed monthly costs $490, cushion of 3 months, funding available $3,500.",
   "rows": [
    {
     "label": "Cash cushion (3 months)",
     "unit": "$",
     "ans": 1470
    },
    {
     "label": "Total needed before opening",
     "unit": "$",
     "ans": 4440
    },
    {
     "label": "Funding gap",
     "unit": "$",
     "ans": 940
    }
   ],
   "why": "490 x 3 = 1,470. 2,700 + 270 + 1,470 = 4,440. 4,440 − 3,500 = 940."
  },
  {
   "type": "fill",
   "title": "Shrink the gap",
   "intro": "Suppose you delay the $350 logo and website. One-time costs fall to $2,350 and contingency is 10% of that.",
   "rows": [
    {
     "label": "New contingency",
     "unit": "$",
     "ans": 235
    },
    {
     "label": "New total needed",
     "unit": "$",
     "ans": 4055
    },
    {
     "label": "New funding gap",
     "unit": "$",
     "ans": 555
    }
   ],
   "why": "2,350 x 0.10 = 235. 2,350 + 235 + 1,470 = 4,055. 4,055 − 3,500 = 555."
  },
  {
   "type": "reflect",
   "title": "Your funding plan",
   "intro": "",
   "prompts": [
    {
     "key": "fund",
     "label": "Write two or three sentences about how much money you think you need before opening, where it could come from, and one way to need less.",
     "help": "Use a number, even if it is a rough one.",
     "items": 1,
     "minWords": 20,
     "rows": 5,
     "keywords": [
      {
       "match": "\\$|dollar|[0-9]",
       "tip": "a specific amount"
      },
      {
       "match": "saving|loan|family|grant|pre-order|crowd",
       "tip": "a funding source"
      },
      {
       "match": "used|delay|smaller|cut|less",
       "tip": "a way to need less"
      }
     ]
    }
   ],
   "model": "I think I need about 4,000 dollars before opening. About 2,500 would come from my savings and the rest from pre-orders. To need less I would buy used equipment and start with a smaller menu."
  }
 ]
};
ACTIVITIES.w6d2 = {
 "p1": [
  {
   "type": "match",
   "title": "Fixed or variable?",
   "intro": "Match each cost.",
   "options": [
    "Fixed cost",
    "Variable cost"
   ],
   "rows": [
    {
     "label": "Monthly kitchen rental",
     "ans": 0
    },
    {
     "label": "Ingredients for each box",
     "ans": 1
    },
    {
     "label": "Insurance",
     "ans": 0
    },
    {
     "label": "Packaging per order",
     "ans": 1
    }
   ],
   "why": "Fixed costs are owed even with zero sales. Variable costs rise and fall with each sale."
  },
  {
   "type": "fill",
   "title": "Cost per box",
   "intro": "EXAMPLE: price $20; ingredients $6 and packaging $2 per box; fixed costs $400 + $50 + $40 + $110 per month.",
   "rows": [
    {
     "label": "Variable cost per box",
     "unit": "$",
     "ans": 8
    },
    {
     "label": "Fixed costs per month",
     "unit": "$",
     "ans": 600
    },
    {
     "label": "Food cost percent (ingredients ÷ price)",
     "unit": "%",
     "ans": 30
    }
   ],
   "why": "6+2 = 8. 400+50+40+110 = 600. 6 ÷ 20 = 0.30 = 30%."
  },
  {
   "type": "choice",
   "title": "Check the idea",
   "intro": "",
   "items": [
    {
     "q": "Which question tells you a cost is fixed?",
     "opts": [
      "If I sell nothing, do I still pay it?",
      "Is it big?",
      "Does it come from a store?",
      "Do I like it?"
     ],
     "ans": 0,
     "why": "Fixed costs are owed even with zero sales."
    },
    {
     "q": "Packaging for each order is usually",
     "opts": [
      "A variable cost",
      "A fixed cost",
      "A permit",
      "Profit"
     ],
     "ans": 0,
     "why": "It rises and falls with each sale."
    }
   ]
  }
 ],
 "p2": [
  {
   "type": "fill",
   "title": "Margin per box",
   "intro": "EXAMPLE: price $20, variable cost $8.",
   "rows": [
    {
     "label": "Margin per box",
     "unit": "$",
     "ans": 12
    },
    {
     "label": "Margin percent",
     "unit": "%",
     "ans": 60
    },
    {
     "label": "Markup percent (margin ÷ cost)",
     "unit": "%",
     "ans": 150
    }
   ],
   "why": "20 − 8 = 12. 12 ÷ 20 = 60%. 12 ÷ 8 = 1.5 = 150%."
  },
  {
   "type": "fill",
   "title": "Price from a food cost target",
   "intro": "Ingredients cost $6 and you want food cost to be 30%.",
   "rows": [
    {
     "label": "Price (ingredients ÷ 0.30)",
     "unit": "$",
     "ans": 20
    },
    {
     "label": "Margin if packaging is $2 more",
     "unit": "$",
     "ans": 12
    }
   ],
   "why": "6 ÷ 0.30 = 20. Variable cost is 6+2 = 8, so margin is 20 − 8 = 12."
  },
  {
   "type": "choice",
   "title": "Margin sense",
   "intro": "",
   "items": [
    {
     "q": "Is margin the same as profit?",
     "opts": [
      "No, fixed costs have not been paid yet",
      "Yes, always",
      "Only on Sundays",
      "Only for drinks"
     ],
     "ans": 0,
     "why": "Margin must first cover fixed costs. What is left after that is profit."
    },
    {
     "q": "A price below your variable cost means",
     "opts": [
      "You lose money on every sale",
      "You will break even",
      "You earn a big margin",
      "Fixed costs disappear"
     ],
     "ans": 0,
     "why": "You lose money with each item sold."
    }
   ]
  }
 ],
 "p3": [
  {
   "type": "fill",
   "title": "Find break-even",
   "intro": "EXAMPLE: fixed costs $600 a month, margin $12 per box, price $20.",
   "rows": [
    {
     "label": "Break-even boxes per month",
     "unit": "boxes",
     "ans": 50
    },
    {
     "label": "Break-even sales in dollars",
     "unit": "$",
     "ans": 1000
    },
    {
     "label": "Boxes needed for $300 profit",
     "unit": "boxes",
     "ans": 75
    }
   ],
   "why": "600 ÷ 12 = 50. 50 x 20 = 1,000. (600+300) ÷ 12 = 75."
  },
  {
   "type": "fill",
   "title": "When costs rise",
   "intro": "Ingredients rise to $7, so variable cost is $9 and margin is $11. Fixed costs stay $600.",
   "rows": [
    {
     "label": "New margin per box",
     "unit": "$",
     "ans": 11
    },
    {
     "label": "Break-even boxes (round up)",
     "unit": "boxes",
     "ans": 55
    }
   ],
   "why": "20−9 = 11. 600 ÷ 11 = 54.5, rounded up is 55."
  },
  {
   "type": "order",
   "title": "Steps to find break-even",
   "intro": "Put them in order.",
   "steps": [
    "List the fixed costs for one month",
    "Work out the variable cost of one item",
    "Subtract variable cost from price to get the margin",
    "Divide fixed costs by the margin",
    "Compare the answer with what you can really make and sell"
   ],
   "why": "Fixed costs and variable cost first, then margin, then the division, then a reality check."
  }
 ],
 "p4": [
  {
   "type": "fill",
   "title": "Test a second product",
   "intro": "EXAMPLE: a dozen cookies priced at $12. Ingredients $4.20 and packaging $1.20 per dozen.",
   "rows": [
    {
     "label": "Variable cost per dozen",
     "unit": "$",
     "ans": 5.4,
     "tol": 0.01
    },
    {
     "label": "Margin per dozen",
     "unit": "$",
     "ans": 6.6,
     "tol": 0.01
    },
    {
     "label": "Margin percent",
     "unit": "%",
     "ans": 55,
     "tol": 0.5
    }
   ],
   "why": "4.20+1.20 = 5.40. 12 − 5.40 = 6.60. 6.60 ÷ 12 = 0.55 = 55%."
  },
  {
   "type": "order",
   "title": "Four-step price check",
   "intro": "Put the check in order.",
   "steps": [
    "List the full variable cost of one item",
    "Subtract it from the price to find the margin",
    "Divide fixed costs by the margin to find break-even",
    "Compare your price with similar products nearby"
   ],
   "why": "The lesson order: cost, margin, break-even, then market comparison."
  },
  {
   "type": "reflect",
   "title": "Check your own price",
   "intro": "",
   "prompts": [
    {
     "key": "price",
     "label": "Pick one product you would sell. Write its price, its full variable cost and its margin, and say whether the price feels right.",
     "help": "Include packaging and fees.",
     "items": 1,
     "minWords": 20,
     "rows": 5,
     "keywords": [
      {
       "match": "price|\\$",
       "tip": "price"
      },
      {
       "match": "cost|ingredient|packag",
       "tip": "variable cost"
      },
      {
       "match": "margin|left|profit",
       "tip": "margin"
      }
     ]
    }
   ],
   "model": "My product is a box of granola sold for 12 dollars. Ingredients cost 4 and packaging costs 1.50, so my margin is 6.50 dollars. That feels fair compared with similar products near me."
  }
 ]
};
ACTIVITIES.w6d3 = {
 "p1": [
  {
   "type": "fill",
   "title": "Build a forecast",
   "intro": "EXAMPLE: 25 regular customers, each orders 2 times a month, one $20 box per order.",
   "rows": [
    {
     "label": "Orders per month",
     "unit": "orders",
     "ans": 50
    },
    {
     "label": "Sales per month",
     "unit": "$",
     "ans": 1000
    }
   ],
   "why": "25 x 2 = 50. 50 x 20 = 1,000."
  },
  {
   "type": "choice",
   "title": "Forecast sense",
   "intro": "",
   "items": [
    {
     "q": "What is a sales forecast?",
     "opts": [
      "An organized estimate of future sales",
      "A promise to the bank",
      "Last year's receipts",
      "A price list"
     ],
     "ans": 0,
     "why": "A forecast is a best estimate based on facts."
    },
    {
     "q": "Why make a low, expected and high case?",
     "opts": [
      "To test whether you can survive if sales are slow",
      "To make the plan longer",
      "Because the SBA requires it",
      "To raise prices"
     ],
     "ans": 0,
     "why": "The low case shows if you can survive a slow start."
    },
    {
     "q": "A forecast above your capacity is",
     "opts": [
      "Not useful, since you cannot make that much",
      "Always best",
      "Required",
      "Free"
     ],
     "ans": 0,
     "why": "Capacity is the most you can make."
    }
   ]
  }
 ],
 "p2": [
  {
   "type": "fill",
   "title": "Seasonal totals",
   "intro": "EXAMPLE: October 80 boxes, November 100, December 120, price $20.",
   "rows": [
    {
     "label": "Boxes in the 3 months",
     "unit": "boxes",
     "ans": 300
    },
    {
     "label": "Sales in the 3 months",
     "unit": "$",
     "ans": 6000
    }
   ],
   "why": "80+100+120 = 300. 300 x 20 = 6,000."
  },
  {
   "type": "fill",
   "title": "A slow month",
   "intro": "EXAMPLE: 40 boxes in a slow month, margin $12 a box, fixed costs $600.",
   "rows": [
    {
     "label": "Total margin in the month",
     "unit": "$",
     "ans": 480
    },
    {
     "label": "Profit (negative means loss)",
     "unit": "$",
     "ans": -120
    }
   ],
   "why": "40 x 12 = 480. 480 − 600 = −120."
  },
  {
   "type": "choice",
   "title": "Seasons",
   "intro": "",
   "items": [
    {
     "q": "Which is a good way to handle a slow season?",
     "opts": [
      "Save part of busy-season earnings",
      "Spend all busy-season earnings",
      "Ignore it",
      "Raise rent"
     ],
     "ans": 0,
     "why": "Saving busy-season earnings helps pay slow-month bills."
    },
    {
     "q": "Which is an example of a seasonal pattern?",
     "opts": [
      "Gift boxes selling more in winter",
      "Rent changing daily",
      "Taxes vanishing",
      "Flour never changing price"
     ],
     "ans": 0,
     "why": "Holidays and weather change when people buy."
    }
   ]
  }
 ],
 "p3": [
  {
   "type": "match",
   "title": "Why cash and profit differ",
   "intro": "Match each situation to the reason.",
   "options": [
    "Timing of payment",
    "Buying ahead",
    "Big one-time purchase",
    "Loan payment"
   ],
   "rows": [
    {
     "label": "Customer pays 30 days after catering",
     "ans": 0
    },
    {
     "label": "September ingredients for December sales",
     "ans": 1
    },
    {
     "label": "Paying $600 for a mixer today",
     "ans": 2
    },
    {
     "label": "Paying back part of a loan",
     "ans": 3
    }
   ],
   "why": "Each one moves cash at a different time than profit shows up."
  },
  {
   "type": "fill",
   "title": "September cash",
   "intro": "EXAMPLE: you spend $900 on holiday stock and sell $600 in September, ignoring other costs.",
   "rows": [
    {
     "label": "Change in cash in September",
     "unit": "$",
     "ans": -300
    },
    {
     "label": "Cash left if you started September with $1,000",
     "unit": "$",
     "ans": 700
    }
   ],
   "why": "600 − 900 = −300. 1,000 − 300 = 700."
  },
  {
   "type": "choice",
   "title": "Protect your cash",
   "intro": "",
   "items": [
    {
     "q": "Which action helps protect cash?",
     "opts": [
      "Ask customers for a deposit",
      "Buy far more stock than you can sell soon",
      "Wait to send invoices",
      "Mix personal and business money"
     ],
     "ans": 0,
     "why": "Deposits bring cash in earlier."
    },
    {
     "q": "Why can a profitable plan still run out of cash?",
     "opts": [
      "Costs are paid before customers pay",
      "Profit is the same as cash",
      "Sales are free",
      "Interest is a grant"
     ],
     "ans": 0,
     "why": "Timing moves cash separately from profit."
    }
   ]
  }
 ],
 "p4": [
  {
   "type": "fill",
   "title": "Ending cash",
   "intro": "EXAMPLE: Month 1 opening $1,000, cash in $1,600, cash out $1,900. Month 2 cash in $2,000, cash out $1,800. Month 3 cash in $1,200, cash out $1,700.",
   "rows": [
    {
     "label": "Ending cash, month 1",
     "unit": "$",
     "ans": 700
    },
    {
     "label": "Ending cash, month 2",
     "unit": "$",
     "ans": 900
    },
    {
     "label": "Ending cash, month 3",
     "unit": "$",
     "ans": 400
    }
   ],
   "why": "1,000+1,600−1,900 = 700. 700+2,000−1,800 = 900. 900+1,200−1,700 = 400."
  },
  {
   "type": "order",
   "title": "Build a cash plan",
   "intro": "Put the steps in order.",
   "steps": [
    "Start with opening cash from the funding plan",
    "Enter expected cash in for each month",
    "Enter expected cash out for each month",
    "Calculate ending cash for every month",
    "Find the lowest cash point and test a low-sales case"
   ],
   "why": "Opening cash, in, out, ending cash, then check the low point."
  },
  {
   "type": "reflect",
   "title": "Your slow months",
   "intro": "",
   "prompts": [
    {
     "key": "slow",
     "label": "Write two or three sentences about which months might be slow for your business and what you would do to protect your cash.",
     "help": "Think about holidays, weather and school calendars.",
     "items": 1,
     "minWords": 20,
     "rows": 5,
     "keywords": [
      {
       "match": "slow|low|dip",
       "tip": "slow months"
      },
      {
       "match": "save|deposit|pre-order|cut|lower|product",
       "tip": "a protective action"
      },
      {
       "match": "month|season|winter|summer|holiday",
       "tip": "a season"
      }
     ]
    }
   ],
   "model": "January and February might be slow because people spend less after the holidays. I would save some of my December earnings and offer pre-order deals to bring cash in early."
  }
 ]
};
ACTIVITIES.w6d4 = {
 "p1": [
  {
   "type": "fill",
   "title": "First-year estimate",
   "intro": "EXAMPLE: 50 boxes a month for 12 months, price $20, variable cost $8, fixed costs $490 a month.",
   "rows": [
    {
     "label": "Boxes sold in the year",
     "unit": "boxes",
     "ans": 600
    },
    {
     "label": "Sales for the year",
     "unit": "$",
     "ans": 12000
    },
    {
     "label": "Margin for the year",
     "unit": "$",
     "ans": 7200
    },
    {
     "label": "Profit for the year",
     "unit": "$",
     "ans": 1320
    }
   ],
   "why": "50 x 12 = 600. 600 x 20 = 12,000. 600 x 12 = 7,200. Fixed costs are 490 x 12 = 5,880, so 7,200 − 5,880 = 1,320."
  },
  {
   "type": "fill",
   "title": "Payback",
   "intro": "Monthly profit is 1,320 ÷ 12. Startup money needed was $4,440.",
   "rows": [
    {
     "label": "Monthly profit",
     "unit": "$",
     "ans": 110
    },
    {
     "label": "Months to earn back startup money (to the nearest month)",
     "unit": "months",
     "ans": 40,
     "tol": 0.5
    }
   ],
   "why": "1,320 ÷ 12 = 110. 4,440 ÷ 110 = 40.4, about 40 months."
  },
  {
   "type": "choice",
   "title": "Check the idea",
   "intro": "",
   "items": [
    {
     "q": "Why must numbers match across sections of the plan?",
     "opts": [
      "Mismatched numbers make a reader doubt the plan",
      "It is pretty",
      "The bank counts words",
      "They do not need to"
     ],
     "ans": 0,
     "why": "Use the same numbers everywhere."
    },
    {
     "q": "Sales minus variable costs equals",
     "opts": [
      "Margin",
      "Cash",
      "Fixed cost",
      "Interest"
     ],
     "ans": 0,
     "why": "Margin minus fixed costs then gives profit."
    }
   ]
  }
 ],
 "p2": [
  {
   "type": "fill",
   "title": "Break-even and a bad case",
   "intro": "EXAMPLE: fixed costs $490 a month, margin $12 a box.",
   "rows": [
    {
     "label": "Break-even boxes (round up)",
     "unit": "boxes",
     "ans": 41
    },
    {
     "label": "Boxes if sales fall 20% from 50",
     "unit": "boxes",
     "ans": 40
    },
    {
     "label": "Monthly profit at 40 boxes (negative means loss)",
     "unit": "$",
     "ans": -10
    }
   ],
   "why": "490 ÷ 12 = 40.8, round up to 41. 50 x 0.80 = 40. 40 x 12 = 480, and 480 − 490 = −10."
  },
  {
   "type": "choice",
   "title": "Sanity checks",
   "intro": "",
   "items": [
    {
     "q": "What is an assumption?",
     "opts": [
      "Something you believe but have not proven",
      "A tax rule",
      "A fixed cost",
      "A loan"
     ],
     "ans": 0,
     "why": "Write assumptions down and say how you will test them."
    },
    {
     "q": "If the lowest month of cash is below zero, you should",
     "opts": [
      "Add cash, lower costs or delay purchases",
      "Ignore it",
      "Raise your forecast",
      "Skip the plan"
     ],
     "ans": 0,
     "why": "A negative cash month means you could not pay bills, so fix it in the plan."
    },
    {
     "q": "Ending cash equals",
     "opts": [
      "Opening cash + cash in − cash out",
      "Cash in − opening cash",
      "Profit + rent",
      "Sales ÷ cost"
     ],
     "ans": 0,
     "why": "This formula applies to every month."
    }
   ]
  }
 ],
 "p3": [
  {
   "type": "match",
   "title": "Mistake and fix",
   "intro": "Match each mistake to its fix.",
   "options": [
    "Calculate margin for every product",
    "Include pay for yourself in the plan",
    "Plan a low, expected and high case",
    "Track cash every week"
   ],
   "rows": [
    {
     "label": "Pricing from guesswork",
     "ans": 0
    },
    {
     "label": "Counting your own time as free",
     "ans": 1
    },
    {
     "label": "Over-optimistic forecasts",
     "ans": 2
    },
    {
     "label": "Mixing up profit and cash",
     "ans": 3
    }
   ],
   "why": "Each fix comes from a tool you learned this week."
  },
  {
   "type": "choice",
   "title": "Money mistakes",
   "intro": "",
   "items": [
    {
     "q": "Why use a separate bank account for the business?",
     "opts": [
      "It keeps records cleaner and easier to understand",
      "It is always required by law everywhere",
      "It earns more interest",
      "It removes taxes"
     ],
     "ans": 0,
     "why": "The lesson says to ask an accountant or advisor what is right for your setup."
    },
    {
     "q": "Copying a competitor's price is risky because",
     "opts": [
      "Their costs may be much lower than yours",
      "Prices are secret",
      "It is illegal",
      "Customers dislike it"
     ],
     "ans": 0,
     "why": "Use their price as information, not a rule."
    }
   ]
  }
 ],
 "p4": [
  {
   "type": "order",
   "title": "Finish your plan",
   "intro": "Put the steps in order.",
   "steps": [
    "Write the financial plan section",
    "Make your tables clean and labeled",
    "Check numbers against the other sections",
    "Write the risks and next steps honestly",
    "Write or update the one-page summary last",
    "Proofread and combine the sections into one document"
   ],
   "why": "Build the financial section, clean it, cross-check, write risks, write the summary last, then proofread and combine."
  },
  {
   "type": "match",
   "title": "Plan sections",
   "intro": "Match each section to its content.",
   "options": [
    "What you sell, to whom, how much money you need",
    "Prices matching the financial plan",
    "Capacity that matches the forecast",
    "Biggest money risks and next actions"
   ],
   "rows": [
    {
     "label": "Summary",
     "ans": 0
    },
    {
     "label": "Menu and pricing",
     "ans": 1
    },
    {
     "label": "Operations",
     "ans": 2
    },
    {
     "label": "Risks and next steps",
     "ans": 3
    }
   ],
   "why": "Each section must agree with the numbers in the financial plan."
  },
  {
   "type": "reflect",
   "title": "Your next three actions",
   "intro": "",
   "prompts": [
    {
     "key": "next",
     "label": "List the next three actions you will take after finishing your Business Plan, and one money risk you will watch.",
     "help": "Be specific.",
     "items": 1,
     "minWords": 20,
     "rows": 5,
     "keywords": [
      {
       "match": "action|next|will|first",
       "tip": "specific actions"
      },
      {
       "match": "risk|slow|cost|cash",
       "tip": "a money risk"
      },
      {
       "match": "check|ask|call|advisor|accountant|SBA",
       "tip": "getting local advice"
      }
     ]
    }
   ],
   "model": "First I will call my local health department about permits. Second I will ask an accountant about setup. Third I will run a small pre-order test. The money risk I will watch is slow sales in winter."
  }
 ]
};
