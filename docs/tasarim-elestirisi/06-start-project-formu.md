# Start a project sayfası ve intake formu

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 26 (4 kritik · 12 önemli · 10 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sayfa işlevsel bir üç adımlı intake formu ama "tasarlanmış" değil "kurulmuş" hissi veriyor: sitenin diğer sayfalarıyla birebir aynı şablon hero (mono eyebrow + dev caps başlık + gri nokta), arkasında AI üretimi bir roket fırlatma videosu, her köşede "SECURE TRANSMISSION / STATUS: ACCEPTING / TRANSMITTING... / 001" türü terminal jargonu ve generic bento kartlar. Kodda doğruladığım iki kritik hata var: (1) adım 2'den 3'e geçince React'in aynı <button> düğümünü type="submit"e çevirmesi yüzünden son adım daha kullanıcı hiçbir şey yazmadan kırmızı hata mesajlarıyla açılıyor; (2) API, DB ve SMTP ikisi de başarısız olsa bile 200 "success" döndüğü için kullanıcı "safely in our queue" görürken talep kaybolabiliyor. Buna İngilizce kullanıcıya giden Türkçe otomatik e-posta, mobilde kesilen etiket, sıfır adım animasyonu, yalan söyleyen "%100 COMPLETE" ve çıkmaz sokak başarı ekranı ekleniyor. Tipografi, kısa ve iyi yazılmış hata mesajları, dürüst "Something Else" seçeneği ve opsiyonel bütçe/zaman alanları korunmaya değer; ama Awwwards seviyesine çıkmak için hero'nun formun kendisi olması, alanların tipografik olması, geçişlerin koreografi kazanması ve arka ucun güvenilir hale gelmesi gerekiyor.

## Korunması gerekenler

- Üç adımlı, az alanlı yapı doğru karar: toplam 8 alan, yalnızca 5'i zorunlu; bütçe ve zaman planı opsiyonel (sürtünmeyi düşürüyor). Bu omurgayı koru, sadece alanların görünümünü değiştir.
- 'Something Else — Audit, rescue or custom' seçeneği ve 'What are you trying to solve?' / 'A working title is fine' gibi placeholder ve label metinleri dürüst ve iyi yazılmış; jargon temizliğinde bunlara dokunma.
- Hata mesajları kısa, düz İngilizce ve alanın altında (role="alert"); noValidate ile tarayıcı balonları kapatılmış; autoComplete name/email/organization, maxLength sınırları ve aria-pressed doğru kullanılmış.
- Display tipografi (Archivo black, -.075em tracking, .86 leading) ve lib/fit.js ile taşma korumalı başlık sistemi güçlü; gri nokta/kare brand cihazı logoyla tutarlı. Hero küçülse bile bu tipografik dil kalmalı.
- Mobil düzen tek sütun, tam genişlik kontroller ve ≥55px dokunma hedefleriyle genel olarak sağlam (etiket kesilmesi dışında).
- Arka uç hijyeni kısmen iyi: e-posta HTML'inde escapeHtml, e-postanın lowercase'lenmesi, stüdyo bildiriminde replyTo, DB + mail çift kanal, DB tablosunun otomatik oluşturulması. Bunların üstüne güvenlik katmanı eklemek yeterli.
- Gizlilik notunun gönder butonunun hemen üstünde, policy linkiyle birlikte durması doğru yerleşim.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `start-project-01` — Son adım, kullanıcı dokunmadan hata mesajlarıyla açılıyor (button type mutasyonu)

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:189 (koşullu <button type="button"> / <button type="submit">), :54-57 (nextStep / submit); ekran: scratchpad/sp/desktop-08-step3.png, scratchpad/sp/mobile-after-step-change.png

**Sorun.** Adım 2'de CONTINUE'ya basınca adım 3 ('WHO'S ON THE OTHER END?') kullanıcı hiçbir şey yazmadan 'Enter your name.' ve 'Enter a valid email address.' hatalarıyla, kırmızı çerçeveli alanlarla açılıyor. Sebep: 189. satırdaki iki buton aynı DOM konumunda olduğu için React aynı <button> düğümünü yeniden kullanıyor; click handler içinde setStep(2) senkron flush edilince tarayıcı activation behavior'ı çalıştırdığı anda butonun type'ı 'submit' olmuş oluyor → form submit ediliyor → submit() → validate(2) → name/email hataları state'e yazılıyor. Playwright ile mouse click, Space ve Enter'ın üçünde de aynı sonucu ölçtüm (event log: click → SUBMIT; hatalar hemen görünür). Hem desktop hem mobilde tekrarlanıyor.

**Neden önemli.** Dönüşüm sayfasının son ve en kritik adımı, kullanıcı daha başlamadan 'yanlış yaptın' diyor. Güveni kırıyor ve bir Awwwards jürisinin formu bir kez doldururken kesin fark edeceği türden bir craft hatası.

**Ne yapılmalı.** İki butona farklı key ver (key="next" / key="send") ki React düğümü remount etsin; daha sağlamı tek bir <button type="button"> kullanıp onClick={step < 2 ? nextStep : submit} ile gönderimi elle tetiklemek ve form onSubmit'inde e.preventDefault() sonrası `if (step < 2) return nextStep()` demek. Ek güvence: validate() yalnızca görünür adımın alanlarını yazsın, adım değişiminde setErrors({}).

#### `start-project-02` — Backend hiçbir yere kaydedemese bile sayfa 'REQUEST RECEIVED' diyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/api/contact/route.js:39-49; src/components/IntakeForm.jsx:76-82; src/lib/db.js:70-74; src/lib/mailer.js:27-30

**Sorun.** curl ile doğruladım: DB ve SMTP env'leri yokken (ya da ikisi de hata verince) API HTTP 200 + {success:true, dbSaved:false, emailSent:false} dönüyor. İstemci yalnızca response.ok'a baktığı için kullanıcıya 'Your project inquiry is safely in our queue' gösteriliyor; talep aslında hiçbir yere ulaşmadı. Prod'da SMTP şifresi değişince veya Hostinger DB düşünce lead'ler sessizce kaybolur. Ayrıca `await response.json()` HTML dönen bir 502/504 proxy hatasında throw edip anlamsız mesaj üretir.

**Neden önemli.** Conversion sayfasında yapılabilecek en pahalı hata: form 'çalışıyor' görünürken lead kaybı. 'safely in our queue' doğrulanmamış bir iddia.

**Ne yapılmalı.** route.js'de `if (!dbResult.saved && !mailResult.sent) return NextResponse.json({ error: 'delivery_failed' }, { status: 503 })`; en az bir kanal başarılıysa 200 dön ama diğer kanalın hatasını logla ve alert et (Slack webhook / Telegram bot ikinci kanal olarak 10 satırlık iş). İstemcide response.text() + try JSON.parse; hata durumunda "We couldn't send this — email us at hello@alaz.pro" fallback'i ve mailto linki göster. Başarı cevabına DB insertId'den türetilmiş gerçek bir referans (ör. ALZ-26-0042) ekle ve success ekranında göster.

#### `start-project-03` — Hero videosu: AI üretimi roket fırlatma, 2.4MB, gömülü ses track'i, reduced-motion yok

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:92-97 (/videos/start-project-rocket.mp4, preload="auto", opacity .5 + iki gradient); public/videos/start-project-rocket.mp4; ekran: scratchpad/sp/rocket-2.png, scratchpad/sp/rocket-6.png, scratchpad/sp/hero-simulated-1440.png

**Sorun.** Not: sayfa brief'te geçen start-a-project-hero.mp4'ü (3.4MB data-center loop; anasayfa CTA bölümünde kullanılıyor) değil start-project-rocket.mp4'ü kullanıyor. İçerik ffmpeg ile çıkardığım karelerde net: Starship benzeri, belli ki üretken AI ile yapılmış bir roket kalkışı. 'Start a project = roket fırlat' en literal, en klişe metafor. Teknik: 1280x720 H.264 @2.3Mbps, 8 sn, muted olmasına rağmen 128kbps AAC ses track'i gömülü (~130KB boşa), preload="auto" ile sayfa açılır açılmaz 2.4MB iniyor, poster.png düz #090909 bir kare, prefers-reduced-motion / saveData kontrolü yok (BackgroundVideo.jsx'te var ama burada kullanılmamış). Overlay'lerden sonra roket %30-40 görünürlükte kalıyor (hero-simulated-1440.png) — maliyetine değmeyen bir fon.

**Neden önemli.** Owner'ın kırmızı çizgisi: AI/stock görsel. Jüri AI videoyu tek karede tanır; slop sinyali + performans bütçesi + form sayfasında dikkat dağıtma, üçü birden.

**Ne yapılmalı.** En temiz çözüm: bu sayfadan videoyu tamamen kaldır; formun kendisi hero olsun (bkz. start-project-15 ve additions). Atmosfer şartsa stüdyoya ait bir şey: gerçek bir proje ekranından 2-3 saniyelik makro kayıt ya da 20KB'lık bir generative canvas (OGL ile cursor'a tepki veren dot/noise field). Video kalacaksa: `ffmpeg -i in.mp4 -an -c:v libsvtav1 -crf 38` ile AV1/webm + H.264 fallback, ≤1Mbps, hedef ≤800KB; preload="metadata"; gerçek bir poster karesi; reduced-motion ve saveData için zaten var olan BackgroundVideo bileşenini kullan.

#### `start-project-04` — Terminal / sci-fi 'sistem' jargonu: SECURE TRANSMISSION, TRANSMITTING..., STATUS: ACCEPTING, / 001

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json intake.sectionTopLeft, sectionTopRight, asideStatus, completeEyebrow, submittingCta, submitErrorFallback, formNotation, typeIndexSuffix, headingEyebrow, asideParagraph; src/components/IntakeForm.jsx:98, :120, :123, :129, :188; ekran: start-project-desktop-full.png, scratchpad/sp/desktop-12-complete.png

**Sorun.** Sayfa boyunca mono, caps, slash'lı 'sistem' etiketleri: 'PROJECT INTAKE / SECURE TRANSMISSION', 'ALAZ / NEW ENGAGEMENT', 'STATUS: ACCEPTING NEW INQUIRIES ■' (beyaz kare status dot), 'TRANSMITTING...', 'The transmission could not be completed', 'PROJECT INQUIRY RECEIVED / 001' (her zaman 001 — sahte sıra numarası), 'ALAZ / 2026', her kartta '01 / TYPE'. 'SECURE TRANSMISSION' arkasında hiçbir şey olmayan bir iddia (düz HTTPS POST). Hero eyebrow'u 'LET'S BUILD SOMETHING THAT LASTS' = 'built to last' dolgusu; aside paragrafı 'No generic sales pitch. No unnecessary calls.' = 'NO BULLSHIT' kalıbının kibar versiyonu.

**Neden önemli.** Brief'te sayılan slop sinyallerinin neredeyse tam listesi tek sayfada. Gerçek stüdyolar form sayfasında insan gibi konuşur; 'transmission' bir SaaS landing / LLM kalıbı.

**Ne yapılmalı.** Tüm mono etiketleri ya sil ya da gerçek bilgiyle değiştir: üst satır → sol 'Start a project', sağ 'Replies within one business day' (gerçek taahhüt). asideStatus → gerçekse 'Next availability: November 2026', değilse kaldır. submittingCta → 'Sending…'; submitErrorFallback → "We couldn't send this. Email hello@alaz.pro and we'll pick it up."; completeEyebrow → gerçek referans no'su varsa 'Reference ALZ-26-0042', yoksa sil. formNotation ve kart eyebrow'larını ('01 / TYPE') sil. headingEyebrow'u sil. asideParagraph'ı olumsuzlama yerine süreçle yaz: 'Alaz reads every brief himself. You'll hear back within one business day and, if it fits, we'll set up a 30-minute call. No NDA needed to talk.'

> **Doğrulayıcı notu:** Metinlerin tamamı messages/en.json intake.* altında doğrulandı (sectionTopLeft 'PROJECT INTAKE / SECURE TRANSMISSION', asideStatus + :120'deki 6px beyaz kare, submittingCta 'TRANSMITTING...', completeEyebrow sabit '/ 001', formNotation 'ALAZ / 2026', typeIndexSuffix, headingEyebrow 'LET'S BUILD SOMETHING THAT LASTS', asideParagraph'taki çifte olumsuzlama). Düzeltme: fix'teki 'Alaz reads every brief himself' / 'Alaz, founder' kopyası uydurma bir persona — EN içerikte Alaz bir kişi değil, about sayfasında 'eski bir Türkçe kelime' olarak açıklanan marka adı; sitede hiçbir kurucu adı geçmiyor. Doğru fix: gerçek kurucunun adı/rolüyle yaz, kişi adı verilmeyecekse 'We read every brief ourselves' gibi kolektif ama somut bir cümle kullan. 'Next availability: November 2026' da yalnızca gerçekse.

### ÖNEMLİ

#### `start-project-05` — Mobilde hero overlay'i 'YOUR BRIEF / IN THREE PARTS' etiketini kesiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:92 (absolute overlay, h-[clamp(600px,50vw,780px)], z-index auto) ve :111 (grid wrapper'da relative/z-index yok); ekran: start-project-mobile-fold.png (y≈600), start-project-mobile-full.png, scratchpad/sp/mobile-clip-zoom.png

**Sorun.** Overlay div'i absolute konumlu olduğu için statik grid'in üstüne boyanıyor; gradient'in alt ucu solid #090909 olduğundan 600px'de keskin bir perde oluşuyor. Ölçüm: 390px'de overlay alt kenarı 600px, etiket üst kenarı 594px → etiketin üst yarısı kesik; 430px'de 26px, 600px genişlikte 50px örtüşme. Desktop'ta (≥768) örtüşme yok.

**Neden önemli.** İlk ekranda görünür bir render hatası; mobil kontrol Awwwards değerlendirmesinin yarısı.

**Ne yapılmalı.** Grid wrapper'a (:111) `relative z-[1]` ekle (hero bloğunda :106'da zaten yapılmış) ya da main'e `isolate`, overlay'e `-z-10`. Overlay yüksekliğini sabit clamp yerine hero bloğuna bağla: video'yu :106'daki hero div'inin içine al ve `inset-0` ile o bloğa sığdır. Alt gradient'i `#090909` yerine `var(--ink)` yap (body #0a0a0a, overlay #090909 — iki farklı siyah).

#### `start-project-06` — İngilizce kullanıcıya Türkçe otomatik e-posta; 'ALAZ System' gönderici; 'engineered to last' alıntısı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/lib/mailer.js:33 (fromAddress), :90-112 (confirmationHtml), :97 (başlık), :104 (alıntı), :119 ve :128 (subject'ler); src/app/api/contact/route.js:8 (locale alınmıyor); src/components/IntakeForm.jsx:61-74 (locale gönderilmiyor)

**Sorun.** EN sayfadan gönderen kişiye 'Talebiniz Bize Ulaştı.', 'Merhaba …', 'en geç 24 saat içinde' diye Türkçe bir e-posta gidiyor; subject 'Proje Talebiniz Alındı — ALAZ Engineering Studio'. İçinde 'Bilinçli tasarlandı. Uzun yıllar dayanacak şekilde inşa edildi.' alıntı kutusu var (= 'built with intent / engineered to last'). Gönderen adı 'ALAZ System'. Locale API'ye hiç iletilmiyor; plain-text alternatif yok.

**Neden önemli.** Lead formu doldurduktan saniyeler sonra ilk marka temasını e-postada yaşar; anlamadığı dilde, robot imzalı ve dolgu sloganlı bir mail bütün craft algısını siler.

**Ne yapılmalı.** POST body'ye `locale` ekle (useLocale()), mailer'da `templates[locale]` ile EN/TR ayrımı. EN subject: 'We got your brief — Alaz'; from: 'Alaz Studio <hello@alaz.pro>', kişi adıyla imza ('Alaz, founder'). İçerik 4 satır: ne aldık (proje adı, tür, bütçe aralığı), ne olacak (1 iş günü içinde cevap), kim cevaplayacak, düzeltme için reply. Alıntıyı sil. `text:` ile plain-text alternatif ekle; e-posta istemcilerinde güvenli, açık zeminli sade bir şablon düşün.

#### `start-project-07` — Adım geçişlerinde ve girişte sıfır hareket; site geneliyle tutarsız

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:124, :137, :167 ({step === n && …} koşullu render), :114-118 (aside göstergesi); karşılaştırma: src/app/[locale]/page.jsx'te 15, about'ta 14 data-reveal, bu sayfada 0

**Sorun.** Adımlar anında yer değiştiriyor (DOM swap), hero'da reveal yok, aside'daki aktif adım sadece renk değiştiriyor, '33% → 67%' sayısı zıplıyor, CONTINUE sadece hover'da 2px yukarı kayıyor. framer-motion zaten bağımlılıkta (Reveal.jsx) ama burada hiç kullanılmamış.

**Neden önemli.** Multi-step bir formun tek sahne anı adım geçişidir; Awwwards sayfalarında burası koreografidir. Hareketsizlik 'generic template' hissini pekiştirir.

**Ne yapılmalı.** `<AnimatePresence mode="wait" custom={direction}>` + `motion.div key={step}` ile yön duyarlı geçiş: çıkan panel opacity 1→0 / y 0→-12px 180ms, giren panel clip-path inset(0 0 100% 0)→inset(0) 420ms ease [0.22,1,0.36,1]; içindeki alanlara 40ms stagger. Başlık için satır bazlı mask reveal (overflow-hidden span, y '110%'→0). Aside'da aktif adımın yanında `layoutId="step-marker"` ile kayan 1px beyaz çizgi. Yüzde yerine form üstünde `scaleX` ile animasyonlu 1px ilerleme kuralı. Hepsi `useReducedMotion()` ile kapanabilir.

#### `start-project-08` — Adım değişince ne scroll ne focus yönetiliyor; mobilde başlık header'ın altında kalıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:54 (nextStep), :188 (prev), :40-53 (validate); ekran: scratchpad/sp/mobile-after-step-change.png

**Sorun.** Ölçüm: adım 2'nin altındaki CONTINUE'ya basınca sayfa kısalıyor, scroll pozisyonu kalıyor ve yeni adımın h2'si viewport'ta y=4px'te, yani 65px'lik sabit header'ın arkasında. Focus CONTINUE butonunda kalıyor (ekran okuyucu için adım değiştiğini anlamanın yolu yok). Validasyon hatasında ilk hatalı alana focus/scroll yok; hata mesajları input'a aria-describedby ile bağlı değil.

**Neden önemli.** Usability + erişilebilirlik; jüri klavyeyle gezdiğinde formun 'kör' olduğu anlaşılır.

**Ne yapılmalı.** Adım değişiminde Lenis instance'ını context'e koyup `lenis.scrollTo(formRef.current, { offset: -96 })`; h2'ye `tabIndex={-1}` + `focus({ preventScroll: true })`. Hatada ilk invalid alanın id'sine focus. Her hata mesajına `id={`${field}-error`}`, input'a `aria-describedby`. Form üstüne `aria-live="polite"` bölge: 'Step 2 of 3: Project context'.

#### `start-project-09` — Üç ayrı ilerleme göstergesi ve yanlış söyleyen yüzde

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:114-118 (aside listesi), :123 ('01 / 03 — …' + '{percent}% COMPLETE'); ekran: scratchpad/sp/desktop-08-step3.png (alanlar boşken '100% COMPLETE'), start-project-desktop-full.png (hiçbir şey seçilmeden '33% COMPLETE')

**Sorun.** Aynı bilgi üç kez: aside'daki 01/02/03 listesi, form üstündeki '01 / 03 — PROJECT TYPE' ve '33% COMPLETE'. Yüzde (step+1)/3 ile hesaplandığı için kullanıcı daha hiçbir şey yapmadan %33, son adımda alanlar boşken %100 yazıyor.

**Neden önemli.** Yüzde progress pattern'ı generic SaaS onboarding'in imzası; yanlış değer craft'ı ayrıca düşürüyor.

**Ne yapılmalı.** Tek gösterge bırak: desktop'ta aside listesi, mobilde tek satır 'Step 2 of 3 — The challenge'. Yüzdeyi tamamen kaldır; sayısal bir şey şartsa doldurulan zorunlu alan / toplam zorunlu alan üzerinden hesapla ve 1px çizgi olarak çiz.

#### `start-project-10` — Proje türü kartları: generic bento, yönlendirme ima eden ok, mobilde hizasız başlıklar, tek seçim

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:127-134; ekran: start-project-desktop-full.png, scratchpad/sp/mobile-02-step1.png ('Web App' ile 'Mobile App' başlıkları farklı yükseklikte), scratchpad/sp/desktop-04-step1-selected.png

**Sorun.** 2x2 koyu kutular, her birinde '01 / TYPE' mono eyebrow ve sağ üstte ArrowUpRight (dış link / yönlendirme anlamı taşır; oysa bu bir toggle). min-h 168px'in çoğu boşluk. Seçili durum yalnızca border + check ikonu. Mobilde `mt-auto` yüzünden açıklama satırı ikiye sarınca başlık yukarı kayıyor; aynı satırdaki iki kartın başlıkları hizasız. Tek seçim: web+mobil+backend birlikte isteyen (en sık senaryo) kullanıcı 'Something Else'e düşüyor.

**Neden önemli.** Bento kart + index eyebrow + köşe ikonu kombinasyonu brief'teki 'AI builder' görünümünün kendisi; hizalama hatası da craft eksikliği.

**Ne yapılmalı.** Kartları tipografik radio listesine çevir: tam genişlik satırlar, 1px üst/alt çizgi, solda 32-44px display başlık (Archivo), sağda 13px açıklama, en sağda 14px daire (seçilince dolu). Hover: satır zemini beyaz, yazı siyah (200ms). Çoklu seçim (`project_types: []`, role="checkbox"/aria-checked), 'Something else' seçilince tek satırlık 'What is it?' input'u aç. ArrowUpRight'ı kaldır. Mobilde zaten tek sütun olduğundan hizalama sorunu kendiliğinden gider.

#### `start-project-11` — Bütçe ve zaman planı native <select>'in içinde saklı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:153-164 (select'ler), :14-18 (custom chevron); messages/en.json intake.budgetOptions, timelineOptions; ekran: scratchpad/sp/desktop-05-step2.png

**Sorun.** Dört-beş seçenekli iki alan native select'e konmuş: açılan liste OS'in kendi stilinde (Windows/Android'de beyaz, köşeli) geliyor ve karanlık tasarımı kırıyor; seçenekler tıklanmadan görünmediği için bütçe aralıkları sayfada nitelik (qualification) sinyali olarak çalışmıyor; mobilde ekstra bir picker katmanı. Opsiyonel oldukları label'da belirtilmemiş (yalnızca company'de 'OPTIONAL' var).

**Neden önemli.** Native select sağlam ama 'tasarlanmamış' durur; Awwwards seviyesindeki formlar bu seçenekleri görünür chip/segment yapar.

**Ne yapılmalı.** İki alanı yatay chip grubuna çevir (role="radiogroup", 1px border, 12px mono, 44px yükseklik; seçili: beyaz zemin siyah yazı; framer-motion `layoutId` ile kayan seçim zemini). Bütçe: 'Under $25k · $25k–50k · $50k–100k · $100k+ · Not sure yet'. Timeline: 'ASAP · 1–3 months · 3–6 months · Just exploring'. Opsiyonel kalsın, label'a 'optional' eklensin.

#### `start-project-12` — Başarı ekranı çıkmaz sokak: taahhüt yok, sonraki adım yok, takvim yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:99-105; messages/en.json intake.completeMessageTemplate, completeCta, completeEyebrow; ekran: scratchpad/sp/desktop-12-complete.png, scratchpad/sp/mobile-12-complete.png

**Sorun.** Kutu içinde check ikonu, 'PROJECT INQUIRY RECEIVED / 001', dev 'REQUEST RECEIVED.', 'safely in our queue' ve tek buton 'RETURN TO HOME'. Meta description'da 'we reply within one business day' deniyor ama sayfada bu söz hiç geçmiyor. Gönderilen brief'in özeti yok, düzeltme yolu yok, takvim yok, 'bu arada şunu oku' yok.

**Neden önemli.** Form sonrası ekran lead'in en dikkatli olduğu an; üst stüdyolar burada güven ve ikinci aksiyonu (call booking) verir. 'Return to home' lead'i uğurlamak demek.

**Ne yapılmalı.** Yapı: 'Thanks, Dana. We'll reply within one business day.' (fit heading), altında gönderilen brief'in typeset özeti (Northwind dispatch platform · Web app · $50k–100k · 1–3 months) ve 'Something off? Reply to the confirmation email.' Sonra iki aksiyon: birincil 'Book a 30-min intro call' (Cal.com inline embed veya link, gerçek müsaitlik), ikincil seçilen türe göre ilgili case study linki (Web App → Market Hours). Check kutusunu ve '/ 001'i kaldır; gerçek referans no'su varsa göster.

#### `start-project-13` — API spam/suistimale açık: rate limit, honeypot, enum/uzunluk doğrulaması yok; otomatik cevapla herkese marka adına e-posta gönderilebilir

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/api/contact/route.js:5-49 (:19 brief ≥10 vs src/components/IntakeForm.jsx:45 ≥20); src/lib/mailer.js:119 ve :127-128 (subject/body'de kullanıcı metni, alıcı data.email); src/lib/db.js:50-55 (VARCHAR sınırları sunucuda kontrol edilmiyor)

**Sorun.** Açık POST endpoint; IP bazlı rate limit, honeypot, Turnstile/hCaptcha yok. Auto-reply `data.email`'e gidiyor ve body'de attacker'ın yazdığı `project_name` yer alıyor → bir bot bu endpoint'le herhangi bir adrese 'ALAZ' imzalı mesaj gönderebilir (phishing/spam vektörü; SMTP itibarını yakar). Sunucu project_type/budget/timeline'ı enum'a karşı kontrol etmiyor, uzunluk sınırı yok (161+ karakter name → MySQL hatası → 500). Client 20, server 10 karakter minimumu: iki ayrı kural. ip_address inquiry satırında saklanıyor; privacy policy yalnızca 'technical logs'tan bahsediyor.

**Neden önemli.** Gözle görülmez ama bir conversion sayfasının kalitesi arka ucuyla ölçülür; ilk spam dalgasında gerçek lead'ler gömülür, SMTP itibarı gider.

**Ne yapılmalı.** Paylaşılan zod şeması (zod zaten package.json'da): enum'lar, max uzunluklar (name 160, project_name 160, brief 5000, email 254); aynı şemayı istemcide react-hook-form resolver ile kullan. Honeypot alanı (`website`, CSS ile gizli; doluysa 200 dön ama işlem yapma) + `startedAt` zaman damgası (<3 sn ise reddet). Cloudflare Turnstile invisible widget. Rate limit: Upstash Ratelimit (10/saat/IP) ya da middleware'de basit LRU. Auto-reply subject'ini sabit tut ('We got your brief — Alaz'); body'de proje adını escape'li ve ≤80 karakter göster. ip_address'i ayrı bir log tablosuna yaz veya 30 günde anonimleştir.

> **Doğrulayıcı notu:** Doğrulanan: rate limit/honeypot/captcha yok; project_type/budget/timeline enum kontrolü yok (curl ile '<script>'/'whatever' değerleri 200 aldı); client 20 / server 10 karakter farkı (route.js:19 vs IntakeForm.jsx:45); auto-reply data.email'e gidiyor ve body'de kullanıcının project_name/name'i var (mailer.js:100-101) → üçüncü kişilere marka imzalı mail vektörü gerçek. Düzeltmeler: (1) auto-reply SUBJECT'i zaten sabit (mailer.js:128), kullanıcı metni yalnızca body'de — 'subject'i sabit tut' maddesi gereksiz, body'yi kısalt/escape'li tut yeterli; (2) 'name 161+ karakter → MySQL hatası → 500' yanlış: kolonlar VARCHAR(255) (db.js:50-57) ve saveInquiry hatayı yutup saved:false döndürdüğü için 300 karakterlik name ile bile API 200 dönüyor (probe G) — yani sorun 500 değil, 02'deki sessiz kayıp; (3) email input'unda maxLength hiç yok (:177). Privacy policy IP'yi 'technical logs' altında sayıyor, inquiry kaydıyla saklandığını söylemiyor — tespit doğru. zod şeması + honeypot + Turnstile + rate limit fix'i yerinde.

#### `start-project-14` — Alan tasarımı 'koyu admin paneli': kutulu input'lar, 14px, hepsi aynı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:12 (fieldInput), :141-183; ekran: scratchpad/sp/desktop-05-step2.png, scratchpad/sp/mobile-05-step2.png, scratchpad/sp/desktop-06-step2-errors.png

**Sorun.** Tüm alanlar #111 zemin + #393939 border kutular, 14px Inter, 17px padding; label'lar 12px mono caps. shadcn Input'u değil ama onun karanlık tema eşdeğeri — herhangi bir dashboard'dan ayırt edilemez. Focus yalnızca border beyazlaşıyor; textarea sabit 155px, auto-grow yok; hata rengi (#f2a6a6 pembe) monokrom sistemin dışındaki tek renk.

**Neden önemli.** Form alanları bu sayfanın %80'i; 'tasarlanmış' hissi ancak alanlar tipografik olursa gelir (Studio Freight, Unseen, Hello Monday'in form sayfaları).

**Ne yapılmalı.** Tipografik alanlar: zemin yok, yalnızca 1px alt çizgi (--line); input metni clamp(18px,1.6vw,26px) Inter -0.02em; label 12px mono üstte, focus'ta beyaza; focus'ta alt çizgi `scaleX(0→1)` beyaz 300ms (transform-origin left). Hata: alt çizgi + 11px mono mesaj; rengi sistemin içinden seç (ya tek brand kırmızısı belirleyip siteye yay ya da #e8e8e8 + 'Required —' prefix). Textarea: `field-sizing: content` + min 3 satır, JS fallback. Placeholder metinlerini koru (iyi yazılmış).

#### `start-project-15` — Hero bir ekran boyu yer kaplıyor; ilk soru fold'un altında; şablon hero tekrar ediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:106-110 (hero), :111 (mt-[100px]); ekran: start-project-desktop-fold.png (form başlığı y≈890'da kesik), start-project-mobile-fold.png

**Sorun.** 1440×900'de ilk soru ('WHAT ARE WE BUILDING?') viewport'un son pikselinde; mobilde ilk kart ~y=760'ta. Hero yapısı (mono eyebrow + 2 satır dev caps başlık + gri nokta + gri intro) sitenin diğer tüm sayfalarının hero'suyla birebir aynı şablon; 'START A PROJECT' zaten header butonunun ve sayfa title'ının tekrarı; sağ yarı boş siyah.

**Neden önemli.** Conversion sayfasında ilk etkileşime kadar her scroll kayıp; aynı hero'nun altıncı tekrarı 'template' hissi verir.

**Ne yapılmalı.** Hero'yu küçült ve formla birleştir: sol kolonda h1 clamp(44px,6vw,96px) tek satır 'What are you building?' (soru = adım 1 başlığı; çift başlık ortadan kalkar), hemen altında adım 1 seçenekleri fold içinde. Alternatif: 'mad-lib' tek ekran form (additions). mt-[100px] → 48px. Mobilde hero yüksekliği ≤45vh.

> **Doğrulayıcı notu:** Desktop doğru: start-project-desktop-fold.png'de 'WHAT ARE WE BUILDING?' h2'si y≈890'da kesik, ilk kart fold dışında; :111 mt-[100px]; hero yapısı (mono eyebrow + 2 satır caps + gri kare + gri intro) diğer sayfalarla aynı şablon. Düzeltme: mobilde ilk kartın üst kenarı ~760 değil, ölçümümde 956px (390x844 viewport'ta fold 844 → yine fold dışında, hatta daha kötü). Fix (h1'i adım 1 sorusu yap, seçenekleri fold içine al, mt 48px, mobilde hero ≤45vh) doğru.

#### `start-project-16` — Güven unsuru yok: kim okuyacak, ne zaman cevap gelecek, süreç ne?

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:112-121 (aside); messages/en.json intake.asideParagraph, asideStatus

**Sorun.** Aside'da yalnızca adım listesi, bir olumsuzlama paragrafı ve sahte status satırı var. Sayfada hiçbir yerde: cevap süresi (meta'da var, sayfada yok), cevaplayacak kişi (isim/rol), sürecin adımları (cevap → call → teklif), alternatif kanal (e-posta/telefon), müsaitlik, referans/case linki.

**Neden önemli.** Bütçe aralığı soran bir formda karşı tarafın kim olduğunu göstermemek dönüşümü düşürür; üst stüdyoların form sayfaları bu bilgiyi aside'a koyar.

**Ne yapılmalı.** Aside'ı 'what happens next' bloğuna çevir: (1) 'Alaz reads it — usually same day', (2) 'Reply within one business day', (3) '30-min call, then a written proposal within a week'. Altına kişi: küçük gerçek portre (AI değil) + 'Alaz K., founder' + 'hello@alaz.pro'. İsteğe bağlı: İzmir / New York yerel saatleri (gerçek veri) ve 'Next start: November 2026'. 'Prefer a call? Book 30 min' Cal.com linki.

> **Doğrulayıcı notu:** Aside içeriği (:112-121) doğrulandı: adım listesi + olumsuzlama paragrafı + dekoratif STATUS satırı; sayfada cevap süresi, kişi, süreç, alternatif kanal yok (footer'daki hello@alaz.pro hariç). Düzeltme: 'Alaz K., founder' + portre önerisi EN içerikte var olmayan bir kişiyi varsayıyor (bkz. 04); gerçek kurucu/ekip adını ve gerçek bir fotoğrafı kullan, yoksa kişi satırını atla ve 'what happens next' + e-posta + takvim linkiyle yetin. Geri kalan fix doğru.

### İNCE İŞÇİLİK

#### `start-project-17` — Header'daki 'START A PROJECT' butonu kendi sayfasında da duruyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:38; ekran: start-project-desktop-fold.png (sağ üst), start-project-mobile-fold.png

**Sorun.** Kullanıcı zaten formdayken header'da aynı etiketli beyaz CTA parlıyor; tıklayınca sayfa yeniden yükleniyor ve form state'i siliniyor.

**Neden önemli.** Kendine link veren CTA dikkatsizlik sinyali; mobilde en değerli header alanını israf ediyor.

**Ne yapılmalı.** usePathname ile /start-project'te CTA'yı 'hello@alaz.pro' (mailto) veya 'Book a call'a çevir; ya da aria-current="page" + nötr stil (yalnızca border, dolgu yok).

> **Doğrulayıcı notu:** Header.jsx:38 koşulsuz /start-project linki, aria-current yok — bu kısım doğru ve kendi sayfasında parlayan CTA gerçekten dikkatsizlik. Ancak 'tıklayınca sayfa yeniden yükleniyor ve form state'i siliniyor' iddiası YANLIŞ: probe C'de adım 2'de metin yazıp header CTA'ya tıkladım, soft navigation sonrası h2 hâlâ 'DEFINE THE CHALLENGE.' ve project_name değeri korunuyor. Düzeltilmiş ifade: CTA kendine link veriyor ve pasif/nötr duruma geçmiyor; veri kaybı yok. usePathname ile 'hello@alaz.pro' / 'Book a call'a çevirme fix'i yine geçerli.

#### `start-project-18` — Gönder butonunda 'power' ikonu; lucide ok ikonları çoğalmış

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:5 (import), :189 (CirclePower + ArrowRight aynı butonda), :104 ve :132 (ArrowUpRight)

**Sorun.** 'SEND INQUIRY' butonunda solda CirclePower (güç düğmesi) sağda ArrowRight; bir butonda iki ikon, biri anlamsız. Sayfada beş farklı lucide ikonu (ArrowLeft/Right/UpRight, Check, CirclePower).

**Neden önemli.** Lucide default set + rastgele ikon seçimi brief'teki slop listesinde.

**Ne yapılmalı.** CirclePower'ı sil. Tek ok dili belirle: brand'e ait 1px, 12x12 özel SVG ok (→ ve ↗) ve her yerde onu kullan; buton metni 'Send brief'. Check için de aynı stroke.

#### `start-project-19` — Proje türü hatası grid'e yapışık; hata tipografisi sistem dışı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:135 (margin yok), :143/:148/:173/:178 (small.text-[#f2a6a6]); ekran: scratchpad/sp/desktop-03-step1-error.png

**Sorun.** 'Select a project type to continue.' kartların hemen altına 0px boşlukla geliyor; diğer hatalar 10px gap ile. Pembe (#f2a6a6) 12px Inter — sayfanın geri kalanı mono/caps etiket dilinde.

**Neden önemli.** Küçük ama jürinin gördüğü türden tutarsızlık.

**Ne yapılmalı.** Hata <p>'ye mt-[14px]; tüm hata mesajlarını tek bileşene al (FieldError), 11px mono, tracking .06em; renk kararını start-project-14'teki sisteme göre ver.

#### `start-project-20` — Form state'i yenilemede/geri tuşunda kayboluyor; adımlar URL'de yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:30-35 (useState), :54, :188

**Sorun.** Üç adımlık formda yanlışlıkla reload veya tarayıcı Back = her şey gitti (Back sayfadan çıkarıyor, önceki adıma gitmiyor). Taslak saklanmıyor, dirty form için beforeunload uyarısı yok; başarı durumu URL'de temsil edilmiyor (analytics event bağlanamaz).

**Neden önemli.** Brief yazmak 5-10 dakika; kaybolan metin en büyük terk nedenlerinden.

**Ne yapılmalı.** `form` ve `step`'i sessionStorage'a yaz (300ms debounce), mount'ta geri yükle, submit'te temizle. `history.pushState({step}, '', '?step=2')` ve popstate'te setStep. `beforeunload` ile dirty uyarısı. Başarı sonrası `?sent=1`.

#### `start-project-21` — 'Project name' alanında Enter gizli submit tetikliyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:122 (form onSubmit), :142 (adım 2'de tek text input; submit butonu DOM'da yok)

**Sorun.** Adım 2'de DOM'da submit butonu olmadığı ve tek bir text input bulunduğu için Enter 'implicit submission' yapıyor → submit() → validate(2) → name/email hataları state'e yazılıyor (ekranda görünmüyor ama start-project-01 düzeltilse bile adım 3'e taşınır). Enter'ın beklenen davranışı (ilerle) gerçekleşmiyor.

**Neden önemli.** Klavye kullanıcıları için beklenmeyen davranış; 01 ile birlikte düzeltilmezse hata başka yoldan geri gelir.

**Ne yapılmalı.** submit() başında `if (step < 2) { nextStep(); return; }`; ya da input'lara onKeyDown Enter → nextStep. validate() yalnızca mevcut adımın alanlarını yazsın.

> **Doğrulayıcı notu:** Probe B: adım 2'de #project_name içinde Enter → 'submit' event'i ateşleniyor (DOM'da submit butonu yok, tek text input var → implicit submission), submit() → validate(2) çalışıyor, adım ilerlemiyor, ekranda hata görünmüyor. Düzeltme: 'start-project-01 düzeltilse bile adım 3'e taşınır' iddiası yanlış — validate() her çağrıda `setErrors(next)` ile nesneyi komple değiştirdiği için CONTINUE'daki validate(1) stale name/email hatalarını siler; adım 3'te görülen hatalar 01'den geliyor. Kalan gerçek sorun: Enter beklenen 'ilerle' davranışını yapmıyor. Fix (submit başında `if (step < 2) return nextStep()`) doğru; mobil klavye için input'lara enterKeyHint="next"/"send" de eklenmeli.

#### `start-project-22` — Başarı ekranında window.scrollTo smooth Lenis'le çakışıyor; override'lı class çorbası

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:36-38 (window.scrollTo smooth), :99 (max-w-[950px] … !max-w-none, pt-[…] pb-[…] … !py-[…])

**Sorun.** globals.css'te 'native smooth scroll Lenis'le kavga eder' notu varken complete'te `window.scrollTo({behavior:'smooth'})` kullanılmış. 99. satırda aynı elemanda max-w-[950px] ve !max-w-none, pt/pb ve !py birlikte — ölü class'lar ve !important override'ları.

**Neden önemli.** Çalışıyor gibi görünse de ara karelerde titreme riski; class çorbası bakımı zorlaştırır ve kod kalitesi sinyali.

**Ne yapılmalı.** Lenis instance'ını context/global'e koy, `lenis.scrollTo(0, { duration: 0.8 })`; 99'daki wrapper'ı sade `flex-1 w-full flex flex-col items-center justify-center text-center py-[clamp(48px,8vh,110px)]` yap.

#### `start-project-23` — Mobilde aside adım etiketleri sıkışık; adım başlıklarında tutarsız noktalama ve bağıran caps

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:114-117 (mobile:grid-cols-3), :125/:138/:168 (h2'ler); messages/en.json intake.steps, step0/1/2.heading; ekran: start-project-mobile-fold.png (y≈660-690)

**Sorun.** 390px'de 'THE CHALLENGE' ile 'YOUR DETAILS' arasında boşluk yok, 12px bold gri. Adım başlıkları 'WHAT ARE WE BUILDING?' / 'DEFINE THE CHALLENGE.' / 'WHO'S ON THE OTHER END?' — soru, nokta, soru; h1'deki gri kare cihazı burada yok, düz nokta var.

**Neden önemli.** Küçük tutarsızlıklar; caps bağıran form başlıkları 'brutalist template' tonunu artırıyor.

**Ne yapılmalı.** Mobilde aside listesini tek satır 'Step 1 of 3 · Scope'a indir. Başlıkları sentence-case soru olarak yeniden yaz: 'What are we building?', 'What's the problem?', 'Where should we reply?'; noktalamayı tutarlı tut; gri kare cihazını yalnızca h1'de bırak.

#### `start-project-missed-1` — Select placeholder'ı beyaz: boş alan dolu alan gibi görünüyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:153-164 (select'lere fieldInput → text-white), :154/:161 (`<option value="">` placeholder); ekran: scratchpad/sp/desktop-05-step2.png ('Select a timeframe' / 'Select a range' beyaz, 'A working title is fine' gri)

**Sorun.** Ölçüm: select metni rgb(255,255,255), input ::placeholder rgb(111,114,119). Native select'te placeholder option'ı normal değer rengiyle render edildiği için 'Select a timeframe' bir seçimmiş gibi beyaz duruyor; aynı formdaki input placeholder'ları griyken.

**Neden önemli.** Aynı satırda iki farklı 'boş' durumu — jürinin ilk bakışta gördüğü tutarsızlık; kullanıcı da alanın dolu olduğunu sanabilir.

**Ne yapılmalı.** Chip grubuna geçilmeyecekse: `className={cn(fieldInput, 'appearance-none', !form.timeline && 'text-[#6f7277]')}` (budget için aynı), option'lara `className="text-white"`; placeholder option'a `hidden` ekleyerek listede de görünmesini engelle. Chip'e geçilirse (11) sorun kendiliğinden kalkar.

#### `start-project-missed-2` — DB'ye ve e-postaya stabil id değil, çevrilebilir ekran etiketi yazılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:128 (`update('project_type', type.name)`), :155 ve :162 (`<option key={option}>{option}</option>` → value = label metni); src/app/api/contact/route.js:28-31; src/lib/db.js:48-57

**Sorun.** project_type/budget/timeline kolonlarına 'Web App', '$25k–$50k', 'Exploring options' gibi UI metinleri yazılıyor. Herhangi bir copy düzeltmesi (örn. 'Systems & Backend' → 'Backend') veya TR locale'den gelen kayıt aynı seçeneği farklı string'lerle kaydeder; sunucuda enum doğrulaması da bu yüzden yapılamıyor (13'teki zod fix'i için ön koşul).

**Neden önemli.** Lead verisi raporlanamaz hale gelir; e-posta şablonları ve ileride CRM entegrasyonu etikete bağımlı kalır.

**Ne yapılmalı.** en.json'da seçenekleri `{ id, name, detail }` / `{ id, label }` yapısına çevir (ids: web, mobile, backend, other; under-25k, 25-50k, 50-100k, 100k-plus, tbd; asap, 1-3m, 3-6m, exploring). Formda id'yi sakla ve gönder; route.js'de zod `z.enum([...])` ile doğrula; e-posta ve başarı ekranı için ortak `labels[locale][id]` haritası (src/lib/intake-options.js) kullan.

#### `start-project-missed-3` — Gönderim ardışık üç ağ turu bekliyor: DB → stüdyo maili → otomatik cevap

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/api/contact/route.js:40-43 (iki ardışık await); src/lib/mailer.js:115-130 (iki ardışık sendMail); src/components/IntakeForm.jsx:189 ('TRANSMITTING...' bu sürede dönüyor)

**Sorun.** Cevap dönmeden önce MySQL insert, SMTP ile stüdyo bildirimi ve kullanıcıya auto-reply sırayla bekleniyor. Hostinger SMTP'de her sendMail tipik 1-3 sn; kullanıcı conversion butonunda 3-6 sn devre dışı buton izliyor. Auto-reply'ın sonucu zaten kullanıcıya yansıtılmıyor (mailer.js:131-133 yutuyor), yani beklemenin karşılığı yok.

**Neden önemli.** Formun son anındaki gecikme terk/çift tıklama riskini artırır; Awwwards seviyesinde 'Send' anı anlık hissedilmeli.

**Ne yapılmalı.** route.js'de `const [dbResult, mailResult] = await Promise.allSettled([saveInquiry(data), sendStudioNotification(data)])` ile paralel çalıştır; auto-reply'ı `import { after } from 'next/server'` (Next 15.5'te stabil) ile `after(() => sendClientConfirmation(data, locale))` olarak cevaptan sonraya al. 02'deki 'ikisi de başarısızsa 503' kuralını allSettled sonuçları üzerinden uygula. İstemcide buton metnini en az 600ms 'Sending…' göster, sonra 'Sent'.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Tek ekran 'mad-lib' tipografik form (hero = form)

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Studio Freight (eski contact), Unseen Studio, Hello Monday'in 'Say hi' formu; Typeform'un tersi: sayfa değil cümle

Hero'yu ve üç adımı tek bir tipografik cümleye çevir: "Hi, I'm [name] from [company]. We're building a [web app ▾ / mobile app / backend / something else] called [project name]. The problem: [textarea]. Budget around [chip grubu], ideally [timeline chip]. Reach me at [email]." Her boşluk clamp(24px,3vw,48px) display tipte, alt çizgili, `field-sizing: content` (veya gizli span ile genişlik ölçümü) ile metin kadar genişleyen inline input; chip seçimleri framer-motion layoutId ile. Tek 'Send brief' butonu, gönderince cümle 'typeset brief kartı'na dönüşüp (layout animation) başarı ekranına taşınır. Mevcut üç adımlı yapı mobilde fallback olarak kalabilir (≤760px'de adımlara böl).

### Gerçek müsaitlikle takvim: Cal.com embed

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basement Studio, Rally Interactive, çoğu üst stüdyonun 'book a call' akışı

Başarı ekranına ve aside'a `@calcom/embed-react` ile inline 30-dk 'Intro call' takvimi; tema koyu, brand fontu CSS değişkenleriyle. Form verisini (name, email, project) `prefill` ile takvime geçir ki ikinci kez yazmasın. 'Skip the form, just book a call' linki hero'da ikincil aksiyon olarak dursun. Cal.com webhook'u ile randevu DB'deki inquiry satırına bağlanır.

### Canlı brief önizlemesi (aside'ın görevi)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive'in proje formu (özet paneli), Linear'ın onboarding özet kartı

Kullanıcı yazdıkça aside sabit bir 'brief kartı'na dönüşür: proje adı display başlık olarak, seçilen tür/bütçe/zaman mono satırlar olarak, brief'in ilk 140 karakteri gövde olarak. Alan doldukça satırlar mask-reveal ile açılır (framer-motion layout + AnimatePresence). Gönderimde kart 'zarf gibi' küçülüp başarı ekranında yeniden açılır. Kullanıcı 'bir şey üretiyorum' hissi alır; stüdyo da formun ciddiye alındığını gösterir.

### Adım/alan mikro-etkileşim seti

- **Etki:** orta · **Efor:** orta · **Referans:** Obys Agency form sayfası, Lusion'ın buton morph'ları

(1) Alan focus'unda alt çizgi scaleX 0→1 beyaz 300ms, label 12px→11px ve beyaza; (2) chip seçiminde layoutId ile kayan zemin; (3) 'Send brief' butonu gönderimde genişliğini koruyarak metni 'Sending…' → 'Sent' şeklinde dikey mask ile değiştirir, sonunda 1px beyaz çizgi butonun altında ilerler (gerçek fetch süresine bağlı değil, min 600ms); (4) başlık split-text satır reveal'ı; (5) hata mesajı 4px yukarıdan opacity ile gelir; hepsi `useReducedMotion` ile kapanır. GSAP yerine mevcut framer-motion yeterli.

### Dosya eki (brief / deck / RFP)

- **Etki:** orta · **Efor:** orta · **Referans:** Instrument, Work & Co intake formları

Adım 2'ye opsiyonel 'Attach a brief or deck (PDF, ≤10MB)' alanı: tipografik dropzone (kesikli alt çizgi, sürüklenince satır beyaza). Yükleme: route handler'da multipart → Vercel Blob veya S3 presigned URL; DB'ye `attachment_url` kolonu; stüdyo e-postasına link. Virus/boyut/mime kontrolü sunucuda (`file.type === 'application/pdf'`, 10MB).

### Referans numarası ve locale'e göre iki dilli transactional e-posta

- **Etki:** orta · **Efor:** küçük · **Referans:** Linear, Vercel'in transactional e-postaları: kısa, kişisel, tek aksiyon

DB insertId'den 'ALZ-26-0042' formatında referans üret; başarı ekranında, kullanıcı e-postasında ve stüdyo bildiriminde aynı numara. E-posta şablonlarını `src/lib/email-templates/{en,tr}.js` olarak ayır, plain-text + HTML, 'Alaz <hello@alaz.pro>' gönderici, 4 satırlık içerik + 'reply to correct anything'. React Email (`@react-email/components`) ile şablonları JSX'te yazıp nodemailer'a render etmek en temizi.

### Sessizce kaybolmayan lead: ikinci bildirim kanalı + sağlık kontrolü

- **Etki:** yüksek · **Efor:** küçük

route.js'de DB+mail sonucu ne olursa olsun Slack Incoming Webhook veya Telegram Bot API'ye 1 POST (5 satır kod, ücretsiz). Her ikisi de başarısızsa 503 dön ve istemci mailto fallback göstersin. Haftalık bir cron (Vercel Cron veya Hostinger cron) test gönderimi yapıp SMTP/DB'nin ayakta olduğunu doğrulasın. Böylece 'REQUEST RECEIVED' iddiası gerçeğe dayanır.

### Aside'da gerçek veri: yerel saatler ve müsaitlik

- **Etki:** düşük · **Efor:** küçük · **Referans:** Locomotive, Resn footer saatleri

Dekoratif 'STATUS' satırı yerine `Intl.DateTimeFormat` ile İzmir ve New York canlı saatleri (saniye yok, dakikada bir güncelle), yanında 'Replies within one business day' ve gerçekse 'Next start: November 2026'. Saat çalışma saatleri dışındaysa 'We're offline — replies resume Monday 09:00 TRT' gibi dürüst bir satır. Veri gerçek olduğu için 'status pill' klişesine düşmez.
