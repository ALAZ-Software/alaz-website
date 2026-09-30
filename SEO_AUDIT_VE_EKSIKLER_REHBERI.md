# ALAZ.PRO — Kapsamlı SEO Denetimi, Eksikler ve Doğrulama Rehberi

Bu belge, **alaz.pro** projesindeki mevcut SEO altyapısının tüm yönleriyle (Teknik SEO, Sayfa İçi SEO, Yapılandırılmış Veriler, Semantik Hiyerarşi, Çok Dillilik, Core Web Vitals ve Yapay Zeka Arama Motoru Optimizasyonu - GEO) incelenmesi sonucunda tespit edilen **tüm eksikleri, hataları ve hemen doğrulamanız gereken bilgileri** içerir.

---

## 📌 Hızlı Durum Özeti & Öncelik Matrisi

| Kategori | Durum | Aciliyet | Etki Alanı |
| :--- | :--- | :--- | :--- |
| **Arama Motoru Doğrulamaları** | 🔴 Eksik (.env'de yok) | **Acil (Hemen)** | Google, Bing, Yandex dizinleme yetkisi |
| **Favicon & Web App Manifest** | 🔴 Eksik (.ico ve manifest yok) | **Yüksek** | Tarayıcı 404'leri, Mobil SERP, PWA |
| **Schema.org (JSON-LD)** | 🟡 Kısmi (Vaka & Blog detay eksik) | **Yüksek** | Google Rich Snippets & Knowledge Graph |
| **Sayfa İçi Hiyerarşi (H1-H3)** | 🟡 Hatalı (Blog index h2 atlamış) | **Yüksek** | Sayfa içi anlamsal skor, Erişilebilirlik |
| **İç Linkleme (Header/Footer Bug)** | 🔴 Hatalı (Dil & Başa dön ana sayfaya atıyor) | **Yüksek** | Bot crawl derinliği & Kullanıcı deneyimi |
| **Sitemap & Robots.txt** | 🟡 Kısmi (Changefreq & AI botları yok) | **Orta** | Tarama bütçesi (Crawl Budget) & GEO |
| **Görsel & Medya SEO** | 🟡 Kısmi (Boş alt tag & Video poster yok) | **Orta** | Google Görseller & LCP Performansı |
| **Next.js & Performans Başlıkları**| 🟡 İyileştirilmeli (AVIF & Security headers) | **Orta** | Core Web Vitals (CWV) & Teknik Güven |

---

## 1. HEMEN DOĞRULAMANIZ GEREKEN BİLGİLER (.env)

`src/app/[locale]/layout.jsx` dosyasında arama motoru doğrulama kodları tanımlanmış ancak kök dizindeki `.env` ve `.env.local` dosyalarında bu anahtarlar **bulunmamaktadır**. Canlıya çıkıldığında arama motorları sitenin mülkiyetini doğrulayamaz.

### 📋 Yapılacak Doğrulama ve Tanımlamalar:

`.env` ve `.env.local` dosyanıza şu 3 satırı ekleyip ilgili araçlardan aldığınız token'ları yazınız:

```bash
# 1. Google Search Console: https://search.google.com/search-console
# Mülk ekle -> HTML Etiketi seçeneği -> content="..." içerisindeki token
GOOGLE_SITE_VERIFICATION="ornek_google_verification_token_buraya"

# 2. Bing Webmaster Tools: https://www.bing.com/webmasters
# Site ekle -> Meta etiketi (msvalidate.01) -> content="..." içerisindeki token
BING_SITE_VERIFICATION="ornek_bing_verification_token_buraya"

# 3. Yandex Webmaster: https://webmaster.yandex.com
# Site ekle -> Meta tag -> content="..." içerisindeki token
YANDEX_VERIFICATION="ornek_yandex_verification_token_buraya"
```

> **Nasıl Doğrulanır?**
> Değerleri girdikten sonra projeyi derleyip yayına aldığınızda sayfa kaynak kodunda `<meta name="google-site-verification" content="...">` etiketinin belirdiğini kontrol ediniz ve Search Console panelinden "Doğrula" butonuna basınız.

---

## 2. EKSİK STATİK VARLIKLAR VE DOSYALAR (Assets)

### 2.1. `favicon.ico` Eksikliği
- **Mevcut Durum:** Projede `src/app/icon.svg` ve `public/apple-touch-icon.png` var, ancak geleneksel `favicon.ico` **yoktur**.
- **SEO Etkisi:** Tüm modern tarayıcılar ve arama motoru botları (özellikle eski botlar veya doğrudan URL çağıran servisler) sitenizi ziyaret ettiğinde ilk olarak kök dizindeki `https://alaz.pro/favicon.ico` adresini sorgular. Bu istek şu an `404 Not Found` dönerek sunucuda gereksiz hata kaydı üretir ve SERP ikon önbelleğini geciktirebilir.
- **Çözüm:** 32x32 veya 48x48 boyutunda bir `favicon.ico` oluşturulup `src/app/favicon.ico` veya `public/favicon.ico` içerisine eklenmelidir.

### 2.2. Web App Manifest (`manifest.webmanifest`) Eksikliği
- **Mevcut Durum:** Projede bir PWA/Web manifest dosyası tanımlı değildir.
- **SEO Etkisi:** Google Chrome ve mobil tarayıcılar zengin arama sonuçlarında, ana ekrana ekleme istemlerinde ve mobil indeksleme sinyallerinde web manifest dosyasını kullanır.
- **Çözüm:** `src/app/manifest.js` dosyası oluşturulmalıdır:

```javascript
// src/app/manifest.js
export default function manifest() {
  return {
    name: 'ALAZ — Software Architecture & Engineering Studio',
    short_name: 'ALAZ',
    description: 'Resilient software architecture, native performance, and connected digital ecosystems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
```

### 2.3. Video Poster Görselleri (`poster` attribute)
- **Mevcut Durum:** `src/app/[locale]/page.jsx`, `about/page.jsx`, `services/page.jsx` ve `case-studies/page.jsx` içindeki `<video>` etiketlerinde `poster` özelliği bulunmamaktadır.
- **SEO / Core Web Vitals Etkisi:** Video yüklenirken ekranda boş/siyah alan kalır ve bu durum **Largest Contentful Paint (LCP)** skorunu doğrudan düşürür. Google mobil tarayıcı botları video dosyasını hemen oynatmadığı için LCP elemanı gecikir.
- **Çözüm:** Her video için hafif WebP formatında bir önizleme karesi (`poster="/videos/dark-planet-poster.webp"`) eklenmelidir.

---

## 3. YAPILANDIRILMIŞ VERİ & SCHEMA.ORG (JSON-LD) EKSİKLERİ

Google ve diğer arama motorlarının zengin kartlar (Rich Results) göstermesi için JSON-LD şemaları kullanılır. Projedeki schema durumu:

### 3.1. Vaka Çalışmaları Detay Sayfası (`case-studies/[slug]/page.jsx`)
- 🔴 **Eksik:** Bu sayfada **hiçbir JSON-LD şeması yoktur**.
- 🛠️ **Gereken Şemalar:**
  1. `BreadcrumbList`: `Ana Sayfa > Vaka Çalışmaları > {Proje Adı}`
  2. `CreativeWork` veya `TechArticle` / `SoftwareApplication`: Projenin adı, açıklaması, ekran görüntüsü ve ALAZ tarafından yapıldığı bilgisi.

```javascript
// Eklenecek Schema Örneği:
const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: project.name,
  description: project.summary,
  image: project.image,
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  url: urlFor(locale, `/case-studies/${project.slug}`),
  inLanguage: locale,
};
```

### 3.2. Blog Detay Sayfası (`blog/[slug]/page.jsx`)
- 🟡 **Mevcut Durum:** `BlogPosting` şeması var fakat:
  1. `BreadcrumbList` şeması eksik.
  2. `publisher.logo` eksik (Google Rich Results için publisher içinde logo nesnesi beklenir).
  3. `JsonLd` bileşeni kullanılmamış, standart `<script>` etiketi ile serialize edilmemiş olarak basılıyor (özel karakterlerde kırılma riski).
  4. Yazar `author` şemasında URL ve profil eksik.

### 3.3. BreadcrumbList (Ekmek Kırıntısı) Eksik Olan Sayfalar
Google arama sonuçlarında URL yerine `alaz.pro > Hizmetler > Bulut Mimarisi` gibi hiyerarşik yapı görünmesi için `BreadcrumbList` gereklidir.
- ✅ Bulunan sayfa: Yalnızca `/services`
- 🔴 **Eksik Sayfalar:**
  - `/about`
  - `/case-studies`
  - `/case-studies/[slug]`
  - `/blog`
  - `/blog/[slug]`
  - `/start-project`

### 3.4. Ana Kurum Şeması (`src/components/StructuredData.jsx`) Zenginleştirme
Mevcut `Organization` şemasına eklenmesi gereken kritik varlık sinyalleri:
- `knowsAbout`: `["Software Architecture", "High-Performance Web Engineering", "Full-Stack Development", "Cloud Infrastructure", "Next.js", "System Design"]` (Google'ın siteyi teknoloji stüdyosu olarak konumlandırması için şarttır).
- `foundingDate`: Şirket kuruluş yılı.
- `address`: Ülke/Şehir sinyali (`PostalAddress`).

---

## 4. SAYFA İÇİ (ON-PAGE) & SEMANTİK HİYERARŞİ HATALARI

### 4.1. Blog İndeks Sayfasında Hiyerarşi Hatası (`src/app/[locale]/blog/page.jsx`)
- **Hata:** Sayfa `<h1>` ile başlıyor, ardından doğrudan makale başlıklarında `<h3>` kullanılıyor. Sayfada **hiç `<h2>` etiketi yoktur**!
- **SEO Kuralı:** Başlık seviyeleri atlanamaz (`H1 -> H2 -> H3` olmalıdır). Atlanan başlıklar arama motoru anlamsal ağaç analizinde ve erişilebilirlik (WCAG) testlerinde eksi puan alır.
- **Düzeltme:** Makale kartlarındaki `<h3>` başlıkları `<h2>` yapılmalı veya liste bölümüne bir `h2` ("Tüm Makaleler / All Articles") eklenmelidir.

### 4.2. Kırık Çapa Linki (Broken In-Page Anchor) (`src/app/[locale]/page.jsx`)
- **Hata:** Hero alanında satır 49'da bulunan `<a href="#validation">` butonu, satır 71'deki `<section id=" validation">` alanına referans veriyor.
- **Neden Bozuk?** `id` değerinin başında yanlışlıkla bir **boşluk karakteri** (`id=" validation"`) bulunmaktadır! Bu yüzden tarayıcı bağlantıyı eşleştiremez.

### 4.3. Boş Görsel Alt Etiketi (`src/app/[locale]/case-studies/page.jsx`)
- **Hata:** Satır 41'deki hover önizleme görselinde `alt=""` boş bırakılmıştır:
  ```jsx
  <Image src={project.image} alt="" fill sizes="220px" ... />
  ```
- **SEO Kuralı:** Dekoratif olmayan, içeriğe ait görseller boş bırakılamaz. `alt={`${project.name} preview`}` şeklinde doldurulmalıdır.

### 4.4. Semantik Tarih Etiketi (`src/app/[locale]/blog/[slug]/page.jsx`)
- **Hata:** Makale yayın tarihi düz `<p>` etiketi içinde metin olarak yazılıyor.
- **Düzeltme:** Arama motorlarının makalenin güncelliğini kesin olarak parse edebilmesi için `<time dateTime={post.date}>{post.dateLabel}</time>` etiketi kullanılmalıdır.

### 4.5. Sayfa Meta Verilerinde `keywords` Tanımları
- `services/page.jsx` haricinde hiçbir sayfada (`page.jsx`, `about/page.jsx`, `case-studies/page.jsx`, `blog/page.jsx`, `start-project/page.jsx`) `buildMetadata` fonksiyonuna `keywords` parametresi geçilmemiştir.
- Yandex, Bing ve sektör içi dizinler için meta keywords alanının doldurulması önerilir.

---

## 5. DAHİLİ BAĞLANTI (INTERNAL LINKING) VE UX/SEO HATALARI

Dahili bağlantılar, arama motoru örümceklerinin sitenizdeki sayfaları keşfetmesi ve "Link Juice" (bağlantı gücü) aktarımı için en kritik faktördür.

### 5.1. Header Dil Değiştirici Hatası (`src/components/Header.jsx`)
- **Hata:** Satır 37'de bulunan dil değiştirme linki:
  ```jsx
  <Link href="/" locale={otherLocale} ...>{otherLocale.toUpperCase()}</Link>
  ```
- **Sonuç:** Kullanıcı veya arama motoru `/about` veya `/blog/cost-of-a-slow-website` sayfasındayken TR/EN butonuna tıkladığında o sayfanın çevirisine gitmek yerine **ana sayfaya (`/`) fırlatılmaktadır**.
- **Düzeltme:** `href={pathname}` kullanılarak mevcut bulunulan sayfanın diğer dildeki karşılığına yönlendirilmelidir.

### 5.2. Footer "Başa Dön" Linki (`src/components/Footer.jsx`)
- **Hata:** Satır 29'da `{t('backTop')}` (Başa dön) linki `href="/"` olarak verilmiş.
- **Sonuç:** Kullanıcı uzun bir makale veya vaka çalışmasını okuyup sayfanın altındaki "Başa Dön" butonuna tıkladığında mevcut sayfada yukarı çıkmak yerine ana sayfaya gitmektedir.
- **Düzeltme:** `href="#top"` veya `href="#hero-title"` yapılmalıdır.

---

## 6. TEKNİK SEO, SITEMAP & ROBOTS.TXT İYİLEŞTİRMELERİ

### 6.1. `src/app/sitemap.js` İyileştirmeleri
1. **`changeFrequency` Parametresi:**
   Şu an hiçbir rotada `changeFrequency` (`daily`, `weekly`, `monthly`) tanımlı değildir.
   - Ana sayfa, Blog, Vaka Çalışmaları: `'weekly'`
   - Servisler, Hakkımızda: `'monthly'`
   - Legal, Gizlilik: `'yearly'`
2. **Statik Sayfalarda `lastModified` Eksikliği:**
   Statik sayfalar için `lastModified` belirtilmediğinde Google botu içeriğin ne zaman güncellendiğini kestiremez. Sürüm yayınlama tarihi veya gerçek tarih bağlanmalıdır.
3. **Görsel Sitemap (Image Sitemap):**
   Blog yazıları ve vaka çalışmaları için `images: [post.cover]` veya `images: [project.image]` bilgisi sitemap nesnesine eklenebilir.

### 6.2. `src/app/robots.js` & Yapay Zeka Botları (GEO)
Şu anda `robots.js` dosyasında Googlebot, Bingbot, YandexBot vb. tanımlı. Ancak modern yapay zeka arama motorları için yönergeler netleştirilmelidir:
- `GPTBot` (OpenAI / SearchGPT)
- `ClaudeBot` (Anthropic)
- `PerplexityBot` (Perplexity AI)
- `Google-Extended` (Google Gemini AI eğitim botu)

Bu botların sitenizi tarayabilmesi ve yapay zeka aramalarında ALAZ'ı kaynak gösterebilmesi için erişimlerine izin verildiğinden emin olunmalıdır.

### 6.3. `llms.txt` Standardı (Yeni Nesil SEO)
2025/2026 yılı itibariyle yapay zeka arama motorları için sitenin kök dizininde `/llms.txt` dosyası bulundurmak GEO (Generative Engine Optimization) için en etkili tekniktir. Sitenin ne yaptığını, servislerini ve felsefesini özetleyen bir `public/llms.txt` eklenmelidir.

---

## 7. CORE WEB VITALS & NEXT.JS PERFORMANS AYARLARI

Google sıralama algoritmasında Core Web Vitals (LCP, INP, CLS) doğrudan bir sıralama faktörüdür.

### 7.1. `next.config.js` Görsel Formatları
`next.config.js` dosyasına modern sıkıştırma formatları eklenmelidir:
```javascript
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF desteği LCP'yi %20-30 hızlandırır
    remotePatterns: [
      { protocol: 'https', hostname: 'images.hostinger.com' },
      { protocol: 'https', hostname: 'horizons-cdn.hostinger.com' },
    ],
  },
};
```

### 7.2. Harici CDN için `dns-prefetch` ve `preconnect`
Projedeki vaka çalışması ve blog görselleri `images.hostinger.com` üzerinden çekilmektedir. DNS çözümleme ve SSL el sıkışma süresini kaldırmak için `src/app/[locale]/layout.jsx` içine şu etiketler eklenmelidir:
```html
<link rel="preconnect" href="https://images.hostinger.com" />
<link rel="dns-prefetch" href="https://images.hostinger.com" />
```

### 7.3. Güvenlik ve Tarama HTTP Başlıkları (Security Headers)
Arama motorları güvenli ve standart HTTP başlıklarına sahip siteleri daha güvenilir kabul eder:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

---

## 8. ADIM ADIM DOĞRULAMA KONTROL LİSTESİ (CHECKLIST)

Aşağıdaki adımları sırasıyla uygulayarak projenin SEO doğrulamasını hemen tamamlayabilirsiniz:

- [ ] **1. Doğrulama Kodları:** `.env` ve `.env.local` dosyalarına `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` değerlerini ekleyin.
- [ ] **2. Favicon:** `public/favicon.ico` dosyasını oluşturun veya ekleyin.
- [ ] **3. Web Manifest:** `src/app/manifest.js` dosyasını oluşturun.
- [ ] **4. Header Linki:** `src/components/Header.jsx` içindeki dil değiştirici linkinin `href="/" ` yerine `href={pathname}` olmasını sağlayın.
- [ ] **5. Footer Başa Dön Linki:** `src/components/Footer.jsx` içindeki `backTop` linkini `href="#top"` yapın.
- [ ] **6. Sayfa İçi Çapa:** `src/app/[locale]/page.jsx` satır 71'deki `id=" validation"` başındaki boşluğu silin (`id="validation"`).
- [ ] **7. Blog Hiyerarşisi:** `src/app/[locale]/blog/page.jsx` içindeki post başlıklarını `<h2>` yapın.
- [ ] **8. Görsel Alt Etiketi:** `src/app/[locale]/case-studies/page.jsx` satır 41'deki boş `alt=""` değerini doldurun.
- [ ] **9. Vaka Çalışması Şeması:** `src/app/[locale]/case-studies/[slug]/page.jsx` içine `BreadcrumbJsonLd` ve `TechArticle` şeması ekleyin.
- [ ] **10. Blog Şeması İyileştirmesi:** `src/app/[locale]/blog/[slug]/page.jsx` içine `BreadcrumbJsonLd` ekleyin ve şemayı `JsonLd` bileşeniyle bağlayın.
- [ ] **11. Next.js Görseller:** `next.config.js` içerisine `formats: ['image/avif', 'image/webp']` ekleyin.
- [ ] **12. Rich Results Test:** Google Zengin Sonuçlar Testi (https://search.google.com/test/rich-results) üzerinden ana sayfa, `/services`, `/blog/[slug]` ve `/case-studies/[slug]` sayfalarını test edin.
