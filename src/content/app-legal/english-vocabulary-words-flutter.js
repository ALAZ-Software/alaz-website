import {
  acceptableUseSection, accountSection, appleSection, availabilitySection, changesSection, childrenSection, contactSection,
  deletionSections, disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection,
  liabilitySection, licenseSection, mailtoLink, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection,
  securitySection, subscriptionSection, supportSections, termsChangesSection, termsContactSection, termsIntro,
  terminationSection, thirdPartySection, transfersSection, EMAIL,
} from './shared';

const app = {
  repo: 'english-vocabulary-words-flutter',
  // The case study (messages/*.json projects[].slug) that links to these documents.
  project: 'english-vocabulary',
  name: 'English Vocabulary: 8000 Words',
  platforms: 'iOS and Android',
  updated: '2026-10-19',
};

app.privacy = [
  privacyIntro(app),
  {
    heading: 'What we collect',
    body: `**Your account.** You can use the app as a guest: we then create an anonymous account with a random ID and no personal details. If you choose to save your progress, we also store your email address, the sign-in method you used (email and password, Google or Apple) and your name if you enter it or Apple or Google shares it. Passwords are handled by Firebase Authentication; we never see them.

**Your learning profile.** The answers you give when you start (name, native language, level, goals, weekly word target, daily minutes), your time zone and when you were last active.

**Your progress.** The words you have swiped (learned or to review), their review schedule and dates, daily counters (words learned, swipes, points, games played, time of day you studied) and your streak.

**Purchases.** Whether you have Premium, which plan, and its renewal and expiry dates, through RevenueCat. Payment details stay with Apple or Google; we never receive card numbers.

**Usage and diagnostics.** In release versions the app sends usage events to Firebase Analytics (for example onboarding answers, screens opened, swipes, games, paywall views, notification permission choices and errors) together with your account ID and a few properties (guest or registered, free or Premium, native language, level, goals, app language). Events never contain your name, email or the words you type; for a search only its length is sent. Crash reports (stack trace, device model, operating system and app version, account ID) go to Firebase Crashlytics. Firebase App Check checks with Apple or Google that requests come from a genuine copy of the app. Collection of the advertising ID is turned off and the app doesn't track you across other companies' apps or websites.

**Messages you send us.** If you write to us from the app's feedback form, we receive your message, your email and name if you have them, whether you are a guest, the app language and your platform. Emails you send us are kept in our mailbox.

**What stays on your device.** An offline copy of your progress, your settings and notification preferences, game scores and badges, and the word of the day shown in the home screen widget. Reminders are scheduled on the device as local notifications; no notification server is involved.

The app doesn't access your camera, microphone, photos, contacts or location.`,
  },
  {
    heading: 'How we use it',
    body: `- To run the app: keep your progress, sync it across devices and reinstalls, and restore it when you sign in.
- To provide Premium: check your subscription and unlock its features.
- To remind you to study, when you allow notifications.
- To keep the app working and secure: find and fix crashes, prevent abuse and fraudulent requests.
- To improve the app: understand which features, games and screens help people learn, in aggregate.
- To answer your messages and support requests.`,
  },
  legalBasesSection([
    `**Contract** — to provide the app, your account, your progress and Premium as described in the [terms](${docPath('terms', app)}).`,
    '**Legitimate interests** — to keep the app secure and stable, prevent fraud and understand usage in order to improve it. You can object at any time (see “Your rights”).',
    '**Consent** — for notifications, which you can turn off in the app or in your device settings.',
    '**Legal obligation** — to keep purchase records required by tax and accounting law and to answer lawful requests.',
  ]),
  noSelling(),
  processorsSection([
    { name: 'Google Firebase', role: 'sign-in (Authentication), database (Cloud Firestore), usage analytics (Analytics), crash reports (Crashlytics), App Check, Remote Config and Cloud Functions', data: 'Google LLC / Google Ireland Ltd.' },
    { name: 'RevenueCat', role: 'manages subscriptions and tells the app whether you have Premium', data: 'RevenueCat, Inc., USA' },
    { name: 'Apple and Google', role: 'sign-in with Apple or Google, and payment for subscriptions bought in the App Store or Google Play' },
  ]),
  transfersSection('Your account, profile and progress are stored in Google Cloud Firestore in the European Union (multi-region). Firebase Authentication, Analytics and Crashlytics, and RevenueCat, may process data in the United States and other countries where they operate.'),
  {
    heading: 'How long we keep it',
    body: `- **Account, profile and progress**: until you delete your account, or until you reset your progress. Guest accounts that haven't been used for 60 days are deleted automatically, with their progress.
- **Analytics data**: up to 14 months; **crash reports**: up to 90 days.
- **Purchase records**: as long as tax and accounting law requires (Apple, Google and RevenueCat keep their own records under their policies).
- **Feedback messages and emails**: up to 24 months after we answer them.
- **Data on your device**: until you delete the app or its data.`,
  },
  rightsSection(app, `In the app you can edit your name in **Profile**, erase your progress with **Settings › Reset All Progress**, and delete your account with **Settings › Delete Account** ([how](${docPath('delete-account', app)})). Notifications can be turned off under **Profile › Notifications**.`),
  securitySection(),
  childrenSection(13),
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app),
  licenseSection(),
  accountSection('As a guest, your progress is linked to this installation only: if you log out or delete the app before saving your progress to an account, it can\'t be recovered.'),
  subscriptionSection(app, {
    plans: 'The app is free to use, with a daily limit on games and the first topics unlocked. **Premium** is an optional auto-renewing subscription (weekly, monthly or yearly, as offered in the app) that unlocks every game without a daily limit, spaced-repetition reviews, all topic decks, streak freezes, detailed statistics and review reminders. What each plan includes is shown on the subscription screen.',
  }),
  refundsSection(),
  {
    heading: 'Learning content',
    body: 'Word lists, translations, example sentences and recordings are prepared with care, but they may contain mistakes and don\'t replace a teacher or an official course. We don\'t promise any particular result, level or exam score. If you spot an error, tell us and we\'ll fix it.',
  },
  acceptableUseSection(['copy, extract or republish the app\'s word lists, translations or audio recordings']),
  ipSection(),
  availabilitySection(),
  thirdPartySection('Apple, Google, Firebase and RevenueCat'),
  disclaimerSection(),
  liabilitySection(),
  terminationSection(app),
  appleSection(),
  googlePlaySection(),
  lawSection(),
  termsChangesSection(),
  generalSection(),
  termsContactSection(app),
];

app['delete-account'] = deletionSections(app, {
  steps: [
    'Open the **Profile** tab and tap the gear icon to open **Settings**.',
    'In the **Account** section, tap **Delete Account** and then **Continue**.',
    'Confirm it\'s you — enter your password, or sign in with Google or Apple again (guests skip this) — and tap **Delete Forever**.',
  ],
  deleted: [
    'Your account: email address, name and sign-in methods. If you signed in with Apple, the app\'s access to your Apple ID is revoked.',
    'Your learning profile and onboarding answers.',
    'All your progress: learned and review words, review schedule, daily statistics and streak, in the cloud and in the offline copy on this device.',
  ],
  kept: [
    '**Subscriptions and purchase records.** Apple, Google and RevenueCat keep the transaction history they need for billing, refunds and tax law. Deleting your account doesn\'t cancel a subscription.',
    '**Analytics and crash data** already collected, until it expires (up to 14 months for analytics, 90 days for crash reports).',
    '**Feedback messages** you sent us, up to 24 months after we answered them. Ask us by email to delete them sooner.',
    '**Settings on this device** (such as notification preferences and game scores), until you delete the app.',
  ],
  timing: 'Deleting in the app takes effect immediately and can\'t be undone. Requests by email are completed within 30 days.',
  partial: 'To start over without deleting your account, use **Settings › Reset All Progress**. It erases your learned and review words and daily statistics on this device and in the cloud; your account, profile and streak are kept.',
});

app.support = supportSections(app, {
  intro: 'Questions, bugs, a translation that looks wrong or a recording that sounds off — we want to hear about it. In the app you can also use **Contact us** in the settings.',
  faqs: [
    {
      q: 'Keep your progress on a new phone',
      a: 'Save your progress to an account (email, Google or Apple) from the app before you change phones, then sign in with the same account on the new one. As a guest, progress lives only in that installation and is lost if you log out or delete the app.',
    },
    {
      q: 'Reminders don\'t arrive',
      a: 'Check that notifications are allowed for the app in your device settings and turned on under **Profile › Notifications**. Reminders are never sent between 22:00 and 08:00. On some Android phones, battery saving can delay them; exclude the app from battery optimization.',
    },
    {
      q: 'A word, translation or recording is wrong',
      a: `Email ${mailtoLink(EMAIL, `${app.name}: content error`)} with the word and your app language, and we'll correct it.`,
    },
  ],
});

export default app;
