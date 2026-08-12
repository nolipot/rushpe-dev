import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Resources",
    links: [
      { label: "Events", href: "/events" },
      { label: "Executive Board", href: "/executive-board" },
      { label: "Corporate Partners", href: "/corporate" },
      { label: "Contact Us", href: "/contact" },
      { label: "Estamos Aquí", href: "/estamos-aqui" },
    ],
  },
  {
    title: "Outreach & Initiatives",
    links: [
      { label: "K–12 Outreach", href: "/shadow-program" },
      { label: "SHPEtinas", href: "/shpetinas" },
      { label: "Volunteer", href: "/events" },
      { label: "Alumni Spotlight", href: "/ru-shine" },

    ],
  },
  {
    title: "About Rutgers SHPE",
    links: [
      { label: "Mission & History", href: "/about-us#mission" },
      { label: "Our Pillars", href: "/about-us#affiliation" },
      { label: "Constitution (PDF)", href: "/about-us#constitution" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email: rushpe@gmail.com", href: "mailto:rushpe@gmail.com" },
      {
        label: "600 Bartholomew Rd, Piscataway, NJ",
        href: "https://maps.google.com/?q=600+Bartholomew+Rd+Piscataway+NJ+08854",
      },
    ],
  },
];

export default function FooterBar() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      {/* Increased vertical rhythm and max width */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
        {/* Columns: larger type + spacing */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 text-base">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="rounded text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider + bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-6 sm:flex-row">
          {/* Brand (larger, fixed aspect, crisp) */}
          <Link
            href="/"
            className="flex items-center gap-4 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
            aria-label="Rutgers SHPE Home"
          >
            <span className="relative inline-grid h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 place-items-center rounded-full ring-1 ring-slate-200 bg-white shadow-sm">
              <Image
                src="/brand/she-logo-small.png"
                alt="Rutgers SHPE logo"
                width={120}
                height={120}
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full object-contain p-1"
                priority={false}
              />
            </span>
            <span className="text-base font-semibold text-slate-900 sm:text-lg">
              Rutgers SHPE
            </span>
          </Link>

          {/* Bottom-right: © + Help → /contact (kept per your spec) */}
          <ul className="ml-auto flex items-center gap-6 text-sm sm:text-base text-slate-600">
            <li>© {new Date().getFullYear()} Rutgers SHPE</li>
            <li>
              <Link
                href="/contact"
                className="rounded hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-scarlet"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
