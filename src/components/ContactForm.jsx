import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const emailRegex = /^(?:[A-Z0-9._%+-]+)@(?:[A-Z0-9.-]+)\.[A-Z]{2,}$/i;

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const navigate = useNavigate();

  const isValid = form.name.trim() && emailRegex.test(form.email) && form.company.trim();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError('');
    setDuplicate(false);
    try {
      const { error: insertError } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        source: 'website'
      });
      if (insertError) {
        // 23505 unique violation
        if (insertError.code === '23505') {
          setDuplicate(true);
          navigate(`/thanks?name=${encodeURIComponent(form.name.trim())}`);
          return;
        }
        throw insertError;
      }
      navigate(`/thanks?name=${encodeURIComponent(form.name.trim())}`);
    } catch (err) {
      console.error(err);
      setError('We could not save your details. Please retry or email hello@zolnoi.com');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative space-y-10 max-w-lg mx-auto md:mx-0"
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 text-xs font-medium text-brand-200 shadow-sm backdrop-blur-sm">
          <span>Reach Out</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-brand-400 via-brand-200 to-white bg-clip-text text-transparent">Let’s Build Together</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">Partner, pilot, invest, or explore our platform. Share a few details and we’ll connect shortly.</p>
      </div>

      <div className="grid gap-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-200">Name</label>
          <div className="relative group">
            <input id="name" name="name" type="text" placeholder="Your full name" className="input-field peer" value={form.name} onChange={handleChange} onBlur={handleBlur} required />
            <div className="pointer-events-none absolute inset-px rounded-md border border-transparent group-hover:border-brand-500/30 peer-focus:border-brand-500/50 transition" />
          </div>
          {touched.name && !form.name.trim() && <p className="text-xs text-red-400">Name is required.</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-200">Email</label>
            <div className="relative group">
              <input id="email" name="email" type="email" placeholder="name@company.com" className="input-field peer" value={form.email} onChange={handleChange} onBlur={handleBlur} required />
              <div className="pointer-events-none absolute inset-px rounded-md border border-transparent group-hover:border-brand-500/30 peer-focus:border-brand-500/50 transition" />
            </div>
            {touched.email && !emailRegex.test(form.email) && <p className="text-xs text-red-400">Enter a valid email address.</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-slate-200">Company</label>
          <div className="relative group">
            <input id="company" name="company" type="text" placeholder="Organization / Startup name" className="input-field peer" value={form.company} onChange={handleChange} onBlur={handleBlur} required />
            <div className="pointer-events-none absolute inset-px rounded-md border border-transparent group-hover:border-brand-500/30 peer-focus:border-brand-500/50 transition" />
          </div>
          {touched.company && !form.company.trim() && <p className="text-xs text-red-400">Company name is required.</p>}
        </div>
      </div>

      {duplicate && <div className="text-sm text-amber-400 bg-amber-950/30 border border-amber-800/40 rounded-md px-4 py-2">Looks like you already reached out. We’ll be in touch soon – feel free to explore more meanwhile.</div>}
      {error && <div className="text-sm text-red-400 bg-red-950/40 border border-red-800/40 rounded-md px-4 py-2">{error}</div>}

      <div className="pt-4 flex flex-col gap-6">
        <button type="submit" disabled={!isValid || submitting} className="btn-primary min-w-[190px] justify-center text-base h-12 relative overflow-hidden">
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_70%)]" />
          {submitting && <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/40 border-t-white" />}
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
        <p className="text-[11px] text-slate-500 leading-relaxed max-w-md">We’ll only use your details for relevant follow-ups. No spam, ever.</p>
      </div>
  </motion.form>
  );
}
