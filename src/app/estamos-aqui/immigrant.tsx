// src/app/immigrant/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  ScrollText,
  Search,
  FileCheck2,
  Languages,
  MapPin,
  BadgeCheck,
  ArrowRight,
  Download,
  HandHelping,
} from "lucide-react";

import hesaaImg from "@/../public/shpetinas/resources/hesaa.jpg";
import redcard1 from "@/../public/shpetinas/resources/red-card-1.jpg";
import redcard3 from "@/../public/shpetinas/resources/red-card-3.jpg";

/** ===== Motion helpers ===== */
const easeOutBezier: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.55, ease: easeOutBezier },
};

const containerStagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, amount: 0.18 },
};

export default function ImmigrantsRights() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.style.setProperty("scroll-behavior", "auto");
    }
  }, []);

  return (
    <main className="relative bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_40rem_at_20%_-10%,rgba(14,165,233,0.10),transparent),radial-gradient(36rem_36rem_at_90%_10%,rgba(99,102,241,0.10),transparent)]"
        />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 sm:pt-24 sm:pb-12 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
              <Shield className="h-4 w-4" />
              Know Your Rights – Rutgers Society of Hispanic Engineers
            </p>

            {/* Smaller heading */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Know Your Rights
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Everyone in New Jersey has rights regardless of citizenship or immigration status. Learn what
              to do in public spaces, how to handle documents safely, and what to say if you are stopped or
              questioned.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {/* Scroll down to the Red Cards section */}
              <Link
                href="#red-cards"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:shadow md:active:scale-[.99]"
              >
                <Download className="h-5 w-5" />
                Download Red Card
              </Link>

              <Link
                href="#legal-services"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                <HandHelping className="h-5 w-5" />
                Immigration Legal Services
              </Link>
            </div>
          </motion.div>

          {/* ======= Single centered image card under the hero (smaller) ======= */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-8 flex justify-center"
          >
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
              <div className="overflow-hidden rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={redcard3}
                    alt="Red cards workshop"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 576px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============= CORE RIGHTS SECTIONS ============= */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Public Space Interaction */}
          <motion.article variants={fadeUp} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold tracking-tight">
                If you encounter an immigration agent or other law enforcement in a public space
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-2">
                <ScrollText className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                Ask to see a badge/identification. You may ask what agency they represent and whether they are
                federal immigration agents.
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                You may ask whether you are free to leave.
              </li>
              <li className="flex gap-2">
                <Shield className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                You have the right to remain silent. You do not have to answer questions. You can say you choose
                to remain silent.
              </li>
              <li className="flex gap-2">
                <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                If you are not a U.S. citizen and an agent requests immigration papers, you must show them if you
                have them with you. If not, you can say you want to remain silent or consult a lawyer first.
              </li>
            </ul>
          </motion.article>

          {/* Document Guidelines */}
          <motion.article variants={fadeUp} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <ScrollText className="h-6 w-6 text-violet-600" />
              <h2 className="text-xl font-semibold tracking-tight">Important document guidelines</h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-2">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                Carry valid U.S. government identification at all times.
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                If you have immigration documentation, keep valid papers with you (e.g., EAD card, I-94s, Notices
                to Appear).
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                Keep foreign documents safely at home.
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                Never carry or present false documents.
              </li>
            </ul>
          </motion.article>

          {/* Search Rights */}
          <motion.article
            variants={fadeUp}
            className="md:col-span-2 overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-slate-200 backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-semibold tracking-tight">Search rights</h2>
            </div>
            <p className="mt-4 text-slate-700">
              If an immigration agent asks to search you, <strong>you have the right to say no</strong>. Agents
              generally cannot search you or your belongings without consent, a valid warrant, or probable cause.
            </p>
            <blockquote className="mt-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 text-emerald-900 shadow-sm">
              “I do not consent to a search. I wish to remain silent. I wish to speak with an attorney as soon as
              possible.”
            </blockquote>
            <p className="mt-4 flex items-center gap-2 text-slate-700">
              <Languages className="h-5 w-5 text-emerald-600" />
              You may ask for an interpreter if you do not speak the officer’s language.
            </p>
          </motion.article>
        </motion.div>
      </section>

      {/* ====== RED CARDS / KNOW YOUR RIGHTS ====== */}
      <section id="red-cards" className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start"
          variants={containerStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Red Cards / Know Your Rights Cards</h2>
            <p className="mt-2 max-w-3xl text-[17px] leading-7 text-slate-700">
              We are the first organization on campus to take action by hosting an event where members printed and
              laminated “Red Cards.” We educate students, families, and Hispanic communities on local resources
              through social media, and distribute cards to local SHPE chapters and communities.
            </p>

            {/* External link to ILRC page for the PDF */}
            <div className="mt-5">
              <Link
                href="https://www.ilrc.org/red-cards-tarjetas-rojas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50"
                aria-label="Open ILRC Red Cards page (view & download PDF)"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl bg-white p-1 ring-1 ring-slate-200 shadow-sm"
          >
            <div className="relative h-56 sm:h-64 md:h-[22rem]">
              <Image
                src={redcard1}
                alt="Red cards event"
                fill
                className="rounded-[1rem] object-cover transition duration-300 group-hover:scale-[1.03]"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ====== IMMIGRATION LEGAL SERVICES (CTA) ====== */}
      <section
        id="legal-services"
        className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-12 sm:py-14 lg:px-8"
      >
        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur md:grid-cols-2"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Immigration Legal Services</h2>
            <p className="mt-2 text-[17px] leading-7 text-slate-700">
              Access referrals, clinics, and trusted resources. Learn about consultations, fee waivers, and how to
              prepare documents safely. This content previously lived on the SHPEtinas page and now has its own
              dedicated area.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://law.rutgers.edu/information-for/get-legal-help/rutgers-immigrant-community-assistance-project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white shadow-sm transition hover:shadow"
                aria-label="Explore Rutgers Immigration Community Assistance Project"
              >
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <Link
              href="https://law.rutgers.edu/information-for/get-legal-help/rutgers-immigrant-community-assistance-project"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label="Open Rutgers Immigration Community Assistance Project"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                <div className="relative h-72">
                  <Image
                    src={hesaaImg}
                    alt="Rutgers Immigrant Community Assistance Project"
                    fill
                    priority
                    className="rounded-[1.35rem] object-cover object-center"
                  />
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
