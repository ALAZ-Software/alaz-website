// Türkçe içerik — /tr rotaları için ALAZ stüdyo verileri.

export const media = {
  earth: 'https://horizons-cdn.hostinger.com/1a631f12-80cd-4d30-a12d-eb3a1c5bb682/a97baae44687d408c5ec3f5358f4a507.png',
  server: 'https://images.hostinger.com/b7153917-045b-4d9f-a8e9-d3267bf93605.png',
  wafer: 'https://images.hostinger.com/79819ca9-2b4f-40a0-b628-39c7e7abb02c.png',
  conduits: 'https://images.hostinger.com/34b5c8dc-aea2-4a15-a1ea-7d23314bd149.png',
  laboratory: 'https://images.hostinger.com/5409df7a-b8d7-46c1-935f-e8bb5f9de990.png',
};

export const services = [
  { number: '01', title: 'SİSTEM MİMARİSİ', category: 'ALTYAPI / DAYANIKLILIK', description: 'Kesintiye tahammülü olmayan sistemler için dayanıklı, gözlemlenebilir altyapı.', detail: 'İlk servis diyagramından üretim dağıtımına kadar netlik ve ölçek için tasarlıyoruz. Her bağımlılık bilinçli, her hata durumu haritalanmış, her dağıtım geri alınabilir.' },
  { number: '02', title: 'DOĞAL PERFORMANS', category: 'MÜHENDİSLİK / OPTİMİZASYON', description: 'Bir saniyenin altında yükleme, sıfır takılma. Baytı ve ana iş parçacığı işini budarız, köşeyi değil.', detail: 'Gerçek kritik yolu profilleriz, paketi budarız ve renderı sunucuya taşırız. Sonuç daha az kilobayt ve ilk etkileşimde yanıt veren arayüz.' },
  { number: '03', title: 'DİJİTAL EKOSİSTEMLER', category: 'ENTEGRASYON / ÜRÜN', description: 'API\'ler, veri akışları ve ürün yüzeyleri tek tutarlı sisteme bağlı.', detail: 'Karmaşıklık arayüzün arkasında kalmalı. Ürünleri, veriyi ve iş akışlarını tipli sözleşmelerle ve net sınırlarla bağlıyoruz; sistem büyüdükçe okunabilir kalsın.' },
];

export const projects = [
  { slug: 'alpha', number: '01', name: 'ALPHA', discipline: 'SİSTEM TASARIMI', type: 'BULUT ALTYAPISI', image: media.server, summary: 'Sıfır kesintili geçiş ve yatay ölçek için yeniden inşa edilmiş bulut temeli.', challenge: 'Parçalanmış bir altyapı katmanını, iş kritik servisleri durdurmadan hata toleranslı bir platformla değiştirmek.', approach: 'Her servis bağımlılığını haritaladık, gözlemlenebilir bir dağıtım hattı kurduk ve her aşamada geri alma garantisi olan kademeli bir geçiş yolu çıkardık.', outcome: 'Sıfır kesintili geçiş stratejisi ve yeni iş yüklerini baştan iş gerektirmeden özümseyen bir temel.', markers: ['SIFIR-KESİNTİ STRATEJİSİ', 'HATA TOLERANSLI TASARIM', 'GÖZLEMLENEBİLİR SİSTEMLER'] },
  { slug: 'beta', number: '02', name: 'BETA', discipline: 'DOĞAL PERFORMANS', type: 'SİLİKON MANTIĞI', image: media.wafer, summary: 'Bir saniyenin altında etkileşim için profillenip budanmış kritik yol.', challenge: 'Donanım sınırları, uygulama mantığı ve kullanıcının gerçekten beklediği şey arasındaki sürtünmeyi bulmak.', approach: 'Hesaplama sıcak yollarını profilledik, yürütme modelini sadeleştirdik ve istemcide kalması gerekmeyen renderı sunucuya taşıdık.', outcome: 'Odaklanmış bir optimizasyon planı: daha yalın hesaplama, daha az gönderilen bayt ve ilk olayda yanıt veren etkileşim.', markers: ['YÜRÜTME YOLU DENETİMİ', 'MANTIK OPTİMİZASYONU', 'PERFORMANS ÖNCELİKLİ ARAYÜZ'] },
];
