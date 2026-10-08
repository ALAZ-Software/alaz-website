# Ana sayfa (hero, marquee, validation, capabilities, selected works, start CTA)

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 32 (7 kritik · 12 önemli · 13 ince işçilik) · **Korunacaklar:** 9 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Ana sayfanın iskeleti (tek gutter token'ı, hairline çizgiler, Archivo 900 wordmark, fit() ile taşmayan başlıklar, Lenis) sağlam; ama üzerine giydirilen içerik katmanı neredeyse eksiksiz bir "AI slop" kataloğu: SYSTEM_ACTIVE pill'i, "NO BULLSHIT. JUST ACTION.", POWERED BY GOOGLE/CLAUDE rozetleri, iki buzzword marquee'si, baş harfli anonim testimonial'lar, stock gezegen ve sunucu odası videoları, "COMMAND SEQUENCE READY / START SEQUENCE" + yanıp sönen yeşil nokta + köşe braketleri. Sayfanın hiçbir bölümünde bir fikir yok; dört bölüm de aynı şablon bloğu (eyebrow çizgisi → 151px caps başlık + gri kare → lead → 3 sütunlu grid) ve 1440px'de üç h2 birebir aynı boyda olduğu için hiyerarşi yok. Anlatı sırası da ters: yeni kurulmuş bir stüdyonun tek kanıtı olan işler, hiçbir case study'ye bağlanmayan testimonial'ların ve hizmet kartlarının arkasına, 2400px aşağıya gömülmüş. Hareket tarafında tek bir imza yok: her şey 0.6s opacity+14px fade, hero'nun giriş koreografisi yok, "mask" denen reveal gerçek mask değil. Awwwards seviyesine giden yol: terminal/sci-fi dilini ve stock görselleri tamamen söküp, iki gerçek ürünü (Vocabulary, Market Hours) sayfanın merkezine koymak, hero'ya sahip olunan bir görsel sistem (shader/kinetik tipografi veya gerçek ürün görüntüsü) vermek ve hareket dilini yeniden yazmak.

## Korunması gerekenler

- Archivo 900 wordmark: `leading-[.8]`, `-ml-[.044em]` optik hizalama ve gri kare nokta — tek başına güçlü bir marka işareti; yalnızca wordmark'ta kalırsa (home-10) sitenin imzası olur.
- `src/lib/fit.js` + `.fit` sınıfı: her başlık için en geniş kelimenin em genişliğini hesaplayıp font-size'ı kolona kilitleyen, iki dilde de taşmayı önleyen gerçek bir mühendislik çözümü. Koruyun; başlıklar küçülse bile sistem geçerli.
- Tek gutter token'ı (`--gutter`), hairline çizgiler (`border-line`) ve 72px'e kadar ölçeklenen tutarlı sayfa kenarı: editorial grid'in iskeleti doğru kurulmuş.
- Hareket altyapısı sorumlu: reveal'lar JS olmadan içerik görünür kalacak şekilde `.reveal-ready` ile kapılanmış, `prefers-reduced-motion` ve `saveData` kontrolleri var, BackgroundVideo IntersectionObserver ile tembel yükleniyor, marquee'ler `aria-hidden`. Bu disiplin Awwwards 'usability' puanında işe yarar.
- Lenis ayarı (1.2s, expo-out easing, anchors offset) zevkli ve abartısız; Awwwards sitelerinin çoğundan daha ölçülü.
- İki ürün kapağı (sarı Vocabulary, yeşil HUD Market Hours) sitedeki tek gerçek ve renkli varlık; monokrom sayfada bilinçli bir renk patlaması olarak çalışıyor. Bunlar büyütülmeli, gizlenmemeli.
- Monokrom palet disiplini (tek istisna emerald nokta, o da gidiyor) ve 0px radius: doğru bir kısıt; sorun kısıtın içinde fikir olmaması.
- 'EXPLORE SERVICES' linkindeki gap 18→26px hover'ı gibi küçük mikro-etkileşimler ve `active:scale-[0.98]` dokunuşları: doğru yönde, sadece daha fazlası ve daha karakterlisi gerekiyor.
- Services açıklamalarının sesi ('admin panels that load fast and stay easy to change as the business grows') somut ve dürüst; hero kopyası bu sese çekilmeli.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `home-01` — Terminal/sci-fi kelime sistemi sayfanın her yerinde

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:42 (SYSTEM_ACTIVE), :77 (01 / EXTERNAL SIGNAL · TESTIMONIALS // 03), :86 (// PROJECT MANAGER), :100-101 (// WEB / SAAS), :130 (03 / THE OUTPUT), :188-202 (04 / INITIATE, COMMAND SEQUENCE READY, START SEQUENCE); messages/en.json home.hero.status, home.validation.eyebrow*, home.selected.eyebrowLeft, home.start.*; home-desktop-fold.png, home-desktop-full.png

**Sorun.** Sayfa bir yazılım stüdyosunu değil, bir uzay gemisi HUD'ını taklit ediyor: SYSTEM_ACTIVE durum pill'i (beyaz kare + mono), 'EXTERNAL SIGNAL', 'THE OUTPUT', 'INITIATE', 'COMMAND SEQUENCE READY', 'START SEQUENCE' ve her etiketin önündeki kod-yorum tarzı '//' öneki. Bu kelimeler gerçek bir bilgi taşımıyor; ne yaptığınızı, kime yaptığınızı, nerede olduğunuzu söylemiyor.

**Neden önemli.** Bu, LLM üretimi 'dark brutalist' sitelerin en tanınan imzası; Awwwards jürisi ve deneyimli bir müşteri ilk 3 saniyede şablon kokusunu alır. Ayrıca header'daki 'START A PROJECT' ile 'START SEQUENCE' aynı aksiyon için iki farklı dil kullanıyor, bu da marka sesinin kontrol edilmediğini gösteriyor.

**Ne yapılmalı.** Tüm bu string'leri düz, gerçek bilgi taşıyan İngilizce ile değiştirin. SYSTEM_ACTIVE satırı → tamamen kaldırın ya da gerçek bir veri koyun ('İzmir 14:42 · New York 07:42' JS saati, veya 'Taking projects for Q1 2027'). Eyebrow'lar → 'Work', 'Services', 'Clients', 'Contact' (numara isteniyorsa tek format: 01–04). '//' öneklerini silin (page.jsx:86, :101, :157). Badge (:190) ve 'START SEQUENCE' (:202) → kaldırın; buton etiketi header ile aynı olsun: 'Start a project'. en.json'da home.start.badge, home.hero.status anahtarlarını komple silin.

#### `home-02` — Hero ve alt bant kopyası slogan dolgusu

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:48-49, :54, :206; messages/en.json home.hero.taglineTop/taglineBottom/intro/bottomNote, home.start.bottomNote, home.start.paragraph, home.validation.lead, home.signal.b; home-desktop-fold.png

**Sorun.** 'NO BULLSHIT. JUST ACTION.', 'Built with intent. Engineered to last.', 'PRECISION IS THE STANDARD. NOT THE GOAL.', 'DESIGNED WITH INTENT / BUILT TO ENDURE', 'ENGINEERING WITHOUT COMPROMISE', 'The strongest systems earn their reputation in production.', 'The next great system starts with a conversation.' — yedi ayrı slogan, hiçbiri somut bir iddia içermiyor. Hero'da gerçekten ne yapıldığını söyleyen tek cümle 13px'lik intro paragrafının ilk yarısı.

**Neden önemli.** Bu cümleler tam olarak brief'teki 'engineered to last / built with intent' filler listesinin kendisi. Bir stüdyonun hero'su 'ne, kime, nasıl' sorusuna cevap vermeli; burada tavır var, içerik yok. Anonim 'no bullshit' iddiası, altında anonim testimonial'lar varken ters tepiyor.

**Ne yapılmalı.** Tagline'ı somut bir claim'e çevirin ve tek cümle olsun, sentence case: ör. 'Web and mobile products, and the systems behind them.' veya 'One team for the web app, the mobile app and the backend.' Intro'daki 'Built with intent. Engineered to last.' cümlesini silin; yerine 'Based in İzmir and New York. Two products shipped in 2026.' gibi doğrulanabilir bilgi koyun. Alt bantlardaki sloganları (:54, :206) kaldırıp gerçek meta ile doldurun (e-posta, saat, konum). Marquee kopyası (signal.a/b, ticker) home-04 ile birlikte gidiyor. Services açıklamalarındaki ses ('admin panels that load fast and stay easy to change') zaten doğru; hero'yu o sese çekin.

> **Doğrulayıcı notu:** Yedi slogan sayımı doğru (taglineTop/Bottom, intro'nun ikinci cümlesi, bottomNote, start.bottomNote, signal.b, validation.lead, start.paragraph). Intro 13px (ölçüm: :49 fontSize 13px, 290px genişlik) ve sayfada ne yapıldığını söyleyen tek cümle olduğu doğru. Düzeltme: fix'teki örnek kopya 'Two products shipped in 2026' yanlış olur — en.json projects[1].summary Market Hours mobilin 'coming soon' olduğunu söylüyor; 'One product live, a second on the way' veya 'Vocabulary on iOS/Android, Market Hours live on the web' gibi doğrulanabilir bir cümle kullanın. Kalanı aynen geçerli.

#### `home-03` — POWERED BY GOOGLE / CLAUDE rozetleri hero'da

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:51; src/components/PoweredBy.jsx:4-20; home-desktop-fold.png (y≈856), home-mobile-fold.png (iki satır, y≈671-705)

**Sorun.** Hero'nun en değerli bölgesinde, tagline'ın hemen altında, Google ve Claude logolarıyla 'POWERED BY' satırı. Mobilde iki satır kaplıyor ve fold'un %8'ini yiyor.

**Neden önemli.** Üç sorun birden: (1) brief'in doğrudan slop listesinde; (2) bir yazılım stüdyosunu 'AI wrapper' olarak konumlandırıyor, yani müşteriye 'işi aslında bunlar yapıyor' mesajı veriyor; (3) Google'ın markasını 'powered by' bağlamında kullanmak resmi bir ortaklık ima ediyor, marka kullanım kurallarına aykırı. Awwwards kriterlerinde 'content' puanını direkt düşürür.

**Ne yapılmalı.** PoweredBy bileşenini hero'dan (ve about sayfasından, about/page.jsx:45) kaldırın. Araç şeffaflığı isteniyorsa About sayfasında düz bir cümle: 'We build with Next.js, Flutter, Google Cloud and use Claude in our workflow.' Logo yok, 'powered by' yok. Hero'daki o alana gerçek bir CTA (e-posta linki veya 'See the work ↓') koyun.

#### `home-04` — İki buzzword marquee'si

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:59-74 (signal marquee) ve :107-126 (ticker); tailwind.config.js keyframes signal-marquee/ticker; messages/en.json home.signal.a/b, home.ticker[]; scratchpad/home/marquee-0-desktop.png, marquee-1-desktop.png

**Sorun.** Aynı sayfada iki kayan bant: 'ALAZ / SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE' ve 'TRUSTED PARTNERSHIP ✳ CLIENT SUCCESS ✳ ARCHITECTURAL INTEGRITY ✳ UNCOMPROMISING PRECISION'. İkincisi saf buzzword çorbası. Her iki bant da sabit hızda linear (28s/30s), scroll'dan bağımsız, hover'da durmuyor; ilk bantta içerik her yarıda 4 kez tekrarlanmış (16 span), yani DOM gereksiz şişmiş. Metin rengi #73777d/#111 üzerinde (kontrast ~3:1) — okunmasın diye soluklaştırılmış ama yine de orada.

**Neden önemli.** Marquee'ler kendisi değil içeriği sorundur; burada içerik 'client success' gibi kelimeler olunca template sinyali en yükseğe çıkıyor. Awwwards seviyesindeki sitelerde marquee ya gerçek isimler (müşteri/ürün) taşır ya da scroll hızına bağlı bir fizik hissi verir.

**Ne yapılmalı.** İkisini de silin. Bir bant mutlaka isteniyorsa tek bant, gerçek içerikle: proje adları ve yılları ('Vocabulary — iOS/Android 2026 · Market Hours — Web 2026'), stack, ya da canlı bir satır. Teknik: tek kopya + `aria-hidden` klon, hız Lenis velocity'sinden gelsin (lenis.on('scroll', ({velocity}) => speed = base + Math.abs(velocity)*k), GSAP ticker ile x güncelle), hover'da yavaşlasın. Tailwind keyframes'leri (signal-marquee, ticker) ve en.json home.signal / home.ticker anahtarlarını temizleyin.

#### `home-05` — Start CTA: badge + yanıp sönen yeşil nokta + köşe braketleri + görünmez stock video

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:184-207 (section#contact), :190 (badge), :193-204 (buton), :194-197 (köşe braketleri), :198-201 (animate-ping emerald), :185-186 (BackgroundVideo + .76/.68 overlay); public/videos/start-a-project-hero.mp4 (3.4 MB); scratchpad/home/contact-desktop.png, contact-hover-desktop.png, sim-contact-desktop.png

**Sorun.** Bölüm, brief'teki slop listesini madde madde uyguluyor: '■ COMMAND SEQUENCE READY' çerçeveli pill, 'START SEQUENCE' butonu, dört köşede 7px L-braket, sayfadaki tek renkli öğe olan animate-ping emerald nokta. Arkadaki sunucu odası koridoru videosu .62 opacity + %76 siyah overlay altında pratikte görünmüyor (contact-desktop.png düz siyah; simülasyonda bile ancak seçiliyor) ama 3.4 MB indiriliyor. Üstelik sayfadaki tek ortalanmış blok burası, 180px başlıktan 14px paragrafa hiyerarşi uçurumu var ve eyebrow rengi (#bababa) diğer bölümlerden (text-dim) farklı.

**Neden önemli.** HUD/terminal estetiği + pulsing dot + köşe braketi kombinasyonu AI builder çıktısının en klişe bitişi. Header'da zaten beyaz 'START A PROJECT' butonu varken burada 'START SEQUENCE' yazması marka sesini ikiye bölüyor. Görünmeyen video ise sadece performans cezası.

**Ne yapılmalı.** Bölümü tipografik, sade bir finale çevirin: badge, nokta, braketler, video ve overlay'leri silin (BackgroundVideo import'u kalkar). Sol hizalı grid'e dönün. İçerik: küçük eyebrow 'Contact', büyük sentence-case başlık ('Have a product in mind?' veya 'Let's build it.'), altında display boyutunda (clamp(32px,5vw,80px)) bir mailto linki 'hello@alaz.pro' hover'da harf-roll animasyonuyla, yanında header ile aynı stilde 'Start a project' butonu. Paragrafı 18-20px yapın. İsteğe bağlı: footer ile birleştirip tek büyük kapanış bloğu yapın (ALAZ wordmark zaten footer'da).

#### `home-06` — Baş harfli, şirketsiz, hiçbir işe bağlanmayan testimonial'lar

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:76-90 (section#validation); messages/en.json testimonials[] (MERVE T., BURAK Y., SELIN A.), home.validation.heading/lead; scratchpad/home/validation-desktop.png, home-desktop-full.png

**Sorun.** 'VALIDATION' başlığı altında üç alıntı: isimler baş harfli, şirket yok, link yok, fotoğraf yok. Rollerden biri 'E-COMMERCE DIRECTOR', biri 'ARCHITECTURE' odaklı 'PROJECT MANAGER'; sitede ise e-ticaret ya da mimari refactor diye bir case study yok, sadece iki in-house ürün var (Vocabulary, Market Hours). Üstelik stüdyo 'EST. 2026'. Kartlar 385px min-height ile alıntı bitiminden isim satırına ~75px boşluk bırakıyor (ölçüm: quote y=1427-1612, name y=1688).

**Neden önemli.** Doğrulanamayan testimonial brief'te 'fake-sounding' olarak açıkça listelenmiş ve bu sitede kanıtlarla çelişiyor: bir ziyaretçi 'hangi projeden bahsediyor?' diye sorduğunda cevap yok. Bu, sitenin geri kalanındaki tüm iddiaların güvenilirliğini düşürür. Bölümün adının 'VALIDATION' olması da savunmacı bir tını veriyor.

**Ne yapılmalı.** İki seçenek: (a) Gerçek, atıf yapılabilir alıntı: tam isim, şirket, rol, LinkedIn/site linki, ve alıntının bağlı olduğu görünür bir case study. Bir tane gerçek alıntı üç anonimden iyidir — tek, büyük (clamp(24px,3vw,44px)) bir blockquote + cite olarak kurun. (b) Yoksa bölümü tamamen kaldırın ve yerine doğrulanabilir 'Facts' bloğu koyun: kuruluş, konum (İzmir / New York), iki ürün, store linkleri, yanıt süresi ('We reply within one business day' — blog yazınızda zaten var). Hangi yol seçilirse seçilsin 'VALIDATION' başlığı ve 'strongest systems earn…' lead'i gitmeli.

#### `home-07` — Stock uzay gezegeni ve sunucu odası videoları, 720p, düz siyah poster

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35-38 (hero <video> + çift gradient overlay), :185 (BackgroundVideo); public/videos/dark-planet.mp4 (1280×720, 1.08 Mbps, 7.5 s), public/videos/start-a-project-hero.mp4 (1280×720, 10 s), public/videos/poster.png (düz #0a0a0a kare, 3.7 KB); scratchpad/home/frame-dark-planet-2s.png, sim-hero-desktop.png, sim-hero-mobile.png

**Sorun.** Hero'nun tek görsel içeriği uzaydan Dünya görüntüsü (stock), CTA'nınki sunucu koridoru (stock). Video 1280×720 ve ~1 Mbps; 1440px+ ekranlarda ve 2× retina'da 2-3 kat büyütülüyor, yumuşak ve bloklu görünüyor. Poster düz siyah: ilk paint, reduced-motion ve save-data kullanıcıları için hero boş siyah bir dikdörtgen. Hero'da üstüne hem `after:` gradient hem ayrı bir gradient div biniyor; sonuç .62 opacity'de çamurlu gri.

**Neden önemli.** Yazılım stüdyosunun hero'sunda gezegen, 'hiçbir fikrimiz yoktu, Pexels'tan karanlık bir şey aldık' demektir; AI builder şablonlarının klasik seçimi. Awwwards'ta görsel dil sahip olunan bir şey olmalı: ya gerçek ürün, ya üretilmiş (generative) ama size ait bir sistem. Teknik tarafta 720p + siyah poster craft eksikliği.

**Ne yapılmalı.** Her iki videoyu kaldırın. Hero için iki yol: (1) Sahip olunan generative katman: ogl veya three.js ile tek fragment shader (domain-warped simplex noise, monokrom, düşük kontrast, pointer'a yavaş tepki, ~0.25 opacity), prefers-reduced-motion'da statik frame; 60 satırlık GLSL, bundle ~40 KB (ogl). (2) Gerçek ürün: Vocabulary ve Market Hours'un gerçek ekran kayıtları/cihaz render'ları, 6-8 s loop, 1080p+; AV1/HEVC + H.264 fallback (`<source type="video/mp4; codecs=av01…">`), poster gerçek ilk kare. Video kalacaksa opacity 1, tek alt gradient (metin okunurluğu için), `preload="metadata"`.

> **Doğrulayıcı notu:** ffprobe: dark-planet.mp4 h264 1280×720 7.5s 1.08 Mbps; start-a-project-hero.mp4 1280×720 10s 2.65 Mbps. poster.png 1280×720 düz rgb(9,9,9) 3.7 KB (reviewer #0a0a0a dedi, önemsiz). frame-dark-planet-2s.png uzaydan Dünya = stok. :34 after: gradient + :38 ayrı gradient div = çift overlay doğru. Düzeltme: 'reduced-motion ve save-data kullanıcıları için hero boş siyah' iddiası hero için YANLIŞ — :35'teki düz <video autoPlay preload="auto"> hiçbir tercihi kontrol etmiyor, herkes için oynuyor; poster yalnızca ilk paint ve #contact'taki BackgroundVideo (reduced-motion/saveData'da src atamıyor) için geçerli. Fix (shader veya gerçek ürün kaydı, 1080p+, gerçek poster, tek gradient) somut.

### ÖNEMLİ

#### `home-08` — Anlatı sırası ters ve bölüm numaralandırması tutarsız

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:34-208 bölüm sırası; :45 ('— 001 / 005'), :54 ('01 / 05'), :77 ('01 / EXTERNAL SIGNAL'), :96 ('02 /'), :130 ('03 /'), :188 ('04 /'), :206 ('05 / 05'); home-desktop-full.png

**Sorun.** Akış: Hero → marquee → Testimonial'lar → Hizmetler → ticker → İşler → CTA. Yani ziyaretçi ne yaptığınızı öğrenmeden referans okuyor, işler ise ~2400px aşağıda. Numaralar: hero kicker'da '001 / 005' (üç hane), hero altında '01 / 05', validation '01', capabilities '02', works '03', start '04' ama alt bantta '05 / 05'. Hero hem 01 hem de numarasız; aynı anda iki sayım sistemi var.

**Neden önemli.** Yeni kurulmuş bir stüdyonun tek gerçek kanıtı işleridir; onları en sona yakın koymak sayfanın ikna gücünü sıfırlıyor. Tutarsız index'ler de 'her bölüme bir 01/05 eyebrow koy' refleksinin düşünülmeden uygulandığını ele veriyor (brief'te slop sinyali olarak geçiyor).

**Ne yapılmalı.** Sıra: Hero → Work (büyük, full-bleed) → Services → Clients/Facts (gerçekse) → Contact. Numaralandırmayı ya tamamen kaldırın ya da tek sistem: bölüm eyebrow'larında '01 Work · 02 Services · 03 Contact', hero'da numara yok, alt bantlarda sayım yok. en.json'daki tüm 'NN /' prefix'lerini tek yerden üretin (map index'inden), elle yazmayın.

#### `home-09` — Dört bölüm aynı şablon bloğu; üç h2 birebir aynı boyda

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:77-89 (validation) ↔ :96-103 (services) ↔ :130-141 (work) ↔ :188-191 (start); ölçüm: h2 font-size 151.2px ×3, 180px ×1, h1 230px @1440; home-desktop-full.png

**Sorun.** Her bölüm: üst çizgi + sol/sağ mono eyebrow → 10.5vw caps başlık + gri kare → lead → border'lı 3 sütun grid. Testimonial grid'i ile hizmet grid'i yapısal olarak aynı (mono üst satır, metin, mono alt satır, 385/400px min-height). Sayfada 6 'dev tipografi' anı var (ALAZ, VALIDATION, CORE CAPABILITIES, SELECTED WORKS, START PROJECT, footer ALAZ) ve üçü aynı piksel boyunda; dolayısıyla hiçbiri 'büyük' hissettirmiyor.

**Neden önemli.** Awwwards jürisinin 'design' ve 'creativity' puanları bölüm başına bir fikir arar; burada tek bir layout fikri dört kez kopyalanmış. Tekrarlanan dev başlıklar kontrastı yok ediyor; kullanıcı 3. bölümden sonra artık okumayıp kaydırıyor.

**Ne yapılmalı.** Tek dev an: hero. Diğer h2'leri clamp(40px,6vw,96px)'e indirin ve her bölüme kendi layout'unu verin: Work → full-bleed veya 60/40 asimetrik, görsel baskın, başlık küçük; Services → 3 kart yerine dikey liste (satır başına dev numara 01/02/03, başlık, hover'da sağda yüzen ürün görseli, tıklayınca açılan detay) — Locomotive/Obys'in hizmet listesi mantığı; Contact → tipografik, mailto odaklı (home-05). Eyebrow satırını tek bir ortak `<SectionHead>` bileşenine alıp sadece gerektiğinde kullanın; her bölümde sağ eyebrow zorunlu olmasın.

#### `home-11` — Hero kompozisyonu: masaüstünde 290px ölü alan, mobilde 62px wordmark ve %40 boş ekran

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:40 (pt-[100px]), :44 (pt-[30vh]), :46 (text clamp(90px,16vw,320px) / mobile:text-[16vw]), :47-49; ölçüm: topline y=144, kicker y=424 @1440×900; mobil wordmark 16vw = 62px; home-desktop-fold.png, home-mobile-fold.png, scratchpad/home/sim-hero-mobile.png, hero-wide-video.png

**Sorun.** Masaüstünde SYSTEM_ACTIVE satırı ile kicker arasında ~280px boş siyah; wordmark 230px ile ekranın sol yarısını alıyor, sağ yarı boş. 1920px'de tagline ile intro arası ~1000px'e açılıyor, intro sağda kaybolmuş bir yetim paragraf (290px, 13px). Mobilde ilk ekranın y=130-370 arası tamamen boş, 'dev' wordmark 62px (tagline 27px'ten sadece 2 kat büyük), altında iki satır POWERED BY ve fold 'SCROLL TO EXPLORE'a zar zor ulaşıyor.

**Neden önemli.** Hero 'giant wordmark' fikrine dayanıyorsa wordmark gerçekten alanı doldurmalı; şu an ne dolduruyor ne de boşluğu bilinçli kullanıyor. Mobil fold ilk izlenimin %60'ıdır ve burada ilk izlenim 'boş ekran + küçük logo'.

**Ne yapılmalı.** Masaüstü: pt-[30vh]'i kaldırın; wordmark'ı tam genişliğe yayın (text-[clamp(120px,21vw,400px)] + `font-stretch`/Archivo wdth ekseniyle genişletme) ya da wordmark'ı sol 8 kolona, intro+tagline'ı sağ 4 kolona 1080px çizgisine hizalayarak gerçek bir asimetrik düzen kurun. Tagline + intro'yu tek satır grid'de yan yana koyun (tagline col 1-6, intro col 7-9, max-w 36ch, 16px). Mobil: `mobile:text-[30vw]` (~117px), `mobile:pt-0`, tek satır meta, POWERED BY yok (home-03), tagline 2 satır, intro 15px.

> **Doğrulayıcı notu:** Ölçümler tutuyor: masaüstü topline y=100-154, kicker y=424 (≈270px boşluk); wordmark ink x≈50-748 (sol yarı); 1920'de tagline 95-403, intro 1400 (~1000px boşluk). Mobil: h1 62.4px y=391, topline 66-110, kicker 363 → y=110-363 boş; tagline 28px (2.2×); POWERED BY iki satır 662-714; alt bant 782-852, viewport 844 → kesik. Düzeltme: fix'teki `mobile:text-[30vw]` taşar — 'ALAZ.' Archivo 900'de ≈3.07em, 390px'te kullanılabilir alan 342px → maksimum ≈111px = 28vw. `mobile:text-[27vw]` kullanın ya da h1'i de `.fit` + fit('ALAZ','.') ile kilitleyin (altyapı zaten var).

#### `home-12` — Hero'daki 4 kolonluk çizgi grid'i dekoratif; hiçbir öğe hizalanmıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:39 (grid-cols-4 <i> çizgileri); ölçüm: çizgiler x=360/720/1080, kicker x=78, h1 x=50, intro x=972, gri nokta x=722-753; home-desktop-fold.png

**Sorun.** Arka planda üç dikey hairline var ama içerik bu kolonlara oturmuyor: intro paragrafı 972'de başlıyor (kolon 1080'de), kicker 78'de, nokta 720 çizgisinin 2px sağında bitiyor — tesadüfi yakınlıklar. Grid sadece hero'da var, diğer bölümlerde yok.

**Neden önemli.** Awwwards seviyesinde 'grid çizgisi gösteriyorsan grid gerçek olmalı' kuralı vardır; sahte grid, Figma'dan kopyalanmış süs izlenimi verir ve dikkatli göz tarafından anında fark edilir.

**Ne yapılmalı.** Ya gerçek 12 kolonlu CSS grid kurun (`grid-cols-12 gap-x-[var(--gutter)]`) ve wordmark col-span-9, intro col-start-10 gibi yerleştirin, çizgileri de bu kolon kenarlarına çizin (ve tüm sayfada tutarlı kullanın); ya da çizgileri silin. Çizgiler kalacaksa yüklemede `scaleY(0→1)` ile 1.2s çizilsin — tek başına küçük ama güzel bir giriş detayı olur.

#### `home-13` — Hizmet kartları: link değil ama ok ikonu var; içerik dikeyde kaymış; hover algılanmıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:99-102 (article, justify-between, min-h-[400px], hover:bg-[#141414], MoveUpRight ikonu :100); ölçüm: kategori etiketi y=2343 / 2409 / 2343; scratchpad/home/services-hover-desktop.png (ortadaki kart hover'da)

**Sorun.** Her kartın sağ üstünde MoveUpRight oku var ama kartlar `<article>`, tıklanmıyor; tek link başlıktaki 'EXPLORE SERVICES'. `justify-between` içeriği alta ittiği için 'MOBILE APPS' tek satır, diğerleri iki satır olunca kategori etiketleri 66px farkla farklı yüksekliklerde duruyor (ekran görüntüsünde net). Hover sadece #0a0a0a→#141414 (%4 ton farkı), fark edilmiyor. Üstteki '01 — 03' satırı ile içerik arasında ~120px boş.

**Neden önemli.** Tıklanabilir görünen ama tıklanmayan öğe temel bir usability hatası; satır boyunca kayan baseline ise craft eksikliği — jüri ilk bakışta görür. Sayfadaki üç hizmet kartı sitenin esas teklifi; en zayıf hissettiren bölüm olmamalı.

**Ne yapılmalı.** Kartları `<Link href="/services#web">` yapın (anchor id'leri services sayfasına ekleyin) ya da oku silin. Dizilim: `grid grid-rows-[auto_auto_1fr]` ile numara → kategori+başlık üstte sabit, açıklama altta; h3'e `min-h-[2.12em]` vererek 1 ve 2 satırlı başlıkları eşitleyin. Hover: tint yerine anlamlı bir şey — altta 3 maddelik 'what you get' listesi (en.json services[].detail zaten var) `grid-template-rows: 0fr→1fr` ile açılsın, ya da imleci takip eden ürün görseli.

> **Doğrulayıcı notu:** Doğrulandı: :99 <article> (link değil) + :100 MoveUpRight; kategori etiketi y=2357 / 2423 / 2357 (66px fark, services-hover-desktop.png'de net); hover #0a0a0a→#141414; '01 — 03' satırı (y=2238) ile kategori arası ~120px. Fix düzeltmesi: services sayfasında anchor id'leri ZATEN var (services/page.jsx:134 id={item.id}; en.json: custom-software-development, mobile-app-development, api-integration, system-architecture-cloud, performance-engineering) — yeni id eklemeye gerek yok, kartları /services#custom-software-development, #mobile-app-development, #api-integration'a linkleyin (scroll-mt-[90px] de hazır). grid-rows ve hover detay önerileri geçerli.

#### `home-14` — 'SELECTED PROJECTS // 02' + 'VIEW ALL PROJECTS' — toplam zaten 2

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:130-141 (eyebrow count, VIEW ALL butonu), :142 (grid-cols-2); messages/en.json home.selected.*, projects[] (2 kayıt); scratchpad/home/work-desktop.png

**Sorun.** Başlık 'SELECTED WORKS', eyebrow '02' sayıyor, buton 'VIEW ALL PROJECTS' — ama case-studies sayfasında da aynı iki proje var. 'Seçilmiş' kelimesi daha fazlası olduğunu ima ediyor, sayfa kendi kendini yalanlıyor. İki kart 16/10 oranında yan yana, 440px yüksekliğinde; sitenin en güçlü ve tek renkli varlıkları (sarı Vocabulary, HUD Market Hours) ekranın yarısını bile doldurmuyor.

**Neden önemli.** Dürüstlük Awwwards 'content' puanının parçası; ayrıca iki gerçek ürün bu sitenin tek kanıtı ve bu boyutta gösterilmeleri değerlerini küçültüyor.

**Ne yapılmalı.** Başlık 'Work' (veya 'Two products, shipped'), eyebrow sayısı ve 'VIEW ALL' butonu kaldırılsın (kartlar zaten linkli). Kartları büyütün: satır başına bir proje, alternatif hizalama (01 görsel sol 8 kol + metin sağ 4 kol, 02 tersi), görsel `aspect-[16/10]` yerine `aspect-[3/2]` veya `min-h-[70vh]`. Projeler Hero'nun hemen altına taşınsın (home-08). Üçüncü bir kart yalnızca gerçekse eklensin ('In progress: ___' şeklinde dürüst bir placeholder olabilir; ':155-158'deki 'ASSET IN PROGRESS' mono placeholder'ı ise silinsin).

#### `home-15` — Proje kartı chrome'u jenerik: blur rozet, ok karesi, 1.03 scale hover, kesilen özet

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:160-162 ('ALAZ / 01' backdrop-blur rozeti), :163-165 (42px ok karesi), :152 (group-hover:scale-[1.03] + brightness), :175 (line-clamp-2); scratchpad/home/work-hover-desktop.png, work-mobile.png ("17 word games and…")

**Sorun.** Görselin üstünde 'ALAZ / 01' blur pill (aynı bilgi görselin altındaki meta satırında zaten var), sağ altta 42px'lik ok kutusu, hover'da görsel %3 büyüyüp aydınlanıyor — her Tailwind kart şablonunun varsayılanı. Mobilde özet `line-clamp-2` ile '…' olarak kesiliyor; pazarlama kopyasında yarım cümle.

**Neden önemli.** Rozet + ok kutusu + hafif zoom kombinasyonu 'shadcn card' hissinin ta kendisi; görsellerin kendi karakterini (sarı, HUD) gölgeliyor. Kesilen cümle craft hatası.

**Ne yapılmalı.** Rozet ve ok kutusunu silin; meta satırı yeterli. Reveal: görsel overflow-hidden kapsayıcıda `clip-path: inset(0 0 100% 0)→inset(0)` + `scale(1.15→1)` 1.2s expo-out ile açılsın (scroll'da bir kez). Hover: scale yerine imleci takip eden 'View case ↗' etiketi (custom cursor, framer-motion `useMotionValue` + spring) ve görselde hafif parallax (Lenis scroll'a bağlı translateY ±4%). Özetleri 1 satıra sığacak şekilde yeniden yazın; clamp'i kaldırın.

#### `home-16` — Beş farklı 'neredeyse siyah' arka plan sırayla diziliyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:34 (#090909), :59 (#111), :76 (#0e0e0e), :95 (bg-ink #0a0a0a), :107 (#141414), :129 (#111), :184 (#090909); ölçümle doğrulandı (rgb 9/17/14/10/20/17/9); home-desktop-full.png

**Sorun.** Hero → marquee → validation → services → ticker → work → contact arasında #090909, #111, #0e0e0e, #0a0a0a, #141414, #111, #090909 — yedi geçişte beş farklı ton, hiçbirinin mantığı yok (neden validation #0e0e0e de services #0a0a0a?). globals.css'te --ink ve --surface token'ları tanımlı ama sayfa hard-coded hex kullanıyor.

**Neden önemli.** Rastgele ton bandları sayfayı 'parçalardan yapıştırılmış' gösterir; disiplinli monokrom site tam tersine 1-2 yüzey tonunu bilinçli kullanır.

**Ne yapılmalı.** Yalnızca `bg-ink` ve `bg-surface` kullanın. Tüm bölümler ink; tek bir bölüm (Work) surface olsun ki kontrast bir anlam taşısın. Hard-coded hex'leri (:34, :59, :76, :107, :129, :184) token'lara çevirin; marquee'ler zaten kalkıyor.

#### `home-17` — Hareket dili jenerik: her şey aynı fade-up, hero'da giriş yok, 'mask' gerçek mask değil

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css (.reveal-ready [data-reveal] kuralları, 'No clip-path here' yorumu); src/components/ScrollReveal.jsx; src/app/[locale]/page.jsx:46 (h1'de data-reveal yok), :48-49 (hero fade), :78/:97/:135/:191 (data-reveal="mask")

**Sorun.** Tüm reveal'lar opacity 0→1 + translateY(14px), 0.6s, 80ms stagger; 'mask' varyantı da sadece translateY(.14em) + opacity. Hero'da yüklenme koreografisi yok: wordmark anında orada, sadece tagline 120ms gecikmeli soluyor. Görsellerde reveal yok, çizgilerde çizilme yok, scroll'a bağlı (scrubbed) hiçbir hareket yok. framer-motion'daki Reveal bileşeni bu sayfada kullanılmıyor.

**Neden önemli.** Awwwards'ta 'animation/interaction' ayrı bir puan kalemi ve 'fade-up on scroll' artık sıfır noktası. Hero giriş anı, sitenin tek hatırlanacak saniyesidir; şu an yok.

**Ne yapılmalı.** (1) Hero girişi: ALAZ harflerini `overflow:hidden` satır içinde `translateY(110%)→0`, 60ms stagger, 1.1s cubic-bezier(.16,1,.3,1); ardından kicker/tagline/intro 80ms aralıkla; grid çizgileri scaleY. GSAP + SplitText (artık ücretsiz) veya framer-motion `motion.span` ile. (2) h2'ler için gerçek line-mask: her satırı overflow-hidden span'e sarıp translateY(100%)→0 (fit() ile uyumlu, satırlar zaten `<br/>` ile ayrı). (3) Görseller: clip-path inset + scale 1.15→1. (4) Scroll-linked: Lenis + GSAP ScrollTrigger ile hero wordmark'ın scroll'da hafif yukarı/parallax, Work görsellerinde ±4% translate. Reduced-motion'da mevcut davranış korunur (iyi kurulmuş).

#### `home-18` — Tipografi tek registerde: her şey ALL CAPS Archivo 900 + 12px mono; gövde 13px

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:46, :48 (tagline caps font-extrabold), :78-86 (h2, isimler caps), :100-101, :172-173; gövde boyutları ölçüm: 13px ×6, 12px, 14px; intro :49 text-[13px]; services açıklaması :101 text-[13px]

**Sorun.** h1, h2, h3, tagline, proje adları, testimonial isimleri, nav, butonlar, eyebrow'lar — hepsi büyük harf; etiketlerin tamamı JetBrains Mono 12px caps. Sentence case sadece paragraflarda var, onlar da 1440px ekranda 13px. Lead cümleler 17px. Sonuç: 'dark brutalist template'in varsayılan sesi, hiçbir yerde nefes yok.

**Neden önemli.** Tek register, hiyerarşiyi büyüklüğe mahkûm eder (bu yüzden her başlık dev); okunabilirlik de düşer. Awwwards seviyesindeki monokrom siteler (Studio Freight, Unseen) kontrastı ağırlık ve case ile kurar, sadece boyutla değil.

**Ne yapılmalı.** (a) Tagline ve lead'leri sentence case'e alın (Inter 500, clamp(20px,2vw,28px)); (b) mono caps etiketi bölüm başına bir tane ile sınırlayın; isim/rol gibi bilgiler normal Inter 13-14px olsun; (c) gövde 15-16px, lead 18-20px (`text-[15px] leading-[1.6]`); (d) tek bir kontrast sesi deneyin: alıntılar ve lead'ler için editorial serif italic (örn. Instrument Serif veya Fraunces italic) — monokrom brutalizmi kıran en ucuz hamle. Wordmark'ta Archivo'nun wdth eksenini kullanıp (variable font) geniş kesimle set edin; başlıklarla farklılaşsın.

#### `home-missed-1` — Aynı sayfada dört farklı buton/link dili

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:41 (beyaz dolu, Inter 12px extrabold); src/app/[locale]/page.jsx:97 (EXPLORE SERVICES: alt çizgili mono + ok, gap hover), :138 (VIEW ALL PROJECTS: .65 beyaz çerçeveli kutu, hover beyaz), :193 (START SEQUENCE: blur + .20 çerçeve + köşe braketi + tracking .2em uppercase), :54 (SCROLL TO EXPLORE: çıplak mono + ok); home-desktop-full.png

**Sorun.** Tek sayfada aynı rol (bir yere git) için dört ayrı görsel sözleşme: dolu beyaz, alt çizgi, outline kutu, blur+braket. Hover davranışları da farklı (translate-y, gap, bg, bg+border). Font bile değişiyor: header Inter, diğerleri JetBrains Mono.

**Neden önemli.** Bileşen sisteminin olmadığını, her bölümün ayrı üretildiğini anında ele verir; Awwwards 'design' puanında tutarlılık ilk kontrol edilen şeydir. home-05 yalnızca START SEQUENCE'ı çözer, kalan üç stil kalır.

**Ne yapılmalı.** İki stil tanımlayın ve tek bileşene alın (src/components/ui içinde Button varsa onu temel alın): primary = header'daki dolu beyaz (tüm sayfada tek yerde: header + contact), secondary = metin + ok (EXPLORE SERVICES'in alt çizgili versiyonu). VIEW ALL PROJECTS ve SCROLL TO EXPLORE secondary'ye dönsün ya da kalksın (home-14/home-22). Hover tek dil: ok 2px sağ-yukarı + alt çizgi çizilme (`background-size: 0→100%` .4s expo-out). Font tek: ya Inter ya mono, karışık değil.

#### `home-missed-2` — 12px mono etiket için 8 farklı gri, hairline için 5 farklı opaklık

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:41 ve :53 text-[#a6a6a6]; :45 text-[#b9b9b9]; :77/:96/:130 text-dim (#7e828a); :100 text-[#e1e1e1]; :59 text-[#73777d]; :107 text-mute (#9fa3a9); :188 text-[#bababa]; :206 text-[#aaa]. Çizgiler: :39 rgba(255,255,255,.065), border-line .13, :53 rgba(255,255,255,.22), :145 border-line/70, :138 rgba(255,255,255,.65), :193 white/20, :190 #555; ölçümle doğrulandı (computed color değerleri)

**Sorun.** Aynı tipografik rol (12px JetBrains Mono caps etiket) sayfada sekiz farklı gri değerle, aynı rol (1px ayırıcı) beş farklı opaklıkla set edilmiş; globals.css'te --dim/--gray/--line token'ları varken inline hex kullanılmış. home-23 yalnızca contact eyebrow'unu, home-16 yalnızca arka planları yakalıyor.

**Neden önemli.** Monokrom bir sitede ton disiplini tek tasarım aracıdır; rastgele griler 'özenle kurulmuş sistem' hissini yok eder ve büyük ekranda gözle fark edilir (ör. hizmet kartlarındaki '01 — 03' satırı diğer tüm eyebrow'lardan belirgin daha parlak).

**Ne yapılmalı.** Üç etiket tonu tanımlayın ve yalnızca onları kullanın: --dim (#7e828a) varsayılan etiket, --gray (#9fa3a9) ikincil metin, #fff vurgu. Tek hairline token'ı (--line .13); hero grid çizgileri için ikinci bir `--line-faint` (.07) kabul edilebilir, başka opaklık yok. page.jsx'teki tüm `text-[#…]` ve `border-[rgba(…)]` değerlerini bu token'lara çevirin; mono etiket class dizisini (`font-mono text-[12px] tracking-[.085em] leading-[1.6]`) tek bir `.label` utility'sine alın.

### İNCE İŞÇİLİK

#### `home-10` — Gri kare nokta motifi her başlıkta tekrarlanıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:46 (ALAZ.), :78 (VALIDATION.), :97 (CAPABILITIES.), :136 (WORKS.), :191 (PROJECT.); src/components/Footer.jsx:16, Header.jsx wordmark; home-desktop-full.png

**Sorun.** Wordmark'ın imzası olan gri kare nokta ('ALAZ▪') sayfadaki her h2'nin sonuna da ekleniyor; fit() bile '.' suffix'i hesaba katacak şekilde çağrılıyor. Aynı sayfada 6 kez.

**Neden önemli.** Bir marka işaretinin gücü seyrekliğinden gelir; her başlığa yapıştırınca süsleme olur ve wordmark'ın kimliği eriyor. Ayrıca 'VALIDATION.' gibi tek kelimelik başlıkların sonunda nokta anlamsız.

**Ne yapılmalı.** Noktayı yalnızca wordmark'ta (header, hero h1, footer) bırakın. h2'lerden `<span className="text-[#5f5f5f]">.</span>` ve fit(…, '.') suffix'ini kaldırın.

> **Doğrulayıcı notu:** İddia doğru: :46, :78, :97, :136, :191 + Footer.jsx:16 + Header.jsx:30 — nokta sayfada 7 kez; fit(…, '.') suffix'i :78/:97/:135/:191'de. Severity düşürüldü: tekrarlanan bir noktalama motifi tek başına slop sinyali değil, polish meselesi; ancak h2'lerden kaldırmak ucuz ve wordmark'ı güçlendirir. Fix doğru.

#### `home-19` — Validation başlığının yanında anlamsız lucide ShieldCheck ikonu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:78 (<ShieldCheck size={46} strokeWidth={1}/> ve [--fit-avail:…_-_76px]); scratchpad/home/validation-desktop.png (sağ üst, y≈176)

**Sorun.** 151px'lik 'VALIDATION.' başlığının sağında, boşlukta tek başına duran 46px'lik kalkan-tik ikonu; başlığın fit hesabı bu ikon için 76px yer ayırıyor. Mobilde 30px'e küçülüp başlığın yanına sıkışıyor.

**Neden önemli.** 'Güven = kalkan ikonu' ilkokul düzeyinde bir metafor ve 'lucide icons everywhere' slop sinyali; dev tipografinin yanında minik çizgi ikon ölçek olarak da çelişiyor.

**Ne yapılmalı.** İkonu ve lucide import'unu kaldırın; `--fit-avail` ifadesinden `_-_76px` kısmını silin. Sayfadaki diğer lucide kullanımlarını da ok karakterleriyle (→ ↗) veya tek bir özel SVG ok ile değiştirin (ArrowUpRight 5 yerde, MoveUpRight, ArrowDown, CirclePower ve ShieldCheck import'larından ikisi zaten kullanılmıyor).

#### `home-20` — 'SOFTWARE STUDIO / EST. 2026' ve kicker aynı bilgiyi iki kez veriyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:42 (toplineRight), :45 (kicker 'WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO'); messages/en.json home.hero.toplineRight, home.hero.kicker; home-desktop-fold.png

**Sorun.** Aynı ekranda 'SOFTWARE STUDIO' iki kez, 'WEB/MOBILE/SYSTEMS' ise hem kicker'da hem capabilities eyebrow'unda. 'EST. 2026' bir 2026 sitesinde kuruluş yılı değil 'yeni kurulduk' demek; EST. formülü köklülük ima etmek için kullanılır.

**Neden önemli.** Tekrar, kopyanın düzenlenmediğini gösterir; EST. 2026 ise istenmeyen bir mesaj (acemilik) verirken 'heritage' tonuyla çelişiyor.

**Ne yapılmalı.** Tek meta satırı, gerçek bilgi: 'Software studio — İzmir · New York' (konumlar footer'da zaten var). Kicker'ı kaldırın ya da tagline'ın görevini ona verin. 'EST.' ifadesini sitenin hiçbir yerinde kullanmayın; yıl gerekiyorsa About'ta 'Founded in 2026' cümle içinde.

#### `home-21` — Mobil hizmet kartlarında ~100px ölü alan

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:99 (mobile:min-h-[295px] + justify-between); scratchpad/home/services-mobile.png ('01 — 03' y=330, kategori y=438)

**Sorun.** Mobilde her kart 295px minimum yükseklik ve `justify-between` ile içerik alta itildiğinden numara satırı ile kategori etiketi arasında üç kartta da ~100px boşluk kalıyor; sayfa gereksiz uzuyor (mobil full-page 5703px).

**Neden önemli.** Mobilde boşluk pahalı; içeriksiz boşluk 'template'in masaüstü için kurulduğunu, mobilin kontrol edilmediğini gösterir.

**Ne yapılmalı.** `mobile:min-h-0 mobile:justify-start mobile:gap-[20px]`; numara satırını kategori satırıyla aynı satıra alın ('01 · Web / SaaS / Platforms'). home-13'teki grid-rows düzeni bunu masaüstünde de çözer.

#### `home-22` — Alt bant 'SCROLL TO EXPLORE' + sayım, bilgi taşımayan şablon öğesi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:53-55; messages/en.json home.hero.scrollCta/bottomNote; home-desktop-fold.png (y≈890, fold'un hemen altında kesiliyor)

**Sorun.** Hero'nun alt çizgisinde 'SCROLL TO EXPLORE ↓ · PRECISION IS THE STANDARD. NOT THE GOAL. · 01 / 05'. 1440×900'de bu bant fold'un tam sınırında, yarısı görünüyor; mobilde de en altta kesik ('SCROLL TO EXPLORE' y=818/844).

**Neden önemli.** Scroll ipucu ancak hero gerçekten tek ekran ve altında ne olduğu belirsizse işe yarar; burada slogan ve sayım ile birlikte 'template alt çubuğu'na dönüşmüş.

**Ne yapılmalı.** Bandı ya kaldırın ya da gerçek bilgiyle doldurun: sol 'hello@alaz.pro', orta 'İzmir 14:42 — New York 07:42' (canlı saat, 20 satır JS), sağ 'Open for projects'. Hero yüksekliğini `min-h-dvh` yerine içerik + bant fold içinde kalacak şekilde ayarlayın (ör. `h-[calc(100dvh-76px)]` ve iç paddingleri azaltın).

#### `home-23` — Start bölümü tek ortalanmış blok; eyebrow rengi tutarsız; başlık→paragraf hiyerarşi uçurumu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:188 (text-[#bababa], diğer bölümler text-dim), :189 (text-center m-auto), :191 (12.5vw/200px başlık), :192 (14px paragraf); scratchpad/home/contact-desktop.png

**Sorun.** Sayfanın tamamı sol hizalı editorial grid'de akarken son bölüm ortalanıyor; 180px başlığın altında 14px gri paragraf; eyebrow rengi diğer dört bölümden farklı (#bababa vs #7e828a).

**Neden önemli.** Hizalama ritminin sebepsiz kırılması ve ton tutarsızlığı craft eksikliği; 180→14px atlama paragrafı görünmez kılıyor.

**Ne yapılmalı.** home-05 ile birlikte çözülür: sol hizalı yapı, eyebrow `text-dim`, paragraf 18-20px, başlık clamp(56px,8vw,140px). Ortalama kalacaksa bunu footer ile birleşen bilinçli bir 'final' olarak kurun ve tüm sayfada başka ortalanmış öğe olmasın.

#### `home-24` — Hero intro paragrafı sağda yetim; 1920px'de bağ kopuyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:47-49 (flex justify-between, intro max-w-[290px] mr-[9%] text-[13px]); scratchpad/home/hero-wide-video.png (tagline x≈95, intro x≈1400)

**Sorun.** Tagline ile intro aynı flex satırında `justify-between` ile iki uca itilmiş; 1440'ta 600px, 1920'de ~1000px boşluk. 13px, 290px'lik paragraf ekranın sağ ucunda kayboluyor. Sayfanın gerçekten ne yaptığınızı söyleyen tek cümlesi bu.

**Neden önemli.** En önemli bilgi cümlesi en zayıf tipografik konumda; `justify-between` burada bir tasarım kararı değil, varsayılan.

**Ne yapılmalı.** 12 kolon grid: tagline col 1-7, intro col 8-11 (1080px çizgisine oturur, home-12 ile tutarlı), intro 16px/1.5, max-w 34ch. Alternatif: intro'yu tagline'ın hemen altına, aynı sol kenara alın ve sağ yarıyı görsel/sistem için bırakın.

#### `home-25` — Proje adı kapak görseliyle çelişiyor ve sayfa dışı CDN görselleri hâlâ bağlı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** messages/en.json projects[0].name ('VOCABULARY' — kapakta 'English Vocabulary'), media.* (hostinger CDN png'leri); src/app/[locale]/layout.jsx preconnect images.hostinger.com; page.jsx:22 (`media` okunuyor ama kullanılmıyor)

**Sorun.** Kart başlığı 'VOCABULARY', görsel 'English Vocabulary' diyor. `media` namespace'i (earth/server/wafer/conduits/laboratory — stok görsel URL'leri) page.jsx'te okunup kullanılmıyor; layout hostinger'a preconnect ediyor.

**Neden önemli.** Küçük ama 'stock imagery' kalıntıları ve isim tutarsızlığı, site için özenle düzenlenmemiş hissi verir; preconnect boşa bağlantı açıyor.

**Ne yapılmalı.** Proje adını 'English Vocabulary' yapın (veya kapağı 'Vocabulary'ye göre yeniden üretin). en.json'dan `media` namespace'ini, page.jsx:22'deki `media` okumasını ve layout.jsx'teki hostinger preconnect/dns-prefetch satırlarını kaldırın (site içinde hiçbir yerde kullanılmıyorsa).

#### `home-missed-3` — Hero videosu reduced-motion ve save-data tercihlerini yok sayıyor, 1.1 MB preload="auto"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:35 (<video autoPlay loop muted playsInline preload="auto">); karşılaştırma: src/components/BackgroundVideo.jsx:14 (reduced-motion + saveData kontrolü var); src/components/SmoothScroll.jsx:9 (Lenis reduced-motion'da kapanıyor)

**Sorun.** Sitenin diğer tüm hareketleri (Lenis, reveal'lar, BackgroundVideo) prefers-reduced-motion ve saveData'ya saygı gösterirken ilk ekrandaki 1.15 MB'lık video her ziyaretçi için zorla indiriliyor ve oynuyor; BackgroundVideo.jsx:7'deki yorum bunu bilinçli kabul etmiş. Reviewer home-07'de tersini varsaydı.

**Neden önemli.** Awwwards 'usability' ve kendi blog yazınızdaki 'speed is a feature' iddiasıyla çelişir; mobil veri ve hareket hassasiyeti olan kullanıcı için ilk ekran en kötü deneyim. Hero'da video kalacaksa (home-07 seçenek 2) bu kapı şart.

**Ne yapılmalı.** Hero videoyu da küçük bir client bileşenine alın (BackgroundVideo'nun `eager` prop'lu varyantı): reduced-motion veya saveData'da src atama, poster'da kal (poster gerçek bir kare olsun, home-07). `preload="metadata"`, `<source type="video/mp4; codecs=…">` + AV1/HEVC kaynak. CSS tarafında ek güvenlik: `@media (prefers-reduced-motion: reduce) { .hero-video { display:none } }`.

#### `home-missed-4` — Marquee ile bölüm başlangıcında çift hairline (2px basamaklı çizgi)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:59 (marquee border-y, tam genişlik) → :77 (#validation eyebrow border-t, gutter içinde); :107 (ticker border-y) → :130 (#work eyebrow border-t); ölçüm: home-desktop-full.png y=1009 rgb(47) + y=1010 rgb(45), y=2650 rgb(50) + y=2651 rgb(47)

**Sorun.** Marquee'nin tam genişlik alt çizgisi ile bir sonraki bölümün gutter içine çekilmiş üst çizgisi 0px arayla üst üste geliyor: ortada 2px kalın, kenarlarda 1px'e düşen basamaklı bir çizgi oluşuyor (skeptic-crop-line1.png). Marquee'ler kaldırılsa bile aynı desen başka sayfalarda (section border-t + önceki bölüm border-b) tekrarlanabilir.

**Neden önemli.** Hairline sistemi bu sitenin ana görsel dili; kalınlığı ve genişliği değişen çizgi 'piksel özeni yok' sinyalidir, jüri büyük ekranda görür.

**Ne yapılmalı.** Kural: bir bölümün üst çizgisi varsa önceki öğenin alt çizgisi olmaz. Marquee'de `border-y` → `border-t`; ya da eyebrow çizgisini tam genişlik yapıp (section'a `border-t`, padding içeriğe) tüm sayfada tek çizgi genişliği kullanın. Çizgi genişliği de tutarlı olsun: ya hep gutter içinde ya hep tam genişlik.

#### `home-missed-5` — Hero'da iki sol hizalama kenarı (60px ve 78px) ve dışarı taşan wordmark

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:45 (kicker ml-[1.2vw]), :47 (tagline/intro satırı pl-[1.2vw]), :51 (PoweredBy pl-[1.2vw]), :46 (h1 -ml-[.044em]); ölçüm @1440: topline/alt bant x=60, kicker/tagline x=78, h1 kutu x=50; skeptic-crop-hero-left.png

**Sorun.** Topline, POWERED BY ve alt bant gutter'da (60); kicker, tagline ve intro 1.2vw içeride (78); wordmark optik düzeltmeyle 50'de. 1.2vw'lik içeri çekme h1'in sidebearing'ini dengelemek için konmuş ama h1 zaten -ml ile düzeltilmiş; sonuç üç farklı sol kenar.

**Neden önemli.** Dev tipografi + hairline grid'de sol kenar tek olmalı; 18px'lik kayma ekran görüntüsünde gözle seçiliyor ve home-12'deki 'sahte grid' hissini büyütüyor.

**Ne yapılmalı.** Tüm hero öğelerini gutter'a alın (`ml-[1.2vw]`/`pl-[1.2vw]`'leri silin); wordmark için yalnızca h1'deki `-ml-[.044em]` optik düzeltmesini tutun ve A'nın ink kenarının x=60'a oturduğunu doğrulayın (gerekirse -.03em). Mobilde de aynı (`mobile:pl-0` zaten var, kicker'da yok: :45'e `mobile:ml-0` ekleyin — ölçümde kicker x=29, diğerleri 24).

#### `home-missed-6` — Mobilde 'SELECTED PROJECTS // 02' eyebrow'u ikiye kırılıp '02' yetim kalıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:130 (mobile:[&_span:last-child]:max-w-[50%] text-right), :132 eyebrowRight; scratchpad/home/work-mobile.png (y≈28-50), home-mobile-full.png

**Sorun.** Sağ eyebrow mobilde %50 genişliğe sıkıştırıldığı için 'SELECTED PROJECTS //' birinci satırda, '02' tek başına ikinci satırda; sol eyebrow tek satır olduğu için çizgi altındaki satır dengesiz. Aynı kural tüm bölümlerde var, en uzun metin burada patlıyor.

**Neden önemli.** Mono etiketler bu sitenin 'hassasiyet' iddiasını taşıyan öğeler; kırılıp yetim bırakan etiket tam tersini söylüyor. Mobil fold'un hemen altında, dikkat çekici yerde.

**Ne yapılmalı.** home-14 ile sayım kalkıyorsa sorun çözülür. Kalacaksa: mobilde sağ eyebrow'u gizleyin (`mobile:hidden`) ya da metni kısaltın ('02 PROJECTS'); %50 sınırını kaldırıp `whitespace-nowrap` + `shrink-0` verin ve sol etiketi kısaltın. Genel kural: eyebrow metinleri 2 kelime + numara ile sınırlı olsun.

#### `home-missed-7` — Proje görselleri için anlamsız, bağıran alt metni

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:149; messages/en.json home.selected.imageAlt '{name} {type} engineering visual' → üretilen alt: 'VOCABULARY LANGUAGE LEARNING / IOS & ANDROID engineering visual'

**Sorun.** Alt metni caps meta string'lerin birleşimi; ekran okuyucu 'VOCABULARY LANGUAGE LEARNING / IOS & ANDROID engineering visual' okuyor, görselin ne gösterdiğini (sarı kapak, kedi, 8000 kart; HUD dünya haritası) söylemiyor.

**Neden önemli.** Awwwards 'usability'/erişilebilirlik puanı ve Lighthouse a11y skorunda görünür; ayrıca SEO'da görsel metni içerikle ilgisiz kalıyor.

**Ne yapılmalı.** en.json projects[] içine `coverAlt` alanı ekleyin, sentence case ve betimleyici: 'English Vocabulary app cover: yellow card with a cat holding an 8000 sign' / 'Market Hours dashboard: world map with open and closed exchanges'. :149'da `alt={project.coverAlt}`; imageAlt anahtarını silin.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Hero için sahip olunan görsel sistem: shader veya kinetik tipografi

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Lusion (shader arkaplan, pointer'a tepki), Unseen Studio (kinetik tipografi), Studio Freight (variable font oyunları)

Stock videonun yerine sitenin kendine ait bir görsel dili: (A) ogl (≈40 KB) ile tek fragment shader — domain-warped simplex noise, monokrom, düşük kontrast, pointer pozisyonuna 0.6s lerp ile tepki, hero'nun arkasında 0.25 opacity; `prefers-reduced-motion`'da tek kare canvas. (B) Alternatif: wordmark'ın kendisi sistem olsun — Archivo'nun variable wdth ekseni pointer X'e göre 75→125 arasında `font-variation-settings` ile sürülür (CSS değişkeni + rAF), harfler scroll'da hafif ayrışır. Her iki seçenek 1 gün iş ve hero'ya hatırlanacak bir 'an' verir.

### Hero giriş koreografisi + sayfa geçişleri

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys Agency (sayfa geçiş perdeleri), Locomotive (harf bazlı hero girişi)

Yüklemede tek GSAP timeline: grid çizgileri scaleY 0→1 (0.8s), ALAZ harfleri overflow-hidden satırdan translateY(110%)→0 60ms stagger (1.1s, expo.out), meta satırı ve tagline 80ms aralıkla fade+8px. Route değişimlerinde `AnimatePresence` (framer-motion zaten bağımlılıkta) ile 0.5s'lik ink renkli perde (clip-path inset) ve yeni sayfanın hero'su aynı timeline ile girsin; NextTopLoader'ın parlayan beyaz çubuğu kaldırılır. İlk ziyarette kısa (≤1.2s) bir preloader sayaç/wordmark anı opsiyonel — fakat ikinci ziyarette sessionStorage ile atlanmalı.

### Work bölümünü scroll-driven ana sahneye dönüştürme

- **Etki:** yüksek · **Efor:** orta · **Referans:** Basement Studio, Hello Monday'in work grid'i, Resn case listesi

İki projeyi hero'nun hemen altına, satır başına bir proje, alternatif 8/4 kolon hizalamayla, `min-h-[80vh]` görsellerle koyun. Görsel overflow-hidden kapsayıcıda Lenis scroll'a bağlı ±5% translateY parallax (GSAP ScrollTrigger scrub veya framer-motion `useScroll` + `useTransform`); giriş clip-path inset reveal + scale 1.15→1. İmleç kart üzerindeyken 'View case ↗' yazan custom cursor (useMotionValue + spring, mobilde kapalı). Kart altı meta: yıl, platform, store linkleri (StoreButtons bileşeni zaten var).

### Hizmetler için etkileşimli dikey liste (3 kart yerine)

- **Etki:** orta · **Efor:** orta · **Referans:** Locomotive hizmet listesi, Active Theory 'what we do' satırları

Üç satır: dev numara (01/02/03, clamp(48px,8vw,140px), Archivo), başlık, sağda tek satır özet. Hover'da satır beyaza döner ve imleci takip eden 360×240 ürün/ekran görseli belirir (mix-blend-difference ile wordmark üzerinde de çalışır); tıklayınca `grid-template-rows: 0fr→1fr` ile en.json services[].detail açılır. Mobilde accordion. Bu, sayfaya ikinci bir layout fikri ekler ve 'kart grid' tekrarını kırar.

### Gerçek bilgi taşıyan durum satırı (status pill'in yerine)

- **Etki:** orta · **Efor:** küçük · **Referans:** Studio Freight ve Basement'ın footer saat satırları

Hero üst veya alt bandında canlı veri: iki şehir için yerel saat (`Intl.DateTimeFormat` ile `Europe/Istanbul` ve `America/New_York`, 1s interval, ≈20 satır client component), 'Taking projects for Q1 2027' müsaitlik metni (en.json'dan), e-posta. Market Hours ürününüz tam da saat/zaman dilimi üzerine; sitenin kendi saat satırı ürünle kavramsal bir köprü kurar.

### Kapanış: dev mailto linki ve manyetik buton

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys, Unseen Studio footer'ları

Contact bölümünde `hello@alaz.pro` display boyutunda (clamp(32px,5vw,80px)) bir link; hover'da harf-roll (her karakter overflow-hidden span içinde translateY -100%, 20ms stagger). 'Start a project' butonu manyetik (pointer 80px yakına girince buton 0.3× offset ile imleci takip eder, spring ile geri döner; framer-motion `useSpring`). Footer'daki ALAZ wordmark ile birleştirilip tek kapanış bloğu yapılabilir.

### Tipografik ince işçilik paketi

- **Etki:** orta · **Efor:** küçük · **Referans:** Pentagram, Studio Dumbar web siteleri; Unseen'in serif/grotesk ikilisi

Alıntı ve lead'lerde `hanging-punctuation: first`, başlıklarda `text-wrap: balance` (zaten var) + `font-feature-settings: 'ss01','cv11'` kontrolü, body 15-16px, lead'lerde editorial serif italic (Instrument Serif, Google Fonts, 1 ağırlık) ile kontrast sesi; Archivo'yu variable (wdth 62–125) olarak yükleyip wordmark'ı geniş, başlıkları normal kesimle ayırma. Hepsi CSS seviyesinde, yarım gün.

### Performansı marka kanıtı olarak gösterme

- **Etki:** orta · **Efor:** orta · **Referans:** Vercel ve Linear'ın performans tabloları; 'built with' sayfaları

Blog yazınız 'speed is a feature' diyor; sitenin kendisi bunu göstersin: footer'da gerçek ölçülmüş CWV değerleri ('LCP 0.9s · INP 40ms · CLS 0 — measured on a Pixel 7a, Oct 2026') ve bundle boyutu. Build'de Lighthouse CI ile üretilip JSON olarak commit edilir, elle güncellenmez. Jürinin 'content' puanına da, müşteri güvenine de direkt etki eder ve testimonial yokluğunu kısmen telafi eder.
