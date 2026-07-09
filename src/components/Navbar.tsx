import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { ActiveView, CartItem } from '../types';
import OptimizedImage from './OptimizedImage';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  siteConfig?: any;
  currentPageSlug?: string;
  setCurrentPageSlug?: (slug: string) => void;
  onNavigateToShop?: (cat: string) => void;
}

export default function Navbar({
  activeView,
  setActiveView,
  cart,
  setIsCartOpen,
  siteConfig = {},
  currentPageSlug = '',
  setCurrentPageSlug,
  onNavigateToShop,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLogoStyle = () => {
    const filterType = siteConfig.logoFilter || 'none';
    switch (filterType) {
      case 'white':
        return { filter: 'brightness(0) invert(1)' };
      case 'invert':
        return { filter: 'invert(1)' };
      case 'terracotta':
        return { filter: 'invert(59%) sepia(19%) saturate(1212%) hue-rotate(338deg) brightness(87%) contrast(85%)' };
      case 'sage':
        return { filter: 'invert(69%) sepia(10%) saturate(415%) hue-rotate(39deg) brightness(92%) contrast(88%)' };
      case 'dark':
        return { filter: 'brightness(0)' };
      default:
        return {};
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (target: string) => {
    if (target.startsWith('page:')) {
      const pageSlug = target.replace('page:', '');
      if (setCurrentPageSlug) {
        setCurrentPageSlug(pageSlug);
      }
      setActiveView('page');
    } else if (target.startsWith('shop:')) {
      const categoryId = target.replace('shop:', '');
      if (onNavigateToShop) {
        onNavigateToShop(categoryId);
      } else {
        setActiveView('shop');
      }
    } else {
      if (target === 'shop' && onNavigateToShop) {
        onNavigateToShop('all');
      } else {
        setActiveView(target as ActiveView);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal text-warm-white py-2 text-center overflow-hidden relative z-50">
        <div className="flex justify-center items-center gap-2 w-full font-sans text-[11px] md:text-xs font-medium tracking-wide">
          <span className="flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            Free UK Delivery on orders over £50
          </span>
          <span className="mx-2 opacity-35">|</span>
          <span>30-Day Hassle-Free Returns</span>
          <span className="mx-2 opacity-35 hidden md:inline">|</span>
          <span className="hidden md:inline text-sand">Crafted for Healthy Hip Development</span>
        </div>
      </div>

      {/* TopAppBar Header */}
      <header className="bg-warm-white/90 backdrop-blur-xl border-b border-sand/20 sticky top-0 w-full z-40 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 max-w-7xl mx-auto">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-charcoal hover:text-sage transition-colors duration-300 active:scale-95 p-1 md:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <button
              onClick={() => handleNavClick('home')}
              className="font-serif text-xl md:text-2xl font-bold tracking-tight text-charcoal transition-all hover:opacity-90 cursor-pointer flex items-center"
            >
              {siteConfig.logoImage ? (
                <OptimizedImage 
                  src={siteConfig.logoImage} 
                  alt={siteConfig.logoText || 'Baby Dwelling'} 
                  height={120}
                  className={`h-8 md:h-10 object-contain transition-all ${
                    siteConfig.logoBg === 'beige'
                      ? 'bg-light-beige p-1 rounded-lg'
                      : 'bg-transparent p-0'
                  }`}
                  style={{
                    ...getLogoStyle(),
                    height: siteConfig.headerLogoHeight ? `${siteConfig.headerLogoHeight}px` : undefined,
                    maxHeight: siteConfig.headerLogoHeight ? `${siteConfig.headerLogoHeight}px` : undefined,
                  }}
                />
              ) : (
                <span>{siteConfig.logoText || 'Baby Dwelling'}</span>
              )}
            </button>
          </div>

          {/* Center: Desktop Navigation Links with animated indicator */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {(siteConfig.navigation || [
              { label: 'Our Story', target: 'home' },
              { label: 'Shop All', target: 'shop' },
              { label: 'Signature Heritage', target: 'detail' }
            ]).filter((item: any) => item.target !== 'seo').map((navItem: any, index: number) => {
              const isPageActive = navItem.target.startsWith('page:') && activeView === 'page' && currentPageSlug === navItem.target.replace('page:', '');
              const isShopActive = navItem.target === 'shop' && activeView === 'shop';
              const isHomeActive = navItem.target === 'home' && activeView === 'home';
              const isDetailActive = navItem.target === 'detail' && activeView === 'detail';
              const isSeoActive = navItem.target === 'seo' && activeView === 'seo';
              const isActive = isPageActive || isShopActive || isHomeActive || isDetailActive || isSeoActive;
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(navItem.target)}
                  className={`font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-charcoal font-bold'
                      : 'text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {navItem.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Interactive Cart Drawer Trigger) */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Interactive Cart Button with dynamic badge counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-charcoal hover:text-sage transition-all duration-300 active:scale-95 p-2 rounded-full hover:bg-light-beige/50 flex items-center gap-1 cursor-pointer"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag size={19} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-terracotta text-warm-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-sans font-bold shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden lg:inline text-xs font-sans font-semibold tracking-wider uppercase ml-1">Cart</span>
            </button>
          </div>
        </div>

        {/* Sliding Responsive Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden w-full bg-warm-white border-b border-sand/20 overflow-hidden relative z-50"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {(siteConfig.navigation || [
                  { label: 'Our Story', target: 'home' },
                  { label: 'Shop All', target: 'shop' },
                  { label: 'Signature Heritage', target: 'detail' }
                ]).filter((item: any) => item.target !== 'seo').map((navItem: any, index: number) => {
                  const isPageActive = navItem.target.startsWith('page:') && activeView === 'page' && currentPageSlug === navItem.target.replace('page:', '');
                  const isShopActive = navItem.target === 'shop' && activeView === 'shop';
                  const isHomeActive = navItem.target === 'home' && activeView === 'home';
                  const isDetailActive = navItem.target === 'detail' && activeView === 'detail';
                  const isSeoActive = navItem.target === 'seo' && activeView === 'seo';
                  const isActive = isPageActive || isShopActive || isHomeActive || isDetailActive || isSeoActive;
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavClick(navItem.target)}
                      className={`text-left font-sans text-xs font-semibold tracking-wider uppercase py-2 border-b border-sand/10 flex justify-between items-center cursor-pointer ${
                        isActive ? 'text-terracotta' : 'text-charcoal'
                      }`}
                    >
                      <span>{navItem.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
