import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function LegalPageTR({ type }) {
  const privacy = type === 'privacy';
  const missing = type === 'not-found';
  const title = missing ? 'SAYFA BULUNAMADI' : privacy ? 'GİZLİLİK' : 'YASAL';
  return <>
    <Helmet><html lang="tr" /><title>{missing ? 'Sayfa Bulunamadı' : privacy ? 'Gizlilik' : 'Yasal'} — ALAZ</title><meta name="description" content={missing ? 'İstenen ALAZ sayfası bulunamadı.' : privacy ? 'ALAZ\'ın proje sorgu formu üzerinden gönderilen bilgileri nasıl işlediğini öğrenin.' : 'ALAZ mühendislik web sitesine dair yasal bilgiler.'} /></Helmet>
    <main className="subpage legal-page frame"><div className="section-top mono"><span>ALAZ / BİLGİ</span><span>{missing ? '404' : 'BELGE / 2025'}</span></div><h1>{title}<span>.</span></h1>
      {missing ? <p>Bu rota mevcut değil. Başlangıca dönün.</p> : privacy ? <div className="legal-copy"><h2>BİLGİLERİNİZ</h2><p>Bir proje sorgusu gönderdiğinizde, paylaşmayı seçtiğiniz iletişim ve proje bilgilerini toplarız. Bununla sorgunuzu inceler ve size yanıt veririz. Bu bilgiyi satmıyoruz.</p><h2>SAKLAMA VE TALEPLER</h2><p>Sorgular, yanıtlamak ve yazışmamızı yönetmek için gereken süre boyunca saklanır. Bilginizle ilgili soru sormak veya kaldırılmasını talep etmek için <a href="mailto:hello@alaz.pro">hello@alaz.pro</a> adresine yazın.</p><h2>ÜÇÜNCÜ TARAF İÇERİK</h2><p>Bu web sitesi harici olarak barındırılan fontlar ve görseller kullanabilir. Bu sağlayıcılar, kaynakları yüklendiğinde standart tarayıcı istek bilgileri alabilir.</p></div> : <div className="legal-copy"><h2>WEB SİTESİ BİLGİSİ</h2><p>Bu web sitesi ALAZ'ın mühendislik uygulamasını sunar ve bir proje sorgusu başlatma yolu sağlar. Sorgu göndermek bir hizmet sözleşmesi oluşturmaz veya proje kabulünü garanti etmez.</p><h2>İÇERİK VE UYGUNLUK</h2><p>Bilgiler genel amaçlı sunulur ve değişebilir. Proje kapsamı, teslimatlar ve şartlar yalnızca ayrı bir yazılı anlaşma ile belirlenir.</p></div>}
      <Link to="/tr" className="outline-action">← ANA SAYFAYA DÖN</Link>
    </main>
  </>;
}
