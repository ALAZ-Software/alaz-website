'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CirclePower } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { fit } from '@/lib/fit';

const initial = { project_type: '', project_name: '', brief: '', timeline: '', budget: '', name: '', email: '', company: '' };

const fieldInput = "bg-[#111] text-white border border-[#393939] rounded-none px-[18px] py-[17px] w-full text-[14px] outline-none transition-colors duration-200 focus:border-white placeholder:text-[#6f7277] aria-[invalid=true]:border-[#d88]";

const selectChevronStyle = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='white' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 17px center',
};

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_type: form.project_type,
          project_name: form.project_name.trim(),
          brief: form.brief.trim(),
          timeline: form.timeline,
          budget: form.budget,
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('submitErrorFallback'));
      }

      setComplete(true);
    } catch (error) {
      setSubmitError(error.message || t('submitErrorFallback'));
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <main className={cn('w-full relative px-[clamp(24px,4.2vw,72px)]', complete ? 'min-h-dvh pt-[76px] pb-0 flex flex-col' : 'pt-[128px] pb-[160px] min-h-screen mobile:pt-[105px] mobile:pb-[100px]')}>
      {!complete && <div className="absolute inset-x-0 top-0 h-[clamp(600px,50vw,780px)] overflow-hidden pointer-events-none" aria-hidden="true">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover opacity-[.5]" autoPlay loop muted playsInline preload="auto">
          <source src="/videos/start-project-rocket.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,.75)_0%,rgba(9,9,9,.15)_55%,rgba(9,9,9,.35)_100%),linear-gradient(180deg,rgba(9,9,9,.55)_0%,rgba(9,9,9,.10)_45%,#090909_100%)]" />
      </div>}
      <div className="relative z-[1] font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('sectionTopLeft')}</span><span>{t('sectionTopRight')}</span></div>
      {complete ? <div className="max-w-[950px] pt-[clamp(100px,14vw,190px)] pb-[70px] flex-1 w-full !max-w-none flex flex-col items-center justify-center text-center !py-[clamp(48px,8vh,110px)]">
          <div className="h-[68px] w-[68px] border border-white grid place-items-center mb-[32px]"><Check size={32} /></div>
          <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute">{t('completeEyebrow')}</span>
          <h1 style={fit(completeHeading, '.')} className="fit [--fit-size:clamp(68px,10vw,150px)] leading-[.86] tracking-[-.075em] font-black my-[25px] mb-[32px]">{completeHeading[0]}<br />{completeHeading[1]}<span className="text-[#6e6e6e]">.</span></h1>
          <p className="text-[18px] leading-[1.7] text-mute max-w-[610px] mx-auto mb-[38px]">{t('completeMessageTemplate', { name: form.name.trim(), email: form.email.trim() })}</p>
          <Link href="/" className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[23px] py-[18px] text-[11px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)] xs:gap-[12px] mx-auto">{t('completeCta')} <ArrowUpRight size={17} /></Link>
        </div> : <>
        <div className="relative z-[1] pt-[100px] mobile:pt-[85px]">
          <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute">{t('headingEyebrow')}</span>
          <h1 style={fit(headingLines, '.')} className="fit [--fit-size:clamp(77px,11.7vw,190px)] leading-[.86] tracking-[-.075em] font-black my-[30px] mobile:[--fit-size:clamp(75px,14vw,125px)]">{headingLines[0]}<br />{headingLines[1]}<span className="text-[#6e6e6e]">.</span></h1>
          <p className="text-[length:clamp(16px,1.8vw,23px)] text-mute tracking-[-.03em]">{t('introParagraph')}</p>
        </div>
        <div className="grid grid-cols-[31%_1fr] gap-[clamp(35px,6vw,100px)] mt-[100px] border-t border-line pt-[32px] mobile:grid-cols-1 mobile:gap-[45px] mobile:mt-[65px]">
          <aside className="flex flex-col min-h-[580px] mobile:min-h-0">
            <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('asideLabel')}</span>
            <div className="mt-[38px] mobile:grid mobile:grid-cols-3 mobile:mt-[22px]">
              {steps.map((label, index) => <div className={cn('flex items-center gap-[20px] py-[22px] border-t border-line text-[#717171] text-[12px] font-bold tracking-[.02em] last:border-b last:border-line mobile:block mobile:text-[10px] mobile:border-t-0 mobile:border-b mobile:py-[17px] mobile:pr-[8px] mobile:pl-0 xs:text-[9px]', step === index && 'text-white', step > index && 'text-[#aaa]')} key={label}>
                <span className="text-inherit mobile:block mobile:mb-[6px]">0{index + 1}</span><span>{label}</span>{step > index && <Check size={15} className="mobile:hidden" />}
              </div>)}
            </div>
            <p className="text-[13px] leading-[1.8] text-dim max-w-[250px] mt-[42px] mobile:hidden">{t('asideParagraph')}</p>
            <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] mt-auto text-dim flex items-center gap-[10px] mobile:hidden">{t('asideStatus')} <span className="inline-block w-[6px] h-[6px] bg-white flex-none align-middle" /></div>
          </aside>
          <form onSubmit={submit} noValidate>
            <div className="flex justify-between text-dim font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6]"><span>0{step + 1} / 03 — {stepLabels[step]}</span><span>{t('percentCompleteTemplate', { percent: Math.round((step + 1) / 3 * 100) })}</span></div>
            {step === 0 && <div className="min-h-[470px] pt-[45px] mobile:pt-[35px] mobile:min-h-[400px]">
              <h2 className="text-[length:clamp(30px,3.7vw,57px)] tracking-[-.065em] leading-[1.07] font-extrabold">{t('step0.heading')}</h2>
              <p className="text-[14px] text-mute mt-[13px] leading-[1.6]">{t('step0.paragraph')}</p>
              <div className="grid grid-cols-2 gap-[12px] mt-[43px] xs:gap-[8px]" role="group" aria-label={t('step0.groupAriaLabel')}>
                {types.map((type, i) => <button type="button" key={type.name} className={cn('bg-[#111] border border-[#303030] text-white text-left min-h-[168px] p-[21px] flex flex-col relative transition-colors duration-200 hover:border-[#888] xs:min-h-[150px] xs:p-[13px]', form.project_type === type.name && 'bg-[#1c1c1c] border-white')} aria-pressed={form.project_type === type.name} onClick={() => update('project_type', type.name)}>
                  <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">0{i + 1} / {t('typeIndexSuffix')}</span>
                  <span className="text-[length:clamp(18px,2vw,28px)] font-bold tracking-[-.05em] mt-auto xs:text-[18px]">{type.name}</span>
                  <span className="text-[12px] text-mute mt-[4px]">{type.detail}</span>
                  <span className={cn('absolute right-[20px] top-[20px] text-mute xs:right-[12px] xs:top-[12px]', form.project_type === type.name && 'text-white')}>{form.project_type === type.name ? <Check size={17} /> : <ArrowUpRight size={17} />}</span>
                </button>)}
              </div>
              {errors.project_type && <p className="text-[#f2a6a6] text-[12px] leading-[1.5]" role="alert">{errors.project_type}</p>}
            </div>}
            {step === 1 && <div className="min-h-[470px] pt-[45px] mobile:pt-[35px] mobile:min-h-[400px]">
              <h2 className="text-[length:clamp(30px,3.7vw,57px)] tracking-[-.065em] leading-[1.07] font-extrabold">{t('step1.heading')}</h2>
              <p className="text-[14px] text-mute mt-[13px] leading-[1.6]">{t('step1.paragraph')}</p>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="project_name" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.projectName.label')} <span className="text-white">*</span></label>
                <input id="project_name" maxLength={160} autoComplete="off" value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder={t('fields.projectName.placeholder')} aria-invalid={Boolean(errors.project_name)} className={fieldInput} />
                {errors.project_name && <small role="alert" className="text-[#f2a6a6] text-[12px] leading-[1.5]">{errors.project_name}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="brief" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.brief.label')} <span className="text-white">*</span></label>
                <textarea id="brief" rows={6} maxLength={5000} value={form.brief} onChange={e => update('brief', e.target.value)} placeholder={t('fields.brief.placeholder')} aria-invalid={Boolean(errors.brief)} className={cn(fieldInput, 'resize-y min-h-[155px]')} />
                {errors.brief && <small role="alert" className="text-[#f2a6a6] text-[12px] leading-[1.5]">{errors.brief}</small>}
              </div>
              <div className="grid grid-cols-2 gap-[14px] xs:grid-cols-1 xs:gap-0">
                <div className="flex flex-col gap-[10px] mt-[28px]">
                  <label htmlFor="timeline" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.timeline.label')}</label>
                  <select id="timeline" value={form.timeline} onChange={e => update('timeline', e.target.value)} className={cn(fieldInput, 'appearance-none')} style={selectChevronStyle}>
                    <option value="">{t('fields.timeline.placeholder')}</option>
                    {timelineOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-[10px] mt-[28px]">
                  <label htmlFor="budget" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.budget.label')}</label>
                  <select id="budget" value={form.budget} onChange={e => update('budget', e.target.value)} className={cn(fieldInput, 'appearance-none')} style={selectChevronStyle}>
                    <option value="">{t('fields.budget.placeholder')}</option>
                    {budgetOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
              </div>
            </div>}
            {step === 2 && <div className="min-h-[470px] pt-[45px] mobile:pt-[35px] mobile:min-h-[400px]">
              <h2 className="text-[length:clamp(30px,3.7vw,57px)] tracking-[-.065em] leading-[1.07] font-extrabold">{t('step2.heading')}</h2>
              <p className="text-[14px] text-mute mt-[13px] leading-[1.6]">{t('step2.paragraph')}</p>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="name" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.name.label')} <span className="text-white">*</span></label>
                <input id="name" autoComplete="name" maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder={t('fields.name.placeholder')} aria-invalid={Boolean(errors.name)} className={fieldInput} />
                {errors.name && <small role="alert" className="text-[#f2a6a6] text-[12px] leading-[1.5]">{errors.name}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="email" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.email.label')} <span className="text-white">*</span></label>
                <input id="email" type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder={t('fields.email.placeholder')} aria-invalid={Boolean(errors.email)} className={fieldInput} />
                {errors.email && <small role="alert" className="text-[#f2a6a6] text-[12px] leading-[1.5]">{errors.email}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="company" className="font-mono text-[10px] tracking-[.07em] text-[#b4b4b4]">{t('fields.company.label')} <span className="text-dim">{t('fields.company.optional')}</span></label>
                <input id="company" autoComplete="organization" maxLength={160} value={form.company} onChange={e => update('company', e.target.value)} placeholder={t('fields.company.placeholder')} className={fieldInput} />
              </div>
              <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim mt-[32px]">{t('privacyNoteBefore')}<Link href="/privacy" className="text-white underline underline-offset-4">{t('privacyNoteCta')}</Link></div>
              {submitError && <p className="text-[#f2a6a6] text-[12px] leading-[1.5]" role="alert">{submitError}</p>}
            </div>}
            <div className="flex justify-between items-center border-t border-line pt-[25px] mt-[45px] mobile:mt-[25px]">
              {step > 0 ? <button className="inline-flex items-center gap-[10px] bg-transparent text-mute border-0 py-[14px] font-mono text-[10px] hover:text-white xs:text-[9px]" type="button" onClick={() => { setStep(step - 1); setErrors({}); }}><ArrowLeft size={17} /> {t('prevStep')}</button> : <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('formNotation')}</span>}
              {step < 2 ? <button type="button" className="inline-flex items-center justify-center gap-[20px] min-h-[55px] px-[22px] bg-white border border-white text-black text-[11px] font-extrabold tracking-[.03em] transition-[transform,background] duration-200 hover:bg-[#d5d5d5] hover:-translate-y-[2px] active:scale-[.98] xs:gap-[10px] xs:px-[14px]" onClick={nextStep}>{t('continueCta')} <ArrowRight size={17} /></button> : <button type="submit" className="inline-flex items-center justify-center gap-[20px] min-h-[55px] px-[22px] bg-white border border-white text-black text-[11px] font-extrabold tracking-[.03em] transition-[transform,background] duration-200 hover:bg-[#d5d5d5] hover:-translate-y-[2px] active:scale-[.98] disabled:opacity-60 disabled:cursor-wait xs:gap-[10px] xs:px-[14px]" disabled={submitting}><CirclePower size={18} /> {submitting ? t('submittingCta') : t('submitCta')} <ArrowRight size={17} /></button>}
            </div>
          </form>
        </div>
      </>}
    </main>
  </>;
}

