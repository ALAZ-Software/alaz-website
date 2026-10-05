# ALAZ.PRO: Kalan SEO İşleri

Denetimde çıkan maddelerin kodla çözülebilenleri tamamlandı. Aşağıdakiler hâlâ açık.

## 1. Arama motoru doğrulamaları

- [x] Google Search Console (`GOOGLE_SITE_VERIFICATION`)
- [ ] Bing Webmaster Tools: `.env` ve `.env.local` içine `BING_SITE_VERIFICATION` (meta `msvalidate.01` içindeki token)
- [ ] Yandex Webmaster: `YANDEX_VERIFICATION` (meta tag içindeki token)
- [ ] Hosting ortamındaki env değişkenlerine de aynı değerlerin girildiğinden emin ol, sonra yeniden build al.

## 2. Search Console sonrası

- [ ] Mülkü **Alan adı (Domain) mülkü** olarak ekle (DNS TXT ile). URL önekli mülk `https://www.alaz.pro/` veya `http://` ise sitemap'teki `https://alaz.pro/...` adresleri "mülk dışı" sayılır.
- [ ] `https://alaz.pro/sitemap.xml` adresini Sitemaps bölümünden gönder. "Getirilemedi" görünürse önce URL İnceleme'de sitemap adresini "Canlı URL'yi test et" ile dene; yeni mülklerde bu durum birkaç gün sürebilir.
- [x] `www.alaz.pro` artık `alaz.pro`'ya kalıcı yönlendiriyor (next.config.js).
- [ ] Ana sayfa, `/tr`, `/services`, bir blog yazısı ve bir vaka sayfası için "URL inceleme" ile dizinleme iste.

## 3. Organization şeması için bilgi

`src/components/StructuredData.jsx` içine eklenecek, bende olmayan bilgiler:

- [x] Kuruluş yılı (`foundingDate`)
- [x] Şehir ve ülke (`address`): New York ve İzmir ofisleri eklendi. Ofis adresi değişirse `messages/*.json` içindeki `contact.offices` ile birlikte güncelle.

## 4. Yayından sonra test

- [ ] Google Rich Results Test (https://search.google.com/test/rich-results): ana sayfa, `/services`, bir `/blog/[slug]` ve bir `/case-studies/[slug]`
- [ ] Sayfa kaynağında `google-site-verification` etiketinin göründüğünü kontrol et.
- [ ] PageSpeed Insights ile mobil LCP'yi ölç.
