'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';

import { eBoardData2026_2027 } from './eboard-data-2026-2027'; // current year 
import { eBoardData2025_2026 } from './eboard-data-2025-2026'; // 2025-2026
import { eBoardData2024_2025 } from './eboard-data-2024-2025'; // 2024-2025

import './executive-board.css';

/* ---------------------------- Types ---------------------------- */
type Member = {
  position: string;
  name: string;
  headshot: any;
  email?: string | null;
  linkedin?: string | null;
  desc?: string | null;
  index: number;
};

type BoardEntry = {
  id: string;            // e.g. "2024-2025"
  label?: string;        // optional pretty label (otherwise we format id)
  data: Member[];
};

/* ----------------------- Previous Boards ----------------------- */
/** Add new years by importing the data file and pushing one object here. */
const PREVIOUS_BOARDS: BoardEntry[] = [
  { id: '2024-2025', data: eBoardData2024_2025 as Member[] },

  { id: '2025-2026', data: eBoardData2025_2026 as Member[] },
 
  //{ id: '2026-2027', data: eBoardData2026_2027 as Member[] },
  
];

/* Helper:  "2024-2025" -> "2024–2025" (en dash, nicer typography) */
const yearLabel = (idOrLabel: string) => idOrLabel.replaceAll('-', '–');

/* Sort newest first (e.g., 2025–2026 above 2024–2025) */
const YEARS: BoardEntry[] = [...PREVIOUS_BOARDS].sort((a, b) => b.id.localeCompare(a.id));

/* -------------------------- Animations ------------------------- */
// Easing function (Framer Motion v11: don't use string eases)
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
} satisfies Variants;

const cardItem = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
} satisfies Variants;

/* ------------------------- Small UI bits ------------------------ */
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="eb-chip">{children}</span>;
}

function MemberCard({ m }: { m: Member }) {
  return (
    <motion.article variants={cardItem} className="eb-card group">
      <div className="eb-card-media">
        <Image
          src={m.headshot}
          alt={`${m.position} — ${m.name}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 360px"
          className="object-cover"
        />

        {/* gradient + name/role */}
        <div className="eb-card-gradient" />
        <div className="eb-card-bottom">
          <h3 className="eb-card-name">{m.name}</h3>
          <p className="eb-card-role">{m.position}</p>
        </div>

        {/* hover bio */}
        {m.desc && (
          <div className="eb-card-desc">
            <p>{m.desc}</p>
          </div>
        )}
      </div>

      {/* actions */}
      <div className="eb-actions">
        {m.linkedin && (
          <a
            className="eb-icon-btn"
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${m.name}'s LinkedIn`}
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        )}
        {m.email && (
          <a
            className="eb-icon-btn"
            href={`mailto:${m.email}`}
            aria-label={`Email ${m.name}`}
            title="Email"
          >
            <MdOutlineMail />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function BoardGrid({ members }: { members: Member[] }) {
  return (
    <motion.div variants={containerStagger} initial="hidden" animate="show" className="eb-grid">
      {members.map((m) => (
        <MemberCard key={`${m.index}-${m.name}`} m={m} />
      ))}
    </motion.div>
  );
}

/* ---------------------- Previous Boards Modal ---------------------- */
function PreviousBoardsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState<BoardEntry | null>(null);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="eb-modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="eb-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="previous-boards-title"
          >
            <div className="eb-modal-header">
              <h3 id="previous-boards-title" className="text-lg font-semibold">
                {active ? yearLabel(active.label ?? active.id) : 'Meet Previous E-Board'}
              </h3>
              <button className="eb-icon-btn" onClick={onClose} aria-label="Close">✕</button>
            </div>

            {/* List view */}
            {!active && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Browse prior executive boards. Click a year to view members.
                </p>

                {/* Scrollable list — auto wraps as you add years */}
                <div className="eb-year-list">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {YEARS.map((b) => (
                      <button
                        key={b.id}
                        className="eb-year-card"
                        onClick={() => setActive(b)}
                        aria-label={`Open ${yearLabel(b.label ?? b.id)}`}
                      >
                        <span className="eb-year-title">{yearLabel(b.label ?? b.id)}</span>
                        <span className="eb-year-sub">View board</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Board view */}
            {active && (
              <>
                <div className="mb-3">
                  <button className="eb-archive-back" onClick={() => setActive(null)}>
                    ← Back to years
                  </button>
                </div>
                <div className="max-h-[65vh] overflow-auto pr-1">
                  <BoardGrid members={active.data} />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function ExecutiveBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const members = useMemo(() => eBoardData2026_2027 as Member[], []);

  return (
    <main className="eb-surface">
      {/* Hero */}
      <section className="eb-hero">
        <div className="eb-hero-inner">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="eb-title"
          >
            Executive Board 2026 - 2027
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.08 }}
            className="eb-lead"
          >
            SHPE changes lives by empowering the Hispanic community to realize its fullest potential
            and to impact the world through <em>STEM awareness, access, support, and development.</em>
          </motion.p>

          <div className="eb-hero-chips">
            <Chip>Student Leaders</Chip>
            <Chip>Mentorship</Chip>
            <Chip>Community</Chip>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center">
            <button className="eb-archive-trigger" onClick={() => setModalOpen(true)}>
              ✨ Meet Previous E-Board
            </button>
            <span className="eb-archive-hint mt-2">Tap to Meet</span>
          </div>
        </div>
      </section>

      {/* Current Board Grid */}
      <section className="eb-grid-wrap">
        <BoardGrid members={members} />
      </section>

      {/* Modal */}
      <PreviousBoardsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
