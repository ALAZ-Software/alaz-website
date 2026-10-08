# Kritik bulgular (tüm boyutlar)

Bu liste 20 boyutun tamamındaki **kritik** seviyeli bulguları tek yerde toplar. Kritik = doğrudan "AI slop" sinyali veren ya da Awwwards iddiasını tek başına düşüren şeyler. Aynı kök sorun birden fazla boyutta farklı açıdan görülebilir (ör. POWERED BY rozetleri hem ana sayfa, hem metin, hem medya boyutunda); bu kasıtlıdır, konsolide öncelik listesi için [README](README.md) bölüm 4'e bakın.

Toplam: 73 kritik bulgu.


## Ana sayfa (hero, marquee, validation, capabilities, selected works, start CTA)

- **`home-01`** — Terminal/sci-fi kelime sistemi sayfanın her yerinde ([detay](01-ana-sayfa.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:42 (SYSTEM_ACTIVE), :77 (01 / EXTERNAL SIGNAL · TESTIMONIALS // 03), :86 (// PROJECT MANAGER), :100-101 (// WEB / SAAS), :130 (03 / THE OUTPUT), :188-202 
- **`home-02`** — Hero ve alt bant kopyası slogan dolgusu ([detay](01-ana-sayfa.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:48-49, :54, :206; messages/en.json home.hero.taglineTop/taglineBottom/intro/bottomNote, home.start.bottomNote, home.start.paragraph, home.validation.lead,
- **`home-03`** — POWERED BY GOOGLE / CLAUDE rozetleri hero'da ([detay](01-ana-sayfa.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:51; src/components/PoweredBy.jsx:4-20; home-desktop-fold.png (y≈856), home-mobile-fold.png (iki satır, y≈671-705)
- **`home-04`** — İki buzzword marquee'si ([detay](01-ana-sayfa.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:59-74 (signal marquee) ve :107-126 (ticker); tailwind.config.js keyframes signal-marquee/ticker; messages/en.json home.signal.a/b, home.ticker[]; scratchp
- **`home-05`** — Start CTA: badge + yanıp sönen yeşil nokta + köşe braketleri + görünmez stock video ([detay](01-ana-sayfa.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:184-207 (section#contact), :190 (badge), :193-204 (buton), :194-197 (köşe braketleri), :198-201 (animate-ping emerald), :185-186 (BackgroundVideo + .76/.6
- **`home-06`** — Baş harfli, şirketsiz, hiçbir işe bağlanmayan testimonial'lar ([detay](01-ana-sayfa.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:76-90 (section#validation); messages/en.json testimonials[] (MERVE T., BURAK Y., SELIN A.), home.validation.heading/lead; scratchpad/home/validation-deskt
- **`home-07`** — Stock uzay gezegeni ve sunucu odası videoları, 720p, düz siyah poster ([detay](01-ana-sayfa.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:35-38 (hero <video> + çift gradient overlay), :185 (BackgroundVideo); public/videos/dark-planet.mp4 (1280×720, 1.08 Mbps, 7.5 s), public/videos/start-a-pr

## Hakkında sayfası

- **`about-01`** — "POWERED BY GOOGLE / CLAUDE" rozet satırı ([detay](02-hakkinda.md))  
  _Kaldır_ · src/app/[locale]/about/page.jsx:45 (PoweredBy, import :9); src/components/PoweredBy.jsx; about-desktop-fold.png (sol alt), about-mobile-fold.png (iki satır halinde hero'nun son ele
- **`about-02`** — Sahte arşiv notasyonu: STUDIO / 001, ALAZ / MANIFESTO 2026, 01 / 04 ([detay](02-hakkinda.md))  
  _Değiştir_ · page.jsx:41 (eyebrowLeft/Right), :44 (introNote), :52 (originEyebrow), :73 (processEyebrow), :75 (`{step.number} / 04`); messages/en.json about.eyebrowLeft, eyebrowRight, introNote
- **`about-04`** — ALAZ köken hikâyesi kaynaksız/uydurma ve sözlük-kartı pastişi ([detay](02-hakkinda.md))  
  _Değiştir_ · en.json about.originLabel ("ALAZ, N. / TURKISH, ARCHAIC"), about.originDefinition, about.originParagraphs[0]; page.jsx:53-59; about-desktop-full.png (ALAZ bölümü)
- **`about-05`** — Sayfada stüdyo yok: insan, isim, yıl, yer, iş yok ([detay](02-hakkinda.md))  
  _Ekle_ · Tüm sayfa; about-desktop-full.png, about-mobile-full.png
- **`about-06`** — Slogan dili: "NOT X. Y." negasyon tiki ve soyut isimler ([detay](02-hakkinda.md))  
  _Değiştir_ · en.json about.kicker, heading, introText, processHeading, endTextTop/endTextBottom; page.jsx:42-44, :74, :80; about-desktop-fold.png, about-desktop-full.png (kapanış)

## Hizmetler sayfası

- **`services-01`** — Üçlü numaralandırma: 18 adet index etiketi tek sayfada ([detay](03-hizmetler.md))  
  _Kaldır_ · messages/en.json servicesPage.eyebrowLeft / overviewEyebrowLeft / processEyebrowLeft / faqEyebrowLeft; src/app/[locale]/services/page.jsx:75-78, 101-104, 199-202, 222-225 (bölüm ey
- **`services-02`** — Hero: stok fiber-optik bokeh videosu, üstelik görünmüyor ([detay](03-hizmetler.md))  
  _Değiştir_ · src/app/[locale]/services/page.jsx:60-73; public/videos/services-section.mp4 (1280×720, 8 s, 1.98 MB, 1.84 Mbps video + 128 kbps ses kanalı); screenshots: services-desktop-fold.png
- **`services-03`** — Beş hizmet bloğu birebir aynı kalıp, sağ kolonun %40'ı boş ([detay](03-hizmetler.md))  
  _Değiştir_ · src/app/[locale]/services/page.jsx:130-192 (grid-cols-[12%_1fr_36%]); screenshots: svc-d-block01.png (sağ kolon y≈360'ta bitiyor, blok 734px), svc-d-block02.png, services-desktop-f

## Case study index ve detay sayfaları

- **`case-studies-01`** — Sahte arşiv/dizin etiketleri: 2 proje için "INDEX / 001", "PROJECTS ON FILE", "END OF INDEX" ([detay](04-case-studies.md))  
  _Kaldır_ · src/app/[locale]/case-studies/page.jsx:34-37, 49; messages/en.json archive.eyebrowLeft, eyebrowRight, kicker, introNote, noteLeft, noteRight; case-studies-desktop-full.png (üst ve 
- **`case-studies-09`** — Challenge/Approach/Outcome başlıkları iki projede birebir aynı slogan ([detay](04-case-studies.md))  
  _Değiştir_ · messages/en.json caseStudy.challengeHeading, approachHeading, outcomeHeading; src/app/[locale]/case-studies/[slug]/page.jsx:112,120,128; case-vocabulary-desktop-full.png ve case-ma
- **`case-studies-10`** — Numaralı eyebrow enflasyonu: PROJECT / 01, 01 / 02, 01 / THE CHALLENGE, 0X / DELIVERABLE, NEXT PROJECT / 02 ([detay](04-case-studies.md))  
  _Kaldır_ · src/app/[locale]/case-studies/[slug]/page.jsx:89, 92, 104-107, 111, 119, 127, 152, 159; messages/en.json caseStudy.challengeEyebrow/approachEyebrow/outcomeEyebrow/deliverableLabel/
- **`case-studies-11`** — Case study bir hikâye değil, üç alanlı bir form ([detay](04-case-studies.md))  
  _Değiştir_ · src/app/[locale]/case-studies/[slug]/page.jsx:109-131 (üç özdeş grid bloğu), messages/en.json projects[].challenge/approach/outcome; case-vocabulary-desktop-full.png, case-market-h
- **`case-studies-12`** — Market Hours sayfasında hiç ürün görseli yok ([detay](04-case-studies.md))  
  _Ekle_ · messages/en.json projects[1] (gallery alanı yok); src/app/[locale]/case-studies/[slug]/page.jsx:133 (gallery koşullu); public/projects/market-hours/ (yalnızca cover.jpg ve hero.jpg

## Blog index ve yazı sayfası

- **`blog-01`** — Index'te "BLOG / 001" eyebrow'u ve altı adet dekoratif mono etiket ([detay](05-blog.md))  
  _Kaldır_ · src/app/[locale]/blog/page.jsx:31-35, 41, 66-69; messages/en.json blogIndex.eyebrowLeft/eyebrowRight/kicker/introNote/noteLeft/noteRight; blog-desktop-full.png, blog-mobile-full.pn
- **`blog-02`** — Kapak görselleri: Hostinger AI-builder CDN'inden, grayscale'e boğulmuş, fallback'siz ([detay](05-blog.md))  
  _Değiştir_ · messages/en.json blogPosts[0].cover, blogPosts[1].cover (images.hostinger.com/<uuid>.png); src/app/[locale]/blog/[slug]/page.jsx:97-99; src/app/[locale]/layout.jsx:56-57 (preconnec

## Start a project sayfası ve intake formu

- **`start-project-01`** — Son adım, kullanıcı dokunmadan hata mesajlarıyla açılıyor (button type mutasyonu) ([detay](06-start-project-formu.md))  
  _Değiştir_ · src/components/IntakeForm.jsx:189 (koşullu <button type="button"> / <button type="submit">), :54-57 (nextStep / submit); ekran: scratchpad/sp/desktop-08-step3.png, scratchpad/sp/mo
- **`start-project-02`** — Backend hiçbir yere kaydedemese bile sayfa 'REQUEST RECEIVED' diyor ([detay](06-start-project-formu.md))  
  _Değiştir_ · src/app/api/contact/route.js:39-49; src/components/IntakeForm.jsx:76-82; src/lib/db.js:70-74; src/lib/mailer.js:27-30
- **`start-project-03`** — Hero videosu: AI üretimi roket fırlatma, 2.4MB, gömülü ses track'i, reduced-motion yok ([detay](06-start-project-formu.md))  
  _Kaldır_ · src/components/IntakeForm.jsx:92-97 (/videos/start-project-rocket.mp4, preload="auto", opacity .5 + iki gradient); public/videos/start-project-rocket.mp4; ekran: scratchpad/sp/rock
- **`start-project-04`** — Terminal / sci-fi 'sistem' jargonu: SECURE TRANSMISSION, TRANSMITTING..., STATUS: ACCEPTING, / 001 ([detay](06-start-project-formu.md))  
  _Değiştir_ · messages/en.json intake.sectionTopLeft, sectionTopRight, asideStatus, completeEyebrow, submittingCta, submitErrorFallback, formNotation, typeIndexSuffix, headingEyebrow, asideParag

## Global chrome: header, nav, footer, 404, legal/privacy

- **`chrome-06`** — Mobil menü: animasyonsuz düz liste, "01-05" index numaraları, alt yarısı boş ([detay](07-header-footer-404.md))  
  _Değiştir_ · src/components/Header.jsx:42-46 (`{open && <nav ...>}` koşullu mount; satır başına `0{i + 1}` mono index; ArrowUpRight lucide); nav-open-mobile.png (390px, son satırın altında 210p
- **`chrome-09`** — Footer bir varış noktası değil: dev wordmark tekrarı, CTA yok, ana nav yok, sosyal yok, e-posta 13px ([detay](07-header-footer-404.md))  
  _Değiştir_ · src/components/Footer.jsx:13-27 (wordmark clamp(90px,16vw,320px) aria-hidden; e-posta font-mono text-[13px] font-light; linkler sadece BLOG/LEGAL/PRIVACY); messages/en.json footer.
- **`chrome-10`** — İki "ofis" adresi de Regus sanal/serviced ofis merkezleri; EST. 2026 ile birlikte inandırıcı değil ([detay](07-header-footer-404.md))  
  _Değiştir_ · messages/en.json contact.offices ("1250 Broadway, 36th Floor" / "Folkart Towers, B Blok, Kat 31"); src/components/ContactInfo.jsx:7; src/components/StructuredData.jsx:29-33 (iki Po

## Tipografi ve layout sistemi (sayfalar arası)

- **`typography-01`** — Tip sistemi yok: 129 kopya inline string, sıfır token ([detay](08-tipografi-ve-layout.md))  
  _Değiştir_ · src/lib/ui.js:1; src/app/globals.css:138–162; tailwind.config.js (fontSize/spacing tanımı yok); grep: text-[12px] ×129, font-mono ×124, tracking-[.085em] ×86, leading-[1.6] ×84; ay
- **`typography-02`** — Her bölümde mono eyebrow + index numarası: slop sinyali #1 ([detay](08-tipografi-ve-layout.md))  
  _Kaldır_ · 19 eyebrow satırı: page.jsx:77,96,130,188; about/page.jsx:41,52,73; services/page.jsx:75,101,199,222; case-studies/page.jsx:34; case-studies/[slug]/page.jsx:87; blog/page.jsx:31; b
- **`typography-03`** — ALL-CAPS her seviyede: hiyerarşi aracı olarak caps tükenmiş ([detay](08-tipografi-ve-layout.md))  
  _Değiştir_ · messages/en.json'da içerik hard-coded büyük harf (nav.linkLabels, services[].title, projects[].name/discipline/type, testimonials[].name/role, contact.offices[].region, intake.step
- **`typography-missed-1`** — İki buzzword marquee'si bölüm ayırıcı olarak kullanılıyor ([detay](08-tipografi-ve-layout.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:59–74 (49px, 'ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE'), :107–126 (55px, 'TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS ✳ ARCHITECTURAL INTEGRITY 

## Hareket ve etkileşim sistemi

- **`motion-01`** — Tek tip fade-up reveal her şeyin üstünde ([detay](09-hareket-ve-etkilesim.md))  
  _Değiştir_ · src/app/globals.css:69-100, src/components/ScrollReveal.jsx:18-31; data-reveal kullanımı: src/app/[locale]/page.jsx:48-49,77-99,130-144,188-192, about/page.jsx:41-75, services/page
- **`motion-02`** — Sayfa geçişi yok; tek geri bildirim neon top loader ([detay](09-hareket-ve-etkilesim.md))  
  _Ekle_ · src/app/[locale]/layout.jsx:60-71 (NextTopLoader), src/app/globals.css:187-189 (#nprogress .bar glow); screenshot: probe-toploader-mid-nav.png
- **`motion-03`** — Ping'li yeşil nokta + köşe braketli CTA ([detay](09-hareket-ve-etkilesim.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:193-204; screenshot: probe-contact-cta-rest.png, probe-contact-cta-hover.png

## Metin / içerik sesi (İngilizce)

- **`copy-01`** — Hero metin katmanı baştan sona template-brutalist sözlüğü ([detay](10-metin-ve-ses.md))  
  _Değiştir_ · messages/en.json:410-418 (hero.status, toplineRight, kicker, taglineTop/Bottom, intro, scrollCta, bottomNote); src/app/[locale]/page.jsx:42,45,48-49,54; ayrıca hardcoded "— 001 / 0
- **`copy-02`** — "POWERED BY GOOGLE / POWERED BY CLAUDE" rozetleri ([detay](10-metin-ve-ses.md))  
  _Kaldır_ · messages/en.json:418 (hero.poweredBy); src/components/PoweredBy.jsx:82-97; src/app/[locale]/page.jsx:51; src/app/[locale]/about/page.jsx:45; screenshots: home-desktop-fold.png (sol
- **`copy-03`** — Uydurma okunan testimonial bloğu (VALIDATION) ([detay](10-metin-ve-ses.md))  
  _Kaldır_ · messages/en.json:424-431 (validation.*), 471-493 (testimonials); src/app/[locale]/page.jsx:76-90 (ShieldCheck ikon 78, "// role" 86); screenshot: home-desktop-full.png, VALIDATION 
- **`copy-04`** — İki buzzword marquee'si ([detay](10-metin-ve-ses.md))  
  _Kaldır_ · messages/en.json:420-423 (signal.a/b), 432-437 (ticker); src/app/[locale]/page.jsx:59-74 ve 107-126; screenshot: home-desktop-full.png (hero altı ve CORE CAPABILITIES altı)
- **`copy-05`** — "START SEQUENCE" CTA bölümü: komuta merkezi cosplay'i ([detay](10-metin-ve-ses.md))  
  _Değiştir_ · messages/en.json:458-469 (start.*); src/app/[locale]/page.jsx:188-206 (badge 190, paragraph 192, buton 193-204 — yeşil ping 198-201, köşe braketleri 194-197, bottomNote + "05 / 05"

## AI-slop ve şablon kalıbı dedektörü (tüm site)

- **`slop-01`** — "POWERED BY GOOGLE / POWERED BY CLAUDE" rozetleri ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · src/components/PoweredBy.jsx (tamamı); src/app/[locale]/page.jsx:46; src/app/[locale]/about/page.jsx:49; messages/en.json home.hero.poweredBy; ekran: home-desktop-fold.png, about-d
- **`slop-02`** — Sahte görünen testimonial bölümü ("VALIDATION") ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:72-90; messages/en.json testimonials[0..2], home.validation; ekran: home-desktop-full.png (VALIDATION bölümü)
- **`slop-03`** — Hero ve CTA dolgu kopyası: "NO BULLSHIT. JUST ACTION." ve türevleri ([detay](11-ai-slop-dedektoru.md))  
  _Değiştir_ · messages/en.json home.hero.taglineTop/taglineBottom, home.hero.intro ("Built with intent. Engineered to last."), home.hero.bottomNote ("PRECISION IS THE STANDARD. NOT THE GOAL."), 
- **`slop-04`** — Sahte terminal / komuta merkezi etiketleri ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:36 ("SYSTEM_ACTIVE" + 6px kare nokta), :182 ("COMMAND SEQUENCE READY" rozeti), :191-193 ("START SEQUENCE"); src/components/IntakeForm.jsx:112 ("PROJECT IN
- **`slop-05`** — Köşe braketli CTA + yeşil ping noktası ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:184-196 (4 adet absolute köşe span'ı + animate-ping emerald-400/500 nokta + ArrowUpRight); ekran: probe-contact-cta-rest.png, probe-contact-cta-hover.png,
- **`slop-06`** — İki buzzword marquee (◻ ve ✳ ayraçlı) ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · src/app/[locale]/page.jsx:52-70 (signal marquee, ◻) ve :106-123 (ticker, ✳); tailwind.config.js keyframes signal-marquee/ticker; messages/en.json home.signal, home.ticker; ekran: h
- **`slop-07`** — Her bölümde mono eyebrow çifti ve 01/05 sayaçları (tutarsız numaralandırma dahil) ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · data-reveal="line" eyebrow barı: page.jsx (4), services/page.jsx (4), about/page.jsx (3 aktif + 2 yorumlu), case-studies/page.jsx (1), case-studies/[slug]/page.jsx (1), blog/page.j
- **`slop-11`** — 8 adet stok "dark tech b-roll" video (sadece biri markayla ilgili) ([detay](11-ai-slop-dedektoru.md))  
  _Kaldır_ · public/videos/: dark-planet.mp4 (home hero, page.jsx:30, preload=auto, 1.1MB), the-work-section.mp4 (case-studies hero, devre kartı/veri merkezi, 4.5MB), start-project-rocket.mp4 (

## Mobil ve responsive deneyim

- **`mobile-01`** — Mobil menü landscape ve küçük ekranlarda son maddelerine ulaşılamıyor ([detay](12-mobil.md))  
  _Değiştir_ · src/components/Header.jsx:22-25 (body overflow hidden), :42-46 (nav absolute, min-h, overflow yok); screenshots: probe-mobile/vp-landscape-nav-open.png, vp-w320-nav-open.png, vp-ip
- **`mobile-02`** — Mobil hero: wordmark küçük, 280px boşluk, 'SCROLL' satırı fold'un altında ([detay](12-mobil.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:40-55 (pt-[30vh], mobile:pt-[66px], h1 mobile:text-[16vw]); screenshots: shots/home-mobile-fold.png, probe-mobile/vp-android360-home-fold.png
- **`mobile-03`** — Display tipografi hiyerarşisi mobilde tersine dönüyor (fit() en uzun kelimeye göre küçültüyor) ([detay](12-mobil.md))  
  _Değiştir_ · src/app/globals.css:171-179 (.fit), src/lib/fit.js, page.jsx:78 (VALIDATION fit-avail -76px), about/page.jsx:43,54, services/page.jsx:82,106, case-studies/page.jsx:44, case-studies

## Görseller, video ve marka varlıkları

- **`media-01`** — Sekiz jenerik CGI stok döngüsü markayla ilgisiz ve en klasik slop sinyali ([detay](13-gorsel-video-marka.md))  
  _Kaldır_ · public/videos/*.mp4 (20,6 MB); src/app/[locale]/page.jsx:35-37 (dark-planet), :185 (start-a-project-hero); about/page.jsx:36-38, :49, :78; services/page.jsx:62-72, :250; case-studi
- **`media-13`** — 'POWERED BY GOOGLE | POWERED BY CLAUDE' rozetleri ödünç logolarla güven satın alıyor ([detay](13-gorsel-video-marka.md))  
  _Kaldır_ · src/components/PoweredBy.jsx (Simple Icons Google + Claude path'leri); src/app/[locale]/page.jsx:58; about/page.jsx:46; home-desktop-fold.png, home-mobile-fold.png, about-desktop-f

## Performans ve teknik kalite (algılanan tasarımı etkileyen)

- **`performance-01`** — Hiçbir sayfa statik render edilmiyor; her istek SSR + middleware, CDN'de önbellenemiyor ([detay](14-performans-ve-teknik.md))  
  _Değiştir_ · src/app/[locale]/layout.jsx:48-51, src/app/[locale]/page.jsx:19-21 (ve tüm page.jsx dosyaları), src/i18n/request.js:4-9, src/i18n/routing.js:3-7, src/middleware.js
- **`performance-02`** — Hero videoları: 5 sayfada preload=auto, 20 MB toplam, sessiz AAC parçaları, tek format, ekranda görünmüyor ([detay](14-performans-ve-teknik.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:35-37 (1.1 MB), about/page.jsx:36-38 (2.2 MB), services/page.jsx:61-72 (2.0 MB), case-studies/page.jsx:29-31 (4.5 MB), src/components/IntakeForm.jsx:93-95
- **`performance-04`** — Hero'daki tagline ve intro hydration'a kadar görünmez; ilk görünüm JS'e bağımlı ([detay](14-performans-ve-teknik.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:48-49 (`data-reveal="fade"`), src/app/[locale]/layout.jsx:55 (inline `reveal-ready` script), src/components/ScrollReveal.jsx:11-34, src/app/globals.css:71

## Awwwards benchmark ve konsept yönü

- **`awwwards-01`** — Sitenin bir konsepti yok; 'tech terminal' kostümü isimle ve işle bağlantısız ([detay](15-awwwards-juri-ve-konsept.md))  
  _Değiştir_ · Tüm site; src/app/[locale]/page.jsx:42 (hero.status), :190 (start.badge), :193-204 (START SEQUENCE); messages/en.json home.hero.status 'SYSTEM_ACTIVE', home.start.badge 'COMMAND SE
- **`awwwards-02`** — Hero'da fikir ve etkileşim yok; video görünmüyor, wordmark statik ([detay](15-awwwards-juri-ve-konsept.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:34-57; h1 satır 46 (data-reveal yok); video satır 35 (opacity .62) + satır 38 gradyan + satır 39 4 kolon çizgi; home-desktop-fold.png, hover/home-hero-vid
- **`awwwards-03`** — Copy LLM-slogan dilinde: 'NO BULLSHIT. JUST ACTION.' ve 'built with intent / engineered to last' kalıpları ([detay](15-awwwards-juri-ve-konsept.md))  
  _Kaldır_ · messages/en.json home.hero.taglineTop/Bottom, home.hero.intro ('Built with intent. Engineered to last.'), home.hero.bottomNote ('PRECISION IS THE STANDARD. NOT THE GOAL.'), home.st
- **`awwwards-04`** — 'POWERED BY GOOGLE / POWERED BY CLAUDE' rozetleri hero'da ve About'ta ([detay](15-awwwards-juri-ve-konsept.md))  
  _Kaldır_ · src/components/PoweredBy.jsx:1-20; src/app/[locale]/page.jsx:51; src/app/[locale]/about/page.jsx:45; home-desktop-fold.png (y≈855), about-desktop-full.png
- **`awwwards-05`** — Sekiz adet generic stock/AI b-roll videosu (~20 MB), hiçbiri ALAZ'a ait, hiçbiri görünmüyor ([detay](15-awwwards-juri-ve-konsept.md))  
  _Değiştir_ · public/videos/*.mp4 (dark-planet, about-section gyro, about-alaz-section pürmüz, about-end-section dişliler, services-section fiber optik, start-a-project-hero server koridoru, the

## Geniş ekran (1536–2560px) ve laptop aralığı (1024–1366px): kompozisyon yukarı doğru ölçeklenmiyor, max-width yok

- **`gap-wide-and-laptop-viewports-01`** — Sistem seviyesinde max-width ve yukarı breakpoint yok: her bölüm 2416px'e yayılıyor ([detay](16-genis-ekran-ve-laptop.md))  
  _Değiştir_ · tailwind.config.js:10-16 (container tanımı, hiç kullanılmıyor), tailwind.config.js:19-23 (yalnızca max-width screens), src/app/globals.css:37 (--gutter clamp 72px tavan), globals.c
- **`gap-wide-and-laptop-viewports-02`** — Ana hero kendi 4 kolon çizgisini yok sayıyor: hairline'lar metnin içinden geçiyor, intro/kicker hiçbir şeye hizalı değil ([detay](16-genis-ekran-ve-laptop.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:39 (grid-cols-4 dekoratif <i>), :45 (kicker max-w-[780px] justify-between), :46 (h1), :49 (intro max-w-[290px] mr-[9%]). Ekran: shots/wide-1536-hero-intro
- **`gap-wide-and-laptop-viewports-03`** — Ana hero dikeyde hiçbir laptop'a sığmıyor (pt-[30vh]); 2560'ta ise 550px üst boşluk ([detay](16-genis-ekran-ve-laptop.md))  
  _Değiştir_ · src/app/[locale]/page.jsx:40 (min-h-dvh pt-[100px]), :41 (topline pt-[35px]), :44 (`my-auto pt-[30vh] pb-[2vh]`), :47 (mt clamp 85px), :51 (PoweredBy mt 56px), :53 (alt bar pt-26 p

## Klavye, odak ve ekran okuyucu erişilebilirliği: hover'a bağlı affordance'lar, jenerik focus halkası, İngilizce sabit aria etiketleri

- **`gap-keyboard-focus-a11y-04`** — Mobil menü: odak tuzağı, inert ve Escape yok; Tab menünün arkasındaki görünmez içeriğe sızıyor ([detay](17-klavye-odak-erisilebilirlik.md))  
  _Değiştir_ · src/components/Header.jsx:19-25 (open state, body overflow), :39 (toggle button), :42-46 ({open && <nav>}); kanıt: shots/kb-mobile-menu-open.png, kb-mobile-menu-tab7.png, kb-mobile
- **`gap-keyboard-focus-a11y-08`** — Intake: adım geçişi sessiz, odak alttaki butonda kalıyor; hata sonrası odaklı buton ekranın altına itiliyor; hata/zorunluluk bağları yok ([detay](17-klavye-odak-erisilebilirlik.md))  
  _Değiştir_ · src/components/IntakeForm.jsx:54 (nextStep), :115-117 (adım listesi div'leri), :123 ('0x / 03' ve '% COMPLETE'), :135,143,148,173,178 (role=alert hatalar), :141-147,171-182 (input'

## Tarayıcı ve işletim sistemi katmanı: color-scheme, scrollbar, native kontroller, autofill, print, seçim/imleç sistemi, hata ekranları

- **`gap-browser-system-layer-01`** — color-scheme tanımlı değil: tarayıcı siteyi açık tema sanıyor ([detay](18-tarayici-ve-sistem-katmani.md))  
  _Ekle_ · src/app/globals.css:6-38 (:root'ta color-scheme yok); src/app/[locale]/layout.jsx:42-46 (viewport export'unda colorScheme yok, head'de <meta name="color-scheme"> basılmıyor — curl 

## Sayfalar arası yolculuk ve bağlantı grafiği: header dışında neredeyse hiçbir yol yok, canlı ürün tek yerden linkli, sosyal profil sitede yok

- **`gap-journey-link-graph-01`** — Footer bir varış noktası değil: nav, CTA, sosyal, canlı ürün yok; tanımlı CTA string'i bile render edilmiyor ([detay](19-sayfalar-arasi-yolculuk.md))  
  _Değiştir_ · src/components/Footer.jsx:5 (FOOTER_HREFS = ['/blog','/legal','/privacy']), :13-28; messages/en.json footer.talk ("HAVE A SYSTEM IN MIND?") hiçbir yerde kullanılmıyor (grep: 0 sonu
- **`gap-journey-link-graph-03`** — Hizmet ↔ vaka ↔ yazı ↔ form arasında yatay bağlantı sıfır; her içerik türü kendi silosunda bitiyor ([detay](19-sayfalar-arasi-yolculuk.md))  
  _Ekle_ · src/app/[locale]/services/page.jsx:130-192 (article: CTA yok, kanıt linki yok), :114-124 (chip'ler sadece #anchor); src/app/[locale]/case-studies/[slug]/page.jsx:92 (type/disciplin

## Site dışı yüzeyler: sekme başlığı, paylaşım kartı (OG), Google sonucu, JSON-LD'nin görünür etkileri, llms.txt ve PWA kimliği

- **`gap-offsite-surfaces-04`** — Sekiz sayfa tek OG görseli, üstünde emekli slogan ([detay](20-site-disi-yuzeyler.md))  
  _Değiştir_ · src/lib/seo.js:15 (OG_IMAGE alt 'ALAZ — Software & High-Performance Web Engineering'), :43 (varsayılan image), public/og-image.png; /, /services, /about, /case-studies, /blog, /sta
- **`gap-offsite-surfaces-05`** — Vaka sayfaları ham 1920×1200 ürün kapağını OG olarak gönderiyor ([detay](20-site-disi-yuzeyler.md))  
  _Değiştir_ · src/app/[locale]/case-studies/[slug]/page.jsx:28 (image: project.image, 1920×1200, alt: project.name), public/projects/vocabulary/cover.png (202 KB), public/projects/market-hours/c
- **`gap-offsite-surfaces-06`** — Blog OG görseli Hostinger (AI site builder) CDN'indeki stok PNG ([detay](20-site-disi-yuzeyler.md))  
  _Değiştir_ · src/app/[locale]/blog/[slug]/page.jsx:32 (image: post.cover, 1200×630 varsayımı kodda sabit), :64-74 (BlogPosting.image), messages/en.json:97, 113 (cover URL'leri), :3-7 (media.* h