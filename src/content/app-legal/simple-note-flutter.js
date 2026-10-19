import {
  acceptableUseSection, accountSection, appleSection, availabilitySection, changesSection, childrenSection, contactSection,
  deletionSections, disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection,
  liabilitySection, licenseSection, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection, securitySection,
  subscriptionSection, supportSections, termsChangesSection, termsContactSection, termsIntro, terminationSection,
  thirdPartySection, transfersSection,
} from './shared';

const app = {
  repo: 'simple-note-flutter',
  name: 'Simple Note',
  platforms: 'iOS, Android, macOS and web',
  updated: '2026-10-19',
};

app.privacy = [
  privacyIntro(app, 'Your notes are yours. We store them so they sync and stay safe; we don\'t read them, sell them, or use them for ads, profiling or analytics.'),
  {
    heading: 'What we collect',
    body: `**Your notes.** Notes and checklists with their titles, text, formatting, items, colors, paper and folders, reminders and calendar dates, archive and trash state, and the last five versions of each note. They are stored in our cloud database so they sync between your devices — **also before you sign in**: the app starts with an anonymous account (a random ID, no personal details), and your notes are saved under it.

**Your account.** If you sign in: your email address, display name and sign-in method (email and password, Google or Apple). Passwords are handled by Firebase Authentication; we never see them.

**Settings.** Your app settings sync with your account. If you use the note lock, its 6-digit PIN is stored only as a salted, one-way hash (PBKDF2), never in plain text. Face ID, Touch ID or fingerprint unlock is handled by your device; we never receive biometric data.

**Devices.** For each signed-in device: platform, device model, operating system and app version, time zone, last activity and a push notification token. They appear in your device list so you can sign a device out remotely, and they are used to deliver reminders.

**Reminders.** So a reminder can reach you even when the app is closed, we keep a schedule entry with its time, repeat rule and text (the note's title and first line, or the checklist item). Locked notes never put their text in reminders.

**Shared notes.** When you share a note, the people you invite see it and can edit it according to their role. We store who is a member, their display name and role, the note's sharing and edit history, and invitation links (valid for 7 days). If you invite someone by email, we send them an invitation email with your name and the note's title.

**Search.** To search across devices, our server keeps an index of the words in your notes (for a locked note, only its title).

**Purchases.** Whether you have Pro, which plan and its renewal status, through RevenueCat, linked to your account ID. Payment details stay with Apple or Google.

**Usage and diagnostics.** A short, fixed list of usage events (for example “note created”, “reminder set”, “export”, “paywall shown”) with counts and simple values, sent to Firebase Analytics; crash and error reports (device model, operating system and app version, error details) sent to Firebase Crashlytics on mobile and macOS. **No note content is ever included**, and the app doesn't track you across other companies' apps or websites. Firebase App Check verifies that requests come from a genuine copy of the app.

**On your device.** A local copy of your notes for offline use, home screen widget content (never locked notes), and the files you export. Exports (JSON, Markdown) and note images are created on the device and only leave it if you share them.`,
  },
  {
    heading: 'How we use it',
    body: `- To store, sync and back up your notes, run sharing and deliver reminders.
- To provide Pro: check your plan and unlock its features.
- To keep the service secure: verify requests, prevent abuse, let you sign out lost devices.
- To find and fix crashes and understand, in aggregate, which features are used.
- To answer your messages.`,
  },
  legalBasesSection([
    `**Contract** — to provide the app, sync, sharing, reminders and Pro, as described in the [terms](${docPath('terms', app)}).`,
    '**Legitimate interests** — security, fraud prevention, stability and aggregate usage statistics that contain no note content. You can object at any time.',
    '**Consent** — for notifications, which you can turn off in the app or in your device settings.',
    '**Legal obligation** — purchase records required by tax law, and lawful requests.',
  ]),
  noSelling('- We don\'t read your notes, except when you ask us to look into a specific problem and give us permission.'),
  processorsSection([
    { name: 'Google Firebase / Google Cloud', role: 'sign-in (Authentication), database (Cloud Firestore), server functions, push notifications (Cloud Messaging), App Check, Analytics, Crashlytics and hosting of the web app', data: 'Google LLC / Google Ireland Ltd.' },
    { name: 'An email delivery service', role: 'sends the invitation emails you ask the app to send, through Firebase' },
    { name: 'RevenueCat', role: 'manages subscriptions and Pro status', data: 'RevenueCat, Inc., USA' },
    { name: 'Apple and Google', role: 'sign-in with Apple or Google, push notification delivery (Apple Push Notification service, Firebase Cloud Messaging) and payments' },
  ], 'People you share a note with are not our service providers: they see the shared note because you invited them.'),
  transfersSection('Your notes, account and devices are stored in Google Cloud Firestore in the European Union (Belgium, europe-west1), where our server functions also run. Firebase Authentication, Cloud Messaging, Analytics and Crashlytics, and RevenueCat, may process data in the United States and other countries where they operate.'),
  {
    heading: 'How long we keep it',
    body: `- **Notes**: until you delete them. Deleted notes stay in the trash for 30 days, then are erased permanently.
- **Versions and history**: the last 5 versions of each note and the last 50 sharing events.
- **Account, settings and devices**: until you delete your account; a device's entry is removed when you sign it out.
- **Reminder schedule entries**: until the reminder is done, deleted or its note is deleted.
- **Invitation links**: they expire after 7 days.
- **Analytics data**: up to 14 months; **crash reports**: up to 90 days.
- **Purchase records**: as long as tax and accounting law requires (Apple, Google and RevenueCat keep their own records).
- **Emails you send us**: up to 24 months after we answer.`,
  },
  rightsSection(app, `In the app you can edit or delete any note and empty the trash, export all your notes (**Settings › Data**), leave or stop sharing a note, sign devices out (**Settings › Account & devices**) and delete your account there ([how](${docPath('delete-account', app)})).`),
  securitySection('The note lock hides notes on a device behind your PIN or biometrics; it is a screen lock, not end-to-end encryption.'),
  childrenSection(13),
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app),
  licenseSection(),
  accountSection('Until you sign in, your notes belong to an anonymous account on this device: if you delete the app or its data before signing in, they can\'t be recovered.'),
  subscriptionSection(app, {
    plans: 'Simple Note is free to use, up to 50 notes and 2 folders, with sync, sharing invitations you receive, widgets, one-off reminders and JSON backups included. **Simple Note Pro** removes the limits and adds the note lock, recurring reminders, version history, inviting others, images without the watermark, Markdown export and extra desk themes. Pro is offered as an auto-renewing subscription (monthly or yearly) or as a one-time lifetime purchase, which doesn\'t renew. Plans and what they include are shown in the app before you buy.',
  }),
  refundsSection(),
  {
    heading: 'Your notes',
    body: `You own your notes. You give us a limited license to store, sync, index and back them up only to provide the service, which ends when you delete them. When you share a note, the people you invite can see it and, depending on their role, edit it; you are responsible for what you share and with whom.

We work hard to keep your notes safe, but please keep your own backups of anything important (in **Settings › Data**). To the extent the law allows, we aren't liable for lost notes.`,
  },
  acceptableUseSection(['use shared notes to send spam, harass people or distribute unlawful content']),
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
    'Open **Settings** and, in the **Account** section, tap **Account & devices**.',
    'Tap **Delete account** (shown once you are signed in).',
    'Confirm with **Delete account**. If you signed in a long time ago, the app asks you to sign in again first.',
  ],
  beforeYouGo: 'Export the notes you want to keep (in **Settings › Data**) and cancel an active Pro subscription in the App Store or Google Play.',
  intro: 'If you never signed in, your notes belong to an anonymous account on this device: delete them and empty the trash in the app, or sign in first and then delete the account.',
  deleted: [
    'Your account: email address, display name and sign-in method.',
    'Every note you own, with its versions, sharing history, reminders and invitations.',
    'Your settings (including the note lock PIN hash) and your device list.',
    'Your membership of notes others shared with you (the notes stay with their owners).',
  ],
  kept: [
    '**Subscriptions and purchase records.** Apple, Google and RevenueCat keep the transaction history they need for billing, refunds and tax law. Deleting your account doesn\'t cancel a subscription.',
    '**Leftover technical records** linked to the account are removed within 30 days.',
    '**Analytics and crash data** already collected (which never contains note content), until it expires: up to 14 months and 90 days.',
    '**Copies on your device** and files you exported, until you delete them or the app.',
  ],
  timing: 'Deleting in the app takes effect immediately and can\'t be undone. Requests by email are completed within 30 days.',
  partial: 'Delete individual notes (they go to the trash and are erased after 30 days, or right away if you empty the trash), or sign out a device from **Account & devices** to remove its data from your device list.',
});

app.support = supportSections(app, {
  faqs: [
    {
      q: 'Notes on a new phone',
      a: 'Sign in with the same account (email, Google or Apple) on the new device and your notes sync automatically. Notes made without an account stay on the old device: sign in there first so they move to your account.',
    },
    {
      q: 'Reminders are late or don\'t arrive',
      a: 'Allow notifications for Simple Note in your device settings. On Android, also allow “Alarms & reminders” so reminders fire on the minute, and exclude the app from battery optimization.',
    },
    {
      q: 'Forgot the note lock PIN',
      a: 'Choose to reset the PIN on the lock screen. If you are signed in, confirm with your account; without an account, confirm with your device\'s biometrics.',
    },
  ],
});

export default app;
