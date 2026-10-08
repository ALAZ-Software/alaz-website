# Mobil ve responsive deneyim

**Boyut puanı:** 4/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 30 (3 kritik · 16 önemli · 11 ince işçilik) · **Korunacaklar:** 9 · **Eklenecekler:** 9

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Mobil sürüm teknik olarak "kırılmıyor" (390px'te hiçbir sayfada yatay taşma yok, dvh kullanılmış, fit() sayesinde dev başlıklar taşmıyor, form alanları dolu genişlikte) ama tasarım olarak masaüstünün alt alta dizilmiş hâli; mobile özgü tek bir fikir yok. Üç gerçek hata var: mobil menü landscape ve 320px'te body overflow:hidden yüzünden son maddelerine ulaşılamıyor, "NEXT PROJECT" satırında "VOCABULAR / Y" diye kelime ortadan kırılıyor ve hero'nun "SCROLL TO EXPLORE" satırı 100dvh'ye sığmadığı için fold'un altına düşüyor. Daha büyük sorun hiyerarşi: fit() en uzun kelimeye göre küçülttüğü için about'ta h1 43px iken h2 64px, services'te h1 44px / h2 48px; ana sayfadaki bölüm başlıkları 39/45/51/55px arasında geziyor ve ALAZ. hero'da 62px'e iniyor (footer'daki ile aynı boy). Services sayfası mobilde 11.619px (≈14 ekran), capabilities kartlarında kart başına ~120px ölü boşluk, about sayfasında iletişim bloğu footer ile birebir tekrar ediyor, work index'i telefonda tek bir görsel bile göstermiyor. Header'da beyaz CTA + bordered TR + burger dört kontrolle SaaS şablonu hissi veriyor; menü animasyonsuz açılan bir liste. Awwwards seviyesi için mobil, masaüstünün "responsive"ı değil kendi kompozisyonu olan (yatay snap rail'ler, portrait art direction, tam ekran tipografik menü, scroll'la logoya dönüşen wordmark) ayrı bir katman olarak ele alınmalı.

## Korunması gerekenler

- 390px'te hiçbir sayfada yatay taşma yok (report: scrollW=390 her sayfada); marquee'ler overflow-hidden içinde doğru kapatılmış. Bu, brutalist dev-tipografi sitelerinde nadir görülen bir temizlik, korunmalı.
- Tek bir --gutter token'ı (clamp(24px,4.2vw,72px)) her section'da tutarlı; hero'da min-h-dvh kullanılmış (iOS 100vh zıplaması yok).
- fit() + .fit mekanizması: ENGINEERING / PERMANENCE / CAPABILITIES gibi uzun kelimeler mobilde kesinlikle kırpılmıyor. Ayar gerektiriyor ama mekanizma değerli, atılmamalı.
- Lenis dokunmatikte native scroll'u bozmuyor; prefers-reduced-motion reveal'larda, Lenis'te ve videolarda saygı görüyor; BackgroundVideo fold altı videoları lazy yüklüyor, ekran dışında duraklatıyor ve saveData'ya bakıyor.
- Form: 58px yüksekliğinde dolu genişlik alanlar, net mono label'lar, beyaz focus border, role=alert ile inline validasyon, autocomplete attribute'ları, custom select chevron. İskelet sağlam.
- Case study galerisi ve proje kartları aspect-ratio ile yer ayırıyor (CLS yok), next/image sizes değerleri doğru (50vw/25vw).
- Blog gövdesi mobilde 16px/1.78, satır başına ~40 karakter, h2 27px: okuma ölçüsü rahat; okuma progress bar'ı var.
- Mobil menü route değişiminde kapanıyor, aria-expanded var, body scroll kilitleniyor; TR butonu 360px altında gizlenerek 320px düşünülmüş.
- Footer adres blokları mono ile temiz ve okunaklı; case study 'STORE SCREENSHOTS' 9/16 kutuları telefonda doğal duruyor.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `mobile-01` — Mobil menü landscape ve küçük ekranlarda son maddelerine ulaşılamıyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:22-25 (body overflow hidden), :42-46 (nav absolute, min-h, overflow yok); screenshots: probe-mobile/vp-landscape-nav-open.png, vp-w320-nav-open.png, vp-iphoneSE-nav-open.png

**Sorun.** Menü açılınca body.style.overflow='hidden' yapılıyor ama nav 'absolute top-full min-h-[calc(100dvh-66px)]' ve kendi overflow-y'si yok. Ölçüm: 844×390 landscape'te son link alt kenarı 644px, viewport 390px → BLOG, START A PROJECT ve TR/TÜRKÇE ekran dışında ve scroll edilemiyor. 320×568'de son madde 674px (viewport 568). iPhone SE 375×667'de 33px payla zar zor sığıyor; menüye bir madde eklense SE'de de kırılır.

**Neden önemli.** Usability: landscape tutan veya küçük Android kullanan ziyaretçi menünün yarısını göremiyor. Awwwards jürisi mobil menüyü mutlaka açar; takılan bir menü anında eler.

**Ne yapılmalı.** Nav'ı header'ın dışına taşı: 'fixed inset-0 z-50 pt-[66px] overflow-y-auto overscroll-contain' + 'pb-[max(24px,env(safe-area-inset-bottom))]'. Scroll kilidini body.style.overflow yerine Lenis ile yap (lenis.stop()/lenis.start(); SmoothScroll'dan bir ref/context ile eriş) ve <main>'e 'inert' ver. Menü satır yüksekliğini 'py-[16px]'e indir, en kısa viewport (568px) için 6 madde + alt blok sığacak şekilde 'min-h' yerine içerik yüksekliği kullan.

#### `mobile-02` — Mobil hero: wordmark küçük, 280px boşluk, 'SCROLL' satırı fold'un altında

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:40-55 (pt-[30vh], mobile:pt-[66px], h1 mobile:text-[16vw]); screenshots: shots/home-mobile-fold.png, probe-mobile/vp-android360-home-fold.png

**Sorun.** 390×844 ölçümü: status satırı 66-110px, kicker 372px'te başlıyor → arada 260px'lik boş siyah alan (pt-[30vh]). ALAZ. h1 sadece 62px (16vw) — footer'daki wordmark ile aynı boy, 'dev marka anı' mobilde yok. Tagline 28px ekstra-bold olunca h1 ile neredeyse aynı ağırlıkta, hiyerarşi düzleşiyor. Hero section'ın ölçülen yüksekliği 852-856px > 844 dvh: 'SCROLL TO EXPLORE ↓' satırı fold'un altına taşıyor (fold shot'ta kesik). Safari'de toolbar açıkken dvh ~750px olduğundan taşma ~100px'e çıkar.

**Neden önemli.** Craft + brand: hero'nun tek işi markayı ilk ekranda büyük ve kesin göstermek; mobilde küçük bir logo ve boşluk kalıyor. 'Tam ekran + alt satır' kompozisyonu sığmadığı için bozuluyor.

**Ne yapılmalı.** Mobilde kompozisyonu yeniden kur: 'mobile:pt-[10vh] mobile:pb-[4vh]' (30vh'yi kaldır), h1 'mobile:text-[length:clamp(96px,27vw,150px)]' ve ≤470px'te --gutter: 16px ile tam genişliğe yay (ALAZ. 4 harf, 27vw ile 342px'e sığar). Tagline 'mobile:text-[22px]', intro 14px. Alt satırı 'mt-auto' ile akışta tut ve toplam yüksekliği dvh'nin altında tut; ya da mobilde hero'yu içerik yüksekliğinde bırakıp (min-h-dvh yerine min-h-[100svh]) 'scroll' satırını hero dışına taşı. Hedef: 390×750 (Safari toolbar'lı) ekranda bile wordmark + tagline + scroll satırı aynı anda görünsün.

> **Doğrulayıcı notu:** 390×844 ölçümü: status satırı 66-110px, kicker 363px'te başlıyor → 253px boş alan; h1 62.4px (16vw); tagline 28px/800, intro 13px; hero section 852px > 844 — bunlar doğru. Düzeltme: 'SCROLL TO EXPLORE' satırı 809-828px'te, yani 844'lük fold'un İÇİNDE; fold shot'ta 'kesik' görünen şey Next.js dev rozetinin üstüne binmesi, fold dışına taşan sadece 31px'lik alt padding. 390×750'de (Safari toolbar açık) satır 774px'te başlıyor → orada gerçekten fold altı. 'Tagline h1 ile neredeyse aynı ağırlıkta' abartı (28 vs 62px) ama hiyerarşi düz. Fix uygun: ALAZ. ≈3.0em olduğundan clamp(96px,27vw,150px) ile 27vw=105px'te ~318px, 342px kolona sığar; hedef olarak 390×750'de wordmark+tagline+scroll satırının birlikte görünmesi doğru kriter.

#### `mobile-03` — Display tipografi hiyerarşisi mobilde tersine dönüyor (fit() en uzun kelimeye göre küçültüyor)

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:171-179 (.fit), src/lib/fit.js, page.jsx:78 (VALIDATION fit-avail -76px), about/page.jsx:43,54, services/page.jsx:82,106, case-studies/page.jsx:44, case-studies/[slug]/page.jsx:93; report.json HEADS; screenshots: shots/about-mobile-fold.png, services-mobile-fold.png, case-vocabulary-mobile-fold.png, case-market-hours-mobile-fold.png, case-studies-mobile-fold.png

**Sorun.** Ölçülen computed font-size'lar (390px): about h1 'WE ENGINEER PERMANENCE.' 43px, aynı sayfada h2 'ALAZ.' 64px; services h1 'SOFTWARE ENGINEERING.' 44px, h2 'WHAT WE ACTUALLY DO.' 48px; case study h1 'VOCABULARY.' 44px ama 'MARKET HOURS.' 66px; ana sayfa bölüm h2'leri 39 (VALIDATION, çünkü fit-avail'den 76px ikon payı mobilde de düşülüyor) / 45 / 51 / 55px; case index'te VOCABULARY 35px, MARKET HOURS 43px. Sayfadan sayfaya ve bölümden bölüme ölçek rastgele; h1'ler h2'lerden küçük.

**Neden önemli.** Craft: tipografi bu sitenin tek görsel dili; mobilde ölçeğin kelime uzunluğuna göre savrulması 'ayarlanmamış' hissi verir. Hiyerarşi inversiyonu (h2 > h1) jürinin ilk fark edeceği şey.

**Ne yapılmalı.** Mobilde sabit bir display ölçeği tanımla: h1 = clamp(56px,15vw,72px), bölüm h2 = clamp(40px,11vw,52px), satır-içi h3 = 28px. Uzun kelimeleri ölçeği düşürerek değil kırarak çöz: (a) ≤470px'te --gutter 16-20px, (b) display face'e mobilde tracking -.09em, (c) en.json'daki 4-5 uzun kelimeye soft hyphen (ENGI&shy;NEERING, PERMA&shy;NENCE, CAPA&shy;BILITIES, VOCAB&shy;ULARY) ya da 'headingMobile' dizisi ile açık satır kırımı, (d) .fit'i sadece güvenlik tavanı yap: font-size: max(var(--fit-floor,40px), min(var(--fit-size), ...)). page.jsx:78'e 'mobile:[--fit-avail:calc(100vw-2*var(--gutter))]' ekle ve ShieldCheck ikonunu mobilde gizle (lucide ikon zaten slop sinyali).

### ÖNEMLİ

#### `mobile-04` — Services sayfası mobilde 11.619px: beş blok doküman gibi alt alta

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:128-195 (blok grid mobile:grid-cols-1), :140 (grid-cols-[12%_1fr_36%]); screenshots: shots/services-mobile-full.png, probe-mobile/services-s05.png … services-s10.png

**Sorun.** Her service bloğu mobilde ~1.900px: numara, kategori, 30px başlık, 18px açıklama, 'THE PROBLEM & SCOPE' (~300 karakter), 5 maddelik deliverables (her biri border'lı satır), stack chip'leri, outcome, ideal fit. 5 blok + process + FAQ = 14 ekran. Masaüstündeki 3 kolon mobilde tek sütuna düşünce yan bilgi (stack/outcome/bestFor) ana metnin arkasına, 1.000px aşağıya gidiyor; hiçbir şey katlanmıyor.

**Neden önemli.** Usability + craft: telefonda kimse 14 ekran kaydırmaz; sayfa 'landing' değil 'PDF' hissi veriyor. Üst düzey stüdyolar mobilde bilgi mimarisini değiştirir, sadece stack'lemez.

**Ne yapılmalı.** Mobilde bloğu akordeona çevir: görünür kısım = numara + başlık + 1 satır açıklama + '+'; açılınca problem/deliverables/stack. Native <details name="service"> (exclusive accordion, Chrome 120+/Safari 17.2+) ile JS'siz. Stack/outcome/bestFor'u başlığın hemen altında 2 kolonlu kompakt meta grid'e al ('grid-cols-2 gap-x-[16px] text-[13px]'), deliverables'ı mobilde virgüllü tek paragraf yap. Hedef sayfa yüksekliği ≤ 4.500px. Üstte sticky chip rail (bkz. mobile-05) ile scroll-spy.

> **Doğrulayıcı notu:** Sayfa yüksekliği 11.619px (≈13.8 ekran) doğru; 5 blok + process + FAQ doğru. Düzeltme: blok başına ~1.350px (ölçüm: 1343/1392/1345/1347/1349), ~1.900 değil; section yükseklikleri hero 633, overview 721, bloklar 6.887, process 1.253, FAQ 1.066. Yan bilgilerin (stack/outcome/bestFor) ana metnin altına düşmesi screenshot'larla uyumlu. Severity 'critical' fazla: sayfa uzun ve katlanmıyor ama bozuk ya da slop sinyali değil → major. <details name> exclusive akordeon fix'i uygun; desteklemeyen tarayıcılarda normal details olarak çalışır.

#### `mobile-05` — Services 'overview' chip navigasyonu: 5 dikey kutu, 41px, anchor hedefi tutarsız

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:114-124 (chips), :137 (scroll-mt-[90px]); src/app/globals.css:45 (scroll-padding-top:78px); src/components/SmoothScroll.jsx:223 (anchors offset -78); screenshots: probe-mobile/services-s05.png, services-chip-target.png

**Sorun.** Chip'ler flex-wrap ile mobilde alt alta 5 farklı genişlikte kutu oluyor (260/227/301/310/293px), yükseklik 41px (<44). Üç ayrı offset tanımı yarışıyor (html scroll-padding 78px, scroll-mt 90px, Lenis -78) ve mobil header 66px; ölçümde '02 / MOBILE' chip'ine dokununca hedef başlık viewport'un 232px altına geliyor (önceki bloğun kuyruğu üstte kalıyor), ilk denemede ise tamamen 01 bloğunun ortasına düştü.

**Neden önemli.** Usability: navigasyon görevi görmesi gereken şey hem dokunma hedefi olarak küçük hem de doğru yere götürmüyor; görsel olarak da 'etiket yığını' slop sinyali.

**Ne yapılmalı.** Chip'leri yatay scroll-snap rail yap: 'flex overflow-x-auto snap-x snap-mandatory gap-[8px] -mx-[var(--gutter)] px-[var(--gutter)] [scrollbar-width:none]', her chip 'snap-start shrink-0 min-h-[44px]'. Rail'i bloklara girince 'sticky top-[66px]' yap ve IntersectionObserver ile aktif chip'i beyaza çevir + rail'i aktif chip'e kaydır (el.scrollIntoView({inline:'center'})). Offset'i tek yerden yönet: :root --header-h (66/76), Lenis anchors.offset = -var(--header-h) (JS'te getComputedStyle ile oku), scroll-mt/scroll-padding'i kaldır.

> **Doğrulayıcı notu:** Chip'ler 41px ve 260/227/301/310/293px genişlikte, flex-wrap ile 5 satır — doğru. 'Üç offset yarışıyor' kısmı yanlış teşhis: Lenis 1.3.26 scrollTo (node_modules/lenis/dist/lenis.mjs:778-787) hedefin scroll-margin-top'unu (90) VE html scroll-padding-top'unu (78) zaten düşüyor, üstüne anchors.offset (-78) ekleniyor → hedef 246px'e oturuyor (66px header altında 180px boşluk). Lenis onClick preventDefault yapmadığı için (lenis.mjs:542-552) native hash atlaması da çalışıyor: reduced-motion'da ölçtüm hedef 168px'e (78+90) oturuyor; Lenis'li modda önce 168'e native atlayıp sonra 246'ya kayıyor (çift hareket). Asıl büyük sapma: Lenis hedef konumu window.scrollY yerine kendi animatedScroll'undan türetiyor; native scroll'dan hemen sonra (scroll event işlenmeden) dokunulursa yüzlerce px sapıyor — ölçümümde '02 / MOBILE'a dokununca makale viewport'un 925px altında kaldı (scrollY 1812, makale 2737). Doğru fix: SmoothScroll.jsx:14'te anchors: true (offset yok), services/page.jsx:137'deki scroll-mt-[90px]'i kaldır, globals.css:45'te scroll-padding-top: var(--header-h) tek kaynak olsun (Lenis bunu zaten okuyor). Rail/sticky/scroll-spy önerisi uygun. Not: referans 'SmoothScroll.jsx:223' yanlış, dosya 29 satır; ilgili satır :14.

#### `mobile-06` — 'NEXT PROJECT' satırında kelime ortadan kırılıyor ('VOCABULAR / Y'), blogda label 3 satır + başlık '…' ile kesik

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:158-163 (max-w-[80%], [overflow-wrap:anywhere]); src/app/[locale]/blog/[slug]/page.jsx:121-124 (line-clamp-2); screenshots: probe-mobile/case-market-hours-s04.png (y≈590-680), blog-post-s11.png

**Sorun.** Market Hours sayfasında 'NEXT PROJECT / 02' label'ı soldaki alanı alınca başlık kutusu daralıyor; 'VOCABULARY' tek kelime olduğundan overflow-wrap:anywhere ile 'VOCABULAR' + 'Y' olarak ikiye bölünüyor. Blog'da 'NEXT FIELD NOTE' label'ı 'NEXT / FIELD / NOTE' diye 3 satıra düşüyor, başlık 'We're Live: A Software Studio f…' diye kesiliyor.

**Neden önemli.** Craft: bir ismin ortadan kırılması tipografi odaklı bir sitede affedilmez; 'next' bloğu her case study'nin son izlenimi.

**Ne yapılmalı.** Mobilde bloğu dikey kur: 'mobile:flex-col mobile:items-start mobile:gap-[14px]'; label üstte 12px mono, başlık tam genişlikte 'mobile:text-[length:clamp(34px,10vw,44px)]' + style={fit(next.name)}; max-w-[80%], [overflow-wrap:anywhere] ve line-clamp-2'yi kaldır; oku başlığın altına ayrı satıra al (ArrowRight 28px) veya 'PREV / NEXT' ikili blok yap. Blogda başlığı 2 satıra kadar tam göster, gerekirse 'text-[22px]'.

#### `mobile-07` — Mobil header'da 4 kontrol + beyaz CTA: SaaS şablon hissi, çift CTA ve çift dil anahtarı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:28-40 (grid, TR, CTA mobile:py-[12px] mobile:px-[13px], burger); screenshots: shots/home-mobile-fold.png, shots/nav-open-mobile.png

**Sorun.** 390px'te logo 79×25, bordered 'TR' 40×39, beyaz 'START A PROJECT' 140×43, burger 43×43, aralar 10px (xs:gap-[10px]). Beyaz CTA her ekrandaki en parlak eleman ve içerikle yarışıyor; CTA'nın oku mobilde gizleniyor (mobile:[&>svg]:hidden) → masaüstüyle tutarsız. Menü açılınca aynı CTA hem header'da hem listede '05 START A PROJECT' olarak, TR hem header'da hem 'TR / TÜRKÇE' satırı olarak iki kez görünüyor.

**Neden önemli.** Brand + craft: Awwwards seviyesi mobil header'lar minimaldir (logo + MENU); CTA ve dil menüde yaşar. Şu anki hâli şablon/SaaS header'ı sinyali veriyor, 44px altı hedeflerle sıkışık.

**Ne yapılmalı.** Mobil header = logo + 'MENU' metin düğmesi (ya da burger) olsun, yükseklik 60px. TR ve CTA'yı mobilde gizle ('tablet:hidden'), menüdeki kopyaları kalsın. İsteğe bağlı: hero bittikten sonra IntersectionObserver ile beliren alt-sabit CTA pill ('fixed bottom-[max(16px,env(safe-area-inset-bottom))]'). Header'a 'pt-[env(safe-area-inset-top)]' ekle (manifest standalone).

#### `mobile-08` — Mobil menü bir 'an' değil: animasyonsuz liste, 01-05 indeks, boş alt yarı, aktif sayfa yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:39 (aria-label 'Open menu' çevrilmemiş), :42-46 ({open && <nav>} koşullu render, transition yok); screenshot: shots/nav-open-mobile.png

**Sorun.** Menü anında beliriyor/kayboluyor (conditional render), satırlar 25px bold + '01…05' mono indeks + lucide ArrowUpRight (her satırda aynı ok), 89px satır yüksekliği; 844px ekranda alt ~210px boş. Aktif sayfa işaretlenmiyor (desktop nav'da isActive var, mobilde yok). 'Open menu'/'Close menu' ve 'Switch language' aria-label'ları hardcoded İngilizce.

**Neden önemli.** Craft + slop: numaralı liste + ok ikonları şablon menü kalıbı; animasyon yokluğu mobildeki en görünür etkileşimi ölü bırakıyor. Awwwards jürisi menüyü açar ve 'poster' bekler.

**Ne yapılmalı.** Tam ekran tipografik panel: framer-motion AnimatePresence ile panel opacity+clipPath (inset(0 0 100% 0 → 0)), satırlar 'y:100%→0' overflow-hidden mask içinde, stagger 60ms, ease [0.22,1,0.36,1], toplam 500ms. Tip boyutu clamp(44px,12vw,56px), aktif sayfa beyaz diğerleri #777, indeks/ok kaldır. Alt bölge: hello@alaz.pro (26px mono), 'NEW YORK / İZMİR' + yerel saatler, dil anahtarı düz metin 'TR'. Burger ikonunu iki çizgiyle CSS'te çiz, X'e dönüşsün. aria-label'ları t('nav.openMenu') ile çevir.

#### `mobile-09` — Eyebrow çiftleri mobilde sıkışıyor: sağ taraf 2-3 satıra kırılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** Her sayfadaki 'mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right' bloğu: page.jsx:77,96,130,188; about/page.jsx:41,52,73; services/page.jsx:75; case-studies/page.jsx:34; blog/page.jsx:31; IntakeForm.jsx:98; LegalContent.jsx:12; screenshots: shots/about-mobile-fold.png ('OUR OPERATING / PRINCIPLES'), start-project-mobile-fold.png ('PROJECT INTAKE / SECURE / TRANSMISSION' + 'ALAZ / NEW / ENGAGEMENT'), case-studies-mobile-fold.png, legal-mobile-fold.png, probe-mobile/home-s03.png ('WEB / MOBILE / / SYSTEMS'), home-s04.png ('SELECTED PROJECTS // / 02')

**Sorun.** Sağ eyebrow %50 genişliğe sıkıştırılınca 12px mono metin 2-3 satıra bölünüyor, bazı sayfalarda sol da kırılıyor; '/' ayırıcı satır başına düşüyor ('WEB / MOBILE /' + 'SYSTEMS'). Her section'ın üstünde farklı yükseklikte dengesiz bir çift metin bloğu oluşuyor.

**Neden önemli.** Craft + slop: '01 / EXTERNAL SIGNAL — TESTIMONIALS // 03' tarzı çift eyebrow zaten LLM-template kalıbı; mobilde kırılınca kalıbın yapaylığı daha da görünür oluyor.

**Ne yapılmalı.** Mobilde sadece bir label bırak: sağdakini 'mobile:hidden' yap ya da ikisini 'mobile:flex-col mobile:items-start mobile:gap-[4px]' ile sola hizalı alt alta koy ve stringleri kısalt (max ~24 karakter). Daha iyisi: eyebrow sistemini sadeleştir, hairline + tek kısa label (ör. 'TESTIMONIALS') ve numaralandırmayı kaldır.

#### `mobile-10` — Work index'i telefonda tek bir görsel göstermiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:42-48 (hover preview mobile:hidden, SCOPE mobile:hidden, min-h-[145px]); screenshots: shots/case-studies-mobile-fold.png, probe-mobile/case-studies-s02.png

**Sorun.** Masaüstünde hover'da çıkan 220×130 önizleme mobilde 'mobile:hidden'; SCOPE kolonu da gizli. Sonuç: 'THE WORK' sayfası mobilde 2 metin satırı (VOCABULARY 35px, MARKET HOURS 43px) + ok. Stüdyonun işini gösteren sayfada hiç görsel yok, kapak görselleri (1920×1200, mevcut) kullanılmıyor.

**Neden önemli.** Brand: portfolyo sayfasının mobil sürümü ikna etmiyor; dokunmatikte hover yoktur, yerine konulmuş bir şey de yok.

**Ne yapılmalı.** Mobilde satırı stacked karta çevir: 'mobile:grid-cols-1' → kapak görseli (next/image, aspect-[16/10], tam gutter genişliği, sizes='100vw'), altında '01 / MOBILE APPLICATION · LANGUAGE LEARNING' tek satır, sonra isim (clamp(40px,11vw,52px)). Alternatif: satır düzenini koru, sola 96×60 thumbnail ekle. Satıra 'active:bg-[#141414]' dokunma geri bildirimi ver.

#### `mobile-11` — Case study hero'da mobil art direction yok; 2 pasif store butonu ilk ekranın 130px'ini yiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:82-100 (Image fill object-cover, min-h-[600px], store CTA'ları); src/components/StoreButtons.jsx:36-52; screenshots: shots/case-vocabulary-mobile-fold.png, shots/case-market-hours-mobile-fold.png

**Sorun.** 1920×1200 yatay hero görseli 390×600 kutuda object-cover ile merkezden kırpılıyor: Vocabulary'de kedinin yüzü başlığın altında kalıyor, 17px özet sarı/karışık zemin üstünde okunuyor; Market Hours'ta harita dokusu metnin arkasında gürültü. Üstüne 'VISIT MARKETHOURS.LIVE' + 'COMING SOON ON APP STORE' + 'COMING SOON ON GOOGLE PLAY' üç buton dikey yığılıyor; ikisi aria-disabled olmasına rağmen 56px'lik gerçek buton gibi duruyor.

**Neden önemli.** Craft: mobilde görsel + metin aynı kutuda çarpışıyor; pasif butonlar tıklanabilir sanılıyor ve ilk ekranı dolduruyor.

**Ne yapılmalı.** Mobil sıralama: eyebrow → başlık → özet (düz ink zemin) → görsel kendi full-bleed bloğu (aspect-[4/5], portrait kırpımlı ayrı asset 'hero-mobile.{png,jpg}' 1080×1350; <picture> + next/image getImageProps veya 'mobile:hidden'/'hidden mobile:block' ile iki Image) → CTA'lar. Pasif store butonlarını mobilde gizle, yerine tek satır 12px mono 'APP STORE & GOOGLE PLAY — COMING SOON'. Canlı link butonu kalsın.

> **Doğrulayıcı notu:** Hero mobilde 865px (min-h 600'ü içerik aşıyor), h1 66px MH / 44px Vocab; görsel object-cover merkez kırpım ve metinle çakışma screenshot'larda görünüyor. Düzeltmeler: özet 19px (clamp(19px,2.4vw,32px)), 17 değil; Market Hours'ta 3 buton toplam 186px (46+56+56+2×14) ve 619px'ten başladığı için 750px Safari fold'unda son buton kesik, Vocabulary'de 2 pasif buton 126px. StoreButtons.jsx 25 satır — alıntılanan :36-52 yok; ilgili satırlar :7 (BASE min-h-[56px]) ve :20-22 (aria-disabled span). Fix uygun; hero-mobile 4:5 asset üretilmesi gerekir (mevcut hero.png/hero.jpg 1920×1200).

#### `mobile-12` — Ana sayfa capabilities kartlarında kart başına ~120px ölü boşluk ve link olmayan ok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:99-101 (article mobile:min-h-[295px] + justify-between, MoveUpRight ikon); screenshots: probe-mobile/home-s03.png, home-s04.png

**Sorun.** Mobilde 'min-h-[295px]' + 'justify-between' yüzünden '01 — 03 ↗' satırı üstte, kategori/başlık/açıklama altta; ortada 110-130px boşluk, 3 kartta ~360px. Kart <article>, link değil; sağ üstteki MoveUpRight oku dokununca hiçbir şey yapmıyor. hover:bg-[#141414] dokunmatikte anlamsız.

**Neden önemli.** Usability + craft: boş alan 'bitmemiş' görünüyor; ok affordance'ı yalan söylüyor.

**Ne yapılmalı.** 'mobile:min-h-0 mobile:gap-[18px]' ve içeriği normal akışa al; kartı Link'e çevir (href='/services#'+item.id) ki ok anlam kazansın, ya da oku kaldır. Daha iddialı: 3 kartı yatay snap rail yap (kart 82% genişlik, sonraki kart 'peek' ediyor, altta '01 / 03' sayaç IntersectionObserver ile).

> **Doğrulayıcı notu:** page.jsx:99 mobile:min-h-[295px] + justify-between, :100 MoveUpRight, article link değil — doğru. Ölçüm: kart 295px, üst satır ile gövde arası 83px boşluk (110-130 değil), 3 kartta ~250px (360 değil). hover:bg-[#141414] dokunmatikte yapışıyor (mobile-18 ile aynı kök). Fix uygun (Link'e çevir veya oku kaldır).

#### `mobile-13` — Dokunma hedefleri 44px altında (footer linkleri 19px, FAQ summary 29px, chip'ler 41px)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:17,23-26; src/app/[locale]/page.jsx:54 (SCROLL TO EXPLORE), :97 (EXPLORE SERVICES); case-studies/[slug]/page.jsx:88; blog/[slug]/page.jsx:89; services/page.jsx:116-123 (chips), :235-236 (padding details'te, summary'de değil); Header.jsx:37-39; report.json SMALL listesi

**Sorun.** Ölçülen kutular: BLOG 32×19, LEGAL 40×19, PRIVACY 55×19, BACK TO TOP 91×19, hello@alaz.pro 116×21, SCROLL TO EXPLORE 164×19, EXPLORE SERVICES 156×32, '← ALL CASE STUDIES' 148×19, '← ALL FIELD NOTES' 140×19, FAQ summary tek satırlı sorularda 342×29 (py-[22px] <details>'te olduğu için satırın boşluğuna dokunmak açmıyor), services chip'leri 41px, header TR 40×39, CTA 43px, burger 43px. WCAG 2.2 minimumu 24×24, pratik eşik 44×44.

**Neden önemli.** Usability: mobildeki kaçırılan dokunuşlar; BLOG 32×19 WCAG 2.2 AA'yı bile geçmiyor.

**Ne yapılmalı.** Metin linklerine görünümü bozmadan alan ver: 'inline-flex items-center min-h-[44px] -my-[12px]' (negatif margin görsel ritmi korur). FAQ: py-[22px]'yi <details>'ten <summary>'ye taşı, 'min-h-[48px]'. Chip/buton min-h-[44px]. Header kontrolleri mobilde 44px (ya da mobile-07 ile azalt).

#### `mobile-14` — Form alanları 14px: iOS Safari focus'ta sayfayı zoom'luyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:12 (fieldInput text-[14px]), :153,:160 (select); screenshots: probe-mobile/form-step1-full.png, form-step2-full.png

**Sorun.** input/select/textarea computed font-size 14px. iOS Safari, font-size < 16px olan bir alana odaklanınca viewport'u otomatik büyütür; kullanıcı her alanda zoom in/out yaşar, header ve layout kayar. Playwright'ta görülmez ama gerçek iPhone'da ilk dokunuşta ortaya çıkar.

**Neden önemli.** Usability: form sitenin tek dönüşüm noktası; zoom zıplaması amatör sinyali.

**Ne yapılmalı.** fieldInput'a 'mobile:text-[16px]' ekle (masaüstünde 14px kalabilir). Ek: email alanına inputMode='email', autoCapitalize='none'; project_name/name'e enterKeyHint='next', brief'e enterKeyHint='done'; select'lere de 16px.

> **Doğrulayıcı notu:** Tüm input/select/textarea computed 14px (IntakeForm.jsx:12, :153, :160 doğru); iOS'ta <16px alan odaklanınca zoom gerçek. Düzeltme: type="email" zaten e-posta klavyesini açar ve otomatik büyük harf yapmaz, inputMode='email'/autoCapitalize='none' önerisi gereksiz; mobile:text-[16px] ve enterKeyHint yeterli.

#### `mobile-15` — Mobil form: stepper etiketleri çarpışıyor, tip kartları 'dış link' oku taşıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:114-117 (mobile:grid-cols-3, mobile:pr-[8px]), :127-133 (xs:min-h-[150px], ArrowUpRight); screenshots: shots/start-project-mobile-fold.png, probe-mobile/form-step2-full.png, form-step0.png

**Sorun.** Steps grid'i 3×114px kolon; 'THE CHALLENGE' ile 'YOUR DETAILS' 12px bold uppercase olunca arada boşluk kalmıyor (form-step2-full.png'de bitişik). Tip seçim kartları 2×2, 150px, her birinin köşesinde ↗ (dış link anlamı) ve 'Systems & Backend' iki satıra kırılınca kartlar içinde hizalar kayıyor. Üst-altta iki ayrı '01 / 03' ve '33% COMPLETE' göstergesi tekrar.

**Neden önemli.** Usability + craft: adım göstergesi okunmuyor; ok ikonu seçim affordance'ı değil.

**Ne yapılmalı.** Stepper'ı tek satıra indir: '02 / 03 — THE CHALLENGE' + altında 3 parçalı 2px progress çubuğu (dolu=beyaz, boş=line). Tip seçimini mobilde 56px'lik dikey satırlara çevir (sol: isim 16px + detay 12px, sağ: 14px kare 'radio', seçili satır beyaz zemin/siyah metin), okları kaldır, aria-pressed kalsın. Alt aksiyon barını 'sticky bottom-0 bg-ink/90 backdrop-blur pb-[env(safe-area-inset-bottom)]' yap.

> **Doğrulayıcı notu:** Stepper 3×114px kolon doğru ama 'çarpışıyor/bitişik' yanlış: ölçümde 'THE CHALLENGE' label'ı 241px'te bitiyor, 'YOUR DETAILS' kolonu 252'de başlıyor → 11px boşluk, okunuyor (form-step2-full.png). Doğru olanlar: tip kartları 167×150, her birinde ↗ (dış link affordance'ı), 'Systems & Backend' 2 satır kırılıp hizaları kaydırıyor; '01 / 03 — PROJECT TYPE' + '33% COMPLETE' + 3 kolonlu stepper = üç ayrı ilerleme göstergesi üst üste. Fix (tek satır stepper + progress çubuğu, radio satırları, sticky aksiyon barı) uygun.

#### `mobile-16` — Hero videoları mobilde 1-4.5MB indiriyor ama ekranda neredeyse siyah

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35 (preload=auto), about/page.jsx:36, services/page.jsx:61-72, case-studies/page.jsx:29, src/components/IntakeForm.jsx:93; public/videos/* (dark-planet 1.1MB, the-work-section 4.5MB, about-section 2.2MB, about-alaz 2.4MB, about-end 2.6MB, services 2.0MB, start-project-rocket 2.4MB, start-a-project-hero 3.5MB); screenshots: shots/*-mobile-fold.png

**Sorun.** Fold üstü hero'lar düz <video autoPlay preload='auto'>; mobil için ayrı encode/<source media> yok, saveData kontrolü yalnızca fold-altı BackgroundVideo'da (BackgroundVideo.jsx:68). opacity .5-.62 + iki gradient altında 390px ekranda video görünmez (fold shot'larda zemin düz siyah). Case studies sayfası telefonda ilk saniyede 4.5MB çekiyor; about toplamda 7.2MB video. Tüm videolar aynı 1280×720 poster.png'yi kullanıyor.

**Neden önemli.** Usability/perf: mobil veri ve pil maliyeti karşılığında görsel kazanım sıfır; LCP/INP düşer.

**Ne yapılmalı.** Her video için 540p/24fps/6-8s, crf 30, ≤400KB mobil encode üret; <source media='(max-width: 760px)' src='…-540.mp4'> + masaüstü kaynağı; preload='metadata'; her videoya kendi ilk karesini poster yap (ffmpeg -ss 0 -frames:v 1). navigator.connection?.saveData veya (prefers-reduced-data: reduce) ise autoplay'i atla. Daha radikal: telefonda videoyu tamamen bırak, still + CSS grain (SVG feTurbulence) kullan.

> **Doğrulayıcı notu:** Kod ve dosya boyutları doğru: preload='auto' (page.jsx:35, about:36, services:68, case-studies:29, IntakeForm:93), mobil <source media> yok, dark-planet 1.1MB, the-work-section 4.5MB, about 2.2+2.4+2.6=7.2MB, services 2.0MB, rocket 2.4MB, start-a-project-hero 3.5MB. saveData kontrolü BackgroundVideo.jsx:14 (68 değil). Düzeltme: 'video 390px'te görünmez, fold shot'larda zemin siyah' iddiası kanıt değil — test Chromium'u H.264 decode edemiyor (canPlayType('video/mp4; codecs="avc1…"') = '', hero video readyState 0 / videoWidth 0), masaüstü fold shot'ları da aynı sebeple siyah. Görünürlük iddiasını çıkarın, veri/pil maliyeti iddiası ayakta. Ek: ana sayfa #contact'taki BackgroundVideo (3.5MB) rootMargin 300px ile mobilde de indiriliyor. Fix (540p encode, <source media>, kendi poster'ı, saveData'da autoplay yok) uygun.

#### `mobile-17` — About sayfasında iletişim bloğu footer ile birebir tekrar ediyor (~900px çift içerik)

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:82-87 (ContactInfo large) + src/components/Footer.jsx:14-19 (ContactInfo); screenshots: probe-mobile/about-s05.png, shots/about-mobile-full.png

**Sorun.** About'un sonunda 'CONTACT / hello@alaz.pro / USA NEW YORK… / TÜRKİYE İZMİR…' bloğu, hemen altında footer'da aynı e-posta ve aynı iki adres tekrar. Mobilde arka arkaya ~900px aynı metin okunuyor.

**Neden önemli.** Craft: tekrar, 'bileşen yapıştırılmış' hissi; mobilde en pahalı şey dikey alan.

**Ne yapılmalı.** About'taki bloğu kaldır ya da farklılaştır: tek satır büyük e-posta (26px mono) + 'NEW YORK 09:41 / İZMİR 16:41' canlı yerel saat (Intl.DateTimeFormat, 60sn interval) gibi footer'da olmayan bir bilgi. Adresler yalnızca footer'da kalsın.

#### `mobile-18` — Hover kuralları dokunmatikte yapışıyor; dokunma geri bildirimi hiç yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** tailwind.config.js (future.hoverOnlyWhenSupported yok); src/app/globals.css:109-112 (tap-highlight transparent); services/page.jsx:137 (hover:bg-[#0f0f0f]), blog/page.jsx:48 (hover:bg-[#141414]), page.jsx:99,145-152 (group-hover scale/brightness); screenshot: probe-mobile/services-chip-target.png (01 bloğu dokunuştan sonra highlight'ta kalıyor)

**Sorun.** Derlenen CSS'te 59 ':hover' kuralı var, hiçbiri @media (hover: hover) içinde değil; dokunmatikte ilk dokunuş hover state'ini açıp bırakıyor (sticky hover). Aynı zamanda -webkit-tap-highlight-color: transparent ile native dokunma vurgusu kaldırılmış ama linklerin çoğunda active: state yok → dokunduğunda hiçbir şey olmuyor hissi.

**Neden önemli.** Craft: etkileşim katmanı mobilde ya yanlış (yapışan hover) ya da yok (geri bildirimsiz).

**Ne yapılmalı.** tailwind.config.js'e future: { hoverOnlyWhenSupported: true } ekle (Tailwind 3.1+). Dokunma dili tanımla: satır/kartlara 'active:bg-[#141414]', metin linklerine 'active:opacity-60', butonlara mevcut 'active:scale-[.98]' + 'transition-[transform,opacity] duration-150'. Case index satırındaki 'mobile:hover:pl-0' türü yamalar bu sayede gereksizleşir.

> **Doğrulayıcı notu:** Ölçtüm: derlenen CSS'te 59 :hover kuralı, 0'ı @media (hover) içinde; tailwind.config.js'de future.hoverOnlyWhenSupported yok; globals.css:109-112 tap-highlight transparent. Dokunma sonrası services bloğu rgb(15,15,15)'te kalıyor (sticky hover doğrulandı). Ek: blog kartları (blog/page.jsx:48) ve capability kartları (page.jsx:99) mobilde px-0 olduğu için yapışan highlight bloğu metne sıfır padding ile yapışıyor; active state eklendiğinde de aynı olur → mobilde -mx-[var(--gutter)] px-[var(--gutter)] ile tam genişlik highlight yapın. Dokunmatik öncelikli jüri için bu polish değil, 'clearly below the bar' → major.

#### `mobile-missed-1` — [data-reveal] içerik (sayfa h1'leri dahil) hydration'a kadar görünmez

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/layout.jsx:55 (inline script reveal-ready), src/app/globals.css:71-90, src/components/ScrollReveal.jsx:11-33; screenshot: shots/skeptic-about-prehydration.png

**Sorun.** Head'deki inline script ilk boyamadan önce html'e reveal-ready ekliyor; .reveal-ready [data-reveal]:not(.is-revealed) opacity:0 olduğu için about/services/case/blog h1'leri, eyebrow çizgileri, hero tagline/intro ve kartlar, client bundle indirilip ScrollReveal'ın IntersectionObserver'ı çalışana kadar boş kalıyor. Pre-hydration shot'ta about sayfasında kicker ve intro var ama 'WE ENGINEER PERMANENCE.' h1'i ve eyebrow yok. Mobil 3G/4G'de bundle gecikmesi saniyeler sürebilir; sayfanın en büyük öğesi (LCP adayı) geç boyanır.

**Neden önemli.** Usability + perf: telefonda yavaş ağda boş bir hero görmek jüri için 'kırık site' izlenimi; LCP ve algılanan hız düşer.

**Ne yapılmalı.** reveal-ready'yi inline script yerine ScrollReveal useEffect'inde ekle (IO kurulmadan hidden state hiç uygulanmaz); fold üstü h1 ve hero bloklarından data-reveal'ı kaldır; ek güvenlik olarak CSS zaman aşımı ver: .reveal-ready [data-reveal]:not(.is-revealed) { animation: reveal-fallback 0s 2.5s forwards } (keyframe opacity:1, transform:none). Destekleyen tarayıcılarda animation-timeline: view() ile JS'siz reveal de mümkün.

### İNCE İŞÇİLİK

#### `mobile-19` — Footer alt barı mobilde 3 satır, sıralama ters; wordmark 62px'te 'dev' olmaktan çıkıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:16 (mobile:text-[16vw]), :21-26 (tablet:order-3 w-full, mobile:ml-auto); screenshots: probe-mobile/home-s07.png, services-s14.png

**Sorun.** Copyright 2 satıra kırılıyor, 'BACK TO TOP ↑' tek başına sağda bir satır, en altta BLOG / LEGAL / PRIVACY; üç farklı hizada üç satır. 'ALAZ.' footer wordmark'ı 16vw = 62px: masaüstündeki 320px poster etkisi mobilde yok.

**Neden önemli.** Craft: footer son izlenim; dağınık bar + küçük logo 'responsive oldu bitti' hissi.

**Ne yapılmalı.** Sıra: linkler satırı → tek satır '© 2026 ALAZ' (string kısalt) ve aynı satırın sağında 'TOP ↑' (ya da mobilde kaldır). Wordmark 'mobile:text-[28vw] leading-[.8]' veya ALAZ. harflerini iki satıra böl (AL / AZ.) ve e-postayı yanına yerleştir.

#### `mobile-20` — Hero'daki 4 kolonlu dekoratif çizgiler mobilde tipografinin içinden geçiyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:39 (grid-cols-4 border-r); screenshots: probe-mobile/vp-android360-home-fold.png, shots/home-mobile-fold.png

**Sorun.** 390px'te kolonlar 97px; dikey çizgiler 'ALAZ.' harflerinin ve paragrafın üstünden geçiyor (360px fold'da 'L' ile 'A' arasında ve 'and the systems' satırında). Masaüstünde ızgara hissi, mobilde render hatası gibi okunuyor.

**Neden önemli.** Craft: dekoratif ızgara mobilde amaçsız gürültü.

**Ne yapılmalı.** 'mobile:grid-cols-2' (tek çizgi ortada) ya da 'mobile:hidden'. Çizgileri tutacaksan metnin arkasına 'mix-blend-mode' ile değil, gutter hizasına oturt.

#### `mobile-21` — 'POWERED BY' mobilde iki kez alt alta

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/PoweredBy.jsx:12-17 (divider mobile:hidden, label her li'de); kullanım: page.jsx:51, about/page.jsx:45; screenshots: shots/home-mobile-fold.png, shots/about-mobile-fold.png

**Sorun.** Bileşen her ortak için 'POWERED BY + ikon + isim' basıyor; mobilde ayırıcı gizlenip satırlar alt alta düşünce 'POWERED BY GOOGLE / POWERED BY CLAUDE' iki ayrı satır oluyor. Hero'nun 52px'ini alıyor, about'ta da tekrar.

**Neden önemli.** Slop sinyali (brief'te açıkça sayılmış) ve mobilde tekrar yüzünden iki kat görünür.

**Ne yapılmalı.** Bileşeni tamamen kaldır (öneri). Kalacaksa label'ı bir kez yaz, iki markı aynı satırda 'flex-wrap' ile göster ve mobilde gizle.

#### `mobile-22` — About süreç adımlarında '01 / 04' indeksi 45px kolonda kırılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:75 (mobile:grid-cols-[45px_1fr]); screenshot: probe-mobile/about-s03.png

**Sorun.** '01 / 04' 12px mono ile ~50px; 45px kolonda '01 /' + '04' diye iki satıra bölünüyor. Services'teki aynı sistem (tek sütun, indeks üstte) düzgün.

**Neden önemli.** Craft: küçük ama her adımda tekrar eden bir kırılma.

**Ne yapılmalı.** 'mobile:grid-cols-[60px_1fr]' + span'a 'whitespace-nowrap', ya da services/page.jsx:211 gibi indeksi başlığın üstüne al ('mobile:grid-cols-1').

#### `mobile-23` — Case study 'deliverable' kartları 3 boş satır; galeri 2 kolonda tek kalan kare

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:139-145 (gallery mobile:grid-cols-2), :149-156 (markers mobile:min-h-[110px]); screenshots: probe-mobile/case-vocabulary-s04.png, case-vocabulary-s05.png

**Sorun.** Üç marker mobilde 110px'lik üç satır: '01 / DELIVERABLE' + 15px metin ve bolca boşluk. 7 store görseli 2 kolonda son görsel yalnız kalıyor (yanı boş).

**Neden önemli.** Craft: dikey alan israfı; tek kalan kare 'grid'e uymadı' sinyali.

**Ne yapılmalı.** Marker'ları tek satır 3 kompakt istatistik yap ('grid-cols-3', 11px label, 14px değer) ya da inline chip listesi. Galeriyi App Store'daki gibi yatay snap rail'e çevir: 'flex overflow-x-auto snap-x snap-mandatory gap-[12px]', her görsel 'shrink-0 w-[62%] aspect-[9/16] snap-center', sağ kenardan sonraki görsel görünsün; orphan sorunu kalkar.

#### `mobile-24` — Tablet aralığı (761-1000px) masaüstü gridlerini koruyor, hamburger ile birlikte

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** tailwind.config.js screens (tablet max 1000, mobile max 760); page.jsx:80,98 (grid-cols-3 tablet:px-[20px]); services/page.jsx:140 (grid-cols-[12%_1fr_36%]); IntakeForm.jsx:111 (grid-cols-[31%_1fr]); screenshots: probe-mobile/tab-ipad-home-testimonials.png, tab-ipad-home-capabilities.png, vp-ipad-services-block.png, tab-ipad-form.png

**Sorun.** 768px'te testimonials ve capabilities 3 kolon (~210px, 'MOBILE / APPS' iki satır, alıntılar 15px/8 satır), services bloğunda ilk kolon 85px ('WEB / FULL-STACK' kırılıyor) ve ana sütun ~300px, form aside 240px. Üstte hamburger var (mobil davranışı) ama içerik masaüstü ızgarasında.

**Neden önemli.** Craft: iPad/portrait tablet ara bir 'ne o ne bu' durumunda; kolonlar sıkışık.

**Ne yapılmalı.** 3 kolonlu gridlere 'tablet:grid-cols-2' (üçüncü kart 'tablet:col-span-2' ya da rail), services bloğunu tablet'te 'tablet:grid-cols-1' + meta satırı, form aside'ı tablet'te üstte yatay stepper. İsteğe bağlı 900px'lik bir ara breakpoint tanımla.

> **Doğrulayıcı notu:** 768px: burger görünür + testimonials/capabilities 3 kolon (kart 235px, alıntı 15px), services kolonları 84/306/253px ve 'WEB / FULL-STACK' 2 satır, form aside 218px — doğru. Düzeltme: ''MOBILE / APPS' iki satır' yanlış, h3'ler tek satır; kırılan şey kategori satırı ('// IOS / ANDROID / CROSS-PLATFORM'). Fix uygun.

#### `mobile-25` — Blog post meta satırı tarih ortasından kırılıyor; kapak sabit yükseklikte kırpılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:92 (meta), :97-99 (cover h-[clamp(230px,38vw,520px)]); screenshot: shots/blog-post-mobile-fold.png

**Sorun.** 'FEB 22, 2026 — 7 MIN READ — UPDATED OCT' + '5, 2026' olarak tarih bölünüyor. Kapak mobilde 230px sabit yükseklik, 1200×630 dış görselin merkez kırpımı + grayscale; başlık 37px/4 satır.

**Neden önemli.** Craft: tarih kırılması okunabilirliği bozuyor; kapak küçük ve soluk.

**Ne yapılmalı.** Her <time>'a 'whitespace-nowrap', 'UPDATED …'ı mobilde ayrı satıra ya da gizle. Kapağı mobilde 'aspect-[4/5]' veya 'aspect-square' yapıp art-directed kırp; fixed height yerine aspect kullan.

#### `mobile-26` — Standalone PWA + safe-area: header ve offset sabitleri mobil header'ı tanımıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/manifest.js (display: 'standalone'); src/app/[locale]/layout.jsx:42-46 (viewport, viewportFit yok); src/app/globals.css:45 (scroll-padding-top: 78px); src/components/SmoothScroll.jsx:223 (anchors offset -78); src/components/Header.jsx:27 (mobile:h-[66px])

**Sorun.** Manifest standalone olduğu için ana ekrana eklenen sitede fixed header iOS status bar'ının altına girer; viewport'ta viewportFit:'cover' ve header'da env(safe-area-inset-top) yok. Scroll offset'leri 76-78px masaüstü header'ına göre yazılmış, mobil header 66px.

**Neden önemli.** Usability: standalone modda header'ın üst 44px'i status bar'ın arkasında kalır; anchor hedefleri mobilde 12px kayar.

**Ne yapılmalı.** viewport'a viewportFit: 'cover'; header'a 'pt-[env(safe-area-inset-top)]' ve h-[calc(66px+env(safe-area-inset-top))]; :root'ta --header-h (66/76) tanımla, scroll-padding-top: var(--header-h), Lenis offset'i getComputedStyle'dan oku; alt sabit barlara env(safe-area-inset-bottom).

> **Doğrulayıcı notu:** manifest.js:7 standalone, layout.jsx:42-46'da viewportFit yok, globals.css:45 scroll-padding 78, Header mobile 66 — doğru. Düzeltmeler: SmoothScroll.jsx:14 (223 değil); Lenis 1.3.26 scrollTo html'in scroll-padding-top'unu zaten okuduğu için 'Lenis offset'i getComputedStyle'dan oku' gereksiz — anchors.offset'i kaldırıp tek --header-h scroll-padding bırakmak yeter (bkz. mobile-05).

#### `mobile-27` — Mobilde iki marquee (104px) ve 360px'te kırılan hero kicker

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:45 (kicker), :59-74 (signal marquee 49px), :107-126 (ticker 55px); screenshots: probe-mobile/vp-android360-home-fold.png, home-s02.png, home-s04.png

**Sorun.** Bir scroll içinde 12px mono iki kayan şerit ('ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE', 'TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS…'); mobilde 104px alıyor, ikisi de buzzword marquee kalıbı. 360px'te kicker 'WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO' iki satıra düşüp 'STUDIO' tek kalıyor.

**Neden önemli.** Slop sinyali (buzzword marquee) + mobilde hareketli 12px metin okunmuyor, pil/CPU harcıyor.

**Ne yapılmalı.** İki marquee'yi de kaldır (en azından mobilde 'mobile:hidden'); yerine tek statik hairline. Kicker'ı mobilde kısalt ('WEB · MOBILE · SYSTEMS') ya da 'mobile:text-[11px]'.

#### `mobile-missed-2` — Menü açıkken trackpad/mouse kaydırması arkadaki sayfayı kaydırıyor (Lenis body overflow:hidden'ı bypass ediyor)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:22-25; src/components/SmoothScroll.jsx:11-15; src/app/globals.css:53-55 (.lenis-stopped)

**Sorun.** body.style.overflow='hidden' yalnızca native scroll'u keser; Lenis wheel event'ini yakalayıp window.scrollTo ile kaydırıyor. Ölçüm: menü açıkken wheel → scrollY 0→336, menü sabit kalıyor. Hamburger ≤1000px'te göründüğü için iPad + trackpad/Magic Keyboard ve dar masaüstü pencereleri etkileniyor. .lenis-stopped kuralı globals.css'te var ama lenis.stop() hiçbir yerde çağrılmıyor.

**Neden önemli.** Usability: menü arkasında kayan sayfa 'kontrol dışı' hissi verir; menü kapanınca kullanıcı başka bir yerde buluyor kendini.

**Ne yapılmalı.** Lenis instance'ını bir context/ref (veya window.__lenis) ile paylaş; menü açılınca lenis?.stop(), kapanınca lenis?.start() (reduced-motion'da Lenis yok, null-safe). Nav'ı header dışında fixed inset-0 overlay yapıp overscroll-contain ve <main> inert ile tamamla (mobile-01 fix'iyle aynı yapı).

#### `mobile-missed-3` — Burger menü tamamen JS'e bağımlı: hydration öncesi dokunuş boşa gidiyor, JS'siz hiç navigasyon yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:39 (onClick setOpen), :42 ({open && <nav>})

**Sorun.** Mobil nav DOM'da yalnızca React state açıkken var; client bundle yüklenip hydrate olana kadar burger'e dokunmak hiçbir şey yapmıyor (yavaş mobil ağda saniyeler). JS hata verirse ≤1000px'te site navigasyonu kalmıyor; footer'da sadece BLOG/LEGAL/PRIVACY var, CASE STUDIES/ABOUT/SERVICES'e ulaşılamıyor.

**Neden önemli.** Usability/robustness: telefonda ilk etkileşim genellikle menüdür; ölü dokunuş 'site bozuk' hissi verir.

**Ne yapılmalı.** Nav'ı her zaman render et, açık/kapalı durumu CSS ile yönet: <button popovertarget="site-menu"> + <nav id="site-menu" popover> (Popover API, iOS 17+/Chrome 114+, light-dismiss ve Escape bedava) ya da gizli checkbox + header:has(#nav-toggle:checked) nav { display:flex }. React state'i sadece animasyon ve aria-expanded için kullan; en azından <noscript> içinde düz link listesi ver.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Tam ekran tipografik menü (mobilin 'poster anı')

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive, Obys, Studio Freight (menü = tipografik poster)

Header.jsx'teki listeyi framer-motion ile fixed inset-0 panele çevir: panel clipPath inset(0 0 100% 0 → 0 0 0 0) 500ms, satırlar overflow-hidden mask içinde y:100%→0, stagger 60ms, ease [0.22,1,0.36,1]. Tip clamp(44px,12vw,56px) Archivo 900, aktif sayfa beyaz, diğerleri #6f6f6f; indeks ve ok ikonları yok. Alt blok: hello@alaz.pro (mono 20px), 'NEW YORK 09:41 / İZMİR 16:41' canlı saat, 'TR' düz metin. Burger iki CSS çizgisi, X'e rotate ile dönüşür. Kapanış: Escape, overlay'e dokunma, yukarı swipe (touchstart/touchend deltaY). Scroll kilidi lenis.stop(), <main> inert.

### Yatay scroll-snap rail'leri (testimonials, capabilities, store screenshots, stack chip'leri)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basement Studio, Apple App Store ekran görüntüleri rail'i

Mobilde alt alta dizilen kart gruplarını saf CSS rail'e çevir: kapsayıcı 'flex overflow-x-auto snap-x snap-mandatory gap-[12px] -mx-[var(--gutter)] px-[var(--gutter)] [scroll-padding-inline:var(--gutter)] [scrollbar-width:none]', kart 'shrink-0 w-[82%] snap-start' (bir sonraki kart 'peek' eder). Altta '01 / 03' sayaç + ince progress: IntersectionObserver threshold .6 ile aktif index. prefers-reduced-motion'da native scroll, kütüphane yok. Ana sayfa ~1.200px kısalır.

### Case study ve blog için mobil art direction (portrait kırpımlar)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday, Resn case sayfaları; Apple'ın mobil art direction yaklaşımı

Her proje için 'hero-mobile' (1080×1350, 4:5) ve kapak için 1080×1080 asset üret; next/image getImageProps + <picture><source media='(max-width:760px)'> ile servis et. Mobil hero sıralaması: başlık → özet → full-bleed görsel bloğu → CTA. Görsel üstünde metin yok. Blog kapağı aspect-[4/5]. Görseller için 'sizes' mobilde '100vw'.

### Services: akordeon bloklar + sticky scroll-spy chip rail

- **Etki:** yüksek · **Efor:** orta · **Referans:** Lusion, Unseen Studio proje index'leri; Linear'ın mobil docs akordeonu

5 service bloğunu <details name='service'> exclusive akordeon yap (JS'siz, Chrome 120+/Safari 17.2+; polyfill için tek bir onToggle handler). Görünür kısım: numara + başlık + 1 satır + '+'. Üstte chip rail (bkz. mobile-05) 'sticky top-[var(--header-h)] bg-ink/90 backdrop-blur'. IntersectionObserver ile aktif chip beyaz, rail aktif chip'e scrollIntoView({inline:'center'}). Açılan bloğa lenis.scrollTo(el, {offset:-headerH-56}). Hedef: 11.600px → ≤4.500px.

### Scroll'la logoya dönüşen hero wordmark

- **Etki:** orta · **Efor:** orta · **Referans:** Locomotive, Active Theory (hero-to-logo morph)

Hero'daki 'ALAZ.' h1'i CSS scroll-driven animation ile header logosuna küçült: '@supports (animation-timeline: scroll())' içinde h1'e 'animation: shrink linear both; animation-timeline: scroll(root); animation-range: 0 60vh', keyframe'de transform: translate + scale (62px→25px). Header logosu hero görünürken opacity 0, dönüşüm bitince 1. Fallback: Lenis 'scroll' event'inden progress ile aynı transform'u style olarak yaz. Mobilde 'pt-[30vh]' boşluğu bu hareketle anlam kazanır.

### Akıllı header + alt-sabit CTA

- **Etki:** orta · **Efor:** küçük · **Referans:** iOS Safari toolbar davranışı; çoğu SOTD sitesinin mobil CTA pill'i

Lenis 'scroll' event'inde direction>0 ve y>120 ise header'ı translateY(-100%) (300ms), yukarı kaydırınca geri getir; header 60px, logo + 'MENU'. Hero bittikten sonra (IntersectionObserver hero sentinel) 'fixed bottom-[max(16px,env(safe-area-inset-bottom))] inset-x-[16px]' beyaz pill 'Start a project' belirsin (y:16→0, opacity). Form sayfasında bu pill gizli. Böylece header'daki beyaz CTA ve TR kutusu kalkar.

### Dokunma dili: active state'ler, swipe ile sonraki proje

- **Etki:** orta · **Efor:** küçük · **Referans:** @use-gesture/react (isteğe bağlı), Basement Studio dokunma geri bildirimleri

Tasarım token'ı olarak 3 dokunma durumu tanımla: satır/kart 'active:bg-[#141414]', metin link 'active:opacity-60', buton 'active:scale-[.98]'; hepsi 'transition duration-150'. Tailwind future.hoverOnlyWhenSupported ile hover'ı dokunmatikten ayır. Case study sayfasında yatay swipe (touchstart/touchend ΔX > 80px, ΔY < 40px) ile next/prev project; alt 'NEXT PROJECT' bloğunda ince bir 'swipe →' ipucu.

### Mobil medya diyeti: 540p encode, <source media>, grain fallback

- **Etki:** yüksek · **Efor:** küçük · **Referans:** web.dev 'Efficient video' rehberi; Lusion'ın mobilde video yerine still kullanımı

ffmpeg ile her video için '-vf scale=-2:540 -r 24 -t 8 -crf 30 -an' mobil sürüm (≤400KB) ve ilk kareden poster. <video>'ya iki <source media> ekle, preload='metadata'. 'prefers-reduced-data' veya navigator.connection.saveData'da autoplay yok. Alternatif: telefonda video yerine still + SVG feTurbulence grain overlay (statik, 0 byte video).

### Mobilde tek-soru-tek-ekran intake akışı

- **Etki:** orta · **Efor:** orta · **Referans:** Typeform akışı ama marka tipografisiyle; Studio Freight contact formu

IntakeForm'u ≤760px'te adım başına tek ekran yap: her adım min-h-[100svh] içinde başlık + alan + alt-sabit aksiyon barı (pb-[env(safe-area-inset-bottom)]). Adım değişiminde ilk alana focus (useEffect + ref.focus({preventScroll:false})), 'enterKeyHint=next/done', 16px alanlar, üstte 3 parçalı 2px progress. Tip seçimi radio-satır listesi. Gönderim sonrası 'REQUEST RECEIVED' ekranı aynı ritimde.
