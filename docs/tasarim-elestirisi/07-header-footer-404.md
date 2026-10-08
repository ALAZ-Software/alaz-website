# Global chrome: header, nav, footer, 404, legal/privacy

**Boyut puanı:** 3.5/10 (10 = Awwwards Site of the Day seviyesi)  
**Bulgu:** 26 (3 kritik · 11 önemli · 12 ince işçilik) · **Korunacaklar:** 9 · **Eklenecekler:** 7

← [Ana rapor ve özet](README.md) · [Kritik bulgular listesi](00-kritik-bulgular.md)

## Genel değerlendirme

Chrome katmanı (header, mobil menü, footer, 404, legal/privacy) teknik olarak temiz ve tutarlı ama baştan sona "varsayılan" seçimlerden oluşuyor: blur'lu sabit header + 12px mono uppercase nav + beyaz blok CTA + animasyonsuz düz liste menü + dev wordmark footer + legal template'inden türetilmiş 404. Hiçbir parça bir "an" yaratmıyor; Awwwards jürisinin header/menü/footer'da aradığı choreography (menünün açılışı, footer'ın bir varış noktası olması, 404'ün karakteri) yok. Üstüne craft hataları var: mobil menü açıkken Lenis scroll kilidini deliyor, Escape menüyü kapatmıyor, alt route'larda aktif nav state kayboluyor, mobil footer alt barı karışık sıralanıyor, 4 farklı ok/buton dili karışmış. En kritik marka sorunu ise footer'daki iki "ofis": ikisi de Regus sanal/serviced ofis merkezleri (1250 Broadway 36. kat ve Folkart Towers B Blok 31. kat) ve "EST. 2026" ile yan yana okununca şişirilmiş duruyor. Legal/privacy metinleri ise insan diliyle yazılmış, boilerplate olmayan ender iyi örnekler; onlara dokunulmamalı, sadece sayfa şablonu sakinleştirilmeli.

## Korunması gerekenler

- Gri kare nokta motifi (ALAZ<span>.</span>) gerçek bir marka cihazı: header, footer, display başlıklar ve 404'te tutarlı; Archivo 900'ün kare noktası ile doğal olarak oluşuyor. Korunmalı ve etkileşime çevrilmeli (menü düğmesi, hover state, 404 konsepti).
- Tipografi sistemi disiplinli: Archivo (display) + Inter (body) + JetBrains Mono (meta), renk yok, radius 0. Bu kısıt Awwwards için iyi bir zemin; sorun kısıtın kendisi değil, üstüne fikir konmaması.
- Legal ve Privacy metinleri insan diliyle, kısa ve spesifik yazılmış ("Please don't scrape it at scale", "We don't sell it or rent it out", KVKK/GDPR/US state laws ayrımı). Boilerplate değil; owner'ın "no bullshit" iddiasını gerçekten taşıyan tek chrome parçası. Metne dokunma, sadece şablonu sakinleştir.
- [...rest]/page.jsx catch-all ile 404'ün locale layout'u içinde render edilmesi ve robots noindex: teknik olarak doğru kurulmuş.
- Header grid'i (1fr auto 1fr) nav'ı gerçekten ortalıyor ve 1024px'de taşma yok (chrome/header-1024.png); route değişiminde menü otomatik kapanıyor; body scroll lock temizleniyor.
- prefers-reduced-motion hem Lenis'te hem reveal sisteminde ele alınmış; global :focus-visible beyaz outline tanımlı; ::selection ters çevrilmiş. A11y temeli var.
- Adresler <address> semantiği ile, StructuredData ile senkron tutulmuş; hreflang/canonical üretimi (seo.js) sağlam.
- Mobil menü satırlarının dokunma alanı büyük (py-24px, 25px extrabold) — tipografik ölçek doğru, sadece numaralar ve animasyon eksik.
- fit() sistemi (lib/fit.js): display kelimelerin kolona sığması için ölçülmüş advance width tablosu — nadir görülen bir craft yatırımı; 404 ve legal başlıklarında da işe yarıyor.

## Bulgular

Sıralama: önce kritik, sonra önemli, sonra ince işçilik. Her bulgu kod ve ekran görüntüsüne karşı ikinci bir ajan tarafından doğrulandı; "düzeltme notu" olanlarda doğrulayıcının eklediği nüans bulgunun altında yer alır.

### KRİTİK

#### `chrome-06` — Mobil menü: animasyonsuz düz liste, "01-05" index numaraları, alt yarısı boş

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:42-46 (`{open && <nav ...>}` koşullu mount; satır başına `0{i + 1}` mono index; ArrowUpRight lucide); nav-open-mobile.png (390px, son satırın altında 210px boşluk — ölçüldü), chrome/nav-open-tablet-900.png (900px'de ekranın %45'i boş)

**Sorun.** Menü `open && <nav>` ile anında mount ediliyor: ne açılış ne kapanış animasyonu var, ne satır stagger'ı. Her satırda "01, 02..." mono index (owner'ın slop listesindeki "index eyebrow" kalıbının birebiri), sağda lucide ok. 5 satır + dil satırı ekranın üst %55'ini dolduruyor; altı tamamen boş (390px'de 210px, 900px'de ~450px). Menüde e-posta, lokasyon, sosyal gibi hiçbir ek içerik yok.

**Neden önemli.** SOTD sitelerinde menü sitenin en koreografik anıdır (Locomotive, Obys, Unseen: clip-reveal ile gelen dev linkler, hover'da görsel önizleme, altta iletişim). Burası düz bir `<ul>`; numaralar da jenerik "brutalist" dili güçlendiriyor. Boş alt yarı tasarımın bitirilmediğini söylüyor.

**Ne yapılmalı.** 1) framer-motion AnimatePresence: overlay `fixed inset-0` (header'ın altına absolute değil), bg #0a0a0a, 500ms clip-path: inset(0 0 100% 0)→inset(0) veya y:-100%→0, ease [.22,1,.36,1]; kapanışta ters. 2) Linkler: Archivo 900, font-size clamp(44px, 11vw, 96px), leading .9, her biri overflow-hidden wrapper içinde y:110%→0, staggerChildren .06s, delayChildren .15s. Index numaralarını ve lucide okları kaldır; hover/active'de sadece gri "." kare motifi label'ın sonuna gelsin (marka motifi, slop değil). 3) Alt boşluğu doldur: hello@alaz.pro (mono 14px), lokasyon + yerel saat satırı, dil linki; hepsi 0.3s gecikmeli fade. 4) Header'daki CTA kaybolsun; menüde "Start a project" diğer linklerle aynı boyda ama beyaz-dolgu "." ile vurgulanmış son satır olsun.

> **Doğrulayıcı notu:** Doğrulandı: Header.jsx:42 `{open && <nav>}` — computed transition 'all 0s', animation none; 30ms probe'da (probe-mobile-nav-30ms.png) menü tam açık, yani anlık mount. Her satırda `0{i+1}` mono index (:43) ve lucide ok. 390×844 ölçümü: son satır 634px'te bitiyor, altında 210px boş (reviewer ile aynı). Düzeltme: '900px'de %45 boş' ifadesi viewport yüksekliğine bağlı — 900×800'de son satır 644px, boşluk ~%20; iPad dikey (~1180px yükseklik) gibi bir ekranda ~%45. Rakam değil, olgu doğru: menünün alt yarısında içerik yok. Fix (AnimatePresence + clip reveal, Archivo 900 büyük linkler, stagger, index/lucide kaldır, altta e-posta/lokasyon/dil) somut ve uygulanabilir; overlay'in `fixed inset-0` olması chrome-07 ve 'missed' listesindeki landscape sorununu da çözer. Ek: menü satırları şu an Inter 800 (`font-extrabold`), Archivo değil — fix'teki `font-display font-black` bunu da düzeltir.

#### `chrome-09` — Footer bir varış noktası değil: dev wordmark tekrarı, CTA yok, ana nav yok, sosyal yok, e-posta 13px

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:13-27 (wordmark clamp(90px,16vw,320px) aria-hidden; e-posta font-mono text-[13px] font-light; linkler sadece BLOG/LEGAL/PRIVACY); messages/en.json footer.talk = "HAVE A SYSTEM IN MIND?" (hiçbir yerde render edilmiyor — ölü key); src/lib/seo.js:17 SOCIAL_PROFILES = []; chrome/footer-desktop.png, home-desktop-fold.png (hero'da aynı dev ALAZ.)

**Sorun.** Footer'ın tek büyük elemanı yine "ALAZ." wordmark'ı — ana sayfada hero'daki ile birebir aynı Archivo 900 + gri kare tedavisi, yani ana sayfa aynı dev logoyla başlayıp bitiyor; header'da üçüncü kez. Sitenin en önemli iletişim öğesi hello@alaz.pro footer'da 13px mono light ile wordmark'ın altına sıkışmış. Footer'da CTA yok (JSON'da hazırlanmış "HAVE A SYSTEM IN MIND?" kullanılmamış), ana sayfalara link yok (Case studies/About/Services), sosyal/GitHub/LinkedIn yok, canlı hiçbir detay yok (yerel saat, müsaitlik). Mobilde wordmark 62px'e düşünce footer tamamen adres listesine dönüyor (chrome/footer-mobile.png).

**Neden önemli.** SOTD sitelerde footer son CTA'dır; kullanıcı scroll'un sonunda ya e-postaya tıklar ya menüye döner. Dev wordmark tekrarı "template footer" sinyali (ve ana sayfada 3× logo). Sosyal/Git yokluğu bir yazılım stüdyosu için güven kaybı.

**Ne yapılmalı.** Yapı (desktop): üst blok sol: "Have a system in mind?" Archivo 900 clamp(40px,6vw,96px) + altında hello@alaz.pro aynı display boyutta beyaz link, hover'da underline-draw + ok; sağ: 3 kolon mono 12px — Sitemap (Case studies, Services, About, Blog, Start a project), Contact (e-posta, lokasyon satırları), Elsewhere (GitHub, LinkedIn, X/Instagram — yoksa hesapları aç; SOCIAL_PROFILES'ı doldur). Alt bar: © 2026 ALAZ · Legal · Privacy · Back to top. Wordmark'ı tamamen kaldır ya da en alta, bottom-cropped (overflow-hidden ile alt %35'i kesik) ve viewport'a girince harf harf y:100%→0 stagger ile gelen bir imza olarak koy; ana sayfada hero zaten dev logo olduğu için footer'da tekrarlanmaması tercih edilir. `footer.talk` key'ini kullan ya da sil.

#### `chrome-10` — İki "ofis" adresi de Regus sanal/serviced ofis merkezleri; EST. 2026 ile birlikte inandırıcı değil

- **Önem:** KRİTİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json contact.offices ("1250 Broadway, 36th Floor" / "Folkart Towers, B Blok, Kat 31"); src/components/ContactInfo.jsx:7; src/components/StructuredData.jsx:29-33 (iki PostalAddress); messages/en.json legal.legal.sections[0] ("offices in the United States and Türkiye"); home.hero.toplineRight "SOFTWARE STUDIO / EST. 2026"; chrome/footer-desktop.png, about-desktop-full.png (ContactInfo large)

**Sorun.** Doğrulandı: 1250 Broadway 36th Floor, NY 10001 = Regus Manhattan merkezi (sanal ofis / posta adresi planı satılıyor: regus.com/en-us/.../1250-broadway-2197, davincivirtual.com facility-3598). Folkart Towers B Blok Kat 31, Adalet Mah. Manas Blv. No:39 = Regus İzmir Bayraklı merkezi (regus.com/en/tr/4852, liquidspace.com regus-izmir-bayrakli-folkart-towers). Yani footer'daki iki prestijli gökdelen adresi de kiralık posta adresi; bir Google aramasıyla ortaya çıkıyor. Buna "EST. 2026" (bu yıl kurulmuş), "small studio", telefon numarası yokluğu, ekip fotoğrafı yokluğu ve Legal'daki "offices in the United States and Türkiye" cümlesi ekleniyor. Schema.org Organization'da iki adres de resmi adres olarak deklare edilmiş.

**Neden önemli.** Awwwards tarafı değil, marka güveni tarafı: hedef müşteri (ABD'li founder / CTO) adresi aratır. "Sanal ofis + bu yıl kuruldu + iki kıta" kombinasyonu şişirme izlenimi verir; sitenin "NO BULLSHIT" iddiasıyla da çelişir. Jüri de bunu "fake agency" sinyali olarak okur (owner'ın listesindeki fake testimonial ile aynı kategori).

**Ne yapılmalı.** Dürüst ve daha şık olanı seç: footer'da adres yerine iki şehir + yerel saat ("İzmir 14:32 — New York 07:32", mono, canlı), tam posta adresi sadece Legal sayfasında ve tek (gerçek kayıtlı) adres olarak. Legal sections[0]'ı "based in İzmir, working with clients in the US and Europe" diye düzelt. StructuredData'da yalnızca gerçek kayıtlı adresi bırak; NY'ı `areaServed` olarak tut. EST. 2026'yı chrome'dan uzak tut; About'ta kurucuların önceki tecrübesiyle çerçevele ("Founded 2026 by X and Y after N years building ..."). Eğer NY'da gerçekten masa/ekip varsa bunu kanıtla (telefon, ekip fotoğrafı, harita) — aksi halde tek adres.

### ÖNEMLİ

#### `chrome-01` — Header: her zaman açık blur + %55 siyah bant, scroll davranışı yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:27 (className: fixed, bg-[rgba(10,10,10,.55)] backdrop-blur-[14px], border-b border-line); home-desktop-fold.png (hero üstündeki bant), chrome/header-scrolled-desktop.png (arkadaki eyebrow metinleri header'ın içinden hayalet gibi okunuyor)

**Sorun.** Header scrollY=0'da bile %55 siyah + 14px blur + alt çizgi ile render ediliyor. Hero'daki video ve grid çizgileri üstte 76px'lik bir "cam bant" altında kalıyor; sayfa hiç full-bleed başlamıyor. Scroll edildiğinde de header'ın hiçbir tepkisi yok (ne solid'e geçiş, ne gizlenme, ne küçülme). Ölçüm: computed bg rgba(10,10,10,.55), filter blur(14px) saturate(1.5), 76px.

**Neden önemli.** "Glassmorphism sticky header" Tailwind/AI-builder şablonlarının imzası; hiçbir fikir taşımıyor. SOTD sitelerinde header ya tamamen şeffaf başlar ve scroll'da "gelir", ya mix-blend-mode ile içeriğin üstünde yaşar, ya da aşağı scroll'da kaybolup yukarı scroll'da geri gelir. Buradaki hali siteye "template" hissi veriyor ve hero'yu zayıflatıyor.

**Ne yapılmalı.** 1) scrollY < 40 iken bg/border/blur tamamen kapalı (sadece beyaz yazı, hero'nun üstünde); 40px sonrası 350ms cubic-bezier(.22,1,.36,1) ile solid #0a0a0a'ya geç (blur'u tamamen kaldır; blur yerine düz solid daha disiplinli). 2) Lenis'in 'scroll' event'inden direction al: aşağı scroll'da header translateY(-100%), yukarı scroll'da geri gel (400ms). 3) Alternatif ve daha karakterli: header'a mix-blend-mode: difference + saf beyaz tipografi; site zaten siyah/beyaz olduğu için videoların üstünde de çalışır, hiç bg gerekmez. Bu durumda CTA'yı header'dan çıkarıp menüye taşı (beyaz blok difference ile bozulur).

> **Doğrulayıcı notu:** Ölçüm doğrulandı: header scrollY=0'da ve 900px scroll sonrası birebir aynı — bg rgba(10,10,10,.55), backdrop-filter blur(14px) saturate(1.5), 76px, transform none; Header.jsx:27'de scroll listener yok. Kendi çekimim (skeptic/header-scrolled-desktop.png) arkadaki marquee/eyebrow metinlerinin bandın içinden hayalet gibi okunduğunu gösteriyor. Düzeltme: severity critical değil major — blur'lu sticky header tek başına slop 'imzası' değil, varsayılan bir seçim; asıl sorun scroll'a hiç tepki vermemesi ve hero'nun hiçbir zaman full-bleed başlamaması. Önerilen fix (şeffaf başla → 40px sonrası solid; Lenis direction ile gizle/göster; alternatif mix-blend-mode: difference) uygulanabilir ve doğru. Ek: `backdrop-saturate-150` siyah/beyaz sitede hiçbir şey yapmıyor, blur'la birlikte silinmeli. Lenis instance'ı şu an SmoothScroll.jsx içinde kapalı; direction almak için bir ref/context'e çıkarılması gerekir (chrome-07 ile aynı refactor).

#### `chrome-02` — Nav tipografisi: 12px mono tracked uppercase, hover sadece renk

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:30-35 (font-mono text-[12px] tracking-[.075em] text-[#aaa] hover:text-white); messages/en.json nav.linkLabels ("CASE STUDIES", "ABOUT"...); chrome/header-nav-hover.png

**Sorun.** Nav linkleri JetBrains Mono 12px, .075em tracking, #aaa; hover'da yalnızca #aaa→#fff renk geçişi (200ms). Ne underline-draw, ne text roll, ne de aktif state için kalıcı işaret var. Site genelindeki "mono eyebrow" dili header'da da tekrar ediyor.

**Neden önemli.** "Koyu arkaplan + tracked mono uppercase nav" 2024-26 AI-generated dark brutalist sitelerin bire bir varsayılanı; jüri ilk 2 saniyede bunu tanıyor. Hover'ın sadece renk olması craft eksikliği: menü etkileşimi sitenin en sık dokunulan parçası ve hiçbir hissi yok.

**Ne yapılmalı.** Nav'ı mono'dan çıkar: Inter 14-15px, tracking -0.01em, normal case ("Case studies", "About") veya Archivo 700 13px. Hover: a) underline-draw — ::after 1px, transform: scaleX(0)→1, transform-origin left, 300ms cubic-bezier(.22,1,.36,1); mouse çıkarken origin right'a geç ki çizgi aynı yönden gitsin; b) ya da text-roll — label'ı iki kopya halinde overflow-hidden span içine koy, hover'da translateY(-100%) 400ms. Aktif sayfa için çizgi kalıcı. Gap'i clamp(26px,3.2vw,52px) yerine sabit 36px yap; nav'ı true-center bırak (grid 1fr auto 1fr iyi).

> **Doğrulayıcı notu:** Kod ve ölçüm doğrulandı: Header.jsx:33 `font-mono text-[12px] tracking-[.075em] text-[#aaa] hover:text-white`; hover'da computed sadece color rgb(255,255,255), text-decoration none, ::after yok. Aktif state yalnızca aynı beyaz renk (hover ile ayırt edilemez). Severity'yi major'a çekiyorum: 'tracked mono uppercase nav' tek başına siteyi batırmıyor, site genelindeki mono-eyebrow dilinin header'daki uzantısı; asıl açık hover/aktif choreography'nin hiç olmaması. Fix (Inter/Archivo normal-case + underline-draw veya text-roll, aktif için kalıcı çizgi) somut ve doğru; uppercase etiketler JSON'da olduğu için chrome-21 ile birlikte yapılmalı. 'Gap'i sabit 36px yap' kısmı keyfi, clamp zaten 1024'te taşmıyor — opsiyonel.

#### `chrome-04` — Header CTA: beyaz blok + lucide ok + hover'da kalkma; mobilde iki kez tekrar

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:38 (bg-white, hover:bg-[#d5d5d5] hover:-translate-y-[2px], ArrowUpRight size 15) ve :44 (menüde 05 satırı); chrome/header-cta-hover.png, chrome/header-mobile.png, nav-open-mobile.png

**Sorun.** CTA beyaz dolgu + Inter 12px extrabold uppercase + lucide ArrowUpRight; hover'da gri olup 2px yukarı zıplıyor. 390px'de header'da ALAZ. + TR kutusu + START A PROJECT + hamburger sıkışık duruyor ve aynı CTA menü açılınca "05 START A PROJECT" olarak bir kez daha listeleniyor.

**Neden önemli.** "Beyaz blok + ↗" shadcn/AI-builder CTA'sının ta kendisi; translateY(-2px) lift Bootstrap dönemi hover'ı. Mobilde CTA'nın iki kez görünmesi hem gürültü hem düşünülmemişlik sinyali.

**Ne yapılmalı.** Desktop: dolguyu koru ama hover'ı değiştir: label text-roll (iki kopya, translateY(-100%) 400ms) + ok 4px sağ-yukarı kayar; ya da clip-path ile soldan dolan siyah bg + beyaz yazı. Lift'i kaldır. Mobil (≤760px): header'dan CTA'yı tamamen çıkar — header sadece wordmark + menü düğmesi olsun; CTA menünün hero'su olur (chrome-06). Tablet'te (760-1000) aynı kural.

#### `chrome-07` — Menü açıkken scroll kilidi Lenis tarafından deliniyor; Escape kapatmıyor; focus trap yok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:22-25 (document.body.style.overflow = 'hidden'); src/components/SmoothScroll.jsx (Lenis instance'a dışarıdan erişim yok, lenis.stop() çağrılmıyor); Playwright ölçümü: menü açıkken wheel(0,600) sonrası window.scrollY = 285; Escape sonrası menü hâlâ açık

**Sorun.** body overflow:hidden yalnızca kullanıcı scroll'unu engeller; Lenis wheel event'ini yakalayıp window.scrollTo ile programatik scroll yaptığı için sayfa menünün arkasında kaymaya devam ediyor (trackpad'li tablet / dar desktop pencere). iOS Safari'de body overflow:hidden zaten güvenilmez (bilinen bug). Escape tuşu menüyü kapatmıyor, focus menünün içine hapsedilmiyor, arka içerik inert değil.

**Neden önemli.** Awwwards jürisi menüyü açıp scroll'lar; arkadaki sayfanın kayması anında "kırık" hissi. A11y tarafı (Escape, focus trap) WCAG 2.1 dialog beklentisi.

**Ne yapılmalı.** @radix-ui/react-dialog zaten bağımlılıkta: menüyü Dialog.Root/Portal/Content ile kur → focus trap, Escape, aria-modal ve scroll lock (react-remove-scroll) bedava gelir; Content'e kendi framer-motion animasyonunu ver (forceMount + AnimatePresence). Ek olarak Lenis'i bir context/ref'e koy ve menü açılınca lenis.stop(), kapanınca lenis.start(). Overlay'e `overscroll-behavior: contain` + `touch-action: pan-y` ekle. Route değişiminde kapatma (satır 21) iyi, koru.

#### `chrome-08` — Hamburger: lucide Menu/X ikonları, geçişsiz swap

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:39 (`{open ? <X size={25} /> : <Menu size={25} />}`); chrome/header-mobile.png, nav-open-mobile.png

**Sorun.** Üç çizgili lucide Menu ikonu, açılınca anında lucide X'e dönüyor; morph yok.

**Neden önemli.** Lucide varsayılan ikonları owner'ın kaçınmak istediği slop sinyali; animasyonsuz swap da menü "an"ını öldürüyor.

**Ne yapılmalı.** İki seçenek: a) Metin düğme: mono 12px "MENU" ↔ "CLOSE" text-roll ile (400ms); Hello Monday / Obys tarzı ve ikon ihtiyacını sıfırlıyor. b) Özel 2 çizgili burger (2×18px, 1.5px kalın, 6px aralık): açılınca çizgiler 45°/-45° döner ve merkeze toplanır, 350ms cubic-bezier(.22,1,.36,1). Marka motifi ile birleştirmek için "ALAZ."ın gri karesini düğme yapmak daha güçlü (bkz. additions).

#### `chrome-13` — 404 sayfası legal şablonunun kopyası: karakter yok, link yok, sağ yarısı boş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/app/[locale]/not-found.jsx:5,10 (legal.notFound namespace, LegalContent type="not-found"); src/components/LegalContent.jsx:12-13,16,20 (eyebrow "ALAZ / INFORMATION" + "404", h1 187px, p "This route does not exist. Return to the beginning.", bordered "← BACK TO HOME"); 404-desktop-fold.png, 404-mobile-fold.png

**Sorun.** 404 = LegalContent'in dalı. Sol eyebrow "ALAZ / INFORMATION" (404'te anlamsız), sağda "LAST UPDATED" slotuna "404" yazılmış, dev "PAGE NOT FOUND." + tek cümle + çerçeveli mono buton. Desktop'ta başlık genişliğin 2/3'ünde, sağ %35 boş. Hangi URL'nin bulunamadığı gösterilmiyor, alternatif linkler (case studies, services, start a project) yok, hiçbir hareket/etkileşim yok. Çeviri anahtarları bile `legal.notFound` altında — 404'ün sonradan eklendiği kodun yapısından okunuyor.

**Neden önemli.** Awwwards jürisi 404'e bilerek gider; burada marka kendini gösterir (Lusion, Resn, Active Theory 404'leri küçük oyuncak alanlarıdır). "ALAZ / INFORMATION" eyebrow'u ise owner'ın slop listesindeki "her bölümde index eyebrow" kalıbı.

**Ne yapılmalı.** Ayrı bir NotFound bileşeni yaz (LegalContent'ten kopar, mesajları `notFound` kök namespace'ine taşı). Konsept, marka motifinden: "The period fell off." — "PAGE NOT FOUND" başlığında gri kare "." yerinde yok; kare viewport'un altına düşmüş halde duruyor (framer-motion drag + dragConstraints + spring {stiffness:300, damping:20}); kullanıcı sürükleyip bırakınca yere düşer. Altında mono 12px: istenen path (`headers()` ile x-invoke-path ya da client'ta usePathname) → "/this-does-not-exist — nothing lives here." Üç büyük link: Case studies / Services / Start a project (display 32-48px, hover underline-draw). Eyebrow'u kaldır ya da sadece "404" bırak. Başlık `fit()` ile genişliğe otursun; sağ boşluk kalmasın. noindex ve [...rest] catch-all yapısı doğru, koru.

> **Doğrulayıcı notu:** Doğrulandı: not-found.jsx:10 `<LegalContent type="not-found" />`; LegalContent.jsx:12 eyebrow 'ALAZ / INFORMATION' + sağda '404' (documentLabel slotu), :13 187px h1, :14 tek cümle, :20 çerçeveli '← BACK TO HOME'; mesajlar `legal.notFound` altında. 404-desktop-fold.png: başlık ~990px'e kadar, sağ ~%31 boş; hiçbir link/etkileşim yok. HTTP 404 + noindex doğru. Severity'yi major'a çekiyorum: jenerik bir 404 Awwwards iddiasını 'kırmıyor', kaçırılmış fırsat; critical olanlar menü/footer/adres/geçişler. Fix ('düşen nokta' konsepti, usePathname ile istenen path, üç büyük link) somut ve marka motifinden türetilmiş — iyi. Not: Next 15'te not-found.jsx server tarafında istenen path'i güvenilir alamaz; reviewer'ın da yazdığı gibi client'ta `usePathname()` kullanılmalı.

#### `chrome-14` — Legal/Privacy başlığı aşırı dramatik: 187px tek kelime + 130px boşluk, sağ yarısı boş

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/LegalContent.jsx:12-13 (eyebrow "ALAZ / INFORMATION"; h1 [--fit-size:clamp(80px,13vw,190px)] my-[130px] mb-[70px]); ölçüm: h1 187.2px, eyebrow→h1 ~130px; legal-desktop-full.png, privacy-desktop-full.png

**Sorun.** "LEGAL." ve "PRIVACY." sayfa boyu dev display başlık, üstünde 130px boşluk, altında 70px; içerik 780px'lik sol kolonda, sağ %45 tamamen boş. Eyebrow "ALAZ / INFORMATION" hiçbir şey söylemiyor; sağdaki "LAST UPDATED: OCTOBER 2026" hardcoded string.

**Neden önemli.** Legal sayfası okunmak için var; hero şablonunun aynen uygulanması "her sayfa aynı template" sinyali. Awwwards sitelerinde legal sayfalar bilinçli olarak sakindir (küçük başlık, iyi ölçü, TOC) — kontrast asıl sayfaları daha güçlü gösterir.

**Ne yapılmalı.** Başlığı 56-72px Archivo 900'e indir (fit gereksiz), üst boşluk 40px. Eyebrow'u "Legal notice" / "Privacy policy" + `<time dateTime="2026-10-08">Updated 8 Oct 2026</time>` yap (tarih tek bir sabitten gelsin, LAST_UPDATED). Sayfayı 2 kolona böl: sol sticky rail (top: 100px) 220px — bölüm başlıklarından TOC, aktif bölüm IntersectionObserver ile beyaz; sağ 640px içerik. Böylece boş sağ yarı sorunu da çözülür.

#### `chrome-16` — Buton/ok sistemi tutarsız: 3 buton stili, 4 farklı ok

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Header.jsx:38 (beyaz dolgu + lucide ArrowUpRight 15), :43-44 (menü satırı lucide ArrowUpRight 21), :45 ("↗" text karakteri + lucide ok aynı satırda); src/components/LegalContent.jsx:20 (çerçeveli mono buton, "←" text karakteri, en.json legal.backToHome); src/components/Footer.jsx:26 ("↑" text karakteri, en.json footer.backTop); 404-desktop-fold.png, nav-open-mobile.png, chrome/footer-desktop.png

**Sorun.** Chrome içinde: beyaz dolgulu Inter 12px extrabold CTA; çerçeveli mono 12px buton (TR, Back to home); mono text link. Oklar: lucide SVG (2.2 stroke), lucide (default stroke), JSON içine gömülü "←", "↑", "↗" Unicode karakterleri. Aynı menü satırında hem "↗" hem SVG ok var.

**Neden önemli.** Tek bir okun bile iki şekilde çizilmesi craft eksikliği; jüri detayda tutarlılık arar. JSON'a gömülü oklar ayrıca çeviri/erişilebilirlik problemi (screen reader "up arrow" okur).

**Ne yapılmalı.** `src/components/ui/Button.jsx` (shadcn Button'ı kullanma, kendi 3 varyantın): primary (beyaz dolgu), secondary (1px çerçeve), text (underline-draw). Tek ok: 14×14 özel SVG (Archivo'nun ağırlığına uygun 1.75px stroke, 45° diyagonal), `aria-hidden`; yön CSS rotate ile (↑ -45°, ← 180°). JSON'daki tüm ok karakterlerini sil. Text-roll hover'ı bütün varyantlara aynı easing ile ver.

#### `chrome-17` — Sayfa geçişi yerine parlayan beyaz progress bar (NextTopLoader)

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:54-66 (height 3, shadow "0 0 24px 4px #fff, 0 0 12px 2px #fff, 0 0 6px 1px #fff", crawl); src/app/globals.css:#nprogress .bar

**Sorun.** Her navigasyonda üstte YouTube tarzı, üç katmanlı beyaz glow'lu bir yükleme çubuğu; sitenin tek "geçiş" efekti bu. Sayfalar başka hiçbir geçiş olmadan değişiyor.

**Neden önemli.** nprogress çubuğu SaaS dashboard dili; SOTD sitelerinde navigasyon bir koreografidir (curtain/wipe, wordmark flash, crossfade). Glow ayrıca sitenin düz siyah/beyaz disipliniyle çelişen tek "efekt".

**Ne yapılmalı.** NextTopLoader'ı kaldır. `src/app/[locale]/template.jsx` ekle (App Router'da her navigasyonda remount olur): framer-motion ile giriş animasyonu — içerik opacity 0→1 + y 24→0, 600ms [.22,1,.36,1]; üstte siyah bir perde clip-path inset(0 0 0 0)→inset(0 0 100% 0) 500ms. Çıkış animasyonu istersen Link'leri saran küçük bir TransitionLink (router.push'u 400ms geciktirip perdeyi kapatır). Alternatif: Chrome/Safari'de View Transitions API (`document.startViewTransition`) + `::view-transition-old/new` ile 350ms crossfade, progressive enhancement olarak. Lenis'i route değişiminde `scrollTo(0, {immediate:true})` ile sıfırla.

#### `chrome-missed-1` — Yatay telefon / kısa viewport'ta mobil menünün alt satırları erişilemez

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:42 (nav: absolute top-full, min-h-[calc(100dvh-66px)], overflow yok) + :22-25 (body overflow hidden); skeptic/menu-landscape-844x390.png

**Sorun.** 844×390 (iPhone yatay) ölçümü: satırlar 210/299/388/477/566/644px'te bitiyor, viewport 390px — BLOG, START A PROJECT ve dil satırı ekranın dışında. Nav, fixed header'ın içinde absolute ve `overflow: visible`; body overflow hidden; nav'ın kendi scroll container'ı yok. Wheel/touch sayfayı arkada kaydırıyor (Lenis), fixed header'ın çocuğu olan menü yerinde kalıyor. Aynı durum 1000px altı genişlikte kısa masaüstü pencerelerinde de (örn. 900×600) oluşur.

**Neden önemli.** Menünün en önemli satırı (Start a project) yatay telefonda ulaşılamıyor; jüri telefonu çevirdiğinde menü kırık görünür. chrome-07'deki scroll-lock sorununun ikiz yüzü.

**Ne yapılmalı.** Overlay'i `fixed inset-0 pt-[66px] overflow-y-auto overscroll-contain` (Radix Dialog.Content) yap, header'ın içinden çıkar; `[@media(max-height:520px)]` için satır padding'ini 24px→12px ve font'u 25px→20px düşür; ya da satırları 2 kolona kır. chrome-06'daki yeniden yazımla birlikte yapılmalı.

#### `chrome-missed-2` — About sayfasında aynı iki adres footer'ın hemen üstünde ikinci kez basılıyor

- **Önem:** ÖNEMLİ · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/app/[locale]/about/page.jsx:85 (<ContactInfo large />) + src/components/Footer.jsx:19 (<ContactInfo />); skeptic/footer-desktop-about.png, about-desktop-full.png

**Sorun.** Ölçüm: About'ta adres blokları y≈3756'da (contact bölümü), footer'daki aynı iki adres y≈4108/4210'da — ~350px arayla aynı mono tipografide 'USA / NEW YORK 1250 Broadway…' ve 'TÜRKİYE / İZMİR Folkart Towers…' iki kez, tek ekranda. E-posta da iki kez (26px ve 13px).

**Neden önemli.** Aynı viewport'ta birebir tekrar düşünülmemişlik sinyali; chrome-10'daki adres sorununu iki kat görünür yapıyor. Jüri About'u mutlaka açar.

**Ne yapılmalı.** chrome-10 uygulanırsa (footer'da sadece şehir + yerel saat) sorun kendiliğinden çözülür. Uygulanmazsa: Footer'a `hideOffices` prop'u ekleyip About'ta gizle, ya da About'taki contact bölümünü kaldırıp footer'ı About'un sonunda 'large' varyantla render et. Her durumda e-posta tek yerde ve büyük olmalı.

### İNCE İŞÇİLİK

#### `chrome-03` — Alt route'larda aktif nav state yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:32 (`pathname === link.href`); chrome/header-nested-route.png (/case-studies/english-vocabulary'de 4 link de rgb(170,170,170))

**Sorun.** isActive tam eşleşme ile hesaplanıyor; /case-studies/english-vocabulary, /blog/cost-of-a-slow-website gibi tüm detay sayfalarında header'da hiçbir link aktif değil. Ayrıca `!link.href.includes('#')` koşulu ölü kod (NAV_HREFS'te hash yok).

**Neden önemli.** Kullanıcı sitenin en derin sayfalarında (case study, blog yazısı) "neredeyim" bilgisini kaybediyor. Küçük ama bir jürinin ilk tıkladığı yerde (work → case study) görünen bir craft hatası.

**Ne yapılmalı.** `const isActive = pathname === link.href || pathname.startsWith(link.href + '/')`. `.includes('#')` koşulunu sil. Aktif linke chrome-02'deki kalıcı underline'ı ver (sadece beyaz renk yetmiyor; hover ile aynı görünüyor).

> **Doğrulayıcı notu:** Doğrulandı: /case-studies/english-vocabulary'de 4 link de rgb(170,170,170), /case-studies'de ilk link beyaz; Header.jsx:32 `pathname === link.href`; NAV_HREFS'te '#' yok, `.includes('#')` ölü kod. Eksik: aktif linkte `aria-current="page"` da yok — fix'e eklenmeli: `aria-current={isActive ? 'page' : undefined}`. Severity minor: aktif state zaten yalnızca #aaa→#fff renk farkı olduğu için (hover ile aynı) kayıp neredeyse görünmüyor; chrome-02'deki kalıcı underline gelince bu tek satırlık `startsWith(link.href + '/')` düzeltmesi anlam kazanıyor.

#### `chrome-05` — "TR" kutulu dil değiştirici ve mobil menüdeki "↗ TR / TÜRKÇE" satırı

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:10 (NATIVE_LANGUAGE_NAMES = { en: 'İNGİLİZCE', tr: 'TÜRKÇE' }), :37 (border border-line px-[11px] py-[9px]), :45 (mobil satır, index yerine "↗" karakteri + sağda ayrıca lucide ArrowUpRight); chrome/header-lang-hover.png, nav-open-mobile.png

**Sorun.** Desktop'ta 12px mono "TR" ince çerçeveli kutu; bir toggle gibi görünüyor ama sadece link. Mobil menüde satır "↗ TR / TÜRKÇE" + sağda ikinci bir ok; index kolonuna sayı yerine "↗" konmuş (tutarsız). Ayrıca sabit NATIVE_LANGUAGE_NAMES.en = 'İNGİLİZCE' — bu Türkçe kelime; hedef dilin kendi adı olmalı ('ENGLISH'). TR sayfasında EN'e geçiş satırı yanlış dilde yazıyor.

**Neden önemli.** Dil değiştirici küçük bir detay ama chrome'da sürekli göz önünde; kutulu-mono hali "settings pill" gibi duruyor. Çift ok ve yanlış dil adı craft açığı.

**Ne yapılmalı.** Desktop: kutuyu kaldır, nav ile aynı tipografide "TR" text link (hover underline-draw) ya da "EN / TR" (aktif beyaz, diğeri #777). Mobil menü: en altta küçük bir "Türkçe →" satırı, index ve çift ok olmadan. Sabiti düzelt: { en: 'ENGLISH', tr: 'TÜRKÇE' } ve adını LANGUAGE_NAMES yap. hreflang zaten doğru (as-needed prefix), dokunma.

> **Doğrulayıcı notu:** Kod doğrulandı: Header.jsx:10 `NATIVE_LANGUAGE_NAMES = { en: 'İNGİLİZCE', tr: 'TÜRKÇE' }`, :37 çerçeveli mono 'TR' kutusu, :45 mobil satırda index yerine '↗' karakteri + sağda ikinci lucide ok (nav-open-mobile.png'de 'TR / TÜRKÇE' satırında iki ok görünüyor). Düzeltme: İNGİLİZCE hatası yalnızca TR sayfasında ('EN / İNGİLİZCE') görünür; EN tarafında satır doğru ('TR / TÜRKÇE'). Owner TR'yi kapsam dışı tuttuğu için bu parça düşük öncelikli ama sabit adı 'NATIVE' iken değerin endonym olmaması gerçek bir hata, 'ENGLISH' olmalı. Severity minor: üç küçük craft hatası, hiçbiri tek başına 'bar altı' değil. Fix (kutusuz text link, mobil menüde altta tek 'Türkçe →' satırı) uygun.

#### `chrome-11` — Mobil footer alt barı karışık sıralanıyor; copyright boilerplate

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:21-27 (tablet:flex-wrap, linkler tablet:order-3 tablet:w-full, back-to-top mobile:ml-auto); messages/en.json footer.copyright ("ALL RIGHTS RESERVED."); chrome/footer-mobile.png

**Sorun.** 390px'de sıra: iki satıra kırılan copyright → sağa yaslı "BACK TO TOP ↑" → en altta sola yaslı BLOG LEGAL PRIVACY. Üç farklı hizalama, üç satır; göz bir düzen bulamıyor. "ALL RIGHTS RESERVED" 2000'ler boilerplate'i.

**Neden önemli.** Footer'ın son satırı sitenin son izlenimi; mobilde dağınık bitiyor. Küçük ama ucuz düzeltilir.

**Ne yapılmalı.** Mobil düzen: satır 1 linkler (sola, gap 20px), satır 2 "© 2026 ALAZ" sol + "Back to top" sağ (tek satır, justify-between). Copyright'ı "© 2026 ALAZ" yap (hak saklı cümlesini sil). Back-to-top'u mono text yerine wordmark/kare motifi tıklaması yap ya da ok ikonu ile tutarlı sisteme bağla (chrome-16).

#### `chrome-12` — Footer arkaplanı #0d0d0d: body'den fark edilmeyen bir ton

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/Footer.jsx:13 (bg-[#0d0d0d] vs body --ink #0a0a0a); chrome/footer-desktop.png

**Sorun.** Footer 3 birim daha açık siyah; hiçbir ekranda ayrışmıyor, ayrım işini yalnızca border-t yapıyor. Ne tam aynı ne farklı.

**Neden önemli.** Yarım kalmış karar. Footer'ın "farklı bir yer" hissi vermesi gerekiyorsa gerçekten farklı olmalı.

**Ne yapılmalı.** İki yol: a) tonu kaldır, #0a0a0a bırak, border yeter; b) daha güçlüsü: footer'ı tersine çevir — beyaz #f2f2f0 zemin, siyah tipografi, gri kare motifi #858585 kalır. Tüm site siyah olduğu için beyaz footer güçlü bir "varış" hissi verir ve siyah/beyaz marka diline tam oturur. (b) seçilirse selection rengini ve focus outline'ı footer içinde tersle.

#### `chrome-15` — Legal gövde ölçüsü ~105 karakter/satır; anchor/TOC yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** src/components/LegalContent.jsx:14-18 (max-w-[780px], text-[15px] leading-[1.8], h2 25px); ölçüm: p width 780px, 15px/27px; legal-desktop-full.png

**Sorun.** 780px @ 15px Inter ≈ 100-110 karakter/satır (ideal 60-75). Bölümlerin id'si yok, link verilemiyor; `section` key'i heading string'i.

**Neden önemli.** Okunabilirlik + craft. Legal sayfada tek iş okutmak; uzun satırlar göz kaybettirir.

**Ne yapılmalı.** max-w 620-640px, 16px/1.7 (veya 17px/1.65). h2'lere `id={slugify(heading)}` ekle, TOC'tan linkle (Lenis anchors offset -78 zaten var). h2 22px, mt 48px; ilk h2 mt 0. `text-mute` (#9fa3a9) kontrastı 7:1 — koru.

#### `chrome-18` — Skip link yok, main'de id yok

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulandı
- **Yer:** src/app/[locale]/layout.jsx:68 (<body id="top"> ilk çocuğu NextTopLoader); src/components/LegalContent.jsx:11 (<main> id'siz); grep: "skip" hiç geçmiyor

**Sorun.** Klavye kullanıcısı her sayfada header'daki 6 odaklanabilir elemandan geçmek zorunda. `:focus-visible` stili güzel tanımlanmış ama skip link yok.

**Neden önemli.** Awwwards accessibility puanı + temel craft. 5 satır.

**Ne yapılmalı.** body'nin ilk çocuğu: `<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 font-mono text-[12px]">Skip to content</a>`; her `<main>`'e `id="main" tabIndex={-1}`. Lenis anchors offset'i skip link için de çalışır.

#### `chrome-19` — Header wordmark: düz metin, hiç tepki vermiyor; ana sayfada 3× aynı logo

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı (düzeltme notuyla)
- **Yer:** src/components/Header.jsx:29 (font-display text-balance text-[26px] font-black ... ALAZ<span>.</span>); home-desktop-fold.png (hero dev ALAZ.), chrome/footer-desktop.png (footer dev ALAZ.); git log e1264a7 "Add ALAZ. wordmark as SVG" — SVG var ama kullanılmıyor

**Sorun.** Wordmark 26px Archivo text; hover yok, scroll'da değişmiyor. `text-balance` tek kelimede anlamsız. Ana sayfada aynı "ALAZ." header + hero + footer'da üç kez, hero ve footer birebir aynı boyut/tedavi.

**Neden önemli.** Logo header'ın tek marka taşıyıcısı; sabit duran bir metin olması kaçan bir fırsat. Üç tekrar, markanın tek fikrinin "büyük logo" olduğu izlenimini veriyor.

**Ne yapılmalı.** Hero'nun altına scroll edilince header wordmark'ı "ALAZ."dan "A."ya daralsın (harfler width 0'a clip, 400ms) ve hero'dan çıkarken dev logonun küçülüp header'a oturduğu hissi oluşsun (opsiyonel: framer-motion layoutId ile gerçek shared-element). Hover'da gri kare beyaza dönsün. `text-balance`'ı kaldır. Footer tekrarı için chrome-09.

> **Doğrulayıcı notu:** Header.jsx:29 doğrulandı: 26px Archivo text, hover yok, scroll tepkisi yok, tek kelimede `text-balance` no-op. Ana sayfada 'ALAZ.' üç kez (header :29, page.jsx:46 hero h1, Footer.jsx:16) — hero ve footer sınıf listesi birebir aynı. Düzeltme: e1264a7 commit'i SVG'leri `brand/logo/` altına ekledi (alaz-logo-beyaz.svg vb., Archivo Black ile), `public/` altında değil ve hiçbir yerde import edilmiyor — 'SVG var ama kullanılmıyor' doğru, yol düzeltildi. Fix (scroll'da 'ALAZ.'→'A.' daralma, hover'da kare beyaza, text-balance sil) uygulanabilir; shared-element (layoutId) opsiyonel ve hero'dan header'a geçiş için iyi fikir.

#### `chrome-20` — Legal sayfalarında "← BACK TO HOME" butonu gereksiz

- **Önem:** İNCE İŞÇİLİK · **Tür:** Kaldır · **Durum:** Doğrulandı
- **Yer:** src/components/LegalContent.jsx:20; legal-desktop-full.png (buton hemen footer'ın üstünde)

**Sorun.** Legal/Privacy'de içeriğin altında çerçeveli "BACK TO HOME" butonu; 90px altında zaten footer ve header nav var. 404'te mantıklı, legal'de gürültü.

**Neden önemli.** Her sayfaya aynı şablon öğesinin yapıştırılması; sadeleştirme fırsatı.

**Ne yapılmalı.** Legal/Privacy'de kaldır. İçeriğin sonunda "Questions? hello@alaz.pro" zaten var. 404'te chrome-13'teki üç büyük linkle değiştir.

#### `chrome-21` — Uppercase ve ok karakterleri çeviri dosyasına gömülü

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulandı
- **Yer:** messages/en.json nav.linkLabels ("CASE STUDIES"), footer.linkLabels, footer.backTop ("BACK TO TOP ↑"), legal.backToHome ("← BACK TO HOME"), legal.sectionTopLeft; src/components/Header.jsx:16 (t.raw('linkLabels'))

**Sorun.** Tüm nav/footer etiketleri JSON'da büyük harfle yazılmış, oklar metnin içinde. Büyük/küçük harf kararı tasarım kararıdır ve CSS'te olmalı; bazı screen reader'lar ALL CAPS'i kısaltma gibi harf harf okuyabiliyor. chrome-02/16'daki tipografi değişiklikleri bu yüzden copy düzenlemesi gerektiriyor.

**Neden önemli.** Craft/sürdürülebilirlik: tasarımı değiştirmek için çeviri dosyasını düzenlemek zorunda kalmak yanlış katmanlama.

**Ne yapılmalı.** JSON'da normal case ("Case studies", "Back to top"), gerekirse CSS `uppercase`. Okları bileşende SVG olarak ekle. `linkLabels` dizisini href'lerle eşleşen obje dizisine çevir ({ href, label }) ki sıra bağımlılığı (NAV_HREFS index'i) kalksın.

#### `chrome-missed-3` — Menü açıkken tablet→desktop genişliğine geçince `open` state'i takılı kalıyor

- **Önem:** İNCE İŞÇİLİK · **Tür:** Ekle · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:19-25, :27 (open ? 'bg-[#0a0a0a]' …), :39 (button `tablet:block`, desktop'ta hidden); skeptic/resize-1200-menu-stuck.png

**Sorun.** 900px'de menü açıkken viewport 1200px'e geçince ölçüm: aria-expanded hâlâ 'true', body.style.overflow 'hidden', mobil nav display none, hamburger display none → menüyü kapatacak düğme yok, header solid siyahta kalıyor, body scroll kilidi (Lenis dışı: klavye/scrollbar) açık kalıyor; geri 1000px altına inince menü hâlâ açık. iPad'i dikeyden yataya çevirmek (820→1180px) bu durumu tetikler.

**Neden önemli.** Küçük ama gerçek state sızıntısı; jüri iPad'de deneyen biri header'ın neden solid kaldığını anlayamaz. Radix Dialog'a geçince de `open` kontrolü sizde olduğu için ayrıca ele alınmalı.

**Ne yapılmalı.** `useEffect(() => { const mq = matchMedia('(min-width: 1001px)'); const close = e => e.matches && setOpen(false); mq.addEventListener('change', close); return () => mq.removeEventListener('change', close); }, [])`. Tailwind `tablet` breakpoint'i max 1000px olduğu için eşik 1001px.

#### `chrome-missed-4` — Mobil menü ve CTA display boyutunda Inter 800, site display dili Archivo 900

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Header.jsx:43-45 (`text-[25px] font-extrabold tracking-[-.04em]`, font-display yok); ölçüm: menü satırı font-family Inter, weight 800; nav-open-mobile.png

**Sorun.** Header wordmark, footer wordmark, hero ve tüm büyük başlıklar Archivo 900 iken menünün 25px büyük etiketleri Inter 800 ile set edilmiş; iki ağır grotesk yan yana (Inter'in yuvarlak 'C/S'i, Archivo'nun dar 'C/S'i) aynı ekranda. Header CTA da Inter 800 12px.

**Neden önemli.** Tipografi sisteminin tek güçlü yanı 'Archivo display + Inter body + Mono meta' disiplini; chrome'da bu disiplinin kırılması tüm siteyi 'template' gösteriyor. Jüri ağırlık/aile tutarlılığını ilk bakışta okur.

**Ne yapılmalı.** Menü satırlarına `font-display font-black` (Archivo 900), tracking -.03em; chrome-06'daki clamp(44px,11vw,96px) ölçeğiyle. CTA'lar için chrome-16'daki Button bileşeninde label fontunu tek yerden `font-display font-bold` ya da bilinçli olarak mono yap — ama tek karar.

#### `chrome-missed-5` — Footer ve About e-postasında yüklenmemiş `font-light` + ters hover

- **Önem:** İNCE İŞÇİLİK · **Tür:** Değiştir · **Durum:** Doğrulayıcı ajanın eklediği bulgu
- **Yer:** src/components/Footer.jsx:17 (`font-mono text-[13px] font-light … hover:text-mute`), src/app/[locale]/about/page.jsx:83 (aynı sınıflar, clamp(18px,2vw,26px)); src/app/[locale]/layout.jsx:18 (JetBrains_Mono weight ['400','500'])

**Sorun.** Computed font-weight 300 ama JetBrains Mono yalnızca 400/500 yüklü; tarayıcı 400'e düşüyor — sınıf ölü, tasarımdaki 'ince mono' niyeti hiç render olmuyor. Ayrıca `hover:text-mute` sitenin tek iletişim linkini hover'da beyazdan griye düşürüyor: etkileşim link'i zayıflatıyor.

**Neden önemli.** Craft: yüklenmeyen ağırlık istemek ve ana CTA'da ters hover, detaya bakan bir jürinin fark edeceği türden; e-posta footer'ın en önemli elemanı olmalı (chrome-09).

**Ne yapılmalı.** `font-light`'ı kaldır (ya da gerçekten isteniyorsa weight listesine '300' ekle — ama mono 300 koyu zeminde zayıf okunur, önerilmez). Hover'ı ekleyici yap: underline-draw (::after scaleX 0→1, 300ms [.22,1,.36,1]) + ok; renk değişimi varsa beyazda kalsın.

## Eklenmesi önerilenler (Awwwards seviyesi için)

### Menüyü bir "an" yap: desktop'ta da tam ekran overlay

- **Etki:** yüksek · **Efor:** büyük · **Referans:** Locomotive (locomotive.ca menü), Obys Agency, Unseen Studio, Hello Monday

Desktop nav'ı 4 link olarak tutmak yerine (ya da ek olarak) "MENU" düğmesiyle açılan tam ekran overlay: sol yarıda Archivo 900 clamp(56px,8vw,140px) linkler, stagger 60ms, y:110%→0 clip reveal; sağ yarıda hover edilen linke göre değişen sessiz video/poster (Case studies → mevcut hero videolarından biri, 500ms crossfade); altta hello@alaz.pro + İzmir/NY yerel saat + dil. Radix Dialog + framer-motion AnimatePresence; Lenis stop/start. Kapanışta aynı koreografi tersine. Owner'ın slop listesindeki "index numarası" ve lucide okları kullanma; hover işareti sadece gri kare.

### Footer'ı varış noktası yap: ters renk + dev e-posta + müsaitlik + yerel saat

- **Etki:** yüksek · **Efor:** orta · **Referans:** Studio Freight footer (dev e-posta), Basement Studio (ters renk footer), Resn (yerel saat)

Footer'ı beyaz (#f2f2f0) zemine çevir; "Have a system in mind?" (footer.talk zaten JSON'da) clamp(40px,6vw,96px) Archivo 900 + hello@alaz.pro aynı boyda link, hover'da underline-draw ve ok; sağda 3 kolon mono sitemap/contact/elsewhere. Bir satır canlı detay: "Taking new projects from Q1 2027" (gerçekse) ve "İzmir 14:32 · New York 07:32" (Intl.DateTimeFormat ile client'ta, dakikada bir güncelle). Wordmark isteniyorsa en altta bottom-cropped (alt %35 kesik) ve viewport'a girince harf harf y:100%→0 stagger ile; ana sayfada hero zaten dev logo olduğundan orada gizle.

### Sayfa geçişi koreografisi (progress bar yerine)

- **Etki:** yüksek · **Efor:** orta · **Referans:** Lusion, Active Theory, Obys sayfa geçişleri

NextTopLoader'ı kaldır; `src/app/[locale]/template.jsx` + framer-motion: siyah perde clip-path inset(0 0 0 0)→inset(0 0 100% 0) 500ms [.22,1,.36,1], perdenin ortasında 200ms görünen "ALAZ." (sadece nokta beyaza dönerek), ardından içerik opacity/y ile gelir. Çıkış için Link'leri saran TransitionLink (router.push 400ms gecikmeli, perde kapanır). Route değişiminde lenis.scrollTo(0,{immediate:true}). prefers-reduced-motion'da sadece 150ms fade.

### Header scroll koreografisi: şeffaf başla, aşağıda gizlen, wordmark daral

- **Etki:** yüksek · **Efor:** küçük · **Referans:** Locomotive, Hello Monday (hide-on-scroll header), Unseen Studio (difference header)

Lenis 'scroll' event'inden {scroll, direction} al: scroll<40 → header tamamen şeffaf/çizgisiz; 40+ → solid #0a0a0a 350ms; direction 1 (aşağı) → translateY(-100%) 400ms, direction -1 → geri. Hero bitince wordmark "ALAZ."→"A." (L,A,Z harfleri width:0 + opacity, 400ms). Mobilde aynı mantık, CTA header'dan çıkar. İsteğe bağlı: mix-blend-mode: difference ile bg'siz header; siyah/beyaz site için risksiz.

### 404: "düşen nokta" etkileşimi

- **Etki:** orta · **Efor:** küçük · **Referans:** Resn 404, Lusion 404, Active Theory 404 (oyuncak 404'ler)

Marka motifinden konsept: başlık "PAGE NOT FOUND" noktasız; gri kare viewport'un alt kenarında "düşmüş" duruyor. framer-motion drag (dragConstraints ref, dragElastic .2) + bırakınca spring ({stiffness:300, damping:18}) ile yere düşer; sürüklenip başlığın sonuna bırakılırsa yerine oturur ve başlık "PAGE NOT FOUND." olur, altında "Fixed. Now go home →" belirir. Mono satırda istenen path gösterilir. Altında Case studies / Services / Start a project büyük linkler. 40-60 satır client component; matter-js gerekmez.

### Gri kareyi menü düğmesi yap (marka motifi → etkileşim)

- **Etki:** orta · **Efor:** orta · **Referans:** Obys (logo-triggered menu), Studio Freight (motif tabanlı düğme)

Header'daki "ALAZ." noktası (span.text-[#777]) 26px'de ~9px'lik kare; tıklanabilir yap: hover'da beyaza döner ve 1.4× büyür (200ms), tıklanınca menü overlay'i o noktadan clip-path circle() ile açılır (600ms), açıkken kare "X" yerine beyaz kalır ve menü overlay'in köşesine taşınır (layoutId ile). Hamburger ikonu ve lucide bağımlılığı header'dan tamamen kalkar. Dokunma alanı için 44×44 görünmez hit-area ver.

### Legal sayfalarına sticky TOC ve gerçek tarih

- **Etki:** düşük · **Efor:** küçük · **Referans:** Linear legal sayfaları, Vercel legal (sakin, TOC'lu)

Sol sticky rail (top 100px, 220px) mono 12px bölüm listesi; IntersectionObserver ile aktif bölüm beyaz, diğerleri #7e828a; tıklanınca Lenis scrollTo(#id, offset -78). Üstte `<time dateTime>` ile tek sabitten gelen tarih (LAST_UPDATED = '2026-10-08'), "Print / Download PDF" mono linki (window.print + @media print stil). Bu sayfalar sakinleştikçe ana sayfaların kontrastı artar.
