'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Clock, 
  Search, 
  Microscope, 
  Truck, 
  ShieldCheck, 
  Users, 
  Heart, 
  Phone, 
  Instagram, 
  MapPin, 
  Mail, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  ImageOff,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: airy
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Welt Pharmacy Ltd",
  tagline: "Vanguard of Healthy Living",
  description: "Your trusted 24-hour partner for rare drug sourcing, laboratory services, and premium pharmaceutical care in Port Harcourt.",
  industry: "Pharmaceutical Services",
  region: "Nigeria"
};

const contact = {
  whatsapp: "2349016000413",
  instagram: "weltpharma",
  address: "236 Aba Expressway, beside Tantalizer fast food, Bori Camp, Rumuola Port Harcourt, Rivers State"
};

const products = [
  { 
    name: "Rare Specialty Medication", 
    description: "Hard-to-find life-saving drugs sourced through our global network.", 
    price: "₦185,000",
    url: "https://images.unsplash.com/photo-1770195957512-b45ce419c00c?q=80&w=1080"
  },
  { 
    name: "Laboratory Wellness Panel", 
    description: "Comprehensive diagnostic screening for preventive health monitoring.", 
    price: "₦45,000",
    url: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=1080"
  },
  { 
    name: "Essential Vitamin D Complex", 
    description: "High-potency supplements for immune support and bone health.", 
    price: "₦8,500",
    url: "https://images.unsplash.com/photo-1734607404574-df50e1839d6d?q=80&w=1080"
  },
  { 
    name: "Dermatological Care Kit", 
    description: "Professional-grade skincare curated for sensitive and healing skin.", 
    price: "₦32,000",
    url: "https://images.unsplash.com/photo-1687293375393-26b74ce252f7?q=80&w=1080"
  }
];

const features = [
  { title: "24/7 Availability", description: "Access professional pharmaceutical care every hour of every day.", icon: Clock },
  { title: "Rare Drug Sourcing", description: "If it exists, we find it. Our network spans the globe for your health.", icon: Search },
  { title: "Lab Services", description: "In-house laboratory for quick and accurate diagnostic results.", icon: Microscope },
  { title: "Home Delivery", description: "Fast and secure delivery of medications directly to your doorstep.", icon: Truck }
];

const testimonials = [
  { name: "Chidi Okoro", text: "They found a rare heart medication that no other pharmacy in Port Harcourt could provide.", role: "Patient" },
  { name: "Amaka Eze", text: "The laboratory services are efficient and the staff is incredibly professional. My go-to for vitamins.", role: "Regular Customer" },
  { name: "Tunde Bakare", text: "Exceptional delivery service. I received my prescription at 2 AM during an emergency.", role: "Emergency Client" }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1681418290255-a5355089dc6d?q=80&w=1080",
  "https://images.unsplash.com/photo-1579152276507-dc3208573177?q=80&w=1080",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1080",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=1080"
];

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

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/30 ${className}`}>
        <ImageOff size={24} className="text-primary/40" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={className} 
      priority={priority} 
      onError={() => setError(true)} 
    />
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal();
  const aboutRev = useScrollReveal();
  const featureRev = useScrollReveal();
  const productRev = useScrollReveal();
  const galleryRev = useScrollReveal();
  const testRev = useScrollReveal();
  const contactRev = useScrollReveal();

  return (
    <main className="relative">
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-heading font-black text-primary text-xl">W</div>
            <span className={`font-heading font-bold text-xl tracking-tight ${scrolled ? 'text-white' : 'text-primary'}`}>WELT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'Products', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-semibold tracking-wide hover:opacity-70 transition ${scrolled ? 'text-white' : 'text-primary'}`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${scrolled ? 'bg-white text-primary hover:scale-105' : 'bg-primary text-white hover:shadow-lg'}`}
            >
              Order Medication
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className={scrolled ? 'text-white' : 'text-primary'} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 shadow-2xl">
          <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="mt-16 flex flex-col gap-8">
            {['Home', 'Services', 'Products', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-heading font-bold">{item}</a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-white text-primary py-4 rounded-xl text-center font-black text-lg">Order Medication</a>
          </div>
        </div>
      </div>

      {/* Hero Section - Pattern HR-A */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-secondary/40 px-6 overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-5xl max-h-[70vh] rounded-[5rem] overflow-hidden rotate-2 pointer-events-none">
          <SafeImage src="https://images.unsplash.com/photo-1681418290255-a5355089dc6d?q=80&w=1080" alt={brand.name} fill className="object-cover" />
        </div>

        <div ref={heroRev.ref} className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
            The Vanguard of <span className="text-secondary">Healthy</span> Living
          </h1>
          <p className="text-white/80 mt-10 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Modern pharmaceutical care meeting 24-hour accessibility in Port Harcourt. We source the rare and provide the essential.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#contact" className="bg-accent text-primary px-12 py-5 font-black text-lg hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl">
              Order Medication
            </a>
            <a href="#services" className="border-2 border-white/30 text-white px-12 py-5 font-bold text-lg hover:bg-white/10 transition-all duration-300 rounded-2xl">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Divider D-RULE */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
          Professional Clinical Care
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* About Section - V9 Reveal */}
      <section id="about" className="py-28 px-6 bg-secondary/40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div ref={aboutRev.ref} className={`transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary leading-tight">Commitment Beyond the Counter</h2>
            <p className="mt-8 text-lg text-primary/70 leading-relaxed max-w-lg">
              At Welt Pharmacy Ltd, we believe healthcare should be seamless. From vaccines to complex laboratory diagnostics, we operate at the intersection of trust and innovation.
            </p>
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { number: '24/7', label: 'Care Access', icon: ShieldCheck },
                { number: '200+', label: 'Satisfied Clients', icon: Users },
                { number: '3.5k+', label: 'Followers', icon: Heart }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="text-primary" size={24} />
                    <span className="font-heading text-4xl font-black text-primary">{stat.number}</span>
                  </div>
                  <span className="text-primary/60 text-sm font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <SafeImage src="https://images.unsplash.com/photo-1579152276507-dc3208573177?q=80&w=1080" alt="Clinical setup" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Features - F-ICON-GRID - V4 Reveal */}
      <section id="services" className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">Our Specialties</h2>
            <p className="text-white/60 mt-4 text-xl">Comprehensive care designed for your modern lifestyle.</p>
          </div>
          <div ref={featureRev.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group ${featureRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="mb-6 w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <f.icon size={28} />
                </div>
                <h3 className="font-heading font-black text-white text-2xl leading-tight">{f.title}</h3>
                <p className="text-white/50 mt-4 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - P-ASYMMETRIC - V2 Reveal */}
      <section id="products" className="py-28 px-6 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-primary max-w-md">Wellness Essentials</h2>
            <p className="text-primary/50 max-w-xs text-right hidden md:block text-lg">Selected products from our curated clinical inventory.</p>
          </div>
          <div ref={productRev.ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-7 group relative rounded-[3rem] overflow-hidden h-[500px] shadow-2xl transition-all duration-700 ${productRev.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <SafeImage src={products[0].url} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-12">
                <h3 className="font-heading text-4xl font-black text-white">{products[0].name}</h3>
                <div className="flex items-center justify-between mt-5">
                  <p className="text-white/80 text-lg line-clamp-2 max-w-sm">{products[0].description}</p>
                  <span className="text-white font-black text-3xl ml-4 shrink-0">{products[0].price}</span>
                </div>
                <a href="#contact" className="inline-block mt-8 bg-accent text-primary px-10 py-4 rounded-2xl font-black text-lg hover:shadow-2xl transition">Order Now</a>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} className={`group relative rounded-[2.5rem] overflow-hidden h-[234px] shadow-xl transition-all duration-700 delay-300 ${productRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-0 p-8 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                        <p className="text-white/70 text-sm mt-1">{p.price}</p>
                      </div>
                      <a href="#contact" className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition">
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Masonry - V7 Reveal */}
      <section className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-16 text-center">Inside Welt Pharmacy</h2>
          <div ref={galleryRev.ref} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${galleryRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <SafeImage src={src} alt={`Gallery ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - T-SPOTLIGHT - V4 Reveal */}
      <section className="py-28 px-6 bg-secondary/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-20">Client Feedback</h2>
          <div ref={testRev.ref} className="space-y-12">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`relative py-12 px-10 rounded-[3rem] border border-primary/10 bg-white shadow-xl transition-all duration-700 ${testRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-white text-4xl font-black leading-none">&ldquo;</span>
                </div>
                <p className="text-primary/70 text-2xl italic leading-relaxed font-light">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-2xl border border-primary/10">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-black text-primary text-xl">{t.name}</p>
                    <p className="text-primary/40 font-bold text-sm tracking-widest uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Pattern C2 - V5 Reveal */}
      <section id="contact" className="py-28 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div ref={contactRev.ref} className={`transition-all duration-700 ${contactRev.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-none">Visit Us or Order Online</h2>
            <p className="text-white/70 text-xl max-w-md mb-12">
              Based in Port Harcourt, we provide sharp delivery nationwide. Contact us now for rare medication or lab appointments.
            </p>
            <div className="space-y-6">
              <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-5 text-white/80 hover:text-white transition group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition"><Phone size={24} /></div>
                <span className="text-lg font-bold">+{contact.whatsapp}</span>
              </a>
              <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-5 text-white/80 hover:text-white transition group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition"><Instagram size={24} /></div>
                <span className="text-lg font-bold">@{contact.instagram}</span>
              </a>
              <div className="flex items-start gap-5 text-white/80">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0"><MapPin size={24} /></div>
                <span className="text-lg font-bold leading-tight mt-3">{contact.address}</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent py-20 px-6 border-t border-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-heading font-black text-white text-xl">W</div>
              <span className="font-heading font-bold text-2xl tracking-tight text-primary">WELT</span>
            </div>
            <p className="text-primary/50 text-lg max-w-sm mb-8 leading-relaxed">
              {brand.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition"><Phone size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-primary mb-6 text-xl">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Products', 'Contact'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-primary/50 hover:text-primary transition font-medium">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-primary mb-6 text-xl">Health Partners</h4>
            <p className="text-primary/50 leading-relaxed">
              Open 24 hours a day, 365 days a year for your emergency medication needs in Rivers State.
            </p>
            <p className="mt-8 font-heading font-black text-primary text-sm tracking-widest uppercase opacity-30">
              © {new Date().getFullYear()} Welt Pharmacy Ltd
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
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
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-accent rounded-[3rem] border border-primary/10 shadow-2xl relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 relative z-10">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-primary mb-4 relative z-10">Inquiry Received</h3>
        <p className="text-primary/60 max-w-sm text-lg relative z-10">Sharp delivery, nationwide. Our pharmacist will contact you in a few minutes.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-primary font-bold underline underline-offset-4 relative z-10">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-accent/95 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-black text-primary mb-10">Fast Inquiry</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 text-primary placeholder-primary/30 text-base outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
            </div>
          ))}
          <div className="relative">
            <textarea 
              rows={4} 
              placeholder="Medication or Lab Request"
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 text-primary placeholder-primary/30 text-base outline-none resize-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Submit Request <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}