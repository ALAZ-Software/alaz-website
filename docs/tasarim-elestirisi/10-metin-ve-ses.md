# Metin / içerik sesi (İngilizce)

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 31 (5 kritik · 11 önemli · 15 ince işçilik) · **Korunacaklar:** 8 · **Eklenecekler:** 7

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sitenin metni iki ayrı sesle yazılmış. Gövde metni (servis deliverable listeleri, case study paragrafları, iki blog yazısı, FAQ cevapları, legal/privacy, intake form alanları) somut, dürüst ve gerçek insanlar tarafından yazılmış gibi okunuyor; bu katman tek başına 6-7 puanlık bir seviyede. Ama kullanıcının ilk 3 saniyede gördüğü başlık katmanı (hero, slogan çiftleri, marquee'ler, eyebrow etiketleri, testimonial bloğu, CTA bölümü, intake etiketleri) neredeyse eksiksiz bir "AI-builder brutalist" sözlüğü: SYSTEM_ACTIVE, NO BULLSHIT. JUST ACTION., Built with intent. Engineered to last., COMMAND SEQUENCE READY, START SEQUENCE, SECURE TRANSMISSION, UNCOMPROMISING PRECISION, VALIDATION + isimsiz testimonial'lar, POWERED BY GOOGLE / CLAUDE. En büyük yapısal sorun, metnin "precision / permanence / intent / systems" soyutlamalarıyla kendine bir itibar inşa etmeye çalışması, oysa sitenin elindeki gerçek malzeme (EST. 2026, iki tane kendi ürünü, markethours.live canlı, 24 dil, 9 borsa, 1 iş günü içinde cevap) çok daha inandırıcı ve Awwwards jürisinin de aradığı "gerçek bir fikir" bu. Yapılacak iş ağırlıklı olarak silmek ve blog yazılarındaki sesi (We optimize for month eighteen. / Boring technology, on purpose. / Not a 40-page proposal.) sitenin geneline taşımak.

## Korunması gerekenler

- ALAZ etimolojisi (en.json:510-515, about-desktop-full.png): "the working flame, not the first spark or the dying ember" sitenin tek gerçek, sahiplenilebilir fikri. Marka sesinin omurgası bu olmalı; hero'ya taşınmayı hak ediyor.
- Case study gövde metinleri (en.json:53-56, 74-77): RevenueCat, JetBrains Mono, 1/2/4/7/15/30 günlük tekrar takvimi, borsaların kendi saat diliminde saklanması, dokuz borsa, "Live on the web, coming soon as a mobile app" dürüstlüğü. Somut, doğrulanabilir, abartısız. Aynen kalsın.
- Blog yazıları (en.json:102, 118): İlk yazı kaynaklı sayılarla (Deloitte 8.4%, Portent 3x, INP ≤ 200ms) yazılmış; ikinci yazı sitenin en iyi ses örneği: "We optimize for month eighteen.", "Boring technology, on purpose.", "Not a 40-page proposal.", "You own everything.", "Every message is read by an engineer." Bu sesi sitenin başlık katmanına taşıyın.
- Services deliverable listeleri ve 01-02 maddelerinin whatItIs paragrafları (en.json:180-222): "old phones, weak signal, aggressive battery savers and two app stores with their own rules", "Native modules for camera, Bluetooth, payments, maps". Satın alan kişi tam olarak ne alacağını görüyor.
- FAQ cevapları 2-8 (en.json:342-368): 4-8 hafta / 2-4 ay gibi gerçek süreler, stack listesi, kaynak kod sahipliği, "we reply within one business day". Düz, net, insan.
- Intake formu alan metinleri (en.json:705-783): gerçek bütçe aralıkları (Under $25k … $100k+), "Something Else — Audit, rescue or custom", "A working title is fine", "WHO'S ON THE OTHER END?". Kullanıcıya saygılı ve samimi.
- Legal ve privacy metinleri (en.json:797-890): "Please don't scrape it at scale, probe it for weaknesses without asking us first", "We don't knowingly collect data from anyone under 16", "a small software engineering studio". Sitede gerçek bir insanın yazdığı en net yer; aynı ses hero'da da olmalı.
- "holds up" ifadesi (en.json:515, 647, 118, 665): "hold up under real users and real traffic", "software that holds up long after launch day", "Let's build something that holds up." Precision/permanence/intent yerine markanın anahtar fiili bu olmalı: sade, İngilizce konuşan bir mühendisin gerçekten söyleyeceği şey.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `copy-01` — Hero metin katmanı baştan sona template-brutalist sözlüğü

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:410-418 (hero.status, toplineRight, kicker, taglineTop/Bottom, intro, scrollCta, bottomNote); src/app/[locale]/page.jsx:42,45,48-49,54; ayrıca hardcoded "— 001 / 005" (page.jsx:45) ve "01 / 05" (page.jsx:54); screenshot: home-desktop-fold.png

**Sorun.** Hero'da görünen her satır AI-builder sitelerinin en çok kopyalanan kalıpları: "SYSTEM_ACTIVE" (kare nokta ile), "SOFTWARE STUDIO / EST. 2026", "WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO — 001 / 005", "NO BULLSHIT. JUST ACTION.", "Built with intent. Engineered to last.", "SCROLL TO EXPLORE", "PRECISION IS THE STANDARD. NOT THE GOAL." Sayfadaki tek gerçek bilgi 13px gri paragraftaki "We design and build web apps, mobile apps and the systems behind them." cümlesi. "NO BULLSHIT. JUST ACTION." bir B2B alıcının (kendi blog yazınızdaki "CTO evaluating your platform") ilk saniyede gördüğü küfür; üstelik slogan tam da iddia ettiği şeyin kendisi, çünkü hiçbir doğrulanabilir içerik taşımıyor. "PRECISION IS THE STANDARD. NOT THE GOAL." anlam taşımayan bir kiazmus.

**Neden önemli.** Hero, Awwwards jürisinin ve müşterinin ilk 3 saniyesi. Bu satırlar kimin yazdığını değil hangi aracın ürettiğini söylüyor; stüdyonun bir fikri olduğunu değil, bir şablonu olduğunu gösteriyor. Sayfada başka hiçbir şeyi değiştirmeseniz bile bu blok sitenin tamamının slop olarak etiketlenmesine yetiyor.

**Ne yapılmalı.** Hero'yu gerçek olgularla yeniden yaz; hiçbir soyut sıfat kalmasın. Öneri: status satırını kaldır (ya da gerçek bir bilgiyle değiştir: "İZMİR 14:32 · NEW YORK 07:32" veya "TAKING ONE NEW PROJECT FOR Q1 2027"); toplineRight: "SOFTWARE STUDIO — İZMİR / NEW YORK"; kicker: "WEB · MOBILE · BACKEND" ("— 001 / 005" sil); tagline çifti yerine launch blog yazısından alınan tek bir cümle: "We optimize for month eighteen." (alternatif: "Software that still works in month eighteen."); intro: "ALAZ builds web apps, mobile apps and the APIs under them. Two products of our own are live; the next one could be yours."; scrollCta ve bottomNote sil (Awwwards seviyesindeki siteler "scroll to explore" yazmaz, kaydırmayı tasarım söyler). Kural: hero'daki her cümlede bir özel isim, sayı veya araç adı olsun.

#### `copy-02` — "POWERED BY GOOGLE / POWERED BY CLAUDE" rozetleri

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:418 (hero.poweredBy); src/components/PoweredBy.jsx:82-97; src/app/[locale]/page.jsx:51; src/app/[locale]/about/page.jsx:45; screenshots: home-desktop-fold.png (sol alt), about-desktop-full.png (hero altı)

**Sorun.** Bir yazılım stüdyosunun hero'sunda arama motoru ve LLM logosu ile "POWERED BY" yazmak, müşteriye tek bir şey söylüyor: "Bu site ve muhtemelen yazdığımız kod AI tarafından üretildi." Neyin "powered" olduğu da belirsiz (site mi, ekip mi, ürünler mi?). Brief'te açıkça slop sinyali olarak sayılan kalıp bu.

**Neden önemli.** Yazılım satan bir ekip için güvenilirliği doğrudan düşüren tek satır. Awwwards jürisi için de "AI-made" damgası.

**Ne yapılmalı.** PoweredBy bileşenini ve her iki sayfadaki kullanımını tamamen kaldır. Araçlara teşekkür edilecekse footer'a bir colophon satırı ekle: "Built with Next.js. Set in Archivo, Inter and JetBrains Mono." Araçlar hero alanı hak etmez.

> **Doğrulayıcı notu:** İçerik doğru, satır referansı yanlış: src/components/PoweredBy.jsx 20 satırlık bir dosya; PARTNERS (Google, Claude) 4-7, bileşen 9-20. Kullanım yerleri doğru: page.jsx:51 ve about/page.jsx:45; etiket en.json:418. home-desktop-fold.png sol altta ve about-desktop-full.png hero altında görünüyor. Colophon önerisindeki font listesi layout.jsx:15-17 ile uyuşuyor (Archivo, Inter, JetBrains Mono). Kaldırma önerisi doğru.

#### `copy-03` — Uydurma okunan testimonial bloğu (VALIDATION)

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** messages/en.json:424-431 (validation.*), 471-493 (testimonials); src/app/[locale]/page.jsx:76-90 (ShieldCheck ikon 78, "// role" 86); screenshot: home-desktop-full.png, VALIDATION bölümü

**Sorun.** "MERVE T. // PROJECT MANAGER", "BURAK Y. // PRODUCT OWNER", "SELIN A. // E-COMMERCE DIRECTOR": şirket yok, proje yok, link yok, soyadı yok. Üç alıntı da aynı şablonda (soyut övgü + sıfır sayı): "brought order to a system that had become impossible to reason about", "Every technical decision had a reason behind it", "We needed more than a polished interface". Üstlerinde "ARCHITECTURE / EXECUTION / RELIABILITY" odak etiketleri, "01 / EXTERNAL SIGNAL", "TESTIMONIALS // 03", ShieldCheck ikonu ve lead cümlesi "The strongest systems earn their reputation in production." Ama sitenin kendisi EST. 2026 diyor, launch yazısı 13 Şubat 2026 tarihli ve iki case study de ALAZ'ın kendi ürünü; testimonial'ların bahsettiği müşteri işleri sitede hiçbir yerde yok. Deneyimli bir alıcı bunu anında görür.

**Neden önemli.** Sahte okunan sosyal kanıt, hiç olmamasından çok daha zararlı: gerçek olan her şeyi (markethours.live, blog yazıları) de şüpheli hale getiriyor. Brief'te özellikle adı geçen slop kalıbı.

**Ne yapılmalı.** Bölümü tamamen kaldır; en az bir tam isim + şirket + canlı ürün linki olan müşteri gelene kadar geri koyma. Yerine elinizdeki gerçek kanıtı koy, örnek bölüm: eyebrow "WHAT'S LIVE", başlık "TWO PRODUCTS. BOTH OURS.", satırlar: "markethours.live — nine exchanges, four forex sessions, live day/night map" (link), "Vocabulary — 8,000 words, 24 languages, 17 games" (store linki açılınca), "We built them the way we'd build yours." Gerçek testimonial gelince format: tam isim, unvan, şirket, logo, ürüne link ve somut bir cümle ("cold start 4.1s'den 1.2s'ye indi" gibi). Proje başına en fazla bir alıntı.

#### `copy-04` — İki buzzword marquee'si

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** messages/en.json:420-423 (signal.a/b), 432-437 (ticker); src/app/[locale]/page.jsx:59-74 ve 107-126; screenshot: home-desktop-full.png (hero altı ve CORE CAPABILITIES altı)

**Sorun.** "ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE" ve "TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS ✳ ARCHITECTURAL INTEGRITY ✳ UNCOMPROMISING PRECISION". Dört soyut isim tamlaması, sıfır olgu; "client success" dediğiniz şey sitede bir tane bile müşteri olmadan dönüyor.

**Neden önemli.** Brief'teki "marquees of buzzwords" maddesinin birebir örneği. Marquee hareketi dikkat çekiyor; çektiği dikkat boş kelimelere gidiyor.

**Ne yapılmalı.** İkisini de sil. Bir marquee kalacaksa içini olgularla doldur: "MARKETHOURS.LIVE — 9 EXCHANGES ✳ VOCABULARY — 24 LANGUAGES ✳ REPLY WITHIN ONE BUSINESS DAY ✳ İZMİR · NEW YORK". Hareket eden şey veri olmalı, sıfat değil.

#### `copy-05` — "START SEQUENCE" CTA bölümü: komuta merkezi cosplay'i

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:458-469 (start.*); src/app/[locale]/page.jsx:188-206 (badge 190, paragraph 192, buton 193-204 — yeşil ping 198-201, köşe braketleri 194-197, bottomNote + "05 / 05" 206); screenshot: home-desktop-full.png, START PROJECT bölümü

**Sorun.** "04 / INITIATE", "READY WHEN YOU ARE", kare noktalı "COMMAND SEQUENCE READY" rozeti, "The next great system starts with a conversation.", yanıp sönen yeşil noktalı "START SEQUENCE" butonu, altında "DESIGNED WITH INTENT / BUILT TO ENDURE". Brief'teki slop listesinin beş maddesi tek bölümde. Sayfanın en önemli dönüşüm noktası, bir uzay gemisi fırlatma paneli gibi konuşuyor; müşterinin yapacağı şey ise bir form doldurmak.

**Neden önemli.** CTA metni, kullanıcının ne olacağını anlamasını sağlamalı ("form doldur, bir iş günü içinde mühendis cevap verir"). Sci-fi sözlüğü bunu gizliyor ve ciddiyeti düşürüyor.

**Ne yapılmalı.** eyebrowLeft: "CONTACT"; eyebrowRight: "WE REPLY WITHIN ONE BUSINESS DAY"; badge: sil; heading: "START A PROJECT." (ya da daha insanca: "GOT A BRIEF?"); paragraph: "Send a short note about what you're building, or what keeps breaking. An engineer reads it and replies within one business day."; button: "Send a brief" (yeşil ping ve köşe braketleri gitsin); bottomNote: sil ya da "hello@alaz.pro". "05 / 05" sayacını kaldır (bkz. copy-14).

### ÖNEMLİ

#### `copy-06` — Intake formundaki "SECURE TRANSMISSION" sözlüğü

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:676-678 (sectionTopLeft/Right, completeEyebrow), 683 (completeMessageTemplate), 698 (asideStatus), 790 (submitErrorFallback), 794 (submittingCta); src/components/IntakeForm.jsx:120,142,123-125,211 (CirclePower ikonu); screenshot: start-project-desktop-full.png

**Sorun.** "PROJECT INTAKE / SECURE TRANSMISSION", "ALAZ / NEW ENGAGEMENT", kare noktalı "STATUS: ACCEPTING NEW INQUIRIES", "TRANSMITTING...", "The transmission could not be completed.", "Your project inquiry is safely in our queue.", "PROJECT INQUIRY RECEIVED / 001", submit butonunda güç düğmesi ikonu. "SECURE TRANSMISSION" ayrıca yanlış bir güvenlik iddiası: bu sıradan bir HTTPS POST. "safely in our queue" soğuk ve bürokratik; FAQ'de verdiğiniz "one business day" sözü ise burada yok.

**Neden önemli.** Form, sitenin en çok insan sıcaklığı gerektiren yeri. Askeri/telsiz jargonu güven yerine mesafe yaratıyor; FAQ ile tutarsızlık da ses birliğini bozuyor.

**Ne yapılmalı.** sectionTopLeft: "PROJECT BRIEF"; sectionTopRight: "THREE STEPS, ABOUT FOUR MINUTES"; asideStatus: sil ya da gerçek bir durum: "Taking new projects from January 2027"; submittingCta: "Sending…"; submitErrorFallback: "That didn't send. Try again, or email hello@alaz.pro."; completeEyebrow: "BRIEF RECEIVED"; completeMessageTemplate: "Thanks, {name}. We read every brief ourselves and will reply to {email} within one business day."; CirclePower ikonunu kaldır. Formun geri kalanı ("WHAT ARE WE BUILDING?", "WHO'S ON THE OTHER END?", "A working title is fine") iyi, dokunma.

> **Doğrulayıcı notu:** en.json referansları doğru (676-678, 683, 698, 790, 794). IntakeForm.jsx satırları yanlış: sectionTopLeft/Right 98; completeEyebrow/completeMessage 101-103; asideStatus 120; CirclePower ikonu ve TRANSMITTING... 189 (211 değil). start-project-desktop-full.png "PROJECT INTAKE / SECURE TRANSMISSION", "ALAZ / NEW ENGAGEMENT", "STATUS: ACCEPTING NEW INQUIRIES" gösteriyor. "one business day" sadece intake.meta.description'da (674) var, sayfada yok; iddia doğru. Eksik: "Formun geri kalanı iyi, dokunma" denmiş ama headingEyebrow "LET'S BUILD SOMETHING THAT LASTS" (685) sayfanın ilk satırı ve aynı permanence klişesi; formNotation "ALAZ / 2026" (795) dekoratif dolgu. İkisi de bu bulguya eklenmeli.

#### `copy-07` — About hero: olmayan bir manifesto vaat ediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:495-507 (about.meta.title/description, eyebrowRight "OUR OPERATING PRINCIPLES", kicker, heading, introText, introNote "ALAZ / MANIFESTO 2026"); src/app/[locale]/about/page.jsx:41-44; principles bölümü yorum satırında: about/page.jsx:63-66; screenshot: about-desktop-full.png

**Sorun.** Meta title "About ALAZ — The Engineering Manifesto", meta description "Data over dogma, brutal efficiency, software built to last", eyebrow "OUR OPERATING PRINCIPLES", introNote "ALAZ / MANIFESTO 2026" diyor; ama principles bölümü kodda yorum satırına alınmış, sayfada manifesto yok. Başlık "WE ENGINEER PERMANENCE." sekiz aylık bir stüdyonun kanıtlayamayacağı bir iddia ve yazılım için yanlış bir metafor (yazılım kalıcı olmaz, bakılır). "NOT AN AGENCY. AN ENGINEERING PRACTICE." ve "simple enough to trust, strong enough to endure" aynı soyut-tricolon kalıbı.

**Neden önemli.** Google snippet'ı sayfada olmayan bir şey vaat ediyor (SEO + güven). Sayfanın en iyi malzemesi (ALAZ etimolojisi) ikinci sırada, en zayıf malzemesi (permanence sloganı) hero'da.

**Ne yapılmalı.** Etimolojiyi hero yap. kicker: "ABOUT"; heading: "THE WORKING FLAME." (ya da sadece "ALAZ." ve tanım intro olarak); introText: "Alaz is the old Turkish word for the part of a fire that does the work. We're a small software studio in İzmir and New York, building web and mobile products that hold up after launch."; introNote: sil. meta.title: "About ALAZ — a small software studio in İzmir and New York"; meta.description: gerçek olgular ("Founded 2026. Two products live. One team for web, mobile and backend."). "Manifesto" kelimesini bir manifesto yayınlamadığınız sürece siteden çıkar.

#### `copy-09` — Üç farklı "how we work" süreci, üç farklı sözlük; en zayıfı services sayfasında

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** About: messages/en.json:546-573 (FOUR MOVES ZERO GUESSWORK; DISCOVER/ARCHITECT/ENGINEER/HARDEN), about/page.jsx:73-75. Services: en.json:302-329 (HOW WE OPERATE; Deep Discovery / System Blueprint / Iterative Execution / Production & Handover), services/page.jsx:199-217. Blog launch yazısı: en.json:118 ("What working with us looks like"). Screenshots: about-desktop-full.png, services-desktop-full.png

**Sorun.** Aynı süreç üç yerde üç farklı isimle anlatılıyor. Services versiyonu danışmanlık dolgusu: "No ambiguous specs.", "comprehensive documentation", "observability configs", "We ensure your team can operate the system with complete confidence." About versiyonunda "HARDEN" sec-ops jargonu, "Shipping is the halfway point, not the finish line" klişe, "Once the architecture holds up, writing the code is the easy part" mühendislerin inanmayacağı bir iddia. Blog versiyonu ise en iyisi: süre (30-45 dk), artefakt ("Not a 40-page proposal", "a staging link for web, a TestFlight build for mobile") ve ritim ("every week or two") var.

**Neden önemli.** Tutarsız süreç isimleri "gerçek bir süreç yok, metin üretildi" sinyali verir. Somut sürüm zaten elinizde; soyut sürümler onu gölgeliyor.

**Ne yapılmalı.** Tek süreç, tek sözlük, site genelinde. Blog versiyonunu kaynak al: 01 CALL — "30 to 45 minutes: what you're building, who it's for, what it costs if it fails." 02 SCOPE — "A two-page document: what we build, what we leave out, phases, timeline, price. Not a 40-page proposal." 03 BUILD — "A staging link or TestFlight build every one to two weeks. Progress you can click, not slides." 04 LAUNCH — "Zero-downtime release, monitoring, a walkthrough for your team. The repo and the cloud account are yours." Başlık: "HOW A PROJECT RUNS." About'ta bu bölümü tekrar etme; linkle.

#### `copy-10` — Kesik-cümle slogan ritmi (tricolon / staccato) site genelinde LLM parmak izi

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:415 "Built with intent. Engineered to last."; 589 "Technical challenges. Considered solutions. Systems engineered for what comes next."; 574-575 "GOOD SYSTEMS ARE INVISIBLE. THE IMPACT ISN'T." (about/page.jsx:80 ve services/page.jsx:254-256'da aynı kapanış); 622-623 "LESS NOISE. MORE SIGNAL."; 520 "THREE PRINCIPLES / ONE STANDARD"; 547 "ONE PROCESS / EVERY PROJECT"; 549-550 "FOUR MOVES ZERO GUESSWORK"; 697 "No generic sales pitch. No unnecessary calls."; 501 "NOT AN AGENCY. AN ENGINEERING PRACTICE."; screenshots: about-desktop-full.png, services-desktop-full.png, case-studies-desktop-full.png

**Sorun.** İki-üç kelimelik, noktayla kesilmiş, birbirine zıt kurulan cümle çiftleri sitenin her sayfasında en az bir, çoğunda üç kez. Bu kadans artık okuyucunun bir saniyede tanıdığı üretilmiş-metin ritmi; cümlelerin hiçbirinde bir olgu yok. Aynı kapanış sloganı ("GOOD SYSTEMS ARE INVISIBLE...") hem about hem services sayfasını bitiriyor.

**Neden önemli.** Slop sinyali tek tek kelimelerde değil ritimde de yaşıyor. Awwwards seviyesindeki stüdyo metinleri (Basement, Studio Freight, Locomotive) kısa ama somut ve kişisel; kesik slogan zinciri değil.

**Ne yapılmalı.** Kural: sayfa başına en fazla bir slogan-cümle; diğer her cümlede özel isim, sayı veya araç adı olsun. Örnek yeniden yazımlar: archive introText → "Two products so far, both ours: a vocabulary app in 24 languages and a market-hours dashboard covering nine exchanges."; about/services kapanışı → "Tell us what you're building. An engineer replies within a business day." + hello@alaz.pro; hero intro → copy-01'deki metin; intake asideParagraph → "We ask only what we need to give you a real estimate. No sales call unless you want one."

> **Doğrulayıcı notu:** Kalıp gerçek ve alıntılar doğru (415, 589, 574-575 + about/page.jsx:80 ve services/page.jsx:254-256 aynı kapanış, 622-623, 547, 549-550, 697, 501). Düzeltme: 520 ("THREE PRINCIPLES / ONE STANDARD") yorum satırındaki kodda, render edilmiyor; listeden çıkar. Severity: hero ve CTA örnekleri zaten copy-01/05'te critical; burada kalan görünür örnekler (archive intro, about/services kapanışı, case study başlıkları) "açıkça çıtanın altı" seviyesinde, major. Ayrıca reviewer'ın copy-11'deki kendi önerileri ("LIVE ON THE WEB. STORES NEXT.") aynı ritmi kullanıyor; kural "slogan yasak" değil "olgu taşımayan slogan yasak" olarak yazılmalı.

#### `copy-11` — Case study bölüm başlıkları her projede aynı ve projeyle ilgisiz

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:610-624 (caseStudy.challengeHeading "BUILD FOR WHAT'S NEXT.", approachHeading "PRECISION AT EVERY LAYER.", outcomeHeading "LESS NOISE. MORE SIGNAL."); src/app/[locale]/case-studies/[slug]/page.jsx:164-186; screenshot: case-market-hours-desktop-full.png

**Sorun.** Vocabulary ve Market Hours sayfalarında 80px'lik başlıklar birebir aynı üç slogan; projeye dair hiçbir şey söylemiyor. Asıl iyi yazılmış içerik (RevenueCat, JetBrains Mono, DST, dokuz borsa, 1/2/4/7/15/30 günlük tekrar takvimi) ise 16-22px gri paragraf. Tipografi hiyerarşisi boş olanı büyütüyor, dolu olanı küçültüyor.

**Neden önemli.** Case study, stüdyonun gerçek işini gösterebildiği tek yer; jenerik başlıklar onu da şablona çeviriyor.

**Ne yapılmalı.** Başlıkları proje nesnesine taşı (projects[i].challengeHeading / approachHeading / outcomeHeading) ve her projeye özel yaz. Market Hours: "NINE EXCHANGES, ONE CLOCK." / "THE RULES, BUILT TWICE ON PURPOSE." / "LIVE ON THE WEB. STORES NEXT." Vocabulary: "8,000 WORDS, A FEW MINUTES A DAY." / "ONE FLUTTER CODEBASE, EVERY WORD SPOKEN." / "17 GAMES, 24 LANGUAGES, FREE TO START." Eyebrow etiketleri ("01 / THE CHALLENGE") kalabilir.

> **Doğrulayıcı notu:** İçerik doğru, satır referansı yanlış: başlıklar src/app/[locale]/case-studies/[slug]/page.jsx:112, 120, 128 (bölümler 109-131), 164-186 değil. en.json:610-624 doğrulandı. Boyut iddiası doğru: başlık [--fit-size:clamp(38px,5vw,80px)], gövde clamp(16px,1.6vw,22px) text-mute. case-market-hours-desktop-full.png'de BUILD FOR WHAT'S NEXT. / PRECISION AT EVERY LAYER. / LESS NOISE. MORE SIGNAL. görünüyor ve projeyle ilgisiz. Başlıkları projects[i] nesnesine taşıma önerisi doğru; önerilen metinler approach/outcome paragraflarındaki gerçek olgularla ("built twice", "live at markethours.live") uyuşuyor.

#### `copy-12` — İki projeyle "ARCHIVE / INDEX / ON FILE / SELECTED" dili

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:583-598 (archive: "INDEX / 001", "ARCHIVE / SELECTED WORK", "AN INDEX OF WHAT WE BUILD", "PROJECTS ON FILE / {count}", "END OF INDEX", "MORE SYSTEMS IN DEVELOPMENT"); 447-457 (home selected: "03 / THE OUTPUT", "SELECTED PROJECTS // {count}", "SELECTED WORKS", "VIEW ALL PROJECTS"); src/app/[locale]/case-studies/page.jsx:34-49; src/app/[locale]/page.jsx:130-141; screenshots: case-studies-desktop-full.png, home-desktop-full.png

**Sorun.** Arşiv/indeks/dosya sözlüğü büyük bir iş gövdesi ima ediyor; listede iki öğe var ve "VIEW ALL PROJECTS" aynı iki öğeye gidiyor. "SELECTED" (neyin arasından seçildi?), "THE OUTPUT", "MORE SYSTEMS IN DEVELOPMENT" boş vaat. Kelime ile gerçeklik arasındaki bu açık, başlı başına bir slop sinyali.

**Neden önemli.** Awwwards jürisi ve müşteri ikisini de sayabilir. Azlığı saklamaya çalışmak, azlığı sahiplenmekten daha zayıf görünür.

**Ne yapılmalı.** Azı sahiplen. Archive: kicker "TWO PRODUCTS, BOTH OURS"; heading "THE WORK." kalabilir; introText copy-10'daki olgu cümlesi; introNote sil; noteLeft/Right → "THAT'S EVERYTHING, FOR NOW" / "NEXT UP: (gerçekten üzerinde çalışılan şey)" ya da ikisini de sil. Home: heading "WORK."; eyebrow "TWO OF OUR OWN"; alt cümle: "We build products between client projects. These are live."; "VIEW ALL" butonunu üçten az öğe varken gösterme.

> **Doğrulayıcı notu:** Sözlük doğrulandı: en.json:583-598 (INDEX / 001, ARCHIVE / SELECTED WORK, AN INDEX OF WHAT WE BUILD, PROJECTS ON FILE / 02, END OF INDEX, MORE SYSTEMS IN DEVELOPMENT), 447-457 (03 / THE OUTPUT, SELECTED WORKS, VIEW ALL PROJECTS); case-studies-desktop-full.png iki satırlık listeyi gösteriyor. Düzeltilmesi gereken: önerilen home alt cümlesi "These are live." yanlış olur; Vocabulary'nin store linkleri boş (src/lib/stores.js:5-8), case study sayfasında "COMING SOON ON APP STORE / GOOGLE PLAY" görünüyor. Sadece Market Hours web'de canlı. Doğru cümle: "One is live on the web; the other is heading to the stores." Geri kalan öneri (azı sahiplen, VIEW ALL'u 3'ten az öğede gizle) doğru.

#### `copy-13` — "Most agencies…" strawman'ı ve dört kez tekrarlanan "seams" argümanı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:339 (FAQ 1: "Most agencies sell design presentations and outsource implementation to junior subcontractors", "nothing gets lost in translation"); 556 (about processSteps[0]: "the questions most agencies skip"); 165 (services overviewText); 118 (blog launch yazısı); screenshot: services-desktop-full.png FAQ bölümü

**Sorun.** Rakibi küçümseyerek kendini tanımlama ("junior subcontractors") hem klişe hem de saldırgan; "lost in translation" idiyomu dolgu. "Web ekibi + mobil freelancer + backend vendor arasındaki dikişlerde bug yaşar" argümanı aslında iyi bir konumlandırma, ama dört ayrı yerde tekrar edince mantra gibi okunuyor.

**Neden önemli.** Strawman, güvensiz markaların refleksi; Awwwards seviyesindeki stüdyolar rakipten bahsetmez, kendi işini gösterir.

**Ne yapılmalı.** Seams argümanını bir kez tut (services overviewText versiyonu iyi). FAQ 1'i yeniden yaz: "ALAZ is a small team of engineers. The person on your first call is the person who writes your code and sets up your backend; there is no account layer in between. If you already have a design agency, we're happy to work alongside them." About processSteps[0]'daki "most agencies skip" ifadesini sil: "We start with two questions: who is actually going to use this, and what does it cost the business if it fails."

> **Doğrulayıcı notu:** Strawman doğrulandı: 339 ("junior subcontractors", "lost in translation"), 556 ("questions most agencies skip"). Sayım düzeltmesi: "seams" kelimesi tam olarak iki yerde (118, 165); dört-altı kez tekrarlanan şey "tek ekip vs. web ajansı + mobil freelancer + backend vendor" argümanı (109, 118, 135, 156, 165, 407). Ek: FAQ sorusunun kendisi ("How is ALAZ different from a traditional digital agency?") kıyası başlatıyor; soru da yeniden yazılmalı, örn. "Who will I actually be working with?". FAQ <details> içinde kapalı ama FaqJsonLd (services/page.jsx:57) ile Google rich result'a da gidiyor, yani görünürlüğü sanıldığından yüksek.

#### `copy-14` — Dekoratif ve hatalı bölüm numaralandırması

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** Home: hardcoded "— 001 / 005" (src/app/[locale]/page.jsx:45) ve "01 / 05" (page.jsx:54) hero için; sonra validation "01 / EXTERNAL SIGNAL" (en.json:425) yine 01; start "04 / INITIATE" (459) ama bölüm altı "05 / 05" (page.jsx:206). About: "01 / THE NAME" (508) → "04 / HOW WE OPERATE" (546), 02-03 yorum satırında. Sayfa hero'larında üç haneli "SERVICES / 001", "STUDIO / 001", "INDEX / 001", "BLOG / 001" (149, 499, 583, 640); bölümlerde iki haneli; "TESTIMONIALS // 03", "SELECTED PROJECTS // 02" çift slash varyantı. Screenshots: home-desktop-full.png, about-desktop-full.png

**Sorun.** Numaralar hiçbir gerçek sırayı takip etmiyor: ana sayfada iki tane 01 var, 05 numaralı bölüm yok ama "05 / 05" yazıyor; about sayfası 01'den 04'e atlıyor. Format da tutarsız (001 / 01 / // 03). Brief'te "01 / 05 index eyebrows on every section" olarak adı geçen kalıp.

**Neden önemli.** Numaralandırma bir craft sinyali olarak kullanılıyor ama hatalı olunca tam tersini söylüyor: "kimse bunu okumadı".

**Ne yapılmalı.** Tercihen tüm sayfa/bölüm sayaçlarını kaldır ("/ 001", "01 / 05", "// 03"); eyebrow'lara sadece kısa etiket bırak: "WORK", "SERVICES", "CONTACT". Numaralar kalacaksa tek bir bölüm listesinden hesapla (sections.map ile index) ki hiçbir zaman elle yazılmış bir "05 / 05" olmasın.

#### `copy-18` — Mutlak vaatler ve belirsiz AI satırı servis maddelerinde

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:170 (itemLabels.outcome "REAL-WORLD OUTCOME"), 186 ("zero vendor lock-in"), 236 ("Secure LLM and generative AI API implementations"), 247 ("zero data loss"), 255 ("Fault-tolerant cloud setups"), 273 ("Predictable server costs"), 298 ("measurable conversion gains"); src/app/[locale]/services/page.jsx:181-188; screenshot: services-desktop-full.png

**Sorun.** "zero data loss", "zero lock-in", "predictable costs", "measurable conversion gains" doğrulanamaz mutlak iddialar; hem sözleşme riski hem de jenerik ajans dili. "Secure LLM and generative AI API implementations" ne yapıldığını söylemiyor; bugünün en çok kopyalanan deliverable satırı. Maddeler 01-02'nin somutluğu (eski telefonlar, zayıf sinyal, pil tasarrufu, iki mağaza) 03-05'te kayboluyor.

**Neden önemli.** Somut mekanizma güven verir, mutlak vaat şüphe uyandırır.

**Ne yapılmalı.** Etiket: "OUTCOME" → "WHAT YOU GET". Mutlakları mekanizmayla değiştir: "Idempotent webhooks and replayable queues, so a failed sync is retried, not lost."; "Deploys that take minutes and roll back in one command."; "A Lighthouse report before and after, so the gain is on paper." LLM satırını ya sil ya somutlaştır: "LLM features with logged prompts, per-user cost caps and PII redaction before anything leaves your servers."

#### `copy-20` — Blog'da insan yok: "The ALAZ Team // ENGINEERING STUDIO" ve beş kez "FIELD NOTES"

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:98-101, 114-117 (author.name/role), 641, 652, 658, 661, 664 ("FIELD NOTES FROM THE STUDIO", "MORE FIELD NOTES INCOMING.", "← ALL FIELD NOTES", "ALAZ / FIELD NOTES", "NEXT FIELD NOTE"); src/app/[locale]/blog/[slug]/page.jsx:185-194 ("A." avatar kutusu); screenshot: blog-desktop-full.png

**Sorun.** İki yazı da gerçekten iyi, ama imza "The ALAZ Team" ve avatar "A." harfi; kimse yazmamış gibi. "Field notes" ajans-blog klişesi, iki yazıyla "MORE FIELD NOTES INCOMING" boş vaat.

**Neden önemli.** Awwwards seviyesindeki stüdyoların yazıları isimli insanlardan gelir; isimsiz ekip imzası LLM içeriği hissi verir.

**Ne yapılmalı.** Byline'ı gerçek kişiye ver: isim + rol + konum ("Kahraman — engineer, İzmir"); avatar yerine gerçek fotoğraf ya da hiç avatar. "FIELD NOTES" yerine düz "BLOG" / "WRITING"; noteLeft → sil ya da gerçek bir sonraki yazının başlığı.

> **Doğrulayıcı notu:** İçerik doğru, satırlar yanlış: "A." avatar kutusu ve byline src/app/[locale]/blog/[slug]/page.jsx:108-119 (185-194 değil). "Field notes" 5 değil 7 yerde (641, 652, 658, 661, 664 + meta description 638 + seo keyword 937). Ek kanıt: BlogPosting.author Organization olarak yazılmış (page.jsx:70) ve OG authors ['ALAZ'] (34); şema da "insan yok" diyor. Severity major'a çıkarıldı: isimsiz "The ALAZ Team" + "A." kutusu, sitenin gerçekten iyi yazılmış tek bölümüne LLM-içerik damgası vuruyor; "field notes" kelimesi tek başına minor olurdu.

#### `copy-missed-1` — Hizmet taksonomisi üç yerde üç farklı liste ve isim

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:9-30 (home `services`: WEB APPLICATIONS / MOBILE APPS / SYSTEMS & BACKEND, 3 madde), 173-300 (`servicesPage.items`: WEB APPLICATIONS & SAAS / MOBILE APPLICATIONS / BACKEND, APIs & INTEGRATIONS / CLOUD INFRASTRUCTURE & DEVOPS / PERFORMANCE & MODERNIZATION, 5 madde), 710-727 (`intake.types`: Web App / Mobile App / Systems & Backend / Something Else, 4 madde); screenshots: home-desktop-full.png CORE CAPABILITIES, services-desktop-full.png, start-project-desktop-full.png

**Sorun.** Aynı hizmet üç sayfada üç farklı adla anılıyor ("SYSTEMS & BACKEND" / "BACKEND, APIs & INTEGRATIONS" / "Systems & Backend"), madde sayısı 3-5-4 arasında değişiyor ve home'daki EXPLORE SERVICES linki farklı bir listeye açılıyor. Home kartlarının altındaki "01 — 03" sayacı da services sayfasındaki "01 / 05" ile çelişiyor.

**Neden önemli.** Jüri veya müşteri CORE CAPABILITIES'ten services sayfasına geçince başka bir menüyle karşılaşıyor; bu, metnin tek bir kaynaktan değil ayrı oturumlarda üretildiğinin en görünür kanıtı ve copy-09'daki süreç tutarsızlığının hizmet versiyonu.

**Ne yapılmalı.** Tek kanonik liste: `servicesPage.items` kaynak olsun; home `services` bloğunu sil, home kartları items'ın ilk üçünü (veya üçe indirgenmiş özetini) aynı title ve `#id` anchor'ıyla (örn. /services#api-integration) render etsin; intake `types` aynı id'lere map'lensin (web / mobile / backend / other) ve isimleri services başlıklarının kısa hali olsun. İsimler site genelinde: WEB APPS & SAAS / MOBILE APPS / BACKEND & APIs / CLOUD & DEVOPS / PERFORMANCE & RESCUE.

### İNCE İŞÇİLİK

#### `copy-08` — Ölü manifesto maddeleri ve görsel altyazıları (DATA OVER DOGMA / BRUTAL EFFICIENCY / ENGINEER PERMANENCE)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:517-545 (imageAlt, imageCaption "FIG. 01 — THE PRACTICE OF PRECISION", principles[0-2], disciplinesEyebrow*, disciplinesHeading "ENGINEERING IS THE MEDIUM", breakImageAlt/Caption "FIG. 02 — THE SYSTEMS THAT CONNECT"); render edilmiyor (about/page.jsx:63-71 yorum satırı)

**Sorun.** Render edilmeyen ama meta description'a sızan ve TR dosyasında da taşınan üç manifesto maddesi: "DATA OVER DOGMA", "BRUTAL EFFICIENCY", "ENGINEER PERMANENCE" + "Decisions deserve evidence", "Every layer should earn its place", "The best work outlasts the launch". Hepsi LLM manifesto klişesi. Görsel altyazıları ("Architectural engineering laboratory with precision workstations", "Precision-etched circuitry and conduits under studio lighting") AI-stok görsel tarifleri; media bloğu (en.json:2-8: earth, server, wafer, conduits, laboratory) de kullanılmıyor.

**Neden önemli.** Yorum satırındaki kod yeniden açıldığında doğrudan slop yayınlanır; ölü anahtarlar TR paritesini ve bakım yükünü büyütür.

**Ne yapılmalı.** Anahtarları sil. İlke listesi istiyorsan, launch blog yazısındaki "How we engineer" listesini olduğu gibi taşı; orada her madde bir davranış ve bir sayı içeriyor: "Performance budgets in sprint one: LCP ≤ 2.5s, INP ≤ 200ms.", "Boring technology, on purpose.", "You own the repo, the cloud account and the store listing from day one." Başlıklar sloganla değil, davranışla yazılsın.

> **Doğrulayıcı notu:** Anahtarlar doğrulandı: 517-518, 521-537, 538-545 render edilmiyor (about/page.jsx:63-71 yorum satırı); media bloğu (2-8) page.jsx:22'de okunup hiç kullanılmıyor; tr.json:496 "Mühendislik Manifestomuz" taşıyor. Ama bunların hiçbiri sayfada görünmüyor; tek görünür sızıntı meta description ve o zaten copy-07'de ele alınıyor. Dolayısıyla bu bir temizlik işi: severity major değil minor. Silme ve istenirse blog'daki "How we engineer" listesini (118) taşıma önerisi doğru.

#### `copy-15` — "//" kod-yorum önekleri ve snake_case etiketler

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:86 ("// {item.role}"), 101 ("// {service.category}"), 157 ("// ASSET IN PROGRESS"); src/app/[locale]/blog/[slug]/page.jsx:188 ("// {post.author.role}"); messages/en.json:410 ("SYSTEM_ACTIVE"); screenshot: home-desktop-full.png (testimonial ve servis kartları)

**Sorun.** Unvanların ve kategorilerin önüne kod yorumu gibi "//" koymak, "SYSTEM_ACTIVE" gibi alt çizgili durum etiketi: hacker-terminal cosplay'i. Ne bilgi ekliyor ne de okunurluğa yardım ediyor.

**Neden önemli.** Brief'te sayılan "monospace status pill" ailesinin bir parçası; tasarım dilini "mühendis" değil "mühendis taklidi" yapıyor.

**Ne yapılmalı.** Önekleri kaldır; rol ve kategori düz metin: "Project Manager", "Web / SaaS / Platforms". Monospace kalabilir, kod sözdizimi kalmasın.

> **Doğrulayıcı notu:** page.jsx:86, 101, 157 ve en.json:410 doğru. Blog satırı yanlış: "// {post.author.role}" src/app/[locale]/blog/[slug]/page.jsx:112 (188 değil). home-desktop-full.png testimonial ve servis kartlarında "// PROJECT MANAGER", "// WEB / SAAS / PLATFORMS" görünüyor. Düz metne çevirme önerisi doğru.

#### `copy-16` — Ölü ve bayat metin anahtarları

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:156-157 ("ALAZ / SPECIMEN {n}" + "// ASSET IN PROGRESS" fallback; iki projenin de görseli olduğu için erişilemez); messages/en.json:395 (footer.talk "HAVE A SYSTEM IN MIND?" — Footer.jsx'te hiç kullanılmıyor); en.json:2-8 (media bloğu, page.jsx:22'de okunup kullanılmıyor); en.json:517-518, 538-545 (about görsel/disiplin anahtarları, render yok); src/lib/seo.js:15 (OG alt: "ALAZ — Software & High-Performance Web Engineering" — eski, sadece web konumlandırması)

**Sorun.** "SPECIMEN" brief'te adı geçen laboratuvar sözlüğünden; render edilmese bile kodda duruyor. footer.talk ve media kullanılmıyor. OG görsel alt metni sitenin şu anki web+mobil+backend konumlandırmasıyla çelişiyor ve paylaşımlarda görünüyor.

**Neden önemli.** Ölü slop, bir sonraki refactor'da canlanır; bayat OG metni sosyal paylaşımda yanlış hikâye anlatır.

**Ne yapılmalı.** SPECIMEN fallback'i, footer.talk'u, media bloğunu ve about görsel anahtarlarını sil. seo.js OG alt: "ALAZ — web, mobile and backend software studio".

#### `copy-17` — Services sayfası başlıkları: kategori adı ve savunmacı "actually"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:151-157 (kicker, heading "SOFTWARE ENGINEERING", introNote "ALAZ / CAPABILITIES 2026"), 159-164 ("CAPABILITIES / 002", "PRACTICAL BREAKDOWN", "WHAT WE ACTUALLY DO"), 303 ("FROM IDEA TO PRODUCTION"), 331-335 ("COMMON QUESTIONS", "QUESTIONS & PRACTICAL ANSWERS"); src/app/[locale]/services/page.jsx:75-113, 222-232; screenshot: services-desktop-full.png

**Sorun.** H1 "SOFTWARE ENGINEERING." bir sektör adı, bir ifade değil. "WHAT WE ACTUALLY DO"daki "actually" sitenin geri kalanının gerçek olmadığını ima eden savunmacı bir tik. "PRACTICAL" iki başlıkta tekrar; "CAPABILITIES 2026" kurumsal broşür dili.

**Neden önemli.** Services sayfasının gövdesi sitenin en somut metni; başlıklar onu jenerik bir kapakla örtüyor.

**Ne yapılmalı.** H1: "WEB, MOBILE, BACKEND."; kicker: "SERVICES"; introNote sil; overview başlığı: "WHAT WE BUILD."; overviewEyebrowRight: sil veya "FIVE THINGS WE DO"; FAQ başlığı: "QUESTIONS."; processEyebrowRight: sil.

#### `copy-19` — "the systems behind them" yedi kez; "systems" ev ismi olmuş

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:407 (home.meta), 415 (hero.intro), 506 (about.introText), 109 ve 118 (blog), 135 (services.meta), 662 (blogPost.authorIntro), 674 (intake.meta); ayrıca "system" kelimesi validation.lead, start.paragraph, footer.talk, caseStudy.contactPrompt, archive.noteRight'ta

**Sorun.** Aynı konumlandırma cümlesi ("web apps, mobile apps and the systems behind them") sitede yedi yerde neredeyse kelimesi kelimesine; "system(s)" kelimesi ana sayfada tek başına bir düzine kez geçiyor ("the next great system", "the strongest systems", "more systems in development"). İyi bir ifade tekrarla tik'e dönüşüyor.

**Neden önemli.** Tekrar, okuyucuda "metin tek bir prompt'tan türetilmiş" hissi yaratır; "system" soyutlaması somut olanı (API, backend, veritabanı) gizler.

**Ne yapılmalı.** İfadeyi sayfa başına bir kez kullan. Kastettiğin şeyi söyle: "backend", "the API", "the database". Örnek: home meta → "ALAZ builds web apps, mobile apps and the backends under them. Two products live, from a small team in İzmir and New York."

> **Doğrulayıcı notu:** Tekrar gerçek ama sayım düzeltilmeli: ana sayfada render edilen metinlerde "system(s)" ~9 kez (meta 407, intro 415, signal.a, kicker 412, capabilities eyebrow 440, validation.lead 430, start.paragraph 466, testimonial 1, servis kartı 3 başlığı), "bir düzine" değil. Reviewer en görünür iki örneği atlamış: servicesPage.kicker "WEB, MOBILE AND THE SYSTEMS BEHIND THEM." (151, services hero'nun ilk satırı) ve blog yazısı başlığı "...the Systems Behind Them" (108). Ek: home.meta.title "Web, Mobile & Software Engineering Studio" (406) bozuk bir üçlü; web ve mobil zaten yazılım. Sayfa başına bir kez kuralı ve "backend/API/database" ile somutlaştırma önerisi doğru.

#### `copy-21` — Alt text ve görsel altyazı dolgusu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:455 ("{name} {type} engineering visual"), 608 ("{name} technical engineering visual"), 668 ("{title} — cover visual"), 517 ve 544 (about görsel alt'ları); src/app/[locale]/page.jsx:149; case-studies/[slug]/page.jsx:138; blog/[slug]/page.jsx:174

**Sorun.** Alt metinler görseli tarif etmiyor, "engineering visual" gibi şablon ifadeler. Erişilebilirlik ve görsel arama için değersiz; ayrıca "engineering" kelimesi yine dolgu olarak kullanılıyor.

**Neden önemli.** Craft, görünmeyen katmanda da ölçülür; ekran okuyucu kullanıcısı "Vocabulary MOBILE APPLICATION engineering visual" duyar.

**Ne yapılmalı.** Proje nesnesine gerçek alt metin alanı ekle: "Vocabulary app cover: a cat holding a card that reads 8000 on a yellow background", "Market Hours dashboard: dark world map with open exchanges highlighted and a 14:42 clock". Blog kapakları için kapağın içeriğini yaz.

> **Doğrulayıcı notu:** en.json:455, 608, 668 doğru; 517 ve 544 render edilmiyor. Satır düzeltmeleri: case-studies/[slug]/page.jsx:83 (138 değil), blog/[slug]/page.jsx:98 (174 değil), page.jsx:149 doğru. Önerilen alt metinler screenshot'lardaki gerçek görsellerle uyuşuyor (sarı zeminde 8000 kartlı kedi; 14:42 saatli koyu dünya haritası). Ek: archive.previewAlt "{name} project preview" (599) ve galleryAlt (630) kabul edilebilir, dokunmaya gerek yok.

#### `copy-22` — Marka adı tutarsız: ALAZ / ALAZ Software / ALAZ Engineering / Engineering Studio / Software Studio

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:396 ("ALAZ SOFTWARE"), 580 ve 673 ("ALAZ Engineering"), 637 ("ALAZ Engineering Studio"), 100 ve 116 ("ENGINEERING STUDIO"), 411 ("SOFTWARE STUDIO"), 501 ("engineering practice"); src/lib/seo.js:6 (LEGAL_NAME "ALAZ Software")

**Sorun.** Title tag'lerde "ALAZ Engineering", copyright'ta "ALAZ SOFTWARE", hero'da "SOFTWARE STUDIO", about'ta "engineering practice". Küçük ama sayfadan sayfaya kimlik değişiyor.

**Neden önemli.** Tutarlı isim, kurumsal olgunluk sinyali; tutarsızlık metnin farklı oturumlarda üretildiğini ele verir.

**Ne yapılmalı.** Görünen ad her yerde "ALAZ"; yasal ad sadece footer ve legal sayfasında "ALAZ Software"; title şablonu "{page} — ALAZ". "Engineering" ekini isimden çıkar.

#### `copy-23` — İki prestij ofis adresi vs. "a small software engineering studio" + EST. 2026

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:374-392 (contact.offices: "1250 Broadway, 36th Floor, New York" ve "Folkart Towers, B Blok, Kat 31, İzmir"); 810 (legal: "a small software engineering studio with offices in the United States and Türkiye"); src/components/ContactInfo.jsx; screenshots: tüm sayfaların footer'ı

**Sorun.** Sekiz aylık, legal sayfasında kendini "small" diye tanımlayan bir stüdyo için Broadway 36. kat ve Folkart 31. kat adresleri, bunları Google'layan herkese sanal ofis / kayıtlı adres olarak okunur. Gerçekten oturduğunuz masalarsa sorun yok; değilse hero'daki abartı burada da devam ediyor hissi verir.

**Neden önemli.** Metnin tamamının güvenilirliği en zayıf halkasından ölçülür; adres bu halkalardan biri.

**Ne yapılmalı.** Eğer bunlar fiziksel ofis değilse: "İzmir · New York" + e-posta yeterli; yasal zorunluluksa "Registered address" etiketiyle legal sayfasına taşı. Gerçek ofislerse kat numaralarını bırak ama legal'daki "small" ile uyumlu bir cümle ekle: "Two desks, two time zones."

> **Doğrulayıcı notu:** Metin gerilimi doğrulanabilir: 374-392 (1250 Broadway 36th Floor; Folkart Towers Kat 31) her sayfanın footer'ında ve about'ta (ContactInfo.jsx), StructuredData.jsx:30-33'te de; legal 810 "a small software engineering studio"; hero "EST. 2026". "Google'layan herkes sanal ofis olarak okur" kısmı doğrulanamayan bir çıkarım; bulgu koşullu olarak kalmalı (fiziksel ofisse dokunma, kayıtlı adresse legal sayfasına "Registered address" etiketiyle taşı, footer'da "İzmir · New York" yeter). Bu haliyle uygulanabilir.

#### `copy-24` — ALAZ etimolojisi doğru ama demirci/çoban hikâyesi süslenmiş

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:510-515 (originLabel "ALAZ, N. / TURKISH, ARCHAIC", originDefinition, originParagraphs[0]: "Blacksmiths and shepherds used it for the moment a fire stops just burning and gets hot enough to actually shape metal"); src/app/[locale]/about/page.jsx:52-60; screenshot: about-desktop-full.png

**Sorun.** "Alaz" gerçekten eski/ağız Türkçesinde alev-yalım anlamında bir kelime; bu sitenin en iyi, en sahiplenilebilir fikri. Ama "demirciler ve çobanlar metali şekillendirecek kadar ısınan an için kullanırdı" sözlükbilimsel bir iddia gibi sunuluyor ve kaynağı yok; Türkçe bilen bir okuyucu bunu uydurma folklor olarak yakalayabilir.

**Neden önemli.** Marka hikâyesinin tek güçlü parçası, doğrulanamaz bir detayla zayıflamamalı.

**Ne yapılmalı.** Kelimeyi ve "working flame" imgesini tut, iddiayı mütevazılaştır: "Alaz is an old Turkish word for flame; in dialect, the live part of the fire rather than the smoke or the ember. We build software the same way: the part that does the work, not the part that looks like it's working." originLabel'daki "ARCHAIC" yerine "DIALECT" daha doğru.

#### `copy-25` — 404 ve küçük mikro-metinler kişiliksiz ya da mistik

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:897 ("This route does not exist. Return to the beginning."), 798 ("ALAZ / INFORMATION"), 416 ("SCROLL TO EXPLORE"), 627-628 ("HAVE A COMPLEX CHALLENGE?" / "LET'S TALK"), 665 ("WANT TO BUILD SOMETHING THAT HOLDS UP?"); src/components/LegalContent.jsx:242-244; screenshot: 404-desktop-fold.png

**Sorun.** "Return to the beginning" mistik; "ALAZ / INFORMATION" 404 sayfasında anlamsız; "HAVE A COMPLEX CHALLENGE?" jenerik ajans CTA'sı. Bunlar küçük ama Awwwards seviyesinde mikro-metin, kişiliğin en çok ölçüldüğü yer.

**Neden önemli.** Mikro-metin, markanın gerçek insanlar tarafından yazılıp yazılmadığının en ucuz testi.

**Ne yapılmalı.** 404 body: "Nothing lives at this address. Try the work, or write to hello@alaz.pro and tell us what you were looking for."; eyebrow: "404" tek başına yeter; caseStudy.contactPrompt: "Building something like this?" / CTA "Tell us about it"; blogPost.contactPrompt kalabilir ("holds up" sitenin en insani ifadesi, bkz. strengths).

> **Doğrulayıcı notu:** en.json:897, 798, 416, 627-628, 665 doğru; 404-desktop-fold.png "ALAZ / INFORMATION", "404", "This route does not exist. Return to the beginning." gösteriyor. Satır düzeltmesi: LegalContent.jsx 23 satır, ilgili render 12-14 (242-244 değil). Ek: eve dönüş için üç farklı ifade var: "RETURN TO HOME" (684), "Return to the beginning" (897), "← BACK TO HOME" (800); tek bir ifade seçilmeli.

#### `copy-missed-2` — Vocabulary case study'si yayınlanmamış bir uygulamayı şimdiki zamanda "var" gibi anlatıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:53-56 (summary/outcome: "A free-to-start app with a level test, 17 word games... and an optional premium plan"); src/lib/stores.js:5-8 (appStore ve googlePlay boş); home-desktop-full.png SELECTED WORKS kartı ve case-studies-desktop-full.png listesi

**Sorun.** Market Hours için dürüst bir durum cümlesi var ("Live on the web, coming soon as a mobile app", 74) ama Vocabulary'nin özeti ve outcome'u yayında bir ürünü anlatır gibi yazılmış; tek durum göstergesi case study sayfasındaki "COMING SOON ON" butonları. Home kartı ve archive listesinde bu butonlar olmadığı için ürün çıkmış gibi okunuyor.

**Neden önemli.** Sitenin tüm kanıt yükü "iki ürünümüz var" cümlesine biniyor; birinin henüz indirilemediğini metnin söylememesi, copy-03'teki testimonial sorununun küçük bir versiyonu: doğrulanamayan iddia.

**Ne yapılmalı.** summary'nin sonuna Market Hours'taki gibi bir durum cümlesi ekle: "In store review for iOS and Android; launching this quarter." outcome'daki "A free-to-start app..." cümlesini "Ships as a free-to-start app..." veya "The release build has..." biçiminde gelecek/yakın gelecek kipine çek. Store linkleri açılınca cümleyi kaldır; bunu stores.js'teki boş link kontrolüne bağlayıp otomatik göstermek daha güvenli (link boşsa "coming soon" cümlesi render edilsin).

#### `copy-missed-3` — Kendi ürünlerinde "DELIVERABLE" etiketi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:625 (caseStudy.deliverableLabel "DELIVERABLE"); src/app/[locale]/case-studies/[slug]/page.jsx:152 ("0{i + 1} / DELIVERABLE"); case-market-hours-desktop-full.png marker satırı

**Sorun.** "DST-AWARE MARKET ENGINE", "MARKET & NEWS ALARMS", "LIVE DAY/NIGHT MAP" bir müşteriye teslim edilmiş iş gibi "deliverable" diye etiketleniyor; oysa iki proje de ALAZ'ın kendi ürünü, ortada müşteri yok. Kelime, olmayan bir ajans-müşteri ilişkisi ima ediyor.

**Neden önemli.** Case study'lerin tek güçlü yanı dürüstlüğü; yanlış etiket bu dürüstlüğü zedeliyor ve copy-12'deki "iki ürünle ajans dili" sorununun bir parçası.

**Ne yapılmalı.** Etiketi "KEY FEATURE" veya "WHAT'S INSIDE" yap; daha iyisi, additions'taki "By the numbers" bloğuyla birleştirip markers'ı value/label çiftlerine çevir ("9 / EXCHANGES", "4 / FOREX SESSIONS", "10 / ALARM SOUNDS"). Gerçek müşteri işi geldiğinde "DELIVERABLE" etiketi proje nesnesinde opsiyonel bir alan olarak geri gelebilir.

#### `copy-missed-4` — İş bölümünün beş farklı adı var

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:125 (nav "CASE STUDIES"), 587 (H1 "THE WORK"), 583-584 ("INDEX / 001", "ARCHIVE / SELECTED WORK"), 451-452 (home "SELECTED WORKS"), 603-604 ("BACK TO ARCHIVE", "← ALL CASE STUDIES"), 609 ("ALAZ / SELECTED WORK"), 904 (breadcrumb "Case Studies"); case-studies-desktop-full.png ve case-market-hours-desktop-full.png

**Sorun.** Nav "CASE STUDIES" diyor, sayfa "THE WORK", eyebrow "ARCHIVE" ve "INDEX", home "SELECTED WORKS", geri linkleri "ARCHIVE" ve "CASE STUDIES". Aynı yerin beş adı var.

**Neden önemli.** Tutarlı adlandırma Awwwards jürisinin aradığı craft'ın en ucuz göstergesi; beş ad, bölümlerin ayrı ayrı yazıldığını söylüyor ve copy-12'deki arşiv sözlüğü sorununu ad düzeyinde tekrarlıyor.

**Ne yapılmalı.** Tek ad seç ve her yerde kullan. Öneri: "WORK": nav "WORK", H1 "THE WORK." (kalabilir), eyebrow'lar "WORK" / "TWO PRODUCTS, BOTH OURS", home başlığı "WORK.", geri linkleri "← ALL WORK", breadcrumb "Work". URL /case-studies SEO için kalabilir; görünen ad değişir.

#### `copy-missed-5` — Case study meta description'ına SEO dolgu kuyruğu ekleniyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:607 (caseStudy.metaDescriptionTemplate: "{name}: {summary} Read this ALAZ engineering case study."); src/app/[locale]/case-studies/[slug]/page.jsx:27

**Sorun.** Zaten iyi yazılmış summary'nin sonuna "Read this ALAZ engineering case study." eklenmiş; Google snippet'ında otomatik üretilmiş, tıklama avcısı bir cümle gibi okunuyor ve "engineering" dolgusu yine burada.

**Neden önemli.** Snippet, sitenin SERP'teki sesi; dolgu kuyruk metnin geri kalanının dürüstlüğünü arama sonucunda gölgeliyor.

**Ne yapılmalı.** Şablonu "{summary}" olarak sadeleştir (Market Hours özeti 160 karakteri aşıyorsa summary'den ilk cümleyi al). İsim zaten title'da var.

#### `copy-missed-6` — Formda hiçbir şey girilmeden "33% COMPLETE"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:704 (intake.percentCompleteTemplate "{percent}% COMPLETE"); src/components/IntakeForm.jsx:123 (Math.round((step + 1) / 3 * 100)); start-project-desktop-full.png sağ üst "33% COMPLETE"

**Sorun.** İlerleme yüzdesi doldurulan alanlara değil bulunulan adıma bağlı; kullanıcı daha bir seçim yapmadan form "%33 tamamlandı" diyor. Yanlış bir mikro-metin, üstelik yanındaki "01 / 03 — PROJECT TYPE" aynı bilgiyi zaten veriyor.

**Neden önemli.** Mikro-metin dürüstlüğü, copy-25'in dediği gibi gerçek insan elinin en ucuz testi; yanlış bir yüzde "kimse bunu denemedi" sinyali verir.

**Ne yapılmalı.** Yüzdeyi kaldır, "01 / 03 — PROJECT TYPE" tek başına yeter. Kalacaksa gerçek doluluktan hesapla (zorunlu alan sayısı / dolu zorunlu alan) ve 0'dan başlasın.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Yazılı ses rehberi + yasaklı kelime listesi

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basecamp/37signals yazım kuralları, Linear'ın ürün metni, Stripe dokümantasyon tonu; stüdyo olarak Studio Freight ve Basement Studio'nun kısa-somut-kişisel cümleleri

Repo'ya brand/voice.md ekle (metin değişikliği yapan herkes ve her LLM promptu bunu okur). Kurallar: (1) her cümlede en az bir özel isim, sayı veya araç adı; (2) sayfa başına en fazla bir slogan-cümle; (3) birinci çoğul şahıs, sade geniş zaman; (4) rakipten bahsetme, kendi işini göster; (5) doğrulayamadığın hiçbir sıfatı yazma. Yasaklı liste: precision, intent, endure/permanence, uncompromising, validation, initiate, sequence, signal, transmission, specimen, capabilities, seamless, cutting-edge, "system(s)" sayfa başına 1'den fazla, "actually", "most agencies". İzinli ev kelimeleri: holds up, month eighteen, boring technology, working flame, one business day. en.json'a yeni string eklerken bu dosyaya karşı kontrol et.

### İsimli insanlar: "Who" bloğu ve gerçek byline'lar

- **Etki:** yüksek · **Efor:** orta · **Referans:** Basement Studio, Hello Monday ve Unseen Studio ekip sayfaları; Rauno Freiberg, Paco Coursey gibi tek kişilik craft siteleri

About sayfasına, etimoloji bölümünün hemen altına, ekipteki gerçek kişileri koy: isim, rol, şehir, bir cümle ("Kahraman — engineer, İzmir. Wrote the market engine in Market Hours; argues for PostgreSQL in every meeting."). Fotoğraf yoksa bile isim ve şehir yeterli. Blog byline'larını "The ALAZ Team" yerine bu kişilere bağla (blogPosts[].author → people[id] referansı). İki kişilik bir stüdyo olmak utanılacak değil, tam tersine Awwwards'da sık görülen bir profil; isimsizlik ise AI-içerik sinyali.

### Buzzword ticker yerine olgu şeridi (proof strip)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Linear ve Vercel'in sayı-odaklı landing şeritleri; Locomotive'in sade "facts" satırları

Ana sayfadaki iki marquee'yi tek bir statik veya yavaş kayan olgu satırıyla değiştir; içerik projects ve FAQ verisinden türesin ki elle yazılmış abartı olmasın: "markethours.live — live · 9 exchanges · 4 forex sessions" / "Vocabulary — 8,000 words · 24 languages · 17 games" / "Reply within one business day" / "Founded Feb 2026 · İzmir · New York". Her öğe tıklanabilir (ürüne, FAQ'ye, iletişime). Sayılar en.json:53-77'den okunur, yeni string yazılmaz.

### Case study'lere "By the numbers" + "What we'd change" blokları

- **Etki:** yüksek · **Efor:** orta · **Referans:** Linear changelog'un dürüst tonu; Obys ve Lusion case study'lerindeki süreç notları; Rauno Freiberg'in craft yazıları

Her projeye iki kısa veri bloğu ekle: (1) By the numbers — projeye ait gerçek sayılar (Vocabulary: 24 dil, 44 deck, 17 oyun, tek Flutter codebase; Market Hours: 9 borsa, 4 seans, haftalık takvim sync, 10 alarm sesi), markers alanını genişleterek value/label çiftleri olarak; (2) What we'd change — bir-iki cümlelik dürüst retrospektif ("Hours were hardcoded in v1; moving them to a generated data set took a week we should have spent up front."). Kendi ürünleriniz olduğu için bunu yazabilirsiniz; müşteri işi olan ajanslar yazamaz. Bu, sitenin "honest engineering" iddiasını slogan yerine kanıta çevirir.

### Footer'da canlı yerel saat satırı (Market Hours ile marka tutarlılığı)

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive, Resn ve birçok SOTD stüdyo footer'ındaki yerel saat; Market Hours'ın kendi dashboard'u

"STATUS: ACCEPTING NEW INQUIRIES" ve "SYSTEM_ACTIVE" yerine footer ve/veya hero'da gerçek, canlı bir satır: "14:32 in İzmir · 07:32 in New York — we reply within a business day." Intl.DateTimeFormat ile timeZone: 'Europe/Istanbul' ve 'America/New_York', her dakika güncellenir; SSR'da boş render edip client'ta doldur (hydration farkı olmasın). Kendi ürününüz saat dilimleriyle ilgili; bu detay markayı tekrar etmeden bağlar.

### "POWERED BY" yerine colophon

- **Etki:** orta · **Efor:** küçük · **Referans:** Unseen Studio, Obys ve Studio Freight colophon/credits bölümleri

Footer'ın alt satırına veya /colophon mini sayfasına: "Set in Archivo, Inter and JetBrains Mono. Built with Next.js 15 and next-intl, hosted on Hostinger. Videos: (kaynak). No analytics cookies." Araçları dürüstçe ama hero'da değil, kredi satırında söyler. Privacy sayfasındaki "The site doesn't use advertising or analytics cookies" cümlesini de buraya bağla; bu, Awwwards jürisinin sevdiği bir craft sinyali.

### "Now" satırı: gerçek zamanlı stüdyo durumu

- **Etki:** orta · **Efor:** küçük · **Referans:** nownownow.com hareketi; Derek Sivers'ın /now sayfası; birçok bağımsız stüdyonun "availability" satırı

Intake sayfasındaki sahte durum etiketi yerine, elle güncellenen ama gerçek bir "Now" satırı (en.json'da tek string, ayda bir güncellenir): "Now: shipping Market Hours to the App Store; one slot open for a web or mobile project starting January 2027." Aynı satır ana sayfa CTA bölümünde de görünür. Tarih damgası ekle ("Updated Oct 2026") ki bayatlamadığı görülsün.
