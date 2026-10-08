# Görseller, video ve marka varlıkları

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 25 (2 kritik · 13 önemli · 10 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 7

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sitenin görsel varlık stratejisi şu an "koyu teknoloji stok görüntüsü" şablonunun ta kendisi: sekiz adet jenerik CGI döngü (gezegen, sunucu koridoru, roket, devre-şehir, jiroskop, dişliler, fiber optik) toplam 20,6 MB tutuyor ve hepsi %50–62 opaklık + siyah gradyan altında neredeyse görünmez bir doku olarak kullanılıyor; markayla ya da ürünle hiçbir bağı yok. Buna karşılık sitedeki tek gerçek ve ayırt edici görseller iki proje kapağı (Vocabulary'nin sarı kedi maskotu, Market Hours'un kod ile üretilmiş HUD banner'ı) ve 7 gerçek mağaza ekran görüntüsü; ama bunlar da karartılarak, üstüne başlık bindirilerek ve mağaza reklam metniyle birlikte gösterildiği için en kötü hâlleriyle sunuluyor. Blog kapakları bir AI site-builder CDN'inden (horizons-cdn / images.hostinger.com) çekilen, griye çevrilmiş stok görseller; en.json'daki 5 ek uzak görsel ("laboratory", "wafer"...) ise hiçbir yerde render edilmeyen ölü veri. Sitede tek bir insan fotoğrafı, tek bir gerçek ürün videosu yok; favicon/OG/logo arasında nokta rengi ve slogan tutarsız; "POWERED BY GOOGLE / CLAUDE" rozetleri ödünç alınmış marka logolarıyla güven satın almaya çalışıyor. Awwwards seviyesi için varlık stratejisi tersine çevrilmeli: markanın gerçek fikri olan "alaz = işleyen alev" tek bir sahiplenilmiş generatif görsel sisteme dönüşmeli, stok döngüler tamamen gitmeli, ürünün kendi hareketi (markethours.live'ın gün/gece çizgisi, Vocabulary'nin kart kaydırması) ve stüdyonun insanları kamera karşısına çıkmalı.

## Korunması gerekenler

- Vocabulary kapağı ve maskotu (public/projects/vocabulary/cover.png, hero.png): sitedeki tek doygun renk, gerçek bir ürün kimliği ve sahiplenilmiş illüstrasyon. Kesinlikle koru; yalnızca sunum biçimini (karartma, üstüne yazı) düzelt.
- Market Hours banner'ının kodla üretilmesi (brand/projects/market-hours/build_banner.py; JetBrains Mono, Natural Earth 110m verisi, uygulamanın kendi renk sistemi): tekrar üretilebilir, ürünle tutarlı bir yaklaşım. Arşiv küçük resmi ve OG görseli olarak devam etsin; gerçek ekran görüntüleri yanına eklensin.
- 7 adet gerçek mağaza ekran görüntüsü (1080×1920 WebP, en/ ve tr/ varyantları): gerçek ürün kanıtı ve yerelleştirilmiş. Ham ekran versiyonlarıyla desteklenmeli ama bu disiplin korunmalı.
- BackgroundVideo.jsx: IntersectionObserver ile geç src atama, ekran dışında pause, prefers-reduced-motion ve navigator.connection.saveData'ya saygı. Stok döngüler gitse bile bu bileşen mantığı, yerine gelecek her hareketli varlık (shader, ekran kaydı) için doğru altyapı.
- Yerel varlık disiplini: proje görselleri /public altında, seo.js absoluteUrl ile şemaya mutlak URL, next.config'de AVIF/WebP, next/image'de sizes attribute'ları doğru. Blog kapakları da bu disipline çekilmeli.
- Marka logosu seti (brand/logo/*.svg, Archivo Black, gri #858585 kare nokta): 'ALAZ.' wordmark'ı sade, sahiplenilebilir ve tipografik; tüm ikon/OG sisteminin türetileceği doğru kaynak.
- 'Alaz = işleyen alev' hikâyesi (en.json about.originParagraphs) gerçek, yerel ve görselleştirilebilir bir marka fikri; sitenin tüm görsel dilini taşıyacak kapasitede. Bu fikir var diye jenerik stoğa hiç ihtiyaç yok.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `media-01` — Sekiz jenerik CGI stok döngüsü markayla ilgisiz ve en klasik slop sinyali

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** public/videos/*.mp4 (20,6 MB); src/app/[locale]/page.jsx:35-37 (dark-planet), :185 (start-a-project-hero); about/page.jsx:36-38, :49, :78; services/page.jsx:62-72, :250; case-studies/page.jsx:29-31; src/components/IntakeForm.jsx:93-95. Kare analizleri: media-review/frames-*.png; sim: home/sim-hero-desktop.png, home/sim-contact-desktop.png

**Sorun.** Kare kare çıkarılmış içerik: dark-planet = CGI Dünya yükselişi; start-a-project-hero = CGI sunucu koridoru; start-project-rocket = Starship benzeri roket fırlatma; the-work-section = devre kartı/şehir ızgarası üzerinde ışık izleri; about-section = jiroskop halkaları; about-end-section = dişli çark mekanizması; services-section = fiber optik bokeh. Yedisi de 'yazılım şirketi = uzay/sunucu/dişli' klişesi; hiçbiri ALAZ'ın ürünlerini, insanlarını ya da 'işleyen alev' fikrini göstermiyor. Aynı 'koyu tech stok loop' AI-builder sitelerinin varsayılanı.

**Neden önemli.** Stok/CGI uzay-sunucu footage'ı, 'SYSTEM_ACTIVE' pill'i ile aynı sinyali verir: fikir yok, şablon var. Awwwards jürisinin ilk baktığı şey görsel dilin sahiplenilmiş olup olmadığıdır; ödünç görüntüyle SOTD alınmaz. Ayrıca 20 MB'lık yük, 'speed is a feature' diyen bir stüdyonun blog yazısıyla doğrudan çelişiyor.

**Ne yapılmalı.** Yedi jenerik döngüyü (dark-planet, start-a-project-hero, start-project-rocket, the-work-section, about-section, about-end-section, services-section) repodan sil. Yerine tek bir sahiplenilmiş görsel sistem kur: 'alaz' fikrinden türeyen monokrom generatif alev/ısı shader'ı (bkz. eklemeler #1), ürünün kendi ekran kayıtları (eklemeler #2) ve stüdyo fotoğrafı (eklemeler #3). Geçiş döneminde video yerine CSS grain + 4 kolonlu grid yeterli; boş siyah, jenerik roketten daha dürüst.

#### `media-13` — 'POWERED BY GOOGLE | POWERED BY CLAUDE' rozetleri ödünç logolarla güven satın alıyor

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/PoweredBy.jsx (Simple Icons Google + Claude path'leri); src/app/[locale]/page.jsx:58; about/page.jsx:46; home-desktop-fold.png, home-mobile-fold.png, about-desktop-full.png

**Sorun.** Hero'nun en değerli satırı, stüdyonun kullandığı iki aracın logosunu 'powered by' ibaresiyle gösteriyor. Google marka kılavuzu üçüncü tarafların 'Powered by Google' kullanımına izin vermez; Anthropic için de benzer. Bir yazılım stüdyosunun 'Claude ile güçlendirilmiştir' demesi tam olarak 'AI ürettim' itirafı.

**Neden önemli.** Görev tanımında açıkça slop sinyali olarak listelenen desen; ayrıca marka-hukuk riski. Awwwards'ta kimse araç logosu sergilemez; işini sergiler.

**Ne yapılmalı.** PoweredBy bileşenini ve her iki kullanımı kaldır. Araç/stack bilgisi önemliyse services sayfasında düz metin bir 'Stack' satırı (Next.js, Flutter, Postgres…) yeterli; logo yok. Boşalan hero satırına kurucu adı + konum ('İzmir / New York') ya da canlı proje linki gelebilir.

> **Doğrulayıcı notu:** PoweredBy.jsx (Simple Icons Google + Claude path'leri) doğrulandı; kullanım satırları düzeltildi: page.jsx:51 ve about/page.jsx:45 (58/46 değil). home-desktop-fold.png ve about-desktop-full.png'de hero'nun en görünür satırında. Hukuk kısmı: Google marka kılavuzu üçüncü tarafların 'G' logosunu/'Powered by Google' ibaresini belirli API atıf programları dışında kullanmasına izin vermez — doğru; Anthropic için açık bir yasak doğrulayamadım, 'izin alınmamış logo kullanımı' diye ifade edilsin. Severity yükseltildi: görev tanımı 'powered by Google / Claude rozetleri'ni açıkça slop sinyali olarak sayıyor ve iki sayfanın hero'sunda duruyor → critical.

### ÖNEMLİ

#### `media-02` — Markanın tek gerçek görsel fikri (alev) en görünmez yere gömülmüş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/videos/about-alaz-section.mp4; src/app/[locale]/about/page.jsx:49-50 (opacity-[.5] + gradient .55→.4→#090909); messages/en.json about.originParagraphs / originDefinition; frames-about-alaz-section.png; about-desktop-full.png (2. bölüm)

**Sorun.** About sayfasındaki 'Why we're called ALAZ' bölümü markanın asıl hikâyesini anlatıyor: 'the working flame, not the first spark'. Bu bölümün arkasındaki üfleç alevi makro çekimi sitedeki tek anlamlı footage; ama %50 opaklık ve %55 siyah gradyan altında (etkin görünürlük ~%22) kıpırdayan gri bir leke olarak kalıyor. Aynı sayfanın hero'su ise ilgisiz bir CGI jiroskop.

**Neden önemli.** Awwwards sitelerinin ortak noktası tek bir güçlü fikrin tüm görsel dili yönetmesidir (Locomotive'in çizgi dili, Obys'in tipografik dokusu gibi). ALAZ'ın elinde böyle bir fikir var ve kullanmıyor; bunun yerine jenerik stokla dolduruyor.

**Ne yapılmalı.** Hiyerarşiyi tersine çevir: alev, markanın ana motifi olsun. Ya gerçek çekim (bir demirci ocağı/üfleç alevi, 4K 120fps slow-motion, siyah fon, tek ışık; 6–8 saniyelik kusursuz loop) ya da generatif shader (eklemeler #1). Bu motif home hero, about hero ve start-project'te tutarlı biçimde kullanılsın; stok jiroskop/dişli/roket tamamen gitsin. Alev, en az %70 kontrastla, kompozisyonun parçası olarak görünsün; başlığın altına değil yanına yerleşsin.

#### `media-03` — Videolar 'görünmez doku' olarak kullanılıyor: MB'larca yük, sıfır görsel katkı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35,38 (opacity-[.62] + gradient .55→.10→#0a0a0a); about/page.jsx:36-38 (opacity-[.55] + .60→.20→#090909); services/page.jsx:64,74; case-studies/page.jsx:29,32; IntakeForm.jsx:93,96; home/sim-hero-desktop.png, home/sim-contact-desktop.png

**Sorun.** Her video önce opacity .5–.62'ye düşürülüyor, sonra üstüne %55–78 siyah dikey gradyan ve %19–35 yatay gradyan biniyor. Hesap: about hero'da footage'ın etkin görünürlüğü üstte ~%22, ortada ~%44, altta %0. Kullanıcı 1,1–4,4 MB indiriyor ve karşılığında hafifçe kıpırdayan gri lekeler alıyor. (Not: shots/ klasöründeki siyah video alanları headless Chromium'un H.264 çözememesinden; gerçek tarayıcıda görüntü var ama yine bu kadar bastırılmış.)

**Neden önemli.** Ne tam görsel ne tam tipografi: iki arada kalan 'atmosfer için video' yaklaşımı template sitelerinin imzasıdır. Awwwards'ta ya footage kompozisyonun kahramanıdır (Resn, Active Theory) ya da hiç yoktur (Obys); %22 görünürlükte bulamaç yoktur.

**Ne yapılmalı.** Kural koy: bir varlık ≥%70 kontrastla gösterilemiyorsa var olmasın. Kalacak her görsel için overlay'i tek, hafif bir alt gradyana indir (örn. linear-gradient(180deg, transparent 55%, #0a0a0a 100%)) ve opacity'yi 1 yap; metin okunurluğunu overlay'le değil yerleşimle (metni görselin boş alanına koyarak) çöz. 'Sadece doku' istenen yerlerde video yerine 2 KB'lık CSS grain (SVG feTurbulence) ya da hiçbir şey kullan.

> **Doğrulayıcı notu:** Overlay zinciri doğrulandı: about/services/case-studies hero'larında opacity .5–.55 × (1−.60/.20/1) → %22 → %44 → %0; about-alaz ve about-end bölümlerinde %22–30 → %0; home #contact'ta .62 × (1−.76/.68) ≈ %15–20. Ancak ana sayfa hero'su için 'sıfır görsel katkı' abartılı: dark-planet .62 × (1−.10) ≈ %56 orta-kare görünürlükle gezegen net okunuyor (home/sim-hero-desktop.png). 'Görünmez doku' iddiası about/services/case-studies hero'ları ve dört BackgroundVideo bölümü için geçerli. Satır düzeltmesi: services video sınıfı :63, gradient :73. Severity: media-01 zaten critical olduğu için bu bulgu aynı sorunu ikinci kez saymasın; 'ya ≥%70 kontrast ya hiç' kuralı doğru düzeltme → major.

#### `media-04` — Video teslimatı kötü: sessiz videolarda ses izi, tek codec, preload=auto, mobil kaynak yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/videos/*.mp4 (ffprobe: 1280×720, h264 + aac 128 kbps, 24 fps, 1,2–3,6 Mbps); src/app/[locale]/page.jsx:35 preload="auto"; about/page.jsx:36; services/page.jsx:66-69; case-studies/page.jsx:29; IntakeForm.jsx:93; codec testi: canPlayType('video/mp4; codecs=avc1') = '' (boş) headless Chromium'da

**Sorun.** (1) Sekiz dosyanın hepsinde AAC 128 kbps ses izi var; videolar muted — ~160 KB × 8 ≈ 1,2 MB çöp. (2) Yalnızca H.264 kaynak; WebM/AV1 alternatifi yok. H.264 lisansı olmayan Chromium derlemelerinde (ve bu test ortamında) video hiç oynamıyor, siyah poster kalıyor. (3) Beş hero'da autoPlay + preload="auto": sayfa açılır açılmaz 1,1–4,4 MB iniyor; the-work-section.mp4 3,4 Mbps ile 4,4 MB. (4) Mobil için küçük kaynak yok; 390 px ekrana 720p indiriliyor. (5) 7,5–10 s'lik loop'lar; kesintisiz döngü için kesilmemiş.

**Neden önemli.** 'Speed is a feature' diyen stüdyonun ana sayfası ilk saniyede megabaytlarca stok video indiriyorsa marka vaadi görsel katmanda çürüyor. Craft eksikliği: Awwwards sitelerinde loop'lar 300–800 KB arasında, sessiz, çift codec'li ve ekran boyutuna göre servis edilir.

**Ne yapılmalı.** Kalacak her döngü için: ffmpeg -an ile sesi at; 3–5 s'lik kusursuz loop kes (ilk ve son kare eşleşsin); AV1 (libsvtav1, crf 38) + VP9 WebM + H.264 fallback üret, 720p için ~900 kbps hedefle (≤600 KB/dosya); <source media="(max-width:768px)"> ile 540p mobil varyant ver; hero'larda preload="metadata" + IntersectionObserver ile src ata (BackgroundVideo.jsx'teki mantığı hero'ya da uygula); ilk kareyi AVIF poster olarak ver. Alternatif: videoyu tamamen bırakıp shader'a geç (eklemeler #1) — 20 MB yerine ~40 KB JS.

> **Doğrulayıcı notu:** ffprobe ile doğrulandı: 8 dosyanın tamamı 1280×720 h264 + aac 128 kbps, 24 fps, format bitrate 1,2–3,6 Mbps; ses izleri 7,5–10 s × 128 kbps ≈ 120–160 KB/dosya, toplam ≈1,1 MB çöp. preload="auto" beş hero'da doğru (page.jsx:35, about:36, services:68, case-studies:29, IntakeForm:93). Mobil kaynak yok. Codec testi tekrar çalıştırıldı: bu Chromium'da canPlayType(mp4/avc1)='' , webm/vp9='probably'. DÜZELTME: (5) 'loop'lar kesintisiz döngü için kesilmemiş' iddiası büyük ölçüde yanlış. İlk kare ile son kare (−0,25 s) ortalama mutlak fark (0–255): dark-planet 0,0; about-section 0,1; services-section 0,5; the-work-section 0,9; about-alaz 2,2; about-end 2,8 → bunlar kusursuz döngü. Yalnızca start-project-rocket (7,7) hafif, start-a-project-hero (25,0 — ana sayfa #contact bölümünde her 10 s'de görünür sıçrama) gerçek dikiş sorunu taşıyor. Fix'ten 'tüm loop'ları yeniden kes' adımı çıkarılsın; ses atma, çift codec, mobil kaynak, preload=metadata + IntersectionObserver adımları aynen geçerli.

#### `media-05` — poster.png düz siyah bir dikdörtgen; hareket-azalt/veri-tasarrufu/Low Power kullanıcıları boş blok görüyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/videos/poster.png (1280×720, 3 KB, düz #0a0a0a; media-review/icons-sheet.png sol-alt); src/components/BackgroundVideo.jsx:30; page.jsx:35; about/page.jsx:36; git log f3140c1 'Add video posters for SEO'

**Sorun.** Tüm videolar aynı düz siyah poster'ı kullanıyor. prefers-reduced-motion, saveData, iOS Düşük Güç Modu (autoplay engellenir) ve H.264 çözemeyen tarayıcılarda hero'nun tamamı boş siyah kalıyor; LCP için görsel aday yok; 'SEO için poster' commit'i de anlamsız çünkü siyah karenin indekslenecek içeriği yok.

**Neden önemli.** Erişilebilirlik tercihine saygı gösteren kullanıcıya cezalandırıcı bir boşluk sunmak craft hatası; ayrıca ilk boyama anında 'video yüklenmedi' hissi veriyor.

**Ne yapılmalı.** Her döngü için gerçek ilk kareden AVIF/WebP poster üret (ffmpeg -ss 0 -frames:v 1, 1440 px genişlik, ~30–60 KB) ve videoya özel poster ver. Shader'a geçilirse reduced-motion durumunda shader'ın tek statik karesini (canvas.toDataURL ile derlenmiş PNG) göster. poster.png'yi sil.

> **Doğrulayıcı notu:** poster.png doğrulandı: 1280×720, 3.756 bayt, tek renk (9,9,9) — PIL getcolors tek giriş döndürdü. Commit f3140c1 'Add video posters for SEO' git log'da mevcut. BackgroundVideo.jsx:30 ve beş hero'da aynı poster. DÜZELTME: 'prefers-reduced-motion / saveData kullanıcıları boş siyah blok görüyor' ifadesi yalnızca dört BackgroundVideo bölümü (home #contact, about-alaz, about-end, services CTA) için doğru. Beş hero <video autoPlay> için reduced-motion/saveData hiç ele alınmıyor (globals.css:92-99 sadece reveal geçişlerini kapatıyor) — bu kullanıcılar siyah blok değil, oynayan video alıyor (bkz. missed #1). Siyah poster senaryosu iOS Düşük Güç Modu/autoplay reddi ve H.264 çözemeyen tarayıcılar için doğru. Fix (gerçek ilk kareden AVIF/WebP poster, shader'da statik kare) yerinde.

#### `media-06` — Blog kapakları AI site-builder CDN'inden çekilen, griye çevrilmiş stok görseller

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:97 ve :113 (images.hostinger.com/...png); src/app/[locale]/blog/[slug]/page.jsx:97-99 (h-[clamp(230px,38vw,520px)] + grayscale(1) brightness(.82)), :33 (OG image 1200×630 sabit); layout.jsx:56-57 preconnect; blogpost-d-cover.png, blogpost-m-cover.png (boş #171717 bant)

**Sorun.** İki yazının kapağı images.hostinger.com'da duran PNG'ler (horizons-cdn = Hostinger Horizons AI builder; bu ortamda proxy nedeniyle indirilemedi, /_next/image 500 döndü ve sayfada 520 px yüksekliğinde boş gri bant kaldı). Kod kapağı grayscale(1)+brightness(.82) ile bastırıyor — yani renkli stok görsel siteye uymadığı için desatüre edilmiş. OG metadata'sı boyutları bilmeden 1200×630 yazıyor. Blog index'i ise kapaksız, tamamen tipografik (blog-desktop-full.png) — kapaklar yalnızca yazı sayfasında, en zayıf hâlleriyle görünüyor.

**Neden önemli.** 'Stok görseli gri yapıp koymak' AI-generated site imzalarının en bilineni. Üçüncü parti CDN'e bağımlı kapak hem güvenilirlik (link kırılırsa boş bant) hem performans (preconnect, ek TLS) maliyeti. Awwwards blogları ya kapaksızdır ya da kapak editoryal bir fikir taşır.

**Ne yapılmalı.** Seçenek A (önerilen): kapak bandını tamamen kaldır; index zaten tipografik ve güçlü. Seçenek B: kapakları marka sisteminden üret — yazının kendi verisinden SVG (örn. '0.1 s → +8.4 % conversion' tek büyük sayı, Archivo + JetBrains Mono, 4 kolon grid), public/blog/<slug>/cover.svg olarak yerelde tut; OG için src/app/[locale]/blog/[slug]/opengraph-image.jsx ile next/og kullan. Her iki durumda en.json'daki hostinger URL'lerini, layout.jsx:56-57 preconnect/dns-prefetch'i ve next.config.js:9-12 remotePatterns'ı sil.

> **Doğrulayıcı notu:** Doğrulanan kısımlar: en.json:97 ve :113 images.hostinger.com PNG'leri; blog/[slug]/page.jsx:98 grayscale(1) brightness(.82) + :97 h-[clamp(230px,38vw,520px)]; :33 sabit 1200×630; layout.jsx:56-57 preconnect/dns-prefetch; next.config.js:9-12 remotePatterns; blog index tamamen tipografik. DOĞRULANAMAYAN kısım: kapakların 'stok görsel' olduğu iddiası — URL'ler bu ortamdan erişilemiyor (proxy CONNECT 403, /_next/image 500); blogpost-d-cover.png'deki boş gri bant ortam artefaktı, prod ziyaretçisinin gördüğü şey değil. Ayrıca kapaklar horizons-cdn'de değil, images.hostinger.com'da (yalnız media.earth horizons-cdn'de). Yine de 'renkli görseli desatüre edip koyma' kalıbı, üçüncü parti CDN bağımlılığı ve her sayfada preconnect maliyeti gerçek. İçerik görülmeden critical verilemez → major. Fix (kapağı kaldır ya da yazının verisinden yerel SVG + next/og) doğru.

#### `media-08` — Market Hours vaka çalışmasında gerçek ürün görüntüsü yok; hero neredeyse siyah ve başlık harita etiketleriyle çakışıyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** public/projects/market-hours/cover.jpg, hero.jpg (brand/projects/market-hours/build_banner.py ile Pillow'da çizilmiş sabit sahte anlık görüntü: 'Tue 8 Dec 2026 14:42:11 UTC'); src/app/[locale]/case-studies/[slug]/page.jsx:83-85 (iki gradyan: .78→.30→.62→#090909 + yatay .55→transparent); messages/en.json market-hours projesinde 'gallery' anahtarı yok; case-market-hours-desktop-fold.png, case-market-hours-mobile-fold.png, case-market-hours-desktop-full.png

**Sorun.** Kapak, canlı ürünün ekran görüntüsü değil, kod ile yeniden çizilmiş bir 'banner'. Hero varyantı (sadece harita) üstüne binen iki gradyanla neredeyse siyaha dönüyor; 1440 px'de 'MARKET HOURS.' başlığı 'XETRA' ve 'BIST' etiketlerinin üstüne basıyor, 390 px'de yalnızca 'BIST' noktası seçiliyor. Hero'nun altında sayfa tamamen metin: tek bir dashboard ekranı, tek bir telefon ekranı, tek bir saniyelik hareket yok.

**Neden önemli.** Vaka çalışması = kanıt. Canlı bir web ürününün (markethours.live) gerçek görüntüsü olmadan sayfa 'anlatıyor ama göstermiyor'; jüri ve müşteri için inandırıcılık kaybı. Ürünün kendi hareketi (gün/gece terminatörü, alarm) sitedeki stok gezegenden daha güçlü bir görsel.

**Ne yapılmalı.** (1) markethours.live'dan 1440 px ve 390 px gerçek ekran görüntüleri (Playwright ile deterministik; karanlık tema, gerçek saat) + Flutter uygulamasının 4–6 ham ekranı; en.json'a 'gallery' ekle. (2) 6–8 s'lik ekran kaydı: terminatörün hareketi / bir borsanın açılması / alarmın çalması — hero'da tam kontrastla, metni haritanın boş sol-alt bölgesine alarak. (3) Pillow banner'ını yalnızca arşiv küçük resmi ve OG görseli olarak tut. (4) Hero gradyanını tek alt gradyana indir (media-03) ve başlığı etiketlerin olmadığı bölgeye hizala (object-position: 70% 40%).

#### `media-09` — Vocabulary hero'da sarı maskot karartılarak hardal/zeytin rengine dönüyor, kulaklar kırpılıyor, başlık yüzün üstüne biniyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/projects/vocabulary/hero.png (1920×1200, #FFE500 zemin); src/app/[locale]/case-studies/[slug]/page.jsx:83-85 (object-cover + .78→.30→.62→#090909 ve yatay .55 gradyanlar); case-vocabulary-desktop-fold.png, case-vocabulary-mobile-fold.png

**Sorun.** Sitedeki tek doygun renk varlığı, hero arka planı olarak kullanılıp üstüne %30–78 siyah bindirilince saf sarı kirli bir zeytin/kahve tonuna düşüyor; kedinin kulakları header'ın altında kalıyor; 'VOCABULARY.' başlığı maskotun gözlerinin ve '8000' kartının üstüne basıyor. Mobilde kart '800' olarak kesiliyor.

**Neden önemli.** Projenin kendi marka rengini öldürmek, stüdyonun 'tasarıma saygı' mesajını baltalar. Awwwards stüdyo siteleri (Locomotive, Obys) proje sayfasında projenin rengine sahnenin tamamını verir; karartıp üstüne yazmaz.

**Ne yapılmalı.** Renkli ürün görselini karartılmış fon olarak kullanma. Seçenek A: hero'yu ikiye böl — sol %55 tipografik blok #0a0a0a üstünde, sağ %45 tam doygunlukta #FFE500 panel içinde maskot (overlay yok, object-position: center 40%, header'a padding). Seçenek B: tüm hero'yu sarıya çevir, başlık ve metin siyah (bu sayfada paletin tersine dönmesi güçlü bir ritim kırılması olur). Her iki durumda project.colorImage=true için gradyan sınıflarını kaldır.

> **Doğrulayıcı notu:** Doğrulandı: hero.png saf #FFE500 zemin; case-vocabulary-desktop-fold.png'de sarı hardal/zeytine dönüyor, 'VOCABULARY.' başlığı kedinin gözleri ve 8000 kartının üstünde; mobile-fold'da kart '800' olarak kesiliyor. DÜZELTME: 'kedinin kulakları header'ın altında kalıyor' iddiası ekran görüntüleriyle uyuşmuyor — 1440×900'de kulak uçları bölüm tepesinden ~120 px aşağıda (header 75 px), 390×844'te de tamamen görünür. Bu cümle çıkarılsın. Fix (ikiye bölünmüş hero ya da tam sarı sayfa; colorImage=true için gradyanları kaldır) doğru.

#### `media-10` — Ana sayfa proje kartı bir App Store reklam banner'ı: görselin içindeki metin kartın kendi metniyle çakışıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/projects/vocabulary/cover.png ('English Vocabulary / The most common words. Swipe. Listen. Play.' + 3 pill); src/app/[locale]/page.jsx:145-152; messages/en.json projects[0].image; probe-home-project-hover.png, home/work-desktop.png

**Sorun.** Kapak görselinin içinde başlık, slogan ve üç özellik etiketi var; hemen altında kart tekrar 'VOCABULARY' başlığını ve özeti yazıyor. Görsel bir stüdyo vaka küçük resmi gibi değil, mağaza listeleme afişi gibi okunuyor. Görsel-içi metin İngilizce olduğundan TR locale'de de İngilizce kalıyor.

**Neden önemli.** Görsel içinde metin = yerelleştirilemez, erişilemez, ve 'hazır afişi koyduk' hissi. Studio Freight / Basement kartlarında görsel ürünü bağlamda gösterir; metin HTML'dedir.

**Ne yapılmalı.** Kapak = ürün bağlamda: #FFE500 zemin üzerinde 2 telefon çerçevesi (CSS/SVG ile çizilmiş, PNG değil) içinde gallery/en/01.webp ve 04.webp gerçek ekranları, ya da yalnızca maskot + kart (hero.png'nin metinsiz hâli). Görsellerde metin bulundurma; hover'da kart bir ekran kaydına geçsin (eklemeler #2).

#### `media-11` — Vaka index'inde hover önizlemesi 'SCOPE' sütununun üstüne biniyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/page.jsx:47 (absolute right-[10%] w-[220px] h-[130px] -rotate-4); cs-d-row-hover.png ('LANGUAGE LEARNING / IOS & ANDROID' metni 'LAN…ROID' olarak görünüyor)

**Sorun.** 220×130 px önizleme, satırın sağ %10'una sabitlenmiş; 1440 px'de tam SCOPE metninin üstüne düşüyor ve metni okunmaz hâle getiriyor. -rotate-4 ve sabit konum, 2019 template'lerinin 'hover image' kalıbı.

**Neden önemli.** Çakışma doğrudan craft hatası; sabit konumlu dönük önizleme de artık jenerik. Awwwards'ta bu desen imleci lerp ile takip eden, ölçeklenen bir görsel olarak yaşıyor.

**Ne yapılmalı.** Önizlemeyi imleç takipli yap: satır üzerinde mousemove → hedef x/y; requestAnimationFrame'de 0.12 lerp ile transform: translate3d; giriş/çıkışta scale .9→1 ve clip-path. Fallback (pointer: coarse) için önizlemeyi başlık ile scope arasındaki boş alana (right-[32%]) sabitle ve rotate'i kaldır.

> **Doğrulayıcı notu:** Çakışma doğrulandı: cs-d-row-hover.png'de 220×130 önizleme SCOPE sütununun üstünde, metin 'LAN…ROID' olarak kalıyor (case-studies/page.jsx:47 right-[10%]). DÜZELTME: '-rotate-4' Tailwind 3'te tanımlı bir utility değil (varsayılan ölçek 0/1/2/3/6/12/45/90/180) ve tailwind.config'de rotate ölçeği yok → sınıf no-op; önizleme eğik değil, düz. '2019 dönük hover görseli' eleştirisi düşsün, sabit konumlu çakışma asıl hata. Portföy index'inin tek hover durumunda görünür bir kusur olduğu için major. Fix (imleç takibi + lerp; coarse pointer için sabit, çakışmayan konum) doğru; ara çözüm olarak right-[30%] ya da NO. sütunundaki boşluk.

#### `media-12` — Sitede tek bir insan fotoğrafı yok; referanslar baş harfli, yazar bloğu 'A.' karesi

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** messages/en.json testimonials[] (MERVE T., BURAK Y., SELIN A.); src/app/[locale]/page.jsx:88-96 (fotoğrafsız blockquote); blog/[slug]/page.jsx:108 ('A.' mono kutusu); about/page.jsx (ekip/kurucu görseli yok); brand/kartvizit/onizleme/ALAZ-kartvizit-onizleme.png ('MUSTAFA KAHRAMAN — FOUNDER & DEVELOPER')

**Sorun.** About sayfası 'engineering practice' diyor ama kim olduğunu göstermiyor; referanslar sadece baş harf + unvan (fotoğraf, şirket, logo yok) → sahte izlenimi; blog yazarı 'The ALAZ Team' + mono 'A.' tile. Kartvizitte bir kurucu adı var, sitede yok.

**Neden önemli.** Awwwards'daki stüdyo siteleri (Basement, Unseen, Hello Monday, Active Theory) insanları, masayı, beyaz tahtayı gösterir; gerçek insan yoksa 'AI-generated agency' şüphesi doğar. Baş harfli referanslar güven yerine şüphe üretir.

**Ne yapılmalı.** Tek tutarlı bir fotoğraf serisi: kurucu/ekip portreleri (siyah-beyaz, doğrudan flaş ya da tek pencere ışığı, #0a0a0a fon ile uyumlu), çalışma alanı, beyaz tahtada mimari diyagram (copy'de zaten 'a system exists on a whiteboard' yazıyor — göster). About hero'ya portre, blog yazar bloğuna gerçek yazar fotoğrafı. Referanslar: tam ad + şirket + fotoğraf/logo alınamıyorsa bölümü kaldır.

#### `media-14` — Logo, favicon, OG ve manifest arasında marka tutarsızlığı; OG görseli 405 KB ve eski slogan taşıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** brand/logo/alaz-logo-*.svg ('ALAZ.' gri #858585 kare nokta); src/app/icon.svg (yalnız 'A', noktasız); public/logo.png 512×512 (yalnız 'A'; src/lib/seo.js:14 LOGO_URL → schema.org Organization.logo, StructuredData.jsx:24); public/apple-touch-icon.png; public/og-image.png (1200×630, 405 KB, beyaz nokta, 'SOFTWARE & HIGH-PERFORMANCE WEB ENGINEERING'); src/lib/seo.js:15 OG alt; src/app/manifest.js:3-5 ('Software Architecture & Engineering Studio'); media-review/icons-sheet.png, og-image.png, og-crop.png

**Sorun.** (1) Kimlik 'ALAZ.' + gri kare nokta; favicon/logo.png/apple icon noktasız jenerik 'A' — Google'ın Organization logosu olarak da bu 'A' gidiyor. (2) OG'de nokta beyaz, markada gri. (3) OG sloganı 'high-performance web engineering' (sadece web), hero 'WEB · MOBILE · SYSTEMS', manifest 'Software Architecture…', hero topline 'SOFTWARE STUDIO' — dört farklı konumlandırma. (4) OG PNG'si düz iki renkli olmasına rağmen 405 KB; arka planda AI/raster export'a özgü rastgele ince çizgi ve gürültü var (og-crop.png), sitedeki 4 kolonlu temiz grid'le uyumsuz. (5) Her sayfa (vaka ve blog hariç) aynı OG görselini kullanıyor.

**Neden önemli.** Marka varlıkları bir sistemin parçası olmalı; paylaşım kartı ve sekme ikonu markanın en çok görülen yüzleri. Tutarsızlık 'parça parça üretildi' hissi verir; 405 KB OG, hız iddiasıyla çelişir.

**Ne yapılmalı.** Tek kaynak: brand/logo SVG'den türet. icon.svg = gri kare nokta tek başına (16 px'te okunur, sahiplenilmiş) ya da 'A' + köşede nokta; içine prefers-color-scheme media query koy; manifest'e maskable 512 PNG ekle. logo.png'yi SVG'den yeniden üret (wordmark + nokta, 512 kare içinde padding'li). OG'yi src/app/[locale]/opengraph-image.jsx ile next/og'dan dinamik üret: Archivo Black 'ALAZ.' gri nokta, güncel slogan tek yerden (seo.js'de SITE_TAGLINE), sayfa adı eyebrow olarak; çıktı ≤60 KB. Eski og-image.png'yi sil.

#### `media-missed-1` — Beş hero videosu prefers-reduced-motion ve saveData'yı tamamen yok sayıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:35; about/page.jsx:36; services/page.jsx:61-70; case-studies/page.jsx:29; src/components/IntakeForm.jsx:93; src/app/globals.css:92-99 (yalnız reveal geçişleri); src/components/BackgroundVideo.jsx:14 (yalnız fold altı bölümler)

**Sorun.** BackgroundVideo.jsx reduced-motion ve navigator.connection.saveData'ya saygı gösteriyor, ama fold üstündeki beş hero düz <video autoPlay loop> olarak render ediliyor ve hiçbir koşulda durmuyor. globals.css'teki reduced-motion bloğu sadece data-reveal animasyonlarını kapatıyor. Hareket azaltma isteyen kullanıcı 7,5–10 s'lik sonsuz döngüyü izlemek zorunda; veri tasarrufu isteyen kullanıcı preload="auto" ile 1,1–4,5 MB indiriyor.

**Neden önemli.** WCAG 2.2.2 (5 s'den uzun otomatik hareketli içerik için durdurma mekanizması) ve 2.3.3 ihlali; ayrıca sitenin kendi BackgroundVideo bileşeninin koyduğu standardın hero'larda uygulanmaması craft tutarsızlığı. Awwwards jürisi erişilebilirlik puanı da veriyor.

**Ne yapılmalı.** Beş hero'yu BackgroundVideo'nun mantığını paylaşan tek bir client 'HeroVideo' bileşenine taşı: matchMedia('(prefers-reduced-motion: reduce)') veya saveData → src atama, poster'da kal (gerçek ilk kareden üretilmiş poster, bkz. media-05); aksi hâlde play. Ek güvence olarak CSS: @media (prefers-reduced-motion: reduce) { video[autoplay] { display: none } }. preload="auto" → "metadata". Video tamamen shader/kare dizisine dönerse aynı kural orada da (statik kare) uygulansın.

#### `media-missed-2` — Market Hours ana sayfa kartı: görsel içinde başlık, alt başlık, donmuş 'canlı' saat ve oturum kartları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** public/projects/market-hours/cover.jpg (brand/projects/market-hours/build_banner.py, SNAPSHOT 2026-12-08 14:42:11 UTC); src/app/[locale]/page.jsx:146-152 ve :174; home/work-desktop.png sağ kart

**Sorun.** Kapak görseli 'MARKET HOURS_ / FOREX & STOCKS · TACTICAL WORLD MARKET MAP' başlığını, '14:42:11 UTC' sabit saati, 'LONDON / NY KILLZONE ACTIVE' rozetini ve dört oturum kartını içeriyor; hemen altında kart HTML'de yine 'MARKET HOURS' + özet yazıyor. 'Canlı' olduğu vurgulanan bir ürünün kartında kodla çizilmiş sahte bir anlık görüntü ve donmuş saat, mock-up gibi okunuyor; görsel içi metin TR locale'de de İngilizce kalıyor. Reviewer media-10'da aynı kusuru yalnız Vocabulary için saptadı.

**Neden önemli.** Görsel içi metin yerelleştirilemez ve erişilemez; sabit 14:42:11 saati 'live on the web' iddiasıyla çelişip inandırıcılığı düşürüyor. Awwwards stüdyo kartlarında ürün bağlamda gösterilir, başlık HTML'dedir.

**Ne yapılmalı.** Kart için hero.jpg'yi (yalnız harita, başlıksız) ya da tercihen markethours.live'dan Playwright ile alınmış gerçek 1440 px ekran görüntüsünü kullan; başlık ve meta yalnız HTML'de kalsın. build_banner.py'deki tam banner'ı sadece OG/arşiv görseli olarak sakla. Hover'da 4–6 s'lik gerçek terminatör hareketi kaydına geç (reviewer eklemeler #2).

### İNCE İŞÇİLİK

#### `media-07` — en.json 'media.*' altındaki 5 uzak AI görseli ölü veri; yine de istemciye gönderiliyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json:2-8 (earth, server, wafer, conduits, laboratory → horizons-cdn / images.hostinger.com); src/app/[locale]/page.jsx:22 (const media = tRoot.raw('media') — hiç kullanılmıyor); src/app/[locale]/layout.jsx:56-57; next.config.js:9-12

**Sorun.** grep sonucu: 'media' yalnızca page.jsx:22'de okunuyor ve sonra hiç referans verilmiyor. Beş URL hiçbir yerde render edilmiyor; ama NextIntlClientProvider messages={messages} ile tüm mesaj paketi istemciye gittiği için bu URL'ler her sayfada HTML/JS içinde taşınıyor ve hostinger preconnect'ini meşru gösteriyor.

**Neden önemli.** Ölü varlık referansı, 'AI üretti, sonra kimse temizlemedi' izi; ayrıca gelecekte birinin bu 'laboratory/wafer/server' stok görsellerini tekrar siteye sokmasına davetiye. Temizlik, craft'ın parçası.

**Ne yapılmalı.** en.json'dan 'media' bloğunu, page.jsx:22 satırını, layout.jsx:56-57 preconnect/dns-prefetch'i ve (blog kapakları yerelleştikten sonra) next.config.js remotePatterns'ı sil. Türkçe dosyada da aynı anahtarı temizle. Hostinger'daki görselleri de hesaptan kaldır ki yanlışlıkla geri dönmesin.

> **Doğrulayıcı notu:** Doğrulandı: grep sonucu 'media' yalnızca page.jsx:22'de okunuyor, sonra hiç kullanılmıyor; en.json:2-8'deki beş URL layout.jsx:50/72 (getMessages → NextIntlClientProvider messages={messages}) ile her sayfanın istemci paketinde taşınıyor. Aynı aileden ek ölü anahtarlar: about.imageAlt 'Architectural engineering laboratory with precision workstations' ve about.imageCaption 'FIG. 01 — THE PRACTICE OF PRECISION' (en.json:517-518) — artık render edilmeyen stok 'laboratory' görselinin kalıntısı; bunlar da silinmeli. Severity düzeltmesi: ziyaretçi ve jüri için görünmez, hijyen işi → minor.

#### `media-15` — Her iki vaka sayfasında devre dışı 'COMING SOON' mağaza rozetleri; resmi badge artwork'ü değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/StoreButtons.jsx (Simple Icons Apple/Google Play path'leri, kod yorumu: 'Swap these for the official badge artwork once the apps are live'); src/lib/stores.js (tüm linkler boş); case-studies/[slug]/page.jsx:100-103; case-vocabulary-desktop-fold.png, case-market-hours-desktop-fold.png

**Sorun.** Vocabulary ve Market Hours sayfalarının ikisinde de iki gri, tıklanamayan 'COMING SOON ON APP STORE / GOOGLE PLAY' kutusu duruyor. İki projenin ikisi de 'yakında' → portföy vaporware gibi okunuyor. Simple Icons markaları Apple/Google'ın badge kılavuzlarına uymuyor.

**Neden önemli.** Marka varlığı kullanımında hem kılavuz ihlali hem güven kaybı; Awwwards stüdyo sayfalarında olmayan şey gösterilmez, var olan link verilir.

**Ne yapılmalı.** stores.js'de link yoksa StoreButtons'ı hiç render etme (yalnız 'VISIT MARKETHOURS.LIVE' kalsın). Uygulama yayına girince resmi SVG badge'leri kullan (developer.apple.com/app-store/marketing/guidelines, play.google.com/intl/en_us/badges) ve public/badges/ altında yerel tut. Yayın öncesi durum için metin yeterli: 'iOS & Android release in preparation'.

#### `media-16` — Alt metinleri dolgu: '{name} technical engineering visual'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json caseStudy.imageAlt ('{name} technical engineering visual'), home.selected.imageAlt ('{name} {type} engineering visual'), blogPost.coverAlt ('{title} — cover visual'), archive.previewAlt

**Sorun.** Alt metinleri görseli tarif etmiyor; 'engineering visual' kalıbı her görsel için aynı. Sarı kedi maskotuna 'technical engineering visual' denmesi hem erişilebilirlik hem SEO açısından anlamsız.

**Neden önemli.** Ekran okuyucu kullanıcısı için bilgi yok; Google Görseller için sinyal yok; 'şablondan üretildi' izi.

**Ne yapılmalı.** Proje verisine 'imageAlt' alanı ekle ve gerçek tarif yaz: 'Vocabulary app cover: white cat mascot holding an 8000-word flashcard on yellow', 'Market Hours dashboard: dotted world map with NYSE, LSE and BIST open and the London/New York killzone'. Galeri için ekran içeriğini yaz ('Swipe card for the word closure with pronunciation and example').

#### `media-17` — Proje kapaklarının üstünde 'ALAZ / 01' pill'i ve ok kutusu: görselin üstüne gereksiz krom

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:162-167 (absolute top-[20px] left-[20px] bg-black/60 backdrop-blur-md 'ALAZ / 01'; w-[42px] h-[42px] ok kutusu); probe-home-project-hover.png, home/work-desktop.png

**Sorun.** Kapağın köşesine blur'lu numara pill'i ve sağ alta çerçeveli ok konuyor; hemen altındaki meta satırı zaten '01 / MOBILE APPLICATION' diyor. Görselin üstündeki index etiketi, görev tanımında listelenen 'her bölümde 01/05 eyebrow' slop desenine giriyor.

**Neden önemli.** İyi bir kapak nefes almalı; üstündeki UI süsü hem tekrar hem 'dashboard template' hissi.

**Ne yapılmalı.** Görselin üstündeki iki overlay'i kaldır. Numara ve okları HTML meta satırında tut. Hover'da yalnızca görselde hafif scale(1.03) + ekran kaydına geçiş (eklemeler #2) olsun.

#### `media-18` — Vocabulary galerisi mağaza pazarlama ekranlarını ham grid'de, küçük ölçekte gösteriyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/projects/vocabulary/en/01-07.webp (1080×1920, App Store pazarlama ekranları: 'Learn the 8000 most common English words' başlıklı); src/app/[locale]/case-studies/[slug]/page.jsx:133-147 (grid-cols-4 aspect-[9/16]); case-vocabulary-desktop-full.png, cs-d-vocab-gallery.png

**Sorun.** Yedi mağaza görseli (her biri pazarlama başlığı + renkli zemin + telefon çerçevesi içeriyor) 4'lü grid'de, 1440 px'de ~320 px genişlikte sunuluyor; ekrandaki UI detayı okunmuyor, başlıklar sayfadaki özet metnini tekrarlıyor. Mağaza görseli kanıt olarak iyi ama stüdyo vaka sayfasında ham ürün ekranı beklenir.

**Neden önemli.** Vaka çalışması ürünün gerçek arayüzünü, etkileşimini, kararlarını gösterir; mağaza afişi değil. Küçük grid, görselin en güçlü anlarını (kart kaydırma, tekrar takvimi) boşa harcıyor.

**Ne yapılmalı.** Ham ekranları (çerçevesiz, başlıksız; uygulamadan doğrudan 1170×2532 PNG) CSS ile çizilmiş cihaz çerçevesinde, 1:1 ölçeğe yakın (≈390 px genişlik) yatay sürüklenebilir bir carousel'de göster; 2–3 kritik etkileşimi (kart swipe, review takvimi, widget) büyük kırpımlarla ve kısa açıklama satırıyla öne çıkar; 5 s'lik ekran kaydı ekle. Mağaza afişleri istenirse en altta küçük 'store listing' satırı olarak kalsın.

#### `media-19` — Vaka index sayfasında en ağır varlık stok video, işin kendisi 220 px'lik hover küçük resmi

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** public/videos/the-work-section.mp4 (4,4 MB, 3,4 Mbps — sitedeki en büyük dosya); src/app/[locale]/case-studies/page.jsx:29-31 (preload="auto"), :47 (w-[220px] h-[130px] hover önizleme); case-studies-desktop-fold.png

**Sorun.** 'THE WORK' sayfasının hero'su CGI devre-şehir döngüsü; gerçek işler ise fold'un altında, yalnızca hover'da görünen 220 px'lik küçük resimler. Hiyerarşi tersine: stok görüntü işten büyük.

**Neden önemli.** Portföy sayfasının görsel kahramanı iş olmalı; stok video burada en pahalı ve en anlamsız varlık.

**Ne yapılmalı.** the-work-section.mp4'ü sil. Hero = işin kendisi: en güncel projenin tam genişlik kapağı/ekran kaydı ya da iki kapağın yatay kaydırmalı (scroll-driven, translateX) tam yükseklik şeridi; index satırları onun altında. Mobilde her satırın altına kapak görselini sabit göster (şu an mobile:hidden).

#### `media-20` — Kartvizit sistemine sitenin slop sözlüğü taşınmış

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** brand/kartvizit/kaynak/design.py; brand/kartvizit/onizleme/ALAZ-kartvizit-onizleme.png ('■ SYSTEM_ACTIVE', '// FOUNDER & DEVELOPER', 'INDEPENDENT SOFTWARE ARCHITECTURE STUDIO EST. 2026')

**Sorun.** Basılı marka varlığı, hero'daki 'SYSTEM_ACTIVE' pill'ini ve '//' yorum-satırı etiketlerini aynen taşıyor; sitedeki konumlandırma ('web, mobile, systems') ile kartın 'software architecture studio' ifadesi de uyuşmuyor.

**Neden önemli.** Site temizlendiğinde kart eski dili taşımaya devam ederse marka tutarlılığı bozulur; basılı malzeme düzeltmesi pahalı.

**Ne yapılmalı.** Site copy'si sadeleştikten sonra design.py'deki etiketleri güncelle ('SYSTEM_ACTIVE' ve '//' kaldır; unvan/slogan seo.js ile aynı kaynaktan), build.py ile yeniden üret, baskıyı ondan sonra ver. Kartın grid + gri nokta sistemi iyi; onu koru.

#### `media-21` — Hero videoları için WebM/AV1 alternatifi yok: H.264 çözemeyen tarayıcıda hero siyah kalıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35-37 (tek <source type="video/mp4">); about/page.jsx:36-38; services/page.jsx:62-72; case-studies/page.jsx:29-31; IntakeForm.jsx:93-95; codec testi (scratchpad/codec-check.cjs): canH264='' , canWebm='probably', canAv1='probably'

**Sorun.** Tüm <video> öğelerinde yalnızca MP4/H.264 kaynak var. Açık kaynak Chromium derlemeleri (Linux dağıtımları, bazı kurumsal tarayıcılar, headless ortamlar, bazı Android WebView'lar) H.264 çözemez; bu durumda poster (düz siyah) kalır. Bu ortamdaki tüm ekran görüntülerinin siyah hero göstermesinin nedeni de bu.

**Neden önemli.** Craft ve dayanıklılık: 'built to endure' iddiası, codec'e bağlı kırılan hero ile çelişir. Önizleme araçları (Awwwards jürisi de dahil, Linux'ta) siyah bir hero görebilir.

**Ne yapılmalı.** Her video için önce <source src="….webm" type="video/webm; codecs=vp9"> (veya AV1 MP4), sonra H.264 fallback ver; ffmpeg -c:v libvpx-vp9 -b:v 0 -crf 34 -an. Video tamamen shader/canvas'a dönerse (eklemeler #1) sorun kendiliğinden ortadan kalkar.

> **Doğrulayıcı notu:** media-04 (2) ile birebir aynı bulgu — birleştirilmeli. Codec testi tekrar çalıştırıldı (skeptic-codec.cjs): bu Playwright Chromium'da canPlayType mp4/avc1 = '' , webm/vp9 = 'probably'; dolayısıyla tüm shots/ ekran görüntülerindeki siyah hero'lar ortam artefaktı. Gerçek dünya etkisi sınırlı: Chrome/Safari/Firefox/Edge tüketici sürümleri H.264 çözer; etkilenen küme dağıtım Chromium derlemeleri, bazı headless/önizleme araçları. 'Jüri Linux'ta siyah hero görebilir' abartı. WebM/AV1 alternatifi yine de doğru pratik; media-04'ün fix'i içinde kalsın.

#### `media-missed-3` — Vaka sayfalarının OG görseli ham 16:10 kapak dosyası; paylaşım kartlarında kırpılıyor ve ağır

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:28 (image: absoluteUrl(project.image), width 1920, height 1200); canlı çıktı: <meta property="og:image" content="https://alaz.pro/projects/market-hours/cover.jpg"> 1920×1200; public/projects/market-hours/cover.jpg 537 KB JPEG q92 4:4:4, vocabulary/cover.png 202 KB

**Sorun.** Sosyal paylaşım kartları (X, LinkedIn, Slack, iMessage) 1,91:1 oranında kırpar; 16:10 kapak üstten-alttan ~%16 kaybeder (Vocabulary'de kedinin kulakları / pill'ler, Market Hours'ta başlık şeridi). Crawler'a next/image optimizasyonu olmadan 537 KB'lık ham JPEG gidiyor.

**Neden önemli.** Paylaşım kartı markanın en çok görülen yüzlerinden biri; kırpık ve ağır OG, 'hız' iddiasıyla ve craft'la çelişir.

**Ne yapılmalı.** src/app/[locale]/case-studies/[slug]/opengraph-image.jsx ile next/og: sol yarıda proje adı + 'ALAZ.' gri nokta, sağ yarıda kapağın 1,91:1'e göre yerleştirilmiş kırpımı; çıktı 1200×630 PNG ≤80 KB. Kapak dosyaları sayfa içi kullanımda kalsın. Reviewer'ın eklemeler #4'ü bunu kapsayacak şekilde genişletilsin.

#### `media-missed-4` — Ölü 'ALAZ / SPECIMEN // ASSET IN PROGRESS' fallback dalı slop sözlüğü taşıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:154-159 (project.image yoksa render edilen blok)

**Sorun.** İki projenin de görseli olduğu için bu dal hiç render edilmiyor; ama 'SPECIMEN' ve '// ASSET IN PROGRESS' gibi görev tanımında slop olarak listelenen mono-yorum dili kodda duruyor ve ileride görselsiz bir proje eklendiğinde anında ekrana çıkacak.

**Neden önemli.** Temizlik craft'ın parçası; dead branch'teki slop copy, ilk yeni projede sitenin görünür yüzüne döner.

**Ne yapılmalı.** Dalı sil ve project.image'ı zorunlu kıl (generateStaticParams/veri doğrulamasında image yoksa build hatası), ya da fallback'i düz tipografik bir kart (proje adı, #111 zemin) olarak yeniden yaz; mono yorum satırı ve 'SPECIMEN' kullanma.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Markaya ait generatif 'işleyen alev' shader'ı (tüm stok döngülerin yerine)

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Lusion (lusion.co) sıvı shader'ları, Unseen Studio (unseen.co) hero noise'u, Active Theory'nin WebGL atmosferleri; Patrik Hübner'in generative branding yaklaşımı

Tek bir WebGL sahnesi: fragment shader'da fbm (fractional Brownian motion) gürültüsü yukarı doğru kaydırılarak monokrom bir alev/ısı alanı; üstünde 'heat haze' kırılması (hero başlığının bulunduğu katmanı render-to-texture ile hafifçe büken refraksiyon). Scroll hızı ve imleç konumu uniform olarak girsin (yoğunluk 0.2–1.0 arasında), sayfalar arasında sahne kalıcı olsun (persist edilen canvas, route değişiminde sadece uniform değişir: home = geniş alev, services = ince şerit, start-project = tek nokta). Kütüphane: ogl (~10 KB) ya da three.js r16x + custom ShaderMaterial; devicePixelRatio 1.5 ile sınırla, prefers-reduced-motion'da tek statik kare. Toplam ~40 KB JS vs bugünkü 20 MB video. Renk: yalnızca #0a0a0a → #ffffff gri skalası (site paleti); alevin en parlak ucunu brand'in gri noktasıyla aynı tonda tut ki motif logoya bağlansın.

### Ürünün kendi hareketi: ekran kayıtları ve hover videoları

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (studiofreight.com) vaka kartları, Basement Studio (basement.studio) proje hover'ları

markethours.live'da Playwright ile deterministik 6–8 s kayıt (page.video, 1440×900; terminatör hareketini hızlandırmak için uygulamanın saatini sahte zamanla ilerlet) + Flutter uygulamasında simülatör kaydı (xcrun simctl io recordVideo); Vocabulary için kart swipe + review ekranı kaydı. Kayıtları 3–5 s loop'a kes, ses yok, VP9 WebM + H.264, ≤500 KB. Kullanım: (1) ana sayfa proje kartlarında hover'da <video> play / mouseleave'de pause (poster = kapak), (2) vaka hero'larında stok video yerine tam kontrastlı ürün hareketi, (3) vaka index'inde imleç takipli önizleme olarak.

### Stüdyo fotoğraf serisi: insanlar, masa, beyaz tahta

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday (hellomonday.com) ekip sayfası, Basement Studio 'about' çekimleri, Instrument (instrument.com)

Yarım günlük çekim, tek ışık, siyah-beyaz işlenmiş (sitenin paletine uyması için grayscale ama kontrastlı, karartılmamış): kurucu portresi, ekranda kod/terminal, beyaz tahtada mimari diyagram, İzmir ofis. Teslim: AVIF + WebP, 1600/1200/800 px varyantları, next/image ile. Kullanım: about hero (jiroskop yerine), blog yazar bloğu, referanslar (gerçek kişi fotoğrafı alınamıyorsa referans bölümü kaldırılır), start-project sayfasının sağ sütunu ('bu formu okuyacak kişi').

### next/og ile dinamik OG ve route bazlı paylaşım kartları

- **Etki:** orta · **Efor:** küçük · **Referans:** Vercel'in kendi OG kartları; Linear, Raycast değişim sayfaları

src/app/[locale]/opengraph-image.jsx (ImageResponse, Archivo Black'i fetch ile yükle): 'ALAZ.' + gri nokta + sayfa adı eyebrow + güncel slogan; vaka sayfaları için kapak görseli sağ yarıda, sol yarıda proje adı; blog için yazının anahtar sayısı ('0.1 s → +8.4 %') büyük tipografiyle. Çıktı 1200×630 PNG ≤80 KB, edge runtime. seo.js'deki sabit OG_IMAGE ve 405 KB'lık public/og-image.png kaldırılır.

### Kodla çizilen cihaz çerçevesi bileşeni (PNG mockup yerine)

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys Agency (obys.agency) vaka sayfaları, Locomotive (locomotive.ca) cihaz sunumları

<DeviceFrame kind="phone|browser"> bileşeni: SVG/CSS ile çizilmiş, yalnızca ince dış hat ve dynamic island (hiç gölge/yansıma yok, siteye uygun flat stil); içine next/image ya da <video>. Vaka galerisinde, ana sayfa kartlarında ve hero'larda aynı bileşen. Böylece mağaza görsellerinin içindeki hazır telefon çerçevelerine ve pazarlama başlıklarına ihtiyaç kalmaz; ekranlar ham PNG olarak güncellenir.

### Favicon/ikon sistemi: dinamik SVG + maskable ikon

- **Etki:** düşük · **Efor:** küçük · **Referans:** Linear ve Vercel'in tek-atom favicon yaklaşımı

src/app/icon.svg içine <style>@media (prefers-color-scheme: light){…}</style> ile iki tema; mark = gri kare nokta (brand'in en küçük atomu) ya da 'A' + nokta; src/app/icon.png (32×32) fallback; manifest.js'e {src:'/icon-512-maskable.png', purpose:'maskable'} ekle; apple-touch-icon'u SVG'den 180 px padding'li yeniden üret. Tüm ikonlar brand/logo SVG'sinden bir build script'iyle (sharp) türetilsin ki nokta rengi/oranı tek yerden değişsin.

### Video kalırsa: scroll ile kaydırılan kare dizisi (frame sequence) yaklaşımı

- **Etki:** orta · **Efor:** orta · **Referans:** Apple AirPods Pro ürün sayfası kare dizisi tekniği; Resn (resn.co.nz) scroll-driven sahneler

Alev ya da ürün hareketi video yerine 48–96 karelik WebP dizisi (her kare ~15 KB, 1440 px) olarak canvas'a çizilir; kareler scroll pozisyonuna bağlanır (lenis scroll → frame index, lerp 0.1). Böylece döngü değil, kullanıcının kontrol ettiği hareket elde edilir; codec sorunu, autoplay kısıtı ve ses izi sorunu ortadan kalkar; reduced-motion'da ilk kare kalır. Özellikle start-project ve about hero'larında 'scroll ilerledikçe alev şekil alıyor' anlatısı için uygun.
