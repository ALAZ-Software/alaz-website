const { chromium } = require('playwright');
const path = require('path');
// Usage: NODE_PATH=<dir with playwright> node screenshot.cjs <out-dir> [base-url]
// Captures fold + full-page shots of every page at 1440px (desktop) and 390px (mobile), plus the open mobile menu.
const fs = require('fs');
const OUT = process.argv[2] || 'shots';
fs.mkdirSync(OUT, { recursive: true });
const BASE = process.argv[3] || 'http://localhost:3000';
const PAGES = [
  ['home', '/'], ['about', '/about'], ['services', '/services'], ['case-studies', '/case-studies'],
  ['case-vocabulary', '/case-studies/english-vocabulary'], ['case-market-hours', '/case-studies/market-hours'],
  ['blog', '/blog'], ['blog-post', '/blog/cost-of-a-slow-website'], ['start-project', '/start-project'],
  ['legal', '/legal'], ['privacy', '/privacy'], ['404', '/this-does-not-exist'],
];
const VIEWPORTS = [['desktop', 1440, 900], ['mobile', 390, 844]];
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const [vpName, w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: vpName === 'mobile', hasTouch: vpName === 'mobile' });
    for (const [name, url] of PAGES) {
      const page = await ctx.newPage();
      try {
        await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 120000 });
        await page.waitForTimeout(1500);
        // viewport-only (above the fold)
        await page.screenshot({ path: path.join(OUT, `${name}-${vpName}-fold.png`) });
        // scroll through to trigger reveals, then force-reveal everything
        const total = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < total; y += Math.round(h * 0.8)) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
        await page.evaluate(() => { document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed')); document.querySelectorAll('video').forEach(v => v.pause()); window.scrollTo(0, 0); });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `${name}-${vpName}-full.png`), fullPage: true });
        console.log('ok', name, vpName, total);
      } catch (e) { console.log('FAIL', name, vpName, e.message.split('\n')[0]); }
      await page.close();
    }
    // mobile nav open state
    if (vpName === 'mobile') {
      const page = await ctx.newPage();
      await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 120000 });
      await page.click('button[aria-label="Open menu"]');
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, `nav-open-mobile.png`) });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
