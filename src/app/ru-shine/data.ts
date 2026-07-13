// src/app/ru-shine/data.ts
import type { StaticImageData } from "next/image";

// ---- Static imports from /public (recommended) ----
// Place your files at: /public/ru-shine/david-fabian.jpg, /public/home-pg-assets/rushine.jpg
import davidFabian from "@/../public/ru-shine/david-fabian.jpg";
import luisCoronel from "@/../public/ru-shine/luis-coronel.jpg";
import sabrinaPerez from "@/../public/ru-shine/sabrina-perez.jpg";
import kelvinGuzman from "@/../public/ru-shine/kelvin-guzman.jpg";

/** Full spotlight record used by the hub and detail pages */
export type Alumni = {
  slug: string;
  name: string;
  /** e.g., "Class of 2022 · B.S. Computer Engineering" */
  grad: string;

  /** Hub card metadata (optional but recommended) */
  major?: string;
  gradYear?: number;
  company?: string;

  /** Optional square/portrait image for hub card (falls back to imageSrc) */
  avatar?: string | StaticImageData;

  tagline?: string;
  story: string;
  now: string;                // e.g., "Software Engineer · Atlassian (Platform)"
  roles?: string[];
  memory?: string;
  advice?: string;

  /** Spotlight hero image (also used on the card when avatar missing) */
  imageSrc: string | StaticImageData;

  linkedin?: string;
  email?: string;
};

export const alumni: Alumni[] = [
  {
    slug: "david-fabian",
    name: "David Fabian",
    grad: "Class of 2025 · B.S. Computer Science",
    major: "Computer Science",
    gradYear: 2025,
    company: "Lockheed Martin",
    avatar: davidFabian,                                // static import (safe)
    tagline:
      "The day you plant the seed is probably not the day you eat the fruit.",
    story:
      "Hi everyone! I was involved in SHE throughout my entire undergraduate life at Rutgers, especially during my last year. The conventions/career fairs I attended with the organization kickstarted my professional career as a software engineer! I've made many fun memories as a member and I'm grateful for the opportunities it has given me. Currently, I work as a software engineering associate at Lockheed Martin.",
    now: "Software Engineer · Lockheed Martin",
    roles: ["Webmaster (2024-2025)"],
    memory:
      "Networking in Anaheim and traveling around the convention hanging with friends.",
    advice:
      "Have a growth-mindset and constantly invest in your professional development! Progressing in your career isn't based on luck, but rather on consistency!",
    imageSrc: davidFabian,                             // static import (safe)
    linkedin: "https://www.linkedin.com/in/david-a-fabian",
    email: "david.f2002@outlook.com",
  },
  {
    slug: "luis-coronel",
    name: "Luis T. Coronel",
    grad: "Class of 2018 · Information Systems and Technology",
    major: "Computer Science",
    gradYear: 2018,
    company: "Microsoft",
    avatar: luisCoronel,                                // static import (safe)
    tagline:"",
    story:
      "My time with SHPE Rutgers, especially as Community Outreach Director, was a turning point in my leadership journey. It gave me my first true platform to design outreach programs like the Shadow Program, that connect with underrepresented communities in STEM, and witness the ripple effect of creating opportunity.Beyond that it was about building bridges between academia and communities that often feel furthest from it. Those experiences became the foundation for everything I’ve done since. At Microsoft, they shaped my work with HOLA, where I expanded those same principles to empower professionals and students across the U.S. and Latin America. And now with LEAD, I’ve been able to scale that vision globally, creating mentorship networks and pathways for the next generation of leaders in Peru and soon LATAM.I believe being part of organizations like SHE (SHPE) provides students, especially those who are first generation, with a new mindset for the future. The relationships you build, the skills you develop, and the communities you touch will shape the leader you become.",
    now: "Cloud Solutions Architect · Microsoft",
    roles: ["Community Outreach Director"],
    memory:
      "My time with SHPE Rutgers, especially as Community Outreach Director, was a turning point in my leadership journey. It gave me my first true platform to design outreach programs like the Shadow Program, that connect with underrepresented communities in STEM, and witness the ripple effect of creating opportunity.",
    advice:
      "If I were to share a piece of advice to those reading this or to myself back in 2015 when I first joined SHPE and was the kid in the back of the PRCC room: lean in fully. Volunteer for the hard projects, step into roles that push you outside your comfort zone, and see every event not just as an activity, but as a chance to inspire someone’s future. The work you do now may spark opportunities for others that you’ll never fully see, and that is the real legacy of leadership that you can leave behind.",
    imageSrc: luisCoronel,                             // static import (safe)
    linkedin: "https://www.linkedin.com/in/luis-t-coronel/",
  },
  {
    slug: "sabrina-perez",
    name: "Sabrina Perez",
    grad: "Class of 2024 · B.S. in Civil Engineering",
    major: "Computer Science",
    gradYear: 2024,
    company: "Bechtel Corporation", 
    avatar: sabrinaPerez,                               // static import (safe)
    tagline:"",
    story:
      "SHE has done so much for me from growing me professionally to finding my best friends and creating a space I can call home. I was able to be with other engineers like myself who all shared common goals and interests which ultimately helped each other push ourselves to be our greatest versions. I was able to enhance resume skills, interviews, elevator pitches, etc. I learned how to broaden my network and how that can go a long way. SHE pushed me outside of my comfort zone and showed me what it was like to lead on the executive board, attend national conventions, and mentor underclassmen.",
    now: "Structural Engineer · Bechtel Corporation ",
    roles: [],
    memory:
      "The biggest impact I have learned in general with SHPE is to always give back to your community. As an alum and working professional I have participated in SHPE outreach events, panels, and community service through my company and other organizations. I found a home within SHE through the people, my forever familia.",
    advice:
      "Great job and good luck on the upcoming school year! You all got this familia !!",
    imageSrc: sabrinaPerez,                             // static import (safe)
    linkedin: "https://www.linkedin.com/in/sabrina-perez-267aa8233/",
  },
  {
    slug: "kelvin-guzman-baez",
    name: "Kelvin Guzman-Baez",
    grad: "Class of 2025 · B.S. in Biomedical Engineering",
    major: "B.S. in Biomedical Engineering",
    gradYear: 2025,
    company: "Probo Medical",
    avatar: kelvinGuzman,                               // static import (safe)
    tagline:"",
    story:
      "SHE didn’t just change my outlook on engineering, it changed my outlook on life. Being part of SHE blessed me with opportunities and people I wouldn’t trade for the world. The experiences I had and the support I received shaped who I am today, and I’ll carry that with me forever.",
    now: "Field Technical Engineer · Probo Medical",
    roles: [],
    memory:
      "SHE didn’t just change my outlook on engineering, it changed my outlook on life. Being part of SHE blessed me with opportunities and people I wouldn’t trade for the world.",
    advice:
      "",
    imageSrc: kelvinGuzman,                             // static import (safe)
    linkedin: "https://www.linkedin.com/in/kelvin-guzman-baez/",
  },
];

export const getAllSlugs = () => alumni.map((a) => a.slug);
export const getAlumBySlug = (slug: string) => alumni.find((a) => a.slug === slug);
