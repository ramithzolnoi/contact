import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GlobeIcon } from '../components/Icons.jsx';
import { motion } from 'framer-motion';
import FounderCards from '../components/FounderCards.jsx';

// Founder data moved into separate component

export default function ThankYou() {
  const [params] = useSearchParams();
  const name = params.get('name');

  return (
  <motion.div
    className="space-y-14 animate-fade-in w-full"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
      <div className="text-center space-y-6 max-w-3xl mx-auto px-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 text-xs font-medium text-brand-200 shadow-sm backdrop-blur">
          <span>Message received</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-brand-400 via-brand-200 to-white text-transparent bg-clip-text">
          Thank you{name ? `, ${name}` : ''}!
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          We appreciate your interest. A member of our team will reach out soon. Meanwhile, choose how you'd like to continue your journey with us below.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a href="https://www.zolnoi.com" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm group">
            <GlobeIcon className="w-4 h-4 opacity-80" /> Visit Website
          </a>
          <Link to="/" className="btn-primary text-sm bg-slate-700 hover:bg-slate-600">Submit Another</Link>
        </div>
      </div>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h2 className="text-base tracking-wide uppercase font-semibold text-slate-400/80">Founders</h2>
        <FounderCards />
      </div>
    </motion.div>
  );
}