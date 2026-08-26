// app/about/page.tsx
"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Crown,
  HeartHandshake,
  Building2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* ROUTES & ASSETS                                                            */
/* -------------------------------------------------------------------------- */

// Working Constitution PDF
const CONSTITUTION_URL =
  "https://86a86efc-320b-46b2-94e8-dd1980d85076.filesusr.com/ugd/65eba6_e140d782f90b4d95b50de77266162ca7.pdf";

// IMAGE HERO (right) of title
import heroRightImg from "@/../public/shadow-program/shadow-program-10.jpg";

// Signature programs images (ensure these paths exist in /public)
import shadowProgramImg from "@/../public/shadow-program/shadow-program-10.jpg";
import ssmCareerFairImg from "@/../public/she-swe-meet/she-swe-meet-logo.png";
import shpetinasImg from "@/../public/shpetinas/shapeher-group-photo.jpg";

/* -------------------------------------------------------------------------- */
/* ANIMATION HELPERS                                                          */
/* -------------------------------------------------------------------------- */

const ease = [0.16, 1, 0.3, 1] as const;
const tMed = { duration: 0.6, ease };

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-white text-slate-900">
      {/* =============================== HERO =============================== */}
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: Headline + actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: tMed }}
            className="flex flex-col"
          >
            <h1
              suppressHydrationWarning
              className="text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.06] font-extrabold tracking-tight text-slate-900"
            >
              Building <span className="text-orange-500">community</span>,{" "}
              <span className="text-sky-500">opportunity</span>, and{" "}
              <span className="text-[#DC143C]">leadership</span> in engineering
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: tMed }}
              className="mt-5 text-[clamp(1rem,1.3vw,1.2rem)] leading-8 text-slate-700 max-w-3xl"
            >
              Since 1984, the Society of Hispanic Engineers at Rutgers has supported Hispanic and
              minority engineers with mentorship, professional development, and outreach—so every
              student can find belonging and a path to thrive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: tMed }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <PrimaryButton href="/events" label="Join SHE" />
              <SecondaryButton href="/corporate" label="Sponsor / Partner" />
              <GhostButton href={CONSTITUTION_URL} label="Constitution (PDF)" newTab icon />
            </motion.div>
          </motion.div>

          {/* RIGHT: Image card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: tMed }}
            className="relative h-[18rem] sm:h-[22rem] lg:h-[26rem] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm"
            aria-hidden
          >
            <Image
              src={heroRightImg}
              alt="" // decorative
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 48vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ============================== PILLARS (5) ============================= */}
      <section
        className="
          relative mx-auto max-w-7xl px-6 py-14 lg:px-8
          before:content-[''] before:absolute before:left-1/2 before:top-0
          before:h-64 before:w-[68rem] before:-translate-x-1/2 before:rounded-full
          before:bg-gradient-to-r before:from-orange-100 before:via-sky-100 before:to-rose-100
          before:blur-3xl before:opacity-60 before:-z-10
        "
      >
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Pillars</h2>
          
        </div>

        <p className="mt-3 max-w-3xl text-slate-700">
          Our chapter’s programs and decisions are guided by pillars that align with SHPE’s national
          mission and our constitution.
        </p>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          <PillarCard
            title="Academic Achievement"
            body="Tutoring, study groups, and resources to excel in rigorous coursework."
            icon={GraduationCap}
            accent="orange"
          />
          <PillarCard
            title="Professional Development"
            body="Resume labs, mock interviews, company talks, and career fairs to launch careers."
            icon={Briefcase}
            accent="sky"
          />
          <PillarCard
            title="Leadership Development"
            body="Committee work, project ownership, and officer roles that grow real leadership skills."
            icon={Crown}
            accent="violet"
          />
          <PillarCard
            title="Community Service & Outreach"
            body="K–12 outreach, service, and events that build a supportive, inclusive familia."
            icon={HeartHandshake}
            accent="rose"
          />
          <PillarCard
            title="Chapter Development"
            body="Operations, fundraising, alumni relations, and initiatives that strengthen our chapter."
            icon={Building2}
            accent="amber"
          />
        </motion.ul>
      </section>

      {/* ============================== OUR STORY =========================== */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Story</h2>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent sm:left-6"
          />
          <ul className="space-y-5">
            <TimelineCard badge="1984">
              Founded by seven Hispanic engineering students to create community and representation
              at Rutgers.
            </TimelineCard>
            <TimelineCard badge="Late 1980s">
              Became an official SHPE chapter and began organizing mentorship and professional
              events.
            </TimelineCard>
            <TimelineCard badge="2000s–2010s">
              Expanded outreach and student leadership; launched collaborations with peer orgs across
              campus.
            </TimelineCard>
            <TimelineCard badge="Today">
              A vibrant chapter hosting mentorship, outreach, and one of the campus’s signature
              engineering career fairs.
            </TimelineCard>
          </ul>
        </div>
      </section>

      {/* ========================== SIGNATURE PROGRAMS ====================== */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Signature Programs</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProgramCard
            href="/shadow-program"
            title="Shadow Program"
            desc="A 3-day experience that introduces New Jersey high-school students to engineering at Rutgers."
            img={shadowProgramImg}
          />
          <ProgramCard
            href="/corporate"
            title="SHE–SWE–MEET Career Fair"
            desc="One of the largest student-run career fairs on campus, in collaboration with peer organizations."
            img={ssmCareerFairImg}
          />
          <ProgramCard
            href="/shpetinas"
            title="SHPEtinas"
            desc="Programs that empower Latina and non-binary engineers through mentorship, workshops, and leadership."
            img={shpetinasImg}
          />
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* UI PIECES                                                                  */
/* -------------------------------------------------------------------------- */

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl bg-[#C52233] px-5 py-3 text-white font-semibold shadow-sm ring-1 ring-[#C52233]/10 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C52233]/40 active:translate-y-[1px]"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-[1px]"
    >
      {label}
    </Link>
  );
}

function GhostButton({
  href,
  label,
  newTab,
  icon,
}: {
  href: string;
  label: string;
  newTab?: boolean;
  icon?: boolean;
}) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 ring-1 ring-slate-200/80 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-[1px]"
    >
      {icon && <FileText className="h-4 w-4" />}
      {label}
    </Link>
  );
}

/* --- Enhanced Pillar Card (no CTA) --- */

type PillarCardProps = {
  title: string;
  body: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: "orange" | "sky" | "violet" | "rose" | "amber";
};

function PillarCard({ title, body, icon: Icon, accent }: PillarCardProps) {
  const accentRing =
    accent === "orange"
      ? "ring-orange-200 hover:ring-orange-300"
      : accent === "sky"
      ? "ring-sky-200 hover:ring-sky-300"
      : accent === "violet"
      ? "ring-violet-200 hover:ring-violet-300"
      : accent === "rose"
      ? "ring-rose-200 hover:ring-rose-300"
      : "ring-amber-200 hover:ring-amber-300";

  const accentIcon =
    accent === "orange"
      ? "text-orange-600"
      : accent === "sky"
      ? "text-sky-600"
      : accent === "violet"
      ? "text-violet-600"
      : accent === "rose"
      ? "text-rose-600"
      : "text-amber-600";

  const accentGlow =
    accent === "orange"
      ? "from-orange-400/25 to-amber-400/10"
      : accent === "sky"
      ? "from-sky-400/25 to-cyan-400/10"
      : accent === "violet"
      ? "from-violet-400/25 to-fuchsia-400/10"
      : accent === "rose"
      ? "from-rose-400/25 to-pink-400/10"
      : "from-amber-400/25 to-yellow-400/10";

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
    >
      <div
        className={[
          "group relative overflow-hidden rounded-3xl bg-white/90 p-6 shadow-sm ring-1 transition",
          "hover:shadow-md hover:-translate-y-0.5 focus-within:-translate-y-0.5",
          accentRing,
        ].join(" ")}
      >
        {/* soft glow */}
        <div
          aria-hidden
          className={[
            "absolute -top-10 -right-10 h-36 w-36 rounded-full blur-2xl opacity-70",
            "bg-gradient-to-br",
            accentGlow,
          ].join(" ")}
        />

        {/* icon chip */}
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 px-3 py-2">
          <Icon className={`h-5 w-5 ${accentIcon}`} />
          <span className="ml-2 text-xs font-semibold text-slate-700">Pillar</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-700 text-[15px] leading-6">{body}</p>
        {/* No "Learn more" CTA per request */}
      </div>
    </motion.li>
  );
}

/** Timeline card with dot + connector handled by parent */
function TimelineCard({ badge, children }: { badge: string; children: React.ReactNode }) {
  return (
    <li className="relative pl-14 sm:pl-16">
      {/* dot */}
      <span
        aria-hidden
        className="absolute left-[18px] top-2 grid h-5 w-5 place-items-center rounded-full bg-white ring-2 ring-red-200 sm:left-6"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-red-500" />
      </span>

      <div className="rounded-2xl ring-1 ring-red-200 bg-white p-5 shadow-sm">
        <div className="inline-flex items-center rounded-xl bg-red-50 px-3 py-1 text-sm font-semibold text-slate-800 ring-1 ring-red-200">
          {badge}
        </div>
        <p className="mt-3 text-slate-800 text-[15.5px] leading-7">{children}</p>
      </div>
    </li>
  );
}

function ProgramCard({
  href,
  title,
  desc,
  img,
}: {
  href: string;
  title: string;
  desc: string;
  img: any; // Next Image StaticImport
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-56">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:1024px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-slate-700 text-[15px] leading-6">{desc}</p>
      </div>
    </Link>
  );
}
