# Tasarım uygulaması — Konsept A "The Working Edge" hayata geçirildi

← [Ana rapor](README.md) · [İçerik ve SEO adımı](21-icerik-ve-seo-duzenlemeleri.md)

Bu dosya 20 boyutluk eleştirinin **tasarım, hareket, görsel, mobil, erişilebilirlik ve sistem katmanı** kısımlarının uygulanmış hâlini özetler. Build temiz (36 statik sayfa), lint hatasız, Playwright probe'ları ile reveal'lar, header davranışı, sayfa geçişi, satır hover'ı, mobil menü (inert + Escape), ilk ziyaret açılışı ve footer ısınması doğrulandı.

## 1. Konsept: tek fikir

Terminal/sci-fi kostümü tamamen gitti. Sitenin tek görsel ilkesi artık ismin anlamı: **alazın çalışan kenarı**.

- **Tek aksan:** `--ember` (#ff5a1f) ve gradyanı (#fff4e6 → #ffb454 → #ff5a1f) yalnızca kenarlarda: wordmark noktası, `::selection`, focus halkası, okuma çubuğu, hover alt çizgisi, nav aktif çizgisi, form zorunlu yıldızı ve seçili kart kenarlığı, madde işaretleri. Dolgu olarak hiçbir yerde kullanılmıyor.
- **Shader:** `src/components/HeatField.jsx`, ~40 KB JS ile tek fragment shader (fbm gürültüsüyle sürülen ince ısı kenarı; imleci takip eder, scroll hızıyla parlar). Üç varyant: `hero` (ana sayfa hero ve CTA), `band` (About'ta "ALAZ" bölümü), `quiet` (About/Services kapanışları). 20 MB'lık sekiz stok video **silindi**. WebGL yoksa veya reduced-motion'da CSS'ten statik bir kenar çizilir; DPR 1.5'te sınırlı, 45 fps, görünür alanın dışında durur.
- **İlk ziyaret "ignite":** nokta griden kor'a, kor'dan beyaza tutuşur, perde yukarı açılır (~1.4 s, `sessionStorage` ile bir kez; head script'i `html.intro` sınıfını erken ekler, flaş yok).

## 2. Tasarım sistemi (globals.css + tailwind.config.js)

- **Token'lar:** 3 yüzey (`--ink`, `--surface-1/2`), 2 hairline, 4 metin grisi (`--fg-1..4`), 1 aksan, 7 boşluk adımı (`--s-1..7`), 2 easing (`--ease-out`, `--ease-inout`), 3 süre. 28 farklı gri ve 12 siyah tonu bunlara indi.
- **Tip ölçeği:** `.t-display-1/2`, `.t-title`, `.t-title-sm`, `.t-lead`, `.t-body`, `.t-small`, `.t-meta`. Display sınıfları `word-spacing` taşıdığı için "WHATWE" bitişmesi bitti; `.fit` artık token boyutunu üstten sınırlıyor. Mono'da `font-synthesis: none` (sahte kalın yok). Inter 3, Archivo 2 ağırlığa indi.
- **Shell + grid:** `.shell` (1680px içerik kabuğu, arka planlar tam genişlik kalır), `.grid-lines` (12 kolon hairline, hero'larda içerikle hizalı), sayfa gridleri `grid-cols-12` + `--col-gap`. Laptop breakpoint'i (≤1200) eklendi; hero yüksekliği `100svh` + flex ile 1366×768'e sığıyor.
- **Bileşen sınıfları:** `.eyebrow`, `.btn`, `.btn-ghost`, `.link-draw` (soldan çizilen ember alt çizgi), `.rail` / `.rail-mobile` (yatay snap), `.press` (dokunma geri bildirimi), `.dot`.
- **shadcn/ui, Radix, framer-motion, lucide, nextjs-toploader, tailwindcss-animate, pocketbase ve 30+ kullanılmayan paket kaldırıldı**; `src/components/ui`, `hooks`, `contexts`, `Reveal`, `CountUp`, `BackgroundVideo`, `SmoothScroll`, `ScrollReveal`, `PoweredBy` silindi. Yeni bağımlılık: `gsap` (ScrollTrigger + SplitText). ESLint'te `no-unused-vars` ve `jsx-uses-vars` açıldı.
- **İkon seti:** `src/components/Icon.jsx`, 7 glif (arrow → iç link, external ↗ yalnızca dış link, down, left, check, plus, close), Archivo 900'e uygun 2.2 stroke.

## 3. Hareket grameri (`src/components/Motion.jsx`)

- Lenis, GSAP ticker üzerinde; ScrollTrigger ile senkron. Rota değişiminde scroll sıfırlanır, trigger'lar temizlenir.
- **Reveal'lar:** `data-reveal="lines"` → SplitText satır maskesi (yPercent 110→0, 1.1 s expo.out, 70 ms stagger); `fade` → 24px yükselme; `line` → eyebrow hairline'ı soldan çizilir (`--draw`). `data-delay` ile kademelendirme. Hydration öncesi içerik görünür; reduced-motion'da hiçbir şey hareket etmez.
- **Sayfa geçişi:** nprogress yerine perde: `Link` (src/i18n/navigation.js) tıklamada perdeyi kapatır (0.5 s), rota değişince açar (0.6 s), ortada wordmark. Modifier tıklamaları, dış linkler ve hash'ler native.
- **Header:** üstte şeffaf, 40px sonra solid, aşağı kaydırınca gizlenir, yukarı gelince döner; nav'da aktif/hover ember çizgisi; wordmark ve CTA manyetik.
- **Cursor:** yalnız `pointer: fine`; 10px ember-hot nokta, linklerde 44px, `data-cursor="VIEW|OPEN|READ|NEXT"` ile etiketli 72px; dokunmatikte yok, native imleç hiç gizlenmez.
- **Parallax:** `data-parallax` ile görsellerde ±5–8%.
- **Footer:** sayfa sonuna yaklaşırken zemin ink'ten derin kor'a (#160c06) ısınır; alt kesilmiş dev wordmark, noktası parlar.
- **Okuma çubuğu:** ember gradyan, Lenis scroll'undan `scaleX`.

## 4. Sayfa bazında

- **Ana sayfa:** hero'da wordmark + h1 cümlesi 7/5 kolon düzeninde, ısı kenarı altta; Work kartları 6+6 (geniş ekranda ikinci kart aşağı kaydırılır, parallax); hizmetler 3 kart yerine **satır listesi** (numara / başlık / açıklama / ok, hover'da arka plan ve ember-hot başlık); blog kartları; CTA bölümü sol başlık + sağ buton.
- **Hakkında:** "THE WORKING FLAME." hero (quiet shader), "ALAZ." bölümünde band shader (alev motifi görünür hale geldi), ürünler, süreç satırları (display başlık + 12 kolon), kapanış.
- **Hizmetler:** sol **sticky index** (tablet ve altında üstte yatay chip rail), beş blok 9 kolonluk grid içinde (açıklama / teslimatlar / stack metin olarak, chip yok), "In practice" + CTA; FAQ'de sticky başlık ve `+` döner ikon.
- **İşler:** satırlar hover'da **ürünün rengine** boyanır (`--project-bg/--project-fg`, Vocabulary sarı, Market Hours koyu teal) ve kapak 300px önizleme olarak belirir; mobilde her satırda kapak görseli.
- **Case study:** hero **ürün renginde** (gradyan katmanları kalktı, görsel 5 kolonda tam renkli, parallax), facts şeridi, bölüm başlıkları `t-display-2`, galeri masaüstünde 4 kolon / mobilde **snap rail**, "next project" satırı sonraki ürünün rengiyle.
- **Blog:** index'te son yazı tam genişlik hero + diğerleri kart; yazı sayfasında sol **sticky içindekiler** (h2'lerden üretilir), 68ch ölçü, ember madde işaretleri, `hyphens`.
- **Start a project:** 4/7 kolon, token'lanmış alanlar (16px, ember focus), adım değişiminde başlığa odak + scroll, seçili kart ember kenarlık.
- **Legal/Privacy:** sol sticky bölüm listesi, 7 kolon gövde. **404:** büyük linkler, `t-title-sm`.
- **Header/menü:** tam ekran menü (clip-path açılış, satır stagger, focus trap, Escape, `inert`, Lenis stop), altta e-posta + canlı İzmir/New York saatleri + dil.

## 5. Sistem katmanı ve erişilebilirlik

- `color-scheme: dark`, koyu scrollbar + `scrollbar-gutter: stable`, autofill ve `<option>` koyu, ember `::selection` (beyaz zeminde ters), ember focus halkası.
- **Print:** header/footer/canvas/cursor gizli, açık zemin, reveal'lar açık, dış linklerin URL'si basılır. **forced-colors** kuralları.
- `error.jsx` + `global-error.jsx` (markalı hata ekranları), skip link, `main#main`, menüde `aria-modal` + `aria-controls`, nav'da `aria-current`, ikonlar `aria-hidden`.
- Tailwind `hoverOnlyWhenSupported`: dokunmatikte yapışan hover yok; `.press` ile dokunma geri bildirimi.
- Reduced-motion: Lenis, GSAP, shader, cursor, intro ve geçişler tamamen kapalı; CSS tüm geçişleri 0'a çeker.

## 6. Bilinçli olarak yapılmayanlar / sonraki tur

- **View Transitions API** yerine perde tercih edildi (tarayıcı desteği ve next-intl Link ile uyum); paylaşımlı kapak morph'u ileride eklenebilir.
- **Vocabulary için sürüklenebilir kart demosu** ve **Market Hours canlı "open now" widget'ı** (konseptin imza anları 4) ürün API'si/ham ekran görselleri gerektiriyor; galeri şimdilik snap rail.
- **Gerçek çekimler** (ekip, masa, ürün ekran kayıtları) ve yerel blog kapakları sizden gelecek varlıklara bağlı.
- Archivo **variable wdth** ekseni (kinetik hero) Google Fonts'un variable Archivo'sunu `axes:['wdth']` ile yüklemeyi gerektiriyor; bu turda statik 900 ile kalındı.
- Awwwards gönderimi öncesi: gerçek cihazlarda Safari/Firefox testi, LCP ölçümü (shader `requestAnimationFrame` ile başlıyor, hero metni statik HTML), Lighthouse CI.
