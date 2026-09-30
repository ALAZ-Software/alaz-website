# ALAZ.PRO: Kalan SEO İşleri

Denetimde çıkan maddelerin kodla çözülebilenleri tamamlandı. Aşağıdakiler hâlâ açık.

## 1. Arama motoru doğrulamaları

- [x] Google Search Console (`GOOGLE_SITE_VERIFICATION`)
- [ ] Bing Webmaster Tools: `.env` ve `.env.local` içine `BING_SITE_VERIFICATION` (meta `msvalidate.01` içindeki token)
- [ ] Yandex Webmaster: `YANDEX_VERIFICATION` (meta tag içindeki token)
- [ ] Hosting ortamındaki env değişkenlerine de aynı değerlerin girildiğinden emin ol, sonra yeniden build al.

## 2. Search Console sonrası

- [ ] `https://alaz.pro/sitemap.xml` adresini Sitemaps bölümünden gönder.
- [ ] Ana sayfa, `/tr`, `/services`, bir blog yazısı ve bir vaka sayfası için "URL inceleme" ile dizinleme iste.

## 3. Organization şeması için bilgi

`src/components/StructuredData.jsx` içine eklenecek, bende olmayan bilgiler:

- [ ] Kuruluş yılı (`foundingDate`)
- [ ] Şehir ve ülke (`address`)

## 4. Yayından sonra test

- [ ] Google Rich Results Test (https://search.google.com/test/rich-results): ana sayfa, `/services`, bir `/blog/[slug]` ve bir `/case-studies/[slug]`
- [ ] Sayfa kaynağında `google-site-verification` etiketinin göründüğünü kontrol et.
- [ ] PageSpeed Insights ile mobil LCP'yi ölç.
