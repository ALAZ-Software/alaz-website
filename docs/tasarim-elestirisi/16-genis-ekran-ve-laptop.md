# Geniş ekran (1536–2560px) ve laptop aralığı (1024–1366px): kompozisyon yukarı doğru ölçeklenmiyor, max-width yok

**Boyut puanı:** 3/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 24 (3 kritik · 18 önemli · 3 ince işçilik) · **Korunacaklar:** 7 · **Eklenecekler:** 8

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Site aşağı doğru (tablet/mobil) düşünülmüş ama yukarı doğru hiç düşünülmemiş: tailwind.config.js'de yalnızca max-width breakpoint'leri var (tablet/mobile/xs), theme'deki `container` (2xl:1400) tanımı hiçbir yerde kullanılmıyor, sayfa kodunda tek bir min-width prefix'i ya da container query yok (43 `sm:/md:/lg:` eşleşmesinin tamamı kullanılmayan shadcn/ui dosyalarında) ve 902 adet sabit `[Npx]` değeri var. Sonuç: içerik genişliği 1366'da 1251px, 1920'de 1776px, 2560'ta 2416px (vw'nin %94'ü); her bölüm viewport'a yayılırken display tipografi 1600–2000px arasında clamp tavanına çarpıp büyümeyi bırakıyor. 1920→2560 arasında yazı aynı kalır, alan 640px büyür: kartlar 592→805px, proje görselleri 870→1190px, footer'daki boşluk 870→1300px, header'da nav–CTA arası 816px. Laptop tarafında sorun tersine dikey: `pt-[30vh]` yüzünden ana hero 1280–1920 arasındaki HER viewport'ta ekrandan taşıyor (1366×768'de "SCROLL TO EXPLORE" barı 131px fold altında), hero'nun dekoratif 4 kolon çizgisi 1366/1536/1920'de intro paragrafının tam içinden geçiyor ve `grid-cols-[12%_1fr_36%]`, `grid-cols-4` gibi yüzde tabanlı grid'ler 1001–1200 bandında sıkışıyor. Tasarımın gerçekten doğru göründüğü tek aralık 1366–1680; yapılması gereken bu aralığın oranlarını bir max-width shell (1600–1680px) + 12 kolon grid ile dondurmak, ardından (isteğe bağlı, asıl Awwwards yolu) Locomotive/Obys tarzı vw-bazlı rem ölçeklemesine geçmek.

## Korunması gerekenler

- Gerçek bir akışkan display-tip sistemi var: `clamp(…vw…)` + lib/fit.js'in en geniş kelimeye göre `--fit-em` hesabı sayesinde 1001–2560 arasında hiçbir büyük başlık taşmıyor/kırpılmıyor (ENGINEERING, PERMANENCE, VOCABULARY hepsi kolonuna sığıyor). Shell'e geçişte bu mekanizma sadece `--fit-avail` kaynağı değiştirilerek korunabilir — yeniden yazmayın.
- Tek bir `--gutter` token'ı 37 yerde tutarlı kullanılmış (globals.css:37). Max-width shell'e geçiş tek noktadan yönetilebilir; bu disiplin olmasaydı dönüşüm 3× pahalı olurdu.
- 1366–1680 bandı tasarımın gerçek 'sweet spot'u: kartlar 417–513px, home h1 218–269px, servis makale grid'i 150/591/450, vaka satırları 200px, intake 388/781. Bu oranlar doğru; yapılacak iş bu kompozisyonu dondurmak, yeniden tasarlamak değil (bkz. wide-1366-* ve wide-home-1536-fold.png).
- Bölüm yapısı full-bleed hairline/border-t ile kurulmuş; çizgiler ve koyu arka plan katmanları (#090909/#0e0e0e/#111/#141414) her genişlikte dikişsiz ölçekleniyor — letterbox shell'e geçerken full-bleed arka planlar + sınırlı içerik ayrımı zaten kodda hazır (section > inner div).
- Video/görsel hero'larda `object-cover` + çift gradient overlay (dikey + yatay vignette) 2560'ta bile kenar boşluğu, bant veya seam üretmiyor; kompozisyon mantığı doğru, sadece kaynak çözünürlüğü yetersiz (finding 21).
- Vaka detayındaki hero `min-h-[clamp(620px,92vh,980px)]` ve intake'teki video overlay `h-[clamp(600px,50vw,780px)]` iki eksenli clamp düşüncesinin doğru örnekleri — ana sayfa hero'sunda eksik olan tam bu yaklaşım (finding 03'te önerilen).
- Mobil için `mobile:[&_span:last-child]:max-w-[50%]` gibi eyebrow çifti kuralları var: aynı özen ≥1680 için uygulanırsa (finding 16) desen kurtarılır; fikir zaten kodda.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `gap-wide-and-laptop-viewports-01` — Sistem seviyesinde max-width ve yukarı breakpoint yok: her bölüm 2416px'e yayılıyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** tailwind.config.js:10-16 (container tanımı, hiç kullanılmıyor), tailwind.config.js:19-23 (yalnızca max-width screens), src/app/globals.css:37 (--gutter clamp 72px tavan), globals.css:176 (.fit --fit-avail = 100vw tabanlı); 37 adet `w-full px-[clamp(24px,4.2vw,72px)]` (tüm sayfalar). Ekran: gaps/home-2560-full.png, gaps/services-2560-full.png, shots/wide-2560-home-validation.png

**Sorun.** Kaynakta tek bir min-width kuralı, container query veya içerik max-width'i yok (grep: `sm:/md:/lg:/xl:/2xl:` 43 eşleşmenin hepsi src/components/ui/* shadcn dosyalarında; `@container` tek eşleşme ui/field.jsx). `--gutter` 1714px'ten sonra 72px'te sabitleniyor, içerik genişliği ölçümlerde 1100→1008px, 1366→1251, 1536→1407, 1920→1776, 2560→2416px (vw'nin %94'ü). 902 sabit `[Npx]` değeri (text-[13px], px-[35px], min-h-[400px] vb.) bu alanı doldurmuyor; sonuç 1920 üstünde her bölümde orantısız boşluk, 1680 üstünde kart/grid hücrelerinin anlamsız genişlemesi.

**Neden önemli.** Awwwards jürisi 1440×900 MacBook, 1536×864 Windows laptop ve 1920/2560 monitörle bakar. Kompozisyonun sadece 1366–1680'de tuttuğu bir site 'responsive template' hissi verir; geniş ekranda seyrelen hairline-brutalist layout tam olarak 'AI builder' sitelerinin 27" monitörde göründüğü haldir. Craft sinyali: Locomotive/Obys/Basement'ta 2560'ta kompozisyon 1440'takinin birebir aynısıdır.

**Ne yapılmalı.** 1) globals.css'e `--content-max: 1640px; --gutter: clamp(24px, 4.2vw, 96px); --content: min(100vw - 2*var(--gutter), var(--content-max));` ekleyin. 2) Bir `.shell` utility tanımlayın: `max-width: var(--content-max); margin-inline: auto; padding-inline: var(--gutter); width: 100%` ve 37 `w-full px-[clamp(24px,4.2vw,72px)]` örneğini `.shell` ile değiştirin (video/gradient/marquee/section border'ları shell dışında full-bleed kalsın; header ve footer iç kapsayıcıları da shell'e girsin). 3) `.fit` içindeki `--fit-avail: calc(100vw - 2*var(--gutter))` → `var(--content)`; page.jsx:78,101, services:151,227, case-studies:44, [slug]:112/120/128, about:75'teki `[--fit-avail:calc((100vw_-_2*var(--gutter))*…)]` override'larını `calc(var(--content)*…)` yapın. 4) Shell kenarlarına, mevcut hairline diliyle uyumlu 1px dikey sınır çizgileri (`.shell::before/after`, ≥1760px'te görünür) ekleyin ki letterbox 'bilinçli çerçeve' gibi okunsun. Alternatif/üst seviye: bkz. additions 'vw-bazlı rem canvas'.

> **Doğrulayıcı notu:** Doğruladım: tailwind.config.js:10-16 `container` (shadcn varsayılanı) hiçbir yerde kullanılmıyor; screens yalnızca max-width (19-23); `sm:/md:/lg:/xl:/2xl:` eşleşmelerinin tamamı src/components/ui/*; `@container` sadece ui/field.jsx:53; 902 adet `[Npx]`. İçerik genişliği ölçümüm: 1366→1251, 1536→1407, 1920→1776, 2560→2416, 3440→3296px. İki düzeltme: (a) gutter kapsayıcı sayısı 37 değil 36 (`px-[clamp(24px,4.2vw,72px)]`, Header'daki ikisi dahil). (b) "içerik max-width'i yok" ifadesi literal olarak yanlış: sayfa/section düzeyinde shell yok ama eleman düzeyinde 290/315/370/520/550/600/680px max-w'ler var, blog yazısı (blog/[slug]/page.jsx:94,108 → 740/720px) ve legal (LegalContent.jsx:14 → 780px) okuma kolonları zaten sınırlı. Bu fark fix için önemli: shell eklenince bu sabit max-w'ler kolon-bazlı genişliklere (`col-span` / `ch`) çevrilmezse hücre içinde yetim boşluklar sürer (bkz. 09, 12, 13, 14). 3440'ta durum daha ağır (validation kartı 1099px, proje görseli 1630×1019px, intake input 2174px); shell 3440'ta da test edilmeli. Fix somut ve doğru.

#### `gap-wide-and-laptop-viewports-02` — Ana hero kendi 4 kolon çizgisini yok sayıyor: hairline'lar metnin içinden geçiyor, intro/kicker hiçbir şeye hizalı değil

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:39 (grid-cols-4 dekoratif <i>), :45 (kicker max-w-[780px] justify-between), :46 (h1), :49 (intro max-w-[290px] mr-[9%]). Ekran: shots/wide-1536-hero-intro-crop.png, wide-1920-hero-intro-crop.png, wide-1366-hero-intro-crop.png, wide-home-1536-fold.png, gaps/home-1920-fold.png, gaps/home-2560-fold.png, wide-1001-home-fold.png

**Sorun.** Ölçümler (glyph kutuları): 1366'da çizgiler x=342/683/1025, intro paragrafı x=908–1198 → 1025 çizgisi 'mobile apps / Built with intent' satırlarının içinden geçiyor; 1536'da çizgi 1152, intro 1057–1347 → 'build' kelimesinin üstünden; 1920'de çizgi 1440, intro 1400–1690 → 'web apps'in üstünden; 1001'de çizgi 750, intro 588–878. Sadece 2560'ta kaçıyor (1983 vs çizgi 1920; 63px sağında, yine hizasız). h1 'ALAZ.' da çizgileri kesiyor: 1366'da 683 çizgisi Z'nin ortasından, 1920'de 960 çizgisi gri noktanın içinden, 2560'ta 640 ikinci A'nın içinden. Kicker'daki '— 001 / 005' sayacı sabit 780px flex kutusu yüzünden her genişlikte x≈773–883'te duruyor (hiçbir çizgiyle çakışmıyor). İntro `mr-[9%]` ile sağ gutter'dan 136 (1100) → 287px (2560) içeride, h1/tagline ile ilişkisiz bir yerde yüzüyor.

**Neden önemli.** Dekoratif grid çizip içeriği ona oturtmamak jürinin ilk fark ettiği şeydir: 'grid overlay' AI/template sitelerin imzasıdır, gerçek stüdyolarda (Basement, Unseen, Resn) çizgiler layout'un kendisidir. Metnin üzerinden geçen bir çizgi doğrudan craft hatası olarak okunur.

**Ne yapılmalı.** Hero içeriğini çizgilerle aynı grid'e koyun: `.hero-inner { display:grid; grid-template-columns: repeat(4, 1fr); column-gap: 0 }` ve çizgileri de aynı grid'in `border-r`'ı yapın (ayrı absolute katman yerine). h1 `col-span-4`; tagline `col-start-1 col-span-2 pl-[1.2vw]`; intro `col-start-4` + `max-w-[min(100%,34ch)] pl-[clamp(16px,2vw,40px)]` (çizginin hemen sağına, gutter kadar içeride); kicker sayacı `col-start-3` ya da `col-start-4`'ün başına. Çizgi sayısını shell'le uyumlu 12 kolona çıkarıyorsanız 4'ünü vurgulu, 8'ini daha silik verin. Alternatif: çizgileri tamamen kaldırın; bu durumda intro'yu tagline ile aynı baseline'a `grid-cols-[1fr_auto]` ile bağlayın.

#### `gap-wide-and-laptop-viewports-03` — Ana hero dikeyde hiçbir laptop'a sığmıyor (pt-[30vh]); 2560'ta ise 550px üst boşluk

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:40 (min-h-dvh pt-[100px]), :41 (topline pt-[35px]), :44 (`my-auto pt-[30vh] pb-[2vh]`), :47 (mt clamp 85px), :51 (PoweredBy mt 56px), :53 (alt bar pt-26 pb-31). Ekran: wide-home-1366-fold.png (tagline kesik, powered-by ve alt bar yok), wide-home-1536-fold.png, gaps/home-1920-fold.png (alt bar 1037'de, viewport 1080), gaps/home-2560-fold.png

**Sorun.** Ölçülen hero yüksekliği / alt bar üstü: 1280×720 → 860/782, 1366×768 → 899/821, 1440×900 → 961/884, 1536×864 → 976/899, 1680×1050 → 1072/995, 1920×1080 → 1114/1037. Yani 'SCROLL TO EXPLORE / PRECISION IS THE STANDARD / 01 / 05' alt barı 1280–1920 arasındaki HER yaygın viewport'ta fold'un altında; 1366×768'de tagline'ın altı kesik, POWERED BY satırı görünmüyor. `min-h-dvh` vaadi (tek ekranlık çerçeveli hero) kırılıyor çünkü `pt-[30vh]` (230px@768) + 100px header + 35px topline + h1 (175–246px) + 85px + tagline + 56px + 19px + 77px bar toplamı 768–1080'i aşıyor. 2560×1440'ta ise tam tersi: hero tam 1440, h1 y=714–970'te (merkez %58'de), topline (y≈143) ile kicker (y≈695) arasında 550px boşluk.

**Neden önemli.** Hero'nun alt barı tasarımın 'çerçeve' fikrinin yarısı; jürinin %70'i tam olarak bu 1366–1920 bandında bakar ve hero'yu çerçevesiz, altı kesik görür. Bir viewport yüksekliğine göre kurgulanmış hero'nun o yüksekliğe sığmaması temel bir layout hatasıdır.

**Ne yapılmalı.** `pt-[30vh]` ve `my-auto`'yu kaldırın; hero iç kapsayıcıyı `grid grid-rows-[auto_1fr_auto] min-h-[100svh]` yapın (topline / içerik / alt bar). Orta blok `self-end pb-[clamp(16px,3vh,48px)]`. h1 boyutunu iki eksenden sınırlayın: `[--fit-size:min(clamp(90px,16vw,320px),26svh)]` (768'de ≈200px, 1440'ta 320). Tagline+intro+powered yığınını `gap-[clamp(20px,3vh,56px)]` ile sıkıştırın. Kontrol: 1366×768, 1440×900, 1536×864, 1920×1080'de alt barın `bottom <= innerHeight` olduğunu Playwright ile assert edin. 2560 için: orta bloğu `self-center` değil, h1'i üst çeyreğe yaklaştıran `grid-rows-[auto_minmax(0,1fr)_auto_auto]` kurgusu (kicker+h1 1fr'nin üstünde, tagline/intro altında) ile üst boşluğu bölün.

### ÖNEMLİ

#### `gap-wide-and-laptop-viewports-04` — Display clamp tavanları 1600–2000px'te biterken alan büyümeye devam ediyor: tip/alan oranı 1920→2560'ta çöküyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** page.jsx:46 (`clamp(90px,16vw,320px)` → 2000px'te tavan), :78/:97/:135 (`clamp(64px,10.5vw,180px)` → 1714), :191 (`clamp(80px,12.5vw,200px)` → 1600); services/page.jsx:82 (`clamp(67px,12.4vw,205px)` → 1653), :106/:203/:227 (`clamp(48px,8vw,130px)` → 1625); case-studies/page.jsx:36 ve blog/page.jsx:36 (`clamp(84px,16vw,270px)` → 1688); about/page.jsx:43 (205 → 1653); IntakeForm.jsx:108 (190 → 1624); Footer.jsx:16 (320 → 2000). Ekran: gaps/home-1920-fold.png vs gaps/home-2560-fold.png, gaps/services-1920-fold.png vs services-2560-fold.png

**Sorun.** Ölçümler: home h1 glyph genişliği 1920'de 931px (içeriğin %52'si), 2560'ta 969px (%40); VALIDATION h2 1127px → 1920'de %63, 2560'ta %47; CORE CAPABILITIES 1271px → %72 → %53; START PROJECT h2 977px → %55 → %40; services h1 205px sabit (1653'ten itibaren), 'THE WORK' 270px sabit (1688'den itibaren). Yani 1680–2560 arasında display yazı aynı kalırken satır genişliği %45 artıyor; tasarımın 'tip alanı doldurur' fikri geniş ekranda bozuluyor. Gövde (13px) ve mono (12px) hiç büyümediği için 2560'ta h1:gövde oranı 24.6:1 (1024'te 12.6:1).

**Neden önemli.** Clamp'ın üst sınırı 'bundan büyük yazı istemiyorum' demek; ama alanı da sınırlamayınca yazı küçük kalmış gibi görünür. Awwwards sitelerinde ya canvas ölçeklenir (yazı+alan birlikte) ya da alan kilitlenir (shell). İkisi de yapılmayınca 1920/2560'ta 'ortasında küçük bir site olan büyük siyah ekran' çıkıyor.

**Ne yapılmalı.** Finding 01'deki shell ile tavanlar anlamlı hale gelir (1640 shell'de 16vw ≈ 262px, h1 glyph ≈ %55). Shell istemiyorsanız: tüm `clamp(…vw…)` değerlerini `cqi` tabanlı yazın (section'lara `container-type: inline-size`): `clamp(90px,16cqi,420px)` ve tavanları 2560 için 1.3× yükseltin (320→420, 205→270, 180→235, 130→170). Gövde için `--text-body: clamp(13px, 0.82vw + 1px, 16px)`, mono `clamp(11px, 0.62vw + 1px, 13px)` ve `text-[13px]`→`text-[length:var(--text-body)]` değişimi (ayrı finding 20).

#### `gap-wide-and-laptop-viewports-05` — 3 kolon kartlar (testimonial / servis) ≥1680'de 513–805px genişliğe çıkıp 13px kopya taşıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:80-89 (validation `grid-cols-3`, blockquote clamp 20px, min-h-385), :98-103 (services `grid-cols-3`, h3 clamp 48px, `p text-[13px] max-w-[315px]`). Ekran: shots/wide-2560-home-validation.png, wide-2560-home-services-hover.png, gaps/home-2560-full.png; kıyas: wide-1366-home-services.png, wide-1366-home-validation.png

**Sorun.** Ölçülen kart genişlikleri: 1366→417, 1536→469, 1680→513, 1920→592, 2560→805px. 2560'ta alıntı satırı 770px (20px Inter'de ≈95 karakter; optimum 45–75), iki satırda bitiyor ve altında 150px boşluk kalıyor (min-h 385 sabit). Servis kartında 13px paragraf `max-w-[315px]` ile kartın %39'unu kaplıyor, h3 48px tavanda; kartın 490px'i boş. Hover arka planı (#141414) 805×400px'lik boş bir dikdörtgeni yakıyor.

**Neden önemli.** Kart içi tipografik ölçek (12px mono / 13px gövde / 48px h3) 420–520px kart için kurulmuş; 800px'de 'içi boş kutu' hissi, satır uzunluğu okunabilirlik sınırını aşıyor. Geniş ekranda bu bölüm bir 'placeholder grid' gibi görünüyor.

**Ne yapılmalı.** Shell (1640) ile kartlar 1536'daki gibi ≈485px'e kilitlenir (yeterli). Shell'siz alternatif: ≥1680'de `grid-cols-[repeat(3,minmax(0,520px))] justify-between` + aradaki boşluğu hairline ile doldurun; alıntı `max-w-[32ch]`, servis paragrafı `max-w-[36ch] text-[length:var(--text-body)]`; `min-h` yerine `aspect-ratio: 4/3` (kart büyüdükçe orantılı büyür, boşluk hissi yerine 'poster' hissi).

#### `gap-wide-and-laptop-viewports-06` — 2 kolon proje kartları ≥1680'de 751–1190px: 744px yüksekliğinde görsel, altında 13px caption

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:142-181 (`grid-cols-2 gap-x-[36px]`, `aspect-[16/10]`, h3 `clamp(22px,2.2vw,34px)`, `p text-[13px] line-clamp-2`, `sizes="(max-width: 768px) 100vw, 50vw"`); kaynak görseller public/projects/*/cover.* 1920×1200. Ekran: shots/wide-2560-home-work-hover.png, gaps/home-2560-full.png; kıyas wide-1366-home-work.png

**Sorun.** Kart genişliği 1366→608, 1536→686, 1920→870, 2560→1190px; görsel yüksekliği 2560'ta 744px (viewport'un %52'si). Başlık 34px tavanda, özet 13px: 1190px'lik görselin altında 2 satır 13px — oran 1:57. Görsel kaynağı 1920px; DPR 2 ekranlarda (5K iMac 2560 CSS px) `sizes=50vw` → 2560px istenir, 1920 upscale olur (1.33×), 'Market Hours' ekran görüntüsündeki ince mono yazılar yumuşar.

**Neden önemli.** Proje kartı Awwwards'ta en çok incelenen bileşen; devasa görsel + minicik caption 'görsel var ama tasarım yok' okur. Yumuşak görsel craft puanı düşürür.

**Ne yapılmalı.** Shell ile kart ≈800px'e kilitlenir. Ayrıca ≥1680'de 12 kolonda `col-span-5` + `col-span-5` ve aralarında `col-span-2` boşluk (Obys/Basement 'offset grid'); ya da ikinci kartı `mt-[12vh]` ile kaydırıp editoryal ritim verin. Caption'ı 15–16px'e çıkarın (`--text-body`). Görsel: 2560px genişliğinde cover üretin (public/projects/*/cover@2x), `sizes="(min-width:1680px) 820px, (max-width:768px) 100vw, 50vw"` ile boyut isteklerini sınırlayın.

#### `gap-wide-and-laptop-viewports-07` — Footer: 320px'te kilitlenen wordmark ile sağa yapışık 230px iletişim bloğu arasında 420→1300px boşluk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Footer.jsx:14 (`flex items-end justify-between`), :16 (wordmark `clamp(90px,16vw,320px)`), :19 (ContactInfo, `flex-col` 12px), :21-27 (alt satır). Ekran: shots/wide-2560-home-footer.png, gaps/home-2560-full.png, wide-2560-services-cta.png

**Sorun.** Wordmark glyph genişliği 1366→652px (içeriğin %52'si), 1920→917 (%52), 2560→955px (%40, tavan). İletişim kolonu x=1078 (1366) → 1618 (1920) → 2258 (2560), genişlik 230px sabit. Aradaki boşluk 1366'da ≈420px, 1920'de ≈870, 2560'ta ≈1300px. Alt satırda copyright (sol), 3 link (orta), back-to-top (sağ) 2416px'e yayılmış 12px mono.

**Neden önemli.** Footer wordmark'ı 'site kapanışı' olarak çalışmak için alanı doldurmalı (Obys, Basement, Locomotive footer'ları); 2560'ta sol alt köşede küçük bir logo ve sağ üst köşede adres bloğu kompozisyon değil tesadüf gibi duruyor.

**Ne yapılmalı.** Wordmark'ı `.fit` sistemine alın: `style={fit('ALAZ.')}` + `[--fit-size:40vw] [--fit-avail:var(--content)]` ile shell'i tam dolduran 'ALAZ.' (letter-spacing -.04em) — her genişlikte aynı oran. Footer'ı 12 kolon grid'e alın: wordmark `col-span-12`, e-posta `col-span-4`, ofisler `col-start-7 col-span-3` / `col-start-10 col-span-3` (ContactInfo'da `flex-col` yerine `contents`). Alt satır: linkleri copyright'ın hemen sağına (`gap-[48px]`), back-to-top sağda.

> **Doğrulayıcı notu:** Konumlar doğru: iletişim bloğu x=1078 (1366) / 1618 (1920) / 2258 (2560), 230px sabit; wordmark 320px tavanda (2000+). Boşluk rakamları abartılı: wordmark sağ kenarı → blok 1366'da 368px (420 değil), 1920'de 629px (870 değil), 2560'ta 1231px (1300 değil). Sorunun özü aynı (sk-2560-home-footer.png: sol altta logo, sağ üstte adres, arada 1.2k px). Fix notu: `.fit` ile ALAZ. (fit-em ≈3.1) 1640 shell'de ≈525px font / ≈420px yükseklik olur — bilinçli bir Obys/Basement kapanışı, uygulanabilir; footer'ı 12 kolona alma önerisi doğru.

#### `gap-wide-and-laptop-viewports-08` — Header `grid-cols-[1fr_auto_1fr]`: nav ortada, CTA 816px uzakta, 12px linkler 2416px'lik barda kayboluyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:28 (grid), :30 (nav `gap-[clamp(26px,3.2vw,52px)]`, 52px'te tavan 1625'ten itibaren), :36-38 (TR + CTA justify-self-end), :27 (h-76 sabit). Ekran: gaps/home-2560-fold.png, gaps/services-2560-fold.png, gaps/home-1920-fold.png

**Sorun.** Ölçüm 2560: logo x=72, nav x=1085–1476, TR x=2233, CTA x=2292–2488 → logo→nav 1013px, nav→CTA 816px. 1920: 693px / 496px. Nav link'leri 12px mono, header 76px sabit; 2560'ta bar yüksekliği viewport'un %5'i, link'ler 'piksel'. Nav gap 52px tavanında (1625+), yani 4 link toplam 391px — bar genişliğinin %15'i.

**Neden önemli.** Header, tüm sayfalarda jürinin ilk gördüğü bileşen; üç kümenin arasındaki 800–1000px'lik boşluklar 'ölçeksiz' hissini anında verir. Awwwards sitelerinde header ya shell'e kilitlidir ya da iki kümeye (sol: logo+nav, sağ: lang+CTA) ayrılır.

**Ne yapılmalı.** Header iç kapsayıcıyı `.shell`e alın (1640 → nav–CTA 400px'e düşer). Ek olarak ≥1680'de: `h-[clamp(76px,5vw,96px)]`, link `text-[length:clamp(12px,0.7vw,14px)]`. Daha güçlü seçenek: `grid-cols-[auto_1fr_auto]` + nav'ı logo kümesine (`ml-[clamp(40px,4vw,96px)]`) alın; böylece ilişki her genişlikte korunur ve sağdaki CTA tek başına 'köşe' olur. Nav'ın altına aktif sayfa için 1px underline ekleyin ki uzaktan okunsun (mevcut sadece renk).

#### `gap-wide-and-laptop-viewports-09` — Servis makale grid'i `grid-cols-[12%_1fr_36%]`: 2560'ta 870px'lik 14px aside, 1001–1100'de 110–121px'lik etiket kolonu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:140 (grid), :142-147 (12px etiketler), :151 (h2 `clamp(30px,4.5vw,60px)` + fit avail %52), :154-169 (`max-w-[600px]` kopya), :172-189 (aside 14px). Ekran: shots/wide-2560-services-article-hover.png, wide-1001-services-article.png, wide-1100-services-article.png; kıyas wide-1366-services-article.png

**Sorun.** Ölçülen kolonlar: 1001 → 110/417/330, 1100 → 121/464/363, 1366 → 150/591/450, 1920 → 213/864/639, 2560 → 290/1196/870px. 2560'ta IDEAL FIT satırı 'Founders launching serious MVPs, or teams replacing brittle legacy tools and messy spreadsheet workflows.' tek satır ≈700px (14px'te ≈120 karakter); orta kolonda `max-w-[600px]` kopya ile sağında 596px boş; h2 60px tavanda. 1001–1100'de 12% kolon 'WEB / FULL-' / 'STACK' diye 2–3 satıra kırılıyor, h2 45–50px'te 3 satır, aside 330px. Hover arka planı 2416×530px'lik alanı dolduruyor.

**Neden önemli.** Yüzde tabanlı kolonlar hem küçükte hem büyükte aynı anda bozulur; 12% bir etiket için 1100'de dar, 2560'ta 290px'lik israf. Servisler sayfası stüdyonun ne sattığını anlatan en uzun sayfa — burada satır uzunluğu/okunabilirlik kırılırsa jüri 'içeriğe de bakılmamış' der.

**Ne yapılmalı.** Grid'i mutlak+oranlı karışık yapın: `grid-cols-[clamp(88px,8vw,160px)_minmax(0,1fr)_minmax(300px,34%)]`; ≤1200 için `laptop:grid-cols-[88px_1fr]` + aside'ı `col-start-2` altına (veya yan yana iki kolon: meta+content / aside). Aside kopyası `max-w-[44ch]`; orta kolon `max-w-[62ch]`. ≥1680'de shell ile 2560'ta kolonlar ≈150/900/560'a oturur. Sticky meta: sol kolon `sticky top-[100px]` (uzun makalede numara ve kategori görünür kalır — Locomotive/Studio Freight hizmet sayfası deseni).

#### `gap-wide-and-laptop-viewports-10` — Süreç grid'i `grid-cols-4`: 1001–1100'de 207–229px kolonda sabit 24px başlıklar kırılıyor, 2560'ta 582px kolonda 100 karakterlik satırlar

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:209-217 (`grid grid-cols-4 gap-[30px]`, h3 `text-[24px]` sabit, p `text-[15px]`, `pr-[10px]`). Ekran: shots/wide-1001-services-process.png, wide-1100-services-process.png, wide-2560-services-process.png; kıyas wide-1366-services-process.png

**Sorun.** Kolon genişliği 1001→207, 1100→229, 1366→290, 1920→422, 2560→582px. 1001–1100'de 'System / Blueprint', 'Iterative / Execution', 'Production / & Handover' hepsi iki satır, 15px gövde 197–219px'te ≈25 karakterlik satırlar (6–7 satır). 2560'ta 582px kolonda 15px gövde 2 satır (≈100 karakter), altında 150px+ boş; dört başlık 24px tavanda, 'HOW WE OPERATE' h2 130px — oran 5.4:1.

**Neden önemli.** Dört eşit kolon 290–420px bandı için kurulmuş; dışında hem başlık hem gövde ölçeği yanlış. Sabit 24px h3 hiçbir genişliğe uymuyor.

**Ne yapılmalı.** ≤1200 (laptop breakpoint ya da `@container (max-width: 1100px)`): `grid-cols-2 gap-x-[40px] gap-y-[48px]`. h3 `text-[length:clamp(20px,1.6vw,28px)]`; p `max-w-[34ch]`. ≥1680: shell ile 2560'ta kolon ≈360px. Alternatif editoryal çözüm: 4 adımı yatay numaralı satırlar (`01 — Deep Discovery — …`) olarak `grid-cols-[80px_1fr_2fr]` ile dizin; geniş ekranda satır formatı kolondan daha iyi ölçeklenir (about sayfasındaki process ile de tutarlı olur).

> **Doğrulayıcı notu:** Kolonlar ve kırılmalar doğru: 1001→207px (h3 4 maddenin 3'ünde 2 satır, gövde 6–7 satır), 1100→229px (2 maddede h3 2 satır), 1366→290, 1920→422, 2560→582px (gövde 2–3 satır, ≈100 karakter). Yanlış olan: '2560'ta altında 150px+ boş' — `li` yüksekliği içerik kadar (219px), min-h yok; satırlar arası fark en fazla ~25px (sk-2560-services-faq.png üst kısmı). 2560'taki asıl sorun satır uzunluğu ve sabit 24px h3 / 130px h2 oranı (5.4:1). Fix (≤1200 iki kolon, clamp h3, `max-w-[34ch]`, ya da yatay satır formatı) doğru.

#### `gap-wide-and-laptop-viewports-11` — FAQ başlığında '&' 1280–1920'nin tamamında tek başına satıra düşüyor (fit() kelime bazlı); 2560'ta 1285px cevap kolonu

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/services/page.jsx:226 (`grid-cols-[1fr_1.2fr] gap-[60px]`), :227-232 (h2 fit(faqTitle) + `--fit-avail` /2.2), :233-243 (details, `+` justify-between, cevap `max-w-[620px]`); src/lib/fit.js:28-32 (en geniş KELİME'ye göre hesap). Ekran: shots/wide-1536-faq-heading.png, wide-1920-faq-heading.png, wide-1366-services-faq.png (4 satır: QUESTIONS / & / PRACTICAL / ANSWERS.); kıyas wide-2560-services-faq-open.png (3 satır)

**Sorun.** fit() yalnızca 'QUESTIONS' kelimesinin kolona sığmasını garanti ediyor; 'QUESTIONS &' (+1.2em) 1280 (506px kolon), 1366 (541), 1536 (612), 1680 (672), 1920 (780) kolonlarının hiçbirine sığmıyor → '&' tek başına ikinci satır, başlık 4 satır. Sadece 2560'ta (1071px kolon) 'QUESTIONS &' bir araya geliyor. 2560'ta sağ kolon 1285px: 18px soru metni solda, '+' işareti 1200px sağda; cevap `max-w-[620px]` ile kolonun yarısında bitiyor.

**Neden önemli.** Yalnız kalan '&' klasik bir widow; 130px'lik display yazıda bu hata jüri ekranında 'tipografi kontrol edilmemiş' demektir. Soru satırının iki ucu 1.2k px ayrıysa accordion affordance'ı kaybolur.

**Ne yapılmalı.** Kısa vadede en.json'daki faqTitle satırlarını 'QUESTIONS' / '& PRACTICAL' / 'ANSWERS.' olarak bölün (fit() yine 'PRACTICAL'e göre hesaplar, '&' güvende). Kalıcı: fit()'i satır bazlı yapın — `fit(lines)` içinde `Math.max(...lines.map(lineEm))` (kelimeler arası boşluk 0.28em ekleyerek) ve h2'ye `text-wrap: balance`. Kolon: `grid-cols-[5fr_7fr]` + details listesine `max-w-[780px]` ve '+' ikonunu `ml-auto` yerine sabit `w-[32px]` sütunda tutun (`grid-cols-[1fr_32px]`). ≥1680'de shell ile sağ kolon ≈860px'e düşer.

> **Doğrulayıcı notu:** Doğruladım: 1001/1024/1100/1280/1366/1440/1536/1680/1920'de 'QUESTIONS &' iki satıra kırılıyor ('&' tek başına, 50–101px'lik ikinci satır) → başlık 4 satır; 2560'ta 3 satır (sk-2560-services-faq.png), 3440'ta 2. fit.js:29-30 en geniş KELİME'ye göre hesaplıyor — teşhis doğru. Sağ kolon 2560'ta 1285px, '+' x=2477, soru metni 1203–1639 → 838px boşluk; cevap 620px. Fix düzeltmesi: en.json'daki faqTitle'ı 3 satıra bölmek tek başına çalışmaz — services/page.jsx:228-231 `faqTitle[0]`/`[1]` ile yalnızca iki satır render ediyor ('ANSWERS.' kaybolur); JSX'i blog/page.jsx:37'deki gibi `faqTitle.map(...)` ile satır sayısından bağımsız yapın. `text-wrap: balance` zaten globals.css:155'te h1–h6'da var; `<br/>`'lı başlıklarda etkisi yok, kalıcı çözüm satır bazlı fit().

#### `gap-wide-and-laptop-viewports-12` — About 'origin' bölümü: 680px paragraf ile sağa yapışık 230px tanım notu arasında 98→1506px boşluk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:55 (`flex justify-between items-start gap-[60px]`), :56 (`max-w-[680px]`), :59 (`max-w-[230px] shrink-0`). Ekran: shots/wide-2560-about-origin.png, gaps/about-2560-fold.png (alt), gaps/about-1920-fold.png

**Sorun.** Ölçüm: tanım notu x=824 (1100) → 1079 (1366) → 1242 (1536) → 1618 (1920) → 2258 (2560); paragraf kolonu her zaman x=gutter, 680px. Boşluk 98 → 342 → 497 → 866 → 1506px. 2560'ta 15px'lik 4 satırlık not sağ üst köşede tek başına; `items-start` olduğu için paragrafın ilk satırıyla aynı hizada değil (ekranda not y≈355, paragraf y≈362 — neredeyse ama sağ köşede ilişkisiz).

**Neden önemli.** 'Marginal note' deseni ancak notun ana metne bitişik olduğu yerde çalışır (editoryal dergi düzeni). 1.5k px uzağa düşünce içerik iki yetim bloğa bölünüyor.

**Ne yapılmalı.** 12 kolon: paragraflar `col-start-1 col-span-7`, not `col-start-9 col-span-3` (shell ile 2560'ta aralık ≈120px'e iner, içerikle birlikte hareket eder). Ya da notu `grid-cols-[1fr_minmax(200px,260px)] gap-[clamp(48px,6vw,120px)]` ile paragrafın hemen sağına bağlayın ve `justify-between`'i kaldırın. Not'un ilk satırını paragrafın cap-height'ına `mt-[0.35em]` ile hizalayın.

#### `gap-wide-and-laptop-viewports-13` — About süreç satırları `grid-cols-[15%_1fr_32%]` + `max-w-[370px]`: paragraf sağ gutter'a 403px kala bitiyor, başlık kolonunda 800px boşluk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/about/page.jsx:75 (article grid, h3 fit avail %53, `p max-w-[370px]`). Ekran: shots/wide-2560-about-process.png, wide-1100-about-process.png

**Sorun.** Ölçülen kolonlar 2560: 362 / 1231 / (773 kolon içinde 370px p) → paragraf x=1715–2085'te bitiyor, sağ gutter 2488 → 403px tanımsız boşluk; 'DISCOVER' 65px tavanda ≈400px, 1231px kolonun 2/3'ü boş; '01 / 04' etiketi için 362px. 1100'de: 151 / 484 / 322 — etiket kolonu 151px (12px metin için 12×), başlık 46px.

**Neden önemli.** Satır formatı doğru fikir (geniş ekranda ölçeklenir) ama kolon oranları yüzdeyle verilince hem etiket hem paragraf 'hiçbir kenara yaslanmayan' yerlerde kalıyor; `max-w` paragrafı hücrenin içinde bir daha yetim bırakıyor.

**Ne yapılmalı.** `grid-cols-[clamp(64px,6vw,120px)_minmax(0,1fr)_minmax(300px,30%)]`; paragraf `max-w-none` (hücre zaten sınırlı) ya da `justify-self-end max-w-[42ch]` ile sağ gutter'a yaslayın. Başlık h3 `[--fit-size:clamp(32px,5vw,96px)]` ile orta kolonu daha çok doldursun (2560'ta 96px), `--fit-avail` kolon genişliğinden gelsin (`calc(var(--content)*.55)`). ≤1200: `grid-cols-[56px_1fr]` + paragraf `col-start-2` altına.

#### `gap-wide-and-laptop-viewports-14` — Vaka detayı: challenge/approach/outcome grid'inde 663px boşluk, galeri 589×1047px tile'lar (tek satır tüm viewport), 805px'lik marker kutuları

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:109-131 (`grid-cols-2 gap-[50px]`, h2 clamp 80px, p `max-w-[520px]`), :139-145 (galeri `grid-cols-4 gap-[20px] aspect-[9/16]`, `sizes=25vw`, kaynak 1080×1920 webp), :149-156 (markers `grid-cols-3 min-h-[145px]`, 15px strong), :86 (hero `min-h-[clamp(620px,92vh,980px)]`). Ekran: shots/wide-2560-case-challenge.png, wide-2560-case-gallery.png, gaps/case-vocabulary-2560-fold.png

**Sorun.** 2560: sol kolon 1183px (h2 80px tavan ≈500px glyph → 680px boş), sağ kolon p x=1305–1825 (520px) → sağda 663px tanımsız boşluk; p 22px tavanda. Galeri 7 tile × 589×1047px → 2 satır = ~2.2k px yükseklik, ilk satır 1440px'lik viewport'u tek başına dolduruyor; 1080px'lik webp 2560 DPR1'de 589px'e küçülüyor (iyi) ama DPR2'de 1178px istenir, 1080 upscale. Markers: 3 × 805×145px kutu, içinde 15px 'Flutter' gibi tek kelime.

**Neden önemli.** Vaka sayfası Awwwards jürisinin 'işi görelim' dediği yer; 2560'ta galeri bir app-store duvarına, metin bölümleri ise yarı boş tablolara dönüşüyor. Ritim ve ölçek kontrolü yok.

**Ne yapılmalı.** Shell ile metin grid'i düzelir; ek olarak p `max-w-none` + `col-start-2` ya da `grid-cols-[5fr_7fr]` ile paragrafın gutter'a yaslanması. Galeri ≥1680'de: yatay scroll-snap şerit (`flex overflow-x-auto snap-x`, tile `w-[clamp(240px,18vw,360px)]`, Lenis horizontal ya da native) — Studio Freight/Locomotive vaka galerisi deseni; ya da `grid-cols-[repeat(auto-fill,minmax(240px,1fr))]` + `max-w` 1200. Markers: `flex flex-wrap gap-x-[40px]` inline satır (kutu değil). Hero `min-h` tavanını 980'de tutun ama 2560'ta `max-h-[72vh]` ekleyin ki görsel 'fold'u yemesin.

> **Doğrulayıcı notu:** Metin grid'i doğru: 2560'ta 1183/1183, h2 80px tavan (glyph 553–672px), p 520px x=1305–1825 → sağda 663px. Galeri 589×1047px tile, 7 tile 2 satır — ama ilk satır viewport'un %73'ü (1047/1440), 'tek başına dolduruyor' abartılı. DPR2'de galeri upscale 1080→1178 ≈1.09×, pratikte fark edilmez; proje kapaklarındaki (06) upscale daha önemli. Markers 805×150px ✓. Fix'teki 'hero'ya 2560'ta `max-h-[72vh]` ekleyin' gereksiz: `min-h-[clamp(620px,92vh,980px)]` tavanı 980px zaten 2560×1440'ta %68vh (ölçüm heroH=980). Galeri için yatay scroll-snap / `auto-fill` ve markers için inline satır önerileri doğru.

#### `gap-wide-and-laptop-viewports-15` — Vaka indeksi: `grid-cols-[15%_1fr_25%_50px]` + sabit 220px hover preview scope etiketinin üstüne biniyor; 1366/1536'da MARKET HOURS iki satıra kırılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:41-42 (grid), :44 (h2 fit avail %60), :45 (scope span), :47 (preview `absolute right-[10%] w-[220px] h-[130px]`). Ekran: shots/wide-2560-cs-row-hover.png (görsel 'LANGUAGE LEARNING / IOS'un üstünde), wide-1366-cs-row-hover.png ('LA…ROID' — etiket neredeyse tamamen örtülü; MARKET / HOURS 2 satır, satır 279px), wide-case-studies-1536-fold.png

**Sorun.** Kolonlar 2560: 362 / 1400 / 604 / 28 — '01 /' için 362px. Preview `right-[10%]` → x=2026 (2560), x=964 (1366): her iki genişlikte de scope metninin (`25%` kolonu x=1834 / x=946) üstünde. `--fit-avail` %60 olduğu için 1366'da 'MARKET HOURS' 93px'te 701px kolona sığmıyor → 2 satır, satır yüksekliği 279 vs ilk satır 200 (1536'da 298; 1680'den itibaren tek satır). 2560'ta 105px tavanlı iki başlık 200px'lik satırlarda tablo gibi.

**Neden önemli.** Preview'ın sabit konumla etiketin üstüne binmesi doğrudan bug; satır yüksekliklerinin tutarsızlığı liste ritmini bozuyor. Bu liste sitenin 'work' giriş kapısı.

**Ne yapılmalı.** Preview'ı cursor-following yapın (framer-motion `useMotionValue` + `useSpring`, görsel `fixed pointer-events-none`, 0.12s lerp; Locomotive/The Index deseni) ya da kendi hücresine alın: `grid-cols-[clamp(56px,6vw,120px)_1fr_minmax(220px,22%)_minmax(200px,16%)_48px]` ve preview 4. hücrede `w-full aspect-[16/10]`. Preview boyutu `w-[clamp(220px,14vw,380px)]`. Satır: `min-h-[clamp(200px,14vw,320px)]`; başlık `[--fit-avail:calc(var(--content)*.62)]` ve 1280–1600 arasında `[--fit-size:clamp(48px,6vw,105px)]` (6vw ile 1366'da 82px → tek satır).

#### `gap-wide-and-laptop-viewports-16` — 'justify-between çifti' deseni geniş ekranda kopuyor: eyebrow'lar 2416px, intro/not çiftleri 1800px, overview paragrafı 1200px arayla

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** 37 eyebrow satırı (ör. page.jsx:77,96,130,188; services/page.jsx:75-78,101-104; about/page.jsx:41,52,73; blog/page.jsx:31); hero intro+not çiftleri: services/page.jsx:88-95, case-studies/page.jsx:37, about/page.jsx:44, blog/page.jsx:39-42; services overview: services/page.jsx:105-113 (`max-w-[340px]` 15px paragraf sağda). Ekran: gaps/services-2560-fold.png, gaps/about-2560-fold.png, gaps/blog-2560-fold.png, gaps/case-studies-2560-fold.png

**Sorun.** Ölçüm 2560: eyebrow sol x=72 (164px), sağ x=2340 (148px) → 12px mono iki parça 2.1k px arayla; '01 / EXTERNAL SIGNAL … TESTIMONIALS // 03' tek satır olarak okunmuyor. Services hero: 27px intro `max-w-[550px]` sol altta, 'ALAZ / CAPABILITIES 2026' sağ altta x≈2290. Overview: 130px 'WHAT WE ACTUALLY DO.' + 340px'lik 15px paragraf x=2076'da (1200px gap). 1920'de aynı desen 1.5k px arayla. Mobilde `max-w-[50%]` kuralı var (mobile:[&_span:last-child]) ama ≥1680 için hiçbir kural yok.

**Neden önemli.** Bu çiftler tasarımın 'teknik dosya' dilinin omurgası; ekran genişleyince çift olmaktan çıkıp köşelere atılmış etiketlere dönüşüyor. 12px mono 2560'ta zaten sınırda okunur.

**Ne yapılmalı.** Shell ile 1640'a iner (hâlâ 1.5k). Ek: ≥1680'de eyebrow'ları iki kümede tutun ama sağdakini 'index/sayaç' olarak bırakıp (`01 / 05` gibi 6 karakter) açıklamayı sola taşıyın: `<span>01 / EXTERNAL SIGNAL <span class="text-[#555] ml-[32px]">TESTIMONIALS // 03</span></span>`. Hero intro+not: ≥1680'de `grid-cols-12`, intro `col-span-6`, not `col-start-8 col-span-2` (sağ köşe değil, intro'nun yanında). Overview paragrafı `col-start-8 col-span-4` + `max-w-[40ch]`. Mono boyutu `clamp(11px,0.62vw+1px,13px)`.

#### `gap-wide-and-laptop-viewports-17` — Ana sayfa START PROJECT bölümü: 2560'ta 977px'lik ortalanmış ada, 1440 viewport'ta %51 yükseklik, köşelere atılmış eyebrow'lar

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:184-208 (`min-h-[680px]`, `text-center m-auto`, h2 `clamp(80px,12.5vw,200px)` → 1600'de tavan, p `text-[14px]`, buton 260px). Ekran: shots/wide-2560-home-contact.png, gaps/home-2560-full.png; kıyas gaps/home-1280-fold.png bölümü

**Sorun.** Ölçüm: h2 glyph genişliği 1366→834 (%67), 1536→938 (%67), 1680+→977px sabit (2560'ta %40). Bölüm yüksekliği 680–736px; 2560×1440'ta viewport'un %51'i, sağda/solda 700'er px boş. 14px'lik tek satır paragraf ve 260px buton 977px'lik başlığın altında minik; eyebrow 'COMMAND SEQUENCE READY' rozeti ve '04 / INITIATE … READY WHEN YOU ARE' 2416px arayla.

**Neden önemli.** Son CTA bölümü dönüşüm noktası; geniş ekranda 'küçük bir poster' gibi ortada kalınca aciliyet ve ölçek duygusu kayboluyor. Awwwards sitelerinde kapanış CTA'sı ya tüm viewport'u doldurur ya da shell'e tam yaslanır.

**Ne yapılmalı.** ≥1680'de bölümü `min-h-[min(100dvh,1100px)]` yapın ve h2'yi shell'i dolduran `.fit` ile (`[--fit-size:22vw] [--fit-avail:var(--content)]`, 'START PROJECT.' iki satır) ölçekleyin; p `text-[length:clamp(14px,1.1vw,20px)] max-w-[44ch]`; buton `min-h-[clamp(58px,4vw,72px)]`. Ortalamayı koruyacaksanız h2'nin yanına sol/sağ kenarlardan 1fr boşluk bırakan `grid-cols-[1fr_auto_1fr]` ile eyebrow'ları h2'nin kolon hizasına çekin.

#### `gap-wide-and-laptop-viewports-20` — Gövde (13–15px) ve mono (12px) tipi 1024→2560 arasında hiç ölçeklenmiyor; h1:gövde oranı 12.6:1'den 24.6:1'e çıkıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** Tüm sayfalar: `font-mono text-[12px]` (eyebrow/etiket, ~80 instance), `text-[13px]` (page.jsx:49,101,175; IntakeForm.jsx:119), `text-[14px]` (services aside, blog excerpt), `text-[15px]` (services/about gövde). Ekran: gaps/home-2560-fold.png (intro 13px vs h1 320px), shots/wide-2560-services-article-hover.png

**Sorun.** Ölçüm: h1 1024→164px, 2560→320px (1.95×); gövde 13px sabit, mono 12px sabit (1×). 27" 1440p monitörde %100 ölçekte 12px mono fiziksel olarak ≈2.7mm — eyebrow'lar, etiketler, '// PROJECT MANAGER' satırları okunmuyor; 2560'ta kartların içi 'çok büyük başlık + okunmayan mikro metin'. Sadece display'de `clamp(…vw…)` var (30 farklı clamp), gövdede yok.

**Neden önemli.** Tipografik ölçek bir oran sistemidir; sadece bir ucu büyüyen sistem geniş ekranda dağılır. Jüri 2560'ta mono etiketleri okuyamazsa 'teknik dosya' konsepti de çalışmaz.

**Ne yapılmalı.** globals.css: `--text-mono: clamp(11px, 0.55vw + 3px, 14px); --text-body: clamp(13px, 0.6vw + 4px, 17px); --text-lead: clamp(15px, 0.8vw + 4px, 20px)`. Codemod: `text-[12px]`→`text-[length:var(--text-mono)]`, `text-[13px]/[14px]`→`var(--text-body)`, `text-[15px]`→`var(--text-lead)`; `tracking`/`leading` em bazlı olduğu için değişmez. Shell varsa vw yerine `cqi` ile shell'e bağlayın. Satır uzunluklarını `max-w-[Nch]` ile sabitleyin (ch, font boyutuyla birlikte büyür).

#### `gap-wide-and-laptop-viewports-21` — Tüm arka plan videoları 1280×720: 1536'da 1.2×, 1920'de 1.5×, 2560'ta 2× (DPR2'de 4×) upscale

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** public/videos/*.mp4 (8 dosya, hepsi 1280×720, 1.0–3.5 Mbps); kullanım: page.jsx:35 (dark-planet), :185 (start-a-project-hero), services/page.jsx:61-72 (services-section), :250 (about-end-section), case-studies/page.jsx:29-31 (the-work-section), about/page.jsx:36-38,49,78, IntakeForm.jsx:93-95 (start-project-rocket); hepsi `object-cover` + `opacity .5–.62`. Ekran: gaps/case-vocabulary-2560-fold.png (hero görseli 1920 → 2560, yumuşak), gaps/services-2560-fold.png

**Sorun.** 2560×1440 viewport'ta 720p kaynak 2× büyütülüyor; opacity .5–.62 ve gradient overlay'ler bulanıklığı kısmen gizliyor ama 320px'lik keskin Archivo wordmark'ın arkasındaki yumuşak doku 'stok loop' hissini güçlendiriyor. 1920×1080'de 1.5× (görünür). Vaka hero görselleri 1920×1200 (`sizes=100vw`) → 2560'ta 1.33×.

**Neden önemli.** Awwwards jürisinde yüksek DPI/geniş ekran yaygın; 720p arka plan videosu 'ücretsiz stok klip' sinyali verir ve tam bu dimension'da (yukarı ölçeklenme) en görünür hale gelir. Overlay'ler sorunu çözmez, maskeler.

**Ne yapılmalı.** Videoları 1920×1080 ve 2560×1440 olarak yeniden kodlayın (AV1/HEVC+H.264 fallback, CRF 30–33; 1440p ≈ 2–4MB/10s). Seçim: `<source media="(min-width:1680px)" src="…-1440.mp4">` (Chrome media attribute'u video source'ta destekler; Safari için `matchMedia` ile `src` set eden küçük client component). `preload="metadata"` + `poster` 2560px; vaka hero/cover görselleri için 2560px varyant ve `sizes="(min-width:1680px) 1640px, 100vw"`. Alternatif estetik çözüm: kaynağı büyütmek yerine `filter: contrast(1.1) + grain overlay` ile 'kasıtlı doku' — ama 2560'ta yine 1080p minimum gerekir.

> **Doğrulayıcı notu:** 8 video da 1280×720 (ffprobe; 1.08–3.47 Mbps), poster.png 1280×720, proje kapak/hero 1920×1200, galeri webp 1080×1920. Vaka hero `sizes=100vw` 2560'ta `w=3840` istiyor (ölçüm: currentSrc …&w=3840), optimizer büyütmediği için 1920 gelip tarayıcıda 1.33× çekiliyor — doğru. Fix düzeltmesi: `<source media>`'yı `<video>` içinde Chromium'da güvenilir saymayın; seçimi JS'te yapın — BackgroundVideo.jsx zaten `video.src = src` atıyor, oraya `sources` prop'u + `matchMedia('(min-width:1680px)')` / `devicePixelRatio` eklemek yeterli. Hero'lardaki düz `<video><source>` kullanımları (page.jsx:35, services:61, case-studies:29, about:36, IntakeForm:93) de aynı bileşene (autoplay varyantıyla) taşınmalı ki tek seçim mantığı olsun.

#### `gap-wide-and-laptop-viewports-22` — 1001–1200 'küçük masaüstü' bandı için breakpoint yok: desktop layout 1001px'de 42px gutter'la tam gücüyle başlıyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** tailwind.config.js:20 (`tablet: {max:'1000px'}` → 1001'den itibaren desktop), Header.jsx:28-30 (nav gap 32px@1001), services/page.jsx:140,209,226, about/page.jsx:75, page.jsx:98-101. Ekran: shots/wide-1001-services-article.png, wide-1001-services-process.png, wide-1001-home-fold.png, wide-1100-services-article.png, gaps/services-1024-full.png, gaps/home-1024-full.png

**Sorun.** Ölçüm 1001: gutter 42px, içerik 917px; servis makale grid'i 110/417/330 (etiket 'WEB / FULL-' / 'STACK' 2–3 satır, h2 45px 3 satır), process kolonları 207px (hepsi kırık), header nav x=335–666 ile TR/CTA x=723/763 arasında 57px. 1024: h1 164px (%92), hairline 250/500/750 (ALAZ'ın L ve Z'sinden geçiyor), intro 588–878 çizgi 750 üstünde. 1100: process 229px, makale 121/464/363. Bu band (1024×768 iPad yatay + Windows 125% ölçekli 1280 → 1024 CSS px, 1366×768@125% → 1093px) Türkiye/Avrupa kurumsal laptoplarında çok yaygın.

**Neden önemli.** 1000'de tablet'ten desktop'a sert geçiş: tablet kuralları (`tablet:px-[20px]`, `tablet:[--fit-size:30px]`) 1000'de biter, desktop yüzde grid'leri 1001'de başlar; arada hiçbir ara durum yok. Kompozisyon 1001–1200'de 'sıkışmış desktop' olarak okunuyor.

**Ne yapılmalı.** tailwind.config.js'e `laptop: { max: '1200px' }` ekleyin (ya da daha doğrusu bu grid'lere container query: `@tailwindcss/container-queries`, section `@container`, grid `@[1100px]:grid-cols-[…]`). Uygulama: servis makalesi `laptop:grid-cols-[72px_1fr]` + aside `laptop:col-start-2` altında 2 kolon (`laptop:grid-cols-2` iç grid); process `laptop:grid-cols-2`; FAQ `laptop:grid-cols-1` (tablet'te zaten var, 1200'e çekin); about process `laptop:grid-cols-[56px_1fr]` + p `col-start-2`; home servis kartları h3 `laptop:[--fit-size:32px]`; header nav gap `clamp(20px,2.4vw,52px)`. Hero hairline'ları 1200 altında 3 kolona düşürün (ya da finding 02'deki grid'e bağlayın).

#### `gap-wide-and-laptop-viewports-missed-1` — START PROJECT bloğu dikeyde sıfır nefes alıyor: rozet eyebrow çizgisine, buton alt nota yapışık (her masaüstü genişliğinde)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/page.jsx:184 ve :187 (`min-h-[680px]`), :189 (`text-center m-auto`), :188 (eyebrow), :206 (alt not). Ekran: shots/sk-2560-home-footer.png (üst yarı), gaps/home-1920-fold.png bölümü, shots/home-desktop-full.png

**Sorun.** Orta bloğun içeriği (rozet 45 + mt-44 + h2 378 + mb-30 + p 22 + mb-34 + buton 61 ≈ 614px) + eyebrow satırı (mt-65 + 19 + 19) + alt not (25 + 19 + 30) 680px'lik min-h'yi aşıyor → bölüm 689px (1366) / 736px (1680+) oluyor ve `m-auto` sıfıra çöküyor. Ölçüm: rozet üstü − eyebrow altı = 0px (1366, 1440, 1536, 1680, 1920, 2560, 3440'ın hepsinde), buton altı alt notun `border-t` çizgisine bitişik. 2560 ekranında 'COMMAND SEQUENCE READY' rozeti eyebrow çizgisinin hemen altında, 'START SEQUENCE' butonu alt çizgiye yaslanmış görünüyor; 1440×900 jüri ekranında da aynı.

**Neden önemli.** Kapanış CTA'sı dönüşüm noktası; tasarımın 'çerçeveli bölüm' fikri burada üst ve alt kenarlara sıkışmış bir poster olarak okunuyor. Dikey ritim kontrol edilmemiş hissi veriyor ve bu bir viewport'a özgü değil, tüm masaüstü genişliklerinde sabit bir hata.

**Ne yapılmalı.** `min-h-[680px]`'i bölümde ve iç kapsayıcıda `min-h-[min(100svh,1100px)]` yapın (finding 17 fix'iyle aynı değer) ve orta bloğa `py-[clamp(56px,8vh,120px)]` ekleyin; ya da iç kapsayıcıyı `flex flex-col justify-between gap-[clamp(48px,6vh,96px)]` yapıp `m-auto`'yu kaldırın. Playwright assert: `badge.top - eyebrow.bottom >= 48 && bottomNote.top - button.bottom >= 48` (1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440).

### İNCE İŞÇİLİK

#### `gap-wide-and-laptop-viewports-18` — Blog kartları `grid-cols-2` ≥1680'de 769–1208px: 14px excerpt tek satır 1143px, kartın yarısı boş

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/blog/page.jsx:46-65 (`grid-cols-2`, `p-[32px_32px_30px] min-h-[320px]`, h2 clamp 36px tavan, p `text-[14px]`). Ekran: shots/wide-2560-blog-cards-hover.png, gaps/blog-2560-fold.png; kıyas wide-blog-1366-fold.png

**Sorun.** Kart genişliği 1366→626, 1536→704, 1920→888, 2560→1208px; excerpt 2560'ta 1143px'te tek satır (≈170 karakter), başlık 36px tavanda, kart 320px min-h ile üst yarısı dolu alt yarısı hover arka planı. İki kart yan yana 2416px.

**Neden önemli.** Kart içi ölçek 600px için; 1.2k px'de 'boş kutu'. Blog AI-slop filtresinde en kırılgan sayfa (generic kart grid).

**Ne yapılmalı.** Shell + ≥1680'de `grid-cols-3` (3 yazıya ulaşınca) ya da liste formatı (tarih / başlık / etiket / süre — satır başına, case index ile aynı dil). Excerpt `max-w-[64ch]`; kart `min-h` yerine `aspect-[16/9]`.

#### `gap-wide-and-laptop-viewports-19` — Intake formu `grid-cols-[31%_1fr]`: 2560'ta 749px'lik aside'da 250px paragraf, 1567px genişliğinde tek satırlık input'lar

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:111 (grid + gap clamp 100px), :112-121 (aside min-h-580, p `max-w-[250px]` 13px), :127-134 (tip butonları `grid-cols-2`, min-h-168), :142/:147/:172 (input w-full), :92 (video overlay `h-[clamp(600px,50vw,780px)]`). Ekran: shots/wide-2560-intake-form.png, wide-2560-intake-step2.png, gaps/start-project-2560-fold.png; kıyas wide-1366-intake-form.png, wide-1100-intake-form.png

**Sorun.** Ölçüm 2560: aside 749px (içinde 250px'lik paragraf + 3 adımlık liste), form 1567px, tip butonları 778×168px (28px etiket), proje adı input'u 1567×56px, textarea 1567×155. 1920: aside 551 / form 1125 / buton 557px. Form alanlarının 1.5k px genişliği 14px placeholder'ı 'kaybediyor'. 1100'de ise aside 312 / form 629 / buton 309 — bu aralık iyi.

**Neden önemli.** Form genişliği okunabilirlik ve doldurma rahatlığıyla ters orantılı; 1.5k px'lik input Awwwards formlarında görülmez (genelde 560–760px kolon).

**Ne yapılmalı.** `grid-cols-[minmax(260px,31%)_minmax(0,880px)]` + `justify-content: space-between` (shell'siz de çalışır); ya da shell ile form ≈1000px'e iner ve ek `max-w-[760px]` input kolonu. Tip butonları `grid-cols-2` kalsın ama `aspect-[16/7]`; etiket 28px tavan iyi. Video overlay `h-[clamp(600px,50vw,780px)]` 2560'ta 780'de kesilip hero'nun altında sert bir sınır bırakmıyor (gradient #090909'a iniyor) — bunu koruyun.

#### `gap-wide-and-laptop-viewports-23` — Signal marquee kopya genişliği 2705px: 2560'ta sınırda, ultrawide'da (≥2706px) döngü dikişi görünür

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:59-74 (iki kopya × 4 tekrar, `animate-signal-marquee` translateX(-50%)); tailwind.config.js:106-108,116. Ölçüm: signalCopyW 2705px, toplam 5409px @2560; ticker (page.jsx:107-126) kopya 4363px (güvenli)

**Sorun.** Sorunsuz döngü için tek kopya ≥ viewport olmalı; 2705 > 2560 olduğu için 2560'ta güvenli ama 3440×1440 ultrawide (geliştirici/tasarımcı monitörlerinde yaygın) ve 2880+ CSS px'lerde kopya sonunda 175–735px'lik boşluk her 28 saniyede bir geçiyor. İçerik 4 tekrarla elle çoğaltıldığı için (A ◻ B ◻ ×4 ×2) metin uzunluğuna bağlı kırılgan.

**Neden önemli.** Marquee dikişi küçük ama 'bu site büyük ekranda test edilmemiş' sinyali; ayrıca elle 8 kez kopyalanmış JSX kodu bakım riski.

**Ne yapılmalı.** Kopyayı dinamik yapın: `useLayoutEffect` ile kopya genişliğini ölçüp `Math.ceil((innerWidth*2)/copyW)` kadar `aria-hidden` kopya üretin (ya da CSS: `.track{display:flex;width:max-content}` + `@keyframes` `translateX(calc(-1 * var(--copy-w)))` ile `--copy-w` JS'ten set). Hızı viewport'a göre sabit px/s tutun: `animation-duration: calc(var(--copy-w) / 60px * 1s)` (şu an 28s sabit → 2560'ta 96px/s, 1366'da 51px/s — geniş ekranda neredeyse 2× hızlı akıyor).

> **Doğrulayıcı notu:** Kopya genişliği 2705px (her viewport'ta aynı; ticker 4363px) — 3440'ta dikiş doğru: `translateX(-50%)` döngüsünün sonunda sağda 735px'e kadar boşluk açılıyor. Yanlış olan hız iddiası: kopya genişliği içerik kadar, viewport'a bağlı değil → hız her genişlikte 2705/28 ≈ 97px/s; '1366'da 51px/s' yok, hız düzeltmesine gerek yok. Dinamik kopya sayısı (`Math.ceil(innerWidth*2/copyW)`) fix'i doğru ve 8 kez elle kopyalanmış JSX'i de temizler.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### İçerik shell'i + 12 kolon grid sistemi (bu dimension'ın asıl çözümü)

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Basement Studio (basement.studio) — 1600 civarı shell + görünür kolon çizgileri; Studio Freight / Darkroom Engineering (darkroom.engineering) — 12 kolon `grid` utility; Obys Agency — shell + kenar hairline

globals.css'e `--content-max: 1640px`, `--gutter: clamp(24px,4.2vw,96px)`, `--content: min(100vw - 2*var(--gutter), var(--content-max))`, `--col-gap: clamp(16px,1.5vw,32px)`; `.shell { width:100%; max-width:var(--content-max); margin-inline:auto; padding-inline:var(--gutter) }` ve `.grid-12 { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); column-gap:var(--col-gap) }`. Her bölümün iç kapsayıcısı `.shell`, içerik blokları `col-span-N / col-start-N` ile yerleşir (hero: h1 1–12, tagline 1–5, intro 10–12; servis makalesi 1 / 2–7 / 9–12; about origin 1–7 / 9–11; vaka challenge 1–5 / 7–11; footer wordmark 1–12, e-posta 1–4, ofisler 7–9 / 10–12). ≥1760px'te `.shell::before/::after` ile shell kenarlarına 1px çizgi (mevcut hairline dili) çizilir; böylece letterbox 'bilinçli çerçeve' olur. `.fit`'in `--fit-avail` kaynağı `var(--content)` olur; 9 override `calc(var(--content)*k)` ile güncellenir. Dev-only `?grid=1` query'siyle 12 kolonu gösteren overlay (G tuşu) ekleyin. Efor: 37 kapsayıcı + ~12 grid'in kolon haritası; 2–3 gün.

### vw-bazlı rem 'fluid canvas' (1440 referans, 1366→2560 birebir aynı kompozisyon)

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Locomotive (locomotive.ca) — `font-size: 0.6944vw` html ölçeği; Obys (obys.agency); Lusion (lusion.co); Unseen Studio — 'design at 1440, scale everything'

Locomotive/Obys/Lusion'un yaptığı: `html { font-size: clamp(8.5px, 0.6944vw, 12px) }` (1440'ta 10px, 1366'da 9.49px, 1728'den sonra 12px tavan) ve tüm px değerlerinin rem'e dönüşü. Bu kodda 902 `[Npx]` arbitrary değeri var; mekanik codemod ile (`\[(\d+(?:\.\d+)?)px\]` → `[${n/10}rem]`, clamp içindeki px'ler hariç) 1–2 saatte dönüşür; `--gutter`, `--radius` ve border'lar (1px kalsın) elle. Sonuç: 2560'ta 1440'taki kompozisyonun 1.2× büyütülmüş hali, 1366'da 0.95× — kartlar, gövde yazısı, header yüksekliği hepsi birlikte ölçeklenir; clamp tavanları ve shell'e gerek kalmaz (ya da shell 'tavan' olarak 12px rem'de devreye girer). Riskler: Playwright screenshot testleri yeniden baseline, `min-h-dvh` gibi vh değerleri rem'e dönmez (zaten dönmemeli). Shell ile birlikte en güçlü kombinasyon: rem ölçeği 1366–1728 arasını, shell 1728+'ı çözer.

### Bileşen grid'leri için container query'ler (1001–1200 ve 1680+ aynı anda)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Tailwind container-queries plugin; Resn / Active Theory bileşen-bazlı ölçekleme; Every Layout 'The Sidebar / Switcher' desenleri

`@tailwindcss/container-queries` ekleyin; section'lara `@container`, yüzde tabanlı grid'lere `@[1100px]:grid-cols-[…]` ve `@[1500px]:grid-cols-[…]` kuralları. Hedef bileşenler: services makale grid'i (`grid-cols-[clamp(88px,8cqi,160px)_1fr_minmax(300px,34cqi)]`), process (`@[1100px]:grid-cols-2`), FAQ (`@[1100px]:grid-cols-1`), about process satırları, intake `grid-cols-[minmax(260px,31cqi)_minmax(0,88ch)]`, home 3'lü kartlar (`@[1700px]:grid-cols-[repeat(3,minmax(0,520px))]`). `.fit` için `--fit-avail: 100cqi` (kapsayıcı genişliği) — viewport'tan bağımsız, shell ile otomatik uyumlu. Böylece 'laptop' breakpoint'i eklemeden hem küçük masaüstü hem geniş ekran çözülür.

### Hero hairline'larını gerçek grid'e çevirip 'draw-on' animasyonla tanıtmak

- **Etki:** orta · **Efor:** orta · **Referans:** Basement Studio ana sayfa grid çizgileri; Unseen Studio (unseen.co) hero kolonları; Resn 'grid reveal'

Finding 02'deki grid'e bağlı çizgiler (4 ya da 12 kolon, shell kenarlarında bitiyor) sayfa yüklenince `scaleY(0→1)` ile 0.9s `cubic-bezier(.22,1,.36,1)` ve 60ms stagger çizilir; h1 harfleri çizgilerin tamamlanmasından 200ms sonra `clip-path` ile girer. Scroll'da çizgiler bir sonraki bölümün kolonlarına 'uzar' (ScrollTrigger/Lenis ile `height` → section bottom). Böylece grid dekor değil, sayfayı kuran sistem olur ve geniş ekranda boşluk 'tasarlanmış' okunur. Çizgi opaklığı `rgba(255,255,255,.065)` (mevcut) kolon çizgileri için iyi; shell kenar çizgileri `.13` (--line) olsun.

### Vaka indeksinde cursor'u takip eden preview + viewport'a göre ölçeklenen satırlar

- **Etki:** orta · **Efor:** orta · **Referans:** Locomotive 'work' listesi; Studio Freight 'The Index'; Hello Monday vaka listesi cursor preview

Finding 15'in kalıcı çözümü: `absolute right-[10%]` preview yerine `fixed` bir `<div>` ve framer-motion `useMotionValue(x,y)` + `useSpring({stiffness:220,damping:28})`; hover'da görsel `scale 0.9→1`, `rotate -4→-2deg`, `opacity 0→1` (0.25s). Boyut `w-[clamp(240px,16vw,420px)] aspect-[16/10]`. Satır yüksekliği `clamp(200px,14vw,320px)`; satır üstüne gelince başlık `translateX(16px)` yerine satır arka planı `#141414` + sayaç `01 /` → `01 — VIEW` dönüşümü. Klavye odağında (`:focus-within`) preview satırın sağ hücresinde sabit gösterilir (a11y).

### Geniş ekran asset hattı: 1440p video kaynakları ve 2560px görseller

- **Etki:** orta · **Efor:** orta · **Referans:** Active Theory / Lusion — DPR'ye göre video kaynağı seçimi; next/image `sizes` ile shell-bazlı istek sınırlama

ffmpeg ile 8 videoyu 1920×1080 ve 2560×1440'a `-c:v libaom-av1 -crf 32` (+ `libx264 -crf 24` fallback) kodlayın; `BackgroundVideo` bileşenine `sources={{ '1440': …, '1080': …, '720': … }}` prop'u ve `matchMedia('(min-width:1680px)')` / `devicePixelRatio` ile seçim; `preload="metadata"`, `poster` 2560px webp. Proje cover/hero görselleri için 2560px varyantlar (next/image zaten srcset üretir; kaynak 1920 → 2560'a çıkarın) ve `sizes` değerlerini shell'e göre daraltın (`(min-width:1680px) 820px`). Vaka galerisi 1080×1920 webp'ler 2560 DPR2 için yeterli değil → 1440×2560 varyant.

### fit()'i satır bazlı yapmak + `text-wrap: balance`

- **Etki:** orta · **Efor:** küçük · **Referans:** Obys / Locomotive 'fit-to-width' başlıklar (SplitText + ölçüm); CSS `text-wrap: balance`

lib/fit.js'e `fitLines(lines, suffix)`: her satır için kelime em'lerinin toplamı + (kelime sayısı−1)×0.28em boşluk; `--fit-em` = en geniş SATIR. Çağrılar zaten `[line1, line2]` dizisi veriyor (`t.raw('heading')`), yani API değişmeden `fit()` içinde `[text].flat()` satırlarını ayrı ayrı ölçmek yeterli (kelime bazlı ölçüm sadece `<br/>` içermeyen tek satırlı başlıklarda kalsın). h1/h2'lere `text-wrap: balance` (globals.css'te `h1,h2,h3`'te zaten var — ama `.fit` ile birlikte `white-space` kırılmalarını engellemek için `<br/>` verilen başlıklarda `text-wrap: nowrap` per-line span). Bu, FAQ '&' yetimini ve 1366/1536'daki 'MARKET / HOURS' kırılmasını kökten çözer.

### Viewport yüksekliğine duyarlı hero/CTA bölümleri (svh, min(100dvh, tavan))

- **Etki:** orta · **Efor:** küçük · **Referans:** Locomotive/Obys hero'ları (svh + yükseklik tabanlı tip clamp'ı); Awwwards SOTD sitelerinin 1366×768 'juror check' pratiği

Tüm 'tek ekran' bölümlerine iki eksenli kural: `min-h-[100svh]` (adres çubuğu hesaba katılır), `max-h` yerine içerik tavanı `min(100dvh, 1100px)`; display boyutları `min(clamp(…vw…), Xsvh)` ile yükseklikten de sınırlanır (home h1 26svh, services h1 22svh, start h2 24svh). 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440 için Playwright'ta 'hero alt barı fold içinde' ve 'h1 fold içinde' assert'leri (CI'da screenshot diff). 4K (3840×2160) için `--content-max` 1640'ta kalır, hero `max-h-[1400px]` ile 'letterbox + büyük boşluk' yerine shell çizgileriyle çerçevelenir.
