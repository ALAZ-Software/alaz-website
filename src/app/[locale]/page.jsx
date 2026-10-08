import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { fit } from '@/lib/fit';
import HeatField from '@/components/HeatField';

const GridLines = () => <div className="grid-lines" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return buildMetadata({ locale, path: '', title: t('title'), description: t('description'), absoluteTitle: true });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tRoot = await getTranslations();
  const services = tRoot.raw('services');
  const projects = tRoot.raw('projects');
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  const facts = t.raw('hero.facts');
  const selectedHeading = t.raw('selected.heading');
  const capabilitiesHeading = t.raw('capabilities.heading');
  const writingHeading = t.raw('writing.heading');
  const startHeading = t.raw('start.heading');
  const count = String(projects.length).padStart(2, '0');

  return (
    <main id="main">
      {/* Hero: the wordmark over the working edge of the flame. */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink" aria-labelledby="hero-title">
        <div className="heat-field-wrap"><HeatField variant="hero" /></div>
        <GridLines />
        <div className="shell relative z-[1] min-h-[100svh] flex flex-col pt-[var(--header-h)]">
          <div className="eyebrow t-meta uppercase text-fg-3 mt-[28px]" data-reveal="line">
            <span>{t('hero.toplineLeft')}</span><span className="mobile:hidden">{t('hero.toplineRight')}</span>
          </div>
          <div className="my-auto py-[clamp(48px,8vh,120px)]">
            <p className="t-meta uppercase text-fg-3 mb-[12px]" data-reveal="fade">{t('hero.kicker')}</p>
            <p className="font-display font-black leading-[.8] tracking-[-.03em] -ml-[.044em] whitespace-nowrap text-[length:clamp(96px,17vw,340px)]" aria-hidden="true" data-reveal="lines">{t('hero.wordmark')}<span className="dot text-[.7em] tracking-[-.1em]">.</span></p>
            <div className="grid grid-cols-12 gap-[var(--col-gap)] mt-[clamp(36px,5vw,72px)] mobile:flex mobile:flex-col mobile:gap-[24px]">
              <h1 id="hero-title" className="t-title uppercase col-span-7 max-w-[16ch]" data-reveal="lines" data-delay="0.15">{t('hero.taglineTop')}<br />{t('hero.taglineBottom')}</h1>
              <p className="t-body text-fg-2 col-span-4 col-start-9 max-w-[38ch] mobile:max-w-none" data-reveal="fade" data-delay="0.35">{t('hero.intro')}</p>
            </div>
            <ul className="t-meta text-fg-3 flex flex-wrap gap-x-[32px] gap-y-[12px] mt-[clamp(32px,4vw,64px)] mobile:flex-col mobile:gap-y-[10px]" data-reveal="fade" data-delay="0.5">
              {facts.map((f) => <li key={f.label}>
                {f.external
                  ? <a href={f.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[8px] hover:text-fg"><span className="text-fg">{f.label}</span> — {f.value} <Icon name="external" size={13} /></a>
                  : <Link href={f.href} className="hover:text-fg"><span className="text-fg">{f.label}</span> — {f.value}</Link>}
              </li>)}
            </ul>
          </div>
          <div className="t-meta uppercase text-fg-3 flex items-center justify-between pt-[22px] pb-[28px] border-t border-line-strong">
            <a href="#work" className="flex items-center gap-[10px] hover:text-fg">{t('hero.seeWork')} <Icon name="down" size={14} /></a>
            <a href={`mailto:${t('hero.email')}`} className="hover:text-fg lowercase">{t('hero.email')}</a>
          </div>
        </div>
      </section>

      {/* Work: the products are the proof. */}
      <section className="shell bg-surface pb-[var(--s-5)]" id="work" aria-labelledby="work-title">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('selected.eyebrowLeft')}</span><span>{t('selected.eyebrowRight', { count })}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[var(--s-5)] mb-[var(--s-4)] mobile:flex-col mobile:items-start">
          <h2 id="work-title" style={fit(selectedHeading, '.')} className="fit t-display-1 uppercase" data-reveal="lines">{selectedHeading[0]}<br />{selectedHeading[1]}<span className="dot">.</span></h2>
          <Link href="/case-studies" className="btn-ghost" data-magnetic>{t('selected.viewAllCta')} <Icon name="arrow" size={15} /></Link>
        </div>
        <div className="grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-[var(--s-5)] mobile:flex mobile:flex-col mobile:gap-y-[40px]">
          {projects.map((project, i) => (
            <article key={project.slug} className={cn('group flex flex-col col-span-6', i % 2 === 1 && 'laptop:col-span-6 wide:mt-[var(--s-6)]')} data-reveal="fade" data-delay={i * 0.1}>
              <Link href={`/case-studies/${project.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2 border border-line" aria-label={project.name} data-cursor="VIEW">
                <Image src={project.image} alt={project.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" data-parallax="6" />
              </Link>
              <div className="pt-[22px] pb-[20px] border-b border-line flex flex-col">
                <div className="t-meta uppercase flex items-center justify-between text-fg-4 mb-[10px]">
                  <span>{project.number} / {project.discipline}</span>
                  {project.link
                    ? <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] text-fg hover:text-ember-soft"><span className="inline-block w-[6px] h-[6px] bg-ember" aria-hidden="true" /> {t('selected.liveLabel')} · {project.link.label} <Icon name="external" size={11} /></a>
                    : <span className="tablet:hidden">{project.type}</span>}
                </div>
                <h3 className="t-title"><Link href={`/case-studies/${project.slug}`} className="transition-colors group-hover:text-fg-2">{project.name}</Link></h3>
                <p className="t-small text-fg-3 mt-[10px] max-w-[60ch]">{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services: a list, each row links to its section on the services page. */}
      <section className="shell bg-ink pb-[var(--s-6)]" id="services" aria-labelledby="services-title">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('capabilities.eyebrowLeft')}</span><span>{t('capabilities.eyebrowRight')}</span></div>
        <div className="grid grid-cols-12 gap-[var(--col-gap)] mt-[var(--s-5)] mb-[var(--s-4)] items-end mobile:flex mobile:flex-col mobile:items-start">
          <h2 id="services-title" style={fit(capabilitiesHeading, '.')} className="fit t-display-1 uppercase col-span-7" data-reveal="lines">{capabilitiesHeading[0]}<br />{capabilitiesHeading[1]}<span className="dot">.</span></h2>
          <div className="col-span-4 col-start-9 flex flex-col gap-[24px] items-start">
            <p className="t-body text-fg-3" data-reveal="fade">{t('capabilities.lead')}</p>
            <Link href="/services" className="link-draw t-meta uppercase">{t('capabilities.exploreCta')} <Icon name="arrow" size={14} /></Link>
          </div>
        </div>
        <ol className="border-t border-line">
          {services.map((service, i) => <li key={service.number} data-reveal="fade" data-delay={i * 0.08}>
            <Link href={service.href} className="group grid grid-cols-12 gap-[var(--col-gap)] items-start py-[clamp(28px,3vw,44px)] border-b border-line transition-colors duration-fast hover:bg-surface mobile:flex mobile:flex-col mobile:gap-[14px]" data-cursor="OPEN">
              <span className="t-meta text-fg-4 col-span-1 pt-[10px]">{service.number}</span>
              <span className="col-span-5 flex flex-col gap-[10px]">
                <span className="t-meta uppercase text-fg-4">{service.category}</span>
                <h3 style={fit(service.title)} className="fit t-display-2 uppercase [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.4)] mobile:[--fit-avail:calc(100vw_-_2*var(--shell-pad))] transition-colors group-hover:text-ember-hot">{service.title}</h3>
              </span>
              <span className="col-span-5 col-start-8 flex flex-col gap-[10px] pt-[6px]">
                <span className="t-body text-fg-2">{service.description}</span>
                <span className="t-small text-fg-4">{service.detail}</span>
              </span>
              <Icon name="arrow" size={22} className="col-span-1 justify-self-end pt-[8px] text-fg-3 transition-transform duration-fast group-hover:translate-x-[6px] mobile:hidden" />
            </Link>
          </li>)}
        </ol>
      </section>

      {/* Latest posts. */}
      <section className="shell bg-surface pb-[var(--s-6)]" id="writing" aria-labelledby="writing-title">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('writing.eyebrowLeft')}</span><span>{t('writing.eyebrowRight')}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[var(--s-5)] mb-[var(--s-4)] mobile:flex-col mobile:items-start">
          <h2 id="writing-title" style={fit(writingHeading, '.')} className="fit t-display-2 uppercase" data-reveal="lines">{writingHeading[0]}<br />{writingHeading[1]}<span className="dot">.</span></h2>
          <Link href="/blog" className="link-draw t-meta uppercase">{t('writing.allCta')} <Icon name="arrow" size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 border-t border-line mobile:grid-cols-1">
          {posts.map((post, i) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col border-b border-line border-r border-line p-[30px_32px_28px] even:border-r-0 transition-colors duration-fast hover:bg-surface-2 mobile:border-r-0 mobile:px-0 mobile:py-[24px]" data-reveal="fade" data-delay={i * 0.08} data-cursor="READ">
            <div className="t-meta uppercase flex justify-between text-fg-4"><span>{post.tag}</span><time dateTime={post.date}>{post.dateLabel}</time></div>
            <h3 className="t-title mt-[18px] mb-[12px] max-w-[22ch]">{post.title}</h3>
            <p className="t-small text-fg-3 max-w-[60ch]">{post.excerpt}</p>
            <span className="t-meta uppercase inline-flex items-center gap-[7px] text-fg-2 mt-[22px] transition-[gap] duration-fast group-hover:gap-[12px]">{t('writing.readCta')} <Icon name="arrow" size={14} /></span>
          </Link>)}
        </div>
      </section>

      {/* Start a project: the edge again, thinner. */}
      <section className="relative overflow-hidden bg-ink" id="contact" aria-labelledby="start-title">
        <div className="heat-field-wrap"><HeatField variant="hero" /></div>
        <div className="shell relative z-[1] min-h-[640px] flex flex-col">
          <div className="eyebrow t-meta uppercase mt-[var(--s-4)] text-fg-2" data-reveal="line"><span>{t('start.eyebrowLeft')}</span><span>{t('start.eyebrowRight')}</span></div>
          <div className="my-auto py-[var(--s-5)] grid grid-cols-12 gap-[var(--col-gap)] items-end mobile:flex mobile:flex-col mobile:items-start">
            <div className="col-span-8">
              <h2 id="start-title" style={fit(startHeading, '.')} className="fit t-display-1 uppercase" data-reveal="lines">{startHeading[0]}<br />{startHeading[1]}<span className="dot">.</span></h2>
              <p className="t-body text-fg-2 max-w-[52ch] mt-[28px]" data-reveal="fade">{t('start.paragraph')}</p>
            </div>
            <div className="col-span-4 flex flex-col gap-[18px] items-start laptop:items-start">
              <Link href="/start-project" className="btn" data-magnetic>{t('start.button')} <Icon name="arrow" size={15} /></Link>
              <span className="t-meta uppercase text-fg-3">{t('start.emailPrefix')} <a href={`mailto:${t('hero.email')}`} className="text-fg lowercase hover:text-ember-soft">{t('hero.email')}</a></span>
            </div>
          </div>
          <div className="t-meta uppercase text-fg-3 flex justify-between pt-[22px] pb-[28px] border-t border-line"><span>{t('start.bottomNote')}</span><span className="mobile:hidden">{t('hero.toplineRight')}</span></div>
        </div>
      </section>
    </main>
  );
}
