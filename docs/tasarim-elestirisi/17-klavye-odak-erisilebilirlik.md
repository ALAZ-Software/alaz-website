# Klavye, odak ve ekran okuyucu erişilebilirliği: hover'a bağlı affordance'lar, jenerik focus halkası, İngilizce sabit aria etiketleri

**Boyut puanı:** 4/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 28 (2 kritik · 10 önemli · 16 ince işçilik) · **Korunacaklar:** 9 · **Eklenecekler:** 7

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Site klavyeyle "çalışıyor" ama odak ve ekran okuyucu deneyimi tamamen tasarlanmamış durumda: tek satırlık `:focus-visible { outline: 2px solid white; outline-offset: 4px }` her elemana aynı debug-görünümlü beyaz kutuyu çiziyor, hover'a bağlı her affordance (case-studies satır önizlemesi, kart ölçekleme, arka plan dolguları, ok kaymaları) klavyede ve dokunmatikte yok. Ölçülen akışlar gerçek kırıklar ortaya koyuyor: mobil menü odak tuzağı/inert/Escape olmadan açılıyor ve Tab yedinci basışta menünün arkasındaki görünmez içeriğe geçiyor; intake formunda adım geçişleri, hata durumu, "TRANSMITTING..." ve başarı ekranı ekran okuyucuya hiç duyurulmuyor, hata sonrası odaklı buton ekranın altına itiliyor; proje kartlarının erişilebilir adı görsel alt + rozet + özet birleşimi olarak 100+ karakterlik gürültü. Lucide ikonları `aria-hidden` almıyor, aria-label'lar i18n sitede sabit İngilizce, aktif nav linki sadece renkle işaretli, skip link yok, hareket eden marquee/video/ping için ne reduced-motion ne durdurma mekanizması var. Temeller (scroll-padding-top, aria-hidden videolar/marquee'ler, label/for eşleşmeleri, role=alert, aria-expanded, mantıklı tab sırası) sağlam; eksik olan "odak durumu markanın parçasıdır" yaklaşımı ve dinamik durum duyuruları. Awwwards Usability puanı açısından bu dimension şu an 4/10 seviyesinde.

## Korunması gerekenler

- `html { scroll-padding-top: 78px }` (globals.css:44-46) gerçekten çalışıyor: Shift+Tab ile geri giderken case-studies satırları ve VIEW ALL PROJECTS butonu sabit header'ın altında değil, tam 78px'te duruyor (a11y-probe tabstops backward: top=78). Bu korunmalı.
- Tab sırası her sayfada görsel sırayla birebir örtüşüyor (logo → nav → TR → CTA → içerik → footer); gizli/tuzak tab durağı yok, `tabindex` hack'i yok.
- Dekoratif katmanlar erişilebilirlik ağacından temiz çıkarılmış: tüm `<video>`'lar, gradient overlay'ler, grid çizgileri ve iki marquee `aria-hidden="true"`; ShieldCheck ikonuna elle aria-hidden verilmiş.
- `:focus-visible` (`:focus` değil) kullanılıyor; fare kullanıcısı halka görmüyor, klavye kullanıcısı görüyor — doğru temel. Lenis `anchors` tıklamayı preventDefault etmediği için `#validation`, services chip'leri ve `#top` native fragment navigasyonu + sequential focus start point ile çalışıyor (Enter → hash güncelleniyor, Tab hedeften devam ediyor — ölçüldü).
- Reduced-motion yaklaşımı yarı yarıya doğru: Lenis (SmoothScroll.jsx:9), scroll reveal CSS'i (globals.css:92-100, üstelik `(scripting: none)` fallback'iyle JS yokken içerik görünür), CountUp ve BackgroundVideo (saveData dahil) tercihi okuyor; `BackgroundVideo` görünür alana girince yüklenip çıkınca duruyor.
- Intake form temelleri sağlam: her alan `label htmlFor` ile eşleşmiş, `aria-invalid`, `role="alert"` hata mesajları (klavye akışında gerçekten duyuruluyor), `autoComplete` değerleri, `noValidate` + özel doğrulama, proje tipi grubu `role="group"` ve çevrilmiş `aria-label`, `inputmode`'suz ama `type="email"`.
- Semantik HTML kullanımı iyi: tek `<h1>` her sayfada, `<header>/<nav>/<main>/<footer>` landmark'ları, `<time dateTime>`, `<address>`, `<blockquote>`, `<details>/<summary>` native klavye desteği (Enter ile açılıyor — ölçüldü), home hero `section aria-labelledby="hero-title"`, blog listesi `section aria-label` çevrilmiş.
- Hamburger butonunda `aria-expanded` ve `<button type="button">`; `<html lang={locale}>` doğru; Next.js route announcer client-side gezinmede sayfa başlığını duyuruyor.
- Dokunma hedefleri yeterli: hamburger 43px, TR 40×39, chip'ler 41px yüksek, 12px mono linkler 24px+ aralıkla (WCAG 2.5.8 spacing istisnası).

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `gap-keyboard-focus-a11y-04` — Mobil menü: odak tuzağı, inert ve Escape yok; Tab menünün arkasındaki görünmez içeriğe sızıyor

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:19-25 (open state, body overflow), :39 (toggle button), :42-46 ({open && <nav>}); kanıt: shots/kb-mobile-menu-open.png, kb-mobile-menu-tab7.png, kb-mobile-menu-after-escape.png, a11y-probe.json mobileMenu

**Sorun.** 390px'te ölçülen akış: Enter ile menü açılıyor, odak butonda kalıyor (menüye taşınmıyor). Tab 1-6 menü linkleri; Tab 7 → 'SCROLL TO EXPLORE' (menü overlay'inin arkasında, görünmez), Tab 8 → 'EXPLORE SERVICES' top=445 — yani `overflow:hidden` body'ye rağmen arkadaki sayfa odakla kaydırıldı, menü hâlâ açık ve kullanıcı görmediği bir sayfayla etkileşiyor. Escape → hiçbir şey olmuyor (menü açık kalıyor). `main`/`footer` üzerinde `inert` veya `aria-hidden` yok (ölçüm: inert=false). Link tıklanınca `setOpen(false)` nav'ı DOM'dan söküyor; odak body'ye düşüyor, menü butonuna ya da yeni sayfanın h1'ine dönmüyor. `aria-controls` yok. Buton etiketi 'Open menu'/'Close menu' olarak değişiyor + aria-expanded: çifte sinyal.

**Neden önemli.** WCAG 2.4.3 Focus Order, 2.1.2'ye yakın (görünmez içerikte kaybolma), 4.1.2. Usability: klavye ve ekran okuyucu kullanıcısı için menü bir tuzak değil, sızdıran bir kapak. Awwwards kriterinde mobil menü en çok incelenen etkileşimlerden biri; Hello Monday / Resn menüleri hem animasyonlu hem Escape/trap/inert doğru.

**Ne yapılmalı.** En kısa yol: zaten bağımlılıkta olan `@radix-ui/react-dialog` ile menüyü modal yapın — Escape, odak tuzağı, odak geri dönüşü, `aria-modal`, dış tıklama ve scroll kilidi (react-remove-scroll) bedavaya gelir: `<Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button aria-label={t('menu')} aria-expanded={open}>…</button></Dialog.Trigger><Dialog.Portal><Dialog.Content className="fixed inset-x-0 top-[66px] bottom-0 …" onOpenAutoFocus={e=>{e.preventDefault(); firstLinkRef.current?.focus()}}><Dialog.Title className="sr-only">{t('mobileNav')}</Dialog.Title><nav aria-label={t('mobileNav')}>…</nav></Dialog.Content></Dialog.Portal></Dialog.Root>`. Elle yapacaksanız: (1) `useEffect` içinde `document.querySelector('main')?.toggleAttribute('inert', open); document.querySelector('footer')?.toggleAttribute('inert', open)`; (2) `keydown` Escape → `setOpen(false)` + `buttonRef.current.focus()`; (3) açılışta `requestAnimationFrame(()=>firstLink.focus())`; (4) navigasyon sonrası `useEffect([pathname])` içinde `document.querySelector('main h1')?.focus()` (h1'e `tabIndex={-1}`); (5) butona sabit `aria-label={t('menu')}` + `aria-controls="mobile-nav"`, nav'a `id="mobile-nav"`; nav'ı koşullu mount yerine `hidden`/`inert` ile kapatın ki aria-controls hedefi var olsun. Animasyon (stagger'lı satır girişleri) Radix `data-state` ile CSS'ten verilebilir — erişilebilirlik ve craft aynı yerde.

#### `gap-keyboard-focus-a11y-08` — Intake: adım geçişi sessiz, odak alttaki butonda kalıyor; hata sonrası odaklı buton ekranın altına itiliyor; hata/zorunluluk bağları yok

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:54 (nextStep), :115-117 (adım listesi div'leri), :123 ('0x / 03' ve '% COMPLETE'), :135,143,148,173,178 (role=alert hatalar), :141-147,171-182 (input'larda aria-describedby/aria-required yok), :187-189 (butonlar); kanıt: shots/kb-intake-step2-after-continue.png (odak CONTINUE top=892, yeni adım başlığı yukarıda), shots/kb-intake-step2-errors.png (CONTINUE top=948 > 900 viewport), a11y-probe.json intakeFlow

**Sorun.** Ölçülen klavye akışı: CONTINUE'ya Enter → adım 2 render oluyor, odak aynı DOM butonunda (viewport'un en altında, y=892) kalıyor, ekran okuyucuya 'adım değişti / Define the challenge' diye hiçbir şey söylenmiyor ('0x / 03 — PROJECT CONTEXT' ve '67% COMPLETE' düz metin, aria-live yok). Boş adım 2'de Enter → iki `role=alert` beliriyor (duyuruluyor, iyi) ama hata metinleri `aria-describedby` ile alana bağlı değil, alanlar `aria-required` taşımıyor (yıldız sadece görsel), odak ilk hatalı alana gitmiyor ve beliren hatalar butonu 948px'e itiyor: klavye kullanıcısının odağı artık görünmeyen bir elemanda. Sol taraftaki adım listesi `div`'lerden ibaret: `ol` değil, `aria-current="step"` yok, tamamlanan adım yalnız renk + Check ikonu (ikon `aria-hidden` değil, lucide). Tip kartları `aria-pressed` toggle; adı '01 / TYPE Web App Platforms, SaaS & dashboards' (index gürültüsü).

**Neden önemli.** WCAG 3.3.1 Error Identification (kısmen), 3.3.2 Labels/Instructions (zorunluluk), 4.1.3 Status Messages (adım/yüzde), 2.4.3 Focus Order, 2.4.11 Focus Not Obscured (ekran dışına itilen odak). Bu form sitenin tek dönüşüm noktası; Awwwards Usability'de formlar ayrıca test edilir.

**Ne yapılmalı.** (1) Adım değişiminde odağı yeni adımın başlığına taşıyın: `const headingRef=useRef(); useEffect(()=>{ if(step>0) headingRef.current?.focus() },[step]); <h2 ref={headingRef} tabIndex={-1} className="… outline-none">` — hem görsel kullanıcı yukarı döner hem SR başlığı okur. (2) `<p className="sr-only" aria-live="polite">{t('stepAnnounce',{n:step+1,label:stepLabels[step]})}</p>` ve yüzdeyi `role="progressbar" aria-valuenow={pct} aria-valuemin=0 aria-valuemax=100 aria-label={t('progressLabel')}` ile işaretleyin. (3) Hatalar: `<input aria-required="true" aria-describedby={errors.project_name ? 'err-project_name' : undefined}>` + `<small id="err-project_name" role="alert">`; `validate` false dönünce `document.getElementById(firstErrorKey)?.focus()` (odak hem görünür alana hem hataya gider; buton itilmesi sorunu kendiliğinden çözülür). (4) Adım listesi: `<ol>` + `<li aria-current={step===index?'step':undefined}>` + Check'e `aria-hidden`. (5) Tip seçimi tek seçimli → `role="radiogroup"` + her kart `role="radio" aria-checked` ve ok tuşlarıyla gezinme (ya da görsel olarak gizli gerçek `<input type=radio>` + `<label>` kart — en sağlamı). Kart adındaki '01 / TYPE' span'ine `aria-hidden`. (6) Label'daki `*` span'ine `aria-hidden` + formun üstüne 'Required' açıklaması.

### ÖNEMLİ

#### `gap-keyboard-focus-a11y-01` — Tek jenerik focus halkası: tasarlanmamış 2px beyaz kutu her elemanda

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css:133-136 (tek kural); kanıt: gaps/kb-nav-focus-crop.png, gaps/kb-home-tab2.png, gaps/kb-home-tab6.png, gaps/kb-cs-row-focus.png, gaps/kb-services-summary-focus.png, shots/kb-services-chip-focus-real.png, shots/kb-header-cta-focus.png, shots/kb-home-start-sequence-focus.png, shots/kb-cs-next-focus.png

**Sorun.** Sitedeki tek odak kuralı `:focus-visible { outline: 2px solid white; outline-offset: 4px }`. Sonuç: 12px mono nav linkinde metnin etrafında 4px boşluklu sert bir dikdörtgen (kb-nav-focus-crop.png), 1319×200px'lik case-studies satırında üstteki tablo başlığının çizgisini ezen dev bir kutu (kb-cs-row-focus.png), zaten 1px kenarlıklı chip'lerde ikinci bir kutu (kb-services-chip-focus-real.png: çift çerçeve), beyaz CTA'da beyaz halka (kb-header-cta-focus.png), köşe-bracket'li START SEQUENCE butonunda bracket'lerle çakışan halka (kb-home-start-sequence-focus.png). `transition-all` taşıyan elemanlarda (page.jsx:193) outline-width 0→2px animasyonla geliyor: ölçümde START SEQUENCE'ta outline 'solid 1px 1.83px' yakalandı, yani halka diğerlerinden farklı ve yarım görünüyor. Hover ile odak durumunun hiçbir ilişkisi yok: hover'da metin beyaza dönüyor/alt çizgi uzuyor, odakta sadece kutu çıkıyor.

**Neden önemli.** Slop sinyali + craft: Lusion, Obys, Studio Freight gibi stüdyolarda odak durumu hover durumunun klavye ikizi + markaya özgü bir işarettir; tarayıcı varsayılanına benzeyen tek kural 'erişilebilirlik sonradan eklendi' mesajı verir. Usability: halka hairline grid'in üstüne binerek kompozisyonu bozuyor, dev satırlarda hangi elemanın odaklandığı okunmuyor. WCAG 2.4.7 geçiyor ama 2.4.13 (Focus Appearance) ve 2.4.11'in ruhu (odak kompozisyonu bozmadan görünür olmalı) yok.

**Ne yapılmalı.** Odak durumunu bileşen sınıfı bazında tasarlayın ve global kuralı sadece fallback yapın. Önerilen sistem (globals.css @layer components): (1) Mono metin linkleri (nav, EXPLORE SERVICES, footer): hover ile aynı dil — `.link-mono{background:linear-gradient(currentColor,currentColor) no-repeat left bottom/0 1px;transition:background-size .35s cubic-bezier(.22,1,.36,1),color .2s}.link-mono:hover,.link-mono:focus-visible{outline:none;color:#fff;background-size:100% 1px}`. (2) Dolgulu beyaz butonlar (header CTA, CONTINUE, SEND): içe halka — `focus-visible:outline-2 focus-visible:outline-[#0a0a0a] focus-visible:-outline-offset-[5px]` (beyaz üstünde siyah iç çizgi; 3:1 kontrast garantili). (3) Çerçeveli chip/ghost butonlar: `focus-visible:outline-none focus-visible:border-white focus-visible:bg-white focus-visible:text-black` (hover'ın aynısı) + `focus-visible:[box-shadow:0_0_0_1px_#0a0a0a,0_0_0_3px_#fff]`. (4) Tam genişlik satır/kartlar (case-studies satırı, next-project, blog kartı): outline yerine hover durumu + sol kenar işareti: `focus-visible:outline-none focus-visible:bg-[#141414] focus-visible:pl-[20px] focus-visible:[box-shadow:inset_3px_0_0_#fff]`. (5) Form alanları: bkz. finding 22. (6) `transition-all` kullanan tüm elemanlarda (page.jsx:193, page.jsx:163) geçişi `transition-[background-color,color,border-color,transform]` ile sınırlayın; outline asla animasyona girmesin. Tokenlar: `--focus-ring:#fff; --focus-ring-inverse:#0a0a0a; --focus-offset:3px`. Kontrol: Playwright'ta her sayfada Tab ile ilerleyip her durağın ekran görüntüsünü alan bir test (gaps/a11y.json üreten script) CI'da kalsın.

> **Doğrulayıcı notu:** Kontrol: globals.css:133-136 sitedeki tek odak kuralı; src altında (components/ui hariç) hiçbir `focus-visible:` sınıfı yok (grep boş). Screenshot'lar doğrulanıyor: kb-nav-focus-crop.png (12px mono link etrafında sert kutu), kb-cs-row-focus.png (1319×200 satırda üstteki hairline'a binen çerçeve), kb-services-chip-focus-real.png (chip kenarlığı + halka = çift çerçeve), kb-header-cta-focus.png (beyaz buton etrafında beyaz halka). Düzeltme: 'outline solid 1px 1.83px' ölçümü geçiş ortasında alınmış bir örnek — START SEQUENCE'ta (page.jsx:193 `transition-all duration-300`) outline 0→2px/0→4px olarak ~250ms'de animasyonla geliyor, 250ms sonra 2px/4px'e oturuyor (ölçüm: 0ms 0px/0px, 100ms 1px/1.83px, 250ms 2px/4px). Yani halka kalıcı olarak 'yarım' değil, sadece animasyonla beliriyor; page.jsx:163'teki span odaklanabilir olmadığı için o satır bu bulgunun dışında. Şiddet: WCAG 2.4.7 geçiyor, halka görünür ve işlevsel; sorun tamamen tasarım/tutarlılık (hover ile ilişkisiz, hairline grid'e binen jenerik kutu). 'Kırık' değil 'çıtanın altında' → major. Önerilen bileşen bazlı odak sistemi ve `transition-all` yasağı yerinde.

#### `gap-keyboard-focus-a11y-02` — Hover-only affordance'lar: klavye ve dokunmatikte eşdeğeri yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/page.jsx:42,47 (hover:pl-[20px] hover:bg, group-hover:opacity-100 preview); src/app/[locale]/page.jsx:144-165 (group-hover:scale, group-hover:bg-white ok kutusu, brightness); src/app/[locale]/blog/page.jsx:48,59 (hover:bg-[#141414], group-hover:gap/text-white READ); src/app/[locale]/case-studies/[slug]/page.jsx:161 ve blog/[slug]/page.jsx:123 (group-hover:translate-x ok); page.jsx:97 (hover:gap-[26px]); services/page.jsx:119 (hover:border-white/40); Markdown.jsx:18 (hover:border-white); Header.jsx:33,37 (hover:text-white); kanıt: gaps/kb-cs-row-focus.png (preview opacity 0, a11y.json csPreviewOpacityOnFocus:'0'), shots/kb-home-card-focus.png vs kb-home-card-hover.png, shots/kb-blog-card-focus.png, shots/kb-cs-next-focus.png

**Sorun.** Kodda 15+ `hover:`/`group-hover:` kuralı var, hiçbirinin `focus-visible:`/`group-focus-visible:` ikizi yok. Ölçüm: case-studies satırı odaklandığında önizleme görseli opacity 0'da kalıyor, satır sola kaymıyor, arka plan değişmiyor. Home proje kartı odakta: görsel 1.03 ölçeklenmiyor, sağ alttaki ok kutusu beyaza dönmüyor (hover'da dönüyor — iki screenshot'ı karşılaştırın). Blog kartı odakta #141414 dolgu almıyor, READ oku açılmıyor. NEXT PROJECT oku odakta 10px kaymıyor. Dokunmatik cihazlarda ise hover hiç yok; tüm bu 'zenginleştirmeler' telefonda sıfır.

**Neden önemli.** Usability + craft: Awwwards jürisi klavyeyle gezer; hover'da yaşayan ama odakta ölü bir arayüz 'yarım yapılmış' okunur. Klavye kullanıcısı için satırın tıklanabilir olduğu tek ipucu jenerik kutu. WCAG 2.4.7/1.4.13 ihlali değil ama 'hover-only state' klasik AI-builder kalıbı.

**Ne yapılmalı.** Kural: her `hover:` için aynı satırda bir `focus-visible:` ikizi, her `group-hover:` için `group-focus-visible:` ikizi (Tailwind 3 destekliyor). Örnekler: case-studies/page.jsx:42 → `hover:pl-[20px] focus-visible:pl-[20px] hover:bg-[#141414] focus-visible:bg-[#141414] focus-visible:outline-none`; :47 preview → `group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2`. page.jsx:152 → `group-hover:scale-[1.03] group-focus-visible:scale-[1.03]`, :163 → `group-focus-visible:bg-white group-focus-visible:text-black`. blog/page.jsx:48 → `focus-visible:bg-[#141414]`, :59 → `group-focus-visible:gap-[12px] group-focus-visible:text-white`. Dokunmatik için: dinlenme durumu affordance'ı zaten taşımalı (ok ikonu, hairline) ve `@media (hover: none)` altında preview gibi hover-only süsler ya kaldırılmalı ya da `:active`'e bağlanmalı (`active:bg-[#141414]`). Tüm hover'ları tek bir `cn()` yardımcı sabitinde toplayın: `const ROW_HOVER = 'hover:bg-[#141414] focus-visible:bg-[#141414] ...'` ki ikizler kopmasın. Lint: `rg 'group-hover:' src | rg -v 'group-focus-visible:'` CI'da boş dönmeli.

#### `gap-keyboard-focus-a11y-03` — Kart/satır linklerinin erişilebilir adı 100+ karakterlik gürültü (görsel alt + rozet + özet)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:144-179 (proje kartı Link), src/app/[locale]/case-studies/page.jsx:42-48 (satır Link + gizli preview Image alt), src/app/[locale]/blog/page.jsx:48-63 (blog kartı Link); kanıt: shots/a11y-probe.json axLinks, gaps/a11y.json homeTabs #11-12

**Sorun.** Chrome erişilebilirlik ağacındaki gerçek link adları: home kartı → "VOCABULARY LANGUAGE LEARNING / IOS & ANDROID engineering visual ALAZ / 01 01 / MOBILE APPLICATION LANGUAGE LEARNING / IOS & ANDROID VOCABULARY A swipe-card app…" (önce img alt, sonra rozet, sonra meta, sonra h3, sonra özet). Case-studies satırı → "01 / VOCABULARY MOBILE APPLICATION LANGUAGE LEARNING / IOS & ANDROID VOCABULARY project preview" — opacity 0'daki hover önizlemesinin alt'ı bile adın içine giriyor. Blog kartı → tag + tarih + başlık + tüm excerpt + '7 MIN READ READ'. Ekran okuyucu kullanıcısı link listesinde (VoiceOver rotor / NVDA elements list) projeyi bulmak için bir paragraf dinliyor; sesli kontrol kullanıcısı 'click Vocabulary' diyemiyor çünkü ad 'VOCABULARY LANGUAGE…' ile başlıyor. Case-study detay sayfasındaki hero Image alt'ı da ("VOCABULARY technical engineering visual", [slug]/page.jsx:83) hemen ardından gelen h1 ile aynı bilgiyi tekrarlıyor.

**Neden önemli.** WCAG 2.4.4 (Link Purpose) teknik olarak geçer ama 2.4.6 / 2.5.3 ruhu ve gerçek kullanılabilirlik ihlali; Awwwards Usability'de 'ekran okuyucuyla gezildi mi' sorusunun cevabı hayır. Dekoratif görselin alt metni, rozet ve index numarası ismin parçası olmamalı.

**Ne yapılmalı.** Linklere `aria-labelledby` ile başlığı bağlayın, dekoratif parçaları isimden çıkarın. page.jsx:144 → `<Link aria-labelledby={`proj-${project.slug}`} …>`; :147 Image → `alt=""` (görsel dekoratif, ad başlıkta); :160 rozet span → `aria-hidden="true"`; :172 h3 → `id={`proj-${project.slug}`}`. Özet ve meta bilgisini korumak isterseniz `aria-describedby={`proj-${slug}-sum`}` ile özete bağlayın (ad kısa, açıklama isteğe bağlı okunur). case-studies/page.jsx:42 → `aria-labelledby={`cs-${project.slug}`}`, h2'ye id, :47 preview Image → `alt=""` + sarmalayıcı div'e `aria-hidden="true"`. blog/page.jsx:48 → `aria-labelledby={`post-${post.slug}`}` + h2 id; 'READ ↗' span'ine `aria-hidden`. [slug]/page.jsx:83 hero Image → `alt=""`. Alternatif ve daha 'doğru' kalıp: linki sadece h3 içine koyup kartın tamamını `::after { content:''; position:absolute; inset:0 }` ile tıklanabilir yapmak (Inclusive Components 'card' kalıbı) — böylece ad otomatik olarak başlık olur ve seçilebilir metin bozulmaz.

#### `gap-keyboard-focus-a11y-05` — Skip link yok, hiçbir <main> id/tabIndex taşımıyor

- **Önem:** ÖNEMLİ · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:72-79 (Header'dan önce skip link yok); src/app/[locale]/page.jsx:33, case-studies/page.jsx:27, services/page.jsx:58, blog/page.jsx:29, about/page.jsx:34, IntakeForm.jsx:91, LegalContent.jsx:11 (main id'siz); kanıt: a11y-probe.json skipLink:false, mainId:'(no id)' tüm sayfalarda; gaps/a11y.json homeTabs #1-7

**Sorun.** Her sayfada içeriğe ulaşmak için logo + 4 nav + TR + CTA = 7 Tab gerekiyor (ölçüldü). Ekran okuyucular landmark'larla atlayabilir ama klavye-only görsel kullanıcı için 'Skip to content' yok. Hiçbir `<main>`'de `id` yok, dolayısıyla hedef de yok; LegalContent/404 dahil.

**Neden önemli.** WCAG 2.4.1 Bypass Blocks (A). Awwwards Usability'de klavye gezinme hızı doğrudan puanlanır; Studio Freight / Locomotive gibi siteler skip link'i markaya uygun bir chip olarak tasarlar.

**Ne yapılmalı.** layout.jsx'te `<NextIntlClientProvider>` içinde Header'dan önce: `<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-[12px] focus:left-[var(--gutter)] focus:z-[100] focus:bg-white focus:text-[#0a0a0a] focus:font-mono focus:text-[12px] focus:tracking-[.085em] focus:px-[14px] focus:py-[10px] focus:outline-none">{t('skipToContent')}</a>` (metin en.json'a). Tüm `<main>`'lere `id="main" tabIndex={-1} className="… outline-none"` ekleyin (IntakeForm ve LegalContent dahil). Lenis `anchors` tıklamayı preventDefault etmediği için native fragment navigasyonu çalışıyor; yine de `scroll-padding-top` sayesinde hedef header altında kalmaz (ölçüldü). İsteğe bağlı: Next.js client-side navigasyon sonrası `main.focus({preventScroll:true})` ile odak her sayfada içeriğe başlasın.

#### `gap-keyboard-focus-a11y-09` — Intake gönderim/başarı: odak body'ye düşüyor, 'TRANSMITTING...' ve 'REQUEST RECEIVED' duyurulmuyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:55-88 (submit), :189 (disabled={submitting}), :36-38 (scrollTo smooth), :99-105 (complete bloğu); kanıt: a11y-probe.json intakeFlow '150ms after submit: body', 'after complete: body', 'live regions on complete: 0'; shots/kb-intake-complete.png

**Sorun.** Enter ile gönderince buton `disabled` oluyor ve odak anında `<body>`'ye düşüyor (ölçüldü); etiket 'TRANSMITTING...'e dönüyor ama bunu kimse duymuyor (aria-live yok, odak gitti). Başarıda tüm `main` içeriği değişiyor, h1 'REQUEST RECEIVED.' odaklanmıyor, sayfada sıfır live region; ekran okuyucu kullanıcısı için gönderim sessizce 'kayboldu'. `window.scrollTo({behavior:'smooth'})` reduced-motion'a bakmıyor. Hata durumunda `submitError` role=alert var (iyi) ama odak yine body'de.

**Neden önemli.** WCAG 4.1.3 Status Messages (AA), 2.4.3; 2.3.3 (smooth scroll). Dönüşüm anındaki belirsizlik, formun en kritik saniyesi.

**Ne yapılmalı.** (1) Butonu `disabled` yerine `aria-disabled={submitting}` + `onClick` guard ile tutun ki odak kaybolmasın; görsel 'cursor-wait opacity-60' aynı kalır. (2) `<span role="status" className="sr-only">{submitting ? t('submittingCta') : ''}</span>` (form'un içinde, her zaman DOM'da; içerik değişince duyurulur). (3) Başarıda `const doneRef=useRef(); useEffect(()=>{ if(complete) doneRef.current?.focus() },[complete]); <h1 ref={doneRef} tabIndex={-1}>` + tamamlanma paragrafını `role="status"` ile sarın. (4) Scroll: `behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'` — ya da hiç scrollTo yapmayın, h1 focus zaten görünür alana getirir. (5) Hata: `submitError` set edildiğinde `submitRef.current.focus()`.

#### `gap-keyboard-focus-a11y-13` — Services: nav landmark adı 'PRACTICAL BREAKDOWN'; 25 adet tekrar eden h3 etiket başlığı

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:114 (aria-label={t('overviewEyebrowRight')}), :158,161,174,182,186 (h3 × 5 × 5 hizmet); kanıt: a11y-probe.json services.headings (46 başlık), landmarks 'nav label=PRACTICAL BREAKDOWN'

**Sorun.** Landmark listesinde 'navigation: PRACTICAL BREAKDOWN' çıkıyor — bir eyebrow metni, navigasyon adı değil. Başlık listesi: her hizmette 'THE PROBLEM & SCOPE / CORE DELIVERABLES / STACK / REAL-WORLD OUTCOME / IDEAL FIT' h3'leri 5 kez tekrarlanıyor → sayfada 46 başlık, 25'i aynı 5 etiket. SR kullanıcısı H tuşuyla gezerken bağlamı kaybediyor; bunlar başlık değil tanım etiketleri (label → değer çiftleri).

**Neden önemli.** WCAG 1.3.1 (yapı), 2.4.6 (başlıklar tanımlayıcı), landmark adlandırma pratiği. Awwwards Usability: başlık haritası sayfanın iskeletidir.

**Ne yapılmalı.** nav → `aria-label={t('servicesNavLabel')}` (en.json: 'Jump to a service'). Her hizmet gövdesinde h3'ler yerine `<dl className="…"><div><dt className="font-mono text-[12px] …">{labels.whatItIs}</dt><dd>…</dd></div>…</dl>`; görsel tipografi aynı sınıflarla korunur. Stack listesi `<dt>STACK</dt><dd><ul>…</ul></dd>`. Böylece başlık ağacı h1 → h2 (5 hizmet + overview/process/FAQ) → h3 (process adımları, FAQ soruları) olur.

#### `gap-keyboard-focus-a11y-15` — Link olmayan kartlarda interaktif affordance: ok ikonu + hover arka planı, klavyeyle ulaşılamıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/page.jsx:99-102 (service article: hover:bg-[#141414] + MoveUpRight ok), src/app/[locale]/services/page.jsx:137 (article hover:bg-[#0f0f0f]); kanıt: shots/kb-home-service-article-hover.png, shots/kb-services-article-hover.png, gaps/a11y.json homeTabs (kartlar tab sırasında yok)

**Sorun.** Home'daki üç CORE CAPABILITIES kartı `article` — tıklanabilir değil ama sağ üstte ↗ oku ve hover'da arka plan dolgusu var; fare kullanıcısı tıklıyor, hiçbir şey olmuyor; klavye kullanıcısı için kart hiç yok (tab sırasında logo…EXPLORE SERVICES'ten VIEW ALL'a atlıyor). Services sayfasındaki beş hizmet bloğu da hover'da dolgu alıyor ama link değil.

**Neden önemli.** Usability: 'affordance yalanı' — okun ve hover'ın vaat ettiği etkileşim yok. Awwwards jürisi bunu doğrudan 'broken interaction' sayar; ekran okuyucu için ise sessiz ama tutarsız.

**Ne yapılmalı.** Ya link yapın ya affordance'ı kaldırın. Home: `<article>` → `<Link href={`/services#${service.id}`} className="group …">` (service verisine `id` eklenmeli; en.json services[]'e `anchor: 'custom-software-development'` vb.), ok kutusu `group-hover`/`group-focus-visible` ile dönsün, `aria-labelledby` ile h3'e bağlansın. Services/page.jsx:137: `hover:bg-[#0f0f0f]` kaldırın; blok zaten `:target` hedefi — onun yerine `target:bg-[#0f0f0f]` ile chip'ten gelindiğinde vurgu verin (klavye ve SR için de anlamlı).

#### `gap-keyboard-focus-a11y-17` — Hareketli içerik duraklatılamıyor: marquee'ler, animate-ping ve hero videoları reduced-motion'ı yok sayıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/page.jsx:35 (hero <video autoPlay>), :59-74 ve :107-126 (animate-signal-marquee / animate-ticker), :198-201 (animate-ping emerald nokta); tailwind.config.js:106-118 (keyframes/animation, motion-reduce yok); case-studies/page.jsx:29, services/page.jsx:61-72, about/page.jsx:36, IntakeForm.jsx:93 (autoPlay video, reduced-motion kontrolü yok — sadece BackgroundVideo.jsx:14 kontrol ediyor); kanıt: a11y-probe.json reducedMotion (prefers:true iken marqueeAnim 'running', pingAnim 'ping')

**Sorun.** `prefers-reduced-motion: reduce` emülasyonunda iki marquee ve ping animasyonu çalışmaya devam ediyor (ölçüldü). Beş sayfanın hero videosu düz `<video autoPlay loop>`; BackgroundVideo'daki reduced-motion/saveData mantığı bunlara uygulanmamış. Sitede hareketi durduracak hiçbir kontrol yok (ne toggle ne hover-pause). Marquee'ler aria-hidden (SR için doğru) ama görsel olarak 5 sn'den uzun, otomatik başlayan, paralel içerik.

**Neden önemli.** WCAG 2.2.2 Pause, Stop, Hide (A) — otomatik başlayan, 5 sn'den uzun hareket için durdurma mekanizması şart; 2.3.3 Animation from Interactions (AAA). Vestibüler hassasiyeti olan kullanıcılar için hero video + marquee + ping üçlüsü gerçek bir engel. Awwwards'ta 'motion toggle' artık craft standardı (Lusion, Active Theory).

**Ne yapılmalı.** (1) Tailwind: marquee/ticker/ping sınıflarına `motion-reduce:[animation-play-state:paused]` (marquee için konumu korur) ya da `motion-reduce:animate-none`; ayrıca marquee sarmalayıcıya `hover:[&>div]:[animation-play-state:paused] focus-within:…` ile kullanıcı durdurabilsin. (2) Hero videolarını `HeroVideo` client bileşenine alın: `useEffect(()=>{ if(matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData){ v.pause(); v.removeAttribute('autoplay') } })` + CSS fallback `@media (prefers-reduced-motion: reduce){ video[autoplay]{ display:none } }` (poster kalır). (3) Site genelinde bir hareket anahtarı (bkz. additions): `html[data-motion="off"]` altında Lenis destroy, `[data-reveal]` anında görünür, tüm `animation: none`, videolar pause; tercih localStorage'da. (4) `animate-ping` noktasını tamamen kaldırın (slop dimension'ıyla ortak).

> **Doğrulayıcı notu:** Doğrulanan: `reducedMotion:'reduce'` emülasyonunda iki marquee `animationPlayState=running`, `.animate-ping` çalışıyor (kendi ölçümüm); tailwind.config.js:106-118'de motion-reduce yok; sitede durdurma kontrolü yok. Video kısmı için not: bu headless Chromium'da hiçbir video decode edilmiyor (readyState=0, her iki modda paused) — yani 'hero video reduced-motion'ı yok sayıyor' iddiası ölçümle değil kodla destekleniyor: page.jsx:35, case-studies/page.jsx:29, services/page.jsx:61-72, about/page.jsx:36, IntakeForm.jsx:93 beş düz `<video autoPlay loop preload="auto">`, BackgroundVideo.jsx:14'teki kontrol bunlara uygulanmamış — kod açısından doğru. Lenis reduced-motion'da zaten devre dışı (html'de `lenis` sınıfı yok, ölçüldü). WCAG 2.2.2 gerekçesi ve fix (motion-reduce sınıfları, HeroVideo bileşeni, site geneli anahtar) doğru.

#### `gap-keyboard-focus-a11y-missed-1` — Mobil menü kısa/yatay viewport'ta kaydırılamıyor: 04-06 numaralı satırlar ulaşılamaz

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:42 (`absolute top-full … min-h-[calc(100dvh-66px)]`, overflow yok) + :22-25 (body overflow:hidden); kanıt: shots/skeptic/landscape-menu.png (740×360)

**Sorun.** Menü `fixed` header'ın içinde `absolute` konumlu ve body kilitli olduğu için hiçbir şekilde kaydırılamıyor. 740×360 (telefon yatay) ölçümü: nav 65→679px, son link 556→634px, viewport 360px → altı satırdan yalnız 3'ü görünüyor; BLOG, START A PROJECT ve TR satırları dokunmatikte ulaşılamıyor, klavyede Tab ile odak görünmeyen satıra iniyor. Hamburger ≤1000px'de aktif olduğu için 600px'ten kısa tüm tablet/telefon yatay viewport'lar etkileniyor.

**Neden önemli.** WCAG 1.4.10 Reflow / 2.4.11 Focus Not Obscured; usability: ana navigasyonun yarısı erişilemez. Awwwards jürisi menüyü yatay telefonda da açar.

**Ne yapılmalı.** Menüyü header'ın dışına `fixed inset-x-0 top-[66px] bottom-0 overflow-y-auto overscroll-contain` olarak taşıyın (Radix Dialog.Content kullanılacaksa aynı sınıflar), `min-h` yerine `max-h-[calc(100dvh-66px)]`; satır yüksekliğini kısa viewport'ta `[@media(max-height:620px)]:py-[14px] [@media(max-height:620px)]:text-[20px]` ile düşürün. Test: Playwright 740×360 ve 1000×600'de menü açıkken son linkin `getBoundingClientRect().bottom <= innerHeight` ya da scrollable olduğunu assert edin.

#### `gap-keyboard-focus-a11y-missed-2` — Lenis anchor offset'i scroll-padding-top ile iki kez uygulanıyor: sayfa içi linkler 78px aşağıya iniyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/SmoothScroll.jsx:14 (`anchors: { offset: -78 }`) + src/app/globals.css:44-46 (`scroll-padding-top: 78px`); Lenis kaynağı node_modules/lenis/dist/lenis.mjs:783-786 scroll-padding'i zaten çıkarıyor

**Sorun.** Lenis `scrollTo` hedefi hesaplarken `scroll-margin-top` ve kapsayıcının `scroll-padding-top`'ını kendisi düşüyor; üstüne `offset: -78` eklenince 156px oluyor. Ölçüm (klavye Enter, 2 tekrar): home 'SCROLL TO EXPLORE' → `#validation` bölümünün üst kenarı viewport'ta 156px'te (header 76px; reduced-motion'da Lenis kapalıyken aynı link 78px'e iniyor); services chip → `#api-integration` üst kenarı 232px'te (scroll-mt-[90px] ile beklenen 168). Her anchor atlamasında header altında ~80px'lik boş bant; klavye ve fare için aynı; reduced-motion kullanıcısı farklı yere iniyor.

**Neden önemli.** Hero'nun tek CTA'sı ve services içi gezinmenin iniş noktası yanlış; 'tutarlı anchor davranışı' Awwwards Usability'de bakılan ilk şeylerden. Odak başlangıç noktası (sequential focus) hedefe gidiyor ama görsel olarak hedef aşağıda kalıyor.

**Ne yapılmalı.** SmoothScroll.jsx:14 → `anchors: true` (offset'i kaldırın); scroll-padding-top CSS'ten gelmeye devam eder ve reduced-motion ile tutarlı olur. Mobil header 66px olduğu için `html { scroll-padding-top: 78px } @media (max-width:760px){ html { scroll-padding-top: 68px } }`. Doğrulama: `#validation` için Enter sonrası `getBoundingClientRect().top === 78`.

### İNCE İŞÇİLİK

#### `gap-keyboard-focus-a11y-06` — Sabit İngilizce aria-label'lar; 'Switch language' görünen 'TR' etiketini içermiyor (Label in Name); hreflang/lang yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:29 ('ALAZ home'), :30 ('Main navigation'), :37 ('Switch language'), :39 ('Open menu'/'Close menu'), :42 ('Mobile navigation'), :45 ('TR / TÜRKÇE' lang'sız); kanıt: a11y-probe.json axLinks 'Switch language', langParts sadece html@en

**Sorun.** next-intl ile çift dilli sitede altı aria-label Header.jsx'te sabit İngilizce; TR locale'de ekran okuyucu Türkçe sesle 'Switch language', 'Open menu' okuyor (3.1.2 Language of Parts). Dil linkinin görünen metni 'TR', erişilebilir adı 'Switch language' — sesli kontrol kullanıcısı 'TR'ye tıkla' diyemez (WCAG 2.5.3 Label in Name, A). Linkte `hreflang="tr"` yok; mobil menüdeki 'TR / TÜRKÇE' metni `lang="tr"` taşımıyor. Menü butonunun adı toggle ile değişiyor + aria-expanded: ekran okuyucu 'Close menu, expanded' diye çifte bilgi veriyor.

**Neden önemli.** i18n hijyeni + WCAG 2.5.3 / 3.1.2 / 4.1.2. Awwwards jürisi için küçük ama 'sabit string sızmış' sinyali kod kalitesini ele verir.

**Ne yapılmalı.** en.json/tr.json `nav` altına `a11y: { home: 'ALAZ — home', main: 'Main navigation', mobile: 'Mobile navigation', menu: 'Menu', switchLang: 'Türkçe' }` ekleyip Header'da `t('a11y.home')` vb. kullanın. Dil linki: `<Link href={pathname} locale={otherLocale} hrefLang={otherLocale} lang={otherLocale}>TR<span className="sr-only"> — {NATIVE_LANGUAGE_NAMES[otherLocale]}</span></Link>` (aria-label kaldırılır; ad 'TR — TÜRKÇE' görünen etiketi içerir, span lang="tr" ile doğru seslendirilir). Menü butonu: sabit `aria-label={t('a11y.menu')}` + `aria-expanded`. Mobil 'TR / TÜRKÇE' satırına `lang={otherLocale}`.

> **Doğrulayıcı notu:** Doğru olanlar: Header.jsx:29,30,37,39,42'de altı aria-label sabit İngilizce; dil linkinin görünen metni 'TR', erişilebilir adı 'Switch language' (2.5.3 Label in Name ihlali); mobil 'TR / TÜRKÇE' satırı (Header.jsx:45) `lang` taşımıyor; buton adı 'Open/Close menu' + aria-expanded çifte sinyal. YANLIŞ olan: 'Linkte hreflang="tr" yok' — next-intl Link `locale` prop'u ile otomatik ekliyor; SSR HTML'de `<a hrefLang="tr" … aria-label="Switch language" href="/tr">` olarak mevcut, ayrıca `<link rel="alternate" hrefLang>` etiketleri de var. Bu maddeyi düşürün. Şiddet: sahibin kapsamı yalnız İngilizce; EN locale'de sabit İngilizce etiketlerin pratik etkisi yok, geriye yalnız 'TR' Label-in-Name ve lang eksiği kalıyor → minor. Fix (aria-label kaldırıp 'TR<span class=sr-only lang=tr> — TÜRKÇE</span>', sabit 'Menu' etiketi + aria-expanded) doğru.

#### `gap-keyboard-focus-a11y-07` — Aktif nav linki aria-current taşımıyor; durum yalnız renkle (#fff vs #aaa)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:32-33; kanıt: a11y-probe.json ariaCurrent:0 tüm sayfalarda; gaps/forced-colors-home.png (nav linkleri ayırt edilemiyor)

**Sorun.** `isActive` hesaplanıyor ama sadece `text-white` sınıfına dönüşüyor. Ekran okuyucu hangi sayfada olduğunu nav'dan öğrenemiyor; forced-colors modunda tüm linkler LinkText rengine zorlandığı için aktif durum tamamen kayboluyor (forced-colors-home.png'de CASE STUDIES/ABOUT/SERVICES/BLOG birebir aynı).

**Neden önemli.** WCAG 1.3.1 (durum programatik değil), 1.4.1 Use of Color. Craft: aktif sayfa işareti nav'ın tipografik dilinin parçası olmalı (ince bir alt çizgi, index, nokta).

**Ne yapılmalı.** `<Link aria-current={isActive ? 'page' : undefined} className={cn(linkBase, 'aria-[current=page]:text-white aria-[current=page]:[background-size:100%_1px]')}>` — finding 01'deki `.link-mono` alt çizgi diliyle aynı: aktif = çizgi tam, hover/focus = çizgi çizilir. Forced colors için `@media (forced-colors: active){ nav a[aria-current=page]{ text-decoration: underline; text-underline-offset: 6px } }`.

> **Doğrulayıcı notu:** Doğrulandı: Header.jsx:32-33 `isActive` yalnız `text-white` üretiyor, hiçbir sayfada `aria-current` yok (ariaCurrent:0); forced-colors'ta aktif ve pasif nav linkinin rengi aynı rgb(0,0,159) (ölçtüm), forced-colors-home.png'de ayırt edilemiyor. Ancak normal modda görünür aktif durum (#fff vs #aaa) var ve mobil menüde de aynı eksik (Header.jsx:43) geçerli. Programatik durum + forced-colors alt çizgisi fix'i doğru; etkisi SR/HC ile sınırlı → minor.

#### `gap-keyboard-focus-a11y-10` — Lucide ikonları aria-hidden almıyor (lucide-react 0.469 varsayılan eklemiyor)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** package.json (lucide-react ^0.469.0); tüm `<ArrowUpRight/>`, `<MoveUpRight/>`, `<Menu/>`, `<X/>`, `<Check/>`, `<Clock/>`, `<ArrowRight/>`, `<CirclePower/>` kullanımları: Header.jsx:38,39,43-45; page.jsx:54,97,100,139,164,203; case-studies/page.jsx:46; blog/page.jsx:57,60; IntakeForm.jsx:116,132,188,189; [slug] sayfaları; tek istisna page.jsx:78 ShieldCheck (elle aria-hidden); kanıt: a11y-probe.json lucideWithoutHidden 11/12 (home), 7/7 (intake), 6/6 (blog)

**Sorun.** Projedeki lucide-react sürümü SVG'lere `aria-hidden="true"` eklemiyor; DOM'da 11/12 ikon erişilebilirlik ağacında isimsiz `image` olarak duruyor. NVDA/JAWS bazı kombinasyonlarda bunları 'graphic' diye okur; link adlarına da katkı potansiyeli var (örn. 'VIEW ALL PROJECTS graphic'). Intake'teki Check ikonu tamamlanan adımı işaretliyor ama adı olmadığı için SR'a bir şey söylemiyor; CirclePower gönder butonunda anlamsız bir 'graphic'.

**Neden önemli.** WCAG 1.1.1 (anlamsız grafik sızıntısı) + 4.1.2. Craft: 'lucide ikonları her yerde' zaten slop sinyali; en azından erişilebilirlik ağacında görünmez olmalı.

**Ne yapılmalı.** En temizi: lucide-react'i varsayılan olarak `aria-hidden="true"` ekleyen güncel sürüme yükseltin (changelog'da 'aria-hidden by default' notunu doğrulayın) ve `npm ls lucide-react` ile tek sürüm olduğunu kontrol edin. Ara çözüm: `src/components/Icon.jsx` sarmalayıcı (`export const Icon = ({as: C, ...p}) => <C aria-hidden="true" focusable="false" {...p}/>`) ve tüm kullanımları buna geçirin; anlam taşıyan tek yer (intake adım listesindeki Check) ikon yerine `<span className="sr-only">{t('stepDone')}</span>` + aria-hidden ikon. Oklar/chevron'lar gibi tamamen dekoratif ikonları uzun vadede özel 1 renkli tek SVG set'iyle değiştirmek (slop dimension'ıyla ortak) hem markayı hem a11y'yi çözer.

> **Doğrulayıcı notu:** Gerçek: lucide-react 0.469.0 kurulu (npm ls), dist/esm/Icon.js'te varsayılan `aria-hidden` yok; CDP Accessibility.getFullAXTree'de lucide SVG'leri `role=image name="" ignored=false` olarak duruyor (home'da 11/12). Tek istisna page.jsx:78 ShieldCheck. Ancak pratik etki küçük: isimsiz SVG çoğu SR'da sessiz geçilir, link adlarına metin katmıyor (axLinks'te 'VIEW ALL PROJECTS' temiz). Hijyen/sağlamlaştırma → minor. Fix (sürüm yükseltme ya da Icon sarmalayıcı, intake Check'e sr-only metin) doğru.

#### `gap-keyboard-focus-a11y-11` — Ekran okuyucu gürültüsü: unicode oklar, 'SYSTEM_ACTIVE', '//', '01 / 05', boşluksuz 'DOWNLOAD ONAPP STORE'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** messages/en.json caseStudy.allCaseStudies ('← ALL CASE STUDIES'), blogPost.allFieldNotes ('← ALL FIELD NOTES'), legal.backToHome ('← BACK TO HOME'), footer.backTop ('BACK TO TOP ↑'), intake.privacyNoteCta ('PRIVACY POLICY ↗'), home.hero.status ('SYSTEM_ACTIVE'); Header.jsx:45 (`<span>↗</span>`); page.jsx:45,54,82,86,100,206 ('— 001 / 005', '01 / 05', '({number})', '// role', '01 — 03'); StoreButtons.jsx:15-18 (iki span flex-col, boşluk yok); PoweredBy.jsx:12 (aria-hidden li); kanıt: a11y-probe.json textArrows, roleLinkSpans 'COMING SOON ONAPP STORE'

**Sorun.** Ekran okuyucu şunları okuyor: 'leftwards arrow ALL CASE STUDIES', 'BACK TO TOP upwards arrow', 'north east arrow TR slash TÜRKÇE', 'SYSTEM underscore ACTIVE', 'slash slash Founder', 'zero one slash zero five', 'dash zero zero one slash zero zero five'. Store butonlarında iki satır flex-col span arasında boşluk olmadığı için ad 'COMING SOON ONAPP STORE' / 'DOWNLOAD ONAPP STORE'. PoweredBy `<ul>` 3 `li` sayıyor, biri aria-hidden ayraç → 'list, 3 items' ama 2 okunuyor. Testimonial'lar `<article>` + '// role' olarak işaretli; `figure/blockquote/figcaption` değil.

**Neden önemli.** Usability: SR kullanıcısı için sayfa chrome'unun yarısı anlamsız seslerden oluşuyor. Slop sinyali: bu dekoratif 'terminal' süsleri zaten copy dimension'ında sorun; a11y tarafında en azından ağaçtan çıkmalı.

**Ne yapılmalı.** (1) Yön ipuçlarını metinden çıkarıp aria-hidden ikon olarak verin: en.json'da '← ALL CASE STUDIES' → 'ALL CASE STUDIES', JSX'te `<ArrowLeft aria-hidden size={14}/>`; aynı şey backTop, privacyNoteCta, Header.jsx:45 (`<span aria-hidden="true">↗</span>`). (2) Index/eyebrow dekorasyonlarını (`01 / 05`, `— 001 / 005`, `({number})`, `//`) `aria-hidden="true"` span'lerine alın; anlam taşıyanlar için sr-only karşılık (`<span className="sr-only">Section 1 of 5</span>`). (3) hero.status 'SYSTEM_ACTIVE' → kaldırın ya da en azından `aria-hidden`. (4) StoreButtons.jsx:16-17 arasına `<span className="sr-only"> </span>` ya da ilk span'e `after:content-['_']`; daha iyisi `aria-label={`${downloadLabel} ${name}`}` linkte. (5) PoweredBy ayraç: `li` yerine `before:` pseudo-element ile çizgi. (6) Testimonial: `<figure><blockquote>…</blockquote><figcaption><strong>{name}</strong>, <span>{role}</span></figcaption></figure>`.

> **Doğrulayıcı notu:** Doğrulananlar: en.json caseStudy.allCaseStudies '← ALL CASE STUDIES', blogPost.allFieldNotes '← ALL FIELD NOTES', legal.backToHome '← BACK TO HOME', footer.backTop 'BACK TO TOP ↑', intake.privacyNoteCta 'PRIVACY POLICY ↗', home.hero.status 'SYSTEM_ACTIVE'; Header.jsx:45 `<span>↗</span>`; page.jsx:45,54,82,86,100,206 index/`//` süsleri; StoreButtons.jsx:15-18 flex-col iki span arasında boşluk yok → AX adı 'COMING SOON ONAPP STORE' (ölçüldü); testimonial `<article>` + '// role' (page.jsx:81-86). YANLIŞ: PoweredBy 'list, 3 items' iddiası — aria-hidden `li` erişilebilirlik ağacından çıkıyor, Chrome listeyi 2 çocuklu veriyor (CDP: list childIds=2); bu alt maddeyi silin. Diğer fix'ler (ok ikonlarını aria-hidden ikon yapmak, index'leri aria-hidden, StoreButtons'a aria-label, figure/blockquote) doğru.

#### `gap-keyboard-focus-a11y-12` — Store butonları: role='link' aria-disabled span; yeni sekme linklerinde uyarı yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/StoreButtons.jsx:21-22; src/app/[locale]/case-studies/[slug]/page.jsx:96 (VISIT {site} target=_blank); src/components/Markdown.jsx:21 (dış linkler target=_blank); kanıt: a11y-probe.json roleLinkSpans

**Sorun.** 'COMING SOON' durumundaki store butonu `<span role="link" aria-disabled="true">`: odaklanamıyor (doğru) ama SR'da 'link, unavailable' diye yanıltıcı bir kontrol olarak duyuruluyor; href'siz role=link ARIA'da 'focusable olmalı' beklentisiyle çelişir. Aktif store linkleri ve VISIT/Markdown kaynak linkleri `target="_blank"` ile yeni sekmede açılıyor ama adlarında bunun ipucu yok (G201).

**Neden önemli.** WCAG 4.1.2 (rol/durum uyumsuz), 3.2.5 (AAA, yeni pencere uyarısı) ve genel öngörülebilirlik. Küçük ama 'kontrol gibi görünen ama olmayan şey' kalıbı Awwwards jürisinin notlarına girer.

**Ne yapılmalı.** StoreButtons.jsx:22 → `role`/`aria-disabled` kaldırın, düz `<span>` kalsın; görsel 'yakında' etiketi zaten metinde. Tüm `target="_blank"` linklerine `<span className="sr-only">{t('a11y.newTab')}</span>` ekleyin (en.json: '(opens in a new tab)') ve mevcut ↗ ikonunu bu anlamla tutarlı kullanın; Markdown.jsx:21'de aynı span'i renderInline içinde otomatik ekleyin.

#### `gap-keyboard-focus-a11y-14` — FAQ: <summary> içinde <h3> — tarayıcı/okuyucu kombinasyonlarında tutarsız; açılış animasyonsuz

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/services/page.jsx:235-242; kanıt: gaps/kb-services-summary-focus.png, shots/svc-d-faq-open.png, a11y-probe.json detailsOpensWithEnter:true, axLinks 'DisclosureTriangle'

**Sorun.** Chrome `summary`'yi 'DisclosureTriangle' olarak, içindeki h3'ü ayrıca başlık olarak veriyor; Firefox/NVDA ve bazı JAWS sürümleri summary içindeki başlık semantiğini düşürür (Scott O'Hara'nın details/summary testleri). Enter/Space ile açılma çalışıyor (ölçüldü) ama `+`/`−` dışında bir geçiş yok: `<details>` yüksekliği animasyonsuz 'pat' diye açılıyor — Awwwards seviyesinde accordion'lar grid-rows/height animasyonlu. Odak halkası 29px'lik summary satırını 4px dışarıdan sararak üst/alt hairline'lara bitişik duruyor.

**Neden önemli.** 4.1.2 tutarlılık + craft. Native `<details>` doğru bir başlangıç ama bu tasarımda 'disclosure button inside heading' kalıbı hem SR tutarlılığı hem animasyon kontrolü sağlar.

**Ne yapılmalı.** ARIA disclosure kalıbı: `<h3><button type="button" aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between py-[22px] text-left …">{faq.q}<span aria-hidden>+</span></button></h3><div id={id} hidden={!open} className="grid [grid-template-rows:0fr] data-[open=true]:[grid-template-rows:1fr] transition-[grid-template-rows] duration-400 ease-[cubic-bezier(.22,1,.36,1)]"><p className="overflow-hidden">{faq.a}</p></div>` (küçük bir client component; motion-reduce'da transition none). `<details>` kalacaksa: Chrome 131+ `::details-content` + `interpolate-size: allow-keywords` ile animasyon, `name="faq"` ile tek-açık davranışı ve `hidden="until-found"` yerine details'in native find-in-page desteği. Her iki durumda summary/button için finding 01'deki satır odak dili (`focus-visible:[box-shadow:inset_3px_0_0_#fff]`) kullanılsın.

#### `gap-keyboard-focus-a11y-16` — Başlık hiyerarşisi: case-study h2'leri tanımlayıcı değil, bölümler başlıksız, home h1 sadece 'ALAZ.'

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/case-studies/[slug]/page.jsx:111-128 (h2 'BUILD FOR WHAT'S NEXT.' vb., eyebrow p'de), :134-147 (gallery başlıksız), :149-163 (deliverables/next project başlıksız); src/app/[locale]/page.jsx:46 (h1 'ALAZ.'); about/page.jsx:54 (h2 'ALAZ.'); kanıt: a11y-probe.json headings (case-vocabulary: h1 VOCABULARY., h2 BUILD FOR WHAT'S NEXT., PRECISION AT EVERY LAYER., LESS NOISE. MORE SIGNAL.)

**Sorun.** Case-study sayfasında SR başlık listesi: 'VOCABULARY.' → 'BUILD FOR WHAT'S NEXT.' → 'PRECISION AT EVERY LAYER.' → 'LESS NOISE. MORE SIGNAL.' — gerçek bölüm adları ('01 / THE CHALLENGE', 'THE APPROACH', 'THE OUTCOME') `<p>` eyebrow'da, başlık ağacında yok. Galeri, deliverables ve NEXT PROJECT bölümleri başlıksız. Home h1 yalnız marka adı; about'ta ikinci h2 de 'ALAZ.' (origin kelimesi) → iki sayfada 'ALAZ.' başlığı farklı anlamlarda. Her sayfada tek h1 var (iyi).

**Neden önemli.** WCAG 2.4.6 Headings and Labels, 1.3.1. SR kullanıcısı için case-study yapısı okunmuyor; sloganvari başlıklar copy dimension'ında da sorun ama burada navigasyonu kırıyor.

**Ne yapılmalı.** [slug]/page.jsx:112 → `<h2><span className="sr-only">{t('challengeLabel')}: </span>{challengeHeading[0]}<br/>{challengeHeading[1]}</h2>` (en.json'a 'The challenge' / 'The approach' / 'The outcome'); görsel eyebrow `aria-hidden`. Galeri section'ına `<h2 className="sr-only">{t('galleryEyebrow')}</h2>` (aria-label yerine gerçek başlık), deliverables grid'ine sr-only h2 'Deliverables', next-project linkinin üstüne sr-only h2 'Next project'. Home h1: `ALAZ<span className="text-[#858585]">.</span><span className="sr-only"> — {t('hero.kicker')}</span>`. about h2: `<span className="sr-only">{t('originLabel')}: </span>{t('originWord')}`.

#### `gap-keyboard-focus-a11y-18` — Forced-colors / prefers-contrast: video üstü backplate'ler, bg-white hairline'lar kayboluyor, seçili/aktif durumlar renk-bağımlı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/globals.css (forced-colors/prefers-contrast bloğu yok); page.jsx:42,190 (w-[6px] bg-white kareler), :85 (w-[20px] h-px bg-white), PoweredBy.jsx:12 (w-px bg-white ayraç), Markdown.jsx:91 (before:bg-white madde çizgisi), IntakeForm.jsx:14-18 (beyaz stroke'lu data-URI chevron), :115,128 (adım/tip seçimi bg+border rengiyle); kanıt: gaps/forced-colors-home.png (h1 ve slogan arkasında beyaz backplate blokları, nav linkleri ayırt edilemez), gaps/forced-colors-intake.png (hero bölgesinde backplate, altında yok)

**Sorun.** Forced colors'ta Chrome video/görsel üstündeki metinlere Canvas backplate çiziyor: 'ALAZ.' ve 'NO BULLSHIT.' kocaman beyaz bloklara dönüyor (forced-colors-home.png), intake'te hero alanındaki eyebrow/h1 backplate'li, video dışındaki metinler değil — yani sorun arkadaki `<video>`. `background-color` ile çizilen tüm hairline/nokta/ayraçlar (bg-white span'ler, Markdown madde çizgileri) kayboluyor çünkü arka plan rengi zorlanıyor. Select chevron'u beyaz stroke'lu background-image: açık HC temasında görünmez. Intake adım listesi (aktif adım yalnız text-white), tip kartı seçimi (bg-[#1c1c1c] + border-white) ve aktif nav linki renk dışında işaret taşımıyor (Check ikonu seçimde kalıyor — tek kurtarıcı). `prefers-contrast: more` için hiçbir token ayarı yok (`--line` .13 alfa, `--dim` #7e828a olduğu gibi kalıyor).

**Neden önemli.** WCAG 1.4.1, 1.4.11 ve Windows High Contrast kullanıcıları; Awwwards için 'tema altında dağılmayan tasarım' craft göstergesi. Kontrast oranları zaten ayrı dosyalandı, burada yapısal uyum eksik.

**Ne yapılmalı.** globals.css'e: `@media (forced-colors: active){ video, [data-decor]{ display:none } .hairline, .bg-line{ border-color: CanvasText } [aria-current=page], [aria-current=step]{ text-decoration: underline; text-underline-offset:6px } [aria-pressed=true], [aria-checked=true]{ outline:2px solid Highlight; outline-offset:-2px } }`. Arka plan rengiyle çizilen çizgi/noktaları `border` ile çizin (`w-[20px] border-t border-current`, Markdown li `before:border-t before:border-current`), PoweredBy ayracı `border-l`. Select chevron'u `fill="currentColor"` inline SVG + `forced-color-adjust:auto` ile `<span aria-hidden>` olarak overlay edin. `@media (prefers-contrast: more){ :root{ --line: rgba(255,255,255,.4); --dim:#aeb2b8; --gray:#cfd2d6 } }`. Aktif adım/tip seçimine renk dışı işaret (index yanında kısa bar, `aria-current`).

> **Doğrulayıcı notu:** Doğrulanan: globals.css'te forced-colors/prefers-contrast bloğu yok; forced-colors-home.png'de video üstü metinlerde backplate blokları; nav aktif/pasif aynı renk (ölçüm rgb(0,0,159)); Chromium background-color'ı Canvas'a zorlarken alfayı koruyor (header bg rgba(10,10,10,.55) → rgba(255,255,255,.55) ölçüldü). Düzeltme: 'bg-white hairline/nokta/ayraçlar kayboluyor' yalnız zemini Canvas olan bölgelerde geçerli (testimonial çizgisi page.jsx:85, intake durum karesi IntakeForm.jsx:120, Markdown madde çizgileri); hero'daki SYSTEM_ACTIVE karesi ve PoweredBy ayracı video üstünde olduğu için görünür kalıyor (shots/skeptic/forced-hero-crop.png, forced-powered-crop.png). Border ile çizme ve prefers-contrast token fix'leri doğru. Minor.

#### `gap-keyboard-focus-a11y-19` — Landmark hijyeni: adsız <aside>, footer linkleri nav değil, intake form başlığa bağlı değil

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:112 (aside), :122 (form aria-labelledby yok); src/components/Footer.jsx:23-26 (link grubu div); kanıt: a11y-probe.json landmarks (start-project: 'aside label=""'), tüm sayfalarda footer içinde nav yok

**Sorun.** Intake'teki `<aside>` 'complementary' landmark'ı olarak adsız listeleniyor; içindeki adım listesi SR için sıradan div'ler (bkz. finding 08). Form elemanı `aria-labelledby` ile 'START A PROJECT' h1'ine bağlı değil, landmark listesinde 'form' adsız. Footer'daki BLOG/LEGAL/PRIVACY linkleri `<nav>` içinde değil; 'BACK TO TOP' de aynı div'de değil, ayrı. Pozitif: header/main/footer/nav var, home hero `aria-labelledby="hero-title"` ile region.

**Neden önemli.** WCAG 1.3.1 / 2.4.1 destekleyici; SR kullanıcısının landmark rotor'u sayfanın haritasıdır.

**Ne yapılmalı.** IntakeForm.jsx:112 → `<aside aria-labelledby="brief-steps">` + :113 span'i `<h2 id="brief-steps" className="font-mono …">` (görsel aynı); :122 → `<form onSubmit={submit} noValidate aria-labelledby="intake-title">` + h1'e `id="intake-title"`. Footer.jsx:23 → `<nav aria-label={t('footerNavLabel')} className="flex …">`. İki 'nav' landmark'ı (Main / Mobile) i18n etiketle ayrışsın (finding 06).

#### `gap-keyboard-focus-a11y-20` — Markdown başlıkları id'siz: derin link, 'kopyala' ve :target vurgusu yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/components/Markdown.jsx:61-74 (h2/h3 id üretilmiyor), blog/[slug]/page.jsx:106; kanıt: shots/blogpost-d-body-1.png (başlıklar var, anchor yok)

**Sorun.** Blog gövdesindeki h2/h3'ler `id` taşımıyor; TOC, paylaşılabilir bölüm linki, klavyeyle 'bölüme git' ve `:target` vurgusu imkânsız. 10 başlıklı uzun yazıda SR kullanıcısı başlıklarla gezebiliyor ama URL ile dönemiyor.

**Neden önemli.** 2.4.5 Multiple Ways / 2.4.6 destekleyici; Awwwards editorial sayfalarında başlık anchor'ı + yan TOC standart craft.

**Ne yapılmalı.** Markdown.jsx'te `const slug = s => s.toLowerCase().replace(/[^a-z0-9ğüşöçı]+/gi,'-').replace(/(^-|-$)/g,'')`; h2/h3'e `id={slug(text)} className="… scroll-mt-[90px] target:text-white"` ve başlığa `<a href={`#${id}`} className="ml-[8px] opacity-0 focus-visible:opacity-100 hover:opacity-100 font-mono text-[12px]" aria-label={t('linkToSection')}>#</a>`. Aynı slug'lardan blog/[slug]/page.jsx'te bir `<nav aria-label="On this page">` üretin (SR ve klavye için ikinci gezinme yolu).

#### `gap-keyboard-focus-a11y-21` — Form alanlarında outline-none: tek göstergesi 1px kenarlık; seçili tip kartı ile odak halkası aynı görünüyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/IntakeForm.jsx:12 (fieldInput: outline-none … focus:border-white), :128 (tip kartı seçili: border-white; odak: global beyaz halka); kanıt: gaps/kb-intake-input-focus.png, shots/kb-intake-type-focus.png

**Sorun.** `outline-none` global `:focus-visible` kuralını eziyor; input/textarea/select'te odak yalnız 1px kenarlığın #393939 → #fff olmasıyla belli (kb-intake-input-focus.png). Görünür ama ince; 2.4.13 Focus Appearance'ın 2px çevre alanı şartını karşılamıyor. Tip kartlarında seçili durum = beyaz 1px kenarlık, odak = 4px dışarıda beyaz 2px halka; seçili+odaklı kartta iç içe iki beyaz dikdörtgen, seçili-olmayan odaklı kartla seçili-odaksız kart birbirine benziyor (kb-intake-type-focus.png).

**Neden önemli.** 2.4.7/2.4.13 ve durum ayrımı (1.4.1). Form, sitenin dönüşüm noktası; odak/seçim karışıklığı doğrudan hata üretir.

**Ne yapılmalı.** fieldInput → `outline-none focus-visible:border-white focus-visible:[box-shadow:0_0_0_1px_#fff]` (toplam 2px beyaz çevre, hairline diliyle uyumlu) ve `aria-[invalid=true]:border-[#d88] aria-[invalid=true]:focus-visible:[box-shadow:0_0_0_1px_#d88]`. Tip kartı: seçili durumu kenarlık yerine sol üstte dolu beyaz kare/index inversiyonu + Check ile verin (`aria-pressed:true` → `before:` köşe işareti), odak için `focus-visible:outline-none focus-visible:[box-shadow:inset_0_0_0_2px_#fff]` içe halka; böylece iki durum farklı geometride.

#### `gap-keyboard-focus-a11y-22` — Dekoratif inline SVG'ler ve ikon kutuları isimsiz; hero/bölüm video'ları aria-hidden ama IntakeForm video'su sarmalayıcıya bağımlı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/PoweredBy.jsx:15, StoreButtons.jsx:14 (aria-hidden var — iyi); IntakeForm.jsx:92-97 (video kendisi aria-hidden değil, sarmalayıcı div aria-hidden — çalışıyor ama kırılgan); page.jsx:39 (grid <i> aria-hidden iyi), :38,186 (gradient div'ler aria-hidden iyi)

**Sorun.** Mevcut durum büyük ölçüde doğru: tüm dekoratif video/gradient/marquee katmanları aria-hidden. Tek kırılgan yer IntakeForm'daki video: aria-hidden sarmalayıcıda, video `autoPlay` ve `playsInline` ile tek başına taşınırsa SR'a sızar. Ayrıca `ReadProgress` aria-hidden (doğru) ama okuma ilerlemesi SR'a hiç verilmiyor.

**Neden önemli.** Düşük risk; sağlamlaştırma. 1.1.1 / 4.1.2.

**Ne yapılmalı.** IntakeForm.jsx:93 video'ya doğrudan `aria-hidden="true"` ekleyin (sarmalayıcı kalsın). ReadProgress için isteğe bağlı: `role="progressbar" aria-label={t('readingProgress')} aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}` — aria-hidden kaldırılır; 'canlı' duyuru yapmaz, sadece sorgulanabilir.

#### `gap-keyboard-focus-a11y-missed-3` — Tüm listeler Safari/VoiceOver'da liste semantiğini kaybediyor (Tailwind preflight `list-style:none`, hiçbir yerde role="list" yok)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** node_modules/tailwindcss/lib/css/preflight.css:308 (ol, ul { list-style:none }); src/app/[locale]/services/page.jsx:162 (deliverables ul), :175 (stack ul), :209 (process <ol>); src/app/[locale]/case-studies/[slug]/page.jsx:139 (gallery ul); src/components/PoweredBy.jsx:10; src/components/Markdown.jsx:47 (`list-none`)

**Sorun.** Ölçüm: /services'te 10 ul + 1 ol, blog yazısında 7 ul, case-study'de 1 ul, home'da 1 ul — hepsinde computed `list-style-type: none`, hiçbirinde `role` yok. WebKit `list-style:none` olan listeleri erişilebilirlik ağacından liste olarak çıkarır; VoiceOver kullanıcısı 'list, 4 items' / madde gezinmesini kaybeder — özellikle 'HOW WE OPERATE' dört adımlık `<ol>` ve her hizmetin CORE DELIVERABLES listesi düz paragraf gibi okunur.

**Neden önemli.** WCAG 1.3.1 Info and Relationships; iOS/macOS VoiceOver kullanıcıları için yapı kayboluyor. Bilinen ve tek satırda düzelen bir sorun.

**Ne yapılmalı.** Her `<ul>`/`<ol>`'e `role="list"` ekleyin (listitem'lara gerek yok): services/page.jsx:162,175,209, case-studies/[slug]/page.jsx:139, PoweredBy.jsx:10, Markdown.jsx:47. Lint: `rg -n '<(ul|ol)\b' src --glob '!components/ui/**' | rg -v 'role="list"'` boş dönmeli.

#### `gap-keyboard-focus-a11y-missed-4` — Klavye odağı henüz reveal olmamış (opacity:0) elemana iniyor; halka ~300ms boş kutuyu çevreliyor, içerik altından kayarak beliriyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/globals.css:71-79 (`.reveal-ready [data-reveal="fade"]:not(.is-revealed){opacity:0;transform:translateY(14px)}` + .6s geçiş); src/components/ScrollReveal.jsx:18-31 (yalnız IntersectionObserver ile açılıyor); kanıt: shots/skeptic/cs-row2-focus-100ms.png, home-card-focus-100ms.png

**Sorun.** Taze sayfada Tab ile proje kartına/case-studies satırına gelince `focus()` elemanı görünür alana kaydırıyor, IO bir sonraki karede `is-revealed` ekliyor ve 0.6s fade başlıyor. Ölçüm: home kartı odakta opacity 0 → 0.52 (100ms) → 1 (300ms), top 211→197px (14px yükselme); case-studies satırı 0 → 0.17 (100ms) → 0.99 (300ms). Klavye kullanıcısı beyaz halkanın içinde boş bir alan görüyor, sonra içerik halkanın içine kayıyor; `--reveal-delay` olan kartlarda süre 90ms daha uzuyor.

**Neden önemli.** Craft: odak halkası ile içerik senkron değil; 2.4.7'nin ruhu (odaklanan şey o anda görünür olmalı). Küçük ama jürinin Tab'la gezerken ilk gördüğü şey.

**Ne yapılmalı.** globals.css'e: `.reveal-ready [data-reveal]:focus-visible, .reveal-ready [data-reveal]:focus-within { opacity:1; transform:none; transition:none }`; ek olarak ScrollReveal.jsx'te `document.addEventListener('focusin', e => { const el = e.target.closest('[data-reveal]'); if (el) { el.classList.add('is-revealed'); observer.unobserve(el); } })` ile odaklanan eleman anında açılsın (passive, pathname değişiminde kaldırılır).

#### `gap-keyboard-focus-a11y-missed-5` — Intake adım 2'de PROJECT NAME alanında Enter sessizce yutuluyor (implicit submission yanlış adımı doğruluyor)

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/IntakeForm.jsx:55-57 (`submit` → `validate(2)`), :122 (`<form onSubmit={submit}>`), :142 (tek metin input'u), :189 (CONTINUE `type="button"`)

**Sorun.** Adım 2'de (PROJECT CONTEXT) formda tek bir metin input'u ve submit butonu olmadığı için Enter implicit submission tetikliyor → `submit` çalışıyor → `validate(2)` ekranda olmayan name/email alanlarını kontrol edip hata nesnesini onlarla değiştiriyor → görünür hiçbir şey olmuyor. Ölçüm: #project_name içinde Enter → adım başlığı '02 / 03' kalıyor, alert yok, odak alanda; üstelik o anda görünen 'Enter a project name.' hatası sessizce siliniyor (setErrors tüm nesneyi değiştiriyor). Klavye kullanıcısı Enter'ın 'devam et' anlamına gelmesini bekler.

**Neden önemli.** 3.2.2 On Input öngörülebilirlik + klavye verimliliği; formun ortasında 'ölü tuş'. Awwwards Usability'de form akışı klavyeyle test edilir.

**Ne yapılmalı.** `submit` içinde `if (step < 2) { nextStep(); return; }` (event.preventDefault sonrası) — Enter her adımda CONTINUE ile aynı işi yapar; ya da CONTINUE'yu `type="submit"` yapıp `onSubmit`'te adıma göre dallanın. `setErrors(next)` yerine yalnız o adımın anahtarlarını güncelleyin ki görünür hatalar sessizce silinmesin.

#### `gap-keyboard-focus-a11y-missed-6` — Case-studies 'index' tablosu semantiksiz: başlık satırı span'lerden, satırlar yalın Link; liste/tablo ilişkisi yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/case-studies/page.jsx:41 (NO. / PROJECT / SCOPE / VIEW başlık div'i), :42-48 (her satır bağımsız `<Link>`)

**Sorun.** Görsel olarak sütun başlıklı bir indeks ama DOM'da `role=list`/`table` yok: SR kullanıcısı 'link, link' duyar, 'list, 2 items' sayımı ve NO./SCOPE sütun ilişkisi yok; başlık satırı anlamsız dört kelime olarak okunuyor. Reviewer'ın 'ok tuşlarıyla gezinme' eklemesi `role="list"`'i varmış gibi referans veriyor — mevcut değil.

**Neden önemli.** 1.3.1 Info and Relationships; 'arşiv/indeks' metaforu SR tarafında yok.

**Ne yapılmalı.** Satırları `<ul role="list" aria-labelledby="cs-index">` + `<li>` içine alın (başlık h1'e `id="cs-index"`), satır Link'lerini finding 03'teki gibi `aria-labelledby` ile h2'ye bağlayın; sütun ilişkisi isteniyorsa gerçek `<table>` (`<th scope="col">` NO./PROJECT/SCOPE/VIEW, hücrede sadece h2 içinde Link + `::after{inset:0}` ile satır tıklanabilirliği). Başlık div'i tablo kullanılmıyorsa `aria-hidden="true"` olsun.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Markaya ait odak sistemi: 'focus = hover + imza işareti'

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight (underline-draw focus), Lusion (focus = hover + ring), Obys (inverted-block focus on rows); Sara Soueidan 'A guide to designing accessible, WCAG-conformant focus indicators'

globals.css'te bileşen sınıfı bazlı bir odak dili tanımlayın ve tüm Tailwind kullanımlarını buna bağlayın. Üç aile yeter: (a) `.link-mono` — hover/focus-visible'da soldan çizilen 1px alt çizgi (`background-size 0→100%`, 350ms `cubic-bezier(.22,1,.36,1)`), aktif sayfada çizgi sabit; (b) `.btn-solid` / `.btn-ghost` — beyaz butonda içe 2px siyah outline (`-outline-offset-[5px]`), ghost butonda hover'ın kendisi (dolgu+ters renk) + 1px dış halka; (c) `.row-link` — tam genişlik satır/kartlarda outline yok, hover durumu + `inset 3px 0 0 #fff` sol bar ve gerekirse 10px pl kayması. `:focus-visible` global kuralı sadece fallback. Her bileşende `transition` listesi açık yazılır (`transition-all` yasak) ki outline animasyona girmesin. Doğrulama: Playwright script'i her sayfada Tab durağının screenshot'ını alır ve `outline-style` dışında en az bir görsel farkın (bg/box-shadow/background-size) oluştuğunu assert eder.

### Radix Dialog tabanlı mobil menü: odak tuzağı + Escape + inert + stagger animasyonu tek pakette

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Hello Monday ve Resn mobil menüleri (Escape/trap doğru, stagger'lı giriş); Radix Dialog a11y notları

Zaten bağımlılıkta olan `@radix-ui/react-dialog` ile Header menüsünü modal yapın: `Dialog.Content` (fixed, top-[66px]) içinde `<nav aria-label>`; `onOpenAutoFocus` ile ilk linke odak, `onCloseAutoFocus` default (butona döner), Escape ve dış tıklama bedava, `react-remove-scroll` body'yi kilitler (elle `overflow:hidden` kalkar), `inert` otomatik. Satırlar `data-[state=open]:animate-[rise_.5s_cubic-bezier(.22,1,.36,1)_both]` + `[animation-delay:calc(var(--i)*60ms)]` ile stagger; `motion-reduce:animate-none`. Navigasyon sonrası `useEffect([pathname])` içinde `main.focus()`.

### Site geneli hareket anahtarı (MOTION ON/OFF) + prefers-reduced-motion ile senkron

- **Etki:** yüksek · **Efor:** orta · **Referans:** Lusion ('Reduce motion' toggle), Active Theory, Igloo Inc. (motion preference switch); Tatiana Mac 'prefers-reduced-motion' yazısı

Header'ın sağına ya da footer'a mono bir toggle: `<button aria-pressed={reduced}>MOTION {reduced?'OFF':'ON'}</button>`; durum `localStorage` + `html[data-motion="off"]`. CSS: `[data-motion=off] *, [data-motion=off] *::before, [data-motion=off] *::after { animation: none !important; transition-duration: .01ms !important }`, `[data-motion=off] [data-reveal]{opacity:1;transform:none}`, `[data-motion=off] video{display:none}`; JS: SmoothScroll'da `lenis.destroy()`, BackgroundVideo/HeroVideo pause. İlk değer `matchMedia('(prefers-reduced-motion: reduce)')`'dan gelir. Bu tek anahtar WCAG 2.2.2'yi, vestibüler kullanıcıları ve 'video+marquee+ping' yükünü aynı anda çözer; Awwwards jürisinin aradığı 'bilinçli hareket' sinyali.

### Rota geçişlerinde odak ve duyuru yönetimi

- **Etki:** orta · **Efor:** küçük · **Referans:** Marcy Sutton 'Accessible routing in SPAs', Next.js RouteAnnouncer davranışı

`src/components/RouteFocus.jsx` client bileşeni: `usePathname` değişince `document.getElementById('main')?.focus({preventScroll:true})` ve `document.querySelector('h1')` metnini `role="status"` sr-only alana yazın (Next'in route announcer'ı başlık okur ama odak taşımaz). NextTopLoader ile uyumlu; skip link hedefi aynı `#main`. Böylece klavye kullanıcısı her sayfada 7 Tab'lık header'ı tekrar geçmez, SR kullanıcısı yeni sayfanın adını duyar.

### Klavye ve erişilebilirlik regresyon kapısı (CI)

- **Etki:** orta · **Efor:** küçük · **Referans:** axe-core/playwright, Playwright `page.accessibility`/`ariaSnapshot`, GOV.UK design system a11y test pratiği

Mevcut probe script'ini (`scratchpad/a11y-probe.cjs`) `tests/a11y.spec.cjs` olarak projeye alın: (1) `@axe-core/playwright` ile her sayfada serious/critical ihlal = 0; (2) Tab-order snapshot'ı (`a11y.json` homeTabs formatı) — değişirse review; (3) 'hover ikizi' kontrolü: `rg -n 'group-hover:|hover:' src --glob '!components/ui/**' | rg -v 'focus-visible'` boş dönmeli; (4) mobil menü: aç → Tab×7 → activeElement menünün içinde kalmalı, Escape → kapanmalı; (5) intake: Continue sonrası `document.activeElement.tagName === 'H2'`, submit sonrası `role=status` dolu. Bu kapı olmadan finding'ler bir sonraki tasarım turunda geri gelir.

### Case-studies index'inde ok tuşlarıyla gezinme + odakta canlı önizleme

- **Etki:** orta · **Efor:** orta · **Referans:** Locomotive ve Basement Studio proje index'leri (klavye ile satır gezinme), WAI-ARIA APG 'Listbox/roving tabindex' kalıbı

Satır listesini `role="list"` olarak bırakıp küçük bir client sarmalayıcıyla ↑/↓ tuşlarını satır linkleri arasında dolaştırın (roving focus, `Home`/`End` dahil), Enter açar. Odaklanan satırda hover'daki önizleme görseli `group-focus-visible:opacity-100` ile belirsin ve bir `aria-live="polite"` sr-only alanı '01 of 02, Vocabulary, Mobile application' desin. Hover'daki padding/bg kayması odakta da aynı easing ile. Bu, 'arşiv' metaforunu klavyede de yaşatır — Awwwards Usability'de nadir görülen bir artı.

### Forced-colors ve yüksek kontrast teması olarak tasarlanmış 'HC' varyantı

- **Etki:** düşük · **Efor:** küçük · **Referans:** Microsoft Edge 'Styling for Windows high contrast with new standards for forced colors'; Adrian Roselli 'WHCM and System Colors'

`@media (forced-colors: active)` ve `@media (prefers-contrast: more)` bloklarını tasarım kararı olarak ele alın: hairline token'ları (`--line`) 0.4 alfaya, `--dim/--gray` daha açığa; videolar gizlenip poster yerine düz `--ink` zemin; aktif nav/adım `aria-current` ile alt çizgi; seçili kartlar `Highlight` outline. Figma'da aynı sayfaların HC versiyonu bir frame olarak dursun. Chrome DevTools 'Emulate CSS forced-colors' ile ekran görüntüleri CI'da saklansın (gaps/forced-colors-*.png gibi).
