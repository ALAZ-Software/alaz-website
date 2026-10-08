# ALAZ web sitesi — tasarım eleştirisi ve Awwwards yol haritası

**Kapsam:** alaz.pro'nun İngilizce sürümü (varsayılan locale), tüm sayfalar, tüm bileşenler, tüm İngilizce metin, görsel/video varlıkları, hareket sistemi, mobil, erişilebilirlik, performans ve site dışı yüzeyler (sekme başlığı, paylaşım kartı, Google sonucu).
**Hedef:** sitenin "AI slop"tan tamamen arınması ve Awwwards Site of the Day (SOTD) adayı olabilecek bir tasarım diline geçmesi.
**Tarih:** 8 Ekim 2026 · **İncelenen commit:** `6f98754`

Bu klasör üç katmandan oluşur:

1. **Bu dosya (README):** karar, puanlar, konsolide öncelik listesi, Awwwards diline geçiş için gerekenler ve 3 fazlı yol haritası.
2. **[00-kritik-bulgular.md](00-kritik-bulgular.md):** 20 boyuttaki 73 kritik bulgunun tek listesi.
3. **01–20 numaralı dosyalar:** her boyut için tam rapor: genel değerlendirme, korunacaklar, bütün bulgular (yer, sorun, neden, çözüm) ve o boyutta Awwwards seviyesi için eklenmesi önerilenler. Toplam 543 bulgu, 163 ekleme önerisi.

---

## 1. Kısa karar

Site teknik olarak temiz ve disiplinli kurulmuş; ama üstüne giydirilen tasarım dili 2025–26'nın "koyu brutalist AI stüdyo şablonu"nun neredeyse eksiksiz bir kataloğu. Bir Awwwards jürisi ya da deneyimli bir müşteri ilk üç saniyede şablonu tanır.

**Sitenin bir fikri yok.** Baştan sona bir "uzay gemisi konsolu" rolü oynuyor: `SYSTEM_ACTIVE`, `COMMAND SEQUENCE READY`, `START SEQUENCE`, `SECURE TRANSMISSION`, `01 / 05` sayaçları, `// ROLE` yorum satırları, köşe braketli buton, yanıp sönen yeşil nokta, iki buzzword marquee'si, sekiz adet stok "dark tech" videosu, baş harfli ve şirketsiz testimonial'lar, hero'da `POWERED BY GOOGLE / CLAUDE` rozetleri, `NO BULLSHIT. JUST ACTION.` ve `Built with intent. Engineered to last.` gibi slogan dolguları. Bunların hiçbiri ALAZ'a ait bir fikirden gelmiyor; isimle (alaz = ateşin iş yapmaya başladığı parlak kenar), İzmir'le, ürünlerle ya da ekiple hiçbir bağ kurmuyor.

**Altında ise gerçekten değerli bir iskelet var.** Archivo Black + `fit()` tipografi motoru, tek `--gutter` token'ı, hairline disiplini, 0px radius, Lenis, reduced-motion'a saygılı reveal sistemi, lazy `BackgroundVideo`, eksiksiz JSON-LD/SEO katmanı, dürüst ve somut servis/case study/blog/legal metinleri ve en önemlisi iki gerçek ürün (Vocabulary, markethours.live). Awwwards seviyesine giden yol sıfırdan başlamak değil: kostümü tamamen söküp bu iskeletin üstüne tek bir fikir kurmak.

**Awwwards jürisi puanı (şu an):** Design 5.5 · Usability 6 · Creativity 3.5 · Content 4.5 → ağırlıklı **≈5.2 / 10**. Honorable Mention eşiği ~6.5, SOTD 8+. Aradaki fark teknik değil kavramsal.

---

## 2. Puan tablosu

| Boyut | Puan | Bulgu (kritik/önemli/ince) | Dosya |
|---|---|---|---|
| Ana sayfa | 3.5 | 32 (7/12/13) | [01-ana-sayfa.md](01-ana-sayfa.md) |
| Hakkında | 3.5 | 22 (5/9/8) | [02-hakkinda.md](02-hakkinda.md) |
| Hizmetler | 4 | 28 (3/16/9) | [03-hizmetler.md](03-hizmetler.md) |
| Case study index + detay | 3.5 | 30 (5/12/13) | [04-case-studies.md](04-case-studies.md) |
| Blog index + yazı | 4.5 | 27 (2/12/13) | [05-blog.md](05-blog.md) |
| Start a project + intake formu | 3.5 | 26 (4/12/10) | [06-start-project-formu.md](06-start-project-formu.md) |
| Header, nav, footer, 404, legal | 3.5 | 26 (3/11/12) | [07-header-footer-404.md](07-header-footer-404.md) |
| Tipografi ve layout sistemi | 4 | 34 (4/15/15) | [08-tipografi-ve-layout.md](08-tipografi-ve-layout.md) |
| Hareket ve etkileşim | 3 | 26 (3/9/14) | [09-hareket-ve-etkilesim.md](09-hareket-ve-etkilesim.md) |
| Metin ve ses (İngilizce) | 3.5 | 31 (5/11/15) | [10-metin-ve-ses.md](10-metin-ve-ses.md) |
| AI-slop ve şablon kalıbı dedektörü | 3 | 28 (8/15/5) | [11-ai-slop-dedektoru.md](11-ai-slop-dedektoru.md) |
| Mobil | 4 | 30 (3/16/11) | [12-mobil.md](12-mobil.md) |
| Görsel, video, marka varlıkları | 3.5 | 25 (2/13/10) | [13-gorsel-video-marka.md](13-gorsel-video-marka.md) |
| Performans ve teknik | 4.5 | 27 (3/9/15) | [14-performans-ve-teknik.md](14-performans-ve-teknik.md) |
| Awwwards jürisi ve konsept yönü | 5.2 | 29 (5/14/10) | [15-awwwards-juri-ve-konsept.md](15-awwwards-juri-ve-konsept.md) |
| Geniş ekran (1536–2560) ve laptop (1024–1366) | 3 | 24 (3/18/3) | [16-genis-ekran-ve-laptop.md](16-genis-ekran-ve-laptop.md) |
| Klavye, odak, ekran okuyucu | 4 | 28 (2/10/16) | [17-klavye-odak-erisilebilirlik.md](17-klavye-odak-erisilebilirlik.md) |
| Tarayıcı ve sistem katmanı | 3.5 | 23 (1/12/10) | [18-tarayici-ve-sistem-katmani.md](18-tarayici-ve-sistem-katmani.md) |
| Sayfalar arası yolculuk ve link grafiği | 3.5 | 25 (2/11/12) | [19-sayfalar-arasi-yolculuk.md](19-sayfalar-arasi-yolculuk.md) |
| Site dışı yüzeyler (title, OG, SERP, JSON-LD) | 3.5 | 22 (3/8/11) | [20-site-disi-yuzeyler.md](20-site-disi-yuzeyler.md) |

Toplam 543 bulgu: 73 kritik, 245 önemli, 225 ince işçilik. Her bulgu ikinci bir ajan tarafından kod ve ekran görüntüsüne karşı doğrulandı (279 aynen doğrulandı, 170 düzeltme notuyla doğrulandı, 94 doğrulayıcının kendi bulduğu ek bulgu).

---

## 3. Korunması gerekenler

Bunlara dokunmayın; yeni tasarım bunların üstüne kurulmalı.

- **`src/lib/fit.js` + `.fit` sınıfı.** En geniş kelimeye göre display boyutunu kolona kilitleyen, iki dilde de taşmayı önleyen, JS'siz çalışan gerçek bir mühendislik çözümü. Sitedeki en iyi "craft" kanıtı.
- **Archivo Black wordmark ve gri kare nokta.** `ALAZ.` tek başına güçlü bir marka işareti. Sorun noktanın her başlıkta tekrar edilerek tüketilmesi; nokta yalnızca wordmark'ta kalmalı ve "canlı" marka işaretine dönüşmeli.
- **Tek `--gutter` token'ı, hairline disiplini, 0px radius, monokrom palet.** Doğru kısıtlar; sorun kısıtın içinde fikir olmaması.
- **Hareket altyapısı.** Lenis (ölçülü ayar), `reveal-ready` ile JS'siz görünür içerik, `prefers-reduced-motion` ve `saveData` kontrolleri, `BackgroundVideo`'nun IntersectionObserver mantığı. Yeni koreografi bu zemine kurulur.
- **Gövde metinlerinin sesi.** Servis deliverable listeleri, FAQ cevapları (4–8 hafta, bir iş günü içinde cevap), case study paragrafları (1-2-4-7-15-30 günlük tekrar, 9 borsa, RevenueCat), iki blog yazısı ("We optimize for month eighteen.", "Boring technology, on purpose."), legal/privacy metinleri ("Please don't scrape it at scale"). Bu ses sitenin başlık katmanına taşınmalı.
- **ALAZ etimolojisi.** "The working flame, not the first spark or the dying ember." Sitenin tek gerçek, sahiplenilebilir fikri; yeni konseptin brief'i.
- **İki gerçek ürün.** Vocabulary'nin sarı kapağı/kedi maskotu ve 7 gerçek mağaza ekranı; Market Hours'un kodla üretilen HUD banner'ı ve canlı dashboard'u. Sitedeki tek renkli ve özgün varlıklar; karartılmamalı, büyütülmeli.
- **SEO ve yapısal veri katmanı.** `buildMetadata`, canonical + hreflang, Organization/WebSite/Breadcrumb/FAQ/BlogPosting/CreativeWork JSON-LD, sitemap, robots, llms.txt. Üstüne OG sistemi eklenir, yeniden yazılmaz.
- **Intake formunun omurgası.** Üç adım, 8 alan, 5'i zorunlu; dürüst "Something Else" seçeneği; kısa ve iyi yazılmış hata mesajları.
- **Case study index'inin tablo iskeleti ve hover-preview fikri.** Uygulaması eksik ama kalıp doğru.

---

## 4. Değişmesi gerekenler — konsolide öncelik listesi

Aşağıdaki liste 543 bulguyu kök nedenlere göre birleştirir. Her maddenin yanında ilgili dosya/bulgu kimlikleri var; tam gerekçe ve uygulanabilir çözüm o bulgularda.

### 4A. Hemen silinecekler (slop sinyalleri)

1. **`POWERED BY GOOGLE / CLAUDE` rozetleri** — hero'da ve About'ta. Stüdyoyu "AI wrapper" olarak konumlandırıyor, Google marka kurallarına aykırı, brief'in slop listesinde birebir var. `PoweredBy.jsx` komple gider; araç şeffaflığı istenirse footer'da düz bir colophon satırı. (home-03, about-01, copy-02, slop-01, media-13, awwwards-04)
2. **Sekiz stok "dark tech" videosu (20,6 MB).** Gezegen, roket, sunucu koridoru, dişli, fiber optik, devre kartı. Hiçbiri markayla ilgili değil; %50–62 opaklık + iki gradyan altında ekranda neredeyse siyah; hepsi `preload="auto"`, içinde sessiz AAC parçası, 720p tek format. Tek on-concept olan pürmüz alevi videosu bile görünmez. (home-07, media-01/03/04, slop-11, performance-02, awwwards-05)
3. **Terminal/sci-fi sözlüğü.** `SYSTEM_ACTIVE`, `EXTERNAL SIGNAL`, `THE OUTPUT`, `INITIATE`, `COMMAND SEQUENCE READY`, `START SEQUENCE`, `SECURE TRANSMISSION`, `TRANSMITTING...`, `STATUS: ACCEPTING`, `SPECIMEN`, `// ROLE` önekleri, `001 / 005` sayaçları (home'da iki kez "01", About'ta 01'den 04'e atlıyor). (home-01, slop-04/07/08, copy-01/05/06/14/15, awwwards-06, start-project-04)
4. **Köşe braketli CTA + yanıp sönen yeşil nokta.** Sitedeki tek renk sinyali bir "ping". (home-05, motion-03, slop-05)
5. **İki buzzword marquee'si** (`ENGINEERING WITHOUT COMPROMISE`, `UNCOMPROMISING PRECISION`…). Lineer, durmuyor, reduced-motion'ı dinlemiyor, bilgi taşımıyor. (home-04, motion-05, slop-06, copy-04)
6. **Baş harfli, şirketsiz, hiçbir işe bağlanmayan testimonial'lar** ve yanındaki lucide `ShieldCheck`. "EST. 2026" olan bir stüdyoda "reputation earned in production" iddiasıyla yan yana uydurma okunuyor. Gerçek, isimli, projeye bağlı referans yoksa bölüm tamamen kaldırılır; yerine kanıt şeridi. (home-06, slop-02, copy-03, awwwards-08)
7. **Slogan dolguları.** `NO BULLSHIT. JUST ACTION.`, `Built with intent. Engineered to last.`, `PRECISION IS THE STANDARD. NOT THE GOAL.`, `DESIGNED WITH INTENT / BUILT TO ENDURE`, `WE ENGINEER PERMANENCE`, `NOT AN AGENCY. AN ENGINEERING PRACTICE.`, `FOUR MOVES ZERO GUESSWORK`, `GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T.`, `BUILD FOR WHAT'S NEXT.` / `PRECISION AT EVERY LAYER.` / `LESS NOISE. MORE SIGNAL.` (iki projede birebir aynı). Antitez kalıbı ("X. NOT Y.") sitede 8+ kez. (home-02, about-06, copy-10/11, slop-03/18, slop-missed-1, awwwards-03)
8. **Sahte arşiv notasyonu.** `INDEX / 001`, `PROJECTS ON FILE / 02`, `END OF INDEX`, `ALAZ / MANIFESTO 2026`, `ALAZ / CAPABILITIES 2026`, `FIG. 01`, `STUDIO / 001`. İki projelik bir arşiv için. (case-studies-01/10, about-02, services-01, blog-01, copy-12, slop-17)
9. **Hostinger Horizons (AI site-builder) kalıntıları.** `images.hostinger.com` / `horizons-cdn` görselleri (blog kapakları + en.json'daki 5 ölü `media.*` görseli), PocketBase auth kalıntıları, 55 kullanılmayan shadcn dosyası, ~35–40 kullanılmayan paket, `Reveal.jsx` ve `CountUp.jsx` ölü kod, ESLint'te "AI rarely makes this error" notlu kapatılmış kurallar. (slop-12/14, media-06/07, performance-06, performance-missed-1, motion-13)
10. **nprogress top loader** (beyaz parlayan çubuk) — tek sayfa geçişi efekti. (chrome-17, motion-02, awwwards-19)
11. **Her yere konmuş lucide ikonları.** 28 adet `ArrowUpRight` (yalnızca 1'i gerçek harici link, 7'si link bile değil), `MoveUpRight`, `CirclePower`, `Clock`, `Menu/X`. (slop-10, awwwards-17, gap-journey-link-graph-07)
12. **Ölü `COMING SOON` mağaza butonları** her iki case'de; griye boyanmış sahte butonlar, canlı linkin yanında. (case-studies-16, slop-missed-3, gap-journey-link-graph-missed-1)

### 4B. Yeniden yazılacaklar (içerik)

13. **Tüm başlık katmanı copy'si** (hero, eyebrow, CTA, intake etiketleri, About hero, archive, case study başlıkları) blog/FAQ/legal'in sesiyle sıfırdan: cümle vakası, her cümlede bir özel isim/sayı/araç, sayfa başına en fazla bir slogan, rakipten bahsetme yok ("Most agencies…" strawman'ı FAQ'da ve JSON-LD'de dışarı sızıyor). Yazılı ses rehberi + yasaklı kelime listesi `brand/voice.md`. (10-metin-ve-ses.md tamamı; copy-13, gap-offsite-surfaces-08)
14. **İnsanlar.** Sitede tek bir isim, yüz, rol yok; blog yazarı "The ALAZ Team // ENGINEERING STUDIO", avatar "A." karesi. About'a "who" bloğu, blog'a gerçek byline'lar, Person JSON-LD. İki kişilik stüdyo olmak Awwwards'ta sık görülen bir profil; isimsizlik AI içerik sinyali. (about-05, media-12, copy-20, awwwards-missed-2, gap-offsite-surfaces ek önerileri)
15. **Ofis adresleri.** "1250 Broadway, 36th Floor, New York" ve "Folkart Towers B Blok Kat 31, İzmir" serviced/sanal ofis adresleri olarak tanınıyor; "EST. 2026" ve legal'deki "a small software engineering studio" ile yan yana inandırıcılığı düşürüyor. Doğrulayın; gerçek çalışma yeri neyse onu yazın, footer ve About'ta aynı blok iki kez basılmasın. (chrome-10, copy-23, slop-23, about-12, mobile-17)
16. **Marka tutarlılığı.** Altı farklı sekme başlığı eki, beş farklı "ne yapıyoruz" cümlesi (OG alt metninde emekli "High-Performance Web Engineering" sloganı, manifest'te "Software Architecture Studio"), iş sayfasının beş adı (Case Studies / The Work / Archive / Index / Selected Works), üç farklı "how we work" süreci, üç farklı hizmet taksonomisi. Tek `BRAND` sabiti + `title.template`. (gap-offsite-surfaces-01/11, copy-09/22, copy-missed-1/4, gap-journey-link-graph-10)
17. **Case study'ler hikâye değil üç alanlı form.** Aynı üç slogan başlık, "DELIVERABLE" kutuları, Market Hours'ta sıfır ürün görseli, Vocabulary galerisi caption'ı gömülü mağaza pazarlama ekranları. Facts strip (yıl/rol/platform/stack/link), gerçek ekran kayıtları, süreç artefaktları, "by the numbers", "what we'd change". (case-studies-09/11/12/13/18, awwwards-11)

### 4C. Yapısal düzeltmeler (sistem)

18. **Tip sistemi yok.** 129 kopya `text-[12px]`, 86 kopya `tracking-[.085em]`, 28 farklı gri metin rengi, 12 algılanamayan siyah tonu, 60+ farklı boşluk değeri, 23 farklı `max-w`. ALL-CAPS her seviyede, display tracking −.075em kelime boşluklarını yutuyor ("WHATWE ACTUALLYDO"), 1440px'de 13px gövde metni, h-etiketi olmayan display metinler Inter 800 ile basılıyor, mono faux-bold. Token'lanmış 7 stillik tip ölçeği + spacing token'ları + `.t-*` sınıfları. (08-tipografi-ve-layout.md; typography-01…07)
19. **Grid yok, max-width yok.** Hero'daki 4 hairline dekoratif ve hiçbir içerikle hizalı değil (1366/1536/1920'de intro paragrafının içinden geçiyor); 1920→2560 arasında yazı sabit kalırken alan 640px büyüyor; 1001–1200 bandı için breakpoint yok; `pt-[30vh]` yüzünden ana hero 1280–1920 arasındaki hiçbir laptop'a sığmıyor. 12 kolon grid + 1600–1680px içerik shell'i (ya da vw-bazlı rem ölçekleme). (16-genis-ekran-ve-laptop.md; typography-10)
20. **Hareket sistemi yok.** Her şey 0.6s opacity + 14px fade-up; "mask" reveal gerçek mask değil; hero'da giriş koreografisi, sayfa geçişi, preloader, scroll'a bağlı tek bir efekt, hover medyası, pinned bölüm, manyetik buton, custom cursor yok; 7 farklı süre, 5 farklı easing, `transition-all`. Case-study hover'ındaki `-rotate-4` sınıfı Tailwind'de yok (eğim hiç render olmuyor), arbitrary `duration-[…]` sınıfları derlenmiyor. (09-hareket-ve-etkilesim.md)
21. **Her sayfa aynı kompozisyon.** Eyebrow çizgisi → dev caps başlık + gri nokta → lead → 3 sütun grid; 1440'ta ana sayfadaki üç h2 birebir aynı boyda; services'te dört hero boyutunda başlık; blog'da "THE BLOG." tek içeriği fold altına itiyor; legal'de 187px tek kelime. Sayfa ağırlığı başlık boyutundan okunmalı; üç kademeli `PageHeader` + tek `SectionHead`. (home-09, services-07, blog-11, chrome-14, typography-07/19, awwwards-14)
22. **Mobil, masaüstünün alt alta dizilmiş hâli.** `fit()` en uzun kelimeye göre küçülttüğü için hiyerarşi tersine dönüyor (About'ta h1 43px, h2 64px; ana sayfa h2'leri 39–55px arasında geziyor); hero wordmark 62px (footer'daki ile aynı); services sayfası 11.619px; work index'te tek görsel yok; menü animasyonsuz liste; landscape'te menünün son maddeleri erişilemiyor; form alanları 14px (iOS zoom). (12-mobil.md)
23. **Footer bir varış noktası değil, sayfalar arasında yol yok.** Footer'da nav, CTA, sosyal, canlı ürün yok (tanımlı `footer.talk` string'i bile render edilmiyor); hizmet↔vaka↔yazı↔form arasında yatay link sıfır; markethours.live tüm sitede tek bir yerden linkli (fold'un altında); LinkedIn/GitHub llms.txt'de var sitede yok; intake formu `?type=` bağlamı okumuyor; step 3'teki privacy linki formu sıfırlıyor. (19-sayfalar-arasi-yolculuk.md; chrome-09)
24. **Görsel strateji tersine çevrilmeli.** Stok döngüler yerine markaya ait tek generatif görsel sistem (alev kenarı shader'ı), ürünün kendi hareketi (ekran kayıtları, hover videoları), stüdyo fotoğrafları, kodla çizilen cihaz çerçevesi, `next/og` ile dinamik OG kartları (şu an 8 sayfa aynı AI üretimi OG görselini gönderiyor, vaka sayfaları ham 1920×1200 kapağı, blog Hostinger CDN'ini). (13-gorsel-video-marka.md, 20-site-disi-yuzeyler.md)
25. **Sistem katmanı tasarlanmamış.** `color-scheme` yok (beyaz UA scrollbar, açık temalı select popup, mavi autofill), print stylesheet yok ve reveal sistemi print'te açılmadığı için sayfaların çoğu boş basılıyor, `error.jsx` yok (beyaz "Application error"), bilinmeyen slug'lar 200 dönüyor (soft 404), hover touch'ta gate'lenmemiş (seçilen form kartı gri kalıyor), focus halkası jenerik 2px beyaz kutu, skip link yok, mobil menüde focus trap/Escape/inert yok, intake adım geçişleri ekran okuyucuya duyurulmuyor. (17-, 18- dosyaları)

### 4D. Gerçek hatalar (tasarımdan bağımsız, hemen düzeltilmeli)

26. **Intake formunun son adımı kullanıcı hiçbir şey yazmadan hata mesajlarıyla açılıyor** — adım 2→3 geçişinde React aynı `<button>` düğümünü `type="submit"`e çevirdiği için. (start-project-01)
27. **Backend DB ve SMTP'ye yazamasa bile sayfa "REQUEST RECEIVED" diyor**; lead sessizce kaybolabiliyor. Ayrıca rate limit/honeypot yok, İngilizce kullanıcıya Türkçe otomatik e-posta gidiyor, gönderici "ALAZ System". (start-project-02/06/13)
28. **Hiçbir sayfa statik render edilmiyor** (`setRequestLocale` eksik): her istek middleware + SSR, `Cache-Control: private, no-store`, CDN'de önbellenemiyor; `/videos` ve `/projects` `max-age=0`. (performance-01/05)
29. **Hero'daki tagline ve intro hydration bitene kadar görünmez** (`data-reveal` fold üstünde). (performance-04, motion-missed-1)
30. **Mobil menü açıkken Lenis arka sayfayı kaydırmaya devam ediyor**; `body overflow:hidden` iOS'ta sızıyor; menü landscape/320px'te kaydırılamıyor. (chrome-07, mobile-01)
31. **Markdown renderer italic desteklemiyor**: blog gövdesinde çıplak yıldızlar basılıyor (`*Milliseconds Make Millions*`). (blog-05)
32. **"NEXT PROJECT" satırında kelime ortadan kırılıyor** ("VOCABULAR / Y") mobilde. (case-studies-19, mobile-06)
33. **About'ta bölüm numarası 01'den 04'e atlıyor**; principles/disciplines JSX'te yorumda ama hero eyebrow'u, meta title ("The Engineering Manifesto") ve description hâlâ onları vaat ediyor. (about-03, copy-07)
34. **Lenis anchor offset'i `scroll-padding-top` ile iki kez uygulanıyor**; sayfa içi linkler 78px aşağıya iniyor; services'te üç farklı offset değeri. (gap-keyboard-focus-a11y-missed-2, services-21)

---

## 5. Awwwards tasarım dilinde olmak için ne gerekiyor

Awwwards jürisi dört şeye puan verir: Design (%40), Usability (%30), Creativity (%20), Content (%10). 2026 SOTD'larının ortak paydası (Hubtown / Unseen Studio, Cartier W&W / Immersive Garden, Nine To Five / ET Studio, Studio Dado / Motto) **tek bir fikrin hero'dan footer'a kadar tutarlı bir "dünya" olarak işlenmesi**. ALAZ şu an ne olduğunu değil nasıl görünmek istediğini anlatıyor. Gerekenler sırasıyla:

### 5.1 Tek fikir: konsept yönü

Terminal kostümü tamamen atılır ve "alaz" dekor değil **sistem** olarak kullanılır. Üç alternatif, tam gerekçe ve uygulama detayı [15-awwwards-juri-ve-konsept.md](15-awwwards-juri-ve-konsept.md) ve [11-ai-slop-dedektoru.md](11-ai-slop-dedektoru.md) içinde:

- **Konsept A — "The Working Edge" (önerilen).** İsmin anlamı, ateşin sadece yanmaktan çıkıp iş yapmaya başladığı parlak kenar, sitenin tek görsel ve hareket ilkesi olur. Kapkara zemin sabit; tek aksan olarak ince sıcak bir "kenar" gradyanı (#FFF4E6 → #FFB454 → #FF5A1F) yalnızca kenarlarda: wordmark noktası, cursor, hover çizgisi, `::selection`, focus ring, progress. Hareket dili "tutuşur ve soğur": eleman sıcak kenarla girer (expo.out 600 ms), 400 ms'de beyaza/griye soğur; scroll hızı kenarın parlaklığını sürer; idle'da nokta nefes alır. Stok video yerine tek bir GLSL ısı-kenarı shader'ı (OGL ~10 KB, simplex noise + cursor uniform) hero, preloader, sayfa geçişi ve footer'da yeniden kullanılır; ürünler tam renkli gerçek kayıtlarla. Hero copy'sine "the moment a fire gets hot enough to shape metal" cümlesi.
- **Konsept B — "Product Lab, İzmir".** Sıcak kağıt zemin (#F3EFE8), mürekkep siyahı; aksan projeden gelir (Vocabulary sarısı, Market Hours teal'i, `data-theme` per project); editoryal serif italik + grotesk gövde; sakin fiziksel hareket (sürüklenebilir kartlar, scrub'lanabilir borsa zaman çizelgesi); gerçek cihaz kayıtları ve İzmir'den masa/ekran fotoğrafları; "We ship our own apps. That is how we learned to ship yours." Koyu stüdyo kalabalığında anında ayrışır.
- **Konsept C — "Metal & Heat".** Demirci kökeni: sıcak antrasit (#141210), kemik beyazı metin, kor metal aksanı; ink-trap'li endüstriyel display; ağır ve ataletli hareket (Lenis 1.6, başlıklar "dövülerek" gelir); film grain + WebGL displacement ile malzeme hissi; zanaat dili ("shaped, not generated").

### 5.2 İmza anlar (jürinin hatırlayacağı beş şey)

1. **"Ignite" preloader** — ilk ziyarette tek sefer, ≤1.2 s: nokta gri bir kor olarak belirir, amber→beyaza tutuşur, clip-path ile hero'yu açar. (sessionStorage ile tekrar yok; reduced-motion'da atlanır; LCP'yi engellemez)
2. **Hero "heat edge" shader'ı** — `ALAZ.` harfleri maske; ince ısı kenarı cursor'ı takip eder, idle'da dolaşır, scroll'da aşağı akar. Mobilde touch, reduced-motion'da statik gradyan. Tek draw call, DPR ≤1.5, 60 fps.
3. **Proje index'i: split preview + cursor etiketi** — sol liste, sağ sabit preview paneli; hover'da görsel clip-path smear ile değişir, panel ürünün rengini alır, cursor "VIEW ↗" dairesine dönüşür; touch'ta yatay snap kartlar.
4. **Case study geçişi** — kapak görseli View Transitions ile yerinden büyüyüp hero olur, ürün rengi sayfayı 300 ms'de yıkar, başlık satır-maske ile gelir; içeride gerçek interaktif embed (Vocabulary: sürüklenebilir 5 gerçek kelime kartı + ses; Market Hours: canlı "open now" mini harita).
5. **Footer "cooling" sahnesi** — son viewport'ta zemin derin kor tonuna kayar, wordmark'ın noktası tutuşur, altında canlı İzmir/New York saati, dev `hello@alaz.pro`, tıklanınca kopyalanır.

### 5.3 Hareket grameri

GSAP + ScrollTrigger + Lenis omurgası (`LenisProvider`, `gsap.ticker`), tek easing ailesi (expo.out giriş 600 ms, power2.inOut geçiş 400 ms), SplitType ile satır/karakter maskeli başlık reveal'ları (translateY 110%→0, 60–80 ms stagger), View Transitions ile sayfa geçişleri ve liste→detay başlık morph'u, pinned/stacking bölümler (About principles, Services blokları), büyük görsellerde hafif parallax, manyetik butonlar + minimal custom cursor (yalnız `pointer: fine`), hover'da kısa video önizleme, perde footer. Hepsi `prefers-reduced-motion`'da anında; motion token'ları tek dosyada; CI'da motion-check script'i. Detay: [09-hareket-ve-etkilesim.md](09-hareket-ve-etkilesim.md).

### 5.4 Tipografi ve grid

Archivo Variable (wght + wdth ekseni) ile hiyerarşiyi genişlikle kurmak (display 118–125, title 100, etiketler 75); hover'da `wdth` interpolasyonu sitenin kendine özgü mikro-etkileşimi; 7 stillik token'lanmış tip ölçeği; caps ve mono yalnızca veri için, geri kalan cümle vakası; gövde 15–17px, ölçü 60–70 karakter; gerçek 12 kolon grid + 1600–1680px içerik shell'i (hero hairline'ları gerçek kolonlara taşınır ve scroll'da söner); `hanging-punctuation`, `tabular-nums`, gerçek tipografik tırnaklar, `text-wrap: pretty`. Detay: [08-tipografi-ve-layout.md](08-tipografi-ve-layout.md), [16-genis-ekran-ve-laptop.md](16-genis-ekran-ve-laptop.md).

### 5.5 Görsel ve içerik

- Stok sıfır, AI görsel sıfır. Ürünlerin gerçek telefonlarda fotoğrafları ve 6–8 saniyelik ekran kayıtları (AV1/H.265, ≤800 KB, viewport'a girince); kurucu portresi ve İzmir çalışma masası; kodla çizilen cihaz çerçevesi.
- Marquee yerine gerçek veri şeridi: markethours.live'dan "NYSE OPEN · LSE CLOSES IN 1H 12M · BIST OPEN · İZMİR 14:42".
- Testimonial yerine kanıt: kendi ürünlerin sayıları, canlı link, gerçek Core Web Vitals değerleri footer'da ("measured on a Pixel 7a").
- İsimli insanlar, gerçek byline'lar, dürüst "what we'd change" paragrafları, "Now" satırı (müsaitlik + tarih damgası), colophon.
- `next/og` ile üç şablonlu dinamik OG kartı; tek BRAND sabiti; Person JSON-LD.

### 5.6 Kullanılabilirlik ve craft (Usability %30'u burada kazanılır)

Statik render + edge cache; gerçek video pipeline'ı ve `<HeroVideo>`; `color-scheme: dark` + scrollbar + autofill + print + `error.jsx` içeren `system.css`; markaya ait focus sistemi ("focus = hover + imza işareti"); Radix Dialog tabanlı tam ekran menü (focus trap, Escape, inert, stagger); rota geçişlerinde odak ve duyuru yönetimi; klavye/a11y regresyon kapısı CI'da; mobilde tek-soru-tek-ekran intake, yatay snap rail'ler, portrait art direction, scroll'la logoya dönüşen wordmark.

---

## 6. Yol haritası

**Faz 1 — Quick wins (1–2 hafta).** Slop temizliği ve temel kimlik: sekiz videoyu, PoweredBy'ı, iki marquee'yi, status pill'i, köşe-braketli butonu, yeşil ping'i, lucide ikonlarını, nprogress'i sil; tüm slogan copy'yi yeniden yaz; testimonial'ı kaldır veya kanıt şeridine çevir; aksan token'larını ekle ve noktayı canlandır (CSS); archive hover thumbnail'ını düzelt; tek buton/etiket sistemi; custom cursor; 4D'deki gerçek hatalar; ölü kod ve bağımlılık temizliği (~40 paket, 55 dosya); statik render. Sonuç: aynı iskelet, slop'suz, ~20 MB hafif; tahmini jüri puanı 5.2 → 6.3.

**Faz 2 — Core rebuild (3–5 hafta).** Konsept A'nın sistemleştirilmesi: tip/renk/spacing token'ları ve 12 kolon grid; sayfa başına farklı kompozisyon; GSAP + Lenis hareket grameri, satır-maske reveal'lar, pinned bölümler, View Transitions; tam ekran menü; footer "cooling" sahnesi; case study'lerin proje özelinde yeniden yazımı, ürün rengi teması, facts strip, galeri; start-project formunun konuşma diline çevrilmesi ve backend'in güvenilir hale gelmesi; Work sayfası split-preview index; mobil art direction; system.css ve a11y düzeltmeleri. Sonuç: tutarlı bir dünya, Honorable Mention bandı (6.5–7.2).

**Faz 3 — Signature pieces + submission (3–6 hafta).** WebGL heat-edge hero + ignite preloader + aynı shader'ın geçiş ve footer'da yeniden kullanımı; interaktif ürün embed'leri (Vocabulary swipe demo, Market Hours canlı harita); canlı veri şeridi; gerçek çekimler ve ekran kayıtları; `next/og` OG sistemi; Awwwards teslim kontrol listesi (LCP < 2.0 s, CLS 0, INP < 200 ms, 60 fps shader, klavye erişimi, reduced-motion yolu, Safari/Firefox testi, Developer Award için temiz kaynak). Hedef: 7.5–8.2 bandı (SOTD aday). Değerlendirme ~3 ay sürer; bu sürede "Now building" bölümüyle canlılık gösterin.

---

## 7. Yöntem ve sınırlar

- **Nasıl üretildi.** Site yerel olarak çalıştırıldı (`next dev`), 12 sayfanın masaüstü (1440px) ve mobil (390px) fold + tam sayfa ekran görüntüleri alındı (`araclar/screenshot.cjs`). 15 boyut için 15 inceleyici ajan kodu ve görselleri inceledi; her boyutun bulguları ayrı bir "şüpheci" ajan tarafından kod ve ekran görüntüsüne karşı tek tek doğrulandı (yanlış olanlar elendi, eksik olanlar eklendi). Ardından bir tamamlayıcı ajan kapsanmayan 5 alanı (geniş ekran/laptop, klavye ve odak, tarayıcı/sistem katmanı, sayfalar arası yolculuk, site dışı yüzeyler) belirledi ve aynı süreç onlar için de çalıştırıldı. Toplam 41 ajan, 1.805 araç çağrısı. Ajanlar gerektiğinde kendi ekran görüntülerini, ölçümlerini (computed style, kontrast oranı, ffprobe, production build) ve Playwright probe'larını üretti; bulgulardaki `scratchpad/...png` referansları bu oturumdaki ara görüntülerdir, repoya eklenmedi.
- **Sandbox kaynaklı artefaktlar.** (1) `images.hostinger.com` bu ortamdan erişilemedi; blog kapakları ekran görüntülerinde boş. Bulgular bunu kod üzerinden değerlendirdi, "görsel yüklenmiyor" diye bir bulgu yok. (2) Ekran görüntülerinin sol altındaki siyah "N" rozeti Next.js dev indicator'ıdır, sitenin parçası değildir. (3) Inter bu ortamda indirilemedi; gövde metni metrik-uyumlu fallback ile render edildi. Archivo ve JetBrains Mono gerçek yüzleriyle yüklendi; display/mono tipografi yargıları doğrudan geçerli, gövde ölçüleri birkaç piksel sapabilir.
- **Tekrarlar kasıtlı.** Aynı kök sorun (ör. PoweredBy, stok videolar, terminal sözlüğü) birden fazla boyutta kendi açısından değerlendirildi. Boyut dosyaları o merceğin tam görüşünü verir; konsolide öncelik için bölüm 4.
- **Ofis adresleri bulgusu** (4B-15) adreslerin bilinen serviced-office merkezleri olmasına dayanıyor; gerçek kullanım şekli bizce bilinmiyor. Finding'in özü "inandırıcılık" riskidir, bir suçlama değil.
- **Türkçe sürüm incelenmedi** (istek üzerine). Metin değişiklikleri İngilizce tamamlandıktan sonra TR'ye taşınmalı; `fit()`'in Türkçe karakter desteği ve `.fit:lang(tr)` kuralı korunmalı.
- Ekran görüntülerini yeniden üretmek için: `npm run dev` çalışırken `NODE_PATH=<playwright kurulu dizin> node docs/tasarim-elestirisi/araclar/screenshot.cjs <çıktı-dizini>`.
