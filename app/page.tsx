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
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Users, 
  Heart, 
  Activity, 
  ImageOff, 
  Menu, 
  X,
  Instagram
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: airy
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks & Utils ---

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

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-accent/40 ${className}`}>
        <ImageOff size={28} className="text-primary/20" />
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

// --- Content Data ---

const BRIEF = {
  brand: {
    name: "Welt Pharmacy Ltd",
    tagline: "Vanguard of Healthy Living",
    description: "Your trusted 24-hour partner in pharmaceutical care, specializing in rare drugs, vaccines, and comprehensive laboratory services with doorstep delivery.",
    industry: "health",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2349016000413",
    instagram: "@weltpharma",
    email: "contact@weltpharmacy.com",
    address: "236 Aba Expressway, beside Tantalizer fast food, Bori Camp, Rumuola Port Harcourt, Rivers State"
  },
  products: [
    { name: "Specialized Rare Medication", price: "₦185,000", description: "Hard-to-find pharmaceutical treatments sourced through our global network.", url: "https://images.unsplash.com/photo-1544991875-5dc1b05f607d?auto=format&fit=crop&q=80&w=1080" },
    { name: "Premium Vitamin Complex", price: "₦12,500", description: "High-potency daily supplements for immune support and vitality.", url: "https://images.unsplash.com/photo-1664956618021-73c47736845e?auto=format&fit=crop&q=80&w=1080" },
    { name: "Dermatological Care Set", price: "₦45,000", description: "Clinically proven skincare solutions for therapeutic results.", url: "https://images.unsplash.com/photo-1633793566189-8e9fe6f817fc?auto=format&fit=crop&q=80&w=1080" },
    { name: "Pediatric Vaccine Package", price: "₦35,000", description: "Essential immunizations administered by our certified healthcare professionals.", url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1080" }
  ],
  features: [
    { title: "24/7 Availability", description: "Round-the-clock access to essential medicines and emergency pharmaceutical care.", icon: Clock },
    { title: "Rare Drug Sourcing", description: "We specialize in finding and procuring scarce medications when others can't.", icon: Search },
    { title: "Laboratory Services", description: "Accurate diagnostic testing and laboratory analysis integrated with your care.", icon: Microscope },
    { title: "Express Delivery", description: "Swift and secure delivery of your medications. Sharp delivery, nationwide.", icon: Truck }
  ],
  testimonials: [
    { name: "Chidi Okafor", role: "Resident", text: "The only pharmacy in PH that could find my mother's rare heart medication. Truly life-saving service." },
    { name: "Amaka Pepple", role: "Business Owner", text: "Professional, clean, and very fast delivery. Their skincare range is also top-notch." },
    { name: "David Wike", role: "Father", text: "I rely on their 24-hour service for my family's needs. The staff is knowledgeable and empathetic." }
  ],
  stats: [
    { number: "200+", label: "Satisfied Clients" },
    { number: "3.5k+", label: "Community Followers" },
    { number: "24/7", label: "Active Support" }
  ],
  faqs: [
    { question: "Do you deliver at night?", answer: "Yes, our delivery services operate 24/7 for urgent medication needs within Port Harcourt." },
    { question: "Can you source drugs from abroad?", answer: "Our specialized drug sourcing team handles international procurement for rare medications." }
  ]
};

// --- Components ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-secondary/90 backdrop-blur-xl border-b border-primary/10 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-black text-xl shadow-lg">W</div>
          <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-primary'}`}>Welt Pharma</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Products', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-primary/70 hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-primary text-secondary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition shadow-md">
            Order Now
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-primary">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[60] transition-all duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-black text-xl">W</div>
            <button onClick={() => setMobileOpen(false)} className="text-secondary"><X size={32} /></button>
          </div>
          <div className="space-y-8">
            {['Services', 'Products', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block text-4xl font-black text-secondary/90 hover:text-secondary">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-secondary/50 text-sm">{BRIEF.brand.address}</p>
          </div>
        </div>
      </div>
    </nav>
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
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-accent/40 rounded-3xl border border-primary/10 shadow-xl relative overflow-hidden h-[500px]">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 relative z-10">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-3xl font-black text-primary mb-3 relative z-10">Request Received</h3>
        <p className="text-primary/60 max-w-sm text-lg relative z-10">Our pharmacist will contact you shortly to confirm your order details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-secondary p-8 sm:p-10 rounded-3xl border border-primary/10 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-primary mb-8">Prescription Request</h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative group">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-accent/30 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 text-sm outline-none transition-all duration-300 focus:bg-accent/50 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
          <div className="relative group">
            <textarea rows={4} placeholder="Medication requirements or health inquiry"
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-accent/30 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 text-sm outline-none resize-none transition-all duration-300 focus:bg-accent/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-primary text-secondary py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Submit Order <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
};

const Footer = () => (
  <footer className="bg-primary pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-black text-xl">W</div>
            <span className="text-xl font-bold text-secondary">Welt Pharma</span>
          </div>
          <p className="text-secondary/60 text-sm leading-relaxed mb-6">
            {BRIEF.brand.description}
          </p>
          <div className="flex gap-4">
             <a href={`https://wa.me/${BRIEF.contact.whatsapp}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"><Phone size={18} /></a>
             <a href={`https://instagram.com/${BRIEF.contact.instagram.replace('@','')}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-secondary font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-secondary/60 text-sm">
            <li><a href="#services" className="hover:text-white transition">Pharmaceutical Services</a></li>
            <li><a href="#products" className="hover:text-white transition">Product Inventory</a></li>
            <li><a href="#about" className="hover:text-white transition">Medical Labs</a></li>
            <li><a href="#contact" className="hover:text-white transition">Delivery Info</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-secondary font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-secondary/60 text-sm">
            <li className="flex gap-3"><MapPin size={18} className="shrink-0" /> {BRIEF.contact.address}</li>
            <li className="flex gap-3"><Phone size={18} className="shrink-0" /> +{BRIEF.contact.whatsapp}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-secondary font-bold mb-6">Service Hours</h4>
          <ul className="space-y-4 text-secondary/60 text-sm">
            <li className="flex justify-between"><span>Pharmacy</span> <span className="text-white font-medium">24 Hours</span></li>
            <li className="flex justify-between"><span>Lab Services</span> <span className="text-white font-medium">8AM - 8PM</span></li>
            <li className="flex justify-between"><span>Home Delivery</span> <span className="text-white font-medium">24 Hours</span></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 text-center">
        <p className="text-secondary/40 text-xs">© {new Date().getFullYear()} Welt Pharmacy Ltd. All Rights Reserved. Vanguard of Healthy Living.</p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-secondary">
      <Navigation />

      {/* Hero Section - HR-A Variant */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-accent/50 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 max-w-6xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-2">
          <SafeImage src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1200" alt="Pharmacy Interior" fill className="object-cover" />
        </div>

        <div ref={heroReveal.ref} className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary leading-[1.05] tracking-tight">
            Advancing the Standard of <span className="italic font-normal">Pharmaceutical Care</span>
          </h1>
          <p className="text-primary/60 mt-8 text-xl max-w-2xl mx-auto leading-relaxed">
            {BRIEF.brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#contact" className="bg-primary text-secondary px-10 py-4 font-bold text-base hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-xl">
              Order Medication
            </a>
            <a href="#services" className="border border-primary/20 text-primary px-10 py-4 font-medium text-base hover:bg-primary/5 transition-all duration-300 rounded-full">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Features - F-ICON-GRID */}
      <section id="services" ref={featuresReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-bold text-primary mb-6">Why Choose Welt Pharmacy?</h2>
            <p className="text-primary/40 text-lg max-w-2xl mx-auto">Comprehensive healthcare solutions tailored to the needs of the Port Harcourt community.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRIEF.features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-8 rounded-3xl border border-primary/5 bg-accent/30 hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 group cursor-default ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-6 w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-secondary transition-all">
                  <f.icon size={24} />
                </div>
                <h3 className="font-heading font-bold text-primary text-xl mb-4">{f.title}</h3>
                <p className="text-primary/50 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Stats - D-STAT */}
      <div className="bg-primary py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-white/20 text-center">
          {BRIEF.stats.map((s, i) => (
            <div key={i} className="px-8 py-4">
              <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">{s.number}</p>
              <p className="text-white/50 text-xs mt-2 font-medium uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About - Split V3 */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl font-bold text-primary mb-8">Our Commitment to Health</h2>
            <div className="space-y-6 text-primary/60 text-lg leading-relaxed">
              <p>Located at the heart of Port Harcourt, Welt Pharmacy Ltd transcends traditional dispensing.</p>
              <p>We provide a holistic medical ecosystem combining rare drug procurement, specialized vaccines, and professional laboratory diagnostics to ensure you never have to compromise on your health.</p>
            </div>
            <div className="mt-12 p-8 bg-accent/50 rounded-3xl border border-primary/5">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Activity /></div>
                <div>
                  <h4 className="font-bold text-primary">Accredited Laboratory</h4>
                  <p className="text-sm text-primary/50">Full-spectrum diagnostic services on-site.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`relative h-[600px] rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=1000" alt="About Welt Pharmacy" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>

      {/* Products - P-ASYMMETRIC */}
      <section id="products" ref={productsReveal.ref} className="py-32 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-heading text-5xl font-bold text-primary mb-4">Pharmacy Essentials</h2>
              <p className="text-primary/40 text-lg">Curated selection of our most requested healthcare products.</p>
            </div>
            <a href="#contact" className="hidden md:flex items-center gap-2 text-primary font-bold group">View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-7 group relative rounded-[2rem] overflow-hidden shadow-xl transition-all duration-700 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <div className="relative h-[500px]">
                <SafeImage src={BRIEF.products[0].url} alt={BRIEF.products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 p-10">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">{BRIEF.products[0].name}</h3>
                  <p className="text-white/70 text-sm max-w-sm mb-6">{BRIEF.products[0].description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-2xl">{BRIEF.products[0].price}</span>
                    <a href="#contact" className="bg-secondary text-primary px-8 py-3 rounded-full font-bold text-sm shadow-lg">Order</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {BRIEF.products.slice(1, 3).map((p, i) => (
                <div key={i} 
                  style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                  className={`group relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                  <div className="relative h-full min-h-[240px]">
                    <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-0 p-8">
                      <h3 className="font-heading text-xl font-bold text-white mb-1">{p.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white/90 font-bold">{p.price}</span>
                        <a href="#contact" className="text-secondary text-sm font-bold border-b border-secondary/40 hover:border-secondary transition">Request →</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - T-MASONRY */}
      <section ref={testimonialReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-primary text-center mb-20">Trusted by the Community</h2>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {BRIEF.testimonials.map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`break-inside-avoid bg-accent/30 p-8 rounded-[2rem] border border-primary/5 hover:border-primary/20 transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary/40" />)}
                </div>
                <p className="text-primary/70 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-primary/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-primary text-sm">{t.name}</p>
                    <p className="text-primary/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - V1 */}
      <section ref={faqReveal.ref} className="py-32 px-6 bg-accent/30">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${faqReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-5xl font-bold text-primary mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {BRIEF.faqs.map((item, i) => (
              <details key={i} className="group bg-secondary border border-primary/5 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-primary font-bold list-none">
                  {item.question}
                  <span className="text-primary text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-primary/60 leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - C1 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-secondary">
        <div className={`max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-start transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div>
            <h2 className="font-heading text-6xl font-bold text-primary mb-8 leading-tight">Connect With Our Pharmacists</h2>
            <p className="text-primary/50 text-xl leading-relaxed mb-12">Expert medical guidance and prescription fulfillment available 24/7. Reach out via your preferred channel.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Phone size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Phone & WhatsApp</h4>
                  <p className="text-primary/50">+{BRIEF.contact.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Instagram size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Instagram</h4>
                  <p className="text-primary/50">{BRIEF.contact.instagram}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary">Port Harcourt HQ</h4>
                  <p className="text-primary/50 text-sm leading-relaxed max-w-xs">{BRIEF.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
// ===== END OF FILE =====