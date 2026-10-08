# İçerik ve SEO düzenlemeleri — uygulandı

← [Ana rapor](README.md) · Bu dosya, önceki 20 boyutluk eleştirinin **içerik ve SEO** kısmının uygulanmış hâlini ve kalan işleri anlatır. Tasarım/animasyon tarafı (tipografi sistemi, hareket grameri, konsept, WebGL, menü, footer tasarımı) henüz uygulanmadı; sıradaki adım o.

**Kapsam:** İngilizce içerik tamamen yeniden yazıldı; Türkçe dosya yalnızca anahtar yapısı eşit kalsın ve site kırılmasın diye aynı değişiklikleri (yeni blog yazısı dahil) çeviriyle aldı. Her iki dil dosyası anahtar bazında birebir eşit (script ile doğrulandı). Production build alındı, 36 sayfa statik üretildi, lint temiz.

---

## 1. Silinenler (slop katmanı)

| Ne | Nerede | Not |
|---|---|---|
| `POWERED BY GOOGLE / CLAUDE` rozetleri | hero, About | `PoweredBy.jsx` silindi |
| `SYSTEM_ACTIVE` status pill, `001 / 005` sayaçları, `SCROLL TO EXPLORE`, `PRECISION IS THE STANDARD…` | hero | yerine gerçek bilgi satırları (aşağıda) |
| İki buzzword marquee'si (`SYSTEMS THINKING ◻ ENGINEERING WITHOUT COMPROMISE`, `UNCOMPROMISING PRECISION ✳ …`) | ana sayfa | kaldırıldı |
| `VALIDATION` bölümü: baş harfli üç testimonial + ShieldCheck ikonu | ana sayfa | kaldırıldı; `testimonials` anahtarı silindi |
| `COMMAND SEQUENCE READY` rozeti, `START SEQUENCE` butonu, köşe braketleri, yeşil ping | ana sayfa CTA | düz beyaz buton + e-posta |
| `NO BULLSHIT. JUST ACTION.`, `Built with intent. Engineered to last.`, `DESIGNED WITH INTENT / BUILT TO ENDURE` | hero, CTA | |
| `WE ENGINEER PERMANENCE`, `NOT AN AGENCY. AN ENGINEERING PRACTICE.`, `FOUR MOVES ZERO GUESSWORK`, `GOOD SYSTEMS ARE INVISIBLE…`, `MANIFESTO 2026`, `STUDIO / 001` | About | |
| Yorum satırındaki ölü `principles` / `disciplines` bölümleri ve `FIG. 01` görsel anahtarları | About, en.json | numaralandırma artık 01-02-03 |
| `BUILD FOR WHAT'S NEXT.` / `PRECISION AT EVERY LAYER.` / `LESS NOISE. MORE SIGNAL.` (iki projede aynı) | case study | projeye özgü başlıklarla değiştirildi |
| `INDEX / 001`, `ARCHIVE / SELECTED WORK`, `PROJECTS ON FILE`, `END OF INDEX`, `MORE SYSTEMS IN DEVELOPMENT`, `ALAZ / SELECTED WORK`, `SPECIMEN` | work sayfaları | |
| `SECURE TRANSMISSION`, `TRANSMITTING...`, `STATUS: ACCEPTING NEW INQUIRIES`, `33% COMPLETE`, `/ 001`, `ALAZ / 2026`, CirclePower ikonu | intake formu | |
| `FIELD NOTES` sözlüğü (5 yerde), `The ALAZ Team // ENGINEERING STUDIO` | blog | |
| `// ` kod-yorum önekleri | her yerde | |
| Hostinger `media.*` ölü görsel URL'leri, `keywords` meta listeleri | en.json, seo.js | |
| Türkçe gönderilen otomatik cevap e-postası ve `"Bilinçli tasarlandı…"` alıntısı; `ALAZ System` gönderici adı | mailer.js | formun diline göre EN/TR, gönderici "ALAZ" |

## 2. Yeniden yazılanlar ve yer değiştirenler

### Ana sayfa (`src/app/[locale]/page.jsx`)
- **Yeni sıra:** Hero → **Work** (önce kanıt) → Services → **Blog'dan son yazılar** (yeni bölüm) → Start a project. Eski sıra testimonial'ları ve hizmet kartlarını işlerin önüne koyuyordu.
- **H1 artık bir cümle:** "Web apps, mobile apps and the backends behind them." Dev `ALAZ.` wordmark marka olarak kalıyor ama `<p aria-hidden>`; SEO için sayfanın tek h1'i anahtar kelime taşıyor.
- **Hero üst satırı:** "Software studio · İzmir & New York" / "Web · Mobile · Backend". Kicker: "ALAZ — software studio, est. 2026".
- **Rozetlerin yerine olgu satırı:** Vocabulary (link), Market Hours — live at markethours.live (dış link), Replies within one business day (form linki).
- **Alt bant:** "See the work ↓" + tıklanabilir `hello@alaz.pro`.
- **Hizmet kartları artık link:** her kart `/services#<id>` anchor'ına gidiyor (ölü ok affordance'ı giderildi); kart altına `detail` paragrafı eklendi.
- **Proje kartları:** kapak görselinin üstündeki `ALAZ / 01` pill'i kaldırıldı; Market Hours kartında canlı link rozeti; alt metinler artık görseli tarif ediyor (`coverAlt`).
- **CTA bölümü:** sola hizalı başlık + paragraf, sağda buton ve "or write to hello@alaz.pro"; alt bantta "İzmir · New York · English & Turkish".

### Hizmetler (`services/page.jsx`)
- Meta title: "Web, Mobile & Backend Development Services | ALAZ"; h1: "WEB, MOBILE & BACKEND."; kicker ve intro somut.
- Etiketler: `THE PROBLEM & SCOPE / CORE DELIVERABLES / REAL-WORLD OUTCOME / IDEAL FIT` → `The problem / What you get / Stack / What it leads to / A good fit for`. Bu etiketler artık `<h3>` değil `<p>` (25 tekrar eden h3 outline'dan çıktı).
- Her hizmete **"In practice"** satırı (ilgili case study'ye link) ve **"Start a project like this"** linki (`/start-project?type=<id>` ile formu ön-seçili açar).
- Anchor id'leri başlıklarla uyumlu: `web-applications`, `mobile-apps`, `backend-and-integrations`, `cloud-and-devops`, `performance-and-modernization`.
- Süreç bölümü About ile **tek sete** indirildi: Discovery call / Written scope and estimate / Build in short increments / Launch and handover (blog yazısındaki somut cümlelerle).
- FAQ: "Most agencies…" rakip çamurlaması kaldırıldı; **iki yeni SEO sorusu** eklendi: "How much does a web or mobile app cost?" (formdaki bütçe aralıklarıyla) ve "Do you work with clients outside Türkiye?". Başlık "COMMON QUESTIONS" (yalnız kalan "&" sorunu bitti). `zero vendor lock-in / zero data loss` mutlakları yumuşatıldı; belirsiz "Secure LLM…" maddesi somutlaştırıldı.
- Microdata (`itemScope`) kaldırıldı, JSON-LD tek kaynak; breadcrumb adı "Services".

### Hakkında (`about/page.jsx`)
- H1: **"THE WORKING FLAME."** — ismin anlamı, markanın tek gerçek fikri. Kicker: "A software studio, not an agency". Intro: iki şehir, 2026, kendi ürünler.
- Bölümler yeniden numaralandı: **01 The name** (uydurma demirci/çoban cümlesi atıldı, tanım sadeleşti) → **02 Our own products** (yeni: iki ürün kartı, Work'e link) → **03 How we work** (4 adım, Services ile aynı) → kapanış "Have something to build? Tell us about it."
- Footer'ı tekrar eden iletişim bloğu kaldırıldı; Services'e link eklendi.

### Work / case study
- Index: kicker "Products we designed, built and shipped", intro dürüst ("Two products we built and run ourselves…"), satırlara özet paragraf eklendi, hover önizleme büyütüldü ve scope metninin üstüne binmesi giderildi, alt satırda "Have one for us? → Start a project".
- Detay sayfası: hero altına **Project facts** şeridi (Year / Platforms / Stack / Our role / Status, link değerleri tıklanabilir); bölüm eyebrow'ları gerçek `<h2>` ("The problem / The build / What shipped"), slogan başlıklar artık projeye özgü (`headings` verisi): Vocabulary "MAKE IT STICK." / "ONE CODEBASE, TWO STORES." / "8,000 WORDS, 24 LANGUAGES."; Market Hours "WHAT'S OPEN RIGHT NOW?" / "THE RULES, BUILT TWICE." / "NINE EXCHANGES, LIVE.".
- `DELIVERABLE` → `HIGHLIGHT`; galeri "App screens", her ekranın kendi alt metni (`galleryAlts`); "What we did here → See the services" satırı; CTA `/start-project?from=<slug>`.
- Boş `COMING SOON` mağaza butonları link gelene kadar **gizli** (`src/lib/stores.js` dolunca otomatik görünür).
- Yanlış slug artık gerçek **404** (`notFound()` + `dynamicParams=false`).

### Blog
- Index: "BLOG." tek satır, "{count} posts", intro ve notlar yeniden yazıldı, lucide Clock ikonu kaldırıldı.
- Yazı sayfası: `<article>` + `<header>` + `<footer>` semantiği; tekrar eden tarih satırı kaldırıldı; yazar kutusu "The ALAZ team / Web, mobile and backend engineering" + About linki; "Next post" tarih sırasına göre; başlıklara `id` (deep link); `mailto:` linkleri; `*italic*` yıldız hatası giderildi.
- **Yeni yazı:** "How Long Does It Take to Build a Web or Mobile App?" (EN + TR, ~900 kelime, FAQ'daki sürelerle tutarlı, uydurma istatistik yok). Ana sayfadaki "From the blog" bölümünde ve llms.txt'de yer alıyor.

### Start a project (intake)
- Kopya: "Three short steps, about two minutes", adımlar "Project type / The brief / Your details", "What's the problem?", "How do we reach you?", "Send the brief", "Sending…", başarı ekranı "Thanks, got it." + iki CTA (See the work / Back to home) + "If it is urgent, write to hello@alaz.pro".
- Tür seçenekleri 5 hizmete hizalandı; 4. seçenek "Rescue, audit or something else".
- `?type=` parametresiyle ön-seçim (Services'ten gelen linkler).
- **Hata düzeltmeleri:** son adımın kullanıcı dokunmadan hata göstermesi (aynı button düğümünün type değiştirmesi) giderildi; API artık DB **ve** e-posta ikisi de başarısızsa 503 dönüyor (sessiz lead kaybı yok); alanlar 16px (iOS zoom yok); privacy linki yeni sekmede açılıyor (form sıfırlanmıyor).

### Header / footer / 404 / legal
- Nav sırası: Services · Work · About · Blog; alt rotalarda aktif durum (`aria-current`).
- Footer bir varış noktası oldu: "Have something to build?" + CTA, e-posta, tüm sayfalar, ürünler (markethours.live linki), ofisler, legal.
- 404: insan dili + dört büyük link (Services / Work / Blog / Start a project); `follow: true`.
- Legal/privacy: meta açıklamaları yazıldı, başlık ölçeği küçültüldü, gövde 16px.

## 3. SEO: yapılanlar

| Madde | Durum |
|---|---|
| **Statik render** — `setRequestLocale` layout + tüm sayfalar; build çıktısında 36 sayfa SSG, `Cache-Control: s-maxage` | ✅ |
| **Title şablonu** — `%s \| ALAZ`, ana sayfa `absolute`; 6 farklı marka eki tek biçime indi | ✅ |
| **Meta description** uzunlukları 120–160 (EN tümü; TR çoğu) | ✅ |
| **Dinamik OG görseli** — `/og?title=…&eyebrow=…` route'u (`src/app/og/route.jsx`, Archivo Black ile 1200×630); her sayfa kendi kartını alıyor, case study'ler ürün kapağını, blog yazıları kapağını | ✅ |
| `twitter:image:alt`, `og:type=article` (case study ve blog), `article:published_time/modified_time/section/tag`, `authors` URL | ✅ |
| **Soft-404 giderildi** — bilinmeyen `/blog/x`, `/case-studies/x` → gerçek 404 | ✅ |
| **/en → / 308** kalıcı yönlendirme; `Accept-Language` otomatik yönlendirmesi kapatıldı (`localeDetection: false`); hreflang HTML'de | ✅ |
| **Başlık hiyerarşisi** — ana sayfa h1 anahtar kelimeli cümle; services etiket h3'leri kaldırıldı; case study eyebrow'ları h2; FAQ summary içinde heading yok | ✅ |
| **Schema** — ürünler `MobileApplication` / `WebApplication` (kategori, OS, ekran görüntüleri, fiyat, installUrl mağaza linki gelince otomatik); BlogPosting'e `wordCount`, `timeRequired`, `articleSection`, `@id`; Organization'a slogan/ürün açıklaması; `contactType: customer service`; FAQ JSON-LD yeni sorularla | ✅ |
| Breadcrumb adları nav etiketlerinden ("Services", "Work"), case study adı Title Case | ✅ |
| **Alt metinler** — her proje kapağı, hero ve galeri görseli için tarif edici alt; blog kapakları için `coverAlt` | ✅ |
| **İç bağlantı grafiği** — footer nav, home→blog yazıları, services↔case studies, case study→services, about→work/services, 404 linkleri, blog yazar kutusu→about | ✅ |
| `keywords` meta kaldırıldı; `icons` çakışması giderildi; `X-Powered-By` kapalı; `/videos`, `/projects` için 1 yıl immutable cache | ✅ |
| Manifest adı/açıklaması güncel konumlandırma; `display: browser` (install diyaloğu yok); maskable ikon | ✅ |
| `llms.txt` — ürünler, yazılar, legal, doğrulanmamış sosyal linkler çıkarıldı | ✅ |
| Blog başlıklarında `id` (derin link) | ✅ |
| Sitemap yeni yazıyı otomatik alıyor (lastmod ile) | ✅ |

## 4. SEO: sizin kararınızı / verinizi bekleyenler

1. **Mağaza linkleri** — `src/lib/stores.js` içine App Store / Google Play URL'leri girince butonlar ve `installUrl` şeması otomatik açılır.
2. **Sosyal profiller** — `src/lib/seo.js` → `SOCIAL_PROFILES`. llms.txt'deki LinkedIn/GitHub adresleri bu ortamdan doğrulanamadığı için kaldırıldı; gerçek adresleri ekleyin, Organization `sameAs` otomatik dolar.
3. **İsimler** — site hâlâ isimsiz. About'a "who" bloğu ve blog yazılarına gerçek byline için kişi adları/rolleri gerekir (`Person` şeması buna bağlı).
4. **Blog kapakları** hâlâ `images.hostinger.com`'da. Üç yazı için kendi görselleriniz gelince `blogPosts[].cover` yerel `/blog/…` path'ine çevrilmeli (OG ve LCP için).
5. **Ofis adresleri** — footer, About ve Organization şemasında aynı iki adres duruyor; gerçek kullanım şeklini doğrulayın (bkz. README 4B-15).
6. **Search Console / Bing / Yandex** doğrulama token'ları ve sitemap gönderimi (`SEO_AUDIT_VE_EKSIKLER_REHBERI.md`'deki açık maddeler aynen geçerli).
7. **Vocabulary'nin durumu** — "Store release in preparation" yazıldı; yayınlanınca `facts` ve `summary` güncellenmeli.

## 5. Sonraki adım: tasarım uygulaması

İçerik ve SEO temeli artık yerinde; tasarım fazı README bölüm 5–6'daki sırayla uygulanacak: token'lanmış tip sistemi ve 12 kolon grid, hareket grameri (GSAP + Lenis, satır-maske reveal'lar, View Transitions, nprogress'in kaldırılması), tam ekran menü, footer "cooling" sahnesi, stok videoların yerine markaya ait görsel sistem, mobil art direction, system.css ve erişilebilirlik düzeltmeleri. Bu fazda metinlere yeniden dokunulmayacak; başlıkların büyük/küçük harf kararı CSS'te verilecek.
