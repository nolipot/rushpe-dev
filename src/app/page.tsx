// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ActionChips from "@/components/ActionChips";
import WidgetCarousel from "@/components/WidgetCarousel";
import MissionShowcase from "@/components/MissionShowcase";

/* ----------------------------- Home assets ----------------------------- */
import asImage from "@/../public/home-pg-assets/optimized/widgets/academic-support.jpg";
import isImage from "@/../public/home-pg-assets/optimized/widgets/internship-scholarship.jpg";
import prImage from "@/../public/home-pg-assets/optimized/widgets/professionalism.jpg";
import neImage from "@/../public/home-pg-assets/optimized/widgets/networking.jpg";
import faImage from "@/../public/home-pg-assets/optimized/widgets/fun-activities.jpg";
import vnImage from "@/../public/home-pg-assets/optimized/widgets/volunteering.jpg";
import heroPoster from "@/../public/home-pg-assets/optimized/hero-poster.jpg";

import geeseImage1 from "@/../public/home-pg-assets/optimized/events-geese.jpg";
import geeseImage2 from "@/../public/home-pg-assets/optimized/shpetina-geese.jpg";
import geeseImage3 from "@/../public/home-pg-assets/optimized/rushine-geese.jpg";
import geeseImage4 from "@/../public/home-pg-assets/optimized/shadow-program-geese.jpg";
import geeseImage5 from "@/../public/home-pg-assets/optimized/estamos-aqui.jpg";
import geeseImage6 from "@/../public/home-pg-assets/optimized/contact-geese.jpg";

/* ------------------------------ Social icons --------------------------- */
import igIcon from "@/../public/socials/instagram-logo-small.png";
import liIcon from "@/../public/socials/linkedin-logo-small.png";
import fbIcon from "@/../public/socials/facebook-logo-small.png";
import tkIcon from "@/../public/socials/tiktok-logo-small.png";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/shpe_ru/",
    icon: igIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rutgers-university-shpe-686bba295",
    icon: liIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/rutgers.she/",
    icon: fbIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@shpe_ru",
    icon: tkIcon,
  },
];

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [showDesktopVideo, setShowDesktopVideo] = useState(false);
  const [showMobileVideo, setShowMobileVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 640px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (desktopQuery.matches && !reducedMotionQuery.matches) {
      setShowDesktopVideo(true);
      setIsVideoPlaying(true);
    }
  }, []);

  const toggleHeroVideo = () => {
    if (!showDesktopVideo && !showMobileVideo) {
      setShowMobileVideo(true);
      setIsVideoPlaying(true);
      return;
    }

    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const quickItems = [
    {
      id: 0,
      title: "Upcoming Events",
      desc: "View our upcoming events & meetings.",
      href: "/events",
      image: geeseImage1,
      bg: "#FFDE7F",
    },
    {
      id: 1,
      title: "SHPEtinas",
      desc: "Visit our SHPEtinas page.",
      href: "/shpetinas",
      image: geeseImage2,
      bg: "#FC8785",
    },
    {
      id: 2,
      title: "RU Shine",
      desc: "Weekly alumni spotlight—network, learn, and connect.",
      href: "/ru-shine",
      image: geeseImage3,
      bg: "#88CDE3",
    },
    {
      id: 3,
      title: "Shadow-Program",
      desc: "Hands-on STEM projects and guided mentorship for high-school students.",
      href: "/shadow-program",
      image: geeseImage4,
      bg: "#B8DBA2",
    },
    {
      id: 4,
      title: "Estamos Aquí",
      desc: "Know your rights regardless of your citizenship status.",
      href: "/estamos-aqui",
      image: geeseImage5,
      bg: "#C9E4ED",
    },
    {
      id: 5,
      title: "Contact Us",
      desc: "Deliver questions, comments, or concerns.",
      href: "/contact",
      image: geeseImage6,
      bg: "#CEBFE8",
    },
  ];

  const widgetItems = [
    {
      id: 0,
      eyebrow: "Opportunities",
      title: "Internship & Scholarship",
      body: "Partner pipelines, touchpoints, and alerts.",
      href: "/corporate",
      image: isImage,
    },
    {
      id: 1,
      eyebrow: "Community",
      title: "Networking",
      body: "Alumni panels, mixers, and mentorship rings.",
      href: "/info/networking",
      image: neImage,
    },
    {
      id: 2,
      eyebrow: "Culture",
      title: "Fun Activities",
      body: "Socials, trips, and community celebrations.",
      href: "/events",
      image: faImage,
    },
    {
      id: 3,
      eyebrow: "Support",
      title: "Academic Support",
      body: "Study groups, tutoring, and resources.",
      href: "/info/academics",
      image: asImage,
    },
    {
      id: 4,
      eyebrow: "Service",
      title: "Volunteering",
      body: "Give back on campus and beyond.",
      href: "/events",
      image: vnImage,
    },
    {
      id: 5,
      eyebrow: "Professional",
      title: "Professionalism",
      body: "Workshops, résumés, and recruiting prep.",
      href: "/info/professionalism",
      image: prImage,
    },
  ];

  return (
    <main id="main" className="bg-white text-slate-900">
      {/* Full-screen hero: navbar + hero occupy the opening viewport. */}
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-slate-950 lg:min-h-[calc(100svh-5rem)]"
      >
        <Image
          src={heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
        />
        {(showDesktopVideo || showMobileVideo) && (
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={heroPoster.src}
            className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
          >
            <source
              src={
                showMobileVideo
                  ? "/home-pg-assets/home-bg-vid-mobile.mp4"
                  : "/home-pg-assets/home-bg-vid-desktop.mp4"
              }
              type="video/mp4"
            />
          </video>
        )}

        <div className="pointer-events-none absolute inset-0 bg-slate-950/45" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.60)_0%,rgba(2,6,23,0.22)_42%,rgba(2,6,23,0.78)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 pb-24 text-center sm:px-6 sm:py-16 sm:pb-28 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-slate-950/35 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 shadow-lg backdrop-blur-md sm:px-5 sm:text-sm">
            <span>Rutgers University Chapter</span>
          </div>

          <h1
            id="hero-title"
            className="mt-5 max-w-6xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] sm:mt-6 sm:text-6xl lg:text-7xl"
          >
            Welcome to Rutgers SHPE
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-md sm:mt-5 sm:text-xl">
            We foster academic and professional growth for all
            students—rooted in community, mentorship, and opportunity.
          </p>

          <div className="mt-6 flex w-full max-w-sm flex-col justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row">
            <Link
              href="/events"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-main px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-main-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              View Upcoming Events
            </Link>
            <Link
              href="/about-us"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/50 bg-white/95 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              Learn About Us
            </Link>
          </div>

          <a
            href="https://www.google.com/maps/place/Paul+Robeson+Cultural+Center/@40.5239095,-74.4616097,17z/data=!3m1!4b1!4m6!3m5!1s0x89c3c70b57542065:0x82212e91808b8d23!8m2!3d40.5239095!4d-74.4590348!16s%2Fg%2F11bxf402ll?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open our meeting location in Google Maps"
            className="mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-slate-950/35 px-4 py-2.5 text-center text-xs font-medium text-white/90 backdrop-blur-sm transition hover:border-white/45 hover:bg-slate-950/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:mt-7 sm:text-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 shrink-0"
            >
              <path
                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span>Rutgers University — New Brunswick, New Jersey</span>
          </a>

          <nav
            aria-label="Rutgers SHPE social media"
            className="mt-5 flex flex-col items-center gap-3 sm:mt-6"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Follow Rutgers SHPE
            </span>
            <ul className="flex items-center justify-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Rutgers SHPE on ${social.label}`}
                    className="group grid h-11 w-11 place-items-center rounded-xl bg-white/95 shadow-md transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          onClick={toggleHeroVideo}
          aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-4 right-4 z-20 hidden h-11 w-11 place-items-center rounded-full border border-white/25 bg-slate-950/45 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-950/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-safe:grid motion-reduce:hidden sm:bottom-5 sm:right-5"
        >
          {isVideoPlaying ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M7 5.75A.75.75 0 0 1 7.75 5h2.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75V5.75Zm6 0a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75V5.75Z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-px">
              <path d="M8.25 5.47a.75.75 0 0 1 1.14-.64l9 5.53a.75.75 0 0 1 0 1.28l-9 5.53a.75.75 0 0 1-1.14-.64V5.47Z" />
            </svg>
          )}
        </button>

        <a
          href="#mission"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("mission")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
              block: "start",
            });
          }}
          className="group absolute bottom-3 left-1/2 z-20 flex min-h-12 -translate-x-1/2 flex-col items-center justify-center gap-0.5 px-4 text-white/80 transition hover:text-white focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-4"
          aria-label="Explore Rutgers SHPE and scroll to Our Mission"
        >
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
            Explore Rutgers SHPE
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      {/* MISSION */}
      <MissionShowcase
        images={[
          "/home-pg-assets/optimized/mission/alumni-panel-f24.jpg",
          "/home-pg-assets/optimized/mission/our-mission-bg.jpg",
          "/home-pg-assets/optimized/mission/first-gbm-f24-1.jpg",
          "/home-pg-assets/optimized/mission/first-gbm-f24-2.jpg",
          "/home-pg-assets/optimized/mission/first-gbm-f24-3.jpg",
          "/home-pg-assets/optimized/mission/cultural-gbm-f24-1.jpg",
        ]}
        intervalSec={7}
        title="Our Mission"
        body="Recruit, retain, and graduate minority students majoring in engineering, math, and science."
        note="You do not have to be Hispanic to join. Rutgers SHPE welcomes students from every background."
        cta={{ label: "Learn about Rutgers SHPE", href: "/about-us#mission" }}
      />

      {/* EXPLORE */}
      <section
        id="explore"
        aria-labelledby="explore-title"
        className="scroll-mt-20 bg-slate-50/60"
      >
        <div className="mx-auto max-w-3xl px-4 pb-7 pt-14 text-center sm:px-6 sm:pb-9 sm:pt-16 lg:pt-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-main">
            Discover
          </span>
          <h2
            id="explore-title"
            className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
          >
            Explore Rutgers SHPE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Find events, programs, resources, and ways to get involved in our
            community.
          </p>
        </div>
        <ActionChips items={quickItems} />
      </section>

      {/* LARGE WIDGETS */}
      <div className="bg-[#eeeeee]">
        <WidgetCarousel
          title="Support, opportunities, and community—on campus and beyond."
          subtitle="Swipe or use the arrows to explore what we offer."
          items={widgetItems}
        />
      </div>
    </main>
  );
}
