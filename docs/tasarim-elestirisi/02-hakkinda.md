# Hakkında sayfası

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 22 (5 kritik · 9 önemli · 8 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Hakkında sayfası teknik olarak temiz kurulmuş bir editoryal şablon: dev Archivo başlık, mono eyebrow, iki kolon metin, numaralı liste, slogan + buton. Ama sayfanın tamamında tek bir özel isim, yüz, yıl, müşteri ya da gerçek artefakt yok; "WE ENGINEER PERMANENCE / NOT AN AGENCY / FOUR MOVES ZERO GUESSWORK / GOOD SYSTEMS ARE INVISIBLE" dizisi herhangi bir ajansın yazabileceği manifesto dili. Brief'te sayılan slop sinyallerinden üçü birebir mevcut: "POWERED BY GOOGLE / CLAUDE" rozeti, her bölümde "STUDIO / 001"–"01 / 04" sahte arşiv notasyonu ve üç adet stok CGI video (halkalar, pürmüz, dişliler) iki katman gradient altında çamura dönmüş. Principles ve disciplines bölümleri yorum satırına alındığı için numaralandırma 01'den 04'e atlıyor, hero eyebrow'u ve meta title hâlâ olmayan "principles/manifesto"yu vaat ediyor. Sayfanın tek gerçek fikri (alaz = alev) uydurma bir "demirciler ve çobanlar" hikâyesiyle şişirilmiş ve görsel olarak saklanmış. Şu haliyle "iyi yapılmış AI-dark-brutalist şablon"; Awwwards seviyesine çıkması için önce kimlik (kim, nerede, ne zamandan beri, ne yaptınız), sonra tek motif (alev) ve gerçek giriş/scroll koreografisi gerekiyor.

## Korunması gerekenler

- Masaüstü hero'nun tipografik ölçeği (≈168px Archivo 900, −.075em tracking, .86 leading) gerçekten güçlü; `fit()` sisteminin en geniş kelimeyi em genişliğinden hesaplayıp font boyutunu kolona kilitlemesi akıllıca ve nadir görülen bir mühendislik (src/lib/fit.js, globals.css .fit).
- Siyah-beyaz disiplin: gradient, neon, glow, cam efekti yok; `--radius: 0`. Bu kısıtlama korunmalı.
- "Alaz = alev" fikri sayfanın tek gerçek kimlik kancası; hikâyenin uydurma kısmı atılıp gerçek anlam görsel motif haline getirilirse site geneline yayılacak bir fikir.
- Process paragraflarının sesi insani ve spesifik ("before anyone opens an editor", "a system exists on a whiteboard before it exists in a repo", "shipping is the halfway point"); bu ton korunup başlıklara da taşınmalı.
- İki gerçek ofis (New York + İzmir) somut bir dünya; adres satırı olarak değil hikâyenin parçası olarak kullanılmalı.
- BackgroundVideo.jsx: IntersectionObserver ile tembel src, ekran dışında pause, reduced-motion ve saveData saygısı; doğru yapılmış.
- Reveal sistemi JS olmadan içeriği gizlemiyor (`reveal-ready` sınıfı head script'iyle), reduced-motion'da transition kapanıyor; temel sağlam, üstüne gerçek koreografi kurulabilir.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `about-01` — "POWERED BY GOOGLE / CLAUDE" rozet satırı

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:45 (PoweredBy, import :9); src/components/PoweredBy.jsx; about-desktop-fold.png (sol alt), about-mobile-fold.png (iki satır halinde hero'nun son elemanı)

**Sorun.** Hero'nun en altında "POWERED BY [G] GOOGLE | POWERED BY [✳] CLAUDE" satırı. Google ve Claude stüdyonun ortağı değil, kullandığı araçlar; "powered by" bir ürünün altyapısı için kullanılır, bir stüdyonun About sayfası için anlamsız. Mobilde iki satıra kırılıp fold'un son sözü oluyor.

**Neden önemli.** Brief'te adıyla sayılan slop sinyali ("powered by Google / Claude badges"). Stüdyonun kendi yetkinliğini başka markalara yaslaması; jüri için "AI builder ile üretilmiş" damgası.

**Ne yapılmalı.** Satırı ve import'u sil. Hero'nun alt sınırını intro paragrafı kapatsın: `pb-[75px]` yerine section'a `pb-[clamp(56px,6vw,96px)]`. Stack'i söylemek istiyorsanız about-05'teki "Who" bölümünde logo değil düz metin: "We work in Next.js, Flutter, Postgres and whatever the problem actually needs."

#### `about-02` — Sahte arşiv notasyonu: STUDIO / 001, ALAZ / MANIFESTO 2026, 01 / 04

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:41 (eyebrowLeft/Right), :44 (introNote), :52 (originEyebrow), :73 (processEyebrow), :75 (`{step.number} / 04`); messages/en.json about.eyebrowLeft, eyebrowRight, introNote, originEyebrowLeft/Right, processEyebrowLeft/Right; about-desktop-fold.png (üst çizgi), about-desktop-full.png (her bölüm başı)

**Sorun.** Her bölüm aynı iskeletle açılıyor: üst çizgi + sol "KOD / 001" + sağ SLOGAN. "STUDIO / 001" ne sayfa numarası ne sıra; aynı kalıp Services'ta "SERVICES / 001", Blog'da "BLOG / 001", Case Studies'te "INDEX / 001" olarak tekrar ediyor (en.json:149, 499, 583, 640). Sağ altta "ALAZ / MANIFESTO 2026" sahte belge künyesi, process satırlarında "01 / 04" sayacı. Hiçbiri bilgi taşımıyor.

**Neden önemli.** Brief'in "01 / 05 index eyebrows on every section" diye tarif ettiği slop birebir. Teknik görünmek için eklenmiş dekor; jüri bunu iki saniyede tanır ve sayfanın geri kalanını buna göre okur.

**Ne yapılmalı.** Bölüm başlıklarını tek `SectionRule` bileşenine indir, kodları kaldır. Solda bölümün gerçek adı sentence case ("The name", "How a project runs"), sağda ya hiçbir şey ya da gerçekten veri olan bir şey (origin bölümünde kaynak: "TDK, Güncel Türkçe Sözlük"; process'te "Typical engagement: 8–14 weeks"). "ALAZ / MANIFESTO 2026" notunu sil. Adım sayaçlarını kaldır; numara şartsa başlığın parçası olarak tek büyük rakam ("1"), "/ 04" olmadan.

#### `about-04` — ALAZ köken hikâyesi kaynaksız/uydurma ve sözlük-kartı pastişi

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** en.json about.originLabel ("ALAZ, N. / TURKISH, ARCHAIC"), about.originDefinition, about.originParagraphs[0]; page.jsx:53-59; about-desktop-full.png (ALAZ bölümü)

**Sorun.** "Blacksmiths and shepherds used it for the moment a fire ... gets hot enough to actually shape metal" ve "the point where fire stops smoldering and starts doing real work" için hiçbir kaynak yok. TDK Güncel Türkçe Sözlük'te "alaz" = "alev, yalım" (halk ağzı); "alazlamak" = "alevden geçirmek, hafifçe yakmak". "Archaic" etiketi de yanlış, kelime bugün isim olarak da yaşıyor. Sunum biçimi AI sitelerinin klasik "KELİME, n. / tanım" sözlük kartı kalıbı.

**Neden önemli.** Sitenin TR versiyonu var; Türkçe bilen her ziyaretçi ve İzmir'deki her müşteri hikâyenin şişirildiğini anlar. "Fake-sounding content" doğrudan slop sinyali ve güven kaybı. Oysa gerçek anlam zaten yeterince güçlü.

**Ne yapılmalı.** Gerçek tanımı kullan, kaynağı küçük yaz: "alaz — flame (Turkish, regional). alazlamak — to pass something through flame: a quick burn that cleans without destroying." Altına tek paragraf, kelimeyi kim seçtiyse onun ağzından ve adıyla ("I picked it because..."). "Blacksmiths and shepherds" cümlesini sil ya da gerçek kaynak ekle (Derleme Sözlüğü maddesi, yöre). Sözlük kartı yerine kelimeyi büyük yaz, altına serif italik (Instrument Serif / Newsreader) tek satır tanım koy; bu tipografik kontrast sayfanın tek "insan" anı olur.

#### `about-05` — Sayfada stüdyo yok: insan, isim, yıl, yer, iş yok

- **Önem:** KRİTİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** Tüm sayfa; about-desktop-full.png, about-mobile-full.png

**Sorun.** Altı bölüm boyunca tek bir özel isim, yüz, tarih, müşteri ya da gerçek artefakt yok. Kaç kişi olduğunuz, ne zamandan beri, nerede (iki ofis sadece adres satırı), ne yaptığınız (case study'lere link bile yok) belirsiz. "Gerçek stüdyo kimliği mi, jenerik manifesto mu?" sorusunun cevabı: jenerik manifesto.

**Neden önemli.** Awwwards seviyesindeki stüdyo sayfalarının ortak noktası spesifiklik: Basement'ın ekip fotoğrafları, Locomotive'in Montréal'i, Studio Freight'ın isimleri. Herkesin yazabileceği soyut metin, AI slop'un tanımıdır.

**Ne yapılmalı.** Origin ile process arasına "Who" bölümü: kurucuların adı, rolü, birer cümle; aynı seansta, aynı ışıkla çekilmiş siyah-beyaz portreler (3:4, hafif grain, `object-position` ile göz hizası sabit); kuruluş yılı; İzmir + New York için `Intl.DateTimeFormat(locale,{timeZone:'Europe/Istanbul',hour:'2-digit',minute:'2-digit'})` ile canlı saat (gerçek veri, sahte status pill değil); gerçekten kullandığınız stack düz metin. Sayı yalnızca doğruysa (CountUp.jsx var ama hiçbir yerde kullanılmıyor). Kapanışta 2 case study'ye görselli link (about-19).

#### `about-06` — Slogan dili: "NOT X. Y." negasyon tiki ve soyut isimler

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** en.json about.kicker, heading, introText, processHeading, endTextTop/endTextBottom; page.jsx:42-44, :74, :80; about-desktop-fold.png, about-desktop-full.png (kapanış)

**Sorun.** "NOT AN AGENCY. AN ENGINEERING PRACTICE." ve "GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T." aynı negasyon kalıbı; "WE ENGINEER PERMANENCE" soyut isimle hero; "simple enough to trust, strong enough to endure" kiazmus; "FOUR MOVES ZERO GUESSWORK" kafiyeli slogan. Hepsi büyük harf, hepsi birbirinin yerine konabilir.

**Neden önemli.** Brief'in "NO BULLSHIT. JUST ACTION." / "engineered to last" örnekleriyle aynı sınıf. Bu cümleleri yüz ajans yazabilir; stüdyoya özgü tek kelime yok. Jüri copy'yi okur.

**Ne yapılmalı.** Hero'da doğrulanabilir, birinci çoğul bir cümle: "A two-person software studio in İzmir and New York. We build the web and mobile products you'll still be running in 2031." (sayılar gerçeğe göre). Kicker'ı sil. Intro'yu somut yap: "Since 2019: 14 products shipped, 11 still on their first codebase." gibi, yalnızca doğruysa. "FOUR MOVES ZERO GUESSWORK" → "How a project runs here". Kapanış slogan değil davet: "Tell us what you're building. We reply within a business day, with an actual opinion." Büyük harf yalnızca display kelimelerde, gerisi sentence case.

### ÖNEMLİ

#### `about-03` — Bölüm numarası 01'den 04'e atlıyor; eyebrow ve meta, olmayan "principles" bölümünü vaat ediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:63-71 (yorum satırındaki principles + disciplines blokları), :41 ("OUR OPERATING PRINCIPLES"), :52 ("01 / THE NAME"), :73 ("04 / HOW WE OPERATE"), :24-28 (kullanılmayan `services`, `disciplinesHeading`, `principles`); en.json about.meta.title/description, about.principles*, about.disciplines*, imageAlt/imageCaption (:518), breakImageAlt/breakImageCaption (:544-545); src/app/[locale]/layout.jsx:56-57 (images.hostinger.com preconnect); about-desktop-full.png (y≈470 "01 / THE NAME" → y≈900 "04 / HOW WE OPERATE")

**Sorun.** Sayfada iki numaralı bölüm var ama 01 ve 04 diye etiketlenmiş; 02 (manifesto) ve 03 (disciplines) JSX'te yorumda. Hero eyebrow'u "OUR OPERATING PRINCIPLES", `<title>` "The Engineering Manifesto", description "Data over dogma, brutal efficiency" diyor; hiçbiri render edilmiyor. en.json'da "FIG. 01 — THE PRACTICE OF PRECISION", "FIG. 02 — THE SYSTEMS THAT CONNECT" ve hostinger AI-render alt metinleri ("Architectural engineering laboratory with precision workstations") ölü anahtar olarak duruyor; layout her sayfada hostinger'a preconnect yapıyor ama About oradan hiçbir şey çekmiyor.

**Neden önemli.** Craft: okuyucu atlamayı görür ("bölüm mü eksik?"). SEO metni sayfayla çelişiyor. Ölü içerik, ileride "FIG. 01" künyeli AI stok görsellerin geri gelme riski — bu ikisi brief'te ayrı ayrı sayılan slop sinyalleri.

**Ne yapılmalı.** Yorumdaki iki bloğu, kullanılmayan değişkenleri ve ölü JSON anahtarlarını (principles*, disciplines*, imageAlt/Caption, breakImage*) sil. `generateMetadata` title → "About — ALAZ", description → sayfadaki gerçek içerikten (ismin anlamı, iki ofis, nasıl çalıştığınız). eyebrowRight'ı kaldır (about-02). layout.jsx:56-57'yi kaldır. Görsel gerekiyorsa yalnızca kendi çektiğiniz fotoğraflar; "FIG." yerine küçük harf, düz caption: "İzmir studio, March 2026".

> **Doğrulayıcı notu:** Olgular doğru: :63-71 iki blok yorumda, :24/:27/:28 `services`/`disciplinesHeading`/`principles` kullanılmıyor, en.json:517-518 ve :544-545 "FIG. 01/02" + hostinger AI-render alt metinleri ölü, `<title>` "About ALAZ — The Engineering Manifesto" ve description "Data over dogma, brutal efficiency" sayfada yok; görünür numaralandırma "01 / THE NAME" (y=1056) → "04 / HOW WE OPERATE" (y=2013). layout.jsx:56-57 preconnect: `grep hostinger src/` yalnızca layout.jsx ve mailer.js (SMTP) döndürüyor, images.hostinger.com'dan hiçbir sayfa görsel çekmiyor; yani preconnect About'a değil tüm siteye ölü, kaldırmak güvenli. Şiddet düzeltmesi: ziyaretçinin gördüğü tek belirti 01→04 atlaması ve sayfayla çelişen meta; ölü anahtarlar ve FIG. künyeleri render edilmiyor, dolayısıyla aktif slop sinyali değil, net bir craft açığı → major.

#### `about-07` — Üç stok CGI video, gradient altında çamura dönmüş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:35-39 (about-section.mp4: dönen metalik halkalar + küre), :48-50 (about-alaz-section.mp4: pürmüz alevi), :77-79 (about-end-section.mp4: dişli çarklar); public/videos/*.mp4 (1280×720, 10 sn, H.264 ~1.7 Mbps + sessiz AAC kanalı); about-desktop-fold.png (headless'ta codec olmadığı için siyah; gerçek tarayıcıda halkalar ~%40 parlaklıkta)

**Sorun.** Hero'da "gyroscope rings", kapanışta "steampunk gears": stok 3D loop'larının en klişe ikisi, sayfanın tek fikriyle (alev) ilgisiz. Üçü de opacity .5–.55 + iki gradient katmanıyla neredeyse görünmez; 1440px'te 720p upscale, retina'da 4× bulanık. Aynı numara üç kez, toplam 7.2 MB.

**Neden önemli.** Stok/CGI görsel brief'teki slop sinyali; "doku diye koyulmuş video" jüri için "fikir yok" demek. Dimmed video, karanlık brutalist şablonun en tanıdık işareti.

**Ne yapılmalı.** Halkaları ve dişlileri kaldır. Alevi tek motif yap (about-08). Hero arka planı düz #0a0a0a + ince grain (SVG `feTurbulence baseFrequency=.8` overlay, opacity .05); ölçeği tipografi taşısın. Video kalacaksa: 1920×1080, H.265/AV1 + WebM, `ffmpeg -an` ile ses kanalı atılmış, gerçek ilk kareden poster (şu an poster.png düz #090909), opacity 1 ve kırpılmış bir figür çerçevesinde.

#### `about-08` — Alev videosu (tek on-concept asset) görünmez; origin bölümünde boşluk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:48-60; about-desktop-full.png (ALAZ bölümü: sol 680px paragraf, sağda 230px tanım, arası boş)

**Sorun.** Alev videosu opacity .5 ve .55→.4→1.0 gradient altında full-bleed; sayfanın isimle ilgili tek görsel kanıtı seyredilemiyor. Düzen: 680px paragraf kolonu, ortada ~400px siyah boşluk, sağda 230px'lik tanım.

**Neden önemli.** Craft: en iyi malzemeyi saklamak. "Alaz = alev" sayfanın tek gerçek fikri ama görsel olarak kurulmamış.

**Ne yapılmalı.** Videoyu `aspect-[4/5]` bir `<figure>`'a al ve sağ kolon yap (`grid-cols-[1fr_minmax(320px,38%)]`), opacity 1, gradient yok, altında küçük harf caption. Alternatif, daha iddialı: alevi ALAZ başlığının içine maskele (SVG `<mask>` içinde `<text>` + arkada video, ya da `mix-blend-mode: screen`); harfler alevle dolar, başka hiçbir bölümde video gerekmez. Paragrafları `max-w-[52ch]`'e indir, tanımı serif italik yap (about-04).

#### `about-09` — Hero giriş koreografisi tutarsız; "mask" reveal mask değil

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:41 (`data-reveal="line"`), :43 (`data-reveal="mask"`), :42/:44/:45 (reveal yok); src/app/globals.css `.reveal-ready [data-reveal="mask"]` (sadece opacity + translateY(.14em)); src/components/ScrollReveal.jsx

**Sorun.** Sayfa açılınca eyebrow fade, h1 .14em yükselerek fade olurken kicker, intro paragrafı, sağ not ve powered-by anında beliriyor. Göz önce küçük metinleri, 0.6 sn sonra başlığı görüyor. CSS yorumunda itiraf edildiği gibi "mask" clip-path yapmıyor.

**Neden önemli.** İlk saniye jürinin en çok baktığı an; parça parça gelen hero "bitmemiş" okunur. Awwwards sitelerinde başlık satır satır maskeden çıkar.

**Ne yapılmalı.** Hero'yu tek timeline yap: 0ms çizgi `scaleX 0→1` (800ms, expo.out); 100ms h1 satırları: her satır `overflow:hidden` sarmalayıcı + iç `<span>` `translateY(110%)→0` (1000ms, `cubic-bezier(.16,1,.3,1)`, 80ms stagger) — gözlemlenen sarmalayıcı olduğu için zero-area sorunu kalmaz; 500ms intro fade + 8px; 650ms sağ not. GSAP timeline ya da framer-motion `variants` ile; `prefers-reduced-motion`'da hepsi 0ms.

#### `about-10` — Process bölümü: dört fiil, sıfır kanıt

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:72-76; en.json about.processSteps; about-desktop-full.png (DISCOVER / ARCHITECT / ENGINEER / HARDEN satırları)

**Sorun.** "DISCOVER → ARCHITECT → ENGINEER → HARDEN": her ajansın "Discover/Design/Develop/Deliver"inin sinonimi. Satırlarda etkileşim yok, görsel yok; 65px kelime + 15px gri paragraf. Paragrafların kendisi iyi ("before anyone opens an editor", "whiteboard before repo") ama başlıklar jenerik.

**Neden önemli.** Jenerik süreç listesi template sinyali; iyi copy kanıtsız kalıyor.

**Ne yapılmalı.** Başlıkları yaptığınız şeyin cümlesine çevir: "We write the brief before the code", "The whiteboard comes before the repo", "Ship in slices", "Launch is halfway". Her adıma gerçek bir artefakt: discovery doc'tan üç satır, gerçek bir mimari eskiz fotoğrafı, bir PR/CI ekran görüntüsü, bir k6/Grafana load-test grafiği (kendi projelerinizden, anonimleştirilmiş). Düzen: sol `position:sticky; top:120px` başlık, sağda artefakt kartları kayar; ya da GSAP ScrollTrigger ile pin. Hover'da satır arka planı #111, artefakt `scale(1.02)` 400ms.

#### `about-12` — Contact bloğu footer'ı birebir tekrarlıyor

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** page.jsx:82-87 (CONTACT / hello@alaz.pro / `<ContactInfo large />`) ve src/components/Footer.jsx (aynı e-posta + aynı iki adres); about-desktop-full.png (y≈1680 ve y≈1800), about-mobile-full.png (arka arkaya iki ekran aynı adresler)

**Sorun.** Sayfa sonunda CONTACT bloğu, hemen altında footer; ikisinde de hello@alaz.pro, New York ve İzmir adresleri. Mobilde iki tam ekran aynı metin.

**Neden önemli.** Tekrar = kontrolsüzlük; jüri scroll'un sonunda bunu görür.

**Ne yapılmalı.** 82-87 satırlarını kaldır. About'a özgü kapanış istiyorsanız footer'da olmayan bir şey: kurucuların kişisel e-posta/LinkedIn'i ya da about-19'daki case-study kartları.

#### `about-14` — Mobil hero küçük ve havada

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:43 (`mobile:[--fit-size:clamp(60px,12.5vw,100px)]`), src/lib/fit.js, globals.css `.fit`; src/app/[locale]/layout.jsx:15 (Archivo yalnızca 600/700/900 statik ağırlıklar); about-mobile-fold.png

**Sorun.** 390px'te `--fit-em` 7.872 ("PERMANENCE.") → font boyutu (390−48)/7.872 ≈ 43px; mobil h1, masaüstündeki process h3'lerinden küçük. Üstte pt-100 + mt-85, altta mb-70; fold'un yarısı boş, powered-by iki satır.

**Neden önemli.** Mobilde hero'nun ölçeği yok; Awwwards mobil değerlendirmesinde ilk ekran bu.

**Ne yapılmalı.** Archivo variable font'un wdth ekseni (62–125) var: `Archivo({ weight: 'variable', axes: ['wdth'] })` ve mobil h1'e `font-stretch: 78%` → aynı kelime ~55px'e çıkar; fit.js'e wdth için katsayı ekle (`em * 0.8`). Boşlukları sıkıştır: `mobile:pt-[88px]`, kicker kalkınca `mt-[48px]`, `mb-[36px]`. Hero'ya `min-h-[100svh]` ver, intro'yu alta yasla.

> **Doğrulayıcı notu:** Ölçüm: 390px'te h1 43.45px, 75px yükseklik → 844px viewport'un ~%9'u; masaüstü process h3'leri 60.48px (iddia doğru). `--fit-em` 7.872 ("PERMANENCE.") fit kapağı `mobile:[--fit-size:clamp(60px,...)]` tasarım minimumunu sessizce eziyor. Boşluklar: pt-100 / mt-85 / mb-70 kodda doğru; PoweredBy iki satır. Düzeltme: "fold'un yarısı boş" abartılı — hero section 695px, yani ilk ekranın alt ~150px'i bir sonraki bölümün boş üst padding'i; doğru ifade "h1 ilk ekranın %9'u, hero viewport'u doldurmuyor". Archivo'nun wdth ekseni (62–125) next/font font-data.json'da doğrulandı, `weight:'variable', axes:['wdth']` çalışır; fit.js ADVANCE tablosu wdth 100'de ölçüldüğü için font-stretch kullanılırsa katsayı şart (reviewer bunu söylemiş). Şiddet major kalır.

#### `about-16` — Hero videosu teslimi: preload auto, reduced-motion yok, ses kanalı var, poster boş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:36-37; public/videos/about-section.mp4 (h264 1280×720 1.63 Mbps + aac 128 kbps); public/videos/poster.png (düz #090909); karşılaştır: src/components/BackgroundVideo.jsx

**Sorun.** Hero `<video preload="auto" autoPlay>`: 2.2 MB mobilde hemen iniyor; `prefers-reduced-motion` ve `saveData` kontrolü yok (BackgroundVideo'da var, hero'da yok). Üç videoda da sessiz AAC kanalı (~160 KB/dosya boşa). Poster düz gri; video başlayınca pop-in.

**Neden önemli.** Performans + erişilebilirlik tutarsızlığı; LCP'yi video poster'ı belirler.

**Ne yapılmalı.** about-07 uygulanırsa hero videosu kalkar. Kalırsa: `preload="metadata"`, `<source media="(max-width:760px)">` ile ayrı mobil encode, `ffmpeg -i in.mp4 -an -c:v libx264 -crf 24 -movflags +faststart`, gerçek ilk kareden poster, hero'yu da BackgroundVideo'ya taşı (reduced-motion → poster).

> **Doğrulayıcı notu:** Olgular doğru (preload=auto, autoplay, reduced-motion kontrolü yok, AAC 128 kbps × 10 s ≈ 160 KB/dosya, poster düz #090909). Ama eksik ölçülmüş: Playwright request log'unda sayfa yüklenir yüklenmez HEM /videos/about-section.mp4 (2.2 MB) HEM /videos/about-alaz-section.mp4 (2.4 MB) isteniyor — masaüstünde de mobilde de. Sebep: BackgroundVideo'nun `rootMargin: '300px 0px'` eşiği; hero masaüstünde 926px (900 vh), mobilde 695px (844 vh) olduğu için origin bölümü yüklemede zaten 'kesişiyor' ve src atanıp play() çağrılıyor. İlk yüklemede ~4.6 MB video. Fix'e ek: rootMargin'i 0'a çek ya da `requestIdleCallback`/LCP sonrası tetikle; mobil için ayrı düşük bit-rate kaynak. Bu büyüklükte veri Awwwards performans kriterinde majör.

#### `about-missed-1` — Kapanış cümlesi display yüzünde değil: Inter 800 ile dizilmiş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/about/page.jsx:80 (`<p className="text-[length:clamp(30px,4.5vw,72px)] font-extrabold tracking-[-.07em] leading-[1.05]">`); about-probe/desktop-end.png (üst)

**Sorun.** Sayfadaki her display satırı (h1, ALAZ., FOUR MOVES, DISCOVER…) Archivo 900/700 iken "GOOD SYSTEMS ARE INVISIBLE. / THE IMPACT ISN'T." paragrafında `font-display` sınıfı yok; body fontu (Inter) ile 800 ağırlıkta, masaüstünde 64.8px, mobilde 30px render ediliyor (ölçülen fontFamily: Inter stack'i). Crop'ta G ve S formları h1'den belirgin biçimde farklı. Not: sandbox'ta Inter indirilemediği için (dev.log: "Failed to download `Inter`") ekran görüntülerinde yedek yazı tipi görünüyor; canlı sitede Inter ExtraBold olacak, sorun aynı.

**Neden önemli.** Aynı sayfada iki farklı display yüzü: en görünür kapanış satırı tipografik sistemden kopuyor; jürinin tek bakışta yakalayacağı tutarsızlık. Semantik olarak da bir `<p>`, başlık değil.

**Ne yapılmalı.** Satırı `<h2>` yap ve diğer display başlıklarla aynı reçeteyi ver: `font-display font-black tracking-[-.075em] leading-[.86]` + `style={fit(['GOOD SYSTEMS ARE INVISIBLE.','THE IMPACT ISN\'T.'])}` ile `.fit [--fit-size:clamp(44px,7vw,112px)]`. İkinci satırın `text-[#777]` grisini de about-13'teki tek token'a bağla. (about-06 uygulanırsa metin değişir ama kural aynı kalır.)

### İNCE İŞÇİLİK

#### `about-11` — Mobilde "01 / 04" sayacı iki satıra kırılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:75 (`mobile:grid-cols-[45px_1fr]`); about-mobile-full.png (her adım satırının solunda "01 /" alt satırda "04")

**Sorun.** Mono 12px + .085em tracking'de "01 / 04" ≈ 58px; kolon 45px. Dört satırda da kırık.

**Neden önemli.** İlk bakışta görünen dizgi hatası.

**Ne yapılmalı.** about-02 ile sayaç kalkarsa sorun yok. Kalacaksa `mobile:grid-cols-[64px_1fr]` + `whitespace-nowrap`, ya da mobilde sadece "01".

#### `about-13` — Gri nokta imzası tek sayfada dört kez, üç farklı gri

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:43 (PERMANENCE▪ `#6e6e6e`), :54 (ALAZ▪ `#6e6e6e`), :74 (GUESSWORK▪ `#777`), Footer.jsx (ALAZ▪ `#858585`) + header logosu; about-desktop-full.png

**Sorun.** Logonun imzası olan gri kare-nokta her display başlığa eklenmiş; renk değeri üç yerde farklı.

**Neden önemli.** Bir imza tekrarlanınca süse dönüşür; farklı griler özensizlik sinyali.

**Ne yapılmalı.** Noktayı logo ve en fazla hero h1 ile sınırla; origin ve process başlıklarından kaldır. Tek token `--dot: #6e6e6e`.

> **Doğrulayıcı notu:** Değerler doğru: h1 ve origin h2 rgb(110,110,110) #6e6e6e, process h2 rgb(119,119,119) #777, header logosu #777, footer rgb(133,133,133) #858585 → sayfada beş nokta, üç farklı gri. Ama bu bir polish meselesi: üç değer 20 birim içinde ve nokta 12–230px arasında değişen boyutlarda; "clearly below the bar" değil. Şiddet → minor. Fix (noktayı logo + h1 ile sınırla, tek `--dot` token) yerinde.

#### `about-15` — Kapanış CTA: beyaz dikdörtgen + lucide ok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:80 (`bg-white ... <ArrowUpRight size={17} />`, hover `translateY(-2px)`); about-desktop-full.png (y≈1530)

**Sorun.** Beyaz blok buton, 12px extrabold büyük harf, lucide `ArrowUpRight`; hover sadece −2px kalkma + gri. Header'daki butonla aynı; sayfanın tek etkileşimli elemanı en jenerik haliyle.

**Neden önemli.** shadcn/lucide varsayılanı hissi; Awwwards'ta buton bir micro-interaction fırsatıdır.

**Ne yapılmalı.** Siteye özel tek buton dili: metin + altı çizgi (`scaleX 0→1`, `transform-origin:left`, 400ms) ya da ok için "double arrow" tekniği (overflow hidden, iki ok, hover'da ilki 16px sağa çıkar, ikincisi soldan girer, 350ms expo.out). İkon lucide yerine kendi 24px grid'inizde tek SVG. Mobilde tam genişlik değil metin genişliği.

#### `about-17` — Mobilde sağ eyebrow 2–3 satıra kırılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:41, :52, :73 (`mobile:[&_span:last-child]:max-w-[50%] text-right`); about-mobile-fold.png ("OUR OPERATING / PRINCIPLES"), about-mobile-full.png ("WHY WE'RE CALLED / ALAZ", "ONE PROCESS / EVERY / PROJECT")

**Sorun.** 12px mono, %50 genişlikte sağa yaslı 2–3 satır; sol etiketle hizası bozuk, çizgi altında dengesiz blok.

**Neden önemli.** Her bölüm mobilde "kırık" açılıyor.

**Ne yapılmalı.** Sağ etiketi mobilde gizle (`mobile:hidden`) ya da about-02 ile tamamen kaldır.

> **Doğrulayıcı notu:** Ölçüm: üç sağ etiket de mobilde tam 2 satır (38px yükseklik, `max-w-[50%]` = 171px), 3 satır yok — "ONE PROCESS / EVERY" + "PROJECT" şeklinde kırılıyor. İddia '2–3 satır' yerine '2 satır'. Sol etiketle hizasızlık ve `mobile:hidden` ya da tamamen kaldırma fix'i doğru.

#### `about-18` — Şablondan kalan kod kalıntıları

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:41/:52/:73 (aynı eyebrow markup'ı üç kez inline; `[&_a:hover]:text-white` seçicisinin içinde link yok), :24-28 (`services`, `disciplinesHeading`, `principles` kullanılmıyor), :35 + :39 (hero'da `after:` gradient + ayrı overlay div, iki katman aynı işi yapıyor)

**Sorun.** Bölüm başlığı markup'ı kopyala-yapıştır; ölü seçici; kullanılmayan değişkenler; çift overlay.

**Neden önemli.** Eyebrow dilini değiştirmek için üç yerde düzenleme gerekiyor; yeniden tasarımın maliyetini artırıyor.

**Ne yapılmalı.** `<SectionRule left right />` bileşeni; ölü değişken ve seçicileri sil; tek overlay.

> **Doğrulayıcı notu:** Doğrulananlar: eyebrow markup'ı :41/:52/:73 (ve yorumdaki :64/:68) kopyala-yapıştır; `[&_a:hover]:text-white` içinde link yok; :24/:27/:28 ölü değişkenler. Düzeltme: iki overlay 'aynı işi' yapmıyor — :35 `after:` 90deg yatay vignette, :39 div 180deg dikey fade; yine de tek elemanda iki background olarak birleştirilebilir. Eklenecek kalıntılar: :43 h1'de `my-[25px] mb-[70px]` çakışan utility; bölüm etiketleri tutarsız — hero/origin/end `<section>`, process (:72) ve contact (:82) `<div>`; kapanış cümlesi (:80) başlık değil `<p>`. Fix: SectionRule bileşeni + `<section aria-labelledby>` + tek overlay.

#### `about-19` — Sayfadan işe giden yol yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** page.jsx:80 (tek link: /start-project); tüm sayfa

**Sorun.** About'tan case study'lere, bloga ya da ekibe bağlantı yok. Hikâye "biz kimiz" diyor ama "bak ne yaptık" demiyor.

**Neden önemli.** Kullanılabilirlik + ikna; jüri de müşteri de About'tan Work'e geçer.

**Ne yapılmalı.** Kapanıştan önce iki kartlık "Recent work" (vocabulary, market-hours) gerçek ekran görüntüleriyle; ya da kapanış cümlesinin altına ikincil link "See the work →".

#### `about-missed-2` — İki ayrı gri sistemi: soğuk tonlu token'lar + nötr hex literal'ler

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/globals.css (`--dim: #7e828a`, `--gray: #9fa3a9`, shadcn `--muted-foreground: 220 5% 63%`); page.jsx:42 (text-mute), :41/:44/:53 (text-dim), :43/:54 (#6e6e6e), :74/:80 (#777), :84 (#bdbdbd); PoweredBy.jsx (#a6a6a6); Footer.jsx (#858585); Header.jsx (#aaa, #777)

**Sorun.** Ölçülen 12px mono etiketler tek hero içinde dört ayrı gri: eyebrow rgb(126,130,138) ve ALAZ / MANIFESTO rgb(126,130,138) (mavi tonlu, hue 220), kicker rgb(159,163,169) (mavi tonlu), POWERED BY rgb(166,166,166) (nötr), CONTACT rgb(189,189,189) (nötr). Nokta ve ikincil satır grileri (#6e6e6e, #777, #858585) de nötr. Token'lar shadcn'in soğuk `--muted-foreground`'undan miras, elle yazılan değerler nötr; yan yana geldiğinde aynı parlaklıkta farklı tint.

**Neden önemli.** Siyah-beyaz disiplinin tek kozu gri ölçeğinin tutarlılığı; iki tint karışınca 'şablon + elle yama' hissi. Küçük ama Awwwards seviyesinde fark edilen bir craft sinyali.

**Ne yapılmalı.** Tek nötr ölçek tanımla ve tüm literal'leri değiştir: `--g1:#6e6e6e` (nokta), `--g2:#8a8a8a` (dim etiketler), `--g3:#a6a6a6` (mute metin), `--g4:#bdbdbd` (vurgulu etiket); tailwind `dim`/`mute` renklerini bu token'lara bağla, `--muted-foreground`'u `0 0% 63%` yap. `grep -rn '#\(6e6e6e\|777\|858585\|a6a6a6\|aaa\|bdbdbd\)' src/` ile kalanları temizle.

#### `about-missed-3` — ALAZ kelimesinin hiyerarşisi ters: origin'deki 'ALAZ.' footer wordmark'ından küçük

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** page.jsx:54 (`[--fit-size:clamp(64px,9.5vw,150px)]` → 1440'ta 136.8px); src/components/Footer.jsx (`text-[length:clamp(90px,16vw,320px)]` → 1440'ta 230.4px); about-desktop-full.png (ALAZ bölümü ve footer)

**Sorun.** İsmin anlatıldığı tek bölümde kelime 137px; iki ekran sonra global footer aynı kelimeyi 230px basıyor. Sayfanın 'isim anı' kendi footer'ı tarafından gölgeleniyor; aynı kelime aynı sayfada iki kez dev boyutta, büyüğü anlamsız olan.

**Neden önemli.** Kompozisyon/hiyerarşi: en büyük tipografik vuruş, hikâyenin olduğu yerde değil kalıp footer'da. Origin bölümünün zayıf görünmesinin bir nedeni de bu.

**Ne yapılmalı.** Origin'de fit kapağının yönetmesine izin ver: `[--fit-size:40vw]` (fit-em ≈ 3.11 → 1440'ta ≈ 420px, kolon genişliğinde tek satır ALAZ.) ve mobilde `mobile:[--fit-size:30vw]`; başlığı about-08'deki alev maskesiyle birleştir. Böylece kelimenin en büyük hâli yalnızca bu bölümde olur; footer olduğu gibi kalabilir çünkü artık daha küçüktür.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### "Who" bölümü: isimler, yüzler, yıl, iki şehir

- **Etki:** yüksek · **Efor:** orta · **Referans:** Basement Studio /about, Studio Freight team satırları, Locomotive'in Montréal vurgusu

Origin ile process arasına ekip bölümü. Her kişi için ad, rol, bir cümle ve aynı seansta aynı ışıkla çekilmiş siyah-beyaz portre (3:4, `filter: grayscale(1) contrast(1.05)`, üstüne sayfa geneliyle aynı grain). Yanında kuruluş yılı ve iki ofis için `Intl.DateTimeFormat` ile canlı saat (client component, 30 sn'de bir güncelle). Portreler hover'da 2–3 kare arasında geçiş yapan kısa sprite (gülümseme → bakış) — Basement'ın ekip sayfasındaki gibi. Metinde gerçekten kullandığınız stack düz kelime olarak.

### Alev motifi: isimden türeyen tek görsel dil

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Lusion (shader hero), Unseen Studio (metin içinde shader), Active Theory

Stok videolar yerine isme bağlı tek bir canlı motif. Seçenek A (büyük): ogl/three.js ile fragment shader alev/ısı-dalgası (simplex noise + vertical advection, 2 renk: #0a0a0a → #fff), ALAZ başlığının SDF maskesi içinde; scroll hızına göre alevin yüksekliği artar, hero'da imleç ısı kaynağı olur. Seçenek B (orta): kendi çektiğiniz makro alev videosu, `aspect-[4/5]` figür içinde, `mix-blend-mode: screen` ile başlık üstünde. Tüm sayfada `feTurbulence` tabanlı ısı-distorsiyon filtresi yalnızca bu bölümde, başka hiçbir yerde video/3D yok.

### Satır-maskeli metin reveal sistemi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys, Locomotive, Hello Monday (satır maskesi standart dil)

Mevcut fade + 14px yerine: SplitType (ya da kendi satır bölücünüz) ile display başlıkları satırlara böl, her satır `overflow:hidden` sarmalayıcı, iç span `translateY(110%) → 0`, 1.0–1.2 s, `cubic-bezier(.16,1,.3,1)`, 70–90 ms stagger. Paragraflar için kelime değil satır stagger (40 ms). Section çizgileri `scaleX` ile açılır. GSAP + ScrollTrigger (`start: 'top 85%'`, once) ya da framer-motion `variants`. Reduced-motion'da süre 0.

### Process'i kanıta çevir: sticky başlık + kayan artefaktlar

- **Etki:** yüksek · **Efor:** orta · **Referans:** Resn ve Hello Monday case-study iç sayfaları; Studio Freight'ın süreç anlatımı

Dört adım için sol kolon `position: sticky; top: 120px` başlık + paragraf; sağ kolonda her adıma ait gerçek artefakt kartı (discovery doc'tan üç satır, whiteboard fotoğrafı, PR/CI ekran görüntüsü, k6/Grafana load-test grafiği) scroll ile geçer; aktif adım GSAP ScrollTrigger `onToggle` ile sol tarafta vurgulanır. Kartlar `aspect-[4/3]`, siyah-beyaz, ince `border-line`.

### Scroll koreografisi: parallax, grain, bölüm arası ton geçişi

- **Etki:** orta · **Efor:** orta · **Referans:** Locomotive (bölüm arası arka plan geçişi), grain için feTurbulence/noise-png tekniği

Lenis zaten var ama kullanılmıyor. Figür görsellerine `data-speed` ile 0.85–0.9 parallax (GSAP ScrollTrigger scrub ya da Lenis `scroll` event'inde `transform: translate3d`). Sayfa geneline `position:fixed` 256px noise PNG (`mix-blend-mode: overlay`, opacity .04–.06) ile tutarlı film grain. Origin bölümüne girerken `body` arka planı #0a0a0a → #050505, çıkarken geri (ScrollTrigger `toggleActions`, 600 ms). Hiçbir şey 1.5 s'den uzun, hiçbir şey otomatik marquee değil.

### Tipografik kontrast: serif italik ikinci yüz

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys (grotesk + serif italik), pek çok SOTD stüdyo sayfası

Inter + JetBrains Mono + siyah grotesk tek başına "AI dark brutalist" imzası. Yalnızca origin tanımı, pull-quote'lar ve kurucu alıntıları için ikinci bir yüz: Instrument Serif italic ya da Newsreader italic (next/font, `display: 'swap'`), 28–36px, −.01em tracking, `text-mute` değil beyaz. Kullanım alanı küçük tutulduğu sürece kontrast siteyi şablondan ayırır.

### "Ne yapmıyoruz" bloğu

- **Etki:** orta · **Efor:** küçük · **Referans:** Studio Freight'ın "we're small" tonu; küçük stüdyoların dürüst kapsam sayfaları

Jenerik manifestonun panzehiri: üç-dört kısa, dürüst sınır. Örn. "We don't do fixed-price redesigns of things we haven't seen the code of.", "We don't run growth teams.", "We don't start without a written brief." Sentence case, 20–24px, numarasız, sol hizalı; her satır `border-b border-line`. Metin gerçekten uyguladığınız kurallar olmalı.

### Gerçek rakamlar (CountUp zaten var)

- **Etki:** orta · **Efor:** küçük

src/components/CountUp.jsx kullanılmıyor. Yalnızca doğrulanabilir üç sayı: yıl, teslim edilen ürün sayısı, hâlâ ilk kod tabanında koşan ürün yüzdesi gibi. Mono değil display yüzle, 96–140px, `tabular-nums`, altında sentence case açıklama. Uydurma "99.9% uptime" türü değer koymaktansa bölümü hiç ekleme.
