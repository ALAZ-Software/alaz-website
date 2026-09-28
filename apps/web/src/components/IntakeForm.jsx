'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CirclePower } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import pb from '@/lib/pocketbaseClient';

const initial = { project_type: '', project_name: '', brief: '', timeline: '', budget: '', name: '', email: '', company: '' };

export default function IntakeForm() {
  const t = useTranslations('intake');
  const types = t.raw('types');
  const timelineOptions = t.raw('timelineOptions');
  const budgetOptions = t.raw('budgetOptions');
  const steps = t.raw('steps');
  const stepLabels = t.raw('stepLabels');
  const completeHeading = t.raw('completeHeading');
  const headingLines = t.raw('headingLines');

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
    if (currentStep === 0 && !form.project_type) next.project_type = t('errors.projectType');
    if (currentStep === 1) {
      if (!form.project_name.trim()) next.project_name = t('errors.projectName');
      if (!form.brief.trim() || form.brief.trim().length < 20) next.brief = t('errors.brief');
    }
    if (currentStep === 2) {
      if (!form.name.trim()) next.name = t('errors.name');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t('errors.email');
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
      setSubmitError(error?.data?.message || t('submitErrorFallback'));
    } finally { setSubmitting(false); }
  };

  return <>
    <main className={`intake-page frame ${complete ? 'intake-page-complete' : ''}`}>
      <div className="section-top mono"><span>{t('sectionTopLeft')}</span><span>{t('sectionTopRight')}</span></div>
      {complete ? <div className="intake-complete"><div className="complete-icon"><Check size={32} /></div><span className="eyebrow">{t('completeEyebrow')}</span><h1>{completeHeading[0]}<br />{completeHeading[1]}<span>.</span></h1><p>{t('completeMessageTemplate', { name: form.name.trim(), email: form.email.trim() })}</p><Link href="/" className="start-button">{t('completeCta')} <ArrowUpRight size={17} /></Link></div> : <>
        <div className="intake-heading"><span className="eyebrow">{t('headingEyebrow')}</span><h1>{headingLines[0]}<br />{headingLines[1]}<span>.</span></h1><p>{t('introParagraph')}</p></div>
        <div className="intake-layout">
          <aside className="intake-aside"><span className="mono">{t('asideLabel')}</span><div className="step-list">{steps.map((label, index) => <div className={`step-item ${step === index ? 'current' : ''} ${step > index ? 'done' : ''}`} key={label}><span className="step-number mono">0{index + 1}</span><span>{label}</span>{step > index && <Check size={15} />}</div>)}</div><p>{t('asideParagraph')}</p><div className="intake-aside-bottom mono">{t('asideStatus')} <span className="status-square" /></div></aside>
          <form className="intake-form" onSubmit={submit} noValidate>
            <div className="form-heading mono"><span>0{step + 1} / 03 — {stepLabels[step]}</span><span>{t('percentCompleteTemplate', { percent: Math.round((step + 1) / 3 * 100) })}</span></div>
            {step === 0 && <div className="form-stage"><h2>{t('step0.heading')}</h2><p>{t('step0.paragraph')}</p><div className="type-grid" role="group" aria-label={t('step0.groupAriaLabel')}>{types.map((type, i) => <button type="button" key={type.name} className={`type-option ${form.project_type === type.name ? 'selected' : ''}`} aria-pressed={form.project_type === type.name} onClick={() => update('project_type', type.name)}><span className="mono">0{i + 1} / {t('typeIndexSuffix')}</span><span className="type-name">{type.name}</span><span className="type-detail">{type.detail}</span><span className="type-check">{form.project_type === type.name ? <Check size={17} /> : <ArrowUpRight size={17} />}</span></button>)}</div>{errors.project_type && <p className="field-error" role="alert">{errors.project_type}</p>}</div>}
            {step === 1 && <div className="form-stage"><h2>{t('step1.heading')}</h2><p>{t('step1.paragraph')}</p><div className="field"><label htmlFor="project_name">{t('fields.projectName.label')} <span>*</span></label><input id="project_name" maxLength={160} autoComplete="off" value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder={t('fields.projectName.placeholder')} aria-invalid={Boolean(errors.project_name)} />{errors.project_name && <small role="alert">{errors.project_name}</small>}</div><div className="field"><label htmlFor="brief">{t('fields.brief.label')} <span>*</span></label><textarea id="brief" rows={6} maxLength={5000} value={form.brief} onChange={e => update('brief', e.target.value)} placeholder={t('fields.brief.placeholder')} aria-invalid={Boolean(errors.brief)} />{errors.brief && <small role="alert">{errors.brief}</small>}</div><div className="field-row"><div className="field"><label htmlFor="timeline">{t('fields.timeline.label')}</label><select id="timeline" value={form.timeline} onChange={e => update('timeline', e.target.value)}><option value="">{t('fields.timeline.placeholder')}</option>{timelineOptions.map(option => <option key={option}>{option}</option>)}</select></div><div className="field"><label htmlFor="budget">{t('fields.budget.label')}</label><select id="budget" value={form.budget} onChange={e => update('budget', e.target.value)}><option value="">{t('fields.budget.placeholder')}</option>{budgetOptions.map(option => <option key={option}>{option}</option>)}</select></div></div></div>}
            {step === 2 && <div className="form-stage"><h2>{t('step2.heading')}</h2><p>{t('step2.paragraph')}</p><div className="field"><label htmlFor="name">{t('fields.name.label')} <span>*</span></label><input id="name" autoComplete="name" maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder={t('fields.name.placeholder')} aria-invalid={Boolean(errors.name)} />{errors.name && <small role="alert">{errors.name}</small>}</div><div className="field"><label htmlFor="email">{t('fields.email.label')} <span>*</span></label><input id="email" type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder={t('fields.email.placeholder')} aria-invalid={Boolean(errors.email)} />{errors.email && <small role="alert">{errors.email}</small>}</div><div className="field"><label htmlFor="company">{t('fields.company.label')} <span className="optional">{t('fields.company.optional')}</span></label><input id="company" autoComplete="organization" maxLength={160} value={form.company} onChange={e => update('company', e.target.value)} placeholder={t('fields.company.placeholder')} /></div><div className="privacy-note mono">{t('privacyNoteBefore')}<Link href="/privacy">{t('privacyNoteCta')}</Link></div>{submitError && <p className="field-error" role="alert">{submitError}</p>}</div>}
            <div className="form-actions">{step > 0 ? <button className="form-back" type="button" onClick={() => { setStep(step - 1); setErrors({}); }}><ArrowLeft size={17} /> {t('prevStep')}</button> : <span className="mono form-notation">{t('formNotation')}</span>}{step < 2 ? <button type="button" className="form-next" onClick={nextStep}>{t('continueCta')} <ArrowRight size={17} /></button> : <button type="submit" className="form-next" disabled={submitting}><CirclePower size={18} /> {submitting ? t('submittingCta') : t('submitCta')} <ArrowRight size={17} /></button>}</div>
          </form>
        </div>
      </>}
    </main>
  </>;
}
