import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import ZenBackground from '../components/ZenBackground';
import OptimizedImage from '../components/customizer/OptimizedImage';

interface HomeViewProps {
  onNavigateToShop: (category?: string) => void;
  onNavigateToDetail: () => void;
  siteConfig: any;
  setCurrentPageSlug?: (slug: string) => void;
  setActiveView?: (view: any) => void;
  isCustomizing?: boolean;
}

export default function HomeView({ onNavigateToShop, onNavigateToDetail, siteConfig, setCurrentPageSlug, setActiveView, isCustomizing }: HomeViewProps) {
  const handleLinkClick = (target: string) => {
    if (target.startsWith('page:')) {
      const pageSlug = target.replace('page:', '');
      if (setCurrentPageSlug && setActiveView) {
        setCurrentPageSlug(pageSlug);
        setActiveView('page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (target.startsWith('shop:')) {
      const categoryId = target.replace('shop:', '');
      onNavigateToShop(categoryId);
    } else if (target === 'shop') {
      onNavigateToShop('all');
    } else if (target === 'detail') {
      onNavigateToDetail();
    } else if (setActiveView) {
      setActiveView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (!isCustomizing) return;
    const el = document.getElementById(`customizer-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a visual flash effect to indicate selection
      el.classList.add('ring-4', 'ring-[#008060]/30');
      setTimeout(() => el.classList.remove('ring-4', 'ring-[#008060]/30'), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-24">
      {/* Split Hero / Floating Narrative Section */}
      <section 
        onClick={() => handleSectionClick('hero')}
        className={`relative min-h-[750px] flex items-center justify-center overflow-hidden rounded-b-[2.5rem] bg-light-beige/25 border-b border-sand/20 px-5 md:px-16 py-16 group/hero transition-all duration-300 ${
          isCustomizing 
            ? 'cursor-pointer hover:ring-2 hover:ring-[#008060] ring-offset-2 relative outline-dashed outline-1 outline-[#008060]/40' 
            : ''
        }`}
      >
        {isCustomizing && (
          <div className="absolute top-4 right-4 bg-[#008060] text-white text-[10px] font-bold px-3 py-1 rounded-full z-50 shadow flex items-center gap-1.5 transition-all opacity-80 group-hover/hero:opacity-100">
            <span>✏️ Hero Section</span>
          </div>
        )}
        
        {/* Cinematic Flowing Silk Canvas Background inside the Hero */}
        <div className="absolute inset-0 z-0">
          <ZenBackground />
          <OptimizedImage
            src={siteConfig.heroImage}
            alt="Parenthood bond carrier"
            width={1600}
            className="w-full h-full object-cover object-top opacity-[0.92] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-white/10 to-warm-white/40" />
        </div>

        {/* Narrative Box Floating Content Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end md:items-center justify-between h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full md:w-1/2 glass-panel p-8 md:p-14 rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.03)] border border-sand/30 text-left"
          >
            <span className="font-sans text-xs font-bold text-terracotta uppercase tracking-widest mb-4 block">
              {siteConfig.heroTagline}
            </span>
            <h1 
              className="font-serif text-3xl md:text-5xl font-bold text-charcoal leading-[1.1] tracking-tight mb-6"
              dangerouslySetInnerHTML={{ __html: siteConfig.heroTitle }}
            />
            <p className="font-sans text-sm md:text-base text-charcoal/70 mb-8 max-w-md leading-relaxed">
              {siteConfig.heroSubtitle}
            </p>
            
            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleLinkClick(siteConfig.heroCta1Link || 'shop')}
                className="bg-charcoal text-warm-white hover:opacity-95 font-sans text-xs font-semibold tracking-wider uppercase px-8 py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer text-center"
              >
                {siteConfig.heroCta1Text || 'Shop Collection'}
              </button>
              <button
                onClick={() => handleLinkClick(siteConfig.heroCta2Link || 'detail')}
                className="bg-transparent border border-charcoal/30 text-charcoal hover:bg-charcoal/5 font-sans text-xs font-semibold tracking-wider uppercase px-8 py-4 rounded-xl transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>{siteConfig.heroCta2Text || 'Signature Heritage'}</span>
                <Eye size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badging / Value statements ribbon */}
      <section 
        onClick={() => handleSectionClick('badges')}
        className={`px-5 md:px-16 max-w-7xl mx-auto w-full group/badges ${
          isCustomizing 
            ? 'cursor-pointer hover:ring-2 hover:ring-[#008060] ring-offset-2 relative outline-dashed outline-1 outline-[#008060]/40 rounded-2xl' 
            : ''
        }`}
      >
        {isCustomizing && (
          <div className="absolute top-2 right-6 bg-[#008060] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-50 shadow transition-all opacity-80 group-hover/badges:opacity-100">
            <span>✏️ Trust Badges</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 px-8 rounded-2xl bg-light-beige/35 border border-sand/15 shadow-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-charcoal">{siteConfig.badge1Title}</h4>
              <p className="font-sans text-xs text-charcoal/60 mt-0.5">{siteConfig.badge1Text}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sand/15 text-terracotta flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-charcoal">{siteConfig.badge2Title}</h4>
              <p className="font-sans text-xs text-charcoal/60 mt-0.5">{siteConfig.badge2Text}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center flex-shrink-0">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-charcoal">{siteConfig.badge3Title}</h4>
              <p className="font-sans text-xs text-charcoal/60 mt-0.5">{siteConfig.badge3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Category Showcase Grid with precise matches */}
      <section 
        onClick={() => handleSectionClick('categories')}
        className={`px-5 md:px-16 max-w-7xl mx-auto w-full group/categories relative ${
          isCustomizing 
            ? 'cursor-pointer hover:ring-2 hover:ring-[#008060] ring-offset-2 relative outline-dashed outline-1 outline-[#008060]/40 rounded-2xl p-4' 
            : ''
        }`}
      >
        {isCustomizing && (
          <div className="absolute top-2 right-6 bg-[#008060] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-50 shadow transition-all opacity-80 group-hover/categories:opacity-100">
            <span>✏️ Curated Collections</span>
          </div>
        )}
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-bold text-terracotta uppercase tracking-widest">
            Carefully Curated Collections
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-charcoal mt-2">
            Curated for Connection
          </h2>
          <p className="font-sans text-xs md:text-sm text-charcoal/60 max-w-2xl mx-auto mt-3 leading-relaxed">
            Explore our premium range designed to support every single stage of your babywearing journey.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(siteConfig.categories || [])
            .filter((cat: any) => cat.id !== 'all')
            .map((cat: any) => (
              <div
                key={cat.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToShop(cat.id);
                }}
                className="group block relative overflow-hidden rounded-3xl aspect-[3/4] bg-light-beige/35 border border-sand/20 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                {cat.image ? (
                  <OptimizedImage
                    src={cat.image}
                    alt={cat.name}
                    width={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-light-beige/60 flex items-center justify-center text-charcoal/40 text-xs font-sans">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-warm-white">
                  {cat.subtitle && (
                    <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-sand opacity-90">{cat.subtitle}</span>
                  )}
                  <h3 className="font-serif text-xl font-bold mt-1 mb-2">{cat.name}</h3>
                  <p className="font-sans text-[11px] font-semibold opacity-85 flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ArrowRight size={12} />
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
