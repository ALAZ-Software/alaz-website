# Hareket ve etkileşim sistemi

**Boyut puanı:** 3/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 26 (3 kritik · 9 önemli · 14 ince işçilik) · **Korunacaklar:** 8 · **Eklenecekler:** 10

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sitede hareket "sistemi" yok, bir dizi varsayılan var: Lenis smoothing, her elemana aynı 0.6s opacity+14px fade-up, renk değişen hover'lar, iki lineer marquee, neon top loader ve bir ping noktası. Bu set tam olarak AI-builder / template sitelerin imzası; hiçbir etkileşim markaya özgü bir fikir taşımıyor. Awwwards seviyesinin asgarileri (açılış orkestrasyonu, satır maskeli tipografi reveal'ları, sayfa geçişi, scroll'a bağlı tek bir efekt, imleç/hover medya, stacking/pin) tamamen eksik; framer-motion ve CountUp bileşenleri repo'da duruyor ama kullanılmıyor. Teknik altyapı (Lenis, reduced-motion'a saygılı CSS reveal, lazy BackgroundVideo) sağlam bir zemin; sorun zeminin üstüne hiçbir karakter inşa edilmemiş olması. Ayrıca gerçek hatalar var: case-study önizlemesinin `-rotate-4` sınıfı Tailwind'de yok (eğim hiç render olmuyor), satır hover'ı padding animate edip layout tetikliyor, tablet menüsü açıkken Lenis arka sayfayı kaydırıyor, marquee/ping reduced-motion'ı dinlemiyor.

## Korunması gerekenler

- Lenis kurulu ve doğru gate'lenmiş: prefers-reduced-motion'da hiç başlatılmıyor, anchor offset header yüksekliğine göre ayarlı (SmoothScroll.jsx:9-15) — scroll-linked her şeyin üzerine inşa edileceği zemin hazır.
- Reveal sistemi CSS'te ve `reveal-ready` head script'iyle JS'siz durumda içerik görünür kalıyor; reduced-motion ve `scripting: none` için fallback var (globals.css:69-100). Bu 'önce içerik, sonra hareket' yaklaşımı korunmalı, yalnızca hareketin kendisi değişmeli.
- ScrollReveal.jsx:25-27'de reveal bitince `data-reveal` attribute'unun kaldırılması (hover transition'larla çakışmasın diye) gerçek bir craft detayı.
- BackgroundVideo.jsx örnek bir lazy medya bileşeni: viewport'a 300px kala src atama, off-screen pause, reduced-motion ve saveData'ya saygı. Hero videoları da bu disipline çekilmeli.
- Reveal easing'i `cubic-bezier(.22,1,.36,1)` (expo-out ailesi) doğru seçim; motion token sisteminin ana eğrisi olarak kalabilir.
- Case-study listesinde hover'da proje görseli gösterme fikri (case-studies/page.jsx:47) doğru yönde; sadece uygulaması (sabit konum, 200ms, geçersiz rotate) tamamlanmamış.
- Hareket genel olarak ölçülü: bounce/spring/parlama yok, süreler kısa. 'Fazlalık' değil 'eksiklik' problemi var; bu, Awwwards seviyesine çıkmanın daha kolay yolu.
- Dev tipografi (fit() ile tek satıra sığdırılan h1/h2'ler) satır maskesi ve karakter reveal'ları için ideal yüzey; başlıklar zaten tek satırda olduğu için SplitType entegrasyonu basit.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `motion-01` — Tek tip fade-up reveal her şeyin üstünde

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:69-100, src/components/ScrollReveal.jsx:18-31; data-reveal kullanımı: src/app/[locale]/page.jsx:48-49,77-99,130-144,188-192, about/page.jsx:41-75, services/page.jsx:75-227, case-studies/[slug]/page.jsx:87-151; screenshot: probe-reveal-mid-120ms.png, probe-reveal-done.png

**Sorun.** Üç varyant (fade / mask / line) aslında aynı şey: opacity 0→1 + translateY(14px veya .14em), 0.6s, aynı easing. `data-reveal="mask"` adına rağmen hiçbir maskeleme yapmıyor (globals.css:83-86). Eyebrow'dan kartlara, başlıktan paragrafa her element aynı hareketle geliyor; stagger 60-90ms ile bu, ekranda 'sayfa yüklenirken her şey hafifçe yukarı süzülüyor' hissinden ibaret. 14px'lik yükselme 1440px ekranda neredeyse algılanmıyor; etki 'bir şey oldu ama ne olduğu belli değil'.

**Neden önemli.** Uniform fade-up, LLM/template sitelerinin en tanınır hareket imzası. Awwwards jürisinin ilk baktığı şey tipografi reveal'ının karakteri; burada karakter yok. Ayrıca her elemana reveal koymak hareketi anlamsızlaştırıyor (hiyerarşi yok).

**Ne yapılmalı.** Reveal'ı üç farklı dile ayır ve sadece anlamlı yerlere uygula: (1) Display başlıklar (h1/h2 .fit): satır maskesi. Yapı: dış `<span class="block overflow-hidden">` + iç `<span class="block">` translateY(110%)→0, 0.9-1.1s, `cubic-bezier(0.16,1,0.3,1)` (expo.out), satırlar arası 70ms stagger. Satırları SplitType (`new SplitType(el,{types:'lines'})`) ile üret, resize'da yeniden böl; `fit()` zaten tek satır garantisi verdiği için çoğu başlıkta manuel `<br/>` satırlarını wrapper'lamak yeter. Koddaki 'zero-area element never intersects' sorununu IntersectionObserver'ı dış wrapper'a bağlayarak çöz. (2) Görsel/kart: `clip-path: inset(0 0 100% 0)` → `inset(0)` 1.1s expo.out + içindeki img `scale(1.12)`→1 aynı sürede. (3) Küçük metin/eyebrow: sadece opacity 0→1, 0.45s, translate yok. Stagger'ı kart gridlerinde 90ms→50ms'e çek; eyebrow 'line' varyantında opacity yerine border-top'u `scaleX(0)`→1 `transform-origin:left` 0.8s ile çizdir (hat çizilmesi, markanın çizgi dilini hareketlendirir). `data-reveal`'ı paragraf ve meta satırlarının çoğundan kaldır; bir bölümde en fazla 3 reveal katmanı (eyebrow çizgisi, başlık, içerik).

> **Doğrulayıcı notu:** Kod doğruluyor: globals.css:71-90'da üç varyant var; `mask` adına rağmen hiçbir maskeleme yapmıyor (83-86: opacity + translateY(.14em)), `fade` opacity + 14px (76-79). Küçük düzeltme: `line` varyantı translate içermiyor, yalnız opacity (88-90); yani 'üçü de translateY' ifadesi hafif abartılı, ama 'hepsi aynı 0.6s cubic-bezier(.22,1,.36,1) opacity fade' tespiti doğru. data-reveal kullanım satırları (page.jsx:48-49,77-99,130-144,188-192; about:41-75; services:75-227; case-studies/[slug]:87-151) doğrulandı. Ek not: globals.css:82'deki 'clip-path ile sıfır alanlı eleman kesişmez' yorumu teknik olarak yanlış — IntersectionObserver layout kutusunu kullanır, clip-path kutuyu değiştirmez; yani clip-path reveal doğrudan uygulanabilir, dış wrapper'a bağlamak şart değil (zararsız bir güvenlik önlemi). Severity critical yerinde: tek tip fade-up en tanınır AI-builder hareket imzası.

#### `motion-02` — Sayfa geçişi yok; tek geri bildirim neon top loader

- **Önem:** KRİTİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:60-71 (NextTopLoader), src/app/globals.css:187-189 (#nprogress .bar glow); screenshot: probe-toploader-mid-nav.png

**Sorun.** Navigasyonda sol üstte 3px beyaz, 12px parlayan (computed box-shadow: 0 0 12px rgba(255,255,255,.45); layout.jsx'teki 24px üçlü shadow prop'u da var) bir bar sürünüyor, sonra içerik pat diye değişiyor. Çıkış animasyonu yok; yeni sayfada hero'daki iki paragraf tekrar fade'leniyor, geri kalanı anında beliriyor. Header fixed olduğu için bar logonun üstünden geçiyor.

**Neden önemli.** Neon progress bar, 'nextjs-toploader kur ve geç' refleksinin görünür hali; Awwwards sitelerinde sayfa geçişi markanın ritmini taşır (perde, maske, paylaşılan başlık). Burada yüklenme hissi 'admin panel' seviyesinde.

**Ne yapılmalı.** nextjs-toploader'ı ve #nprogress kuralını kaldır. React 18 + App Router ile çalışan `next-view-transitions` paketini ekle: layout'ta `<ViewTransitions>` sarmalayıcı, tüm `Link`'ler paketin `Link`'i (next-intl `createNavigation` ile sarmalamak gerekiyorsa `useTransitionRouter` ile `router.push` sar). CSS: `::view-transition-old(root){animation: fade-out .25s ease-in}` `::view-transition-new(root){animation: curtain .6s cubic-bezier(.76,0,.24,1)}` — curtain: siyah #0a0a0a bir `::view-transition-group` perdesi alttan yukarı `clip-path inset(100% 0 0 0)`→`inset(0)` ile yeni sayfayı açar. Case-study liste→detay için başlık h2/h1'e aynı `view-transition-name: project-title-{slug}` ver; başlık morph'lar (en ucuz 'wow' bu). Reduced-motion'da sadece 150ms crossfade. Alternatif (daha fazla kontrol): `src/app/[locale]/template.jsx` + framer-motion `AnimatePresence mode="wait"` ile exit 0.35s / enter 0.6s; ama view-transitions yolu daha az kod ve scroll pozisyonunu doğru yönetir.

#### `motion-03` — Ping'li yeşil nokta + köşe braketli CTA

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:193-204; screenshot: probe-contact-cta-rest.png, probe-contact-cta-hover.png

**Sorun.** 'START SEQUENCE' butonunda `animate-ping` emerald nokta (1s sonsuz), dört köşede absolute braket span'ı, `transition-all duration-300`, hover'da tam beyaz dolgu + ok 2px kayıyor. Reduced-motion'da ping durmuyor (probe: playState running). Hero'daki `SYSTEM_ACTIVE` kare noktası ve intake aside'daki nokta aynı 'terminal status' dilini tekrarlıyor.

**Neden önemli.** Task'ta sayılan slop sinyallerinin hepsi tek butonda: ping dot, corner brackets, 'sequence' jargonu. Emerald da sitenin tek renkli paletini bozan tek canlı renk ve 'online' klişesi.

**Ne yapılmalı.** Ping, braketler ve emerald'ı sil. Site genelinde tek bir imza CTA etkileşimi tanımla ve her yerde onu kullan (Header CTA, hero, contact, services CTA, intake 'Continue'): (a) metin swap: label iki kez üst üste, dış `overflow-hidden`, hover'da iç wrapper `translateY(-100%)` 0.5s expo.out — ikinci kopya hafif italic/outline olabilir; (b) arka plan alttan dolma: `::before` `scaleY(0)`→1 `transform-origin:bottom` 0.45s `cubic-bezier(.76,0,.24,1)`, metin rengi 0.2s gecikmeyle invert; (c) ok ikonu overflow-hidden kutudan sağ-üste çıkıp sol-alttan tekrar giriyor (iki ok, translate 100%/-100%). Desktop'ta (pointer:fine) manyetik davranış ekle (bkz. additions). `transition-all` yerine `transition-[color,background-color,transform]`.

### ÖNEMLİ

#### `motion-04` — Case-study satır hover'ı: geçersiz rotate sınıfı, padding animasyonu, 13px'lik önizleme

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/page.jsx:42 (hover:pl-[20px] transition-[padding,background]), :47 (-rotate-4 / group-hover:-rotate-4); screenshot: cs-d-row-hover.png, cs-d-row2-hover.png

**Sorun.** Probe: önizleme div'inin computed transform'u `matrix(1,0,0,1,0,-52)` → hover'da `(0,-65)`: rotasyon yok çünkü `-rotate-4` Tailwind 3'te tanımlı değil (CSS'te yalnız rotate-45 var). Resting ve hover'da aynı değer yazıldığı için zaten dönüş animasyonu da tasarlanmamış. Hover efekti: 200ms'de opacity 0→1 ve 13px yukarı kayma, sabit konumda (right-10%). Satırın kendisi `padding-left` 0→20px animate ediyor: layout + reflow, 60fps garantisi yok; tüm satır içeriği (başlık, scope, ok) birlikte kayıyor.

**Neden önemli.** Hover'da proje görseli gösterme fikri doğru ve Awwwards listelerinin klasiği; ama sabit konumlu, 200ms'lik, dönmeyen bir kutu 'yarım kalmış' görünüyor. Padding animasyonu craft açısından hata.

**Ne yapılmalı.** Sınıfı `-rotate-[4deg]` / `group-hover:-rotate-[0deg]` olarak düzelt (hover'da düzelen eğim: 0.6s expo.out). Padding yerine satır içeriğini bir inner div'e al ve `group-hover:translate-x-[20px]` ver. Asıl hedef: imleci takip eden önizleme. Tek bir fixed `<div class="pointer-events-none fixed w-[280px] aspect-[16/10] overflow-hidden">` listeyi saran client component'te; `pointermove` → gsap.quickTo(x, {duration:.6, ease:'power3'}) ile lerp; satıra girişte görsel `clip-path inset(0 0 100% 0)`→`inset(0)` 0.5s + img `scale 1.2`→1; satır değişince önceki görsel yukarı kayarak çıkıyor, yenisi alttan giriyor (iki katmanlı img stack). Mobil/touch'ta (`pointer:coarse`) görsel satırın içinde statik küçük thumbnail olarak kalsın.

> **Doğrulayıcı notu:** Doğrulandı ve bir bulgu daha eklendi. (1) `-rotate-4` için derlenmiş hiçbir kural yok (document.styleSheets taraması: yalnız rotate-45/90/180 var); önizleme transform'u rest'te matrix(…,0,-52), hover'da (…,0,-65): dönüş yok, 13px kayma + 200ms opacity. (2) Satırdaki `duration-[250ms]` sınıfı DA ÇALIŞMIYOR: dev.log satır 19 'The class `duration-[250ms]` is ambiguous and matches multiple utilities' — tailwindcss-animate kendi `duration` utility'sini kaydettiği için Tailwind arbitrary değeri düşürüyor; computed transition-duration 0.15s. Yani satır hover'ı 250ms değil 150ms, ve `transition-[padding,background]` layout tetikliyor (padding-left 0→20px, probe: pl 20px). (3) cs-d-row-hover.png: sabit `right-[10%]` konumlu sarı önizleme SCOPE sütunundaki 'LANGUAGE / ANDROID' metninin üstüne biniyor — konum da çakışıyor. Fix doğru; `-rotate-[4deg]` + `group-hover:rotate-0` ve süre için theme-scale token kullan (arbitrary duration bu projede derlenmiyor, bkz. missed).

#### `motion-05` — İki buzzword marquee: lineer, durmayan, reduced-motion'ı dinlemeyen

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** tailwind.config.js:106-118 (signal-marquee 28s, ticker 30s), src/app/[locale]/page.jsx:59-74 ve 107-126; screenshot: home-desktop-full.png (hero altı ve 'CORE CAPABILITIES' altı bantlar)

**Sorun.** Aynı sayfada iki ayrı marquee, neredeyse aynı hızda (28s/30s), lineer, sonsuz; hover'da yavaşlamıyor, scroll yönüne tepki vermiyor; probe: reduced-motion altında `animationPlayState: running`. İçerik 'ALAZ / SYSTEMS THINKING ✳ UNCOMPROMISING PRECISION ✳' tarzı buzzword.

**Neden önemli.** Buzzword marquee task'ın slop listesinde açıkça geçiyor; iki tane olması ve hiçbir girdiyle etkileşmemesi 'dolgu hareket' olduğunu ele veriyor. Erişilebilirlik ihlali de (prefers-reduced-motion yok sayılıyor).

**Ne yapılmalı.** Tercihen ikisini de kaldır. Kalacaksa tek bir bant ve ona bir sebep ver: scroll hızına bağlı ticker. Lenis `lenis.on('scroll', ({velocity}) => ...)` ile `gsap.to(track, {timeScale: 1 + Math.min(Math.abs(velocity)/20, 3)})` ve yön değişiminde `timeScale` işaretini çevir (GSAP `gsap.utils.wrap` + `xPercent` döngüsü ya da ScrollTrigger'ın `getVelocity()`'si). Hover'da `timeScale` 0.3'e düş. CSS versiyonu kalırsa `motion-reduce:[animation:none]` + `hover:[animation-play-state:paused]` ekle ve içeriği buzzword yerine gerçek veriye çevir (aktif proje adları, konum/saat).

#### `motion-06` — Hero'da açılış orkestrasyonu yok

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:34-57 (yalnız :48-49 data-reveal), src/components/Header.jsx:27; screenshot: probe-home-load-0ms.png vs probe-home-load-900ms.png, home-desktop-fold.png

**Sorun.** İlk boyada ALAZ wordmark, nav, eyebrow'lar, grid çizgileri, 'POWERED BY' satırı ve video hepsi anında statik; yalnızca 'NO BULLSHIT…' ve intro paragrafı 0.6s fade ile geliyor (ikincisi 120ms gecikmeli). Diğer sayfalarda (about, services, case-studies, blog) h1 'mask' reveal'ı var ama o da fade. Ekran 'yüklendi' demiyor, 'açıldı' diyor.

**Neden önemli.** Awwwards adaylarının neredeyse tamamında ilk 1.5 saniye bir koreografi: tipografi maskeden çıkar, medya yavaşça açılır, çizgiler çizilir. Bu an markanın el sıkışması; burada boş.

**Ne yapılmalı.** GSAP timeline (hero client component, `useLayoutEffect` + `gsap.context`): t=0 header `y:-8, opacity:0`→0 0.6s; t=0.1 üst eyebrow satırı opacity; t=0.2 'ALAZ' harfleri SplitType chars, her harf dış overflow-hidden, `yPercent:110`→0 1.1s `expo.out` stagger 0.06 (nokta son, hafif `scale .6`→1); t=0.5 kicker; t=0.7 tagline satır maskesi (2 satır, stagger .08); t=0.9 intro paragraf opacity; t=0.9 hero video `opacity 0→.62` 1.4s `power2.out` (video `playing` event'inden sonra); t=1.0 alt border çizgisi `scaleX 0→1` origin left 1s ve üç dikey grid çizgisi `scaleY 0→1` origin top stagger .1. Tüm timeline 1.6s'de biter. İkinci ziyarette (sessionStorage) süreleri 0.6x çarp. Tüm elemanlara başlangıç durumunu CSS'te `[data-hero] .el {opacity:0}` yerine `gsap.set` ile ver ve `prefers-reduced-motion`'da `gsap.matchMedia` ile timeline'ı `progress(1)` yap.

#### `motion-07` — Mobil/tablet menü anında açılıyor; arkada Lenis kaydırmaya devam ediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:22-25 (body overflow), :39 (Menu/X icon swap), :42-46 (`{open && <nav>}`); screenshot: probe-mobile-nav-30ms.png, nav-open-mobile.png, probe-tablet-menu-scrolled.png

**Sorun.** Menü `open && <nav>` ile mount/unmount: probe'da tıklamadan 30ms sonra tamamen açık (transition yok, animation none). İkon Menu→X anında değişiyor. Tablet genişliğinde (≤1000px, mouse ile) menü açıkken wheel → `scrollY: 1800`; `body.style.overflow='hidden'` Lenis'in programatik scroll'unu engellemiyor, sayfa menünün arkasında kayıyor. Menü link'lerinde hover/active durumu da yok.

**Neden önemli.** Navigasyon açılışı sitede en sık görülen etkileşimlerden; anlık pop hissi craft eksikliğini en çok burada belli eder. Lenis/overflow çakışması gerçek bir bug.

**Ne yapılmalı.** framer-motion zaten dependency: `<AnimatePresence>` + `<motion.nav initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} transition={{duration:.6, ease:[.76,0,.24,1]}}>`; link'ler `motion.div` ile `y:'100%'`→0, dış `overflow-hidden`, `staggerChildren:.05, delayChildren:.15`; kapanışta ters sıra. Hamburger'i iki `span` çizgiyle yap ve X'e morph et (`rotate 45/-45`, `translateY`, 0.35s). Lenis instance'ını `SmoothScroll` içinde `window.lenis` ya da bir `LenisContext`'te tut; menü açılınca `lenis.stop()`, kapanınca `lenis.start()`; `body.style.overflow` satırını sil (`.lenis-stopped{overflow:hidden}` zaten globals.css'te). Menü açıkken `Escape` ile kapanma ve focus trap ekle.

#### `motion-08` — Motion token'ı yok: 7 farklı süre, 5 farklı easing, transition-all

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:27 (.35s ease), :33 (200ms ease-in-out), :38; src/app/[locale]/page.jsx:97 (gap .2s ease), :138 (.2s), :152 (500ms ease-out), :163 (transition-all 200), :193 (transition-all 300); case-studies/page.jsx:42 (250ms ease-in-out); IntakeForm.jsx:104,189; StoreButtons.jsx:7; ReadProgress.jsx:20 (80ms linear); globals.css:72 (cubic-bezier(.22,1,.36,1))

**Sorun.** Süreler 80/200/250/300/350/500/600ms arasında rastgele; easing olarak `ease`, `ease-in-out`, `ease-out`, `linear` ve bir custom bezier karışık. `transition-all` iki yerde (layout-tetikleyen property'leri de animate eder). Hover-in ve hover-out aynı eğri (çıkışta daha hızlı/keskin olması gerekir). Reveal'da expo-out, hover'da browser `ease` → iki farklı 'kişilik'.

**Neden önemli.** Awwwards siteleri bir-iki easing eğrisiyle tanınır (Studio Freight'in expo.out'u, Obys'in quart in-out'u). Tutarsız eğriler kullanıcı farkında olmadan 'ucuz' hissi verir.

**Ne yapılmalı.** globals.css `:root`'a token'lar: `--ease-out: cubic-bezier(.16,1,.3,1)` (expo.out, giriş/reveal), `--ease-in-out: cubic-bezier(.76,0,.24,1)` (perde, menü, geçiş), `--ease-snap: cubic-bezier(.3,1,.4,1)` (hover-out), `--d-1: 240ms` (renk/opacity hover), `--d-2: 480ms` (transform hover), `--d-3: 900ms` (reveal), `--d-4: 1400ms` (medya/perde). tailwind.config `transitionTimingFunction:{out:'var(--ease-out)',inout:'var(--ease-in-out)'}` ve `transitionDuration:{1:'240ms',2:'480ms',3:'900ms'}`; `ease-in-out`, `ease`, `duration-200`, `transition-all` için ESLint/grep kuralı (yasak). Hover için `transition-[color,background-color,transform] duration-2 ease-out` + `[&:not(:hover)]:duration-1` (çıkış daha hızlı). GSAP tarafında `gsap.defaults({ease:'expo.out', duration:.9})` ve aynı iki custom ease'i `CustomEase.create` ile kaydet.

> **Doğrulayıcı notu:** Tüm satır referansları doğrulandı (Header 27/33/38, page.jsx 97/138/152/163/193, case-studies 42, IntakeForm 104/189, StoreButtons 7, ReadProgress 20, globals 72). Üç ekleme: (1) Sekizinci süre: Tailwind varsayılanı 150ms — page.jsx:172 `transition-colors` süresiz, ayrıca `duration-[250ms]` ve `duration-[80ms]` derlenmediği için (dev.log 'ambiguous' uyarısı) case-studies satırı ve ReadProgress de fiilen 150ms. (2) Bazı hover'lar hiç transition'suz (snap): page.jsx:54 scroll CTA, Footer.jsx:24/26, IntakeForm.jsx:188 geri butonu, tüm eyebrow `[&_a:hover]:text-white` satırları — probe: transition-duration 0s. (3) Fix'teki `transitionDuration:{1:'240ms',…}` theme-scale yaklaşımı aynı zamanda arbitrary duration bug'ını da çözüyor; ESLint/grep yasağına `duration-[` ekle. Severity major yerinde.

#### `motion-10` — Intake form: adımlar anında değişiyor, ilerleme sadece metin

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:123 (0x / 03 — %), :124/:137/:167 (`step === n &&`), :128-132 (tip kartı icon swap), :115-117 (aside adım listesi)

**Sorun.** Üç adım `step === n && <div>` ile unmount/mount: içerik yok olup yenisi beliriyor, yön hissi (ileri/geri) yok. İlerleme '33% COMPLETE' yazısı; çizgi/çubuk yok. Proje tipi kartında seçimde `ArrowUpRight`→`Check` ikon swap ve `border-white` anında. Aside'daki adım listesi sadece renk değiştiriyor. Tamamlandığında `window.scrollTo({behavior:'smooth'})` Lenis'i bypass ediyor.

**Neden önemli.** Form, sitenin dönüşüm noktası; burada hareket güven verir ('adım attım, kaydedildi'). Anlık swap ile dört ekran arasında bağ kurulmuyor.

**Ne yapılmalı.** Adım wrapper'ını `<AnimatePresence mode="wait" custom={direction}>` + `motion.div` ile sar: exit `{x: dir*-24, opacity:0}` 0.25s `ease-in`, enter `{x: dir*24→0, opacity:0→1}` 0.5s expo.out; yükseklik sıçramasını `min-h` zaten çözüyor. Eyebrow satırının altına 1px beyaz çizgi `scaleX` 0.33/0.66/1, 0.7s expo.out. Tip kartında seçince `Check` `scale .4→1` spring (stiffness 400, damping 22) ve kart arka planı `::after` ile alttan dolsun; seçili olmayanlar `opacity .55`'e insin. Aside'da aktif adımın solundaki 2px çizgiyi `layoutId="step-indicator"` ile kaydır. Tamamlama scroll'u için `window.lenis?.scrollTo(0, {duration:1.2})`. Hata mesajları `height 0→auto` + `x` shake (3px, 0.3s) ile.

#### `motion-11` — Scroll'a bağlı hiçbir efekt yok; Lenis yalnızca smoothing yapıyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/SmoothScroll.jsx:11-20 (instance dışa açılmıyor, scroll event dinlenmiyor); src/app/[locale]/page.jsx:34-38 (hero video), :78,97,135 (dev başlıklar); src/components/Footer.jsx:16 (ALAZ wordmark); case-studies/[slug]/page.jsx:83 (hero image)

**Sorun.** Sitedeki hiçbir eleman scroll pozisyonuna/hızına tepki vermiyor: parallax, pin, scrub, scale, hız bağımlı skew yok. Lenis kuruludur ama `lenis.on('scroll')` hiç kullanılmıyor; GSAP yok. Dev tipografi (VALIDATION, CORE CAPABILITIES, SELECTED WORKS, footer ALAZ.) ve tam ekran videolar scroll-linked hareket için ideal yüzeyler ama hepsi sabit.

**Neden önemli.** Lenis + scroll-linked hareket kombinasyonu Awwwards'ın temel dili; Lenis'i kurup üstüne hiçbir şey koymamak 'kütüphane var, fikir yok' sinyali.

**Ne yapılmalı.** gsap + ScrollTrigger ekle ve Lenis ile bağla: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)` (mevcut manuel rAF döngüsünü kaldır, `autoRaf:false`). Instance'ı `LenisContext`/`window.lenis` olarak paylaş. Konkret ilk set: (1) hero video/poster `yPercent: 0→18` scrub (`scrub: true`, trigger hero, start top top, end bottom top) — derinlik; (2) her dev h2 `.fit` başlık `xPercent: 6→-6` scrub (ScrollTrigger start 'top bottom' end 'bottom top') — yatay süzülme; (3) case-study hero image `scale 1.15→1` + `yPercent 10→0` scrub; (4) footer ALAZ. wordmark `yPercent: 40→0` + `opacity .3→1` scrub; (5) scroll hızına bağlı skew: `lenis.on('scroll',({velocity})=>gsap.to('[data-skew]',{skewY: clamp(-4,4,velocity*0.15), duration:.3}))` proje kartlarında. Hepsini `gsap.matchMedia()` içinde `(prefers-reduced-motion: no-preference) and (min-width: 761px)` ile tanımla; mobile'da yalnızca (1) ve (3).

#### `motion-12` — Reduced-motion kapsamı yarım: marquee, ping, hero autoplay videoları, loader

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** tailwind.config.js:113-118; src/app/[locale]/page.jsx:35 (autoPlay), :60,:108,:199; case-studies/page.jsx:29; services/page.jsx:61-72; IntakeForm.jsx:93; layout.jsx:60-71

**Sorun.** Probe (reducedMotion:'reduce'): signal-marquee/ticker/ping `playState: running`. Hero `<video autoPlay>` dört sayfada reduced-motion kontrolü olmadan oynuyor (yalnız BackgroundVideo gated). NextTopLoader ve hover transform'lar da gate'siz. CSS reveal (globals.css:92-100) ve Lenis doğru davranıyor; sistem tutarsız.

**Neden önemli.** Awwwards jürisinde erişilebilirlik puanı var; daha önemlisi 'engineering practice' iddiası için erişilebilirlik tutarlılığı marka meselesi.

**Ne yapılmalı.** Tek kaynaklı kural: globals.css'e `@media (prefers-reduced-motion: reduce){ .animate-signal-marquee,.animate-ticker,.animate-ping{animation:none} [data-parallax]{transform:none!important} }`; Tailwind'de `motion-safe:animate-ticker` kullan (default animasyonsuz). Hero videolarını `HeroVideo` client bileşenine taşı: `matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData` ise `autoplay` verme, poster'da kal (BackgroundVideo mantığını yeniden kullan, `priority` prop'u ile preload farkı). GSAP tarafında tüm timeline/ScrollTrigger'lar `gsap.matchMedia()` içinde; `reduce` dalında `tl.progress(1)`. Hover transform'ları için `motion-safe:group-hover:scale-[1.04]`.

> **Doğrulayıcı notu:** Marquee/ticker/ping reduced-motion'da `running` (kendi probe'um). Autoplay video sayısı düzeltmesi: dört değil BEŞ sayfa — page.jsx:35, about/page.jsx:36 (reviewer listelememiş), services:61-72, case-studies:29, IntakeForm.jsx:93; hiçbirinde reduced-motion/saveData kontrolü yok, yalnız BackgroundVideo (14) gated. Önemli not: headless Chromium H.264 çözemiyor (canPlayType '' — kendi probe'um), dolayısıyla 'video oynuyor/durdu' probe okumaları bu ortamda kanıt değil; iddia kod temelinde doğru (tarayıcılar prefers-reduced-motion için autoplay'i kendiliğinden durdurmaz). Ek: Lenis 1.3.26 `respectReducedMotion: true` default olduğu için SmoothScroll.jsx:9'daki manuel gate gereksiz ama zararsız. Fix (tek kaynaklı @media kuralı + HeroVideo client bileşeni) doğru.

#### `motion-missed-1` — Reveal'lı içerik hydration bitene kadar görünmez (h1 dahil)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/layout.jsx:55 (head script `reveal-ready`), src/app/globals.css:71-90, src/components/ScrollReveal.jsx:11-34; kanıt: skeptic-about-prehydration.png

**Sorun.** Head'deki inline script `reveal-ready` sınıfını ilk boyadan önce ekliyor; bu andan itibaren tüm `[data-reveal]` elemanları (her sayfanın h1'i, hero paragrafları, kartlar) `opacity:0`. `is-revealed` sınıfını ancak React hydrate olup ScrollReveal'ın useEffect'i çalıştığında alıyorlar. Probe: JS chunk'ları 2.5s geciktirildiğinde 900ms'de `readyState: interactive`, h1 opacity 0, intro paragrafı opacity 0 — ekranda yalnız eyebrow ve kicker var, başlık yok. Yavaş bağlantıda (mobil 3G, ~300KB+ JS) hero saniyelerce boş kalır; şeffaf elemanlar LCP adayı olmadığı için LCP de hydration'a ötelenir.

**Neden önemli.** Awwwards jürisi ilk yükleme anını puanlar; 'büyük tipografi + video' hero'sunun yavaş ağda boş bir kare olması hem craft hem performans (Core Web Vitals) sorunu. Ayrıca `(scripting: none)` fallback'i (globals.css:92) JS açık ama henüz çalışmamış durumu kapsamıyor.

**Ne yapılmalı.** (1) İlk viewport'taki elemanlar (hero h1/tagline/intro, iç sayfa h1 + intro) için IO'ya bağlı `data-reveal` yerine ilk boyada kendiliğinden çalışan CSS keyframe kullan: `[data-enter]{animation:enter .9s var(--ease-out) both;animation-delay:var(--enter-delay,0ms)} @keyframes enter{from{opacity:0;transform:translateY(.14em)}} @media(prefers-reduced-motion:reduce){[data-enter]{animation:none}}` — JS'e bağımlı değil, SSR HTML görünür kalır. (2) `data-reveal` yalnız fold altındaki içerikte kalsın. (3) Head script'e güvenlik kemeri: `setTimeout(()=>document.documentElement.classList.remove('reveal-ready'),2500)` → hydration 2.5s'i aşarsa içerik animasyonsuz görünür. (4) GSAP'a geçilirse aynı ilke: başlangıç durumlarını CSS'te değil `gsap.set` ile ver (motion-06), böylece JS gelmeden HTML görünür.

### İNCE İŞÇİLİK

#### `motion-09` — FAQ native <details>: anında açılıyor, +/- ikon swap

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:235-243; screenshot: svc-d-faq-closed.png, svc-d-faq-open.png

**Sorun.** `<details>` içeriği animasyonsuz açılıyor; `+` ve `−` iki ayrı span `group-open:hidden/inline` ile yer değiştiriyor; açılan maddede başlık rengi/satırı değişmiyor. Repo'da Radix Accordion (ui/accordion.jsx) ve `accordion-down` keyframe'i var ama kullanılmıyor (o da shadcn default 0.2s ease-out).

**Neden önemli.** Akordeon açılışı tek başına küçük ama bir 'engineering practice' iddiasında olan sitede anlık pop düşük craft sinyali.

**Ne yapılmalı.** Ya Radix Accordion'u özelleştirerek kullan: `AccordionContent` için `data-[state=open]:animate-accordion-down` süresini 0.45s `cubic-bezier(.76,0,.24,1)` yap, iç paragrafı `opacity 0→1` 0.3s gecikmeli; ya da `<details>` kalsın ve JS'siz `grid-template-rows: 0fr→1fr` tekniği (`details[open] > div` wrapper, `transition: grid-template-rows .45s`). İkonu tek `+` yap, açıkken `rotate(45deg)` (× olur) 0.35s; açık maddenin başlığına `text-white`, kapalı olanlara `text-[#bdbdbd]`; satırın sol kenarında 1px dikey çizgi `scaleY 0→1`. Tek madde açık kalsın (`type="single"`), hover'da `+` 90° dönsün.

> **Doğrulayıcı notu:** services/page.jsx:235-243 doğrulandı: native <details>, `group-open:hidden/inline` ile +/− swap, açılan maddede başlık değişmiyor; ui/accordion.jsx shadcn default (0.2s ease-out, ChevronDown) ve hiçbir yerden import edilmiyor. Fix düzeltmesi: `<details>` + `grid-template-rows 0fr→1fr` tekniği yalnız AÇILIŞI animate eder; `open` kaldırılınca tarayıcı içeriği anında gizlediği için kapanış yine pop eder. JS'siz tam çözüm için Chrome 131+/Safari 18.4+'teki `::details-content { transition: height .45s, content-visibility .45s allow-discrete; interpolate-size: allow-keywords }` kullan (desteklemeyende anında açılır, kabul edilebilir), ya da Radix Accordion'a geç. Severity: tek bir FAQ bloğu, görünürlüğü düşük → minor.

#### `motion-13` — Framer-motion Reveal ve CountUp ölü kod; iki paralel reveal sistemi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/Reveal.jsx (hiç import edilmiyor), src/components/CountUp.jsx (hiç import edilmiyor), package.json (framer-motion, tailwindcss-animate), tailwind.config.js:89-105 (accordion keyframes kullanılmıyor)

**Sorun.** Grep: `Reveal` ve `CountUp` hiçbir sayfada kullanılmıyor; framer-motion yalnız ölü Reveal.jsx'te import ediliyor. Canlı reveal sistemi CSS + ScrollReveal.jsx; Reveal.jsx framer ile aynı işi farklı parametrelerle (y:24, margin -60px) yapıyor. Reveal.jsx'teki 'delay > 10 ise ms kabul et' hack'i API'nin kafa karışıklığını gösteriyor.

**Neden önemli.** İki yarım sistem = tutarsızlık riski ve bakım yükü; ayrıca 'count-up' gibi bir bileşenin yazılıp kullanılmaması, hareket kararlarının plansız alındığını gösteriyor.

**Ne yapılmalı.** Karar ver: (a) GSAP'a geçiliyorsa Reveal.jsx ve CountUp.jsx'i sil, framer-motion'ı sadece AnimatePresence gereken UI (menü, form adımları) için tut; (b) GSAP eklenmeyecekse framer-motion'ı tek motor yap: `Reveal` bileşenini `variants` ile `mask|fade|line` varyantlarına genişlet, ScrollReveal.jsx + globals.css reveal kurallarını kaldır (no-JS fallback için `initial={false}` + `useReducedMotion`). CountUp: About sayfasına gerçek sayılar eklenecekse (yıl, teslim edilen proje, ülke) kullan — `duration:1600` yerine 1.2s, `EASE_OUT_CUBIC` yerine expo.out, `tabular-nums` ile genişlik titremesini önle; eklenmeyecekse sil. tailwindcss-animate plugin'i ve accordion keyframe'leri FAQ Radix'e geçmiyorsa kaldır.

#### `motion-14` — ReadProgress: her scroll'da setState, width animasyonu, loader ile aynı yerde ikinci beyaz çubuk

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/ReadProgress.jsx:9-20; src/app/[locale]/blog/[slug]/page.jsx:79; screenshot: blogpost-d-progress.png

**Sorun.** `scroll` event'inde her frame `setProgress` → React re-render; `transition-[width] 80ms linear` ile çubuk Lenis'in yumuşatılmış scroll'unun 80ms gerisinde; `width` animate ediliyor (`transform` yerine). Çubuk `top-0 z-60` ile fixed header'ın üstünde, NextTopLoader ile aynı konumda — navigasyon anında iki beyaz çubuk üst üste biniyor. Lenis'in `progress` değeri varken native scrollTop okunuyor.

**Neden önemli.** Küçük ama 'engineering' iddiası taşıyan bir siteye yakışmayan uygulama; görsel olarak da header'ın üstünde yüzen beyaz çizgi logo ile çakışıyor.

**Ne yapılmalı.** `useScroll` (framer) veya `lenis.on('scroll', ({progress}) => bar.style.transform = `scaleX(${progress})`)` — DOM'a doğrudan yaz, state tutma; `transform-origin:left`, `will-change:transform`, transition yok (Lenis zaten lerp'li). Konum: header'ın alt kenarına (`top-[76px]`, header border'ının üstüne 1px) ya da makale sütununun solunda dikey 1px çizgi; top loader kaldırılınca çakışma kalmaz. Okuma bitince (progress>.98) çubuğu 0.4s fade-out.

> **Doğrulayıcı notu:** ReadProgress.jsx:9-20 doğrulandı: her scroll event'inde setProgress → re-render; width animate ediliyor; `top-0 z-[60]` header (z-40) üstünde; blogpost-d-progress.png'de logo hizasında beyaz çizgi. Düzeltme: `duration-[80ms]` sınıfı derlenmiyor (dev.log satır 22 'ambiguous'), computed transition-duration 0.15s — yani çubuk Lenis lerp'inin 80ms değil 150ms gerisinde, gecikme anlatılandan daha kötü. Fix (DOM'a doğrudan scaleX yaz, state tutma, transition yok, konumu header altına taşı) doğru.

#### `motion-15` — Header scroll'a ve hover'a tepkisiz

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:27 (fixed, her zaman blur), :33 (nav link transition-colors), :37-38 (dil/CTA hover)

**Sorun.** Header her durumda 76px + 14px blur + %55 siyah; scroll yönüne göre gizlenme/küçülme yok, 'scrolled' durumu yok. Nav link hover sadece `#aaa→#fff` 200ms; aktif link için kalıcı beyaz, çizgi/indikatör yok. CTA hover `-translate-y-[2px] + #d5d5d5` (Bootstrap refleksi).

**Neden önemli.** Header sitedeki tek kalıcı element; mikro-etkileşimleri sitenin genel craft algısını belirler.

**Ne yapılmalı.** Lenis `direction` ile: aşağı kayarken (`scrollY>120`) header `y:-100%` 0.5s `var(--ease-in-out)`, yukarı kayarken geri; hero içindeyken blur yok, hero bitince `backdrop-blur` + border 0.35s. Nav link: dış `overflow-hidden`, hover'da metin swap (motion-03'teki aynı pattern) ya da alt çizgi `scaleX 0→1 origin left` 0.35s expo.out, çıkışta `origin right`. Aktif link altında 1px çizgi `layoutId="nav-active"` ile sayfalar arası kayar. CTA'yı motion-03'teki imza etkileşime bağla; `-translate-y-[2px]`'yi tüm sitede kaldır. Logo hover'da nokta `scale 1→1.4` 0.3s (markanın tek süsü noktayı canlandır).

#### `motion-16` — Proje kartı hover: 1.03 scale + filter transition + transition-all ok kutusu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:152 (scale-[1.03], transition-[transform,filter] 500ms ease-out), :163 (transition-all duration-200, bg-white invert), :172 (text-[#eee]); screenshot: probe-home-project-hover.png

**Sorun.** Görsel 500ms'de 1.03 büyüyor ve `filter: brightness` animate ediliyor (filter her frame repaint, büyük görselde pahalı); köşedeki ok kutusu beyaza dönüyor; başlık rengi #fff→#eee (fark algılanmıyor). Her şey 'hover'da bir şeyler oluyor' ama kompozisyon yok.

**Neden önemli.** Scale-on-hover + brightness en jenerik portföy hover'ı; Awwwards jürisi projeler listesinde özgün bir hover bekler.

**Ne yapılmalı.** Görsel: `scale 1→1.05` 1.2s expo.out (daha yavaş, daha derin), `filter` yerine üstteki gradient overlay'in opacity'si; grayscale→renk geçişi isteniyorsa `mix-blend` yerine iki img katmanı (gri üstte opacity 1→0). Ok kutusu: invert yerine ok ikonu overflow-hidden kutuda sağ-üste çıkıp sol-alttan gelsin (0.5s). Başlık: altına 1px çizgi `scaleX` çizimi; `#eee` değişimini sil. Kart dışına `cursor` etiketi 'VIEW' (custom cursor varsa). `transition-all` → `transition-[background-color,color]`. Bu hover'ı case-study listesi ve blog kartlarıyla aynı dil olacak şekilde tek bir `MediaCard` bileşenine topla.

#### `motion-17` — Next project / next note: yalnız ok 10px kayıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:158-163, src/app/[locale]/blog/[slug]/page.jsx:121-124; screenshot: cs-d-vocab-next-hover.png, blogpost-d-next-hover.png

**Sorun.** Tam genişlikte, 70px padding'li büyük link; hover'da sadece 38px ok `translate-x-[10px]` 200ms. Satırın arka planı, başlık, numara tepkisiz. Sayfanın en büyük tıklanabilir alanı en zayıf hover'a sahip.

**Neden önemli.** 'Sonraki proje' bloğu Awwwards case-study sayfalarının imza anı (büyük başlık + görsel + perde geçişi); burada boş bırakılmış.

**Ne yapılmalı.** Bloğu 'preview' bloğuna çevir: hover'da arka planda sonraki projenin görseli `clip-path inset(0 0 100% 0)`→`inset(0)` 0.7s expo.out + `scale 1.1→1`, görsel üstüne siyah %60 overlay; başlık metin swap (iki katman, translateY) ve ok overflow-hidden çıkış/giriş; satır `padding-left` yerine iç wrapper `translate-x 24px`. Tıklamada view-transition ile görsel hero'ya morph (motion-02'deki `view-transition-name`). Mobil'de görsel statik, blok 56vh yüksekliğinde.

#### `motion-18` — Galeri: 9/16 mockup gridi sadece fade ile geliyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:133-147 (grid-cols-4, data-reveal fade, stagger 70ms); screenshot: cs-d-vocab-gallery.png

**Sorun.** Yedi telefon ekranı 4 sütunlu gridde, hepsi aynı anda ~0.6s fade; scroll'a bağlı bir ritim, derinlik ya da sıra yok; son satırda boş hücre.

**Neden önemli.** Case-study'nin en görsel kısmı; Awwwards sitelerinde galeriler pinned yatay scroll, stacking ya da farklı hızlı parallax ile 'okunur'.

**Ne yapılmalı.** Desktop: ScrollTrigger pin ile yatay şerit: section `pin:true`, track `xPercent: 0→-(trackWidth-viewport)`, `scrub: .8`, mockup'lar 38vh yükseklik, yan yana 24px gap; her mockup `clip-path` ile şeride girerken açılır. Alternatif (daha ucuz): gridde tek/çift sütunlara ters parallax (`yPercent: ±8` scrub) + `clip-path inset(100% 0 0 0)`→0 giriş 1s expo.out stagger 80ms. Mobil: 2 sütun, parallax yok, yalnız clip reveal. Boş hücreyi büyük bir 'ALAZ / 07 screens' tipografi hücresiyle doldur.

#### `motion-19` — Blog kartı ve services bloğu hover'ı: tıklanamayan alanlarda arka plan değişimi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/blog/page.jsx:48 (hover:bg-[#141414]), src/app/[locale]/services/page.jsx:138 (article hover:bg-[#0f0f0f] -mx-[15px]); screenshot: blog-d-card-hover.png, svc-d-block01-hover.png

**Sorun.** Blog kartı hover'da yalnız arka plan #141414; 'READ ↗' etiketi, tag pill, başlık tepkisiz. Services'te tıklanabilir olmayan 5 büyük `article` bloğu hover'da arka plan değiştiriyor (-15px margin ile taşarak) — link olmayan bir yüzeyde hover, kullanıcıya yanlış sinyal.

**Neden önemli.** Hover geri bildirimi 'tıklanabilir' anlamına gelir; anlamsız hover ve etkileşimsiz link aynı craft sorununun iki yüzü.

**Ne yapılmalı.** Services article'ından hover'ı kaldır; yerine scroll-linked: sol sütundaki '01 / 05 — WEB / FULL-STACK' bloğunu `position: sticky; top: 100px` yap, geçerli bölüm değişince numara overflow-hidden içinde yukarı kayarak değişsin (ScrollTrigger `onEnter/onLeaveBack`). Blog kartı: 'READ' okunun overflow-hidden çıkış/giriş hareketi, tag pill'in invert'i 0.3s, başlığın altında çizgi; arka plan değişimi kalacaksa 0.5s expo.out ve kart görseli yoksa başlık `translate-x 8px`.

> **Doğrulayıcı notu:** Yarı doğru. YANLIŞ kısım: blog kartındaki 'READ ↗' etiketi tepkisiz değil — blog/page.jsx:59 `transition-[gap,color] group-hover:gap-[12px] group-hover:text-white`; probe: gap 7px→12px, renk #cfcfcf→#fff (D). Tag pill ve başlık gerçekten tepkisiz. DOĞRU kısım: services/page.jsx:131-137 (hover sınıfı :137'de, :138 değil) tıklanamayan `<article>` hover'da `bg-[#0f0f0f]` + `-mx-[15px]` taşma — svc-d-block01-hover.png ile tutarlı. Eklenmesi gereken: ana sayfadaki capabilities `<article>` kartları da (page.jsx:99 `hover:bg-[#141414]`) link değilken hover bg değiştiriyor — aynı yanlış sinyal. Fix: tıklanabilir olmayan article'lardan hover'ı kaldır (sticky numara önerisi iyi); blog kartında mevcut READ hareketini koru, tag/başlık tepkisi ekle.

#### `motion-20` — Video poster→play geçişi pop ediyor; BackgroundVideo fade'siz başlıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35-37 (hero video), src/components/BackgroundVideo.jsx:21-23 (src atanıp play), about/page.jsx:49,78, services/page.jsx:250

**Sorun.** Hero'da video decode olunca poster'dan ilk frame'e anında geçiş; BackgroundVideo'da `src` viewport'a 300px kala atanıyor ve `play()` ile ilk frame pat diye beliriyor (opacity .5 sabit). Video ile bölüm içeriği arasında zamanlama ilişkisi yok.

**Neden önemli.** Tam ekran video sitenin en 'premium' varlığı; girişinin sert olması tüm bölümün algısını düşürür.

**Ne yapılmalı.** Video elementine `opacity-0` ver, `onPlaying` (veya `loadeddata` + `requestVideoFrameCallback`) event'inde `opacity` hedefe 1.2s `var(--ease-out)` ile; poster'ı ayrı `<img>` olarak altta tut (video opak olunca `aria-hidden` kalsın). BackgroundVideo'da bölüm viewport'a girerken video `scale 1.08→1` 1.6s + opacity. Tüm videolarda `object-position` scroll ile `yPercent` parallax (motion-11). Reduced-motion/saveData'da poster'da kal (motion-12).

> **Doğrulayıcı notu:** page.jsx:35-37 ve BackgroundVideo.jsx:21-23 doğrulandı (src atanıp play(), sabit opacity, fade yok). Ek bulgu: public/videos/poster.png 1280×720 düz #0a0a0a bir kare (3.7KB) ve 8 farklı videonun (dark-planet, the-work-section, services-section, about-section, about-alaz-section, about-end-section, start-a-project-hero, start-project-rocket) hepsi aynı poster'ı kullanıyor → poster hiçbir zaman ilk kareyle eşleşmiyor, poster→video geçişi her sayfada 'siyahtan pat diye görüntü'. Fix'e ekle: ffmpeg ile her videodan gerçek ilk kare poster üret (`ffmpeg -i x.mp4 -frames:v 1 -q:v 3 x-poster.jpg`), ardından `playing` event'inde 1.2s opacity fade. Not: headless Chromium H.264 çözemediği için svc-d-hero-video-raw/3s screenshot'ları aynı; görsel kanıt bu ortamda üretilemez, bulgu kod temelli.

#### `motion-21` — Footer wordmark ve 'Back to top' statik

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:16 (ALAZ. 320px wordmark), :26 (#top link)

**Sorun.** Sayfanın en büyük tipografik elemanı (footer'daki ALAZ.) hiçbir hareketle gelmiyor; 'Back to top' linki Lenis anchor ile kayıyor ama görsel geri bildirim yok (ok yok, hover yalnız renk).

**Neden önemli.** Footer, Awwwards sitelerinde ikinci 'hero' olarak kullanılır (perde footer, büyük wordmark reveal); burada kaçırılmış bir sahne.

**Ne yapılmalı.** Perde footer: `<footer class="sticky bottom-0 -z-10">` + `<main class="relative z-10 bg-ink">` — ana içerik footer'ın üstünden kayarak açılır; wordmark harfleri ScrollTrigger scrub ile `yPercent 60→0` stagger (SplitType chars) ya da `clip-path inset(100% 0 0 0)`→0. 'Back to top': ok ikonu + hover'da ok yukarı kayıp alttan geri gelsin; tıklamada `lenis.scrollTo(0,{duration:1.6, easing: expo})`. Mail linki hover'da underline draw.

#### `motion-missed-2` — Arbitrary `duration-[…]` sınıfları derlenmiyor (tailwindcss-animate çakışması)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** tailwind.config.js:121 (plugins: [tailwindcssAnimate]), node_modules/tailwindcss-animate/index.js:88-91; etkilenen: src/app/[locale]/case-studies/page.jsx:42 (`duration-[250ms]`), src/components/ReadProgress.jsx:20 (`duration-[80ms]`); kanıt: scratchpad/dev.log:19,22

**Sorun.** tailwindcss-animate `duration`, `delay` ve `ease` adlarıyla ikinci bir matchUtilities (animation-*) kaydediyor. Scale değerlerinde (`duration-200`) Tailwind iki kural da üretiyor, ama arbitrary değerde hangi utility olduğunu çözemeyip sınıfı düşürüyor: dev.log 'The class `duration-[250ms]` is ambiguous and matches multiple utilities' / aynısı `duration-[80ms]`. Computed: case-study satırı ve ReadProgress çubuğu 150ms (Tailwind default). Plugin'in kendisi hiçbir yerde kullanılmıyor (ui/* import edilmiyor).

**Neden önemli.** Yazılan süre ile çalışan süre farklı — motion token sistemi kurulsa bile arbitrary süreler sessizce yok sayılacak; 'engineering practice' iddiası olan bir repoda build log'daki uyarının göz ardı edilmesi ayrıca sinyal.

**Ne yapılmalı.** tailwindcss-animate'i package.json ve tailwind.config.js:1,121'den kaldır (accordion keyframe'leri ile birlikte, motion-13). Süreleri theme scale'e taşı: `theme.extend.transitionDuration: { 1:'240ms', 2:'480ms', 3:'900ms', 4:'1400ms' }` ve `duration-1…4` kullan (motion-08 ile aynı token seti). ESLint/grep kuralı: `duration-\[`, `delay-\[`, `ease-\[` yasak. `next dev` çıktısındaki Tailwind 'ambiguous' uyarılarını CI'da fail et.

#### `motion-missed-3` — Stagger gecikmesi layout'tan bağımsız: mobil tek sütunda her kart kendi index'i kadar bekliyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/ScrollReveal.jsx:18-31 (delay'i okumuyor, sadece attr'ı kaldırırken kullanıyor); sunucu tarafı delay'ler: src/app/[locale]/page.jsx:81 (i*80), :99 (i*80), :144 (i*90); services/page.jsx:211 (i*80); about/page.jsx:57 (i*100), :75 (i*60); case-studies/page.jsx:42 (i*60); case-studies/[slug]/page.jsx:141 ((i%4)*70), :151 (i*80); blog/page.jsx:48 ((i%2)*80)

**Sorun.** `--reveal-delay` render anında index'ten hesaplanıyor; desktop'ta aynı satırda duran kartlar için anlamlı, ama mobilde grid tek sütuna düşünce her kart viewport'a tek başına giriyor ve yine index gecikmesini bekliyor. Probe (390px, services process adımları): 4 adım tek sütunda, delay 0/80/160/240ms; 4. adım görünür olduktan 240ms sonra fade'e başlıyor. Galeride `(i%4)*70` mobil 2 sütunda 0/70/140/210 olarak dağılıyor (satır eşleşmesi bozuk); blog `(i%2)*80` mobilde tek sütunda tek kartlara 80ms ekliyor.

**Neden önemli.** Mobilde reveal'lar 'geç kalmış' hissi verir; stagger'ın amacı (aynı anda görünen grubu sıralamak) tek sütunda ortadan kalkıyor ama maliyeti kalıyor.

**Ne yapılmalı.** Gecikmeyi reveal anında, IO batch'ine göre ver: ScrollReveal.jsx callback'inde `const batch = entries.filter(e => e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top || a.boundingClientRect.left-b.boundingClientRect.left); batch.forEach((e,k)=>{ e.target.style.setProperty('--reveal-delay', `${k*60}ms`); e.target.classList.add('is-revealed'); })`. Sunucu tarafındaki tüm `'--reveal-delay': i*…` style'larını sil. Bir elemanın tek başına girdiği durumda k=0 → gecikme yok; aynı anda giren 3 kart 0/60/120ms.

#### `motion-missed-4` — Bir grup hover durumu hiç transition'suz (anlık renk sıçraması)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:54 (`a[href="#validation"]` hover:text-white), src/components/Footer.jsx:24 ve :26 (hover:text-white), src/components/IntakeForm.jsx:188 (geri butonu hover:text-white), tüm eyebrow satırlarındaki `[&_a:hover]:text-white` (about/page.jsx:41,52,73; services/page.jsx:75; case-studies/page.jsx:34; case-studies/[slug]/page.jsx:87; blog/page.jsx:31; blog/[slug]/page.jsx:88); kanıt: probe G computed transition-duration 0s

**Sorun.** Bu link'lerde `transition-colors` yok; renk #777/#aaa'dan beyaza 0ms'de atlıyor. Aynı sayfada yan yana duran diğer link'ler 200ms ease-in-out ile geçiyor (Header, blog kartı) → hover dili tutarsız: bazı yerler yumuşak, bazıları sert.

**Neden önemli.** Hover geri bildirimi sitedeki en sık tekrarlanan mikro-etkileşim; bir kısmının snap etmesi 'detay bitirilmemiş' hissi verir ve motion-08'deki token sisteminin kapsam dışında kalır.

**Ne yapılmalı.** globals.css `@layer base`'e tek kural: `a, button { transition: color var(--d-1) var(--ease-out), border-color var(--d-1) var(--ease-out), background-color var(--d-1) var(--ease-out); }` (token'lar motion-08'den). Kendi `transition`'ı olan elemanlar bunu override eder. Alternatif: her hover:text-* taşıyan link'e `transition-colors duration-1` ekle ve `[&_a:hover]:text-white` yerine `[&_a]:transition-colors [&_a:hover]:text-white` kullan.

#### `motion-missed-5` — Reveal transition'ı, reveal bittikten ~0.8s sonrasına kadar hover transition'larını eziyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/globals.css:71-74 (`.reveal-ready [data-reveal]` transition: opacity, transform), src/components/ScrollReveal.jsx:26-27 (attr `delay + 800ms` sonra kaldırılıyor); etkilenen: case-studies/page.jsx:42 (Link data-reveal + transition-[padding,background]), page.jsx:144 (proje kartı data-reveal + iç hover transition'lar), blog/page.jsx:48 (kart data-reveal + transition-colors), page.jsx:99 ve services:132 (article)

**Sorun.** Hem `data-reveal` hem kendi hover transition'ını taşıyan elemanlarda, `.reveal-ready [data-reveal]` (specificity 0,1,1) Tailwind utility'sini (0,1,0) ezdiği için attribute kaldırılana kadar `transition-property` yalnız 'opacity, transform'. Probe A: satır görünür olduktan sonra 'early' computed transition 'opacity, transform 0.6s', 'late' (attr kaldırılınca) 'padding, background'. Yani kullanıcı yeni görünen bir satıra/karta hemen hover yaparsa arka plan ve padding sıçrıyor; ayrıca `transition-delay: var(--reveal-delay)` bu pencerede hover'a da uygulanıyor (90ms gecikmeli hover).

**Neden önemli.** Reviewer'ın 'strength' olarak övdüğü attr kaldırma mekanizması sorunu çözmüyor, sadece 1.4s'ye sıkıştırıyor; liste sayfalarında kullanıcı tam da bu pencerede hover yapıyor (scroll edip görünen ilk satır).

**Ne yapılmalı.** Reveal'ı ve hover'ı aynı elemana koyma: `data-reveal`'ı sade bir wrapper'a taşı (`<li data-reveal><Link className="… hover …">`), ya da reveal CSS'ini `:where()` ile düşük specificity'ye indir ve attr'ı timer yerine `transitionend` event'inde kaldır (`el.addEventListener('transitionend', () => el.removeAttribute('data-reveal'), { once: true })`). GSAP'a geçilirse sorun kendiliğinden kalkar (reveal inline transform/opacity ile yapılır, transition-property'ye dokunmaz).

## Eklenmesi önerilenler (Awwwards seviyesi için)

### GSAP + ScrollTrigger + Lenis omurgası

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (Lenis yazarları) 'lenis + gsap ticker' reçetesi; Locomotive, Basement Studio

`gsap` ve `@gsap/react` ekle; SmoothScroll.jsx'i `LenisProvider`'a çevir (context + `window.lenis`), manuel rAF yerine `gsap.ticker.add(t => lenis.raf(t*1000))`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`, `ScrollTrigger.defaults({ markers:false })`. Sayfa değişiminde `ScrollTrigger.getAll().forEach(t=>t.kill())` ve `lenis.scrollTo(0,{immediate:true})` (pathname effect). Tüm animasyonlar `useGSAP(() => { const mm = gsap.matchMedia(); mm.add({ desktop:'(min-width:761px)', reduce:'(prefers-reduced-motion: reduce)' }, ctx => {...}) })`. `gsap.defaults({ ease:'expo.out', duration:.9 })` + `CustomEase.create('inout','.76,0,.24,1')`.

### Satır/karakter maskeli tipografi reveal sistemi (SplitType)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday, Obys Agency, Resn case-study sayfaları

`split-type` ekle. `<MaskText as="h2" type="lines|chars" delay>` client bileşeni: SSR'da düz metin (SEO/no-JS), mount'ta `new SplitType(el,{types:'lines,words'})`, her satır `overflow:hidden` wrapper'a alınır (`lineClass:'line'`, wrapper'ı JS'te sar), ScrollTrigger `once:true` start 'top 85%' ile `yPercent:110→0`, 1.1s expo.out, stagger .08; `chars` modu hero 'ALAZ' ve 404 gibi tek kelimeler için stagger .05. `ResizeObserver` ile `split.revert()` + yeniden böl (debounce 150ms). `fit()` ile tek satır olan başlıklarda satır = kelime grubu olduğu için `<br/>`'ları `line` olarak koru. Paragraflar için `words` modu kullanma; yalnızca opacity.

### İlk ziyaret preloader'ı (≤1.4s)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Unseen Studio, Obys, Active Theory açılışları

`app/[locale]/template.jsx`'e değil layout'a bir `Preloader` client bileşeni: tam ekran #0a0a0a katman, ortada 'ALAZ' harfleri chars maskeden çıkar (0.8s), sağ altta mono `00 → 100` sayaç (gerçek `document.readyState` + hero video `canplay`'e bağlı, min 900ms max 1400ms), bitince katman `clip-path inset(0 0 100% 0)` ile yukarı açılır 0.8s `inout`, hero timeline'ı (motion-06) perde %40 açıldığında başlar. `sessionStorage.alazIntro=1` ile tekrar gösterme; reduced-motion'da 300ms fade. Perde açılırken Lenis `stop()`, bitince `start()`.

### Manyetik butonlar + minimal custom cursor (yalnız pointer:fine)

- **Etki:** orta · **Efor:** küçük · **Referans:** Lusion, Active Theory, Dennis Snellenberg portfolyosu

`useMagnetic(ref,{strength:.35, radius:90})` hook: `pointermove`'da buton merkezine uzaklık ≤ radius ise `gsap.quickTo(el,'x'/'y',{duration:.6,ease:'power3'})` ile `dx*strength`, çıkışta `elastic.out(1,.4)` 0.9s ile sıfıra. İç metin için `strength:.15` (iki katmanlı parallax). Cursor: 8px beyaz dot `mix-blend-mode:difference`, `fixed`, quickTo lerp; proje satırı/kartında `data-cursor="VIEW"` → dot 64px'e büyür, mono 11px etiket; link'lerde 24px halka; `pointer:coarse` ve reduced-motion'da hiç mount etme, native cursor'ı gizleme (cursor:none yalnız hover'daki eleman üstünde).

### Sayfa geçişlerinde paylaşılan başlık morph'u

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Chrome 'Same-document view transitions' örnekleri; Locomotive case-study geçişleri

motion-02'deki `next-view-transitions` üstüne: case-study liste satırı h2 ve detay h1'e `style={{viewTransitionName:`project-${slug}`}}`, blog kart başlığı ↔ post h1 için `post-${slug}`; `::view-transition-group(*){animation-duration:.7s; animation-timing-function:cubic-bezier(.76,0,.24,1)}`. Liste→detay geçişinde hover'daki önizleme görseline de `view-transition-name: project-media-${slug}` ver → hero görseline büyüyerek morph. Font-size farkı büyük olduğu için `::view-transition-old/new` `mix-blend-mode:normal` + `object-fit` ayarla; test: Chrome/Edge/Safari 18; desteklemeyen tarayıcıda otomatik olarak düz navigasyon.

### Stacking / pinned bölümler (About principles, Services core blocks)

- **Etki:** orta · **Efor:** orta · **Referans:** Basement Studio, Lusion services, Igloo Inc

About'taki 3 principle ve Services'teki 5 core block için ScrollTrigger `pin`: her kart `position: sticky; top: 100px`, bir sonraki kart gelirken önceki `scale 1→.94` + `opacity 1→.5` + `filter: blur(0→2px)` scrub (trigger: sonraki kart, start 'top bottom', end 'top top'). Kartlar üst üste 'desteleniyor'; sol sütundaki numara sayacı (01/05) overflow-hidden içinde kayıyor. Mobil'de pin yok, yalnız clip reveal.

### Kinetik hero: Archivo'nun wdth ekseniyle scroll/mouse tepkisi

- **Etki:** orta · **Efor:** küçük · **Referans:** Studio Freight (variable font scroll), Grilli Type specimen siteleri

next/font Archivo'yu `axes:['wdth']` ile yükle (Archivo variable: wdth 62–125). Hero 'ALAZ' h1: scroll'da `font-variation-settings:'wdth' 125→80` scrub (hero yüksekliği boyunca) — kelime scroll'la sıkışır; desktop'ta pointer x konumuna göre harf bazlı `wdth` (SplitType chars, imlece yakın harf genişler, `gsap.quickTo` + distance falloff). Footer wordmark'ta ters yönde. GPU'da ucuz, görsel olarak markaya özgü, hiçbir template'te yok.

### Perde footer ve bölüm 'curtain' geçişleri

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive, Exo Ape footer'ları

Footer `sticky bottom-0`, `main` `relative z-10` + alt kenarda hafif gölge: sayfa sonunda içerik yukarı kayıp footer'ı açar. Ana sayfada koyu/açık ton değişen bölümler (#0e0e0e / #111 / #090909) arasında ScrollTrigger ile `body` arka plan rengini scrub'la tween'le (`gsap.to('body',{backgroundColor})`, trigger her section start 'top 60%') — bölüm sınırları yerine sürekli ton geçişi.

### Hover'da kısa video önizleme (case-study listesi ve kartlar)

- **Etki:** orta · **Efor:** orta · **Referans:** Studio Freight work listesi, Resn, Zajno

Her projeye 3–4 sn'lik sessiz webm/mp4 (≤600KB) ekle; motion-04'teki imleci takip eden önizleme kutusunda hover'da `video.play()`, çıkışta `pause()` + `currentTime=0`; `preload="none"`, ilk hover'da src atanır. Ana sayfadaki proje kartlarında da görselin üstüne hover'da video `opacity 0→1` 0.6s. Reduced-motion/saveData'da poster kalır.

### Hareket kalite kapısı: motion-check script'i

- **Etki:** düşük · **Efor:** küçük

Repo'ya küçük bir Playwright script (scratchpad'deki motion-probe.cjs temel alınabilir): hover/menu/form-step state'lerini screenshot'lar, `prefers-reduced-motion` altında `animationPlayState` ve `video.paused` assert eder, `transition-all` ve `ease-in-out` grep'ini CI'da fail eder, Lenis ile menü açıkken `scrollY` değişimini test eder. Böylece motion-04/07/12 tipi regresyonlar bir daha kaçmaz.
