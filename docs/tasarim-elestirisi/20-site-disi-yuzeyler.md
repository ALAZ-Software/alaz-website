# Site dışı yüzeyler: sekme başlığı, paylaşım kartı (OG), Google sonucu, JSON-LD'nin görünür etkileri, llms.txt ve PWA kimliği

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 22 (3 kritik · 8 önemli · 11 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 7

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Teknik iskelet sağlam (canonical + hreflang, metadataBase, Organization/WebSite @id grafiği, BreadcrumbList, robots/sitemap, llms.txt), ama bir jürinin veya müşterinin siteyi görmeden önce karşılaştığı her yüzey farklı bir ALAZ anlatıyor: sekme başlıklarında altı ayrı marka eki, OG kartında emekli slogan ("Software & High-Performance Web Engineering"), manifest'te terk edilmiş "Software Architecture… connected digital ecosystems" metni, kartvizitte "Software Architecture Studio", JSON-LD'de "independent software studio". Paylaşım kartı sistemi yok: sekiz sayfa aynı AI üretimi görseli gönderiyor, vaka sayfaları 1920×1200 ham ürün kapağını (App Store banner'ı ve sahte "14:42:11 UTC" HUD) olduğu gibi veriyor, blog yazıları Hostinger (AI site builder) CDN'indeki stok PNG'ye bağımlı; kare kırpımlarda hiçbir kartta ALAZ okunmuyor ve iki görsel WhatsApp'ın ~300 KB eşiğinin üstünde. Schema tarafında FAQPage ilk cevap olarak rakip agency'leri küçümseyen bir cümleyi dışarı taşıyor, breadcrumb "Services" yerine H1'den gelen "SOFTWARE ENGINEERING" diyor, Organization iki serviced-office adresi + foundingDate 2026 + boş sameAs yayınlarken llms.txt var olmayan/doğrulanmamış LinkedIn ve GitHub linkleri veriyor. Var olmayan vaka/blog slug'ları HTTP 200 ve başlıksız sekmeyle açılıyor (soft 404). Tek bir marka sabiti, title.template, next/og ile üretilen üç kartlık OG sistemi, manifest/ikon düzeltmesi ve schema budaması ile bu boyut bir haftalık işle Awwwards seviyesine çıkar; şu an site dışı yüzeyler sitenin içinden daha "template" görünüyor.

## Korunması gerekenler

- buildMetadata tek merkez: canonical + hreflang (en/tr/x-default) doğru, metadataBase tanımlı, og:locale ve og:locale:alternate düzgün, görsel boyutları beyan ediliyor — OG sistemi bunun üstüne eklenir, yeniden yazılmaz (src/lib/seo.js:37-74).
- JSON-LD altyapısı doğru kurulmuş: Organization/WebSite @id ile bağlı, BlogPosting publisher/logo ve dateModified var, CreativeWork vaka için ürünün gerçek URL'sini sameAs ile veriyor, BreadcrumbList tüm alt sayfalarda, JsonLd '<' kaçışı yapıyor (src/components/JsonLd.jsx:4).
- robots.js AI crawler politikasını açıkça yazıyor (GPTBot, ClaudeBot, PerplexityBot…), sitemap hreflang alternates taşıyor ve lastModified yalnız gerçek tarih varken basılıyor — sahte 'now' yok (src/app/sitemap.js yorumu).
- public/llms.txt var, sade ve dürüst tonda ('a small engineering team, not an agency with account managers'); yapı doğru, sadece içerik ve linkler senkron değil.
- [...rest] catch-all ile bilinmeyen üst rotalar locale'li 404'e düşüyor, 404 statüsü ve noindex doğru; www→apex 308, eski alpha/beta/gamma slug'ları arşive 308, güvenlik header'ları tanımlı (next.config.mjs).
- Marka varlıkları repoda hazır: brand/logo/*.svg Archivo Black'ten vektöre çevrilmiş 'ALAZ.' wordmark ve TTF dosyası — next/og kartları bu path ve fontla birebir üretilebilir.
- theme-color #0a0a0a sayfa zeminiyle aynı; Android Chrome araç çubuğu ve Safari sekme çubuğu siteyle bütünleşiyor, applicationName tanımlı.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `gap-offsite-surfaces-04` — Sekiz sayfa tek OG görseli, üstünde emekli slogan

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/lib/seo.js:15 (OG_IMAGE alt 'ALAZ — Software & High-Performance Web Engineering'), :43 (varsayılan image), public/og-image.png; /, /services, /about, /case-studies, /blog, /start-project, /legal, /privacy canlı og:image çıktısı; ekran: offsite-og-unfurls.png (1. satır), media-review/og-image.png, media-review/og-crop.png

**Sorun.** Sekiz rotanın hepsi aynı og-image.png'yi gönderiyor; görselin altındaki cümle 'SOFTWARE & HIGH-PERFORMANCE WEB ENGINEERING' sitenin artık kullanmadığı konumlandırma (başlık ve description 'web, mobile and backend' diyor). og:image:alt da aynı emekli cümleyi taşıyor. Bir jüri Slack'e /services, /about ve /case-studies linklerini art arda attığında üç özdeş kart görüyor; kartın yazısı altındaki başlıkla çelişiyor. Görselin AI üretimi olması zaten dosyalanmış; buradaki yeni sorun sistem yokluğu ve metin uyumsuzluğu.

**Neden önemli.** Paylaşım kartı sitenin dışarıdaki ilk cümlesi; bütün sayfaların aynı kartı göndermesi 'OG'yi bir kere halledip unuttum' şablon sinyali, kart metninin başlıkla çelişmesi ise marka özensizliği. Awwwards jürisi ve potansiyel müşteri linki çoğunlukla Slack/LinkedIn/WhatsApp'ta görür; site henüz açılmamıştır.

**Ne yapılmalı.** og-image.png'yi kaldırıp next/og ile üretilen sayfa-bazlı sistem kurun: `src/app/[locale]/opengraph-image.jsx` (export size = {width:1200,height:630}, contentType 'image/png', alt sayfa adından). Tasarım: #0a0a0a zemin, hero'daki 4 kolonlu ince ızgara (rgba(255,255,255,.065)), sol üstte JetBrains Mono eyebrow olarak sayfa adı ('Services', 'About', 'Start a project'), ortada brand/logo/alaz-logo-beyaz.svg path'inden çizilen 'ALAZ.' wordmark'ı (Archivo Black TTF'yi `fetch(new URL('../../../brand/logo/Archivo-Black.ttf', import.meta.url))` ile ImageResponse fonts'a verin), sağ altta tek satır konumlandırma cümlesi (finding 11'deki BRAND.TAGLINE). Tüm metin merkezdeki 630×630 kareye sığsın (1:1 kırpımda okunsun). Alt metni `alt` export'u ile sayfa adına göre üretin. Legal/Privacy/404 aynı varsayılan karttan 'Legal', 'Privacy' etiketiyle çıksın. Locale: `params.locale` ile tr için aynı bileşen.

#### `gap-offsite-surfaces-05` — Vaka sayfaları ham 1920×1200 ürün kapağını OG olarak gönderiyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:28 (image: project.image, 1920×1200, alt: project.name), public/projects/vocabulary/cover.png (202 KB), public/projects/market-hours/cover.jpg (537 KB); ekran: offsite-og-unfurls.png (2. ve 3. satır), media-review/vocab-cover.png, media-review/mh-cover.png

**Sorun.** English Vocabulary'nin og:image'ı App Store banner'ının kendisi: 'English Vocabulary / The most common words. Swipe. Listen. Play. / 8000' — ALAZ, 'case study' ya da stüdyo izi yok; 1:1 kırpımda başlık 'lish abulary' olarak kesiliyor, 72 px'te sarı leke. Market Hours'un kapağı sahte '14:42:11 UTC · LONDON / NY KILLZONE ACTIVE' HUD'lu bir konsept render; 1.91:1 ve 2:1 kırpımlarda alt seans kartları kesiliyor, 1:1'de başlığın yarısı ve saat kutusu dışarıda kalıyor, 40 px'te siyah kare. 537 KB WhatsApp'ın yaygın ~300 KB (bazı kaynaklarda 600 KB) eşiğinin üstünde; og:image:alt yalnız 'MARKET HOURS'.

**Neden önemli.** Vaka linki paylaşıldığında kart ALAZ'ın işini değil müşterinin pazarlama görselini gösteriyor; sahte zaman damgalı HUD ise 'uydurma ürün ekranı' slop sinyalinin ta kendisi ve sosyal kartta tam ortada. 16:10 görseli 1.91:1'e kırptırmak kontrolü platforma bırakmak demek; Awwwards seviyesinde kart kırpımı tasarımın parçasıdır.

**Ne yapılmalı.** `src/app/[locale]/case-studies/[slug]/opengraph-image.jsx` ekleyin (generateStaticParams aynı slug listesi). Kompozisyon: ürün rengi zemin (Vocabulary için kapaktaki sarı ≈ #FFE500 + siyah tipografi; Market Hours için derin teal ≈ #06110f + #35e0b0 vurgu) — bunları en.json projects[].brand = { bg, fg } olarak saklayın; sol 60%'ta eyebrow 'Case study · iOS & Android · 2026' (JetBrains Mono), proje adı Archivo Black 120 px, altta tek satır özet (summary'nin ilk cümlesi); sağ 40%'ta public/projects/vocabulary/en altındaki gerçek store ekran görüntülerinden biri telefon çerçevesi içinde (sahte HUD değil, gerçek ekran); sol altta 'ALAZ.' işareti. Tüm metin merkez 630×630 güvenli alanda. Çıktı 1200×630 PNG ≤ 250 KB (düz renk alanları PNG'yi küçük tutar; gerekirse ekran görüntüsünü JPEG olarak gömün). alt: '{name} — ALAZ case study: {summary ilk cümle}'. project.imageWidth/imageHeight alanlarına artık gerek kalmaz.

#### `gap-offsite-surfaces-06` — Blog OG görseli Hostinger (AI site builder) CDN'indeki stok PNG

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:32 (image: post.cover, 1200×630 varsayımı kodda sabit), :64-74 (BlogPosting.image), messages/en.json:97, 113 (cover URL'leri), :3-7 (media.* horizons-cdn.hostinger.com), src/app/[locale]/layout.jsx:56-57 (her sayfada preconnect images.hostinger.com), next.config.mjs remotePatterns (images.hostinger.com, horizons-cdn.hostinger.com), src/app/sitemap.js (blog images aynı URL); ekran: offsite-og-unfurls.png (4. satır), blogpost-d-cover.png (kapak alanı boş gri blok)

**Sorun.** İki blog yazısının og:image, twitter:image, BlogPosting.image ve sitemap image değeri images.hostinger.com/<uuid>.png; görsel bu ortamdan erişilemedi (403) ve sitede de kapak alanı boş gri olarak render oldu. Genişlik/yükseklik kodda 1200×630 diye yazılmış, dosyadan doğrulanmıyor. horizons-cdn.hostinger.com Hostinger Horizons AI site builder'ın CDN'i; remotePatterns ve layout'taki preconnect sitenin köken izini her sayfanın <head>'ine yazıyor.

**Neden önemli.** Üçüncü taraf bir hosting hesabına bağlı og:image, hesap kapanınca ya da CDN yavaşlayınca paylaşım kartının boş çıkması demek; 'stok PNG + AI builder CDN' kombinasyonu ise bir jürinin view-source'ta bir saniyede yakalayacağı slop kökeni sinyali. Blog yazıları zaten 'field notes' tonunda; stok illüstrasyon bu tonu bozuyor.

**Ne yapılmalı.** `src/app/[locale]/blog/[slug]/opengraph-image.jsx` ile tipografik kart üretin: #0a0a0a zemin, eyebrow 'Field notes · Feb 22, 2026 · 6 min read', başlık Archivo Black 64–72 px en fazla 3 satır (uzun başlıkta font-size'ı başlık uzunluğuna göre 56'ya düşürün), alt sağda 'ALAZ.' — Vercel/Stripe blog kartı mantığı, görsel yok. Kapak görselini sayfada da kaldırın ya da kendi çektiğiniz/çizdiğiniz görseli public/blog/<slug>/cover.jpg olarak taşıyın. en.json'daki hostinger/horizons URL'lerini, next.config remotePatterns'ı ve layout preconnect/dns-prefetch satırlarını silin; sitemap images yerel yola dönsün.

> **Doğrulayıcı notu:** Çekirdek iddia doğru: iki yazının og:image, twitter:image, BlogPosting.image ve sitemap <image:loc> değeri images.hostinger.com/<uuid>.png (canlı HTML + sitemap.xml'de doğrulandı), boyut kodda 1200×630 sabit (blog/[slug]/page.jsx:32), layout.jsx:56-57 her sayfaya preconnect/dns-prefetch basıyor, blogpost-d-cover.png'de kapak alanı boş gri. Düzeltmeler: (1) dosya next.config.mjs değil next.config.js; (2) bu ortamdan görsel 403 değil hiç erişilemedi (status 000, proxy) — üretimde kırık olduğu doğrulanamaz, bağımlılık riski aynen geçerli; (3) en.json 'media.*' altındaki beş horizons-cdn/hostinger URL'si src/ içinde hiçbir yerde kullanılmıyor (grep boş) — ölü veri, doğrudan silinebilir. Fix (tipografik next/og kartı + yerel kapak + remotePatterns/preconnect temizliği) doğru.

### ÖNEMLİ

#### `gap-offsite-surfaces-01` — Altı farklı marka eki, title.template yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/layout.jsx:26-40 (metadata içinde title yok), src/lib/seo.js:50-52 (title olduğu gibi geçiyor), messages/en.json:134, 406, 496, 580, 606, 637, 667, 673, 804, 849, 894; ekran: offsite-tab-strip.png, offsite-serp-mock.png

**Sorun.** Canlı çıktıda başlıklar 'ALAZ — Web, Mobile & Software Engineering Studio', '… | ALAZ', 'Case Studies — ALAZ Engineering', 'About ALAZ — The Engineering Manifesto', 'Blog — ALAZ Engineering Studio', 'MARKET HOURS — ALAZ Case Study', '… — ALAZ Blog', 'Start a Project — ALAZ Engineering', 'Legal — ALAZ'. Marka adı 'ALAZ', 'ALAZ Engineering', 'ALAZ Engineering Studio', 'ALAZ Case Study', 'ALAZ Blog' olarak beş ayrı kurumsal kimlik gibi dolaşıyor; ayraç bir sayfada '|', diğerlerinde '—'. 1440 px'te dokuz sekmede (offsite-tab-strip.png) marka yalnız 'ALAZ —' ile başlayan iki sekmede görünüyor; diğerlerinde 'Web, Mobile Ap…', 'Case Studies …', 'What Does a S…' kalıyor. Blog yazısı başlığı 65 karakterle Google'ın ~600 px sınırını aşıyor, '— ALAZ Blog' eki kesiliyor (offsite-serp-mock.png).

**Neden önemli.** Başlık eki, bir stüdyonun dikkat seviyesini jüriye ilk gösteren şey; her sayfada elle yazılmış farklı suffix 'her sayfayı ayrı promptla ürettim' sinyali veriyor. Sekme şeridinde ve tarayıcı geçmişinde tutarlı bir kuyruk olmadan ALAZ sekmesi bulunamıyor; SERP'te tek bir site adı altında farklı 'ALAZ X' varyantları markayı bulanıklaştırıyor.

**Ne yapılmalı.** layout.jsx metadata'ya `title: { default: 'ALAZ — Web, mobile and backend software studio', template: '%s — ALAZ' }` ekleyin ve buildMetadata'ya yalnız sayfa adı geçin: 'Services', 'About', 'Case studies', 'Market Hours', 'English Vocabulary', 'Blog', 'Start a project', 'Legal', 'Privacy', 'Page not found'. Ana sayfa için `title: { absolute: 'ALAZ — Web, mobile and backend software studio' }`. Blog yazılarında yalnız yazı başlığı (template zaten '— ALAZ' ekler; '— ALAZ Blog' kalksın); vaka sayfalarında 'Market Hours — Case study' gibi bir ara etiketi isterseniz template'i '%s — ALAZ' bırakıp sayfa adını 'Market Hours case study' yapın. og:title'ı template'siz sayfa adı olarak açıkça verin (`openGraph.title = title`), çünkü og:site_name zaten 'ALAZ' taşıyor ve LinkedIn kartında 'Services — ALAZ · alaz.pro' tekrarına dönmesin. Kural: tek ayraç (em dash), tek marka kelimesi (ALAZ), sayfa adı 25 karakterin altında, kuyruk her yerde aynı. en.json'daki tüm *.meta.title ve metaTitleTemplate değerlerini buna göre kısaltın.

> **Doğrulayıcı notu:** Canlı <title> çıktıları birebir doğrulandı: '… | ALAZ' (services), '— ALAZ Engineering' (case-studies, start-project), '— ALAZ Engineering Studio' (blog), '— ALAZ Case Study', '— ALAZ Blog', '— ALAZ' (legal/privacy/404), ana sayfa 'ALAZ — …'. layout.jsx metadata'da title/template yok (satır 26-40), seo.js:51 title'ı olduğu gibi geçiriyor; en.json satır referansları (134, 406, 496, 580, 606, 637, 667, 673, 804, 849, 894) doğru. Eksik kalan: ikinci blog yazısının başlığı 65 değil 85 karakter ('We're Live: A Software Studio for Web, Mobile and the Systems Behind Them — ALAZ Blog') — hem Google'ın ~600 px sınırını hem X'in 70 karakterlik twitter:title sınırını aşıyor; template'e geçerken bu yazının başlığını da kısaltın (ör. 'We're live'). Fix (title.default/template + og:title'ı template'siz) doğru ve Next 15.1 ile uyumlu.

#### `gap-offsite-surfaces-02` — CAPS içerik verisi sekme, SERP, breadcrumb ve schema'ya sızıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:36 ('VOCABULARY'), :66 ('MARKET HOURS'), :153-154 (heading 'SOFTWARE','ENGINEERING'), :177-279 (servis başlıkları CAPS), :607 (metaDescriptionTemplate '{name}: {summary}…'); src/app/[locale]/case-studies/[slug]/page.jsx:26-28, 59-60; src/app/[locale]/services/page.jsx:33-45; ekran: offsite-serp-mock.png, offsite-tab-strip.png

**Sorun.** Proje ve servis adları en.json'da görüntü biçimiyle (büyük harf) saklandığı için <title> 'MARKET HOURS — ALAZ Case Study', og:title aynı, BreadcrumbList son öğesi 'MARKET HOURS', CreativeWork.name 'MARKET HOURS', Service.name 'WEB APPLICATIONS & SAAS', meta description 'MARKET HOURS: A live world map…' oluyor. Google sonuç satırında proje adı breadcrumb'da ve başlıkta iki kez bağırıyor. Ürünün gerçek adı 'English Vocabulary' (slug english-vocabulary, kapak görseli, store listing) iken metadata 'VOCABULARY' diyor.

**Neden önemli.** Tarayıcı sekmesi, LinkedIn kartı ve Google satırı CSS almaz; CAPS orada tasarım değil bağırma olarak okunur ve Google bu tür başlıkları sık sık yeniden yazar. Schema alanlarına görüntü biçiminin sızması 'içerik ile sunum ayrılmamış' sinyali; Awwwards'ta jüri olan geliştiriciler view-source'ta bunu ilk görür.

**Ne yapılmalı.** Veriyi doğal biçimde saklayın: `name: 'Market Hours'`, `name: 'English Vocabulary'`, servis başlıkları 'Web applications & SaaS' vb., heading 'Software engineering'. Büyük harfi yalnız render noktasında Tailwind `uppercase` sınıfıyla verin (vaka hero H1, arşiv satırları, servis blokları). metaDescriptionTemplate'i '{summary}' + tek cümle bağlam olarak sadeleştirin, ad tekrarını kaldırın (ad zaten title'da). CreativeWork/BreadcrumbList/Service alanları otomatik olarak düzelir.

#### `gap-offsite-surfaces-03` — Breadcrumb adı nav etiketi yerine H1'den türetiliyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:51-56 (`heading.join(' ')`), src/components/JsonLd.jsx:29-44; ekran: offsite-serp-mock.png (ilk satır 'https://alaz.pro › SOFTWARE ENGINEERING')

**Sorun.** Services sayfasının BreadcrumbList ikinci öğesi H1 dizisinden birleştirilerek 'SOFTWARE ENGINEERING' oluyor; menüde, footer'da ve seo.services anahtarında aynı sayfa 'Services'. Google sonuç satırı 'alaz.pro › SOFTWARE ENGINEERING' gösterir; kullanıcı tıklayınca 'Services' menü öğesine iner.

**Neden önemli.** Breadcrumb'ın tek görünür etkisi SERP'teki yol satırı; oradaki etiket navigasyonla eşleşmeyince hem tutarsızlık hem de CAPS bağırması çıkıyor. Diğer sayfalar (About, Blog, Case Studies, Start a Project) doğru şekilde seo.* etiketini kullanıyor; yalnız bu sayfa farklı.

**Ne yapılmalı.** `{ name: tSeo('services'), url }` kullanın (tSeo = getTranslations('seo')); vaka ve blog sayfalarında da son öğeyi doğal biçimli adla verin (02 ile birlikte düzelir). Kural: BreadcrumbList isimleri = Header nav etiketleri, birebir.

> **Doğrulayıcı notu:** Canlı BreadcrumbList: ['Home', 'SOFTWARE ENGINEERING'] — services/page.jsx:53 `heading.join(' ')` doğrulandı; about/case-studies/blog/start-project tSeo('…') kullanıyor. Küçük düzeltme: 'BreadcrumbList isimleri = Header nav etiketleri' kuralı yanlış referans; nav.linkLabels en.json'da CAPS ('CASE STUDIES', 'SERVICES'). Doğru kaynak seo.* anahtarları ('Services', 'Case Studies', 'About', 'Blog', 'Start a Project') — diğer dört sayfa zaten bunu kullanıyor, yalnız services sapmış. Fix: `{ name: tSeo('services'), url }`.

#### `gap-offsite-surfaces-08` — FAQPage ilk cevap olarak rakip agency'leri aşağılayan cümleyi dışarı taşıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:336-339 (faqs[0]), src/components/JsonLd.jsx:11-26 (FaqJsonLd), src/app/[locale]/services/page.jsx:58; ekran: offsite-serp-mock.png (FAQ akordeonu)

**Sorun.** FAQPage'in ilk sorusu 'How is ALAZ different from a traditional digital agency?' ve cevabı 'Most agencies sell design presentations and outsource implementation to junior subcontractors…'. Bu, schema üzerinden Bing sonuç satırında açılır cevap, ChatGPT/Perplexity gibi cevap motorlarında ise 'ALAZ'a göre çoğu ajans…' alıntısı olarak çıkıyor. Not: Google Ağustos 2023'ten beri FAQ rich result'ı yalnız kamu/sağlık sitelerinde gösteriyor; Google'da görsel kazancı yok, ama içerik makinelere aynen servis ediliyor. Soru kalıbı ('geleneksel ajanstan farkımız') AI şablon metinlerinin standart ilk sorusu.

**Neden önemli.** Dışarıda ALAZ'ı temsil eden ilk cümle, ALAZ'ın ne yaptığı değil başkalarının ne yapmadığı. Doğrulanamayan genelleme ('most agencies… junior subcontractors') hem güven hem ton kaybı; Awwwards jürisi ajans dünyasının kendisidir.

**Ne yapılmalı.** faqs[0]'ı ALAZ hakkında somut bir soruya çevirin: q 'Who will I actually work with?', a 'The engineer who scopes your project writes the code. There is no account layer; you get a direct line to the person building it, from the first call to the handover.' Diğer rakip kıyası içeren cümleleri de tarayın. FAQPage markup'ını Bing ve LLM'ler için tutun; görünür akordeon ile schema zaten aynı kaynaktan geliyor (doğru), öyle kalsın. Alternatif: schema'yı kaldırıp FAQ'yu sadece sayfada bırakmak da meşru — Google'da fark yok.

#### `gap-offsite-surfaces-09` — Organization: iki serviced-office adresi, foundingDate 2026, 'sales' contactPoint, knowsAbout listesi

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/StructuredData.jsx:22 (alternateName 'alaz.pro'), :28 (foundingDate '2026'), :30-33 (iki PostalAddress), :34-44 (knowsAbout ×9), :48-53 (contactType 'sales'); messages/en.json contact.offices; public/llms.txt:3 ('offices in New York and İzmir')

**Sorun.** Organization bloğu her sayfada 1250 Broadway 36th Floor (Regus) ve Folkart Towers B Blok Kat 31 (Regus) adreslerini, foundingDate '2026' (bu yıl) ve 'sales' tipli bir contactPoint'i yayınlıyor; knowsAbout dokuz jenerik anahtar kelime; alternateName'de alan adı. Birlikte okunduğunda makineye ve meraklı müşteriye 'bu yıl kurulmuş, iki kıtada sanal ofisli, satış hattı olan şirket' profili çiziyor; sitenin kendi sesi ise 'küçük mühendis ekibi, account manager yok'. Organization tipinde adres Maps/Business Profile'a girmez; görünür hiçbir kazanımı yok, sadece doğrulanabilir bir iddia üretir.

**Neden önemli.** Yapılandırılmış veri sitenin dürüstlük beyanı; serviced-office adresi ve 'sales' etiketi, sitenin anti-ajans tonuyla çelişip AI cevap motorlarında ve Google panelinde 'virtual office startup' izlenimi bırakıyor. knowsAbout listesi 2010'lar SEO eklentisi kokuyor.

**Ne yapılmalı.** Hukuki merkez tek adres: legal sayfası Türkiye hukuku/İzmir mahkemeleri dediği için `address` yalnız İzmir (ya da adresi schema'dan tamamen çıkarıp footer'da bırakın); New York gerçek bir çalışma yeriyse `location: [{ '@type': 'Place', name: 'New York', address: {...} }]` ile ayrı belirtin, değilse footer dahil her yerden kaldırın. foundingDate'i dürüst tutun ama tam tarih yapın ('2026-02-13', lansman yazısının tarihi) — 'EST. 2026' zaten kartvizit ve hero'da. contactPoint'i silin (email Organization düzeyinde var) ya da `contactType: 'customer service'` + `url: 'https://alaz.pro/start-project'`. knowsAbout'u silin. alternateName = ['ALAZ Software'] (alan adı alternateName değil).

> **Doğrulayıcı notu:** Canlı Organization JSON-LD'de iki PostalAddress (Broadway 36th Floor + Folkart Towers Kat 31), foundingDate '2026', contactType 'sales', dokuz maddelik knowsAbout, alternateName'de 'alaz.pro' birebir doğrulandı (StructuredData.jsx:22, 28, 30-33, 34-44, 48-53). Legal sayfası 'Governing law: Republic of Türkiye, courts in İzmir' (en.json:838). Eklenmesi gereken: aynı legal metin 'offices in the United States and Türkiye' diyor (en.json:810) ve llms.txt:3 'offices in New York and İzmir'; New York'u schema'dan çıkarırsanız bu iki cümle ve footer contact.offices (en.json:374-391) aynı kararla değişmeli, yoksa üç yüzey yine birbirini tutmaz.

#### `gap-offsite-surfaces-10` — sameAs boş, llms.txt LinkedIn ve GitHub veriyor; profiller doğrulanmamış

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/lib/seo.js:17 (SOCIAL_PROFILES = []), src/components/StructuredData.jsx:47 (sameAs: []), public/llms.txt:27-29, src/lib/seo.js:67-72 (twitter.site/creator yok); src/components/Footer.jsx (sosyal link yok)

**Sorun.** Organization.sameAs boş dizi olarak yayınlanıyor (boş alan yayınlamak 'eksik' sinyali), footer'da hiçbir sosyal profil yok; ama llms.txt bir LLM'e 'LinkedIn: linkedin.com/company/alaz-pro, GitHub: github.com/alaz-pro' diyor. Bu linkler sitenin hiçbir yerinde görünmüyor ve kodda doğrulanmıyor. Twitter kartında site/creator yok; X hesabı olup olmadığı da belirsiz.

**Neden önemli.** LLM'ler llms.txt'i kaynak olarak alıntılar; ölü ya da boş bir GitHub organizasyonuna yönlendirmek bir yazılım stüdyosu için en kötü ilk izlenim. sameAs ile llms.txt'in çelişmesi 'iki dosyayı iki farklı araç yazdı' sinyali.

**Ne yapılmalı.** Önce karar: hangi profiller gerçekten var ve içerikli? Varsa SOCIAL_PROFILES'a ekleyin (sameAs otomatik), Footer'a 'LinkedIn / GitHub' satırı koyun, llms.txt'te bırakın. Yoksa llms.txt'ten silin ve sameAs alanını objeden tamamen çıkarın (boş dizi yayınlamayın). X hesabı yoksa twitter.site eklemeyin; varsa `twitter: { site: '@…', creator: '@…' }`. GitHub için gerçekten paylaşılabilir bir repo (ör. bu sitenin OG üretici scripti) yayınlamak stüdyo için güçlü bir kanıt olur.

#### `gap-offsite-surfaces-11` — Beş farklı 'ne yapıyoruz' cümlesi: tek marka sabiti yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/lib/seo.js:15 (OG alt 'Software & High-Performance Web Engineering'), src/app/manifest.js:3-5 ('Software Architecture & Engineering Studio' / 'Resilient software architecture, native performance, and connected digital ecosystems'), src/components/StructuredData.jsx:9 ('independent software studio that builds…'), messages/en.json:406 ('Web, Mobile & Software Engineering Studio'), :496 ('The Engineering Manifesto'), public/llms.txt:3, brand/kartvizit (media-review/kartvizit-preview.png: 'INDEPENDENT SOFTWARE ARCHITECTURE STUDIO'), hero kicker 'WEB · MOBILE · SYSTEMS — SOFTWARE STUDIO'

**Sorun.** Sekme 'Web, Mobile & Software Engineering Studio', OG görseli 'Software & High-Performance Web Engineering', manifest/Chrome install diyaloğu 'Software Architecture & Engineering Studio', kartvizit 'Independent Software Architecture Studio', schema ve llms.txt 'independent software studio'. Hiçbiri birbirine referans vermiyor; her yüzey ayrı zamanda ayrı promptla yazılmış izlenimi veriyor. 'connected digital ecosystems' ve 'resilient software architecture' tam AI dolgu ifadeleri.

**Neden önemli.** Site dışı yüzeylerde marka tek cümleyle tanınır; cümle beş farklıysa marka yoktur. Jüri Chrome'da install diyaloğunu, Slack'te OG'yi, Google'da title'ı görür ve üçü farklı şirketi anlatır.

**Ne yapılmalı.** src/lib/seo.js'e tek kaynak ekleyin: `export const BRAND = { name: 'ALAZ', tagline: 'Web, mobile and backend software studio', description: 'ALAZ designs and builds web applications, iOS and Android apps, and the backend systems behind them, as one small engineering team.' }`. Tüketiciler: layout title.default, varsayılan OG kartı ve alt metni, manifest name/description, Organization.description, WebSite.description, llms.txt ilk paragraf (elle), kartvizit alt satırı (brand/kartvizit/kaynak/design.py). 'Software Architecture' ve 'High-Performance Web Engineering' ifadelerini repodan grep ile temizleyin.

#### `gap-offsite-surfaces-14` — Var olmayan vaka/blog slug'ları HTTP 200 ve başlıksız sekme (soft 404)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:20-21 (generateMetadata `return {}`), :36-44 (inline 'PROJECT NOT FOUND.'), src/app/[locale]/blog/[slug]/page.jsx:23 ve :46-55; canlı: /case-studies/does-not-exist → 200, <title> yok, robots 'index, follow'

**Sorun.** Geçersiz slug'da sayfa 200 dönüyor, generateMetadata boş obje verdiği için <title> hiç basılmıyor (sekme ham URL'yi gösteriyor), robots 'index, follow' kalıyor ve Organization/WebSite schema'sı normal sayfa gibi çıkıyor. Google bunu soft 404 sayar; eski paylaşımlar ya da yazım hatalı linkler 'PROJECT NOT FOUND.' başlıklı 200 sayfalar olarak indekslenebilir. Gerçek 404 ([...rest] catch-all) ise doğru çalışıyor: 404 statüsü, 'Page Not Found — ALAZ' başlığı, noindex.

**Neden önemli.** Sekme başlığı ve HTTP statüsü sitenin dışarıya verdiği en temel iki sinyal; başlıksız sekme + 200 statüsü, mühendislik iddialı bir stüdyo için jürinin 'kenarları düşünülmemiş' notu.

**Ne yapılmalı.** Her iki page.jsx'te proje/yazı bulunamazsa `notFound()` (next/navigation) çağırın — hem generateMetadata'da hem bileşende; inline not-found JSX'lerini ve caseStudy.notFoundHeading / blogPost.notFoundHeading metinlerini silin. generateStaticParams zaten slug'ları sayıyor; `export const dynamicParams = false` ekleyin ki bilinmeyen slug'lar otomatik 404 olsun. Böylece locale'li not-found.jsx 404 statüsü ve doğru başlıkla devreye girer.

### İNCE İŞÇİLİK

#### `gap-offsite-surfaces-07` — OG için platform kırpım ve ağırlık bütçesi tanımlı değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/lib/seo.js:43-49, 67-72 (tek image, tüm platformlara aynı), public/og-image.png 415 KB, public/projects/market-hours/cover.jpg 537 KB; ekran: offsite-og-unfurls.png (sağ sütunlar: 1:1, 72 px, 40 px)

**Sorun.** Hiçbir kartta kare (WhatsApp/iMessage/Telegram) kırpım ve küçük thumbnail düşünülmemiş: og-image.png 1:1'de 'LAZ' + yarım slogan, 72 px'te okunmaz; vaka kapakları kare kırpımda başlığını kaybediyor. İki görsel 300 KB'ın üstünde (WhatsApp büyük önizlemeyi atlayıp metin-only gösterebiliyor). twitter:image aynı dosya, summary_large_image 2:1 kırpımı da ayrıca kontrol edilmemiş.

**Neden önemli.** Awwwards seviyesinde kart, platformun ne yapacağını bilerek tasarlanır: merkez kare güvenli alan, 2:1 ve 1.91:1 için üst/alt 7–8% pay, küçük thumbnail'de tek tanınır şekil. Bugün paylaşımların çoğu WhatsApp/iMessage'da (kare) açılıyor.

**Ne yapılmalı.** OG şablonlarına kural koyun: (1) tüm metin ve işaret merkezdeki 630×630 karede; (2) üst/alt 50 px'lik şeritte yalnız zemin; (3) 72 px'te tanınır tek öğe (ALAZ. işareti ya da proje renk bloğu); (4) dosya ≤ 250 KB — next/og PNG çıktısında büyük fotoğraf alanlarından kaçının, gerekirse `ImageResponse`'tan sonra sharp ile JPEG q80'e çevirin; (5) repo'ya scripts/og-preview.cjs ekleyip her rotanın og:image'ını 1.91:1 / 2:1 / 1:1 / 72 px'e yerleştiren kontak sayfası üretin (bu incelemedeki offsite/og-unfurls.html mantığı), PR'larda bakın.

> **Doğrulayıcı notu:** Olgular doğru: tek image tüm platformlara gidiyor (seo.js:49, 64, 71), og-image.png 405 KB ve market-hours cover.jpg 524 KB; twitter:image:alt yok. Ancak bu bulgunun aksiyonu 04/05/06'nın fix'lerinin tasarım kuralı — ayrı bir bulgu olarak değil o üç şablonun kabul kriteri olarak uygulanmalı (merkez 630×630 güvenli alan, ≤250 KB, 72 px'te tek tanınır öğe). Bağımsız kalan kısım (scripts/og-preview.cjs QA aracı) polish seviyesinde; severity minor.

#### `gap-offsite-surfaces-12` — Manifest: eski isim, standalone + install diyaloğu, maskable ikon ve iOS açılış yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/manifest.js:3-5 (name/description), :8 (display 'standalone'), :11-14 (icons, purpose yok), src/app/[locale]/layout.jsx:26-40 (appleWebApp yok), public/apple-touch-icon.png, public/logo.png; ekran: offsite-ios-home-splash.png, media-review/icons-sheet.png

**Sorun.** display: 'standalone' siteyi Chrome'da yüklenebilir yapıyor; 'Install app?' diyaloğu ve Android splash ekranı manifest.name'i olduğu gibi gösteriyor: 'ALAZ — Software Architecture & Engineering Studio'. İkonlarda `purpose: 'maskable'` yok → Android 8+ ana ekranda siyah 'A' karesi beyaz daire içine küçültülüyor. iOS'ta apple-touch-startup-image/appleWebApp tanımı yok → standalone açılış beyaz boş ekran, sonra #0a0a0a sayfaya sert geçiş. Offline sayfası yok; 'app' gibi davranan ama çevrimdışı hiçbir şey yapamayan bir broşür sitesi. id, lang, scope, categories alanları da eksik.

**Neden önemli.** PWA kimliği site dışı yüzeylerin en az bakılanı ama 'craft'ın en çok hissedildiği yeri; bir yazılım stüdyosunun ana ekran ikonu beyaz dairede kırpılıyor ve açılışta beyaz ekran flaşı veriyorsa mühendislik iddiası orada bitiyor. Install diyaloğundaki terk edilmiş isim ise finding 11'in en görünür hali.

**Ne yapılmalı.** manifest.js: `name: 'ALAZ'`, `short_name: 'ALAZ'`, `description: BRAND.description`, `id: '/'`, `lang: 'en'`, `display: 'minimal-ui'` (broşür site için dürüst seçim; standalone'da ısrar ederseniz serwist ile /offline sayfası ekleyin), icons: mevcut üçlüye `{ src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }` (işaret 512'nin merkez 80%'ine, zemin #0a0a0a kenara kadar). layout metadata'ya `appleWebApp: { title: 'ALAZ', statusBarStyle: 'black-translucent' }` ve en azından 3–4 yaygın iPhone boyutu için `startupImage` (koyu zemin + ALAZ. işareti) ekleyin; ya da standalone'ı bırakıp bu ihtiyacı sıfırlayın.

> **Doğrulayıcı notu:** Doğrulanan kısımlar: manifest name/description eski konumlandırma, display 'standalone', icons'ta purpose 'maskable' yok, id/lang/scope/categories yok, layout'ta appleWebApp/startupImage yok, offline sayfası yok; Android'in maskable olmayan ikonu beyaz daire içine alması doğru. Doğrulanamayan kısım: iOS standalone açılışta 'beyaz boş ekran' iddiası cihaz yakalaması değil mock (offsite-ios-home-splash.png bir HTML simülasyonu) — gerçek cihazda test edilmeden kesin yazılmamalı. Severity düşürüldü: bu yüzeyleri siteyi yükleyen bir avuç kullanıcı görür; isim sorunu zaten 11'de. Fix doğru ve 20 dakikalık iş; 11 ile birlikte yapın, 'minimal-ui' önerisi broşür site için dürüst seçim.

#### `gap-offsite-surfaces-13` — icon.svg tek sabit koyu zemin: dark/light varyantı ve Safari mask-icon yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/icon.svg:1 (rect fill #0a0a0a), src/app/[locale]/layout.jsx:34 (icons: icon + apple), src/app/favicon.ico (48×48 tek boyut); ekran: offsite-tab-strip.png (koyu/açık tema satırları), offsite-serp-mock.png (favicon dairesi)

**Sorun.** SVG favicon opak #0a0a0a kare üstünde beyaz 'A'. Chrome koyu temada kare sekme zeminiyle kaynaşıp 'A' havada kalıyor, açık temada siyah kare bloğu; Google'ın gri favicon dairesinde 16 px'te jenerik bir harf gibi okunuyor. Safari sabitlenmiş sekme için `mask-icon` tanımı yok (Safari SVG'yi orada kullanmaz). favicon.ico yalnız 48×48; 16/32 px için optik düzeltme yok. (Favicon'un 'A' olup logonun 'ALAZ.' olması ayrıca dosyalanmış; bu bulgu teknik varyantlar hakkında.)

**Neden önemli.** Favicon markanın en küçük ama en sık görülen hali; tema farkında olmayan tek SVG 'copy-paste ikon' sinyali verir. Awwwards seviyesinde stüdyolar (Locomotive, Obys) favicon'u her temada ve her boyutta ayrı optimize eder.

**Ne yapılmalı.** icon.svg içine `<style>@media (prefers-color-scheme: dark){ .bg{fill:#0a0a0a} .fg{fill:#fff} } @media (prefers-color-scheme: light){ .bg{fill:#fff} .fg{fill:#0a0a0a} }</style>` ile iki tema (Chrome/Firefox SVG favicon'da media query destekler); 16/32 px için ayrı kalınlaştırılmış harf path'i. layout icons'a `other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0a0a0a' }]` (tek renk, zemin yok). favicon.ico'yu 16+32+48 çok boyutlu üretin. Jüri için küçük bir detay: 32 px ve üzerinde noktalı 'A.' işareti (brand/logo'daki gri nokta) kullanarak logoyla bağ kurun.

#### `gap-offsite-surfaces-15` — 404 ve Legal/Privacy metadata: gereksiz nofollow, jenerik metinler

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/not-found.jsx:4-7 (robots index:false, follow:false; OG/canonical yok), messages/en.json:804-806, 849-851, 894-896; src/app/sitemap.js (legal/privacy priority 0.2); ekran: 404-desktop-fold.png, legal-desktop-fold.png

**Sorun.** 404 sayfasında `follow: false` crawler'a header/footer linklerini de izleme diyor; 404 statüsü zaten indekslemeyi engelliyor, nofollow'un katkısı yok, zararı var. Legal description 'Legal information about the ALAZ engineering website.' ('engineering website' tuhaf), 404 description 'The requested ALAZ page could not be found.' — iki metin de sadece doldurulmuş. Legal/Privacy sayfaları paylaşılırsa emekli sloganlı genel OG kartını gönderiyor.

**Neden önemli.** Küçük yüzeyler ama tamamlanmışlık hissi buradan okunur; nofollow gibi bilinçsiz bayraklar 'SEO checklist'i kopyaladım' izlenimi verir.

**Ne yapılmalı.** not-found.jsx: `robots: { index: false }` yeterli (follow kaldırılsın); başlık template ile 'Page not found — ALAZ'. Legal description: 'Terms for using alaz.pro and sending us a project inquiry.'; Privacy: 'What we collect through the inquiry form, where it goes and how long we keep it.' 404 için description gereksiz, kaldırılabilir. Yeni OG sisteminde bu üç sayfa varsayılan tipografik karttan 'Legal' / 'Privacy' / '404' eyebrow'uyla çıksın.

> **Doğrulayıcı notu:** Canlı 404 HTML'de İKİ robots meta var: Next'in not-found için otomatik bastığı <meta name='robots' content='noindex'> ve not-found.jsx:6'dan gelen <meta name='robots' content='noindex, nofollow'>. Yani nofollow canlı ve üstüne çift robots etiketi var. Daha doğru fix: not-found.jsx generateMetadata'dan `robots` alanını tamamen kaldırın (Next zaten noindex basıyor), yalnız title/description kalsın; 'robots: { index: false }' bile gereksiz. Legal/Privacy/404 description metinleri ve genel OG kartı iddiası doğrulandı (canlı og:image = og-image.png).

#### `gap-offsite-surfaces-16` — <meta name="keywords"> listeleri view-source'ta duruyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/lib/seo.js:53 (keywords geçişi), messages/en.json:136-147 (servicesPage.meta.keywords), :907+ (seo.keywords.home/about/archive/blog/startProject); canlı head'de 6 sayfada <meta name="keywords">

**Sorun.** Altı sayfa 'software development company, web application development, mobile app development, iOS and Android app development…' türü 5–10 kelimelik keywords meta etiketi basıyor. Google 2009'dan beri bu etiketi okumuyor; Bing önemsiz ağırlık veriyor; listeler ise AI-SEO aracının ürettiği tipik 'custom software development' dizisi.

**Neden önemli.** Bir geliştirici jüri view-source'u açtığında keywords meta etiketi 2000'ler SEO eklentisi ve 'şablonla üretildi' sinyali; hiçbir yüzeyde görünür faydası yok.

**Ne yapılmalı.** buildMetadata'dan `keywords` parametresini ve en.json'daki seo.keywords / servicesPage.meta.keywords bloklarını tamamen kaldırın. Arama görünürlüğü title/description/schema ve içerikten geliyor; bu alan boşa head ağırlığı.

#### `gap-offsite-surfaces-17` — Services ItemList adı SEO başlığı, Service id'leri eski konumlandırmanın kalıntısı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:33 (`name: t('meta.title')` → 'Web, Mobile App & Software Development Services | ALAZ'), :39-45 (url `${url}#${item.id}`); messages/en.json:175, 200, 225, 251, 277 (id'ler: custom-software-development, mobile-app-development, api-integration, system-architecture-cloud, performance-engineering)

**Sorun.** ItemList.name alanına '| ALAZ' ekli meta başlığı giriyor. Service.url anchor'ları 'custom-software-development', 'system-architecture-cloud', 'api-integration' gibi eski servis adlarının id'leri; paylaşılan URL'lerde (alaz.pro/services#system-architecture-cloud) ve schema'da 'CLOUD INFRASTRUCTURE & DEVOPS' başlığıyla eşleşmeyen fragment'lar görünüyor.

**Neden önemli.** Paylaşılan derin link'in fragment'ı site dışı bir yüzey; başlıkla uyuşmayan id 'konumlandırma değişti, kod değişmedi' izini bırakır.

**Ne yapılmalı.** id'leri servis adlarıyla hizalayın: 'web', 'mobile', 'backend', 'cloud', 'performance' (fragment'lar için redirect gerekmez; home'daki service kart linklerini de güncelleyin). ItemList.name = 'Services' (ya da `tSeo('services')`), Service.name doğal biçim (bkz. 02).

#### `gap-offsite-surfaces-18` — About başlık ve snippet'i 'manifesto' pozu ve dolgu sloganlar veriyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json:496-497 (about.meta.title 'About ALAZ — The Engineering Manifesto', description '…Data over dogma, brutal efficiency, software built to last.'); ekran: offsite-serp-mock.png (son satır), offsite-tab-strip.png

**Sorun.** Google satırında ve sekmede About sayfası 'The Engineering Manifesto' olarak çıkıyor; snippet 'Data over dogma, brutal efficiency, …' diye kesiliyor. 'brutal efficiency', 'built to last' ve 'manifesto' kelimeleri briefte sayılan filler-copy kalıplarının birebir karşılığı ve ilk kez site dışında, bağlamsız okunuyor.

**Neden önemli.** SERP snippet'i sayfanın tonunu önceden belirler; 'manifesto' ve 'brutal' iddiası, küçük bir stüdyodan jüri ve müşteriye poz olarak geçer. Site içindeki kopya başka bir boyutta ele alınıyor; buradaki sorun bu cümlelerin dış yüzeye taşınması.

**Ne yapılmalı.** title: 'About' (template '— ALAZ' ekler); description: 'ALAZ is a small, independent studio in İzmir [ve/veya New York]. The engineers who scope your project build it: web apps, iOS and Android apps, and the backends behind them.' Slogan yerine doğrulanabilir bilgi (yer, ekip boyutu, çalışma biçimi).

#### `gap-offsite-surfaces-missed-1` — Meta description'lar 160 karakter sınırını aşıyor; vaka şablonundaki dolgu cümle hiç görünmüyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json:607 (caseStudy.metaDescriptionTemplate), :135 (servicesPage.meta.description), :497 (about.meta.description); canlı çıktı uzunlukları: /case-studies/market-hours 257, /case-studies/english-vocabulary 198, /about 184, /services 171, /blog/cost-of-a-slow-website 166 karakter

**Sorun.** Beş sayfanın description'ı Google/Bing'in ~155-160 karakterlik snippet sınırını aşıyor. Market Hours'ta özetin ikinci cümlesi ('Live on the web, coming soon as a mobile app.') ve şablonun 'Read this ALAZ engineering case study.' kuyruğu hiçbir zaman gösterilmiyor; Vocabulary'de '17 word games and spaced-repetition review, in 24 languages' kesiliyor. Blog yazısı için description = excerpt olduğundan 166 karakter de kesiliyor (offsite-serp-mock.png'de '…' ile görülüyor).

**Neden önemli.** SERP satırı site dışı ilk okuma; cümle ortasında kesilen snippet 'metin sınırı düşünülmemiş' sinyali, dolgu kuyruk ise hiç görünmeyen SEO sözü. LinkedIn/WhatsApp kart açıklamaları da aynı metni ~100 karakterde kesiyor.

**Ne yapılmalı.** Her sayfa için ≤155 karakterlik, bağımsız description yazın. caseStudy.metaDescriptionTemplate'i kaldırıp projects[] içine ayrı `metaDescription` alanı ekleyin: Market Hours → 'A live world map and alarms for forex sessions and nine stock exchanges, with DST and holiday calendars built in. Web dashboard live, mobile app in progress.' (148); Vocabulary → 'A swipe-card English vocabulary app with audio on every card, 17 word games and spaced-repetition review, built in Flutter for iOS and Android.' (143). Blog için `metaDescription` ayrı alan ya da excerpt'i 150'ye kırpın; services/about'u tek cümleye indirin.

#### `gap-offsite-surfaces-missed-2` — Blog OG article etiketleri eksik/yanlış ve twitter:image:alt yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:33 (extraOpenGraph: { publishedTime, authors: ['ALAZ'] }), src/lib/seo.js:67-72 (twitter.images string dizisi); canlı: <meta property='article:author' content='ALAZ'>, article:modified_time yok, twitter:image:alt yok

**Sorun.** og:type 'article' olan blog sayfalarında article:author değeri 'ALAZ' — Open Graph spesifikasyonu burada bir profil URL'si bekler, Facebook/LinkedIn düz metni yok sayar. Yazı 'UPDATED OCT 5, 2026' gösteriyor ve BlogPosting.dateModified '2026-10-05' basıyor ama article:modified_time yok; post.tag ('PERFORMANCE', 'LAUNCH') varken article:section/article:tag yok. twitter:image yalnız URL olarak verildiği için twitter:image:alt üretilmiyor (og:image:alt var, X onu okumaz).

**Neden önemli.** view-source'ta spesifikasyona yarım uyan OG etiketleri 'kopyala-yapıştır meta' izlenimi verir; modified_time olmadan LinkedIn/Slack güncellenmiş yazıyı eski tarihle gösterir; alt eksikliği X'te erişilebilirlik uyarısı.

**Ne yapılmalı.** extraOpenGraph'ı `{ publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: [`${SITE_URL}/about`], section: 'Performance', tags: [post.tag doğal biçim] }` yapın. buildMetadata'da `twitter.images = images.map((i) => ({ url: i.url, alt: i.alt }))` ile alt'ı taşıyın. Vaka sayfaları için og:type 'article' + publishedTime da düşünülebilir, zorunlu değil.

#### `gap-offsite-surfaces-missed-3` — Services sayfası aynı beş Service'i hem mikroveri hem JSON-LD olarak iki kez yayınlıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/services/page.jsx:29-46 (ItemList → Service JSON-LD) ve :93-100 (article itemScope itemType='https://schema.org/Service', meta itemProp='serviceType', h2 itemProp='name', p itemProp='description'); canlı HTML'de 5× itemType + 5× itemProp name/description/serviceType

**Sorun.** Her servis bloğu HTML'de itemScope/itemType/itemProp ile Service mikroverisi taşıyor, aynı beş servis ayrıca JSON-LD ItemList içinde Service olarak basılıyor. İki formatta aynı varlık: Rich Results Test ve LLM crawler'lar 10 Service entity görüyor; JSON-LD'deki url/provider/areaServed mikroveride yok, mikroverideki metin de CAPS. Google kendi rehberinde aynı sayfada format karıştırmayı önermiyor.

**Neden önemli.** Çift işaretleme 'SEO eklentisi üstüne elle schema ekledim' kalıntısı; jüri olan geliştirici view-source'ta itemProp/itemScope dizisini JSON-LD'nin yanında görünce özensizlik olarak okur. Görünür hiçbir kazanç yok.

**Ne yapılmalı.** article etiketlerinden itemScope, itemType, itemProp ve `<meta itemProp='serviceType'>` satırını kaldırın; JSON-LD ItemList tek kaynak kalsın (17 ile birlikte name/id düzeltmesi). Diğer sayfalarda mikroveri kalıntısı var mı diye `grep -rn itemProp src` ile tarayın.

#### `gap-offsite-surfaces-missed-4` — Vaka JSON-LD'si ürünü ayrı bir varlık olarak tanımlamıyor; Vocabulary'nin hiçbir dış bağlantısı yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:57-72 (CreativeWork: sameAs yalnız project.link varsa), src/lib/stores.js:5-13 (STORE_LINKS iki proje için de boş), canlı: english-vocabulary CreativeWork.sameAs = yok, market-hours sameAs = ['https://markethours.live']

**Sorun.** Case study CreativeWork olarak doğru, ama anlattığı ürün (English Vocabulary iOS/Android uygulaması, Market Hours web/mobil) schema'da ayrı bir varlık değil. Vocabulary için store linkleri boş olduğundan sayfa makineye 'VOCABULARY adlı bir CreativeWork' dışında hiçbir şey söylemiyor — oysa özet 'free-to-start app… optional premium plan' diye yayında bir ürün anlatıyor ve kapak 'English Vocabulary' adını taşıyor. LLM'ler ve Google bu sayfayı gerçek store listing'iyle eşleştiremiyor.

**Neden önemli.** Stüdyonun dış dünyadaki tek doğrulanabilir kanıtı yayındaki ürünler; schema bunları adlandırmıyorsa cevap motorları 'ALAZ ne yaptı?' sorusuna store'daki gerçek uygulamayı bağlayamaz. İsim uyumsuzluğu (VOCABULARY ≠ English Vocabulary) bu kopukluğu büyütüyor.

**Ne yapılmalı.** CreativeWork'e `about` ekleyin: Vocabulary için `{ '@type': 'MobileApplication', name: 'English Vocabulary', operatingSystem: 'iOS, Android', applicationCategory: 'EducationalApplication', sameAs: [STORE_LINKS[slug].appStore, STORE_LINKS[slug].googlePlay].filter(Boolean) }`; Market Hours için `{ '@type': 'WebApplication', name: 'Market Hours', url: 'https://markethours.live', applicationCategory: 'FinanceApplication' }`. Uygulama gerçekten store'daysa STORE_LINKS'i doldurun (buton kodu zaten hazır, 'coming soon' yerine gerçek link çıkar); değilse özet metnindeki 'free-to-start app… premium plan' ifadesini 'in review / coming soon' ile uyumlayın. Ürün adını 02 ile birlikte 'English Vocabulary' yapın.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### next/og ile üç şablonlu OG sistemi

- **Etki:** yüksek · **Efor:** orta · **Referans:** vercel.com blog kartları, linear.app changelog OG, Stripe docs OG (tipografik, marka ızgaralı)

src/app/[locale]/opengraph-image.jsx (varsayılan: ızgara + ALAZ. wordmark + sayfa eyebrow'u), src/app/[locale]/case-studies/[slug]/opengraph-image.jsx (ürün rengi + proje adı + gerçek ekran görüntüsü), src/app/[locale]/blog/[slug]/opengraph-image.jsx (tipografik başlık kartı). ImageResponse'a Archivo Black (brand/logo/Archivo-Black.ttf) ve JetBrains Mono'yu fetch(new URL(...)) ile verin; `export const size/contentType/alt`; generateStaticParams aynı slug listeleri; projects[].brand = { bg, fg } alanı en.json'a eklenir. Kural: metin merkez 630×630 karede, ≤ 250 KB, twitter:image aynı dosya. Vercel'in kendi blog/doc kartları ve Linear'ın changelog kartları bu mantıkta.

### Tek BRAND sabiti + title.template

- **Etki:** yüksek · **Efor:** küçük

src/lib/seo.js'e BRAND { name, tagline, description } ekleyip layout title.default/template, OG varsayılan kart, manifest, Organization.description, llms.txt ve kartvizit kaynağını (brand/kartvizit/kaynak/design.py) buradan besleyin. Sayfa başlıkları tek kelimeye iner ('Services', 'About'); vaka ve blog yalnız kendi adını taşır. Bir grep ('Software Architecture', 'High-Performance', 'connected digital') temizliğiyle eski konumlandırma repodan çıkar.

### Sosyal önizleme QA scripti (repo içinde)

- **Etki:** orta · **Efor:** küçük · **Referans:** Bu incelemedeki offsite-og-unfurls.png / offsite-tab-strip.png mantığı

scripts/og-preview.cjs: Playwright ile her sitemap URL'sinin og:image, title, description'ını çekip 1.91:1 / 2:1 / 1:1 / 72 px kırpımlara, bir sekme şeridine ve Google satırı mock'una yerleştiren tek HTML üretir (bu incelemedeki offsite/*.html dosyaları başlangıç noktası). `npm run og:preview` olarak package.json'a ekleyin, PR'larda artefakt olarak bakın. Dışarıdan test için opengraph.xyz / socialsharepreview.com'u da işe koşun.

### Maskable ikon, iOS startup image ve tema farkında favicon seti

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive ve Obys sitelerinin favicon/pinned-tab setleri; web.dev maskable icon rehberi

public/icon-maskable-512.png (işaret merkez %80, zemin kenara kadar #0a0a0a), manifest icons'a purpose 'maskable'; layout metadata appleWebApp { title:'ALAZ', statusBarStyle:'black-translucent', startupImage:[...] } ile en az iPhone 15/15 Pro Max/SE ölçülerinde koyu açılış görseli (next/og ile aynı şablondan üretilebilir); icon.svg'ye prefers-color-scheme media query, safari-pinned-tab.svg mask-icon, 16/32/48 çok boyutlu favicon.ico. Alternatif ve daha dürüst yol: display 'minimal-ui' yapıp startup image ihtiyacını sıfırlamak.

### Vaka sayfalarına ürün rengi theme-color

- **Etki:** orta · **Efor:** küçük · **Referans:** Apple Developer sayfalarında ürün bazlı theme-color geçişleri

generateMetadata yerine generateViewport ile vaka sayfalarında `themeColor` ürün rengine (English Vocabulary için kapaktaki sarı, Market Hours için koyu teal) çekin; Safari 15+ sekme çubuğu ve Android Chrome araç çubuğu sayfayla birlikte renk değiştirir, OG kartıyla aynı renk dili dışarıda da devam eder. Site genelinde #0a0a0a kalır.

### llms.txt'e Work ve Writing bölümleri + doğrulanmış fact sheet

- **Etki:** orta · **Efor:** küçük · **Referans:** llmstxt.org örnekleri; Stripe ve Anthropic docs llms.txt yapısı

public/llms.txt'e '## Work' (iki vaka linki + birer cümle ve canlı ürün URL'leri), '## Writing' (yazı linkleri + tarih) ve '## Facts' (kuruluş tarihi, ekip büyüklüğü, konum, stack, çalışma dilleri — hepsi sitede doğrulanabilir) ekleyin; sosyal linkleri yalnız gerçekten varsa bırakın. İsteğe bağlı llms-full.txt ile vaka ve yazı metinlerinin düz hali. Blog için /blog/feed.xml (RSS) ve layout'ta <link rel="alternate" type="application/rss+xml"> da aynı 'makineler için düzgün yüzey' paketinin parçası.

### Kurucu için Person entity ve blog yazarlığı

- **Etki:** orta · **Efor:** küçük · **Referans:** Basement Studio ve Studio Freight'in isimli ekip/yazar kullanımı

Kartvizitte 'Mustafa Kahraman — Founder & Developer' var; sitede yazar 'The ALAZ Team'. Organization'a `founder: { '@type': 'Person', name, jobTitle, sameAs: [LinkedIn/GitHub] }` ve BlogPosting.author'ı bu Person'a bağlayın; About sayfasında aynı kişiyi görünür yapın. 'Scope eden kişi kodu yazar' iddiasını makineye ve jüriye isimle kanıtlar; anonim 'team' yazarlığı AI içerik sinyalidir. Yalnız sahibi ismini açmaya hazırsa.
