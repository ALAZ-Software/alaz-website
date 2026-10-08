# Performans ve teknik kalite (algılanan tasarımı etkileyen)

**Boyut puanı:** 4.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 27 (3 kritik · 9 önemli · 15 ince işçilik) · **Korunacaklar:** 10 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Kod tabanı yüzeyde temiz görünüyor (next/font ile self-host font, next/image, IO tabanlı lazy video bileşeni, no-JS fallback'li reveal sistemi, JSON-LD) ama production build'i gerçekten çalıştırınca tablo değişiyor: hiçbir pazarlama sayfası statik üretilmiyor (prerender-manifest boş, `/` yanıtı `Cache-Control: private, no-store` + `set-cookie`), yani her ziyaret 52 KB'lık middleware + Node SSR'dan geçiyor ve CDN'de önbellenemiyor. Hero'lar 5 sayfada `preload="auto"` ile 1.1–4.5 MB'lık, içinde sessiz AAC parçası taşıyan, 720p, tek formatlı ve ekranda neredeyse görünmeyen (case-studies-desktop-fold, svc-d-hero-video-raw: düz siyah) videolar yüklüyor; toplam video ağırlığı 20 MB ve hepsi `max-age=0` ile servis ediliyor. Hero'nun tagline/intro metni hydration bitene kadar görünmez kalıyor (probe-home-load-0ms → 900ms), `prefers-reduced-motion` autoplay videolar, iki marquee ve ping animasyonu için yok sayılıyor, header'daki 14px backdrop-blur oynayan videonun üstünde her karede yeniden hesaplanıyor. Repo'da 55 adet hiç import edilmeyen shadcn/ui dosyası, ~40 kullanılmayan paket (27 radix, recharts, embla, framer-motion, pocketbase…) ve AuthContext/ProtectedRoute kalıntıları var; bunlar hem Tailwind CSS'ini şişiriyor hem de sitenin şablon kökenini ele veriyor. Awwwards 'developer' puanı için önce statik render + gerçek bir video pipeline'ı + ölü kodun temizlenmesi gerekiyor; mevcut hali 4.5/10.

## Korunması gerekenler

- `BackgroundVideo` (src/components/BackgroundVideo.jsx) örnek bir desen: preload=none, IntersectionObserver ile 300px önce yükleme, ekran dışında pause, reduced-motion ve Save-Data'da poster'da kalma. Hero'lara da bu bileşen taşınmalı, yeniden yazılmamalı.
- Fontlar next/font ile self-host (runtime'da Google Fonts isteği yok), otomatik size-adjust fallback açık; Google zaten variable dosya veriyor, yani ağırlık çeşitliliğinin byte maliyeti yok.
- next/image doğru kullanılmış: `fill` + `sizes`, hero'larda `priority`, fold altında lazy; AVIF/WebP formatları açık; proje görselleri /public'te, galeri WebP ve 9:16 kutuda CLS'siz.
- `fit()` + `.fit` class'ı (src/lib/fit.js, globals.css:175-179): başlık sığdırma tamamen CSS `min()` ile, JS ölçümü ve layout shift yok. Akıllı ve hafif bir çözüm; koruyun.
- ScrollReveal sistemi: `.reveal-ready` ile JS yokken içerik görünür, reduced-motion CSS'i var, geçiş bitince `data-reveal` temizlenerek hover transition'larıyla çakışma önlenmiş. Fold altı için doğru tasarım.
- Global `:focus-visible` (2px beyaz outline, 4px offset), `::selection`, `-webkit-tap-highlight-color` ayarları; semantik HTML (article/blockquote/address/time/details+summary/ol), `aria-pressed`, `aria-expanded`, `role="alert"` hata mesajları, dekoratif videolara `aria-hidden`.
- SEO/yapısal veri katmanı eksiksiz: Organization/WebSite graph, Breadcrumb, FAQPage, BlogPosting, CreativeWork JSON-LD; görselli sitemap, hreflang + canonical, manifest, robots, llms.txt; güvenlik header'ları (HSTS, nosniff, frame deny).
- Route JS'leri küçük (page chunk'ları 0.2–17 KB), First Load JS 113 KB gz ve ağır animasyon kütüphanesi client'a gitmiyor; Lenis'in touch'ta native scroll'u bırakması doğru karar.
- `generateStaticParams` tüm locale ve slug'lar için hazır — statik render'a geçiş tek satır (`setRequestLocale`) uzağında.
- Bağımlılıksız Markdown renderer ve `fit()` gibi küçük, amaca özel yardımcılar; kalıntılar temizlenince kod tabanı gerçekten 'el yapımı' hissi verecek.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `performance-01` — Hiçbir sayfa statik render edilmiyor; her istek SSR + middleware, CDN'de önbellenemiyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:48-51, src/app/[locale]/page.jsx:19-21 (ve tüm page.jsx dosyaları), src/i18n/request.js:4-9, src/i18n/routing.js:3-7, src/middleware.js

**Sorun.** `generateStaticParams` var ve build tablosu `●` gösteriyor ama scratchpad'de aldığım production build'de `.next/prerender-manifest.json` routes yalnızca `_not-found`, `robots.txt`, `sitemap.xml` içeriyor; `.next/server/app/en/` altında sıfır dosya var. `next start` ile `curl -I /` → `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`, `x-middleware-rewrite: /en`, `set-cookie: NEXT_LOCALE=en`. Sebep: next-intl'in `requestLocale`'i `setRequestLocale(locale)` çağrılmadığı için `headers()`'a düşüyor ve route dinamik render'a geçiyor. Üstüne 52 KB'lık middleware her istekte çalışıyor ve Accept-Language'e göre 307 redirect atıyor (`curl -I / -H 'Accept-Language: tr'` → `307 /tr`).

**Neden önemli.** Awwwards 'developer' kriterinin ilk maddesi hız. Bir pazarlama sitesinde TTFB'nin Node SSR + middleware'e bağlı olması, yanıtın CDN/edge'de önbellenememesi ve font preload ipuçlarının `<head>`'e değil Flight payload'ına (`:HL`) düşmesi (production HTML'de `as="font"` preload linki yok) doğrudan LCP ve FOUT'a yansıyor. Ayrıca `set-cookie` her yanıtı cache-bypass yapıyor.

**Ne yapılmalı.** 1) `src/app/[locale]/layout.jsx` ve her `page.jsx`'in en başında `import { setRequestLocale } from 'next-intl/server'; const { locale } = await params; setRequestLocale(locale);` (getTranslations/getMessages çağrılarından önce). `[slug]` sayfalarında da aynı. 2) `src/i18n/routing.js`: `localeDetection: false, localeCookie: false` ekleyin; `/` daima EN olsun, dil değişimi header'daki anahtarla yapılsın (zaten var). 3) Doğrulama: `next build` sonrası `.next/prerender-manifest.json` içinde `/en`, `/en/about`… görünmeli; `curl -I` → `s-maxage=31536000, stale-while-revalidate` ve `<head>`'de 3 adet `<link rel=preload as=font>` olmalı. 4) Statik olunca HTML'i CDN'e (Cloudflare/Vercel edge) koyun; Hostinger Node'u sadece `/api/contact` için kalır.

#### `performance-02` — Hero videoları: 5 sayfada preload=auto, 20 MB toplam, sessiz AAC parçaları, tek format, ekranda görünmüyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35-37 (1.1 MB), about/page.jsx:36-38 (2.2 MB), services/page.jsx:61-72 (2.0 MB), case-studies/page.jsx:29-31 (4.5 MB), src/components/IntakeForm.jsx:93-95 (2.4 MB); public/videos (8 dosya, 20 MB); ekran: home-desktop-fold, case-studies-desktop-fold, svc-d-hero-video-raw, home-mobile-fold

**Sorun.** ffprobe: tüm dosyalar 1280x720 H.264 24fps ve her birinde 128 kbps AAC ses parçası var (muted oynatılıyor, ~160 KB/dosya çöp). Yalnızca MP4; WebM/AV1 yok; mobil için ayrı rendition yok (390px telefon da 720p'yi indiriyor). `the-work-section.mp4` 4.5 MB ve 3.6 Mbps. Hero'larda `preload="auto"` + `autoPlay` olduğundan LCP'den önce bant genişliğini video yiyor. Görsel karşılık: opacity .5–.62 + iki gradient katmanı altında video neredeyse görünmüyor; case-studies ve services fold ekran görüntülerinde arka plan düz siyah. Chrome 116+ autoplay videonun ilk karesini LCP adayı sayar; 1.1 MB'lık dosyanın ilk karesi 4G'de saniyeler sonra geldiği için LCP videoya kilitleniyor.

**Neden önemli.** Awwwards jürisi mobilde ve kısıtlı bağlantıda test eder; sayfa başı 2–4.5 MB görünmez video, 'engineered to last' iddiasıyla çelişen en somut teknik zafiyet. Bu kadar ağırlık için sıfır görsel getiri craft eksikliği olarak okunur.

**Ne yapılmalı.** Bir encode pipeline'ı kurun (`scripts/encode-videos.sh`): sesi atın `-an`, `-movflags +faststart`, iki rendition + iki codec: `ffmpeg -i src.mov -an -vf scale=1920:-2 -c:v libsvtav1 -crf 38 -preset 6 -g 240 out-1080.webm` ve `-c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p out-1080.mp4`; mobil için `scale=-2:960` (portre kadraj) ~300 KB. Koyu/grenli görüntüde hedef bitrate 700–1000 kbps. Kaynak orijinal 1080p yoksa 720p'de kalın ama 480p mobil üretin. Markup: `<source media="(max-width:760px)" type="video/webm; codecs=av01">` + mp4 fallback. Hero'larda `preload="metadata"` kullanın ve yüklemeyi `requestIdleCallback`/`load` sonrasına alın (BackgroundVideo'daki IO mantığını `eager` prop ile hero'ya taşıyın). Ya da daha radikal: görünmeyen videoyu 60–120 KB'lık looping AVIF/WebP grain texture veya 2 KB'lık canvas noise ile değiştirin; sadece home hero'da gerçek video kalsın.

> **Doğrulayıcı notu:** ffprobe ile doğruladım: 8 dosyanın hepsi 1280x720 H.264 24fps + 128 kbps AAC; the-work-section.mp4 4.5 MB / 3.6 Mbps; `preload="auto"` + autoPlay 5 yerde (page.jsx:35, about:36, services:61-72, case-studies:29, IntakeForm.jsx:93). case-studies-desktop-fold ve svc-d-hero-video-raw/3s ekranlarında arka plan düz siyah. Düzeltmeler: (a) Dosyalarda `moov` atomu zaten `mdat`'tan önce (faststart var), fix'teki `-movflags +faststart` sadece korunması gereken bir ayar, kazanç değil. (b) 'LCP videoya kilitleniyor' iddiası gösterilememiş: Playwright'ta LCP girdisi 576 ms'de H1 (text, 176.500 px²) çıktı; Chrome 116+ video ilk karesini aday sayar ama bunun burada LCP'yi kaydırdığı ölçülmedi — hipotez olarak kalsın. (c) Sayfa başı ağırlık eksik verilmiş: home = 1.1 MB hero + 3.4 MB start-a-project-hero.mp4 (contact bölümü, .76/.68 gradient altında, page.jsx:185) = 4.6 MB; about = 3 video (2.2 + 2.3 + 2.5) = 7.1 MB; services = 2.0 + 2.5 = 4.5 MB. Encode pipeline'ı ve `<source media>`/poster önerisi doğru ve uygulanabilir.

#### `performance-04` — Hero'daki tagline ve intro hydration'a kadar görünmez; ilk görünüm JS'e bağımlı

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:48-49 (`data-reveal="fade"`), src/app/[locale]/layout.jsx:55 (inline `reveal-ready` script), src/components/ScrollReveal.jsx:11-34, src/app/globals.css:71-90; ekran: probe-home-load-0ms, probe-home-load-150ms, probe-home-load-900ms

**Sorun.** Inline script `reveal-ready` sınıfını HTML parse anında ekliyor, bu da `[data-reveal]:not(.is-revealed)` öğelerini opacity:0 yapıyor; `is-revealed` ise ancak React hydrate olup `ScrollReveal`'ın useEffect'i çalışınca geliyor. Yani ~113 KB gz JS inene ve çalışana kadar hero'nun tagline'ı ve intro paragrafı yok (0 ms karesi sadece wordmark'ı gösteriyor). Yavaş bağlantıda bu saniyeler sürer ve 'bozuk yüklenme' hissi verir; hızlı bağlantıda ise wordmark hemen, tagline 150 ms sonra ayrı ayrı belirdiği için koreografi değil tutarsızlık gibi okunuyor.

**Neden önemli.** Fold içi içerik için JS'e bağlı reveal, Awwwards jürilerinin hemen fark ettiği bir anti-pattern: ilk kare eksik, sonra parçalar düşüyor. Ayrıca LCP metin adayı (tagline) geç boyanıyor.

**Ne yapılmalı.** Fold üstündeki hiçbir öğeye `data-reveal` vermeyin. Hero girişini saf CSS keyframe ile koreografi yapın: `.hero-in { animation: rise .7s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d) }` ve `@keyframes rise { from { opacity:0; transform: translateY(.3em) } }`; sıra: eyebrow 0ms → wordmark 80ms (clip-path veya translateY) → tagline 200ms → intro 300ms → PoweredBy 380ms. `prefers-reduced-motion`'da `animation: none`. IO tabanlı `ScrollReveal` yalnızca fold altındaki bölümler için kalsın. Bonus: `document.fonts.ready` beklenip `html.fonts-ready` sınıfı ile animasyon başlatılırsa FOUT ve reveal aynı anda biter.

> **Doğrulayıcı notu:** Mekanizma doğru (layout.jsx:55 inline script `reveal-ready` ekliyor, globals.css:71-90 `[data-reveal]:not(.is-revealed)` opacity:0, `is-revealed` ancak ScrollReveal useEffect'i hydration sonrası çalışınca geliyor; probe-home-load-0ms'de tagline/intro yok). Ama bulgu ciddi biçimde eksik: sorun sadece home tagline'ı değil. `<h1 data-reveal="mask">` about/page.jsx:43, case-studies/page.jsx:36, blog/page.jsx:36, blog/[slug]/page.jsx:19 ve case-studies/[slug]/page.jsx:19'da — yani 5 sayfa tipinde SAYFA BAŞLIĞI (LCP metni) hydration'a kadar görünmez. skeptic-about-prehydration.png bunu gösteriyor: eyebrow ve intro var, hero'nun ortası bomboş, başlık yok. Bu nedenle severity critical: yavaş bağlantıda ilk kare 'kırık sayfa'. Fix aynı, kapsamı genişletin: hiçbir sayfada h1/hero elemanına `data-reveal` verilmesin, hero girişi saf CSS keyframe ile; `data-reveal` sadece fold altı.

### ÖNEMLİ

#### `performance-03` — Tek, düz renkli 3.7 KB poster 8 farklı videoya paylaştırılmış; LCP ve siyah-flash sorunu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/videos/poster.png (1280x720, 3756 B); src/app/[locale]/page.jsx:35, about:36, services:62, case-studies:29, IntakeForm.jsx:93, BackgroundVideo.jsx:30

**Sorun.** 1280x720 PNG'nin 3.7 KB olması, görüntünün pratikte tek renk olduğunu gösteriyor. Chrome düşük-entropi görselleri (≈0.03 bit/px, eşik 0.05) LCP adayı saymaz; dolayısıyla poster LCP'yi erkene çekmiyor, video gelene kadar hero düz siyah bir dikdörtgen, sonra 'pop' ile görüntü beliriyor. iOS Low Power Mode'da autoplay engellenince kullanıcı kalıcı olarak düz siyah görüyor.

**Neden önemli.** Poster, video stratejisinin en ucuz LCP kaldıracı; doğru kullanılırsa LCP ilk paint'te kilitlenir ve video gelişi görünmez olur. Şu an hem ölçümde hem gözde kayıp var.

**Ne yapılmalı.** Her video için gerçek ilk kareden poster üretin: `ffmpeg -i x.mp4 -frames:v 1 -vf scale=1920:-2 x.poster.jpg` → `avifenc --min 30 --max 40` ile 15–30 KB AVIF (JPEG fallback). Hero poster'ını `<link rel="preload" as="image" fetchpriority="high">` ile head'e koyun (statik render sonrası mümkün). Poster'ın tonu videonun ortalama rengini taşısın ki geçiş görünmesin. Opsiyonel: `BackgroundVideo`'ya `onPlaying` ile `data-playing` attribute'u ekleyip poster → video arasında 300 ms opacity cross-fade yapın.

#### `performance-05` — /videos ve /projects statik varlıkları max-age=0 ile servis ediliyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** next.config.js:29-42 (headers()), public/videos/*, public/projects/*

**Sorun.** `curl -I /videos/dark-planet.mp4` → `Cache-Control: public, max-age=0` (Next'in `public/` için varsayılanı). 20 MB video ve 2.7 MB proje görseli her sayfa geçişinde revalidate ediliyor; CDN'de de TTL yok. `_next/static` doğru şekilde `immutable` ama kendi varlıklarınız değil.

**Neden önemli.** Site içi gezinmede aynı hero videosunun tekrar kontrol edilmesi gereksiz istek ve bazı CDN'lerde tam yeniden indirme demek; jüri ikinci-üçüncü sayfada da yavaşlık hisseder.

**Ne yapılmalı.** next.config.js `headers()`'a ekleyin: `{ source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }` ve aynısı `/projects/:path*`, `/fonts/:path*` için. Immutable için dosya adlarına içerik hash'i koyun (`dark-planet.a1b2c3.mp4`) ya da build'de `?v=<hash>` ekleyen küçük bir helper (`src/lib/asset.js`) kullanın. `og-image.png` ve `logo.png` 1 gün TTL ile ayrı kuralda kalsın.

#### `performance-06` — Ölü kod ve kullanılmayan bağımlılıklar: 55 shadcn/ui dosyası, ~40 paket, auth/pocketbase kalıntıları; Tailwind CSS'i şişiriyor

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/ui/* (55 dosya, 0 import), package.json:12-66, src/contexts/AuthContext.jsx, src/components/ProtectedRoute.jsx, src/components/Reveal.jsx (framer-motion), src/components/CountUp.jsx, src/lib/ui.js (sadece yorum), src/lib/format.js, src/lib/pocketbaseClient.js, src/app/[locale]/page.jsx:3 (`ArrowRight`, `CirclePower` kullanılmıyor) ve :22 (`media` değişkeni kullanılmıyor), messages/en.json:2-8 (5 ölü hostinger URL'i), tailwind.config.js:20-24 (container), :60-69 (sidebar renkleri), :87-100 (accordion keyframes), src/app/globals.css:10-29 (shadcn HSL token'ları)

**Sorun.** `grep` ile doğruladım: `@/components/ui/` hiçbir yerden import edilmiyor; recharts, embla, cmdk, vaul, sonner, input-otp, react-resizable-panels, react-day-picker, next-themes, react-hook-form, @hookform/resolvers, zod, date-fns ve 27 @radix-ui paketi yalnızca bu ölü dosyalardan referans alıyor; framer-motion yalnızca import edilmeyen Reveal.jsx'te; pocketbase yalnızca import edilmeyen AuthContext'te. Tree-shaking sayesinde JS bundle'a girmiyorlar ama Tailwind `content: ['./src/**/*.{js,jsx}']` bu 55 dosyayı tarayıp CSS üretiyor: production stylesheet 114 KB raw / 21 KB gz, 1676 kural; içinde 63 `sidebar`, 75 `ring-offset`, 14 `slide-in-from`, 8 `accordion` seçicisi var. Ayrıca `npm install` 27 radix paketi çekiyor, `tailwindcss-animate` plugin'i ve shadcn HSL token seti (`--card`, `--popover`, `--destructive`, `--sidebar-*`) design-token kaynağını ikiye bölüyor (`--ink/--line/--dim` gerçek sistem, HSL set kullanılmıyor).

**Neden önemli.** Jüri repo'yu görmez ama CSS'i ve bundle'ı görür; shadcn kalıntıları + 'AI builder' bağımlılık listesi sitenin şablondan türetildiğinin en güçlü teknik kanıtı. Tek kaynaklı bir token seti ve sıfır ölü kod, 'developer' puanının craft kısmı.

**Ne yapılmalı.** 1) `rm -rf src/components/ui src/contexts src/components/ProtectedRoute.jsx src/components/Reveal.jsx src/components/CountUp.jsx src/lib/ui.js src/lib/format.js src/lib/pocketbaseClient.js`. 2) `npm uninstall` ile radix paketleri, recharts, embla-carousel-react, cmdk, vaul, sonner, input-otp, react-resizable-panels, react-day-picker, next-themes, react-hook-form, @hookform/resolvers, zod, date-fns, framer-motion, pocketbase, tailwindcss-animate, class-variance-authority. Kalanlar: next, react, next-intl, lenis, lucide-react (ya da inline SVG), nodemailer, mysql2, clsx/tailwind-merge. 3) tailwind.config.js'den `container`, `sidebar`, `accordion-*` ve shadcn renk haritasını; globals.css'ten HSL token bloğunu silip tek token seti bırakın (`--ink, --surface, --line, --gray, --dim, --white, --gutter`). 4) `eslint-plugin-unused-imports` + `knip` ekleyin (`npx knip` bu listeyi otomatik verir). 5) page.jsx:3 ve :22'deki kullanılmayan import/değişkeni, en.json'daki `media` bloğunu silin. Ölçüm: CSS gz 21 KB → ~9 KB beklenir.

#### `performance-07` — NextIntlClientProvider tüm messages/en.json'u her sayfaya gömüyor; next-intl+ICU runtime'ı client'a iniyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:50,72 (`getMessages()` → `messages={messages}`), src/components/Header.jsx:15-17 (`useTranslations('nav')`), src/components/IntakeForm.jsx:21-28; production: chunk 875-*.js (88.7 KB raw / 27 KB gz: next-intl + IntlMessageFormat + lucide)

**Sorun.** Client'ta mesaja ihtiyaç duyan iki bileşen var (Header: `nav`, 87 byte; IntakeForm: `intake`, 3.3 KB) ama 55 KB'lık en.json'un tamamı (blogPosts 14 KB, servicesPage 11 KB, legal 4.9 KB…) RSC payload'ına yazılıyor: ana sayfa production HTML'i 170 KB (42 KB gz), bunun ~37 K karakteri `messages`; hero intro metni HTML'de 3 kez (HTML + RSC + messages), `blogPosts` ana sayfada bile geçiyor. Ayrıca ICU formatlayıcı (IntlMessageFormat) sadece `{count}`/`{year}` gibi basit interpolasyonlar için 27 KB gz client JS getiriyor.

**Neden önemli.** 170 KB'lık HTML ve çift/üç kat tekrarlanan metin, 'performance-obsessed studio' iddiasına ters; First Load JS 113 KB gz'nin dörtte biri hiç gerekmeyen bir çeviri runtime'ı.

**Ne yapılmalı.** Kısa yol: layout'ta `messages={{ nav: messages.nav }}`; start-project sayfasında `<NextIntlClientProvider messages={{ intake: messages.intake }}><IntakeForm/></NextIntlClientProvider>`. Doğru yol: Header'ı server component yapın, sadece hamburger/aç-kapa için `MenuToggle` client adası bırakıp `links`, `cta`, `otherLocale` prop'larıyla besleyin; IntakeForm'a `copy={t.raw('intake')}` prop'u geçin; `NextIntlClientProvider`'ı `messages`'sız (sadece `locale`) bırakın ki `@/i18n/navigation` Link'i çalışsın. Hedef: HTML < 60 KB gz, chunk 875 bundle'dan düşsün (bundle-analyzer ile doğrulayın).

#### `performance-08` — Font yükleme: latin-ext EN sayfalarında da preload ediliyor (~130 KB boşa), head'de preload yok, 320px wordmark swap ile FOUT'a açık

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:14-17 (`subsets: ['latin','latin-ext']`, `display: 'swap'`), production .next/static/media/*.p.woff2 (6 dosya, 244 KB), production HTML head (0 adet `as="font"` preload; 6 adet `:HL` Flight ipucu)

**Sorun.** next/font, `subsets` dizisindeki her alt kümeyi preload işaretliyor: Inter latin-ext 85 KB, Archivo latin-ext 32.6 KB, Mono latin-ext 11.6 KB EN sayfalarında da zorla indiriliyor (unicode-range normalde bunları hiç çekmezdi). Dinamik render yüzünden preload'lar `<link>` yerine Flight `:HL` kayıtlarına düşüyor; yani tarayıcı fontları CSS'i parse edip layout yapana kadar keşfetmiyor. `display: 'swap'` + 16vw'lik wordmark = ilk ziyarette fallback fontla çizilip Archivo'ya geçen, Awwwards jürisinin anında yakaladığı bir FOUT. Fallback metrikleri `adjustFontFallback` ile ayarlı olduğundan CLS küçük ama görsel sıçrama büyük.

**Neden önemli.** Display tipografi bu sitenin tek büyük görsel fikri; onun ilk karede yanlış fontla gelmesi tasarımı doğrudan bozar. 130 KB gereksiz font, hero videosuyla aynı anda bant genişliği yarışına giriyor.

**Ne yapılmalı.** 1) performance-01 ile statik render'a geçince head preload'ları geri gelir. 2) Font dosyalarını `public/fonts`'a alıp klasik `@font-face` ile iki `src`/`unicode-range` bloğu (latin + latin-ext) tanımlayın; layout'ta locale'e göre manuel `<link rel="preload" as="font" type="font/woff2" crossorigin>` (EN: sadece latin 3 dosya ≈ 115 KB; TR: + latin-ext). `pyftsubset --flavor=woff2 --layout-features='kern,liga,cv02,cv03,cv04,cv11'` ile subset'leyin. 3) Archivo için `font-display: block` (preload ile 100 ms içinde gelir, fallback hiç görünmez) ya da `optional`; Inter `swap` kalabilir. 4) `size-adjust`/`ascent-override` ile fallback metriklerini koruyun (`@font-face { font-family: 'Archivo Fallback'; src: local('Arial'); size-adjust: 104%; }`).

#### `performance-10` — prefers-reduced-motion ve Save-Data: hero autoplay videolar, iki marquee, animate-ping ve hover transition'lar yok sayıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:35 (autoPlay), :59-74 (`animate-signal-marquee`), :107-126 (`animate-ticker`), :198-201 (`animate-ping`), about:36, services:61, case-studies:29, IntakeForm.jsx:93; tailwind.config.js:101-106; src/app/globals.css:92-100 (sadece reveal için var)

**Sorun.** Reduced-motion yalnızca ScrollReveal CSS'i, SmoothScroll ve BackgroundVideo'da ele alınmış. Fold üstündeki 5 hero `<video autoPlay>` koşulsuz oynuyor, 28s/30s'lik iki sonsuz marquee ve yeşil ping sonsuz döngüde (ekran dışında bile) çalışıyor; hiçbir yerde `motion-reduce:` utility yok (grep: 0). `navigator.connection.saveData` hero'larda bakılmıyor.

**Neden önemli.** Awwwards 'accessibility' alt puanı ve vestibüler rahatsızlığı olan kullanıcılar; ayrıca jüri reduced-motion açıkken siteyi dener. Sonsuz animasyonlar ekran dışında da compositor'ı meşgul eder (pil/ısı).

**Ne yapılmalı.** 1) Hero videolarını `BackgroundVideo`'ya `eager` prop'uyla taşıyın: reduced-motion veya saveData'da `src` hiç atanmasın, poster kalsın; görünürlük dışına çıkınca `pause()`. 2) Marquee ve ping'e `motion-reduce:[animation:none]`; marquee'yi IO ile `[animation-play-state:paused]` yapın (ekran dışında). 3) globals.css'e genel kural: `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important } }`. 4) Yeşil ping'i tamamen kaldırın (slop sinyali, bkz. tasarım boyutu).

#### `performance-11` — Header'da 14px backdrop-blur + saturate + backdrop-filter transition, oynayan videonun üstünde her karede yeniden hesaplanıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:27 (`backdrop-saturate-150`, `backdrop-blur-[14px]`, `[transition:…backdrop-filter_.35s…]`), src/app/[locale]/page.jsx:160-163 (kart başına 2 `backdrop-blur-md` rozet), case-studies/[slug]/page.jsx:96 ve StoreButtons.jsx:21 (`backdrop-blur-sm`)

**Sorun.** Fixed header tüm genişlikte (1440×76) blur alanı; altında hero videosu oynarken her video karesi blur'un yeniden render edilmesini tetikliyor. `backdrop-filter`'ı transition'a koymak animasyon süresince her karede filtre yeniden hesaplatıyor (zaten menü aç/kapa dışında değişmiyor). Mid-range Android'de hero scroll'unda kare düşmesi ve pil tüketimi; `backdrop-saturate-150` koyu arka planda görsel katkısı olmayan ekstra filtre.

**Neden önemli.** Smooth scroll (Lenis) + 60fps hissi Awwwards'ın temel beklentisi; en pahalı compositing efektini en büyük ve en sık değişen alana koymak bunu baltalıyor.

**Ne yapılmalı.** 1) `backdrop-saturate-150`'yi ve transition listesinden `backdrop-filter`'ı kaldırın; sadece `background-color .35s`. 2) Blur'u hero geçilince devreye alın: hero'nun altına 1px sentinel koyup IO ile `data-scrolled` toggle edin; hero üstündeyken header şeffaf (sadece `mix-blend-mode: difference` ile logo/nav), sonra `bg-[#0a0a0a]/85 backdrop-blur-[8px]`. 3) Proje kartlarındaki rozetlerde blur yerine `bg-black/70` düz dolgu yeterli (zaten görüntü koyu). Ölçüm: Chrome DevTools Performance → Layers panelinde header katmanının 'paint count'u video oynarken artmamalı.

#### `performance-13` — Kontrast: mono mikro-metinlerin bir kısmı WCAG AA'nın altında (hesaplanmış oranlar)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:59 (`text-[#73777d]` on #111 → 4.19:1), src/components/IntakeForm.jsx:115 (`text-[#717171]` 12px bold → ≈4.0:1), IntakeForm.jsx:12 (`placeholder:text-[#6f7277]` on #111 → 3.91:1), page.jsx:157 (`text-[#555]` → 2.66:1), page.jsx:100 (`text-[#666]` → 3.45:1), src/components/StoreButtons.jsx:16 (`text-[10px] opacity-70` → ≈3.7:1 ve 10px), ekran: home-desktop-fold, start-project-desktop-fold

**Sorun.** Ana `text-dim` (#7e828a) #0a0a0a üstünde 5.14:1 ile geçiyor, hover zemini #141414'te 4.78:1 ile sınırda. Ama sinyal marquee'si (#73777d), intake adım etiketleri (#717171), placeholder (#6f7277), 'ASSET IN PROGRESS' (#555) ve store 'soon' etiketi (10px, %70 opaklık) 12px'lik normal metin için gereken 4.5:1'in altında. Başlık sonundaki gri nokta (#5f5f5f, 3.10:1) büyük metin olduğu için 3:1 eşiğini kıl payı geçiyor.

**Neden önemli.** Awwwards accessibility puanı + jürinin parlak ekran/dış mekân testinde mono eyebrow'lar kayboluyor; 10px metin zaten okunabilirlik sınırının altında.

**Ne yapılmalı.** Token'lara bağlayın, ad-hoc hex kullanmayın: `--dim: #858a92` (≈5.6:1 #0a0a0a, ≈5.2:1 #141414), `--faint: #6e6e6e` sadece dekoratif/large için. Değişiklikler: page.jsx:59 → `text-dim`; IntakeForm:115 → `text-[#8f9398]` (≈6:1); placeholder → `#8b8f96`; `#555`/`#666` → `text-dim`; StoreButtons küçük etiket → 12px, opacity yok, `#bdbdbd`. Kontrol için `npx @axe-core/cli http://localhost:3000` CI'ya eklenebilir.

> **Doğrulayıcı notu:** Oranları yeniden hesapladım (WCAG 2.x): #73777d/#111 = 4,19 ✓; #717171/#0a0a0a = 4,06 (≈4,0 ✓); #6f7277/#111 = 3,91 ✓; #666/#0a0a0a = 3,45 ✓; #7e828a → 5,14 / 4,78 ✓; #5f5f5f/#0e0e0e = 3,02 (3,10 değil, yine de 3:1'i geçiyor). Düzeltme: 'ASSET IN PROGRESS' `#555` zemini `bg-[#141414]` (page.jsx:155) → 2,47:1, reviewer'ın 2,66'sından da kötü. Store 'soon' etiketi (#9a9a9a × opacity .7 ≈ #6f6f6f) ≈ 3,9:1 ve 10px. Önerilen değerler doğrulandı: #858a92 → 5,7 / 5,31; #8f9398 → 6,41; #8b8f96/#111 → 5,82. Satırlar doğru (page.jsx:59, :100, :157; IntakeForm.jsx:12, :115; StoreButtons.jsx:16).

#### `performance-16` — Lenis entegrasyon boşlukları: native smooth scrollTo nötrleniyor, menü overflow:hidden ile kapanıyor, instance paylaşılmıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/SmoothScroll.jsx:11-20, src/components/IntakeForm.jsx:37 (`window.scrollTo({behavior:'smooth'})`), src/components/Header.jsx:22-25 (`document.body.style.overflow`), src/app/globals.css:49-55 (`.lenis.lenis-smooth { scroll-behavior:auto !important }`)

**Sorun.** Lenis `html.lenis-smooth`'a `scroll-behavior:auto !important` yazdığı için IntakeForm'un form tamamlanınca yaptığı 'smooth' scroll anlık sıçramaya dönüşüyor. Header menüsü `lenis.stop()` yerine body `overflow:hidden` kullanıyor; tablet genişliğinde (≤1000px, trackpad/mouse) Lenis wheel event'lerini yemeye devam eder, `targetScroll` birikir ve menü kapanınca sayfa sıçrayabilir. Lenis instance'ı context/window'a verilmediği için başka hiçbir bileşen `scrollTo`/`stop`/`on('scroll')` kullanamıyor; ScrollReveal/ReadProgress bağımsız IO/scroll dinliyor.

**Neden önemli.** Lenis'in varlık sebebi tutarlı, tek kaynaklı scroll; iki farklı scroll sistemi (native + Lenis) aynı sayfada çalışınca jüri 'takılma' olarak hisseder.

**Ne yapılmalı.** `LenisProvider` (context) oluşturun: `const lenis = useLenis()`; IntakeForm'da `lenis.scrollTo(0, { duration: 1 })`; Header'da `open ? lenis.stop() : lenis.start()` (+ `overflow:hidden` yine kalabilir, iOS için). Lenis'i `autoRaf: true` ile açın ya da tek rAF döngüsünü provider'da tutun; ileride GSAP ScrollTrigger için `lenis.on('scroll', ScrollTrigger.update)`. `anchors: { offset: -78 }` zaten doğru, `scroll-padding-top` ile çakışmıyor.

> **Doğrulayıcı notu:** Playwright ile test ettim. İlk iddia REFUTE: Lenis aktifken `window.scrollTo({top:0, behavior:'smooth'})` düzgün animasyonlu çalışıyor (50 ms örnekler: 3000 → 2987 → 2916 → 2778 → … → 123; html'de `lenis-scrolling` sınıfı). CSS `scroll-behavior:auto` açıkça verilmiş `behavior:'smooth'`'u ezmez; lenis.mjs:651 `onNativeScroll` native scroll'u takip ediyor. İkinci iddia DOĞRU ve anlatılandan daha kötü: 900px genişlikte menüyü açınca (`body.style.overflow='hidden'`, Header.jsx:22-25) 8 wheel tıkı sayfayı menünün ARKASINDA 0 → 2400 px kaydırdı (lenis.mjs:609-627 overflow'a bakmıyor, yalnızca `isStopped`/`data-lenis-prevent`); menü kapanınca kullanıcı sayfanın ortasında (skeptic-perf-after-menu-close.png, skeptic-tablet-after-menu-close.png). Bu yüzden severity major. Instance paylaşılmıyor iddiası doğru. Fix: `LenisProvider` + Header'da `lenis.stop()/start()` (ya da nav'a `data-lenis-prevent`); IntakeForm'daki scrollTo değişikliği isteğe bağlı tutarlılık meselesi.

### İNCE İŞÇİLİK

#### `performance-09` — Font ağırlıkları tek değere sabitlenmiş: font-light 400, Archivo 800 ise 900 olarak render oluyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:15-17 (`weight: ['600','700','900']`, `['400'…'800']`), src/app/globals.css:158-162 (h1 `font-weight: 800`), src/components/Footer.jsx:17 ve about/page.jsx:84 (`font-light`), src/lib/fit.js:5 (yorumda itiraf: 'Archivo 900, also used for 800'), production CSS: 59 @font-face bloğu aynı variable dosyayı farklı sabit ağırlıklarla tanımlıyor

**Sorun.** Google Fonts zaten değişken (variable) dosya veriyor (Inter latin 48 KB, Archivo latin 35 KB; tüm ağırlıklar aynı dosyada) ama next/font her ağırlık için ayrı `@font-face { font-weight: 600 }` yazıyor. CSS eşleştirme kuralıyla `font-weight: 800` → en yakın ağır olan 900'e, `300` → 400'e düşüyor. Sonuç: tasarımda niyet edilen extrabold/black ayrımı ve mail linkindeki 'light' hiç görünmüyor; `font-light` gereksiz 2 kez yazılmış.

**Neden önemli.** Craft: ağırlık hiyerarşisi tipografi sisteminin dili. Gerçek 800 ve 300 bedava (dosya zaten değişken) ama kullanılmıyor.

**Ne yapılmalı.** `Inter({ weight: 'variable' })`, `Archivo({ weight: 'variable' })`, `JetBrains_Mono({ weight: 'variable' })` → `font-weight: 100 900` aralığı. Sonra gerçek ağırlıkları seçin: display 850–900, tagline 780, body 420–450, mono 420. Ya da ağırlık çeşitliliği istemiyorsanız `font-light`'ı silip `font-extrabold`'u `font-black` yapın; sistemde yalan söyleyen class kalmasın.

#### `performance-12` — Görsel üzerinde `filter` transition'ı ve sonsuz animasyonlar: paint-ağır hover ve boşa çalışan compositor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:152 (`transition-[transform,filter] duration-500` + grayscale/brightness), case-studies/page.jsx:47 (`transition-[opacity,transform]` hover önizleme - iyi), src/app/[locale]/page.jsx:60 ve :108 (marquee'ler `w-max` + translateX, ekran dışında da döner), :199 (`animate-ping`); ekran: probe-home-project-hover

**Sorun.** `filter: grayscale()/brightness()` transition'ı 700×440'lık görselin her karede yeniden rasterize edilmesi demek (transform/opacity gibi composite-only değil); hover'da 30 kare boyunca ana thread'de paint. Marquee ve ping ekran dışındayken bile rAF/compositor'da çalışıyor.

**Neden önemli.** Hover mikro-etkileşimlerinin takılması jüride 'ucuz' hissi bırakır; Awwwards siteleri yalnızca transform/opacity animasyonlar.

**Ne yapılmalı.** Grayscale → renk geçişini iki katmanla yapın: altta renkli `<Image>`, üstte `mix-blend-mode: saturation` + `bg-black` bir overlay (veya grayscale'i build-time'da üretilmiş ikinci görsel) ve yalnızca overlay `opacity`'sini transition'layın; `transition-transform` ayrı. Hover öncesi `will-change` koymayın, `group-hover:` içinde `translate3d` kullanın. Marquee'ler için IO ile `animation-play-state: paused` (ekran dışı) ve `contain: content`. Ping'i kaldırın.

#### `performance-14` — `min-h-dvh` + `pt-[30vh]` hero mobilde adres çubuğu gizlenirken yeniden boyutlanıyor (CLS)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:34 (`min-h-dvh`), :40 (`min-h-dvh pt-[100px]`), :44 (`pt-[30vh]`), IntakeForm.jsx:91 (`min-h-dvh`), Header.jsx:42 (`calc(100dvh-76px)` - burada doğru); ekran: home-mobile-fold

**Sorun.** `dvh` mobil tarayıcıda toolbar daralırken canlı değişir; hero yüksekliği ve içindeki `my-auto`/`pt-[30vh]` blok scroll sırasında kayar, altındaki tüm bölümler onunla birlikte oynar. Scroll CLS muafiyeti kapsamında değildir (sadece tıklama/klavye girişinden sonraki 500 ms muaf).

**Neden önemli.** Mobil CLS puanı ve jürinin telefonda ilk kaydırışında 'zıplayan' hero.

**Ne yapılmalı.** Hero için `min-h-[100svh]` (Tailwind 3.4: `min-h-svh`) ve iç padding'de `30svh`; yalnızca tam ekran overlay'lerde (mobil menü) `dvh` kalsın. Alternatif: hero yüksekliğini JS olmadan `clamp(640px, 100svh, 1100px)` ile sınırlayın.

> **Doğrulayıcı notu:** Kod doğru: page.jsx:34 ve :40 `min-h-dvh`, :44 `pt-[30vh]`, IntakeForm.jsx:91 `min-h-dvh`, Header.jsx:41 `calc(100dvh-76px)`. Görsel zıplama gerçek (dvh adres çubuğuyla canlı değişir, `my-auto` içerik yeniden ortalanır). Ancak 'scroll CLS muafiyeti kapsamında değildir' cümlesi doğrulanamadı; Chrome'un viewport yeniden boyutlanmasından doğan kaymaları nasıl puanladığı burada ölçülmedi — gerekçeyi 'ölçülen CLS' yerine 'gözle görülen zıplama' olarak okuyun. Fix geçerli: Tailwind 3.4.19'da `min-h-svh` mevcut.

#### `performance-15` — nextjs-toploader (beyaz parlayan bar) + ReadProgress aynı yerde iki çubuk; sayfa geçişi yerine 'dashboard loader'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:8,60-71 (`NextTopLoader` height 3, `shadow: 0 0 24px…`, zIndex 99999), src/components/ReadProgress.jsx:20 (top-0, h-2px, z-60), src/app/globals.css:187-189; ekran: probe-toploader-mid-nav, blogpost-d-progress

**Sorun.** Blog yazısında okuma ilerleme çubuğu ve gezinme sırasında toploader aynı üst kenarda üst üste biniyor (iki beyaz çizgi, biri glow'lu). Toploader, Next'in zaten viewport'ta prefetch ettiği statik sayfalarda 50–150 ms sürüyor; yani çoğunlukla 'flash' olarak görünüyor. `ReadProgress` her scroll olayında `setState` ile React render tetikliyor.

**Neden önemli.** Awwwards siteleri sayfa geçişini tasarımın parçası yapar (perde, mask, cross-fade); YouTube/Admin-panel tipi ilerleme çubuğu şablon kokar ve iki çubuğun çakışması craft hatası.

**Ne yapılmalı.** 1) `nextjs-toploader`'ı kaldırın. 2) Next 15.5'te `experimental.viewTransition: true` + React `<ViewTransition>` ile wordmark/başlık morph'u ya da 250 ms'lik `clip-path` perde geçişi (CSS `::view-transition-old/new(root)`); JS'siz fallback olarak hiçbir şey. 3) ReadProgress'i CSS scroll-driven animation'a çevirin: `.progress { animation: grow linear both; animation-timeline: scroll(root); }` (Chrome 115+, Safari 26) ve destek yoksa rAF+CSS var ile, React state olmadan.

#### `performance-17` — Mobil menü anında beliriyor; Escape, focus trap ve `inert` yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:39-46 (`{open && <nav …>}`), ekran: probe-mobile-nav-30ms, nav-open-mobile

**Sorun.** Nav koşullu render edildiği için 30 ms'de tam açık (giriş/çıkış animasyonu yok); açıkken arkadaki `main` klavye/okuyucuya açık, Escape kapatmıyor, odak menüye taşınmıyor. `aria-expanded` ve `aria-label` doğru, ama bu kadarı Awwwards için yetmez.

**Neden önemli.** Jüri mobil menüyü mutlaka açar; sıçrayarak beliren menü craft eksikliği, klavye akışı ise accessibility puanı.

**Ne yapılmalı.** Nav'ı her zaman DOM'da tutup `data-open` ile `clip-path: inset(0 0 100% 0)` → `inset(0)` 500 ms `cubic-bezier(.76,0,.24,1)` geçişi ve link'lere 40 ms stagger (`transition-delay: calc(var(--i)*40ms)`); kapanışta ters yön. `useEffect` ile `keydown Escape` → kapat, açılınca ilk linke `focus()`, `document.querySelector('main').inert = open`. Reduced-motion'da geçiş yok.

#### `performance-18` — Marquee'lerdeki ✳ ve ◻ Unicode glifleri: iOS/Android'de emoji olarak render olma ve fallback font indirme riski

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:62-71 (`◻` U+25FB), :113,121 (`✳` U+2733)

**Sorun.** U+2733 ve U+25FB'nin emoji sunumu var; VS15 (U+FE0E) olmadan iOS Safari ve bazı Android klavye fontları bunları renkli emoji (✳️, ◻️) olarak çizer, siyah-beyaz sistem bozulur. JetBrains Mono bu glifleri içermediği için tarayıcı sistem sembol fontuna düşer (Windows'ta Segoe UI Symbol, farklı dikey hizalama).

**Neden önemli.** Platformlar arası tutarsız bir yıldız/kare, jürinin iPhone'unda ilk saniyede görünür; craft detayı.

**Ne yapılmalı.** İnline `<svg aria-hidden width=10 height=10><path …/></svg>` kullanın (currentColor), ya da en azından `✳︎` / `◻︎` ekleyin ve `font-family: var(--font-mono), 'Segoe UI Symbol'` sırasını sabitleyin. Marquee içeriğini 8 kez kopyalamak yerine tek kopya + `animation` ile `translateX(-50%)` için 2 kopya yeterli (DOM 64 → 16 span).

#### `performance-19` — Blog kapakları üçüncü taraf hostinger CDN'de, her sayfaya preconnect, og-image 415 KB PNG

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:97,113 (`cover: https://images.hostinger.com/…png`), src/app/[locale]/layout.jsx:57-58 (preconnect/dns-prefetch her sayfada), src/app/[locale]/blog/[slug]/page.jsx:98 (`priority` + `sizes="100vw"`), src/lib/seo.js:12 (yorum: 'Assets live in /public so crawlers never depend on a third-party host' — kapaklar buna uymuyor), public/og-image.png (415 KB, 1200x630 PNG), next.config.js:8-11 (remotePatterns)

**Sorun.** Blog hero görseli LCP adayı ve kaynağı dış host; next/image optimize ediyor ama ilk istekte Hostinger'a gidiyor (bu ağdan curl 403 döndü — bot koruması varsa build/ISR'da kırılabilir). Preconnect ana sayfada da açılıyor, oysa ana sayfa hostinger'dan hiçbir şey çekmiyor (proje görselleri `/projects/` altında). OG görseli 415 KB; sosyal paylaşım önizlemesi için 100 KB üstü gereksiz.

**Neden önemli.** Bağımlılık ve tutarlılık: tek kaynaklı varlıklar + hashlenmiş cache (performance-05) ancak her şey /public'teyken mümkün.

**Ne yapılmalı.** Kapakları `public/blog/<slug>/cover.jpg` (1920×1080, mozjpeg q80 ≈ 150 KB) olarak alın, `remotePatterns`'ı ve layout'taki preconnect'i silin. `og-image.png` → `og-image.jpg` q82 (~90 KB) ve seo.js'de uzantıyı güncelleyin. Blog kapağında `sizes="100vw"` doğru; `quality={70}` grayscale için yeterli.

> **Doğrulayıcı notu:** Doğrulananlar: en.json:97 ve :113 `images.hostinger.com` kapakları, layout.jsx:56-57 her sayfada preconnect/dns-prefetch (ana sayfa hostinger'dan hiçbir şey çekmiyor), blog/[slug]:98 `priority` + `sizes="100vw"`, seo.js:12 yorumu, og-image.png 415.601 B 1200×630 PNG, next.config.js:9-12 `horizons-cdn.hostinger.com` da (kullanılmayan `media.earth` için) açık. Doğrulanamayan: '403 döndü' — bu sandbox'tan hostinger'a bağlantı hiç kurulamadı (curl 000), bot koruması iddiası kanıtsız; ama bağımlılık riski (dış host düşerse blog LCP görseli kırılır) geçerli. Fix doğru.

#### `performance-20` — Accept-Language'e göre 307 yönlendirme + NEXT_LOCALE çerezi: fazladan tur ve cache-bypass

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/i18n/routing.js:3-7 (`localePrefix: 'as-needed'`, localeDetection varsayılan açık), src/middleware.js:8-12; production: `curl -I / -H 'Accept-Language: tr'` → `307 /tr`; her yanıtta `set-cookie: NEXT_LOCALE`

**Sorun.** Türkçe tarayıcı `/`'ye gelince önce 307 alıyor (ek RTT, LCP gecikmesi), sonra `/tr` render ediliyor; her yanıtta çerez yazıldığı için CDN `/`'yi paylaşımlı önbelleğe alamıyor. Jüri genellikle EN'den gelir ama Türkiye'deki ziyaretçiler ve Lighthouse/CrUX ölçümleri bu yönlendirmeyi yer.

**Neden önemli.** Statik + edge-cache stratejisinin (performance-01) tamamlayıcısı; otomatik dil yönlendirmesi UX olarak da tartışmalı (kullanıcı EN linkini paylaştığında TR'ye düşer).

**Ne yapılmalı.** `defineRouting({ …, localeDetection: false, localeCookie: false })`; header'daki TR/EN anahtarı ile seçim kullanıcıya kalsın. İsteğe bağlı: EN sayfanın üstünde tek seferlik, çerezsiz (localStorage) 'Türkçe görüntüle?' satırı.

#### `performance-21` — Build uyarıları: belirsiz Tailwind class'ları ve ESLint Next plugin'i eksik

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:42 (`duration-[250ms]`), src/components/ReadProgress.jsx:20 (`duration-[80ms]`), eslint config (next build: 'The Next.js plugin was not detected in your ESLint configuration')

**Sorun.** `next build` iki kez 'The class duration-[250ms] is ambiguous' uyarısı veriyor (transition-duration mı animation-duration mı belirsiz); Next'in kendi lint kuralları (no-img-element, no-sync-scripts, font kuralları) çalışmıyor.

**Neden önemli.** Temiz build çıktısı 'developer craft'ın sessiz göstergesi; eksik lint kuralları ileride yeni hataların önünü açar.

**Ne yapılmalı.** `[transition-duration:250ms]` / `[transition-duration:80ms]` yazın. `eslint.config.js`'e `@next/eslint-plugin-next` (flat config: `...nextPlugin.configs['core-web-vitals']`) ve `eslint-plugin-jsx-a11y` ekleyin; `npm run lint` CI'da zorunlu olsun.

#### `performance-missed-1` — ESLint bilerek köreltilmiş: `no-unused-vars` kapalı, yorumlarda 'AI rarely makes this error'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** eslint.config.mjs:30-45 (`'react/jsx-uses-vars': 'off'`, `'no-unused-vars': 'off'`, `'import/no-cycle': 'off' // AI rarely makes this error…`)

**Sorun.** Lint kuralları 'Non-critical, code works fine' ve 'AI rarely makes this error, and the rule is very slow' gibi yorumlarla kapatılmış. Bu yüzden page.jsx:3 `ArrowRight`/`CirclePower`, :22 `media` gibi ölü importlar ve 55 shadcn dosyası hiç uyarı üretmeden duruyor; `npm run lint` temiz geçiyor.

**Neden önemli.** Repo'da AI-builder kökeninin en açık metinsel izi; ölü kodun (performance-06) tekrar birikmesine kapı açar. 'Developer craft' puanının altyapısı lint'tir.

**Ne yapılmalı.** `'no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }]`, `'react/jsx-uses-vars': 'error'`, `'import/no-cycle': 'error'` (küçük projede yavaş değil); bu yorum satırlarını silin; `@next/eslint-plugin-next` (`core-web-vitals`) + `eslint-plugin-jsx-a11y` + `eslint-plugin-unused-imports` ekleyin; `npm run lint` CI'da zorunlu olsun; `npx knip` ile ölü dosya/paket listesini bir kez alıp temizleyin.

#### `performance-missed-2` — Layout tetikleyen hover transition'ları: `padding` animasyonu ve `transition-all`

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:42 (`transition-[padding,background] duration-[250ms] … hover:pl-[20px]`), src/app/[locale]/page.jsx:193 (`transition-all duration-300`), src/app/[locale]/page.jsx:163 (`transition-all duration-200`)

**Sorun.** Case-studies satırında hover `padding-left`'i animasyonluyor: 4 sütunlu grid satırı 250 ms boyunca her karede yeniden layout alıyor (compositor-only değil). Ana sayfadaki CTA ve kart rozeti `transition-all` ile tüm özellikleri (layout tetikleyenler dahil) animasyona açıyor.

**Neden önemli.** Awwwards seviyesinde mikro-etkileşimler yalnızca transform/opacity ile yapılır; padding animasyonu satır metnini her karede reflow eder, düşük güçlü cihazda takılma hissi verir. `transition-all` ayrıca generic-template sinyalidir.

**Ne yapılmalı.** Satırda `hover:pl-[20px]` yerine iç içeriğe `transition-transform group-hover:translate-x-[20px]` (ya da satıra `[&>*]:transition-transform`), arka plan için `transition-colors`. CTA/rozette `transition-all` → `transition-[background-color,color,border-color]` + ayrı `transition-transform`. Kural: tailwind'de `transition-all` kullanımını ESLint/grep ile yasaklayın.

#### `performance-missed-3` — Arka plan videolarında `disablePictureInPicture` / `disableRemotePlayback` yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:35, about/page.jsx:36, services/page.jsx:61-72, case-studies/page.jsx:29, src/components/IntakeForm.jsx:93, src/components/BackgroundVideo.jsx:30

**Sorun.** grep: hiçbir `<video>`'da `disablePictureInPicture` veya `disableRemotePlayback` yok. Android Chrome ve Chromium tabanlı tarayıcılarda dekoratif autoplay video, uzun basma/PiP menüsü ve Cast ikonu sunabilir; iOS Safari'de sayfa arkaya alınınca PiP'e düşebilir.

**Neden önemli.** Jüri telefonda hero'ya uzun bastığında 'video oynatıcı' menüsü görmesi, dekoratif katmanın sızması demek; craft detayı.

**Ne yapılmalı.** Tüm dekoratif `<video>`'lara `disablePictureInPicture disableRemotePlayback` ekleyin (React 19/Next 15 bu attribute'ları destekler); BackgroundVideo ve yeni HeroVideo bileşeninde varsayılan yapın. Ayrıca `controlsList="nodownload noplaybackrate"` zararsız.

#### `performance-missed-4` — `X-Powered-By: Next.js` header'ı her yanıtta

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** next.config.js:6-42 (`poweredByHeader` ayarlanmamış); production ve dev yanıtlarında `X-Powered-By: Next.js` doğrulandı

**Sorun.** Varsayılan `poweredByHeader: true` ile her yanıt framework'ü duyuruyor; güvenlik header'ları (nosniff, HSTS, frame DENY) özenle eklenmişken bu unutulmuş.

**Neden önemli.** Header hijyeni 'developer' puanının sessiz detayı; jüri DevTools'u açtığında ilk gördüğü satırlardan biri.

**Ne yapılmalı.** next.config.js'e `poweredByHeader: false` ekleyin (tek satır). İsteğe bağlı: `Permissions-Policy: camera=(), microphone=(), geolocation=()` ve `Cross-Origin-Opener-Policy: same-origin` aynı headers() bloğuna.

#### `performance-missed-5` — package.json React 18 ilan ediyor, App Router React 19 ile çalışıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** package.json:57,59 (`react ^18.3.1`, `react-dom ^18.3.1`), :71-72 (`@types/react ^18.3.28`); node_modules/react 18.3.1 kurulu; Next 15.5.26 App Router kendi vendored React 19'unu kullanıyor (framework chunk 139 KB)

**Sorun.** Kurulu `react@18.3.1` App Router tarafından hiç kullanılmıyor; tipler (`@types/react@18`) gerçek çalışma zamanıyla uyuşmuyor. `<ViewTransition>`, `use()`, React 19 ref-as-prop gibi önerilen API'ler tip tarafında görünmez; ileride Pages Router/edge kullanımı olursa iki React kopyası hatası doğar.

**Neden önemli.** Bağımlılık manifestinin gerçeği yansıtmaması, performance-06'daki 'şablondan türetilmiş' izlenimini pekiştirir; performance-15'teki View Transitions önerisi React 19 tiplerini gerektirir.

**Ne yapılmalı.** `npm i react@19 react-dom@19 @types/react@19 @types/react-dom@19` (Next 15.5 resmi peer sürümü), `npm run build` ile doğrulayın; ölü paket temizliğiyle (performance-06) aynı PR'da yapın.

#### `performance-missed-6` — /start-project sayfasının tüm statik içeriği (h1, intro, aside) client bundle'ında

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:1 (`'use client'`), :101-113 (h1, intro paragraph, aside metinleri form state'iyle aynı bileşende); build: `/[locale]/start-project` 5.13 kB sayfa / 138 kB First Load (diğer sayfalar 108-113 kB)

**Sorun.** Sayfa başlığı, intro ve sol sütun metinleri yalnızca `step`/`complete` state'ine bağlı olduğu için tamamı client component içinde; `t.raw('types')`, `steps`, `headingLines` gibi tüm intake kopyası hem RSC payload'ında hem client JS'te. Sayfa First Load'u sitenin en ağırı (+25 KB gz).

**Neden önemli.** Formun etkileşimli kısmı küçük; hero'nun JS'e bağlanması performance-04 ile aynı 'JS olmadan eksik sayfa' sınıfına girer ve First Load bütçesini (≤90 KB gz) tek başına aşar.

**Ne yapılmalı.** start-project/page.jsx'te hero (eyebrow, h1 `fit()`, intro) ve aside'ı server component olarak render edin; `IntakeForm`'u yalnızca `<form>` + adım göstergesi olarak daraltıp `copy={t.raw('intake')}` prop'uyla besleyin; `complete` ekranını ayrı küçük bir client bileşene alın. Hedef: start-project First Load ≈ 115 kB, hero HTML'de JS'siz tam.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Gerçek bir video pipeline'ı ve <HeroVideo> bileşeni

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive ve Lusion hero loop'larını 300–800 KB WebM + gerçek poster ile veriyor; web.dev 'Video LCP' rehberi; Chrome 116 video-first-frame LCP notu.

`scripts/encode-videos.mjs`: kaynaklardan AV1 (libsvtav1, crf 36–40) WebM + H.264 (crf 28) MP4, 1080p ve 540p portre rendition, ses yok, faststart, ilk kareden AVIF poster, dosya adlarına içerik hash'i; `src/components/HeroVideo.jsx`: `<source media>` ile rendition seçimi, `saveData`/reduced-motion'da poster, `requestIdleCallback` ile LCP sonrası yükleme, `onPlaying`'de poster→video cross-fade, görünürlük dışında pause. Hedef: home hero toplam < 600 KB, diğer sayfalar < 400 KB.

### Statik render + edge cache + performans bütçesi CI'da

- **Etki:** yüksek · **Efor:** orta · **Referans:** Vercel'in site-bütçesi pratikleri; Studio Freight ve Basement Studio'nun CI'da Lighthouse koşturması.

performance-01 sonrası `next build`'i CI'da çalıştırıp `.next/prerender-manifest.json`'da tüm locale route'larının olduğunu assert eden küçük bir script; `@next/bundle-analyzer` ve `size-limit` ile bütçeler (First Load JS ≤ 90 KB gz, CSS ≤ 10 KB gz, HTML ≤ 50 KB gz, sayfa toplam ≤ 1.5 MB); `unlighthouse` veya Lighthouse CI ile mobil LCP ≤ 1.8 s / CLS ≤ 0.05 eşikleri; `useReportWebVitals` ile gerçek kullanıcı metriklerini `/api/vitals`'a yazıp Hostinger MySQL'de tutma (zaten mysql2 var).

### View Transitions ile sayfa geçişleri (toploader yerine)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys Agency ve Hello Monday'in sayfa geçişleri; Chrome 'Same-document view transitions' rehberi; next-view-transitions kütüphanesi.

Next 15.5 `experimental.viewTransition: true` + React `<ViewTransition name="wordmark">` ile ALAZ wordmark'ının hero'dan header'a morph etmesi; proje kartı → case-study hero görselinin paylaşımlı element geçişi (`view-transition-name: cover-<slug>`); `::view-transition-old(root)` 250 ms fade + `clip-path` perde. Reduced-motion'da `@media (prefers-reduced-motion) { ::view-transition-group(*) { animation: none } }`. JS yokken normal navigasyon.

### Font pipeline: subset + unicode-range + preload per locale + display:block

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys ve Unseen Studio ilk karede asla fallback font göstermez; Zach Leatherman'ın font-loading stratejileri.

`pyftsubset` ile Archivo/Inter/JetBrains Mono'yu latin ve latin-ext olarak ayrı dosyalara bölüp `public/fonts/`'a alın (hash'li adlar); globals.css'te aynı family için iki `@font-face` + `unicode-range`; layout'ta locale'e göre 3 (EN) veya 6 (TR) `<link rel=preload as=font>`; Archivo `font-display: block`, Inter `swap`; `size-adjust`/`ascent-override` ile fallback metrikleri; `document.fonts.ready` ile hero giriş animasyonunu senkronize edin.

### Scroll-driven CSS animasyonları ve content-visibility

- **Etki:** orta · **Efor:** küçük · **Referans:** Bramus Van Damme'nin scroll-driven animations rehberi; Chrome 115+, Safari 26.

Fold altındaki büyük bölümlere `content-visibility: auto; contain-intrinsic-size: 1px 800px` (ilk render ve style hesaplama maliyeti düşer); okuma çubuğu, marquee hız değişimi ve hero wordmark'ın scroll'da küçülmesi için `animation-timeline: scroll()/view()` (JS yok, compositor thread). Destek yoksa mevcut IO fallback.

### LQIP/blur placeholder ve hash'li varlık yardımcısı

- **Etki:** orta · **Efor:** küçük · **Referans:** Vercel templates; Locomotive'in 'blur-up' görsel yüklemesi.

Proje ve blog görsellerini `import cover from '@/public/projects/…'` ile statik import edip `placeholder="blur"` kullanın (Next otomatik 8px blurDataURL üretir); video poster'ları için 20×12'lik base64 AVIF'i `BackgroundVideo`'ya inline `background-image` olarak verin. `src/lib/asset.js` ile `asset('/videos/x.mp4')` → `/videos/x.<hash>.mp4` eşlemesi (build-time manifest) ve immutable cache.

### Erişilebilirlik testi ve skip-link

- **Etki:** orta · **Efor:** küçük · **Referans:** Awwwards'ın accessibility alt puanı; GOV.UK ve Stripe'ın skip-link/odak yönetimi.

`<a href="#main" class="sr-only focus:not-sr-only …">Skip to content</a>` (şu an yok; `body#top` var ama main için id yok); Playwright + `@axe-core/playwright` ile her route için axe koşusu (kontrast, isim/rol, odak sırası); mobil menü için klavye senaryosu testi; `eslint-plugin-jsx-a11y`.

### Lenis provider + GSAP ScrollTrigger entegrasyonu (opsiyonel, animasyon boyutuna köprü)

- **Etki:** orta · **Efor:** orta · **Referans:** Studio Freight'in Lenis + GSAP referans entegrasyonu (lenis README 'GSAP ScrollTrigger' bölümü).

`LenisProvider` context'i (`useLenis()`), `lenis.on('scroll', ScrollTrigger.update)` ve `gsap.ticker.add((t)=>lenis.raf(t*1000))` ile tek rAF döngüsü; `lenis.stop()/start()` menü ve modal'larda; hero videosu ve wordmark için hafif parallax (`transform` only). Bundle maliyeti: gsap core + ScrollTrigger ≈ 30 KB gz — bütçeye alın, framer-motion zaten çıkıyor.
