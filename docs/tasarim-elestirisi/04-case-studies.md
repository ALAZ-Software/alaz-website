# Case study index ve detay sayfaları

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 30 (5 kritik · 12 önemli · 13 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 11

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Bir stüdyo sitesinde work sayfaları sitenin kendisidir; burada ise iki ürünlük bir "arşiv" tablosu ve her iki projede birebir aynı sloganları ("BUILD FOR WHAT'S NEXT." / "PRECISION AT EVERY LAYER." / "LESS NOISE. MORE SIGNAL.") taşıyan, üç gri paragraftan oluşan bir form var. Sayfalar teknik olarak temiz (fit() tipografi, JSON-LD, AVIF, reduced-motion) ve proje verisindeki metinler gerçekten spesifik; ama Market Hours'ta tek bir ürün görseli bile yok, Vocabulary'nin galerisi caption'ları gömülü store screenshot'larından ibaret, hero görselleri üç kat overlay'le boğulmuş, mobil index'te hiç görsel yok ve her ekranda "01 / 02", "INDEX / 001", "0X / DELIVERABLE" gibi numaralı etiketler var. Bu haliyle sayfalar bir hikâye değil bir şablon anlatıyor; Awwwards seviyesine çıkmak için sayfanın proje rengine/karakterine bürünmesi, gerçek ürün görselleri/videoları, süreç artefaktları, proje meta tablosu, paylaşılan-eleman geçişleri ve imza olabilecek bir interaktif parça (canlı market widget'ı, swipe-card galeri) gerekiyor.

## Korunması gerekenler

- Proje verisindeki gövde metinleri gerçekten somut ve dürüst: 1-2-4-7-15-30 günlük tekrar programı, 24 dil, 17 oyun, 44 deste, RevenueCat, JetBrains Mono, 9 borsa, 'coming soon' yerine sahte sonuç uydurmama — bu içerik korunmalı, sadece görselleştirilmeli (messages/en.json projects[].approach/outcome).
- fit() + .fit sınıfıyla ölçeklenen Archivo 900 display tipografi sağlam: hiçbir viewport'ta taşma yok, gri nokta (text-[#6e6e6e]) ince bir marka tiki; 'THE WORK.' ve 'VOCABULARY.' hero'ları doğru ölçekte (src/lib/fit.js, globals.css:171-182).
- Vocabulary'nin kendi görsel kimliği (saf #FFE600 sarı, kedi maskotu, pembe/yeşil/mor ekranlar) temiz vektör olarak elde var (public/projects/vocabulary/hero.png 65 KB) — sayfanın proje rengine bürünmesi için hazır malzeme.
- Market Hours cover.jpg (1920×1200) düzgün tasarlanmış bir key visual; canlı ürün linki (markethours.live) var — gerçek iş kanıtı.
- Teknik hijyen iyi: generateStaticParams, hero <Image priority>, AVIF/WebP, CreativeWork + Breadcrumb JSON-LD, reduced-motion'da reveal ve Lenis'in kapanması, JS'siz görünür içerik (reveal-ready yaklaşımı).
- Index satırında hover'da arka plan + preview gösterme içgüdüsü doğru (sadece ölçek ve konum yanlış); detay hero'sunda içeriğin alta hizalanması (mt-auto) ve clamp'li min-height düzgün çalışıyor.
- Gövde ve mono tipografinin ölçüleri (12px mono tracking .085em, 16-22px gövde) tutarlı; sayfalar arasında grid ve gutter (clamp(24px,4.2vw,72px)) disiplini korunmuş.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `case-studies-01` — Sahte arşiv/dizin etiketleri: 2 proje için "INDEX / 001", "PROJECTS ON FILE", "END OF INDEX"

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:34-37, 49; messages/en.json archive.eyebrowLeft, eyebrowRight, kicker, introNote, noteLeft, noteRight; case-studies-desktop-full.png (üst ve alt mono satırlar)

**Sorun.** Sayfa "INDEX / 001", "ARCHIVE / SELECTED WORK", "AN INDEX OF WHAT WE BUILD", "PROJECTS ON FILE / 02", "END OF INDEX", "MORE SYSTEMS IN DEVELOPMENT" olmak üzere altı ayrı mono 'arşiv' etiketi taşıyor; arşivde iki kayıt var ve ikisi de stüdyonun kendi ürünü.

**Neden önemli.** Brief'te adı geçen slop sinyalinin ta kendisi: büyük-stüdyo arşivi taklit eden dekoratif mono etiketler. İki projeyle 'arşiv/dizin/dosyada' dili, boş bir veritabanı hissi verir ve okuyucuya 'bunu bir şablon yazdı' der. Dürüst olmak (iki kendi ürünümüz) daha güçlü bir marka sinyali.

**Ne yapılmalı.** Altı etiketi de kaldır. Hero'da tek bir dürüst cümle bırak: ör. "Two products we design, build and run ourselves." Sayacı sade tut ("02" değil, "Two projects"). "END OF INDEX / MORE SYSTEMS IN DEVELOPMENT" satırını sil; listenin bitişini footer zaten belirtiyor. Eğer bir eyebrow kalacaksa numarasız ve anlamlı olsun: "Work" veya "Products". Kendi ürünü olduğunu gizlemek yerine listede "Own product · 2025" gibi küçük bir not kullan.

#### `case-studies-09` — Challenge/Approach/Outcome başlıkları iki projede birebir aynı slogan

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json caseStudy.challengeHeading, approachHeading, outcomeHeading; src/app/[locale]/case-studies/[slug]/page.jsx:112,120,128; case-vocabulary-desktop-full.png ve case-market-hours-desktop-full.png (aynı üç başlık)

**Sorun.** Sayfadaki en büyük tipografi (80px) her projede 'BUILD FOR WHAT'S NEXT.' / 'PRECISION AT EVERY LAYER.' / 'LESS NOISE. MORE SIGNAL.' diyor; projeye dair tek kelime içermiyor. Asıl içerik sağda 520px genişlikte, text-mute gri bir paragraf.

**Neden önemli.** Bu, dimension'daki en ağır slop sinyali: boş slogan büyük, gerçek içerik küçük ve gri. Jüri ya da potansiyel müşteri iki sayfayı art arda açınca şablonu anında fark eder; 'kopyala-yapıştır stüdyo' algısı oluşur.

**Ne yapılmalı.** Başlıkları `projects[]` verisine taşı (`challengeTitle`, `approachTitle`, `outcomeTitle`) ve projeye özgü yaz. Vocabulary: "Learning a word takes a minute. Keeping it takes 30 days." / "One codebase, 24 languages, every word spoken." / "17 games, 44 decks, a word on the home screen." Market Hours: "Nine exchanges, four sessions, one clock." / "Hours stored where they happen, so DST takes care of itself." / "Live on the web. Alarms on the way." Alternatif: slogan H2'yi tamamen kaldır, gövde metnini 24-32px beyaz display metin olarak sol kolona al (Obys/Hello Monday tarzı).

#### `case-studies-10` — Numaralı eyebrow enflasyonu: PROJECT / 01, 01 / 02, 01 / THE CHALLENGE, 0X / DELIVERABLE, NEXT PROJECT / 02

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:89, 92, 104-107, 111, 119, 127, 152, 159; messages/en.json caseStudy.challengeEyebrow/approachEyebrow/outcomeEyebrow/deliverableLabel/selectedWorkLabel; case-vocabulary-desktop-fold.png

**Sorun.** İlk ekranda üç numaralı etiket ('PROJECT / 01', kicker, 'ALAZ / SELECTED WORK … 01 / 02'), sonra her bölümde '01 / THE CHALLENGE', her marker'da '01 / DELIVERABLE', en altta 'NEXT PROJECT / 02'. Sayfada 9 adet 'NN /' kalıbı var.

**Neden önemli.** Brief'te açıkça sayılan slop kalıbı ('01 / 05 index eyebrows on every section'). Numara, bir sıralama bilgisi taşımadığında dekora dönüşür ve 'AI-builder' kokar.

**Ne yapılmalı.** Tüm sayısal önekleri kaldır. Bölüm etiketleri sade kalsın ('Challenge', 'Approach', 'Outcome' – küçük mono ya da hiç etiket, başlık yeter). 'ALAZ / SELECTED WORK … 01 / 02' satırını sil (bkz. case-studies-17). Proje numarası yerine yıl yaz ('2025'). Bölüm navigasyonu gerekiyorsa sol kenarda sticky bir rail (bkz. additions).

> **Doğrulayıcı notu:** Sayım doğru: 'PROJECT / 01' (:89), '01 / 02' (:106), '01 / THE CHALLENGE' / '02 / THE APPROACH' / '03 / THE OUTCOME' (:111,119,127), '0X / DELIVERABLE' ×3 (:152), 'NEXT PROJECT / 02' (:159) = 9 adet 'NN /' kalıbı; ayrıca galeri sayacı '07' (:137). Düzeltme: 'ilk ekranda üç numaralı etiket' demek yanlış — :92'deki kicker ('LANGUAGE LEARNING / IOS & ANDROID / MOBILE APPLICATION') numarasız; ilk ekranda iki numaralı etiket var ve '01 / 02' satırı 1440×900'de fold'un tam kenarında (y≈897). Tespit ve fix (tüm sayısal önekleri kaldır) doğru.

#### `case-studies-11` — Case study bir hikâye değil, üç alanlı bir form

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:109-131 (üç özdeş grid bloğu), messages/en.json projects[].challenge/approach/outcome; case-vocabulary-desktop-full.png, case-market-hours-desktop-full.png

**Sorun.** Hero'dan sonra gelen her şey aynı 50/50 grid: solda slogan, sağda bir gri paragraf (16-22px, text-mute, leading 1.8). Üç blok arasında görsel, sayı, alıntı, diyagram, video yok. Market Hours'ta hero'dan footer'a kadar tek bir ürün görseli bile yok. Hiçbir yerde yıl, rol, stack, süre, ekip, sonuç metriği yok.

**Neden önemli.** Awwwards seviyesindeki case study'ler (Locomotive, Obys, Basement) ürünü göstererek anlatır: büyük medya, ritim değişimi, süreç artefaktları, sayılar. Burada ürün hakkında yazılan somut cümleler (1-2-4-7-15-30 gün tekrar programı, 9 borsa, DST motoru) görselleştirilmeden gri paragrafta kayboluyor. 'Kanıt' yok → 'anlatı' yok.

**Ne yapılmalı.** Üç sabit string yerine `projects[].sections` dizisi tanımla: `{type:'text', title, body}`, `{type:'image', src, caption, bleed:true}`, `{type:'stats', items:[{value:'8000', label:'words'}]}`, `{type:'diagram'}`, `{type:'video', src}`, `{type:'quote'}`. Sayfa bu diziyi render etsin. Vocabulary için sıra: hero → facts strip → Challenge metni → tam genişlik swipe-card görseli → tekrar programının zaman çizelgesi diyagramı (1,2,4,7,15,30 gün noktaları, SVG) → stats (8000 / 24 / 17 / 44) → Approach → ekran şeridi → Outcome → widget görseli. Market Hours için: hero → facts → Challenge → dashboard ekran görüntüsü (tam genişlik) → DST/timezone diyagramı (24 saatlik halka üzerinde 9 borsa) → stats (9 exchanges / 4 sessions / 10 alarm sounds) → Approach → alarm ekranı + kısa video → Outcome. Gövde metni text-mute yerine en az #cfcfcf, 18-22px.

#### `case-studies-12` — Market Hours sayfasında hiç ürün görseli yok

- **Önem:** KRİTİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json projects[1] (gallery alanı yok); src/app/[locale]/case-studies/[slug]/page.jsx:133 (gallery koşullu); public/projects/market-hours/ (yalnızca cover.jpg ve hero.jpg); case-market-hours-desktop-full.png

**Sorun.** Ürün web'de canlı (markethours.live) ve bir Flutter uygulaması var, ama sayfada arka plandaki stilize harita dışında ne dashboard ekranı, ne mobil ekran, ne video var. Galeri bölümü Market Hours için hiç render edilmiyor.

**Neden önemli.** Canlı bir ürünün case study'sinde ürünü göstermemek jüri için kırmızı bayrak: 'gerçek mi?' sorusunu doğurur. Hero haritası da bir key-visual, ürünün kendisi değil.

**Ne yapılmalı.** markethours.live'dan 1920×1200 gerçek ekran görüntüleri al (dashboard tam hali, haritada gece/gündüz, bir borsa açılırken, holiday görünümü), 2560 genişlikte export edip next/image ile tam genişlik koy. Flutter uygulamasından 3-4 ham ekran (alarm listesi, alarm sesi seçimi, bildirim). 10-15 saniyelik sessiz ekran kaydı (webm AV1 + mp4, ≤2 MB) Approach bölümünde autoplay loop. En güçlüsü: aynı kuralları kullanan canlı 'open now' widget'ı (bkz. additions).

> **Doğrulayıcı notu:** Doğru: projects[1]'de gallery yok, public/projects/market-hours/ altında yalnızca cover.jpg (1920×1200, 537KB) ve hero.jpg (1920×1200, 387KB) var; detay sayfasında yalnızca hero.jpg (sadece harita) kullanılıyor. Ek bilgi: cover.jpg aslında saat, oturum kartları ve 'MARKET HOURS_' başlığıyla tasarlanmış bir dashboard key-visual'ı ve detay sayfasında HİÇ kullanılmıyor (yalnızca index hover'ı ve ana sayfa). Hızlı kazanım: gerçek ekran görüntüleri gelene kadar cover.jpg'yi Approach bölümünde tam genişlik koy. Gerçek markethours.live ekranları + Flutter ekranları + kısa video önerisi doğru.

### ÖNEMLİ

#### `case-studies-02` — İki satırlık 'tablo' layout'u boş bir veritabanı gibi okunuyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/page.jsx:41-48 (grid-cols-[15%_1fr_25%_50px], tableHeaders NO./PROJECT/SCOPE/VIEW); case-studies-desktop-full.png, case-studies-mobile-full.png

**Sorun.** Hero 740px yükseklikte, altında NO. / PROJECT / DISCIPLINE / SCOPE / VIEW başlıklı bir tablo ve yalnızca iki satır; satırlar min-h 200px, görsel yok (sadece hover'da 220px thumbnail). Sayfanın %60'ı hero ve footer, asıl iş %15.

**Neden önemli.** Liste/tablo formatı 15-40 projelik stüdyoların (Locomotive, Studio Freight) çözümüdür; iki projeyle 'sütun başlıkları + boş alan' hissi verir. Awwwards jürisi work sayfasında görsel, ölçek ve karakter arar; burada proje adı dışında hiçbir şey yok.

**Ne yapılmalı.** İki seçenek: (a) Her projeyi tam genişlik bir 'bölüm' yap: 90-100vh, sol altta proje adı + bir cümle + yıl, sağda/arka planda cover görseli hafif parallax (Lenis scroll değeri ile translateY 6-10%), hover'da görsel scale 1.0→1.04; iki bölüm arasında project rengine geçiş. (b) Listeyi koru ama her satıra her zaman görünen 16/10 thumbnail ekle (sütun: 40% görsel / 60% metin), hover'da büyüyen cursor-follow preview (bkz. case-studies-03). Tablo başlık satırını ve 'VIEW' sütununu kaldır; proje sayısı 5'i geçene kadar (a) seçeneği daha doğru.

> **Doğrulayıcı notu:** Layout ve grid (page.jsx:41-42 grid-cols-[15%_1fr_25%_50px], tableHeaders NO./PROJECT / DISCIPLINE/SCOPE/VIEW) doğru. Ölçüler Playwright ile düzeltildi: hero 764px (740 değil), satırlar 200px ve 289px. 2048px'lik sayfada hero+footer ≈ %64, tablo başlığı+iki satır ≈ %26 — yani 'asıl iş %15' düşük tahmin, ama 'sayfanın üçte ikisi dekor' tespiti ayakta. Fix (a) tam genişlik proje bölümleri 2 proje için doğru seçim; (b) seçeneği de uygulanabilir.

#### `case-studies-03` — Hover preview minik (220×130), SCOPE metniyle çakışıyor ve statik

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/page.jsx:47 (w-[220px] h-[130px] right-[10%] -rotate-4); cs-d-row-hover.png

**Sorun.** Hover'da çıkan thumbnail 220×130px, -4° döndürülmüş, sabit konumda ve SCOPE sütunundaki 'LANGUAGE LEARNING / IOS & ANDROID' yazısının üstüne biniyor (ekran görüntüsünde 'LAN…OID' kırpık görünüyor). Thumbnail olarak cover.png kullanılıyor; içindeki 'English Vocabulary' yazısı 220px'te okunmuyor. Satır ayrıca hover:pl-[20px] ile tüm içeriği 20px sağa kaydırıyor.

**Neden önemli.** Çakışma düpedüz craft hatası. 'Eğik küçük thumbnail' kalıbı tek başına slop değil ama bu ölçekte ve bu konumda bir Dribbble shot'ı gibi duruyor; Awwwards listelerinde preview ya cursor'ı takip eden 400-560px bir görseldir ya da satırın arka planını tamamen alır.

**Ne yapılmalı.** Preview'ı satırın absolute çocuğu olmaktan çıkar; listeyi saran bir client component'te tek bir `<div class='fixed pointer-events-none'>` tut, `pointermove` ile hedef x/y'yi al, rAF içinde lerp(0.12) veya framer-motion `useSpring(useMotionValue, {stiffness:150, damping:20})` ile yumuşat. Boyut 440×275 (16/10), giriş: clip-path inset(100% 0 0 0)→inset(0) 450ms [0.76,0,0.24,1] + görsel scale 1.15→1; satır değişince görseli crossfade et. Görsel olarak yazısız bir crop kullan (hero.png). pl-[20px] kaydırmayı kaldır; yerine başlığı `translateX(12px)` ile iç wrapper'da hareket ettir (layout değil transform). SCOPE sütunu kalacaksa preview'ı z-[3] ile en üste al ve sütunun üstüne gelmeyecek bir x aralığına clamp'le.

> **Doğrulayıcı notu:** Çakışma doğrulandı: probe'da preview rect x 1027-1247 / y 722-852, SCOPE span rect x 1004-1329 / y 777 → tam üst üste; cs-d-row-hover.png'de 'LAN…OID' kırpık. Thumbnail project.image = cover.png ('English Vocabulary' yazılı) doğru, hover:pl-[20px] layout kaydırması doğru (computed paddingLeft 20px). YANLIŞ olan: '-4° döndürülmüş' — Tailwind 3 default rotate skalasında 4 yok (0,1,2,3,6,12,45,90,180), tailwind.config'de rotate extend edilmemiş; computed transform matrix(1,0,0,1,0,-65), yani sıfır rotasyon, sınıf ölü. Önerilen cursor-follow preview fix'i doğru ve uygulanabilir.

#### `case-studies-04` — Mobil index'te hiç görsel yok

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:47 (mobile:hidden); case-studies-mobile-full.png

**Sorun.** Hover preview mobile:hidden olduğu için 390px'te work sayfası sadece iki proje adı, mono etiketler ve ok ikonundan ibaret. Ana sayfa (src/app/[locale]/page.jsx:143-152) aynı projeleri 16/10 cover kartlarıyla gösteriyor; yani asıl work sayfası ana sayfadan daha az görsel içeriyor.

**Neden önemli.** Mobil trafik çoğunlukta; görselsiz bir work index'i stüdyonun işini göstermiyor. Ana sayfayla tutarsızlık, index'in 'ikinci sınıf' olduğunu söylüyor.

**Ne yapılmalı.** Mobilde her satırın üstüne cover'ı 16/10 veya 4/5 oranında, tam genişlik koy (next/image, sizes='100vw', data-reveal fade). Alternatif: yatay snap-scroll (scroll-snap-type:x mandatory) kart şeridi; her kart 82vw, görsel + ad + yıl. Vocabulary için yazısız crop (hero.png), Market Hours için cover.jpg.

#### `case-studies-05` — Index hero kopyası filler: "Technical challenges. Considered solutions. Systems engineered for what comes next."

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json archive.introText, archive.kicker; src/app/[locale]/case-studies/page.jsx:35-37; case-studies-desktop-full.png

**Sorun.** Hero'daki tek düzyazı cümle üç nominal parçadan oluşan, hiçbir projeye özgü olmayan bir slogan; 'engineered for what comes next' tam olarak brief'teki 'engineered to last / built with intent' türü dolgu.

**Neden önemli.** LLM-kokan copy en hızlı tanınan slop sinyali. Üstelik proje verisinde (en.json projects[].summary/approach) son derece somut cümleler varken hero'da en belirsiz cümle duruyor.

**Ne yapılmalı.** Hero cümlesini verilerden türet: "A vocabulary app spoken in 24 languages and a market map that knows when Tokyo opens. Both designed, built and run by us." Kicker'ı ('AN INDEX OF WHAT WE BUILD') sil. Meta description'ı (archive.meta.description) da aynı somutlukta yaz.

#### `case-studies-06` — Index hero videosu: 1280×720, 4.5 MB, sesli, preload=auto, %55 opacity + iki gradient

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:28-32; public/videos/the-work-section.mp4 (ffprobe: h264 1280×720, 10 s, 3.6 Mbps, ayrıca 128 kbps AAC ses izi), public/videos/poster.png (3.7 KB düz siyah); cs-d-hero-video.png

**Sorun.** Hero'nun arkasında 4.5 MB'lık, 720p bir loop var; 1440-1920px viewport'ta upscale oluyor, muted olduğu halde ses izi indiriliyor, preload='auto' ile sayfa açılır açılmaz tamamı çekiliyor. Üstüne opacity .55 + 180° ve 90° iki gradient biniyor; headless Chromium'da (H.264 yok) hero tamamen siyah kaldı, bu da fallback'in düz siyah olduğunu gösteriyor.

**Neden önemli.** Awwwards'ta performans puanı var; 4.5 MB bir dekor için ağır. 720p'nin 1920'ye çekilmesi yumuşak/bulanık görünür. Sayfanın en büyük alanı (740px) muhtemelen zor seçilen bir doku için harcanıyor.

**Ne yapılmalı.** Ya videoyu kaldırıp hero'yu ilk projenin görseline/rengine bırak (index'in kendi hero'suna ihtiyacı yok), ya da yeniden encode et: 1920×1080, AV1 (webm) + H.264 fallback, ses izi yok (`ffmpeg -an`), hedef ≤1.5 MB, `preload='metadata'`, IntersectionObserver ile görünürken play; poster olarak gerçek bir kare (JPEG, ~30 KB). Overlay'i tek bir alt fade'e indir (opacity .55 kalksın, gradient yalnızca metin bölgesinde).

#### `case-studies-13` — Vocabulary galerisi 'STORE SCREENSHOTS': caption'ları gömülü pazarlama görselleri, 4'lü grid'de yetim hücre

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:133-147 (grid-cols-4, aspect-[9/16], border); messages/en.json caseStudy.galleryEyebrow ("STORE SCREENSHOTS"), projects[0].gallery (en/01-07.webp, 1080×1920); cs-d-vocab-gallery.png, case-vocabulary-desktop-full.png

**Sorun.** Galeri, App Store listing için hazırlanmış 7 görselden oluşuyor; her birinin içinde 'Learn the 8000 most common English words', 'Watch your progress grow' gibi büyük pazarlama başlıkları var. Etiket bunu itiraf ediyor: 'STORE SCREENSHOTS'. 4 sütunlu grid'de 7 öğe → son satırda boş hücre. Her kutu border'lı, aynı boyut, ritim yok. Mobilde 2 sütun × 4 satır uzun bir kaydırma.

**Neden önemli.** Store görselleri başka bir bağlam için tasarlanmış; case study'ye yapıştırılınca 'elimizde ne varsa koyduk' hissi verir. Görsellerin içindeki başlıklar sayfanın kendi tipografisiyle çatışır (iki farklı başlık hiyerarşisi). Yetim hücre craft hatası.

**Ne yapılmalı.** Uygulamadan caption'sız ham ekranlar export et (1290×2796, status bar temiz). Etiketi 'Screens' yap veya kaldır. Sunum: uygulama swipe-card tabanlı olduğu için galeriyi de swipe edilebilir bir kart destesi yap (framer-motion `drag='x'`, 3 kart üst üste, rotate ±6°, bırakınca `animate` ile sıradaki öne gelir; klavye ok tuşları ve dots ile erişilebilir). Alternatif: yatay drag şeridi (framer-motion `drag='x'` + `dragConstraints`, kartlar 320px, aralarında caption satırı). Her ekranın altına hikâyeden bir satır caption: 'Every card has audio and an example sentence.' Grid kalacaksa 3 sütun + 1 geniş (2 sütunluk) hücre ile 7'yi dengele.

#### `case-studies-14` — Hero overlay'leri proje görselini boğuyor; başlık görselin üstüne biniyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:83-85 (üç katman: brightness(.95), 180° gradient .78→.30→.62→#090909, 90° gradient .55); case-vocabulary-desktop-fold.png, cs-w-vocab-hero.png, cs-w-mh-hero.png

**Sorun.** Vocabulary'nin #FFE600 sarısı overlay altında zeytin/hardal rengine, beyaz kedi griye dönüyor; 'VOCABULARY' başlığı kedinin yüzünün ve 8000 kartının üstüne biniyor. Market Hours'ta harita etiketleri (NYSE, LSE, XETRA, BIST, KILLZONE) başlık harflerinin arasından çıkıyor; 1920px'te 'MARKET HOURS' tek satıra gelince NSE/HKEX etiketlerini kapatıyor.

**Neden önemli.** Projenin kendi kimliği (Vocabulary'nin cesur sarı/pembe/yeşil paleti) sayfanın en güçlü görsel kozu; onu 'site karanlık olmalı' diye öldürmek hem craft hem marka kaybı. Awwwards work sayfalarında (Locomotive, Hello Monday) sayfa projeye bürünür, proje sayfaya değil.

**Ne yapılmalı.** Proje başına art direction: `projects[].theme = {bg:'#FFE600', fg:'#000', accent:'#FF8FD8'}` ve `heroLayout:'split'|'cover'`, `heroPosition:'70% 50%'`. Vocabulary: hero arka planı sarı, başlık siyah, kedi sağ kolonda (grid 55/45) tam renk, overlay yok; sayfanın geri kalanı isteğe göre sarı→siyah geçişle devam eder. Market Hours: koyu kalır, ama overlay tek bir alt fade'e (linear-gradient 180deg, transparent 55%, #090909) iner; görsel object-position ile harita başlık bandının altına alınır veya harita canlı component olarak çizilir. brightness/grayscale filtrelerini kaldır.

#### `case-studies-15` — Mobil hero: görsel metnin arkasına gömülü, kontrast düşüyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:83 (fill + object-cover, mobil crop yok), 86, 94; case-vocabulary-mobile-fold.png, case-market-hours-mobile-fold.png

**Sorun.** 390px'te Vocabulary hero'sunda kediden yalnızca bir kulak ucu görünüyor; özet paragraf gri '8000' kartının üstüne denk geliyor ve 'common English words, with audio on every card' satırları düşük kontrastla okunuyor. Market Hours'ta harita neredeyse yok; sadece 'BIST' ve bir nokta başlığın yanından çıkıyor.

**Neden önemli.** Mobilde ilk ekran projenin görselini göstermiyor, üstelik metin okunabilirliğini bozuyor. Hem usability hem craft sorunu.

**Ne yapılmalı.** Mobilde görseli arka plandan çıkar: başlık + özet üstte, altında kendi bloğunda 4/5 oranlı görsel (next/image `sizes='100vw'`, `heroImageMobile` alanıyla dikey crop). Gövde metnini asla görselin üstüne koyma. Store/visit butonlarını görselin altına al. Masaüstünde split layout kullanılırsa (case-studies-14) mobil zaten doğal olarak stack olur.

> **Doğrulayıcı notu:** Market Hours mobil (case-market-hours-mobile-fold.png): haritadan yalnızca 'BIST' ve bir nokta görünüyor — doğru. Vocabulary mobil (case-vocabulary-mobile-fold.png): 'yalnızca bir kulak ucu' abartı — kedinin kulağı, gözleri ve bıyıkları sağ üstte, '800' kartı paragrafın arkasında görünüyor; ama hepsi overlay altında gri ve özet paragraf kartın üstüne binip okunabilirliği düşürüyor. Asıl tespit (mobilde görsel arka planda boğuluyor, metin görselin üstünde) doğru; fix (mobilde görseli kendi bloğuna al, heroImageMobile crop) uygulanabilir.

#### `case-studies-16` — İki projede de ölü 'COMING SOON' store butonları; badge'ler el yapımı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/StoreButtons.jsx:1-23 (Simple Icons path'leri, role='link' aria-disabled span), src/lib/stores.js:4-13 (tüm linkler boş), src/app/[locale]/case-studies/[slug]/page.jsx:95-98; case-vocabulary-desktop-fold.png, case-vocabulary-mobile-fold.png

**Sorun.** STORE_LINKS tamamen boş; her iki sayfada iki devre dışı 'COMING SOON ON APP STORE / GOOGLE PLAY' kutusu var. Vocabulary sayfasının tek CTA'sı bu iki ölü buton. Badge'ler Simple Icons logolarıyla elde çizilmiş (dosyadaki yorum da 'official badge artwork ile değiştir' diyor); Apple ve Google badge kılavuzları özel badge yapımına izin vermez. Mobilde iki buton alt alta 130px yer kaplıyor. Market Hours'ta 'coming soon' üç kez tekrar ediyor (summary, outcome, badge'ler).

**Neden önemli.** Ölü buton = tamamlanmamış iş sinyali; sahte-resmi badge = marka ihlali ve 'template' kokusu. `role='link'` taşıyan odaklanamayan span, ekran okuyucuda 'link, devre dışı' diye gereksiz gürültü yapar.

**Ne yapılmalı.** En az bir link dolana kadar StoreButtons'ı hiç render etme (`if (!stores?.appStore && !stores?.googlePlay) return null`). Yerine tek dürüst aksiyon: 'Join the TestFlight beta' veya 'Get notified at launch' (mailto:hello@alaz.pro?subject=Vocabulary launch) sitenin mevcut buton stiliyle. Uygulama yayına girince resmi badge SVG'lerini (developer.apple.com / play.google.com badge dosyaları) `<Image>` ile değiştirmeden kullan; ya da badge yerine sitenin kendi tipografisiyle düz metin link ('App Store ↗') kullan — bu kılavuzlara uygundur. Span'dan role/aria-disabled'ı kaldır.

#### `case-studies-18` — 'DELIVERABLE' marker'ları aslında feature ve sayfanın en işe yaramaz yerinde

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:149-156; messages/en.json projects[].markers, caseStudy.deliverableLabel; cs-d-vocab-next-hover.png (üst kısım), case-market-hours-desktop-full.png

**Sorun.** 'SPACED-REPETITION REVIEW', '17 WORD GAMES', '24 LANGUAGES', 'DST-AWARE MARKET ENGINE' birer deliverable değil, ürün özelliği/rakamı. 145px yüksekliğinde üç hücrede 15px'lik tek satır bold metin ve '0X / DELIVERABLE' eyebrow; galeriden sonra, next-project'ten hemen önce konumlanmış. Sayfada gerçek meta bilgi (yıl, rol, platform, stack, durum, link) hiç yok.

**Neden önemli.** Yanlış etiket güven zedeler ('deliverable' diyen ama proje teslimatı olmayan bir liste). Sayılar (17, 24, 44, 8000, 9, 10) bu sayfanın en güçlü kanıtları ama 15px'te saklanmış.

**Ne yapılmalı.** İki parçaya böl: (1) Hero altına proje facts strip: Year · Role (Design, iOS/Android, Backend) · Platform · Stack (Flutter, Firebase / Next.js, RevenueCat) · Status (Live / In beta) · Link. `projects[].facts` olarak veriye ekle, 12px mono etiket + 15-16px değer. (2) Sayıları hikâye içinde stat callout'a çevir: 3-4 adet, display font 96-160px, mevcut `CountUp` bileşeniyle viewport'a girince saysın, altına 2-3 kelimelik açıklama ('words', 'languages', 'exchanges covered'). Marker bloğunu ve 'DELIVERABLE' etiketini kaldır.

#### `case-studies-19` — Next-project: mobilde 'VOCABULAR Y' kırılıyor, masaüstünde görselsiz tek satır

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:158-163 ([overflow-wrap:anywhere], max-w-[80%], mobile:text clamp); case-market-hours-mobile-full.png ('VOCABULAR / Y'), cs-d-vocab-next-hover.png

**Sorun.** Mobilde 'NEXT PROJECT / 01' etiketi solda yer kapladığı için sağdaki span ~130px'e sıkışıyor ve `overflow-wrap:anywhere` 'VOCABULARY'yi 'VOCABULAR' + 'Y' olarak kelime ortasından kırıyor (ekran görüntüsünde doğrulandı). Masaüstünde blok yalnızca metin + lucide ok; hover sadece oku 10px kaydırıyor. Sayfanın son izlenimi düz bir satır.

**Neden önemli.** Kelime ortasından kırılan proje adı açık bir bug. Next-project bloğu Awwwards work sayfalarında en çok çalışılan parçalardan biridir (büyük görsel, scroll-to-continue); burada sayfanın en zayıf anı.

**Ne yapılmalı.** Bug: mobilde flex-col yap (etiket üstte, ad altta), `[overflow-wrap:anywhere]`'ı kaldır, ada `fit(next.name)` uygula, `whitespace-nowrap`. Tasarım: 60-70vh yüksekliğinde tam genişlik blok; next projenin hero görseli (`next.heroImage`) arka planda, hover/scroll'da clip-path inset(0 0 100% 0)→inset(0) ile açılır, görsel scale 1.1→1 (800ms [0.76,0,0.24,1]); üstte küçük 'Next' etiketi, ortada proje adı display boyutunda. İsteğe bağlı: blok %60 görünürken scroll ilerlemesini bir çizgiyle göster, sonuna gelince otomatik geçiş (Locomotive tarzı) — view transition ile birleşince imza olur.

#### `case-studies-22` — Reveal animasyonları jenerik, sayfa geçişi yok, hero koreografisi yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:71-90 ('mask' = opacity + translateY(.14em)), src/components/ScrollReveal.jsx, src/app/[locale]/layout.jsx:8,73-74 (NextTopLoader + SmoothScroll), src/app/[locale]/case-studies/[slug]/page.jsx:83,93-94

**Sorun.** Tüm reveal'lar aynı 0.6s fade+14px; 'mask' adı verilen efekt gerçek bir maske değil. Hero görselinin girişi, başlığın satır maskesi, index satırından detay hero'suna geçiş yok; sayfa değişimi hard-cut, üstte nextjs-toploader çubuğu (admin paneli hissi). Lenis var ama hiçbir scroll-bağlı hareket (parallax, sticky, progress) kullanılmıyor.

**Neden önemli.** Awwwards'ta 'Creativity/Design' kadar 'motion' da puanlanır; iki sayfa arası geçiş ve hero girişi jürinin ilk 5 saniyede gördüğü şeydir. Lenis'i yükleyip kullanmamak gereksiz 20KB.

**Ne yapılmalı.** (1) Başlıklar için gerçek line-mask: metni satırlara böl (SplitType veya basit `<span class='overflow-hidden block'><span class='block'>` sarmalayıcı), inner translateY(110%)→0, 900ms, ease [0.76,0,0.24,1], satır başına 80ms stagger. (2) Hero görseli: clip-path inset(0 0 100% 0)→0 + scale 1.15→1, 1.2s, başlıkla 150ms offset. (3) Index→detay paylaşılan eleman geçişi: next.config'de `experimental.viewTransition: true` (Next 15.2+) ve index thumbnail + detay hero `<Image>`'a `style={{viewTransitionName: `project-${slug}`}}`; CSS'te `::view-transition-old/new(project-*)` için 700ms ease. Alternatif: framer-motion `layoutId` + AnimatePresence'lı template.jsx. (4) NextTopLoader'ı kaldır; geçişte kısa bir perde/fade kullan. (5) Lenis scroll değeriyle hero görseline 8-10% parallax ve detay sayfasında sticky bölüm rail'i.

> **Doğrulayıcı notu:** globals.css:71-90 doğrulandı: tüm reveal'lar .6s cubic-bezier(.22,1,.36,1), 'mask' = opacity + translateY(.14em) (yorum da clip-path kullanmadığını söylüyor). layout.jsx:8,60-71 NextTopLoader (3px beyaz, glow) ve :73 SmoothScroll. grep: Lenis yalnızca SmoothScroll.jsx'te, hiçbir scroll-bağlı efekt yok. Düzeltme: 'Lenis'i yükleyip kullanmamak' yanlış — Lenis wheel smoothing yapıyor; doğru ifade 'Lenis'in scroll değeri hiçbir parallax/sticky/progress için kullanılmıyor'. Fix uygulanabilirlik: node_modules/next 15.5.26 (package.json ^15.1.6 olsa da), experimental.viewTransition mevcut. Line-mask + hero clip + view transition + toploader kaldırma önerileri somut.

### İNCE İŞÇİLİK

#### `case-studies-07` — Index satır yükseklikleri tutarsız: MARKET HOURS iki satıra kırılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:44 ([--fit-avail:...*.6_-_50px]); case-studies-desktop-full.png (satır 1 ≈200px, satır 2 ≈290px)

**Sorun.** fit() yalnızca en uzun kelimeyi sığdırdığı için 'MARKET HOURS' 1440px'te iki satıra kırılıyor; satır 1 200px, satır 2 ~290px. Liste ritmi bozuluyor.

**Neden önemli.** Sadece iki satırlık listede yükseklik farkı hemen göze çarpar; tipografik ritim craft göstergesidir.

**Ne yapılmalı.** Satır başlıklarında `whitespace-nowrap` kullan ve fit()'i tüm ad için çağır (fit.js'te `words` yerine tam stringi tek kelime gibi ölç: `fit(project.name.replace(/ /g,' '))` veya fit'e `nowrap` parametresi ekle). Ya da tüm satırlar için tek font-size hesapla (en uzun ada göre) ki iki satır aynı ölçekte dursun.

#### `case-studies-08` — Her yerde lucide ArrowUpRight/ArrowRight + metin içine gömülü '←'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:3,46; src/app/[locale]/case-studies/[slug]/page.jsx:3,43,96,161,169; messages/en.json caseStudy.allCaseStudies ("← ALL CASE STUDIES")

**Sorun.** Satır oku, CTA okları, next-project oku hepsi lucide default'u; 'ALL CASE STUDIES' linki ise çeviri stringinin içine gömülü unicode '←' kullanıyor. Üç farklı ok dili aynı sayfada.

**Neden önemli.** Lucide ikonları 'shadcn template' sinyali; ok, bu sitenin en sık tekrar eden grafik öğesi olduğu için markanın tek bir imza oku olmalı.

**Ne yapılmalı.** Tek bir custom `<Arrow />` SVG bileşeni (Archivo'nun stroke ağırlığına uygun, 1.5px, 45°) yap; hover'da 'çık-gir' animasyonu (ilk ok translate(100%,-100%) ile çıkar, ikincisi aynı anda girer, 350ms). Unicode '←' stringini temizle, yön prop'u ile aynı bileşeni kullan.

#### `case-studies-17` — Hero ile ilk bölüm arasında ~250px ölü boşluk

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:103-107 (pt-[35px] + pb-[90px]) ve 109 (py-[65px]); case-vocabulary-desktop-full.png (y≈835-1070 arası)

**Sorun.** Hero bitiyor, 'ALAZ / SELECTED WORK … 01 / 02' tek mono satır geliyor, sonra 90px + 65px padding; ilk gerçek içerik ('THE CHALLENGE') hero'nun bitişinden ~250px sonra başlıyor.

**Neden önemli.** Boşluk bir ritim aracı olmalı; burada sadece redundant bir etiketin etrafındaki dolgu. Scroll'da 'sayfa bitti mi?' hissi veriyor.

**Ne yapılmalı.** Satırı kaldır (bilgi hero'daki 'PROJECT / 01' ile zaten çift). Yerine hero'nun hemen altına proje meta tablosunu (facts strip, bkz. additions) koy: 4-6 sütun, border-t/border-b, py 28px. İlk içerik bölümüne pt 80-100px yeter.

> **Doğrulayıcı notu:** Yapı doğru: [slug]/page.jsx:103 pt-[35px], :104 pb-[90px], :109 py-[65px]. Ölçü düzeltmesi: probe'da hero alt kenarı 856px, ilk eyebrow ('01 / THE CHALLENGE') 1066px → boşluk 210px (~250 değil). 'ALAZ / SELECTED WORK … 01 / 02' satırı 'PROJECT / 01' ile çift bilgi. Fix (satırı kaldır, yerine facts strip, pt 80-100px) doğru.

#### `case-studies-20` — Kapanış CTA'sı filler: 'HAVE A COMPLEX CHALLENGE?' + küçük 'LET'S TALK'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:166-171; messages/en.json caseStudy.contactPrompt, contactCta; cs-d-vocab-next-hover.png (alt kısım)

**Sorun.** Next-project'ten sonra bir satırda 12px mono 'HAVE A COMPLEX CHALLENGE?' ve 49px'lik bordered 'LET'S TALK' butonu; hemen altında footer'daki dev 'ALAZ.' ve hello@alaz.pro zaten var.

**Neden önemli.** 'Complex challenge' genel ajans jargonu; iki CTA üst üste (bu + footer) hiyerarşiyi bulandırır ve bloğun kendisi görsel olarak ne next-project'e ne footer'a ait.

**Ne yapılmalı.** Bloğu kaldır ve iletişimi footer'a bırak; ya da next-project'in içine spesifik tek satır ekle: 'Building a learning app or a trading tool? Write to hello@alaz.pro' — 22-28px, altı çizili mailto, buton yok.

#### `case-studies-21` — Bilinmeyen slug 200 döndürüyor (soft 404)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:39-46 (inline 'PROJECT NOT FOUND.' render), doğrulama: curl /case-studies/does-not-exist → HTTP 200

**Sorun.** Proje bulunamayınca sayfa `notFound()` çağırmak yerine kendi içinde bir 'PROJECT NOT FOUND.' başlığı render ediyor; HTTP 200 dönüyor ve sitenin gerçek 404 sayfası/tasarımı kullanılmıyor.

**Neden önemli.** SEO açısından soft-404 (Google indexleyebilir), ayrıca sitede iki farklı 'bulunamadı' tasarımı yaşıyor.

**Ne yapılmalı.** `import { notFound } from 'next/navigation'` ve `if (!project) notFound();` (generateMetadata'da da aynı). 40-46 arası inline markup'ı ve `caseStudy.notFoundHeading/backToArchive` stringlerini sil; not-found.jsx tek kaynak olsun. Çeviri varyasyonları için `generateStaticParams` zaten en.json slug'larını üretiyor; `dynamicParams = false` ekleyerek bilinmeyen slug'ları build'de kapatabilirsin.

#### `case-studies-23` — Taksonomi tekrarlı ve ALL-CAPS mono 'IOS' marka adını bozuyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json projects[].discipline/type; src/app/[locale]/case-studies/page.jsx:44-45; src/app/[locale]/case-studies/[slug]/page.jsx:92; case-studies-desktop-full.png, case-vocabulary-desktop-fold.png

**Sorun.** Index'te ad altında 'MOBILE APPLICATION', SCOPE sütununda 'LANGUAGE LEARNING / IOS & ANDROID'; detay kicker'ında üçü birleşik 'LANGUAGE LEARNING / IOS & ANDROID / MOBILE APPLICATION' (mobilde iki satır). 'MOBILE APPLICATION' ile 'IOS & ANDROID' aynı bilgiyi iki kez veriyor; uppercase mono 'IOS' yazımı Apple'ın 'iOS'unu bozuyor. Yıl hiçbir yerde yok.

**Neden önemli.** Tekrar eden etiket, 'etiket için etiket' hissi yaratır; 'IOS' yazımı dikkatli bir mühendislik stüdyosu için küçük ama görünür bir özensizlik.

**Ne yapılmalı.** Tek bir meta satırı: 'Language learning · iOS & Android · 2025' (discipline/type alanlarını `category`, `platforms`, `year` olarak sadeleştir). Mono uppercase kullanılacaksa `text-transform` yerine metni elle yaz ve 'iOS' için `<span class='normal-case'>` ya da küçük-büyük harf karışık mono stil (uppercase'i bırak, tracking .06em yeter).

#### `case-studies-missed-1` — Hover preview'daki -rotate-4 sınıfı ölü kod

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:47 (-rotate-4 ve group-hover:-rotate-4); tailwind.config.js (rotate extend yok); probe: computed transform matrix(1,0,0,1,0,-65)

**Sorun.** Tailwind 3'ün default rotate skalasında 4 yok (0,1,2,3,6,12,45,90,180) ve config'de extend edilmemiş; sınıf hiçbir CSS üretmiyor. Thumbnail tasarlandığı gibi eğik değil, düz duruyor (cs-d-row-hover.png'de kenarlar eksenlere paralel).

**Neden önemli.** Niyet edilen görünüm ile üretilen görünüm farklı; bu tür ölü sınıflar 'kontrol edilmemiş' hissi verir ve ileride biri rotate-3'e düzeltip Dribbble-eğik thumbnail kalıbına geri dönebilir.

**Ne yapılmalı.** Sınıfı kaldır. case-studies-03'teki cursor-follow preview uygulanırsa zaten gereksiz; preview eğik olacaksa arbitrary değer kullan (-rotate-[4deg]) ama Awwwards listelerinde düz, büyük preview tercih edilir.

#### `case-studies-missed-2` — Index satır hover arka planı gutter'da kesiliyor, tam genişlik bant değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:40-42 (px-[gutter] container içindeki Link üzerinde hover:bg-[#141414]); probe: rowLeft 60.5px, rowRight 1379.5px; cs-d-row-hover.png

**Sorun.** Hover'da koyulaşan alan satırın kendisiyle sınırlı (x 60→1380), sol ve sağ gutter siyah kalıyor; satır bir 'liste bandı' değil kenarları içeride kalan bir kutu gibi okunuyor.

**Neden önemli.** Locomotive/Studio Freight tarzı work listelerinde hover bandı viewport'u kenardan kenara keser; kesik bant, çizgili tablo + inset kart karışımı hissi verir ve craft eksikliği gibi görünür.

**Ne yapılmalı.** Link'e `-mx-[var(--gutter)] px-[var(--gutter)]` ekleyip bg'yi tam genişliğe taşı (grid hizası korunur) ya da bg'yi `before:absolute before:inset-y-0 before:-inset-x-[var(--gutter)] before:-z-[1]` pseudo-elemanına ver. Alternatif: hover bg'yi tamamen kaldırıp yalnızca başlık rengi + preview ile çalış.

#### `case-studies-missed-3` — Index hero videosu reduced-motion ve saveData'yı yok sayıyor; repoda bunu çözen bileşen zaten var

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:29 (<video autoPlay preload='auto'>); src/components/BackgroundVideo.jsx (prefers-reduced-motion + navigator.connection.saveData + IntersectionObserver + preload='none')

**Sorun.** Hero videosu düz <video autoPlay> olarak basılıyor; reduced-motion isteyen ziyaretçide de 4.5 MB loop oynuyor ve indiriliyor. BackgroundVideo.jsx bunların hepsini ele alıyor ama yorumu 'above-the-fold heroes keep a plain autoplaying <video>' diyerek hero'ları dışarıda bırakıyor. Reveal'lar ve Lenis reduced-motion'a saygı gösterirken video göstermiyor — tutarsız.

**Neden önemli.** Awwwards accessibility puanı ve 'dikkatli stüdyo' algısı; sitenin geri kalanı reduced-motion'ı düşünmüşken en ağır medya düşünmemiş.

**Ne yapılmalı.** BackgroundVideo'ya `eager` prop'u ekle (IO yerine mount'ta src ata, preload='metadata') ve hero'da onu kullan; reduced-motion/saveData'da poster'da kal. JS'siz fallback için CSS: `@media (prefers-reduced-motion: reduce) { .hero-video { display:none } }`. case-studies-06'daki yeniden encode ile birlikte uygulanmalı.

#### `case-studies-missed-4` — Alt metinleri jenerik ve yanlış: 'VOCABULARY technical engineering visual', 'VOCABULARY app screenshot 3'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json caseStudy.imageAlt ('{name} technical engineering visual'), caseStudy.galleryAlt ('{name} app screenshot {number}'), archive.previewAlt; probe: heroImgAlt 'VOCABULARY technical engineering visual'

**Sorun.** Hero görseli sarı zemin üzerinde kedi maskot ve '8000' kartı; alt metni 'technical engineering visual' diyor. Yedi galeri görseli farklı ekranlar (kart, seviye, oyunlar, istatistik) ama hepsinin alt'ı 'app screenshot N'. Şablon alt metni, içeriğe bakılmadan üretilmiş.

**Neden önemli.** Ekran okuyucu ve görsel arama için bilgi sıfır; 'technical engineering visual' ifadesi kedi için absürt ve LLM-şablon kokuyor. Görsel içerik verisi (caption) zaten case-studies-13'ün fix'i için gerekli.

**Ne yapılmalı.** projects[].heroAlt ('Vocabulary mascot cat holding an 8000-word card on yellow') ve gallery'yi `{src, alt, caption}` nesnelerine çevir; imageAlt/galleryAlt şablonlarını sil. Market Hours hero: 'Dotted world map with NYSE, LSE, XETRA and BIST markers'.

#### `case-studies-missed-5` — Aynı sayfanın dört adı var: Case Studies / The Work / Archive / Index

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** Header nav 'CASE STUDIES' (case-studies-desktop-full.png); archive.heading 'THE WORK'; archive.eyebrowLeft/Right 'INDEX / 001', 'ARCHIVE / SELECTED WORK'; caseStudy.backToArchive 'BACK TO ARCHIVE'; archive.meta.title 'Case Studies — ALAZ Engineering'; bileşen adı ArchivePage

**Sorun.** Kullanıcı nav'da 'Case Studies'e tıklıyor, H1 'THE WORK.' görüyor, eyebrow 'ARCHIVE' ve 'INDEX' diyor, detaydan dönüş linki 'BACK TO ARCHIVE'. Meta ve breadcrumb 'Case Studies'.

**Neden önemli.** Adlandırma tutarsızlığı küçük ama her ekranda tekrar eden bir özensizlik; 'archive/index' sözcükleri ayrıca case-studies-01'deki sahte arşiv dilinin kaynağı.

**Ne yapılmalı.** Tek ad seç ('Work' öneririm: kısa, stüdyo dili) ve nav, H1, meta title, breadcrumb (seo.caseStudies), backToArchive ve URL'de (/work, eski /case-studies 301) tutarlı kullan. 'Archive' ve 'Index' sözcüklerini tüm stringlerden çıkar.

#### `case-studies-missed-6` — Token yerine tek seferlik gri değerler; nokta rengi üç sayfada üç farklı gri

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:87 text-[#bdbdbd], :92 text-[#c9c9c9], :93 text-[#8a8a8a], :94 text-[#d6d6d6]; case-studies/page.jsx:36 text-[#6e6e6e]; src/app/[locale]/page.jsx:136 text-[#5f5f5f]; globals.css'te --gray (#9fa3a9) ve --dim (#7e828a) token'ları var

**Sorun.** Detay sayfasında dört ad-hoc gri, index'te bir, ana sayfada bir; display başlıktaki imza 'gri nokta' ana sayfada #5f5f5f, index'te #6e6e6e, detayda #8a8a8a. Mevcut --gray/--dim token'ları bu sayfalarda yarım kullanılıyor.

**Neden önemli.** Gri nokta sitenin tek tipografik imzası; üç farklı tonda olması imzayı zayıflatır. Ad-hoc değerler ileride tema (proje rengi) uygulanırken kırılır.

**Ne yapılmalı.** globals.css'e `--period: #6e6e6e`, `--text-2: #d6d6d6`, `--text-3: #9fa3a9` ekle, tailwind colors'a period/text-2/text-3 olarak bağla; altı yerdeki arbitrary değerleri bunlarla değiştir. Proje teması (case-studies-14) gelince `--period` proje accent'ine bağlanabilir.

#### `case-studies-missed-7` — Kaldırılan ALPHA/BETA/GAMMA placeholder'larından kalan grayscale dalı ve colorImage bayrağı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:47 (colorImage ? … : '[filter:grayscale(1)]'); [slug]/page.jsx:83 ('[filter:grayscale(1)_brightness(.75)]' dalı); messages/en.json projects[].colorImage: true (her ikisi); next.config.mjs redirects (alpha|beta|gamma → /case-studies)

**Sorun.** Her iki proje colorImage:true olduğu için grayscale/brightness(.75) dalları hiç çalışmıyor; bayrak ve dallar, silinmiş placeholder projelerden kalma. Ana sayfadaki 'ALAZ / SPECIMEN … // ASSET IN PROGRESS' fallback'i de aynı dönemden.

**Neden önemli.** 'Görseli griye çevir' varsayılanı tam olarak brief'te anılan 'jenerik koyu brutalist' slop refleksi; ölü kod kalırsa yeni proje eklerken gri filtreli kart yine ortaya çıkar.

**Ne yapılmalı.** colorImage alanını ve üç yerdeki grayscale dallarını sil; görseller her zaman renkli. next.config'deki alpha/beta/gamma redirect'leri SEO için kalabilir.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Proje facts strip (meta tablosu)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Locomotive (locomotive.ca/en/work/*), Obys Agency case pages, Studio Freight — hepsinde hero altında yıl/rol/servis şeridi

Her detay sayfasında hero'nun hemen altına Year · Role · Platforms · Stack · Status · Link sütunlu, border-t/border-b bir şerit. Veri: `projects[].facts = [{label:'Year', value:'2025'}, {label:'Role', value:'Design, Flutter, Firebase'}, ...]`. 12px mono etiket üstte, 15-16px değer altta, 5-6 sütun, mobilde 2 sütun. Link değeri gerçek `<a>`. Bu, 'DELIVERABLE' bloğunun ve 'ALAZ / SELECTED WORK' satırının yerini alır.

### Market Hours için canlı 'open now' widget'ı

- **Etki:** yüksek · **Efor:** orta · **Referans:** Active Theory ve Lusion case study'lerinde ürün demo'sunun sayfaya gömülmesi; Linear/Vercel 'live' bileşenleri

Case study'nin içinde ürünün çekirdeğini çalıştır: client component, her borsa için `Intl.DateTimeFormat(undefined,{timeZone:'America/New_York', hour:'2-digit', minute:'2-digit'})` ile yerel saat, basit open/close aralığı (09:30-16:00 vb.) ve hafta sonu kontrolü; NYSE / LSE / XETRA / TSE / HKEX / BIST / ASX satırları, canlı UTC saati (1s interval), açık olanlar teal nokta, kapalılar gri, bir sonraki açılışa geri sayım. 24 saatlik yatay bar üzerinde şu anki dakika işaretçisi. Tatiller için statik küçük JSON. Bu bölüm 'Approach' metninin yanında durur ve 'DST-aware' iddiasını sayfanın kendisinde kanıtlar.

### Vocabulary için swipe-card galeri

- **Etki:** yüksek · **Efor:** orta · **Referans:** Tinder-card etkileşimi; Hello Monday'in ürün case'lerindeki fiziksel hissiyatlı demolar

Uygulama swipe-card tabanlı; galeri de öyle olsun. framer-motion ile 3 kart üst üste (`position:absolute`, scale .96/.92, y 12/24px), en üstteki `drag='x'`, `dragElastic .7`, `onDragEnd`'de |offset.x|>120 ise `animate({x: ±600, rotate: ±18})` sonra diziyi döndür; `useTransform(x, [-200,200], [-8,8])` ile rotate. Kartlar caption'sız ham ekranlar (1290×2796), altında hikâyeden tek satır caption ve 'Drag or press →' ipucu; klavye ok tuşları ve dots ile erişilebilir, `prefers-reduced-motion`'da basit slider. Mobilde dokunmatik doğal çalışır.

### Index → detay paylaşılan-eleman geçişi ve hero koreografisi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive, Unseen Studio ve Resn work geçişleri; Astro/Next view transitions örnekleri

next.config `experimental: { viewTransition: true }` (Next 15.2+); index'teki thumbnail/kapak ve detaydaki hero `<Image>`'a aynı `viewTransitionName: project-<slug>`; `::view-transition-group(project-*)` 700ms [0.76,0,0.24,1]. Geçiş bitince başlık line-mask (translateY 110%→0, 80ms stagger), facts strip fade, hero görseli scale 1.15→1. NextTopLoader kaldırılır. Fallback için framer-motion `layoutId` + `template.jsx` içinde AnimatePresence.

### Cursor-follow preview (index)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (studiofreight.com/work), Locomotive, Basement Studio liste hover'ları

Listeyi saran client component'te tek bir fixed `<div>` (440×275, overflow hidden); `pointermove` ile hedef konum, rAF'ta lerp(0.12) ya da `useSpring` (stiffness 150, damping 20); satıra girince clip-path inset(100% 0 0 0)→inset(0) 450ms + içerideki görsel scale 1.15→1; satır değişince görsel crossfade; `pointer: coarse` ve reduced-motion'da devre dışı (mobilde zaten her satırda görsel var). Görsel yazısız hero crop.

### Süreç / behind-the-scenes bölümü

- **Etki:** yüksek · **Efor:** orta · **Referans:** Basement Studio ve Rauno Freiberg'in 'how it's made' anlatımı; Obys'in süreç görselleri

Her projeye 2-3 gerçek artefakt: Vocabulary için tekrar programının SVG zaman çizelgesi (1-2-4-7-15-30 gün noktaları, scroll'da çizilen path: `stroke-dashoffset` animasyonu) ve 'learning rules are plain, tested code' iddiasını kanıtlayan 8-10 satırlık gerçek kod bloğu (JetBrains Mono, syntax highlight yok, sade); Market Hours için 24 saatlik halka üzerinde 9 borsanın açık aralıkları (SVG arc'lar) ve holiday data generator'ın çıktısından 5 satır. Figma frame'leri varsa 2 adet erken taslak. Her artefakt tek cümle caption ile.

### Proje başına tema değişkenleri

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive work sayfalarının proje rengine geçişi; Hello Monday

`projects[].theme = {bg, fg, accent}`; detay sayfası `<main style={{'--project-bg':..., '--project-fg':...}}>` ile hero ve next-project bloğunu projenin rengine boyar (Vocabulary sarı/siyah, Market Hours koyu/teal). Index satırları hover'da `background: var(--project-bg)` + yazı `var(--project-fg)` ile tınır; header logosu `mix-blend-mode: difference` ile sarı üzerinde okunur kalır. Geçişler 400ms.

### Sticky bölüm rail'i ve okuma ilerlemesi

- **Etki:** orta · **Efor:** orta · **Referans:** Lusion case study'leri, Unseen Studio uzun form sayfaları

Detay sayfasında sol gutter'da sticky (top: 50vh) mono liste: Challenge / Approach / Screens / Outcome; aktif bölüm IntersectionObserver ile beyaza döner, yanında 1px dikey çizgi scroll ilerlemesini gösterir (Lenis `scroll` eventinden `scaleY`). Numaralı eyebrow'ların yerini alır; mobilde gizli.

### Kısa ürün video loop'ları

- **Etki:** yüksek · **Efor:** orta · **Referans:** Resn ve Active Theory case sayfalarındaki inline loop'lar

Her projede 1-2 adet 8-15 saniyelik sessiz ekran kaydı (Vocabulary: kart kaydırma + sesli telaffuz anı; Market Hours: haritada bir borsa açılırken, alarm kurulumu). AV1 webm + H.264 mp4 fallback, 1080p, ≤2 MB, `preload='metadata'`, görünürken `play()`, poster olarak ilk kare. Telefon çerçevesi yerine görseli doğrudan kırpılmış kullan (çerçeve istenirse ince 1px radius'lu div).

### Büyük sayı callout'ları (CountUp ile)

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys ve Basement stat blokları

Hikâyenin içine 3-4 stat: Vocabulary 8000 words / 24 languages / 17 games / 44 decks; Market Hours 9 exchanges / 4 sessions / 10 alarm sounds. Display font 96-160px (fit() ile), mevcut `src/components/CountUp.jsx` viewport'a girince sayar (reduced-motion'da statik), altında 2-3 kelimelik açıklama. Bu, 'DELIVERABLE' marker'larının yerine geçer ve sayfaya ritim değişimi verir.

### 'What we'd do differently' paragrafı

- **Etki:** orta · **Efor:** küçük · **Referans:** Rauno Freiberg, Paco Coursey tarzı kişisel/dürüst case anlatımı; jürinin 'gerçek stüdyo' algısını güçlendirir

Her case'in Outcome'ından sonra 3-4 cümlelik dürüst bir 'Learnings / what's next' notu (ör. Vocabulary: widget'ın Android'de gecikmesi; Market Hours: half-day takvimlerinin elle doğrulanması). `projects[].learnings` alanı, aynı gövde stiliyle.
