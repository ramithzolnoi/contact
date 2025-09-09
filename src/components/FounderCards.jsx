import React from 'react';
import { motion } from 'framer-motion';
import { LinkedInIcon } from './Icons.jsx';

// Data kept separate for clarity & easy future expansion
const founders = [
  {
    name: 'Varun Rai',
    title: 'Co-Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/varunrai/',
    image: 'https://cdn.prod.website-files.com/667bb6c509fbf62f66d0a299/66ac8beaee9e25be7505d506_Varun%20Rai.png'
  },
  {
    name: 'Dr. Sivam Pillai',
    title: 'Co-Founder & CTO',
    linkedin: 'https://www.linkedin.com/in/sivampillai/',
    image: 'https://cdn.prod.website-files.com/667bb6c509fbf62f66d0a299/66ac8a6425f58bcc340509dd_Sivam%20Pillai.png'
  }
];

// Animation variants for cleaner motion
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut', delay: 0.10 + i * 0.08 } }),
};

export default function FounderCards() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="grid gap-3 lg:gap-4 grid-cols-1 lg:grid-cols-2 list-none m-0 p-0">
        {founders.map((f, i) => (
          <li key={f.name} className="h-full">
            <motion.article
              variants={cardVariants}
              initial="hidden"
              animate="show"
              custom={i}
              whileHover={{ y: -6 }}
              className="relative group h-full flex flex-col rounded-2xl lg:rounded-3xl shadow-[0_4px_24px_-6px_rgba(0,0,0,0.55)] ring-1 ring-slate-700/60 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 backdrop-blur-xl border border-slate-800/60 overflow-hidden"
            >
              {/* Border glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl lg:rounded-3xl transition duration-500 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-[radial-gradient(circle_at_30%_25%,rgba(0,204,255,0.28),transparent_60%)] blur-xl" />
                <div className="absolute -inset-px rounded-2xl lg:rounded-3xl bg-gradient-to-br from-brand-400/50 via-brand-500/30 to-brand-300/10 opacity-40 group-hover:opacity-70 blur-sm" />
              </div>

              {/* Main content container */}
              <div className="relative z-10 flex flex-col p-3 lg:p-4 h-full">
                {/* Avatar and basic info */}
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="relative mb-2">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-400/70 via-brand-500/40 to-brand-300/10 blur-md opacity-60 group-hover:opacity-90 transition" />
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover ring-2 ring-brand-400/60 group-hover:ring-brand-300 transition shadow-lg"
                    />
                  </div>
                  <header className="space-y-2">
                    <h3 className="text-lg lg:text-xl font-semibold tracking-tight leading-snug text-white group-hover:text-brand-50 transition-colors">{f.name}</h3>
                    <p className="text-xs lg:text-sm uppercase tracking-[0.18em] text-brand-200/90 font-medium">{f.title}</p>
                  </header>
                </div>

                {/* LinkedIn button */}
                <div className="mt-auto flex justify-center">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${f.name}'s LinkedIn profile`}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-slate-800/60 hover:bg-brand-500/15 px-3 lg:px-4 h-9 lg:h-10 text-xs lg:text-sm font-medium text-brand-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 whitespace-nowrap shadow-inner shadow-slate-900/40"
                  >
                    <span className="inline-flex h-5 w-5 lg:h-6 lg:w-6 items-center justify-center rounded-full bg-brand-500/25 text-brand-200 group-hover:bg-brand-500/35 transition">
                      <LinkedInIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                    </span>
                    LinkedIn
                  </a>
                </div>
              </div>

            </motion.article>
          </li>
        ))}
      </ul>
    </div>
  );
}