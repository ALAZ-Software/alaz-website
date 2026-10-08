# Sayfalar arası yolculuk ve bağlantı grafiği: header dışında neredeyse hiçbir yol yok, canlı ürün tek yerden linkli, sosyal profil sitede yok

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 25 (2 kritik · 11 önemli · 12 ince işçilik) · **Korunacaklar:** 8 · **Eklenecekler:** 10

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Site, sayfaları tek tek güzel ama aralarında neredeyse hiç yol olmayan bir yıldız topolojisi: header hub, her sayfa yalnızca /start-project'e (ve bazen bir "next" kaydına) çıkan bir uç düğüm. Crawled link haritasına göre About'un main bölgesinde 2, Services'te 6 (5'i kendi #anchor'ı), case-studies index'te 2, blog index'te 2, start-project'te 0 link var; hizmet→vaka→yazı→form arasında yatay bağlantı yok, footer bir varış noktası değil (nav yok, CTA yok, sosyal yok), sitenin tek canlı ürünü markethours.live tüm sitede tek bir yerden (case hero, 1440×900'de fold'un 10px altında) linkli, llms.txt'deki LinkedIn/GitHub sitede hiçbir yerde yok. Intake formu `?type=`/`?from=` bağlamını okumuyor, 4 proje tipi 5 hizmetle eşleşmiyor ve step 3'teki privacy linki formu sıfırlıyor. Üç ziyaretçi personası (müşteri adayı, Awwwards jürisi, işe alımcı/meslektaş) için de yolculuk 2-3 tıkta ölü noktaya varıyor. Awwwards seviyesindeki stüdyo siteleri (Locomotive, Basement, Studio Freight) tam tersine footer'ı ikinci bir ana sayfa, vaka sayfalarını da hizmet ve bir sonraki işe açılan kapı olarak kurar; burada yapılacak iş görsel değil, yapısal: tek kaynaklı bir site grafiği (nav/footer/sitemap/llms.txt), ilişkisel veri (services↔projects↔posts) ve şablon başına bağlamlı bir CTA merdiveni.

## Korunması gerekenler

- Ana sayfa proje kartları, arşiv satırları ve blog kartları bütünüyle tıklanabilir (tek <Link>, büyük hedef, hover ile yön hissi): bu kalıbı koru, yalnızca kartın meta satırına ikincil (live) linki ekle.
- Vaka ve yazı sayfalarının eyebrow satırı ('← ALL CASE STUDIES' / 'PROJECT / 02' sayacı) doğru yerde ve doğru ağırlıkta bir konum göstergesi; görünür breadcrumb buna dönüştürülerek büyütülmeli, silinmemeli.
- Markdown.jsx'in '/...' ile başlayan linkleri locale-aware <Link>'e, harici linkleri target=_blank + rel=noopener'a çevirmesi doğru; iki blog yazısı da zaten inline olarak /services ve /start-project'e bağlanıyor — bu editöryal linkleme alışkanlığı ilişkisel verinin temeli.
- markethours.live butonu ve store butonları doğru teknik affordans taşıyor (target=_blank, rel=noopener noreferrer, sr metni eklenebilir); ExternalLink bileşenine çekirdek olarak kullanılabilir.
- Mobil drawer CTA'yı 05. madde olarak taşıyor ve dil değiştirici mevcut yolu koruyor (href={pathname} locale={otherLocale}); iyi.
- Services sayfasındaki chip navigasyonu + article'lardaki scroll-mt-[90px] ve itemScope/Service mikroverisi sağlam bir iskelet; eksik olan bağlam, yapı değil.
- SEO altyapısı (urlFor, languageAlternates, BreadcrumbJsonLd, Organization/WebSite şeması, sitemap'in gerçek lastModified kullanımı) hazır; link grafiği düzeltmeleri bu altyapının üstüne doğrudan oturur.
- Geri navigasyonda scroll restorasyonu çalışıyor ve hash deep-link'ler çözülüyor (harness doğruladı); yolculuk mekanikleri bozuk değil, eksik.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `gap-journey-link-graph-01` — Footer bir varış noktası değil: nav, CTA, sosyal, canlı ürün yok; tanımlı CTA string'i bile render edilmiyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:5 (FOOTER_HREFS = ['/blog','/legal','/privacy']), :13-28; messages/en.json footer.talk ("HAVE A SYSTEM IN MIND?") hiçbir yerde kullanılmıyor (grep: 0 sonuç). Screenshots: chrome/footer-desktop.png, chrome/footer-mobile.png, journey-peer-post-end-desktop.png, journey-juror-case-end-mobile.png

**Sorun.** Footer'da dev bir ALAZ wordmark, mailto, iki ofis adresi ve BLOG/LEGAL/PRIVACY + BACK TO TOP var; o kadar. Ana nav yok (Services/Work/About footer'dan ulaşılamıyor), proje başlatma CTA'sı yok, LinkedIn/GitHub yok, markethours.live yok. Her sayfanın sonuna gelen ziyaretçi için tek seçenek header'a geri kaydırmak. Üstelik en.json'da `footer.talk` anahtarı tanımlı ama Footer.jsx hiç okumuyor; tasarlanmış bir footer CTA'sı sessizce düşmüş.

**Neden önemli.** Awwwards seviyesindeki stüdyo sitelerinde footer ikinci ana sayfadır: kaydırmanın sonunda gelen ziyaretçi en sıcak noktadadır ve orada bir sonraki adım verilir. Buradaki footer, 'büyük logo + adres' şablonunun boş bir kopyası; yolculuğu her sayfada aynı duvarla bitiriyor ve sitenin iç link yoğunluğunu (SEO + keşfedilebilirlik) düşürüyor.

**Ne yapılmalı.** Footer'ı 3 katmanlı bir varış noktası yap: (1) Üst satır: `footer.talk` metni büyük puntoda + `<Link href="/start-project">` birincil CTA + `mailto` ikincil. (2) Orta blok, 4 sütun: STUDIO (Services, Work, About, Journal — Header ile aynı NAV sabitinden), PRODUCTS (`projects.filter(p => p.link)` → 'Market Hours ↗ live'), ELSEWHERE (SOCIAL_PROFILES: LinkedIn, GitHub), OFFICES (mevcut ContactInfo). (3) Alt satır: copyright, Legal/Privacy, dil değiştirici, Back to top. Veri kaynağı tek olsun: `src/lib/nav.js` içinde `export const NAV = [{href:'/services', key:'services'}, ...]`, `FOOTER_GROUPS`, `SOCIAL_PROFILES`; Header, Footer, mobile drawer ve sitemap bunu import etsin. Büyük wordmark kalabilir; ama altına link satırı gelsin.

#### `gap-journey-link-graph-03` — Hizmet ↔ vaka ↔ yazı ↔ form arasında yatay bağlantı sıfır; her içerik türü kendi silosunda bitiyor

- **Önem:** KRİTİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:130-192 (article: CTA yok, kanıt linki yok), :114-124 (chip'ler sadece #anchor); src/app/[locale]/case-studies/[slug]/page.jsx:92 (type/discipline düz metin), :149-156 (markers düz metin); src/app/[locale]/blog/[slug]/page.jsx:357-370 (ilgili hizmet/vaka yok); messages/en.json projects[], servicesPage.items[], blogPosts[] arasında hiçbir ilişki alanı yok. Screenshots: journey-client-services-article05-end-desktop.png (article 05 boşlukla bitiyor), case-market-hours-desktop-full.png, blog-post-desktop-full.png

**Sorun.** Services sayfasındaki 5 madde için 'bu hizmeti şu projede görün' ya da 'bu hizmetle başla' yok; Performance & Modernization maddesi, performance etiketli blog yazısına ve Next.js dashboard'lu Market Hours vakasına bağlanabilecekken boş bitiyor. Case study'de 'MOBILE & WEB', 'FINTECH TOOL' düz metin; hangi hizmetin işi olduğu belirsiz. Blog yazıları yalnızca genel /services ve /start-project'e inline link veriyor; hiçbir yazı bir vakaya bağlı değil. Formun proje tipi ekranı bu bağlamı hiç almıyor (bkz. 04).

**Neden önemli.** Müşteri adayı personasının yolu 'ihtiyacım → bu hizmet → kanıt (vaka) → başla'; bu zincirin ortası kopuk. Awwwards jürisi vaka sayfasından ikinci vakaya ya da stüdyonun yaklaşımına geçmek ister; meslektaş yazıdan vakaya. Crawler açısından da iç link grafiği tek yönlü (hub→leaf), bu da tüm iç sayfaların otoritesini düşürür.

**Ne yapılmalı.** Veri modeline ilişki ekle: en.json `projects[].services: ['mobile-app-development','custom-software-development']`, `projects[].related: ['cost-of-a-slow-website']`, `blogPosts[].services: ['performance-engineering']`, `blogPosts[].projects: ['market-hours']`. Tek bir `RelatedRail` server component yaz: `<RelatedRail title="SEEN IN" items={[{kind:'project', slug}, {kind:'post', slug}, {kind:'service', id}]} />` — her öğe kind'a göre /case-studies/:slug, /blog/:slug, /services#:id'ye gider. Yerleştir: (a) Services her article'ın altına `SEEN IN → MARKET HOURS` + `START A {title} PROJECT → /start-project?type=:id`; (b) Case study markers bloğunun altına `SERVICES USED` satırı (chip'ler artık Link) + `RELATED NOTE`; (c) Blog author kutusunun üstüne `RELATED WORK`. Chip'lerin hover'ı mevcut border-white/40 stilinde kalsın; yeni görsel dil icat etme.

> **Doğrulayıcı notu:** İddia doğru: services/page.jsx:130-192 article'larında 0 link (ölçtüm: `article[itemscope] a` = 0); chip'ler :114-124 yalnız #anchor; case [slug]:92 type/discipline düz metin, :149-156 markers düz metin; en.json projects[]/servicesPage.items[]/blogPosts[] arasında ilişki alanı yok. Düzeltme: blog yazısı için verilen satır numaraları yanlış — blog/[slug]/page.jsx 138 satır; author kutusu :108-119, next linki :121-124, CTA :127-132 (357-370 diye bir yer yok). Yazıların inline linkleri yalnız /services ve /start-project'e (journey-linkmap: blog-post 2 iç link, blog-post-2 2 iç link); hiçbir yazı bir vakaya bağlı değil. RelatedRail + ilişki alanları fix'i somut ve doğru.

### ÖNEMLİ

#### `gap-journey-link-graph-02` — Tek canlı ürün (markethours.live) tüm sitede tek bir yerden linkli, o da fold'un altında

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:95-96 (tek harici link); src/app/[locale]/page.jsx:144-179 (kart tek bir Link, `project.link` kullanılmıyor); src/app/[locale]/case-studies/page.jsx:42-48 (index satırında yok); messages/en.json projects[1].link. Screenshots: journey-juror-mh-hero-livelink-desktop.png (1440×900: buton y=910, görünmüyor), journey-juror-mh-hero-livelink-mobile.png (390'da fold içinde), journey-juror-home-mh-card-desktop.png, gaps/nav-back-home.png, journey-linkmap.json

**Sorun.** Crawled link haritasında blog kaynak linkleri hariç sitedeki tek harici link `VISIT MARKETHOURS.LIVE`. Ana sayfa kartının özeti 'Live on the web' diyor ama kart yalnızca case study'ye gidiyor; archive index'te canlı olduğuna dair ne rozet ne link var; footer'da yok. Case hero'da buton 1440×900'de viewport'un 10px altında kalıyor (pt-[128px] + mt-auto + pt-[110px] + 4 satırlık özet), yani jüri üyesi fold'da 'canlı ürün' sinyalini görmüyor.

**Neden önemli.** Awwwards jürisi ve müşteri adayı için 'gerçek, canlı, dokunulabilir bir ürün' en güçlü kanıt; onu tek sayfada, fold altında saklamak kanıtı çöpe atmak. Stüdyo sitelerinde canlı ürün hero'da, kartta ve footer'da tekrar eder (Basement'ın 'Live' etiketleri, Lusion'un proje kartlarındaki 'Visit site').

**Ne yapılmalı.** (1) `LiveLink` küçük bir server component: `{project.link && <a href={project.link.href} target="_blank" rel="noopener noreferrer">LIVE · {project.link.label} ↗</a>}`. (2) Home kartı: kartın tamamı Link olduğundan içine <a> gömme; kart yapısını `article > Link(görsel+başlık) + meta satırı(LiveLink)` olarak böl, meta satırındaki 'FINTECH TOOL / FOREX & STOCKS' yanına LiveLink koy. (3) Archive index: SCOPE sütununa yeşil nokta değil, mono 'LIVE' metni + satır dışı küçük LiveLink; satır Link'i korunur. (4) Case hero: `min-h-[clamp(620px,92vh,980px)]` yerine butonu h1'in hemen altına, özeti butonun altına taşı ya da hero padding'ini pt-[96px]/pt-[60px] yaparak butonu 900px viewport'ta görünür kıl. (5) Footer PRODUCTS sütunu (bkz. 01).

> **Doğrulayıcı notu:** Doğrulandı: sitedeki tek harici ürün linki case-studies/[slug]/page.jsx:96; home kartı (page.jsx:144-179) ve arşiv satırı (case-studies/page.jsx:42-48) project.link'i hiç okumuyor; en.json projects[1].summary 'Live on the web' diyor ama kart yalnız vaka sayfasına gidiyor. Kendi ölçümüm: butonun üst kenarı 1440×900'de y=910, 1366×768'de y=894, 1536×864'te y=929 (üçünde de fold dışı); 1920×1080'de y=814 ve 390×844'te y=619 (fold içi). Yani yaygın laptop viewport'larının hepsinde gizli. Severity'yi major'a çekiyorum: link var ve bulunabilir, sorun 'kırık' değil 'az sergilenmiş'. Fix listesi doğru; ek not: hero'da buton satırını 1366×768'de de görünür kılmak için pt-[128px]→pt-[96px] + mt-auto pt-[110px]→pt-[60px] yeterli olmaz, özet paragrafı 5 satır (204 karakter) olduğundan butonu h1 ile özet arasına almak daha güvenli.

#### `gap-journey-link-graph-04` — Intake formu hiçbir bağlam almıyor: ?type= / ?from= okunmuyor, 4 proje tipi 5 hizmetle eşleşmiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/IntakeForm.jsx:10 (initial state sabit), :20-30 (useSearchParams yok; repo genelinde grep: 0), :127-134 (types); messages/en.json intake.types (Web App / Mobile App / Systems & Backend / Something Else) vs servicesPage.items[].id (5 hizmet); src/app/api/contact/route.js:8,27-37 (`source`/`from` alanı yok). Screenshots: journey-intake-type-param-ignored-desktop.png (/start-project?type=mobile-app-development&from=services → tüm aria-pressed=false), journey-client-intake-arrival-desktop.png

**Sorun.** Hizmet chip'inden, ana sayfa kartından ya da vaka sayfasından forma gelen ziyaretçi sıfırdan 'WHAT ARE WE BUILDING?' sorusuyla karşılanıyor; az önce okuduğu hizmet formun 4 kutusunda yok (Cloud/DevOps ve Performance 'Something Else / Audit, rescue or custom' altına düşüyor; API ile Cloud tek kutuda). Backend `project_type`'ı serbest metin olarak alıyor, dolayısıyla geldiği sayfa (`from`) hiçbir yerde kaydedilmiyor; ekip hangi hizmet sayfasının lead getirdiğini göremiyor.

**Neden önemli.** Bağlam taşımayan form bir 'genel iletişim formu'dur; bu da 'template site' sinyali. Müşteri adayının 3 adımlık formda ilk adımı gereksiz yere tekrar düşünmesi dönüşümü düşürür; hizmet taksonomisiyle formun uyuşmaması da stüdyonun kendi hizmetlerini nasıl sattığı konusunda tutarsızlık gösterir.

**Ne yapılmalı.** (1) `intake.types`'ı `servicesPage.items` ile aynı id'lere bağla: 5 hizmet + 'NOT SURE YET' (6. kutu), her kutuda `id` alanı; `project_type` olarak id gönder. (2) IntakeForm'da `const sp = useSearchParams(); const presetType = sp.get('type'); const from = sp.get('from');` → `useState({...initial, project_type: types.find(t => t.id === presetType)?.id ?? ''})`; preset geçerliyse step 0'ı seçili gösterip 'Change' bağlantısı bırak ya da doğrudan step 1'e başlat. Next 15'te useSearchParams'lı client component'i `<Suspense>` ile sar (start-project/page.jsx). (3) `from` ve `document.referrer`'ı hidden alan olarak gönder; route.js'te `source: (source||'').slice(0,120)` ekle, mailer/db'ye yaz. (4) Tüm CTA'ları bağlamlı hale getir: services article → `/start-project?type=${item.id}&from=services`, case study → `?type=${project.services[0]}&from=case:${slug}`, blog → `?from=post:${slug}`.

> **Doğrulayıcı notu:** Doğrulandı: repo genelinde useSearchParams/searchParams 0 sonuç; IntakeForm.jsx:10 sabit initial, :127-134 types; /start-project?type=mobile-app-development&from=services → aria-pressed 4×false (kendi probe'um). route.js:8 ve :27-37'de source/from yok. Taksonomi: intake.types 4 (Web App / Mobile App / Systems & Backend 'APIs, integrations & cloud' / Something Else) vs servicesPage.items 5. Düzeltme: 'Cloud/DevOps Something Else altına düşüyor' ifadesi yanlış — Cloud, 3. kutunun detail satırında ('& cloud'); yalnız Performance & Modernization'ın kutusu yok. Ayrıca şu an hiçbir CTA ?type= göndermiyor, dolayısıyla 'parametre okunmuyor' bugünkü kullanıcıyı etkilemiyor; asıl mevcut sorun taksonomi uyumsuzluğu + project_type'ın görünen ad (type.name) olarak gönderilmesi. Bu nedenle major. Fix (id'li 5+1 tip, Suspense'li useSearchParams, source alanı, bağlamlı CTA'lar) doğru.

#### `gap-journey-link-graph-05` — Step 3'teki privacy linki formu sıfırlıyor: kullanıcı iki adım veri kaybediyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:184 (`<Link href="/privacy">` — same-tab, state persist yok), :30-35 (useState, persist yok). Screenshots: journey-intake-step3-before-privacy-desktop.png → journey-intake-after-privacy-back-desktop.png (geri dönüşte '01 / 03 — PROJECT TYPE', 0 seçili)

**Sorun.** Doğrulandı: tip seçip step 1'i doldurup step 3'e gelen kullanıcı 'privacy' linkine tıklayınca sayfa değişiyor; tarayıcı geri tuşuyla dönünce form step 1'e, boş hale dönüyor (ad, e-posta, brief, tip hepsi gitti). Tam gönderim anında, en kırılgan noktada bir yolculuk tuzağı.

**Neden önemli.** Dönüşüm hunisinin son adımında veri kaybı, formu bir daha doldurmayan kullanıcı demek. Awwwards'tan bağımsız, temel usability hatası; ayrıca 'biz detaylara dikkat ederiz' iddiasıyla çelişiyor.

**Ne yapılmalı.** Kısa vadede: privacy linkine `target="_blank" rel="noopener"` ver ya da metni inline bir `<details><summary>How we handle your data</summary>` ile açılır yap (privacy'nin ilgili 2 cümlesi). Kalıcı çözüm: form taslağını `sessionStorage['alaz:intake']` anahtarında `useEffect(() => sessionStorage.setItem(...), [form, step])` ile sakla, mount'ta `try { JSON.parse(...) } catch {}` ile geri yükle, başarılı gönderimde temizle. Böylece dil değiştirme (header TR/EN linki de aynı kaybı yaratıyor) ve yanlışlıkla geri tuşu da güvenli olur.

#### `gap-journey-link-graph-06` — Ana sayfadaki üç 'CORE CAPABILITIES' kartı link değil ama ↗ ikonu ve hover arka planı taşıyor (ölü affordance)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:99-102 (`<article ... hover:bg-[#141414]>` içinde `<MoveUpRight/>`, hiçbir Link yok); journey-linkmap.json arrowStats.home: 3 ok 'none' konteynerinde. Screenshots: journey-client-home-service-card-desktop.png, kb-home-service-article-hover.png

**Sorun.** Kartların sağ üstünde ok var, hover'da arka plan koyulaşıyor; tıklayınca hiçbir şey olmuyor. Müşteri adayı 'MOBILE APPS' kartına tıklayıp mobil hizmet detayına gitmek istiyor, gidemiyor; tek yol sağ üstteki küçük 'EXPLORE SERVICES'. Üstelik ana sayfa 3 kart gösterirken services sayfası 5 madde; 'SYSTEMS & BACKEND' kartının services'te karşılığı iki ayrı madde (api-integration + system-architecture-cloud).

**Neden önemli.** Tıklanabilir görünen ama tıklanamayan yüzey, kullanıcıya 'bu site bozuk' hissi verir ve jüri tarafından anında fark edilir. Ayrıca ana sayfa → hizmet detayı yolu olmaması, sitenin en çok ziyaret edilen sayfasından en yüksek öncelikli (sitemap .9) sayfaya derin link vermemesi demek.

**Ne yapılmalı.** Her kartı `<Link href={`/services#${service.id}`}>` yap (services dizisine `id` ekle: custom-software-development, mobile-app-development, api-integration). İkonu okun yönüyle tutarlı kıl: iç link olduğu için ArrowRight ya da hiç ikon (bkz. 07). Alternatif: ana sayfa kartlarını `servicesPage.items`'tan türet ve 5 maddeyi 5'li grid ya da yatay kaydırmalı satır olarak göster; böylece iki taksonomi çatallanmaz.

#### `gap-journey-link-graph-07` — ↗ (ArrowUpRight) anlamsızlaşmış: 38 ok, yalnızca 1'i harici link, 7'si link bile değil; gerçek harici linkler oksuz

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:38,43-45; src/app/[locale]/page.jsx:97,139,164,203; blog/page.jsx:235; blog/[slug]/page.jsx:374,381; case-studies/page.jsx:46; case-studies/[slug]/page.jsx:96,169; IntakeForm.jsx:132 (button içinde); src/components/Markdown.jsx:111-113 (harici link target=_blank ama ikon yok). Evidence: journey-linkmap.json arrowStats (total 38, external 1, notInLink 7)

**Sorun.** ↗ ikonu 'dışarı/yeni sekme' anlamını taşıması gereken tek yerde (VISIT MARKETHOURS.LIVE) ile 'START A PROJECT', 'READ', 'NEXT FIELD NOTE', mobil menüdeki her nav maddesi ve formdaki tip butonları aynı. Blog'daki 6 harici kaynak linki ise yeni sekmede açılıyor ama hiçbir görsel işaret taşımıyor. Kullanıcı hangi tıklamanın siteden çıkardığını öğrenemiyor.

**Neden önemli.** Tutarsız ikon dili hem craft eksikliği hem de erişilebilirlik sorunu (yeni sekme açılacağı duyurulmuyor). 'Her butona ↗ koy' refleksi tipik AI-builder kalıbı; Awwwards seviyesinde ok yönü bir sözleşmedir: → iç, ↗ dış, ↓ kaydır.

**Ne yapılmalı.** Kural: ↗ yalnızca `target="_blank"` olan linklerde. `src/components/ExternalLink.jsx`: `<a target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight aria-hidden/><span className="sr-only"> (opens in new tab)</span></a>`; markethours, store butonları, sosyal linkler ve Markdown.jsx'in harici dalı bunu kullansın. İç linklerde ArrowRight (→) ya da ikon yok; mobil nav maddelerinde ok yerine numara yeterli; IntakeForm tip butonlarında ok yerine seçili olmayan durumda boş kare/‘+’, seçilide Check.

> **Doğrulayıcı notu:** Sayım doğru (journey-linkmap arrowStats: 38 ok, 1 harici, 3'ü hiçbir link/buton içinde değil + 4'ü form butonunda = 7); blog'daki 6 harici kaynak linki ikonsuz (Markdown.jsx:21, 111-113 değil). Satır düzeltmeleri: blog/page.jsx:60 (235 değil), blog/[slug]/page.jsx:123 ve :130 (374/381 değil). Eklenecek kanıtlar: (a) en.json intake.privacyNoteCta string'inin içinde literal '↗' var ama link same-tab iç link; (b) Header.jsx:45 drawer dil satırı index glifi olarak '↗' kullanıyor + ArrowUpRight; (c) vaka 'next' linki ArrowRight (case [slug]:161) ama yazı 'next' linki ArrowUpRight (blog [slug]:123) — aynı kalıp iki farklı ok. Fix (ExternalLink bileşeni, ↗ yalnız target=_blank) doğru.

#### `gap-journey-link-graph-10` — Aynı düğümün 4-5 farklı adı var; breadcrumb JSON-LD'de Services 'SOFTWARE ENGINEERING' olarak geçiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json: nav.linkLabels[0] 'CASE STUDIES' / archive.heading 'THE WORK' / home.selected.heading 'SELECTED WORKS' + viewAllCta 'VIEW ALL PROJECTS' / archive.eyebrowRight 'ARCHIVE / SELECTED WORK' / caseStudy.backToArchive 'BACK TO ARCHIVE'; nav 'BLOG' / blogIndex.heading 'THE BLOG' / blogPost.allFieldNotes '← ALL FIELD NOTES' + nextNoteLabel 'NEXT FIELD NOTE'; nav 'SERVICES' / servicesPage.heading 'SOFTWARE ENGINEERING' / home.capabilities 'CORE CAPABILITIES' + 'EXPLORE SERVICES'. src/app/[locale]/services/page.jsx:53 (`{ name: heading.join(' ') }` → crumb 'SOFTWARE ENGINEERING'; seo.services='Services' tanımlı ama kullanılmıyor)

**Sorun.** Ziyaretçi 'Case Studies'e tıklayıp 'THE WORK' sayfasına iniyor, oradan 'Selected Work' arşivine, geri dönerken 'Back to Archive' okuyor; blog 'Field Notes' oluyor; Services'in yapılandırılmış veride adı 'SOFTWARE ENGINEERING'. Google'ın breadcrumb kılavuzu görünür etiketle eşleşen ad ister; burada ne görünür breadcrumb var ne de tutarlı ad.

**Neden önemli.** Her düğüme tek ad, wayfinding'in temel kuralı; isim çoğalması 'her bölümü ayrı promptla yazılmış' hissi verir (AI slop sinyali) ve arama sonuçlarındaki breadcrumb'ı da bozar.

**Ne yapılmalı.** Her düğüm için tek kanonik ad seç ve her yerde kullan: WORK (nav, h1 kicker 'WORK / INDEX', back link '← WORK', crumb 'Work'), SERVICES (h1 'SERVICES', kicker 'SOFTWARE ENGINEERING' ikincil satır olabilir), JOURNAL ya da BLOG (biri; 'Field Notes' sadece eyebrow süsü olarak kalabilir). services/page.jsx:53'te `name: tSeo('services')` kullan. en.json'da `seo.*` anahtarlarını nav etiketlerinin kaynağı yap ki nav/crumb/footer ayrışamasın.

#### `gap-journey-link-graph-12` — LinkedIn ve GitHub llms.txt'de var, sitede hiçbir yerde yok; SOCIAL_PROFILES boş olduğu için Organization sameAs da boş

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/lib/seo.js:17 (`SOCIAL_PROFILES = []`); src/components/StructuredData.jsx:66 (`sameAs: SOCIAL_PROFILES`); public/llms.txt:28-29 (LinkedIn https://www.linkedin.com/company/alaz-pro, GitHub https://github.com/alaz-pro); Footer.jsx, about/page.jsx:82-87, blog/[slug]/page.jsx:359-370 (author kutusu yalnızca mailto). Screenshots: chrome/footer-desktop.png, journey-peer-about-end-desktop.png, blogpost-d-author-next.png

**Sorun.** İşe alımcı/meslektaş personası sitede stüdyonun GitHub'ına ya da LinkedIn'ine giden bir yol bulamıyor; blog yazarı 'A.' avatarı + mailto ile bitiyor. Makineye (llms.txt) söylenen şey insana gösterilmiyor; Organization şemasında `sameAs: []` boş dizi olarak çıkıyor (Google için anlamsız).

**Neden önemli.** Bir yazılım stüdyosu için GitHub profili portföyün parçasıdır; sosyal linklerin yokluğu 'gerçek bir ekip yok' şüphesini besler (AI-generated site sinyali). sameAs, Knowledge Graph entity doğrulamasının ana girdisi.

**Ne yapılmalı.** `src/lib/seo.js`: `export const SOCIAL_PROFILES = [{ name:'LinkedIn', href:'https://www.linkedin.com/company/alaz-pro', handle:'alaz-pro' }, { name:'GitHub', href:'https://github.com/alaz-pro', handle:'alaz-pro' }]`; StructuredData'da `sameAs: SOCIAL_PROFILES.map(p => p.href)`. Render: Footer ELSEWHERE sütunu (ExternalLink ile), About'taki contact bloğu (email'in yanına), blog author kutusu ('ALAZ on GitHub ↗'), mobil drawer'ın alt bloğu. llms.txt'yi aynı sabitten üret (bkz. 22).

> **Doğrulayıcı notu:** seo.js:17 SOCIAL_PROFILES = [] doğru; probe'da Organization sameAs: [] boş dizi olarak çıkıyor. Satır düzeltmesi: StructuredData.jsx:47 (66 değil); blog author kutusu blog/[slug]/page.jsx:108-119 (359-370 değil). llms.txt:28-29 LinkedIn/GitHub doğru; src ve en.json'da 'linkedin'/'github' yalnız 'GitHub Actions' stack etiketi olarak geçiyor. Fix (SOCIAL_PROFILES nesneleri + footer/about/author/drawer render) doğru.

#### `gap-journey-link-graph-13` — Sayfa sonu CTA'ları şablon başına bağlamsız; index sayfaları hiçbir CTA olmadan 'END OF INDEX' ile bitiyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/page.jsx:49 ('END OF INDEX / MORE SYSTEMS IN DEVELOPMENT' sonrası doğrudan footer); blog/page.jsx:241-244 ('MORE FIELD NOTES INCOMING.'); about/page.jsx:80 (yalnızca /start-project); services/page.jsx:258-263 (about.endText + /start-project); case-studies/[slug]/page.jsx:166-171 ('LET'S TALK' → /start-project); blog/[slug]/page.jsx:378-383 ('START A PROJECT'). Screenshots: journey-juror-index-end-mobile.png, journey-juror-index-end-desktop.png, journey-client-services-end-desktop.png, journey-juror-case-end-desktop.png, journey-peer-post-end-desktop.png

**Sorun.** Beş şablonun sonunda ya hiçbir şey (iki index) ya da aynı tek düğme (/start-project) var. Vaka sayfasının sonu 'HAVE A COMPLEX CHALLENGE? → LET'S TALK' diyor ama 'bu işin arkasındaki hizmet', 'tüm işler' ya da 'yaklaşımımız' seçeneği sunmuyor; blog yazısı sonunda ilgili yazı/hizmet yok; services'in son CTA'sı About'un cümlesini kopyalıyor. Tek basamaklı merdiven: ya form doldur ya çık.

**Neden önemli.** Her persona aynı anda satın almaya hazır değil; jüri ve meslektaş için 'bir sonraki ilginç şey', müşteri adayı için 'güveni artıracak bir ara adım' gerekir. Tek CTA'lı sayfa sonu, landing page kalıbıdır; stüdyo sitesi değil.

**Ne yapılmalı.** `EndCta` component: `<EndCta prompt="..." primary={{href, label}} secondary={{href, label}} rail={<RelatedRail .../>} />`. Merdiven: Work index → primary 'START A PROJECT', secondary 'HOW WE WORK → /services' + 'LATEST NOTE'; Case study → primary `/start-project?type=${project.services[0]}&from=case:${slug}` ('START A SIMILAR PROJECT'), secondary 'SERVICES USED' chip'leri + prev/next proje; Services → primary bağlamlı form, secondary 'SEE THE WORK → /case-studies'; About → primary form, secondary 'SELECTED WORK' 2 kart; Blog index → 'RSS' + 'START A PROJECT'; Blog post → ilgili vaka/hizmet raylı + form. Mevcut buton stillerini (border white/.65 outline, beyaz dolgu) koru; sadece hiyerarşi ve hedefler değişsin.

> **Doğrulayıcı notu:** Doğrulandı: case-studies/page.jsx:49 'END OF INDEX / MORE SYSTEMS IN DEVELOPMENT' sonrası footer (journey-juror-index-end-desktop.png); about:80 ve services CTA bölümü :249-265 aynı tAbout('endTextTop/Bottom') + /start-project; case [slug]:166-171 'LET'S TALK'; blog [slug]:127-132 'START A PROJECT' (378-383 değil); blog index notu blog/page.jsx:66-69 (241-244 değil). journey-peer-post-end-desktop.png tek düğmeyle bitişi gösteriyor. EndCta merdiveni fix'i somut.

#### `gap-journey-link-graph-14` — About sayfası izole: yalnızca forma çıkıyor, süreç bölümü Services'tekiyle farklı isimlerle çiftlenmiş, iletişim bloğu footer'ı aynen tekrarlıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:72-76 (processSteps: DISCOVER/ARCHITECT/ENGINEER/HARDEN) vs services/page.jsx:198-218 (processSteps: Deep Discovery/System Blueprint/Iterative Execution/Production & Handover); about/page.jsx:82-87 (contact bloğu: email + ContactInfo large) hemen ardından Footer.jsx:13-20 (aynı email + aynı ContactInfo); about/page.jsx:63-71 (disciplines/principles bölümleri yorum satırında). Screenshots: journey-peer-about-end-desktop.png (aynı adresler bir ekranda iki kez), about-desktop-full.png, services-desktop-full.png

**Sorun.** About'ta çıkış linki sadece /start-project + mailto; hizmetlere, işlere, yazılara hiçbir yol yok. Aynı 4 adımlı süreç iki sayfada iki farklı adla anlatılıyor; ikisini de okuyan müşteri adayı iki farklı süreç görüyor. Sayfanın sonunda iletişim bloğu + hemen altında footer'daki aynı iki ofis adresi ve aynı e-posta: tek ekranda birebir tekrar.

**Neden önemli.** About sayfası, 'bu ekibe güvenir miyim' sorusuna cevap veren sayfadır; kanıta (work) ve yetkinliğe (services) bağlanmaması onu bir manifesto duvarına çevirir. Çiftlenmiş süreç ve çiftlenmiş adres bloğu ise 'bölümler ayrı ayrı üretilip birleştirilmemiş' sinyali.

**Ne yapılmalı.** (1) Süreci tek veri kaynağına indir (`process` dizisi en.json'da bir kez); About tam anlatır, Services yalnızca 4 başlığı listeler ve 'HOW WE WORK → /about#process' linki verir (ya da tersi). (2) About'taki contact bloğunu kaldır; footer zaten aynı bilgiyi taşıyor — ya da About'un bloğunu sosyal + takvim linkiyle zenginleştir ve footer'da adresleri kısalt. (3) Yorum satırındaki disciplines bölümünü `services` verisinden Link'li olarak geri getir (`/services#id`). (4) Sayfa sonuna 'SELECTED WORK' 2 kartlık RelatedRail.

#### `gap-journey-link-graph-15` — Bilinmeyen vaka/yazı slug'ları 200 ile 'NOT FOUND' sayfası döndürüyor (soft 404)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:39-46 (`if (!project) return (<main>...)`), src/app/[locale]/blog/[slug]/page.jsx:297-306; `notFound()` çağrılmıyor. Evidence: journey.cjs — GET /case-studies/nope → 200, GET /blog/nope → 200, /this-does-not-exist → 404

**Sorun.** Yanlış ya da eski bir slug'a gelen ziyaretçi (ve crawler) 200 statüsüyle 'PROJECT NOT FOUND' görüyor; bu sayfalar indekslenebilir, metadata boş (`return {}`), sitemap'te olmayan ama 200 dönen sonsuz sayıda URL üretilebiliyor.

**Neden önemli.** Soft 404, Search Console'da 'crawled, not indexed' kirliliği ve hata sayfasının gerçek 404 şablonuyla (LegalContent) tutarsız iki ayrı tasarımı demek; yolculuk açısından da iki farklı 'kayboldun' ekranı var.

**Ne yapılmalı.** Her iki [slug] sayfasında `import { notFound } from 'next/navigation'` ve `if (!project) notFound();` (generateMetadata'da da aynı). İsteğe bağlı `export const dynamicParams = false;` ile yalnızca generateStaticParams'taki slug'lar derlensin. İnline not-found dalını ve `caseStudy.notFoundHeading`/`blogPost.notFoundHeading` string'lerini sil; tek 404 şablonu kalsın (bkz. 16).

> **Doğrulayıcı notu:** Doğrulandı ve ağırlaştı: case-studies/[slug]/page.jsx:39-46 ve blog/[slug]/page.jsx:46-55 (297-306 değil) inline not-found dalı; notFound() yalnız [...rest]/page.jsx'te. curl: /case-studies/nope → 200, /blog/nope → 200, /this-does-not-exist → 404. Ek kanıt (probe): soft-404 sayfalarının <title>'ı BOŞ (generateMetadata `return {}`) ve robots layout'tan 'index, follow' miras alıyor; gerçek 404 ise 'Page Not Found — ALAZ' + noindex. sk-journey/soft404-case.png: 'PROJECT NOT FOUND.' + 'BACK TO ARCHIVE ←' (metinden sonra sola bakan ok). Fix (notFound() + dynamicParams=false + string'leri sil) doğru.

#### `gap-journey-link-graph-missed-1` — Her iki vaka hero'sunda ölü 'COMING SOON' sahte mağaza butonları; canlı linkin yanında aynı biçimde iki ölü kutu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/StoreButtons.jsx:22 (`<span role="link" aria-disabled="true">`), src/app/[locale]/case-studies/[slug]/page.jsx:95-98, src/lib/stores.js:4-13 (iki projede de appStore/googlePlay boş). Screenshots: shots/sk-journey/vocab-hero-buttons.png, shots/sk-journey/mh-hero-1440x900.png

**Sorun.** STORE_LINKS'in tüm değerleri boş olduğu için Vocabulary hero'sunda buton satırının tamamı iki ölü kutudan ibaret ('COMING SOON ON APP STORE / GOOGLE PLAY'); Market Hours hero'sunda sitedeki tek gerçek harici link (VISIT MARKETHOURS.LIVE) aynı satırda, aynı boyutta iki ölü kutuyla yan yana duruyor ve görsel olarak üçte bir ağırlığa iniyor. span'e role="link" + aria-disabled verilmiş: ekran okuyucu 'link' duyuruyor, tıklayınca hiçbir şey olmuyor; cursor-default ama buton biçimli.

**Neden önemli.** Jüri üyesinin ilk gördüğü yüzeyde tıklanamayan buton = bitmemiş site sinyali; 'canlı ürün' kanıtını iki 'yakında' kutusuyla sulandırmak 02 numaralı bulgunun tam tersi yönde çalışıyor. Yayınlanmamış mağaza bağlantısı için buton kalıbı kullanmak tipik şablon refleksi.

**Ne yapılmalı.** StoreButtons'ta href'i boş olan mağazayı hiç render etme (`STORES.filter(s => links[s.key])`); hiç link yoksa bileşen null dönsün ya da buton yerine tek satır mono metin: `<p className="font-mono text-[12px] text-dim">APP STORE / GOOGLE PLAY — COMING SOON</p>` (kutu, ikon, role yok). Market Hours'ta canlı link tek başına kalsın; linkler dolduğunda butonlar otomatik geri gelir. aria-disabled'lı span kalıbını tamamen kaldır.

### İNCE İŞÇİLİK

#### `gap-journey-link-graph-08` — Header aktif durumu yalnızca tam eşleşmede: vaka ve yazı sayfalarında hiçbir nav maddesi aktif değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:32 (`pathname === link.href`). Evidence: journey.cjs çıktısı — /case-studies/market-hours'ta 4 nav linki de rgb(170,170,170); /case-studies'te CASE STUDIES beyaz. Screenshots: case-market-hours-desktop-fold.png vs case-studies-desktop-fold.png

**Sorun.** Jüri üyesi vaka sayfasındayken header 'neredeyim' bilgisini kaybediyor; blog yazısında BLOG gri. Görünür breadcrumb da olmadığından (bkz. 11) alt sayfalarda tek konum ipucu küçük '← ALL CASE STUDIES' eyebrow'u.

**Neden önemli.** Wayfinding'in en ucuz sinyali; eksikliği derin sayfalarda kaybolma hissi yaratır ve sitenin hiyerarşisi olmadığı izlenimini verir.

**Ne yapılmalı.** `const isActive = pathname === link.href || pathname.startsWith(link.href + '/')`; aktif linke `aria-current="page"` ekle ve stili `[&[aria-current=page]]:text-white` ile ver. Mobil drawer'da da aynı kuralı uygula.

> **Doğrulayıcı notu:** Header.jsx:32 `pathname === link.href` doğru; probe: /case-studies/market-hours ve /blog/cost-of-a-slow-website'ta 4 nav linki de rgb(170,170,170), aria-current yok; /services'te SERVICES beyaz. Ancak alt sayfalarda eyebrow'daki '← ALL CASE STUDIES' / '← ALL FIELD NOTES' konum bilgisini zaten veriyor; 4 maddelik nav'da bu bir cila eksiği. Severity minor. Fix (startsWith + aria-current) tek satır, doğru.

#### `gap-journey-link-graph-09` — Nav sırası (CASE STUDIES, ABOUT, SERVICES, BLOG) sitemap öncelikleriyle ve dönüşüm mantığıyla çelişiyor; üç yerde üç farklı sıra

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:9 (NAV_HREFS); src/app/sitemap.js:10-15 (services .9 > case-studies .8 > about .7 = blog .7 > start-project .6); src/components/Footer.jsx:5 (blog, legal, privacy); public/llms.txt:9-14 (Home, Services, Case studies, About, Blog, Start). Screenshots: home-desktop-fold.png, nav-open-mobile.png

**Sorun.** Header'da ABOUT, WORK ile SERVICES'in arasına girmiş; sitemap Services'i en önemli sayfa ilan ediyor; llms.txt farklı bir sıra veriyor; footer'da ana nav zaten yok. Dört farklı dosya dört farklı 'site haritası' anlatıyor.

**Neden önemli.** Müşteri adayı için doğal akış 'ne yapıyorsunuz (services) → kanıt (work) → kimsiniz (about) → nasıl düşünüyorsunuz (journal)'. Tutarsız sıra, stüdyonun kendi hikâyesini hangi sırayla anlatmak istediğini bilmediğini gösterir; jüri için de 'bitmemiş IA' sinyali.

**Ne yapılmalı.** Tek kaynak: `src/lib/nav.js` → `export const NAV = [{href:'/services', labelKey:'services', priority:.9}, {href:'/case-studies', labelKey:'work', priority:.9}, {href:'/about', labelKey:'about', priority:.7}, {href:'/blog', labelKey:'journal', priority:.7}]`. Header, Footer STUDIO sütunu, mobil drawer ve sitemap STATIC_PATHS bu diziden türesin; llms.txt'yi de `src/app/llms.txt/route.js` ile aynı diziden üret (bkz. 22). Önerilen sıra: SERVICES, WORK, STUDIO, JOURNAL (ya da WORK önce; ama ABOUT ikisinin arasına girmesin).

> **Doğrulayıcı notu:** Dosyalar doğrulandı: Header.jsx:9 [case-studies, about, services, blog]; sitemap.js:10-15 services .9 > case-studies .8 > about .7 = blog .7; llms.txt:9-14 Home, Services, Case studies, About, Blog, Start; Footer.jsx:5 blog/legal/privacy. Dört ayrı el listesi gerçek. Ama kullanıcıya görünen tek şey header sırası ve 'WORK önce' savunulabilir bir tercih; sitemap priority ile nav sırasının farklı olması ziyaretçinin fark edeceği bir şey değil. Asıl değer tek kaynak (nav.js) fix'inde; bu da 01/22 ile birlikte kapanıyor. Severity minor.

#### `gap-journey-link-graph-11` — BreadcrumbList JSON-LD var ama görünür breadcrumb yok; derin sayfalarda konum bilgisi eyebrow'daki tek geri linkine kalmış

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/JsonLd.jsx:29-44; about/page.jsx:33, services/page.jsx:50-55, case-studies/page.jsx:26, case-studies/[slug]/page.jsx:74-78, blog/page.jsx:203, blog/[slug]/page.jsx:331-335, start-project/page.jsx:18; görünür crumb: yalnızca [slug] sayfalarında '← ALL CASE STUDIES' / '← ALL FIELD NOTES'. Screenshots: case-market-hours-desktop-fold.png, blog-post-desktop-full.png

**Sorun.** Her sayfa Home › X › Y zincirini yapılandırılmış veriye yazıyor; kullanıcı bunu hiç görmüyor. Case/blog detaylarında eyebrow'daki 'ALL CASE STUDIES' tek yönlü (yalnızca üst seviye), Home'a dönüş yok; about/services/index sayfalarında hiçbir konum göstergesi yok.

**Neden önemli.** Google, breadcrumb markup'ının sayfada görünür olmasını bekler (eşleşmeyen markup zengin sonuç kaybı riski). Kullanıcı tarafında ise jüri üyesi derin sayfadan 'Work' ya da 'Home'a tek tıkla gidemiyor; sadece header'a kaydırıyor.

**Ne yapılmalı.** Tek kaynaktan hem görünür hem JSON-LD üreten `Crumbs` component: `<Crumbs items={crumbs} />` → `<nav aria-label="Breadcrumb" className="font-mono text-[12px] ..."><ol>` + içinde `<BreadcrumbJsonLd crumbs={items}/>`. Detay sayfalarında mevcut eyebrow satırının sol yarısını bununla değiştir: 'ALAZ / WORK / MARKET HOURS' (her parça Link, sonuncu aria-current). 2 seviyeli sayfalarda (about, services, index) ya aynı mono satırı göster ya da BreadcrumbJsonLd'yi kaldır; ikisinden biri, markup görünmeyen şey olmasın.

> **Doğrulayıcı notu:** JsonLd.jsx:29-44 BreadcrumbJsonLd ve kullanım yerleri doğru, iki satır hariç: blog/page.jsx:28 (203 değil) ve blog/[slug]/page.jsx:80-84 (331-335 değil). Görünür breadcrumb yok, alt sayfalarda yalnız '← ALL ...' eyebrow'u var. Ancak 2 seviyeli bir sitede görünür crumb'ın yolculuğa katkısı küçük; asıl mesele yapılandırılmış verinin görünmeyen içeriği işaretlemesi (SEO tutarlılığı). Severity minor. Crumbs bileşeni fix'i makul; 'ya göster ya markup'ı kaldır' ikilemi doğru.

#### `gap-journey-link-graph-16` — 404, Legal ve Privacy sayfaları tek çıkışlı ('← BACK TO HOME'); 404 bir mini site haritası olmalı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/LegalContent.jsx:20 (tek Link href='/'); src/app/[locale]/not-found.jsx; messages/en.json legal.notFound.body ('Return to the beginning.'). Screenshots: 404-desktop-fold.png, journey-peer-404-end-desktop.png, legal-desktop-full.png

**Sorun.** Kırık bir linkten ya da eski URL'den gelen ziyaretçi 404'te yalnızca ana sayfaya gönderiliyor; en olası hedefler (work, services, son yazılar) sunulmuyor. Legal ↔ Privacy birbirine yalnızca footer üzerinden bağlı.

**Neden önemli.** 404, paylaşılan ama kırılmış linklerin iniş noktasıdır; iyi stüdyo siteleri burayı kaybolmuş ziyaretçiyi doğru rafa koyan bir yönlendirici olarak kullanır. Tek düğmeli 404 şablon varsayılanı gibi durur.

**Ne yapılmalı.** LegalContent'in `missing` dalında NAV dizisinden 4 ana hedef + `projects.slice(0,2)` + `blogPosts.slice(0,2)` listesi (mono satırlar, mevcut border-line ayracıyla). İsteğe bağlı: pathname'e göre tahmin ('/case-study/..' → Work). Legal ve Privacy'nin altına karşılıklı 'SEE ALSO → PRIVACY / LEGAL' linki. noindex kalsın.

#### `gap-journey-link-graph-17` — 'Next project' / 'Next field note' seçimi keyfi: yazılarda tarih sırasına bakmıyor, projelerde 02→01 'next' oluyor, prev yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:49-50 (`(currentIndex + 1) % projects.length`), :158-163; src/app/[locale]/blog/[slug]/page.jsx:309 (`posts.find(item => item.slug !== post.slug)` — dizi sırasındaki ilk farklı yazı), :372-375. Screenshots: journey-juror-case-end-desktop.png ('NEXT PROJECT / 01'), journey-peer-post-end-desktop.png

**Sorun.** Blog 'next' her zaman dizideki ilk başka yazıyı seçer; 3. yazı eklendiğinde 2 ve 3 numaralı yazıların 'next'i hep 1 olur (tarih sırası yok, 'older/newer' ayrımı yok). Projelerde 02'nin 'next'i 01; iki projeyle sonsuz döngü, 'prev' yok. Bu iki link, detay sayfalarından çıkan neredeyse tek yatay yol oldukları için keyfilik yolculuğu belirliyor.

**Neden önemli.** Vaka → vaka geçişi Awwwards stüdyo sitelerinin omurgasıdır (Locomotive'in 'next project' peek'i); rastgele ya da döngüsel seçim, arşiv büyüdükçe aynı sayfaya sürekli geri atar ve ilişkili içeriği hiç göstermez.

**Ne yapılmalı.** Blog: `const sorted = [...posts].sort((a,b) => new Date(b.date) - new Date(a.date)); const i = sorted.findIndex(...); const newer = sorted[i-1]; const older = sorted[i+1];` → iki link ('OLDER' / 'NEWER') ya da ilişkili servise göre `posts.filter(p => p.services?.some(...))` ile 'RELATED'. Projeler: prev+next ikilisi; bir proje varsa 'ALL WORK' göster; `next` kartına küçük thumbnail (project.image) ekleyip 'peek' hissi ver. Etiketi '02 / 02 → 01 / 02' gibi sayaçla tutarlı yaz.

> **Doğrulayıcı notu:** Mantık doğru: case [slug]:49-50 `(currentIndex + 1) % projects.length` → 02'nin next'i 01, prev yok; blog [slug]:58 `posts.find(item => item.slug !== post.slug)` (309 değil) → dizideki ilk farklı yazı, tarih sırası yok; next linki :121-124 (372-375 değil). Blog index (blog/page.jsx:23) tarihe göre sıralıyor ama detay sayfası ham diziyi kullanıyor — iki sayfa iki farklı sıra. Fix doğru.

#### `gap-journey-link-graph-18` — Ana sayfa About ve Blog'a hiç link vermiyor; About yalnızca header'dan, Blog header+footer'dan ulaşılabilir

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:76-90 (VALIDATION: link yok), :184-208 (contact section: sadece form); journey-linkmap.json → home main links: #validation, /services, /case-studies, 2 slug, /start-project. Screenshots: home-desktop-full.png

**Sorun.** Sitenin en çok trafik alan sayfası, stüdyo hikâyesine (about) ve düşünce içeriğine (blog) tek bir derin link bile vermiyor. İşe alımcı/meslektaş personası ana sayfadan ekip ya da yazı bulmak için header'ı aramak zorunda. Ayrıca ana sayfa bölüm id'leri (#services, #work, #contact) hiçbir yerden hedeflenmiyor ve `#services` /services ile ad çakışıyor.

**Neden önemli.** Ana sayfa iç link dağıtımının merkezi; About ve Blog'a link vermemesi hem bu sayfaların otoritesini hem de personaların keşif yolunu kısar.

**Ne yapılmalı.** (1) VALIDATION bölümünün eyebrow sağ ucuna ya da lead altına 'HOW WE WORK → /about' linki. (2) SELECTED WORKS ile START PROJECT arasına 'JOURNAL' rayı: son 2 yazı (blog kart bileşenini yeniden kullan) + 'ALL NOTES → /blog'. (3) id'leri `#proof`, `#capabilities`, `#work`, `#start` olarak yeniden adlandır; sadece gerçekten link verilenleri tut.

#### `gap-journey-link-graph-19` — Mobil menü yalnızca 5 nav maddesi + dil: e-posta, sosyal, canlı ürün ve ofis bilgisi yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:42-46 (drawer içeriği). Screenshots: nav-open-mobile.png (alt yarı boş)

**Sorun.** 390px'te drawer'ın alt yarısı boş; ziyaretçi menüyü açtığında iletişim ya da sosyal linke ulaşamıyor, footer'a kaydırmak zorunda. Her nav maddesi ↗ taşıyor (bkz. 07).

**Neden önemli.** Mobilde menü overlay'i sitenin 'ikinci footer'ıdır; Awwwards stüdyo sitelerinde drawer'ın alt bandı e-posta + sosyal + ofis saatleri taşır. Boş kalan yarı, tasarlanmamış bir alan izlenimi verir.

**Ne yapılmalı.** Drawer'ın altına `mt-auto` ile küçük bir blok: `hello@alaz.pro` (mailto), SOCIAL_PROFILES (ExternalLink), 'MARKET HOURS · LIVE ↗' ve iki ofis adı (ContactInfo'nun kompakt hali). Nav maddelerindeki ArrowUpRight'ı kaldır; dil satırı mevcut haliyle kalsın.

> **Doğrulayıcı notu:** Header.jsx:42-46: drawer içeriği 4 nav + CTA + dil, başka hiçbir şey yok. Ölçüm (390×844, /start-project): son öğenin altı y=634, drawer altı y=843 → ~210px boş, yani 'alt yarı' değil alt çeyrek; ama alan tasarlanmamış duruyor (sk-journey/drawer-start-project-mobile.png). Ek: drawer açıkken header'daki 'START A PROJECT' butonu görünür kalıyor, aynı ekranda 05. madde ile iki kez aynı CTA. Dil satırının index glifi '↗' (Header.jsx:45). Fix (mt-auto alt blok: mailto + sosyal + LIVE + ofisler) doğru; ek olarak drawer açıkken header CTA'yı gizle ya da 05. maddeyi kaldır.

#### `gap-journey-link-graph-20` — Form gönderim sonrası ekran tek çıkışlı ('RETURN TO HOME'): sıcak lead'e yapacak bir şey verilmiyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:99-105 (complete state: tek Link href='/'); messages/en.json intake.completeCta. Screenshots: kb-intake-complete.png

**Sorun.** Formu bitiren kişi 'Request received' + 'Return to home' görüyor; stüdyonun işlerine, nasıl çalıştığına ya da bir sonraki adımın ne zaman geleceğine dair hiçbir yönlendirme yok.

**Neden önemli.** Dönüşümün hemen ardındaki an, güveni pekiştirmek için en değerli an; boşa harcanıyor. Sayfa ayrıca sitenin tek 'teşekkür' ekranı olduğu için jüri gözünden de kaçmaz.

**Ne yapılmalı.** Complete ekranına: 'WHAT HAPPENS NEXT' 3 satırlık mono liste (reply within 2 business days vb. — gerçek süreyi yazın), 'WHILE YOU WAIT' RelatedRail (2 vaka + son yazı), 'ADD hello@alaz.pro TO YOUR CONTACTS' mailto. Birincil düğme 'SEE THE WORK → /case-studies', ikincil 'HOME'.

#### `gap-journey-link-graph-21` — Testimonial'lar (VALIDATION) işe bağlı değil: hiçbiri bir vaka sayfasına link vermiyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:80-89 (article: link yok); messages/en.json testimonials[] (project alanı yok). Screenshots: home-desktop-full.png

**Sorun.** Üç alıntı hangi projeden geldiğini söylemiyor ve bir vakaya bağlanmıyor; 'External signal' olarak sunulan kanıt doğrulanabilir bir hedefe gitmiyor. (Alıntıların gerçekliği/copy tonu bu boyutun dışı; burada yapısal boşluk raporlanıyor.)

**Neden önemli.** Doğrulanamayan referans, AI-slop şüphesini besler; vakaya bağlı referans ise ana sayfa → vaka arasında ek bir yol açar.

**Ne yapılmalı.** Her testimonial'a `project: 'market-hours'` ekle ve kartın altına `→ MARKET HOURS` Link'i koy; projeye bağlanamayan alıntıyı yayınlama. Alternatif: alıntıları vaka sayfalarına taşı (outcome bölümünün yanına) ve ana sayfada yalnızca projeye link veren tek bir 'pull quote' bırak.

#### `gap-journey-link-graph-22` — llms.txt elle yazılmış ve siteden kopmuş; nav/sosyal/ürün bilgisi tek kaynaktan üretilmiyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/llms.txt (statik); src/app/sitemap.js (ayrı liste); src/components/Header.jsx:9 ve Footer.jsx:5 (ayrı listeler); src/lib/seo.js:17

**Sorun.** llms.txt sosyal profilleri ve farklı bir sayfa sırasını listeliyor; site ne sosyalleri gösteriyor ne o sırayı kullanıyor. Yeni bir vaka ya da yazı eklendiğinde llms.txt güncellenmez; sitemap, header ve footer da ayrı ayrı elle senkronlanmak zorunda.

**Neden önemli.** Dört ayrı el yazması site haritası zamanla mutlaka ayrışır (şimdiden ayrışmış); link grafiğinin tutarlılığı tek kaynağa bağlı.

**Ne yapılmalı.** `src/app/llms.txt/route.js` (Route Handler, `export const dynamic = 'force-static'`) yaz: NAV, SOCIAL_PROFILES, `en.projects` (slug + summary + link) ve `en.blogPosts` (slug + excerpt) üzerinden metni üret; `public/llms.txt`'yi sil. Aynı sabitlerden sitemap STATIC_PATHS ve Footer grupları türesin.

> **Doğrulayıcı notu:** public/llms.txt statik, sitemap.js/Header.jsx/Footer.jsx ayrı listeler — doğru. Ek kanıt: llms.txt:12 About'u 'how the studio works and the principles behind it' diye tanıtıyor ama principles bölümü about/page.jsx:63-66'da yorum satırında; yani llms.txt şimdiden sayfayla çelişiyor. Route Handler ile üretme fix'i doğru (force-static + NAV/SOCIAL_PROFILES/projects/blogPosts).

#### `gap-journey-link-graph-missed-2` — Header CTA /start-project sayfasında kendine link veriyor; mobilde drawer açıkken aynı CTA iki kez görünüyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:38 (desktop/mobil header CTA, her sayfada aynı), :44 (drawer 05. madde). Screenshots: shots/nav-open-mobile.png, shots/sk-journey/drawer-start-project-mobile.png

**Sorun.** Probe: /start-project'te header CTA href=/start-project ve görünür — formun üstünde formun kendisine giden beyaz düğme. 390px'te menü açıkken header'daki 'START A PROJECT' butonu gizlenmiyor; drawer'ın 05. maddesi de 'START A PROJECT' → tek viewport'ta iki özdeş CTA (drawer-start-project-mobile.png'de ikisi de görünüyor).

**Neden önemli.** Kendine link veren birincil CTA ve aynı ekranda çift CTA, header'ın sayfa bağlamından habersiz tek bir şablon olduğunu gösterir; jüri düzeyinde 'hangi düğme ne için' sorusu doğurur.

**Ne yapılmalı.** Header'da `const onIntake = pathname === '/start-project'`; o sayfada CTA'yı `mailto:hello@alaz.pro` ('EMAIL US') ile değiştir ya da aria-current="page" + bg-[#d5d5d5] pasif stile al. Mobilde `open` iken header CTA'ya `invisible` ver (drawer 05. madde kalsın) ya da drawer'dan 05'i çıkarıp header butonunu bırak; ikisinden biri.

#### `gap-journey-link-graph-missed-3` — Blog yazar kutusu stüdyoya ('kim bunlar?') hiçbir yol vermiyor: isim link değil, /about yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:108-119 ('A.' avatar, post.author.name 'The ALAZ Team', authorIntro + mailto). Screenshot: shots/blogpost-d-author-next.png

**Sorun.** Yazının sonunda yazar bloğu 'The ALAZ Team // ENGINEERING STUDIO' + 'Reach us at hello@alaz.pro' ile bitiyor; yazar adı Link değil, About'a, Work'e ya da sosyal profile giden bir şey yok. Meslektaş/işe alımcı personası yazıdan ekibe ulaşmak için header'a dönmek zorunda (journey-linkmap: blog-post main'inde /about yok).

**Neden önemli.** Yazar bloğu bir yazının stüdyoya açılan doğal kapısıdır; mailto ile bitmesi yazıyı izole bir landing'e çevirir ve 12/13 numaralı bulgulardaki boşluğu en ucuz kapatacak yer burası.

**Ne yapılmalı.** `post.author.name`'i `<Link href="/about">` yap; altına SOCIAL_PROFILES'tan 'GITHUB ↗ / LINKEDIN ↗' (ExternalLink) satırı ekle; 'A.' avatarını /logo.png ile değiştir. 12 ve 13 ile aynı veri kaynağını kullan, yeni stil yok.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Tek kaynaklı site grafiği: src/lib/nav.js

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Studio Freight ve Basement Studio'nun footer + nav + sitemap tutarlılığı; Next.js app router'da Route Handler ile dinamik llms.txt

`NAV` (sıra + priority + labelKey), `FOOTER_GROUPS`, `SOCIAL_PROFILES`, `PRODUCTS` (projects.filter(p => p.link)) tek dosyada. Header (desktop + drawer), Footer, sitemap.js STATIC_PATHS, llms.txt route'u ve StructuredData.sameAs bu dosyadan türesin. Etiketler en.json `seo.*` anahtarlarından gelsin ki nav, crumb ve footer aynı adı kullansın. Bu tek adım, 01/09/10/12/22 bulgularının hepsini kapatır.

### İlişkisel veri + RelatedRail bileşeni (services ↔ projects ↔ posts)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive'in proje sayfası altındaki 'Related projects', Obys'in vaka → hizmet geri bağlantıları

en.json'da `projects[].services`, `projects[].related`, `blogPosts[].services`, `blogPosts[].projects` dizileri; `src/lib/relations.js` içinde `relatedFor({kind, id})` yardımcı fonksiyonu; `RelatedRail` server component kind'a göre kart/chip render eder (vaka → mevcut home kart stili, yazı → mevcut blog kart stili, hizmet → mevcut chip stili). Yerleşim: services article altı ('SEEN IN'), case study markers altı ('SERVICES USED' + 'RELATED NOTE'), blog author kutusu üstü ('RELATED WORK'), about sonu ('SELECTED WORK'). Yeni görsel dil yok; mevcut bileşenlerin tekrar kullanımı.

### Bağlamlı intake: ?type= & ?from= + taslak kalıcılığı

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday ve Resn'in 'Start a project' formlarında hizmet ön seçimi; Next.js 15 useSearchParams + Suspense kalıbı

IntakeForm'u Suspense içinde `useSearchParams()` ile başlat; `types[]`'ı servicesPage.items id'leriyle hizala (5 + 'Not sure yet'); preset tip varsa step 0'da seçili + 'change' linki; `from` ve referrer'ı hidden alan olarak /api/contact'a gönder (route.js'te `source`); form taslağını sessionStorage'da tut (privacy linki, dil değiştirme, geri tuşu güvenli). Tüm CTA'lar `/start-project?type=<serviceId>&from=<page>` üretsin.

### Footer'ı varış noktasına çeviren 'mega footer'

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basement Studio, Studio Freight, Unseen Studio footer'ları (CTA + tam nav + sosyal + canlı projeler)

Üstte `footer.talk` cümlesi büyük puntoda + beyaz /start-project düğmesi + mailto; ortada STUDIO / PRODUCTS (LIVE ↗ markethours.live) / ELSEWHERE (LinkedIn, GitHub) / OFFICES sütunları; altta copyright, Legal/Privacy, TR/EN, Back to top. Büyük ALAZ wordmark korunur ama linklerin üstünde durur. Mobilde sütunlar tek kolona akar, drawer'ın alt bloğu da aynı veriyi gösterir.

### Şablon başına CTA merdiveni: EndCta bileşeni

- **Etki:** yüksek · **Efor:** orta · **Referans:** Lusion ve Active Theory'nin vaka sonu 'next project' + 'let's talk' ikili yapısı

`<EndCta prompt primary secondary rail />`: Work index (START A PROJECT / HOW WE WORK), Case study (START A SIMILAR PROJECT bağlamlı / SERVICES USED + prev-next peek), Services (bağlamlı form / SEE THE WORK), About (form / SELECTED WORK), Blog index (RSS / form), Blog post (RELATED WORK rayı / form). 'END OF INDEX' ve 'MORE FIELD NOTES INCOMING.' satırları kalabilir ama altına merdiven gelir.

### Görünür breadcrumb + prev/next 'peek' navigasyonu

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive'in 'next project' peek'i; Google Search Central breadcrumb kılavuzu (görünür + markup eşleşmesi)

`Crumbs` bileşeni hem `<nav aria-label=Breadcrumb>` hem BreadcrumbJsonLd üretir (tek crumbs dizisi); detay sayfalarında eyebrow'un sol yarısına oturur ('ALAZ / WORK / MARKET HOURS'). Vaka sayfası sonunda prev+next ikilisi, next kartında project.image ile küçük 'peek' thumbnail (mevcut arşiv hover görselini yeniden kullan); blog'da tarih sıralı OLDER/NEWER.

### Canlı ürün rozeti: LiveLink tek kalıp

- **Etki:** orta · **Efor:** küçük · **Referans:** Basement Studio proje kartlarındaki 'Live' etiketleri

`LiveLink({ link })`: mono 'LIVE · MARKETHOURS.LIVE ↗', ExternalLink üzerine kurulu; home kartının meta satırında, arşiv satırının SCOPE sütununda, case hero'da fold içinde, footer PRODUCTS'ta ve mobil drawer'da aynı bileşen. STORE_LINKS dolduğunda App Store / Google Play da aynı satıra eklenir.

### Harici link sözleşmesi: ExternalLink bileşeni

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys ve Unseen Studio'daki tutarlı ok dili; WCAG 'new window' duyurusu

Tek bileşen: target=_blank, rel=noopener noreferrer, ArrowUpRight ikonu, sr-only '(opens in new tab)'. ↗ yalnızca burada; iç linklerde ArrowRight ya da ikon yok; Markdown.jsx'in harici dalı ve blog kaynak listesi bunu kullanır. Böylece ok yönü bir anlam taşır: → iç, ↗ dış, ↓ kaydır.

### Journal rayı + RSS feed

- **Etki:** orta · **Efor:** küçük · **Referans:** Studio Freight ve Hello Monday'in ana sayfa 'journal' rayları

Ana sayfaya SELECTED WORKS ile START PROJECT arasına son 2 yazı (mevcut blog kart bileşeni) + 'ALL NOTES'; `src/app/blog/feed.xml/route.js` ile RSS (blogPosts'tan), blog index ve footer'da 'RSS ↗' linki, `<link rel=alternate type=application/rss+xml>` layout head'inde. Meslektaş/işe alımcı personası için takip yolu açılır.

### 404 mini site haritası

- **Etki:** düşük · **Efor:** küçük · **Referans:** Resn ve Active Theory'nin 'yönlendirici' 404'leri

LegalContent'in not-found dalında NAV'dan 4 hedef + son 2 vaka + son 2 yazı; pathname'e göre basit tahmin ('/work', '/projects' → /case-studies; '/contact' → /start-project). noindex korunur; aynı mono/border-line dilinde, yeni stil yok.
