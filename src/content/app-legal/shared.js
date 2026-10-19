// Building blocks shared by the app documents. Each app file (named after its GitHub repo)
// describes what that app actually does with data and composes its four documents from these
// sections plus its own. Bodies are the small markdown dialect of components/Markdown.jsx:
// paragraphs separated by a blank line, "- " lists, **bold** and [links](/path).
// Keep the texts in step with the code of the app and its App Store / Google Play declarations.

export const COMPANY = 'ALAZ Software';
export const EMAIL = 'hello@alaz.pro';
const MAIL = `[${EMAIL}](mailto:${EMAIL})`;

export const docPath = (doc, app) => `/${doc}/${app.repo}`;

export const mailtoLink = (label, subject) => `[${label}](mailto:${EMAIL}?subject=${encodeURIComponent(subject)})`;

const APPLE_SUBSCRIPTIONS = 'https://apps.apple.com/account/subscriptions';
const PLAY_SUBSCRIPTIONS = 'https://play.google.com/store/account/subscriptions';
const APPLE_REFUNDS = 'https://reportaproblem.apple.com';
const PLAY_REFUNDS = 'https://support.google.com/googleplay/answer/2479637';

// ---------------------------------------------------------------- privacy

export const privacyIntro = (app, extra = '') => ({
  heading: 'Who we are',
  body: `${app.name} (“the app”) is made by ${COMPANY} (“ALAZ”, “we”, “us”), a software studio. ALAZ is the controller of the personal data processed through the app. You can reach us at ${MAIL}; our office addresses are listed on [alaz.pro](/about).

This policy explains what the app collects, why, who receives it, how long it is kept and what you can do about it. It covers the ${app.platforms} app. Our website has its own [privacy policy](/privacy).${extra ? `\n\n${extra}` : ''}`,
});

export const noSelling = (extra = '') => ({
  heading: 'What we never do',
  body: `- We don't sell or rent your personal data.
- We don't use it for advertising and we don't share it with data brokers.
- We don't make decisions about you based solely on automated processing that have legal or similarly significant effects.${extra ? `\n${extra}` : ''}`,
});

// `processors`: [{ name, role, data }] — the services that process data on our behalf.
export const processorsSection = (processors, extra = '') => ({
  heading: 'Who receives your data',
  body: `We use a few service providers to run the app. They process data on our behalf, under contracts that limit them to that purpose:

${processors.map((p) => `- **${p.name}** — ${p.role}${p.data ? ` (${p.data})` : ''}`).join('\n')}

Apart from them, we disclose data only when the law requires it (for example a valid court order), to protect our rights or users' safety, or to a successor if ALAZ or the app is sold or merged, in which case this policy keeps applying to your data.${extra ? `\n\n${extra}` : ''}`,
});

export const transfersSection = (where) => ({
  heading: 'International transfers',
  body: `${where} This may be outside the country where you live. When data leaves the European Economic Area, the United Kingdom, Switzerland or Türkiye, we rely on the safeguards the law provides, such as the European Commission's adequacy decisions (including the EU–US Data Privacy Framework for certified providers) and standard contractual clauses in our providers' data processing terms.`,
});

export const legalBasesSection = (items) => ({
  heading: 'Why we use it (legal bases)',
  body: `Where the GDPR, the UK GDPR or Türkiye's KVKK applies, we rely on these legal bases:

${items.map((i) => `- ${i}`).join('\n')}`,
});

export const rightsSection = (app, howInApp = '') => ({
  heading: 'Your rights',
  body: `Depending on where you live (for example under the GDPR, the UK GDPR, Türkiye's KVKK, Brazil's LGPD or US state privacy laws such as the CCPA), you can ask us to:

- tell you what data we hold about you and give you a copy;
- correct it, or delete it;
- export it in a portable format;
- restrict or object to how we use it, and withdraw any consent you gave.
${howInApp ? `\n${howInApp}\n` : ''}
For anything else, email ${MAIL} from the address on your account, with “${app.name}” in the subject. We may need to confirm it's you. We answer within 30 days and don't charge for it. You can also complain to your local data protection authority (in Türkiye, the KVKK Authority at kvkk.gov.tr; in the UK, the ICO). California residents: we don't sell or share personal information as those terms are defined by the CCPA, and we won't treat you differently for using your rights.`,
});

export const securitySection = (extra = '') => ({
  heading: 'Security',
  body: `Data travels over encrypted connections (TLS) and is encrypted at rest by our cloud providers. Access is limited by per-user rules, so one user can't read another's data, and only the people at ALAZ who need it for support or operations can reach it.${extra ? ` ${extra}` : ''} No system is perfectly secure; if a breach affects your data, we'll tell you and the authorities as the law requires.`,
});

export const childrenSection = (minimumAge = 13) => ({
  heading: 'Children',
  body: minimumAge >= 18
    ? `The app is meant for adults. You must be 18 or older to use it, and we don't knowingly collect data from anyone younger. If you believe a minor has given us data, write to ${MAIL} and we'll delete it.`
    : `The app isn't directed at children under ${minimumAge}, and we don't knowingly collect personal data from them. In some countries the age to consent to data processing on your own is higher (up to 16 in parts of the EU); below it, a parent or guardian has to agree. If you believe a child has given us data, write to ${MAIL} and we'll delete it.`,
});

export const changesSection = () => ({
  heading: 'Changes to this policy',
  body: 'When we change how the app handles data, we update this page and the date at the top. If a change is significant, we also tell you in the app before it takes effect.',
});

export const contactSection = (app) => ({
  heading: 'Contact',
  body: `Questions about this policy or your data: ${mailtoLink(EMAIL, `${app.name} privacy`)}. Help with the app: [${app.name} support](${docPath('support', app)}).`,
});

// ---------------------------------------------------------------- terms

export const termsIntro = (app, minimumAge = 13) => ({
  heading: 'Agreement',
  body: `These terms are an agreement between you and ${COMPANY} (“ALAZ”, “we”, “us”) for the use of ${app.name} (“the app”) and its related services. By downloading or using the app you accept them. If you don't, please don't use the app.

${minimumAge >= 18
    ? 'You must be 18 or older to use the app.'
    : `You must be at least ${minimumAge} years old, or the minimum age required in your country, to use the app. If you are under 18, a parent or guardian must agree to these terms on your behalf and approve any purchase.`}

How we handle your data is described in the [privacy policy](${docPath('privacy', app)}), which is part of these terms.`,
});

export const licenseSection = () => ({
  heading: 'Your license to use the app',
  body: 'We give you a personal, non-exclusive, non-transferable, revocable license to use the app on devices you own or control, for your own non-commercial use, under these terms and the rules of the store you got it from. You may not copy, modify, resell or redistribute the app, reverse engineer it except where the law allows, get around its technical limits or purchase checks, or use it to build a competing product.',
});

export const accountSection = (extra = '') => ({
  heading: 'Your account',
  body: `Give accurate information, keep your sign-in credentials safe, and tell us if you think someone else has used your account. You are responsible for what happens under your account. One account belongs to one person.${extra ? ` ${extra}` : ''}`,
});

// `plans`: a short description of what is sold; `trial`: whether free trials may be offered.
export const subscriptionSection = (app, { plans, trial = true, extra = '' }) => ({
  heading: 'Subscriptions and payments',
  body: `${plans}

- Prices, the billing period and what's included are shown in the app before you buy. Prices may differ by country and include taxes where the store requires it.
- Payment is charged to your Apple ID or Google Play account when you confirm the purchase. Purchases are processed by Apple or Google, not by us, under their terms.
- **Subscriptions renew automatically** at the end of each period for the same length and price, unless you cancel at least 24 hours before the current period ends. Your account is charged for the renewal within the 24 hours before the period ends.
- You can manage or cancel a subscription at any time in your [App Store account settings](${APPLE_SUBSCRIPTIONS}) or [Google Play subscriptions](${PLAY_SUBSCRIPTIONS}). Deleting the app or your account does not cancel it. After canceling, you keep access until the end of the period you paid for.${trial ? `
- If a free trial or introductory offer is shown, its length and the price after it are stated before you start. If you don't cancel at least 24 hours before the trial ends, the subscription starts and is charged. Any unused part of a free trial ends when you buy a subscription.` : ''}
- If a price changes, the store tells you in advance and, where the law or the store requires it, asks for your consent.
- Use “Restore purchases” in the app to get a purchase back on a new device with the same store account.${extra ? `\n\n${extra}` : ''}`,
});

export const refundsSection = () => ({
  heading: 'Refunds',
  body: `Because Apple and Google process the payments, we can't issue refunds ourselves. Request one from [Apple](${APPLE_REFUNDS}) or [Google Play](${PLAY_REFUNDS}); their refund policies apply. Where your local law gives you a right to withdraw from or cancel a purchase, you can use it through the store. Nothing in these terms limits rights you have under mandatory consumer law.`,
});

export const acceptableUseSection = (extra = []) => ({
  heading: 'Acceptable use',
  body: `When you use the app, don't:

- break the law or other people's rights, including privacy and intellectual property rights;
- try to access accounts, data or systems that aren't yours, probe or attack our services, or disrupt them;
- use bots, scrapers or automation against our services, or overload them;
- misuse purchases, refunds or promotions;
${extra.map((e) => `- ${e};`).join('\n')}${extra.length ? '\n' : ''}- help anyone else do any of this.

We may suspend or close accounts that break these rules.`,
});

export const ipSection = () => ({
  heading: 'Intellectual property',
  body: 'The app, its design, code, texts, sounds, images and other content, and the names and logos of ALAZ and the app, belong to ALAZ or its licensors and are protected by law. These terms don\'t give you any rights to them beyond the license above. Third-party names and trademarks belong to their owners. If you send us feedback or suggestions, we may use them freely and without obligation to you.',
});

export const availabilitySection = () => ({
  heading: 'Changes and availability',
  body: 'We keep improving the app, so features may change, be added or be removed. We try to keep it running, but we don\'t promise it will always be available, uninterrupted or error-free, and some features need an internet connection. If we ever shut the app down, we will give reasonable notice in advance.',
});

export const thirdPartySection = (services) => ({
  heading: 'Third-party services',
  body: `The app relies on services run by others, such as ${services}. Your use of them may also be subject to their own terms. We aren't responsible for third-party services, websites or content we don't control.`,
});

export const disclaimerSection = (extra = '') => ({
  heading: 'Disclaimer',
  body: `The app is provided “as is” and “as available”. To the extent the law allows, we disclaim all warranties, express or implied, including fitness for a particular purpose, merchantability and non-infringement.${extra ? ` ${extra}` : ''} Some countries don't allow these exclusions, so they may not all apply to you.`,
});

export const liabilitySection = (extra = '') => ({
  heading: 'Limitation of liability',
  body: `To the extent the law allows, ALAZ is not liable for indirect, incidental, special or consequential damages, or for lost profits, data or goodwill, arising from your use of the app.${extra ? ` ${extra}` : ''} Our total liability for any claim relating to the app is limited to the greater of the amount you paid for the app in the 12 months before the claim and US$100. Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, for fraud, for gross negligence or wilful misconduct, or any other liability that can't be limited by law.`,
});

export const terminationSection = (app) => ({
  heading: 'Ending the agreement',
  body: `You can stop using the app at any time and [delete your account](${docPath('delete-account', app)}) if you have one. We may suspend or end your access if you seriously or repeatedly break these terms, or if the law requires it; where reasonable we'll tell you why first. Sections that by their nature should survive (such as intellectual property, disclaimer, liability and governing law) continue to apply.`,
});

// The minimum terms Apple requires of a developer's own license agreement (App Store Review
// Guidelines / Apple's Licensed Application EULA instructions).
export const appleSection = () => ({
  heading: 'Additional terms for the Apple App Store',
  body: `If you got the app from the Apple App Store:

- These terms are between you and ALAZ only, not Apple. ALAZ, not Apple, is solely responsible for the app and its content.
- Your license is limited to using the app on Apple-branded products that you own or control, as permitted by the Usage Rules in Apple's Media Services Terms and Conditions, which also allow use by other accounts in your Family Sharing group or through volume purchasing.
- Apple has no obligation to provide any maintenance or support for the app.
- If the app fails to conform to any applicable warranty, you may notify Apple and Apple will refund the purchase price (if any). To the maximum extent the law allows, Apple has no other warranty obligation for the app; any other claims, losses or costs from a failure to conform to a warranty are ALAZ's responsibility.
- ALAZ, not Apple, is responsible for addressing any claims by you or third parties relating to the app or your use of it, including product liability claims, claims that the app fails to conform to legal or regulatory requirements, and claims under consumer protection, privacy or similar laws.
- If a third party claims that the app or your use of it infringes their intellectual property rights, ALAZ, not Apple, is responsible for the investigation, defense, settlement and discharge of that claim.
- You confirm that you are not located in a country subject to a U.S. Government embargo or designated as a “terrorist supporting” country, and that you are not on any U.S. Government list of prohibited or restricted parties.
- You must comply with applicable third-party terms when using the app (for example your mobile data provider's terms).
- Apple and its subsidiaries are third-party beneficiaries of these terms and, once you accept them, have the right to enforce them against you.

Questions, complaints or claims about the app go to ${COMPANY}: ${MAIL} (office addresses on [alaz.pro](/about)).`,
});

export const googlePlaySection = () => ({
  heading: 'Additional terms for Google Play',
  body: 'If you got the app from Google Play, the Google Play Terms of Service and Google Play\'s policies also apply to your download and purchases. Google is not a party to these terms and is not responsible for the app.',
});

export const lawSection = () => ({
  heading: 'Governing law and disputes',
  body: `These terms are governed by the laws of the Republic of Türkiye, and the courts of İzmir have jurisdiction. If you are a consumer, you keep the protection of the mandatory laws of the country where you live and can bring claims in your local courts. Consumers in Türkiye can also apply to consumer arbitration committees and consumer courts under Law No. 6502. Before going to court, please write to ${MAIL} — most problems can be solved quickly.`,
});

export const termsChangesSection = () => ({
  heading: 'Changes to these terms',
  body: 'We may update these terms, for example when the app or the law changes. The date at the top shows the latest version. For significant changes we tell you in the app in advance; if you keep using the app after a change takes effect, the new terms apply. If you don\'t agree, stop using the app and cancel any subscription.',
});

export const generalSection = () => ({
  heading: 'General',
  body: 'If any part of these terms is found unenforceable, the rest stays in effect. Not enforcing a right doesn\'t waive it. You may not transfer your rights under these terms without our consent; we may transfer ours to a successor of the app. These terms, with the privacy policy, are the whole agreement between you and us about the app.',
});

export const termsContactSection = (app) => ({
  heading: 'Contact',
  body: `${COMPANY} · ${mailtoLink(EMAIL, `${app.name} terms`)} · [alaz.pro](/). Help with the app: [${app.name} support](${docPath('support', app)}).`,
});

// ---------------------------------------------------------------- account deletion

// `steps`: the in-app path, one string per step. `deleted` / `kept`: what happens to each kind of data.
export const deletionSections = (app, { intro = '', steps, deleted, kept, timing, partial, beforeYouGo, byEmail = '', subscriptions = true }) => [
  {
    heading: 'Delete your account',
    body: `This page explains how to delete your ${app.name} account and the data linked to it, made by ${COMPANY}. You can do it inside the app, or ask us by email if you no longer have the app.${intro ? `\n\n${intro}` : ''}`,
  },
  ...(beforeYouGo ? [{ heading: 'Before you delete', body: beforeYouGo }] : []),
  {
    heading: 'In the app',
    body: `${steps.map((s, i) => `- **${i + 1}.** ${s}`).join('\n')}${subscriptions ? `

Deleting your account does not cancel a subscription: cancel it first in your [App Store account settings](${APPLE_SUBSCRIPTIONS}) or [Google Play subscriptions](${PLAY_SUBSCRIPTIONS}).` : ''}`,
  },
  {
    heading: 'By email',
    body: `If you can't use the app, send a request to ${mailtoLink(EMAIL, `Delete my ${app.name} account`)} from the email address you signed in with (or tell us which address and sign-in method you used).${byEmail ? ` ${byEmail}` : ''} We may ask you to confirm the request from that address. We complete it within 30 days and confirm by email.`,
  },
  {
    heading: 'What is deleted',
    body: deleted.map((d) => `- ${d}`).join('\n'),
  },
  {
    heading: 'What is kept, and for how long',
    body: kept.map((k) => `- ${k}`).join('\n'),
  },
  ...(timing ? [{ heading: 'When it happens', body: timing }] : []),
  ...(partial ? [{ heading: 'Delete some data, keep the account', body: partial }] : []),
  {
    heading: 'Questions',
    body: `Write to ${mailtoLink(EMAIL, `${app.name} account deletion`)}. More about your data: [privacy policy](${docPath('privacy', app)}).`,
  },
];

// ---------------------------------------------------------------- support

// `faqs`: [{ q, a }] specific to the app; the purchase, deletion and privacy answers are shared.
export const supportSections = (app, { intro, faqs = [], purchases = true, subscriptions = true, account = true, responseTime = 'We usually answer within two business days.' }) => [
  {
    heading: 'Contact us',
    body: `${intro ? `${intro}\n\n` : ''}Email ${mailtoLink(EMAIL, `${app.name} support`)} — ${COMPANY} reads every message. ${responseTime} It helps to include your device model, its iOS or Android version, the app version (shown in the app's settings) and, if something went wrong, what you were doing and a screenshot.`,
  },
  ...faqs.map(({ q, a }) => ({ heading: q, body: a })),
  ...(purchases ? [
    {
      heading: 'Restore a purchase',
      body: 'Sign in to the same App Store or Google Play account you bought with, open the app\'s purchase screen and tap “Restore purchases”. If it still doesn\'t show up, email us the store receipt (the order number from Apple\'s or Google\'s email) and we\'ll look into it.',
    },
    ...(subscriptions ? [{
      heading: 'Cancel a subscription',
      body: `Subscriptions are managed by the store: on iPhone or iPad go to Settings › your name › Subscriptions, or open [App Store subscriptions](${APPLE_SUBSCRIPTIONS}); on Android open Google Play › profile › Payments & subscriptions › Subscriptions, or [Google Play subscriptions](${PLAY_SUBSCRIPTIONS}). Cancel at least 24 hours before the period ends to avoid the next charge. Uninstalling the app does not cancel it.`,
    }] : []),
    {
      heading: 'Refunds',
      body: `Payments are handled by Apple and Google, so refunds are too: request one at [reportaproblem.apple.com](${APPLE_REFUNDS}) or through [Google Play](${PLAY_REFUNDS}). If something in the app didn't work as it should, tell us as well — we want to fix it.`,
    },
  ] : []),
  ...(account ? [{
    heading: 'Delete your account',
    body: `See [how to delete your ${app.name} account](${docPath('delete-account', app)}) — in the app or by email — and what happens to your data.`,
  }] : []),
  {
    heading: 'Privacy and terms',
    body: `[Privacy policy](${docPath('privacy', app)}) · [Terms of use](${docPath('terms', app)}). Privacy requests go to ${mailtoLink(EMAIL, `${app.name} privacy`)}.`,
  },
  {
    heading: 'Who makes the app',
    body: `${app.name} is made by ${COMPANY}, a software studio. More about us at [alaz.pro](/).`,
  },
];
