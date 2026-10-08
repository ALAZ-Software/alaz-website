# Hizmetler sayfası

**Boyut puanı:** 4/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 28 (3 kritik · 16 önemli · 9 ince işçilik) · **Korunacaklar:** 6 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sayfa teknik olarak temiz ve disiplinli (monokrom, köşesiz, fit() ile ölçeklenen Archivo display, semantik details/article, JS'siz çalışan reveal) ama tasarım dili tamamen "şablon" seviyesinde kalıyor: dört adet hero boyutunda başlık, her bölümün üstünde "X / 00N" eyebrow, beş hizmet bloğunun hepsi birebir aynı üç kolonlu kalıp ve toplam 18 adet numaralı index etiketi, kenarlıklı mono "tech badge" chip'leri ve her şeye uygulanan aynı fade-up. Hero'daki fiber-optik bokeh stok videosu hem slop sinyali hem de %50 opacity + iki gradient altında görünmez (2 MB'lık boşa indirme). Sağ kolonun her blokta ~350px erken bitmesi, 15px taşan article çizgileri, çift çizgi, FAQ başlığındaki yalnız "&" ve mobilde 43.8px'e düşen h1 gibi somut craft hataları Awwwards iddiasını aşağı çekiyor. Metin tarafında mühendis eliyle yazılmış, somut cümleler var (mobil bloğun "problem" paragrafı, FAQ süre cevabı) fakat "REAL-WORLD OUTCOME / IDEAL FIT" etiketleri, dört kez tekrarlanan "zero …" ve "WHAT WE ACTUALLY DO" gibi "no-bullshit" register'ı LLM broşür tonunu çağrıştırıyor. Özetle iskelet sağlam, üstüne konan şey jenerik; blokları farklılaştıran gerçek bir fikir, scroll'a bağlı bir index ve gerçek işlerden kanıt eklenmeden SOTD seviyesine yaklaşmaz.

## Korunması gerekenler

- fit() + .fit sistemi: en geniş kelimeye göre ölçeklenen display başlık motoru (src/lib/fit.js, globals.css .fit) gerçekten iyi mühendislik; Archivo 900 ile -.075em tracking ve gri nokta cihazı markaya ait, korunmalı — sadece dozu azaltılmalı (yalnız h1'de).
- Monokrom disiplin: tek renk, köşesiz, gölgesiz, glow'suz, gradient'siz; --line (%13 beyaz) çizgi dili tutarlı bir editoryal iskelet veriyor. Bu temel üstüne Awwwards seviyesi kurulabilir, sıfırdan başlamak gerekmiyor.
- Mühendis sesiyle yazılmış somut cümleler var ve model bunlar olmalı: items[1].whatItIs ("old phones, weak signal, aggressive battery savers and two app stores with their own rules"), items[2].whatItIs ("retries, idempotency and rate limiting"), faqs[2].a ("4 to 8 weeks… 2 to 4 months"), faqs[7].a ("reply within one business day").
- Semantik ve erişilebilir altyapı: <article itemScope>, <details>/<summary>, JSON-LD ItemList + FAQ, anchor'lı index, :focus-visible stili, JS yokken içerik gizlenmeyen reveal (.reveal-ready), prefers-reduced-motion ve saveData'ya saygı gösteren BackgroundVideo. Bunların hiçbirine dokunulmamalı.
- Sol numara/kategori kolonu + başlık + sağ spec kolonu gridi (12% / 1fr / 36%) doğru bir editoryal iskelet; sorun gridde değil, beş kez aynı şekilde doldurulmasında. Sticky yapılıp içerik farklılaştırılırsa olduğu gibi kalabilir.
- Lenis smooth scroll touch'ta devre dışı (doğru karar) ve reveal süresi 0.6s ile sınırlı; sitenin hızlı ve hafif kalması jüri için artı.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `services-01` — Üçlü numaralandırma: 18 adet index etiketi tek sayfada

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** messages/en.json servicesPage.eyebrowLeft / overviewEyebrowLeft / processEyebrowLeft / faqEyebrowLeft; src/app/[locale]/services/page.jsx:75-78, 101-104, 199-202, 222-225 (bölüm eyebrow'ları), :142-144 ("01 / 05"), :212 ("01 / 04"), :121 (chip nav "01 / …"); screenshots: services-desktop-full.png, svc-d-overview.png, svc-d-process.png

**Sorun.** Sayfada dört bölüm eyebrow'u ("SERVICES / 001", "CAPABILITIES / 002", "HOW WE WORK / 003", "FAQ / 004"), beş hizmet bloğunda "01 / 05", dört süreç adımında "01 / 04" ve chip nav'da tekrar "01 / WEB APPLICATIONS…" var. Toplam 18 mono sayaç; aynı bilgi üç farklı sistemle numaralanıyor. Sağ taraftaki eyebrow metinleri ("PRACTICAL BREAKDOWN", "COMMON QUESTIONS", "FROM IDEA TO PRODUCTION") hiçbir bilgi taşımıyor, sadece boşluk dolduruyor.

**Neden önemli.** Brief'te açıkça sayılan slop sinyali ("01 / 05 index eyebrows on every section"). Sayaçlar navigasyon değeri taşımadığında dekorasyona dönüşür ve sayfayı AI-builder şablonu gibi gösterir.

**Ne yapılmalı.** Yalnızca gerçekten navigasyonel olan tek sayaç kalsın: hizmet numaraları (01–05), çünkü chip index ve anchor'larla eşleşiyor. Bölüm eyebrow'larındaki "/ 00N" ekini ve sağ taraftaki doldurma metinlerini sil; eyebrow kalacaksa bilgi taşısın ("5 services", "8 questions", "Typical 4–8 weeks"). Süreç adımlarında sayaç yerine hafta aralığı yaz (bkz. services-17). Chip nav'da numarayı kaldırıp sadece başlık bırak.

#### `services-02` — Hero: stok fiber-optik bokeh videosu, üstelik görünmüyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:60-73; public/videos/services-section.mp4 (1280×720, 8 s, 1.98 MB, 1.84 Mbps video + 128 kbps ses kanalı); screenshots: services-desktop-fold.png, svc-d-hero-video-raw.png (overlay'ler kaldırılmış hâli), frames2/svc-4-7.png (ham kareler)

**Sorun.** Video klasik "teknoloji stok footage" (bokeh'li fiber optik kablolar). Ham karelerin ortalama parlaklığı 10–47/255; üstüne opacity .5, ::after yatay gradient ve %60→%100 dikey siyah gradient biniyor, sonuç ekranda neredeyse düz siyah (fold screenshot'ında sağ üstte belli belirsiz bir leke). preload="auto" + autoPlay ile 2 MB LCP'yle yarışıyor, muted olmasına rağmen ses kanalı taşıyor; poster.png ise düz #090909 kare.

**Neden önemli.** Stok görsel brief'te doğrudan slop sayılıyor; görünmeyen bir stok video hem slop hem de performans maliyeti. Awwwards seviyesinde hero'da hareket eden şey markaya ait ve niyetli olmalı.

**Ne yapılmalı.** Videoyu kaldır. 169px'lik h1 zaten hero'yu taşıyor; tipografik hero yeterli. Hareket isteniyorsa sahip olunabilir bir şey: (a) gerçek bir ürün ekran kaydı (Market Hours UI) üstüne 2 renkli dither/ASCII shader (canvas, ~80 satır, sadece desktop ve pointer:fine), veya (b) imleçle etkileşen mono karakter grid'i. Video kalacaksa: ffmpeg -an ile sesi at, 720p H.264 CRF 28 + AV1 varyantı (~500 KB), preload="metadata", tek gradient ve opacity .8 ile gerçekten görünür yap, prefers-reduced-motion'da poster.

> **Doğrulayıcı notu:** Dosya gerçekleri doğru: public/videos/services-section.mp4 1280×720, 8 s, 1.98 MB, H.264 1.84 Mbps + AAC 128 kbps ses kanalı (muted olmasına rağmen), preload="auto" + autoPlay (page.jsx:61-72), poster.png düz #090909 1280×720. Ham kareler (frames2/svc-4-7.png) klasik fiber-optik bokeh stok footage. ANCAK "görünmüyor / neredeyse düz siyah" iddiası ve dayandığı screenshot kanıtı hatalı: bu Playwright Chromium H.264 çözemiyor (canPlayType('avc1')="", readyState 0, networkState 3), dolayısıyla svc-d-hero-video-raw.png ve svc-d-hero-video-3s.png fold screenshot'ıyla bayt bayt aynı (132492 B) ve video hiç render edilmemiş. 6. saniye karesini CSS yığınıyla (opacity .5 → #090909 üstüne, dikey %60→%20→%100 gradient, yatay .35 gradient) bileşimleyince: üst 600px'te max 93/255, p99≈61, alt 300px tamamen siyah. Yani gerçek tarayıcıda bokeh noktaları hero'nun üst üçte ikisinde soluk ama belirgin şekilde hareket ediyor — jenerik "teknoloji" ambiyansı olarak görünüyor. Stok görsel = slop argümanı bu yüzden daha da geçerli (görünüyor); "2 MB boşa" argümanı ise "2 MB, belli belirsiz bir efekt için" olarak düzeltilmeli. Ek: hero video'su BackgroundVideo guard'ından geçmiyor; sitedeki tek korumasız video (reduced-motion / Save-Data'ya bakmadan 2 MB indiriyor). Fix (videoyu kaldır veya markaya ait hareket) aynen geçerli.

#### `services-03` — Beş hizmet bloğu birebir aynı kalıp, sağ kolonun %40'ı boş

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:130-192 (grid-cols-[12%_1fr_36%]); screenshots: svc-d-block01.png (sağ kolon y≈360'ta bitiyor, blok 734px), svc-d-block02.png, services-desktop-full.png

**Sorun.** Her blok aynı iskelet: numara/kategori kolonu, başlık + 18px açıklama + iki mono etiketli paragraf + 5 maddelik "+" listesi solda; STACK / REAL-WORLD OUTCOME / IDEAL FIT sağda. 5 blok × 5 etiket = 25 mono uppercase başlık, 25 tablo satırı gibi görünen deliverable. Ölçülen: sağ kolon içeriği 01 ve 02'de ~360px'te bitiyor, sol kolon ~700px — her blokta ~350px ölü alan (toplam ~1.7 ekran). Hiçbir blokta görsel, kanıt veya ritim değişikliği yok; 3000px boyunca aynı desen.

**Neden önemli.** Layout varyasyonu olmayan tekrar şablon hissinin kendisidir. Awwwards jürisinin "template" ile "tasarım" ayrımı tam burada: bloklar arasında bir fikir, bir kırılma, bir kanıt yok.

**Ne yapılmalı.** (1) Sağ kolonu hak edecek içerik koy: her hizmete bağlı gerçek bir artefakt — case study'den bir UI parçası, bir API log satırı, bir Lighthouse skoru ekran görüntüsü, "See it live: Market Hours ↗" linki. (2) Etiket sayısını 3'e indir (bkz. services-04). (3) Ritmi kır: sol 12% kolonu `position: sticky; top: 100px` yap ve numara + kategoriyi blok boyunca sabitle (Locomotive/Obys usulü), ya da bloğu tek satırlık kompakt "spec row" (başlık + bir cümle + stack) yapıp detayı tıklamayla aç. (4) 01 ve 03 gibi iki bloğu tam genişlik, diğerlerini iki kolon yaparak alternatif düzen kur; en azından grid'i `grid-cols-[12%_1fr_36%]`'dan `[12%_1fr_28%]`'e çekip sağ kolonu yukarıdan hizala ve altını boş bırakma.

### ÖNEMLİ

#### `services-04` — Alt bölüm etiketleri broşür/LLM sözlüğünden

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json servicesPage.itemLabels (whatItIs → "THE PROBLEM & SCOPE", deliverables → "CORE DELIVERABLES", outcome → "REAL-WORLD OUTCOME", bestFor → "IDEAL FIT"); page.jsx:158, 161, 174, 182, 186

**Sorun.** "REAL-WORLD OUTCOME", "IDEAL FIT", "CORE DELIVERABLES" tam olarak LLM'in capability sayfası yazarken ürettiği başlıklar; JSON anahtarı `whatItIs` iken etiketin "THE PROBLEM & SCOPE" olması sonradan şişirildiğini gösteriyor. "Outcome" paragrafları ile `description` zaten aynı şeyi söylüyor (ör. 01: "engineered for speed and long-term maintainability" vs "A stable, thoroughly tested codebase you own outright").

**Neden önemli.** Bu etiketler okuyucuya bilgi vermiyor, sayfayı "AI pitch deck" gibi okutuyor; tekrar eden içerik taramayı yavaşlatıyor.

**Ne yapılmalı.** Etiketleri üçe indir ve düz kelimelerle yaz: "What we build" (description + whatItIs birleşik, tek paragraf), "You get" (deliverables), "Stack". `outcome`'ı sil veya description'a tek cümle olarak eklet; `bestFor`'u tek satır italik/mono not yap: "For: founders launching an MVP, teams replacing spreadsheets." Etiketleri mono uppercase yerine 13px Inter medium, `text-white/50` ile yaz ki mono sayaçlarla aynı dili paylaşmasın.

#### `services-05` — Stack chip'leri "tech badge" kalıbı ve 4 blokta tek başına kalan chip

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:175-179 (li: font-mono text-[12px] border border-line px-[10px] py-[6px]); screenshots: svc-d-block01.png ("Tailwind CSS" yalnız), svc-d-block02.png ("Firebase" yalnız), svc-t-block03.png, svc-m-block01.png

**Sorun.** 6–7 kenarlıklı mono chip 36%'lik kolona sığmayıp 2. satıra tek chip bırakıyor (Tailwind CSS, Firebase, GitHub Actions, Xcode Instruments). Kenarlıklı mono kutucuk, AI-builder sitelerinin varsayılan "technologies we use" desenidir. 05. blokta "STACK" altında Lighthouse / Chrome DevTools / Android Studio Profiler / Xcode Instruments var — bunlar stack değil araç.

**Neden önemli.** Hem slop sinyali hem de orphan chip craft hatası; 5 bloğun 4'ünde tekrarlanınca gözü rahatsız eden bir desen oluyor.

**Ne yapılmalı.** Kutuları kaldır. Stack'i tek satır mono metin olarak yaz: "Next.js · React · TypeScript · Node.js · PostgreSQL" (`text-balance`, `text-white/70`), ya da iki kolonlu `<dl>` ile "Framework / Next.js, Data / PostgreSQL" biçiminde anlam katarak grupla. Kutular kalacaksa hover'da tek satırlık "neden bunu kullanıyoruz" notu göster (custom tooltip, Radix değil) ki kutu bir işe yarasın. 05. blokta etiketi "Tools" yap veya listeyi metne göm.

#### `services-06` — Chip index: 4+1 orphan, mobilde 5 satır buton, aktif durum ve sticky yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:114-124; screenshots: svc-d-overview.png (4 chip + yalnız "05 / PERFORMANCE…"), svc-m-overview.png (5 adet tam satır buton)

**Sorun.** Overview'daki index beş kenarlıklı mono chip; desktop'ta 4+1 kırılıyor, mobilde 5 satır dolgu buton. Tıklayınca bir kez atlatıyor, sonra kayboluyor; 8000px'lik sayfada hangi hizmette olduğunu söyleyen hiçbir şey yok (scroll-spy, sticky index, progress). Ayrıca numara + uppercase mono chip, services-01'deki sayaç enflasyonunu büyütüyor.

**Neden önemli.** Bu sayfanın en büyük kullanılabilirlik sorunu uzunluk; index tasarımı bunu çözmek için var ama dekoratif kalmış.

**Ne yapılmalı.** İki parça: (1) Overview'da chip yerine gerçek bir içindekiler: 5 başlığı display boyutunda (Archivo 800, clamp(24px,2.4vw,36px)) dikey liste olarak "WHAT WE ACTUALLY DO"nun sağına koy; her satır link, hover'da kategori ve 1 satır özet sağa kayarak gelir (gap transition gibi, zaten home'daki CTA'da var). (2) Hizmetler bölümü boyunca sol gutter'da sticky mini index (mono 12px, 5 satır) + IntersectionObserver scroll-spy ile aktif satır beyaz, diğerleri text-dim; mobilde header altında yatay kaydırılabilir sticky şerit (`overflow-x:auto; scroll-snap-type:x mandatory`). Aktif chip'e Lenis `scrollTo` ile offset -78 kullan.

#### `services-07` — Dört hero boyutunda başlık: her bölüm yeniden hero gibi başlıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:82 (h1, clamp(67px,12.4vw,205px) → 169px), :106, :203, :227 (h2'ler, clamp(48px,8vw,130px) → 115–130px); screenshots: services-desktop-full.png, svc-d-overview.png, svc-d-process.png, svc-d-faq-closed.png

**Sorun.** "SOFTWARE ENGINEERING.", "WHAT WE ACTUALLY DO.", "HOW WE OPERATE.", "QUESTIONS & PRACTICAL ANSWERS." — aynı ağırlık, aynı gri nokta, üstünde aynı çizgi + eyebrow. Ritim düz: bölüm hiyerarşisi yok, her şey aynı sesle bağırıyor. "ACTUALLY" kelimesi brief'in uyardığı "NO BULLSHIT" register'ı; "PRACTICAL" sayfada iki kez (eyebrow + FAQ başlığı).

**Neden önemli.** Tipografik ölçek bir kez kullanıldığında etkileyici, dört kez kullanıldığında şablon. Awwwards sitelerinde display ölçeği tek bir anın hakkıdır.

**Ne yapılmalı.** Hero tek büyük an kalsın. Bölüm başlıklarını `clamp(32px,4.2vw,56px)` seviyesine çek, gri nokta cihazını sadece h1'de bırak, eyebrow çizgisini kaldırıp başlığı sol kolon + kısa paragraf sağ kolon kompozisyonuyla ver. Metin: "WHAT WE ACTUALLY DO" → "WHAT WE BUILD"; "QUESTIONS & PRACTICAL ANSWERS" → "QUESTIONS" (bkz. services-08). CTA'daki 72px kapanış cümlesi sayfanın ikinci ve son büyük tipografik anı olarak kalabilir.

#### `services-08` — FAQ başlığında tek başına kalan "&" satırı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json servicesPage.faqTitle ["QUESTIONS &","PRACTICAL ANSWERS"]; src/app/[locale]/services/page.jsx:227 ([--fit-avail:calc((100vw_-_2*var(--gutter)_-_60px)/2.2)]); src/lib/fit.js; screenshot: svc-d-faq-closed.png

**Sorun.** Desktop'ta başlık 4 satır: QUESTIONS / & / PRACTICAL / ANSWERS. fit() yalnız en geniş kelimeye (QUESTIONS, ~6.3em) göre boyutluyor; kolon 572px → ~90px font; "QUESTIONS &" (~7.8em = 700px) sığmıyor ve "&" tek başına düşüyor. Bu tasarım değil, kaza.

**Neden önemli.** Display tipografide yetim karakter en görünür craft hatasıdır; sayfanın en büyük 2. başlığında olması jüri gözünden kaçmaz.

**Ne yapılmalı.** En temizi kopyayı değiştirmek: ["STRAIGHT","ANSWERS"] veya ["QUESTIONS"] tek satır. Aynı kopya kalacaksa `QUESTIONS&nbsp;&` ile bağla (fit() bunu tek kelime sayıp ~71px'e indirir, 3 satır olur) ya da FAQ grid'ini `grid-cols-[1fr_1fr]` yapıp `--fit-avail`'i 630px'e çıkar. Genel olarak fit()'e satır bazlı ölçüm ekle: `Math.max(...lines.map(lineEm))` seçeneği.

> **Doğrulayıcı notu:** Sorun doğru: satır ölçümü 4 satır veriyor ("QUESTIONS " / "&" / "PRACTICAL " / "ANSWERS."); fit() --fit-em=6.323 (QUESTIONS), kolon 572px → 90.5px; "QUESTIONS &" ≈7.3em ≈ 660px sığmıyor. ANCAK önerilen `QUESTIONS&nbsp;&` fix'i yazıldığı hâliyle ÇALIŞMAZ: fit() kelimeleri `split(/\s+/)` ile ayırıyor ve JavaScript'te `\s` U+00A0'ı da eşliyor (test edildi: 4 kelime döndürüyor). Sonuç: fit() 90px'te kalır, tarayıcı "QUESTIONS &"i bölünemez sayar, `overflow-wrap: break-word` harf ortasından kırar ya da taşar. NBSP yolu seçilecekse fit.js'teki split `/[ \t\n]+/` olmalı. En temiz çözüm hâlâ kopya değişikliği (["STRAIGHT","ANSWERS"] veya tek satır "QUESTIONS") ya da reviewer'ın önerdiği satır bazlı ölçüm.

#### `services-09` — FAQ accordion animasyonsuz; shadcn accordion.jsx ölü kod

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:234-243 (<details>, +/− display swap); src/components/ui/accordion.jsx:1-43 (hiçbir yerde import edilmiyor; ChevronDown, hover:underline, text-sm shadcn varsayılanları); screenshots: svc-d-faq-open.png, svc-m-faq-open.png

**Sorun.** Native <details>: cevap anında beliriyor, kapanırken anında kayboluyor; +/− iki ayrı span'ı hidden/inline ile değiştiriyor (dönüş/morph yok); summary'nin hover durumu yok; `name` ile tekil açılım yok. Repo'da ayrıca kullanılmayan, saf shadcn varsayılanı bir accordion bileşeni duruyor (lucide ChevronDown + hover:underline).

**Neden önemli.** FAQ, kullanıcının elle dokunduğu tek etkileşim; sert açılış "hiç tasarlanmamış" hissi verir. Ölü shadcn dosyası da ileride kazara kullanılıp varsayılan görünümü sayfaya taşır.

**Ne yapılmalı.** accordion.jsx'i sil. <details> kalsın (SEO/a11y için doğru) ama animasyon ekle: modern tarayıcılarda `details { interpolate-size: allow-keywords } details::details-content { height:0; overflow:hidden; transition: height .45s cubic-bezier(.22,1,.36,1), content-visibility .45s allow-discrete } details[open]::details-content { height:auto }`; fallback olarak küçük bir client bileşeni (framer-motion `animate={{height: open ? 'auto' : 0}}`). İkonu tek `+` yap ve açıkken `rotate(45deg)` ile `×`e dönüştür (.3s). `name="faq"` ile aynı anda tek soru açık. Summary hover: soru metni `text-white/60 → text-white` ve 1px alt çizgi draw (scaleX). Cevap paragrafına 60ms gecikmeli opacity girişi.

#### `services-10` — Tıklanamayan 730px'lik bloğa tam yüzey hover arka planı

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:137 (group … transition-colors duration-200 hover:bg-[#0f0f0f] px-[15px] -mx-[15px]); screenshot: svc-d-block01-hover.png

**Sorun.** Article interaktif değil ama imleç üstüne gelince tüm blok #0f0f0f oluyor. Kart-hover afordansı veriyor, tıklayınca hiçbir şey olmuyor. Ayrıca bu hover için eklenen -mx-[15px] services-11'deki hizalama hatasına yol açıyor.

**Neden önemli.** Anlamsız hover = "etkileşim var gibi görünsün" refleksi; Awwwards jürisi hover'ın bir şey yapmasını bekler.

**Ne yapılmalı.** Hover'ı kaldır. Hover istiyorsan bloğu gerçekten etkileşimli yap: başlığa hover → sağ kolondaki artefakt (services-03) belirsin ya da stack satırı beyazlaşsın; veya numara kolonundaki "01" büyüyüp beyazlaşsın (`group-hover:text-white group-hover:scale-110`, transform-origin left).

#### `services-11` — Hizmet bloğu çizgileri gutter'dan 15px taşıyor, kapanış çizgisiyle uyuşmuyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:137 (-mx-[15px] px-[15px] border-t) vs :193 (kapanış border-b, gutter genişliğinde) ve :101/:199/:222 (diğer çizgiler); ölçüm: article 45→1395px, diğer tüm çizgiler 60→1380px (1440 viewport); screenshot: svc-d-block01-hover.png (arka plan chip'lerden 15px solda başlıyor)

**Sorun.** Beş article'ın üst çizgisi sayfadaki her kuraldan 15px daha geniş; son bloğun altındaki kapanış çizgisi ise gutter'da. Aynı listede iki farklı çizgi genişliği var.

**Neden önemli.** Çizgi hizası bu tür brutalist/editoryal sistemlerin tek dekorasyonudur; 15px kayma "grid'e saygı yok" mesajı verir.

**Ne yapılmalı.** `-mx-[15px] px-[15px]` kaldır (services-10 ile birlikte). Hover arka planı gerçekten gerekliyse çizgiyi oynatmadan pseudo-element ile ver: `relative before:absolute before:-inset-x-[15px] before:inset-y-0 before:-z-10 before:bg-[#0f0f0f] before:opacity-0 hover:before:opacity-100`.

#### `services-13` — Mobilde h1 43.8px'e düşüyor, hero ölçeğini kaybediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:82 (mobile:[--fit-size:clamp(60px,12.5vw,100px)]); src/lib/fit.js (TRACKING=-0.05 sabit, ×1.03 emniyet payı); ölçüm: computed h1 = 43.8px @390px; screenshot: services-mobile-fold.png

**Sorun.** "ENGINEERING." 7.8em ölçülüyor, 342px kolon → 43.8px. Intro paragrafı 18px, eyebrow 12px; hero/body oranı 2.4×, display değil alt başlık gibi okunuyor. fit() -0.05em tracking varsayıp h1'in gerçek -.075em'ini kullanmadığı ve üstüne %3 pay eklediği için ~%7 gereksiz küçülüyor; gri nokta da 0.33em yiyor.

**Neden önemli.** Mobil trafik için ilk ekran; display tipografi markanın tek görsel kimliği ve mobilde kayboluyor.

**Ne yapılmalı.** Üç seçenek, birlikte de olur: (1) fit()'e tracking parametresi ekle `fit(text, suffix, tracking = -0.05)` ve h1'den -0.075 geçir, 1.03'ü 1.01'e indir → ~47px. (2) Mobilde noktayı kaldır veya ayrı satıra alma → ~46px. (3) Asıl Awwwards hamlesi: kelimenin gutter'ı taşmasına izin ver — mobilde `[--fit-avail:calc(100vw)]` + `-mx-[var(--gutter)] px-[var(--gutter)] overflow-hidden` ile "ENGINEERING" 54–56px olup sağ kenardan taşsın (Locomotive/Obys heroları böyle). Intro'yu 16px'e çek.

#### `services-14` — Mobilde her hizmet bloğu ~1350px; başlık/body oranı 1.67

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:140-190 (mobile:grid-cols-1), :151 ([--fit-size:clamp(30px,4.5vw,60px)] → 30px @390), :154 (18px description); ölçüm: blok yükseklikleri 1343/1392/1345/1347/1349px, toplam sayfa 11,786px; screenshots: services-mobile-full.png, svc-m-block01.png

**Sorun.** Mobilde 5 blok 6,800px aynı dikey yığın: başlık (30px) → 18px açıklama → etiket → paragraf → etiket → 5 madde → chip'ler (2 satır) → iki etiket + paragraf. Başlık 30px iken açıklama 18px; başlık "başlık" gibi okunmuyor. Hiçbir şey katlanmıyor, index sticky değil; kullanıcı 7 ekran boyunca aynı deseni kaydırıyor.

**Neden önemli.** Taranabilirlik: mobilde bu yoğunluk okunmaz, üstelik tümü aynı görünür; terk oranı buradan gelir.

**Ne yapılmalı.** Mobilde bloğu kademeli yap: görünür kısım = numara + başlık (`clamp(36px,9.5vw,44px)`) + açıklama + tek satır stack; "problem & scope", deliverables ve bestFor bir `<details>` "Details +" altında (services-09'daki animasyonla). Chip'leri (kalacaksa) tek satır yatay kaydırmalı yap. Section başı yerine sticky yatay index (services-06). Bu sayede mobil sayfa ~6,500px'e iner.

#### `services-15` — Hero aynı cümleyi beş kez söylüyor; sahte "doküman damgası"

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json servicesPage.eyebrowLeft ("SERVICES / 001"), eyebrowRight ("WEB / MOBILE / SYSTEMS"), kicker ("WEB, MOBILE AND THE SYSTEMS BEHIND THEM."), heading, introText, introNote ("ALAZ / CAPABILITIES 2026"); page.jsx:75-95; screenshot: services-desktop-fold.png

**Sorun.** Eyebrow sağ: web/mobile/systems. Kicker: web, mobile and the systems. Intro: web applications, iOS and Android apps, and the backends and cloud infrastructure. Aynı içerik üç register'da. "ALAZ / CAPABILITIES 2026" ise sayfanın basılı bir doküman olduğunu taklit eden dekoratif mono not — AI brutalist şablonlarının imzası. Hero'nun üst 320px'i (header altı → h1) boş kalıyor.

**Neden önemli.** Tekrar, düşünülmemiş kopyanın işareti; sahte damga tam "SYSTEM_ACTIVE pill" ailesinden slop.

**Ne yapılmalı.** introNote ve kicker'ı sil; eyebrow'u ya sil ya da tek kelime bırak. Hero'da üç şey kalsın: h1, bir intro cümlesi, bir eylem ("See the five things we do ↓" anchor ya da doğrudan e-posta). Boş üst alanı kapatmak için hero'yu `min-h-[100svh] flex flex-col justify-end` yapıp h1'i viewport tabanına yasla (bottom-anchored hero), intro + link fold'a girsin.

> **Doğrulayıcı notu:** Tekrar iddiası doğru (eyebrowRight / kicker / introText aynı üçlü), introNote "ALAZ / CAPABILITIES 2026" dekoratif damga ve yılı hardcode ediyor. Düzeltme: "hero'nun üst 320px'i boş" doğru değil — header (76px) ile h1 (y=316) arasında y=128'de eyebrow çizgisi ve y≈281'de kicker var; boş olan, eyebrow ile kicker arasındaki 105px'lik `mt-[105px]` bandı. Bottom-anchored hero fix'i yine geçerli.

#### `services-16` — "Zero …" tiki, mutlak vaatler ve rakip çamurlama

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json servicesPage.items[0].deliverables[4] ("zero vendor lock-in"), items[2].outcome ("zero data loss"), items[3].deliverables[2] ("zero-downtime deployments"), processSteps[3].body ("Zero-downtime cutover", "complete confidence"), processSteps[1].body ("No ambiguous specs."), items[0].description ("engineered for speed and long-term maintainability"), faqs[0].a ("Most agencies sell design presentations and outsource implementation to junior subcontractors")

**Sorun.** Bir sayfada dört "zero", bir "No ambiguous specs.", bir "complete confidence", bir "engineered for" — tam brief'in uyardığı "engineered to last / no bullshit" register'ı. FAQ'ın ilk cevabı rakipleri küçümseyerek açılıyor ("unlike other agencies" klişesi). Buna karşılık mobil bloğun "old phones, weak signal, aggressive battery savers" cümlesi ve FAQ süre cevabındaki "4 to 8 weeks" gerçek, mühendis sesiyle yazılmış — model bu olmalı.

**Neden önemli.** Mutlak vaatler güven yerine şüphe üretir; LLM metninin en bilinen tiklerinden biri "zero/no/complete".

**Ne yapılmalı.** Her mutlak ifadeyi ölçülebilir bir cümleyle değiştir: "deploys without maintenance windows", "webhook retries with idempotency keys, replayable from the log", "a schema and README your next hire can read in an afternoon". FAQ 1'i olumlu ve somut yaz: kimle konuşuluyor, ekip kaç kişi, kodu kim yazıyor, haftalık hangi gün demo var. "engineered for" → sil; "complete confidence" → "with runbooks and a recorded walkthrough".

#### `services-17` — Süreç bölümü jenerik 4 kolon "steps" kartı, bilgi taşımıyor; tablet kırılımı yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:209-217 (grid-cols-4, mobile:grid-cols-1, tablet kuralı yok); messages/en.json servicesPage.processSteps; screenshots: svc-d-process.png, svc-t-process.png (900px: 190px kolonlar, başlıklar 2 satıra kırılıyor), svc-m-process.png

**Sorun.** "01 / 04 Deep Discovery" … "04 / 04 Production & Handover": her ajans sitesindeki aynı dört adım, aynı düzen. Süre, çıktı, müşterinin ne yapacağı yok. 761–1000px arasında kolonlar sıkışıyor. "Deep Discovery" ajans klişesi.

**Neden önemli.** Süreç bölümü, farklılaşmanın en kolay olduğu yer; burada jenerik kalmak "template" izlenimini pekiştiriyor.

**Ne yapılmalı.** Gerçek bilgiyle yeniden kur: her faz için hafta aralığı (Week 0–1 / 1–2 / 2–8 / Launch → +30 days), müşterinin eline geçen artefakt (scope doc, data model + Figma, staging URL her Cuma, runbook + recording) ve müşterinin harcayacağı süre ("2 × 60 min calls"). Düzen: oransal genişlikte yatay timeline barı (grid-template-columns: 1fr 1fr 6fr 1fr gibi süreye göre), üstünde hafta etiketleri; desktop'ta sol kolon sticky başlık + sağda fazlar scroll'la geçer. `tablet:grid-cols-2` ekle. Başlıkları düz yaz: "Discovery / Blueprint / Build / Launch & handover".

> **Doğrulayıcı notu:** İçerik ve düzen iddiası doğru (page.jsx:209-217 grid-cols-4, tablet kuralı yok; 900px'te kolonlar ~190px, başlıklar 2 satıra kırılıyor — svc-t-process.png). Severity düşük verilmiş: "Deep Discovery / System Blueprint / Iterative Execution / Production & Handover" numaralı 4 kolon, brief'in uyardığı jenerik şablon desenin ta kendisi; süre/çıktı/müşteri eforu yok. major olmalı. Fix (oransal timeline + hafta aralıkları + artefaktlar) somut.

#### `services-18` — CTA bölümü About sayfasının kapanışının kopyası

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:18 (tAbout), :250 (/videos/about-end-section.mp4), :253-257 (tAbout('endTextTop'/'endTextBottom')); screenshots: svc-d-cta.png, svc-m-cta.png

**Sorun.** "GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T." + aynı video + aynı buton About'ta da birebir var. İki sayfada aynı kapanış = şablon bileşeni.

**Neden önemli.** Awwwards siteleri sayfa başına bir kapanış fikri taşır; kopyala-yapıştır CTA, kişiliksizlik sinyali.

**Ne yapılmalı.** Hizmetlere özel kapanış: "Tell us what's breaking." + altında doğrudan e-posta (hello@alaz.pro, zaten FAQ'ta var) ve yanıt süresi vaadi ("We reply within one business day" — FAQ 8'den al) + "Start a project" butonu. Video yok; ya da sadece bu sayfaya ait bir görsel. Alternatif: CTA'yı FAQ'ın altına küçük bir satır olarak göm ve sayfayı 500px kısalt.

> **Doğrulayıcı notu:** Kopya doğrulandı: src/app/[locale]/about/page.jsx:78-80 ile birebir aynı video (about-end-section.mp4), aynı tAbout metinleri, aynı buton. Ek bulgu: paylaşılan about-end-section.mp4 de stok CGI (3D saat dişlileri, frames/about-end-section.jpg) — sayfadaki ikinci stok video. Kopya kapanış + stok CGI birlikte major. Fix (hizmete özel kapanış, doğrudan e-posta + yanıt süresi) somut.

#### `services-19` — Her şeye aynı AOS tarzı fade-up; "mask" aslında mask değil

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:66-83 ([data-reveal="fade"]: opacity 0 + translateY(14px), [data-reveal="mask"]: opacity 0 + translateY(.14em)); src/components/ScrollReveal.jsx; page.jsx:82, 106, 132, 203, 211, 227 (data-reveal)

**Sorun.** 169px'lik h1 ile 15px'lik süreç paragrafı aynı 0.6s opacity+14px hareketini yapıyor. "mask" adlı varyant sadece biraz daha fazla yükselen fade. CSS yorumu clip-path'in IO ile çalışmadığını söylüyor ama sorun ölçülen elemanın kendisinin kırpılması; wrapper gözlemlenince çözülür. Lenis var ama scroll'a bağlı tek bir hareket yok.

**Neden önemli.** Tek tip fade-up, template/AI-builder sitelerinin varsayılan hareketi; Awwwards jürisi masked line reveal, stagger ve scroll-scrub gibi niyetli motion bekler.

**Ne yapılmalı.** Display başlıklar: her satırı `overflow:hidden` span'a sar, iç span `translateY(110%) → 0`, 0.9s, cubic-bezier(.16,1,.3,1), satırlar arası 70ms stagger; IO wrapper'ı gözlesin. Body metin: animasyon yok ya da 0.3s opacity. Listeler (deliverables, process): children 40ms stagger. Uygulama: GSAP + SplitText (2025'ten beri ücretsiz) veya framer-motion `staggerChildren` + `clipPath: inset(0 0 100% 0) → inset(0)`. Scroll'a bağlı bir öğe ekle: hizmet numarası kolonu sticky + bloğun scroll ilerlemesine göre numara opacity/scale (useScroll + useTransform).

> **Doğrulayıcı notu:** İddia doğru; satır numaraları hatalı: globals.css'te `.reveal-ready [data-reveal]` :71, fade :76, mask :83 (66-83 değil); scroll-padding-top :45. "mask" gerçekten sadece opacity + translateY(.14em). Sayfada useScroll/useTransform yok, Reveal.jsx (framer-motion) var ama burada kullanılmıyor; Lenis'e bağlı tek scroll hareketi yok. Severity: Awwwards iddiasında motion ana jüri kriteri; tek tip AOS fade-up "clearly below the bar" → major.

#### `services-21` — Anchor offset üç farklı değer: 90 / 78 / -78

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:137 (scroll-mt-[90px]); src/app/globals.css:42 (scroll-padding-top: 78px); src/components/SmoothScroll.jsx:14 (anchors: { offset: -78 })

**Sorun.** Chip index'ten tıklanınca Lenis -78 ile kaydırıyor, native fallback 78 + article'ın kendi 90'ı; aktif duruma göre blok başlığı 12px farklı konumda duruyor.

**Neden önemli.** Tutarsız landing pozisyonu küçük ama fark edilir; tek token olmalı.

**Ne yapılmalı.** `--header-h: 78px` CSS değişkeni; `scroll-padding-top: var(--header-h)`, article'da `scroll-mt-0`, Lenis offset'i aynı değerden oku. Başlığın çizgiye yapışmaması için `calc(var(--header-h) + 24px)` tek yerde.

> **Doğrulayıcı notu:** Üç değer tespiti doğru ama mekanizma ve fark yanlış. Lenis 1.3.26 scrollTo (node_modules/lenis/dist/lenis.mjs:748-790) hedeften scroll-margin-top (90) VE scroll-padding-top (78) değerlerini ZATEN düşüyor, sonra `anchors.offset` (-78) ekliyor → toplam 246px. Ölçüm (3 koşu, deterministik): chip'e tıklayınca article üst çizgisi viewport'un 232px altına, header'ın 156px altına iniyor; önceki bloğun sonu görünür kalıyor. Native (reduced-motion ile Lenis kapalı): 168px (78+90 toplanıyor). Fark 12 değil 64px ve iki değer de yanlış. Ayrıca tıklama anında henüz reveal olmamış article'ın translateY(14px)'i hedefi 14px daha kaydırıyor. Fix: SmoothScroll.jsx'te `anchors: { offset: -78 }` → `anchors: true` (Lenis scroll-padding'i okuyor), `scroll-mt-[90px]`'i kaldır (nefes payı gerekiyorsa tek yerde `scroll-margin-top: 24px`), `--header-h` token'ı. Not: Lenis onClick preventDefault yapmıyor, hash güncelleniyor — deep-link çalışıyor, bozulmasın.

### İNCE İŞÇİLİK

#### `services-12` — Hizmet listesi ile süreç bölümü arasında çift çizgi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:193 (<div className="border-b border-line w-full" />) + :198-199 (section pt-[20px], eyebrow border-t); ölçüm: iki çizgi arası 121px boş; screenshot: svc-d-double-rule.png

**Sorun.** 05. bloğun altındaki kapanış çizgisinden 121px sonra süreç eyebrow'unun çizgisi geliyor; arada hiçbir şey yok. İki paralel 1px çizgi ve boş bant.

**Neden önemli.** Küçük ama editoryal sistemde çizgi dili tutarlı olmalı; çift çizgi "bir şey unutulmuş" hissi verir.

**Ne yapılmalı.** Kapanış div'ini sil (services-11 ile bloklar zaten border-t taşıyor; son bloktan sonra bir sonraki bölümün üst çizgisi kapanışı yapar). Aynı mantıkla section'lar arası `pb-[100px] + pt-[20px]` = 120px boşluğu tek bir `--section-gap: clamp(80px,10vw,140px)` token'ına bağla.

#### `services-20` — Eyebrow'ların mobil sınıfı tutarsız, metinler çarpışıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:75 (mobile:[&_span:last-child]:max-w-[50%] … var) vs :101, :199, :222 (yok); screenshot: svc-m-process.png ("HOW WE WORK / 003  FROM IDEA TO PRODUCTION" bitişik)

**Sorun.** Aynı eyebrow bileşeni dört kez elle kopyalanmış; sadece hero'daki mobil kuralı taşıyor. 390px'te süreç/FAQ eyebrow'larının iki ucu neredeyse birleşiyor, 470px altında hizasız kırılır.

**Neden önemli.** Copy-paste bileşen = tutarsızlık; küçük ama 4 yerde görünür.

**Ne yapılmalı.** Tek `Eyebrow` bileşeni (left, right props) ve tek sınıf seti; ya da services-01 gereği sağ metinleri kaldırıp sorunu kökten sil.

#### `services-22` — CTA butonunda lucide ArrowUpRight varsayılanı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:2, :262 (<ArrowUpRight size={17} />); screenshot: svc-d-cta.png

**Sorun.** Sayfadaki tek ikon, lucide'ın stok oku; Archivo'nun ağır display karakteriyle 1.5px stroke'lu lucide oku aynı dili konuşmuyor. Hover'da ok hareket etmiyor.

**Neden önemli.** Brief'te "lucide icons everywhere" slop sinyali olarak geçiyor; tek ikonun bile markaya ait olması beklenir.

**Ne yapılmalı.** Markaya ait tek bir ok çiz (inline SVG, 2.5px stroke, kare uçlu, Archivo'nun ağırlığına uygun) ve hover'da `translate(2px,-2px)` + buton arka planı; ya da ok yerine display font ↗ karakteri. Tüm sitede aynı ok bileşeni kullanılmalı (home'daki MoveUpRight ile de tutarsız).

#### `services-23` — FAQ sol kolonu başlıktan sonra boş; tablet altı grid yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:226 (grid-cols-[1fr_1.2fr], tablet:grid-cols-1); screenshot: svc-d-faq-closed.png (sol kolonun alt ~400px'i boş)

**Sorun.** Başlık 4 satır, altı boş; 8 soru sağda 600px uzuyor. Sol kolonun yarısından fazlası ölü alan.

**Neden önemli.** Dead space tekrar (bkz. services-03); iki kolonlu editoryal düzen ancak iki taraf da çalışıyorsa haklı çıkar.

**Ne yapılmalı.** Sol kolonu `sticky top-[110px] self-start` yap ve başlığın altına "Didn't find it? hello@alaz.pro — we reply within one business day" satırını koy (services-18 ile birleşir). Alternatif: tek kolon, başlık küçük (services-07), sorular tam genişlikte 2 kolona bölünmüş.

> **Doğrulayıcı notu:** Ölü alan doğru ama rakam abartılı: başlık 4 satır ≈ 318px, grid satırı 591px → sol kolonun altında ~270px boş (≈400 değil). Sticky + "Didn't find it? hello@alaz.pro" satırı fix'i doğru ve services-18 ile birleşiyor.

#### `services-24` — 761–1000px arasında üç kolonlu grid kural almıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:140 (grid-cols-[12%_1fr_36%] mobile:grid-cols-1, tablet kuralı yok); screenshot: svc-t-block03.png (900px: kategori "BACKEND / INTEGRATION" 2 satır, sağ kolon 290px, chip'ler 2 satır)

**Sorun.** Tablet aralığında numara kolonu ~100px'e, sağ kolon ~290px'e düşüyor; kategori etiketleri kırılıyor, chip'ler üç satır olabiliyor. Sayfa çalışıyor ama tasarlanmış hissi vermiyor.

**Neden önemli.** iPad portre / küçük laptop pencereleri Awwwards jürisinin test ettiği aralık.

**Ne yapılmalı.** `tablet:grid-cols-[1fr_40%]` + numara/kategoriyi başlığın üstüne inline al (`tablet:col-span-2`), ya da `tablet:grid-cols-1` ile mobil düzeni 1000px'e kadar genişlet; sağ kolon içeriğini bu aralıkta başlığın altına iki kolonlu (`grid-cols-2`) olarak yerleştir.

#### `services-missed-1` — Chip index nav'ının erişilebilir adı "PRACTICAL BREAKDOWN"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/services/page.jsx:114 (`<nav aria-label={t('overviewEyebrowRight')}>`)

**Sorun.** Sayfa içi index'in landmark adı, dekoratif sağ eyebrow metninden geliyor: ekran okuyucu "PRACTICAL BREAKDOWN navigation" diyor. services-01 gereği eyebrow metinleri silinince bu ya boş kalır ya da anlamsızlaşır.

**Neden önemli.** Landmark adları ne yaptığını söylemeli; dekor metnine bağlı a11y bir kalıntı/copy-paste işareti.

**Ne yapılmalı.** en.json'a ayrı bir `servicesIndexLabel: "Services index"` anahtarı ekle ve `aria-label={t('servicesIndexLabel')}` kullan; sticky index'e dönüştürülürse aynı label'ı taşı.

#### `services-missed-2` — Hizmet id'leri (fragment URL'leri) başlıklarla uyuşmuyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json items[].id: custom-software-development (başlık "WEB APPLICATIONS & SAAS"), api-integration ("BACKEND, APIs & INTEGRATIONS"), system-architecture-cloud ("CLOUD INFRASTRUCTURE & DEVOPS"); page.jsx:40 (JSON-LD url), :118 (chip href), :134 (article id)

**Sorun.** Chip'e tıklayınca adres çubuğunda `/services#custom-software-development` yazıyor ama kullanıcı "Web applications & SaaS" bloğuna bakıyor; aynı id JSON-LD Service.url olarak Google'a gidiyor. Önceki bir içerik sürümünden kalma slug'lar. grep ile repo içinde başka inbound link yok, yeniden adlandırmak güvenli.

**Neden önemli.** Paylaşılan URL ve structured data, görünen başlıkla çelişen eski isimler taşıyor; craft ve SEO tutarlılığı.

**Ne yapılmalı.** id'leri başlıklarla eşle: `web-applications`, `mobile-apps`, `backend-apis`, `cloud-devops`, `performance`; tr.json'daki karşılıkları da aynı id'yi kullansın (id dil-bağımsız kalmalı).

#### `services-missed-3` — 25 adet `<h3>` aslında terim etiketi; doküman outline'ı şişiyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/services/page.jsx:158, 161, 174, 182, 186 (her blokta 5 × `<h3 class="font-mono …">`) + :213 (4 süreç h3) + :237 (8 FAQ h3)

**Sorun.** "STACK", "IDEAL FIT" gibi 12px mono etiketler h3 olarak işaretlenmiş; tek sayfada 1 h1 + 8 h2 + 37 h3 var. Ekran okuyucu başlık listesi ve HTML outline'ı 25 anlamsız "başlık"la doluyor.

**Neden önemli.** Semantik altyapı sitenin güçlü yanı (reviewer'ın strengths'te övdüğü), ama bu etiketler o altyapıyı bozuyor; services-04'teki etiket sadeleştirmesiyle birlikte düzeltilmeli.

**Ne yapılmalı.** Blok içi etiket+içerik çiftlerini `<dl>` ile yaz: `<dt>` etiket (aynı mono stil), `<dd>` paragraf/liste. Deliverables için `<dt>You get</dt><dd><ul>…</ul></dd>`. Süreç ve FAQ h3'leri kalabilir (gerçek başlık).

#### `services-missed-4` — Hero videosu sitedeki tek korumasız video: reduced-motion ve Save-Data'yı yok sayıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/services/page.jsx:61-72 (ham `<video autoPlay preload="auto">`) vs src/components/BackgroundVideo.jsx (matchMedia reduced-motion + navigator.connection.saveData guard'ı)

**Sorun.** CTA videosu BackgroundVideo üzerinden gidip reduced-motion'da poster'da kalıyor ve viewport'a girmeden indirilmiyor; hero videosu ise her ziyaretçiye, hareket azaltma tercihi veya veri tasarrufu açık olsa bile, 2 MB'ı LCP ile yarışacak şekilde `preload="auto"` ile indiriyor. BackgroundVideo'daki yorum bunu bilinçli bırakmış ama guard'sız bırakmak gerekmiyordu.

**Neden önemli.** Craft/a11y tutarsızlığı: aynı sayfada iki farklı video politikası; reduced-motion kullanıcısı hero'da hareketli bokeh görüyor. Video kalırsa bile bu düzeltilmeli.

**Ne yapılmalı.** Video kaldırılmayacaksa BackgroundVideo'ya `eager` prop'u ekle (IO beklemeden ama guard'larla `video.src` ata, `preload="metadata"`), hero'da onu kullan; `-an` ile ses kanalını at ve ~500 KB'a sıkıştır.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Sticky scroll-spy hizmet index'i

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive (sayfa içi sticky index), Basement Studio services, Studio Freight 'Index' sayfaları

Hizmetler bölümü boyunca sol gutter'da sabit duran 5 satırlık mono index (01–05 + kısa ad); IntersectionObserver (threshold .4) ile aktif satır beyaz, diğerleri text-dim; satırlar Lenis scrollTo ile atlatır; aktif bloğun scroll ilerlemesi 1px'lik dikey çizgi olarak index'in yanında dolar (useScroll/useTransform veya saf CSS scroll-timeline). Mobilde header altına yapışan yatay kaydırmalı şerit. Overview'daki chip nav bunun yerine display boyutunda içindekiler listesine dönüşür.

### Her hizmete gerçek bir kanıt artefaktı

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Obys (gerçek proje parçaları), Hello Monday services, Resn work-in-services

Beş bloğun sağ kolonuna (şu an ölü alan) gerçek işlerden parça: Market Hours'tan bir ekran kaydı/karesi (mobil), English Vocabulary'den bir UI fragmanı (web), bir OpenAPI şemasından 6 satır, gerçek bir Lighthouse/INP öncesi-sonrası (performans), bir CI pipeline çıktısı (infra). Her birinin altında 'See the case study ↗' linki. next/image + sharp ile 2× yoğunlukta, karanlık arka planla bütünleşen dither veya 1px çerçeve. Stok görsel sıfır; sadece kendi çıktınız.

### Masked line reveal + stagger motion sistemi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Unseen Studio, Lusion, Studio Freight (satır maskeli reveal standardı)

Tüm display başlıklar için satır bazlı maske animasyonu: her satır overflow:hidden span içinde translateY(110%)→0, 0.9s cubic-bezier(.16,1,.3,1), 70ms stagger; deliverable ve process listelerinde 40ms children stagger; body metinde hareket yok. GSAP + SplitText (ücretsiz) veya framer-motion variants ile. Tek seferlik (once) ve prefers-reduced-motion'da kapalı. Mevcut data-reveal altyapısı wrapper'ı gözlemleyecek şekilde genişletilir.

### Süre ve artefakt taşıyan yatay süreç timeline'ı

- **Etki:** orta · **Efor:** orta · **Referans:** Basement Studio 'process', Active Theory 'how we work', Linear 'method' sayfası

4 faz için gerçek hafta aralıkları (Week 0–1 / 1–2 / 2–8 / Launch → +30 days), her fazda müşterinin eline geçen somut şey ve müşterinin harcayacağı süre; CSS grid'de süreye oransal kolon genişlikleri (1fr 1fr 6fr 1fr), üstte hafta cetveli, fazlar arasında dikey çizgi; desktop'ta sol sticky başlık, sağda fazlar scroll ile geçerken aktif faz beyazlaşır. Jenerik 4 kart yerine bilgi grafiği gibi okunur.

### Engagement modelleri ve başlangıç aralıkları bölümü

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Studio Freight (açık engagement modelleri), Basement 'packages', Fons/Hey Studio fiyat şeffaflığı

FAQ'ın önüne üç satırlık net bir 'How to work with us' tablosu: Fixed-scope build (MVP, 4–8 hafta, from €X), Rescue audit (2 hafta, sabit ücret, teslimat: rapor + öncelikli PR listesi), Retainer (aylık, X gün/ay). Tablo olarak (dl/grid), mono etiket yok; her satırın sonunda ilgili form ön-seçimi ile 'Start →' linki (/start-project?type=audit). Bu, sayfadaki tüm 'zero/complete' vaatlerinden daha fazla güven üretir.

### Markaya ait hero hareketi (stok video yerine)

- **Etki:** orta · **Efor:** büyük · **Referans:** Lusion (shader hero), Unseen Studio (tipografik alan), Resn (imleç etkileşimli canvas)

Hero'daki fiber-optik videonun yerine desktop + pointer:fine için hafif bir canvas: gerçek bir ürün ekran görüntüsünü 2 tonlu ordered-dither ile çizen ve imleç yakınında çözünürlüğü artıran shader (WebGL2, ~120 satır, 60fps, 200 KB altı), ya da JetBrains Mono karakter grid'inin imleçten uzaklığa göre yoğunluk değiştirdiği tipografik alan. Mobil ve reduced-motion'da statik dithered kare. Sitenin başka hiçbir yerinde olmayan tek bir 'wow' anı, sayfa başına bir tane yeter.

### FAQ: animasyonlu details + doğrudan iletişim satırı

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys FAQ, Linear docs accordion, Vercel 'FAQ' details animasyonu

interpolate-size/::details-content ile yükseklik geçişi (fallback: framer-motion height auto), '+' ikonunun 45° dönerek '×' olması, name="faq" ile tekil açılım, hover'da soru metninde underline draw; sol sticky kolonun altına 'Didn't find it? hello@alaz.pro — reply within one business day' satırı. Böylece FAQ sayfanın kapanış CTA'sını da üstlenir ve kopya About CTA'sı silinebilir.

### Hover'da anlam taşıyan stack notları

- **Etki:** düşük · **Efor:** küçük · **Referans:** Rauno Freiberg'in micro-interaction notları, Paco Coursey hover-card yaklaşımı

Stack satırındaki her teknoloji için tek cümlelik 'neden' notu (ör. PostgreSQL → 'Boring, transactional, 15 years of backups we trust'); hover/focus'ta tag'ın altında 12px mono olarak 150ms'de belirir, mobilde tap ile. Radix tooltip değil, özel absolute span. Bu hem services-05'teki kutuları haklı çıkarır hem de 'engineers wrote this' hissini kanıtlar.
