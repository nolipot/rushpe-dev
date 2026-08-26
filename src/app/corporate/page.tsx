// src/app/corporate/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./corporate-page.css";

/* -------------------------------- Fonts -------------------------------- */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ------------------------------- Hero image ----------------------------- */
import ssmImg from "@/../public/she-swe-meet/she-swe-meet-logo.png";

/* -------------------------------- Data --------------------------------- */
import type { Company, SponsorTiers, LogoLink, Organizer } from "./data/types";
import { SPONSORS } from "./data/sponsor-tiers";
import { ATTENDING_COMPANIES } from "./data/attending-companies";
import { ATTENDING_UNIS } from "./data/attending-unis";
import { LogoMarquee } from "./data/marquee";

/* ----------------------------- Organizers ------------------------------ */
import ruShpeLogo from "@/../public/she-swe-meet/ru-shpe-logo.jpg";
import ruMeetLogo from "@/../public/she-swe-meet/ru-meet-logo.jpg";
import ruSweLogo from "@/../public/she-swe-meet/ru-swe-logo.jpg";

const ORGANIZERS: Organizer[] = [
  { name: "Rutgers SHE (SHPE)", href: "https://www.rushpe.org/", logo: ruShpeLogo, cta: "About Rutgers SHE" },
  { name: "Rutgers SWE", href: "https://swe.rutgers.edu/", logo: ruSweLogo, cta: "About Rutgers SWE" },
  { name: "Rutgers MEET", href: "https://rutgers.campuslabs.com/engage/organization/MEET", logo: ruMeetLogo, cta: "About Rutgers MEET" },
];

/* -------------------------------- Icons -------------------------------- */
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3z" />
    </svg>
  );
}

/* -------------------------------- Hooks -------------------------------- */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            (target as HTMLElement).classList.add("show");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax(
  opts: { multiplier?: number; maxShift?: number; disableBelow?: number } = {}
) {
  const { multiplier = 0.08, maxShift = 18, disableBelow = 1024 } = opts;
  const [shift, setShift] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const check = () => setEnabled(!reduced && window.innerWidth >= disableBelow);
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, [disableBelow]);

  useEffect(() => {
    if (!enabled) {
      if (raf.current) cancelAnimationFrame(raf.current);
      setShift(0);
      return;
    }
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const raw = window.scrollY * multiplier;
        const clamped = Math.max(-maxShift, Math.min(maxShift, raw));
        setShift(clamped);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, multiplier, maxShift]);

  return { shift, enabled };
}

/* ------------------------------ UI Components -------------------------- */
function CompanyTile({ company }: { company: Company }) {
  return (
    <Link
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={company.name}
      className="soft-card glass-card relative flex items-center justify-center rounded-2xl bg-white/65 border border-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className="pointer-events-none flex h-24 w-full items-center justify-center px-6 sm:h-28">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            className={`max-h-12 sm:max-h-14 w-auto object-contain ${company.logoClassName ?? ""}`}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 200px"
          />
        ) : (
          <span className="text-lg font-semibold text-slate-700">
            {company.textFallback ?? company.name}
          </span>
        )}
      </div>
    </Link>
  );
}

function CompanyGrid({ items }: { items: Company[] }) {
  return (
    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((c) => (
        <CompanyTile key={c.name} company={c} />
      ))}
    </div>
  );
}

function OrgCard({ name, logo, href, cta }: Organizer) {
  return (
    <div
      data-reveal
      className="reveal group relative rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_10px_30px_rgba(2,6,23,.08)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(2,6,23,.14)] hover:-translate-y-1"
    >
      <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
        <div className="relative h-44 w-full flex items-center justify-center">
          <Image
            src={logo}
            alt={`${name} logo`}
            className="max-h-44 w-auto object-contain drop-shadow-sm"
            sizes="(max-width:640px) 80vw, 320px"
          />
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill inline-flex items-center gap-2"
          aria-label={cta}
        >
          {cta}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="1.5" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-12 rounded-b-[2rem] bg-white/50 blur-2xl opacity-40" />
    </div>
  );
}

function MiniLogoTile({ item }: { item: LogoLink }) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.name}
      className="logo-tile-mini"
    >
      <Image
        src={item.logo}
        alt={`${item.name} logo`}
        className="logo-img-mini"
        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 15vw, 120px"
      />
    </Link>
  );
}

function MiniLogoGrid({ items }: { items: LogoLink[] }) {
  return <div className="logo-grid-mini">{items.map((x) => <MiniLogoTile key={x.name} item={x} />)}</div>;
}

/* --------------------------------- Page -------------------------------- */
export default function Corporate() {
  useReveal();
  const { shift, enabled } = useParallax({ multiplier: 0.08, maxShift: 18, disableBelow: 1024 });
  const { platinum, gold, silver, bronze } = SPONSORS as SponsorTiers;

  return (
    <main className={`${plusJakarta.className} overflow-x-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100`}>
      {/* -------------------------------- HERO ------------------------------- */}
      <section className="hero-section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-sky-400 to-fuchsia-400" />
          <div className="absolute -bottom-40 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-amber-300 to-rose-300" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6 text-center lg:text-left">
              <h1
                data-reveal
                className="hero-title reveal text-[42px] leading-[1.05] text-slate-900 sm:text-6xl font-extrabold tracking-tight"
              >
                SHE–SWE–MEET Career Fair
              </h1>
              <p data-reveal className="reveal mt-5 text-[17px] leading-7 text-slate-700 font-medium max-w-2xl">
                The SHE-SWE-MEET Engineering and Computer Science Career Fair is an annual event
                where we partner up with other Rutgers engineering minority societies including the
                National Society of Black Engineers and the Society of Women Engineers. This is one
                of the largest student-run career fairs on campus! With over 50 companies and
                hundreds of students attending the career fair seeking corporate opportunities.
                Please contact our External Vice President at external.vp@rushpe.org for further
                information.
              </p>
              <div data-reveal className="reveal mt-6 flex flex-wrap items-center lg:justify-start justify-center gap-2">
                <span className="chip">40th Annual</span>
                <span className="chip">October 3, 2025</span>
                <span className="chip">10AM – 2PM</span>
                <span className="chip">50+ Companies</span>
                <span className="chip">Internship Opportunities</span>
                <span className="chip">Full-time Positions</span>
                <span className="chip">Networking</span>
                <span className="chip">Resume Building</span>
                <span className="chip">Professional Development</span>
                <span className="chip">Hundreds of Students</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                data-reveal
                className="reveal parallax-card relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 bg-white/70 backdrop-blur transition-transform duration-300 will-change-transform"
                style={enabled ? { transform: `translate3d(0, ${-shift}px, 0)` } : undefined}
              >
                <Image
                  src={ssmImg}
                  alt="SHE–SWE–MEET Career Fair event flyer"
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------- Sponsors ribbon header --------------------- */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-10">
          <div className="relative flex items-center justify-center">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="sponsor-ribbon-lg">
                <SparkleIcon className="h-5 w-5 mr-3 opacity-80" />
                <span className="sm:hidden">Thanks to Our Sponsors</span>
                <span className="hidden sm:inline">Special Thanks to Our Sponsors</span>
                <SparkleIcon className="h-5 w-5 ml-3 opacity-80" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- Marquee ---------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        {/* line removed: no ring/border, still clipped */}
        <div className="marquee-clip relative overflow-hidden rounded-2xl isolate">
          <LogoMarquee />
        </div>
      </div>

      {/* --------------------------- Sponsor grids -------------------------- */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5" data-reveal>
              <h3 className="text-3xl font-extrabold shiny-platinum text-center">Platinum Sponsors</h3>
              <CompanyGrid items={platinum} />
            </div>
            <div className="flex flex-col gap-5" data-reveal>
              <h3 className="text-3xl font-extrabold text-amber-500 text-center">Gold Sponsor</h3>
              <CompanyGrid items={gold} />
            </div>
            <div className="flex flex-col gap-5" data-reveal>
              <h3 className="text-3xl font-extrabold text-slate-400 text-center">Silver Sponsor</h3>
              <CompanyGrid items={silver} />
            </div>
            <div className="flex flex-col gap-5" data-reveal>
              <h3 className="text-3xl font-extrabold text-amber-600 text-center">Bronze Sponsors</h3>
              <CompanyGrid items={bronze} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= Attending Companies ====================== */}
      <section className="relative">
        <div className="container-default py-8 sm:py-12">
          <div className="text-center mb-6 sm:mb-8" data-reveal>
            <h3 className="text-3xl font-extrabold text-slate-900">Attending Companies</h3>
            <p className="mt-2 text-slate-600">Tap a card to visit the company site.</p>
          </div>
          <MiniLogoGrid items={ATTENDING_COMPANIES} />
        </div>
      </section>

      {/* ======================== Attending Universities ==================== */}
      <section className="relative">
        <div className="container-default pb-4 sm:pb-10">
          <div className="text-center mb-6 sm:mb-8" data-reveal>
            <h3 className="text-3xl font-extrabold text-slate-900">Attending Universities</h3>
            <p className="mt-2 text-slate-600">Tap a card to visit the university site.</p>
          </div>
          <MiniLogoGrid items={ATTENDING_UNIS} />
        </div>
      </section>

      {/* ----------------------- Corporate Opportunities -------------------- */}
      <section className="section-surface">
        <div className="container-default stack-center">
          <h2 className="heading-display">Corporate Opportunities</h2>
          <p className="copy-lead">
            We encourage companies to reach out to us especially when it comes to our professional
            development events. Exposing our members to these opportunities is a great way to help
            students hone their professional development skills.
          </p>

        {/* CTA with explicit white strokes */}
          <div className="mt-10 flex justify-center">
            <a
              href={`mailto:external.vp@rushpe.org?subject=${encodeURIComponent(
                "Corporate Partnership Inquiry"
              )}&body=${encodeURIComponent("Hi SHPE at Rutgers,\n\nI’m reaching out about corporate opportunities.")}`}
              className="mail-cta relative inline-flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl hover:shadow-2xl transition-all"
              aria-label="Email our External Vice President"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 shadow-inner">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" strokeWidth="1.6" className="stroke-white" />
                  <path d="M3 8.5l9 6 9-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="stroke-white" />
                </svg>
              </span>
              <span className="flex flex-col text-white">
                <span className="text-xs/4 opacity-90">Questions?</span>
                <span className="font-semibold">Email external.vp@rushpe.org</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------- Organized by Us, for You -------------------- */}
      <section className="relative overflow-hidden" aria-labelledby="organized-title">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-sky-400 to-indigo-400" />
          <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-emerald-300 to-cyan-300" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 id="organized-title" data-reveal className="reveal text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Organized by Us, for You
            </h2>
            <p data-reveal className="reveal mt-4 text-slate-700 leading-relaxed">
              Meet the Rutgers chapters that collaborate to build this experience.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ORGANIZERS.map((org) => (
              <OrgCard key={org.name} {...org} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
