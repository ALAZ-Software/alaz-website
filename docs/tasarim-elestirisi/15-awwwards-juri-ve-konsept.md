# Awwwards benchmark ve konsept yönü

**Boyut puanı:** 5.2/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 29 (5 kritik · 14 önemli · 10 ince işçilik) · **Korunacaklar:** 8 · **Eklenecekler:** 12

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Jüri puanları (1-10): Design 5.5 — tutarlı gutter/çizgi sistemi, fit() ile taşmayan dev başlıklar ve sıfır radius disiplini var; ama saf siyah/beyaz/gri, Archivo+Inter+JetBrains Mono ve her sayfada aynı 'dev başlık + gri nokta + mono eyebrow' kompozisyonu, siteyi 2024-26'nın yüzlerce 'dark brutalist' şablonundan ayırt edilemez kılıyor (home-desktop-fold, about-desktop-full, services-desktop-fold, case-studies-desktop-full birbirinin kopyası). Usability 6 — hızlı, responsive, reduced-motion'a saygılı; ama ~20 MB görünmez arka plan videosu, SCOPE metnini kapatan hover preview, sahte '01 / 05' sayaçlar ve 2015 tarzı nprogress çubuğu puan düşürüyor. Creativity 3.5 — sitenin bir fikri yok: 'SYSTEM_ACTIVE / COMMAND SEQUENCE / SECURE TRANSMISSION' terminal kostümü ismin anlamıyla, İzmir'le, ürünlerle veya ekiple hiçbir bağ kurmuyor; tek etkileşim 0.6s fade-up. Content 4.5 — About'taki 'alaz = ateşin çalışan kenarı' metni ve servis detayları (Flutter, typed API, RevenueCat) gerçek ve iyi; geri kalanı 'NO BULLSHIT. JUST ACTION.', 'Built with intent. Engineered to last.', 'POWERED BY GOOGLE / CLAUDE' ve baş harfli testimonial'lar: jürinin 'AI slop' dediği tam olarak bu. Ağırlıklı toplam (40/30/20/10) ≈ 5.2; Honorable Mention eşiği 6.5, SOTD 8+. SOTD'dan ayıran şey teknik değil kavramsal: 2026 SOTD'ları (Hubtown / Unseen Studio, Cartier W&W / Immersive Garden, Nine To Five / ET Studio, Studio Dado / Motto) tek bir fikri hero'dan footer'a kadar tutarlı bir 'dünya' olarak işliyor; ALAZ ise ne olduğunu değil nasıl görünmek istediğini anlatıyor. Önerilen ana yön 'The Working Edge' (Konsept A): ismin anlamını — ateşin sadece yanmaktan çıkıp iş yapmaya başladığı parlak kenar — sitenin tek görsel/hareket ilkesi yapmak: kapkara sayfa, tek renk olarak ince sıcak bir 'kenar' (beyaz→amber→kor gradyanı), her şey 'tutuşur ve soğur' hareket dili, stock video yerine noise tabanlı WebGL ısı kenarı ve tam renkli gerçek ürün görselleri. Alternatifler: Konsept B 'Product Lab, İzmir' (açık, sıcak kağıt zemin; ürün başına bir renk; dürüst 'kendi ürünlerimizi yapan stüdyo' hikâyesi) ve Konsept C 'Metal & Heat' (demirci kökeni; sıcak antrasit, endüstriyel display font, kor metal aksanı, ağır/ataletli hareket). Üçünün ortak noktası: terminal kostümünü tamamen atmak ve 'alaz'ı dekor değil sistem olarak kullanmak.

## Korunması gerekenler

- lib/fit.js + .fit sınıfı: en geniş kelimeye göre başlık ölçeğini sınırlayan sistem gerçekten iyi mühendislik; Türkçe'de de taşmıyor. Konsept değişse de bu altyapı kalmalı.
- Hareket altyapısı hazır ve erişilebilir: Lenis kurulu (SmoothScroll.jsx), reduced-motion ve saveData her yerde saygı görüyor (SmoothScroll.jsx:9, BackgroundVideo.jsx:14, globals.css:92-100), reveal'lar JS'siz de görünür (reveal-ready). Üzerine gerçek koreografi inşa edilebilir.
- About'taki 'origin' bölümü (about/page.jsx:48-62; en.json about.originParagraphs, originDefinition) sitenin en iyi içeriği: somut, dürüst, ALAZ'a özgü. Bu metin yeni konseptin brief'i; silinmemeli, büyütülmeli.
- Gerçek ürün varlıkları güçlü: Vocabulary'nin sarı kapağı ve kedi karakteri (public/projects/vocabulary/cover.png), 7 renkli store ekranı; Market Hours'un HUD haritası (case-market-hours-desktop-fold.png). İkisi de stock değil, ikisi de renk taşıyor — yeni art direction bunların üzerine kurulmalı.
- Servis ve proje metinleri somut: en.json services[].detail (Flutter/React Native, typed APIs, RevenueCat, CI/CD) ve projects[].approach (1-2-4-7-15-30 gün tekrar aralığı, 9 borsa, DST). Sloganlar silinirken bu spesifiklik tüm siteye yayılmalı.
- Arşiv sayfasının tablo iskeleti (case-studies/page.jsx:41-49: NO. / PROJECT / SCOPE / VIEW) doğru bir başlangıç; preview ve hover yeniden yapılınca iyi bir index olur.
- Görsel disiplin: tek gutter değişkeni (--gutter), çizgi tabanlı grid, --radius: 0px, az sayıda gri tonu. Sistemli düşünülmüş; yeni palet ve tipografi bu iskelete oturur.
- Dev tek kelimelik wordmark hero ölçeği ve footer'daki büyük wordmark, 'kor nokta' fikri için hazır bir sahne.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `awwwards-01` — Sitenin bir konsepti yok; 'tech terminal' kostümü isimle ve işle bağlantısız

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** Tüm site; src/app/[locale]/page.jsx:42 (hero.status), :190 (start.badge), :193-204 (START SEQUENCE); messages/en.json home.hero.status 'SYSTEM_ACTIVE', home.start.badge 'COMMAND SEQUENCE READY', intake.sectionTopLeft 'PROJECT INTAKE / SECURE TRANSMISSION'; home-desktop-fold.png, home-desktop-full.png

**Sorun.** Site baştan sona 'uzay gemisi konsolu' rolü oynuyor: SYSTEM_ACTIVE, COMMAND SEQUENCE READY, START SEQUENCE, SECURE TRANSMISSION, 001 / 005 sayaçları, '// ROLE' yorum satırları. Oysa ismin gerçek hikâyesi (about/page.jsx:48-62, en.json about.originParagraphs: ateşin iş yapmaya başladığı parlak kenar) sadece About'ta bir metin paragrafı olarak var; renkte, harekette, görselde, hero'da, footer'da hiçbir karşılığı yok. about-alaz-section.mp4'teki pürmüz alevi bile .5 opacity + gradyan altında görünmez (frames/sheet.png).

**Neden önemli.** Awwwards Creativity kriteri tam olarak 'tek bir fikrin siteyi yönetmesi'ni ölçer. Kavramsız 'hacker/terminal' estetiği 2024-26'da AI-builder çıktılarının imzası oldu; jüri bunu ilk saniyede tanır ve Creativity'yi 3-4'e sabitler. Ayrıca marka açısından: isminiz sıcak ve fiziksel bir şey anlatırken siteniz soğuk ve dijital bir klişe anlatıyor.

**Ne yapılmalı.** About'taki origin metnini tasarım brief'i olarak al: 'alaz' = sadece yanmak değil, iş yapan kenar. Bunu tek ilkeye çevir: siyah zeminde sadece 'kenarlar' sıcak (bkz. awwwards-21 Konsept A). Terminal sözlüğünü tamamen sil (SYSTEM_ACTIVE, COMMAND SEQUENCE, SEQUENCE, TRANSMISSION, SIGNAL, INITIATE, ON FILE). Her bileşen için soru: 'bu, ateşin çalışan kenarı fikrini taşıyor mu, yoksa dekor mu?' Dekorsa kaldır.

#### `awwwards-02` — Hero'da fikir ve etkileşim yok; video görünmüyor, wordmark statik

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:34-57; h1 satır 46 (data-reveal yok); video satır 35 (opacity .62) + satır 38 gradyan + satır 39 4 kolon çizgi; home-desktop-fold.png, hover/home-hero-video-playing.png, frames/sheet.png (dark-planet)

**Sorun.** Hero = sabit ALAZ. + 'NO BULLSHIT. JUST ACTION.' + POWERED BY satırı. h1'de data-reveal bile yok, sayfa açılınca hiçbir şey olmuyor. Arka plandaki 'dünya uzaydan' stock videosu (dark-planet.mp4, 1.1 MB) .62 opacity ve iki gradyan altında pratikte siyah; 2.5 s sonra alınan ekran görüntüsünde de görünmüyor. 1440'ta topline ile kicker arasında ~280px boş alan var (y=150→430). Hiçbir cursor/scroll/idle etkileşimi yok.

**Neden önemli.** SOTD adaylarında hero, sitenin fikrini 3 saniyede kanıtlayan yerdir (Unseen 'Hubtown', Lusion, Active Theory). Burada jüri 'büyük yazı + siyah' görüp Design'ı şablon, Creativity'yi boş olarak puanlar. Görünmeyen 1.1 MB video sadece LCP'ye zarar verir, puana katkısı sıfır.

**Ne yapılmalı.** Videoyu sil. Hero'yu 'ısı kenarı' sahnesine çevir: ALAZ. harfleri maske, cursor'ın geçtiği yerde ince beyaz→amber bir kenar tutuşup soğuyor (OGL/three.js, simplex noise GLSL; mobilde touch/gyro, reduced-motion'da statik gradyan). Wordmark'a tek seferlik giriş: harfler yoktan değil, 'kor'dan beyaza soğuyarak gelsin (GSAP timeline, 900 ms, expo.out). Slogan satırını gerçek bir cümleyle değiştir (bkz. awwwards-03). Boş alanı ya sahneye ver ya da pt-[30vh]'i (satır 44) ~16vh'e indir.

#### `awwwards-03` — Copy LLM-slogan dilinde: 'NO BULLSHIT. JUST ACTION.' ve 'built with intent / engineered to last' kalıpları

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json home.hero.taglineTop/Bottom, home.hero.intro ('Built with intent. Engineered to last.'), home.hero.bottomNote ('PRECISION IS THE STANDARD. NOT THE GOAL.'), home.start.bottomNote ('DESIGNED WITH INTENT / BUILT TO ENDURE'), home.signal.b ('ENGINEERING WITHOUT COMPROMISE'), home.ticker ('UNCOMPROMISING PRECISION', 'TRUSTED PARTNERSHIP'), home.start.paragraph ('The next great system starts with a conversation'), about.heading 'WE ENGINEER PERMANENCE', about.kicker 'NOT AN AGENCY. AN ENGINEERING PRACTICE.', caseStudy.*Heading; home-desktop-fold.png

**Sorun.** Sitenin gördüğün her slogan 2025 AI-site corpus'unun en sık tekrarlanan cümleleri: 'No bullshit', 'built with intent', 'engineered to last', 'precision', 'uncompromising', 'permanence'. Hiçbiri ALAZ'a özgü bir bilgi taşımıyor; şirket adını değiştirsen cümleler aynen durur. Buna karşılık en.json services[].detail ve projects[] metinleri somut (Flutter/React Native, 1-2-4-7-15-30 gün tekrar aralığı, 9 borsa, RevenueCat).

**Neden önemli.** Content kriterinde jüri kopyayı 'özgün mü, şablon mu' diye okur. Ayrıca 'NO BULLSHIT' küfürlü bir ton seçimi: kurumsal müşteriye (E-COMMERCE DIRECTOR testimonial'ı) satış yaparken riskli ve kendini kanıtlamamış bir stüdyoda 'büyük laf' olarak okunur.

**Ne yapılmalı.** Tüm sloganları sil ve yerine sadece ALAZ'ın söyleyebileceği cümleler yaz. Örnek hero: 'ALAZ is the moment a fire gets hot enough to shape metal. We build web and mobile products that reach that point — from İzmir, for anyone.' Alt satır: 'Two products of our own in the stores. Yours next.' Her bölümde slogan yerine ölçülebilir bir şey: '24 languages, 17 games, one Flutter codebase', 'nine exchanges, DST handled, zero missed opens'. Kural: cümleyi başka bir stüdyonun sitesine koyabiliyorsan silinir.

> **Doğrulayıcı notu:** Alıntılanan tüm stringler en.json'da birebir var (home.hero.taglineTop/Bottom, intro 'Built with intent. Engineered to last.', bottomNote, start.bottomNote, signal.b, ticker[], start.paragraph, about.heading/kicker, caseStudy.*Heading). Düzeltme: önerilen yeni hero alt satırı 'Two products of our own in the stores. Yours next.' şu an YANLIŞ olur — src/lib/stores.js'de iki projenin de appStore/googlePlay alanı boş, case-vocabulary-desktop-full.png'de butonlar 'COMING SOON ON APP STORE / GOOGLE PLAY' yazıyor, Market Hours summary'si 'coming soon as a mobile app' diyor. Doğru cümle: 'One product live at markethours.live, one app on its way to the stores — both ours.' Kural (cümle başka stüdyonun sitesine konabiliyorsa silinir) ve ölçülebilir satırlar (24 dil / 17 oyun / 9 borsa / DST) aynen geçerli.

#### `awwwards-04` — 'POWERED BY GOOGLE / POWERED BY CLAUDE' rozetleri hero'da ve About'ta

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/PoweredBy.jsx:1-20; src/app/[locale]/page.jsx:51; src/app/[locale]/about/page.jsx:45; home-desktop-fold.png (y≈855), about-desktop-full.png

**Sorun.** Bir mühendislik stüdyosunun hero'sunun en değerli satırında iki büyük vendor logosu var. Google'ın ürünü ne? (Firebase?) Claude'un ürünü ne? Jüri ve müşteri bunu 'site AI ile üretildi, stüdyo araç listesinden ibaret' diye okur. Üstelik 'powered by' mono etiketle birlikte en tipik AI-slop sinyallerinden biri.

**Neden önemli.** Marka: kendi imzasının yerine başkasının logosunu koymak. Slop sinyali: 'powered by Claude/GPT' satırı, AI-builder şablonlarının default footer'ıdır. Hero alanı israfı.

**Ne yapılmalı.** PoweredBy bileşenini ve iki kullanımını tamamen kaldır. Araç zinciri gerçekten hikâyenin parçasıysa (ör. 'AI-assisted, human-shipped' diye bir iddianız varsa) About'ta tek cümlelik, logo içermeyen bir 'How we work' notu olarak yaz. Simple Icons path'lerini de repodan sil.

#### `awwwards-05` — Sekiz adet generic stock/AI b-roll videosu (~20 MB), hiçbiri ALAZ'a ait, hiçbiri görünmüyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/videos/*.mp4 (dark-planet, about-section gyro, about-alaz-section pürmüz, about-end-section dişliler, services-section fiber optik, start-a-project-hero server koridoru, the-work-section devre kartı, start-project-rocket roket); kullanım: page.jsx:35,185; about/page.jsx:36,49,78; services/page.jsx:61-72,250; case-studies/page.jsx:29-31; frames/sheet.png

**Sorun.** Kareler çıkarıldığında (frames/sheet.png) videoların tamamı 'teknoloji' konseptini resmeden en klişe görseller: uzaydan dünya, jiroskop, dişli, fiber optik, server koridoru, devre kartı, roket. Hiçbiri ALAZ'ın yaptığı işi, ekibi, İzmir'i, ürünleri göstermiyor. Dahası .5-.62 opacity + 2 gradyan altında ekranda neredeyse siyah okunuyorlar (about-desktop-full.png, services-desktop-fold.png). Yani 20 MB transfer, sıfır görsel getiri.

**Neden önemli.** Awwwards jürisi stock/AI b-roll'u 'gerçek içerik yok' olarak puanlar (Content ve Design). Performans: Usability'ye doğrudan vurur. Tek anlamlı video (about-alaz pürmüz alevi) bile görünmediği için kavramsal fırsat harcanmış.

**Ne yapılmalı.** Sekiz videoyu da sil. Yerine tek bir 'sahip olunan' görsel sistem: (1) hero ve footer için noise tabanlı WebGL ısı-kenarı (kod, 0 MB); (2) ürün sayfalarında tam renkli gerçek ekran kayıtları (Vocabulary swipe akışı, Market Hours canlı harita) — 6-8 s, 720p, h264+webm, ≤1.5 MB; (3) About için gerçek bir şey: İzmir'deki masa, ekranlar, ekip — fotoğraf çekimi yapılamıyorsa tipografiyle bırak, stock koyma. Pürmüz/alev fikri kalsın ama stock değil, shader olarak.

### ÖNEMLİ

#### `awwwards-06` — Terminal-cosplay UI parçaları: status pill, sahte sayaçlar, '//' yorumlar, köşe-braketli pulsing buton

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:42 (kare nokta + SYSTEM_ACTIVE), :45 ('— 001 / 005'), :54 ('01 / 05'), :86 ('// ROLE'), :100 ('01 — 03'), :101 ('// CATEGORY'), :156-157 ('ALAZ / SPECIMEN', '// ASSET IN PROGRESS'), :190 (COMMAND SEQUENCE READY pill), :193-204 (köşe braketleri + animate-ping emerald nokta), :206 ('05 / 05'); eyebrow sayaçları en.json 425-620 ve servicesPage/blogIndex/archive/intake; hover/home-start-button-hover.png, hover/home-contact-section.png

**Sorun.** Her bölümün başında 'NN / LABEL' mono eyebrow, her sayfanın altında 'NN / NN' sayaç var (home 5 bölüm, about 4, case study 3, services 4). Sayaçlar sahte: home'da '001 / 005' sonra '01 / 05' sonra '05 / 05' (format bile tutarsız). START SEQUENCE butonunda dört köşe braketi + yanıp sönen yeşil nokta + mono uppercase: bu buton internet'teki her AI-generated 'cyber' landing'de birebir var. '// PROJECT MANAGER' yorum sözdizimi testimonial'ı kod gibi gösteriyor.

**Neden önemli.** Bu desenlerin her biri tek başına masum, birlikte 'AI-builder dark template' parmak izi. Jüri Design'da 'kendi dili yok' der; kullanıcı '001 / 005' sayısının ne olduğunu anlamaz (usability gürültüsü). Üç farklı buton stili (beyaz dolu, çerçeveli, braketli) sistem eksikliğini gösterir.

**Ne yapılmalı.** Tek etiket sistemi: bölüm başında sadece küçük, anlamlı bir başlık (ör. 'Work', 'Services', 'The name'), sayaç yok. Sayaç sadece gerçek sayılabilir listelerde (proje index'i 01/02). '//' önekini kaldır. Buton: tek primary (beyaz dolu, sıcak kenar hover'ı) + tek secondary (altı çizgili metin), braket/nokta/ping yok. Status pill'i sil; 'currently available for Q1' gibi gerçek bir bilgi varsa düz metin yaz.

> **Doğrulayıcı notu:** Tüm satırlar doğrulandı (:42, :45, :54, :86, :100-101, :156-157, :190, :193-204, :206). Güçlendirme: sayaçlar sadece format olarak değil mantık olarak da bozuk — hero '001 / 005' ve '01 / 05' derken bir sonraki bölümün eyebrow'u yine '01 / EXTERNAL SIGNAL' (ikinci 01), sonra 02/03/'04 / INITIATE' ve aynı 04 bölümü '05 / 05' ile kapanıyor (en.json home.*.eyebrowLeft + page.jsx:206). Buton stili sayısı üç değil dört: beyaz dolu (Header.jsx:35, about/page.jsx:80), çerçeveli (page.jsx:138), braketli+ping (:193), altı çizili (:97). Fix (tek etiket sistemi, sayaç yok, 2 buton, pill/ping/'//' sil) doğru.

#### `awwwards-07` — İki ayrı buzzword marquee'si (aria-hidden, sıfır bilgi)

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:59-74 (signal marquee: 'ALAZ / SYSTEMS THINKING', 'ENGINEERING WITHOUT COMPROMISE') ve :107-126 (ticker: 'TRUSTED PARTNERSHIP', 'CLIENT SUCCESS', 'ARCHITECTURAL INTEGRITY', 'UNCOMPROMISING PRECISION'); tailwind.config.js:106-118; home-desktop-full.png (y≈985 ve y≈2620)

**Sorun.** Aynı sayfada iki marquee, ikisi de sadece soyut sıfatlar taşıyor ve aria-hidden (yani kendi kodunuz bile içerik olmadığını söylüyor). 'CLIENT SUCCESS' ve 'TRUSTED PARTNERSHIP' iki projelik bir stüdyo için içi boş; 'UNCOMPROMISING PRECISION' slop kelimesi.

**Neden önemli.** Marquee-of-buzzwords, Awwwards'ta 'template filler' olarak tanınan en bilinen desenlerden biri; iki tane olması dikkat dağıtma niyetini belli eder. Design'da ritmi bozar, Content'te sıfır.

**Ne yapılmalı.** İkisini de kaldır. Bir şerit isteniyorsa gerçek ve canlı veri taşısın — Market Hours ürününüz tam bunu yapıyor: 'İZMİR 14:42 · NYSE OPEN · LSE CLOSES IN 1H 12M · BIST OPEN' (markethours.live API'sinden fetch, JetBrains Mono'nun tek meşru kullanımı). Böylece şerit hem ürünü kanıtlar hem hikâyeye bağlanır.

#### `awwwards-08` — 'VALIDATION' testimonial bölümü doğrulanamaz: baş harfli isimler, şirket yok, lucide kalkan ikonu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:76-90 (ShieldCheck satır 78); messages/en.json testimonials[] ('MERVE T. / PROJECT MANAGER', 'BURAK Y. / PRODUCT OWNER', 'SELIN A. / E-COMMERCE DIRECTOR'); home-desktop-full.png (y≈1050-1750)

**Sorun.** İki proje var (ikisi de stüdyonun kendi ürünü gibi görünüyor), ama üç kurumsal müşteri testimonial'ı var; isimler baş harfli, şirket yok, link yok, fotoğraf yok. Alıntılar birbirinin tonunda ('discipline', 'reliable foundation', 'clear path forward'). Üstüne ShieldCheck ikonu 'güven' sembolü olarak konmuş. Başlık 'VALIDATION', eyebrow 'EXTERNAL SIGNAL'.

**Neden önemli.** Jüri ve müşteri bunu 'uydurma' diye okur; AI-slop sinyallerinin en güçlülerinden biri sahte sosyal kanıt. Marka güvenini artırmak yerine düşürür.

**Ne yapılmalı.** Ya gerçek müşteri: tam isim + şirket + rol + linkli logo + mümkünse 1 cümlelik somut sonuç (sayı). Ya da bölümü tamamen kaldır ve yerine doğrulanabilir kanıt koy: App Store / Google Play puanı ve indirme sayısı kartı (gerçek API/manuel), markethours.live'ın canlı kullanıcı/borsa verisi, açık kaynak repo. 'Honest proof' SOTD jürisinde sahte testimonial'dan çok daha iyi puan alır.

> **Doğrulayıcı notu:** Bölüm ve içerik doğrulandı: page.jsx:76-90, ShieldCheck :78 (46 px), en.json testimonials[] baş harfli isim + şirketsiz rol, aynı tonda üç alıntı; başlık 'VALIDATION', eyebrow '01 / EXTERNAL SIGNAL'. Düzeltme fix'te: 'App Store / Google Play puanı ve indirme sayısı kartı' bugün mümkün değil — stores.js'de linkler boş, butonlar 'COMING SOON'. Bugün doğrulanabilir kanıt: markethours.live canlı (link + canlı veri), Vocabulary için dürüst durum ('launching on iOS/Android — in review'), blog yazıları. Testimonial'ı şimdilik tamamen kaldır; tam isim + şirket + link + sayı olmadan geri koyma.

#### `awwwards-09` — Hareket dili tek bir generic fade-up; sayfa geçişi, preloader, scroll koreografisi yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:71-90 (0.6s, translateY 14px, tek easing); src/components/ScrollReveal.jsx; src/components/SmoothScroll.jsx (Lenis kurulu ama scroll progress hiçbir yerde kullanılmıyor); src/components/Reveal.jsx (framer-motion import edilmiş, hiçbir sayfada kullanılmıyor); src/app/[locale]/layout.jsx:60-71 (NextTopLoader beyaz glow'lu nprogress çubuğu)

**Sorun.** Her element aynı 14px fade-up ile geliyor (başlık, paragraf, kart, çizgi). Lenis sadece wheel smoothing yapıyor; parallax, pin, scrub, split-line reveal yok. Rota değişiminde tek 'animasyon' üstte parlayan 3px beyaz progress bar (2014 nprogress deseni). Preloader yok, hover'lar 0.2s renk değişimi. framer-motion dependencies'te ama kullanılmıyor.

**Neden önemli.** Awwwards'ta Design puanının önemli bir kısmı 'motion craft': easing seçimi, koreografi, geçişler. Tek easing'li fade-up 'AOS kurulmuş' izlenimi verir. Lenis'in sitede olması jüriye 'kurup bırakmışlar' der.

**Ne yapılmalı.** Bir hareket grameri tanımla: (1) iki easing (expo.out giriş, power2.inOut geçiş), (2) tek imza geçiş 'ignite → cool' (element sıcak kenarla gelir, 400 ms'de beyaza soğur), (3) başlıklar SplitType + GSAP ile satır-maske reveal (stagger 60 ms), (4) scroll-linked: Lenis `scroll` event'ini GSAP ScrollTrigger'a bağla (lenis.on('scroll', ScrollTrigger.update)), 'Four moves' bölümü pinlensin ve her adım aktifken 'tutuşsun', (5) rota geçişi: Next 15 View Transitions (unstable_ViewTransition) veya framer-motion AnimatePresence + layoutId ile kapak→hero paylaşımlı eleman; nprogress'i kaldır. Reduced-motion'da hepsi anında.

#### `awwwards-10` — Proje hover preview'ları zayıf; archive'daki yüzen thumbnail metni kapatıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:145-166 (scale 1.03 + brightness); src/app/[locale]/case-studies/page.jsx:47 (220x130 px, -4deg, right-[10%]); hover/archive-row-hover.png (SCOPE sütunu 'LAN…OID' kırpılmış), hover/home-project-card-hover.png

**Sorun.** Home'da hover = %3 zoom + parlaklık + köşe oku beyazlıyor; herhangi bir Tailwind template'inin default'u. Archive'da küçük döndürülmüş thumbnail satırın SCOPE metninin üstüne biniyor ve 'LANGUAGE LEARNING / IOS & ANDROID' okunmaz oluyor. Sayfanın %80'i boş siyah; iki projeyi 'büyük göstermek' için muazzam alan varken thumbnail 220px.

**Neden önemli.** Proje index'i stüdyo sitesinin kalbidir; SOTD'larda (Locomotive, Exo Ape, Studio Freight) hover anı siteyi hatırlatan şeydir. Metni kapatan hover ayrıca usability hatası.

**Ne yapılmalı.** Archive: split layout — sol liste, sağda viewport'un %45'ini kaplayan sabit preview alanı; hover'da görsel clip-path/smear crossfade ile değişir (GSAP, 500 ms), cursor 'VIEW' etiketine dönüşür; mobilde yatay snap kart. Alternatif: cursor-following image trail (her 80px'de bir kopya, 6 adet). Home: kart yerine tam genişlik satır + hover'da ürünün kendi rengi (Vocabulary sarısı, Market Hours teal) arka planı yıkar. Thumbnail yerine kısa ekran kaydı (muted, hover'da play).

#### `awwwards-11` — Case study şablon: her projede aynı üç slogan başlık, ürün rengi gradyanla boğulmuş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:84-85 (.78 siyah gradyan), :109-131 (Challenge/Approach/Outcome), :139-146 (4 sütun store screenshot grid); messages/en.json caseStudy.challengeHeading 'BUILD FOR WHAT'S NEXT.', approachHeading 'PRECISION AT EVERY LAYER.', outcomeHeading 'LESS NOISE. MORE SIGNAL.'; case-vocabulary-desktop-full.png, case-market-hours-desktop-fold.png

**Sorun.** Vocabulary ve Market Hours sayfalarında başlıklar birebir aynı ('BUILD FOR WHAT'S NEXT' vs. 'PRECISION AT EVERY LAYER'): proje özelinde hiçbir şey söylemiyor. Vocabulary'nin bütün karakteri olan sarı kapak hero'da %78 siyah gradyanla yarı yarıya boğulmuş; geri kalan sayfa yine siyah. Galeri = store screenshot'larının 4 sütunlu düz grid'i. Hiçbir interaktif parça yok.

**Neden önemli.** Jüri case study'yi 'stüdyo ne kadar derin anlatabiliyor' diye okur. Ürünün rengini ve etkileşimini kullanmayan case study, ürünü yapan stüdyonun kendi işinden utanıyor gibi görünür. Aynı başlıklar = CMS şablonu izlenimi.

**Ne yapılmalı.** Her projeye kendi hikâyesi: başlıklar projeden (Vocabulary: 'Words that come back on day 1, 2, 4, 7, 15 and 30' / Market Hours: 'Nine exchanges, one clock that never forgets DST'). Hero'da gradyanı .78→.25'e indir, sayfanın zeminini ürünün rengine bırak (data-theme per project: --accent sarı / teal). İnteraktif embed: Vocabulary için gerçek draggable swipe-card demosu (framer-motion drag, 5 gerçek kelime + ses), Market Hours için markethours.live'dan canlı mini harita/zaman çizelgesi. Galeri: yatay scroll-scrub 'film şeridi' (GSAP ScrollTrigger pin + horizontal). Next project linkinde paylaşımlı eleman geçişi.

#### `awwwards-12` — Renk sistemi sadece siyah/beyaz/gri; 'alev' isimli markada aksan rengi yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:30-35 (--ink, --surface, --line, --gray, --dim, --white); tailwind.config.js:29-39 (panel/well/faint/soft/silver hepsi gri); tek renkli istisna: page.jsx:199-200 emerald ping noktası

**Sorun.** Palet: #0a0a0a, #111, #141414, #777, #aaa, #fff. Tek 'renk' yanlış yerde: START SEQUENCE butonundaki yeşil nokta. Bu, 2024-26 dark studio template'inin birebir paleti; sitenin kendi ismi size bedava bir renk hikâyesi (ateşin beyaz-sarı-turuncu kenarı) veriyor ve kullanılmıyor.

**Neden önemli.** Design: renk olmadan 'ayırt edicilik' tamamen tipografiye kalıyor, tipografi de jenerik. Marka: Vocabulary sarısı ve Market Hours teal'i gerçek ürün renkleri; siteyle çelişiyor.

**Ne yapılmalı.** Tek aksan: 'alaz' gradyanı — --alaz-white #FFF4E6 → --alaz-amber #FFB454 → --alaz-ember #FF5A1F (tüm tonlar kontrast için test edilmiş). Kullanım kuralı: yüzey olarak asla, sadece 'kenar' olarak: wordmark'ın noktası, cursor halkası, ::selection, hover alt çizgisi, scroll progress, aktif nav, form focus ring, preloader. Yeşil ping'i sil. Ürün sayfalarında ürünün rengi aksanı geçici olarak devralır.

#### `awwwards-13` — Markanın tek işareti (gri kare nokta) ölü; en ucuz imza fırsatı kullanılmıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:46 (text-[#858585]), src/components/Header.jsx:29 (text-[#777]), src/components/Footer.jsx:16; tüm h1/h2'lerde <span className="text-[#5f5f5f]">.</span>; home-desktop-fold.png (ALAZ'ın sağındaki gri kare)

**Sorun.** 'ALAZ.' noktası sitenin tek logo-benzeri unsuru ve her yerde statik gri bir kare. Her başlığın sonuna da aynı gri nokta konmuş (VALIDATION., CORE CAPABILITIES., THE WORK.), yani imza bile olmaktan çıkıp noktalama olmuş.

**Neden önemli.** SOTD siteleri bir 'canlı' işaret taşır (Dogstudio'nun cursor'ı, Basement'ın yıldızı). Bu nokta hem marka hem konsept için hazır: 'alaz' = parlak kenar; nokta = ateşin ucu.

**Ne yapılmalı.** Noktayı 'kor' yap: aksan gradyanlı, idle'da 4 s periyotla nefes alan (opacity .7→1, blur 0→2px), hover/scroll hızıyla parlayan tek element. Aynı nokta: preloader (büyüyüp sayfayı açar), custom cursor (mix-blend-mode: difference), footer'da dev wordmark'ta tutuşan parça, 404'te sönmüş kor. Başlık sonlarındaki gri noktaları kaldır; nokta sadece wordmark'ta yaşasın.

> **Doğrulayıcı notu:** Konumlar doğru (page.jsx:46 #858585, Header.jsx:29 #777, Footer.jsx:16 #858585, h2'lerde #5f5f5f). Güçlendirme: 'imza' tek bir gri bile değil — grep ile başlık sonu noktası BEŞ farklı değerde: #858585 (hero/footer, 2), #777 (header, start, about process, services, 4), #5f5f5f (home h2'leri, 3), #6e6e6e (about, archive, intake, 11), #8a8a8a (case study, 1). Token'ı yok. Fix'e ekle: önce tek --mark token'ı tanımla, sonra 'kor nokta' davranışını (nefes, cursor, preloader) bu token üstüne kur; başlık sonu noktalarını kaldır.

#### `awwwards-14` — Tipografi jenerik ve her sayfa aynı kompozisyon (fit() her başlığı tam genişliğe yayıyor)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/layout.jsx:15-17 (Archivo 600/700/900 + Inter + JetBrains Mono); src/lib/fit.js; her sayfada .fit [--fit-size:clamp(…)] ile h1; about-desktop-full.png, services-desktop-fold.png, case-studies-desktop-full.png, start-project-desktop-fold.png

**Sorun.** Archivo Black + Inter + JetBrains Mono üçlüsü 2025'in en çok kullanılan 'brutalist' seti. fit() her başlığı viewport genişliğine ölçeklediği için WE ENGINEER PERMANENCE., SOFTWARE ENGINEERING., THE WORK., START A PROJECT. sayfaları yan yana koyunca aynı poster: sol üst eyebrow, dev 2 satır başlık, gri nokta, altında intro. Hiçbir sayfanın kendi kompozisyonu yok. Italic, outline, farklı hizalama, farklı ölçek yok.

**Neden önemli.** Design kriterinde 'tipografik ustalık' = sistem içinde varyasyon. Tek kalıp tekrarı jüriye 'tek şablon, 8 sayfa' der.

**Ne yapılmalı.** Display fontu karakterli bir aileyle değiştir ve değişken eksenleri harekete bağla: ör. 'Instrument Sans'ın wdth ekseni, 'Archivo' kalacaksa variable sürümü (wdth 62-125) — başlık scroll'da genişten dara 'soğuyor'. Alternatifler: ABC Diatype / Söhne Breit (lisans), PP Neue Montreal, veya kontrast için PP Editorial New italic + grotesk. Sayfa başına kompozisyon kuralı: Home sol-alt dev, About ortalı editoryal + italic, Work tablo, Services sağa yaslı, Case study ürün rengi + büyük görsel. fit() kalsın ama 'her başlık tam genişlik' default'u kalksın (--fit-size'ı sayfaya göre 60-100vw arasında ayarla).

> **Doğrulayıcı notu:** layout.jsx:15-17: Archivo (weight 600/700/900 — 'Archivo Black' ayrı bir aile, buradaki Archivo 900) + Inter + JetBrains Mono. Kompozisyon tekrarı screenshot'larla kesin: home/about/services/archive/start-project/case-study hepsi eyebrow çizgisi → mono kicker → fit() ile tam genişlik 2 satır display + gri kare → intro paragraf (about-desktop-full, services-desktop-fold, case-studies-desktop-full, start-project-desktop-fold). Severity minor → major: Awwwards Design puanında 'her sayfa aynı poster' en güçlü şablon sinyali. Archivo variable'ın wdth 62-125 ekseni doğru; sayfa başına kompozisyon kuralı ve --fit-size'ı 60-100vw arasında değiştirme önerisi uygulanabilir.

#### `awwwards-21` — Konsept A (önerilen): 'The Working Edge' — ateşin çalışan kenarı, sitenin tek ilkesi

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** Site geneli; brief kaynağı: messages/en.json about.originParagraphs ve about.originDefinition; uygulama noktaları: globals.css tokens, page.jsx hero, Footer.jsx, Header.jsx, case-studies/[slug]/page.jsx

**Sorun.** Şu an isim ile görsel dil arasında sıfır bağ var; 'alaz' sadece bir paragrafta açıklanıyor.

**Neden önemli.** Awwwards Creativity + Design: tek fikrin her bileşene tutarlı işlenmesi SOTD'ların ortak paydası (Hubtown/Unseen, Cartier W&W/Immersive Garden 2026). Bu fikir ALAZ'a özgü, kopyalanamaz ve teknik olarak bir web+mobil stüdyonun kendini kanıtlayabileceği bir craft alanı (shader, hareket).

**Ne yapılmalı.** Tipografi: tek geniş grotesk, variable (wdth/wght) eksen scroll'a bağlı — harfler 'ısınırken' genişler, 'soğurken' daralır. Renk: zemin #0a0a0a sabit; tek aksan 'alaz' gradyanı (#FFF4E6→#FFB454→#FF5A1F) yalnızca kenarlarda (nokta, cursor, çizgiler, selection, focus). Hareket dili: her şey 'tutuşur ve soğur' — eleman sıcak kenarla girer (expo.out, 600 ms), 400 ms'de beyaza/griye soğur; scroll hızı kenarın parlaklığını sürer; idle'da nokta nefes alır. Görsel: stock yok; hero/footer/preloader/transition için tek GLSL ısı-kenarı shader'ı (simplex noise + cursor uniform, OGL ~10 KB), ürünler tam renkli gerçek kayıtlarla. Copy: 'the moment a fire gets hot enough to shape metal' cümlesi hero'ya; her bölüm 'iş yapan' somut sayı. Mevcut terminal temasıyla kontrast: soğuk/dijital/yeşil-nokta yerine sıcak/fiziksel/tek-kenar; gürültü (sayaç, marquee, pill) yerine sessiz siyah ve tek ışık.

#### `awwwards-22` — Konsept B (alternatif): 'Product Lab, İzmir' — açık zemin, ürün başına renk, dürüst stüdyo

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** Site geneli; özellikle case-studies/page.jsx, case-studies/[slug]/page.jsx, en.json projects[] ve services[].detail

**Sorun.** Karanlık tema ürünlerin (sarı Vocabulary, teal Market Hours) karakterini bastırıyor; stüdyonun en güçlü kanıtı olan 'kendi ürünlerimiz store'da' hikâyesi müşteri işi gibi paketlenmiş.

**Neden önemli.** Awwwards'ta dark studio kalabalığında açık, sıcak, editoryal bir Türk stüdyosu anında ayrışır; Content puanı dürüstlükten gelir (Significa, Studio Freight'in ürün-odaklı sayfaları).

**Ne yapılmalı.** Zemin: sıcak kağıt #F3EFE8, mürekkep #111; aksan projeden gelir (data-theme per project: Vocabulary #F5D800, Market Hours #19C3B1), site geneli aksan yine ince 'alaz' turuncusu. Tipografi: editoryal kontrast — serif display italic (ör. PP Editorial New / Instrument Serif) + grotesk gövde; başlıklar sol hizalı, sayfa başına farklı ölçek. Hareket: sakin ve fiziksel — draggable swipe kartları, scrub'lanabilir borsa zaman çizelgesi, sayfa geçişinde ürün rengi 'yıkar'. Görsel: büyük, renkli, gerçek cihaz kayıtları; İzmir'den gerçek masa/ekran fotoğrafları. Copy: 'We ship our own apps. That is how we learned to ship yours.' Kontrast: gece/terminal yerine gündüz/atölye.

> **Doğrulayıcı notu:** Konsept (sıcak kağıt zemin, ürün başına data-theme aksanı, editoryal serif italic + grotesk, draggable/scrub etkileşimleri, gerçek cihaz kayıtları) somut ve ürün renkleriyle (Vocabulary sarısı, Market Hours teal) uyumlu. Düzeltme: dayanak cümlesi 'We ship our own apps' / 'kendi ürünlerimiz store'da' bugün doğru değil — yalnızca markethours.live canlı, iki app de 'coming soon' (stores.js, case-vocabulary screenshot). 'We ship our own products. That is how we learned to ship yours.' olarak yaz ve store linkleri gelene kadar app iddiası kurma. Ayrıca açık tema her bölümün gradyan/video overlay mantığını baştan yazdırır: A'dan daha büyük rebuild, buna göre bütçele.

#### `awwwards-23` — Konsept C (alternatif): 'Metal & Heat' — demirci kökeni, sıcak antrasit, kor metal aksanı

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** Site geneli; brief kaynağı en.json about.originParagraphs ('Blacksmiths and shepherds used it…')

**Sorun.** Origin metni demircilerden bahsediyor ama site cam/metalik 'uzay' estetiğinde; dokunsal hiçbir şey yok.

**Neden önemli.** Taktil, ağır, 'yapılmış' hissi veren siteler (Basement Studio, Antinomy, Igloo) jüride 'craft' algısını güçlendirir; isimle birebir örtüşür.

**Ne yapılmalı.** Renk: saf siyah yerine sıcak antrasit #141210, metin kemik beyazı #EDE6DA, aksan kor metal gradyanı (#FF7A1A → #FFD08A, blur'lu glow). Tipografi: ink-trap'li endüstriyel display (ör. Reckless, Mori, Right Grotesk Compact) + mono yerine küçük serif etiketler. Hareket: ağır ve ataletli — Lenis duration 1.6, easing custom; başlıklar 'dövülerek' gelir (scaleY 1.15→1, 700 ms), hover'da kenarlar kızarır, soğurken grain artar. Görsel: makro metal/ısı fotoğrafı veya ışıklı 3D (threejs, metalness 1, emissive edge). Copy: zanaat dili ('shaped, not generated'). Kontrast: parlak/dijital yerine mat/dokulu; ses yok, ama film grain overlay (opacity .06) ve WebGL displacement ile 'malzeme' hissi.

> **Doğrulayıcı notu:** Dayanak doğru (originParagraphs[0] 'Blacksmiths and shepherds used it…'); antrasit zemin, kemik beyazı, kor-metal glow, ataletli Lenis (duration 1.6), 'dövülerek' gelen başlık, grain overlay önerileri somut. Düzeltme font örneklerinde: Reckless (Displaay) bir serif, 'ink-trap'li endüstriyel display' değil; o kategori için doğru örnekler ABC Whyte Inktrap, PP Right Grotesk Compact, Druk, Monument Extended; PP Mori grotesk olarak kalabilir. Makro metal/ısı fotoğrafı 'stock koyma' kuralıyla çelişmemeli: ya kendi çekiminiz ya da three.js emissive-edge 3D.

#### `awwwards-missed-1` — Bölüm sayaçları yalnızca sahte değil, görünür biçimde yanlış (home iki kez '01', about 01'den 04'e atlıyor)

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:45 ('001 / 005'), :54 ('01 / 05'), :206 ('05 / 05'); messages/en.json home.validation.eyebrowLeft '01 / EXTERNAL SIGNAL', capabilities '02', selected '03', start.eyebrowLeft '04 / INITIATE'; src/app/[locale]/about/page.jsx:52 (originEyebrowLeft '01 / THE NAME') → :73 (processEyebrowLeft '04 / HOW WE OPERATE'), :63-71 arasındaki 02 ve 03 bölümleri yorum satırında; about-desktop-full.png, home-desktop-full.png

**Sorun.** Home'da hero kendini '01 / 05' sayarken hemen altındaki Validation bölümü de '01'; sayfa '04 / INITIATE' bölümünün dibinde '05 / 05' ile bitiyor. About'ta eyebrow '01 / THE NAME'den doğrudan '04 / HOW WE OPERATE'e atlıyor çünkü 02 (manifesto) ve 03 (disciplines) kodda yorum satırına alınmış ama sayılar elle yazılı kalmış.

**Neden önemli.** Jüri ve dikkatli ziyaretçi için bu, 'sayaçlar bir şablondan kopyalandı, kimse okumadı' kanıtıdır; AI-builder sitelerinin en tanınan izlerinden biri olan dekoratif index'in üstüne bir de tutarsızlık biniyor. Usability'de de gürültü: kullanıcı neyin 5'te 1'i olduğunu anlayamaz.

**Ne yapılmalı.** Sayaçları tamamen kaldır (awwwards-06 ile birlikte). Herhangi bir yerde gerçekten sayılabilir bir liste kalıyorsa (process adımları, proje index'i) numarayı elle yazma, array index'inden türet (about/page.jsx:75'teki `${step.number} / ${processSteps.length}` zaten bunu yapıyor; eyebrow'lar da aynı şekilde üretilmeli ya da silinmeli).

#### `awwwards-missed-2` — Sitede tek bir insan yok: isimsiz, yüzsüz, rolsüz stüdyo

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json blogPosts[].author ('The ALAZ Team' / 'ENGINEERING STUDIO', satır ~99-101 ve ~115-117); src/app/[locale]/about/page.jsx (hero, origin, process, end, contact — ekip bölümü yok); en.json intake.completeMessageTemplate ('safely in our queue'); about-desktop-full.png, blog-d-cards.png

**Sorun.** About sayfası ismin etimolojisini anlatıyor ama kim olduğunuzu anlatmıyor; blog yazarı 'The ALAZ Team'; form onayı 'kuyruğa alındı' diyor. Hiçbir sayfada bir kurucu adı, rol, fotoğraf, el yazısı, imza, LinkedIn — insan izi yok.

**Neden önemli.** Awwwards Content kriterinde ve 'AI slop' algısında en güçlü sinyallerden biri anonimliktir: AI-builder siteleri insan göstermez çünkü yoktur. Locomotive, Basement, Studio Freight gibi referansların hepsi insanları gösterir. Müşteri açısından da 'kiminle konuşacağım?' sorusu cevapsız; testimonial'lar baş harfliyken ekip de görünmezse güven sıfırlanır.

**Ne yapılmalı.** About'a 'Who' bölümü: gerçek isimler + rol + bir cümle ('Burak — mobile, Flutter since 2019'), fotoğraf çekilemiyorsa tipografik/monokrom imza; blog yazarını gerçek kişi yap (name + role, author JSON-LD'ye Person); intake onayında ve 'reply within one business day' cümlesinde kişi adı kullan ('X reads every brief'). Footer'a 'Talk to X' maili. Hepsi en.json'dan beslenen 1 bileşen; fotoğraf yoksa bile isimler yeter.

### İNCE İŞÇİLİK

#### `awwwards-15` — Footer bir 'an' değil, hero'nun tekrarı; iki ofis adresi doğrulanabilirlik riski

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Footer.jsx:13-28; messages/en.json contact.offices (1250 Broadway 36th Floor NY + Folkart Towers Kat 31); home-desktop-full.png alt, about-desktop-full.png alt (adresler iki kez üst üste: ContactInfo large + Footer)

**Sorun.** Footer = hero'daki dev ALAZ.'ın aynısı + e-posta + iki adres. About sayfasında adresler ContactInfo ve Footer'da arka arkaya iki kez görünüyor. 'EST. 2026' bir stüdyo için New York Broadway 36. kat + Folkart Towers 31. kat iki ofis iddiası sanal ofis gibi okunur; jüri ve müşteri bunu kontrol eder.

**Neden önemli.** SOTD'larda footer kapanış sahnesidir (Hello Monday, Basement). Hero'nun kopyası 'bitirecek fikir kalmadı' hissi verir. Doğrulanamayan adresler güven kaybı.

**Ne yapılmalı.** Footer'ı 'soğuma' sahnesi yap: sayfa sonuna yaklaşırken zemin #0a0a0a'dan derin kor tonuna (#1a0f08) kayar, dev wordmark'ın kenarı tutuşur, altında İzmir ve (varsa) NY saati canlı tik tak eder, e-posta tıklayınca kopyalanır ve 'ignite' flaşı yapar. Adres: gerçekten çalıştığınız tek yeri yaz ('İzmir, Türkiye · working worldwide'); NY gerçek bir ofis değilse kaldır. About'taki tekrar eden ContactInfo'yu sil.

> **Doğrulayıcı notu:** Footer.jsx:13-28 hero wordmark'ının aynısı + e-posta + ContactInfo; about/page.jsx:85 ContactInfo large + hemen altında Footer → about-desktop-full.png'de iki adres arka arkaya iki kez (teyit). en.json contact.offices NY 1250 Broadway 36. kat + Folkart Towers Kat 31; legal metni 'offices in the United States and Türkiye' diyor. 'Sanal ofis gibi okunur' koddan doğrulanamaz; doğru ifade: NY adresi gerçek bir ekip oturmayan bir posta/serviced adresse, İzmir ile eşit ağırlıkta 'ofis' olarak sunma. About'taki ContactInfo tekrarını sil ve footer'ı kapanış sahnesi yap önerileri geçerli.

#### `awwwards-16` — Navigasyon standart; mobil menü numaralı düz liste

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:27-47; nav-open-mobile.png; home-desktop-fold.png üst bar

**Sorun.** Desktop nav: ortada 4 mono link + TR kutusu + beyaz CTA; mobil: 01-05 numaralı liste + 'TR / TÜRKÇE' satırı. İşlevsel ama hiçbir karakter yok; numaralı liste yine terminal kalıbı. Menü açılış animasyonu yok (open && render).

**Neden önemli.** Nav SOTD'larda ikinci imza alanıdır; şu an sitede hatırlanacak hiçbir şey yok. Design + Creativity.

**Ne yapılmalı.** Tam ekran menü: linkler büyük display ölçeğinde satır-maske ile stagger'lı gelir (GSAP, 60 ms), hover'da sağda ilgili sayfanın preview görseli (Work → Vocabulary kapağı), altta İzmir saati + e-posta, dil toggle'ı menünün içinde küçük bir satır. Açılış: kor nokta büyüyerek ekranı kaplar (clip-path circle). Desktop'ta header'ı şeffaf bırak, scroll'da sadece wordmark + 'Menu' kalsın.

#### `awwwards-17` — lucide-react ikonları her yerde (ArrowUpRight ×12, ShieldCheck, MoveUpRight, CirclePower, Menu/X)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:3 (6 ikon import), :78 (ShieldCheck 46px), :100 (MoveUpRight); src/components/IntakeForm.jsx:189 (CirclePower submit ikonu); src/components/Header.jsx:5; case-studies/[slug]/page.jsx:3

**Sorun.** Her link ve buton default lucide ok ikonuyla bitiyor; VALIDATION'ın yanında 46px lucide kalkan; submit butonunda 'güç düğmesi' ikonu. Lucide, shadcn default'u olduğu için AI-builder sitelerinin ortak dilidir.

**Neden önemli.** Slop sinyali + Design: hazır ikon seti 'özel tasarım yok' der. CirclePower 'START SEQUENCE' terminal temasının uzantısı.

**Ne yapılmalı.** Tek özel ok glifi çiz (SVG, 1.5px, marka geometrisinde) ve tek bir Arrow bileşeninden kullan; hover'da ok değil, metnin altındaki sıcak çizgi hareket etsin. ShieldCheck, CirclePower, MoveUpRight'ı kaldır. Menu/X yerine iki çizgili özel toggle (morph animasyonlu). lucide-react bağımlılığını sadece ui/ klasörü gerçekten kullanıyorsa tut.

> **Doğrulayıcı notu:** Sayı düzeltmesi: <ArrowUpRight> 12 değil 19 kez, 9 dosyada. page.jsx:3 altı ikon import ediyor; bunlardan CirclePower ve ArrowRight bu dosyada hiç kullanılmıyor (ölü import). ShieldCheck :78 (46 px), MoveUpRight :100, IntakeForm.jsx:189 CirclePower submit ikonu, Header.jsx:5 Menu/X, [slug]/page.jsx:3 ArrowLeft/ArrowRight/ArrowUpRight teyit. Tek özel ok glifi + morph toggle önerisi uygulanabilir; lucide'ı ui/ klasörü kullanıyorsa bağımlılık kalır.

#### `awwwards-18` — 'Archive / Index / On file / Manifesto' dili içerik hacmiyle çelişiyor; dürüst çerçeve daha güçlü

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json archive.eyebrowLeft 'INDEX / 001', archive.introNote 'PROJECTS ON FILE / 02', archive.noteRight 'MORE SYSTEMS IN DEVELOPMENT', about.introNote 'ALAZ / MANIFESTO 2026', home.hero.toplineRight 'SOFTWARE STUDIO / EST. 2026'; case-studies-desktop-full.png

**Sorun.** İki projelik liste 'ARCHIVE', 'INDEX', 'ON FILE' olarak sunuluyor; 2026'da kurulmuş stüdyo 'manifesto' ve 'permanence' iddia ediyor. İki proje de görünüşe göre stüdyonun kendi ürünü (Vocabulary store'da, Market Hours markethours.live) — bu aslında çok daha güçlü bir hikâye ama müşteri işi gibi paketlenmiş.

**Neden önemli.** Jüri Content'te 'iddia vs. kanıt' dengesine bakar. Küçük stüdyonun büyük kurum rolü yapması inandırıcılığı düşürür; kendi ürünlerini yapan stüdyo ise 'kanıtı olan' nadir profil.

**Ne yapılmalı.** Çerçeveyi 'we build our own products, then yours' olarak kur: Work sayfası 'Two products we own, in the stores' + 'Now building' (WIP/lab bölümü: haftalık değişen gerçek bir şey, ör. commit sayısı, son release notu). 'Archive/Index/On file/Manifesto/EST.' etiketlerini kaldır. Bu dürüstlük aynı zamanda terminal kostümünü gereksiz kılar.

> **Doğrulayıcı notu:** Etiketler en.json'da doğrulandı (archive.eyebrowLeft 'INDEX / 001', introNote 'PROJECTS ON FILE / {count}', noteLeft/Right 'END OF INDEX' / 'MORE SYSTEMS IN DEVELOPMENT', about.introNote 'ALAZ / MANIFESTO 2026', home.hero.toplineRight 'SOFTWARE STUDIO / EST. 2026'); case-studies-desktop-full.png teyit. Fix'teki 'Two products we own, in the stores' bugün yanlış (stores.js boş, 'COMING SOON'): doğru çerçeve 'One product live on the web, one app heading to the stores — both ours' + 'Now building' bölümü. Dürüst çerçeve önerisi aynen geçerli.

#### `awwwards-19` — NextTopLoader beyaz glow'lu progress bar (nprogress) tek sayfa geçişi efekti

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:60-71 (shadow '0 0 24px 4px #fff…'); src/app/globals.css:187-189 (#nprogress .bar)

**Sorun.** Rota değişiminde üstte 3px beyaz, neon gölgeli bir yükleme çubuğu beliriyor. 2014 YouTube/nprogress deseni; neon gölge 'cyber' temanın parçası.

**Neden önemli.** Awwwards'ta sayfa geçişi bir craft alanıdır; progress bar 'geçiş tasarlanmadı' demektir.

**Ne yapılmalı.** nextjs-toploader'ı kaldır. Yerine: Next 15 View Transitions ile 250 ms çapraz solma + paylaşımlı wordmark/nokta; veya framer-motion AnimatePresence ile kor nokta perdesi (clip-path circle 0→150vmax, 600 ms, expo.inOut) ve yeni sayfada içerik 'soğuyarak' gelir.

#### `awwwards-20` — Start-project ve intake 'SECURE TRANSMISSION / NEW ENGAGEMENT' dili ve %33 COMPLETE sayaçlı form

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json intake.sectionTopLeft, intake.sectionTopRight, intake.completeEyebrow 'PROJECT INQUIRY RECEIVED / 001'; src/components/IntakeForm.jsx; start-project-desktop-fold.png

**Sorun.** Form sayfası 'PROJECT INTAKE / SECURE TRANSMISSION', 'ALAZ / NEW ENGAGEMENT', 'YOUR BRIEF / IN THREE PARTS', '33% COMPLETE' ile yine konsol rolünde. Bu sayfa dönüşüm sayfası; müşteri burada insanla konuşmak ister.

**Neden önemli.** Usability/Content: dönüşüm noktasında soğuk jargon; terminal temasının en pahalı yeri burası (lead kaybı).

**Ne yapılmalı.** Formu konuşma gibi yaz ('What are you building?', 'Where should we send the proposal?'), adım sayacı yerine kısa ilerleme çizgisi (kor gradyan), gönderimde 'ignite' animasyonu + gerçek bir kişinin adı ve yanıt süresi ('Burak replies within one working day'). Mono etiketleri kaldır.

#### `awwwards-missed-3` — Marquee'ler ve yeşil ping prefers-reduced-motion'ı yok sayıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/globals.css:92-100 (guard sadece .reveal-ready [data-reveal] için); src/app/[locale]/page.jsx:60 (animate-signal-marquee), :108 (animate-ticker), :199 (animate-ping); tailwind.config.js keyframes signal-marquee/ticker

**Sorun.** Reveal'lar, Lenis (SmoothScroll.jsx:9) ve BackgroundVideo (BackgroundVideo.jsx:14) reduced-motion'a saygılı; ama iki sonsuz marquee ve START SEQUENCE'daki ping, reduced-motion açıkken de sonsuza dek döner. Site 'erişilebilir hareket' iddiasını yarım bırakıyor.

**Neden önemli.** Awwwards Usability + Developer puanında reduced-motion yolu kontrol edilir; sonsuz yatay kayan metin vestibüler rahatsızlık için en bilinen tetikleyicidir. Ayrıca awwwards-07/06 zaten bu öğeleri kaldırmayı öneriyor; kalırlarsa en azından durmalılar.

**Ne yapılmalı.** Kısa vadede globals.css'e `@media (prefers-reduced-motion: reduce) { .animate-signal-marquee, .animate-ticker, .animate-ping { animation: none } }` ya da sınıfları Tailwind `motion-safe:animate-…` olarak yaz. Orta vadede marquee'leri ve ping'i sil (awwwards-06/07); yerine gelecek canlı veri şeridi reduced-motion'da statik render olsun.

#### `awwwards-missed-4` — About meta'sı ve 'MANIFESTO' etiketi, kodda yorum satırına alınmış bir bölümü vaat ediyor; şablon artıkları en.json'da duruyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json about.meta.title 'About ALAZ — The Engineering Manifesto' (:496), about.meta.description '…Data over dogma, brutal efficiency, software built to last.' (:497), about.introNote 'ALAZ / MANIFESTO 2026', about.principles[] (DATA OVER DOGMA / BRUTAL EFFICIENCY / ENGINEER PERMANENCE), about.imageAlt/imageCaption 'FIG. 01 — THE PRACTICE OF PRECISION', breakImageAlt/Caption 'FIG. 02'; src/app/[locale]/about/page.jsx:63-71 (iki bölüm yorumda); en.json media{} (:2-8: earth/server/wafer/conduits/laboratory stock PNG'leri hostinger CDN'de) → page.jsx:22'de okunup hiç kullanılmıyor; layout.jsx:56-57 images.hostinger.com preconnect

**Sorun.** Sekme başlığı ve Google snippet'i 'The Engineering Manifesto' + 'brutal efficiency' derken sayfada manifesto yok (yorum satırında). en.json'da 'laboratory', 'wafer', 'conduits', 'server' isimli stock görsel URL'leri ve 'FIG. 01 — THE PRACTICE OF PRECISION' alt yazıları duruyor: bu, sitenin ilk şablonunun 'lab/çip/server' konseptinin kalıntısı ve 'DATA OVER DOGMA / BRUTAL EFFICIENCY' en klasik LLM slogan üçlüsü.

**Neden önemli.** Jüri sayfa kaynağına ve meta'ya bakar (Developer puanı); ölü stock referansları ve vaat edilip gösterilmeyen manifesto 'yarım bırakılmış şablon' izlenimi verir. Arama sonucunda görünen snippet de markanın ilk cümlesi: 'brutal efficiency' ile açılmak awwwards-03'teki slogan sorununun aynısı.

**Ne yapılmalı.** about/page.jsx:63-71 yorum bloğunu, en.json about.principles/disciplines*/imageAlt/imageCaption/breakImage* key'lerini ve media{} nesnesini sil; page.jsx:22'deki `media` okumasını kaldır; hostinger preconnect'i sadece blog kapakları gerçekten oradaysa tut. about.meta'yı origin hikâyesine göre yeniden yaz ('ALAZ: the working edge of the flame. A web & mobile studio in İzmir.'). introNote'taki 'MANIFESTO 2026'yı kaldır.

#### `awwwards-missed-5` — Hero'daki dekoratif 4 kolon çizgi grid'i hiçbir içerik grid'iyle hizalı değil ve sadece hero'da var

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:39 (absolute inset-0 grid grid-cols-4, gutter'sız, viewport'u dörde bölüyor: x=360/720/1080); içerik px-[clamp(24px,4.2vw,72px)] ile x=60'tan başlıyor; alt bölümler 3 kolon (services :98) ve 2 kolon (work :142); home-desktop-fold.png

**Sorun.** Çizgiler viewport'un çeyreklerinde, içerik gutter'ın içinde; ALAZ. wordmark'ı ve tagline çizgileri rastgele kesiyor. Aynı grid başka hiçbir sayfada/bölümde tekrarlanmadığı için bir 'sistem' değil, 'tech arka plan' dekoru.

**Neden önemli.** Awwwards Design'da görünür bir grid, içeriğin ona oturmasıyla değer kazanır; oturmayan grid 'şablondan kalan süs' olarak okunur ve dark-brutalist AI şablonlarının standart hero dekorudur.

**Ne yapılmalı.** Ya kaldır (awwwards-06 ile), ya gerçek bir sisteme çevir: --gutter içinde 12 kolonlu CSS grid tanımla (globals.css'te `.grid-site { display:grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--gutter)/3 }`), hero çizgilerini bu kolonlara koy ve services/work/footer bölümlerini aynı kolonlara hizala. Çizgiler yalnızca kenarlarda 'ısınan' ince hatlar olarak Konsept A'ya da girebilir.

#### `awwwards-missed-6` — Hero copy'de 'SOFTWARE STUDIO' iki kez; H1 yalnızca 'ALAZ.', ilk gerçek cümle 'NO BULLSHIT.'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json home.hero.toplineRight 'SOFTWARE STUDIO / EST. 2026' ve home.hero.kicker 'WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO'; src/app/[locale]/page.jsx:42-46; home-desktop-fold.png (sağ üst ve wordmark üstü)

**Sorun.** Hero'nun 900 px'inde aynı iki kelime iki kez tekrar ediyor ve bu sırada ne yaptığınızı söyleyen tek cümle yok: H1 marka adı, altındaki ilk büyük metin bir slogan, açıklama 13 px gri paragrafta. Jüri/ziyaretçi 3 saniyede 'ne yapıyorlar?' sorusuna cevap alamıyor.

**Neden önemli.** Awwwards Content + SEO: H1'in yalnızca marka olması ve ilk okunan cümlenin slogan olması, 'sayfa kendini anlatmıyor' demektir. Tekrar da copy'nin okunmadığını gösterir.

**Ne yapılmalı.** Topline'ı ve kicker'ı tek satıra indir ('İzmir · web & mobile products'), 'SOFTWARE STUDIO' sadece bir yerde kalsın. H1 wordmark olarak kalabilir ama hemen altındaki büyük metin slogan değil tanım cümlesi olsun (awwwards-03'teki örnek), 13 px gri paragrafı kaldır. EST. 2026'yı sil (awwwards-18).

## Eklenmesi önerilenler (Awwwards seviyesi için)

### İmza an 1 — 'Ignite' preloader (tek seferlik)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys Agency, Lusion ve Resn'in kısa, tek fikirli preloader'ları; 2026 SOTD Hubtown (Unseen Studio) açılışı

Sitede preloader yok; nprogress çubuğu var. Öneri: ilk ziyarette (sessionStorage ile tek sefer) 1.0-1.2 s'lik açılış: siyah ekranda ALAZ'ın noktası gri bir kor olarak belirir, 400 ms'de amber→beyaza 'tutuşur', sonra clip-path ile büyüyüp hero'yu açar; hero wordmark'ı bu sırada kor'dan beyaza soğuyarak gelir. Uygulama: GSAP timeline (expo.inOut), CSS clip-path: circle(); WebGL yoksa düz CSS yeterli. Reduced-motion'da atlanır. LCP'yi korumak için preloader hero'nun render'ını engellemez, sadece üstünü örter.

### İmza an 2 — Hero 'heat edge' WebGL shader'ı

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Unseen Studio hero shader'ları, Lusion, Active Theory; Cartier Watches & Wonders 2026 (Immersive Garden) tek-malzeme yaklaşımı

Hero'nun tek görseli: ALAZ. harfleri maske olarak kullanılan tam ekran bir plane; simplex noise ile sürülen ince bir ısı kenarı (beyaz→amber→kor) cursor'ı takip eder, idle'da yavaşça dolaşır, scroll'da aşağıdaki bölüme 'akar'. Uygulama: OGL (~10 KB) veya three.js + custom GLSL (uniforms: uTime, uMouse, uScrollVel); harf maskesi için canvas'a çizilmiş metin texture'ı (font yüklenince yenilenir). Mobil: touch/pointer, isteğe bağlı DeviceOrientation; reduced-motion: statik gradyan kenar. Performans bütçesi: tek draw call, 60 fps, devicePixelRatio ≤ 1.5. Bu parça aynı zamanda footer ve sayfa geçişinde yeniden kullanılır.

### İmza an 3 — Proje index'i: split preview + cursor etiketi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive, Exo Ape, Studio Freight (Lunchbox) index sayfaları; Igloo Inc hover preview

Case studies sayfası: sol %55 liste (büyük başlık + scope), sağ %45 sabit preview paneli; hover'da görsel clip-path smear ile değişir (GSAP 500 ms, custom ease), panelin zemini ürünün rengini alır, cursor 'VIEW ↗' etiketli daireye dönüşür. Home'daki kartlar da satır formatına geçer; hover'da tüm satırın zemini ürün rengiyle dolar. Touch: yatay snap kartlar (CSS scroll-snap), preview = kısa muted ekran kaydı. Alternatif/ek: cursor image-trail (pointer her 80 px'de bir kopya, max 6, 600 ms fade).

### İmza an 4 — Case study geçişi: paylaşımlı kapak + ürün rengi yıkaması

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Significa ve Phantom case study geçişleri; Nine To Five (ET Studio, SOTD Nisan 2026) ürün-renk kullanımı

Projeye tıklanınca kapak görseli yerinden büyüyüp hero olur (View Transitions API `view-transition-name: cover-{slug}` veya framer-motion layoutId + persistent layout), ürünün rengi sayfayı 300 ms'de yıkar, başlık satır-maske ile gelir. 'Next project' linkinde aynı geçiş tersine çalışır. Case study içinde: hero gradyanı .78→.25, data-theme ile ürün aksanı, galeri yatay scroll-scrub film şeridi (ScrollTrigger pin), ve gerçek interaktif embed (Vocabulary: framer-motion drag ile 5 gerçek kelime kartı + ses; Market Hours: markethours.live verisinden canlı mini harita, açık borsalar yeşil değil 'kor' ile işaretli).

### İmza an 5 — Footer 'cooling' sahnesi

- **Etki:** orta · **Efor:** küçük · **Referans:** Hello Monday ve Basement Studio footer'ları; Studio Dado (Motto, SOTD Şubat 2026) kapanış bölümü

Son viewport'a yaklaşırken zemin #0a0a0a'dan derin kor tonuna (#1a0f08) kayar (ScrollTrigger scrub), dev ALAZ. wordmark'ının noktası tutuşur ve shader kenarı harflerin altından geçer; altında İzmir (ve varsa gerçek ikinci ofis) saati canlı, e-posta tıklanınca kopyalanır ve kısa 'ignite' flaşı verir; 'Back to top' yerine nokta'ya tıklayınca kor yukarı 'uçar'. Tüm adres/yasal satırlar tek ince satıra iner.

### Hareket grameri + scroll koreografisi (motion system)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys'in 'tek easing' disiplini; GSAP ScrollTrigger + Lenis standart entegrasyonu

Tek easing ailesi (expo.out giriş 600 ms, power2.inOut geçiş 400 ms), tek imza geçiş 'ignite→cool'. Başlıklar SplitType + GSAP satır-maske (stagger 60 ms, translateY 110%→0). Lenis `scroll` → ScrollTrigger.update bağlantısı; 'Four moves' bölümü pinlenir, her adım aktifken kenarı tutuşur; büyük görsellerde hafif parallax (yScale 1.1, -6%). Hover: ok değil, metin altı sıcak çizgi (scaleX origin left→right). nprogress kaldırılır, rota geçişi View Transitions ile. Tüm hareketler prefers-reduced-motion'da anında.

### Kor nokta: custom cursor + canlı marka işareti

- **Etki:** orta · **Efor:** küçük · **Referans:** Dogstudio, Makemepulse cursor sistemleri

Wordmark noktası siteyi dolaşan tek 'canlı' element olur: custom cursor (mix-blend-mode: difference, 12 px, link üzerinde 48 px'e büyür ve 'VIEW/DRAG/OPEN' yazar), ::selection rengi, focus ring, aktif nav göstergesi. Idle'da 4 s nefes (opacity .7→1), scroll hızıyla parlaklık (clamp velocity). Touch'ta cursor yok; nokta sadece wordmark'ta yaşar. Uygulama: tek pointermove listener + GSAP quickTo, ~60 satır.

### Tam ekran menü

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive, Exo Ape menüleri

Mevcut düz liste yerine: kor nokta clip-path circle ile ekranı kaplar (600 ms), linkler display ölçeğinde satır-maske stagger ile gelir, hover'da sağda ilgili sayfanın preview'ı, altta İzmir saati + e-posta + dil toggle'ı. Header scroll'da sadece wordmark + 'Menu' bırakır. Mobilde aynı sistem, preview'sız.

### Gerçek canlı veri şeridi (marquee yerine)

- **Etki:** orta · **Efor:** küçük · **Referans:** Kendi ürününüz; Studio Freight'in 'live' footer verileri

İki buzzword marquee'sinin yerine tek, anlamlı ve ürünü kanıtlayan şerit: markethours.live API'sinden 'NYSE OPEN · LSE CLOSES IN 1H 12M · BIST OPEN · İZMİR 14:42'. 60 s'de bir yenilenir, aria-live=off, reduced-motion'da statik. JetBrains Mono burada gerçek bir işlevle kalır.

### Yol haritası — Faz 1: Quick wins (1-2 hafta)

- **Etki:** yüksek · **Efor:** küçük

Slop temizliği ve temel kimlik: (1) sekiz videoyu, PoweredBy'ı, iki marquee'yi, status pill'i, köşe-braketli butonu, yeşil ping'i, ShieldCheck/CirclePower'ı, nprogress'i sil (awwwards-04/05/06/07/17/19); (2) tüm slogan copy'yi yeniden yaz (awwwards-03), testimonial'ı gerçek kanıtla değiştir veya kaldır (08); (3) aksan tokenları ekle ve kor noktayı canlandır (12/13) — CSS only; (4) archive hover thumbnail'ının metni kapatmasını düzelt (10); (5) tek buton/etiket sistemi; (6) custom cursor. Sonuç: aynı iskelet, slop'suz, ~20 MB hafif; tahmini jüri puanı 5.2→6.3.

### Yol haritası — Faz 2: Core rebuild (3-5 hafta)

- **Etki:** yüksek · **Efor:** büyük

Konsept A'nın sistemleştirilmesi: (1) tipografi + renk + spacing token'ları, sayfa başına farklı kompozisyon (awwwards-14); (2) hareket grameri: GSAP+Lenis, satır-maske reveal, pinned 'Four moves', View Transitions (09/19); (3) tam ekran menü (16); (4) footer 'cooling' sahnesi (15); (5) case study'lerin proje özelinde yeniden yazımı, ürün rengi teması, galeri film şeridi (11); (6) start-project formunun konuşma diline çevrilmesi (20); (7) Work sayfası split-preview index (10). Sonuç: tutarlı bir dünya, Honorable Mention bandı (6.5-7.2).

### Yol haritası — Faz 3: Signature pieces + submission (3-6 hafta)

- **Etki:** yüksek · **Efor:** büyük

(1) WebGL heat-edge hero + ignite preloader + aynı shader'ın geçiş ve footer'da yeniden kullanımı; (2) interaktif ürün embed'leri (Vocabulary swipe demo, Market Hours canlı harita) — stüdyonun 'build' iddiasının kanıtı; (3) canlı veri şeridi; (4) Awwwards teslim kontrol listesi: LCP < 2.0 s, CLS 0, INP < 200 ms, 60 fps shader (DPR cap), klavye erişimi, reduced-motion yolu, Safari/Firefox testi, OG görseli konsepte uygun, Developer Award için temiz kaynak. (5) Gönderim: SOTD değerlendirmesi ~3 ay sürer; sitede 'Now building' bölümüyle canlılık göster. Hedef: 7.5-8.2 bandı (SOTD aday).
