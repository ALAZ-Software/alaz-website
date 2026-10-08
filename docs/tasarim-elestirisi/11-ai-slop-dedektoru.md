# AI-slop ve şablon kalıbı dedektörü (tüm site)

**Boyut puanı:** 3/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 28 (8 kritik · 15 önemli · 5 ince işçilik) · **Korunacaklar:** 9 · **Eklenecekler:** 10

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Site, 2025-26 "koyu brutalist AI stüdyo şablonu"nun neredeyse eksiksiz bir kataloğu: her bölümde mono eyebrow çifti ve 01/05 sayacı, "SYSTEM_ACTIVE" / "COMMAND SEQUENCE READY" / "SECURE TRANSMISSION" gibi sahte terminal etiketleri, köşe braketli + yeşil ping noktalı CTA, iki ayrı buzzword marquee, "NO BULLSHIT. JUST ACTION." ve "Built with intent. Engineered to last." tarzı dolgu metinler, "POWERED BY GOOGLE / CLAUDE" rozetleri, 8 adet stok "dark tech b-roll" video, inisyalli ve şirketsiz üç testimonial, ve repoda uygulamanın hiç import etmediği 55 shadcn dosyası + ~35 kullanılmayan paket (Hostinger Horizons kalıntıları dahil). Bunların hiçbiri ALAZ'a ait bir fikirden gelmiyor; tipografi sistemi (Archivo Black + fit()) ve iki gerçek ürün (Vocabulary, Market Hours) bu kabuğun altında kalıyor. Oysa elde Awwwards seviyesinde bir kimlik için nadir bulunan iki şey var: "alaz" kelimesinin gerçek etimolojisi (ateşin iş yapan parlak kenarı) ve stüdyonun kendi yayınladığı, canlı veri üreten ürünleri. Önerim: terminal temasını tamamen söküp tek bir fikre ("alaz kenarı": generatif alev-kenarı shader'ı + tek accent renk + cümle vakası editoryal ses) veya ürün-öncülü canlı bir ana sayfaya geçmek; aşağıdaki bulgular bunun için silinecek, değişecek ve eklenecek her parçayı tek tek listeliyor.

## Korunması gerekenler

- Tipografi altyapısı gerçek bir craft: Archivo Black / Inter / JetBrains Mono üçlüsü, src/lib/fit.js'teki ölçülmüş advance width tablosu ve globals.css'teki .fit sınıfı (en geniş kelime sütuna sığacak şekilde font-size kapaklama) — bunu koru, hatta sitenin tek 'mühendislik' kanıtı olarak anlat.
- Case study index sayfasındaki tipografik liste + hover'da kayan önizleme görseli (case-studies/page.jsx:35-40; cs-d-row-hover.png) — gerçek stüdyo sitelerinde görülen, slop olmayan bir kalıp; genişletilebilir.
- Proje detay hero'ları gerçek ürün sanatını kullanıyor (Vocabulary'nin sarı kedi kapağı, Market Hours'un canlı harita HUD'u) — sitenin en canlı ve en özgün anları; sitenin geri kalanı bu enerjiden beslenmeli.
- About'taki 'alaz' etimolojisi paragrafları (demirciler ve çobanlar, 'metal şekillendirecek kadar sıcak alev') gerçek, özgün ve iyi yazılmış bir marka hikâyesi; tüm site bu sesle yeniden yazılabilir.
- Services sayfasının içeriği somut: teslimat listeleri, stack, 'ideal fit', 4-8 hafta gibi gerçek süreler ve kod sahipliği cevapları veren FAQ — dolgu değil, bilgi. Form da koku dışında işlevsel (doğrulama, hata mesajları, API).
- Blog yazıları gerçek araştırmaya dayanıyor (Deloitte/Google verileri, kaynak listesi), uzun ve düzgün yazılmış; okuma ilerleme çubuğu ve Markdown renderer sade ve yeterli.
- Sıkı siyah-beyaz disiplin, 0 border-radius, tek --gutter değişkeni ile tutarlı kenar boşlukları, prefers-reduced-motion ve saveData'ya saygı duyan CSS-only reveal ve lazy BackgroundVideo mantığı — temel hijyen iyi.
- Stüdyonun kendi ürünlerini yayınlamış olması (Vocabulary, Market Hours — canlı web dashboard) sahte referanslardan çok daha güçlü bir hikâye; 'ürün yapan stüdyo' konumlandırması Awwwards için de ayırt edici.
- about-alaz-section.mp4 (pürmüz alevi) sekiz video içinde markayla gerçekten ilişkili tek görsel; yeni kimliğin tohumu burada.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `slop-01` — "POWERED BY GOOGLE / POWERED BY CLAUDE" rozetleri

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/PoweredBy.jsx (tamamı); src/app/[locale]/page.jsx:46; src/app/[locale]/about/page.jsx:49; messages/en.json home.hero.poweredBy; ekran: home-desktop-fold.png, about-desktop-fold.png, home-mobile-fold.png, about-mobile-fold.png

**Sorun.** Hero'nun hemen altında, intro metninin yanında Google ve Anthropic logolarıyla "POWERED BY GOOGLE | POWERED BY CLAUDE" satırı var; About hero'sunda aynısı tekrar ediyor. Bir yazılım stüdyosunun sitesinin "neyle güçlendirildiği" bilgi değil; ziyaretçiye "bu site bir LLM ile üretildi" diyen en açık işaret bu. Ayrıca Simple Icons'tan alınmış marka işaretlerinin bu şekilde "powered by" bağlamında kullanımı her iki şirketin marka kullanım kurallarına da uymuyor.

**Neden önemli.** Slop sinyali (en güçlüsü): AI-builder sitelerinin ortak imzası. Marka: ALAZ'ın kendi mühendisliğini anlatması gereken ilk ekranda, itibarı başka iki markaya devrediyor.

**Ne yapılmalı.** PoweredBy.jsx dosyasını ve iki kullanımını tamamen kaldır; en.json'daki poweredBy anahtarını sil. Araçlar sitede hiç geçmemeli; geçecekse yalnızca Services'teki STACK listesinde (zaten var) ve case study'de "Firebase / RevenueCat" gibi gerçek bağlamda kalsın.

> **Doğrulayıcı notu:** Bulgu doğru, satırlar yanlış: PoweredBy src/app/[locale]/page.jsx:51 ve about/page.jsx:45'te render ediliyor (46/49 değil); bileşen src/components/PoweredBy.jsx:4-7 Simple Icons path'leriyle Google+Claude çiziyor, etiket messages/en.json:418 ("POWERED BY"). home-desktop-fold.png ve about-desktop-full.png'de hero'nun hemen altında görünüyor. Kaldırma önerisi doğru; ek olarak about/page.jsx:9 import'u ve tr.json'daki karşılığı da silinmeli.

#### `slop-02` — Sahte görünen testimonial bölümü ("VALIDATION")

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:72-90; messages/en.json testimonials[0..2], home.validation; ekran: home-desktop-full.png (VALIDATION bölümü)

**Sorun.** "MERVE T. // PROJECT MANAGER", "BURAK Y. // PRODUCT OWNER", "SELIN A. // E-COMMERCE DIRECTOR": inisyal, şirket yok, link yok, yüz yok; alıntılar birbirinin aynısı ton ("brought order to a system that had become impossible to reason about"). Aynı site "EST. 2026" diyor ve arşivde yalnızca stüdyonun kendi iki ürünü var (Vocabulary, Market Hours); üç kurumsal müşteri referansı bu tabloyla çelişiyor. Başlığın yanındaki lucide ShieldCheck ikonu (page.jsx:74) ve "The strongest systems earn their reputation in production." lead cümlesi de şablon dolgusu.

**Neden önemli.** Slop sinyali + güven: eğitimli göz (ve potansiyel müşteri) bunu anında "LLM tarafından yazılmış testimonial" olarak okur; gerçek olsa bile bu formatta inandırıcı değil. Awwwards jürisi için ölümcül.

**Ne yapılmalı.** Bölümü tamamen kaldır. Yerine dürüst kanıt koy: (a) gerçek ürün metrikleri (Vocabulary: 24 dil, 17 oyun, 8000 kelime; Market Hours: 9 borsa, markethours.live canlı) tek satırlık, sade bir 'facts' bandı; (b) mağazalar yayına girince gerçek App Store / Play puanları (API'den çekilen, sahte olmayan); (c) ileride gerçek müşteri geldiğinde tam ad + şirket + link + fotoğraf, izinli. İsimsiz referans asla.

> **Doğrulayıcı notu:** İçerik doğrulandı: testimonials en.json:471-493 (MERVE T. / BURAK Y. / SELIN A., şirket-link-fotoğraf yok), bölüm page.jsx:76-90 (72-90 değil), ShieldCheck page.jsx:78 (74 değil), lead en.json:430. "EST. 2026" en.json:411 ve StructuredData.jsx:28 foundingDate '2026' ile çelişki gerçek. home-desktop-full.png'de üç eş kart görünüyor. Fix'teki (b) maddesi için not: mağaza linkleri henüz boş (src/lib/stores.js:4-12), puan çekme ancak yayın sonrası mümkün; (a) ürün metrikleri şimdiden en.json:53-56/74-77'den çıkarılabilir.

#### `slop-03` — Hero ve CTA dolgu kopyası: "NO BULLSHIT. JUST ACTION." ve türevleri

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json home.hero.taglineTop/taglineBottom, home.hero.intro ("Built with intent. Engineered to last."), home.hero.bottomNote ("PRECISION IS THE STANDARD. NOT THE GOAL."), home.start.bottomNote ("DESIGNED WITH INTENT / BUILT TO ENDURE"), home.start.paragraph ("The next great system starts with a conversation."), archive.introText ("Technical challenges. Considered solutions. Systems engineered for what comes next."); ekran: home-desktop-fold.png, home-desktop-full.png

**Sorun.** Hero'daki tek slogan kaba bir küfür + boş vaat; intro'nun son iki cümlesi ("Built with intent. Engineered to last.") LLM-stüdyo kopyasının en klişe kalıbı; aynı fikir aynı sayfada üç kez tekrar ediyor (bottomNote, start.bottomNote). Hiçbiri ALAZ'ın ne yaptığını, kimin için yaptığını veya neyi farklı yaptığını söylemiyor.

**Neden önemli.** Slop sinyali: bu cümleler 2025'te binlerce AI-builder sitesinde kelimesi kelimesine var. Marka: About sayfasındaki demirci/çoban anlatısı gibi gerçek bir sesiniz varken hero'da jenerik bir ses konuşuyor.

**Ne yapılmalı.** Hero'yu tek, somut ve cümle vakasında bir ifadeye indir; örn. "We build web apps, mobile apps and the backends behind them. Two of them are ours: Vocabulary and Market Hours." Alt notları (bottomNote'lar) tamamen sil. Kural: sitede 'intent', 'endure', 'precision', 'uncompromising', 'permanence' kelimeleri geçmesin; her cümle bir isim, sayı veya ürün içersin.

#### `slop-04` — Sahte terminal / komuta merkezi etiketleri

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:36 ("SYSTEM_ACTIVE" + 6px kare nokta), :182 ("COMMAND SEQUENCE READY" rozeti), :191-193 ("START SEQUENCE"); src/components/IntakeForm.jsx:112 ("PROJECT INTAKE / SECURE TRANSMISSION"), :136 ("STATUS: ACCEPTING NEW INQUIRIES ■"), :187 ("TRANSMITTING..."); messages/en.json intake.submitErrorFallback ("The transmission could not be completed."); ekran: home-desktop-fold.png (sol üst), home-desktop-full.png (START PROJECT bölümü), start-project-desktop-full.png (sol alt)

**Sorun.** Bir web formu "secure transmission" değildir, bir iletişim butonu "command sequence" başlatmaz, site "SYSTEM_ACTIVE" değildir. Bu etiketler görsel anlamda da aynı kalıp: mono 12px + 6px beyaz kare nokta (3 ayrı yerde aynı span). Hiçbiri kullanıcıya bilgi vermiyor.

**Neden önemli.** Slop sinyali: "pseudo-terminal" teması AI stüdyo şablonlarının ortak kostümü. Kullanılabilirlik: "START SEQUENCE" bir CTA olarak ne yapacağını söylemiyor.

**Ne yapılmalı.** Hepsini sil. Hero sol üst: ya boş bırak ya da gerçek bir bilgi ("İzmir · New York" veya o anki yerel saat). CTA metni: "Start a project" / "Tell us about your project". Form üst etiketi: "Project inquiry" ya da hiç. Gönderim durumu: "Sending…" / "Couldn't send. Try again or email hello@alaz.pro."

> **Doğrulayıcı notu:** Bulgu doğru, satırlar kaymış: SYSTEM_ACTIVE page.jsx:42 (en.json:410), "COMMAND SEQUENCE READY" rozeti page.jsx:190 (en.json:461), "START SEQUENCE" page.jsx:193-204 (en.json:467); IntakeForm.jsx:98 "PROJECT INTAKE / SECURE TRANSMISSION" (en.json:676), :120 "STATUS: ACCEPTING NEW INQUIRIES" (en.json:698), :189 "TRANSMITTING..." (en.json:794), submitErrorFallback en.json:790. 6px beyaz kare nokta span'ı üç yerde birebir aynı (page.jsx:42, :190, IntakeForm.jsx:120). Ekran: home-desktop-fold.png sol üst, start-project-desktop-full.png sol alt. Fix uygun.

#### `slop-05` — Köşe braketli CTA + yeşil ping noktası

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:184-196 (4 adet absolute köşe span'ı + animate-ping emerald-400/500 nokta + ArrowUpRight); ekran: probe-contact-cta-rest.png, probe-contact-cta-hover.png, home-desktop-full.png

**Sorun.** Home'un kapanış CTA'sı: backdrop-blur siyah kutu, dört köşede 7px beyaz braket, solda sürekli nabız atan yeşil nokta, sağda ↗. Sitenin başka hiçbir yerinde yeşil yok; tek renkli bir tasarımda rastgele bir 'online' göstergesi beliriyor. Hover'da beyaza dönüp braketler siyaha boyanıyor (hover ekran görüntüsünde dört köşede siyah artefakt).

**Neden önemli.** Slop sinyali: "corner-bracket button + pulsing green dot" 2025 AI-builder'ların en tanınır bileşeni. Craft: tek accent'i bir buton süsüne harcıyor.

**Ne yapılmalı.** Bileşeni sil. Sitede tek bir buton stili bırak: Archivo 700, cümle vakası, 1px çizgi altı veya dolu beyaz blok; hover'da yalnızca underline/arka plan geçişi (120-160ms). Yeşil nokta ve ping animasyonunu tüm siteden kaldır. Accent gerekiyorsa slop-fix'lerden sonra tek bir 'kor' rengi (bkz. eklemeler) yalnızca kenar/çizgi olarak kullanılsın.

> **Doğrulayıcı notu:** Bileşen page.jsx:193-204'te (184-196 değil): 4 köşe span'ı :194-197, animate-ping emerald-400/500 nokta :198-201, ArrowUpRight :203. Yeşil sitede yalnızca burada (grep 'emerald' tek sonuç). probe-contact-cta-hover.png'de dört köşede siyah artefakt net görünüyor; probe-contact-cta-rest.png'de yeşil nokta + braketler. Fix doğru; ayrıca ping animasyonu prefers-reduced-motion ile kapatılmıyor.

#### `slop-06` — İki buzzword marquee (◻ ve ✳ ayraçlı)

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:52-70 (signal marquee, ◻) ve :106-123 (ticker, ✳); tailwind.config.js keyframes signal-marquee/ticker; messages/en.json home.signal, home.ticker; ekran: home-desktop-full.png (hero altı ve CORE CAPABILITIES altı)

**Sorun.** Ana sayfada iki ayrı sonsuz kayan bant: "ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE ◻ …" ve "TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS ✳ ARCHITECTURAL INTEGRITY ✳ UNCOMPROMISING PRECISION ✳ …". İçerik tamamen soyut sıfat; ayraç karakterleri ve 28-30s linear loop şablonun kendisi. aria-hidden olmaları doğru ama bu, var olma sebeplerini açıklamıyor.

**Neden önemli.** Slop sinyali: "marquee of buzzwords" listedeki en bilinen kalıp; iki tane olması şablonun kopyalandığını gösteriyor. Craft: anlamsız hareket dikkat dağıtır.

**Ne yapılmalı.** İkisini de sil. Hareketli bir bant istiyorsan tek, gerçek veri taşıyan bir tane: Market Hours'un canlı "şu an açık borsalar" şeridi (NYSE · open · 14:42 ET …) ya da Vocabulary'nin günün kelimesi. Veriyi markethours.live'ın ürettiği JSON'dan (ya da aynı market-rules kütüphanesinden) çek; yoksa bant yok.

> **Doğrulayıcı notu:** İki marquee doğrulandı ama satırlar: signal marquee page.jsx:59-74 (◻, 8 tekrar), ticker page.jsx:107-126 (✳, 4x spread ×2); keyframes tailwind.config.js:106-111, animation :116-117 (28s/30s linear infinite); metinler en.json:420-423 ve :432-437. home-desktop-full.png'de hero altı ve CORE CAPABILITIES altında görünüyor. Ek: animate-signal-marquee/animate-ticker için motion-reduce varyantı yok, reduced-motion'da da dönüyor. Silme önerisi uygun.

#### `slop-07` — Her bölümde mono eyebrow çifti ve 01/05 sayaçları (tutarsız numaralandırma dahil)

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** data-reveal="line" eyebrow barı: page.jsx (4), services/page.jsx (4), about/page.jsx (3 aktif + 2 yorumlu), case-studies/page.jsx (1), case-studies/[slug]/page.jsx (1), blog/page.jsx (1), blog/[slug]/page.jsx (1), IntakeForm.jsx:112, LegalContent.jsx:12. `font-mono text-[12px]` etiket kalıbı uygulama dosyalarında 113 kez. Hero: page.jsx:39 "— 001 / 005" ve :48 "01 / 05" aynı ekranda iki farklı format; about/page.jsx:46 "01 / THE NAME" → :75 "04 / HOW WE OPERATE" (02 ve 03 bölümleri 62-73 satırlarında yorum satırı olduğu için numara atlıyor); ekran: about-desktop-full.png, home-desktop-fold.png, tüm *-desktop-fold.png

**Sorun.** Her sayfanın her bölümü aynı iskeletle açılıyor: üst çizgi + solda "02 / WHAT WE DO" + sağda "WEB / MOBILE / SYSTEMS" (ya da "TESTIMONIALS // 03", "STUDIO / 001", "INDEX / 001", "BLOG / 001", "ALAZ / INFORMATION"). Sayaçlar hiçbir şeyi saymıyor (About'ta 01→04), hero'da "001/005" ve "01/05" birlikte duruyor, Legal/404'te bile "ALAZ / INFORMATION" var.

**Neden önemli.** Slop sinyali: "mono eyebrow pairs on every section" + "index on everything" en sık görülen AI-stüdyo imzası. Craft: numaralar yanlış olunca tasarımın düşünülmeden kopyalandığı anlaşılıyor.

**Ne yapılmalı.** Tüm eyebrow çiftlerini ve sayaçları kaldır; bölümler başlıkla açılsın. Sayfa başına en fazla bir sessiz etiket bırak ve o etiket gerçek bir bilgi olsun (yayın tarihi, okuma süresi, proje yılı, 'İzmir'). Mono'yu yalnızca gerçekten veri olan yerlerde kullan (tarih, saat, sürüm, stack). `font-mono text-[12px] tracking-[.085em]` kalıbını tek bir `.meta` sınıfına indir ve kullanım sayısını 113'ten ~15'e düşür.

> **Doğrulayıcı notu:** Sayımlar doğru: data-reveal="line" page 4 / services 4 / about 5 (3 aktif + 2 yorumlu, :64 ve :68) / case-studies 1 / [slug] 1 / blog 1 / blog-[slug] 1; aynı bar data-reveal'siz IntakeForm.jsx:98 ve LegalContent.jsx:12'de. 'font-mono text-[12px]' = 113 doğrulandı. Satır düzeltmeleri: hero '— 001 / 005' page.jsx:45, '01 / 05' page.jsx:54 (39/48 değil); about '01 / THE NAME' about/page.jsx:52 → '04 / HOW WE OPERATE' :73. Reviewer'ın atladığı ek tutarsızlık: home'da hero '01 / 05' derken validation eyebrow'u da '01 / EXTERNAL SIGNAL' (en.json:425, çift 01), start bölümü eyebrow'da '04 / INITIATE' (:459) ama alt satırında '05 / 05' (page.jsx:206). Fix uygun.

#### `slop-11` — 8 adet stok "dark tech b-roll" video (sadece biri markayla ilgili)

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/videos/: dark-planet.mp4 (home hero, page.jsx:30, preload=auto, 1.1MB), the-work-section.mp4 (case-studies hero, devre kartı/veri merkezi, 4.5MB), start-project-rocket.mp4 (IntakeForm.jsx:106, roket fırlatma), services-section.mp4 (fiber optik), about-section.mp4 (jiroskop halkaları), about-end-section.mp4 (dişli çarklar; about + services CTA), start-a-project-hero.mp4 (sunucu odası; home contact), about-alaz-section.mp4 (pürmüz alevi). Toplam ~20MB. Kareler: scratchpad/frames/*.jpg

**Sorun.** Uzaydan Dünya, roket, sunucu koridoru, dişli, fiber optik, devre kartı: 2 kişilik bir yazılım stüdyosu için hiçbirinin hikâyeyle ilgisi yok; hepsi aynı 'siyah-gümüş teknoloji' stok paketinden. Üstelik opacity .5-.62 + %55-76 siyah gradient altında neredeyse görünmüyorlar (hero ekran görüntüleri simsiyah), yani maliyet var, etki yok. Tek anlamlı olan about-alaz-section (alev; adın etimolojisi).

**Neden önemli.** Slop sinyali: AI-builder'ların 'premium görünsün' diye eklediği stok loop'lar. Marka: Dünya/roket, 'büyük şirket taklidi'; site kendi ürünlerinin gerçek görselleri dururken sahte ölçek satıyor. Performans: hero'da preload=auto ile 1.1MB video, mobile dahil.

**Ne yapılmalı.** 7 videoyu sil. Alev videosunu da ham stok olarak değil, sitenin tek görsel fikri olarak yeniden ele al: generatif bir 'alaz kenarı' shader'ı (bkz. eklemeler) ya da gerçekten sizin çektiğiniz tek bir makro alev/kor kaydı. Hero'da video gerekiyorsa yalnızca ürün ekran kaydı (Vocabulary kart kaydırma, Market Hours haritası) olsun; poster + preload=metadata; mobilde video yok.

> **Doğrulayıcı notu:** 8 video ve boyutlar doğru (dark-planet 1.1MB, the-work 4.5MB, toplam 20MB; ls public/videos). İçerikler frames/sheet.png ile doğrulandı: Dünya, jiroskop halkaları, pürmüz alevi, dişliler, fiber optik, sunucu koridoru, devre kartı, roket. Satır düzeltmeleri: hero video page.jsx:35-37 (preload=auto, 30 değil), roket IntakeForm.jsx:93-95 (106 değil), the-work case-studies/page.jsx:29-31, services services/page.jsx:61-72, about-section about/page.jsx:36-38, about-alaz about/page.jsx:49, about-end about/page.jsx:78 + services/page.jsx:250, start-a-project-hero page.jsx:185. Opacity .5-.62 ve %55-78 gradient'ler kodda; home-desktop-fold.png neredeyse simsiyah. Mobil için gating yok (plain <video>; BackgroundVideo yalnızca reduced-motion/saveData'ya bakıyor). Fix uygun.

### ÖNEMLİ

#### `slop-08` — "// " yorum öneki

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:86 ("// {item.role}"), :101 ("// {service.category}"), :157 ("// ASSET IN PROGRESS"); src/app/[locale]/blog/[slug]/page.jsx:112 ("// {post.author.role}"); messages/en.json home.validation.eyebrowRight ("TESTIMONIALS // 03"); ekran: home-desktop-full.png, blogpost-d-author-next.png

**Sorun.** Rol ve kategori metinlerinin başına kod yorumu gibi "// " konmuş ("// PROJECT MANAGER", "// WEB / SAAS / PLATFORMS", "// ENGINEERING STUDIO"). Yorumlanmış bir UI metni fikri bir kez bile komik değil, dört yerde kalıp.

**Neden önemli.** Slop sinyali: "kodcu görünme" süsü; eğitimli göz için doğrudan şablon işareti.

**Ne yapılmalı.** Önekleri sil; rolleri düz metin yaz. Kategori etiketleri ("WEB / SAAS / PLATFORMS") ya cümle vakasına geçsin ("Web, SaaS, platforms") ya da tamamen kalksın; başlık zaten söylüyor.

#### `slop-09` — Her sayfada dev tek-kelime büyük harf başlık + gri kare nokta

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** Gri nokta span'ı (text-[#5f5f5f]/[#6e6e6e]/[#777]/[#858585]/[#8a8a8a] ".") uygulama kodunda 19 yerde + Header.jsx:28 + Footer.jsx:16. Başlıklar: VALIDATION. / CORE CAPABILITIES. / SELECTED WORKS. / START PROJECT. (page.jsx), WE ENGINEER PERMANENCE. (about), SOFTWARE ENGINEERING. / WHAT WE ACTUALLY DO. / HOW WE OPERATE. / QUESTIONS & PRACTICAL ANSWERS. (services), THE WORK. (archive), THE BLOG. (blog), LEGAL. / PRIVACY. / PAGE NOT FOUND. (LegalContent), START A PROJECT. / REQUEST RECEIVED. (IntakeForm), VOCABULARY. / MARKET HOURS. (case); ekran: tüm *-desktop-fold.png

**Sorun.** Her H1/H2 aynı tarif: Archivo 900, 10-16vw, tamamı büyük harf, 1-2 kelime, sonda gri kare nokta (Archivo'da nokta kare olduğu için imleç gibi görünüyor). Hero "ALAZ." ile footer "ALAZ." aynı 16vw boyutta ve her sayfada iki kez aynı dev wordmark görülüyor (Footer.jsx:16 = page.jsx:41). Blog'da "THE BLOG." iki satıra bölünmüş, Legal'de "LEGAL." 190px: içerik hiyerarşisi yok, sadece ölçek var.

**Neden önemli.** Slop sinyali: "giant single-word heading with grey period" + "huge brand name in footer" 2024-26'nın en yaygın iki şablon tropu. Craft: nokta motifi tek marka işaretiniz, ama 21 yerde tekrarlanınca anlamını yitiriyor.

**Ne yapılmalı.** Gri noktayı yalnızca wordmark'ta (header + footer, bir kez) bırak; tüm bölüm başlıklarından kaldır. Başlıkları cümleye çevir ve karışık vakaya geç ("What we actually do" → "We build three things, and run two of them ourselves."). Büyük harf display yalnızca H1'de ve yalnızca gerçek isimlerde (proje adları). Footer'daki dev wordmark'ı kaldır ya da hero'dakinden farklı bir ölçeğe/forma (ör. yalnızca 'A.' veya adres bloğu) indir; Legal/Privacy/404 için H1 ≤ 64px.

#### `slop-10` — Her şeyde ↗ (28 ArrowUpRight) ve rastgele lucide ikonları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** ArrowUpRight: 28 kullanım (Header.jsx:38, :44-47 mobil menüde her satır; page.jsx:97 MoveUpRight ile :100 ArrowUpRight aynı kartta iki farklı ok; :124, :164; IntakeForm.jsx:127 her tip kartında; blog/page.jsx:58; case-studies/page.jsx:38 vb.). Diğerleri: ShieldCheck (page.jsx:74 başlık süsü), CirclePower (IntakeForm.jsx:187 submit butonu üzerinde güç düğmesi ikonu), Clock (blog/page.jsx:55), Menu/X (Header.jsx:39); ekran: nav-open-mobile.png, start-project-desktop-full.png, cs-d-row-hover.png

**Sorun.** Ok ikonu dahili link, harici link, kart, liste satırı, nav CTA, mobil menü satırı ve form kartlarında ayrım gözetmeden kullanılıyor (↗ normalde 'yeni sekme/harici' anlamı taşır). Aynı services kartında header'da MoveUpRight, link'te ArrowUpRight. "SEND INQUIRY" butonunda bir güç düğmesi ikonu var. VALIDATION başlığının yanında anlamsız bir kalkan.

**Neden önemli.** Slop sinyali: "lucide icons everywhere" + "arrow-up-right on everything". Kullanılabilirlik: ↗ anlamı bozuluyor; kullanıcı neyin harici olduğunu ayırt edemiyor.

**Ne yapılmalı.** lucide-react'i tamamen kaldır. Archivo'nun kalınlığına çizilmiş 3 özel glif (→, ↗ yalnızca harici, + / × ) tek bir inline SVG sprite'ta. Kural: kartlarda ve liste satırlarında ikon yok (hover'da underline ya da arka plan yeterli); ↗ yalnızca target=_blank linklerde; submit butonunda ikon yok; dekoratif ikon (ShieldCheck) yok.

> **Doğrulayıcı notu:** 28 ArrowUpRight doğrulandı (9 dosyada lucide import). Düzeltmeler: page.jsx:97'deki ArrowUpRight 'EXPLORE SERVICES' linkinde (bölüm başlığı satırı), :100'deki MoveUpRight hizmet kartının içinde; yani 'aynı kartta' değil, aynı bölümde iki farklı ok glifi. ShieldCheck page.jsx:78 (74 değil), CirclePower IntakeForm.jsx:189 (187 değil), Clock blog/page.jsx:57, Menu/X Header.jsx:39, mobil menü okları Header.jsx:43-45 (nav-open-mobile.png). Ek: page.jsx:3 ArrowRight ve CirclePower import edilip home'da hiç kullanılmıyor (ölü import). Özel glif seti önerisi uygun.

#### `slop-12` — Hostinger Horizons (AI site-builder) kalıntıları: CDN görselleri, FIG. caption'ları, PocketBase auth

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:3-7 media.earth/server/wafer/conduits/laboratory (horizons-cdn.hostinger.com + images.hostinger.com; page.jsx:22 `const media = tRoot.raw('media')` yüklenip hiç kullanılmıyor); en.json:97 ve :113 blog cover'ları images.hostinger.com; blog/[slug]/page.jsx:100 cover'a grayscale(1) brightness(.82) filtresi; layout.jsx:56-57 preconnect/dns-prefetch images.hostinger.com; next.config.js remotePatterns 2 Hostinger host; en.json:518 "FIG. 01 — THE PRACTICE OF PRECISION" ve :545 "FIG. 02 — THE SYSTEMS THAT CONNECT" (kullanılmayan caption'lar); src/lib/pocketbaseClient.js ('/hcgi/platform' Horizons PocketBase yolu), src/contexts/AuthContext.jsx, src/components/ProtectedRoute.jsx (hiçbir yerden import edilmiyor); ekran: blog-post-desktop-fold.png (cover yüklenemedi, alt metni görünüyor)

**Sorun.** Sitenin editoryal görselleri (iki blog kapağı) hâlâ bir AI site-builder'ın CDN'inde; gri filtre AI görünümünü saklamak için uygulanmış. 'earth/wafer/laboratory' gibi 5 AI stok görsel ve 'FIG. 01' sahte bilimsel caption'lar JSON'da duruyor. Auth/PocketBase dosyaları Horizons şablonundan kalma ölü kod. Bu oturumda CDN proxy'den geçmediği için kapak kırık render oldu; prod'da da üçüncü taraf bir builder'a bağımlı.

**Neden önemli.** Slop sinyali: kaynağa bakan herkes (Awwwards jürisi kaynağa bakar) sitenin bir AI builder'da başladığını görür. Dayanıklılık: builder CDN'i kapanırsa blog görselsiz kalır.

**Ne yapılmalı.** media.* ve FIG. anahtarlarını, pocketbaseClient/AuthContext/ProtectedRoute dosyalarını, pocketbase ve mysql2 bağımlılığını (lib/db.js gerçekten kullanılıyorsa onu tut), layout preconnect'lerini ve next.config remotePatterns'ı sil. Blog kapaklarını /public altına al ve AI görsel yerine yazının kendi verisinden üretilmiş bir grafik (Deloitte %8.4 eğrisi) ya da salt tipografik kapak kullan; grayscale filtresine ihtiyaç kalmasın.

> **Doğrulayıcı notu:** Doğrulandı: media.* en.json:2-8 (5 Hostinger URL), page.jsx:22 `media` yüklenip hiç kullanılmıyor; blog cover'ları en.json:97 ve :113; grayscale filtresi blog/[slug]/page.jsx:98 (100 değil); layout.jsx:56-57 preconnect; next.config.js:10-11 remotePatterns; FIG. caption'ları en.json:518 ve :545; pocketbaseClient.js:3 '/hcgi/platform'; AuthContext/ProtectedRoute hiçbir yerden import edilmiyor. blog-post-desktop-fold.png'de kapak alt metni olarak kırık render olmuş. Fix düzeltmesi: mysql2 silinmemeli, lib/db.js api/contact/route.js:2'den gerçekten kullanılıyor; yalnızca pocketbase gidecek. Ek: blog OG görseli ve BlogPosting JSON-LD image'ı da post.cover (blog/[slug]/page.jsx:33 ve :67), yani sosyal paylaşım önizlemesi de builder CDN'ine bağımlı.

#### `slop-13` — AI üretimi OG görseli, eski konumlandırma sloganıyla

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/og-image.png (415KB); src/lib/seo.js OG_IMAGE alt: "ALAZ — Software & High-Performance Web Engineering"

**Sorun.** Paylaşım görseli belli ki görüntü modeliyle üretilmiş: harf formları dalgalı, baseline bozuk, arkada 'sahte devre' çizgileri; altındaki slogan "SOFTWARE & HIGH-PERFORMANCE WEB ENGINEERING" sitenin şu anki 'web / mobile / systems' konumlandırmasıyla uyuşmuyor. Linkin Slack/LinkedIn'de ilk görüldüğü yer burası.

**Neden önemli.** Slop sinyali: AI-üretimi tipografi anında tanınır. Marka: brand/logo altında gerçek Archivo Black SVG wordmark varken kullanılmamış.

**Ne yapılmalı.** next/og ImageResponse ile sayfa başına dinamik OG üret: gerçek wordmark SVG'si + sayfa başlığı + (varsa) ürün görseli; 1200×630, < 100KB. Statik PNG'yi sil, alt metni güncelle.

#### `slop-14` — Kullanılmayan shadcn/ui (55 dosya) ve ~35 ölü bağımlılık

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/ui/* (55 dosya; src/components/ui dışından hiçbir import yok); package.json: 27 @radix-ui paketi, recharts, embla-carousel-react, cmdk, vaul, react-day-picker, sonner, input-otp, react-resizable-panels, date-fns, react-hook-form, zod, @hookform/resolvers, next-themes, class-variance-authority, tailwindcss-animate (uygulama kodunda 0 kullanım); framer-motion yalnızca kullanılmayan src/components/Reveal.jsx'te; src/components/CountUp.jsx, src/hooks/use-toast.js, src/hooks/use-mobile.jsx kullanılmıyor; components.json; tailwind.config.js içindeki sidebar/card/popover/accordion token ve keyframe'leri

**Sorun.** Repo bir shadcn starter'ın üzerine yazılmış; UI katmanının tamamı inline Tailwind olduğu için 55 bileşen dosyası, 27 radix paketi, bir chart kütüphanesi, bir carousel, bir takvim, bir OTP girişi ve bir drawer hiç kullanılmadan duruyor. framer-motion ve lenis'ten ikincisi hariç 'animasyon altyapısı' da ölü.

**Neden önemli.** Slop sinyali: 'npx shadcn add --all' izi; kaynak/bundle'a bakan herkes için şablon kokusu. Craft: bakım yükü, yanlış lint sinyali, node_modules şişkinliği.

**Ne yapılmalı.** src/components/ui, src/hooks, src/contexts, Reveal.jsx, CountUp.jsx, pocketbaseClient.js, components.json'ı sil; package.json'dan yukarıdaki paketleri çıkar (lenis, nextjs-toploader kararına göre, next-intl, nodemailer, mysql2 kalır); tailwind.config.js'yi yalnızca kullanılan token'lara (ink/surface/line/mute/dim + 3 breakpoint) indir; `npx depcheck` ile doğrula.

> **Doğrulayıcı notu:** 55 ui dosyası ve src/components/ui dışından sıfır import doğrulandı (grep). Bağımlılık taraması: uygulama kodunda 0 kullanım olan paketler 27 @radix-ui + @hookform/resolvers, cva, cmdk, date-fns, embla, input-otp, next-themes, react-day-picker, react-hook-form, react-resizable-panels, recharts, sonner, vaul, zod = 42; framer-motion yalnızca kullanılmayan Reveal.jsx'te, pocketbase yalnızca kullanılmayan pocketbaseClient/AuthContext'te → toplam 44 ölü paket, '~35' eksik. Düzeltme: tailwindcss-animate 'sıfır kullanım' değil, tailwind.config.js:1'de plugin olarak import ediliyor (utilities'i kullanılmıyor, yine de silinebilir ama config'den de çıkarılmalı). CountUp.jsx, hooks/use-toast.js, hooks/use-mobile.jsx yalnızca ui/ içinden referanslı, ölü. lenis, nextjs-toploader, next-intl, nodemailer, mysql2, clsx, tailwind-merge kalır.

#### `slop-15` — Aynı kart şablonu: testimonial = service = deliverable = process = blog = form tipi

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** page.jsx:72-90 (testimonials, 3 kolon, border-y), :97-104 (services, 3 kolon, "01 — 03 ↗"), :140-175 (proje kartları: köşede "ALAZ / 01" mono rozet + sağ altta 42px ↗ kutusu), case-studies/[slug]/page.jsx:140-147 ("01 / DELIVERABLE" 3 kolon), services/page.jsx:231-241 (process 4 kolon), blog/page.jsx:46-62 (kart: tag kutusu + tarih + başlık + alt çizgi + saat ikonu + READ ↗), IntakeForm.jsx:120-129 ("01 / TYPE" + ↗ kartlar); ekran: home-desktop-full.png, case-vocabulary-desktop-full.png, start-project-desktop-full.png

**Sorun.** Altı farklı içerik türü aynı kalıpla kurulmuş: sol üstte mono index etiketi, sağ üstte ok/odak kelimesi, ortada kalın başlık, altta 13-15px gri metin, 1px çizgili grid, hover:bg-#141414. Testimonial ile hizmet ile teslimat ile form seçeneği görsel olarak birbirinden ayırt edilemiyor; proje görselindeki "ALAZ / 01" rozeti + köşe ok kutusu da tipik 'image card with pill and arrow' tropu.

**Neden önemli.** Slop sinyali: 'identical card template reused' listedeki maddenin birebir örneği. Craft: içerik türü formu belirlemeli; burada form içerikten bağımsız.

**Ne yapılmalı.** Her türe kendi formu: Hizmetler → tek sütun, her hizmet tam genişlik bir satır ve yanında o hizmeti kanıtlayan gerçek ürün ekranı (Vocabulary = mobile, Market Hours = web + backend); Teslimatlar → başlık altında düz cümle ("Spaced-repetition review after 1, 2, 4, 7, 15 and 30 days"), kutu yok; Süreç → tek yatay akış, her adımda gerçek bir artefakt (whiteboard fotoğrafı, PR, staging linki); Blog → tek sütun liste, tarih + başlık + ilk cümle, kart yok; Form tipi → metin radio toggle'ları. Proje görsellerinden rozet ve ok kutusunu kaldır.

> **Doğrulayıcı notu:** Kalıp doğru, bazı satırlar yanlış: testimonial page.jsx:76-90, hizmet kartları :98-103, proje kartları :142-181 (rozet :160-162, 42px ok kutusu :163-165); DELIVERABLE kutuları case-studies/[slug]/page.jsx:149-156 (140-147 değil); process 4 kolon services/page.jsx:209-217 (231-241 FAQ'nun satırları); blog kartı blog/page.jsx:46-64; form tipi kartları IntakeForm.jsx:127-134 (120-129 değil). home-desktop-full.png, case-vocabulary-desktop-full.png, start-project-desktop-full.png, blog-d-cards.png görsel olarak doğruluyor: hepsi 'sol üst mono index + sağ üst ok + kalın başlık + gri 13-15px + hairline grid'. Tür bazlı form önerileri uygun.

#### `slop-16` — Her case study'de aynı üç slogan başlık ve "DELIVERABLE" kutuları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json caseStudy.challengeHeading ("BUILD FOR WHAT'S NEXT."), approachHeading ("PRECISION AT EVERY LAYER."), outcomeHeading ("LESS NOISE. MORE SIGNAL."), contactPrompt ("HAVE A COMPLEX CHALLENGE?"); src/app/[locale]/case-studies/[slug]/page.jsx:101-125, :140-147 (markers "01 / DELIVERABLE"); ekran: case-vocabulary-desktop-full.png, case-market-hours-desktop-full.png

**Sorun.** Vocabulary ve Market Hours sayfalarında bölüm başlıkları birebir aynı: projeyle ilgisi olmayan üç slogan. Asıl içerik (1-2-4-7-15-30 gün tekrar takvimi, DST-aware saat motoru, RevenueCat) sağdaki 16-22px gri paragrafta saklı; başlık ise boş. "DELIVERABLE" kutuları ürün özelliklerini teslimat gibi etiketliyor.

**Neden önemli.** Slop sinyali: sayfa şablonunun içerik yerine konuştuğu an. Craft: case study'nin kancası projeye özgü somut cümledir ("Markets open in nine time zones; the app stores each in its own").

**Ne yapılmalı.** Başlıkları proje verisine taşı (en.json projects[].challengeTitle vb.) ve cümle yap: Vocabulary → "Make people come back for three minutes a day" / "Words return after 1, 2, 4, 7, 15 and 30 days" / "17 games, 44 decks, 24 languages". Markers'ı başlık altına tek satır meta olarak indir. Galeriye gerçek ekran kayıtları (kart kaydırma, alarm akışı) ekle; 'HAVE A COMPLEX CHALLENGE?' → 'Building something similar? hello@alaz.pro'.

> **Doğrulayıcı notu:** Başlıklar en.json:611-624 ve contactPrompt :627 doğrulandı; her iki proje sayfasında aynı üç slogan (case-vocabulary-desktop-full.png). Satır düzeltmesi: bölümler case-studies/[slug]/page.jsx:109-131 (101-125 değil), markers :149-156 (140-147 değil). Not: markers içeriği zaten somut ürün verisi (en.json:57-61 'SPACED-REPETITION REVIEW / 17 WORD GAMES / 24 LANGUAGES'), sorun yalnızca 'DELIVERABLE' etiketi ve kutu formu. Fix uygun.

#### `slop-17` — Sahte arşiv etiketleri ve yıl damgaları ("EST. 2026", "ON FILE", "END OF INDEX")

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json: home.hero.toplineRight ("SOFTWARE STUDIO / EST. 2026"), about.introNote ("ALAZ / MANIFESTO 2026"), servicesPage.introNote ("ALAZ / CAPABILITIES 2026"), blogIndex.introNote ("ALAZ / WRITING 2026"), intake.formNotation ("ALAZ / 2026"), archive.introNote ("PROJECTS ON FILE / {count}"), archive.noteLeft/noteRight ("END OF INDEX" / "MORE SYSTEMS IN DEVELOPMENT"), blogIndex.noteLeft ("MORE FIELD NOTES INCOMING."), home.selected.imageAlt ("{name} {type} engineering visual"), page.jsx:156-157 ("ALAZ / SPECIMEN 01 // ASSET IN PROGRESS" fallback), legal.documentLabel ("LAST UPDATED: OCTOBER 2026"); ekran: home-desktop-fold.png sağ üst, case-studies-desktop-full.png alt

**Sorun.** Bu yıl kurulmuş bir stüdyo "EST. 2026" yazıyor; her sayfa 'manifesto/capabilities/writing 2026' diye damgalanıyor; iki projelik liste "INDEX", "ON FILE", "END OF INDEX" diye arşiv taklidi yapıyor. Alt metinler "engineering visual" gibi anlamsız.

**Neden önemli.** Slop sinyali: 'faux-archival document' kostümü, yine terminal temasının kardeşi. Marka: ödünç alınmış köklülük hissi, gerçek olanı (yeni, küçük, kendi ürünlerini yayınlayan bir ekip) gizliyor.

**Ne yapılmalı.** Tüm damgaları ve arşiv etiketlerini sil. Yeni olmayı sahiplen: "Started 2026 in İzmir. Two products shipped so far." Liste sonunda not gerekiyorsa gerçek bir cümle: "We're writing up the next one." Alt metinleri görsele göre yaz ("Vocabulary app: yellow cover with the 8000-word cat mascot").

#### `slop-18` — Jenerik manifesto kopyası (About / Services / Process)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json: about.heading ("WE ENGINEER PERMANENCE"), about.kicker ("NOT AN AGENCY. AN ENGINEERING PRACTICE."), about.processHeading ("FOUR MOVES / ZERO GUESSWORK"), about.endTextTop/Bottom ("GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T."), about.principles ("DATA OVER DOGMA / BRUTAL EFFICIENCY / ENGINEER PERMANENCE"), about.processSteps (DISCOVER/ARCHITECT/ENGINEER/HARDEN), servicesPage.processSteps ("Deep Discovery / System Blueprint / Iterative Execution / Production & Handover"), servicesPage.overviewTitle ("WHAT WE ACTUALLY DO"), home.validation.lead; ekran: about-desktop-full.png, services-desktop-full.png

**Sorun.** About'un asıl hikâyesi (originParagraphs: demirciler ve çobanlar, 'metal şekillendirecek kadar sıcak alev') gerçekten iyi ve özgün; ama etrafı 'permanence / discipline / precision' tekrarlayan, herhangi bir stüdyonun sitesine yapıştırılabilecek manifesto cümleleriyle sarılmış. İki ayrı 4 adımlı süreç (About'ta ve Services'te farklı isimlerle) var; ikisi de süreç değil, slogan listesi.

**Neden önemli.** Slop sinyali: 'engineered to last / built with intent' tarzı dolgu; özgün sesle jenerik sesin yan yana durması güveni daha da düşürüyor.

**Ne yapılmalı.** originParagraphs'ın sesini sitenin tek sesi yap: cümle vakası, somut, birinci çoğul. About H1: "Alaz is the part of the flame that's hot enough to work metal." Süreci tek yerde, 4 gerçek adımla ve her adımın gerçek çıktısıyla anlat (ör. '2-page scope doc', 'staging URL in week 2'). principles ve processSteps anahtarlarından birini tamamen sil.

> **Doğrulayıcı notu:** Render edilen kopya doğrulandı: about.heading en.json:502-505, kicker :501, processHeading :548-551, endText :574-575 (hem about/page.jsx:80 hem services/page.jsx:253-257'de), about.processSteps :552-573 (about:75), servicesPage.processSteps :308-329 (services:209-217), overviewTitle :161-164, validation.lead :430. Düzeltme: about.principles (:521-537) sayfada render EDİLMİYOR, about/page.jsx:63-66 yorum satırı; görünür manifesto listesinden çıkarılmalı (slop-24 kapsamı). Ancak aynı üç slogan about.meta.description :497'de ('Data over dogma, brutal efficiency, software built to last') ve meta.title :496 'The Engineering Manifesto' olarak SERP'e sızıyor; fix'e meta metinleri de eklenmeli.

#### `slop-20` — Mono-her-şey navigasyon, 4 kolonlu hairline grid ve numaralı mobil menü

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:28-39 (uppercase mono nav, 'TR' kutusu, beyaz CTA + ↗, lucide Menu/X), :44-47 (mobil menü: '01'-'05' numara + her satırda ↗); src/app/[locale]/page.jsx:33 (hero'da 4 kolon 6.5% beyaz dikey çizgi overlay); her bölümde border-line hairline'lar; ekran: nav-open-mobile.png, home-desktop-fold.png, probe-home-load-400ms.png

**Sorun.** Nav etiketleri JetBrains Mono büyük harf, dil düğmesi 1px kutuda 'TR', CTA beyaz blok + ↗: 2025 koyu şablonlarının standart header'ı. Hero'nun arkasındaki hairline kolon ızgarası yalnızca home'da var ve hiçbir layout'a hizalanmıyor (içerik 4 kolona oturmuyor), yani 'teknik görünsün' süsü. Mobil menü 01-05 numaralı, her satırda ok.

**Neden önemli.** Slop sinyali: 'hairline grids' ve 'index on everything' listede; header tüm AI stüdyo sitelerinde aynı olduğu için marka hafızası yaratmıyor.

**Ne yapılmalı.** Nav'ı gövde fontuyla (Inter 500, 14-15px, cümle vakası) yaz; mono'yu nav'dan çıkar. Dil düğmesi: 'Türkçe' düz metin link. CTA: altı çizili metin ya da tek blok, ok yok. Grid overlay'ini kaldır (ya da gerçek 12 kolon layout'a bağla ve yalnızca geliştirme modunda göster). Mobil menü: numarasız, oksuz, büyük Archivo başlıklar; hamburger yerine 'Menu' kelimesi.

> **Doğrulayıcı notu:** Header.jsx:29-39 (mono uppercase nav :33, 'TR' kutusu :37, beyaz CTA + ↗ :38, lucide Menu/X :39) ve mobil menü :43-45 (0{i+1} numaraları + her satırda ArrowUpRight) doğrulandı; nav-open-mobile.png 01-05 + oklar. Satır düzeltmesi: 4 kolon hairline overlay page.jsx:39 (33 değil), yalnızca home'da (grep 'grid-cols-4' tek sonuç), içerik bu kolonlara hizalanmıyor (home-desktop-fold.png). Fix uygun; 'Inter 500 cümle vakası' bir tercih ama somut.

#### `slop-21` — Form tiyatrosu: "33% COMPLETE", "01 / 03 — PROJECT TYPE", ↗'lu tip kartları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:119 ("0X / 03 — {label}" + "{percent}% COMPLETE"), :120-129 ("01 / TYPE" kartları + ArrowUpRight/Check), :128-135 (aside: "YOUR BRIEF / IN THREE PARTS", 01-03 adım listesi, "STATUS: ACCEPTING NEW INQUIRIES ■"); messages/en.json intake.*; ekran: start-project-desktop-full.png, start-project-mobile-fold.png

**Sorun.** Toplam 7 alanlık bir form üç adıma bölünmüş, yüzde sayacı, sol tarafta adım tablosu, 'status' göstergesi ve 4 kartlık proje tipi seçimi ile 'komuta paneli' gibi sunuluyor. Adım geçişi içerik gizlediği için kullanıcı budget/timeline alanlarını önceden göremiyor.

**Neden önemli.** Slop sinyali: 'multi-step intake with percent' AI-builder form şablonu. Kullanılabilirlik: 7 alan için 3 adım, sürtünme.

**Ne yapılmalı.** Tek sayfa form: proje tipi = metin toggle (Web · Mobile · Backend · Other), ardından ad/e-posta/kısa açıklama; bütçe/süre isteğe bağlı iki select. Yüzde, adım listesi, status satırı ve kartlar kalksın. Gönder butonu: "Send" tek kelime, ikon yok. Başarı ekranı: dev 'REQUEST RECEIVED.' yerine kısa cümle ve ne zaman döneceğiniz ("We reply within one business day").

> **Doğrulayıcı notu:** Kalıp doğru, ayrıntılar düzeltildi: yüzde sayacı ve '0X / 03 — label' IntakeForm.jsx:123 (119 değil), tip kartları + ↗/Check :127-134, aside (asideLabel, 01-03 adım listesi, STATUS satırı) :112-121 (128-135 değil); start-project-desktop-full.png birebir. Alan sayısı 7 değil 8 (IntakeForm.jsx:10: project_type, project_name, brief, timeline, budget, name, email, company; 5'i zorunlu). Tek sayfa form ve 'Send' önerisi uygun.

#### `slop-missed-1` — Tekrarlayan antitez kalıbı: "X. NOT Y." / "NOT X. Y." / "LESS X. MORE Y."

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:413-414 (NO BULLSHIT. / JUST ACTION.), :417 (PRECISION IS THE STANDARD. NOT THE GOAL.), :501 (NOT AN AGENCY. AN ENGINEERING PRACTICE.), :549-550 (FOUR MOVES / ZERO GUESSWORK), :574-575 (GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T. — about/page.jsx:80 ve services/page.jsx:253-257'de iki kez render), :622-623 (LESS NOISE. MORE SIGNAL.), :697 (No generic sales pitch. No unnecessary calls.), :317 (No ambiguous specs.); ekran: home-desktop-fold.png, about-desktop-full.png, case-vocabulary-desktop-full.png

**Sorun.** Reviewer kelime listesine (intent/endure/precision) baktı ama cümle yapısına bakmadı: sitede en az sekiz başlık/kicker aynı retorik kalıpla kurulu, iki kısa cümlelik zıtlık (biri olumsuz). Bu, LLM tarafından yazılmış manifesto kopyasının en tanınır yapısal imzasıdır ve kelimeler değişse de kalıp kalır.

**Neden önemli.** Slop sinyali: 'contrast-pair tagline' kalıbı AI-builder sitelerinde her bölüm başlığında görülür; eğitimli göz tek tek kelimelerden önce bu ritmi tanır. Marka: sekiz ayrı 'mantra' hiçbirinin akılda kalmamasına yol açar.

**Ne yapılmalı.** Site genelinde en fazla bir antitez bırak (ya hero'da ya About kapanışında). Diğerlerini isim/sayı içeren düz bildirim cümlelerine çevir: about.kicker → 'A two-person engineering studio in İzmir and New York'; outcomeHeading → projeye özgü somut cümle (slop-16); endText → 'Vocabulary and Market Hours are live. The next one is in progress.'; asideParagraph → 'Five fields. We reply within one business day.' Kopya rehberine kural ekle: 'iki cümlelik zıtlık, sitede bir kez'.

#### `slop-missed-2` — "SELECTED WORKS" + "VIEW ALL PROJECTS" + "SELECTED PROJECTS // 02": iki projelik arşivde seçki tiyatrosu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:132 (count rozeti), :135-136 (SELECTED / WORKS), :138-140 (VIEW ALL PROJECTS ↗); messages/en.json:448-454, projects dizisi :32-88 (tam 2 proje); case-studies/page.jsx:42 (aynı 2 proje); ekran: home-desktop-full.png SELECTED WORKS bölümü, case-studies-desktop-full.png

**Sorun.** Ana sayfa 'seçilmiş işler' diyor, sayacı '02' gösteriyor ve 'tüm projeleri gör' butonuyla arşive yolluyor; arşivde de aynı iki proje var. 'Selected' daha büyük bir havuzdan seçim ima eder, 'view all' ise gizli bir fazla olduğunu; ikisi de yok. Bu, sahte testimonial ve 'END OF INDEX' ile aynı 'şişirilmiş ölçek' ailesinin reviewer'ın atladığı parçası.

**Neden önemli.** Güven/slop sinyali: boş vaat eden navigasyon (tıklayınca aynı içerik) portföy şablonunun içerik olmadan kopyalandığını gösterir. Awwwards jürisi tıklar ve iki saniyede görür.

**Ne yapılmalı.** Bölümü dürüst adlandır: 'Two products we built and run' (cümle vakası); sayacı ve 'VIEW ALL PROJECTS' butonunu kaldır, kartlar doğrudan case study'ye gitsin. Arşiv sayfası iki projeyle kalacaksa 'INDEX/ON FILE' dilini bırakıp ürün odaklı tek sayfaya dönüştür (her proje tam genişlik bir blok + canlı link/mağaza durumu). Üçüncü proje gelene kadar '/case-studies' ana sayfadaki bölümün genişletilmiş hâli olsun, 'daha fazlası var' iması olmasın.

#### `slop-missed-3` — Griye boyanmış "COMING SOON ON APP STORE / GOOGLE PLAY" sahte butonları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/StoreButtons.jsx:22 (role="link" aria-disabled span, Simple Icons marka işaretleri; :1'deki yorum 'swap for official badge artwork once live' diyor); src/lib/stores.js:4-12 (her iki projede appStore/googlePlay boş); messages/en.json:632-633 (DOWNLOAD ON / COMING SOON ON); ekran: case-vocabulary-desktop-fold.png sol alt

**Sorun.** Vocabulary hero'sunda iki soluk mağaza rozeti var, ikisi de hiçbir yere gitmiyor; hover yok, cursor default, ekran okuyucuya 'devre dışı link' diye okunuyor. Resmi badge yerine Simple Icons path'leriyle çizilmiş 'rozet taklidi' olması da mağaza marka kurallarına uymuyor. Site 'yayınlanmış ürün' hikâyesi anlatırken en görünür ürün kanıtı 'henüz yok' diyor.

**Neden önemli.** Slop/güven sinyali: 'coming soon' placeholder butonları yarım kalmış şablon izlenimi verir; sahte testimonial'la yan yana 'olmayan şeyi var gibi gösterme' algısını büyütür. Kullanılabilirlik: tıklanabilir görünen ama tıklanamayan iki eleman.

**Ne yapılmalı.** URL yoksa buton render etme (StoreButtons'ta href boşsa null dön). Yerine tek düz cümle: 'iOS and Android release: late 2026 — hello@alaz.pro for TestFlight access' ya da gerçek bir bekleme listesi linki. Mağazalar açılınca Apple/Google'ın resmi SVG badge'lerini (kendi kurallarındaki minimum boyut ve boşlukla) kullan; Simple Icons taklidi kaldırılsın. Aynı mantık Market Hours için: web linki var, mağaza satırı hiç görünmesin.

### İNCE İŞÇİLİK

#### `slop-19` — Yüzsüz yazar bloğu: "A." kutusu + "The ALAZ Team // ENGINEERING STUDIO"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:108-118; messages/en.json blogPosts[].author; ekran: blogpost-d-author-next.png

**Sorun.** 54px gri kutuda mono 'A.' avatar, 'The ALAZ Team' adı, '// ENGINEERING STUDIO' rolü, ardından tekrar eden stüdyo tanıtımı. Awwwards seviyesindeki stüdyo blogları (Basement, Studio Freight) yazıyı yazan gerçek kişiyi gösterir.

**Neden önemli.** Slop sinyali: anonim 'team' yazarlığı AI-üretimi içerik izlenimi verir (metin aslında iyi olsa bile).

**Ne yapılmalı.** Gerçek yazar adı + küçük gerçek fotoğraf (veya hiç avatar) + tek satır ("Writes the backend and most of these notes."). Stüdyo tanıtım paragrafını sil; CTA zaten altta.

#### `slop-22` — Her elemanda aynı fade-up + varsayılan nprogress top loader

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:94-116 (.reveal-ready [data-reveal] translateY(14px) 0.6s, tüm bölümlerde data-reveal='fade'/'mask'/'line'); src/app/[locale]/layout.jsx:63-74 (NextTopLoader, beyaz 3px bar, 24px glow shadow); src/components/SmoothScroll.jsx (Lenis 1.2s); ekran: probe-reveal-mid-120ms.png, probe-toploader-mid-nav.png

**Sorun.** Hareket dili tek bir fikre indirgenmiş: her başlık, paragraf, kart ve çizgi aynı 14px yukarı kayma + opaklık ile giriyor; 'mask' adı verilen reveal de aslında aynı fade (clip-path yok, globals.css'teki yorum bunu itiraf ediyor). Üstte beyaz parlayan nprogress barı şablon varsayılanı. Sonuç: Lenis'in 'premium' hissi ile 'her şey fade-up' slop'u aynı anda.

**Neden önemli.** Slop sinyali: 'everything fades up on scroll' AI-builder'ın tek animasyonu. Craft: hareketin hiyerarşisi yok; başlık ile hairline aynı ağırlıkta hareket ediyor.

**Ne yapılmalı.** Reveal'i yalnızca H1/H2 (satır bazlı clip-path/overflow:hidden mask, 0.8-1.0s, satır başına 60ms stagger) ve görseller (scale 1.04→1) için bırak; paragraf, çizgi ve kartlar statik gelsin. NextTopLoader'ı kaldır (App Router geçişleri yeterince hızlı) ya da bar yerine View Transitions kullan (bkz. eklemeler). Lenis kalabilir; duration 1.2→0.9.

> **Doğrulayıcı notu:** Reveal CSS'i globals.css:71-100 (94-116 değil): fade translateY(14px) :76-80, 'mask' aslında translateY(.14em)+opacity :84-87 ve :82-83'teki yorum clip-path olmadığını açıkça yazıyor. NextTopLoader layout.jsx:60-71 (beyaz 3px, 24px glow shadow) + globals.css:188-190 ek glow; Lenis duration 1.2 SmoothScroll.jsx:12. Ek: marquee ve ping animasyonları reduced-motion'a saygı göstermiyor (reveal'ler gösteriyor, :93-100). Fix uygun.

#### `slop-23` — Prestij ofis adresleri 'sanal ofis' olarak okunuyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json contact.offices ("1250 Broadway, 36th Floor, New York" ve "Folkart Towers, B Blok, Kat 31, İzmir"); src/components/StructuredData.jsx address[]; footer ve About'ta tekrar; ekran: home-desktop-full.png footer

**Sorun.** İki kişilik bir ekip için Broadway 36. kat ve Folkart Towers 31. kat adresleri, hedef kitledeki (özellikle TR'deki) deneyimli göz tarafından sanal ofis/kiralık adres olarak tanınabilir ve testimonial bölümüyle birleşince 'şişirilmiş ölçek' izlenimini pekiştirir. Bu dimension'ın konusu 'fake-sounding' sinyaller olduğu için not ediyorum; adresler gerçek kullanımdaysa sorun yok.

**Neden önemli.** Güven/marka: gerçek olmayan ölçek sinyalleri, gerçek güçlü yanları (yayınlanmış ürünler) gölgeler.

**Ne yapılmalı.** Sanal ofisse kat/bina bilgisini kaldırıp şehir düzeyinde yaz: "İzmir · New York" + e-posta; StructuredData'da yalnızca addressLocality/addressCountry. Gerçek ofisse olduğu gibi kalsın, hatta bir fotoğrafıyla.

> **Doğrulayıcı notu:** Adresler en.json:374-392, StructuredData.jsx:30-33 ve footer/about render'ı (home-desktop-full.png, about-desktop-full.png) doğrulandı; legal metni de 'offices in the United States and Türkiye' diyor (:810). Ancak 'sanal ofis' iddiası repodan doğrulanamaz, bir hipotez; bulgu yalnızca adresler gerçek kullanımda değilse geçerli. Koşullu olarak kalsın: sahibi adresleri doğrulasın, sanal ofisse şehir düzeyine indirsin.

#### `slop-24` — Kullanılmayan görsel-metin çiftleri ve ölü i18n anahtarları (şablon artıkları)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json: about.imageAlt/imageCaption ("Architectural engineering laboratory…", "FIG. 01…"), about.breakImageAlt/breakImageCaption, about.principles*, about.disciplines*, home.selected.numberSuffix, footer.talk ("HAVE A SYSTEM IN MIND?"); src/app/[locale]/about/page.jsx:62-73 (iki bölüm yorum satırı halinde bırakılmış, principles/disciplinesHeading değişkenleri :30-31'de hâlâ okunuyor)

**Sorun.** JSON'da artık render edilmeyen AI-stok görsel tanımları ('precision-etched circuitry under studio lighting'), FIG. caption'ları ve iki tam bölümün metinleri duruyor; about/page.jsx'te 12 satırlık yorumlanmış JSX var. TR çevirisi de bu ölü anahtarları taşıyor.

**Neden önemli.** Slop sinyali (kaynakta): 'yorumla, silme' AI iterasyon izi. Craft: i18n dosyası sitenin gerçek içeriğini yansıtmıyor, bakım hatası davet ediyor.

**Ne yapılmalı.** Render edilmeyen tüm anahtarları en.json ve tr.json'dan sil; about/page.jsx'teki yorumlu JSX'i ve okunmayan değişkenleri kaldır. `next-intl`'in kullanılmayan anahtarları raporlaması için basit bir script (messages'ı tarayıp src'de t('…') eşleşmesi arayan) ekle.

> **Doğrulayıcı notu:** Ölü anahtarlar doğrulandı: about.imageAlt/imageCaption en.json:517-518, breakImageAlt/Caption :544-545, principles* :519-537, disciplines* :538-543, home.selected.numberSuffix :456 ve footer.talk :395 (grep ile 0 kullanım). Satır düzeltmesi: about/page.jsx'teki yorumlu JSX :63-71 (62-73 ≈ doğru), okunup kullanılmayan değişkenler :24 (services), :27 (disciplinesHeading), :28 (principles) (30-31 değil). media.* (:2-8) de aynı sınıfta. Fix uygun.

#### `slop-missed-4` — "SCROLL TO EXPLORE ↓" scroll ipucu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:54 (a href="#validation" + lucide ArrowDown); messages/en.json:416; ekran: home-desktop-fold.png sol alt, home-desktop-full.png

**Sorun.** Hero'nun alt çubuğunda mono 'SCROLL TO EXPLORE' + aşağı ok, hedefi de sahte testimonial bölümü (#validation). Reviewer'ın 'SYSTEM_ACTIVE' ve 'bottomNote' ile aynı satırda duran bu üçüncü etiketi atlamış; 'scroll to explore/discover' 2023-26 şablon hero'larının standart dolgusu.

**Neden önemli.** Slop sinyali: 'scroll cue' metni AI-builder ve tema hero'larının imzası; hiçbir bilgi taşımıyor, kullanıcı zaten kaydırmayı biliyor. Awwwards sitelerinde scroll ipucu varsa ya tipografik bir fikir ya da ilk içeriğin fold'dan taşmasıyla verilir.

**Ne yapılmalı.** Satırı ve ArrowDown import'unu kaldır (page.jsx:3, :54). Kaydırma daveti gerekiyorsa min-h-dvh hero'yu 90vh'ye indirip ilk gerçek içeriği (ürün kartlarının üst kenarı) fold'da görünür bırak; metin yok, ok yok.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Konsept yönü A — "Alaz kenarı": generatif alev-kenarı shader'ı + tek kor rengi

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Lusion (shader-first hero), Active Theory (tek fikirli WebGL), Unseen Studio (sınırlı accent); teknik: thebookofshaders.com fbm, ogl 'Flowmap' örneği

Sekiz stok videonun yerine tek bir fikir: adın anlamı olan 'ateşin iş yapan parlak kenarı'. Uygulama: tam ekran WebGL2 fragment shader (raw WebGL veya ogl, ~6KB; three.js gerekmez) — simplex/fbm gürültüyle deforme olan tek bir yatay bant; siyah → derin kor (#3A0E00) → turuncu (#FF5A1F) → neredeyse beyaz sıcak çekirdek (#FFE9D6) geçişi, ~1px'lik keskin 'kenar' çizgisi scroll ve pointer hızıyla parlıyor. Hero'da bant başlığın arkasından geçer; sayfa geçişlerinde ekranı 'dağlayarak' siler; proje kapaklarında hover'da hafif ısı distorsiyonu (UV offset, 0.004). Renk sistemi: siyah-beyaz kalır, kor rengi yalnızca 'kenar'larda (hover üst 1px border, ::selection, progress, wordmark noktası). prefers-reduced-motion'da statik SVG gradient fallback. Tipografiye kontrast için insan sesi taşıyan bir ikinci yüz (ör. Instrument Serif italic) yalnızca alıntı ve ara cümlelerde.

### Konsept yönü B — "Demirci tezgâhı": açık/kağıt zemin, teknik çizim dili, gerçek nesneler

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Studio Freight (açık zemin, tipografik), Hello Monday (editoryal fotoğraf), Obys (çizim/annotasyon dili)

Koyu brutalist varsayılanı tamamen terk et: kırık beyaz/kağıt zemin (#F3EFE8), mürekkep siyahı Archivo, ince kırmızı-kahve ölçü çizgileri. Her ürün gerçek cihazda fotoğraflanır (render değil), yanına elle yazılmış gibi annotasyonlar ve ölçü okları (SVG, stroke 1px). Hareket: scroll'da ölçü çizgileri çizilir (stroke-dashoffset), fotoğraflar sabit durur. Bu yön AI stüdyo sitelerinin %95'inin koyu olmasından dolayı anında ayrışır ve 'alaz = metal işleyen alev' hikâyesini atölye estetiğiyle taşır. Dark mode ikincil tema olarak kalabilir.

### Konsept yönü C — "Canlı ürünler": ana sayfa bir demo, iddia değil kanıt

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Basement Studio (kendi araçlarını sergileme), Linear/Vercel ürün siteleri (gerçek veriyle demo), Resn (etkileşimli hero)

Site 'precision' demek yerine onu gösterir: Hero'nun altında Market Hours'un gerçek 'şu an açık' şeridi (NYSE · open · closes in 2h 14m) — veri markethours.live'ın ürettiği JSON endpoint'inden ya da aynı market-rules paketinden edge'de hesaplanır (ISR 60s); Vocabulary'nin günün kelimesi gerçek kaydırılabilir bir kart (pointer events + spring, framer-motion'ı bunun için gerçekten kullan ya da kaldır); blog yazısındaki hız verisi sitenin kendi gerçek Web Vitals'ından (web-vitals kütüphanesi + küçük bir endpoint) beslenir. Marquee, testimonial ve 'system active' etiketlerinin hepsinin yerini bu canlı modüller alır; animasyonun amacı olur.

### Satır bazlı maskeli başlık reveal'i (her şeyde fade-up yerine)

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive (satır maskeleri), Obys

H1/H2 için satırları `overflow:hidden` sarmalayıcılarına böl (SplitType veya CSS ile manuel <span> satırları; next-intl metinleri array olduğundan satırlar zaten belli), her satır translateY(110%)→0, 0.9s, cubic-bezier(.16,1,.3,1), satır başına 70ms stagger; paragraflar ve çizgiler statik. GSAP gerekmez; CSS @keyframes + IntersectionObserver (mevcut ScrollReveal.jsx) yeterli. Görseller için yalnızca scale(1.04→1) 1.2s.

### View Transitions ile sayfa geçişleri: liste → detayda proje adı morf'u

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (Lenis + sayfa geçişleri), Chrome View Transitions dokümanı

Next 15 `experimental.viewTransition` (ya da `next-view-transitions` paketi) ile case-studies listesindeki proje adına ve detay hero'sundaki H1'e aynı `view-transition-name` ver; geçişte ad büyüyerek yerine oturur, arka plan ürün rengine (Vocabulary sarısı) cross-fade olur. NextTopLoader kalkar. Reduced-motion'da anlık geçiş.

### Gerçek görsel üretimi: cihazda ürün fotoğrafları ve ekran kayıtları

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday, Basement (gerçek insan/nesne fotoğrafı)

Stok videoların yerine: iki ürünün gerçek telefonlarda (iPhone + Pixel) stüdyo ışığında çekilmiş fotoğrafları ve 6-8 saniyelik ekran kayıtları (kart kaydırma, alarm kurma, haritada gün/gece çizgisi). Kayıtlar H.265/AV1 + poster, max 800KB, yalnızca viewport'a girince yüklenir (mevcut BackgroundVideo mantığı). Ekip için tek bir gerçek portre/çalışma masası fotoğrafı (About). AI görsel sıfır.

### Dinamik OG görseli (next/og) gerçek wordmark SVG'sinden

- **Etki:** orta · **Efor:** küçük · **Referans:** Vercel OG örnekleri

app/[locale]/opengraph-image.jsx ve blog/[slug]/opengraph-image.jsx: ImageResponse ile brand/logo'daki Archivo Black kullanılarak sayfa başlığı + wordmark + (varsa) ürün kapağı; 1200×630, edge runtime. public/og-image.png silinir; seo.js OG_IMAGE dinamik URL'ye döner.

### 3 glifli özel ikon seti, lucide'ın yerine

- **Etki:** orta · **Efor:** küçük · **Referans:** Unseen Studio, Resn (özel glifler)

Archivo'nun 900 ağırlığına uyacak kalınlıkta elle çizilmiş → (dahili), ↗ (yalnızca harici) ve + / × (aç/kapa) glifleri; tek inline SVG sprite, currentColor. Kural dosyası: kartlarda ikon yok, butonlarda ikon yok, ikon yalnızca harici link ve accordion'da.

### Bağımlılık ve kod temizliği (şablon izlerini sil)

- **Etki:** orta · **Efor:** küçük

src/components/ui, src/hooks, src/contexts, Reveal.jsx, CountUp.jsx, pocketbaseClient.js, components.json'ı sil; package.json'dan 27 @radix-ui + recharts, embla, cmdk, vaul, react-day-picker, sonner, input-otp, react-resizable-panels, date-fns, react-hook-form, zod, @hookform/resolvers, next-themes, cva, tailwindcss-animate, lucide-react, pocketbase, nextjs-toploader'ı çıkar; framer-motion yalnızca Konsept C'deki kart için kalır, yoksa o da gider. tailwind.config.js'yi 5 token + 3 breakpoint'e indir. `npx depcheck` ve `next build` boyut raporuyla doğrula.

### Editoryal ses rehberi ve tüm kopyanın yeniden yazımı

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight ve Hello Monday'in cümle vakası, somut kopyası

Tek sayfalık kurallar: cümle vakası (büyük harf yalnızca proje adlarında), birinci çoğul, her cümlede bir isim/sayı/ürün, yasak kelimeler (intent, endure, precision, uncompromising, permanence, seamless, signal/noise), sahte etiket yok (status, sequence, transmission, index, on file). en.json'daki home/about/archive/caseStudy/intake namespace'leri bu rehberle sıfırdan yazılır; TR çevirisi sonrasında yapılır. originParagraphs'ın sesi referans alınır.
