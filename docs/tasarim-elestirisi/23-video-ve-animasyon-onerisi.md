# Arka plan videoları ve Awwwards seviyesi animasyon önerisi

**Durum:** öneri, karar bekliyor · **Tarih:** 2026-10-11

← [Ana rapor](README.md) · [Tasarım uygulaması](22-tasarim-uygulamasi.md) · [Görsel/video eleştirisi](13-gorsel-video-marka.md)

Bu doküman üç soruya cevap verir: videolar nereye ve hangi tarzda girer; videoları kim üretir; video dışında hangi animasyonlar eklenir. Önce karar özeti, sonra gerekçe, yerleşim planı, Google Flow prompt'ları, teknik hat ve animasyon listesi.

## 0. Karar özeti

- **Turuncu scroll efekti kalıyor.** Teknik adı `HeatField` (`src/components/HeatField.jsx`): scroll hızıyla parlayan, imleci takip eden ısı kenarı shader'ı. Footer'ın sayfa sonunda kor rengine ısınması ve okuma çubuğu aynı aileden. Videolar shader'ın *yerine* değil *altına* girer; shader her zaman en üstte, canlı katman olarak kalır.
- **Videoları Flow'da sen üretirsin, gerisini ben yaparım.** Bu ortamda video üretim aracım yok. Prompt'lar, loop'lama, siyah eşleme, sıkıştırma, poster, `BackgroundVideo` bileşeni, shader ile katmanlama ve scroll'a bağlı kare dizisi benim tarafım. Tek istisna: markethours.live canlı olduğu için ekran kaydını Playwright ile ben alabilirim.
- **Flow'dan 3 klip, en fazla 4.** Hepsi tek aileden: "alaz", ateşin iş yapan kenarı. Uzay, sunucu odası, devre kartı, parçacık, bokeh, "dark tech" yok. Önceki sekiz stok video tam bu yüzden silindi ([13](13-gorsel-video-marka.md), [11](11-ai-slop-dedektoru.md)); AI üretimiyle aynı hataya dönmemek için her klip bölüm 1'deki testi geçmek zorunda.
- **Ürün videoları Flow'dan değil, gerçek kayıttan.** Hover önizlemeleri ve case-study hero'ları için ürünlerin kendi ekran kayıtları. Awwwards jürisi için herhangi bir AI loop'tan daha değerli; "kendi ürünlerini yapan stüdyo" hikâyesini kanıtlar.
- **Önerdiğim ilk paket:** Klip 1 hero, Klip 2 About "ALAZ.", Klip 3 CTA (scroll'a bağlı tutuşma). Animasyon: kinetik wordmark, scroll-scrub kare dizisi, "tutuşur ve soğur" hover grameri, sticky perde footer, kartlarda sıcak kenarlı reveal.

## 1. Zemin: bugün ne var, kural ne

**Shader'ın üç varyantı ve yerleri**

| Varyant | Görünüm | Nerede |
|---|---|---|
| `hero` | geniş bant, y=%20, yoğunluk 0.9 | ana sayfa hero, ana sayfa "Start a project" |
| `band` | ince çizgi, y=%62, yoğunluk 0.8 | About "ALAZ." bölümü (wordmark'ın arkasından geçer) |
| `quiet` | geniş, soluk, y=%8, yoğunluk 0.35 | About hero, About ve Services kapanışları |

Shader bugün opak çiziyor (kendi mürekkebini basıyor). Video altına girecekse tek değişiklik: shader'ı alfa kanalıyla çizdirmek (sıcak olmayan yer şeffaf), böylece video altında görünür, kenar üstte yaşar. Shader'ın scroll ve imleç davranışına dokunulmaz.

**Hero'nun bugünkü anatomisi (1440×900):** üst %60 boş mürekkep + 12 kolon hairline, alt %35 shader'ın amber glow'u ve beyaz-sıcak kenarı. Video için doğal yer bu boşluk; ama videodaki sıcak kenar shader'ın bandıyla aynı yükseklikte olmalı ki ikisi tek nesne gibi okunsun: dokuyu video verir, canlı tepkiyi shader.

**Klip testi (her Flow çıktısı bunu geçmeli)**

1. Karede tek ışık kaynağı sıcak kenar; geri kalan her şey `#0a0a0a` siyah.
2. Palet: beyaz-sıcak → amber → kor (`#fff4e6 → #ffb454 → #ff5a1f`). Mavi, yeşil, mor, soğuk gri yok.
3. Kamera sabit. Hareket çok yavaş, "yüzde on hız" hissi.
4. Konu fiziksel: metal, alev, ısı. Dijital/teknoloji ikonografisi, parçacık, lens flare, bokeh yok.
5. Görünür olacak. Eski videolar %50 opaklık + iki gradyan altında siyah okunuyordu; yenileri %100 opaklıkta, sadece bölüm sınırında mürekkebe geçiş.
6. Döngü dikişsiz, 8–12 saniye. Scroll-scrub klipler hariç (onlar tek yönlü).
7. Ses yok (Flow'un ürettiği sesi ffmpeg ile atarım).
8. Ağırlık: 1080p ≤ 1.5 MB, 1440p ≤ 3 MB, poster ≤ 40 KB. Site genelinde video toplamı ≤ 6 MB.

## 2. Kim üretir: iş bölümü

| İş | Kim | Not |
|---|---|---|
| Flow'da klip üretimi (3–4 klip, klip başına 4–6 deneme) | **sen** | Prompt'lar bölüm 4'te. Ham MP4'ü gönder, yeniden kodlama. |
| Loop'lama, siyah eşleme, kodlama (AV1 + H.264, 1080/1440/720), poster, kare dizisi | ben | ffmpeg; script repoya girer (`scripts/video-encode.sh`). |
| `BackgroundVideo` bileşeni (lazy, reduced-motion, saveData, DPR'ye göre kaynak) | ben | Eski silinen bileşenin disiplinli hâli. |
| Shader'ı alfa ile çizdirip videonun üstüne oturtmak | ben | `HeatField.jsx` + `globals.css` |
| Scroll'a bağlı kare dizisi (canvas) | ben | Klip 3 ve istersen Klip 2 için |
| markethours.live ekran kaydı | ben | Playwright, 1440×900, deterministik |
| Vocabulary / Simple Note / Passport.AI ekran kayıtları | **sen** | iOS simülatör `xcrun simctl io booted recordVideo`, 6–8 s, ses yok |
| Animasyonlar (bölüm 6) | ben | videolardan bağımsız, hemen başlayabilir |

## 3. Yerleşim planı: nereye, ne video

| # | Yer | Şu an | Öneri | Kaynak | Öncelik |
|---|---|---|---|---|---|
| 1 | Ana sayfa hero | ink + `hero` shader + grid | **Klip 1 "edge-forge"** altta, shader üstte alfa ile; videodaki kenar shader'ın bandıyla aynı yükseklikte | Flow, loop | P1 |
| 2 | Ana sayfa "Start a project" | `hero` shader | **Klip 3 "edge-ignite"**: bölüme scroll'la girerken kenar soğuktan beyaz-sıcağa tutuşur (kare dizisi, scrub); shader üstte canlı devam eder | Flow, scroll-scrub | P1 |
| 3 | About "ALAZ." bölümü | `band` shader | **Klip 2 "edge-flame"**: alevin iş yapan ucu, yatay, wordmark'ın arkasında; `band` shader üstte düşük yoğunlukta | Flow, loop (ya da scrub) | P1 |
| 4 | About hero, About/Services kapanışları | `quiet` shader | Değişmesin. Her bölüme video koymak eski hataya döner; `quiet` shader yeterli | — | — |
| 5 | Services hero | sadece grid | Video yok. Animasyon: sticky index zaten var; bloklara pin/stack (bölüm 6-H) | — | P2 |
| 6 | Work index hover önizlemesi | kapak PNG | **Gerçek ürün kaydı**: imleci takip eden kutuda hover'da oynar, çıkışta durur | Kayıt | P1–P2 |
| 7 | Ana sayfa proje kartları | kapak PNG + parallax | Hover'da gerçek ürün kaydı kapağın üstüne 0.6 s'de açılır | Kayıt | P2 |
| 8 | Case-study detay hero | hero görseli | Ürün kaydı, ürünün kendi renginde, autoplay loop | Kayıt | P2 |
| 9 | Start a project formu | yok | Video yok (form odak ister). Tamamlama ekranında küçük "ignite" animasyonu | — | P3 |
| 10 | 404 | yok | **Klip 4 "edge-out"** (sönmüş kenar, tek duman teli), küçük ve opsiyonel | Flow, loop | P3 |
| 11 | Footer | kor'a ısınma + kesik wordmark | Video yok. Sticky perde footer + noktanın nefes alması | — | P1 |
| 12 | Blog | yok | Yok | — | — |

**Neden hero'ya video (ve neden tereddütlüyüm).** Hero bugün tek başına güçlü: büyük tipografi + canlı kenar. Video, üstteki boş mürekkebe fiziksel doku katar ve "alaz" fikrini shader'dan önce gözle kanıtlar. Risk: video tipografiyle yarışırsa hero zayıflar. Bu yüzden hero videosunu tek satırlık bir anahtarla (`<HeroMedia video />`) kuracağım; yan yana bakıp kalsın mı diye birlikte karar veririz. Video hero'da kalmazsa evi About "ALAZ." bölümüdür.

**Neden CTA'da loop değil scroll-scrub.** "Start a project" bölümü sitenin "ateş iş yapmaya başlıyor" anı. Loop bunu anlatmaz; kullanıcının scroll'uyla soğuk çelik kenarın tutuşması anlatır. Üstüne shader'ın canlı kenarı biner, sonra footer kor'a ısınır: aynı cümlenin devamı. Teknik: 72 kare WebP (~1 MB), canvas'a scroll pozisyonuyla çizilir, lerp 0.1; reduced-motion'da son kare sabit. Loop sorunu da kalmaz.

## 4. Google Flow prompt'ları

**Ayarlar:** Veo 3.1 (keşif için Fast, final için Quality) · 16:9 · 1080p (planın 4K verirse 4K; 2560 ekranlar için 1440p varyantı ondan çıkar) · 8 s · klip başına 4–6 deneme bütçele · ham MP4'ü indir, yeniden kodlama, ses umurunda olmasın.

**Loop yöntemi (üç seçenek, A'yı dene, B garanti):**

- **A — Flow "Frames to Video":** önce iyi bir kare üret (Flow'da görsel üret ya da beğendiğin videodan kare al), sonra aynı görseli hem ilk hem son kare olarak ver, prompt'ta "returns to its starting state" de. Flow'un ilk/son kare ve Extend özellikleri belgeli; aynı kareyi iki uca koyarak loop almak mantıklı ama resmi dokümanda doğrulanmış değil, denemek gerekiyor.
- **B — ffmpeg crossfade (ben):** 8 s klibin son 1.5 s'si ilk 1.5 s'nin üstüne bindirilir; sonuç 6.5 s dikişsiz döngü. Sabit kameralı yavaş kliplerde fark edilmez. Flow'un "Extend" özelliğiyle klibi 16 s'ye uzatırsan döngü daha da seyrek tekrar eder.
- **C — ping-pong:** sadece simetrik hareketlerde (ısı dalgası) kabul edilebilir; alev için değil, geri sarıldığı belli olur.

Prompt'lar İngilizce (Veo İngilizce'de daha tutarlı). "Kaçınılacaklar" listesi prompt'a "no X" diye yazılmaz; Veo olumsuz cümleyi iyi anlamaz. Flow'da negatif prompt alanı varsa oraya, yoksa prompt'un sonuna "the frame stays empty except the edge" gibi olumlu kısıt olarak girer.

### Klip 1 — `edge-forge` (ana sayfa hero, loop)

> Extreme macro shot, locked-off camera, 100mm macro lens, shallow depth of field. The thin top edge of a bar of freshly forged steel runs horizontally across the lower third of the frame, glowing white-hot at its core and fading through amber to deep ember orange within a few millimetres. Everything above and below the edge is pure black; the only light in the frame comes from the edge itself. Slow heat shimmer rises from the edge; a few tiny embers lift off and fade. Extremely slow motion, almost still. Fine 35mm film grain, photographic, not CGI. The shot ends in the same state it began, for a seamless loop. Silent, no music.

Kaçınılacaklar: kamera hareketi, lens flare, bokeh, uçuşan kıvılcım, duman, mavi ton, yazı, insan, çekiç, örs.
Kabul: kenar karenin alt üçte birinde ve yatay (shader'ın bandıyla hizalanacak); üst %60 saf siyah.

### Klip 2 — `edge-flame` (About "ALAZ.", loop)

> Extreme macro of the working tip of a forge flame against pure black, locked-off camera. Only the hottest sliver of the flame is visible: a thin, bright blade of near-white heat edged with amber and deep orange, lying almost horizontal across the frame slightly below centre, like a line drawn in light. It bends and breathes slowly in slow motion. The surrounding frame stays black: no blue gas flame, no smoke, no glow on a background. Fine film grain, photographic. The motion returns to its starting shape so the clip loops seamlessly. Silent.

Kaçınılacaklar: mavi gaz alevi, pürmüz ucu/metal nozul görünmesi, duman, arka plan, geniş alev.
Kabul: tek ince yatay ışık çizgisi; About metni ("ateşin iş yapan parlak kenarı") kelimesi kelimesine bu kare olmalı.

### Klip 3 — `edge-ignite` (ana sayfa CTA, scroll-scrub, tek yönlü)

> Extreme macro, locked-off camera. A straight edge of dark, cold steel runs horizontally across the lower third of a pure black frame; at the start it is barely visible, a faint grey line. Over the course of the shot it heats up very slowly and continuously: first a dull dark red appears along the edge, then deep ember orange, then amber, and in the final second the core of the edge is white-hot with a soft amber halo and gentle heat shimmer. Nothing else in the frame is lit. One-directional change, no flicker back. Fine film grain, photographic. Silent.

Kaçınılacaklar: geri soğuma, kıvılcım, kamera hareketi, ışığın yan yüzeylere vurması.
Kabul: ilk kare neredeyse siyah, son kare Klip 1'in kararlı hâline benziyor (bölüm shader'a devredince kopukluk olmasın).

### Klip 4 — `edge-out` (404, loop, opsiyonel)

> Extreme macro, locked-off camera, pure black frame. A thin horizontal edge of steel has just stopped glowing: a last dull ember fades slowly along the line while a single faint wisp of grey smoke rises and dissolves. Very slow, monochrome except the dying ember. Fine film grain, photographic. Loops seamlessly. Silent.

### Ürün kayıtları (Flow değil)

- **Market Hours (ben):** markethours.live, Playwright, 1440×900, 8 s; haritadaki gün/gece çizgisinin hareketi için uygulamanın saatini sahte zamanla ilerletmek gerekebilir (ürün sahibi olarak bir `?t=` parametresi ya da benzeri varsa söyle).
- **Vocabulary (sen):** kart swipe + kelime sesi ekranı + bir oyun; 6–8 s, sade, ses yok.
- **Simple Note (sen):** not yazma + el yazısı + takvim; 6–8 s.
- **Passport.AI (sen):** belge seçimi + yüz kontrolü + arka plan değişimi; 6–8 s.
- Hepsi için: 9:16 ya da cihaz oranı, 60 fps gerekmez, 30 yeter; ben 3–5 s döngüye keser, ≤ 600 KB'a indiririm.

## 5. Teknik hat (benim tarafım)

**Kodlama hattı (`scripts/video-encode.sh`, ffmpeg):**

1. `ffprobe` ile çözünürlük, fps, süre kontrolü.
2. Ses kanalı atılır.
3. Loop: Flow'dan loop geldiyse 3× ardışık önizlemeyle dikiş kontrolü; gelmediyse crossfade (bölüm 4-B).
4. **Siyah eşleme:** videonun siyahı tam `#0a0a0a`'ya (`--ink`) sabitlenir. Bu adım atlanırsa video dikdörtgeni sayfada belli olur (eski videoların "kutu" görünmesinin bir sebebi buydu). Hafif kontrast, grain korunur (grain koyu gradyanlardaki banding'i de gizler).
5. Kodlama: AV1 (libsvtav1, crf ~34, **10-bit**: koyu gradyanlar 8-bit'te bantlaşır) + H.264 fallback (libx264, crf ~22, yuv420p, tune film), `+faststart`. Boyutlar: 2560×1440 (geniş ekran), 1920×1080 (varsayılan), 1280×720 (mobil, ≤ 700 KB).
6. Poster: ilk kare, WebP, ≤ 40 KB (koyu görseller çok iyi sıkışır).
7. Kare dizisi (Klip 3): 72 kare, 1440×810 WebP, toplam ~1 MB; ilk 12 kare hemen, kalanı `requestIdleCallback` ile.
8. Dosyalar `public/videos/<klip>/` altına; `next.config.js` zaten `/videos` için 1 yıl immutable cache veriyor.

**`BackgroundVideo` bileşeni:**

- SSR'da sadece poster; `src` yok. Mount'ta: `prefers-reduced-motion`, `navigator.connection.saveData` ya da 2g/3g → poster kalır.
- `IntersectionObserver` (rootMargin 200px) görünürken `src` atar ve oynatır, çıkınca durdurur. `preload="none"`, `muted`, `playsInline`, `loop`, `aria-hidden`, `disablePictureInPicture`.
- Kaynak seçimi JS'te (`matchMedia('(min-width:1680px)')` ve DPR): 1440 / 1080 / 720. `<source media>` Chromium'da güvenilmez ([16](16-genis-ekran-ve-laptop.md), finding 21).
- Mod: `loop` (video) ya da `scrub` (canvas + kare dizisi, ScrollTrigger scrub, lerp).
- Hiç gradyan overlay yok; sadece bölüm sınırında mevcut `heat-field-wrap::after` geçişi.

**Shader katmanı:** `HeatField` alfa çıkışı (`alpha: true`, premultiplied; mürekkep yerine şeffaf), sıralama: video z0 → shader z1 → grid z2 → içerik z3. Video varken `hero` yoğunluğu 0.9 → 0.7 (gerçek kenar + canlı kenar tek nesne gibi). Scroll ve imleç tepkisi aynen kalır. Mobil ve reduced-motion davranışı değişmez.

**Performans sınırı:** LCP hero metni (statik HTML) olmaya devam eder; poster hafif, video görünürlük sonrası ve `preload="none"`. Site genelinde video toplamı ≤ 6 MB (varyant başına), tek seferde en fazla bir video oynar.

## 6. Animasyon önerileri (Awwwards seviyesi, video dışı)

| # | Öneri | Etki | Efor | Konsept bağı | Faz |
|---|---|---|---|---|---|
| A | Kinetik wordmark: Archivo'nun `wdth` ekseni | yüksek | küçük–orta | kenar sıkışır/genişler | 1 |
| B | Scroll-scrub kare dizisi (CTA tutuşma, istersen About alevi) | yüksek | orta | kullanıcı ateşi kontrol eder | 1 |
| C | Hover'da gerçek ürün videosu (index + kartlar) | yüksek | orta (kayıt gerek) | ürün-öncülü stüdyo | 1–2 |
| D | "Tutuşur ve soğur" hover grameri (buton, satır, link) | orta | küçük | doğrudan | 1 |
| E | Sticky perde footer | orta | küçük | footer ısınmasıyla birleşir | 1 |
| F | Kartlarda sıcak kenarlı clip-path reveal | orta | küçük | doğrudan | 1 |
| G | Liste → detay paylaşımlı kapak morph'u | yüksek | orta–büyük | akış | 2 |
| H | Pinned/stacking bloklar (About 01–04, Services 01–03) | orta | orta | — | 2 |
| I | Canlı Market Hours şeridi (gerçek veri) | yüksek | orta (API) | ürün kanıtı | 2 |
| J | İmleç ısı izi (soğuyan iz) | düşük–orta | küçük | doğrudan, gimmick riski | opsiyonel |
| K | Hero başlığında ısı kırılması (render-to-texture) | orta | büyük | doğrudan | 3 |

- **A — Kinetik wordmark.** Google Fonts'un variable Archivo'su `axes: ['wdth']` ile yüklenir (62–125). Hero "ALAZ." scroll'la 125 → 85'e sıkışır (hero yüksekliği boyunca scrub); masaüstünde imlece yakın harf genişler (SplitText chars + mesafeye göre `quickTo`). Footer wordmark'ı ters yönde. GPU'da ucuz, hiçbir şablonda yok, markaya özgü. [09](09-hareket-ve-etkilesim.md)'daki "Eklenecekler" listesinin yapılmamış en değerli maddesi.
- **B — Scroll-scrub.** Bölüm 3'te anlatıldı. Apple ürün sayfası tekniği; loop, autoplay ve codec dertlerini de bitirir.
- **C — Ürün hover videoları.** Work index'teki imleci takip eden önizleme kutusu ve ana sayfa kartları; `preload="none"`, ilk hover'da `src`, çıkışta `pause` + `currentTime = 0`. Reduced-motion'da kapak kalır.
- **D — Tutuşur ve soğur.** Sitenin hareket cümlesi zaten bu ("eleman sıcak kenarla girer, beyaza soğur"), ama hover'larda henüz yok. `.btn`, `.btn-ghost`, `.project-row`, nav linkleri: hover'da 1px kor kenar soldan çizilir (200 ms), 400 ms'de beyaza/griye soğur. Saf CSS (`background-size`/`box-shadow` geçişi), reduced-motion'da anında.
- **E — Sticky perde footer.** Footer `position: sticky; bottom: 0; z-index: 0`, `main` üstte; sayfa sonunda içerik yukarı kayıp footer'ı açar. Mevcut "kor'a ısınma" tween'i perde açılırken çalışır; ikisi tek sahne olur.
- **F — Sıcak kenarlı reveal.** Proje kartı görselleri `clip-path: inset(0 100% 0 0)` → `inset(0)` ile soldan açılır; açılan kenarda 1px ember çizgi birlikte kayar, bitince söner. Mevcut `data-reveal="fade"`'in yerine görseller için.
- **G — Paylaşımlı kapak morph'u.** Work index satırındaki önizleme kapağı tıklamada case-study hero görseline büyüyerek dönüşür (GSAP Flip ya da View Transitions; perde ile uyumu test edilmeli). Faz 2, çünkü `next-intl` Link + perde geçişiyle birlikte dikkat ister.
- **H — Pinned/stacking.** About süreç adımları ve Services blokları: her blok `sticky top`, bir sonraki gelirken önceki `scale .96` + `opacity .5` scrub; mobilde pin yok.
- **I — Canlı şerit.** Eski buzzword marquee'lerinin tam tersi: "İZMİR 14:42 · NYSE OPEN · LSE CLOSES IN 1H 12M · BIST OPEN", markethours.live verisinden. Hem ürünü kanıtlar hem JetBrains Mono'ya meşru bir iş verir. Public JSON endpoint gerekir; yoksa borsa saat tablosundan istemci tarafında hesaplanır.
- **J — İmleç ısı izi.** Masaüstünde imleç bir saniye içinde soğuyan ince bir iz bırakır (canvas, ucuz). Markaya oturur ama gimmick'e kayabilir; önce A–F'yi görüp karar verelim.
- **K — Isı kırılması.** Hero başlığının shader'daki kenarın üstünde hafifçe kırılması (heat haze refraction). Render-to-texture ister; Faz 3.

**Eklememeyi önerdiklerim:** sayaçlı istatistik animasyonları (CountUp), harf karıştırma (scramble) efektleri, parçacık sistemleri, 3D obje, preloader yüzdesi. Hepsi 2024–26 şablon imzası; [11](11-ai-slop-dedektoru.md) bunları zaten sildirdi.

## 7. Uygulama sırası

- **Faz 0 (ben, videolardan bağımsız, hemen):** `BackgroundVideo` bileşeni + kodlama script'i + `HeatField` alfa çıkışı + A, D, E, F. Klip gelmeden test için shader'dan türetilmiş geçici bir koyu klip kullanırım, gerçek klip gelince yerine konur.
- **Faz 1 (sen Flow, ben entegrasyon):** Klip 1 → hero, Klip 2 → About, Klip 3 → CTA (B). Market Hours kaydını ben alırım, index hover'a bağlarım (C'nin ilk yarısı).
- **Faz 2:** senin simülatör kayıtların → kartlar ve case-study hero'ları (C'nin kalanı), G, H, I.
- **Faz 3:** K, J, 404 klibi.

## 8. Senin vereceğin kararlar

1. Hero'da video olsun mu? Önerim: evet, Klip 1, shader üstte; anahtarla kurulur, yan yana bakıp karar veririz.
2. CTA'da loop mu, scroll'la tutuşma mı? Önerim: scroll'la tutuşma (Klip 3, kare dizisi).
3. Flow planın 1080p mi, 4K mı veriyor? 4K varsa 1440p varyantı çıkarırız; yoksa 1080p + grain geniş ekranda da yeter.
4. Vocabulary / Simple Note / Passport.AI simülatör kayıtlarını alabilir misin? Market Hours bende.
5. markethours.live'ın public JSON endpoint'i var mı (canlı şerit için)?
6. Faz 0'a şimdi başlayayım mı?

## Kaynaklar (Flow özellikleri)

- Flow'da Veo 3.1, "Frames to Video" (ilk/son kare) ve Extend: [YourStory](https://yourstory.com/ai-story/google-veo-31-flow-ai-editing-tool), [DataCamp Veo 3.1 rehberi](https://www.datacamp.com/tutorial/veo-3-1-complete-guide-with-examples), [getimg.ai](https://getimg.ai/blog/google-veo-3-1-review), [Atlas Cloud Flow rehberi](https://www.atlascloud.ai/blog/guides/google-flow-veo-3.1-guide)
- 1080p ve 4K (upscale) çıkış: [Storyboard18](https://www.storyboard18.com/how-it-works/google-expands-veo-3-1-with-vertical-video-support-and-youtube-integration-87665.htm), [Mobigyaan](https://www.mobigyaan.com/google-veo-3-1-update-native-916-video-4k-output), [DataNorth](https://datanorth.ai/blog/google-veo-what-is-it-and-why-is-it-important)
