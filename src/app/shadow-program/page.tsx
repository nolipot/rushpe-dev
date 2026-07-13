// src/app/shadow-program/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Megaphone,
  Handshake,
  Users,
  Camera,
  Building2,
  ChevronRight,
  ExternalLink,
  Star,
  Download,
  X,
} from "lucide-react";

/* ---------------------------------------------
   Tokens
--------------------------------------------- */
const SCARLET = "#cc0033";
const GOOGLE_FORM_URL = "https://YOUR_GOOGLE_FORM_URL"; // TODO: replace
const SPONSOR_EMAIL = "community@rushpe.org";
const SPONSOR_MAILTO =
  `mailto:${SPONSOR_EMAIL}` +
  "?subject=Shadow%20Program%20Inquiry&body=Hi%20RU%20SHPE%20team,%0D%0A%0D%0AI%27d%20like%20to%20learn%20more%20about%20the%20Shadow%20Program.%0D%0A%0D%0AThanks!";

/* ---------------------------------------------
   Motion helpers
   - useFade: real hook (top-level only)
   - makeFade: pure helper (safe inside maps/loops)
--------------------------------------------- */
function makeFade(reduce: boolean | null, delay = 0) {
  const r = !!reduce; // normalize null -> false
  return {
    initial: r ? { opacity: 1 } : { y: 16, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-64px" },
    transition: { duration: 0.5, delay },
  } as const;
}

function useFade(delay = 0) {
  const reduce = useReducedMotion(); // boolean | null
  return makeFade(reduce, delay);
}

/* ---------------------------------------------
   Content
--------------------------------------------- */
const HERO = { image: "/shadow-program/shadow-program-10.jpg" };

const SHADOW_POINTS: string[] = [
  "3-day high school outreach event for NJ juniors & seniors",
  "Exposure to Rutgers’ engineering disciplines and labs",
  "30–40 participants annually",
  "LinkedIn headshots, scholarship lists, and college resources",
  "Club fair showcasing majors and orgs",
  "Focus on minority and disadvantaged students",
  "Completely free for all attendees",
];

function NormalImageCluster() {
  const imgs = [
    "/shadow-program/shadow-program-8.jpg",
    "/shadow-program/shadow-program-2.jpg",
    "/shadow-program/shadow-program-3.jpg",
    "/shadow-program/shadow-program-4.jpg",
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {imgs.map((src, i) => (
        <div
          key={src + i}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm"
        >
          <Image
            src={src}
            alt={`Shadow Program photo ${i + 1}`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}

type Initiative = {
  slug: string;
  title: string;
  eyebrow?: string;
  summary: string;
  stats: { label: string; value: string }[];
  image: string;
  details?: string[];
};

const INITIATIVES: Initiative[] = [
  {
    slug: "little-einsteins",
    eyebrow: "Spring ’25",
    title: "Little Einsteins",
    summary:
      "Hands-on STEM day tailored to districts with lower proficiency—pairing curiosity with approachable, bilingual resources.",
    stats: [
      { label: "Students", value: "80" },
      { label: "Volunteers", value: "15" },
      { label: "Sessions", value: "2" },
    ],
    image: "/shadow-program/little-einstein-1.jpg",
    details: [
      "Focused on lower-proficiency districts",
      "Bilingual pamphlets (elementary, middle, high school guidance)",
      "3D-printed souvenirs students kept",
    ],
  },
  {
    slug: "dia-de-ciencias",
    title: "Día de Ciencias (6–12th Grade)",
    summary:
      "An all-day STEM event at Rutgers with partner engineering orgs—bringing experiments and demos to life.",
    stats: [
      { label: "Grade Range", value: "6–12" },
      { label: "Schools", value: "Regional" },
      { label: "New Partnerships", value: "SHPE Jr. (P-TECH NB)" },
    ],
    image: "/shadow-program/ciencias-3.jpg",
    details: [
      "Hosted on campus with multiple orgs",
      "Live demos and structured rotations",
      "Catalyzed SHPE Jr. partnership (P-TECH in New Brunswick)",
    ],
  },
];

/* ---------------------------------------------
   Small UI atoms
--------------------------------------------- */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
    {children}
  </span>
);

function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-[#cc0033] text-white hover:bg-red-700 focus-visible:ring-[#cc0033]"
      : variant === "secondary"
        ? "bg-white text-neutral-900 ring-1 ring-black/10 hover:bg-neutral-50 focus-visible:ring-[#cc0033]"
        : "text-neutral-900 hover:bg-white/60";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children} <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

/** Compact two-line chip for hero meta + stats */
function MetaChip({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <span className="inline-flex items-start gap-2 rounded-full bg-white/85 px-3 py-2 text-left shadow-sm ring-1 ring-black/10 backdrop-blur-sm">
      {icon ? <span className="mt-0.5 text-neutral-700">{icon}</span> : null}
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-neutral-900">
          {title}
        </span>
        {subtitle ? (
          <span className="block text-xs text-neutral-600">{subtitle}</span>
        ) : null}
      </span>
    </span>
  );
}

/* ---------------------------------------------
   HERO — split layout
--------------------------------------------- */
function HeroSplit() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#f7f7f7_0,transparent_40%),radial-gradient(circle_at_80%_0%,#f5f5f5_0,transparent_35%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 sm:py-14 md:grid-cols-2 md:gap-12">
        {/* Left: text panel */}
        <div>
          <Eyebrow>RU SHPE Outreach</Eyebrow>
          <h1 className="mt-2 text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] text-slate-900">
            Inspiring the Next <br className="hidden md:block" />
            Generation of Engineers
          </h1>

          <motion.div
            className="mt-3 h-1 w-36 rounded-full"
            style={{ background: "linear-gradient(90deg, #cc0033, #ff6b6b)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <p className="mt-4 max-w-prose text-[17px] leading-7 text-neutral-800">
            Discover how RU SHPE connects high school students with engineering
            opportunities and mentorship.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton href={GOOGLE_FORM_URL} variant="primary">
              Apply
            </CTAButton>
            <CTAButton href="#overview" variant="secondary">
              Join the Program
            </CTAButton>
          </div>

          {/* Unified chips row */}
          <div className="mt-5 flex flex-wrap gap-2">
            <MetaChip
              icon={<Megaphone className="h-3.5 w-3.5" />}
              title="Outreach"
              subtitle="High school & pre-college"
            />
            <MetaChip
              icon={<Users className="h-3.5 w-3.5" />}
              title="Mentorship"
              subtitle="Peer & alumni network"
            />
            <MetaChip
              icon={<Building2 className="h-3.5 w-3.5" />}
              title="Rutgers Engineering"
              subtitle="On-campus access"
            />
            <MetaChip
              title="3-Day Event"
              subtitle="Immersive campus experience"
            />
            <MetaChip title="30–40 Students" subtitle="NJ juniors & seniors" />
            <MetaChip
              title="Free for Attendees"
              subtitle="Resources & headshots"
            />
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div
            className="absolute -left-10 -top-6 h-24 w-24 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, #cc003326, transparent)",
            }}
            aria-hidden
          />
          <div
            className="absolute -right-8 bottom-8 h-20 w-20 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side, #2b6cb026, transparent)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-[34rem]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[48%_52%_46%_54%/56%_44%_56%_44%] ring-1 ring-black/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]">
              <Image
                src={HERO.image}
                alt="Students at RU SHPE Shadow Program event"
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1279px) 48vw, 560px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Overview
--------------------------------------------- */
function OverviewShadow() {
  const fadeA = useFade(0);
  const fadeB = useFade(0.05);

  return (
    <section id="overview" className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-12">
        {/* Left: Copy */}
        <motion.div {...fadeA}>
          <Eyebrow>The Shadow Program</Eyebrow>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
            The Shadow Program: Opening Doors to Engineering Futures
          </h2>

          <ul className="mt-6 space-y-3 text-base leading-7 text-neutral-800">
            {SHADOW_POINTS.map((p) => (
              <li key={p} className="flex gap-3">
                <span
                  className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full"
                  style={{ backgroundColor: SCARLET }}
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton href={GOOGLE_FORM_URL} variant="primary">
              Apply
            </CTAButton>
            <CTAButton href={SPONSOR_MAILTO} variant="secondary">
              Contact
            </CTAButton>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              View upcoming dates <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right: 2×2 cluster */}
        <motion.div {...fadeB} className="relative">
          <NormalImageCluster />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Partnering, Benefits, CTA, More Initiatives
--------------------------------------------- */
function Partnering() {
  const reduce = useReducedMotion(); // boolean | null

  const items = [
    {
      title: "Hosting workshops",
      desc: "Co-develop hands-on sessions with your engineers: resume labs, mock interviews, or product demos.",
      img: "/shadow-program/shadow-program-4.jpg",
    },
    {
      title: "Social media features",
      desc: "Mentions across our channels and recap reels that amplify your brand’s commitment to equity in STEM.",
      img: "/shadow-program/shadow-company-1.jpg",
    },
    {
      title: "Logo placement",
      desc: "Prominent branding on shirts, flyers, and event media. We share editable templates for quick approval.",
      img: "/shadow-program/shadow-company-2.jpg",
    },
  ];

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <motion.div {...makeFade(reduce, 0)} className="max-w-3xl">
          <Eyebrow>Partnering with RU SHPE</Eyebrow>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We collaborate to empower underrepresented communities through STEM.
          </h2>
          <p className="mt-3 text-neutral-700 sm:text-lg">
            Join a network of industry partners elevating access to engineering.
            We co-create impactful programming and highlight your support.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <motion.article
              key={it.title}
              {...makeFade(reduce, 0.05 * idx)}
              className="group overflow-hidden rounded-3xl bg-white ring-1 ring-black/10"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={it.img}
                  alt={`${it.title} sample`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-1 text-neutral-700">{it.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const reduce = useReducedMotion(); // boolean | null

  const cards = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Brand Visibility",
      copy: "Logo exposure across shirts, flyers, recap videos, and campus media—aligned with a mission that matters.",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Community Engagement",
      copy: "Demonstrate your sustained commitment to underrepresented youth in STEM with measurable impact.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Networking",
      copy: "Plug into the SHPE ecosystem—pipelines to talented students, alumni, and peer organizations.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Why Support the Shadow Program?</Eyebrow>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Meaningful visibility. Measurable impact.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...makeFade(reduce, 0.05 * i)}
              className="rounded-3xl bg-white p-6 ring-1 ring-black/10"
            >
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${SCARLET}14`, color: SCARLET }}
              >
                {c.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-1 text-neutral-700">{c.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------- CTA --------- */
function FinalCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-14 sm:pt-12 sm:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {/* Left block */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
            <Eyebrow>Get Involved</Eyebrow>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Interested in Partnering or Volunteering?
            </h2>
            <p className="mt-2 text-neutral-700 sm:text-lg">
              Help us expand access to engineering for students across New
              Jersey. We welcome sponsors, mentors, and educators.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <CTAButton href={SPONSOR_MAILTO} variant="primary">
                Become a Sponsor
              </CTAButton>
              <CTAButton href="/events" variant="secondary">
                Volunteer with Us
              </CTAButton>
              <CTAButton href="/about-us#mission" variant="ghost">
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* Right info card */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
            <div className="flex items-start gap-3">
              <Star className="h-6 w-6 text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  A flagship RU SHPE initiative
                </h3>
                <p className="mt-1 text-neutral-700">
                  The Shadow Program has supported hundreds of students with
                  college resources, mentorship, and direct exposure to Rutgers
                  Engineering. Join us to scale the impact.
                </p>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-neutral-200" />

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-black/10">
                Scholarship Lists
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-black/10">
                LinkedIn Headshots
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-black/10">
                Lab Exposure
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InitiativeCard({ i }: { i: Initiative }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/10">
      <div className="relative aspect-[16/9]">
        <Image
          src={i.image}
          alt={`${i.title} highlight`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        {i.eyebrow && <Eyebrow>{i.eyebrow}</Eyebrow>}
        <h3 className="mt-1 text-xl font-semibold text-slate-900">{i.title}</h3>
        <p className="mt-2 text-neutral-700">{i.summary}</p>

        {i.details && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-800">
            {i.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}

        <div className="mt-4 grid grid-cols-3 gap-3">
          {i.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-neutral-50 p-3 text-center ring-1 ring-black/5"
            >
              <div className="text-lg font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function MoreInitiatives() {
  const reduce = useReducedMotion(); // boolean | null

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>More Programs & Initiatives</Eyebrow>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Expanding Our Impact Beyond the Shadow Program
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {INITIATIVES.map((i, idx) => (
            <motion.div key={i.slug} {...makeFade(reduce, 0.05 * idx)}>
              <InitiativeCard i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Gallery + Lightbox (VSCO grid, high z-index via Portal)
--------------------------------------------- */
type Photo = { src: string };

const PHOTOS: Photo[] = [
  { src: "/shadow-program/shadow-program-10.jpg" },
  { src: "/shadow-program/shadow-program-1.jpg" },
  { src: "/shadow-program/shadow-program-2.jpg" },
  { src: "/shadow-program/shadow-program-3.jpg" },
  { src: "/shadow-program/shadow-program-4.jpg" },
  { src: "/shadow-program/shadow-program-5.jpg" },
  { src: "/shadow-program/shadow-program-6.jpg" },
  { src: "/shadow-program/shadow-program-7.jpg" },
  { src: "/shadow-program/ciencias-1.jpg" },
  { src: "/shadow-program/ciencias-2.jpg" },
  { src: "/shadow-program/ciencias-3.jpg" },
  { src: "/shadow-program/ciencias-4.jpg" },
  { src: "/shadow-program/ciencias-5.jpg" },
  { src: "/shadow-program/little-einstein-1.jpg" },
];

function Gallery() {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Moments That Matter</Eyebrow>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Highlights from Our Programs
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Click any photo to enlarge and download.
          </p>
        </div>

        {/* VSCO-like grid */}
        <motion.div
          {...useFade(0)}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {PHOTOS.map((p, i) => (
            <button
              key={p.src + i}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0033]"
              onClick={() => setLightbox(p)}
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={p.src}
                alt={`Gallery photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
                priority={i < 4}
              />
            </button>
          ))}
        </motion.div>

        {/* Lightbox via Portal */}
        {lightbox &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[2000] grid place-items-center bg-black/70 p-4"
              onClick={() => setLightbox(null)}
            >
              <div
                className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full w-full grid place-items-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={lightbox.src}
                      alt="Enlarged gallery photo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-1.5">
                  <a
                    href={lightbox.src}
                    download
                    title="Download"
                    aria-label="Download image"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setLightbox(null)}
                    title="Close"
                    aria-label="Close lightbox"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default function ShadowProgramPage() {
  return (
    <main id="main" className="bg-white text-neutral-900">
      <HeroSplit />
      <OverviewShadow />
      <Partnering />
      <Benefits />
      <FinalCTA />
      <MoreInitiatives />
      <Gallery />
    </main>
  );
}
