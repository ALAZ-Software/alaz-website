import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CirclePower } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const types = [
  { name: 'Web Uygulaması', detail: 'Platformlar & ürünler' },
  { name: 'Mobil Uygulama', detail: 'Doğal deneyimler' },
  { name: 'Altyapı', detail: 'Sistemler & mimari' },
  { name: 'Özel', detail: 'Farklı bir şey' },
];
const initial = { project_type: '', project_name: '', brief: '', timeline: '', budget: '', name: '', email: '', company: '' };

export default function IntakePageTR() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    if (complete) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [complete]);
  const update = (key, value) => { setForm(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: '' })); };
  const validate = (currentStep) => {
    const next = {};
    if (currentStep === 0 && !form.project_type) next.project_type = 'Devam etmek için bir proje türü seçin.';
    if (currentStep === 1) {
      if (!form.project_name.trim()) next.project_name = 'Bir proje adı girin.';
      if (!form.brief.trim() || form.brief.trim().length < 20) next.brief = 'Zorluk hakkında biraz daha bilgi verin (en az 20 karakter).';
    }
    if (currentStep === 2) {
      if (!form.name.trim()) next.name = 'Adınızı girin.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Geçerli bir e-posta adresi girin.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const nextStep = () => { if (validate(step)) setStep(currentStep => currentStep + 1); };
  const submit = async (event) => {
    event.preventDefault();
    if (!validate(2) || submitting) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await pb.collection('project_inquiries').create({
        project_type: form.project_type,
        project_name: form.project_name.trim(),
        brief: form.brief.trim(),
        timeline: form.timeline,
        budget: form.budget,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
      });
      setComplete(true);
    } catch (error) {
      setSubmitError(error?.data?.message || 'İletim tamamlanamadı. Lütfen tekrar deneyin.');
    } finally { setSubmitting(false); }
  };

  return <>
    <Helmet><html lang="tr" /><title>Proje Başlat — ALAZ Mühendislik</title><meta name="description" content="ALAZ\'a yazılım mimarisi, mühendislik veya dijital sistemler projenizi anlatın. Odaklanmış bir proje sorgusu başlatın." /></Helmet>
    <main className={`intake-page frame ${complete ? 'intake-page-complete' : ''}`}>
      <div className="section-top mono"><span>PROJE SORGUSU / GÜVENLİ İLETİM</span><span>ALAZ / YENİ İŞ BİRLİĞİ</span></div>
      {complete ? <div className="intake-complete"><div className="complete-icon"><Check size={32} /></div><span className="eyebrow">PROJE SORGUSU ALINDI / 001</span><h1>İSTEK<br />ALINDI<span>.</span></h1><p>Teşekkürler, {form.name.trim()}. Proje sorgunuz kuyruğumuza güvenle ulaştı. İnceleyip {form.email.trim()} adresinden sizinle iletişime geçeceğiz.</p><Link to="/tr" className="start-button">ANA SAYFAYA DÖN <ArrowUpRight size={17} /></Link></div> : <>
        <div className="intake-heading"><span className="eyebrow">DAYANACAK BİR ŞEY İNŞA EDELİM</span><h1>PROJE<br />BAŞLAT<span>.</span></h1><p>İyi iş doğru sorularla başlar. Ne inşa ettiğinizi anlatın.</p></div>
        <div className="intake-layout">
          <aside className="intake-aside"><span className="mono">BRIEFİNİZ / ÜÇ BÖLÜMDE</span><div className="step-list">{['KAPSAM', 'ZORLUK', 'DETAYLARINIZ'].map((label, index) => <div className={`step-item ${step === index ? 'current' : ''} ${step > index ? 'done' : ''}`} key={label}><span className="step-number mono">0{index + 1}</span><span>{label}</span>{step > index && <Check size={15} />}</div>)}</div><p>Zorluğunuzu anlamak için yalnızca gerekeni soruyoruz. Genel satış konuşması yok. Gereksiz arama yok.</p><div className="intake-aside-bottom mono">DURUM: YENİ SORGU KABUL EDİYOR <span className="status-square" /></div></aside>
          <form className="intake-form" onSubmit={submit} noValidate>
            <div className="form-heading mono"><span>0{step + 1} / 03 — {['PROJE TÜRÜ', 'PROJE BAĞLAMI', 'İLETİŞİM DETAYLARI'][step]}</span><span>%{Math.round((step + 1) / 3 * 100)} TAMAMLANDI</span></div>
            {step === 0 && <div className="form-stage"><h2>NE İNŞA EDİYORUZ?</h2><p>Projenize en yakın disiplini seçin.</p><div className="type-grid" role="group" aria-label="Proje türü">{types.map((type, i) => <button type="button" key={type.name} className={`type-option ${form.project_type === type.name ? 'selected' : ''}`} aria-pressed={form.project_type === type.name} onClick={() => update('project_type', type.name)}><span className="mono">0{i + 1} / TÜR</span><span className="type-name">{type.name}</span><span className="type-detail">{type.detail}</span><span className="type-check">{form.project_type === type.name ? <Check size={17} /> : <ArrowUpRight size={17} />}</span></button>)}</div>{errors.project_type && <p className="field-error" role="alert">{errors.project_type}</p>}</div>}
            {step === 1 && <div className="form-stage"><h2>ZORLUĞU TANIMLAYIN.</h2><p>Sorundan başlayın. Doğru mimariyi birlikte buluruz.</p><div className="field"><label htmlFor="project_name">PROJE ADI <span>*</span></label><input id="project_name" maxLength={160} autoComplete="off" value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder="Geçici bir başlık yeterli" aria-invalid={Boolean(errors.project_name)} />{errors.project_name && <small role="alert">{errors.project_name}</small>}</div><div className="field"><label htmlFor="brief">NE ÇÖZMEYE ÇALIŞIYORSUNUZ? <span>*</span></label><textarea id="brief" rows={6} maxLength={5000} value={form.brief} onChange={e => update('brief', e.target.value)} placeholder="Sistemden, zorluktan ve başarının nasıl görüneceğinden bahsedin..." aria-invalid={Boolean(errors.brief)} />{errors.brief && <small role="alert">{errors.brief}</small>}</div><div className="field-row"><div className="field"><label htmlFor="timeline">İDEAL ZAMAN ÇİZELGESİ</label><select id="timeline" value={form.timeline} onChange={e => update('timeline', e.target.value)}><option value="">Bir zaman dilimi seçin</option><option>En kısa sürede</option><option>1–3 ay</option><option>3–6 ay</option><option>Seçenekleri değerlendiriyorum</option></select></div><div className="field"><label htmlFor="budget">BÜTÇE ARALIĞI</label><select id="budget" value={form.budget} onChange={e => update('budget', e.target.value)}><option value="">Bir aralık seçin</option><option>$25k altında</option><option>$25k–$50k</option><option>$50k–$100k</option><option>$100k+</option><option>Tartışılabilir</option></select></div></div></div>}
            {step === 2 && <div className="form-stage"><h2>DİĞER UÇTA KİM VAR?</h2><p>Projenizle ilgili size geri dönebilmemiz için bir yol verin.</p><div className="field"><label htmlFor="name">ADINIZ <span>*</span></label><input id="name" autoComplete="name" maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Tam adınız" aria-invalid={Boolean(errors.name)} />{errors.name && <small role="alert">{errors.name}</small>}</div><div className="field"><label htmlFor="email">E-POSTA ADRESİ <span>*</span></label><input id="email" type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="siz@sirket.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small role="alert">{errors.email}</small>}</div><div className="field"><label htmlFor="company">ŞİRKET / KURULUŞ <span className="optional">İSTEĞE BAĞLI</span></label><input id="company" autoComplete="organization" maxLength={160} value={form.company} onChange={e => update('company', e.target.value)} placeholder="Çalıştığınız yer" /></div><div className="privacy-note mono">DETAYLARINIZ YALNIZCA BU SORGUYU YANITLAMAK İÇİN KULLANILIR. <Link to="/tr/privacy">GİZLİLİK POLİTİKASI ↗</Link></div>{submitError && <p className="field-error" role="alert">{submitError}</p>}</div>}
            <div className="form-actions">{step > 0 ? <button className="form-back" type="button" onClick={() => { setStep(step - 1); setErrors({}); }}><ArrowLeft size={17} /> ÖNCEKİ ADIM</button> : <span className="mono form-notation">ALAZ / 2025</span>}{step < 2 ? <button type="button" className="form-next" onClick={nextStep}>DEVAM <ArrowRight size={17} /></button> : <button type="submit" className="form-next" disabled={submitting}><CirclePower size={18} /> {submitting ? 'İLETİLİYOR...' : 'SORGUYU GÖNDER'} <ArrowRight size={17} /></button>}</div>
          </form>
        </div>
      </>}
    </main>
  </>;
}
