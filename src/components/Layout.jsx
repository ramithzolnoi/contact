import React from 'react';
import { Outlet } from 'react-router-dom';
import heroLogo from '/logo_with_text_and_tagline.png';
import QRCodeGenerator from './QRCodeGenerator.jsx';

export default function Layout() {
  return (
  <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 relative overscroll-none">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_20%,rgba(0,204,255,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,212,170,0.12),transparent_55%)]" />
      <main className="flex-1 w-full flex items-center justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 py-2 md:py-4 grid md:grid-cols-2 gap-6 items-start md:items-center h-full min-h-[640px] md:min-h-[600px]">
          <div className="space-y-8 animate-fade-in hidden md:block">
            <img src={heroLogo} alt="Zolnoi" className="w-[420px] max-w-full drop-shadow-2xl select-none" draggable={false} />
            <p className="text-slate-400 max-w-md leading-relaxed text-sm">Next-generation intelligence infrastructure. We partner with forward-looking teams to accelerate innovation responsibly.</p>
            <div className="flex gap-4">
              <a href="https://www.zolnoi.com" target="_blank" rel="noopener noreferrer" className="btn-primary h-11 px-6">Visit Website</a>
            </div>
          </div>
          <div className="relative z-10 overflow-y-auto max-h-[calc(100vh-40px)] pr-1 custom-scroll">
            <div className="flex justify-end mb-4">
              <QRCodeGenerator />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center text-[10px] tracking-wide text-slate-500">© {new Date().getFullYear()} Zolnoi • NASSCOM Showcase</div>
    </div>
  );
}