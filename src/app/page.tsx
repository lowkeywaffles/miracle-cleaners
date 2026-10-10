"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChatCircleText, Check, CoatHanger, Hourglass, MagnifyingGlass, MapPin, NavigationArrow, Phone, Sparkle, UserCircle } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19726909266", PHONE = "(972) 690-9266";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=1329+W+Campbell+Rd+Richardson+TX+75080";
const HOURS: Hours = { 0: null, 1: [7, 19], 2: [7, 19], 3: [7, 19], 4: [7, 19], 5: [7, 19], 6: [8.5, 17.5] };
const TILES = [["t2", CoatHanger], ["t3", MagnifyingGlass], ["t4", Hourglass], ["t5", ChatCircleText]] as const;
const BUBBLES = [[8, 60, 15, 0], [18, 28, 11, 3], [30, 44, 17, 6], [52, 22, 13, 1], [64, 54, 19, 8], [76, 32, 12, 4], [86, 40, 16, 10], [92, 24, 10, 2]];

const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-bold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-14px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3.5 block font-display text-xs font-bold tracking-[.16em] text-aquatext uppercase";

/** Language: a sewn-in care label; the ribbon rolls to the other language. */
function CareLabel() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"}
      className="relative h-[38px] w-[62px] flex-none cursor-pointer overflow-hidden rounded-[3px] bg-white shadow-[0_0_0_1px_var(--line),0_4px_10px_-4px_var(--shadow)] before:absolute before:inset-y-[3px] before:left-[5px] before:z-10 before:border-l-[1.5px] before:border-dashed before:border-[#9cc6cf] after:absolute after:inset-y-[3px] after:right-[5px] after:z-10 after:border-l-[1.5px] after:border-dashed after:border-[#9cc6cf]">
      <motion.span animate={{ y: es ? -38 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="absolute inset-x-0 top-0">
        {["EN", "ES"].map(l => <span key={l} className="flex h-[38px] items-center justify-center gap-1 font-display text-[13px] font-extrabold tracking-[.06em] text-[#173a4a]">{l}<small className="text-[9px] opacity-55">✓</small></span>)}
      </motion.span>
    </button>
  );
}

/** Theme: a soap bubble; it pops and re-forms with the other theme. */
function Bubble() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  const [n, setN] = useState(0);
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={e => { setN(x => x + 1); flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark"))); }}
      className="relative size-[46px] flex-none cursor-pointer rounded-full bg-[linear-gradient(135deg,#d6f1f5,#e9e1ff)] shadow-[inset_0_0_0_1px_var(--line)] dark:bg-[linear-gradient(135deg,#123040,#1d1f3a)]">
      <span key={n} className={cn("soap absolute inset-[3px] shadow-[inset_0_0_0_1.5px_var(--line),0_3px_8px_-3px_var(--shadow)]", n && "pop", dark && "bg-[radial-gradient(circle_at_32%_28%,#fff_0_8%,transparent_9%),radial-gradient(circle_at_62%_60%,#e8f6f8_0_6%,transparent_7%),radial-gradient(circle_at_50%_50%,rgba(23,58,74,.6)_56%,rgba(169,139,245,.5)_74%,rgba(99,211,230,.6)_90%,rgba(245,155,208,.6)_100%)]")} />
    </button>
  );
}

/** Hero art: an iridescent ring turning around a "checked by hand" card. */
function Halo() {
  const t = useT();
  return (
    <div className="relative grid aspect-square w-full max-w-[460px] place-items-center" aria-hidden="true">
      <div className="ring-spin absolute inset-0 rounded-full p-[3px] [background:conic-gradient(from_0deg,#63d3e6,#a98bf5,#f59bd0,#63d3e6)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]" />
      <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,.7),transparent_55%),radial-gradient(circle,var(--tint),transparent_70%)]" />
      <div className="glass relative w-[62%] rounded-[28px] p-7 text-center shadow-[inset_0_0_0_1px_var(--line),0_40px_80px_-40px_var(--shadow)]">
        <span className="iri-bg mx-auto mb-4 grid size-16 place-items-center rounded-2xl text-white"><Sparkle size={34} weight="fill" /></span>
        <b className="mb-1 block font-display text-[22px] tracking-tight" dangerouslySetInnerHTML={{ __html: t("haloT") }} />
        <span className="text-sm text-soft" dangerouslySetInnerHTML={{ __html: t("haloP") }} />
      </div>
    </div>
  );
}

/** Reweaving: threads cross the tile and weave themselves in when it scrolls into view. */
function Weave() {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".thread", { scaleX: 0, transformOrigin: "0 50%", stagger: 0.06, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.from(".weft", { scaleY: 0, transformOrigin: "50% 0", stagger: 0.06, duration: 0.9, ease: "power3.out", delay: 0.3, scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    });
  }, { scope: ref });
  return (
    <svg ref={ref} viewBox="0 0 200 120" className="pointer-events-none absolute right-6 bottom-6 h-28 w-48 opacity-70 max-sm:hidden rtl:right-auto rtl:left-6" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => <rect key={`h${i}`} className="thread" x="0" y={i * 15 + 4} width="200" height="7" rx="3.5" fill={i % 2 ? "#63d3e6" : "#a98bf5"} opacity=".55" />)}
      {Array.from({ length: 12 }, (_, i) => <rect key={`v${i}`} className="weft" x={i * 17 + 4} y="0" width="7" height="120" rx="3.5" fill={i % 2 ? "#f59bd0" : "#ffffff"} opacity=".45" />)}
    </svg>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[72px] max-w-[1160px] items-center justify-between gap-3 rounded-full border border-line ps-3 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2.5" aria-label="Miracle Cleaners">
            <span className="grid size-11 place-items-center rounded-full bg-lagoon"><span className="soap size-7" /></span>
            <span><b className="block font-display text-[19px] leading-none font-bold tracking-tight">Miracle Cleaners</b><T k="logoSub" className="mt-0.5 block text-xs font-semibold text-soft max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-semibold max-[900px]:hidden">
            {[["services", "navServices"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-2.5">
            <CareLabel /><Bubble />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden pt-16 pb-24 max-sm:pt-10">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            {BUBBLES.map(([x, s, tm, d], i) => <span key={i} className="soap drift absolute -bottom-20" style={{ left: `${x}%`, width: s, height: s, ["--t" as string]: `${tm}s`, ["--dx" as string]: `${(i % 2 ? 1 : -1) * 30}px`, animationDelay: `-${d}s` }} />)}
          </div>
          <Wrap className="grid grid-cols-[1.1fr_.9fr] items-center gap-12 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-sm font-semibold shadow-[inset_0_0_0_1px_var(--line)]">
                  <i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a] shadow-[0_0_0_4px_rgba(34,163,90,.2)]" : "bg-[#9ab0b6]")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(52px,7vw,100px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[48ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="flex flex-wrap gap-3">
                <a href={TEL} className={primary}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
              </Reveal>
            </div>
            <Reveal delay={0.12} className="w-full max-w-[460px] justify-self-end max-[960px]:justify-self-center"><Halo /></Reveal>
          </Wrap>
        </section>

        <section id="services" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="svcLead" as="p" className="max-w-[56ch] text-[17px] text-soft" /></Reveal>
            <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
              <Reveal className="rounded-[28px] bg-card p-1.5 shadow-[inset_0_0_0_1px_var(--line)] md:col-span-2 md:row-span-2">
                <div className="relative h-full overflow-hidden rounded-[23px] bg-lagoon p-10 text-[#e8f6f8] max-sm:p-7">
                  <span className="iri-bg mb-10 grid size-16 place-items-center rounded-2xl text-white"><Sparkle size={32} weight="fill" /></span>
                  <T k="t1t" as="h3" className="mb-3 text-[clamp(40px,4.4vw,60px)]" />
                  <T k="t1p" as="p" className="max-w-[42ch] text-[17px] text-[#b8d4da]" />
                  <Weave />
                </div>
              </Reveal>
              {TILES.map(([k, Icon], i) => (
                <Reveal key={k} delay={(i % 2) * 0.07} className="rounded-[24px] bg-card p-1.5 shadow-[inset_0_0_0_1px_var(--line)] transition-transform duration-500 ease-silk hover:-translate-y-1">
                  <MagicCard gradientSize={220} gradientColor="rgba(169,139,245,.12)" gradientFrom="#63d3e6" gradientTo="#f59bd0" className="h-full rounded-[19px] [&>div:last-child]:h-full">
                    <div className="flex h-full flex-col justify-between gap-6 p-6">
                      <span className="grid size-11 place-items-center rounded-2xl bg-tint text-aquatext"><Icon size={22} weight="duotone" /></span>
                      <div><T k={`${k}t`} as="h3" className="mb-1.5 text-[21px]" /><T k={`${k}p`} as="p" className="text-[14.5px] text-soft" /></div>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="relative grid grid-cols-[auto_1fr] items-center gap-12 overflow-hidden rounded-[32px] bg-card p-12 shadow-[inset_0_0_0_1px_var(--line),0_40px_80px_-50px_var(--shadow)] max-[800px]:grid-cols-1 max-sm:p-7">
              <BorderBeam size={220} duration={10} colorFrom="#63d3e6" colorTo="#f59bd0" borderWidth={1.5} />
              <span className="iri-bg grid size-40 place-items-center rounded-full p-1 max-sm:size-28"><span className="grid size-full place-items-center rounded-full bg-card text-aquatext"><UserCircle size={72} weight="duotone" /></span></span>
              <div>
                <T k="ownerEyebrow" className={eyebrow} />
                <T k="ownerTitle" as="h3" className="mb-6 text-[clamp(30px,3.4vw,46px)]" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {["o1", "o2", "o3", "o4"].map(k => <li key={k} className="flex items-start gap-3"><span className="iri-bg mt-0.5 grid size-6 flex-none place-items-center rounded-full text-white"><Check size={13} weight="bold" /></span><T k={k} /></li>)}
                </ul>
              </div>
            </Reveal>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(42px,5.6vw,72px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="grid content-start gap-5 rounded-[28px] bg-card p-8 shadow-[inset_0_0_0_1px_var(--line)]">
                <T k="hoursTitle" as="h3" className="text-[30px]" />
                <HoursTable hours={HOURS} accent="text-aquatext font-bold" />
                {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "1329 W Campbell Rd", null]] as const).map(([href, I, strong, sub]) => (
                  <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                    <span className="grid size-11 flex-none place-items-center rounded-full bg-tint text-aquatext transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} weight="bold" /></span>
                    <span><strong className="block">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Richardson, TX 75080</span>}</span>
                  </a>
                ))}
              </Reveal>
              <Reveal delay={0.08} className="min-h-[440px] overflow-hidden rounded-[28px] shadow-[inset_0_0_0_1px_var(--line)]"><MapFrame q="1329+W+Campbell+Rd,+Richardson,+TX+75080" className="min-h-[440px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(42px,5.6vw,72px)]" /></Reveal>
            <Faq ids={[1, 2, 3]} accent="text-aquatext" />
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-lagoon px-14 py-20 text-[#e8f6f8] max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
              {[[8, 70, 40], [80, 20, 90], [60, 70, 24]].map(([x, y, s], i) => <span key={i} className="soap absolute opacity-60" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }} aria-hidden="true" />)}
              <div className="relative"><T k="ctaTitle" as="h2" className="mb-3 text-[clamp(42px,5.6vw,76px)]" /><T k="ctaLead" as="p" className="text-lg text-[#9ab5bd]" /></div>
              <a href={TEL} className={cn(btn, "iri-bg relative flex-none px-8 py-4 text-lg text-[#11303c]")}><Phone size={20} weight="bold" />{PHONE}</a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Miracle Cleaners · 1329 W Campbell Rd, Richardson, TX 75080</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
