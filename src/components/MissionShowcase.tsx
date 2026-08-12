// components/MissionShowcase.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  images: (string | any)[];
  intervalSec?: number; // autoplay (0 = off)
  title: string;
  body: string;
  note?: string;
  cta?: { label: string; href: string };
  className?: string;
};

export default function MissionShowcase({
  images,
  intervalSec = 5,
  title,
  body,
  note,
  cta = { label: "Learn more", href: "/about-us#mission" },
  className = "",
}: Props) {
  const DURATION = 450;

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [phase, setPhase] = useState<"idle" | "start" | "run">("idle");

  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastWheelTs = useRef(0);
  const WHEEL_COOLDOWN = 350;

  const len = images?.length ?? 0;
  const hasMany = len > 1;
  const stats = [
    { value: "1984", label: "Established" },
    { value: "150+", label: "Active members" },
    { value: "100+", label: "Alumni network" },
    { value: "45+", label: "Annual events" },
  ];

  const getDir = (from: number, to: number): 1 | -1 => {
    const forward = (to - from + len) % len;
    const backward = (from - to + len) % len;
    return forward <= backward ? 1 : -1;
  };

  const animateTo = (next: number) => {
    if (len < 2 || next === index) return;
    setPrevIndex(index);
    setDir(getDir(index, next));
    setIndex(((next % len) + len) % len);
    setPhase("start");
    requestAnimationFrame(() => {
      setPhase("run");
      window.setTimeout(() => setPhase("idle"), DURATION);
    });
  };

  const next = () => animateTo(index + 1);
  const prev = () => animateTo(index - 1);
  const go = (i: number) => animateTo(i);

  // autoplay
  useEffect(() => {
    if (!hasMany || !intervalSec) return;
    timerRef.current = window.setTimeout(next, intervalSec * 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMany, intervalSec]);

  // keyboard
  useEffect(() => {
    if (!hasMany) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMany]);

  // touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 40;
    if (delta > THRESHOLD) prev();
    if (delta < -THRESHOLD) next();
    touchStartX.current = null;
  };

  // trackpad / wheel
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!hasMany) return;
    const now = Date.now();
    if (now - lastWheelTs.current < WHEEL_COOLDOWN) return;
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (dx > 25) {
      next();
      lastWheelTs.current = now;
    } else if (dx < -25) {
      prev();
      lastWheelTs.current = now;
    }
  };

  if (!len) return null;

  // Slide transforms
  const baseImgCls = "absolute inset-0 will-change-transform transition-transform ease-in-out";
  const styleRun = { transitionDuration: `${DURATION}ms` };
  const prevTransform =
    phase === "start" || phase === "run"
      ? phase === "start"
        ? "translateX(0%)"
        : `translateX(${dir === 1 ? -100 : 100}%)`
      : "translateX(-200%)";
  const currTransform =
    phase === "start" || phase === "run"
      ? phase === "start"
        ? `translateX(${dir === 1 ? 100 : -100}%)`
        : "translateX(0%)"
      : "translateX(0%)";

  const Dots = () => (
    <div
      className="hidden items-center justify-center gap-1 sm:flex"
      role="tablist"
      aria-label="Slide navigation"
    >
      {images.map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={active}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => go(i)}
            className={[
              "group grid h-11 w-11 place-items-center rounded-full",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "h-2.5 w-2.5 rounded-full transition-colors duration-200",
                active
                  ? "bg-slate-900/85"
                  : "bg-slate-400/55 group-hover:bg-slate-500/70",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="mission"
      className={[
        "scroll-mt-20 bg-white py-14 sm:py-16 lg:py-20",
        className,
      ].join(" ")}
      aria-labelledby="mission-title"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
            Our purpose
          </span>
          <h2
            id="mission-title"
            className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl"
          >
            {title}
          </h2>
          <div className="mt-5 h-1 w-14 rounded-full bg-red-700" />
          <p className="mt-6 text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl">
            {body}
          </p>
          {note && (
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              {note}
            </p>
          )}
          <Link
            href={cta.href}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-red-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
          >
            {cta.label}
          </Link>
        </div>

          <div>
          <div
            className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-lg ring-1 ring-slate-200"
            onWheel={onWheel}
          >
            <div
              className="relative aspect-[4/3] w-full select-none sm:aspect-[16/10]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-roledescription="carousel"
              aria-live="polite"
            >
              {/* Prev (during animation only) */}
              {(phase === "start" || phase === "run") && (
                <Image
                  key={`prev-${prevIndex}`}
                  src={images[prevIndex]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`${baseImgCls} object-cover`}
                  style={{ ...styleRun, transform: prevTransform as any }}
                  priority={false}
                />
              )}

              {/* Current */}
              <Image
                key={`curr-${index}`}
                src={images[index]}
                alt="Rutgers SHPE mission gallery image"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`${baseImgCls} object-cover`}
                style={{ ...styleRun, transform: currTransform as any }}
                priority={false}
              />
            </div>
          </div>

          {hasMany && (
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous mission image"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-xl text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span
                className="text-sm font-semibold tabular-nums text-slate-600 sm:hidden"
                aria-live="polite"
              >
                {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
              </span>
              <Dots />
              <button
                type="button"
                onClick={next}
                aria-label="Next mission image"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-xl text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-[#172033] text-white shadow-lg sm:mt-14 lg:grid-cols-4">
          {stats.map((stat, statIndex) => (
            <div
              key={stat.label}
              className={[
                "px-4 py-6 text-center sm:px-6 sm:py-7",
                statIndex % 2 === 1 ? "border-l border-white/10" : "",
                statIndex >= 2 ? "border-t border-white/10 lg:border-t-0" : "",
                statIndex > 0 ? "lg:border-l lg:border-white/10" : "",
              ].join(" ")}
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                {stat.label}
              </dt>
              <dd className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
