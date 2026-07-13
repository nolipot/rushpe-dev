// src/components/ru-shine-spotlight.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { SVGProps } from "react";
import {
  BriefcaseBusiness,
  Users as UsersIcon,
  Star as StarIcon,
  Quote as QuoteIcon,
} from "lucide-react";

import type { Alumni } from "@/app/ru-shine/data";

/* ----------------------------- inline icons ----------------------------- */
const IconLinkedIn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.26 8.25h4.48V24H.26V8.25zM8.74 8.25h4.29v2.14h.06c.6-1.14 2.07-2.35 4.26-2.35 4.55 0 5.39 2.99 5.39 6.88V24h-4.67v-7.02c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24H8.74V8.25z" />
  </svg>
);
const IconMail = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
  </svg>
);

/* ----------------------------- Motion helpers --------------------------- */
function useFadeIn(delay = 0) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { opacity: 1 } : { y: 16, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, delay },
  } as const;
}

/* ----------------------------- small UI bits ---------------------------- */
function TitleWithIcon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 ring-1 ring-black/5">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

function ContactButtons({ alum }: { alum: Alumni }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {alum.linkedin && (
        <Link
          href={alum.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-black/5 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--scarlet,#CC0033)]"
        >
          <IconLinkedIn className="h-5 w-5" /> LinkedIn
        </Link>
      )}
      {alum.email && (
        <Link
          href={`mailto:${alum.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-black/5 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--scarlet,#CC0033)]"
        >
          <IconMail className="h-5 w-5" /> Email
        </Link>
      )}
    </div>
  );
}

/* --------------------------------- View --------------------------------- */
export default function Spotlight({ alum }: { alum: Alumni }) {
  const fadeTitle = useFadeIn(0.05);
  const fadeMeta = useFadeIn(0.1);

  return (
    <main className="relative isolate bg-white text-[color:var(--charcoal,#333333)]">
      {/* HERO */}
      <section aria-labelledby="spotlight-hero" className="relative isolate overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f5f5f5]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-20 -top-40 h-96 rounded-[50%] blur-3xl -z-10"
            style={{ background: "radial-gradient(40% 40% at 50% 50%, #CC003322, transparent 60%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-10 sm:pt-16 sm:pb-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Left */}
            <div className="order-1">
              <motion.p
                className="text-[clamp(0.95rem,1.6vw,1.05rem)] font-semibold tracking-wide text-neutral-600"
                {...fadeMeta}
              >
                Rutgers SHPE Alumni Spotlight
              </motion.p>

              {/* FIXED: reliable Tailwind gradient + z-index + fallback color */}
              <motion.h1
                id="spotlight-hero"
                className="relative z-10 mt-1 inline-block font-extrabold tracking-tight text-[clamp(2.5rem,6vw,4.75rem)] bg-gradient-to-r from-[#CC0033] via-[#B00028] to-[#8B001E] bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent" }} // ensures visibility in WebKit
                {...fadeTitle}
              >
                SHE Shines
              </motion.h1>

              <motion.div className="mt-3 space-y-2 text-[color:var(--charcoal,#333333)]" {...fadeMeta}>
                <p className="font-bold text-[clamp(1.8rem,3.2vw,2.25rem)]">{alum.name}</p>
                <p className="text-neutral-700 text-[clamp(1.1rem,2.3vw,1.35rem)]">{alum.grad}</p>
                {alum.tagline && (
                  <p className="italic text-neutral-700 text-[clamp(1.15rem,2.5vw,1.6rem)]">“{alum.tagline}”</p>
                )}
                {(alum.linkedin || alum.email) && (
                  <div className="mt-4">
                    <ContactButtons alum={alum} />
                  </div>
                )}
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              className="order-2 relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 sm:max-w-[24rem] md:max-w-[22rem] lg:max-w-[24rem]"
              {...useFadeIn(0)}
            >
              <Image
                src={alum.imageSrc}
                alt={`Portrait of ${alum.name}`}
                fill
                sizes="(max-width: 767px) 80vw, (max-width: 1023px) 360px, 384px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section aria-label="Alumni story" className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              About {alum.name}
            </h2>
            <p className="mt-4 text-lg leading-8 text-black">{alum.story}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 lg:p-7 ring-1 ring-black/5">
              <TitleWithIcon icon={<BriefcaseBusiness className="h-4 w-4 text-[color:var(--scarlet,#CC0033)]" />}>
                Where They Are Today
              </TitleWithIcon>
              <p className="mt-1 text-lg font-semibold text-black">{alum.now}</p>
            </div>

            {alum.roles?.length ? (
              <div className="rounded-3xl bg-white p-6 lg:p-7 ring-1 ring-black/5">
                <TitleWithIcon icon={<UsersIcon className="h-4 w-4 text-[color:var(--scarlet,#CC0033)]" />}>
                  Former SHPE Positions
                </TitleWithIcon>
                <ul className="mt-1 list-disc pl-5 text-lg leading-8 text-black">
                  {alum.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {alum.memory && (
            <div className="mt-7 rounded-3xl bg-white p-6 lg:p-7 ring-1 ring-black/5">
              <TitleWithIcon icon={<StarIcon className="h-4 w-4 text-[color:var(--scarlet,#CC0033)]" />}>
                Favorite Memory
              </TitleWithIcon>
              <p className="mt-1 text-lg leading-8 text-black">{alum.memory}</p>
            </div>
          )}

          {alum.advice && (
            <figure className="mt-7 rounded-3xl border border-[color:var(--scarlet,#CC0033)]/15 bg-gradient-to-br from-white to-[rgba(255,199,44,0.05)] p-6 lg:p-7 shadow-sm">
              <TitleWithIcon icon={<QuoteIcon className="h-4 w-4 text-[color:var(--scarlet,#CC0033)]" />}>
                Advice for current members
              </TitleWithIcon>
              <blockquote className="mt-1 text-xl leading-8 text-black">“{alum.advice}”</blockquote>
            </figure>
          )}
        </div>
      </section>
    </main>
  );
}
