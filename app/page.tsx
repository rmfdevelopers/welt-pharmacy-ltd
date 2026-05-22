'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Clock, 
  Search, 
  Microscope, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Menu, 
  X, 
  Instagram, 
  Activity, 
  Users, 
  ImageOff,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: mono-accent

const BRIEF = {
  brand: {
    name: "Welt Pharmacy Ltd",
    tagline: "The Vanguard of Healthy Living",
    description: "Port Harcourt's premier 24-hour healthcare hub specializing in rare drug sourcing, vaccines, and advanced laboratory services with a commitment to pharmaceutical excellence.",
    industry: "services",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2349016000413",
    instagram: "@weltpharma",
    email: "",
    address: "236 Aba Expressway, beside Tantalizer fast food, Bori Camp, Rumuola Port Harcourt, Rivers State"
  },
  colors: {
    primary: "#4B0082",
    secondary: "#FDFBFF",
    accent: "#9370DB"
  },
  products: [
    { name: "Rare Drug Sourcing Service", description: "Specialized procurement of hard-to-find international pharmaceutical medications.", price: "₦150,000", url: "https://images.unsplash.com/photo-1579154204601-01588f351e67" },
    { name: "Premium Vitamin Complex", description: "High-potency daily supplements for immune support and long-term vitality.", price: "₦18,500", url: "https://images.unsplash.com/photo-1582719299074-be127353065f" },
    { name: "Advanced Laboratory Screening", description: "Comprehensive diagnostic panels conducted in our state-of-the-art facility.", price: "₦45,000", url: "https://images.unsplash.com/photo-1748000970909-845f4aa144d2" },
    { name: "Dermatological Care Kit", description: "Expert-curated skin care solutions for clinical-grade results.", price: "₦35,000", url: "https://images.unsplash.com/photo-1629380108599-ea06489d66f5" }
  ],
  features: [
    { title: "24/7 Clinical Support", description: "Always open to provide critical healthcare and medication when you need it most.", icon: Clock },
    { title: "Expert Sourcing", description: "Global network to find rare vaccines and specialized medications unavailable elsewhere.", icon: Search },
    { title: "Laboratory Excellence", description: "Precise and rapid laboratory services integrated within our pharmaceutical care.", icon: Microscope },
    { title: "Rapid Home Delivery", description: "Swift and secure dispatch of your prescriptions across Port Harcourt.", icon: Truck }
  ],
  sections: {
    hero: { headline: "Modern Healthcare, Timeless Care.", cta: "Explore Services" },
    features: { title: "Clinical Excellence", subtitle: "Comprehensive pharmaceutical solutions designed for your wellbeing." },
    process: { 
      title: "Our Care Model", 
      steps: [
        { number: "01", title: "Consultation", description: "Expert pharmaceutical guidance for your specific needs." },
        { number: "02", title: "Sourcing", description: "Locating even the rarest medications worldwide." },
        { number: "03", title: "Delivery", description: "Ensuring your health essentials reach you safely." }
      ]
    },
    products: { title: "Premium Health Essentials", subtitle: "Curated pharmaceuticals, supplements, and rare medications." },
    about: { 
      title: "Port Harcourt's Trusted Pharmacy", 
      description: "Welt Pharmacy Ltd stands as a beacon of modern healthcare at Bori Camp. We blend traditional pharmaceutical care with modern logistics to ensure no patient is left without their vital medication.",
      stats: [
        { number: "200+", label: "Satisfied Clients" },
        { number: "24/7", label: "Hours Active" },
        { number: "3.5k+", label: "Followers" }
      ]
    },
    testimonials: {
      title: "Health Stories",
      items: [
        { name: "Dr. Chima Obi", text: "The only pharmacy in Port Harcourt that could source my specific rare drug within 48 hours. Exceptional service.", role: "Physician" },
        { name: "Mrs. Ngozi Adeleke", text: "Their 24-hour service saved us during a midnight emergency. Professional and very empathetic staff.", role: "Parent" },
        { name: "Engr. Tunde Williams", text: "The laboratory services are efficient and the results were delivered to my email faster than expected.", role: "Business Executive" }
      ]
    }
  },
  heroImage: "https://images.unsplash.com/photo-1698932665113-c31d8c7ac8c5"
};

const useScrollReveal = (threshold = 0.1) => {
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

const useTypewriter = (text: string, speed = 50) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#4B0082]/60 to-[#9370DB]/10 ${fallbackClassName ?? className ?? ''}`}>
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Pharmacy', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#4B0082]/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-primary text-xl">W</div>
          <span className="font-heading font-bold text-white text-xl tracking-tight hidden sm:block">Welt Pharma</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-white/70 hover:text-white font-medium text-sm transition-colors">{link.name}</a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Get a Quote
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#4B0082] p-8 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-black text-primary">W</div>
              <span className="font-heading font-bold text-white">Welt Pharma</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white"><X size={28} /></button>
          </div>
          <div className="space-y-6">
            {links.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="block text-2xl font-heading font-bold text-white">{link.name}</a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full bg-accent text-primary text-center py-4 rounded-xl font-bold mt-10">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Page() {
  const typedHeadline = useTypewriter(BRIEF.sections.hero.headline, 60);
  
  // Section Reveal States
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative">
      <Navbar />

      {/* HERO SECTION - HR-D Pattern */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 opacity-20 grayscale mix-blend-screen pointer-events-none">
          <SafeImage src={BRIEF.heroImage} alt="Welt Pharmacy Interior" fill className="object-cover" priority />
        </div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {typedHeadline}<span className="text-accent animate-pulse">_</span>
          </h1>
          <div className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={heroReveal.ref as any}>
            <p className="text-white/40 text-base md:text-xl max-w-lg leading-relaxed">
              {BRIEF.brand.description}
            </p>
            <div className="flex items-center gap-6">
              <a href="#products" className="bg-accent text-primary px-10 py-5 rounded-full font-black text-lg
                shadow-[0_0_30px_rgba(147,112,219,0.2)] hover:scale-105 transition-all duration-300">
                {BRIEF.sections.hero.cta}
              </a>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-white/20 font-mono text-xs uppercase tracking-[0.4em] mb-1">Status</span>
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  OPEN 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS DIVIDER */}
      <div className="bg-accent py-12 relative z-20">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-black/10 text-center">
          {BRIEF.sections.about.stats.map((s, i) => (
            <div key={i} className="px-4">
              <p className="text-3xl md:text-5xl font-black text-primary tracking-tight">{s.number}</p>
              <p className="text-primary/60 text-[10px] md:text-xs mt-1 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES - F-STICKY Layout */}
      <section id="features" ref={featuresReveal.ref as any} className="py-28 bg-[#0a0a0a] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6 leading-none">
              {BRIEF.sections.features.title}
            </h2>
            <p className="text-white/40 text-xl">{BRIEF.sections.features.subtitle}</p>
          </div>
          <div className="space-y-6">
            {BRIEF.features.map((f, idx) => (
              <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
                <div className="bg-[#121212] rounded-[2rem] p-10 border border-white/5
                  shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-accent/20 transition-all duration-500 flex flex-col md:flex-row items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0
                    group-hover:bg-accent group-hover:text-primary transition-all duration-500 text-accent">
                    <f.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-3xl font-bold text-white">{f.title}</h3>
                      <span className="text-white/10 font-mono text-xl">0{idx + 1}</span>
                    </div>
                    <p className="text-white/40 mt-4 text-lg leading-relaxed max-w-xl">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION - V3 Reveal */}
      <section id="process" className="py-28 px-6 bg-primary overflow-hidden" ref={processReveal.ref as any}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl font-black text-white mb-8">{BRIEF.sections.process.title}</h2>
            <div className="space-y-12">
              {BRIEF.sections.process.steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="font-heading text-4xl font-black text-accent/30 group-hover:text-accent transition-colors">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${processReveal.isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'}`}>
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10">
              <SafeImage src="https://images.unsplash.com/photo-1748002388689-c62b45d5c28b" alt="Sterile Lab" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-EDITORIAL Pattern */}
      <section id="products" ref={productsReveal.ref as any} className="py-28 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="font-heading text-6xl font-black text-white mb-4">{BRIEF.sections.products.title}</h2>
              <p className="text-white/40 text-xl max-w-md">{BRIEF.sections.products.subtitle}</p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 text-accent font-bold text-lg">
              View All Catalog <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {BRIEF.products.map((p, i) => (
              <div key={i} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-secondary/5">
                <SafeImage src={p.url} alt={p.name} fill className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                  <div className="mb-4">
                    <h3 className="text-3xl font-heading font-black text-white mb-2 leading-tight">{p.name}</h3>
                    <p className="text-white/50 text-sm line-clamp-2 max-w-sm group-hover:opacity-100 transition-opacity">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-accent font-black text-3xl">{p.price}</span>
                    <a href="#contact" className="bg-white text-primary px-8 py-3 rounded-full font-black text-sm hover:bg-accent transition-all">
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - V9 Reveal */}
      <section id="about" ref={aboutReveal.ref as any} className="py-28 px-6 bg-secondary text-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-12" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <span className="text-accent font-mono text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Trusted Choice</span>
              <h2 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-none tracking-tight">
                {BRIEF.sections.about.title}
              </h2>
              <p className="text-primary/60 text-xl leading-relaxed mb-10 max-w-xl">
                {BRIEF.sections.about.description}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-accent pl-6">
                  <p className="font-heading text-3xl font-bold">24 Hours</p>
                  <p className="text-primary/50 text-sm mt-1 uppercase tracking-widest">Available Always</p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <p className="font-heading text-3xl font-bold">Global Sourcing</p>
                  <p className="text-primary/50 text-sm mt-1 uppercase tracking-widest">Rare Drug Network</p>
                </div>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white">
                <SafeImage src="https://images.unsplash.com/photo-1701848050469-36a5710247bf" alt="Welt Pharmacy Team" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-3xl shadow-xl max-w-[200px] text-white">
                <HeartPulse size={40} className="mb-4" />
                <p className="font-bold text-lg leading-tight">Port Harcourt's Most Reliable Hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-MASONRY */}
      <section id="testimonials" ref={testimonialsReveal.ref as any} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white text-center mb-20">{BRIEF.sections.testimonials.title}</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {BRIEF.sections.testimonials.items.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-all duration-500 ${testimonialsReveal.isVisible ? 'animate-rotateFade' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                </div>
                <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-lg border border-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C4 Pattern */}
      <section id="contact" ref={contactReveal.ref as any} className="py-32 px-6 bg-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-[12vw] md:text-[6vw] font-black text-primary leading-none mb-10 tracking-tighter">
              Visit the <br /> Vanguard
            </h2>
            <div className="space-y-8 border-l-4 border-primary/20 pl-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 shrink-0" size={24} />
                <p className="text-primary/80 text-xl font-medium max-w-sm">{BRIEF.contact.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" size={24} />
                <p className="text-primary/80 text-xl font-medium">{BRIEF.contact.whatsapp}</p>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-primary shrink-0" size={24} />
                <p className="text-primary/80 text-xl font-medium">{BRIEF.contact.instagram}</p>
              </div>
            </div>
            
            {/* Regional Slang (15% rule) */}
            <p className="mt-12 text-primary/50 font-mono text-sm uppercase tracking-widest italic">Sharp delivery, nationwide.</p>
          </div>

          <div className={`w-full relative z-10 transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-primary rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50" />
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-lg relative z-10">Our medical team will review your inquiry and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-primary p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl font-bold text-white mb-10">Direct Inquiry</h3>
                  <div className="space-y-5">
                    {(['name', 'email', 'phone'] as const).map(field => (
                      <input
                        key={field}
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={(form as any)[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    ))}
                    <textarea rows={4} placeholder="How can we help?"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full mt-10 bg-accent text-primary py-5 rounded-2xl font-black text-lg hover:brightness-110 shadow-xl transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
                    {loading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - F1 Pattern */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-primary text-xl">W</div>
                <span className="font-heading font-bold text-white text-xl tracking-tight">Welt Pharma</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                The vanguard of pharmaceutical excellence in Rivers State. Specialized healthcare, 24 hours a day.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-white/40 hover:text-accent transition-colors text-sm">Home</a></li>
                <li><a href="#products" className="text-white/40 hover:text-accent transition-colors text-sm">Our Pharmacy</a></li>
                <li><a href="#about" className="text-white/40 hover:text-accent transition-colors text-sm">About Welt</a></li>
                <li><a href="#contact" className="text-white/40 hover:text-accent transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs">Healthcare</h4>
              <ul className="space-y-4">
                <li><span className="text-white/40 text-sm">Rare Drug Sourcing</span></li>
                <li><span className="text-white/40 text-sm">Laboratory Services</span></li>
                <li><span className="text-white/40 text-sm">Vaccination Hub</span></li>
                <li><span className="text-white/40 text-sm">Home Delivery</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs">Socials</h4>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${BRIEF.contact.instagram.replace('@','')}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${BRIEF.contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Phone size={20} />
                </a>
              </div>
              <div className="mt-8">
                 <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Operational Status</p>
                 <p className="text-accent font-bold mt-1">24/7 Clinical Care</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Welt Pharmacy Ltd. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-white/10 text-xs hover:text-white transition-colors cursor-default">Privacy Policy</span>
              <span className="text-white/10 text-xs hover:text-white transition-colors cursor-default">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}