// src/components/NavBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

type NavItem = { name: string; href: string };

const LINKS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Executive Board", href: "/executive-board" },
  { name: "Events", href: "/events" },
  { name: "Corporate", href: "/corporate" },
  { name: "Contact Us", href: "/contact" },
];

const ACTIVE_UNDERLINE_COLOR = "bg-slate-900";
const HEADER_H_MOBILE = "h-16"; // 4rem
const HEADER_TOP = "top-16";    // keep in sync with HEADER_H_MOBILE

export default function NavBar({ isTransparent = false }: { isTransparent?: boolean }) {
  const pathname = usePathname() || "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [mounted, setMounted] = useState(false); // for portal

  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const ghostRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Keep navbar stable and visible; only update scrolled visual state.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change; Esc closes
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-collapse to hamburger when tabs don’t fit
  useEffect(() => {
    const calc = () => {
      const bar = barRef.current;
      const logo = logoRef.current;
      const ghost = ghostRef.current;
      if (!bar || !logo || !ghost) return;

      const barW = bar.clientWidth;
      const logoW = logo.clientWidth;
      const linksW = Math.ceil(ghost.getBoundingClientRect().width);

      const rightControlsW = 48; // h-10 w-10 hamburger
      const gutters = 28;

      const availableForLinks = barW - logoW - rightControlsW - gutters;
      setCollapse(linksW > availableForLinks);
    };

    const bar = barRef.current;
    if (!bar) return;
    const ro = new ResizeObserver(() => requestAnimationFrame(calc));
    ro.observe(bar);

    requestAnimationFrame(calc);
    // @ts-ignore
    document?.fonts?.ready?.then(calc).catch(() => {});
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  // Scroll-lock when mobile menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const headerBg = isTransparent
    ? scrolled
      ? "bg-white/95 shadow-sm ring-1 ring-black/5"
      : "bg-white/70"
    : "bg-white shadow-sm ring-1 ring-black/5";

  return (
    <>
      <header
        className={[
          "sticky top-0 z-[60]",
          headerBg,
          "transition-[background-color,box-shadow] duration-300",
          "supports-[backdrop-filter]:backdrop-blur-md",
        ].join(" ")}
      >
        {/* Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-white focus:px-3 focus:py-1.5 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>

        {/* Top Bar */}
        <div
          ref={barRef}
          className={`relative mx-auto flex ${HEADER_H_MOBILE} sm:h-18 lg:h-20 max-w-7xl items-center gap-3 px-3 sm:px-5 lg:px-6`}
        >
          {/* Logo (left) */}
          <Link
            ref={logoRef}
            href="/"
            aria-label="Rutgers SHPE Home"
            className="relative inline-grid aspect-square h-12 sm:h-14 lg:h-16 shrink-0 place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
          >
            <Image
              src="/she-logo.png"
              alt="Rutgers SHPE logo"
              width={360}
              height={360}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Ghost width measurer */}
          <ul
            ref={ghostRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute -z-50 left-[-9999px] top-0 whitespace-nowrap flex gap-5 lg:gap-6 px-1.5 py-1 text-[16px] font-medium"
          >
            {LINKS.map((item) => (
              <li key={`ghost-${item.href}`} className="px-2 whitespace-nowrap">
                {item.name}
              </li>
            ))}
          </ul>

          {/* Desktop nav (centered independent of logo & hamburger) */}
          {!collapse && (
            <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center">
              <nav aria-label="Primary" className="pointer-events-auto">
                <ul className="flex items-center gap-5 lg:gap-6">
                  {LINKS.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="group relative rounded-md px-1.5 py-1 text-[16px] font-medium text-slate-700 transition hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -inset-y-1.5 -inset-x-2 rounded-xl bg-slate-100 opacity-0 shadow-sm transition group-hover:opacity-100"
                          />
                          <span className="relative whitespace-nowrap">{item.name}</span>
                          <span
                            aria-hidden
                            className={[
                              "absolute left-2 right-2 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform",
                              active
                                ? `${ACTIVE_UNDERLINE_COLOR} scale-x-100`
                                : "scale-x-0 bg-transparent",
                            ].join(" ")}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          )}

          {/* "=" morphing to "X" (header button) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={[
              "ml-auto md:hidden h-10 w-10 inline-flex items-center justify-center rounded-md bg-white text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet",
              "relative z-[65]",
            ].join(" ")}
          >
            <span
              aria-hidden
              className={[
                "absolute h-[2px] w-6 bg-slate-900 transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[5px]",
              ].join(" ")}
            />
            <span
              aria-hidden
              className={[
                "absolute h-[2px] w-6 bg-slate-900 transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[5px]",
              ].join(" ")}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU via PORTAL — UNMOUNT WHEN CLOSED (prevents black strip) */}
      {mounted && open &&
        createPortal(
          <div
            id="mobile-menu"
            className={["fixed inset-x-0 bottom-0 z-[1200] md:hidden", HEADER_TOP].join(" ")}
            aria-hidden={!open}
          >
            <nav aria-label="Mobile" className="h-full bg-neutral-900 text-white/90">
              <ul className="mx-auto h-full max-w-3xl overflow-auto divide-y divide-white/10">
                {LINKS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "block px-5 py-5 text-[1.6rem] font-semibold tracking-tight",
                          active ? "text-white" : "text-white/90 hover:text-white",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
