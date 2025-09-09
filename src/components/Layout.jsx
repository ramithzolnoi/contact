import React from 'react';
import { Outlet } from 'react-router-dom';
import heroLogo from '/logo_with_text_and_tagline.png';
import QRCodeGenerator from './QRCodeGenerator.jsx';

export default function Layout() {
  return (
  <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_20%,rgba(0,204,255,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,212,170,0.12),transparent_55%)]" />
      <main className="w-full">
        <div className="mx-auto w-full max-w-7xl px-6 py-4 md:py-8 grid md:grid-cols-2 gap-6 md:gap-10 items-start md:items-center min-h-[calc(100vh-60px)]">
          <div className="space-y-8 animate-fade-in hidden md:block">
            <img src={heroLogo} alt="Zolnoi" className="w-[420px] max-w-full drop-shadow-2xl select-none" draggable={false} />
            <p className="text-slate-400 max-w-md leading-relaxed text-sm">Next-generation intelligence infrastructure. We partner with forward-looking teams to accelerate innovation responsibly.</p>
            <div className="flex gap-4">
              <a href="https://www.zolnoi.com" target="_blank" rel="noopener noreferrer" className="btn-primary h-11 px-6">Visit Website</a>
            </div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-end mb-4">
              <QRCodeGenerator />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <div className="flex justify-center text-[10px] tracking-wide text-slate-500 py-3">© {new Date().getFullYear()} Zolnoi • NASSCOM Showcase</div>
    </div>
  );
}