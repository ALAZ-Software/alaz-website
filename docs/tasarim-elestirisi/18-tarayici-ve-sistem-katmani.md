# Tarayıcı ve işletim sistemi katmanı: color-scheme, scrollbar, native kontroller, autofill, print, seçim/imleç sistemi, hata ekranları

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 23 (1 kritik · 12 önemli · 10 ince işçilik) · **Korunacaklar:** 10 · **Eklenecekler:** 4

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Sitenin "sistem katmanı" neredeyse hiç tasarlanmamış: html'de color-scheme yok (Windows/Linux'ta #0a0a0a zeminin yanında bembeyaz UA scrollbar, açık temalı select popup'ı, Chrome'un açık mavi autofill boyası), tek satır @media print yok (legal/case study 3-4 sayfalık, header'ı her sayfada tekrar eden, gri-üstü-beyaz PDF'ler) ve daha kötüsü scroll-reveal sistemi print'te açılmadığı için home/about/case study'nin viewport'a girmemiş tüm bölümleri boş basılıyor (10/10, 18/18, 11/11 eleman opacity:0). error.jsx/global-error.jsx yok → herhangi bir client exception Next'in beyaz "Application error" ekranına düşüyor; blog/case slug'ları 404 yerine 200 ile çıplak bir "not found" bloğu basıyor. Dokunmatikte hover gate'lenmemiş ve bunun somut bir bedeli var: intake formunun ilk adımında seçilen kart beyaz değil gri border'la görünüyor. Olumlu taraf: markalı 404, ters çevrilmiş beyaz ::selection, tap-highlight reset'i, doğru autocomplete/type attribute'ları, preflight'tan gelen text-size-adjust ve canvas'a propagate eden koyu zemin — yani iskelet var, üstüne 150 satırlık bir "system.css" ve bir error boundary ile bu boyut Awwwards seviyesine çekilebilir. Not: ekran görüntülerinin sol altındaki "N" rozeti Next dev indicator'ıdır, production'da yoktur.

## Korunması gerekenler

- 404 sayfası markalı ve tam çerçeveli: LegalContent type='not-found' ile eyebrow ('ALAZ / INFORMATION … 404'), fit başlık, gövde ve çerçeveli '← BACK TO HOME' (shots/404-desktop-fold.png, 404-mobile-full.png); [...rest] catch-all sayesinde /tr altında da doğru dil chrome'u ve 404 status; meta robots noindex. Bu sistem 500 ve slug 404'leri için de şablon olmalı.
- ::selection beyaz / #0a0a0a ters çevrimi siteye uygun, tutarlı ve nadir görülen bir karar — koruyun, 12'deki ek kurallarla tamamlayın.
- `-webkit-tap-highlight-color: transparent` a/button'da düşünülmüş; Tailwind preflight `-webkit-text-size-adjust: 100%`'ü zaten basıyor (derlenen CSS'te doğrulandı) → iOS landscape'te metin şişmesi yok. Brief'teki 'text-size-adjust yok' iddiası yanlış, ekstra kural gerekmez.
- html'de background olmadığı için body'nin #0a0a0a'sı canvas'a propagate ediyor → macOS/iOS rubber-band (overscroll) alanı koyu; theme-color = manifest background_color = body = #0a0a0a tutarlı. overscroll-behavior için ek CSS gerekmiyor.
- Formda `autoComplete="name|email|organization"`, `type="email"`, `aria-invalid`, `role="alert"`, `noValidate` + kendi validasyonu: tarayıcı autofill'i ve mobil klavye doğru tetikleniyor — sadece boyası (03) ve select'i (04) eksik.
- Chrome 'minimum font size 16' ile hiçbir şey kırılmıyor (ölçüm: scrollWidth 1440 = clientWidth, ticker 49px sabit kalıyor); %150 text zoom'da header ve intake formu ayakta (shots/sys-textzoom150-intake.png).
- prefers-reduced-motion'da Lenis devre dışı + reveal geçişleri kapalı; `(scripting: none)` fallback'i ile JS yokken içerik görünür — sistem düşünülmüş, sadece print listeye eklenmemiş (06).
- favicon SVG kendi #0a0a0a zeminini taşıyor → açık ve koyu sekme çubuklarında okunur; favicon.ico fallback (Safari SVG desteklemez) ve 180px apple-touch-icon mevcut.
- forced-colors'ta layout ayakta: hiyerarşi, çipler, kartlar okunuyor; seçili kart ✓ ikonuyla ayırt ediliyor (shots/sys-forced-colors-services.png, sys-forced-colors-intake-selected.png).
- `:focus-visible { outline: 2px solid white; outline-offset: 4px }` global ve tutarlı; `scroll-padding-top`, `.lenis-smooth` scroll-behavior override'ı ve `.lenis-stopped` kuralı yazılmış (stop() bağlanınca hazır).

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `gap-browser-system-layer-01` — color-scheme tanımlı değil: tarayıcı siteyi açık tema sanıyor

- **Önem:** KRİTİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:6-38 (:root'ta color-scheme yok); src/app/[locale]/layout.jsx:42-46 (viewport export'unda colorScheme yok, head'de <meta name="color-scheme"> basılmıyor — curl ile doğrulandı); kanıt: gaps/a11y.json → html ve <select> için computedStyle.colorScheme = 'normal'; gaps/scrollbar-services.png; shots/sys-scrollbar-1024-before.png

**Sorun.** html ve form kontrolleri color-scheme 'normal' (= light). Sonuçları: Windows/Linux'ta ve macOS 'Always show scrollbars' ayarında #0a0a0a zeminin sağ kenarında bembeyaz track + açık gri thumb'lı klasik scrollbar (scrollbar-services.png'de 15px'lik beyaz şerit); Chrome/Edge'de <select> popup'ı, textarea resize grip'i, autofill rengi (bkz. 03), date/number spinner'ları ve native tooltip'ler açık temada çiziliyor; sayfa CSS'i yüklenmeden önceki canvas beyaz olduğu için cold navigation'da (yeni sekme, hard reload, dış linkten geliş) kısa bir beyaz flaş oluyor.

**Neden önemli.** "Mac'te tasarlandı, Windows'ta hiç bakılmadı" template sinyalinin ta kendisi. Awwwards jürisi ve müşterilerin yarısı Windows'ta bakar; koyu sitede beyaz scrollbar ilk saniyede 'bitmemiş' der. Tek satırla çözülen, çözülmemişse en çok göze batan şey.

**Ne yapılmalı.** globals.css @layer base içinde :root bloğunun ilk satırı: `color-scheme: dark;`. layout.jsx: `export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0a0a0a', colorScheme: 'dark' }` → Next `<meta name="color-scheme" content="dark">` basar; tarayıcı CSS gelmeden canvas'ı koyu boyar (beyaz flaş biter). Form elemanları inherit eder, ayrı kural gerekmez. Bu tek başına Chrome'un varsayılan koyu scrollbar'ını getirir ama o da UA tasarımıdır; 02'deki token'larla tamamlayın.

### ÖNEMLİ

#### `gap-browser-system-layer-02` — Scrollbar tasarım kararı değil UA artığı; menü açılınca içerik 15px zıplıyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css (scrollbar-color / scrollbar-width / ::-webkit-scrollbar / scrollbar-gutter yok); src/components/Header.jsx:22-25 (document.body.style.overflow = 'hidden'); kanıt: shots/sys-scrollbar-1024-before.png vs sys-scrollbar-1024-after.png (color-scheme:dark + scrollbar-color enjekte edilmiş hali); shots/sys-menu-open-scrollbar-1000.png; ölçüm: 1000px genişlikte menü açılınca hamburger x 885→900, scrollbar genişliği 15→0

**Sorun.** Scrollbar için hiçbir karar verilmemiş: 01 düzelse bile Chrome'un gri-üstü-koyu varsayılanı, Firefox'un kendi çizimi ve Safari'nin overlay'i üç farklı şey gösterir. Ayrıca scrollbar görünür platformlarda mobil menü açılınca body overflow:hidden scrollbar'ı yok ediyor → header'daki logo sabit kalırken sağdaki TR / START A PROJECT / hamburger 15px sağa kayıyor, kapanınca geri geliyor (ölçüldü).

**Neden önemli.** Scrollbar koyu sitede sayfanın tam kenarında duran, sürekli görünen tek UI parçası; tasarlanmamışsa sitenin 'çerçevesi' tasarlanmamış demektir. Menü zıplaması ise klasik 'overflow:hidden ile scroll kilidi' template hatası.

**Ne yapılmalı.** globals.css: `html { scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: #2a2a2a #0a0a0a; }` (Chrome 121+, Firefox; standart özellik varsa Chrome ::-webkit-scrollbar'ı yok sayar, o yüzden Safari için ayrı blok): `@supports not (scrollbar-color: auto) { ::-webkit-scrollbar { width: 10px; height: 10px } ::-webkit-scrollbar-track { background: #0a0a0a } ::-webkit-scrollbar-thumb { background: #2a2a2a; border: 3px solid #0a0a0a } ::-webkit-scrollbar-thumb:hover { background: #3a3a3a } }`. Thumb rengi --line'ın (rgba 255,255,255,.13 ≈ #262626) bir ton üstü olsun ki hairline sistemine ait görünsün. scrollbar-gutter: stable zıplamayı bitirir; menü kilidinin doğru yolu için bkz. 11.

#### `gap-browser-system-layer-03` — Chrome autofill formu açık mavi/siyah boyuyor; override yok

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:12 (fieldInput: bg-[#111] text-white), :172 (#name autoComplete="name"), :177 (#email autoComplete="email"), :182 (#company autoComplete="organization"); src/app/globals.css (:-webkit-autofill / :autofill kuralı yok); kanıt: shots/sys-autofill-1-light-scheme.png (Chrome UA sheet'inin #E8F0FE rengiyle emülasyon), sys-autofill-2-dark-scheme.png (color-scheme:dark ile gelecek rgba(70,90,126,.4)), sys-autofill-3-fixed.png (önerilen override)

**Sorun.** Chrome/Edge UA stylesheet'i: `input:-internal-autofill-selected { background-color: -internal-light-dark(#E8F0FE, rgba(70,90,126,.4)) !important; color: -internal-light-dark(FieldText, #fff) !important }`. Site light sayıldığından (01) kullanıcı adını/e-postasını kayıtlı profilden seçtiği an YOUR NAME ve EMAIL alanları açık mavi #E8F0FE'ye, yazı siyaha döner (ekran 1). color-scheme:dark ile bile sitede hiçbir karşılığı olmayan mavi-gri bir ton kalır (ekran 2). Safari'nin sarı autofill'i aynı şekilde sızar. Bu, formun kapanış adımında (03 / 03 — CONTACT DETAILS) markanın kontrolü dışında kalan tek renk.

**Neden önemli.** Autofill, formu gerçekten dolduran herkesin gördüğü hal; prototipte görünmez, prod'da herkes görür. Mono-krom bir sitede aniden beliren açık mavi kutu 'CSS'i tamamlanmamış' sinyali.

**Ne yapılmalı.** globals.css @layer base: `input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, select:-webkit-autofill { -webkit-text-fill-color: #fff; caret-color: #fff; box-shadow: inset 0 0 0 1000px #111; transition: background-color 9999s ease-out; }` + focus halinde beyaz border korunsun: `input:-webkit-autofill:focus { box-shadow: inset 0 0 0 1000px #111, 0 0 0 1px #fff }`; standart seçiciyi de ekleyin: `input:autofill { background: #111; color: #fff }` (Firefox). Alternatif `-webkit-background-clip: text` yaklaşımı placeholder'ı bozabilir, box-shadow tercih edin. Sonuç ekran 3'teki gibi #111 kalır; Chrome'un anahtar ikonu yine gelir, ona dokunmayın.

#### `gap-browser-system-layer-04` — Native <select> popup'ı sitenin tek 'tasarlanmamış penceresi'

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:14-18 (selectChevronStyle), :153-156 (#timeline), :160-163 (#budget), :12 (fieldInput + appearance-none); kanıt: gaps/a11y.json selectColorScheme { colorScheme:'normal', bg:'rgb(17,17,17)', appearance:'none' }; shots/kb-intake-input-focus.png (kapalı hal özenli)

**Sorun.** Kapalı hal elle çizilmiş (appearance:none + beyaz chevron) ama tıklanınca açılan liste tamamen OS/UA: Windows Chrome'da beyaz zemin, Segoe UI, mavi hover; 01 düzelince koyu gri Chrome popup'ı — yine siteden kopuk, hover/focus dili farklı, rounded. Seçenekler kısa listeler (timelineOptions/budgetOptions 4-5 madde), popup gerektirecek yoğunluk yok. Ayrıca input'larda enterKeyHint/autoCapitalize/spellCheck gibi mobil klavye ipuçları yok.

**Neden önemli.** Awwwards seviyesinde formda 'bir anda OS'e dönen' bir an kalmaz. Popup'ın görünümü tarayıcı/OS'e göre değişir; markanın en kontrollü anı olması gereken brief formunda kontrolü bırakmak kraft kaybı.

**Ne yapılmalı.** İki select'i, aynı sayfanın üstündeki proje-tipi kart diline paralel 'segmented chips'e çevirin: `<fieldset role="radiogroup" aria-labelledby="timeline-label">` içinde her seçenek `<label><input type="radio" name="timeline" className="sr-only peer" /><span className="inline-flex border border-[#393939] px-[16px] py-[12px] font-mono text-[12px] tracking-[.07em] peer-checked:border-white peer-checked:bg-[#1c1c1c] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white">`; `update('timeline', value)` aynen kalır. Popup yok, touch hedefi büyük, state her zaman görünür. Listbox şartsa: shadcn select.jsx'i (src/components/ui) default haliyle değil, `rounded-none bg-[#111] border-[#393939] p-0` + item `font-mono text-[12px] px-[18px] py-[12px] data-[highlighted]:bg-white data-[highlighted]:text-black` ile. Input polish: #name `autoCapitalize="words" enterKeyHint="next"`, #email `autoCapitalize="none" spellCheck={false} enterKeyHint="next"`, #company `enterKeyHint="send"`, #brief `enterKeyHint="enter"`.

#### `gap-browser-system-layer-05` — Print stylesheet yok: header her sayfada, gri-üstü-beyaz metin, 190px başlık, 3-4 sayfa

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css (hiç @media print yok); src/components/Header.jsx:27 (fixed header); src/components/ReadProgress.jsx:21 (fixed 2px bar, blog'da basılıyor); src/components/LegalContent.jsx:13 (clamp(80px,13vw,190px) başlık), :17 (text-mute gövde); kanıt: gaps/print-legal-1.png, print-legal-2.png (2. sayfanın tepesinde yine 'ALAZ. TR START A PROJECT ✕'), print-legal-bg-1.png ('Background graphics' açıkken tam siyah sayfa), print-legal-emulated.png, print-case-1.png (hero görseli yok, başlık gri), gaps/print-legal.pdf (3 sayfa), print-case.pdf (4 sayfa)

**Sorun.** En çok yazdırılacak sayfalar legal/privacy (sözleşme öncesi hukuk/satın alma PDF'e basar) ve case study'ler. Çıktı: (1) fixed header Chrome'da her A4 sayfasında tekrar ediyor; A4 genişliği (~794px) tablet kırılımına girdiği için nav yerine hamburger/✕ ikonu basılıyor; (2) Chrome'un varsayılanı (arka plan kapalı) ile gövde #9fa3a9 beyaz kağıtta ≈2.4:1 — okunmuyor; arka plan açıkken 3 sayfa tam siyah zemin; (3) 190px 'LEGAL.' + nokta glifi + mono eyebrow'lar ilk sayfanın yarısını yiyor; (4) case study'de hero Image/video yok, 'MARKET HOURS.' gri; (5) link URL'leri kayboluyor (store linkleri, mailto); (6) blog'da ReadProgress çizgisi basılıyor.

**Neden önemli.** Print, 'sistem katmanı düşünülmüş mü'nün turnusolu; template siteler asla print yazmaz. Hukuk ekibinin eline geçen başlığı kopuk, gri, header'lı 3 sayfalık PDF marka algısını sıfırlar.

**Ne yapılmalı.** globals.css sonuna: `@media print { @page { size: auto; margin: 18mm 16mm } :root { color-scheme: light; --ink:#fff; --surface:#fff; --line:#000; --gray:#222; --dim:#444; --white:#000 } html, body { background:#fff !important; color:#000 !important } header, footer, video, [aria-hidden="true"], .animate-signal-marquee, .animate-ticker, #nprogress, .fixed { display:none !important } main { padding-top:0 !important } .fit { font-size:36pt !important; line-height:1 !important; letter-spacing:-.03em !important; margin:0 0 12pt !important } h2 { font-size:14pt !important; margin-top:18pt !important; break-after:avoid } p, li { font-size:10.5pt !important; line-height:1.5 !important; color:#111 !important; max-width:none !important } section, article { break-inside:avoid } a[href^="http"]::after, a[href^="mailto"]::after { content:" (" attr(href) ")"; font:9pt var(--font-mono); color:#555 } img { filter:none !important; max-height:60vh } [data-reveal] { opacity:1 !important; transform:none !important } }`. Sayfa bazında Tailwind `print:` varyantı: LegalContent üst mono satırı `print:hidden`, başına `<p className="hidden print:block font-mono text-[9pt]">ALAZ — alaz.pro — {t('documentLabel')}</p>` letterhead; case study hero Image'ine `print:static print:h-auto`.

#### `gap-browser-system-layer-06` — Scroll-reveal print'te açılmıyor: sayfanın görünmemiş bölümleri BOŞ basılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:76-90 (.reveal-ready [data-reveal]:not(.is-revealed) { opacity:0 }), :92-100 (sadece prefers-reduced-motion ve scripting:none için açılıyor, print yok); src/components/ScrollReveal.jsx:18-33 (IntersectionObserver — viewport'a girmeyen eleman hiç reveal olmaz); kanıt: gaps/print-case-2.png (yalnız '01 / THE CHALLENGE', '02 / THE APPROACH' etiketleri var, gövde metni yok); print media emülasyonu ölçümü: case study 10/10, home 18/18, about 11/11 [data-reveal] elemanı opacity:0

**Sorun.** Kullanıcı sayfanın tepesindeyken Ctrl+P / 'Save as PDF' yaparsa viewport'a hiç girmemiş her [data-reveal] eleman (başlıklar, paragraflar, kartlar, galeri, marker'lar) opacity:0 ile basılıyor. Case study PDF'inde Challenge/Approach/Outcome metinleri, galeri ve deliverable'lar boş; home'da VALIDATION, CORE CAPABILITIES, seçili işler ve START bloğu boş. Aynı mekanizma reader mode, PDF üreten uzantılar ve headless `print()` ile de tetiklenir.

**Neden önemli.** Bu estetik değil, düz bug: sayfanın üçte ikisi boş kağıt. Müşteri 'PDF'ini attım, boş geldi' der; jüri görmez ama bir reviewer Ctrl+P'ye basarsa görür.

**Ne yapılmalı.** globals.css:92 media listesini genişletin: `@media (prefers-reduced-motion: reduce), (scripting: none), print { .reveal-ready [data-reveal] { transition:none } .reveal-ready [data-reveal]:not(.is-revealed) { opacity:1; transform:none } }`. Ek güvenlik (Safari print emülasyonu media query'yi bazen geç uygular): ScrollReveal.jsx useEffect'ine `const reveal = () => document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed')); window.addEventListener('beforeprint', reveal); return () => window.removeEventListener('beforeprint', reveal)`.

> **Doğrulayıcı notu:** Mekanizma doğru ve kendi print emülasyonumda tekrarlandı: scrollY 0'da case study 10/10, home 18/18, about 11/11 [data-reveal] elemanı opacity:0 (örn. 'VALIDATION.', '01 / THE CHALLENGE' gövdesi, testimonial kartları). gaps/print-case-2.png'de yalnız etiketler var, gövde yok. Düzeltme: severity critical değil major — legal/privacy sayfalarında hiç data-reveal yok (ölçüm: 0/0), yani en çok yazdırılan hukuk sayfaları bu bug'dan etkilenmiyor; home/about/case/blog/services etkileniyor. Fix doğru: globals.css:92 media listesine `print` ekle + beforeprint'te is-revealed ver.

#### `gap-browser-system-layer-07` — error.jsx / global-error.jsx yok: her runtime hata Next'in beyaz 'Application error' ekranı

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/ (error.jsx yok), src/app/ (global-error.jsx yok, loading.jsx yok) — `find src -iname '*error*'` sadece not-found.jsx döndürüyor; kanıt: node_modules/next/dist/client/components/builtin/global-error.js → varsayılan: beyaz zemin, system-ui 14px, ortalanmış 'Application error: a client-side exception has occurred while loading alaz.pro (see the browser console for more information).'

**Sorun.** Lenis, IntersectionObserver, video, next-intl (messages/en.json'da eksik anahtar → server-side throw + 'Digest: …'), 3. parti script ya da bir hydration mismatch'ten gelen tek bir yakalanmamış exception → header, footer, marka, dil: hiçbiri olmayan bembeyaz sistem fontlu sayfa. (IntakeForm'un fetch'i try/catch içinde, o güvende.) 404 için özenli bir sayfa var ama 500 için yok — hata sistemi yarım.

**Neden önemli.** 'see the browser console' yazan beyaz ekran en sert 'bitmemiş' sinyali; bir hata anında marka tamamen kaybolur. Awwwards sitelerinde hata durumları da sistemin parçasıdır.

**Ne yapılmalı.** `src/app/[locale]/error.jsx` ('use client', `{ error, reset }` alır): LegalContent'in görsel dilini (server component import edemeyeceği için inline) tekrar eden bileşen — eyebrow `ALAZ / INFORMATION` … `500`, `.fit` ile 'SOMETHING BROKE.' + gri nokta, gövde 'Our side, not yours. Try again, or go back to the beginning.', aksiyonlar `<button onClick={reset}>TRY AGAIN</button>` + `<Link href="/">← BACK TO HOME</Link>` (404'teki buton stili), altında mono 11px `error.digest` (destek için). `src/app/global-error.jsx`: kendi `<html lang="en"><body>` + inline `<style>` (globals.css yüklenmemiş olabilir): `background:#0a0a0a; color:#fff; font-family: system-ui` fallback ile aynı metin + `useEffect(() => console.error(error))`. Test: error.jsx'e geçici `throw new Error('test')`. loading.jsx rotalar statik olduğu için gerekmez; geçiş hissi için bkz. Eklemeler #2.

> **Doğrulayıcı notu:** Doğru kısım: src/app altında error.jsx, global-error.jsx, loading.jsx yok (find yalnız not-found.jsx döndürüyor); Next 15.5'in builtin global-error.js beyaz zemin, system-ui, 'Application error: a client-side exception has occurred…' basıyor. Yanlış kısım: next-intl eksik anahtarda varsayılan olarak throw etmez, console.error + anahtar fallback'i döner (yalnız t.raw() sonucuna .map çağrılan yerlerde ikincil TypeError çıkabilir). Hydration mismatch de prod'da error boundary'ye düşmez, client re-render ile toparlanır. Yani gerçek tetikleyici sayısı reviewer'ın yazdığından az; yine de 500 durumunun tamamen markasız olması sistemde boşluk. error.jsx + global-error.jsx önerisi (404 diliyle, inline style fallback'li) uygulanabilir.

#### `gap-browser-system-layer-08` — Blog/case study yanlış slug'ları 404 yerine 200 ile üçüncü bir 'not found' tasarımı basıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:39-46 (inline <main pt-[76px]> + fit h1 + back link, notFound() yok); src/app/[locale]/blog/[slug]/page.jsx:46-55 (aynı pattern); kanıt: curl /case-studies/does-not-exist → 200, /blog/does-not-exist → 200, /does-not-exist → 404; karşılaştırma: shots/404-desktop-fold.png (tasarlanmış 404)

**Sorun.** Yanlış slug'da notFound() çağrılmıyor; inline bir blok render edilip HTTP 200 dönüyor. Sitede üç farklı 'bulunamadı' var: tasarlanmış olan (eyebrow + '404' + gövde + çerçeveli buton), case için çıplak olan, blog için çıplak olan. Çıplak olanlarda başlık `pt-[76px]` ile header'ın hemen altına yapışıyor (üst satır/eyebrow yok), gövde metni yok.

**Neden önemli.** Hata ekranı tek sesli olmalı; ayrıca 200 status Google'a 'soft 404' uyarısı verdirir, silinen/yanlış URL'ler indekste kalır (next.config.js'de alpha/beta/gamma için redirect yazılmış ama genel kural eksik).

**Ne yapılmalı.** Her iki dosyada `import { notFound } from 'next/navigation'` ve `if (!project) notFound();` / `if (!post) notFound();` — inline blokları ve `notFoundHeading` / `backToArchive` / `backToBlogCta` çevirilerini silin. Bağlama özel kopya isteniyorsa `src/app/[locale]/case-studies/[slug]/not-found.jsx` → `<LegalContent type="not-found" />` iskeletiyle 'PROJECT NOT FOUND.' + '← ALL CASE STUDIES' (LegalContent'e opsiyonel `title`/`backHref` prop'u). generateMetadata zaten `{}` dönüyor; notFound ile metadata not-found'dan gelir.

#### `gap-browser-system-layer-09` — Hover touch'ta gate'lenmemiş; seçilen proje-tipi kartı gri border'la kalıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** tailwind.config.js (future.hoverOnlyWhenSupported yok → derlenen CSS'te 59 :hover kuralı, 0'ı @media (hover:hover) içinde); src/components/IntakeForm.jsx:128 (`hover:border-[#888]` ile seçili `border-white` çakışıyor); kanıt: shots/sys-touch-sticky-hover.png — dokunarak seçilen '02 Mobile App' kartının border'ı beyaz değil rgb(136,136,136); ölçüm: aria-pressed=true && :hover → borderColor #888

**Sorun.** (a) Dokunmatikte :hover yapışkan: tap edilen her eleman başka bir yere dokunana kadar hover halinde kalır (nav linkleri, case satırları, FAQ, kartlar). (b) Somut bug: kart hem `hover:border-[#888]` hem seçiliyken `border-white` alıyor; `:hover` seçicisi daha spesifik olduğundan kazanıyor → mouse ile seçili kartın üstüne gelince beyaz border griye düşüyor; telefonda ise seçtiğin kart seçili görünmüyor (gri border, yalnız ✓ ikonu fark ettiriyor) — dönüşüm akışının 1. adımında.

**Neden önemli.** 'Seçtim mi?' belirsizliği formun en kritik anında; hover'ın touch'a sızması 'desktop'ta tasarlandı, telefonda test edilmedi' sinyali.

**Ne yapılmalı.** tailwind.config.js: `future: { hoverOnlyWhenSupported: true }` → tüm `hover:` varyantları `@media (hover: hover)` içine girer. IntakeForm.jsx:128: `hover:border-[#888]` → `[&:not([aria-pressed=true])]:hover:border-[#888]`, seçili stili cn ile string eklemek yerine attribute varyantıyla yazın: `aria-[pressed=true]:border-white aria-[pressed=true]:bg-[#1c1c1c]` (sıra/specificity sorunu kalmaz). Aynı 'state > hover' kuralını Header nav aktif linki (`isActive && 'text-white'` vs `hover:text-white` burada çakışmıyor ama aynı yapı) ve case rows için gözden geçirin.

#### `gap-browser-system-layer-11` — Scroll kilidi body overflow:hidden ile: iOS'ta sızar, Lenis durdurulmuyor, anchor offset tutarsız

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:22-25 (document.body.style.overflow = open ? 'hidden' : ''); src/components/SmoothScroll.jsx:14 (anchors offset -78 sabit; lenis.stop() hiç çağrılmıyor); src/app/globals.css:44-46 (scroll-padding-top: 78px; header desktop 76px / mobile 66px), :53-55 (.lenis.lenis-stopped — stop() olmadığı için ölü kural); kanıt: shots/sys-menu-open-scrollbar-1000.png + ölçüm (hamburger 885→900)

**Sorun.** (1) Scrollbar'lı platformlarda menü açılınca 15px zıplama (02'de ölçüldü). (2) iOS Safari `body { overflow:hidden }`'ı dokunma kaydırmasında saymaz: menü açıkken sürüklemek arkadaki sayfayı kaydırır, adres çubuğu toggle'ı fixed header'ı titretir (bilinen iOS davranışı; burada emüle edilemedi, kodun yapısından çıkarım). (3) Menü açıkken wheel olayları hâlâ Lenis'e gidiyor; `.lenis-stopped` CSS'i var ama `lenis.stop()` yok. (4) `scroll-padding-top: 78px` + Lenis `offset: -78` sabit; mobilde header 66px → anchor hedefleri (#validation vb.) 12px alçak iniyor; reduced-motion'da Lenis kapalı → native 78px kullanır; desktop header 76 ile de 2px tutarsız.

**Neden önemli.** Scroll kilidi ve anchor hizası 'görünmez' ama her gün dokunulan sistem davranışları; iOS'ta arkası kayan menü sitenin en çok görülen mobil kusuru olur.

**Ne yapılmalı.** globals.css: `html { scrollbar-gutter: stable }` (02). Header.jsx: body.style.overflow yerine Lenis instance'ına eriş (SmoothScroll bir context/`window.__lenis` sağlasın) → `open ? lenis.stop() : lenis.start()`; nav paneline `overscroll-behavior: contain; touch-action: pan-y;`; iOS için body kilidi: `body { position: fixed; top: -${scrollY}px; width: 100% }` (kapanışta `window.scrollTo(0, y)`). Anchor: `:root { --header-h: 76px } @media (max-width:760px) { :root { --header-h: 66px } }` → `html { scroll-padding-top: var(--header-h) }`, Lenis `anchors: { offset: -parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) }`; Header'daki `h-[76px] mobile:h-[66px]`'i de aynı token'a bağlayın.

#### `gap-browser-system-layer-missed-1` — Mobil menü kısa viewport'larda kaydırılamıyor: yatay telefonda BLOG / START A PROJECT / TR, iPhone SE'de TR erişilemez

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:42 (nav: absolute top-full min-h-[calc(100dvh-76px)], overflow yok) + :22-25 (body overflow:hidden); kanıt: shots/sk-sys-menu-landscape-844x390.png, shots/sk-sys-menu-se-375x553.png; ölçüm: 844×390'da nav bottom 689px, 04 BLOG / 05 START A PROJECT / TR satırları viewport dışında (overflowY: visible); 375×553'te (iPhone SE + Safari araç çubukları) TR tamamen, START A PROJECT kısmen dışarıda

**Sorun.** Menü paneli fixed header'ın içinde absolute, kendi overflow'u yok ve body kilitli; viewport yüksekliği ~650px'in altına inince (tüm telefonlar yatayda, iPhone SE/8 dikeyde Safari araç çubuklarıyla) alt satırlar ne parmakla ne tekerlekle ulaşılabiliyor. En kötü ihtimal: yatay tutan kullanıcı menüden START A PROJECT'e ve dil değiştiriciye hiç ulaşamıyor.

**Neden önemli.** Sitenin tek mobil navigasyonu bazı cihaz yönelimlerinde yarım; dönüşüm CTA'sı ve TR geçişi kayboluyor. 'Telefonda test edilmedi' sinyalinin en görünür hali.

**Ne yapılmalı.** Nav panelini kaydırılabilir yap: `fixed inset-x-0 top-[76px] bottom-0 mobile:top-[66px] overflow-y-auto overscroll-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]` (absolute + min-h yerine); kısa viewport için satırları sıkıştır: `[@media(max-height:520px)]:py-[14px] [@media(max-height:520px)]:text-[20px]` ve panel `py-[24px]`; Lenis'i stop() ile durdur (11) ki tekerlek arkadaki sayfayı değil paneli kaydırsın. Test: 844×390 ve 375×553'te 6 satırın hepsine tap.

#### `gap-browser-system-layer-missed-2` — iOS Safari form alanlarına odaklanınca sayfayı otomatik zoom'luyor: input/select/textarea 14px

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:12 (fieldInput: text-[14px]; #project_name, #brief, #timeline, #budget, #name, #email, #company hepsi bu class'ı alıyor); src/app/[locale]/layout.jsx:42-46 (viewport'ta maximum-scale yok — doğru, olmamalı); ölçüm: computed font-size input 14px, select 14px

**Sorun.** iOS Safari font-size < 16px olan bir form kontrolüne odaklanınca viewport'u ~1.14x büyütür; alan blur olunca zoom geri alınmaz, kullanıcı yatay kaydırılabilir, kırpılmış bir sayfada kalır. Brief formunun 2. ve 3. adımındaki her alan bunu tetikler. maximum-scale=1 ile bastırmak erişilebilirlik ihlali olduğu için tek doğru yol 16px.

**Neden önemli.** Dönüşüm formunun iPhone'daki her odaklanmasında sayfa 'kırılıyor' hissi; Awwwards jürisinin mobil kontrolünde ilk fark edilen şeylerden.

**Ne yapılmalı.** fieldInput'a `text-[16px] mobile:text-[16px]` (14px görünüm isteniyorsa yalnız desktop'ta: `text-[16px] [@media(hover:hover)]:text-[14px]` ya da `(pointer: fine)` ile); ya da globals.css: `@media (hover: none) and (pointer: coarse) { input, select, textarea { font-size: 16px } }`. Label'lar 12px mono kalabilir. Test: iOS Simulator'da #name'e dokun, `window.visualViewport.scale` 1 kalmalı.

#### `gap-browser-system-layer-missed-3` — prefers-reduced-motion sadece reveal/Lenis'te uygulanmış: marquee, ticker, animate-ping ve hero autoplay videoları çalışmaya devam ediyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** tailwind.config.js (animation signal-marquee 28s / ticker 30s infinite, motion-reduce varyantı hiç kullanılmamış — derlenen CSS'te 0 'motion-reduce'); src/app/[locale]/page.jsx:59-60 (.animate-signal-marquee), :199 (animate-ping emerald nokta), :35 ve src/components/IntakeForm.jsx:93 (düz <video autoPlay loop>, BackgroundVideo'daki reduced-motion kontrolü yok); kanıt: emulateMedia reducedMotion:'reduce' → computed animationName hâlâ 'signal-marquee', 'ping', 'ticker'

**Sorun.** Sistem tercihi 'Reduce motion' açıkken sitenin en çok hareket eden parçaları — sonsuz marquee, ticker, nabız atan yeşil nokta ve iki hero videosu — aynen oynuyor. Yalnız scroll-reveal ve Lenis durduruluyor; reviewer'ın 'reduced-motion düşünülmüş' güçlü yanı yarım doğru.

**Neden önemli.** OS tercih katmanının en görünür parçası ve WCAG 2.3.3; sonsuz marquee reduced-motion'da çalışmaya devam eden en belirgin ihlal. 'Sistem düşünülmüş' iddiasını tek satırda çürütüyor.

**Ne yapılmalı.** globals.css: `@media (prefers-reduced-motion: reduce) { .animate-signal-marquee, .animate-ticker, .animate-ping { animation: none } }` ya da ilgili elemanlara `motion-reduce:animate-none`; hero videoları için küçük bir client wrapper (BackgroundVideo'ya `eager` prop'u ekleyip aynı matchMedia/saveData kontrolünü kullan) — reduced motion'da play() çağırma, poster'da kal; `hover:-translate-y-[2px]` gibi mikro hareketler kalabilir. Test: DevTools Rendering → Emulate prefers-reduced-motion.

### İNCE İŞÇİLİK

#### `gap-browser-system-layer-10` — Touch'ta basma geri bildirimi yok; tap-highlight reset'i summary/label/select'i kapsamıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:109-112 (-webkit-tap-highlight-color: transparent sadece button, a); derlenen CSS'te yalnız 5 :active kuralı (CTA'larda scale .98 — IntakeForm.jsx:104,189; Header.jsx:38); src/app/[locale]/services/page.jsx:236 (<summary>), src/components/IntakeForm.jsx:141,146,152,159 (<label>), :153,160 (<select>)

**Sorun.** Linklerde OS'in tap flaşı kapatılmış ama yerine hiçbir :active hali konmamış: nav/footer linkleri, case study satırları, blog kartları, 'SCROLL TO EXPLORE', mobil menü satırları → parmağı bastığında sıfır tepki, Lenis + route geçişi gelene kadar 100-300ms 'öldü mü?' boşluğu. summary/label/select'te ise reset yok → Android Chrome'da FAQ'ya veya select'e dokununca UA'nın mavi-gri dikdörtgen flaşı.

**Neden önemli.** Awwwards'ta touch'ta 'anında tepki' kraft göstergesi; hiçlik ucuz, UA flaşı özensiz hissettirir.

**Ne yapılmalı.** globals.css: `a, button, summary, label, select, [role="button"] { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }` + `@media (hover: none) { a:active, button:active, summary:active, [role="button"]:active { opacity: .55; transition: none; } }` (normal durumda `transition: opacity .15s` ile bırakınca yumuşak dönüş). Satır/kart tipi linklere (case rows, blog cards, mobil nav satırları) `active:bg-[#111]`.

#### `gap-browser-system-layer-12` — Seçim sistemi tek kuralda kalmış: dekoratif marquee/sayaçlar seçiliyor, beyaz butonda seçim görünmüyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:128-131 (::selection beyaz/#0a0a0a); src/app/[locale]/page.jsx:58-60 (aria-hidden marquee, user-select yok), :45 ('— 001 / 005'), :54 ('01 / 05'); src/components/IntakeForm.jsx:123 (step sayacı); src/components/Header.jsx:38, IntakeForm.jsx:189 (beyaz CTA'lar); kanıt: shots/sys-selection-home.png, sys-selection-marquee.png (Ctrl+A ile marquee seçiliyor; kopya: 'ALAZ / SYSTEMS THINKING◻ENGINEERING WITHOUT COMPROMISE◻ALAZ / …' tekrarlı), sys-selection-header.png (START A PROJECT'te seçim görünmez)

**Sorun.** Ters çevrilmiş beyaz seçim doğru karar ama yalnız. (a) aria-hidden dekoratif marquee ve sayaçlar seçilip kopyalanıyor — sayfayı alıntılayan biri 2x tekrarlı buzzword şeridini ve '01 / 05' gibi süsleri alır; (b) beyaz zeminli CTA'larda ::selection beyaz → seçim görünmez; (c) görsellerde seçim overlay'i Firefox'ta UA mavisi; (d) Google 'scroll-to-text' linklerinde `::target-text` UA sarısı.

**Neden önemli.** Seçim rengi, Awwwards sitelerinde 'her durum düşünülmüş' sinyalinin en ucuz kanıtı; yarım bırakılmışsa tam tersi okunur.

**Ne yapılmalı.** globals.css: `[aria-hidden="true"], .animate-signal-marquee, .animate-ticker, [data-decor] { user-select: none }` (sayaç/eyebrow span'lerine `data-decor`); `.bg-white ::selection, .bg-white::selection { background:#0a0a0a; color:#fff }` (ya da Tailwind `selection:bg-ink selection:text-white` doğrudan CTA class'larına); `img::selection, video::selection { background: rgba(255,255,255,.25) }`; `::target-text { background:#fff; color:#0a0a0a }`; `::spelling-error, ::grammar-error { text-decoration: underline wavy #888 }` (textarea'da UA kırmızısı yerine).

#### `gap-browser-system-layer-13` — Mono'da sentetik (faux) bold; h1 800 isteyip 900 alıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:17 (JetBrains_Mono weight ['400','500']), :15 (Archivo ['600','700','900']); src/components/PoweredBy.jsx:25 (font-semibold, mono <ul> içinde — 'GOOGLE'/'CLAUDE'); src/app/[locale]/page.jsx:193 (font-mono font-semibold 'START SEQUENCE'); src/app/[locale]/services/page.jsx:142 (font-mono font-bold); src/app/[locale]/blog/[slug]/page.jsx:109 (font-extrabold font-mono 'A.'); src/app/globals.css:158-162 (h1 { font-weight: 800 }); src/lib/fit.js:6 ('Archivo 900, also used for 800'); kanıt: shots/sys-fauxbold-poweredby-2x.png; ölçüm: 'Google','Claude','START SEQUENCE' computed weight 600, font-synthesis: weight açık

**Sorun.** Mono'da 600/700/800 istenen dört yerde tarayıcı 500'ü yapay kalınlaştırıyor: harfler şişer, .085em tracking'de boşluklar düzensizleşir, 2x kırpımda GOOGLE'ın kontrları yumuşak. h1 için 800 isteniyor, Archivo'da 800 yüklü değil → sessizce 900 çiziliyor; fit.js yorumu da bunu 'kabul' etmiş — niyet ile çıktı ayrı.

**Neden önemli.** Faux bold, tipografi jürisinin ilk baktığı şeylerden; mono eyebrow'lar sitenin imzası ve 'POWERED BY GOOGLE' zaten tartışmalı bir öğe, bir de yapay bold'la çizilmesi iki kat zayıf.

**Ne yapılmalı.** Tercih: mono'da vurguyu 500 + renk (text-white) ile yapın ve `:root { font-synthesis: none }` ile sentezi tamamen kapatın (yanlış weight isteği anında görünür olur, sessiz fallback kalmaz). Gerçekten bold mono gerekiyorsa `JetBrains_Mono({ weight: ['400','500','700'] })` ekleyip font-semibold/extrabold'ları font-bold'a çevirin. h1 kuralını `font-weight: 900` yapın; display başlıklardaki `font-extrabold` (IntakeForm.jsx:125,138,168 vb.) → `font-black` (zaten o render ediliyor).

#### `gap-browser-system-layer-14` — -moz-osx-font-smoothing yok: macOS Firefox'ta metin daha kalın ve saçaklı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:65 (-webkit-font-smoothing: antialiased var, -moz-osx-font-smoothing ve text-rendering yok)

**Sorun.** macOS Firefox koyu zemindeki beyaz metni (12px mono eyebrow'lar, .13 alfa hairline üstündeki 13px gövde, 190px display) subpixel AA ile çiziyor → Chrome/Safari'dekinden belirgin kalın ve renkli saçaklı; aynı site iki tarayıcıda farklı 'ağırlıkta'.

**Neden önemli.** Mono-krom tipografik bir sitede harf ağırlığı tasarımın kendisi; bir tarayıcıda kalın görünmesi sistemin tutarsız olduğunu söyler.

**Ne yapılmalı.** globals.css body: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` (optimizeLegibility 320px wordmark'ta Archivo kerning'ini garanti eder).

> **Doğrulayıcı notu:** globals.css:65'te -webkit-font-smoothing var, -moz-osx-font-smoothing yok (computed boş). Düzeltme: 'renkli saçaklı' (subpixel AA) iddiası güncel macOS'ta geçerli değil — 10.14'ten beri sistem genelinde subpixel AA kapalı; kalan fark Firefox'un dilated/greyscale render'ının Chrome/Safari'den biraz daha kalın durması. Yani etki 'ağırlık farkı', 'renk saçağı' değil. `-moz-osx-font-smoothing: grayscale` eklemek yine doğru ve bedava; text-rendering: optimizeLegibility kerning için makul.

#### `gap-browser-system-layer-15` — Firefox 'text-only zoom' %150'de .fit başlıkları sağdan kırpılıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:175-179 (.fit: font-size: min(--fit-size, avail/em)); src/app/[locale]/page.jsx:78 ('VALIDATION.'), :101 ('CORE CAPABILITIES.') — flex satırında min-width yok; services/page.jsx:106,203,227 ve about/page.jsx:54,74 aynı; kanıt: shots/sys-textzoom150-home-fold.png, sys-textzoom150-intake.png, sys-textzoom150-home-ticker.png; ölçüm (150% text zoom emülasyonu, 1440px): 'VALIDATION.' right=1481, 'CORE CAPABILITIES.' right=1662 → body overflow-x:hidden kırpıyor; services 'STACK' sütunu 8px taşıyor. Chrome 'minimum font size 16' → taşma yok

**Sorun.** Firefox'un yalnız-metin zoom'unda (ve düşük görme için %150-200 metin ayarında) `.fit` kapağı anlamsızlaşıyor; flex item olan başlıklar min-content genişliğinde kalıp 'CAPABILIT…' şeklinde kırpılıyor. Header, intake formu ve ticker ayakta (iyi).

**Neden önemli.** Erişilebilirlik sinyali; ayrıca `.fit` sisteminin 'her koşulda sığar' iddiasını bozuyor.

**Ne yapılmalı.** fit başlıklarına `min-w-0 [overflow-wrap:anywhere]` (flex/grid içindekiler: page.jsx:78,101; services 106,203,227; about 54,74; case-studies/[slug] 112,120,128). services 'STACK' sütununa `min-w-0`. cqw tabanlı fit Firefox text zoom'u çözmez; çözüm kırılabilir kelime + min-w-0.

#### `gap-browser-system-layer-16` — Windows %125/%150'de hairline'lar iki piksele yayılıp kalınlaşıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/globals.css:32 (--line: rgba(255,255,255,.13)); src/app/[locale]/page.jsx:39 (hero grid: 3× border-r rgba(255,255,255,.065)); kanıt: shots/sys-dpi-1.25-gridline.png, sys-dpi-1.5-gridline.png; ölçüm (1px kuralın dikey luma profili): 1x → [39], 1.25x → [39,14], 1.5x → [39,23], 2x → [39,39]

**Sorun.** Windows'un en yaygın ayarları olan %125/%150'de 1 CSS px = 1.25/1.5 cihaz pikseli: Chrome ana pikseli tam boyayıp artığı ikinci bir soluk piksele yayıyor → hairline'lar hem daha ağır hem bulanık; hero'daki %6.5 alfa grid çizgileri satır konumuna göre bazen 1 bazen 2 piksel çıkıyor (eşitsiz ağırlık). Mac 2x'te kusursuz, Windows laptop'ta değil.

**Neden önemli.** Çizgi ağırlığı bu sitenin tek 'süsü'; Windows'ta tutarsızlaşması 'Mac'te tasarlandı' hissini kuvvetlendirir. Minör ama tam kraft meselesi.

**Ne yapılmalı.** Kaçınılmaz kısmı kabul edip görünür toplam ağırlığı dengeleyin: `@media (min-resolution: 1.25dppx) and (max-resolution: 1.75dppx) { :root { --line: rgba(255,255,255,.10) } }`. Hero grid'i üç ayrı `<i border-r>` yerine tek elemanda `background: repeating-linear-gradient(90deg, transparent 0 calc(25% - 1px), rgba(255,255,255,.065) calc(25% - 1px) 25%)` ile çizin (tek raster kararı, satırlar arası fark kalmaz). `h-px` / `w-px` div'ler (PoweredBy.jsx:23 ayraç) yerine border kullanın; border'lar cihaz pikseline snap'lenir, px div'ler lineer ölçeklenir.

#### `gap-browser-system-layer-17` — forced-colors ve prefers-contrast için hiçbir ayar yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css (forced-colors / prefers-contrast bloğu yok); src/components/IntakeForm.jsx:12 (placeholder #6f7277 on #111 ≈ 3.9:1), :115 (adım etiketleri #717171 on #0a0a0a ≈ 4.1:1); src/components/Header.jsx:27 (bg rgba(10,10,10,.55) + blur, video üstünde); src/app/[locale]/page.jsx:39 (hero grid <i>'leri class'sız); kanıt: gaps/forced-colors-home.png, forced-colors-intake.png, shots/sys-forced-colors-intake-selected.png, sys-forced-colors-services.png

**Sorun.** Forced-colors'ta (Windows High Contrast) layout ayakta kalıyor — iyi — ama: hero video düz griye, 'ALAZ.' beyaz backplate'li kutuya dönüyor; üç grid çizgisi siyah kalın çizgi oluyor; `text-[#6e6e6e]` nokta glifi CanvasText'e düşüp başlıkla aynı renge geliyor (hiyerarşi gidiyor); seçili kart yalnız ✓ ile ayırt ediliyor. prefers-contrast: more için düzeltme yok: placeholder ve adım etiketleri 4.5:1 altında, %55 şeffaf header video üstünde okunabilirliği düşürüyor.

**Neden önemli.** Bu modlar az kullanılır ama 'sistem düşünülmüş mü' sorusunun cevabı; ayrıca prefers-contrast bloğu, zaten sınırda olan gri tonlarını düzeltmek için ucuz bir fırsat.

**Ne yapılmalı.** `@media (forced-colors: active) { .hero-grid i { border-color: transparent } video { display: none } [aria-pressed="true"] { outline: 3px solid Highlight; outline-offset: -3px } .text-\[\#6e6e6e\] { opacity: .5 } }` (hero grid div'ine `hero-grid` class'ı verin). `@media (prefers-contrast: more) { :root { --dim: #a3a7ad; --gray: #c3c6cb; --line: rgba(255,255,255,.3) } ::placeholder { color: #9a9ea3 } header { background: #0a0a0a; backdrop-filter: none } }`.

> **Doğrulayıcı notu:** gaps/forced-colors-home.png: nav/eyebrow metinlerinde backplate, 'ALAZ.' arkasında büyük beyaz kutu, hero grid çizgileri siyah, 'ALAZ' sonundaki nokta başlıkla aynı renk — bunlar doğru. Düzeltme: 'hero video düz griye dönüyor' büyük ihtimalle headless emülasyon artefaktı; gerçek Windows HCM'de Chrome video/img'leri boyamaz, gri alan ekran görüntüsünde video karesinin yakalanmamasından. prefers-contrast değerleri (placeholder #6f7277/#111 ≈3.9:1, adım etiketleri #717171/#0a0a0a ≈4.1:1) kodla tutarlı. forced-colors ve prefers-contrast blokları makul; `.text-\[\#6e6e6e\]` seçicisi yerine nokta span'ine bir class vermek daha temiz.

#### `gap-browser-system-layer-18` — Manifest 'standalone' PWA ilan ediyor: install teklifi, çerçevesiz offline dinozoru, maskable ikon yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/manifest.js:7 (display: 'standalone'), :10-14 (icons: SVG any + 180 PNG + 512 PNG, purpose: 'maskable' yok); src/app/[locale]/layout.jsx:26-40 (metadata.appleWebApp yok); head çıktısı: <link rel="manifest" href="/manifest.webmanifest">

**Sorun.** Broşür sitesi kendini standalone uygulama olarak tanıtıyor → Chrome/Edge Android (ve desktop omnibox) 'Install ALAZ' teklif eder; kurulunca URL çubuğu/geri tuşu olmayan pencerede açılır, service worker/offline sayfa olmadığı için bağlantı kesilince çerçevesiz Chrome dinozoru. Android adaptive icon için maskable olmadığından ikon beyaz dairenin içine küçültülür (siyah kare + beyaz halka). iOS'ta appleWebApp meta yok → kurulursa başlık 'alaz.pro', status bar varsayılan.

**Neden önemli.** Sahip olunmayan bir 'app' vaadi; OS katmanında yarım bırakılmış her şey kullanıcıya 'özensiz' döner.

**Ne yapılmalı.** Dürüst manifest: `display: 'browser'` (install promosyonu biter; theme_color ve ikonlar korunur). Gerçekten standalone isteniyorsa: minimal bir service worker + offline sayfası (07'deki hata sayfası diliyle 'YOU'RE OFFLINE.') ve `metadata.appleWebApp = { capable: true, title: 'ALAZ', statusBarStyle: 'black-translucent' }`. Her durumda 512px PNG'yi `purpose: 'maskable'` ile ekleyin (A harfi merkezde %80 güvenli alanda, #0a0a0a zemin kenara kadar), `id: '/'`, `lang: 'en'`.

#### `gap-browser-system-layer-19` — Route geçişinin tek ifadesi neon parlamalı nprogress çubuğu

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:60-71 (NextTopLoader: height 3, crawl, shadow '0 0 24px 4px #fff, 0 0 12px 2px #fff, 0 0 6px 1px #fff', zIndex 99999); src/app/globals.css:187-189 (#nprogress .bar box-shadow 12px); kanıt: shots/probe-toploader-mid-nav.png

**Sorun.** Sayfa değişiminde tepede üç katmanlı beyaz glow'lu 3px çubuk 'crawl' ediyor — 2014 YouTube / admin dashboard kalıbı; düz, gölgesiz, mono dilinde sitenin tek 'glow'u bu. loading.jsx olmadığı için geçişin başka görsel ifadesi de yok.

**Neden önemli.** Glow, sitenin tüm görsel diliyle çelişiyor; nprogress'in kendisi de 'template'in geldiği paket' sinyali.

**Ne yapılmalı.** Kısa vade: `shadow={false} height={1} color="rgba(255,255,255,.6)" crawl={false} easing="linear" speed={160}` ve globals.css:187-189'u silin — çubuk sitenin hairline'ı gibi dursun. Doğrusu: NextTopLoader'ı kaldırıp markalı geçiş (bkz. Eklemeler #2).

#### `gap-browser-system-layer-missed-4` — Select'in boş hali 'dolu' görünüyor: placeholder option beyaz, input placeholder'ları gri; option listesi için koyu zemin tanımlı değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:153-156 (#timeline), :160-163 (#budget) — `<option value="">` placeholder'ı seçilebilir ve select rengi text-white; :12 fieldInput placeholder:text-[#6f7277]; kanıt: shots/kb-intake-step2-after-continue.png ('Select a timeframe' / 'Select a range' beyaz, üstteki 'A working title is fine' gri); ölçüm: select computed color rgb(255,255,255), cursor 'default'

**Sorun.** Aynı formda iki farklı 'boş alan' dili: input'lar gri placeholder, select'ler beyaz metin → select doldurulmuş sanılıyor. Boş option listede kalıp yeniden seçilebiliyor. Firefox/Windows'ta option'lar için bg/color verilmediğinden popup içindeki satırlar UA renginde. İmleç select'te ok, kartlarda/butonlarda el.

**Neden önemli.** Native kontrolün durum dili formun geri kalanıyla çelişiyor; 04'teki chip dönüşümü yapılmayacaksa bu en ucuz düzeltme.

**Ne yapılmalı.** `className={cn(fieldInput, 'appearance-none cursor-pointer', !form.timeline && 'text-[#6f7277]')}` (budget için aynı), ilk option `<option value="" disabled hidden>` (React'te value '' ile placeholder gibi davranır, listede görünmez); globals.css: `option { background: #111; color: #fff }` ve `option:checked { background: #1c1c1c }` (Firefox/Windows popup'ı için). Test: step 2'de iki select gri başlamalı, seçince beyaza dönmeli.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### system.css: sistem katmanını tek dosyada token'laştır

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Basement Studio ve Studio Freight repo'larındaki `base.css`/`reset.css` yaklaşımı; Lenis dokümantasyonundaki önerilen global CSS

`src/app/system.css` (globals.css'ten @import, @layer base): `:root { color-scheme: dark; scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: #2a2a2a #0a0a0a; font-synthesis: none; accent-color: #fff; caret-color: #fff; --header-h: 76px }` + `@supports not (scrollbar-color:auto)` ::-webkit-scrollbar seti + ::selection / .bg-white ::selection / img::selection / ::target-text seti + autofill override (03) + `@media (hover: none)` :active seti (10) + `@media print` (05/06) + `@media (forced-colors: active)` ve `@media (prefers-contrast: more)` (17) + `@media (prefers-reduced-data: reduce) { video { display:none } .poster { display:block } }` (hero videoları için) + `@media (update: slow) { .animate-signal-marquee, .animate-ticker { animation: none } }`. Yaklaşık 150 satır; 01-17'nin %80'ini kapatır ve kodu okuyan birine 'sistem düşünülmüş' der.

### Kare glif imleç sistemi (native imleci saklamadan)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Locomotive (locomotive.ca) küçük nokta imleç; Obys 'difference' blend; Active Theory label'lı imleç; Studio Freight'in minimal takip imleci

Sitenin tek süsü olan kare nokta glifini ('ALAZ■', hero'daki 6px kare) imleç yapın: `(hover: hover) and (pointer: fine)` cihazlarda layout.jsx'e bir client component — `position: fixed; width: 8px; height: 8px; background: #fff; mix-blend-mode: difference; pointer-events: none; will-change: transform`, rAF + lerp(0.18) ya da framer-motion `useMotionValue` + `useSpring({ stiffness: 400, damping: 40 })` (zaten bağımlı). Native ok KALIR (cursor:none kullanıcıyı kızdırır; kare yanında yürür). Durumlar (data-cursor attribute'u ile): link/button → 40px içi boş kare (1px border, 180ms scale); case study satırı → 64px kare + mono 11px 'VIEW'; dış link (↗) → 45° döner; input/textarea → kare kaybolur, native I-beam; sürükleme yok. `prefers-reduced-motion`'da lerp kapalı (anında). `(hover: none)`'da mount edilmez. ~80 satır.

### Markalı sayfa geçişi: nprogress yerine perde + hedef etiketi

- **Etki:** yüksek · **Efor:** orta · **Referans:** Hello Monday ve Unseen Studio (perde + hedef etiketi), Basement Studio (clip-path wipe), Next.js 15 View Transitions örnekleri

`src/app/[locale]/template.jsx` + framer-motion AnimatePresence: çıkışta #0a0a0a perde `clip-path: inset(100% 0 0 0 → 0 0 0 0)` 420ms `cubic-bezier(.76,0,.24,1)`, perdenin sağ-alt köşesinde mono 11px hedef etiketi ('→ SERVICES') ve kare glif; perde kapalıyken Lenis `scrollTo(0, { immediate: true })`; girişte perde yukarı açılır. View Transitions API (Chrome 126+, Safari 18) destekleyen tarayıcıda `document.startViewTransition` ile aynı koreografi, header'a `view-transition-name: header` (sabit kalır). `prefers-reduced-motion`'da yalnız 120ms opacity. NextTopLoader ve #nprogress CSS'i tamamen kalkar; error.jsx/not-found aynı perdeden çıkar, hata ekranı da sisteme dahil olur.

### Print'i tasarlanmış bir çıktıya çevir: 'project sheet' / 'document'

- **Etki:** orta · **Efor:** orta · **Referans:** Pentagram ve Instrument'ın basılı spec-sheet mantığı; GOV.UK Design System print stylesheet'i (yapısal referans)

05'teki temel print kurallarının üstüne, case study ve legal/privacy için Tailwind `print:` varyantıyla tek sayfalık, letterhead'li çıktı: üstte 9pt mono 'ALAZ — alaz.pro — PROJECT / 02 — printed {date}' (`hidden print:flex`), 36pt başlık, iki sütun (challenge / approach / outcome), sağ üstte sayfa URL'sinden build'de üretilen QR SVG (`qrcode` paketi, `hidden print:block`), altta iletişim (ContactInfo zaten var). Legal/privacy için 'Version: October 2026' + sayfa numarası (`@page { @bottom-right { content: counter(page) } }` — Chrome kısmi destek, zararsız). Jüri bakmaz; müşterinin masasına giden PDF markanın kendisi olur.
