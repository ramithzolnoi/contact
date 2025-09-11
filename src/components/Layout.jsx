import React from 'react';
import { Outlet } from 'react-router-dom';
import heroLogo from '/logo_with_text_and_tagline.svg';
import QRCodeGenerator from './QRCodeGenerator.jsx';

export default function Layout() {
  return (
  <div className="w-full bg-slate-950 text-slate-100 relative">
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(circle_at_20%_20%,rgba(0,204,255,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,212,170,0.12),transparent_55%)]" />
      <main className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-8 animate-fade-in hidden md:block mt-16">
            <img src={heroLogo} alt="Zolnoi" className="w-[500px] max-w-full drop-shadow-2xl select-none" draggable={false} />
            <p className="text-slate-400 max-w-md leading-relaxed text-sm">Next-generation intelligence infrastructure. We partner with forward-looking teams to accelerate innovation responsibly.</p>
            <div className="flex gap-4">
              <a href="https://www.zolnoi.com" target="_blank" rel="noopener noreferrer" className="btn-primary h-11 px-6">Visit Website</a>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-end mb-4">
              <QRCodeGenerator />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <div className="relative z-10 flex justify-center text-[10px] tracking-wide text-slate-500 py-6">© {new Date().getFullYear()} Zolnoi • NASSCOM Showcase</div>
    </div>
  );
}