/* Loaded after every lesson file: attach each day's lesson text (Part 1 and Part 2) to its day. Safe to run twice. */
LEVEL1.days.forEach(d => { if (typeof LESSONS !== 'undefined' && LESSONS[d.id]) d.lesson = LESSONS[d.id]; });
