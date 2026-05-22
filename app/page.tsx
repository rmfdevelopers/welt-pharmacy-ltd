'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Clock, Search, Activity, Truck, Phone, Mail, MapPin, 
  CheckCheck, ArrowRight, Loader2, Menu, X, Microscope, 
  FlaskConical, ShieldCheck, HeartPulse, ImageOff, Users, Heart 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: oversized

// ===== COMPONENTS =====

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-zinc-700" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? width : undefined} 
      height={!fill ? height : undefined} 
      className={className} 
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<any>(null);
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

// ===== DATA =====

const brand = {
  name: "Welt Pharmacy Ltd",
  tagline: "Vanguard of Healthy Living",
  description: "A premier 24-hour healthcare provider specializing in rare drug sourcing, vaccines, and advanced pharmaceutical care.",
  industry: "Health",
  region: "Nigeria"
};

const contact = {
  whatsapp: "2349016000413",
  address: "236 Aba Expressway, beside Tantalizer, Bori Camp, Rumuola, Port Harcourt",
  instagram: "weltpharma"
};

const stats = [
  { number: "200+", label: "Satisfied Clients", icon: Users },
  { number: "3.5k+", label: "Social Followers", icon: Heart },
  { number: "24/7", label: "Pharmacy Access", icon: ShieldCheck },
  { number: "100%", label: "Drug Authenticity", icon: CheckCheck }
];

const features = [
  { title: "24/7 Availability", description: "Round-the-clock access to critical medication and professional advice.", icon: Clock },
  { title: "Rare Drug Sourcing", description: "Expert network for procuring specialized medicine globally.", icon: Search },
  { title: "Lab Services", description: "On-site clinical laboratory for accurate and swift diagnostics.", icon: Activity },
  { title: "Express Delivery", description: "Swift and secure door-to-door delivery for all prescriptions.", icon: Truck }
];

const products = [
  { name: "Immune Boost Vitamin Pack", description: "High-potency essential vitamins for daily vitality and defense.", price: "₦12,500", img: "https://images.unsplash.com/photo-1777307275337-342e5ca9732a?q=80&w=1080" },
  { name: "Derm-Care Luxury Set", description: "Advanced skin restoration and hydration kit for sensitive skin.", price: "₦45,000", img: "https://images.unsplash.com/photo-1669707040789-b39a52afb84c?q=80&w=1080" },
  { name: "Rare Drug Sourcing Service", description: "Global procurement of specialized and hard-to-find medications.", price: "₦180,000", img: "https://images.unsplash.com/photo-1582719366950-f23838e207e7?q=80&w=1080" },
  { name: "Premium Wellness Checkup", description: "Comprehensive laboratory screening and pharmaceutical consultation.", price: "₦35,000", img: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?q=80&w=1080" }
];

const gallery = [
  "https://images.unsplash.com/photo-1669101283516-e608dcf142df",
  "https://images.unsplash.com/photo-1669101283142-a61e26f8c352",
  "https://images.unsplash.com/photo-1669707040789-b39a52afb84c",
  "https://images.unsplash.com/photo-1663365520153-0124d0e7cf98",
  "https://images.unsplash.com/photo-1732690233982-1d4567384ea1"
];

const testimonials = [
  { name: "Chinedu Okoro", text: "They found a rare medication for my father when no one else in the city could. Truly life-savers.", role: "Regular Customer" },
  { name: "Amaka Eze", text: "The 24-hour service is a relief. Their skincare recommendations have completely transformed my routine.", role: "Skincare Client" },
  { name: "Tunde Williams", text: "Professional lab services and very fast results. The staff is knowledgeable and very courteous.", role: "Lab Patient" }
];

// ===== SECTIONS =====

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg font-black text-black">W</div>
          <span className="font-heading font-black text-xl tracking-tighter uppercase">Welt Pharma</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Pharmacy Store', 'About Us', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">{link}</a>
          ))}
          <a href="#contact" className="bg-secondary text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">Get Started</a>
        </div>
        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white"><Menu /></button>
      </div>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#0a0a0a] border-l border-white/10 p-10 flex flex-col">
          <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-white/40"><X size={32} /></button>
          <div className="space-y-8">
            {['Services', 'Pharmacy Store', 'About Us', 'Contact'].map(link => (
              <a key={link} onClick={() => setMobileOpen(false)} href={`#${link.toLowerCase().replace(' ', '-')}`} className="block text-3xl font-heading font-bold">{link}</a>
            ))}
          </div>
          <div className="mt-auto">
            <a href="#contact" onClick={() => setMobileOpen(false)} className="w-full block bg-secondary text-black text-center py-4 rounded-xl font-bold">Contact Specialist</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  const typedText = useTypewriter("Securing Your Health, Day and Night.");
  
  return (
    <section ref={ref} id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20">
      <div className="absolute inset-0 opacity-30 grayscale pointer-events-none">
         <SafeImage src="https://images.unsplash.com/photo-1681418290255-a5355089dc6d" alt="Pharmacy Interior" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,104,238,0.15),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <h1 className={`font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase italic transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          {typedText}<span className="text-secondary animate-pulse">_</span>
        </h1>
        <div className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-white/40 text-lg max-w-sm leading-relaxed">
            Expert pharmaceutical care, rare drug sourcing, and clinical laboratory services in the heart of Port Harcourt.
          </p>
          <a href="#contact" className="bg-secondary text-black px-12 py-5 rounded-full font-black text-lg shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(255,255,255,0.1)] transition-all shrink-0">
            Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const IconMap: any = { Clock, Search, Activity, Truck };

  return (
    <section ref={ref} id="services" className="py-28 bg-[#050505] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">Comprehensive Care</h2>
          <p className="text-white/30 text-xl mt-4 font-medium uppercase tracking-[0.2em]">Clinical Precision</p>
        </div>
        <div className="space-y-4">
          {features.map((f, idx) => {
            const Icon = IconMap[f.icon] || ShieldCheck;
            return (
              <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
                <div className="bg-[#0f0f0f] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-10">
                  <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all duration-500 group-hover:scale-110">
                    <Icon className="text-secondary group-hover:text-black transition-colors" size={36} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">{f.title}</h3>
                      <span className="text-white/10 font-mono text-xl">/ 0{idx + 1}</span>
                    </div>
                    <p className="text-white/50 text-lg leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DividerStats = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center px-6">
        {stats.map((s, i) => (
          <div key={i} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <p className="text-5xl font-black text-black tracking-tighter">{s.number}</p>
            <p className="text-black/60 text-sm mt-1 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryMasonry = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white mb-14 text-center">Our Clinical Space</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {gallery.map((src, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <SafeImage src={src} alt={`Clinical Space ${i}`} width={800} height={600} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsStore = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="pharmacy-store" className="py-28 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none">Pharmacy Store</h2>
          <p className="text-white/40 max-w-xs text-lg md:text-right">Curated health and wellness products for a better life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <div key={i} className={`group relative h-[450px] rounded-[3rem] overflow-hidden transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <SafeImage src={p.img} alt={p.name} fill className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <h3 className="text-4xl font-heading font-bold text-white mb-2">{p.name}</h3>
                <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-32">
                  <p className="text-white/50 text-lg mb-6 leading-relaxed">{p.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-secondary font-black text-3xl">{p.price}</span>
                  <a href="#contact" className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-secondary hover:text-black transition-all">Order Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-black text-white mb-16">Patient Stories</h2>
        <div className="space-y-12">
          {testimonials.map((t, i) => (
            <div key={i} className={`relative py-14 px-10 rounded-[3rem] border border-white/5 glass-panel transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-black text-3xl font-black leading-none">“</span>
              </div>
              <p className="text-white/70 text-2xl md:text-3xl leading-snug font-medium italic">{t.text}</p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-black text-xl border border-secondary/20 uppercase">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-white/40 text-sm uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-secondary/5 rounded-[3rem] border border-white/10">
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/30">
          <CheckCheck size={48} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent</h3>
        <p className="text-white/50 max-w-sm text-lg">Thank you. Our specialists in Port Harcourt will review your inquiry and respond shortly.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-secondary font-bold hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10 uppercase tracking-tighter">Clinical Inquiry</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none transition-all focus:bg-white/10 focus:border-secondary"
            />
          ))}
          <textarea 
            rows={4} 
            placeholder="HOW CAN WE ASSIST YOU?"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none resize-none transition-all focus:bg-white/10 focus:border-secondary"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full mt-10 bg-secondary text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
        </button>
      </div>
    </form>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-10 leading-none">Get Expert Care.</h2>
          <p className="text-white/40 text-xl leading-relaxed mb-12">
            Professional healthcare at your fingertips. Sharp procurement, worldwide sourcing, and local delivery.
          </p>
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-secondary transition-all">
                <Phone className="text-white group-hover:text-black" size={24} />
              </div>
              <div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">WhatsApp Hotline</p>
                <a href={`https://wa.me/${contact.whatsapp}`} className="text-xl font-bold text-white hover:text-secondary">+{contact.whatsapp}</a>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-secondary transition-all">
                <MapPin className="text-white group-hover:text-black" size={24} />
              </div>
              <div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-medium text-white/70 max-w-xs">{contact.address}</p>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl font-black text-black text-xl">W</div>
            <span className="font-heading font-black text-2xl tracking-tighter uppercase italic">Welt Pharma</span>
          </div>
          <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
            The vanguard of healthy living. 24-hour pharmaceutical excellence in Port Harcourt.
          </p>
          <div className="flex gap-4">
             <a href={`https://instagram.com/${contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black transition-all">
               <HeartPulse size={20} />
             </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
          <ul className="space-y-4">
            {['Services', 'Pharmacy Store', 'About Us', 'Contact'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-secondary transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Clinical Hours</h4>
          <ul className="space-y-4 text-white/40">
            <li className="flex justify-between"><span>Pharmacy</span> <span className="text-secondary font-bold">24/7</span></li>
            <li className="flex justify-between"><span>Laboratory</span> <span className="text-white/60">6AM - 10PM</span></li>
            <li className="flex justify-between"><span>Consultancy</span> <span className="text-white/60">9AM - 6PM</span></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30">
        <p>© {new Date().getFullYear()} Welt Pharmacy Ltd. All rights reserved.</p>
        <p className="font-mono tracking-tighter">NIGERIA • PORT HARCOURT</p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <DividerStats />
      <GalleryMasonry />
      <ProductsStore />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
// ===== END OF SITE =====