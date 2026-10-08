# Tipografi ve layout sistemi (sayfalar arası)

**Boyut puanı:** 4/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 34 (4 kritik · 15 önemli · 15 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sitenin tipografisi bir "sistem" değil, 129 kez kopyalanmış inline utility string'i (text-[12px] ×129, tracking-[.085em] ×86, leading-[1.6] ×84; src/lib/ui.js bunu bilinçli bir karar olarak ilan ediyor). Archivo Black + fit() ölçekleme gerçekten iyi bir temel; ama onun üstüne kurulan dil, sahibinin "AI slop" diye tarif ettiği şablonun ta kendisi: her bölümde mono eyebrow + index numarası (19 adet), her başlıkta gri nokta, her şey ALL-CAPS, 13px gövde metni, tek ağırlıkta hairline'lar, algılanamayan 12 farklı siyah tonu, aksan rengi olarak sadece yeşil "ping" noktası. Ölçüm sonuçları somut zanaat hataları da gösteriyor: −.075em display tracking kelime boşluklarını yok ediyor ("WHATWE ACTUALLYDO", "HOWWE", "Theshortversion"), h-etiketi olmayan display elemanları Inter 800 ile basılıyor (iki ağır grotesk yan yana), JetBrains Mono sahte kalın render oluyor, mobilde fit() kardeş başlıkları 38–55px arasında rastgele boyutlandırıyor ve About'ta h1 (43px) kendi h2'sinden (64px) küçük kalıyor. Obys/Studio Freight/Zhenya Rynzhuk seviyesine çıkmak için gereken şey yeni font değil; token'lanmış bir tip ölçeği, gerçek bir 12 kolon grid, caps/mono'nun sadece veri için kullanılması, ölçü (measure) disiplini ve markadan ("alaz" = alevin keskin kenarı) türeyen tek bir aksan. Not: bu sandbox'ta Inter indirilemedi (document.fonts: "Inter Fallback … error"), ekran görüntülerindeki gövde metni metrik-uyumlu fallback ile basılmış; Archivo ve JetBrains Mono gerçek yüzleriyle yüklendi, display/mono yargıları doğrudan geçerli.

## Korunması gerekenler

- Archivo Black (900) display yüzü seçimi default değil ve karakteri var; 'ALAZ.' wordmark'ı 230px'te gerçek bir varlık taşıyor (home-desktop-fold.png). Yüzü değiştirmeyin, kullanım kurallarını değiştirin.
- src/lib/fit.js + globals.css .fit (171–184): Archivo'nun ölçülmüş advance width'leriyle en uzun kelimeyi kolona sığdıran, Türkçe karakterleri bilen, JS'siz çalışan akıllı bir ölçekleme. Bu, token'lanmış bir display ölçeğinin omurgası olmalı.
- Case studies index listesi (case-studies/page.jsx:41–48): tablo başlığı + 100px proje adı + disiplin satırı; Locomotive/Studio Freight tarzı 'index' kalıbı doğru kurulmuş. Koruyun, veri sütunları ekleyin.
- Blog gövde tipografisi (Markdown.jsx:101): 720px ölçü, 20px/1.78, çizgi madde işaretleri, kod chip'leri — okuma ritmi doğru (blogpost-d-body-1.png). Sitede ölçü disiplininin tutturulduğu tek yer.
- Services detay bloklarının 3 sütunlu editoryal yapısı (numara/kategori | içerik | stack/sonuç; services/page.jsx:140) bilgi hiyerarşisi açısından sağlam (svc-d-block01.png).
- Tek akışkan gutter (--gutter: clamp(24px,4.2vw,72px), globals.css:37) tüm sayfalarda tutarlı; kenar hizası hiçbir sayfada kaymıyor.
- Köşesiz (--radius:0) + hairline disiplini tutarlı uygulanmış; sorun disiplin değil, hiyerarşisizlik. Mobil tek sütun çöküşü temiz, hiçbir sayfada yatay taşma yok.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `typography-01` — Tip sistemi yok: 129 kopya inline string, sıfır token

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/lib/ui.js:1; src/app/globals.css:138–162; tailwind.config.js (fontSize/spacing tanımı yok); grep: text-[12px] ×129, font-mono ×124, tracking-[.085em] ×86, leading-[1.6] ×84; aynı eyebrow className'i 19 dosya satırında birebir kopya (örn. page.jsx:77, about/page.jsx:41, services/page.jsx:75, blog/page.jsx:31, LegalContent.jsx:12, IntakeForm.jsx:98)

**Sorun.** Tipografinin tamamı sayfa dosyalarına yapıştırılmış arbitrary değerlerden oluşuyor; ui.js açıkça '100% inline Tailwind' kararı alındığını yazıyor. Aynı eyebrow satırı 19 kez, aynı h1 className'i 8 kez kopyalanmış. globals.css'teki h1/h2 kuralları (font-weight 800, letter-spacing −.035em, line-height 1.15, text-wrap: balance) her yerde override edildiği için ölü kod. Mono boyutunu 1px değiştirmek 129 düzenleme demek; sayfalar arası tutarsızlıkların (bkz. 07, 09, 12) kaynağı bu.

**Neden önemli.** Craft + ölçeklenebilirlik: Awwwards seviyesindeki siteler az sayıda, adı olan stil üzerine kurulur (display-1/2, title, lead, body, meta). Tokensız sistem her yeni sayfada biraz daha dağılır; bu dağılma ekranda 'şablondan türemiş' hissi olarak okunur.

**Ne yapılmalı.** tailwind.config.js theme.extend.fontSize'a tuple'lar tanımlayın: 'display-1': ['clamp(72px,11vw,200px)', {lineHeight:'.88', letterSpacing:'-.04em', fontWeight:'900'}], 'display-2': ['clamp(48px,7vw,120px)', {lineHeight:'.92', letterSpacing:'-.035em', fontWeight:'900'}], 'title': ['clamp(28px,3vw,56px)', {lineHeight:'1.02', letterSpacing:'-.025em', fontWeight:'700'}], 'lead': ['clamp(18px,1.6vw,24px)', {lineHeight:'1.35', letterSpacing:'-.015em'}], 'body': ['clamp(15px,1.05vw,17px)', {lineHeight:'1.6'}], 'meta': ['12px', {lineHeight:'1.5', letterSpacing:'.04em'}]. Eyebrow'u, page-header'ı, section-head'i component yapın (<Eyebrow/>, <PageHeader tier="primary"/>). globals.css'teki ölü h1–h6 kurallarını silin; gerçek değerleri @layer base'e token'dan yazın. ui.js'deki notu kaldırın.

> **Doğrulayıcı notu:** Sayımlar doğrulandı: text-[12px] ×129, font-mono ×123, tracking-[.085em] ×86, leading-[1.6] ×84; eyebrow satırı 19 yerde (ikisi about/page.jsx:64,68 yorum satırında, 17'si canlı). tailwind.config.js'de fontSize/spacing token'ı yok, ui.js:1 '%100 inline' notu var. Düzeltme: globals.css:146–162 h1–h6 kuralı 'ölü kod' DEĞİL — font-family: var(--font-display) bütün başlıkların Archivo almasının tek kaynağı, text-wrap: balance her başlıkta hesaplanmış değer olarak görünüyor (computed 'balance'), font-weight 700 ise ağırlık sınıfı olmayan h3'lere (services/page.jsx:158,161,174,182,186 mono etiketler, LegalContent.jsx:17 h2) uygulanıyor ve 15 numaralı faux-bold hatasının doğrudan sebebi. Yalnızca letter-spacing ve h1 line-height değerleri her yerde override edilmiş. Fix'in geri kalanı (fontSize tuple'ları, <Eyebrow/>, <PageHeader/>) geçerli; 'ölü kuralları silin' yerine 'kuralı token'lardan besleyin ve ağırlığı açıkça verin' denmeli.

#### `typography-02` — Her bölümde mono eyebrow + index numarası: slop sinyali #1

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** 19 eyebrow satırı: page.jsx:77,96,130,188; about/page.jsx:41,52,73; services/page.jsx:75,101,199,222; case-studies/page.jsx:34; case-studies/[slug]/page.jsx:87; blog/page.jsx:31; blog/[slug]/page.jsx:88; LegalContent.jsx:12; IntakeForm.jsx:98. Numaralandırma: page.jsx:45 '— 001 / 005', :54 '01 / 05', :206 '05 / 05', :100 '01 — 03', :77 'TESTIMONIALS // 03'; messages/en.json 'SERVICES / 001', 'STUDIO / 001', 'INDEX / 001', 'BLOG / 001'. Ekran: home-desktop-full.png, services-desktop-full.png, about-desktop-full.png

**Sorun.** Her bölüm aynı kalıpla açılıyor: üst hairline + sol 'NN / ETİKET' + sağ 'ETİKET // NN' mono satırı. Ana sayfada tek ekranda üç farklı sayaç notasyonu var: '— 001 / 005' (kicker), '01 / 05' (alt satır), 'TESTIMONIALS // 03'; services 'SERVICES / 001' üç haneli, about process '01 / 04' iki haneli. Sayılar hiçbir şeye karşılık gelmiyor (home 5 bölüm değil, 4 bölüm + CTA; 'EXTERNAL SIGNAL 01' ile 'TESTIMONIALS 03' aynı satırda). Sahibin listesindeki '01 / 05 index eyebrows on every section' birebir bu.

**Neden önemli.** Slop sinyali + hiyerarşi: Meta veri gibi görünen süs, okuyucuya 'burada bir sistem var' vaat edip hiçbir bilgi vermiyor. 19 kez tekrarlanan aynı satır sayfa ritmini ayarlara benzetiyor; SOTD sitelerinde bölüm etiketi vardır ama ya tek kelimedir ya da gerçek veridir (yıl, müşteri, konum).

**Ne yapılmalı.** Eyebrow'u sadece sayfa başlığının üstünde, tek sol etiket olarak bırakın (örn. 'Services', 'Studio', 'Index'); sağ etiketi ve tüm 'NN / NN' sayaçlarını kaldırın. Bölüm başlıklarının üstündeki hairline+eyebrow satırı yerine yalnızca boşluk ritmi (--s-7) ve h2 kullanın. Sayı sadece gerçekten sayılabilen şeyde kalsın (case studies index 'No.', deliverables, process adımları) ve tek notasyonla: iki haneli, ince boşluklu '01' (font-variant-numeric: tabular-nums). Mono yüzü yalnızca bu verilere ayırın (bkz. 03).

#### `typography-03` — ALL-CAPS her seviyede: hiyerarşi aracı olarak caps tükenmiş

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json'da içerik hard-coded büyük harf (nav.linkLabels, services[].title, projects[].name/discipline/type, testimonials[].name/role, contact.offices[].region, intake.steps, archive.tableHeaders…); Header.jsx:33 nav, :38 CTA; page.jsx:46 h1, :78 h2, :101 h3, :86 'MERVE T.', :172 proje adı; services/page.jsx:145 uppercase; IntakeForm.jsx:115 adım etiketleri. Ekran: home-desktop-full.png (paragraflar dışında tüm metin caps), start-project-desktop-full.png

**Sorun.** Nav, h1, h2, h3, CTA, eyebrow, etiket, isim, rol, adres bölgesi, tag, marker, tablo başlığı — gövde paragrafları hariç her şey büyük harf. Sadece blog başlıkları, FAQ soruları ve services process h3'leri karışık harf. Caps bir vurgu aracıyken her yerde kullanılınca vurgu gücü sıfırlanıyor; h3 'WEB APPLICATIONS' ile testimonial rol 'PROJECT MANAGER' aynı tonu taşıyor. Ayrıca caps JSON'a yazıldığı için screen reader'lar 'ALAZ', 'IOS' gibi kısaltmaları harf harf okuyabilir ve CSS ile sentence case'e dönmek mümkün değil.

**Neden önemli.** Slop sinyali + okunabilirlik: 'dark brutalist' şablonun temel tik'i; Archivo'nun güçlü küçük harfleri hiç kullanılmıyor. Obys ve Studio Freight display'de sentence case/lowercase ile kontrast yaratır; caps'i sadece wordmark ve tek kelimelik etiketlere saklar.

**Ne yapılmalı.** Kural: caps yalnızca h1 display ve wordmark'ta. h2 bölüm başlıkları sentence case Archivo 900 (örn. 'Core capabilities', 'Selected work'); h3 kart/adım başlıkları sentence case 700; nav/CTA/etiketler sentence case Inter 500 12–14px, tracking 0 ile +.01em. İsimler/roller normal yazım ('Merve T. — Project manager'). en.json'daki tüm caps string'leri doğal yazıma çevirin; caps gereken yerde CSS 'uppercase' kullanın (a11y + esneklik). Mono'yu yalnızca sayısal/teknik veriye (tarih, No., stack chip'leri, adres satırı) indirin; etiket ve CTA'larda Inter.

#### `typography-missed-1` — İki buzzword marquee'si bölüm ayırıcı olarak kullanılıyor

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:59–74 (49px, 'ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE'), :107–126 (55px, 'TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS ✳ ARCHITECTURAL INTEGRITY ✳ UNCOMPROMISING PRECISION'); tailwind.config.js:106–118 signal-marquee/ticker; home-desktop-full.png

**Sorun.** Ana sayfanın dikey ritmi iki yatay mono bant tarafından bölünüyor; ikisi de aria-hidden (saf süs) ve içerik olarak sahibin slop listesindeki 'marquees of buzzwords' maddesinin kendisi. Bantlar aynı 12px/.085em mono eyebrow tipiyle basıldığı için eyebrow satırlarıyla karışıyor; sayfa 'hairline → eyebrow → h2 → bant → hairline → eyebrow' döngüsüne giriyor.

**Neden önemli.** Slop sinyali + layout: Bölüm geçişi boşluk ritmiyle değil hareketli şeritle yapılınca sayfa 'şablon bloğu' gibi okunuyor; ayrıca iki ek hairline çifti ekliyor (bkz. 11).

**Ne yapılmalı.** İki marquee'yi ve tailwind keyframe/animation tanımlarını kaldırın; bölüm geçişini --s-7 boşluk ve tek --rule-strong ile yapın. Hareketli bant isteniyorsa yalnızca bir tane, gerçek veriyle (müşteri/proje adları ya da canlı 'now building' satırı) ve display yüzüyle (Archivo 900, outline) — Locomotive/Basement'taki gibi tipografik bir an olarak, buzzword listesi olarak değil.

### ÖNEMLİ

#### `typography-04` — Display tracking −.075em kelime boşluklarını yok ediyor, harfler değiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:78,97,135 (tracking-[-.075em]), :191; services/page.jsx:82,106,203,227 (−.07/−.075em); about/page.jsx:43,74; case-studies/page.jsx:44 (−.08em); blog/[slug]/page.jsx:93 (−.06em, karışık harf); blog/page.jsx:53 (−.055em); Markdown.jsx:67 (−.06em). Ölçüm 1440: h2 151px → letter-spacing −11.3px; blog h1 92px → −5.5px. Kanıt kırpıntıları: typo/svc-h2-0.png 'WHATWE ACTUALLYDO.', typo/svc-h2-6.png 'HOWWE', typo/post-h1.png 'WhatDoesaSlowWebsite', typo/post-h2.png 'Theshortversion', typo/blog-card-h2.png, typo/home-cap-h2.png (CAPABILITIES harfleri neredeyse değiyor)

**Sorun.** Negatif tracking boşluk karakterine de uygulandığı için 150px'te kelime arası ~24px'ten ~13px'e düşüyor ve 'HOW WE' → 'HOWWE', 'WHAT WE ACTUALLY DO' → 'WHATWE ACTUALLYDO' okunuyor. Karışık harfli blog başlıklarında (−.06em) 'Does a Slow' kelimeleri birbirine yapışıyor; Markdown h2 'The short version' tek kelime gibi. Archivo Black zaten dar iç boşluklu bir yüz; −.075em'de 'LI', 'TI', 'AB' çiftleri birbirine giriyor. fit.js:21'deki TRACKING −0.05 de gerçek kullanılan −.075/−.08 ile uyuşmuyor (hesap tutarlı ama varsayım belgelenmemiş).

**Neden önemli.** Craft: Bu, bir tipografın ilk bakışta gördüğü hata; SOTD jürisi için 'tracking'i ayarlayı bilmiyorlar' sinyali. Okunabilirliği de somut olarak düşürüyor.

**Ne yapılmalı.** Archivo Black için ölçek bazlı tracking: ≥120px −.035em, 60–120px −.03em, 28–60px −.02em, karışık harfli başlıklarda en fazla −.025em. Her display sınıfına word-spacing kompanzasyonu ekleyin: word-spacing: .12em (−.035em'de) / .18em (−.05em'de). Markdown h2/h3 ve blog kart h2'lerini −.02em'e çekin. font-kerning: normal ve font-feature-settings 'kern' açık kalsın; 'LY', 'AT', 'TA' çiftleri için gerekirse display h1'de manuel <span style="margin-left:.02em"> yerine değişken font (bkz. additions) tercih edin. fit.js TRACKING sabitini yeni değere (−0.035) güncelleyin.

> **Doğrulayıcı notu:** Ana iddia kendi ölçümümle doğrulandı: 1440'ta h2 151.2px → letter-spacing −11.34px; services h2 115px'te kelime arası boşluk 12.7px (0.11em), about h1 167px'te 17.6px, case study h2 72px'te 7.9px, blog kart h2 36px'te 4.5px, Markdown h2 42px'te 5px. Kendi kırpıntılarım (shots/skeptic-svc-h2-whatwe.png 'WHATWE ACTUALLYDO.', skeptic-svc-h2-howwe.png 'HOWWE', skeptic-post-h2.png 'Theshortversion', skeptic-post-h1.png) görsel olarak teyit ediyor. Düzeltmeler: (1) reviewer'ın atıf yaptığı typo/*.png dosyaları shots klasöründe yok; kanıt yukarıdaki dosyalardır. (2) fit.js:21 TRACKING −0.05 'belgelenmemiş' değil — :20 yorumu bilinçli olarak 'en gevşek tracking' (muhafazakâr tahmin) seçildiğini yazıyor; yine de başlıklar yeni tracking'e çekilince sabit güncellenmeli. (3) '~24px'ten ~13px'e' rakamı yaklaşık; 151px'te gerçek boşluk ~16–17px. Fix (ölçek bazlı tracking + word-spacing kompanzasyonu) doğru.

#### `typography-05` — Display yüzü sızıntısı: h-etiketi olmayan büyük metinler Inter 800 ile basılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:48 hero tagline <p font-extrabold> ('NO BULLSHIT. JUST ACTION.' → Inter 800, 41.8px); about/page.jsx:80 ve services/page.jsx:253 <p font-extrabold> 64.8px (ölçüm: Inter 800); case-studies/[slug]/page.jsx:160 ve blog/[slug]/page.jsx:123 next-link <span font-extrabold> 46px; Header.jsx:38 CTA, :43–45 mobil nav 25px; blog/[slug]/page.jsx:109 avatar 'A.' (font-mono + font-extrabold). layout.jsx:15 Archivo weight ['600','700','900'] — 800 yüklü değil, 29× font-extrabold Archivo başlıkta 900'e yuvarlanıyor; Inter'de ise 800 yüklü. Ekran: home-desktop-fold.png (ALAZ. Archivo 900 vs tagline Inter 800), about-desktop-full.png alt CTA

**Sorun.** globals.css:152 yalnızca h1–h6'ya --font-display veriyor; display boyutunda kullanılan p/span/a elemanları --font-body (Inter) ile ve font-extrabold'la render oluyor. Sonuç: hero'da 230px Archivo Black'in 150px altında 42px Inter Extrabold; about/services sonunda 65px Inter 800 slogan; case study 'next project' 46px Inter 800. Archivo 800 isteyen 29 sınıf da aslında 900 basıyor — kodda var sanılan 800/900 hiyerarşisi ekranda yok. Üstüne Footer.jsx:17 ve about/page.jsx:84'te JetBrains Mono font-light (300) isteniyor, yüklü değil (400/500).

**Neden önemli.** Craft + marka: İki ağır grotesk yan yana (Archivo Black + Inter Extrabold) en klasik 'kontrolsüz' tipografi tellerinden biri; yüz kararının tesadüfi (etiket tipine bağlı) olduğu anlaşılıyor.

**Ne yapılmalı.** Display'i etikete değil sınıfa bağlayın: her display/title elemanına font-display (yeni .t-display-*/.t-title token sınıfları) uygulayın; globals.css h1–h6 kuralını kaldırın. Yük planı: Archivo 900 (display) + 700 (title/h3), Inter 400 + 500 (body/meta/CTA), JetBrains Mono 400 — 600/800 Inter'i ve 600 Archivo'yu kaldırın (layout.jsx:15–17). Hero tagline'ı ya Archivo 900 sentence case title boyutuna (clamp(28px,3vw,56px)) taşıyın ya da Inter 500 lead olarak küçültün; about/services kapanış sloganı ve next-link'ler Archivo. Mono'da font-light/font-bold kullanımını silin.

#### `typography-06` — 1440px'te 13px gövde metni: okunmayan 'body'

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:49 hero intro text-[13px] (290px ölçü), :101 servis kartı açıklaması 13px, :175 proje özeti 13px, :192 CTA paragrafı 14px; blog/page.jsx:54 özet 14px; IntakeForm.jsx:119 aside 13px, :12 input 14px; services/page.jsx:183,187 14px. Ölçüm: desktop p 13px/20.8px, renk #9fa3a9/#c3c5c8. Ekran: home-desktop-fold.png sağ alt paragraf, home-desktop-full.png servis kartları

**Sorun.** Sitenin asıl bilgi taşıyan metinleri (ne yaptığınız, projelerin özeti) 13px ve gri (#9fa3a9 → ~6:1 kontrast, geçer ama 13px'te zayıf). 230px wordmark'ın yanında 13px intro, 17,7× oran — hiyerarşi değil uçurum. Aynı sayfada lead 17px (page.jsx:79), services'te 15px, legal'de 15px, blog gövdesi 20px: gövde boyutu sayfadan sayfaya 13→20 arasında geziyor.

**Neden önemli.** Usability + craft: 2026 SOTD sitelerinde masaüstü gövde 16–18px; 13px 'dashboard/terminal' estetiğinin kalıntısı ve sahibin istediği 'premium' hissin tersi. Küçük gri metin dark şablonların en tanınan tellerinden.

**Ne yapılmalı.** Tek body token'ı: clamp(15px,1.05vw,17px)/1.6, renk en az #c4c4c4 (gri ramp'ta --fg-2); kart açıklamaları ve proje özetleri bu token'ı kullansın. Lead (hero intro, sayfa girişleri): clamp(18px,1.6vw,24px)/1.35, beyaz. Meta (tarih, No., caption) 12–13px'te kalabilir ama yalnızca mono/veri için. Ölçüyü px değil ch ile sınırlayın (max-w-[38ch] intro, [62ch] gövde). text-wrap: pretty ekleyin (Chromium'da dul/yetim satırları azaltır).

#### `typography-07` — Ters hiyerarşi: süs display boyutunda, bilgi gövde boyutunda; sayfa başlıkları ağırlıktan bağımsız dev

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** case-studies/[slug]/page.jsx:112,120,128 — her projede aynı sabit sloganlar ('BUILD FOR WHAT'S NEXT.', 'PRECISION AT EVERY LAYER.', 'LESS NOISE. MORE SIGNAL.') 72px Archivo; gerçek içerik :114,122,130 22px gri. blog/page.jsx:36 'THE BLOG.' 230px (2 yazı için 950px'lik hero); LegalContent.jsx:13 'LEGAL.'/'PAGE NOT FOUND.' 187px; IntakeForm.jsx:108 168px. page.jsx:78 'VALIDATION.' 151px + 46px lucide ShieldCheck. Ekran: case-vocabulary-desktop-full.png, blog-desktop-full.png, 404-desktop-fold.png, legal-desktop-full.png

**Sorun.** Case study sayfasında projenin en büyük tipi proje hakkında hiçbir şey söylemeyen üç slogan; asıl challenge/approach/outcome metni 22px gri sütunda. Blog index, 404, legal, intake gibi yardımcı sayfalar ana hizmet sayfalarıyla aynı 170–230px başlık ölçeğini alıyor; 'THE' tek başına 230px'lik bir satır harcıyor. Ölçek: 230/168/151/115/72/60/42/36/25 → 20/18/15/13 — 36px ile 20px arasında tutarlı kullanılan hiçbir kademe yok, display'den gövdeye geçiş kademesiz.

**Neden önemli.** Hiyerarşi + brand: Jüri 'büyük tip'i değil, büyüklüğün bir şey anlatmasını ödüllendirir. Slogan h2'ler template kalıntısı gibi okunuyor; yardımcı sayfalarda dev başlık ise sitenin tek numarası olduğunu ele veriyor.

**Ne yapılmalı.** Üç kademeli sayfa başlığı: hero (home, 16vw), primary (services/work/about, clamp(64px,10vw,160px)), utility (blog, legal, 404, intake, clamp(40px,5.5vw,88px)). Case study: slogan h2'leri kaldırın; display boyutunu proje adına ve gerçek bir metriğe verin ('24 languages', '8.000 words', 'DST-aware engine'), bölüm başlıkları 'Challenge / Approach / Outcome' title token'ı (clamp(28px,3vw,56px)) olsun, paragraflar lead boyutu ve beyaza yakın. Blog index'te 'The blog' yerine utility kademe + ilk yazıyı büyük başlıkla öne çıkaran editoryal liste. ShieldCheck ikonunu kaldırın; display başlığın yanında ikon değil boşluk olmalı.

#### `typography-08` — fit() kardeş başlıkları eşitsiz boyutlandırıyor; mobilde hiyerarşi tersine dönüyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:78,97,135 aynı [--fit-size:…] ile; ölçüm mobile/home h2: 38.6 / 44.5 / 50.7 / 54.6px (VALIDATION, CORE CAPABILITIES, SELECTED WORKS, START PROJECT); desktop: 151/151/151/180. about: mobile h1 43.4px (WE ENGINEER PERMANENCE) < h2 'ALAZ.' 64px < 'FOUR MOVES' 44px; services mobile h1 43.8px. Ekran: typo/about-m-hero.png vs typo/about-m-h2.png, home-mobile-full.png, about-mobile-full.png

**Sorun.** fit() her başlığı kendi en uzun kelimesine göre küçültüyor (CAPABILITIES → 38px, PROJECT → 55px). Aynı seviyedeki h2'ler bir sayfada %40 fark ediyor; About'ta 'PERMANENCE' kelimesi yüzünden h1 43px'e düşüp kendi alt bölümünün 64px'lik h2'sinin altında kalıyor. Masaüstünde de START PROJECT (12.5vw) diğer h2'lerden (10.5vw) büyük.

**Neden önemli.** Hiyerarşi + craft: Boyut, kelime uzunluğuna değil bilgi seviyesine bağlı olmalı; mobil kullanıcı About sayfasında başlığın hangisi olduğunu boyuttan okuyamıyor.

**Ne yapılmalı.** fit()'i tekil değil grup bazlı çalıştırın: fitGroup([heading1, heading2, …]) en büyük em'i döndürsün ve sayfadaki tüm aynı-kademe başlıklar aynı --fit-em'i paylaşsın (sunucu tarafında hesaplanıyor, maliyeti yok). Mobilde kelime bazlı sığdırma yerine alt sınır koyun: h1 min 15vw, gerekirse 'PERMA-NENCE' kırılımı yerine satır sayısını artırın (text-wrap: balance + hyphens: manual). h2 kademesi tek --fit-size kullansın (START PROJECT dahil).

#### `typography-09` — Dikey ritim yok: 60+ farklı boşluk değeri, aynı page-header 6 farklı ölçüyle

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** grep (pt|pb|mt|mb|my|py)-[Npx]: 60'tan fazla farklı değer (25,19,100,60,50,70,35,30,80,28,85,65,22,34,20,12,42,32,110,90,55,45,18,128,75,14,76,66,44,40,38,160,10,105…). Page header kicker üst boşluğu: about:42 mt-[105px], case-studies:35 clamp(80px,10vw,155px)=144px, blog/[slug]:92 mt-[110px], LegalContent:13 my-[130px], IntakeForm:106 pt-[100px], case [slug]:91 pt-[110px]; h1→intro: about:43 mb-[70px], case-studies:36 mb-[60px], IntakeForm:108 my-[30px]; bölüm başı: page.jsx:78 mt-[72px], :97 mt-[74px], services:105 mt-[70px], about:74 my-[65px]

**Sorun.** Aynı bileşen her sayfada el ile farklı değerle yazılmış: kicker ile h1 arası 100–144px, h1 ile giriş paragrafı arası 30–70px, bölüm eyebrow ile h2 arası 65–74px. Section alt boşlukları 100/110/120/135/155/160px. Ritim yok; sayfalar yan yana konduğunda hizalanmıyor (about-desktop-full.png vs services-desktop-full.png).

**Neden önemli.** Craft: SOTD sitelerinde boşluk, tip ölçeği gibi bir ölçektir (ör. 8'in katları veya modüler oran); gözün sayfalar arasında 'aynı el' hissetmesi buradan gelir.

**Ne yapılmalı.** Akışkan boşluk token'ları: --s-1 8px, --s-2 16px, --s-3 clamp(20px,2vw,32px), --s-4 clamp(32px,3.5vw,56px), --s-5 clamp(48px,6vw,96px), --s-6 clamp(72px,9vw,144px), --s-7 clamp(96px,12vw,200px). Tailwind spacing'e ekleyin (s1…s7). Kurallar: section padding --s-6, eyebrow→h2 --s-4, h2→içerik --s-5, h1→lead --s-4, kart içi --s-3. Tek <PageHeader> ve <SectionHead> component'i bu token'ları kullansın; arbitrary px boşluk yazmayı lint ile yasaklayın (eslint-plugin-tailwindcss no-arbitrary-value, spacing için).

#### `typography-10` — Grid yok: hero'daki 4 hairline dekor, sayfalar ad hoc yüzde kolonlarıyla kurulu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:39 (grid-cols-4, rgba(255,255,255,.065) çizgiler; çizgiler x=360/720/1080, intro paragrafı x≈973'te, h1 720 çizgisini kesiyor — home-desktop-fold.png); services/page.jsx:140 grid-cols-[12%_1fr_36%]; about/page.jsx:75 grid-cols-[15%_1fr_32%]; case-studies/page.jsx:41–42 grid-cols-[15%_1fr_25%_50px]; IntakeForm.jsx:111 grid-cols-[31%_1fr]; page.jsx:80,98 grid-cols-3; :142 grid-cols-2; services:209 grid-cols-4; blog:46 grid-cols-2; [slug]:139 grid-cols-4

**Sorun.** Hero'daki dikey çizgiler bir grid vaat ediyor ama hiçbir içerik o kolonlara oturmuyor; başka hiçbir sayfada görünmüyor. Sayfa düzenleri sayfa başına farklı yüzdelerle (12% / 15% / 31% ilk kolon) kurulmuş; services'te etiket kolonu 12%, about'ta 15%, case-studies'te 15% + 25% — aynı 'numara | içerik | yan bilgi' kalıbı üç farklı ölçüyle. Kolon genişlikleri `fit` için [--fit-avail:calc((100vw-2*gutter)*.52-60px)] gibi elle taklit ediliyor (services:151), grid değişince kırılır.

**Neden önemli.** Craft + slop sinyali: 'Fake grid lines' dark şablonların standart süsü; gerçek grid ise Locomotive/Basement/Obys'in hizalama hissinin kaynağı. Ad hoc yüzdeler sayfalar arasında dikey hizayı bozuyor.

**Ne yapılmalı.** 12 kolon CSS grid: :root{--cols:12; --gap:clamp(16px,1.6vw,32px); --col:calc((100vw - 2*var(--gutter) - 11*var(--gap))/12)}. .grid-12{display:grid;grid-template-columns:repeat(12,1fr);column-gap:var(--gap)}. Düzen kuralları: etiket kolonu col 1–2, içerik 3–8, yan bilgi 9–12 (services, about process, case sections hepsi aynı); kartlar 4+4+4; blog 6+6; intake 4+8. Hero çizgilerini ya gerçek 12 kolona (her 3. kolon) oturtup içeriği onlara hizalayın ya da kaldırın; geliştirme için 'G' tuşuyla açılan grid overlay ekleyin. .fit'teki --fit-avail'ı kolon sayısından türetin: calc(var(--col)*6 + var(--gap)*5).

#### `typography-11` — Tek ağırlıkta hairline + algılanamayan 12 siyah tonu: bölüm sınırı yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** globals.css:32 --line rgba(255,255,255,.13) (her ayırıcıda aynı); bg: #090909 ×13, #111 ×6, #141414 ×5, #1a1a1a, #0a0a0a, #1c1c1c, #171717, #161616, #0f0f0f, #0e0e0e, #0d0d0d; home akışı page.jsx:76 #0e0e0e → :95 bg-ink #0a0a0a → :107 #141414 → :129 #111 → :184 #090909; tailwind.config.js:35–39 panel/well/faint/soft/silver ekstra tonlar. Ekran: home-desktop-full.png, services-desktop-full.png

**Sorun.** Bölüm sınırı, kart kenarı, tablo satırı, eyebrow çizgisi, footer çizgisi, FAQ satırı — hepsi aynı 1px %13 beyaz. Sayfa 30+ eşit ağırlıklı çizgiyle bölünmüş; göz neyin bölüm neyin satır olduğunu ayıramıyor. Arka plan tonları #090909 ile #141414 arasında (L* ≈ 3–8) geziyor; bu farklar kalibre monitörde bile algılanmıyor, yalnızca kodda var.

**Neden önemli.** Craft: Hairline'lar bir hiyerarşi dili olabilir (Studio Freight) ama ancak 2–3 ağırlıkla ve boşlukla birlikte. 'Her şeye hairline' + 'gri üstüne gri' tam olarak 'generic dark brutalist' tanımı.

**Ne yapılmalı.** İki çizgi token'ı: --rule-strong rgba(255,255,255,.28) (bölüm/sayfa sınırları, 1px) ve --rule rgba(255,255,255,.09) (satır/kart iç çizgileri). Kart/sütun ayırıcılarının yarısını kaldırıp boşlukla (--s-4) ayırın. Yüzey ramp'ını 3 algılanabilir adıma indirin: --bg-0 #0a0a0a, --bg-1 #121212, --bg-2 #1c1c1c (her adım ≥ 4 L*); diğer tüm hex arka planları silin, tailwind.config panel/well/faint/soft/silver'ı kaldırın. Bölüm geçişinde ya bg adımı ya strong rule — ikisi birden değil.

#### `typography-12` — 28 farklı gri metin rengi, 4 farklı 'nokta' grisi

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** grep text-[#…]: #eee ×17, #6e6e6e ×11, #b4b4b4 ×9, #777 ×6, #aaa ×5, #bdbdbd, #a6a6a6, #5f5f5f, #cfcfcf, #c9c9c9, #9a9a9a, #858585, #e8e8e8, #e1e1e1, #d9d9d9, #d6d6d6, #c3c5c8, #bababa, #b9b9b9, #8a8a8a, #73777d, #717171, #6f7277, #666, #555 + text-mute/text-dim/muted-foreground token'ları + text-white/85, /90. Gri nokta: page.jsx:78 #5f5f5f, about:43 #6e6e6e, about:74 #777, case [slug]:93 #8a8a8a, Header:29 #777, page.jsx:46 #858585

**Sorun.** Aynı rol (ikincil metin) sayfaya göre #9fa3a9, #b4b4b4, #c3c5c8, #c9c9c9, #d6d6d6 ile yazılmış; aynı 'signature' nokta beş farklı griyle. Bu tonlar yan yana gelince (home hero: intro #c3c5c8, kicker #b9b9b9, topline #a6a6a6, CTA paragrafı #b4b4b4, alt not #aaa) birbirinden ayırt edilemez ama kod tabanını yönetilemez kılar.

**Neden önemli.** Craft: Renk de bir ölçektir; SOTD siteleri 4–5 nötr tonla yaşar. 28 ton 'tasarım yok, sayfa sayfa göz kararı' demektir.

**Ne yapılmalı.** Nötr ramp: --fg-1 #ffffff (display/başlık), --fg-2 #cfcfcf (gövde), --fg-3 #9a9a9a (ikincil/meta), --fg-4 #6b6b6b (pasif/nokta), --fg-5 #353535 (disabled/çizgi metni). Tailwind colors'a fg-1…5 olarak ekleyin, arbitrary text-[#…] kullanımını kaldırın (28 → 5). Nokta rengi tek: --fg-4 (ya da aksan, bkz. 13). shadcn --muted-foreground (220 5% 63%) gibi mavi-gri değerleri saf nötre çekin; mono palet mavi kaymadan ötürü 'soğuk şablon' gibi okunuyor.

> **Doğrulayıcı notu:** grep text-[#…]: 28 farklı değer; ancak bunlardan #f2a6a6 (hata kırmızısı), #050505/#080808 (beyaz buton üstü metin) rol olarak farklı — saf gri ikincil metin tonu sayısı ~24. Nokta grisi: page.jsx:78 #5f5f5f, about:43 #6e6e6e, about:74 #777, case [slug]:93 #8a8a8a, page.jsx:46/Footer:16 #858585, Header:29 #777 → başlıkta 'dört' değil BEŞ farklı gri (reviewer metni 'beş' diyor, başlık 'dört'). Hero katmanları #c3c5c8/#b9b9b9/#a6a6a6/#b4b4b4/#aaa doğru. --gray #9fa3a9 ve --dim #7e828a hafif mavi kaymalı, --muted-foreground 220 5% 63% de öyle — 'soğuk şablon' notu geçerli. Fix (5 tonlu nötr ramp) uygun.

#### `typography-13` — Aksan rengi yok; sitedeki tek renk sinyali yeşil 'ping' noktası

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** page.jsx:198–201 (animate-ping bg-emerald-400/500), :190 badge, :42 beyaz kare 'SYSTEM_ACTIVE', IntakeForm.jsx:120 'STATUS: ACCEPTING…' + kare; globals.css:128–131 ::selection beyaz/siyah; :10–28 shadcn hsl değişkenleri tamamen 0% doygunluk; renk yalnızca proje görsellerinden (sarı Vocabulary, teal Market Hours) geliyor. Ekran: home-desktop-full.png START SEQUENCE butonu

**Sorun.** Palet %100 nötr; markanın adı ('alaz' = alevin parlak kenarı, about/page.jsx:59'da bizzat tanımlanmış) sıcak bir aksan için bariz bir gerekçe sunuyor ama kullanılmıyor. Yerine tek renkli unsur olarak emerald ping noktası — sahibin slop listesindeki 'pulsing green dots' maddesi.

**Neden önemli.** Brand + slop sinyali: Monokrom tek başına fikir değildir; fikir, rengin nerede patladığını seçmektir. Tek bir sıcak aksan siteyi 'generic dark' kümesinden anında ayırır ve 'alaz' hikâyesini görsele bağlar.

**Ne yapılmalı.** Tek aksan: --ember #FF4A1C (ya da #F25C1A); yalnızca şu yerlerde: ::selection arka planı, wordmark/başlık noktası hover/route-change'de, ReadProgress çubuğu (ReadProgress.jsx:20), aktif nav göstergesi, hero'da tek kelime veya tek çizgi, form focus ring. Emerald ping ve köşe braket'leri kaldırın (page.jsx:193–203), buton typografik olsun. Aksanın sayfadaki alanı %1'i geçmesin; geri kalan her şey nötr ramp.

#### `typography-14` — Gri nokta her başlıkta: imza tik'e dönüşmüş

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** 19 display başlık + Header.jsx:29 + Footer.jsx:16 '<span className="text-[#…]">.</span>'; page.jsx:46 h1 noktası text-[.7em] tracking-[-.1em] (gri kare blok gibi, home-desktop-fold.png); services/page.jsx:86,110,207,231; blog/page.jsx:37; IntakeForm.jsx:102,108; LegalContent.jsx:13. Ekran: services-desktop-full.png (bir sayfada 5 nokta), about-desktop-full.png

**Sorun.** Wordmark'taki nokta (ALAZ.) bir imza olabilir; ama 'VALIDATION.', 'CORE CAPABILITIES.', 'HOW WE OPERATE.', 'QUESTIONS & PRACTICAL ANSWERS.', 'PAGE NOT FOUND.', 'REQUEST RECEIVED.' — her h1/h2 aynı gri noktayla bitince imza, tekrar eden bir tik'e dönüşüyor. Hero'da .7em'e küçültülmüş nokta Archivo Black'te yuvarlak değil gri bir kare gibi görünüyor; '2026'daki AI-site estetiğinin tanınır unsuru.

**Neden önemli.** Brand + slop sinyali: Bir sitenin tek tasarım fikri 'gri nokta' olamaz; 25 kez tekrarlanınca jüri bunu 'template suffix' olarak okur.

**Ne yapılmalı.** Noktayı yalnızca wordmark'ta tutun (header + hero); h2/h3/utility başlıklardan kaldırın. Wordmark noktasını anlamlı hale getirin: aksan rengi (bkz. 13), sayfa geçişinde 160ms'lik scale/renk animasyonu, hover'da ember. Hero'daki text-[.7em] küçültmeyi kaldırın; Archivo'nun kendi noktası (1em) kullanılsın.

#### `typography-17` — Ölçü (measure) disiplini yok: 105 karakterlik satırlar ve 23 farklı max-w

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** LegalContent.jsx:14 max-w-[780px] + :17 15px/1.8 → ~105 karakter/satır (legal-desktop-full.png, privacy-desktop-full.png); services/page.jsx:159 whatItIs 600px @15px (~85 kar.); page.jsx:79 lead max-w yok (ölçüm w 1319px); grep max-w: 550, 600, 520, 780, 740, 720, 370, 950, 680, 660, 620, 610, 480, 420, 400, 340, 315, 290, 280, 250, 240, 230, 1300 (23 değer)

**Sorun.** Legal/privacy metni 15px'te 780px'e yayılıp 100+ karakterlik satırlar üretiyor (okuma için ideal 45–75). Home lead cümlesi sınırsız genişlikte; uzadığı anda 150 karakter olur. Ölçüler px cinsinden ve her paragrafta farklı: 230, 250, 280, 290, 315, 340, 370, 400… — ölçü, yazı boyutuna değil kutuya göre kararlaştırılmış.

**Neden önemli.** Usability + craft: Ölçü, tip boyutu ve satır aralığıyla birlikte okunabilirliğin üç ayağından biri; px ile sabitlenince boyut değişince bozulur.

**Ne yapılmalı.** Ölçüleri ch ile üç token'a indirin: --measure-narrow 28ch (yan notlar, kart açıklamaları), --measure-text 62ch (gövde, legal, services detay), --measure-wide 80ch (lead/hero intro, yalnızca ≥20px'te). Legal: 17px/1.7 ve 62ch (~560px). Lead paragraflara max-w-[36ch]. Markdown 720px'i 62ch'e çevirin (aynı sonuç, ölçeklenir).

#### `typography-18` — Altı farklı buton tipografisi

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** Header.jsx:38 (Inter 800 12px .04em, pt-15/pr-19/pb-15/pl-22); page.jsx:97 'EXPLORE SERVICES' (mono 12 .03em altı çizili); :138 'VIEW ALL PROJECTS' (mono 12 .03em border min-h-49 px-18); :193–203 'START SEQUENCE' (mono 12 .2em uppercase, px-32 py-20 min-h-58, köşe braketleri + ping); about:80 / services:260 (Inter 800 12px .04em px-23 py-18 min-h-58); IntakeForm.jsx:189 (Inter 800 .03em min-h-55 px-22); LegalContent.jsx:20 '← BACK TO HOME' (mono border); case [slug]:96 (mono bordered) + StoreButtons.jsx:16–17 (10px .12em + 15px .06em)

**Sorun.** Yüz (mono vs Inter), ağırlık (400 vs 800), tracking (.03/.04/.2em), yükseklik (49/55/58px) ve padding her butonda farklı; 'START SEQUENCE' köşe braketi + yeşil nokta ile sahibin slop listesinin iki maddesini birden taşıyor. Aynı eylem (Start a project) üç sayfada üç farklı kılıkta.

**Neden önemli.** Craft + slop sinyali: Buton, tip sisteminin en çok tekrar eden parçası; tutarsızlığı en hızlı fark edilen şey. Köşe braketi/ping kombinasyonu 'AI-builder' estetiğinin imzası.

**Ne yapılmalı.** İki varyant: primary (beyaz zemin, Inter 500 14px sentence case, tracking 0, h 52px, px 24, ok glifi '→' metin olarak, hover'da zemin --ember veya ters çevirme) ve secondary (metin + '→', alt çizgi animasyonu, aynı tip). Tüm mono/caps/tracking .2em buton stillerini ve köşe braketlerini kaldırın; StoreButtons'u aynı iki varyanta indirin. Tek <Button variant> component'i.

> **Doğrulayıcı notu:** Tüm buton stilleri kodda doğrulandı (Header:38 Inter 800 12px .04em; page.jsx:97 mono altı çizili; :138 mono bordered min-h-49; :193–203 mono .2em uppercase köşe braketi + emerald ping; about:80/services:260 Inter 800 min-h-58; IntakeForm:189 min-h-55; LegalContent:20 ve case [slug]:96 mono bordered; StoreButtons 10px/.12em + 15px/.06em). Ek bulgu: 'START SEQUENCE' font-semibold → JBM 600 yok, faux bold (ölçüm weight 600). Severity yükseltildi: köşe braketi + yanıp sönen nokta sahibin slop listesinde adıyla geçiyor ve aynı eylem (Start a project) 4 farklı kılıkta — bu 'polish' değil, görünür sistem eksikliği.

#### `typography-19` — Hero'da 10 metin katmanı: tipografik odak yok

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:41–55: status pill 'SYSTEM_ACTIVE' (:42) + topline 'SOFTWARE STUDIO / EST. 2026' + kicker 'WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO' + '— 001 / 005' (:45) + h1 (:46) + tagline (:48) + intro (:49) + PoweredBy ×2 (:51, PoweredBy.jsx:10) + 'SCROLL TO EXPLORE' + 'PRECISION IS THE STANDARD…' + '01 / 05' (:54). about:41–45 ve services:75–94 aynı kalıp (eyebrow çifti + kicker + h1 + intro + not + PoweredBy). Ekran: home-desktop-fold.png, about-desktop-fold.png

**Sorun.** Tek viewport'ta üç farklı yüz, dört boyut, dokuz etiket; 'ALAZ.' tek başına güçlüyken etrafındaki mono mikro-etiketler (hiçbiri bilgi taşımıyor: 'SYSTEM_ACTIVE', '001 / 005') dikkati bölüyor. Kompozisyon alt yarıya yığılmış (üstte 300px boşluk, altta 5 satır). PoweredBy satırı hero'nun en değerli alanını iki üçüncü-taraf logosuyla dolduruyor.

**Neden önemli.** Hiyerarşi + slop sinyali: SOTD hero'ları 2–3 elemandır (headline, bir cümle, bir eylem); kalan her etiket odağı seyreltir ve 'template' hissini artırır.

**Ne yapılmalı.** Hero'yu 3 elemana indirin: wordmark/headline, tek cümlelik lead (clamp(18px,1.6vw,24px), beyaz, max-w 36ch), bir CTA. Status pill, topline, kicker, sayaçlar, 'precision is the standard', PoweredBy'ı kaldırın (PoweredBy tamamen gitmeli; kullanılan araçlar portföy değildir). 'Scroll' ipucu gerekiyorsa tek ok glifi. Aynı sadeleştirmeyi about/services/case-studies/blog page-header'larına uygulayın (eyebrow tek kelime + h1 + lead).

> **Doğrulayıcı notu:** page.jsx:41–55 sayım: status pill, topline sağ, kicker, '— 001 / 005', h1, tagline, intro, PoweredBy×2, scroll CTA, bottom note, '01 / 05' = 12 metin parçası (reviewer '10' demiş, az saymış). pt-[30vh] ile üst ~300px boş, kompozisyon alt yarıda (home-desktop-fold.png). Düzeltme: services/page.jsx:75–94 page-header'ında PoweredBy YOK (about:45'te var); kalıp 'eyebrow çifti + kicker + h1 + intro + not' olarak doğru. Fix (3 eleman) uygun.

#### `typography-missed-2` — Hard-coded caps marka yazımlarını bozuyor: IOS, SAAS, DEVOPS — ama APIs doğru

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:13 'WEB / SAAS / PLATFORMS', :20 'IOS / ANDROID / CROSS-PLATFORM', :38 'LANGUAGE LEARNING / IOS & ANDROID', :177 'WEB APPLICATIONS & SAAS', servicesPage.items[1].category 'IOS / ANDROID', items[3].title 'CLOUD INFRASTRUCTURE & DEVOPS' vs items[2].title 'BACKEND, APIs & INTEGRATIONS'; home-desktop-full.png servis kartları, svc-d-block01.png

**Sorun.** Büyük harf JSON'a yazıldığı için 'iOS', 'SaaS', 'DevOps' yazılamıyor ve ekranda 'IOS', 'SAAS', 'DEVOPS' çıkıyor; aynı sayfada 'APIs' ise karışık harfle bırakılmış — tek sayfada iki kural. Bir mühendislik stüdyosunun 'IOS' yazması okuyucunun ilk fark ettiği yazım hatasıdır.

**Neden önemli.** Craft + marka güvenilirliği: 03 numaralı bulgunun somut, ölçülebilir sonucu; tipografi okuryazarı jüri 'IOS'u ilk saniyede görür.

**Ne yapılmalı.** en.json'daki tüm string'leri doğal yazıma çevirin ('iOS / Android', 'Web applications & SaaS', 'Cloud infrastructure & DevOps'); caps gereken yerde CSS text-transform: uppercase kullanın ve marka adlarını <span class='normal-case'> ile koruyun. Lint: en.json'da /\b(IOS|SAAS|DEVOPS|GRAPHQL|POSTGRESQL)\b/ için test.

### İNCE İŞÇİLİK

#### `typography-15` — JetBrains Mono sahte kalın (faux bold) ve yüklenmeyen ağırlıklar

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** globals.css:146–156 h1–h6 font-weight 700; services/page.jsx:158,161,174,182,186 <h3 className="font-mono …"> (ölçüm: fw 700, JBM yalnızca 400/500 yüklü — layout.jsx:17); services:142 span font-bold; blog/[slug]/page.jsx:109 avatar font-mono font-extrabold; Footer.jsx:17 ve about:84 font-light (300 yok). Ekran: svc-d-block01.png ('THE PROBLEM & SCOPE', 'STACK' etiketleri '01 / 05'ten belirgin biçimde daha kalın ve bulanık)

**Sorun.** Services'teki mono etiketler h3 olduğu için global 700 ağırlığı alıyor; JetBrains Mono 700 yüklenmediğinden tarayıcı 400'ü yapay kalınlaştırıyor (stroke'lar şişkin, iç boşluklar kapanıyor). font-light isteyen e-posta linki de 300 olmadığı için 400 basıyor.

**Neden önemli.** Craft: Faux bold, tipografi okuryazarlığının en bilinen testidir; 1440px ekranda etiketlerle sayaçların farklı 'kalınlıkta' görünmesi düzensizlik hissi veriyor.

**Ne yapılmalı.** Mono'yu her zaman 400 (veya 500) kullanın; h3.font-mono için font-weight: 500 verin ya da bu etiketleri h3 yerine <p role="heading"> değil, düz <span> yapıp başlık seviyesini görsel değil anlamsal (visually-hidden h3) tutun. font-bold/font-light'ı mono elemanlardan kaldırın. Alternatif: JBM yerine daha karakterli bir mono (örn. 'Geist Mono', 'Commit Mono', 'Berkeley Mono' lisanslı) 400 + 500 ile.

#### `typography-16` — Base heading kuralları ölü; text-wrap: balance ile <br/> ve nowrap çatışıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** globals.css:146–162 (h1–h6 font-weight 700/800, letter-spacing −.02/−.035em, line-height 1.15, text-wrap: balance); her h1/h2'de <br /> ile manuel satır kırımı (page.jsx:97,135,191; about:43,74; services:82–86,106–111,203–207,227–231; IntakeForm:108; blog/page.jsx:37) ve page.jsx:46 whitespace-nowrap; .fit overflow-wrap: break-word (globals.css:178)

**Sorun.** globals'daki başlık değerleri hiçbir elemanda görünmüyor (hepsi tracking-[…]/leading-[…] ile override). text-wrap: balance tüm başlıklarda açık ama satırlar <br/> ile zorlandığı için balance'ın yapacağı iş yok; mobilde fit() küçültme + <br/> birlikte 'SOFTWARE / ENGINEERING.' gibi iki kelimeyi iki küçük satıra bölüp altında boşluk bırakıyor (services-mobile-fold.png).

**Neden önemli.** Craft: Satır kırımı tasarımcı kararı olmalı ama bunu viewport'tan bağımsız <br/> ile sabitlemek mobilde ritmi bozuyor; ölü CSS ise sistemin nerede yaşadığını belirsizleştiriyor.

**Ne yapılmalı.** Base kuralları token'lara taşıyın (bkz. 01) ve <br/>'leri kaldırın; satır kırımını max-width (ch) + text-wrap: balance ile yönetin (h1 max-w-[8ch], h2 max-w-[12ch]). Satır tabanlı reveal için <br/> yerine SplitType/GSAP SplitText 'lines' kullanın (bkz. additions). Mobilde h1'in 2–3 satır olmasına izin verin, min 14–15vw.

> **Doğrulayıcı notu:** <br/> kullanımı ve page.jsx:46 whitespace-nowrap, .fit overflow-wrap (globals.css:178) doğru. 'globals'daki başlık değerleri hiçbir elemanda görünmüyor' ifadesi yanlış: font-family, text-wrap: balance (tüm başlıklarda computed 'balance') ve ağırlık sınıfı olmayan h3/h2'lerde 700 (services mono h3, LegalContent h2) aktif; override edilen yalnızca letter-spacing ve h1 line-height. balance + <br/> çatışması ve mobilde 43.8px'lik h1'in altında masaüstü mb-[70px]'in kalması (services-mobile-fold.png'deki boşluk) geçerli. Fix: <br/> yerine max-width(ch) + balance ve mobil alt sınır — uygun.

#### `typography-20` — Mobilde eyebrow sağ etiketi 2–3 satıra kırılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right — page.jsx:77,96,130; about:41,52,73; services:75; blog:31… Ekran: typo/about-m-hero.png ('OUR OPERATING / PRINCIPLES'), about-mobile-full.png ('WHY WE'RE CALLED / ALAZ', 'ONE PROCESS / EVERY / PROJECT'), services-mobile-fold.png ('WEB / MOBILE / SYSTEMS' iki satır)

**Sorun.** Mono 12px etiketler 390px'te %50 genişliğe sıkışıp sağa yaslı 2–3 satırlık düzensiz bloklara dönüyor; sol etiketle hizası bozuluyor, bölüm başı 'gürültü' ile açılıyor.

**Neden önemli.** Craft: Mobil, Awwwards değerlendirmesinde ayrı puanlanır; ilk ekrandaki kırık mikro-tipografi en görünür hatadır.

**Ne yapılmalı.** Kısa vadede sağ etiketi mobilde gizleyin (mobile:hidden) ya da alt alta tek sütun yapın. Uzun vadede 02 numaralı bulgu: sağ etiketler tamamen kalkar, tek sol etiket kalır.

> **Doğrulayıcı notu:** mobile:[&_span:last-child]:max-w-[50%] text-right kalıbı belirtilen satırlarda var. Ölçüm 390px: 'WHY WE'RE CALLED ALAZ', 'ONE PROCESS / EVERY PROJECT', 'WEB / MOBILE / SYSTEMS', 'SELECTED PROJECTS // 02', 'OUR OPERATING PRINCIPLES' hepsi 38px yükseklik = 2 satır (skeptic-about-m-hero.png, services-mobile-fold.png). '2–3 satır' → gözlemlenen her durumda 2 satır; 3 satır örneği bulunamadı. Fix (mobile:hidden / uzun vadede kaldırma) uygun.

#### `typography-21` — Mobil menü 25px linkler, ekranın alt %40'ı boş

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** Header.jsx:42–45 (text-[25px] font-extrabold Inter, py-[24px], '0N' mono prefix); nav-open-mobile.png

**Sorun.** Tam ekran menü, sitenin tipografik gücünü (Archivo 900) kullanmıyor; 25px Inter 800 linkler + mono numaralar ortada kısa bir liste bırakıyor, altındaki 300px boş. Menü, mobilde sitenin en büyük tipografik anı olabilecekken en zayıfı.

**Neden önemli.** Craft + brand: Obys, Lusion, Unseen gibi stüdyolarda menü bir 'tip poster'ıdır; staggered line reveal ve büyük display linkler marka karakterini mobilde tek başına taşır.

**Ne yapılmalı.** Linkleri Archivo 900 clamp(40px,12vw,56px), sentence case, satır başına 1 link, SplitType ile 60ms staggered mask reveal; numaraları kaldırın. Altı sabitleyin: e-posta + dil anahtarı + sosyal (mono 12px, --fg-3). Aktif sayfayı ember noktayla işaretleyin.

> **Doğrulayıcı notu:** Header.jsx:42–45 text-[25px] font-extrabold (font-display yok → Inter 800), py-[24px], mono '0N' prefix doğru; nav-open-mobile.png'de son satır y≈635'te bitiyor, 844px ekranın altında ~200px (%25) boş — reviewer'ın '300px / alt %40'ı abartılı. Archivo 900 display linkler + staggered reveal önerisi uygun.

#### `typography-22` — Font yükleme stratejisi: 10 yüz, display:'swap' ile 230px FOUT

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** layout.jsx:15–17 (Archivo 600/700/900, Inter 400/500/600/700/800, JBM 400/500; hepsi display:'swap'; latin+latin-ext → ~20 dosya). Bu ortamda document.fonts: 'Inter Fallback … error' (--font-inter → 'Inter Fallback'); .next/static/media'da 9 woff2

**Sorun.** Archivo 600 hiç kullanılmıyor, Inter 600/700/800 ve JBM 500 nadiren (bkz. 05 ile çözülünce hiç). 230px display'de 'swap' ilk boyamada metrik-uyumlu fallback'ten Archivo'ya geçişte görünür bir 'zıplama' üretir (LCP elemanı). Not: Bu sandbox'ta Inter indirilemedi; prod'da next/font self-host ettiği için büyük olasılıkla sorun yok ama ekran görüntülerindeki gövde metni gerçek Inter değil — Inter'in kendisi hakkında burada yargı verilmedi.

**Neden önemli.** Craft + performans: Font dosyası sayısı CLS/LCP'yi, swap ise ilk izlenimi etkiler; jüri ilk 2 saniyede 'hero zıpladı' notunu düşer.

**Ne yapılmalı.** Ağırlıkları 5'e indirin: Archivo 900 + 700, Inter 400 + 500, JBM 400. Display yüzü için display:'block' (kısa, 1–3s) veya 'optional' + <link rel=preload>; Inter için 'swap' kalabilir. adjustFontFallback varsayılan açık kalsın. Daha ileri: Archivo'nun değişken sürümünü (wght+wdth tek dosya, ~90KB) kullanın; hem dosya sayısı düşer hem genişlik ekseni bir hiyerarşi aracı olur (bkz. additions).

> **Doğrulayıcı notu:** layout.jsx:15–17 ağırlıklar ve display:'swap' doğru; Archivo 600 hiçbir display elemanında kullanılmıyor (font-semibold yalnızca Inter/mono elemanlarda) — doğrulandı. document.fonts bu ortamda 'Inter Fallback … error' veriyor, Archivo 900 ve JBM 400/500 loaded. Düzeltme: '230px display'de swap görünür zıplama üretir' iddiası doğrulanmadı — next/font/google dosyayı self-host edip <link rel=preload> ile yüklediğinden swap penceresi çoğu bağlantıda ~0; yalnızca yavaş ağda görünür. Ağırlık budaması (5 dosya) ve değişken Archivo önerisi geçerli; display:'optional' önerisi ise ilk ziyarette Archivo'yu hiç göstermeme riski taşır, 'block' daha güvenli.

#### `typography-23` — Her sayfada hero ile aynı 230px footer wordmark + About'ta iki kez adres

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** Footer.jsx:16 (hero h1 ile birebir aynı className, 16vw); about/page.jsx:82–87 contact bloğu (e-posta + ContactInfo large) + hemen altında Footer (aynı adresler); Ekran: about-desktop-full.png (adresler iki kez), home-desktop-full.png (ALAZ. iki kez)

**Sorun.** Ana sayfada kullanıcı 230px 'ALAZ.'ı önce hero'da sonra footer'da görüyor; 'THE WORK.'/'THE BLOG.' gibi aynı ölçekteki sayfa başlıklarıyla birlikte her sayfada iki dev başlık. About'ta adresler önce 14px mono blokta, 200px aşağıda footer'da 12px mono ile tekrar.

**Neden önemli.** Hiyerarşi: Dev tipin etkisi nadirlikten gelir; her sayfada iki kez 16vw görmek etkiyi bitirir. Tekrarlanan adres, sayfanın kurgulanmadığını söyler.

**Ne yapılmalı.** Footer wordmark'ını farklı bir muameleye çevirin: ya viewport'tan taşan, alt kısmı kesilmiş 30vw outline (stroke) 'ALAZ', ya da 56px wordmark + büyük e-posta (clamp(28px,4vw,64px) Archivo). About'taki contact bloğunu kaldırın; footer zaten o iş için var. Hero'nun 16vw'sini home'a özel tutun; THE WORK/THE BLOG primary/utility kademesine insin (bkz. 07).

#### `typography-24` — Aynı 'process' içeriği iki sayfada iki farklı tip muamelesi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** about/page.jsx:73–75 (h2 'FOUR MOVES ZERO GUESSWORK' 108px + h3 60px Archivo 700 caps + 15px gövde; svc: about-desktop-full.png) vs services/page.jsx:198–217 (h2 'HOW WE OPERATE' 115px + h3 24px Archivo 800 sentence case + 15px gövde; svc-d-process.png); her iki sayfa aynı 65px Inter 800 kapanış sloganıyla bitiyor (about:80, services:253)

**Sorun.** Dört adımlı süreç, About'ta 60px caps liste, Services'te 24px dört sütun kart olarak kurulmuş; adım başlığı bir sayfada h2 boyutunda, diğerinde kart başlığı. Kapanış CTA'sı iki sayfada birebir aynı (slogan + buton).

**Neden önemli.** Craft: Aynı bilgi türü aynı tip kalıbını almalı; aksi hâlde kullanıcı iki süreç sanıyor, sistem ise 'sayfa başına yeniden tasarlanmış' okunuyor.

**Ne yapılmalı.** Tek <ProcessList> component'i (numara col 1–2 tabular mono, başlık col 3–7 title token Archivo 700 sentence case, gövde col 8–12 body token); About'ta tam, Services'te aynı bileşen özet modunda. Kapanış sloganını yalnızca bir sayfada tutun; diğerinde doğrudan footer.

> **Doğrulayıcı notu:** about:73–75 h2 108px + h3 60.48px Archivo 700 caps + 15px gövde; services:198–217 h2 115.2px + h3 24px Archivo 800 sentence case + 15px gövde; her ikisi de aynı tAbout('endTextTop/Bottom') sloganı ve butonla bitiyor (ölçüm 64.8px Inter 800) — doğru. Düzeltme: içerik 'aynı' değil, iki sayfada iki FARKLI dört adımlı süreç metni var (about: DISCOVER / ARCHITECT / ENGINEER / HARDEN; services: Deep Discovery / System Blueprint / Iterative Execution / Production & Handover). Bu, tip tutarsızlığından daha ciddi: kullanıcı iki farklı süreç okuyor. Fix: tek <ProcessList> + tek içerik kaynağı (en.json'da tek processSteps).

#### `typography-25` — Kod söz dizimi tipografik süs olarak: '// ROLE', '+ madde', 'SYSTEM_ACTIVE'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** page.jsx:86 '// {role}', :101 '// {category}', :157 '// ASSET IN PROGRESS'; blog/[slug]/page.jsx:110 '// {author.role}'; services/page.jsx:165 '+' madde işareti; en.json home.hero.status 'SYSTEM_ACTIVE' (alt çizgi), intake.sectionTopLeft 'PROJECT INTAKE / SECURE TRANSMISSION'

**Sorun.** Yorum satırı öneki, alt çizgili sabit adı ve '+' işaretleri tipografik hiyerarşi değil 'developer cosplay' işlevi görüyor; rol/kategori gibi basit meta bilgi '// ' ile başlayınca okunurluk düşüyor ve sahibin listesindeki 'SYSTEM_ACTIVE pills' maddesiyle örtüşüyor.

**Neden önemli.** Slop sinyali: LLM üretimi dark sitelerin ortak tik'i; gerçek mühendislik stüdyoları (Basement, Resn) kodu süs olarak kullanmaz.

**Ne yapılmalı.** '// ' öneklerini kaldırın; rol/kategori düz meta token (Inter 500 12–13px, --fg-3), gerekirse en-dash ile ('Merve T. – Project manager'). Madde işareti: Markdown'daki gibi kısa çizgi (before: 13px hairline) ya da hiç. 'SYSTEM_ACTIVE', 'SECURE TRANSMISSION', 'COMMAND SEQUENCE READY' gibi string'leri silin.

#### `typography-26` — İkonlar tip sisteminin dışında: 4 farklı stroke, display başlığın yanında lucide

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:78 ShieldCheck 46px strokeWidth 1 (151px h2'nin yanında); :164 ArrowUpRight 18 strokeWidth 1.5; Header.jsx:38 ArrowUpRight 15 strokeWidth 2.2; case-studies/page.jsx:46 ArrowUpRight 28 strokeWidth 1.3; case [slug]:161 ArrowRight 38 strokeWidth 1.2; blog/page.jsx:57 Clock 13 strokeWidth 1.6; IntakeForm.jsx:189 CirclePower; messages: '← ALL CASE STUDIES' (metin oku) ile <ArrowLeft/> (ikon) karışık

**Sorun.** Ok ikonları 1.2–2.2 arasında dört farklı kalınlıkta ve 13–38px arasında yedi boyutta; bazı yerde Unicode ok ('←', '↗' footer/en.json), bazı yerde lucide SVG. Display başlığın yanındaki 46px ShieldCheck tip ölçeğine ait değil, placeholder gibi duruyor.

**Neden önemli.** Craft: Oklar bu sitede tipografik noktalama işlevi görüyor; kalınlığı metnin stroke'uyla eşleşmezse 'ekli' görünür. 'lucide icons everywhere' sahibin listesinde.

**Ne yapılmalı.** Okları metin glifine çevirin (Archivo/Inter '→', '↗', '←' — yüzle aynı ağırlıkta, aynı baseline'da, font-size 1em) ya da tek bir custom 2-ikonluk set (arrow, arrow-up-right) stroke 1.5, 1em boyutunda currentColor ile; lucide bağımlılığını UI dışına çıkarın. ShieldCheck, Clock, CirclePower'ı kaldırın (okuma süresi düz metin '7 min').

> **Doğrulayıcı notu:** Tüm konumlar doğru (page.jsx:78 ShieldCheck 46/1; :164 18/1.5; Header:38 15/2.2; case-studies:46 28/1.3; case [slug]:161 38/1.2; blog:57 Clock 13/1.6; IntakeForm:189 CirclePower; '← ALL CASE STUDIES' metin oku vs <ArrowLeft/>). Düzeltme: sayım eksik — stroke kalınlıkları 1 / 1.2 / 1.3 / 1.5 / 1.6 / 2 (varsayılan + blog:60) / 2.2 = 7 farklı; boyutlar 13,14,15,16,17,18,21,28,34,38 = 10 farklı. Tek 1em/currentColor ok seti önerisi doğru.

#### `typography-missed-3` — Mono 600 faux bold: 'START SEQUENCE' ve mağaza butonları, font-synthesis koruması yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:193 (font-mono … font-semibold), src/components/StoreButtons.jsx:7+17 (BASE font-mono + span font-semibold 15px); layout.jsx:17 JBM weight ['400','500']; globals.css'te font-synthesis tanımı yok. Ölçüm: START SEQUENCE computed weight 600 (home-desktop-full.png), case-vocabulary-desktop-full.png APP STORE / GOOGLE PLAY

**Sorun.** 15 numaralı bulgu yalnızca services h3 etiketlerini sayıyor; ana sayfanın tek CTA'sı ve case study'nin mağaza butonları da yüklenmemiş JBM 600 isteyip sentetik kalınlaştırılıyor (stroke şişkin, harf içi boşluklar kapanıyor). Hiçbir global koruma olmadığı için her yeni font-bold/semibold mono kullanımı aynı hatayı üretir.

**Neden önemli.** Craft: Sitenin en görünür butonunda faux bold; sorun tekil değil sistemik.

**Ne yapılmalı.** globals.css @layer base'e `html { font-synthesis: none; }` (veya font-synthesis-weight: none) ekleyin — yüklü olmayan ağırlık istendiğinde tarayıcı en yakın gerçek yüzü kullanır, şişirmez. Mono elemanlardan font-semibold/font-bold/font-extrabold'u kaldırın; vurgu gerekiyorsa 500 kullanın. Tek <Button> component'i (bkz. 18) mono kullanmasın.

#### `typography-missed-4` — Optik sol hizalama yalnızca wordmark'ta: display başlıkların sol kenarı sayfalar arasında 10px kayıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:46 ve src/components/Footer.jsx:16 '-ml-[.044em]'; diğer tüm display h1/h2'lerde yok. Ölçüm 1440: hero h1 x=50, footer wordmark x=50, VALIDATION/CORE CAPABILITIES/THE WORK/SOFTWARE ENGINEERING h1/h2 x=60. home-desktop-full.png (ALAZ. sol kenarı VALIDATION'dan solda), case-studies-desktop-full.png (THE WORK vs footer ALAZ)

**Sorun.** Wordmark'a Archivo'nun yan boşluğunu telafi eden −.044em optik marj verilmiş, kardeş display başlıklarına verilmemiş; aynı sayfada 230px tipin sol kenarı 10px içeride/dışarıda. Göz bunu 'hizasız' olarak okur, özellikle hero → footer karşılaştırmasında.

**Neden önemli.** Craft: Optik hizalama ya sistemin parçasıdır ya hiç yoktur; tek elemana uygulanınca diğerlerini bozuk gösterir.

**Ne yapılmalı.** Optik marjı display token sınıfına taşıyın (.t-display-1/.t-display-2 { margin-left: -.044em }) ya da tüm display başlıklara `text-box-trim`/`-ml-[.04em]` uygulayın; wordmark'ta ayrı değer bırakmayın. Alternatif: wordmark'tan da kaldırıp gutter'ı referans alın.

#### `typography-missed-5` — Mono etiketlerde iki farklı tracking yan yana: body'nin −.011em'i mono'ya sızıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/globals.css:63 body letter-spacing −.011em; tracking sınıfı olmayan mono elemanlar: Footer.jsx:26 'BACK TO TOP ↑' (aynı satırda :22 copyright .085em ve :23 linkler .06em — tek çubukta üç tracking), IntakeForm.jsx:188 prev button, services/page.jsx:165,238,239 '+'/'−', StoreButtons.jsx:7 BASE, blog/[slug]:109 avatar; footer çubuğu home-desktop-full.png alt kısım

**Sorun.** Mono yüz için tek bir tracking tanımı yok; .085em sınıfı 86 kez kopyalanmış ama unutulan her mono eleman body'den −.011em alıyor. Footer alt çubuğunda aynı 12px mono üç farklı harf aralığıyla (.085 / .06 / −.011em) basılıyor.

**Neden önemli.** Craft: Mono etiketler sitenin 'sistem' hissini taşıyan katman; aralık tutarsızlığı tam da o katmanda dağınıklık hissi verir.

**Ne yapılmalı.** globals.css'te `.font-mono, code, pre { letter-spacing: .06em }` gibi tek mono token'ı tanımlayın (ya da @layer components .t-meta), body'deki −.011em'i yalnızca --font-body'ye bağlayın; sayfalardaki tracking-[.085em]/[.06em]/[.07em]/[.03em] varyantlarını tek değere indirin.

#### `typography-missed-6` — Okuma metinlerinde negatif tracking: lead paragraflar −.04em, blockquote −.035em

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** about/page.jsx:44 ve :57 (27px/26px, −.04/−.03em), services/page.jsx:89 (−.04em), case-studies/page.jsx:37 (−.04em), blog/page.jsx:40 (−.04em), case-studies/[slug]:94 (32px, −.04em), blog/[slug]:94 (−.04em), IntakeForm.jsx:109 (−.03em), page.jsx:83 blockquote 15–20px font-medium −.035em. Ölçüm: about intro 27px → −1.08px, case summary 32px → −1.28px

**Sorun.** 18–32px'lik gövde/lead metinlere display tracking'i uygulanmış; Inter bu boyutlarda 0 ile −.015em arasında tasarlanmıştır, −.04em'de kelime içi boşluklar kapanır ve okuma hızı düşer. Testimonial blockquote 15px'te bile −.035em alıyor. Not: bu ortamda Inter yüklenmediği için ekran görüntüsünden görsel teyit yapılamadı; bulgu kod değerlerine dayanır.

**Neden önemli.** Craft + okunabilirlik: Tracking ölçekle birlikte azalmalı; tek bir 'sıkı' değer her boyuta yayılınca lead ile display farkı kaybolur.

**Ne yapılmalı.** Lead token'ı (clamp(18px,1.6vw,24px)) için letter-spacing −.015em; 28–32px özetler için −.02em; ≤16px gövde/blockquote 0. Bu değerleri token tuple'larına yazın (bkz. 01), sayfalardaki tracking-[-.04em]/[-.035em]/[-.03em] sınıflarını kaldırın.

#### `typography-missed-7` — Sayfa üstünde ve services'te çift hairline

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** (a) Tüm iç sayfalar: Header.jsx:27 border-b (y=76) + eyebrow border-t (y≈128–130, pt-[128px]/[130px]) → 52px arayla iki tam genişlik çizgi (404-desktop-fold.png, blog-desktop-full.png, legal-desktop-full.png). (b) services/page.jsx:193 '<div className="border-b border-line">' + :198 pt-[20px] + :199 eyebrow border-t → 20px arayla iki çizgi (svc-d-double-rule.png'de görünür)

**Sorun.** Hairline disiplini 'her bölüm üstte bir çizgiyle başlar' kuralıyla kurulmuş ama bitiş çizgileriyle çakışmaları düşünülmemiş: her iç sayfa iki paralel çizgiyle açılıyor, services'te hizmet listesinin alt çizgisi ile process eyebrow'unun üst çizgisi arasında 20px boşluk kalıyor.

**Neden önemli.** Craft: Çift çizgi, çizgi dilinin kontrol edilmediğini ilk bakışta ele verir; sayfa açılışında (ilk ekran) olması etkisini büyütür.

**Ne yapılmalı.** Kural: bölümler ya üst çizgi ya alt çizgi taşır, ikisi değil. services:193'teki kapanış div'ini silin (process eyebrow'un border-t'si yeter). İç sayfalarda eyebrow'un border-t'sini kaldırıp header çizgisini tek referans yapın ya da eyebrow'u header'ın hemen altına (pt-[76px] + --s-3) çekin; header'ı scroll öncesi transparan/çizgisiz tutmak da seçenektir.

#### `typography-missed-8` — Sitedeki tek ortalanmış kompozisyon: home 'START PROJECT' bölümü ve intake 'request received'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:189 'text-center m-auto' (badge + h2 + p + buton ortalı); IntakeForm.jsx:99 'items-center justify-center text-center'; home-desktop-full.png alt bölüm

**Sorun.** Diğer tüm bölümler ve sayfa başlıkları sol gutter'a hizalı sol-eksenli bir sistemken CTA bölümü ortaya hizalanıyor; 180px'lik h2 ve 14px paragraf sayfanın tek merkez ekseni oluyor. Bu, eyebrow satırının (sol/sağ) kendi kalıbıyla da çelişiyor: bölümün üstü sol-sağ, ortası merkez, altı yine sol-sağ.

**Neden önemli.** Layout sistemi: Hizalama ekseni sayfa boyunca değişince 'aynı el' hissi kaybolur; ortalanmış CTA + badge + buton dizilimi ayrıca en tanıdık landing-page kalıbıdır.

**Ne yapılmalı.** CTA bölümünü sol hizaya alın: h2 col 1–8, paragraf + buton col 9–12 (ya da h2 altında sol), eyebrow satırıyla aynı eksen. Intake tamamlanma ekranını da PageHeader utility kademesiyle sol hizalı kurun. Merkez eksen yalnızca bilinçli bir 'poster' anı için (örn. 404) saklanabilir.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Token'lanmış tip ölçeği + .t-* sınıfları (sistemin omurgası)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (tek display + tek body, az stil), Obys'in tip-öncelikli case study sayfaları

tailwind.config.js theme.extend.fontSize'a tuple'larla 7 stil: display-1 clamp(72px,11vw,200px)/.88/−.04em/900, display-2 clamp(48px,7vw,120px)/.92/−.035em/900, title clamp(28px,3vw,56px)/1.02/−.025em/700, title-sm clamp(20px,1.8vw,28px)/1.15/−.02em/700, lead clamp(18px,1.6vw,24px)/1.35/−.015em, body clamp(15px,1.05vw,17px)/1.6, meta 12px/1.5/+.04em (mono). Spacing token'ları --s-1…--s-7 ve ölçü token'ları (28ch/62ch/80ch) ile birlikte @layer components'ta .t-display-1 … .t-meta; word-spacing kompanzasyonu bu sınıfların içinde. Mevcut 129 arbitrary string'i codemod ile bu sınıflara dönüştürün (tek PR). Sonuç: her sayfa aynı 7 sesle konuşur.

### Değişken Archivo + genişlik ekseni: tipografiye bir 'bakış açısı'

- **Etki:** yüksek · **Efor:** orta · **Referans:** Zhenya Rynzhuk (genişlik/opsz oyunlu display), Resn, Active Theory'nin değişken font hover'ları

Statik Archivo 900 yerine Archivo Variable (wght 100–900, wdth 62–125; Google Fonts'ta mevcut, next/font ile axes:['wdth'] parametresi). Hiyerarşi aracı olarak genişliği kullanın: display 'wdth' 118–125 (Expanded, hero/wordmark), title 'wdth' 100, veri/tablo etiketleri 'wdth' 75 (Condensed, mono yerine!). Hover'da wdth 100→118 interpolasyonu (transition: font-variation-settings .4s) sitenin kendine özgü mikro-etkileşimi olur; tek dosya ile 3 statik ağırlığın yerini alır. Alternatif karakter: display için Bricolage Grotesque (opsz ekseni) veya Instrument Serif italic'i tek kelimelik kontrpuan olarak kullanmak ('alaz' kelimesi serif italic, geri kalan grotesk).

### Gerçek 12 kolon grid + debug overlay

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive (görünür grid disiplini), Basement Studio (grid overlay'i tasarımın parçası yapar)

:root{--cols:12;--gap:clamp(16px,1.6vw,32px)} ve .grid-12 utility; tüm düzenler (etiket 1–2 | içerik 3–8 | yan 9–12; kart 4+4+4; blog 6+6; intake 4+8) buna oturur. Hero'daki hairline'lar gerçek kolonlara (her 3. kolon) taşınır ve ilk ekrandan sonra opacity 0'a scroll ile söner; geliştiricide 'G' tuşuyla açılan grid overlay (position:fixed, repeating-linear-gradient). .fit'in --fit-avail'ı kolon sayısından türetilir, elle yazılmış calc((100vw-…)*.52-60px) değerleri silinir.

### Satır bazlı maskeli başlık reveal'ı (14px fade yerine)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Obys, Hello Monday, Unseen Studio'nun satır maskeleri

SplitType (veya artık ücretsiz GSAP SplitText) ile display başlıkları 'lines' olarak bölün; her satır overflow:hidden bir sarmalayıcıda, translateY(110%)→0, 0.9s cubic-bezier(.16,1,.3,1), satır başına 70ms stagger; lead paragraf 120ms sonra opacity+8px. prefers-reduced-motion'da kapalı. Mevcut data-reveal='mask' (globals.css:83–86) sadece .14em kayıyor — SOTD seviyesinde 'tip hareket eder' hissi buradan gelir. <br/> kaldırıldığında satır bölme viewport'a göre otomatik olur.

### 'Ember' aksan sistemi (markadan türeyen tek renk)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Lusion (tek sıcak aksan + siyah), Basement'in tek renkli vurguları

--ember #FF4A1C: ::selection, wordmark noktası (hover/route change), ReadProgress çubuğu, aktif nav, form focus-ring, hero'da tek vurgulu kelime (örn. 'alaz' kelimesi). Kullanım kotası: sayfa alanının <%1'i; bileşen bazında lint (ember yalnızca .t-accent ve ::selection'da). Monokrom disiplin kalır, ama bir 'fikir' kazanır: about sayfasının zaten anlattığı 'alevin keskin kenarı'.

### Case study 'spec sheet' tipografik bloğu

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight case studies (veri satırları), Locomotive 'project info' tabloları

Slogan h2'lerin yerine projenin gerçek verileri: 2 kolonlu tanım listesi (dl) — Year, Platform, Stack, Timeline, Role, Metrics (ör. '24 languages', '17 games', 'DST-aware engine'); etiketler meta token (mono 400, --fg-3, tabular-nums), değerler title-sm Archivo 700. Büyük sayılar (8.000 kelime, 24 dil) display-2 boyutunda CountUp ile (CountUp.jsx zaten var). Challenge/Approach/Outcome başlıkları title token'ına iner, paragraflar lead boyutuna çıkar. Böylece display boyutu bilgiye, gövde boyutu anlatıya ait olur.

### Mikro-tipografi detayları (jürinin baktığı yerler)

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys'in editoryal detayları; Rynzhuk'un tırnak/asma noktalama kullanımı

hanging-punctuation: first last (Safari; blockquote'larda tırnak dışa taşsın), font-variant-numeric: tabular-nums tüm sayaç/tarih/No. alanlarında, text-wrap: pretty gövdede ve balance başlıklarda, gerçek tipografik tırnak/kesme işaretleri (en.json'daki "'" → ’, "..." → …), ince boşluk (U+2009) 'No. 01' ve '7 min' gibi birimlerde, mono etiketlerde font-variant-caps: all-small-caps yerine gerçek küçük harf + sentence case, blockquote'ta ilk satır büyük harfsiz 'pull quote' ölçeği (title boyutu, −.02em). Hepsi birkaç satır CSS; farkı yalnızca tipografi okuryazarı görür — jüri tam olarak odur.

### Üç kademeli <PageHeader> ve tek <SectionHead> component'i

- **Etki:** orta · **Efor:** küçük · **Referans:** Hello Monday'in sayfa başlığı tutarlılığı

PageHeader tier='hero|primary|utility': eyebrow (tek kelime, meta token) + h1 (display-1 / display-2 / title) + lead (36ch) + opsiyonel tek CTA; dikey boşluklar --s-6/--s-4 sabit. SectionHead: h2 (display-2 sentence case) + opsiyonel sağda secondary link; hairline ve sayaç yok. 19 kopya eyebrow satırı ve 8 kopya h1 string'i bu iki bileşende erir; blog/legal/404/intake utility kademesine iner, sayfa ağırlığı başlık boyutundan okunur hale gelir.
