'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { fit } from '@/lib/fit';

const initial = { project_type: '', project_name: '', brief: '', timeline: '', budget: '', name: '', email: '', company: '' };

// Service ids on /services?type= map to the four project types in the form.
const TYPE_BY_SERVICE = { 'web-applications': 0, 'mobile-apps': 1, 'backend-and-integrations': 2, 'cloud-and-devops': 2, 'performance-and-modernization': 3 };

// 16px keeps iOS Safari from zooming the page when a field gets focus.
const fieldInput = "bg-surface-2 text-fg border border-line-strong rounded-none px-[18px] py-[17px] w-full text-[16px] outline-none transition-colors duration-fast focus:border-ember placeholder:text-fg-4 aria-[invalid=true]:border-[#d88]";

const selectChevronStyle = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='white' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 17px center',
};

export default function IntakeForm() {
  const t = useTranslations('intake');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const types = t.raw('types');
  const timelineOptions = t.raw('timelineOptions');
  const budgetOptions = t.raw('budgetOptions');
  const steps = t.raw('steps');
  const stepLabels = t.raw('stepLabels');
  const completeHeading = t.raw('completeHeading');
  const headingLines = t.raw('headingLines');

  const [step, setStep] = useState(0);
  const presetType = TYPE_BY_SERVICE[searchParams.get('type')];
  const [form, setForm] = useState(() => ({ ...initial, project_type: presetType === undefined ? '' : types[presetType].name }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    if (complete) window.scrollTo({ top: 0 });
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
  // Each step change moves focus to its heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    const heading = document.getElementById('step-heading');
    if (heading && step > 0) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); heading.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
  }, [step]);
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
          locale,
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
    <main id="main" className={cn('shell relative', complete ? 'min-h-dvh pt-[var(--header-h)] pb-0 flex flex-col' : 'pt-[calc(var(--header-h)+40px)] pb-[var(--s-7)] min-h-screen')}>
      <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('sectionTopLeft')}</span><span>{t('sectionTopRight')}</span></div>
      {complete ? <div className="max-w-[950px] pt-[clamp(100px,14vw,190px)] pb-[70px] flex-1 w-full !max-w-none flex flex-col items-center justify-center text-center !py-[clamp(48px,8vh,110px)]">
          <div className="h-[68px] w-[68px] border border-ember text-ember grid place-items-center mb-[32px]"><Icon name="check" size={32} /></div>
          <span className="t-meta uppercase text-fg-3">{t('completeEyebrow')}</span>
          <h1 style={fit(completeHeading, '.')} className="fit t-display-1 uppercase my-[25px] mb-[32px]">{completeHeading[0]}<br />{completeHeading[1]}<span className="dot">.</span></h1>
          <p className="t-lead text-fg-3 max-w-[46ch] mx-auto mb-[38px]">{t('completeMessageTemplate', { name: form.name.trim(), email: form.email.trim() })}</p>
          <div className="flex flex-wrap items-center justify-center gap-[18px]">
            <Link href="/case-studies" className="btn">{t('completeCta')} <Icon name="arrow" size={17} aria-hidden="true" /></Link>
            <Link href="/" className="t-meta uppercase text-fg-3 hover:text-fg">{t('completeSecondaryCta')}</Link>
          </div>
        </div> : <>
        <div className="pt-[var(--s-5)]">
          <span className="t-meta uppercase text-fg-3" data-reveal="fade">{t('headingEyebrow')}</span>
          <h1 style={fit(headingLines, '.')} className="fit t-display-1 uppercase my-[24px]" data-reveal="lines">{headingLines[0]}<br />{headingLines[1]}<span className="dot">.</span></h1>
          <p className="t-lead text-fg-3 max-w-[48ch]" data-reveal="fade">{t('introParagraph')}</p>
        </div>
        <div className="grid grid-cols-12 gap-[var(--col-gap)] mt-[var(--s-5)] border-t border-line pt-[32px] mobile:flex mobile:flex-col mobile:gap-[40px]">
          <aside className="col-span-4 flex flex-col min-h-[560px] mobile:min-h-0">
            <span className="t-meta uppercase text-fg-4">{t('asideLabel')}</span>
            <div className="mt-[38px] mobile:grid mobile:grid-cols-3 mobile:mt-[22px]">
              {steps.map((label, index) => <div className={cn('flex items-center gap-[20px] py-[22px] border-t border-line text-fg-4 t-meta uppercase last:border-b last:border-line mobile:block mobile:border-t-0 mobile:border-b mobile:py-[14px] mobile:pr-[8px] mobile:pl-0', step === index && 'text-fg', step > index && 'text-fg-2')} key={label}>
                <span className="text-inherit mobile:block mobile:mb-[6px]">0{index + 1}</span><span>{label}</span>{step > index && <Icon name="check" size={15} className="mobile:hidden" />}
              </div>)}
            </div>
            <p className="t-small text-fg-4 max-w-[30ch] mt-[42px] mobile:hidden">{t('asideParagraph')}</p>
            <div className="t-meta uppercase mt-auto text-fg-4 flex items-center gap-[10px] mobile:hidden">{t('asideStatus')} <span className="inline-block w-[6px] h-[6px] bg-ember flex-none align-middle" aria-hidden="true" /></div>
          </aside>
          <form onSubmit={submit} noValidate className="col-span-7 col-start-6">
            <div className="flex justify-between text-fg-4 t-meta uppercase"><span>{t('stepCountTemplate', { step: step + 1 })}</span><span>{stepLabels[step]}</span></div>
            {step === 0 && <div className="min-h-[470px] pt-[40px] mobile:pt-[30px] mobile:min-h-0">
              <h2 id="step-heading" className="t-title uppercase scroll-mt-[calc(var(--header-h)+24px)]">{t('step0.heading')}</h2>
              <p className="t-body text-fg-3 mt-[13px]">{t('step0.paragraph')}</p>
              <div className="grid grid-cols-2 gap-[12px] mt-[43px] xs:gap-[8px]" role="group" aria-label={t('step0.groupAriaLabel')}>
                {types.map((type, i) => <button type="button" key={type.name} className={cn('bg-surface-2 border border-line text-fg text-left min-h-[168px] p-[21px] flex flex-col relative transition-colors duration-fast hover:border-fg-3 press xs:min-h-[150px] xs:p-[13px]', form.project_type === type.name && 'border-ember')} aria-pressed={form.project_type === type.name} onClick={() => update('project_type', type.name)}>
                  <span className="t-meta text-fg-4">0{i + 1}</span>
                  <span className="t-title-sm mt-auto">{type.name}</span>
                  <span className="t-meta text-fg-3 mt-[6px] normal-case">{type.detail}</span>
                  <span className={cn('absolute right-[20px] top-[20px] text-fg-3 xs:right-[12px] xs:top-[12px]', form.project_type === type.name && 'text-ember')}>{form.project_type === type.name && <Icon name="check" size={17} aria-hidden="true" />}</span>
                </button>)}
              </div>
              {errors.project_type && <p className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]" role="alert">{errors.project_type}</p>}
            </div>}
            {step === 1 && <div className="min-h-[470px] pt-[40px] mobile:pt-[30px] mobile:min-h-0">
              <h2 id="step-heading" className="t-title uppercase scroll-mt-[calc(var(--header-h)+24px)]">{t('step1.heading')}</h2>
              <p className="t-body text-fg-3 mt-[13px]">{t('step1.paragraph')}</p>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="project_name" className="t-meta uppercase text-fg-2">{t('fields.projectName.label')} <span className="text-ember">*</span></label>
                <input id="project_name" maxLength={160} autoComplete="off" value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder={t('fields.projectName.placeholder')} aria-invalid={Boolean(errors.project_name)} className={fieldInput} />
                {errors.project_name && <small role="alert" className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]">{errors.project_name}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="brief" className="t-meta uppercase text-fg-2">{t('fields.brief.label')} <span className="text-ember">*</span></label>
                <textarea id="brief" rows={6} maxLength={5000} value={form.brief} onChange={e => update('brief', e.target.value)} placeholder={t('fields.brief.placeholder')} aria-invalid={Boolean(errors.brief)} className={cn(fieldInput, 'resize-y min-h-[155px]')} />
                {errors.brief && <small role="alert" className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]">{errors.brief}</small>}
              </div>
              <div className="grid grid-cols-2 gap-[14px] xs:grid-cols-1 xs:gap-0">
                <div className="flex flex-col gap-[10px] mt-[28px]">
                  <label htmlFor="timeline" className="t-meta uppercase text-fg-2">{t('fields.timeline.label')}</label>
                  <select id="timeline" value={form.timeline} onChange={e => update('timeline', e.target.value)} className={cn(fieldInput, 'appearance-none')} style={selectChevronStyle}>
                    <option value="">{t('fields.timeline.placeholder')}</option>
                    {timelineOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-[10px] mt-[28px]">
                  <label htmlFor="budget" className="t-meta uppercase text-fg-2">{t('fields.budget.label')}</label>
                  <select id="budget" value={form.budget} onChange={e => update('budget', e.target.value)} className={cn(fieldInput, 'appearance-none')} style={selectChevronStyle}>
                    <option value="">{t('fields.budget.placeholder')}</option>
                    {budgetOptions.map(option => <option key={option}>{option}</option>)}
                  </select>
                </div>
              </div>
            </div>}
            {step === 2 && <div className="min-h-[470px] pt-[40px] mobile:pt-[30px] mobile:min-h-0">
              <h2 id="step-heading" className="t-title uppercase scroll-mt-[calc(var(--header-h)+24px)]">{t('step2.heading')}</h2>
              <p className="t-body text-fg-3 mt-[13px]">{t('step2.paragraph')}</p>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="name" className="t-meta uppercase text-fg-2">{t('fields.name.label')} <span className="text-ember">*</span></label>
                <input id="name" autoComplete="name" maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder={t('fields.name.placeholder')} aria-invalid={Boolean(errors.name)} className={fieldInput} />
                {errors.name && <small role="alert" className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]">{errors.name}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="email" className="t-meta uppercase text-fg-2">{t('fields.email.label')} <span className="text-ember">*</span></label>
                <input id="email" type="email" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder={t('fields.email.placeholder')} aria-invalid={Boolean(errors.email)} className={fieldInput} />
                {errors.email && <small role="alert" className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]">{errors.email}</small>}
              </div>
              <div className="flex flex-col gap-[10px] mt-[28px]">
                <label htmlFor="company" className="t-meta uppercase text-fg-2">{t('fields.company.label')} <span className="text-fg-4">{t('fields.company.optional')}</span></label>
                <input id="company" autoComplete="organization" maxLength={160} value={form.company} onChange={e => update('company', e.target.value)} placeholder={t('fields.company.placeholder')} className={fieldInput} />
              </div>
              <div className="t-meta uppercase text-fg-4 mt-[32px]">{t('privacyNoteBefore')}<Link href="/privacy" target="_blank" className="text-fg underline underline-offset-4">{t('privacyNoteCta')}</Link></div>
              {submitError && <p className="text-[#f2a6a6] t-small text-[12px] leading-[1.5]" role="alert">{submitError}</p>}
            </div>}
            <div className="flex justify-between items-center border-t border-line pt-[25px] mt-[45px] mobile:mt-[25px]">
              {step > 0 ? <button className="inline-flex items-center gap-[10px] bg-transparent text-fg-3 border-0 py-[14px] t-meta uppercase hover:text-fg" type="button" onClick={() => { setStep(step - 1); setErrors({}); }}><Icon name="left" size={17} aria-hidden="true" /> {t('prevStep')}</button> : <span className="t-meta uppercase text-fg-4">{t('emailFallbackPrefix')} <a href="mailto:hello@alaz.pro" className="text-fg lowercase hover:text-ember-soft">hello@alaz.pro</a></span>}
              {step < 2 ? <button key="next" type="button" className="btn" onClick={nextStep}>{t('continueCta')} <Icon name="arrow" size={17} aria-hidden="true" /></button> : <button key="submit" type="submit" className="btn disabled:opacity-60 disabled:cursor-wait" disabled={submitting}>{submitting ? t('submittingCta') : t('submitCta')} <Icon name="arrow" size={17} aria-hidden="true" /></button>}
            </div>
          </form>
        </div>
      </>}
    </main>
  </>;
}

