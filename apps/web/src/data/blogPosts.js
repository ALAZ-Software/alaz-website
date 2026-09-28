// Centralized blog content. Each post stores its body as markdown rendered by
// @/components/Markdown. Add new posts by appending to this array.

export const getReadingTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const blogPosts = [
  {
    slug: 'cost-of-a-slow-website',
    title: 'What Does a Slow Website Actually Cost Your Business?',
    excerpt:
      'A 0.1s delay hits revenue harder than most pricing changes. Data from Google, Deloitte, and Portent on how page load time drives conversions, burns ad spend, and reshapes search rankings.',
    tag: 'PERFORMANCE',
    date: '2025-09-29',
    dateLabel: 'SEP 29, 2025',
    cover: 'https://images.hostinger.com/fa2db1a1-b7b8-4447-ba3d-7661427c1fcb.png',
    author: { name: 'The ALAZ Team', role: 'ENGINEERING STUDIO' },
    content: `Teams spend weeks polishing a hero animation, tuning the easing curve on a dropdown, and arguing over the exact shade of a gradient. Then they ship it on a page that takes 4.2 seconds to become interactive and wonder why the conversion rate drifts downward every quarter.

Speed is not a developer chore. It is a balance sheet item. Every hundred milliseconds of latency shows up somewhere — in checkout completions, in cost per acquisition, in whether a paid visitor ever sees your form. This post pulls the actual numbers so you can stop treating performance as a nice-to-have and start treating it as a revenue metric.

## The cost of a 0.1-second delay in retail

The most cited number in this conversation comes from the Deloitte and Google study *Milliseconds Make Millions*. They instrumented real retail and travel sites across Europe and measured what happened when mobile load times improved by just 0.1 seconds.

- **Retail conversions rose 8.4%** on a 0.1s improvement.
- **Average order value rose 9.2%** in retail — people not only bought more often, they spent more.
- **Travel conversions rose 10.1%** — the most speed-sensitive category in the study.

A tenth of a second. That is less time than a human blink, and it moved conversion by close to ten percent.

Amazon established the benchmark years before this study: every 100ms of latency costs them roughly 1% in sales. Amazon runs at a scale where 1% is a staggering number, but the ratio holds at smaller scales too. If your store does $500K a month online, a 300ms improvement is plausibly worth five figures annually — before you touch pricing, ad spend, or product mix.

The takeaway is uncomfortable for teams that prioritize visual polish over load time. A faster page with a simpler design will out-convert a slower page with a prettier one, almost every time.

## Burning ad budgets on unrendered pixels

Google's mobile page speed data lays out the bounce curve, and it is brutal.

- Bounce rate jumps **32%** when page load moves from 1 second to 3 seconds.
- Bounce rate jumps **90%** when page load reaches 5 seconds.

Now follow the money. You pay $2.40 per click on a competitive keyword. The visitor lands. The page is still loading at 3 seconds — the analytics pixel has not fired, the conversion form has not rendered, the headline has not painted. The visitor leaves. You paid for a click that never reached your funnel.

This is the silent budget drain most marketing dashboards miss. The ad platform reports a click. Your analytics reports nothing — because the visitor bounced before the tag loaded. The spend looks like it produced zero traffic, when really it produced traffic that your own site could not receive.

The fix is not to spend more on ads to compensate for a leaky page. The fix is to stop the leak. A page that renders its critical content in under 2 seconds turns that same ad budget into measurable sessions and measurable conversions. Your cost per acquisition drops without touching the campaign.

## B2B pipelines and dropped leads

B2B tells the same story, but the stakes are higher because the deal sizes are larger and the sales cycles are longer.

Portent's conversion study found that a B2B site loading in 1 second converts **3x higher** than a site loading in 5 seconds, and **5x higher** than a site loading in 10 seconds. The curve is not linear — it falls off a cliff.

There is a second-order effect here that teams underweight. A slow B2B site reads as an implicit signal of outdated infrastructure. A CTO evaluating your platform is also evaluating your engineering. A 6-second load time tells them, before they read a single feature page, that your team does not prioritize performance. That is not the first impression you want when you are asking someone to trust you with their data, their workflow, or a six-figure annual contract.

Speed is a credibility signal in B2B. It is the difference between a demo that feels modern and a demo that feels like it was built in 2015 and never revisited.

## Search rankings and Core Web Vitals

Speed is also a direct Google ranking factor, not just a conversion factor. Google measures it through Core Web Vitals, and two metrics matter most right now.

- **Largest Contentful Paint (LCP)** measures when the largest visible element paints. Google wants it under 2.5 seconds. A heavy hero image, a blocking stylesheet, or a slow server response pushes it past the threshold and dents your ranking.
- **Interaction to Next Paint (INP)** measures how quickly the page responds to a user tap or click. Google wants it under 200ms. INP replaced First Input Delay in 2024, and it is far stricter — it catches the long JavaScript tasks that freeze the main thread after the page looks "loaded."

There is a crawl-budget angle too. Heavy client-side scripts force Googlebot to execute JavaScript, queue render, and revisit pages it could have indexed from raw HTML. On large sites, that burns crawl budget — Google indexes fewer pages per visit, and deep content takes longer to surface. A server-rendered page hands the crawler ready HTML and moves on.

The ranking impact compounds the conversion impact. A faster page converts better *and* ranks better *and* gets crawled more efficiently. A slower page loses on all three fronts at once.

## Performance engineering strategy

The instinct when a site is slow is to upgrade the server. That is rarely the right first move. Most performance problems are architectural, not infrastructural, and a bigger server will not fix a 3MB JavaScript bundle.

Three fixes move the needle more than any server upgrade.

**Prune unnecessary JavaScript.** Every library you import is parsed, compiled, and executed on someone's phone. Audit your bundle. Drop the carousel library for a CSS scroll-snap container. Drop the animation library for the four transitions you actually use. Drop the date picker that ships 40KB for a native input. The fastest line of JavaScript is the one you never ship.

**Adopt a server-first architecture.** Frameworks like Next.js let you render HTML on the server or at build time, so the browser receives a real page instead of an empty shell and a script tag. Server-side rendering and static site generation cut time-to-content dramatically and hand search crawlers ready HTML. The client hydrates only what needs to be interactive.

**Enforce modern image optimization.** Images are usually the heaviest bytes on a page. Serve WebP or AVIF instead of JPEG — 25–50% smaller at the same quality. Set explicit width and height to prevent layout shift. Lazy-load everything below the fold. Strip metadata from production assets. These are not optional refinements; they are the baseline.

None of this requires a bigger server. It requires discipline at the architecture layer, where the decisions are made once and pay off every single pageview for the life of the site.

## References & sources

- Deloitte Digital & Google — *Milliseconds Make Millions* (retail and travel conversion impact of 0.1s load improvements)
- Google — *Mobile Page Speed: Bounce Rate by Load Time* (1s → 3s → 5s bounce escalation)
- Portent — *Site Speed and Conversion Rate Study* (B2B conversion rates by load time)
- Google — *Core Web Vitals: LCP and INP* technical documentation

## Run the audit

If you have not measured your load time this quarter, you are guessing. Run a Lighthouse pass. Check your LCP and INP against the thresholds. Open your network tab and sort by transfer size. The numbers will tell you exactly where the budget is leaking.

If the audit surfaces work you do not have the bandwidth to take on, that is what we do. ALAZ engineers high-performance web frontends — server-first architectures, disciplined bundle budgets, and image pipelines that ship the smallest viable byte. We modernize legacy stacks without rewriting the business logic underneath.

Email \`hello@alaz.pro\`. Send a URL and a Lighthouse report if you have one. We will tell you, plainly, what is slow, what it is costing you, and what it takes to fix it.`,
  },
  {
    slug: 'we-are-officially-live',
    title: 'We Are Live: Building Software That Actually Moves the Needle',
    excerpt:
      "ALAZ is open. Why this studio exists, how we engineer, and what we're offering to teams that value speed and reliability over polish-as-a-smokescreen.",
    tag: 'LAUNCH',
    date: '2025-09-27',
    dateLabel: 'SEP 27, 2025',
    cover: 'https://images.hostinger.com/da80e49f-b638-479c-b8a6-486217e4ecb8.png',
    author: { name: 'The ALAZ Team', role: 'ENGINEERING STUDIO' },
    content: `ALAZ is open for business. This is the first post on a studio I built to fix something that genuinely frustrates me.

## The starting point

I've spent years untangling web apps that should have been simple. Bloated bundles. Interfaces that judder on a mid-range phone. State scattered across four libraries because someone picked a tool and never revisited the decision. Dashboards that take six seconds to become interactive and still ship to production.

Most of that pain is not a technology problem. It's a discipline problem. Decisions get made once, under deadline pressure, and then frozen. The codebase inherits them. Every new feature pays the tax.

ALAZ exists to stop paying that tax.

## Our engineering ethos

We build against a short list of convictions.

- **Speed is a feature.** Sub-second load times are not a stretch goal. They are the baseline. A page that loads in 2.3 seconds has already lost half the room.
- **Architecture is a communication tool.** Clean state management and predictable rendering are not vanity. They are how a team of five keeps shipping after month twelve.
- **TypeScript is non-negotiable.** Types catch the bugs that reviews miss. They let you refactor without flinching.
- **Modular beats monolithic.** Small, replaceable pieces win every time the requirements change. They always change.

None of this is exotic. The bar is low because most teams optimize for the demo, not for month eighteen. We optimize for month eighteen.

We work in the modern frontend stack — Next.js, TypeScript, the React ecosystem — because it lets us ship fast without shipping fragile. The tooling is mature. The patterns are boring in the best way. Boring means predictable. Predictable means we can reason about the system at 2am when something breaks.

## What we're building

ALAZ ships two things.

First, high-performance web solutions. Marketing sites that hit 100 on Core Web Vitals without looking like a placeholder. Product surfaces that stay responsive under real data, not the demo dataset someone demoed once.

Second, specialized applications. Internal tools, dashboards, and client-facing platforms where the logic is the product and the interface has to get out of the way.

We take end-to-end frontend execution for teams that value speed and reliability over polish-as-a-smokescreen. You will not get a 40-page proposal. You will get a working branch, a clear architecture decision record, and code you can read at a glance.

Performance budgets get committed in the first sprint, not bolted on before launch. Accessibility is part of the build, not an audit at the end. If a feature slows the critical path, we say so before we ship it.

## The invitation

If you're a founder with a prototype that needs to become real, an engineer who's tired of apologizing for the codebase, or a company that wants a partner instead of a vendor — let's talk.

Email \`hello@alaz.pro\`. Tell me what you're building and what's in the way. I read every message and I reply like a person, not an auto-responder.

We're live. Let's build something that holds up.`,
  },
];

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
