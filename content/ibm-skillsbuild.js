// IBM SkillsBuild links supplied by CareerCircle. Every link carries the Culinary Coach tracking tags, so keep the query string as given.
// tools/check-links.py checks each url (200 or 302 passes: SkillsBuild redirects most links to its sign-in page).
(function () {
  const Q = '?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach';
  const B = 'https://skills.yourlearning.ibm.com/';
  window.IBM_SKILLSBUILD = {
    register: { title: 'Register for IBM SkillsBuild', url: B + Q },
    pathway1: [
      { title: 'Lifelong Professional Skills', url: B + 'activity/PLAN-8AF5B141EC32' + Q },
      { title: 'Collaboration', url: B + 'channel/CNL_LCB_1568648534810' + Q },
      { title: 'Job Readiness', url: B + 'activity/PLAN-B1632133A641' + Q },
    ],
  };
})();
