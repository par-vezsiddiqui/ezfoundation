/* =========================================
  Shared UI utilities
========================================= */
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
const siteLoader = document.getElementById('siteLoader');
function hideSiteLoader() {
  window.setTimeout(() => siteLoader?.classList.add('is-hidden'), 350);
}
window.addEventListener('load', hideSiteLoader, { once: true });
window.setTimeout(hideSiteLoader, 1500);

/* =========================================
   Reading progress
========================================= */
const readingProgress = document.querySelector('.reading-progress');
const readingProgressBar = document.querySelector('.reading-progress-bar');
function updateReadingProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollableHeight > 0 ? Math.round((window.scrollY / scrollableHeight) * 100) : 0;
  readingProgressBar.style.width = `${percentage}%`;
  readingProgress.setAttribute('aria-valuenow', String(percentage));
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();
let toastTimer;
function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =========================================
  Launch content and public-facing copy
========================================= */
function renderLaunchState() {
  document.title = 'ez Foundation | Find support for education and work';
  const heroTitle = document.querySelector('.hero h1');
  const heroLead = document.querySelector('.hero-lead');
  const howTitle = document.querySelector('.how h2');
  const howLead = document.querySelector('.section-heading > p');
  const exploreTitle = document.querySelector('.explore-heading h2');
  const exploreLead = document.querySelector('.explore-heading > p');
  const assessmentTitle = document.querySelector('.assessment h2');
  const assessmentLead = document.querySelector('.assessment-copy > p');
  const missionTitle = document.querySelector('.mission h2');
  const missionLead = document.querySelector('.mission-lead');
  const footerIntro = document.querySelector('.footer-top > div:first-child');
  if (heroTitle) heroTitle.innerHTML = 'Find the support that helps you <em>move forward.</em>';
  if (heroLead) heroLead.textContent = 'ez Foundation helps students and early-career learners find scholarships, training, mentors, internships, and first-job opportunities in one clear place.';
  if (!document.querySelector('.purpose-note') && heroLead) {
    const purposeNote = document.createElement('div');
    purposeNote.className = 'purpose-note';
    purposeNote.innerHTML = '<div aria-hidden="true">✦</div><div><strong>Free for every user</strong><span>We do not charge users directly. We connect people with support from leading NGOs and community partners.</span></div>';
    heroLead.after(purposeNote);
  }
  if (howTitle) howTitle.innerHTML = 'A clear path to your next <em>education or work opportunity.</em>';
  if (howLead) howLead.textContent = 'Tell us where you are, choose the support you need, and get practical opportunities that fit your goals.';
  if (exploreTitle) exploreTitle.innerHTML = 'Find support for your <em>next step.</em>';
  if (exploreLead) exploreLead.textContent = 'Search one place for verified scholarships, training, internships, jobs, and people who can guide you.';
  if (assessmentTitle) assessmentTitle.innerHTML = 'Tell us what you need to <em>move ahead.</em>';
  if (assessmentLead) assessmentLead.textContent = 'Answer a few simple questions so we can point you toward relevant support, opportunities, and guidance.';
  if (missionTitle) missionTitle.innerHTML = 'We help people build a <em>stronger future.</em>';
  if (missionLead) missionLead.textContent = 'ez Foundation exists to make education and work opportunities easier to find, understand, and act on, with support from leading NGOs and community partners.';
  if (footerIntro) {
    const footerDescription = footerIntro.querySelector('p');
    if (footerDescription) footerDescription.textContent = 'Free support for education and work, connected with trusted NGO and community partners.';
    if (!footerIntro.querySelector('.footer-note')) { const note = document.createElement('span'); note.className = 'footer-note'; note.textContent = 'No direct charges for users.'; footerIntro.append(note); }
  }
  document.querySelectorAll('[data-action="assessment"]').forEach((button) => { button.innerHTML = 'Find my next step <span>→</span>'; });
  document.querySelectorAll('[data-action="explore"]').forEach((button) => { button.innerHTML = 'Find opportunities <span>↗</span>'; });
  const trust = document.querySelector('.hero-trust');
  if (trust) trust.innerHTML = '<div class="avatar-stack"><span>e</span><span>+</span><span>you</span></div><span><strong>Starting small, growing together</strong> with our first learners</span>';
  const stats = document.querySelectorAll('.impact-strip .stat');
  [['0', 'Students connected'], ['0', 'Verified organizations'], ['1', 'Live opportunity'], ['0', 'Mentors ready to help']].forEach(([value, label], index) => {
    if (stats[index]) { stats[index].querySelector('strong').textContent = value; stats[index].querySelector('span').textContent = label; }
  });
  const profileName = document.querySelector('.profile-snippet strong');
  if (profileName) profileName.textContent = 'Your profile';
  const welcome = document.querySelector('.welcome-row h3');
  if (welcome) welcome.innerHTML = 'Welcome to your dashboard';
  const metrics = document.querySelectorAll('.metric-card strong');
  if (metrics.length >= 3) { metrics[0].textContent = '0%'; metrics[1].textContent = '0'; metrics[2].textContent = '0'; }
  document.querySelectorAll('.profile-completion').forEach((element) => { element.textContent = '0%'; });
}
renderLaunchState();

/* =========================================
  Accessibility enhancements
========================================= */
function enhanceAccessibility() {
  const searchInput = document.getElementById('opportunitySearch');
  if (searchInput) { searchInput.setAttribute('aria-label', 'Search opportunities'); searchInput.setAttribute('type', 'search'); }
  if (goalInput) goalInput.setAttribute('aria-label', 'Tell us what you would like to become');
  document.querySelectorAll('.save-button').forEach((button) => { button.setAttribute('aria-label', 'Save opportunity'); button.setAttribute('aria-pressed', 'false'); });
  document.querySelectorAll('.filter').forEach((button) => button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false'));
  document.querySelectorAll('.choice').forEach((choice) => choice.setAttribute('aria-pressed', choice.classList.contains('selected') ? 'true' : 'false'));
  document.querySelectorAll('.side-link').forEach((link) => { link.setAttribute('role', 'button'); link.setAttribute('tabindex', '0'); link.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); link.click(); } }); });
  const progress = document.getElementById('assessmentProgress');
  if (progress) { progress.parentElement.setAttribute('role', 'progressbar'); progress.parentElement.setAttribute('aria-valuemin', '0'); progress.parentElement.setAttribute('aria-valuemax', '100'); progress.parentElement.setAttribute('aria-valuenow', '25'); progress.parentElement.setAttribute('aria-label', 'Assessment progress'); }
}

/* =========================================
  Opportunity discovery
========================================= */
document.querySelectorAll('[data-action="assessment"]').forEach((button) => button.addEventListener('click', () => document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' })));
document.querySelectorAll('[data-action="explore"]').forEach((button) => button.addEventListener('click', () => document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' })));
document.querySelectorAll('.save-button').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.explore-card');
  if (!card) {
    const saved = button.textContent === '♡';
    button.textContent = saved ? '♥' : '♡';
    button.style.color = saved ? '#ef806b' : '';
    button.setAttribute('aria-label', saved ? 'Remove saved opportunity' : 'Save opportunity');
    button.setAttribute('aria-pressed', String(saved));
    showToast(saved ? 'Saved to your opportunities.' : 'Removed from saved opportunities.');
    return;
  }
  const opportunityId = getOpportunityId(card);
  const saved = !savedOpportunityIds.has(opportunityId);
  if (saved) savedOpportunityIds.add(opportunityId); else savedOpportunityIds.delete(opportunityId);
  saveSavedOpportunities();
  button.textContent = saved ? '♥' : '♡';
  button.style.color = saved ? '#ef806b' : '';
  button.setAttribute('aria-label', saved ? 'Remove saved opportunity' : 'Save opportunity');
  button.setAttribute('aria-pressed', String(saved));
  showToast(saved ? 'Saved to your opportunities.' : 'Removed from saved opportunities.');
  renderDashboard();
}));
const search = document.getElementById('opportunitySearch');
const cards = [...document.querySelectorAll('.explore-card')];
const savedOpportunityIds = new Set(JSON.parse(localStorage.getItem('ezSavedOpportunities') || '[]'));
function getOpportunityId(card) { return card.querySelector('h3')?.textContent.trim() || card.dataset.search; }
function saveSavedOpportunities() { localStorage.setItem('ezSavedOpportunities', JSON.stringify([...savedOpportunityIds])); }
cards.forEach((card) => {
  const button = card.querySelector('.save-button');
  if (savedOpportunityIds.has(getOpportunityId(card)) && button) {
    button.textContent = '♥';
    button.style.color = '#ef806b';
    button.setAttribute('aria-label', 'Remove saved opportunity');
    button.setAttribute('aria-pressed', 'true');
  }
});
const emptySearch = document.getElementById('emptySearch');
const searchButton = search.closest('.search-bar').querySelector('button');
let activeFilter = 'all';
function renderOpportunities() {
  const query = search.value.toLowerCase().trim();
  let visible = 0;
  cards.forEach((card) => {
    const matchesQuery = !query || card.dataset.search.includes(query);
    const matchesFilter = activeFilter === 'all' || card.dataset.search.includes(activeFilter);
    const isVisible = matchesQuery && matchesFilter;
    card.hidden = !isVisible;
    if (isVisible) visible += 1;
  });
  emptySearch.style.display = visible ? 'none' : 'block';
}
search.addEventListener('input', renderOpportunities);
searchButton.addEventListener('click', () => { renderOpportunities(); document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' }); });
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.filter').forEach((item) => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
  const filterKey = button.textContent.trim().split(' ')[0].toLowerCase();
  activeFilter = button.classList.contains('filter-more') || filterKey === 'all' ? 'all' : filterKey.replace(/s$/, '');
  renderOpportunities();
  showToast(`${button.textContent.replace('＋ ', '')} filter selected.`);
}));

/* =========================================
  Profile intake and persistence
========================================= */
let assessmentStep = 1;
const profileConsentKey = 'ezProfileConsent';
let hasProfileConsent = localStorage.getItem(profileConsentKey) === 'true';
const assessmentAnswers = hasProfileConsent ? JSON.parse(localStorage.getItem('ezProfile') || '{}') : {};
const goalInput = document.querySelector('.assessment-question[data-step="4"] .text-input');
const assessmentPanel = document.querySelector('.assessment-panel');
const consentNotice = document.createElement('div');
consentNotice.className = 'privacy-consent';
consentNotice.innerHTML = '<label><input type="checkbox" id="profileConsent" /> <span><strong>Use my information to personalize support</strong><small>We will use your answers to suggest relevant funding, residential programs, training, mentors, internships, and jobs. You can delete your profile anytime.</small></span></label>';
assessmentPanel?.prepend(consentNotice);
const consentCheckbox = document.getElementById('profileConsent');
if (consentCheckbox) consentCheckbox.checked = hasProfileConsent;
function updateConsentState() {
  hasProfileConsent = Boolean(consentCheckbox?.checked);
  document.querySelectorAll('.assessment-question .choice, .assessment-question .text-input, #assessmentNext').forEach((control) => { control.disabled = !hasProfileConsent; });
  if (!hasProfileConsent) { Object.keys(assessmentAnswers).forEach((key) => delete assessmentAnswers[key]); renderDashboard(); }
}
consentCheckbox?.addEventListener('change', () => {
  if (consentCheckbox.checked) localStorage.setItem(profileConsentKey, 'true');
  else { localStorage.removeItem(profileConsentKey); localStorage.removeItem('ezProfile'); }
  updateConsentState();
});
if (goalInput && assessmentAnswers[4]) goalInput.value = assessmentAnswers[4][0] || '';
Object.entries(assessmentAnswers).forEach(([step, answers]) => {
  const question = document.querySelector(`.assessment-question[data-step="${step}"]`);
  if (!question || !Array.isArray(answers)) return;
  question.querySelectorAll('.choice').forEach((choice) => {
    const selected = answers.includes(choice.textContent.trim());
    choice.classList.toggle('selected', selected);
    choice.setAttribute('aria-pressed', String(selected));
  });
});
enhanceAccessibility();
updateConsentState();
function saveProfile() { localStorage.setItem('ezProfile', JSON.stringify(assessmentAnswers)); }

/* =========================================
  Dashboard state
========================================= */
function renderDashboard() {
  const completedSteps = Object.values(assessmentAnswers).filter((answers) => Array.isArray(answers) && answers.length > 0).length;
  const completion = Math.min(100, completedSteps * 25);
  const interests = assessmentAnswers[2] || [];
  const support = assessmentAnswers[3]?.[0] || '';
  const savedCount = savedOpportunityIds.size;
  const matchCount = interests.length || support ? Math.max(1, Math.min(cards.length, interests.length + (support ? 1 : 0))) : 0;
  const profileName = document.querySelector('.profile-snippet strong');
  const avatar = document.querySelector('.profile-avatar');
  const welcome = document.querySelector('.welcome-row h3');
  const welcomeCopy = document.querySelector('.welcome-row p');
  const profileStrength = document.querySelector('.profile-snippet span b');
  const profileRing = document.querySelector('.profile-ring');
  const metrics = document.querySelectorAll('.metric-card strong');
  const metricLabels = document.querySelectorAll('.metric-card small');
  const progress = document.querySelector('.metric-card .progress i');
  const notes = document.querySelectorAll('.metric-note');
  const recommendation = document.querySelector('.recommendation-head p');
  const recommendationCount = document.querySelector('.recommendation-head .tiny-pill');
  if (profileName) profileName.textContent = completedSteps ? 'Your profile' : 'Your new profile';
  if (avatar) avatar.textContent = completedSteps ? 'YO' : '?';
  if (welcome) welcome.innerHTML = completedSteps ? 'Your dashboard is taking shape' : 'Welcome to your dashboard';
  if (welcomeCopy) welcomeCopy.textContent = completedSteps ? 'Here is what we have learned about your next step.' : 'Complete your profile to unlock useful recommendations.';
  if (profileStrength) profileStrength.textContent = `${completion}%`;
  if (profileRing) profileRing.textContent = completion;
  if (metrics[0]) metrics[0].textContent = `${completion}%`;
  if (metrics[1]) metrics[1].textContent = matchCount;
  if (metrics[2]) metrics[2].textContent = savedCount;
  if (metricLabels[2]) metricLabels[2].textContent = 'Saved opportunities';
  if (progress) progress.style.width = `${completion}%`;
  if (notes[0]) notes[0].textContent = completion < 100 ? `${4 - completedSteps} steps remaining` : 'Profile complete';
  if (notes[1]) notes[1].textContent = matchCount ? 'Based on your answers' : 'Complete assessment to match';
  if (notes[2]) notes[2].textContent = savedCount ? 'Ready to revisit' : 'Nothing saved yet';
  if (recommendationCount) recommendationCount.textContent = `${matchCount} match${matchCount === 1 ? '' : 'es'}`;
  if (recommendation) recommendation.textContent = interests.length ? `Based on your interests in ${interests.join(' and ').toLowerCase()}.` : 'Complete your profile to personalize your recommendations.';
}
renderDashboard();

/* =========================================
  Assessment interactions
========================================= */
const nextButton = document.getElementById('assessmentNext');
const backButton = document.getElementById('assessmentBack');
const stepLabel = document.getElementById('assessmentStep');
const stepProgress = document.getElementById('assessmentProgress');
function renderAssessment() { document.querySelectorAll('.assessment-question').forEach((question) => question.classList.toggle('hidden', Number(question.dataset.step) !== assessmentStep)); stepLabel.textContent = assessmentStep; stepProgress.style.width = `${assessmentStep * 25}%`; backButton.disabled = assessmentStep === 1; nextButton.innerHTML = assessmentStep === 4 ? 'Finish profile <span>✦</span>' : 'Continue <span>→</span>'; }
document.addEventListener('click', (event) => {
  const choice = event.target.closest('.choice');
  if (!choice) return;
  const question = choice.closest('.assessment-question');
  const step = Number(question.dataset.step);
  if (step !== 2) question.querySelectorAll('.choice').forEach((item) => item.classList.remove('selected'));
  if (step === 2) choice.classList.toggle('selected');
  else choice.classList.add('selected');
  question.querySelectorAll('.choice').forEach((item) => item.setAttribute('aria-pressed', item.classList.contains('selected') ? 'true' : 'false'));
  assessmentAnswers[step] = [...question.querySelectorAll('.choice.selected')].map((item) => item.textContent.trim());
  saveProfile();
  renderDashboard();
});
goalInput?.addEventListener('input', () => { assessmentAnswers[4] = goalInput.value.trim() ? [goalInput.value.trim()] : []; saveProfile(); renderDashboard(); });
nextButton.addEventListener('click', () => {
  if (assessmentStep === 4 && goalInput) { assessmentAnswers[4] = goalInput.value.trim() ? [goalInput.value.trim()] : []; saveProfile(); }
  if (!assessmentAnswers[assessmentStep]?.length) { showToast('Choose an answer to continue.'); return; }
  if (assessmentStep < 4) { assessmentStep += 1; renderAssessment(); renderDashboard(); return; }
  document.querySelectorAll('.profile-completion').forEach((element) => { element.textContent = '100%'; });
  document.querySelectorAll('.progress i').forEach((element) => { element.style.width = '100%'; });
  renderDashboard();
  showToast('Your Opportunity Profile is ready.');
});
backButton.addEventListener('click', () => { if (assessmentStep > 1) { assessmentStep -= 1; renderAssessment(); renderDashboard(); } });

/* =========================================
  Navigation and reveal effects
========================================= */
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => { document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('active')); link.classList.add('active'); }));
const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => { const isOpen = document.querySelector('.main-nav').classList.toggle('mobile-open'); menuButton.setAttribute('aria-expanded', String(isOpen)); menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu'); });
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => { document.querySelector('.main-nav').classList.remove('mobile-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }));
function activateDashboardView(link) {
  const view = link.querySelector('span')?.textContent.trim().toLowerCase() || 'overview';
  document.querySelectorAll('.side-link').forEach((item) => item.classList.toggle('active', item === link));
  if (view === 'explore') {
    document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' });
    search.focus({ preventScroll: true });
    showToast('Explore opportunities');
  } else if (view === 'mentors') {
    document.getElementById('mentors').scrollIntoView({ behavior: 'smooth' });
    showToast('Mentors are ready to guide you');
  } else if (view === 'saved') {
    cards.forEach((card) => { card.hidden = !savedOpportunityIds.has(getOpportunityId(card)); });
    document.getElementById('opportunities').scrollIntoView({ behavior: 'smooth' });
    showToast(savedOpportunityIds.size ? 'Showing your saved opportunities' : 'You have no saved opportunities yet');
  } else if (view === 'applications') {
    showToast('No applications yet. Save an opportunity to begin.');
  } else if (view === 'settings') {
    openSettings();
  } else {
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    showToast('Overview opened');
  }
}
document.querySelectorAll('.side-link').forEach((link) => link.addEventListener('click', () => activateDashboardView(link)));
document.querySelectorAll('.button, .link-button').forEach((button) => { if (!button.dataset.action && !button.id && !button.closest('.search-bar') && !button.classList.contains('save-button')) button.addEventListener('click', () => showToast('This experience is coming next in your ez Foundation journey.')); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('section').forEach((section) => observer.observe(section));

/* =========================================
  Authentication and account settings
========================================= */
const authBackdrop = document.getElementById('authBackdrop');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authSubmit = document.getElementById('authSubmit');
const authError = document.getElementById('authError');
const authName = document.getElementById('authName');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authConsent = document.getElementById('authConsent');
const googleAuth = document.getElementById('googleAuth');
const settingsBackdrop = document.getElementById('settingsBackdrop');
const deleteConfirm = document.getElementById('deleteConfirm');
const deleteAccount = document.getElementById('deleteAccount');
const deleteError = document.getElementById('deleteError');
let authMode = 'login';
const firebaseConfig = window.VEZ_FIREBASE_CONFIG || {};
const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);
let firebaseAuth = null;
if (firebaseConfigured && window.firebase) {
  firebase.initializeApp(firebaseConfig);
  firebaseAuth = firebase.auth();
}

function openSettings() { settingsBackdrop.classList.remove('hidden'); settingsBackdrop.setAttribute('aria-hidden', 'false'); }
function closeSettings() { settingsBackdrop.classList.add('hidden'); settingsBackdrop.setAttribute('aria-hidden', 'true'); deleteConfirm.checked = false; deleteAccount.disabled = true; deleteError.textContent = ''; }
document.querySelectorAll('.side-link').forEach((link) => { if (link.textContent.includes('Settings')) link.addEventListener('click', openSettings); });
document.getElementById('settingsClose').addEventListener('click', closeSettings);
settingsBackdrop.addEventListener('click', (event) => { if (event.target === settingsBackdrop) closeSettings(); });
deleteConfirm.addEventListener('change', () => { deleteAccount.disabled = !deleteConfirm.checked; });
document.getElementById('settingsLogout').addEventListener('click', async () => { if (firebaseAuth) await firebaseAuth.signOut(); closeSettings(); updateAuthHeader(null); showToast('You have been logged out.'); });
deleteAccount.addEventListener('click', async () => {
  deleteError.textContent = '';
  const user = firebaseAuth?.currentUser;
  try {
    if (user) {
      const provider = user.providerData[0]?.providerId;
      if (provider === 'password') {
        const password = window.prompt('Enter your password to confirm account deletion.');
        if (!password) return;
        await user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, password));
      } else if (provider === 'google.com') {
        await user.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      await user.delete();
    }
    localStorage.removeItem('ezProfile');
    localStorage.removeItem(profileConsentKey);
    closeSettings();
    showToast('Your account and profile have been deleted.');
    window.setTimeout(() => window.location.reload(), 700);
  } catch (error) {
    deleteError.textContent = error.code === 'auth/requires-recent-login' ? 'Please sign in again before deleting your account.' : authErrorMessage(error);
  }
});

function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.authMode === mode));
  document.querySelectorAll('.signup-only').forEach((field) => field.classList.toggle('hidden', mode !== 'signup'));
  authTitle.textContent = mode === 'login' ? 'Welcome back.' : 'Create your ez Foundation profile.';
  authSubtitle.textContent = mode === 'login' ? 'Sign in to continue building your opportunity profile.' : 'A few details now unlock more relevant opportunities later.';
  authSubmit.innerHTML = mode === 'login' ? 'Log in <span>→</span>' : 'Create account <span>→</span>';
  authError.textContent = '';
}

function openAuth(mode = 'login') {
  setAuthMode(mode);
  authBackdrop.classList.remove('hidden');
  authBackdrop.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => (mode === 'signup' ? authName : authEmail).focus(), 50);
}

function closeAuth() {
  authBackdrop.classList.add('hidden');
  authBackdrop.setAttribute('aria-hidden', 'true');
  authForm.reset();
  authError.textContent = '';
}

function updateAuthHeader(user) {
  const headerActions = document.querySelector('.header-actions');
  if (!user) {
    headerActions.innerHTML = '<button class="icon-button" aria-label="Notifications">◌<span class="notification-dot"></span></button><button class="text-button" id="loginButton">Log in</button><button class="button button-dark" id="headerAuthButton">Get started <span>↗</span></button>';
    document.getElementById('loginButton').addEventListener('click', () => openAuth('login'));
    document.getElementById('headerAuthButton').addEventListener('click', () => openAuth('signup'));
    return;
  }
  const name = user.displayName || user.name || user.email.split('@')[0];
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  headerActions.innerHTML = `<span class="signed-in-label"><span class="signed-in-avatar">${initials}</span> ${name.split(' ')[0]}</span><button class="sign-out-button" id="signOutButton">Log out</button>`;
  document.getElementById('signOutButton').addEventListener('click', async () => { if (firebaseAuth) await firebaseAuth.signOut(); updateAuthHeader(null); showToast('You have been logged out.'); });
}

function authErrorMessage(error) {
  const messages = { 'auth/invalid-credential': 'That email or password is incorrect.', 'auth/email-already-in-use': 'An account already exists with this email.', 'auth/popup-closed-by-user': 'Google sign-in was cancelled.', 'auth/operation-not-allowed': 'This sign-in method is not enabled yet.' };
  return messages[error.code] || 'Authentication could not be completed. Please try again.';
}

document.getElementById('loginButton').addEventListener('click', () => openAuth('login'));
document.getElementById('headerAuthButton').addEventListener('click', () => openAuth('signup'));
document.getElementById('authClose').addEventListener('click', closeAuth);
authBackdrop.addEventListener('click', (event) => { if (event.target === authBackdrop) closeAuth(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !authBackdrop.classList.contains('hidden')) closeAuth(); });
document.querySelectorAll('.auth-tab').forEach((tab) => tab.addEventListener('click', () => setAuthMode(tab.dataset.authMode)));
document.getElementById('togglePassword').addEventListener('click', (event) => { const visible = authPassword.type === 'text'; authPassword.type = visible ? 'password' : 'text'; event.currentTarget.textContent = visible ? 'Show' : 'Hide'; });
googleAuth.addEventListener('click', async () => {
  if (!firebaseAuth) { authError.textContent = 'Google sign-in is ready, but Firebase configuration is required first.'; return; }
  googleAuth.classList.add('loading');
  googleAuth.innerHTML = '<span class="google-g">G</span><span>Connecting to Google...</span>';
  try { await firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); closeAuth(); showToast('Signed in with Google.'); } catch (error) { authError.textContent = authErrorMessage(error); } finally { googleAuth.classList.remove('loading'); googleAuth.innerHTML = '<span class="google-g">G</span><span>Continue with Google</span>'; }
});
authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = authName.value.trim();
  const email = authEmail.value.trim();
  const password = authPassword.value;
  if (authMode === 'signup' && name.length < 2) { authError.textContent = 'Please enter your full name.'; authName.focus(); return; }
  if (!authEmail.validity.valid) { authError.textContent = 'Please enter a valid email address.'; authEmail.focus(); return; }
  if (password.length < 8) { authError.textContent = 'Your password needs at least 8 characters.'; authPassword.focus(); return; }
  if (authMode === 'signup' && !authConsent.checked) { authError.textContent = 'Please accept the privacy and safety terms to continue.'; return; }
  if (!firebaseAuth) { authError.textContent = 'Connect Firebase in firebase-config.js before enabling email authentication.'; return; }
  authSubmit.disabled = true;
  try { const credential = authMode === 'login' ? await firebaseAuth.signInWithEmailAndPassword(email, password) : await firebaseAuth.createUserWithEmailAndPassword(email, password); if (authMode === 'signup' && name) await credential.user.updateProfile({ displayName: name }); closeAuth(); showToast(authMode === 'login' ? 'Welcome back.' : 'Your ez Foundation profile has been created.'); } catch (error) { authError.textContent = authErrorMessage(error); } finally { authSubmit.disabled = false; }
});

if (firebaseAuth) firebaseAuth.onAuthStateChanged(updateAuthHeader);
