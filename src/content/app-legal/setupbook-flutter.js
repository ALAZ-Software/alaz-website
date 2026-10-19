import {
  acceptableUseSection, accountSection, appleSection, availabilitySection, changesSection, childrenSection, contactSection,
  deletionSections, disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection,
  liabilitySection, licenseSection, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection, securitySection,
  subscriptionSection, supportSections, termsChangesSection, termsContactSection, termsIntro, terminationSection,
  thirdPartySection, transfersSection,
} from './shared';

// The mobile app shares its account, data and backend with the web app at setupbook.io, so these
// texts follow the web app's legal documents (setupbook-web: content/legal/*.md) and add the store parts.
const app = {
  repo: 'setupbook-flutter',
  name: 'SetupBook',
  platforms: 'iOS and Android',
  updated: '2026-10-19',
};

const WEB = 'https://setupbook.io';

app.privacy = [
  privacyIntro(app, `SetupBook is a trading journal. The mobile app uses the same account and data as the web app at [setupbook.io](${WEB}); this policy covers both when you use the app.`),
  {
    heading: 'What we collect',
    body: `**Account.** Your email address, display name, sign-in method (email and password, Google, or Apple where offered) and your preferences (language, time zone, theme, display options, goals). Passwords are handled by Firebase Authentication; we never see them.

**Your journal.** What you record: trading accounts (name, type, currency, starting balance, prop firm rules), trades (symbol, side, executions, stop loss and take profit, fees, P&L, risk, notes, ratings, strategies, mistakes, checklists, chart links), tags, rules, symbols, day notes and up to 5 screenshots per trade (resized and converted to WebP before upload).

**Wellbeing check-ins (optional).** Sleep, energy, mood and how calm you felt at entry. They stay off until you explicitly agree to turn them on; we record when you agreed. They are never shown on shared trade cards.

**Platform connections (optional).** If you connect MetaTrader, cTrader, Binance, Bybit or OKX, we store the connection details (label, login, server, broker, account currency, sync status), the trades and fills it imports, and the credentials needed to read them: exchange API keys (only read-only keys are accepted) and cTrader access tokens are encrypted on our server with a key kept outside the database; a MetaTrader sync token is stored only as a hash. We never place trades.

**Shared trades (optional).** When you share a trade, a copy of it — without the details you choose to hide — is published at a public link, with your display name and avatar if you choose. Other signed-in users can react to it.

**Feedback.** Your message, its type, an optional email address and up to 3 screenshots, the screen it came from, the app language and your device or browser.

**Purchases.** SetupBook is free today. If you buy a paid plan in the app in the future, its status is managed through the App Store or Google Play (and a subscription service such as RevenueCat), linked to your account ID; payment details stay with Apple or Google.

**Technical data.** Our servers log requests (IP address, device or browser, time, errors) for security and troubleshooting. Price charts load public market data directly from Binance's public API, which receives your IP address and the symbol requested.

There is no advertising, no analytics or tracking SDK, and your data is never used to train AI models.`,
  },
  {
    heading: 'How we use it',
    body: `- To run your journal: store and sync your trades, compute your statistics, import and sync from the platforms you connect.
- To publish the trade cards you choose to share.
- To keep the service secure and prevent abuse.
- To answer feedback and support requests.`,
  },
  legalBasesSection([
    `**Contract** — to provide the journal, sync and sharing, as described in the [terms](${docPath('terms', app)}).`,
    '**Explicit consent** — for wellbeing check-ins, which may reveal information about your health. You can withdraw it at any time in the settings; doing so deletes them.',
    '**Legitimate interests** — security, fraud prevention and reliability. You can object at any time.',
    '**Legal obligation** — purchase records required by tax law, and lawful requests.',
  ]),
  noSelling(),
  processorsSection([
    { name: 'Google Firebase / Google Cloud', role: 'sign-in (Authentication), database (Cloud Firestore) and screenshot storage (Cloud Storage)', data: 'Google LLC, United States' },
    { name: 'Hostinger', role: 'hosting of setupbook.io and the server functions that run platform sync and share images, and our support mailbox', data: 'Hostinger International Ltd., servers in Frankfurt, Germany' },
    { name: 'Apple and Google', role: 'sign-in with Apple or Google, and payment for anything bought in the App Store or Google Play' },
  ], 'The trading platforms you connect (MetaQuotes, Spotware cTrader, Binance, Bybit, OKX) are independent companies: they send us your trading history at your request, under their own terms. Shared trade cards are visible to anyone with the link.'),
  transfersSection('Your account and journal are stored by Google in the United States (multi-region), and our server functions run in Germany.'),
  {
    heading: 'How long we keep it',
    body: `- **Account and journal**: until you delete them or your account. Deletion is immediate for your profile, trades, check-ins, screenshots, share cards, reactions and connections; Google's backups expire within about 6 months.
- **Connection credentials**: until you disconnect the platform or delete the account.
- **Feedback**: up to 24 months.
- **Server logs**: a short period, for security.
- **Emails you send us**: up to 24 months after we answer.`,
  },
  rightsSection(app, `In the app and on the web you can edit or delete anything you recorded, turn off and delete check-ins, disconnect platforms, export all your data as CSV or a JSON backup, and delete your account ([how](${docPath('delete-account', app)})).`),
  securitySection('Platform credentials are additionally encrypted on our server.'),
  childrenSection(18),
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app, 18),
  {
    heading: 'What SetupBook is',
    body: `SetupBook is a trading journal: a tool to record, import and review your own trades and calculate statistics from them. The mobile app and the web app at [setupbook.io](${WEB}) are the same service with the same account; these terms apply when you use the app, alongside the [web terms](${WEB}/legal/terms).`,
  },
  {
    heading: 'Not financial advice',
    body: 'SetupBook is not a broker, an investment adviser or a portfolio manager, and isn\'t authorized or regulated by any financial authority. **Nothing in the app is investment, financial, tax or legal advice.** Statistics describe the past and don\'t predict results. Trading leveraged products carries a high risk of losing money. Figures imported from platforms may be incomplete or wrong; check them against your broker\'s statements. Content shared by other users isn\'t verified.',
  },
  licenseSection(),
  accountSection(),
  subscriptionSection(app, {
    plans: 'SetupBook is currently free. If we offer paid plans in the app, they are sold through the App Store or Google Play, their price and content are shown before you buy, and the points below apply. Features that are free on the day you start using them won\'t become paid without notice.',
  }),
  refundsSection(),
  {
    heading: 'Your content and sharing',
    body: 'You own what you record. You give us a limited license to store and process it only to provide the service, which ends when you delete it (backups expire on their own schedule). Shared trade cards must be honest: don\'t use them to sell signals, promise returns or make misleading performance claims.',
  },
  {
    heading: 'Platform connections',
    body: 'Connect only accounts that you are allowed to use, with read-only credentials. Synced data comes from the platform and may be delayed, incomplete or wrong. Disconnecting deletes the stored credentials. We aren\'t responsible for the platforms\' services.',
  },
  acceptableUseSection(['share other people\'s personal data or trading history without permission']),
  ipSection(),
  availabilitySection(),
  thirdPartySection('Apple, Google, Firebase, Hostinger, Binance and the trading platforms you connect'),
  disclaimerSection(),
  liabilitySection('In particular, ALAZ is not liable for trading losses or decisions you make based on the app.'),
  terminationSection(app),
  appleSection(),
  googlePlaySection(),
  lawSection(),
  termsChangesSection(),
  generalSection(),
  termsContactSection(app),
];

app['delete-account'] = deletionSections(app, {
  intro: `Your SetupBook account is the same in the app and on [setupbook.io](${WEB}); deleting it in either place deletes it everywhere.`,
  beforeYouGo: 'Export a backup first if you want to keep your journal: Settings › Data offers a CSV export of all trades and a full JSON backup.',
  steps: [
    'Open **Settings** and go to the **Data** section.',
    'Tap **Delete my account**.',
    'Type your email address to confirm and confirm it\'s you (your password, or Google or Apple sign-in).',
  ],
  deleted: [
    'Your account and profile.',
    'Every trading account, trade, screenshot, tag, rule, symbol, day note and wellbeing check-in.',
    'All platform connections, with their imported fills, encrypted credentials and sync tokens.',
    'Your shared trade cards and your reactions on other people\'s cards.',
  ],
  kept: [
    '**Feedback** you sent, up to 24 months. Ask us by email to delete it sooner.',
    '**Backups** of Google\'s databases, which expire within about 6 months.',
    '**Purchase records**, if you bought anything, kept by Apple, Google and the subscription service as tax law requires.',
  ],
  timing: 'Deleting takes effect immediately and can\'t be undone. Requests by email are completed within 30 days.',
  partial: 'You can delete single trades or trading accounts, disconnect a platform (which deletes its credentials and imported fills), or turn off and delete wellbeing check-ins, without deleting your account.',
});

app.support = supportSections(app, {
  intro: 'You can also use **Send feedback** in the app; it lets you attach screenshots.',
  responseTime: 'We answer in English or Turkish, usually within two business days.',
  faqs: [
    {
      q: 'Sync from MetaTrader, cTrader or an exchange',
      a: 'Connect platforms in the app\'s settings. Exchanges need read-only API keys; cTrader signs in through Spotware; MetaTrader uses the SetupBook Expert Advisor with a one-time token. If a sync stops, check the connection\'s status and error message, and write to us with it.',
    },
    {
      q: 'Same journal on the web',
      a: `Sign in at [setupbook.io](${WEB}) with the same account: everything you record syncs between the app and the web.`,
    },
  ],
});

export default app;
