# Blog index ve yazı sayfası

**Boyut puanı:** 4.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 27 (2 kritik · 12 önemli · 13 ince işçilik) · **Korunacaklar:** 10 · **Eklenecekler:** 10

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Blog index ve yazı sayfası temiz, karanlık ve okunabilir; içeriğin kendisi ise sitenin en az "slop" tarafı: kaynaklı rakamlar, Sources bölümü, dürüst ton. Ama kabuk şablon kokuyor: "BLOG / 001" eyebrow'u, iki yazı için altı mono etiket, lucide ikonlu "READ ↗" kartları, "The ALAZ Team // ENGINEERING STUDIO" yazar kutusu, Hostinger AI-builder CDN'inden gelen grayscale kapaklar ve "THE BLOG." dev başlığı tek tek brief'teki slop listesine giriyor. Makale sayfası tipografik olarak "stilize bir döküm": sola yaslı 720px kolon, sağda ~650px boşluk, TOC/figür/pull-quote yok, başlıklarda kelime boşluklarını yutan tracking ve ekranda görünen bir Markdown hatası (*Milliseconds Make Millions* yıldızlarla basılıyor). Üstüne blog gövdesi her sayfada client'a gidiyor; "slow website" yazısı yazan bir stüdyo için zayıf nokta. İyi haber: başlık fit sistemi, mobil ölçü, çizgi madde işaretleri ve içerik sesi korunmaya değer; MDX + grid + TOC + kendi kapak sistemiyle bu iki sayfa Awwwards seviyesine en kolay çıkabilecek bölüm.

## Korunması gerekenler

- Yazı başlığı sistemi: `fit()` + Archivo 900, 6.4vw ile desktop'ta iki satır (blog-post-desktop-fold.png), mobilde 37px dört satır (blogpost-m-fold-real.png); en uzun kelime her zaman sığıyor. Koru.
- İçerik kalitesi: kaynaklı rakamlar (Deloitte, Portent, web.dev), ayrı Sources bölümü, buzzword yok, somut adımlar. Bu ses sitenin en güçlü anti-slop kanıtı; tasarım bu sese yetişmeli.
- Mobil gövde ölçüsü: 16px / 28.5px, 342px kolon ≈ 42 cpl; rahat okunuyor (blogpost-m-body-1.png).
- Gövde renk hiyerarşisi: #c9c9c9 metin, saf beyaz **bold** vurgular, link = beyaz + #555 alt çizgi → hover beyaz. Sakin ve doğru.
- Liste madde işareti: disc yerine 13px ince çizgi (`before:` kuralı, Markdown.jsx:91). Sahiplenilebilir bir detay.
- Başlıklarda global `text-wrap: balance` (globals.css:155) zaten var.
- Reveal sistemi JS'siz güvenli (`.reveal-ready` gating), `prefers-reduced-motion`e saygılı ve blog sayfalarında abartısız kullanılmış.
- SEO/semantik altyapı: BlogPosting JSON-LD, breadcrumb, OG article + publishedTime, `<time dateTime>`, generateStaticParams, aria-label'lı section.
- Okuma çubuğu fikri sade (2px beyaz, ikon yok, yüzde yok); ölçümü düzelt ama yaklaşımı koru.
- Yazı sayfasında dark theme'in ağır klişeleri yok: gradient glow, grid overlay, noise, pulsing dot yok; zemin #0a0a0a temiz.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `blog-01` — Index'te "BLOG / 001" eyebrow'u ve altı adet dekoratif mono etiket

- **Önem:** KRİTİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/page.jsx:31-35, 41, 66-69; messages/en.json blogIndex.eyebrowLeft/eyebrowRight/kicker/introNote/noteLeft/noteRight; blog-desktop-full.png, blog-mobile-full.png

**Sorun.** Sayfada iki yazı var ama altı mono uppercase etiket var: "BLOG / 001", "FIELD NOTES FROM THE STUDIO", "ENGINEERING, IN PLAIN LANGUAGE.", "ALAZ / WRITING 2026", "MORE FIELD NOTES INCOMING.", "ALAZ / BLOG". "BLOG / 001" brief'te sayılan "01 / 05 index eyebrow" kalıbının birebir kendisi; "MORE FIELD NOTES INCOMING." bir "yakında" özrü. Hiçbiri bilgi taşımıyor. Üstelik aynı şey üç isimle anılıyor: nav'da BLOG, h1'de THE BLOG, etiketlerde FIELD NOTES ve WRITING. Mobilde (blog-mobile-full.png) "FIELD NOTES FROM THE STUDIO" sağa yaslı iki satıra kırılıyor.

**Neden önemli.** AI-builder/template imzası; Awwwards jürisi bu etiketleri anında "generated" okur. Dekoratif etiket enflasyonu içeriğin azlığını daha da belli eder.

**Ne yapılmalı.** Eyebrow satırını kaldır ya da tek gerçek bilgiye indir (sol: "Blog", sağ: `${posts.length} posts · updated ${latestDate}` gerçek veriden). kicker (L35) ve introNote (L41) satırlarını sil. noteLeft/noteRight satırını (L66-69) sil; ileride yazı sayısı artınca yerine yıl/etiket filtresi gelir. Tek isim seç: nav'da "Blog" ise her yerde "Blog"; "Field notes" istiyorsan nav dahil hepsini değiştir.

#### `blog-02` — Kapak görselleri: Hostinger AI-builder CDN'inden, grayscale'e boğulmuş, fallback'siz

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json blogPosts[0].cover, blogPosts[1].cover (images.hostinger.com/<uuid>.png); src/app/[locale]/blog/[slug]/page.jsx:97-99; src/app/[locale]/layout.jsx:56-57 (preconnect images.hostinger.com); next.config.mjs remotePatterns (horizons-cdn.hostinger.com); blog-post-desktop-fold.png, blogpost-d-cover.png, blogpost-m-cover.png

**Sorun.** İki kapak da images.hostinger.com/<uuid>.png adreslerinde; next.config'deki horizons-cdn.hostinger.com kalıntısı sitenin Hostinger Horizons (AI site builder) kökenini gösteriyor; bu CDN'deki uuid'li PNG'ler büyük ihtimalle builder'ın ürettiği AI görseller (sandbox proxy'si görseli indirmeme izin vermedi, içeriği doğrulayamadım; URL kalıbı ve uygulanan filtre bunu güçlü şekilde ima ediyor). Üstüne `[filter:grayscale(1)_brightness(.82)]` ile tamamen gri yapılmış; bu filtre genelde zayıf/AI görseli saklamak için kullanılır. Görsel gelmediğinde 520px'lik #171717 bandında çıplak alt text görünüyor (blog-post-desktop-fold.png), mobilde 230px boş gri şerit (blogpost-m-cover.png). Yazının LCP elemanı stüdyonun kontrol etmediği üçüncü parti host'tan geliyor; "slow website" yazısının LCP'si dış CDN'e bağlı. Index kartları kapakları hiç kullanmıyor; kapak ya gereksiz ya tutarsız.

**Neden önemli.** AI/stock görsel en keskin slop sinyali; grayscale-on-dark "generic brutalist" klişesi; craft ve performans açısından dış bağımlılık; OG görseli de aynı URL'den.

**Ne yapılmalı.** Hostinger URL'lerini, preconnect'i ve remotePatterns'ı kaldır. Seçenek A (önerilen): tipografik/veri kapak: her yazı için /public/blog/<slug>.svg veya next/og ImageResponse ile üretilen 1200x630 görsel; Archivo ile yazının kilit rakamı ("0.1 s → +8.4%") ve ince bir grid; aynı görsel OG image olur. Seçenek B: gerçek stüdyo materyali (Lighthouse raporu, Network tab ekran görüntüsü), renkli, filtresiz. `post.cover` yoksa band'ı hiç render etme. Mobilde kapağı hero'nun parçası yap (lede'in altında 4:5) ya da tamamen kaldır. Kartlarda kapak kullanacaksan hover'da göster (bkz. additions: cursor-following preview).

> **Doğrulayıcı notu:** Doğrulananlar: iki kapak da images.hostinger.com/<uuid>.png (en.json L97, L113); layout.jsx L56-57'de her sayfaya preconnect+dns-prefetch; [filter:grayscale(1)_brightness(.82)] (page.jsx L98); priority + sizes=100vw ile 8 adaylı (3840w'a kadar) preload <link> dış host'a gidiyor (curl ile görüldü); görsel yüklenmeyince 520px #171717 bandında çıplak alt text (blog-post-desktop-fold.png, blogpost-d-cover.png), mobilde 230px boş şerit; index kartları post.cover'ı hiç kullanmıyor; OG image ve JSON-LD image aynı URL. Düzeltmeler: dosya next.config.js (mjs değil) ve remotePatterns'da images.hostinger.com DA var (L10-11), yalnızca horizons-cdn değil; ayrıca media.* (earth/server/wafer/conduits/laboratory) görselleri de aynı CDN'de (en.json L3-7) — kaldırma işi blogla sınırlı değil. Doğrulanamayan: görsellerin AI üretimi olduğu — proxy indirmeyi engelledi (403), bu kısım çıkarım. Sahip bir bakışta doğrulayabilir; AI/stock ise critical, değilse bile dış CDN'den gelen LCP + grayscale kaplama + fallback'siz band major'dan aşağı değil. Ek: generateMetadata L33 kapağı 1200x630 ilan ediyor ama gerçek boyut bilinmiyor; L34'te updated olduğu halde modifiedTime yok.

### ÖNEMLİ

#### `blog-03` — Yazar kutusu: "The ALAZ Team // ENGINEERING STUDIO" + mono "A." monogram

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:108-119 (L109 monogram, L112 "// role", L113-117 "hello@alaz.pro ."); messages/en.json blogPosts[*].author; blogpost-d-author-next.png, blogpost-m-author-next.png

**Sorun.** Yazar "The ALAZ Team", rolü "// ENGINEERING STUDIO" (kod yorumu öneki), avatar yerine kenarlıklı kutuda mono "A.". Gerçek kişi yok; "//" ön eki ve monogram kutusu "developer aesthetic" template kalıbı. Alt metin "Reach us at hello@alaz.pro ." şeklinde basılıyor: L115-116'daki `{' '}` yüzünden noktadan önce boşluk var (ekran görüntüsünde görünüyor).

**Neden önemli.** Anonim "Team" yazar + kod-yorum süsü generic/fake sinyali; Awwwards seviyesindeki stüdyo blogları (Basement, Studio Freight) gerçek isim ve yüzle imzalar. Noktadan önce boşluk "kimse okumamış" izi.

**Ne yapılmalı.** Gerçek yazar: kurucunun adı ve rolü ("Founder & engineer"), renkli portre veya hiç foto (sadece isim + /about linki). "//"'ı kaldır. Kutuyu kaldırıp makale sonuna tek satır: "Written by Ad Soyad · Engineering, ALAZ · İzmir". Metni `t.rich('authorIntro', { email: (c) => <a href="mailto:hello@alaz.pro">{c}</a> })` ile tek string'den kur, `{' '}` + authorIntroAfter yapısını sil.

#### `blog-04` — Kartta lucide Clock ikonu ve kartın içinde ikinci bir "READ ↗" linki

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/page.jsx:3, 55-62; blog-d-cards.png, blog-m-cards.png, blog-d-card-hover.png

**Sorun.** Kartın tamamı zaten <Link>; buna rağmen altta "READ ↗" (lucide ArrowUpRight) ve "⏱ 7 MIN READ" (lucide Clock) var. Hover'da tek değişen gap 8→12px ve zemin #0a→#14.

**Neden önemli.** lucide ikonlar brief'te açıkça sayılan slop sinyali; link olan kartta "READ" butonu çift affordance ve UI gürültüsü.

**Ne yapılmalı.** Clock ve ArrowUpRight importlarını kaldır. Alt satır: "7 min" tek başına (mono, dim). "READ"i sil; hover'da başlığın altında `::after` ile 1px çizgi scaleX(0→1) 400ms cubic-bezier(.22,1,.36,1) ve excerpt bir kademe beyaza (#9fa3a9→#c9c9c9). Ok isteniyorsa site genelinde tek bir custom SVG ok (header'dakiyle aynı çizim) kullan.

#### `blog-05` — Markdown renderer italic'i desteklemiyor: gövdede çıplak yıldızlar basılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Markdown.jsx:9 (renderInline regex); messages/en.json blogPosts[0].content ("*Milliseconds Make Millions*"); blogpost-d-stars.png

**Sorun.** renderInline sadece **bold**, `code` ve [link] yakalıyor. Sonuç: "The most useful study here is *Milliseconds Make Millions*, run by…" ekranda yıldızlarla görünüyor; DOM'da 0 adet <em>. Yazının en önemli kaynağının adı bozuk.

**Neden önemli.** Görünür render hatası; jüri için "kimse bu sayfayı sonuna kadar okumamış" sinyali. Ayrıca sadece iki yazıyla bile parser kırılmışsa güven vermez.

**Ne yapılmalı.** Kısa vade: regex'i `/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|_[^_\n]+_|`[^`]+`)/g` yap ve tek yıldız/alt çizgi için `<em className="italic text-[#e0e0e0]">` döndür (`**` dalı `*` dalından önce kontrol edilsin). Kalıcı çözüm blog-09'daki MDX geçişi.

#### `blog-07` — Makale gövdesi: sola yaslı 720px kolon, sağda ~650px boş alan, hiçbir yardımcı katman yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Markdown.jsx:101 (max-w-[720px]); src/app/[locale]/blog/[slug]/page.jsx:101-106; blogpost-d-body-1.png, blogpost-d-body-2.png, blog-post-desktop-full.png

**Sorun.** 1440px'te gövde x=60-780 arasında; x=780-1440 arası yaklaşık 6400px boyunca tamamen boş. TOC yok, sidenote yok, sticky meta yok, pull-quote/figure/stat yok. 9 bölüm, 1400 kelime, tek tip p/h2/ul akışı. Bu bir okuma deneyimi değil, sola yaslanmış stilize bir döküm.

**Neden önemli.** Awwwards seviyesi makale sayfaları (Obys journal, Basement blog, Studio Freight) kolon dışına taşan öğelerle ritim kurar; boş yarım ekran "layout yapılmamış" hissi verir.

**Ne yapılmalı.** 12 kolonlu grid: gövde kolon 4-9 (~680px, hafif ortalanmış) veya 3-8; sol kolonda sticky meta (tarih/süre/yazar), sağ kolonda sticky TOC ve kaynak sidenote'ları (bkz. additions). Belirli bloklar kolonu kırsın: pull-stat tam genişlik, figür 8 kolon, blockquote sol kenara taşsın (`-ml-[8vw]`). Mobile'da grid tek kolona düşer.

#### `blog-09` — El yapımı Markdown parser ve blog içeriğinin messages/en.json içinde yaşaması

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Markdown.jsx:4-6, 33-99; messages/en.json blogPosts[*].content (tek satır 1400 kelimelik string); src/app/[locale]/blog/[slug]/page.jsx:7, 15

**Sorun.** Parser kod bloğu (```), numaralı liste, görsel, tablo, dipnot, iç içe liste ve italik desteklemiyor; h3 ve blockquote stili var ama iki yazıda da hiç kullanılmamış. Mühendislik blogunda kod bloğunun olmaması başlı başına sınır. İçerik çeviri JSON'unda tek satır string; frontmatter yok, draft yok, görsel eklemek ve diff okumak zor.

**Neden önemli.** Craft ve ölçeklenebilirlik: üçüncü yazı kod örneği içerdiği anda sistem kırılır; blog-05 gibi hatalar bu parser'ın doğal sonucu.

**Ne yapılmalı.** content/blog/en/<slug>.mdx (frontmatter: title, excerpt, date, updated, tag, author, cover). next-mdx-remote/rsc (veya @next/mdx) + remark-gfm + rehype-slug + rehype-pretty-code (shiki, tek koyu tema, satır numarası yok, 14px JetBrains Mono, lh 1.6, zemin #111, kenarlık yok) + remark-smartypants. Custom components: Figure, Stat, Aside, Code. Markdown.jsx'i sil. TR için content/blog/tr/<slug>.mdx aynı slug ile; index ve generateStaticParams fs'ten okur.

#### `blog-10` — Blog gövdesi her sayfada client'a gönderiliyor (tüm messages NextIntlClientProvider'a geçiliyor)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/layout.jsx:50, 72 (messages={messages}); src/i18n/request.js; messages/en.json (55 KB, blogPosts 14 KB)

**Sorun.** Ana sayfa HTML'inde "Milliseconds Make Millions" geçiyor: tüm en.json, blog markdown dahil, her sayfanın RSC payload'ına gömülüyor. "What does a slow website cost" yazısını yazan stüdyonun ana sayfası blog gövdesini taşıyor.

**Neden önemli.** Performans craft'ı ve marka tutarlılığı (yazdığını uygula); Awwwards'ta performans ayrı puan.

**Ne yapılmalı.** Blog içeriğini messages'tan çıkar (blog-09). Geçici: NextIntlClientProvider'a yalnızca client bileşenlerin kullandığı namespace'leri geç: `messages={pick(messages, ['nav','footer','form','common'])}`; server bileşenleri getTranslations ile tam dosyayı okumaya devam eder. Doğrulama: `curl / | grep -c "Milliseconds"` → 0.

> **Doğrulayıcı notu:** Doğrulandı: curl / | grep -c "Milliseconds Make Millions" → 2; ana sayfa HTML 272 KB; en.json 55.5 KB, blogPosts 14.4 KB; layout.jsx L50 getMessages() ve L72 messages={messages} tüm dosyayı client'a geçiriyor. Fix'teki namespace listesi yanlış: client tarafında useTranslations kullanan yalnızca Header.jsx ('nav') ve IntakeForm.jsx ('intake'); Footer server bileşeni (getTranslations), 'form' ve 'common' diye namespace yok. Doğru geçici fix: messages={pick(messages, ['nav','intake'])}. Kalıcı: blogPosts'u messages'tan çıkar (blog-09).

#### `blog-11` — Index'te "THE BLOG." dev başlığı tek içeriği fold altına itiyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/blog/page.jsx:35-42 (mt-[clamp(80px,10vw,155px)], --fit-size 270px, mb-[60px], pb-[75px]); blog-desktop-full.png (kartlar y≈960'da başlıyor, viewport 900), blog-mobile-full.png

**Sorun.** 1440x900'de hero (eyebrow + kicker + 270px "THE BLOG." + intro) ~960px; iki yazı fold'un altında. "THE BLOG." tüm sayfalarda tekrar eden "DEV KELİME + gri nokta" kalıbının kopyası ve hiçbir şey söylemiyor; blog index'inin kahramanı yazıların kendisi olmalı.

**Neden önemli.** Her sayfada aynı dev-kelime hero'su template dokusu; içeriğin görünmemesi kullanılabilirlik sorunu.

**Ne yapılmalı.** Seçenek A: hero'yu küçült: mono "Blog" + gerçek sayı, intro 20px, yazılar fold'da. Seçenek B (Awwwards): son yazı hero olsun: küçük tarih/etiket, başlık `fit()` ile 6.4vw, altında lede ve "Read"; diğer yazılar altında liste satırları. Hero ~70vh, ilk liste satırı fold'da görünsün.

> **Doğrulayıcı notu:** Desktop 1440x900'de grid üst kenarı y=1000 (reviewer 960 dedi); h1 230px, 355-752 arası; yani iki yazı da fold'un ~100px altında — desktop için doğru. Mobil kanıt yanlış: 390x844'te grid y=655'te başlıyor, ilk kartın etiketi/tarihi/başlığı fold içinde (blog-mobile-full.png'de de görülüyor). Sorun desktop'a özgü; "son yazı hero olsun" seçeneği doğru yön.

#### `blog-12` — Yazı hero'su: ilk paragrafa kadar 1480px, tarih iki kez, iki eyebrow satırı

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:87 (pt-[128px]), 88-92 (eyebrow + mt-[110px]), 97 (kapak 520px), 101-105 ("ALAZ / FIELD NOTES" + tekrar tarih, pb-[125px]); blog-post-desktop-full.png, blogpost-d-cover.png

**Sorun.** Desktop'ta ilk paragraf y=1480'de (1.6 viewport). Sıra: eyebrow satırı → 110px boşluk → meta → h1 → lede → 520px gri kapak → ikinci eyebrow satırı ("ALAZ / FIELD NOTES" + tarih; tarih L92'de zaten gösterildi) → 125px boşluk → gövde. İkinci eyebrow satırı saf dolgu.

**Neden önemli.** Okuyucu okumaya başlamak için 1.5 ekran kaydırıyor; tekrarlanan etiket satırları template dokusu.

**Ne yapılmalı.** L101-105 satırını sil. Kapak yoksa: meta → h1 → lede → 56px → gövde. Kapak varsa hero içinde 56vh ve gövde kapaktan 64px sonra. pt-[128px] → 96px; mt-[110px] → 56px. Hedef: ilk paragraf ≤ 1 viewport.

#### `blog-14` — "Next field note" bloğu: mobilde başlık "…" ile kesiliyor, bağlam yok, seçim rastgele

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:58 (next = posts.find(slug !== …)), 121-124 (line-clamp-2, max-w-[78%]); blogpost-m-author-next.png, blogpost-d-next-hover.png

**Sorun.** Mobilde "We're Live: A Software Studio f…" — başlık kesik. Blokta etiket, tarih, süre, kapak yok; hover sadece oku 10px kaydırıyor. `next` mantığı dizideki ilk "başka" yazıyı seçiyor: 3+ yazıda hep aynı yazıya gider, kronolojik/ilgili değil. Prev yok.

**Neden önemli.** Yazıdan yazıya geçiş Awwwards makale sayfalarının en çok çalışılan anı (Locomotive, Obys, Unseen); burada en zayıf nokta.

**Ne yapılmalı.** `next` = tarihe göre bir sonraki (yoksa en eski), `prev` = bir önceki; iki sütun prev/next. Başlığı kesme: mobilde 22px, line-clamp kaldır, `text-wrap: balance`. Blok: etiket + tarih + süre satırı, başlık 3.4vw, hover'da alt kenardan (tipografik) kapak 300ms translateY ile yükselsin, ok yerine başlık altı çizgi.

#### `blog-15` — Makale sonunda üst üste dört CTA ve üç kez "holds up"

- **Önem:** ÖNEMLİ · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** messages/en.json blogPosts[0].content ("## Want a second opinion?"), blogPosts[1].content ("## Say hello", "Let's build something that holds up."), blogIndex.introText, blogPost.contactPrompt; src/app/[locale]/blog/[slug]/page.jsx:113-117 (yazar e-postası), 127-132 ("WANT TO BUILD SOMETHING THAT HOLDS UP?" + START A PROJECT); blogpost-d-author-next.png, blogpost-m-author-next.png

**Sorun.** Sıra: makale içi satış bölümü ("that is what we do… Send a URL to hello@alaz.pro") → yazar kutusu ("Reach us at hello@alaz.pro") → "WANT TO BUILD SOMETHING THAT HOLDS UP?" + kenarlıklı START A PROJECT → header'daki START A PROJECT. "holds up" ifadesi index intro'da, CTA'da ve ikinci yazının son cümlesinde üç kez.

**Neden önemli.** Araştırma yazısının güvenilirliğini satış yığını düşürür; tekrar eden slogan filler copy sinyali.

**Ne yapılmalı.** Makale sonu için tek CTA: makale içindeki "Want a second opinion?" bölümünü koru (spesifik ve doğal), L127-132 bloğunu sil, yazar kutusundaki e-postayı kaldır (blog-03). "holds up"ı tek yerde bırak. Header CTA zaten her sayfada.

#### `blog-19` — Kart tasarımı: kenarlıklı etiket çipi, fark edilmeyen hover, dengesiz iç boşluk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/blog/page.jsx:48 (min-h-[320px], hover:bg-[#141414]), 50 (border border-[#333] tag pill); blog-d-cards.png, blog-d-card-hover.png

**Sorun.** "PERFORMANCE"/"LAUNCH" etiketleri shadcn Badge görünümlü kenarlıklı kutu. Hover yalnızca zemin #0a→#14 (blog-d-card-hover.png'de zor seçiliyor). min-h 320 nedeniyle kısa excerpt'li kartta excerpt ile alt satır arasında ~75px, komşuda ~30px boşluk; iki kart farklı nefes alıyor.

**Neden önemli.** Generic card pattern; hover'ı olmayan kart Awwwards'ta "etkileşim yok" demektir; dengesiz boşluk craft eksiği.

**Ne yapılmalı.** Etiket: kenarlıksız mono dim metin ("Performance", normal case). Kart yerine liste satırı: tarih | başlık (2.5vw) | etiket | süre, border-b; hover'da satır beyaz zemin/siyah metne döner (Studio Freight/Locomotive liste kalıbı) veya cursor'u takip eden kapak önizlemesi (additions). Kart kalacaksa: min-h kaldır, `grid-template-rows: auto auto 1fr auto` ile alt satırı hizala, hover'da başlık altı çizgi + excerpt bir kademe beyaza.

> **Doğrulayıcı notu:** Doğru kısımlar: etiket çipi border border-[#333] (L50, computed rgb(51,51,51)), hover yalnızca bg transparent→rgb(20,20,20) (blog-d-card-hover.png'de zor seçiliyor). Yanlış kısım: boşluk dengesizliğinin nedeni min-h-[320px] değil — kartlar 348px, yüksekliği grid satırındaki uzun (3 satır başlıklı) kart belirliyor; excerpt'teki flex-1 zaten alt satırı hizalıyor (her iki kartta excerpt→footer 24px). Yani "min-h kaldır + grid-template-rows" fix'i hiçbir şeyi değiştirmez; görünen fark 2 vs 3 satırlık başlıktan geliyor ve eşit yükseklikli kart gridinin doğası. Gerçek çözüm reviewer'ın da yazdığı liste satırı kalıbı (tarih | başlık | etiket | süre, border-b, hover invert) ya da kartı tut, çipi kenarlıksız yap ve hover'a başlık altı çizgi ekle.

#### `blog-missed-1` — Bilinmeyen slug 200 döndürüyor (soft 404)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:46-55 (if (!post) { return <main>… POST NOT FOUND … }); generateMetadata L23 return {}

**Sorun.** curl -o /dev/null -w %{http_code} http://localhost:3000/blog/does-not-exist → 200 ve gövdede "POST NOT FOUND." Sayfa, next/navigation notFound() çağırmak yerine 200 statüsüyle bir "bulunamadı" ekranı render ediyor; metadata boş obje dönüyor (title/robots yok). Aynı kalıp case-studies/[slug]/page.jsx:41'de de var.

**Neden önemli.** "What does a slow website cost" ve Core Web Vitals yazan bir stüdyonun blogunda soft-404, Search Console'da "Soft 404" uyarısı ve index kirliliği üretir; craft açısından Next'in standart 404 akışı (not-found.jsx, doğru statü) atlanmış.

**Ne yapılmalı.** `import { notFound } from 'next/navigation'` ve `if (!post) notFound();` (generateMetadata'da da). src/app/[locale]/not-found.jsx içine mevcut "POST NOT FOUND." tasarımını taşı (fit() başlık + geri link). İsteğe bağlı: `export const dynamicParams = false;` ile generateStaticParams dışındaki slug'lar build'de 404 olsun. Doğrulama: curl -I /blog/xyz → 404.

### İNCE İŞÇİLİK

#### `blog-06` — Başlıklarda -.055/-.06em tracking kelime boşluklarını yutuyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Markdown.jsx:61, 67, 73 (tracking-[-.06em] @ 42px, hesaplanan letter-spacing -2.52px, word-spacing 0); src/app/[locale]/blog/page.jsx:53 (tracking-[-.055em] @ 36px); src/app/[locale]/blog/[slug]/page.jsx:123 (-.05em); blogpost-d-body-2.png, blog-d-cards.png

**Sorun.** Archivo 800/900 zaten dar boşluklu; 42px'te -2.52px letter-spacing ile "A tenth of a second, measured" → "Atenthofasecond,measured", kart başlığı "WhatDoesaSlowWebsite" gibi okunuyor. 100px+ display'de işe yarayan tracking 36-46px gövde başlıklarında legibility'yi düşürüyor.

**Neden önemli.** Tipografik craft; sıkı tracking Awwwards estetiğidir ama kelime aralığı kaybolunca amatörlük okur.

**Ne yapılmalı.** Boyuta göre kademelendir: ≥96px: -.06em; 40-96px: -.03em; <40px: -.02em. Alternatif: mevcut tracking'i koruyup kelime aralığını telafi et: h2'ye `[word-spacing:.12em]`, kart h2'ye `tracking-[-.03em] [word-spacing:.06em]`. Test: başlık ekran görüntüsünü %50 küçült; kelimeler hâlâ ayrılıyorsa doğru.

> **Doğrulayıcı notu:** Sayılar doğru: h2 42px / letter-spacing -2.52px / word-spacing 0 (Markdown.jsx L67, L73), kart h2 36px / -1.98px (page.jsx L53), post h1 92px / -5.53px. Ancak "Atenthofasecond,measured" abartı: blogpost-d-stars.png ve blog-d-cards.png'de kelime boşlukları daralmış ama hâlâ ayırt ediliyor; bu stil Awwwards sıkı-set başlık estetiğinin kendisi. Gerçek sorun, 92px h1 ile 42px h2'nin aynı -.06em'i kullanması (ölçeğe duyarsız tracking). Önerilen kademeli tracking ve/veya word-spacing telafisi doğru yaklaşım; severity minor (polish).

#### `blog-08` — Paragraf aralığı satır aralığından küçük; gövde ritmi gevşek ve ölçü üst sınırda

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Markdown.jsx:41 (mb-[24px]), 101 (leading-[1.78] @ 20px = 35.6px, max-w 720px); blogpost-d-body-1.png

**Sorun.** Desktop'ta satır aralığı 35.6px, paragraf boşluğu 24px: paragraf sınırı bir satır boşluğundan zayıf, blok sürekli metin gibi görünüyor. 1.78 line-height 20px'te fazla havadar; 720px ölçü ~72-75 karakter/satır ile ideal aralığın (60-68) üstünde.

**Neden önemli.** Editoryal tipografide paragraf boşluğu ≥ 1 satır (ya da girinti) olmalı; ölçü 60-68 cpl'de göz satır başını kaybetmez.

**Ne yapılmalı.** Gövde: 19-20px / line-height 1.6 (32px) / max-width 660-680px (~64 cpl); `p { margin-bottom: 1lh }` (Tailwind: `mb-[1lh]`). li mb 10px. h2: mt 2.5lh, mb .75lh. Mobilde 16px/1.65 koru (zaten iyi).

> **Doğrulayıcı notu:** Ölçüm: p 20px / line-height 35.6px / margin-bottom 24px (Markdown.jsx L41, L101) doğru; paragraf boşluğu satır aralığından küçük, bu kısım geçerli. Ama ölçü iddiası yanlış: paragraflarda ortalama 65 cpl (max 74), yani reviewer'ın kendi ideal aralığı (60-68) içinde; max-width'i 660-680'e düşürmek gerekmiyor. Ek: li line-height 34px (1.7) ile p 35.6px (1.78) farklı — liste ve paragraf aynı dikey ritme oturmuyor. Düzeltilmiş fix: p margin-bottom 1lh (veya 32-36px), li line-height'ı p ile eşitle, max-width'e dokunma.

#### `blog-13` — Mobilde meta satırı tarih ortasından kırılıyor: "UPDATED OCT / 5, 2026"

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:92; blogpost-m-fold-real.png

**Sorun.** 390px'te "FEB 22, 2026 — 7 MIN READ — UPDATED OCT 5, 2026" iki satıra sarıyor ve kırılma "OCT" ile "5" arasında.

**Neden önemli.** Craft; tarih bölünmez bir birimdir.

**Ne yapılmalı.** Her parçayı `<span className="whitespace-nowrap">` içine al, container'a `flex flex-wrap gap-x-[12px]`; ayırıcı "—" yerine gap bırak. Ya da "updated"ı meta'dan çıkarıp makale sonuna taşı (blog-22).

#### `blog-16` — E-posta adresi inline-code çipi olarak basılıyor ve tıklanamıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json blogPosts[0].content ve blogPosts[1].content ("`hello@alaz.pro`"); src/components/Markdown.jsx:19-21 (link dalı), 25 (code stili); blogpost-d-sources.png

**Sorun.** `hello@alaz.pro` backtick içinde → #1a1a1a zeminli, kenarlıklı kod çipi; mailto linki değil. Kod çipinin kenarlık + padding kombinasyonu UI badge'ine benziyor. Ayrıca "/" ile başlamayan her link target=_blank alıyor; mailto için yanlış.

**Neden önemli.** Semantik hata (e-posta kod değildir) + kullanılabilirlik (tıklanamıyor).

**Ne yapılmalı.** İçerikte `[hello@alaz.pro](mailto:hello@alaz.pro)`; renderInline'da `mailto:` ile başlayan linklerde target/rel koyma. Inline code: kenarlığı kaldır, `bg-[#141414] px-[.35em] rounded-[2px] text-[.9em]`.

#### `blog-17` — Düz kesme işaretleri (') ve paragraflar için text-wrap:pretty / hyphens yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json blogPosts[*].title/excerpt/content ("We're", "Amazon's", "don't", "stores'"; dosyada 0 adet ’); src/components/Markdown.jsx:41, 101; blog-d-cards.png ("We're Live"), blogpost-m-body-2.png ("not." tek kelimelik satır)

**Sorun.** Başlıkta bile "We're" düz kesme ile. Paragraflarda `text-wrap: pretty` ve `hyphens: auto` yok; mobilde ~42 cpl'de yetim kelimeler ve düzensiz sağ kenar.

**Neden önemli.** Awwwards seviyesinde tipografik noktalama temel kontrol maddesi; dul/yetim satırlar ritmi bozar.

**Ne yapılmalı.** İçerikte ’ “ ” kullan (MDX'te remark-smartypants otomatik). Markdown container'a `[text-wrap:pretty] [hyphens:auto]` ve `lang="en"` ekle. Başlıklardaki global `text-wrap: balance` (globals.css:155) zaten doğru, koru.

#### `blog-18` — Okuma çubuğu tüm dokümanı ölçüyor, width animate ediyor ve state ile re-render yapıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/ReadProgress.jsx:8-20; blogpost-d-progress.png

**Sorun.** progress = scrollTop / (scrollHeight − clientHeight); makale bitip yazar kutusu, next, CTA ve footer (~1.1 viewport) geldiğinde çubuk ~%80'de, %100'e footer'ın dibinde ulaşıyor. Her scroll event'inde setState → re-render; `transition-[width]` layout tetikliyor. 2px beyaz çubuk header üstünde neredeyse görünmez.

**Neden önemli.** Craft: "ilerleme" makaleyi ölçmeli; animasyon transform ile olmalı; scroll event'inde React state gereksiz.

**Ne yapılmalı.** CSS scroll-driven animation: makale elemanına `view-timeline: --article block`, çubuğa `animation: grow linear; animation-timeline: --article; animation-range: entry 0% exit 100%; @keyframes grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }` (transform-origin left). JS fallback: article.getBoundingClientRect() ile hesapla, ref üzerinden `style.transform = scaleX(p)`, state yok. Çubuğu header'ın alt kenarına (top 76px, 1px) koy: header çizgisiyle birleşir, görünürlüğü artar.

> **Doğrulayıcı notu:** ReadProgress.jsx L8-20 doğru: document scrollHeight bazlı, setState her scroll'da, transition-[width]. Ölçüm: Markdown kolonunun altı viewport altına geldiğinde ilerleme %85 (reviewer ~%80). Fix'te iki düzeltme gerekli: (1) view-timeline adlı zaman çizelgesi varsayılan olarak yalnızca alt elemanlara görünür; çubuk root seviyesinde fixed olduğu için body'ye `timeline-scope: --article` eklenmeli; (2) animation-range için `contain 0% contain 100%` daha doğru — entry/exit aralığı makale daha hero'dayken dolmaya başlar ve makale tamamen çıkana kadar sürer. Safari eski sürümleri için JS fallback (getBoundingClientRect + ref üzerinden transform) şart; o fallback için gövdeyi <article> ile sarmak gerekir (bkz. missed).

#### `blog-20` — Başlıkların id'si yok; deep link ve TOC imkânsız

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/Markdown.jsx:61, 67, 73

**Sorun.** h2/h3 elemanları id'siz; "#sources" gibi bölüm linki verilemiyor; "Measure it in 15 minutes" bölümü paylaşılamıyor.

**Neden önemli.** Craft + TOC eklemesinin önkoşulu.

**Ne yapılmalı.** slugify(text) ile id ver (MDX'te rehype-slug otomatik); h2/h3'e `scroll-mt-[96px]` (header 76px + 20).

#### `blog-21` — "← ALL FIELD NOTES" Unicode oku vs. lucide SVG oklar; "BLOG / PERFORMANCE" tıklanamıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json blogPost.allFieldNotes; src/app/[locale]/blog/[slug]/page.jsx:88-91; blog-post-desktop-fold.png

**Sorun.** Geri linkte string içinde "←" karakteri, aynı sayfanın altında lucide ArrowUpRight/ArrowLeft SVG'leri; iki farklı ok dili. Sağdaki "BLOG / PERFORMANCE" etiket gibi duruyor ama link değil; etiket filtresi de yok.

**Neden önemli.** Tutarlılık; sahte affordance.

**Ne yapılmalı.** Tek ok sistemi (tek custom SVG, 1.5px stroke, header'dakiyle aynı). "←"yi string'den çıkar. Sağ etiketi ya kaldır ya /blog?tag=performance filtresine bağla (filtre eklendiğinde).

#### `blog-22` — "UPDATED OCT 5, 2026" iki yazıda da aynı gün ve meta satırının baş köşesinde

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json blogPosts[0].updated, blogPosts[1].updated (ikisi de 2026-10-05); src/app/[locale]/blog/[slug]/page.jsx:92

**Sorun.** İki yazı da aynı gün "güncellenmiş" görünüyor: toplu düzenleme izi. Meta satırının üçte biri bu bilgi ve mobilde satırı kırdırıyor (blog-13).

**Neden önemli.** Okuyucu için anlamlı revizyon yoksa gürültü; "her şey bugün güncellendi" güvenilirliği düşürür.

**Ne yapılmalı.** updated'ı yalnızca içerik değiştiğinde doldur; görüntüyü makale sonuna "Last revised Oct 5, 2026" küçük satırı olarak taşı; JSON-LD dateModified kalsın.

#### `blog-missed-2` — Yazı gövdesi <article> ile sarılmamış; okuma çubuğu ve TOC için ölçülecek eleman yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:86-133 (<main> içinde yalnızca div'ler); src/components/Markdown.jsx:101 (div)

**Sorun.** Playwright: sayfada 0 adet <article>. Başlık, meta, gövde ve yazar bloğu bağımsız div'ler; BlogPosting JSON-LD var ama DOM'da makale sınırı yok. blog-18'deki "ilerleme makaleyi ölçsün" düzeltmesi ve sticky TOC için ölçülecek/izlenecek bir kök eleman gerekiyor.

**Neden önemli.** Semantik craft (okuyucu modu, ekran okuyucu, Reader View) ve blog-07/18/20 düzeltmelerinin teknik önkoşulu.

**Ne yapılmalı.** Hero + gövde + yazar satırını `<article id="post">` ile sar (next/prev ve CTA dışarıda kalsın); Markdown kökünü `<div>` yerine `<section>` yap. ReadProgress ve TOC `document.getElementById('post')` üzerinden ölçsün; CSS scroll-driven sürümde `view-timeline-name: --article` bu elemana gelir.

#### `blog-missed-3` — Aynı noktada iki beyaz çubuk: NextTopLoader (3px, glow) ve ReadProgress (2px)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/layout.jsx:59-70 (NextTopLoader height 3, color #fff, shadow "0 0 24px 4px #fff…", zIndex 99999, fixed top:0); src/components/ReadProgress.jsx:20 (fixed top-0 h-[2px] bg-white z-[60])

**Sorun.** Her iki bileşen de ekranın en üstünde, beyaz, tam genişlikte, fixed. Yazıya gelişte loader çubuğu aynı piksel satırında parlayıp kayboluyor, sonra altındaki 2px okuma çubuğu kalıyor; iki "ilerleme" aynı dili kullanıyor ama farklı şeyleri ölçüyor. Loader'ın 24px beyaz glow'u sitenin düz, gölgesiz dilinin dışında.

**Neden önemli.** İki çubuk aynı yerde = sinyal karışıklığı; glow'lu nprogress çubuğu generic Next template izi. Awwwards seviyesinde geçişler sayfa seviyesinde (View Transition / overlay) kurgulanır, header üstü çubukla değil.

**Ne yapılmalı.** Okuma çubuğunu header'ın alt kenarına taşı (top: 76px, 1px; blog-18'deki öneriyle uyumlu) ya da loader'ı kaldır. NextTopLoader kalacaksa shadow="none", height 1-2px; en iyisi route geçişi için ayrı bir dil (ör. header altı ince çizgi scaleX veya sayfa overlay'i) seçip tek çubuk bırakmak.

#### `blog-missed-4` — Blog sayfalarında altı farklı gri, hiçbiri token değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/blog/[slug]/page.jsx:94 (text-[#b4b4b4] lede), 97 (bg-[#171717]), 109 (bg-[#1a1a1a] border-[#333]); src/app/[locale]/blog/page.jsx:48 (hover:bg-[#141414]), 50 (text-[#cfcfcf]), 54 (text-mute = #9fa3a9); src/components/Markdown.jsx:25 (#e8e8e8, #1a1a1a, #2a2a2a), 79 (#9a9a9a), 101 (#c9c9c9); tailwind.config.js colors (silver #b4b4b4, panel #141414, well #171717 tanımlı)

**Sorun.** İkincil metin için beş ayrı değer: lede #b4b4b4, gövde #c9c9c9, kart excerpt #9fa3a9 (var(--gray)), etiket/READ #cfcfcf, blockquote #9a9a9a; zeminler #141414/#171717/#1a1a1a; kenarlıklar #2a2a2a/#333/var(--line). Üç dosyada 9 ham hex. tailwind.config'de silver/panel/well token'ları var ama kullanılmıyor.

**Neden önemli.** Gri rampası tutarsız olunca hiyerarşi bulanıklaşır (lede mi gövde mi daha önemli?), redesign'da her değer tek tek bulunup değiştirilmek zorunda; Awwwards seviyesinde sistem disiplini beklenir.

**Ne yapılmalı.** globals.css'te 4 kademeli metin rampası (--text-1 #fff, --text-2 #c9c9c9, --text-3 #9fa3a9, --text-4 #7e828a) ve 2 zemin (--surface-1 #111, --surface-2 #171717), tek kenarlık (--line) tanımla; blog dosyalarındaki ham hex'leri token'a çevir (lede → text-2, excerpt → text-3, etiket → text-3, blockquote → text-3). Markdown.jsx'teki code/blockquote renkleri de aynı rampadan.

#### `blog-missed-5` — Tarihler JSON'da elle yazılmış etiket olarak çift tutuluyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** messages/en.json blogPosts[*].date/dateLabel ve updated/updatedLabel; src/app/[locale]/blog/page.jsx:51; src/app/[locale]/blog/[slug]/page.jsx:92, 104

**Sorun.** Her yazıda date ("2026-02-22") ve dateLabel ("FEB 22, 2026") ayrı ayrı yazılmış; updated için de aynı. İki alan birbirinden bağımsız düzenlenebiliyor; next-intl'in getFormatter().dateTime() mevcutken format elle sabitlenmiş. Üçüncü yazıda biri güncellenip diğeri unutulursa <time dateTime> ile görünen metin uyuşmaz (JSON-LD datePublished date'ten, ekran dateLabel'dan geliyor).

**Neden önemli.** İçerik hattı craft'ı: tek kaynak yok; MDX geçişinde (blog-09) frontmatter'da yalnızca ISO tarih olmalı.

**Ne yapılmalı.** dateLabel/updatedLabel alanlarını sil; `const f = await getFormatter(); f.dateTime(new Date(post.date), { month: 'short', day: 'numeric', year: 'numeric' })` ile üret, uppercase'i CSS (uppercase) ile ver. TR için aynı çağrı otomatik yerelleşir.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Sağ kolonda sticky TOC + aktif bölüm göstergesi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Obys journal, Linear changelog, Vercel blog, Rauno Freiberg

blog-07'deki boş sağ kolonu doldurur. rehype-slug (veya slugify) ile h2 id'leri; `<nav className="sticky top-[120px]">` içinde 12px mono liste; IntersectionObserver (rootMargin '-40% 0px -55% 0px') aktif bölümü belirler; aktif öğe beyaz, diğerleri dim; soldaki 1px gösterge öğeler arasında transform ile kayar (300ms, cubic-bezier(.22,1,.36,1)). Mobilde gövdenin üstünde `<details>` "Contents". 1000px altında gizle.

### MDX içerik hattı ve custom bileşenler

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Basement Studio blog, Raycast blog, Linear changelog

content/blog/<locale>/<slug>.mdx + frontmatter; next-mdx-remote/rsc; remark-gfm, remark-smartypants, rehype-slug, rehype-pretty-code (shiki; tek koyu tema: zemin #111, metin #d4d4d4, en fazla iki vurgu rengi; dosya adı barı mono 11px; "Copy" → "Copied" metin butonu, ikon yok). Bileşenler: Figure (1px border-line, mono caption, framer layoutId ile zoom), Stat, Aside, Code. blogPosts'u en.json'dan çıkarır; blog-05/09/10/16/17 aynı anda çözülür.

### Pull-stat blokları (yazı rakam odaklı; görsel yerine tipografi)

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Pentagram case pages, Stripe annual letter, Obys 'The Big Picture'

`<Stat value="8.4%" label="retail conversions, +0.1 s" source="Deloitte" />`: Archivo 900 clamp(72px,9vw,140px), tracking -.06em, kolonu kırıp sola taşar (desktop'ta `-ml-[8vw]` veya grid full-bleed), label mono 12px dim, kaynak 11px. Reveal'da mevcut CountUp.jsx ile sayı sayar (600ms, reduced-motion'da statik). Yazı başına 2-3 adet; kapak görselinin yerini bu tipografi alır.

### Index: son yazı hero + liste satırlarında cursor'u takip eden önizleme

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive index, Studio Freight list hover, Hello Monday blog

blog-11/19'un Awwwards versiyonu. Hero = son yazı (tarih, `fit()` başlık, lede). Diğer yazılar satır listesi (tarih | başlık | etiket | süre, border-b). Hover'da fixed 320x200 önizleme (tipografik kapak veya figür) cursor'u takip eder: framer-motion useMotionValue + useSpring({ stiffness: 150, damping: 20 }), opacity 0→1 200ms, görsel değişiminde clip-path; `pointer-events-none`, `(hover: none)` cihazlarda kapalı.

### Prev/next geçişi ve View Transitions ile başlık morph

- **Etki:** orta · **Efor:** orta · **Referans:** Unseen Studio, Obys, Resn

blog-14 bloğunun üstüne: next bloğunda hover'da alt kenardan tipografik kapak 300ms translateY ile yükselir; tıklamada Next 15 `experimental.viewTransition` + `<ViewTransition name={`post-title-${slug}`}>` ile başlık yeni sayfanın h1'ine morph olur (fallback: framer-motion AnimatePresence fade 250ms). Lenis ile çakışmaması için geçiş sırasında lenis.stop().

### Gerçek yazar kimliği

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basement Studio, Studio Freight, Rauno Freiberg

Kurucu adı, rolü, kısa tek satır bio, /about'a link ve (varsa) renkli portre. Frontmatter'da `author: ad-soyad` → authors.json. Yazı başında meta satırında "By Ad Soyad", sonunda tek satır imza. JSON-LD author'ı Person olarak güncelle (Organization publisher kalır).

### Kendi kapak/OG görsel üreticisi (dış CDN'siz)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Vercel OG, Linear, Stripe Press

app/[locale]/blog/[slug]/opengraph-image.jsx içinde next/og ImageResponse: Archivo font dosyası fetch ile yüklenir, kilit rakam + başlık + tarih + ince grid; aynı bileşen sayfada inline SVG kapak olarak render edilir. Sıfır dış host, sıfır AI görsel; blog-02'nin tam karşılığı.

### Sidenote olarak kaynaklar (Tufte tarzı)

- **Etki:** orta · **Efor:** orta · **Referans:** Tufte CSS, gwern.net, Rauno Freiberg

Sources listesini korurken gövdedeki referansları `[1]` üst simgeye çevir; desktop'ta sağ marjda `position:absolute; left: calc(100% + 48px); width: 240px`, mono 12px dim, ilgili paragrafla hizalı; mobilde paragraf altında açılır satır. Boş sağ kolon anlam kazanır.

### Kopyala-link ve metin tabanlı paylaşım

- **Etki:** düşük · **Efor:** küçük · **Referans:** Linear, Raycast blog

Makale sonunda tek satır: "Copy link · Share on X · LinkedIn" (ikon yok, mono 12px). navigator.clipboard.writeText → 1.2 s "Copied". Share URL'leri intent linkleri; JS yoksa normal linkler.

### RSS/JSON feed ve okuyucu için 'kalan süre'

- **Etki:** düşük · **Efor:** küçük · **Referans:** Overreacted, Josh Comeau

app/feed.xml/route.js aynı içerik kaynağından RSS; layout'a `<link rel="alternate" type="application/rss+xml">`. Sticky meta'da okuma ilerlemesinden türeyen "3 min left" (blog-18'deki ölçüm ile aynı progress değeri). Awwwards jürisi görmez ama gerçek blog okurları fark eder.
