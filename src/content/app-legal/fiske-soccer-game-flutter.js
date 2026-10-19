import {
  acceptableUseSection, appleSection, availabilitySection, changesSection, contactSection, deletionSections,
  disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection, liabilitySection,
  licenseSection, mailtoLink, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection, securitySection,
  supportSections, termsChangesSection, termsContactSection, termsIntro, terminationSection, thirdPartySection,
  transfersSection, EMAIL,
} from './shared';

const app = {
  repo: 'fiske-soccer-game-flutter',
  name: 'Flick Arena',
  platforms: 'iOS and Android',
  updated: '2026-10-19',
};

app.privacy = [
  privacyIntro(app, 'Flick Arena is a turn-based flick football game you can play offline, against bots and online against other players.'),
  {
    heading: 'What we collect',
    body: `**Your player account.** The game creates an anonymous account (a random ID) when you first start it; you don't have to give your name or email. You can link a Google or Apple account to keep your progress across devices; we then receive the identity and email address that provider shares, handled by Firebase Authentication.

**Your player profile.** Your nickname, avatar, level, XP, Elo rating, match statistics, coins and gems, owned and equipped cosmetics, formation and power cards, quests, career progress, season and league standing, a 6-character friend code and when you were last online.

**What other players see.** Your public profile — nickname, avatar, level, Elo, statistics, friend code and whether you are online — is visible to other players. Opponents also see your nickname, avatar, Elo and formation during a match, and your league group sees your nickname and points.

**Online play and friends.** Matches (both players, the score, every move and its time, Elo changes), private rooms, matchmaking queue entries, friend lists and friend requests, and the preset emotes sent during a match. There is no free-text chat.

**Purchases and rewards.** For each purchase: the store order ID, the product, the platform and the time, after we verify it with Apple or Google. For each rewarded ad: the reward you received. Payment details stay with Apple or Google; we never receive card numbers.

**Notifications.** If you allow them, a push token so we can tell you it's your turn, that an opponent was found, or about a friend request or room challenge. These notifications include the other player's nickname.

**Advertising.** The free game shows ads from Google AdMob: rewarded ads you choose to watch, and occasional full-screen ads after offline matches (never after online matches, and none if you buy “Remove ads”). AdMob receives device information, your IP address and, on Android and where you allow it on iOS, the advertising ID. **Ads are not personalized** unless you agree to personalized ads in Google's consent form, where it's shown. For a rewarded ad, AdMob tells our server which account to reward.

**Usage and diagnostics.** A few gameplay events (for example match started, opponent found, account linked) sent to Firebase Analytics, crash reports (device model, operating system and app version, error details) sent to Firebase Crashlytics, and Firebase App Check tokens that verify the game is genuine.

**On your device.** Your settings, an offline copy of your profile and career, match results waiting to be uploaded, and replay GIFs you choose to share.`,
  },
  {
    heading: 'How we use it',
    body: `- To run the game: your profile, progress, matchmaking, online matches, friends, rooms, leagues and rewards.
- To deliver and verify purchases and ad rewards, and to prevent cheating and fraud.
- To show ads in the free game and limit how often they appear.
- To send the notifications you allow.
- To find and fix crashes and balance the game.`,
  },
  legalBasesSection([
    `**Contract** — to provide the game, online play and your purchases, as described in the [terms](${docPath('terms', app)}).`,
    '**Legitimate interests** — non-personalized ads that fund the free game, fair play, fraud prevention, stability and game balance. You can object at any time.',
    '**Consent** — personalized ads (through Google\'s consent form or Apple\'s tracking prompt) and notifications. You can change these at any time in the game\'s ad privacy options and your device settings.',
    '**Legal obligation** — purchase records required by tax law, and lawful requests.',
  ]),
  noSelling(),
  processorsSection([
    { name: 'Google Firebase / Google Cloud', role: 'player accounts (Authentication), game database (Cloud Firestore), server functions, push notifications (Cloud Messaging), Remote Config, App Check, Analytics and Crashlytics', data: 'Google LLC / Google Ireland Ltd.' },
    { name: 'Google AdMob', role: 'shows ads and confirms rewarded ads; for personalized ads, where you agree, Google acts under its own privacy policy', data: 'Google LLC' },
    { name: 'Apple and Google', role: 'sign-in with Apple or Google, payments, and verification of purchases' },
  ]),
  transfersSection('The game database and server functions run in Google Cloud in the European Union (Frankfurt, Germany). Firebase Authentication, Analytics, Crashlytics, Cloud Messaging and AdMob may process data in the United States and other countries where Google operates.'),
  {
    heading: 'How long we keep it',
    body: `- **Player account and profile**: until you delete your data in the game.
- **Matches** and their moves: up to 90 days after the match ends. Emotes are removed within minutes; queue entries and unused rooms within an hour.
- **League tables**: up to 90 days after the league week ends.
- **Purchase and reward records**: as long as tax and accounting law and fraud prevention require.
- **Analytics data**: up to 14 months; **crash reports**: up to 90 days.
- **Data on your device**: until you delete it or the game.`,
  },
  rightsSection(app, `In the game, **Settings › Delete my data** deletes your account and data ([how](${docPath('delete-account', app)})), and **Ad privacy options** in the settings change your ad consent. Because the account is anonymous, include your friend code when you write to us.`),
  securitySection(),
  {
    heading: 'Children',
    body: `Flick Arena is a general-audience game and is not directed at children under 13. We don't ask for age, real names or contact details, there is no free-text chat, and ads are not personalized unless consent is given. If you are under the age of digital consent in your country, ask a parent or guardian before playing online, linking an account or buying anything. If you believe a child has given us personal data, write to ${EMAIL} and we'll delete it.`,
  },
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app),
  licenseSection(),
  {
    heading: 'Your player account',
    body: 'The game starts with an anonymous account on your device. Link a Google or Apple account to keep your progress if you change or reset your phone; an anonymous account that is lost or deleted can\'t be recovered. One account belongs to one person; don\'t sell, share or trade accounts.',
  },
  {
    heading: 'Coins, gems and items',
    body: `- Coins and gems are virtual currencies you earn by playing or buy with gems packs. Items in the shop (pucks, avatars and other cosmetics) only change how things look; **no gameplay advantage is for sale**.
- Virtual currency and items are a limited, personal license to use them in the game. They have no real-world value, can't be exchanged for money, sold, transferred between accounts or refunded, except where the law requires it.
- Free boxes show which items they can contain before you open them; boxes can't be bought with real money.
- We may change prices, items and rewards in the game, and correct balances that are wrong because of a bug, a refunded purchase, cheating or abuse.
- Currency and items are lost when you delete your account, and when the game is shut down (we'll give notice in advance).`,
  },
  {
    heading: 'Purchases',
    body: `- Gem packs are consumable; “Remove ads” and the season pass are one-time purchases linked to your account. Prices are shown before you buy and are charged to your Apple ID or Google Play account. Purchases are processed by Apple or Google under their terms and verified by our server before they are delivered.
- The season pass unlocks the premium content of the season as described in the game at the time of purchase.
- Use “Restore purchases” to recover one-time purchases on a new device with the same store account.
- If you are under 18, a parent or guardian must approve purchases.`,
  },
  refundsSection(),
  {
    heading: 'Ads',
    body: 'The free game shows ads. Rewarded ads are optional and give the reward shown when you finish watching; rewards are granted after the ad network confirms the view. “Remove ads” turns off full-screen ads; rewarded ads stay available if you want them.',
  },
  {
    heading: 'Fair play and conduct',
    body: `- Play fairly: no cheats, hacks, modified clients, bots, exploits of bugs, or manipulating matches, Elo or leagues (for example by deliberately losing or abandoning).
- Choose a nickname that isn't offensive, hateful, sexual, misleading or impersonating someone else. We may change nicknames that break this rule.
- Respect other players. To report a player, email ${mailtoLink(EMAIL, `${app.name}: report a player`)} with their nickname or friend code.
- Breaking these rules can lead to a warning, a reset of progress or rewards, or suspension of the account.`,
  },
  acceptableUseSection(),
  ipSection(),
  availabilitySection(),
  thirdPartySection('Apple, Google, Firebase and Google AdMob'),
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
  intro: 'Your player account is created automatically and isn\'t tied to an email address unless you linked Google or Apple.',
  steps: [
    'Make sure you are online, so your data in the cloud can be deleted too.',
    'Tap the gear icon in the top bar to open **Settings**.',
    'Tap **Delete my data**, then **Delete** to confirm.',
  ],
  byEmail: 'If your account is anonymous, include your friend code (shown on the Friends screen) or your nickname so we can find it.',
  subscriptions: false,
  deleted: [
    'Your player account and the Google or Apple link.',
    'Your profile and public profile: nickname, avatar, level, Elo, statistics, coins, gems, items, quests, career and season progress.',
    'Your friend code, friend list and friend requests (on both sides), and your matchmaking entry.',
    'The game data stored on this device.',
  ],
  kept: [
    '**Recent matches** you played (with your nickname and Elo at the time), up to 90 days after they ended, and **league tables**, up to 90 days after the league week.',
    '**Purchase and ad reward records**, linked only to the random account ID, as long as tax law and fraud prevention require. Apple and Google keep their own purchase records.',
    '**Analytics and crash data** already collected, until it expires: up to 14 months and 90 days.',
  ],
  timing: 'Deleting in the game takes effect immediately and can\'t be undone; purchases and items are lost. If you are offline, only the data on the device is deleted — write to us so we delete the rest. Requests by email are completed within 30 days.',
});

app.support = supportSections(app, {
  subscriptions: false,
  faqs: [
    {
      q: 'Keep your progress on a new phone',
      a: 'Link a Google or Apple account in **Settings** before you change phones, then sign in with the same account on the new one. Without a linked account, progress stays with that installation.',
    },
    {
      q: 'A purchase didn\'t arrive',
      a: 'Make sure you are online and use “Restore purchases”. If gems or items are still missing, email us the order number from Apple\'s or Google\'s receipt and your friend code.',
    },
    {
      q: 'Report a player',
      a: `Email ${mailtoLink(EMAIL, `${app.name}: report a player`)} with the player's nickname or friend code and what happened (a screenshot helps).`,
    },
  ],
});

export default app;
