/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormEvent, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, Mail, MapPin, Menu, Phone, Send, X } from 'lucide-react';
import { MotionConfig, motion, useScroll, useTransform } from 'motion/react';

const INFO = {
  name: 'Lakshmi Electricals',
  address: 'Kunholath, Chelavoor, Kozhikode - 673 035',
  phones: [
    { display: '+91 98473 53544', raw: '9847353544', href: 'tel:+919847353544' },
    { display: '+91 79078 84408', raw: '7907884408', href: 'tel:+917907884408' },
  ],
  email: 'lakshmieleclt@gmail.com',
  emailHref: 'mailto:lakshmieleclt@gmail.com',
};

type ServiceFilter = 'all' | 'wiring' | 'safety';

const SERVICES = [
  {
    num: '01',
    cat: 'wiring' as const,
    title: 'Residential & Commercial Wiring',
    desc: 'Concealed and surface electrical wiring, circuit planning, architectural lighting layouts, and load-balanced power points.',
    points: ['Single & three-phase distribution', 'DB dressing & circuit labelling', 'Switchgear & lighting installation'],
  },
  {
    num: '02',
    cat: 'wiring' as const,
    title: 'Main Panels & Distribution Boards',
    desc: 'Installation and commissioning of main LT switchboards, sub-distribution boards, metering panels, and protective breaker assemblies.',
    points: ['MCCB / MCB & RCCB coordination', 'Busbar chamber & feeder cabling', 'Meter board & load upgrades'],
  },
  {
    num: '03',
    cat: 'safety' as const,
    title: 'Earthing & Surge Protection',
    desc: 'Dedicated earthing grids and lightning arrestor setups engineered to safeguard equipment and personnel against fault currents.',
    points: ['Pipe & plate earthing pits', 'Earth resistance testing', 'Surge & residual current protection'],
  },
  {
    num: '04',
    cat: 'safety' as const,
    title: 'Backup Power Integration',
    desc: 'Seamless wiring and changeover switching for inverters, UPS systems, and standby generators to keep essential loads uninterrupted.',
    points: ['Manual & automatic changeover', 'Essential load circuit separation', 'Generator & inverter cabling'],
  },
  {
    num: '05',
    cat: 'safety' as const,
    title: 'Testing, Fault Repair & Compliance',
    desc: 'Systematic insulation diagnostics, load auditing, rewiring of legacy installations, and electrical safety verification.',
    points: ['Megger insulation resistance tests', 'Short-circuit & earth fault tracing', 'Safety inspection readiness'],
  },
];

const NODE_DETAILS = {
  intake: ['01 · UTILITY INTAKE & METERING', 'Balanced 3-phase and single-phase service connection with proper cable sizing.'],
  panel: ['02 · MAIN DISTRIBUTION & PROTECTION', 'Neatly dressed distribution boards with rated breakers and clear circuit identification.'],
  earth: ['03 · EARTHING & FAULT SAFETY', 'Tested earth pits and residual current protection for long-term safety.'],
};

const STRENGTHS = [
  'Technical Competence',
  'Efficient Project Management',
  'Multi Location Representation',
  'Strict Delivery Schedule',
  'High Quality',
  'Safety Conscious',
  'Reliability',
  'Competitive',
  'Commitment',
  'Strength of Committed Employees with Personal Touch',
];

function LogoHeading({ lead, accent, sub, dark = false }: { lead: string; accent: string; sub: string; dark?: boolean }) {
  return (
    <div className="inline-flex flex-col items-start">
      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-none ${dark ? 'text-white' : 'text-slate-950'}`}>
        {lead}<span className="text-[#1E73B8]">{accent}</span>
      </h2>
      <div className="mt-2 bg-[#6E7378] px-3.5 py-1">
        <p className="font-serif text-sm sm:text-base text-white tracking-wide whitespace-nowrap">{sub}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ServiceFilter>('all');
  const [activeNode, setActiveNode] = useState<'intake' | 'panel' | 'earth'>('panel');
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', scope: SERVICES[0].title, note: '' });
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const schematicY = useTransform(heroScroll, [0, 1], [0, 42]);
  const visibleServices = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.cat === filter);

  const copyText = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setErr('Please enter your name or project title.');
    if (form.phone.replace(/\D/g, '').length < 10) return setErr('Please enter a valid 10-digit phone number.');
    if (form.note.trim().length < 6) return setErr('Please share a brief note on your electrical requirement.');
    setErr(null);
    setSent(true);
  };

  const mailtoHref = `mailto:${INFO.email}?subject=${encodeURIComponent(`Electrical Work Inquiry - ${form.name}`)}&body=${encodeURIComponent(
    `Name: ${form.name}\nPhone: ${form.phone}\nScope: ${form.scope}\nDetails: ${form.note}`
  )}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#1E73B8] origin-left z-[60]" aria-hidden="true" />

        {/* Top Navigation: Brand | 3 Pages | Primary Action */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
            <a href="#home" className="shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E73B8]">
              <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-slate-950 whitespace-nowrap">
                Laksh<span className="text-[#1E73B8]">mi</span> Electricals
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600" aria-label="Main navigation">
              {[{ label: 'Overview', href: '#home' }, { label: 'Services', href: '#services' }, { label: 'Contact', href: '#contact' }].map((l) => (
                <a key={l.href} href={l.href} className="py-1 hover:text-[#1E73B8] transition-colors whitespace-nowrap shrink-0">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <a href="#contact" className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1E73B8] hover:bg-[#165991] transition-colors whitespace-nowrap shrink-0">
                Get in Touch
              </a>
              <button type="button" onClick={() => setMenuOpen((o) => !o)} className="md:hidden w-11 h-11 inline-flex items-center justify-center border border-slate-200 text-slate-700" aria-label="Toggle menu" aria-expanded={menuOpen}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
              {[['Overview', '#home'], ['Services', '#services'], ['Contact', '#contact']].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#1E73B8]">
                  {label}
                </a>
              ))}
            </div>
          )}
        </header>

        <main className="flex-1">
          {/* PAGE 1: OVERVIEW & HERITAGE */}
          <section ref={heroRef} id="home" className="blueprint-grid border-b border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 flex flex-col justify-center">
                <p className="font-mono text-xs sm:text-sm text-slate-500 tracking-wide">ALL-INDIA OPERATIONS · LICENSED ELECTRICAL CONTRACTORS</p>

                <h1 className="mt-3 font-extrabold tracking-tight text-slate-950 leading-[1.02] text-balance" style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)' }}>
                  Laksh<span className="text-[#1E73B8]">mi</span> <span className="block sm:inline">Electricals</span>
                </h1>

                <div className="mt-4 inline-block self-start bg-[#6E7378] px-4 py-1.5">
                  <p className="font-serif text-base sm:text-lg text-white tracking-wide">Electrical Contractors</p>
                </div>

                <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  We undertake residential, commercial, and industrial electrical contracts across India—executed by highly experienced, licensed electricians committed to safety and precision.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 max-w-md border-y border-slate-200 py-5">
                  <div>
                    <p className="font-mono text-3xl sm:text-4xl font-extrabold text-[#1E73B8] tabular-nums">50+</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Years of Experience</p>
                  </div>
                  <div className="border-l border-slate-200 pl-5">
                    <p className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-950 tabular-nums">26+</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Projects Completed</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1E73B8] hover:bg-[#165991] transition-colors whitespace-nowrap">
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="inline-flex flex-wrap items-center gap-3 px-4 py-3 bg-white border border-slate-300 text-sm font-semibold text-slate-800 font-mono tabular-nums">
                    <Phone className="w-4 h-4 text-[#1E73B8] shrink-0" />
                    <a href={INFO.phones[0].href} className="hover:text-[#1E73B8] transition-colors whitespace-nowrap">{INFO.phones[0].display}</a>
                    <span className="text-slate-300" aria-hidden="true">/</span>
                    <a href={INFO.phones[1].href} className="hover:text-[#1E73B8] transition-colors whitespace-nowrap">{INFO.phones[1].display}</a>
                  </div>
                </div>
              </motion.div>

              <motion.div style={{ y: schematicY }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 bg-slate-950 text-white border border-slate-800 p-6 sm:p-8 flex flex-col justify-between blueprint-grid-dark">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="font-mono text-xs text-slate-400">ELECTRICAL DISTRIBUTION</span>
                  <span className="font-mono text-xs text-[#60A5FA]">230V / 415V</span>
                </div>

                <svg viewBox="0 0 360 200" className="w-full h-auto my-5" role="img" aria-label="Electrical circuit schematic">
                  <g stroke="#334155" strokeWidth="2" fill="none">
                    <line x1="65" y1="60" x2="135" y2="60" />
                    <line x1="225" y1="60" x2="295" y2="60" />
                    <line x1="180" y1="95" x2="180" y2="140" stroke="#1E73B8" strokeWidth="2.5" />
                    <line x1="70" y1="140" x2="290" y2="140" stroke="#1E73B8" strokeWidth="2.5" />
                  </g>
                  <motion.circle r="3.5" fill="#60A5FA" cy="60" animate={{ x: [65, 295], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }} />
                  {[
                    { id: 'intake' as const, x: 10, w: 75, t1: 'Supply', t2: '3-Phase' },
                    { id: 'panel' as const, x: 135, w: 90, t1: 'Main Panel', t2: 'MCB / RCCB' },
                    { id: 'earth' as const, x: 275, w: 75, t1: 'Earthing', t2: 'Surge Safe' },
                  ].map((n) => (
                    <g key={n.id} onClick={() => setActiveNode(n.id)} className="cursor-pointer">
                      <rect x={n.x} y="30" width={n.w} height="60" rx="3" fill={activeNode === n.id ? '#1E73B8' : '#0F172A'} stroke="#60A5FA" strokeWidth="1.2" />
                      <text x={n.x + 11} y="56" fill="#fff" fontSize="11" fontWeight="700">{n.t1}</text>
                      <text x={n.x + 11} y="73" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono, monospace">{n.t2}</text>
                    </g>
                  ))}
                  <text x="70" y="168" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">LIGHTING · POWER · BACKUP CIRCUITS</text>
                </svg>

                <div className="border-t border-slate-800 pt-4 text-sm text-slate-300">
                  <p className="font-mono text-xs text-[#60A5FA] mb-1">{NODE_DETAILS[activeNode][0]}</p>
                  <p>{NODE_DETAILS[activeNode][1]}</p>
                </div>
              </motion.div>
            </div>

            {/* Founder & Class 'A' Heritage */}
            <div className="bg-slate-950 text-white border-t border-slate-800 py-14 sm:py-18 blueprint-grid-dark">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5">
                  <LogoHeading lead="Our Heri" accent="tage" sub="Class ‘A’ Electrical Contractors" dark />
                  <div className="mt-6 border border-slate-800 bg-slate-900/90 p-5">
                    <p className="font-mono text-xs text-[#60A5FA]">FOUNDER &amp; PRINCIPAL ENGINEER</p>
                    <p className="mt-1.5 text-xl font-bold text-white">Mr. Satheesh Kumar T C</p>
                    <p className="text-sm text-slate-300">Electrical Engineer · Visionary Leadership</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  <p>
                    Established by <strong className="text-white">Mr. Satheesh Kumar T C</strong>, an Electrical Engineer driven by the pursuit of engineering excellence, Lakshmi Electricals began as a focused entrepreneurial venture built on adaptability, technical curiosity, and the readiness to take on demanding electrical challenges.
                  </p>
                  <p>
                    By continuously raising workmanship benchmarks and embracing modern electrical practices and technologies, the firm has achieved steady growth through resolute leadership, dedicated teamwork, seasoned guidance, and disciplined planning at every stage of execution.
                  </p>
                  <p className="text-white font-semibold pt-1">
                    Today, Lakshmi Electricals stands recognized among Kerala’s premier Class ‘A’ Electrical Contractors—delivering trusted contracting services across India.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PAGE 2: SERVICES */}
          <section id="services" className="bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <LogoHeading lead="Our Serv" accent="ices" sub="Electrical Contracting Scope" />
                  <p className="mt-5 text-base text-slate-600 max-w-xl leading-relaxed">
                    Five decades of hands-on electrical contracting across wiring, panel setup, earthing, backup integration, and maintenance.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 self-start">
                  {[['all', 'All Services'], ['wiring', 'Wiring & Panels'], ['safety', 'Safety & Backup']].map(([id, label]) => (
                    <button key={id} type="button" onClick={() => setFilter(id as ServiceFilter)} className={`px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${filter === id ? 'bg-[#1E73B8] text-white' : 'text-slate-600 hover:text-slate-950'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleServices.map((srv, idx) => (
                  <motion.article
                    key={srv.num}
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                    className="bg-white border border-slate-200 hover:border-[#1E73B8] transition-colors p-7 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-sm font-bold text-[#1E73B8] tabular-nums">{srv.num}.</span>
                      <h3 className="mt-2 text-xl font-bold text-slate-950 leading-snug">{srv.title}</h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
                    </div>
                    <ul className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-sm text-slate-700">
                      {srv.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <span className="text-[#1E73B8] font-bold" aria-hidden="true">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>

              {/* Our Strength */}
              <div className="mt-16 pt-14 border-t border-slate-200">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <LogoHeading lead="Our Str" accent="ength" sub="Core Pillars of Execution" />
                </motion.div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {STRENGTHS.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.35, delay: idx * 0.035, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white border border-slate-200 hover:border-[#1E73B8] transition-colors p-5 flex flex-col justify-between"
                    >
                      <span className="font-mono text-xs font-bold text-[#1E73B8] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <p className="mt-3 text-sm font-bold text-slate-900 leading-snug">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PAGE 3: CONTACT & LOCATION */}
          <section id="contact" className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 space-y-5">
                <LogoHeading lead="Contact " accent="Us" sub="Project Inquiries Across India" />

                <div className="border border-slate-200 p-5 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1E73B8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-slate-500">HEAD OFFICE</p>
                    <p className="mt-1 text-base font-bold text-slate-950">{INFO.name}</p>
                    <p className="text-sm text-slate-700">{INFO.address}</p>
                  </div>
                </div>

                <div className="border border-slate-200 p-5 space-y-3">
                  <p className="font-mono text-xs text-slate-500">PHONE NUMBERS</p>
                  {INFO.phones.map((p) => (
                    <div key={p.raw} className="flex items-center justify-between gap-4 pt-1 first:pt-0">
                      <a href={p.href} className="inline-flex items-center gap-2.5 font-mono text-base sm:text-lg font-bold text-slate-950 hover:text-[#1E73B8] tabular-nums">
                        <Phone className="w-4 h-4 text-[#1E73B8] shrink-0" />
                        <span>{p.display}</span>
                      </a>
                      <button type="button" onClick={() => copyText(p.raw, p.raw)} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:border-[#1E73B8] text-slate-700 inline-flex items-center gap-1 shrink-0 cursor-pointer">
                        {copied === p.raw ? <Check className="w-3.5 h-3.5 text-[#1E73B8]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied === p.raw ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border border-slate-200 p-4 flex items-center justify-between gap-4">
                  <a href={INFO.emailHref} className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold text-slate-950 hover:text-[#1E73B8] truncate">
                    <Mail className="w-4 h-4 text-[#1E73B8] shrink-0" />
                    <span className="truncate">{INFO.email}</span>
                  </a>
                  <button type="button" onClick={() => copyText(INFO.email, 'email')} className="px-3 py-1.5 text-xs font-semibold border border-slate-200 hover:border-[#1E73B8] text-slate-700 inline-flex items-center gap-1 shrink-0 cursor-pointer">
                    {copied === 'email' ? <Check className="w-3.5 h-3.5 text-[#1E73B8]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-9">
                {!sent ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-950">Send a Project Inquiry</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="f-name" className="block text-sm font-semibold text-slate-800">Name *</label>
                        <input id="f-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name or company" className="mt-1 w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1E73B8]" />
                      </div>
                      <div>
                        <label htmlFor="f-phone" className="block text-sm font-semibold text-slate-800">Phone Number *</label>
                        <input id="f-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98473 53544" className="mt-1 w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-[#1E73B8]" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-scope" className="block text-sm font-semibold text-slate-800">Work Type</label>
                      <select id="f-scope" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} className="mt-1 w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1E73B8]">
                        {SERVICES.map((s) => (
                          <option key={s.num} value={s.title}>{s.num}. {s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="f-note" className="block text-sm font-semibold text-slate-800">Project Details *</label>
                      <textarea id="f-note" rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Location and electrical work required..." className="mt-1 w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1E73B8]" />
                    </div>
                    {err && <p className="text-xs font-semibold text-red-700">{err}</p>}
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1E73B8] hover:bg-[#165991] transition-colors cursor-pointer">
                      <Send className="w-4 h-4" />
                      <span>Prepare Inquiry</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 py-4">
                    <p className="inline-flex items-center gap-2 text-sm font-bold text-[#1E73B8]"><Check className="w-4 h-4" /> Inquiry Ready</p>
                    <h3 className="text-xl font-bold text-slate-950">Send to {INFO.name}</h3>
                    <p className="text-sm text-slate-600">
                      Click below to send directly to <span className="font-semibold text-slate-900">{INFO.email}</span> or call <span className="font-mono font-semibold text-slate-900">+91 98473 53544</span>.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href={mailtoHref} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1E73B8] hover:bg-[#165991]">
                        <Mail className="w-4 h-4" /> Open Email Client
                      </a>
                      <button type="button" onClick={() => setSent(false)} className="px-4 py-2.5 text-sm font-semibold border border-slate-300 bg-white cursor-pointer">Edit</button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <p className="text-white font-semibold">{INFO.name} · <span className="font-normal text-slate-400">{INFO.address}</span></p>
            <p className="font-mono tabular-nums">+91 98473 53544 · +91 79078 84408 · {INFO.email}</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
