import {
  acceptableUseSection, accountSection, appleSection, availabilitySection, changesSection, contactSection, deletionSections,
  disclaimerSection, docPath, generalSection, googlePlaySection, ipSection, lawSection, legalBasesSection, liabilitySection,
  licenseSection, mailtoLink, noSelling, privacyIntro, processorsSection, refundsSection, rightsSection, securitySection,
  subscriptionSection, supportSections, termsChangesSection, termsContactSection, termsIntro, terminationSection,
  thirdPartySection, transfersSection, EMAIL,
} from './shared';

const app = {
  repo: 'passport-id-photo-flutter',
  name: 'Passport.AI',
  platforms: 'iOS and Android',
  updated: '2026-10-19',
};

app.privacy = [
  privacyIntro(app, 'Passport.AI turns a photo you take or choose into a passport, ID, visa or profile photo. Because that involves pictures of faces, this policy explains in detail what happens to them.'),
  {
    heading: 'Your photos and your face',
    body: `**The face check runs on your phone.** While you take or pick a photo, the app checks framing, head angle, eyes, lighting and sharpness on the device, with Apple's Vision framework on iOS and Google's ML Kit (bundled in the app) on Android. These measurements are not stored or sent anywhere, except the position of the face in the picture (a rectangle), which is sent with the photo so it can be framed correctly.

**The photo you choose is uploaded to make your ID photo.** A reduced copy (at most 1600 pixels on its longest side) is uploaded to our cloud storage and sent, with your chosen settings, to Google's Gemini image model, which generates the finished photo. The result is cropped to the document size and stored in your photo library in the app.

**What is stored.** For each photo: the uploaded source image, the generated photo, and its settings — document type, country and size, background, outfit, retouching and any text you typed to describe a background or clothing — plus the credits it cost and when it was made. Photos are reached only through private, hard-to-guess links that the app uses; we don't publish them.

**What we never do with your photos.** We don't use them to identify you, we don't create or keep a biometric template (a “faceprint”), we don't use them to train AI models, and we don't share them with anyone except the providers listed below, for the purpose of making your photo. Google processes the images under its paid Gemini API terms, which don't allow it to use them to improve its products; Google may keep requests for a limited time to detect abuse, as its terms describe.

**On your phone.** The app keeps a cached copy of your photos for fast access. Photos you save go to your photo library (album “Passport.AI”), and PDF print sheets to the app's files; those copies are yours and stay until you delete them.`,
  },
  {
    heading: 'Other data we collect',
    body: `**Account.** An account is needed to use the app, so your photos and credits are kept safe. We store your email address, display name (from Apple or Google, if they share it), sign-in method (email and password, Google or Apple) and when you joined and were last active. Passwords are handled by Firebase Authentication; we never see them.

**Credits and purchases.** Your credit balance and history (what each credit was earned or spent on), and your plan and its renewal status, through RevenueCat. Payment details stay with Apple or Google; we never receive card numbers.

**Feedback.** If you send feedback from the app: your message, topic, an optional screenshot, the related photo ID, your device model, app version and language.

**Technical logs.** Our servers log requests and errors (for example your account ID, a photo ID and an error message) to keep the service running and to refund failed generations.

**Settings on your device.** Language, theme, sounds, haptics and the country the app suggests from your device's region.

The app has no advertising and no analytics or tracking SDKs. Camera and photo library access are used only when you take, pick or save a photo.`,
  },
  {
    heading: 'How we use it',
    body: `- To make your photos: upload, generate, store and export them, and keep your library across devices.
- To run your account, plan and credits, and refund credits automatically when a generation fails.
- To keep the service secure and prevent fraud and abuse of credits.
- To answer your feedback and support requests and fix problems you report.`,
  },
  legalBasesSection([
    `**Contract** — to provide the service you asked for: processing your photos, your account, plan and credits, as described in the [terms](${docPath('terms', app)}). Photos of faces are processed only to make the photo you requested; we don't use them for biometric identification.`,
    '**Explicit consent** — where the law treats a face image as sensitive data, you give it by choosing to upload the photo; you can withdraw it at any time by deleting the photo or your account.',
    '**Legitimate interests** — to keep the service secure, prevent fraud and improve reliability. You can object at any time.',
    '**Legal obligation** — to keep purchase records required by tax and accounting law and to answer lawful requests.',
  ]),
  noSelling('- We don\'t use your photos for training AI models or for anything other than making your photo.'),
  processorsSection([
    { name: 'Google Firebase / Google Cloud', role: 'sign-in (Authentication), database (Cloud Firestore), photo storage (Cloud Storage) and server functions (Cloud Functions)', data: 'Google LLC / Google Ireland Ltd.' },
    { name: 'Google Gemini API', role: 'generates the ID photo from your uploaded photo and settings', data: 'Google LLC' },
    { name: 'RevenueCat', role: 'manages subscriptions and plan status', data: 'RevenueCat, Inc., USA' },
    { name: 'Apple and Google', role: 'sign-in with Apple or Google, and payment for plans bought in the App Store or Google Play' },
  ]),
  transfersSection('Your account data, credit history and server functions are hosted by Google Cloud in the European Union (Belgium, europe-west1). Image generation by the Gemini API, Firebase Authentication and RevenueCat may process data in the United States and other countries where they operate.'),
  {
    heading: 'How long we keep it',
    body: `- **Photos** (source and generated): until you delete them, delete all photos, or delete your account. There is no automatic expiry, so your library stays available for re-downloads.
- **Account, credits and history**: until you delete your account.
- **Purchase records**: as long as tax and accounting law requires (Apple, Google and RevenueCat keep their own records under their policies).
- **Feedback and screenshots**: up to 24 months after we handle them.
- **Server logs**: up to 30 days.
- **Copies on your device**: until you delete them or the app.`,
  },
  rightsSection(app, `In the app you can delete a single photo, delete all photos, and delete your account from **Account › Profile › Delete my account** ([how](${docPath('delete-account', app)})). To get a copy of your data, email us and we'll send it.`),
  securitySection('Photos are stored in private storage that only your account can reach through the app.'),
  {
    heading: 'Children and other people\'s photos',
    body: `The app isn't directed at children under 13 and they shouldn't create an account. Parents and guardians can use it to make an ID photo of their child. Only upload photos of yourself, of a child you are responsible for, or of someone who has agreed to it. If you believe a photo of you was uploaded without your consent, write to ${EMAIL} and we'll remove it.`,
  },
  changesSection(),
  contactSection(app),
];

app.terms = [
  termsIntro(app),
  licenseSection(),
  accountSection(),
  subscriptionSection(app, {
    plans: 'Passport.AI runs on **credits**. Plans are auto-renewing subscriptions (weekly, monthly or yearly, as offered in the app) that add a set number of credits at the start of each billing period. The number of credits each plan adds is shown on the plan screen before you buy.',
    trial: false,
  }),
  {
    heading: 'Credits',
    body: `- New accounts get a small number of welcome credits, once.
- Credits are spent on generating a photo and on downloads and extras (backgrounds, outfits, retouching, file formats, print layouts). The cost is shown before you confirm.
- Credits don't expire while your account exists, including after a plan ends.
- If a generation fails, its credits are refunded to your balance automatically. Credits spent on a photo aren't returned if you later delete it.
- Credits have no cash value, can't be sold, transferred to another account or exchanged for money, and are lost when you delete your account.
- If a payment is refunded or reversed by the store, we may remove the credits it added. We may correct balances that are wrong because of an error or abuse.
- We may change credit prices for future use; the current cost is always shown before you spend.`,
  },
  refundsSection(),
  {
    heading: 'AI-generated photos and official requirements',
    body: `Photos are generated by an AI model from your picture, following the published photo rules of the document you choose. We work hard to meet them, but **we can't guarantee that an authority, embassy, airline or platform will accept a photo**: rules change, and each office applies them in its own way. Check the current requirements of the institution before you submit, and review the photo yourself — the AI can make mistakes, and retouching or decorative backgrounds may be rejected on official documents.

ALAZ is not liable for an application that is rejected or delayed because of a photo. If an institution rejects a photo, email us with the photo ID and the reason; we'll regenerate it free of charge.`,
  },
  {
    heading: 'Your photos',
    body: 'You keep all rights to the photos you upload and to the photos the app generates for you. You give us a limited license to store and process them only to provide the service (making, storing and delivering your photos), which ends when you delete them. You confirm that you have the right to use every photo you upload.',
  },
  acceptableUseSection([
    'upload a photo of someone else without their consent, or of a child you are not responsible for',
    'use the app to impersonate anyone, create fake or forged documents, or deceive an authority',
    'upload unlawful, sexual, violent or hateful content',
  ]),
  ipSection(),
  availabilitySection(),
  thirdPartySection('Apple, Google, Firebase, the Google Gemini API and RevenueCat'),
  disclaimerSection('In particular, we don\'t warrant that generated photos meet the requirements of any authority.'),
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
    'Open the **Account** tab and tap your profile card.',
    'Scroll to **Danger zone** and tap **Delete my account**.',
    'Tick “I understand credits and photos can\'t be recovered.” and confirm. If you haven\'t signed in recently, the app asks you to sign in again first.',
  ],
  beforeYouGo: 'Save any photos you still need to your phone first, and cancel an active plan in the App Store or Google Play. Remaining credits are lost and can\'t be moved to another account.',
  deleted: [
    'Your account: email address, name and sign-in method.',
    'Every photo — the uploaded source images and the generated photos — and their settings, from our storage.',
    'Your credit balance and credit history, and your plan status with us.',
  ],
  kept: [
    '**Subscriptions and purchase records.** Apple, Google and RevenueCat keep the transaction history they need for billing, refunds and tax law. Deleting your account doesn\'t cancel a plan.',
    '**Feedback** you sent (with any screenshot), up to 24 months after we handled it. Ask us by email to delete it sooner.',
    '**Server logs**, up to 30 days.',
    '**Copies on your device** — photos saved to your gallery, PDF files and the app\'s cache — until you delete them or the app.',
  ],
  timing: 'Deleting in the app takes effect immediately and can\'t be undone. Requests by email are completed within 30 days.',
  partial: 'To remove your photos but keep your account and credits, delete single photos from your library, or use **Delete all photos** to clear the whole library and its stored images.',
});

app.support = supportSections(app, {
  intro: 'Something wrong with a photo, credits or your plan? Use **Feedback** in the app — it attaches your device and app version for us — or email us. Add the photo ID (it looks like #1760-K3F9A) and we can help faster.',
  responseTime: 'We usually answer within one business day.',
  faqs: [
    {
      q: 'How credits work',
      a: 'Generating a photo and downloading it cost credits; the price is shown before you confirm. Plans add credits every billing period, and credits never expire while your account exists. A failed generation refunds its credits automatically.',
    },
    {
      q: 'An institution rejected my photo',
      a: `Email ${mailtoLink(EMAIL, `${app.name}: photo rejected`)} with the photo ID and what the institution said. We'll regenerate it free of charge. Always check the institution's current photo rules before you submit.`,
    },
    {
      q: 'Printing at the right size',
      a: 'Download the PDF print sheet and print it at 100% (“actual size”), without “fit to page”, then cut along the dashed lines.',
    },
  ],
});

export default app;
