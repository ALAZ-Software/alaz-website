import {
  acceptableUseSection, accountSection, appleSection, availabilitySection, changesSection, childrenSection, contactSection,
  deletionSections, disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection,
  liabilitySection, licenseSection, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection, securitySection,
  subscriptionSection, supportSections, termsChangesSection, termsContactSection, termsIntro, terminationSection,
  thirdPartySection, transfersSection,
} from './shared';

const app = {
  repo: 'market-hours-forex-stocks-flutter',
  // The case study (messages/*.json projects[].slug) that links to these documents.
  project: 'market-hours',
  name: 'Market Hours: Forex & Stocks',
  platforms: 'iOS and Android',
  updated: '2026-10-19',
};

app.privacy = [
  privacyIntro(app, 'Market Hours is built to need as little of your data as possible: no account is required, there are no ads, and the app contains no analytics or crash-reporting tools.'),
  {
    heading: 'What we collect',
    body: `**Without an account: almost nothing.** Your alarms, favorites, calendar filters and settings are stored only on your phone. The app uses your device's time zone setting to show local times; it never asks for or uses your location.

**Optional account.** An account only carries Pro to your other devices. If you create one, we store your email address, a user ID and the sign-in method (email link, email and password, or Google). Passwords are handled by Firebase Authentication; we never see them. Firebase sends the sign-in, password reset and confirmation emails.

**Purchases.** Whether you have Pro, which plan and its renewal status, through RevenueCat, linked to a random ID (or to your account ID once you sign in). Payment details stay with Apple or Google; we never receive card numbers.

**Data the app downloads.** To show the economic calendar, the app downloads it from our cloud copy (Google Cloud Firestore) and, if that copy is out of date, directly from the Forex Factory feed. The map is loaded from OpenFreeMap. Like any web request, these send your IP address and the app's name and version to the server; they contain no account details.

**Backups.** On Android, your alarms and settings may be included in your own Google device backup, under Google's terms.

The app has no advertising, doesn't read the advertising ID and doesn't track you.`,
  },
  {
    heading: 'How we use it',
    body: `- To sign you in and give your Pro access on all your devices.
- To check your plan and unlock Pro features.
- To deliver the market data, economic calendar and map you see in the app.
- To answer your messages.`,
  },
  legalBasesSection([
    `**Contract** — to provide the app, your account and Pro, as described in the [terms](${docPath('terms', app)}).`,
    '**Legitimate interests** — to keep the service secure and prevent abuse of purchases.',
    '**Consent** — for notifications and exact alarms, which you can turn off in your device settings.',
    '**Legal obligation** — purchase records required by tax law, and lawful requests.',
  ]),
  noSelling(),
  processorsSection([
    { name: 'Google Firebase', role: 'sign-in (Authentication) and the cloud copy of the economic calendar (Cloud Firestore)', data: 'Google LLC / Google Ireland Ltd.' },
    { name: 'RevenueCat', role: 'manages subscriptions and Pro status, and its subscription management screen', data: 'RevenueCat, Inc., USA' },
    { name: 'Apple and Google', role: 'sign-in with Google, and payment for Pro bought in the App Store or Google Play' },
  ], 'The app also downloads public data directly from the **Forex Factory** calendar feed (Fair Economy) and map styles and tiles from **OpenFreeMap** (map data © OpenStreetMap contributors). They are independent services that receive only your IP address and the app\'s name and version, under their own privacy policies.'),
  transfersSection('The cloud copy of the calendar is stored in Google Cloud Firestore in the European Union (multi-region). Firebase Authentication and RevenueCat may process account and purchase data in the United States and other countries where they operate.'),
  {
    heading: 'How long we keep it',
    body: `- **Account** (email, user ID, sign-in method): until you delete it.
- **Purchase records**: as long as tax and accounting law requires (Apple, Google and RevenueCat keep their own records under their policies).
- **Alarms and settings**: on your phone, until you delete them or the app.
- **Emails you send us**: up to 24 months after we answer.`,
  },
  rightsSection(app, `In the app you can delete your account from **Settings › Account** ([how](${docPath('delete-account', app)})); everything else is on your phone and is removed when you uninstall the app.`),
  securitySection(),
  childrenSection(13),
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app),
  licenseSection(),
  accountSection('An account is optional and only used to carry Pro to your other devices.'),
  subscriptionSection(app, {
    plans: 'Market sessions, the map, the economic calendar and up to 3 market alarms are free. **Market Hours Pro** adds unlimited market alarms, economic-calendar alarms, custom alarm times, all alarm sounds, quiet hours and holiday and daylight-saving warnings. Pro is offered as an auto-renewing subscription (for example weekly, monthly or yearly) and may also be offered as a one-time lifetime purchase, which doesn\'t renew. Plans and what they include are shown in the app before you buy.',
  }),
  refundsSection(),
  {
    heading: 'Not financial advice',
    body: `Market Hours is a timing tool. **Nothing in the app is investment, financial, trading or tax advice**, or a recommendation to buy or sell anything. We are not a broker, an adviser or a regulated financial firm.

Trading hours, holidays, half days, daylight-saving changes and economic calendar events come from public and third-party sources (such as exchange calendars and the Forex Factory feed). They can be incomplete, late or wrong, and exchanges can change their hours at short notice. Always confirm times with your broker or the exchange before you trade.

Alarms depend on your phone: notification and exact-alarm permissions, battery saving, do-not-disturb, quiet hours, connectivity and the operating system can delay or block them. Don't rely on the app alone for time-critical decisions.

To the extent the law allows, ALAZ isn't liable for trading losses, missed opportunities or other losses arising from data shown in the app or from alarms that are late or don't ring.`,
  },
  acceptableUseSection(['extract or redistribute the market and calendar data shown in the app']),
  ipSection(),
  availabilitySection(),
  thirdPartySection('Apple, Google, Firebase, RevenueCat, the Forex Factory calendar feed and OpenFreeMap / OpenStreetMap'),
  disclaimerSection('In particular, we don\'t warrant that market hours, holidays, calendar data or alarms are accurate, complete or on time.'),
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
  intro: 'An account is optional. If you never created one, there is nothing to delete on our side: your alarms and settings are only on your phone and are removed when you uninstall the app.',
  steps: [
    'Open **Settings** and, under **Account**, tap the account row (it shows your email address).',
    'Tap **Delete account**.',
    'Confirm it\'s you — enter your password, or confirm with Google — and tap **Delete for good**. For an email-link account, if you signed in more than 5 minutes ago, we email you a confirmation link: open it on the same phone and the account is deleted.',
  ],
  deleted: [
    'Your account: email address, user ID and sign-in method.',
    'The link between your purchases and your account on this phone (the app returns to an anonymous ID).',
  ],
  kept: [
    '**Subscriptions and purchase records.** Apple, Google and RevenueCat keep the transaction history they need for billing, refunds and tax law. Deleting your account doesn\'t cancel a subscription.',
    '**Alarms and settings on your phone**, until you uninstall the app or clear its data.',
  ],
  timing: 'Deleting in the app takes effect immediately (or as soon as you open the confirmation link) and can\'t be undone. Requests by email are completed within 30 days.',
});

app.support = supportSections(app, {
  faqs: [
    {
      q: 'Alarms don\'t ring or ring late',
      a: 'Allow notifications for Market Hours and, on Android, “Alarms & reminders” (exact alarms) in your device settings. Exclude the app from battery optimization, and check do-not-disturb and the app\'s quiet hours. Without exact alarms, Android may deliver an alarm up to a minute late.',
    },
    {
      q: 'A market time or holiday looks wrong',
      a: 'Tell us which market, the date and what you expected. Exchange calendars change, and we fix reported errors quickly. Always confirm times with your broker before trading.',
    },
    {
      q: 'Pro on another device',
      a: 'Sign in with the same account on both devices, or use “Restore purchases” with the same App Store or Google Play account.',
    },
  ],
});

export default app;
