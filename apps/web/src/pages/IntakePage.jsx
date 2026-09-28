import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CirclePower } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const types = [
  { name: 'Web App', detail: 'Platforms & products' },
  { name: 'Mobile App', detail: 'Native experiences' },
  { name: 'Infrastructure', detail: 'Systems & architecture' },
  { name: 'Custom', detail: 'Something different' },
];
const initial = { project_type: '', project_name: '', brief: '', timeline: '', budget: '', name: '', email: '', company: '' };

export default function IntakePage() {
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
    if (currentStep === 0 && !form.project_type) next.project_type = 'Select a project type to continue.';
    if (currentStep === 1) {
      if (!form.project_name.trim()) next.project_name = 'Enter a project name.';
      if (!form.brief.trim() || form.brief.trim().length < 20) next.brief = 'Tell us a little more about the challenge (at least 20 characters).';
    }
    if (currentStep === 2) {
      if (!form.name.trim()) next.name = 'Enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
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
      setSubmitError(error?.data?.message || 'The transmission could not be completed. Please try again.');
    } finally { setSubmitting(false); }
  };

  return <>
    <Helmet><title>Start a Project — ALAZ Engineering</title><meta name="description" content="Tell ALAZ about your software architecture, engineering, or digital systems project. Begin a focused project inquiry." /></Helmet>
    <main className={`intake-page frame ${complete ? 'intake-page-complete' : ''}`}>
      <div className="section-top mono"><span>PROJECT INTAKE / SECURE TRANSMISSION</span><span>ALAZ / NEW ENGAGEMENT</span></div>
      {complete ? <div className="intake-complete"><div className="complete-icon"><Check size={32} /></div><span className="eyebrow">PROJECT INQUIRY RECEIVED / 001</span><h1>REQUEST<br />RECEIVED<span>.</span></h1><p>Thank you, {form.name.trim()}. Your project inquiry is safely in our queue. We'll review it and contact you at {form.email.trim()}.</p><Link to="/" className="start-button">RETURN TO HOME <ArrowUpRight size={17} /></Link></div> : <>
        <div className="intake-heading"><span className="eyebrow">LET'S BUILD SOMETHING THAT LASTS</span><h1>START A<br />PROJECT<span>.</span></h1><p>Good work starts with the right questions. Tell us what you're building.</p></div>
        <div className="intake-layout">
          <aside className="intake-aside"><span className="mono">YOUR BRIEF / IN THREE PARTS</span><div className="step-list">{['THE SCOPE', 'THE CHALLENGE', 'YOUR DETAILS'].map((label, index) => <div className={`step-item ${step === index ? 'current' : ''} ${step > index ? 'done' : ''}`} key={label}><span className="step-number mono">0{index + 1}</span><span>{label}</span>{step > index && <Check size={15} />}</div>)}</div><p>We only ask what we need to understand your challenge. No generic sales pitch. No unnecessary calls.</p><div className="intake-aside-bottom mono">STATUS: ACCEPTING NEW INQUIRIES <span className="status-square" /></div></aside>
          <form className="intake-form" onSubmit={submit} noValidate>
            <div className="form-heading mono"><span>0{step + 1} / 03 — {['PROJECT TYPE', 'PROJECT CONTEXT', 'CONTACT DETAILS'][step]}</span><span>{Math.round((step + 1) / 3 * 100)}% COMPLETE</span></div>
            {step === 0 && <div className="form-stage"><h2>WHAT ARE WE BUILDING?</h2><p>Select the discipline closest to your project.</p><div className="type-grid" role="group" aria-label="Project type">{types.map((type, i) => <button type="button" key={type.name} className={`type-option ${form.project_type === type.name ? 'selected' : ''}`} aria-pressed={form.project_type === type.name} onClick={() => update('project_type', type.name)}><span className="mono">0{i + 1} / TYPE</span><span className="type-name">{type.name}</span><span className="type-detail">{type.detail}</span><span className="type-check">{form.project_type === type.name ? <Check size={17} /> : <ArrowUpRight size={17} />}</span></button>)}</div>{errors.project_type && <p className="field-error" role="alert">{errors.project_type}</p>}</div>}
            {step === 1 && <div className="form-stage"><h2>DEFINE THE CHALLENGE.</h2><p>Start with the problem. We'll find the right architecture together.</p><div className="field"><label htmlFor="project_name">PROJECT NAME <span>*</span></label><input id="project_name" maxLength={160} autoComplete="off" value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder="A working title is fine" aria-invalid={Boolean(errors.project_name)} />{errors.project_name && <small role="alert">{errors.project_name}</small>}</div><div className="field"><label htmlFor="brief">WHAT ARE YOU TRYING TO SOLVE? <span>*</span></label><textarea id="brief" rows={6} maxLength={5000} value={form.brief} onChange={e => update('brief', e.target.value)} placeholder="Tell us about the system, the challenge, and what success would look like..." aria-invalid={Boolean(errors.brief)} />{errors.brief && <small role="alert">{errors.brief}</small>}</div><div className="field-row"><div className="field"><label htmlFor="timeline">IDEAL TIMELINE</label><select id="timeline" value={form.timeline} onChange={e => update('timeline', e.target.value)}><option value="">Select a timeframe</option><option>As soon as possible</option><option>1–3 months</option><option>3–6 months</option><option>Exploring options</option></select></div><div className="field"><label htmlFor="budget">BUDGET RANGE</label><select id="budget" value={form.budget} onChange={e => update('budget', e.target.value)}><option value="">Select a range</option><option>Under $25k</option><option>$25k–$50k</option><option>$50k–$100k</option><option>$100k+</option><option>To be discussed</option></select></div></div></div>}
            {step === 2 && <div className="form-stage"><h2>WHO'S ON THE OTHER END?</h2><p>Give us a way to get back to you about your project.</p><div className="field"><label htmlFor="name">YOUR NAME <span>*</span></label><input id="name" autoComplete="name" maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" aria-invalid={Boolean(errors.name)} />{errors.name && <small role="alert">{errors.name}</small>}</div><div className="field"><label htmlFor="email">EMAIL ADDRESS <span>*</span></label><input id="email" type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small role="alert">{errors.email}</small>}</div><div className="field"><label htmlFor="company">COMPANY / ORGANIZATION <span className="optional">OPTIONAL</span></label><input id="company" autoComplete="organization" maxLength={160} value={form.company} onChange={e => update('company', e.target.value)} placeholder="Where you work" /></div><div className="privacy-note mono">YOUR DETAILS ARE USED ONLY TO RESPOND TO THIS INQUIRY. <Link to="/privacy">PRIVACY POLICY ↗</Link></div>{submitError && <p className="field-error" role="alert">{submitError}</p>}</div>}
            <div className="form-actions">{step > 0 ? <button className="form-back" type="button" onClick={() => { setStep(step - 1); setErrors({}); }}><ArrowLeft size={17} /> PREVIOUS STEP</button> : <span className="mono form-notation">ALAZ / 2025</span>}{step < 2 ? <button type="button" className="form-next" onClick={nextStep}>CONTINUE <ArrowRight size={17} /></button> : <button type="submit" className="form-next" disabled={submitting}><CirclePower size={18} /> {submitting ? 'TRANSMITTING...' : 'SEND INQUIRY'} <ArrowRight size={17} /></button>}</div>
          </form>
        </div>
      </>}
    </main>
  </>;
}
