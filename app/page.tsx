'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Clock, 
  Search, 
  Truck, 
  Microscope, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Menu,
  X,
  Activity,
  Users,
  Heart,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/40 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const BRIEF = {
  brand: {
    name: "Welt Pharmacy Ltd",
    tagline: "The Vanguard of Healthy Living",
    description: "A premier 24-hour pharmaceutical hub specializing in rare drug sourcing, vaccines, and advanced laboratory services in Port Harcourt.",
    industry: "Pharmaceutical Services",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2349016000413",
    instagram: "@weltpharma",
    email: "info@weltpharma.com",
    address: "236 Aba Expressway, beside Tantalizer fast food, Bori Camp, Rumuola Port Harcourt, Rivers State"
  },
  colors: {
    primary: "#9932CC",
    secondary: "#E6E6FA",
    accent: "#000000"
  },
  products: [
    { name: "Rare Drug Sourcing Service", description: "Expert procurement of hard-to-find specialty medications through our global network.", price: "₦150,000", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462" },
    { name: "Dermatological Care Kit", description: "Premium skincare regimen curated for specific clinical skin requirements.", price: "₦45,000", image: "https://images.unsplash.com/photo-1691187861257-a56c4aa2d7fb" },
    { name: "Comprehensive Vaccine Package", description: "Full immunization schedule for adults and children in a controlled clinical setting.", price: "₦25,000", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660" },
    { name: "Premium Multivitamin Bundle", description: "High-potency daily supplements for immune support and long-term vitality.", price: "₦12,500", image: "https://images.unsplash.com/photo-1706111577646-d4c00471fa72" }
  ],
  features: [
    { title: "24/7 Pharmaceutical Access", description: "Round-the-clock availability for emergency medications and urgent care needs.", icon: <Clock size={24} /> },
    { title: "Advanced Lab Services", description: "State-of-the-art diagnostic testing and clinical laboratory evaluations.", icon: <Microscope size={24} /> },
    { title: "Rare Drug Procurement", description: "The vanguard of sourcing specialized medications not found in standard retail.", icon: <Search size={24} /> },
    { title: "Statewide Delivery", description: "Fast and temperature-controlled delivery across Port Harcourt and beyond.", icon: <Truck size={24} /> }
  ],
  stats: [
    { number: "200+", label: "Satisfied Clients", icon: <Users size={20} /> },
    { number: "3.5k+", label: "Health Community", icon: <Heart size={20} /> },
    { number: "24/7", label: "Clinical Support", icon: <Activity size={20} /> }
  ],
  testimonials: [
    { name: "Dr. Chidi Okoro", text: "Rapid delivery of rare drugs when nobody else had stock. Their sourcing network is unparalleled.", role: "Medical Practitioner" },
    { name: "Amaka Williams", text: "Their skincare consultation transformed my routine. Highly professional and knowledgeable staff.", role: "Client" },
    { name: "Tunde Bakare", text: "Best 24-hour service in Rumuola. Reliable, trustworthy, and always well-stocked.", role: "Patient" }
  ],
  process: [
    { number: "01", title: "Consultation", description: "Present your prescription or clinical requirement to our specialist pharmacists." },
    { number: "02", title: "Global Search", description: "We activate our vanguard network to locate specialized medications internationally." },
    { number: "03", title: "Clinical Verification", description: "Every sourced item undergoes rigorous quality and authenticity verification." },
    { number: "04", title: "Secure Delivery", description: "Temperature-controlled distribution to your doorstep or our Port Harcourt hub." }
  ]
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      <Header scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <DStat />
      <Features />
      <Process />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

function Header({ scrolled, isMenuOpen, setIsMenuOpen }: any) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-accent/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg font-black text-white text-xl">W</div>
          <span className="font-heading font-bold text-white text-xl tracking-tight uppercase hidden sm:block">Welt Pharma</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Services', 'Products', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-primary font-medium text-sm tracking-widest uppercase transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all">
            Speak to a Pharmacist
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-lg font-black text-white text-xl">W</div>
            <button onClick={() => setIsMenuOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Services', 'Products', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-white text-4xl font-heading font-black italic uppercase">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/20 pt-8">
            <p className="text-white/60 text-sm mb-4">{BRIEF.contact.address}</p>
            <p className="text-white font-bold">{BRIEF.contact.whatsapp}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SafeImage 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" 
          alt="Welt Pharmacy Vanguard" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      <div ref={ref} className={`relative z-10 max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="font-heading text-6xl md:text-[7rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
          Modern Healthcare <br /> At Your <span className="text-primary">Fingertips.</span>
        </h1>
        <p className="text-white/60 mt-8 text-xl max-w-xl leading-relaxed font-light">
          {BRIEF.brand.description}
        </p>
        <div className="flex flex-wrap gap-6 mt-12">
          <a href="#contact" className="bg-primary text-white px-10 py-5 font-black text-lg uppercase tracking-tighter hover:scale-105 transition-all rounded-sm flex items-center gap-3">
            Speak to a Pharmacist <ArrowRight size={20} />
          </a>
          <div className="flex items-center gap-4 text-white/40">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Est. Port Harcourt</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DStat() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="bg-primary py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {BRIEF.stats.map((s, i) => (
          <div key={i} className={`px-8 py-8 md:py-4 transition-all duration-1000 delay-${i * 200} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="flex justify-center mb-4 text-black/40">
              {s.icon}
            </div>
            <p className="text-5xl font-black text-black tracking-tighter">{s.number}</p>
            <p className="text-black/60 text-sm mt-2 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="services" ref={ref} className="py-28 px-6 bg-accent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Our Excellence</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-none uppercase">Clinical Services</h2>
          </div>
          <p className="text-white/40 max-w-sm text-lg">Why healthcare professionals and families in Rivers State choose Welt Pharmacy.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRIEF.features.map((f, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`p-10 rounded-3xl border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="mb-8 text-primary group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-secondary/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white mb-20 text-center uppercase tracking-tighter italic">Vanguard Sourcing Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {BRIEF.process.map((step, i) => (
            <div key={i} 
              className={`relative pt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="absolute top-0 left-0 text-7xl font-black text-primary/10 font-heading leading-none -z-10">{step.number}</span>
              <div className="w-12 h-px bg-primary mb-6" />
              <h3 className="text-white font-black text-xl mb-4 uppercase tracking-tight">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-accent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="font-heading text-6xl font-black text-white italic uppercase leading-none">The <span className="text-primary">Apothecary</span></h2>
          <div className="hidden md:flex gap-4">
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30"><ChevronRight className="rotate-180" /></div>
             <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center text-primary"><ChevronRight /></div>
          </div>
        </div>

        <div className="space-y-32">
          {BRIEF.products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 bg-secondary/5">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px] -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="text-primary font-mono text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Clinical Collection — 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight uppercase italic">{p.name}</h3>
                <p className="text-white/50 mt-6 text-xl leading-relaxed font-light">{p.description}</p>
                <div className="mt-10 flex flex-col gap-6">
                  <span className="text-4xl font-black text-white tracking-tighter">{p.price}</span>
                  <a href="#contact" className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-sm w-fit hover:bg-primary hover:text-white transition-all shadow-xl">
                    Order Selection
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-secondary/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
           <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden relative z-10 border border-white/10 shadow-2xl">
                 <SafeImage src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e" alt="Welt Team" fill className="object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-primary/20 rounded-[4rem] -z-10" />
           </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Our Heritage</span>
          <h2 className="font-heading text-5xl font-black text-white mb-8 leading-none italic uppercase">Serving Rivers State with Precision.</h2>
          <div className="space-y-6 text-white/50 text-lg leading-relaxed">
            <p>Located on Aba Expressway, Welt Pharmacy serves as a beacon of health in Port Harcourt. We combine modern technology with traditional pharmaceutical care.</p>
            <p>Our mandate is simple: ensure no patient goes without the treatment they need, no matter how specialized or rare the requirement may be.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck size={24} /></div>
                <span className="text-white font-bold uppercase text-xs tracking-widest">Verified Quality</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Stethoscope size={24} /></div>
                <span className="text-white font-bold uppercase text-xs tracking-widest">Expert Advice</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-accent">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white text-center mb-20 uppercase italic tracking-tighter">Patient Stories</h2>
        <div className="columns-1 md:columns-3 gap-6 space-y-6">
          {BRIEF.testimonials.map((t, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-700 group ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary/50" />)}
              </div>
              <p className="text-white/70 text-lg leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-black">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm uppercase tracking-widest">{t.name}</p>
                  <p className="text-primary text-[10px] font-mono uppercase mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-accent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-20 -z-0" />
      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          {sent ? (
            <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-secondary/10 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40 relative z-10">
                <CheckCheck size={40} className="text-primary" />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-4 uppercase">Message Received</h3>
              <p className="text-white/60 max-w-sm text-lg italic">Our pharmaceutical consultants will review your inquiry and respond via Port Harcourt hub shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-black/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
              <h3 className="font-heading text-3xl font-black text-white mb-8 uppercase italic">Clinical Inquiry</h3>
              <div className="space-y-4">
                {(['name', 'email', 'phone'] as const).map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    required={field !== 'phone'}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none transition-all focus:border-primary/50"
                  />
                ))}
                <textarea rows={4} placeholder="Requirement / Prescription details"
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none resize-none transition-all focus:border-primary/50"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full mt-8 bg-primary text-white py-5 rounded-2xl font-black text-base uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : "Initiate Consultation"}
              </button>
            </form>
          )}
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-10 leading-none uppercase italic tracking-tighter">Visit the <br /><span className="text-primary">Vanguard</span></h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-white font-bold uppercase text-xs tracking-[0.3em] mb-2">Location</p>
                <p className="text-white/50 text-lg leading-relaxed max-w-sm">{BRIEF.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-white font-bold uppercase text-xs tracking-[0.3em] mb-2">Pharmacy Hotline</p>
                <p className="text-white/50 text-lg leading-relaxed">{BRIEF.contact.whatsapp}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-white font-bold uppercase text-xs tracking-[0.3em] mb-2">Dispatch Inquiries</p>
                <p className="text-white/50 text-lg leading-relaxed">{BRIEF.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-accent pt-28 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg font-black text-white text-2xl italic">W</div>
              <span className="font-heading font-black text-3xl text-white tracking-tighter uppercase italic">Welt Pharma</span>
            </div>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">The Vanguard of Healthy Living. Sharp delivery, nationwide from our Port Harcourt hub.</p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                <span className="font-mono text-xs font-bold">IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                <span className="font-mono text-xs font-bold">TW</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                <span className="font-mono text-xs font-bold">FB</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Products', 'Contact'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/30 hover:text-primary transition-colors text-sm uppercase font-bold tracking-widest">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Dispatch Policy'].map(item => (
                <li key={item}><a href="#" className="text-white/30 hover:text-primary transition-colors text-sm uppercase font-bold tracking-widest">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Welt Pharmacy Ltd. All rights reserved clinical precision.
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500" />
             <span className="text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase italic">Hub Online — 24/7 Monitoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
}