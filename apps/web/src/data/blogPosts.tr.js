// Türkçe blog içerikleri. Her yazı gövdesi markdown olarak @/components/Markdown
// tarafından render edilir. Yeni yazı eklemek için bu diziyi genişletin.

export const getReadingTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const blogPosts = [
  {
    slug: 'cost-of-a-slow-website',
    title: 'Yavaş Bir Web Sitesi İşinize Gerçekte Ne Kadara Mal Oluyor?',
    excerpt:
      '0.1 saniyelik bir gecikme, çoğu fiyat değişikliğinden daha sert gelir kaybına yol açar. Google, Deloitte ve Portent verileri: sayfa yükleme süresi dönüşümleri nasıl yönlendiriyor, reklam bütçesini nasıl yakıyor ve arama sıralamalarını nasıl şekillendiriyor.',
    tag: 'PERFORMANS',
    date: '2025-09-29',
    dateLabel: '29 EYL 2025',
    cover: 'https://images.hostinger.com/fa2db1a1-b7b8-4447-ba3d-7661427c1fcb.png',
    author: { name: 'ALAZ Ekibi', role: 'MÜHENDİSLİK STÜDYOSU' },
    content: `Ekipler haftalarını bir hero animasyonunu cilalayarak, bir açılır menünün easing eğrisini ayarlayarak ve bir gradyanın tam tonu üzerine tartışarak geçirir. Sonra bunu etkileşime geçmenin 4.2 saniye sürdüğü bir sayfada yayınlar ve dönüşüm oranının her çeyrek neden aşağı kaydığını merak eder.

Hız bir geliştirici işi değil. Bir bilançoyu ilgilendiren kalemdir. Her yüz milisaniyelik gecikme bir yerlerde ortaya çıkar — ödeme tamamlamalarında, edinme başına maliyette, ücretli bir ziyaretçinin formunuzu hiç görüp görmeyeceğinde. Bu yazı gerçek sayıları derliyor; böylece performansa "olsa iyi olur" demeyi bırakıp bir gelir metriği olarak ele almaya başlayabilirsiniz.

## Perakendede 0.1 saniyelik gecikmenin maliyeti

Bu konuşmadaki en çok atıf alan sayı Deloitte ve Google çalışması *Milliseconds Make Millions* kaynaklanıyor. Avrupa genelinde gerçek perakende ve seyahat sitelerini ölçümlediler ve mobil yükleme süreleri yalnızca 0.1 saniye iyileştiğinde ne olduğunu gözlemlediler.

- **Perakende dönüşümleri 0.1 saniyelik iyileşmede %8.4 arttı.**
- **Perakendede ortalama sipariş değeri %9.2 arttı** — insanlar yalnızca daha sık almakla kalmadı, daha fazla harcadı.
- **Seyahat dönüşümleri %10.1 arttı** — çalışmadaki en hız-duyarlı kategori.

Onda bir saniye. Bu, bir insan göz kırpmasından daha kısa bir süre ve dönüşümü neredeyse yüzde on hareket ettirdi.

Amazon bu çalışmadan yıllar önce standardı belirlemişti: her 100ms gecikme onlara kabaca %1 satış kaybettiriyor. Amazon'un ölçeğinde %1 rakamı şaşırtıcıdır, ama oran daha küçük ölçeklerde de geçerli. Mağazanız ayda 500 bin dolar online ciroya sahipse, 300ms'lik bir iyileşme yıllık beş haneli bir değere makul şekilde denk düşer — fiyatlandırmaya, reklam bütçesine veya ürün çeşitine dokunmadan.

Çıkarılacak ders, görsel cila üzerine yükleme süresini önceliklendiren ekipler için rahatsız edici. Daha basit tasarımlı daha hızlı bir sayfa, daha şık ama daha yavaş bir sayfayı neredeyse her zaman dönüşümde geçer.

## Render edilmemiş piksellerde yanan reklam bütçeleri

Google'ın mobil sayfa hızı verileri hemen çıkma eğrisini seriyor ve eğri acımasız.

- Sayfa yüklemesi 1 saniyeden 3 saniyeye çıktığında hemen çıkma oranı **%32** sıçrar.
- Sayfa yüklemesi 5 saniyeye ulaştığında hemen çıkma oranı **%90** sıçrar.

Şimdi parayı takip edin. Rekabetçi bir anahtar kelime için tıklama başına 2.40 dolar ödüyorsunuz. Ziyaretçi gelir. Sayfa hâlâ 3 saniyede yükleniyor — analiz pikseli ateşlenmedi, dönüşüm formu render olmadı, başlık çizilmedi. Ziyaretçi ayrılıyor. Hiç huniye ulaşmamış bir tıklama için ödediniz.

Bu, çoğu pazarlama panelinin gözden kaçırdığı sessiz bütçe kaybı. Reklam platformu bir tıklama raporlar. Analitiğiniz hiçbir şey raporlamaz — çünkü ziyaretçi etiket yüklenmeden çıktı. Harcama sıfır trafik üretmiş gibi görünür; oysa aslında sitenizin alamadığı bir trafiği üretti.

Çözüm, sızdıran sayfayı telafi etmek için reklama daha fazla harcamak değil. Sızıntıyı durdurmak. Kritik içeriğini 2 saniyenin altında render eden bir sayfa, aynı reklam bütçesini ölçülebilir oturumlara ve ölçülebilir dönüşümlere çevirir. Kampanyaya dokunmadan edinme başına maliyetiniz düşer.

## B2B boru hatları ve kayıp müşteri adayları

B2B aynı hikayeyi anlatır, ama bahisler daha yüksektir çünkü anlaşma boyutları daha büyük ve satış döngüleri daha uzundur.

Portent'in dönüşüm çalışması, 1 saniyede yüklenen bir B2B sitesinin 5 saniyede yüklenen bir siteden **3 kat** daha yüksek, 10 saniyede yüklenen bir siteden **5 kat** daha yüksek dönüştüğünü buldu. Eğri doğrusal değil — uçurumdan düşüyor.

Burada ekiplerin yeterince ağırlık vermediği ikinci dereceden bir etki var. Yavaş bir B2B sitesi, güncel olmayan altyapının örtük bir sinyali olarak okunur. Platformunuzu değerlendiren bir CTO mühendisliğinizi de değerlendiriyor. 6 saniyelik bir yükleme süresi, tek bir özellik sayfasını okumadan önce, ekibinizin performansı önceliklendirmediğini söylüyor. Birinin verisiyle, iş akışıyla veya altı haneli yıllık bir sözleşmeyle güven istenirken istediğiniz ilk izlenim bu değildir.

Hız B2B'de bir güvenilirlik sinyalidir. Modern hissettiren bir demo ile 2015'te yapılmış ve bir daha el atılmamış hissettiren bir demo arasındaki farktır.

## Arama sıralamaları ve Core Web Vitals

Hız ayrıca yalnızca bir dönüşüm faktörü değil, doğrudan bir Google sıralama faktörü. Google bunu Core Web Vitals üzerinden ölçer ve şu anda iki metrik en çok önem taşıyor.

- **Largest Contentful Paint (LCP)** en büyük görünür öğenin ne zaman çizildiğini ölçer. Google bunun 2.5 saniyenin altında olmasını ister. Ağır bir hero görseli, engelleyen bir stil sayfası veya yavaş bir sunucu yanıtı eşiği aşırır ve sıralamanızı çizer.
- **Interaction to Next Paint (INP)** sayfanın bir dokunuşa veya tıklamaya ne kadar hızlı yanıt verdiğini ölçer. Google bunun 200ms altında olmasını ister. INP, 2024'te First Input Delay'in yerini aldı ve çok daha katıdır — sayfa "yüklü" göründükten sonra ana iş parçacığını donduran uzun JavaScript görevlerini yakalar.

Bir tarama bütçesi açısı da var. Ağır istemci tarafı betikler Googlebot'u JavaScript yürütmeye, render sıraya almaya ve ham HTML'den indeksleyebileceği sayfaları yeniden ziyaret etmeye zorlar. Büyük sitelerde bu tarama bütçesini yakar — Google her ziyarette daha az sayfa indeksler ve derin içerik yüzeye çıkmak için daha uzun sürer. Sunucu tarafı render edilen bir sayfa tarayıcıya hazır HTML uzatır ve yoluna devam eder.

Sıralama etkisi, dönüşüm etkisini katlar. Daha hızlı bir sayfa daha iyi dönüştürür *ve* daha iyi sıralar *ve* daha verimli taranır. Daha yavaş bir sayfa üç cephede birden kaybeder.

## Performans mühendisliği stratejisi

Bir site yavaş olduğunda içgüdü sunucuyu yükseltmektir. Bu nadiren doğru ilk hamledir. Çoğu performans sorunu altyapısal değil mimariseldir ve daha büyük bir sunucu 3MB'lık bir JavaScript paketini düzeltmez.

Üç düzeltme herhangi bir sunucu yükseltmesinden daha çok iş yapar.

**Gereksiz JavaScript'i buda.** İçe aktardığınız her kütüphane birinin telefonunda ayrıştırılır, derlenir ve yürütülür. Paketinizi denetleyin. Carousel kütüphanesini bir CSS scroll-snap kapsayıcısı için bırakın. Animasyon kütüphanesini gerçekte kullandığınız dört geçiş için bırakın. 40KB taşıyan tarih seçiciyi yerel bir input için bırakın. En hızlı JavaScript satırı hiç göndermediğiniz satırdır.

**Sunucu öncelikli bir mimari benimse.** Next.js gibi çerçeveler HTML'i sunucuda veya derleme zamanında render etmenizi sağlar; böylece tarayıcı boş bir kabuk ve bir script etiketi yerine gerçek bir sayfa alır. Sunucu tarafı render ve statik site üretimi içerik-ulaşma süresini çarpıcı biçimde düşürür ve arama tarayıcılarına hazır HTML uzatır. İstemci yalnızca etkileşimli olması gerekeni hidrate eder.

**Modern görsel optimizasyonunu uygula.** Görseller genellikle bir sayfadaki en ağır baytlardır. JPEG yerine WebP veya AVIF sunun — aynı kalitede %25–50 daha küçük. Düzen kaymasını önlemek için açık width ve height ayarlayın. Ekrandan aşağıdakilerin hepsini tembel yükle. Üretim varlıklarından metaverileri ayıklayın. Bunlar isteğe bağlı rafinmanlar değil; temeldir.

Bunların hiçbiri daha büyük bir sunucu gerektirmez. Mimari katmanda disiplin gerektirir; kararlar bir kez verilir ve sitenin ömrü boyunca her sayfa görüntülemesinde öder.

## Kaynaklar

- Deloitte Digital & Google — *Milliseconds Make Millions* (perakende ve seyahatte 0.1s yükleme iyileşmesinin dönüşüm etkisi)
- Google — *Mobile Page Speed: Bounce Rate by Load Time* (1s → 3s → 5s hemen çıkma tırmanışı)
- Portent — *Site Speed and Conversion Rate Study* (yükleme süresine göre B2B dönüşüm oranları)
- Google — *Core Web Vitals: LCP ve INP* teknik dokümantasyonu

## Denetimi çalıştır

Bu çeyrek yükleme sürenizi ölçmediyseniz, tahmin yürütüyorsunuz. Bir Lighthouse turu atın. LCP ve INP'nizi eşiklere karşı kontrol edin. Ağ sekmenizi açın ve aktarım boyutuna göre sıralayın. Rakamlar bütçenin tam nerede sızdığını söyleyecek.

Denetim, bütçeniz olmayan bir iş ortaya çıkarırsa, biz tam bunu yapıyoruz. ALAZ yüksek performanslı web ön yüzleri mühendislikle geliştirir — sunucu öncelikli mimariler, disiplinli paket bütçeleri ve en küçük uygulanabilir baytı gönderen görsel boru hatları. İş mantığına dokunmadan eski yığınları modernleştiririz.

\`hello@alaz.pro\` adresine yazın. Bir URL ve varsa bir Lighthouse raporu gönderin. Size açıkça söyleyeceğiz: ne yavaş, size ne kadara mal oluyor ve düzeltmek ne gerektiriyor.`,
  },
  {
    slug: 'we-are-officially-live',
    title: 'Yayındayız: İğneyi Gerçekten Hareket Ettiren Yazılım İnşa Etmek',
    excerpt:
      'ALAZ açık. Bu stüdyo neden var, nasıl mühendislik yapıyoruz ve hız ile güvenilirliği ciladan-öncesi-sis-perdesi olarak gören ekiplere ne sunuyoruz.',
    tag: 'YAYIN',
    date: '2025-09-27',
    dateLabel: '27 EYL 2025',
    cover: 'https://images.hostinger.com/da80e49f-b638-479c-b8a6-486217e4ecb8.png',
    author: { name: 'ALAZ Ekibi', role: 'MÜHENDİSLİK STÜDYOSU' },
    content: `ALAZ faaliyete geçti. Bunu, gerçekten canını sıkan bir şeyi düzeltmek için kurduğum bir stüdyonun ilk yazısı.

## Başlangıç noktası

Yıllarımı basit olması gereken web uygulamalarını çözerek geçirdim. Şişmiş paketler. Orta seviye bir telefonda titreyen arayüzler. Birisi bir araç seçip kararı bir daha gözden geçirmediği için dört kütüphane boyunca dağılmış durum. Etkileşime geçmesi altı saniye süren ve yine de üretime gönderilen panolar.

Bu acının çoğu bir teknoloji sorunu değil. Bir disiplin sorunu. Kararlar bir kez, teslim baskısı altında verilir ve sonra donar. Kod tabanı onları miras alır. Her yeni özellik vergiyi öder.

ALAZ bu vergiyi ödemeyi bırakmak için var.

## Mühendislik ethosemiz

Kısa bir inanç listesine göre inşa ediyoruz.

- **Hız bir özelliktir.** Bir saniyenin altındaki yükleme süreleri bir uzatma hedefi değil. Temeldir. 2.3 saniyede yüklenen bir sayfa odanın yarısını çoktan kaybetmiştir.
- **Mimari bir iletişim aracıdır.** Temiz durum yönetimi ve öngörülebilir render gösteriş değil. Beş kişilik bir ekibin on ikinci aydan sonra da göndermeye devam etmesinin yoludur.
- **TypeScript pazarlıksızdır.** Tipler incelemelerin kaçırdığı hataları yakalar. Gözünüzü kırpmadan refactor yapmanızı sağlar.
- **Modüler, monolitten üstündür.** Küçük, değiştirilebilir parçalar gereksinimler her değiştiğinde kazanır. Ve her zaman değişirler.

Bunların hiçbiri egzotik değil. Çoğu ekip demoya göre optimize ettiği için, on sekizinci aya göre değil; standart düşük. Biz on sekizinci aya göre optimize ediyoruz.

Modern ön yüz yığınında çalışıyoruz — Next.js, TypeScript, React ekosistemi — çünkü kırılgan yayınlamadan hızlı yayınlamamızı sağlıyor. Araçlar olgun. Örüntüler en iyi anlamda sıkıcı. Sıkıcı öngörülebilir demek. Öngörülebilir, gece yarısı saat iki bir şey bozulduğunda sistem hakkında akıl yürütebileceğimiz demek.

## Ne inşa ediyoruz

ALAZ iki şey yayınlar.

Birincisi, yüksek performanslı web çözümleri. Core Web Vitals'ta 100 vurup bir yer tutucu gibi görünmeyen pazarlama siteleri. Demo veri setinde değil, gerçek veri altında duyarlı kalan ürün yüzeyleri.

İkincisi, uzmanlaşmış uygulamalar. Mantığın ürün olduğu ve arayüzün yoldan çekilmesi gereken iç araçlar, panolar ve müşteriye dönük platformlar.

Ciladan-öncesi-sis-perdesi yerine hız ve güvenilirliğe değer veren ekipler için uçtan uca ön yüz yürütmesini üstleniyoruz. 40 sayfalık bir teklif almayacaksınız. Çalışan bir dal, net bir mimari karar kaydı ve bir bakışta okunabilen kod alacaksınız.

Performans bütçeleri lansmandan önce değil ilk sprintte işlenir. Erişilebilirlik son denetimde değil yapının parçasıdır. Bir özellik kritik yolu yavaşlatırsa, yayınlamadan önce söylüyoruz.

## Davet

Prototipini gerçekleştirmesi gereken bir kurucu, koddan özür dileyen bir mühendis veya satıcı yerine bir ortak isteyen bir şirketseniz — konuşalım.

\`hello@alaz.pro\` adresine yazın. Ne inşa ettiğinizi ve neyin yolda olduğunu söyleyin. Her mesajı okuyorum ve bir otomatik yanıtlayıcı gibi değil, bir insan gibi cevaplıyorum.

Yayındayız. Dayanan bir şey inşa edelim.`,
  },
];

export const getPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug);
