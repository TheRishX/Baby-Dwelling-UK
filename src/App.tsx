// @ts-ignore: allow missing react types in development environment
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, ActiveView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import ProductDetailView from './views/ProductDetailView';
import CartDrawer from './components/CartDrawer';
import CustomPageView from './views/CustomPageView';
import SeoView from './views/SeoView';
import { siteContent } from './data/siteContent';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPageSlug, setCurrentPageSlug] = useState<string>('about-us');
  const [selectedProductId, setSelectedProductId] = useState<string>('signature-heritage');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Single Source of Truth
  const siteConfig = siteContent;

  // Basket Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bd_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Open triggers
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync Cart to storage
  useEffect(() => {
    localStorage.setItem('bd_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Ensure dark class is removed so it is always the light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, color?: string) => {
    setCart((prev: CartItem[]) => {
      const matchIndex = prev.findIndex((item: CartItem) => item.product.id === product.id);
      if (matchIndex > -1) {
        const copy = [...prev];
        copy[matchIndex].quantity += 1;
        triggerToast(`🛒 Quantity updated in cart for ${product.title}`);
        return copy;
      } else {
        triggerToast(`✨ Added ${product.title} to your cart`);
        return [...prev, { product, quantity: 1, selectedColor: color }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev: CartItem[]) =>
      prev
        .map((item: CartItem) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item: CartItem) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev: CartItem[]) => prev.filter((item: CartItem) => item.product.id !== productId));
    triggerToast('🗑️ Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast('🗑️ Cart cleared');
  };

  const handleNavigateToShop = (category: string = 'all') => {
    setCategoryFilter(category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDetail = (productId: string = 'signature-heritage') => {
    setSelectedProductId(productId);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-warm-white text-charcoal flex flex-col font-sans relative">
      {/* Custom Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-charcoal text-white px-5 py-3 rounded-2xl shadow-xl z-[9999] flex items-center gap-2 border border-sand/20 animate-fadeIn font-semibold text-xs">
          <span className="w-2 h-2 rounded-full bg-[#008060]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Header & Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        siteConfig={siteConfig}
        currentPageSlug={currentPageSlug}
        setCurrentPageSlug={setCurrentPageSlug}
        onNavigateToShop={handleNavigateToShop}
      />

      {/* Main Views Container with fluid animations */}
      <main className="flex-grow pb-16">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <HomeView
                onNavigateToShop={handleNavigateToShop}
                onNavigateToDetail={handleNavigateToDetail}
                siteConfig={siteConfig}
                setCurrentPageSlug={setCurrentPageSlug}
                setActiveView={setActiveView}
              />
            </motion.div>
          )}

          {activeView === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <ShopView
                initialCategoryFilter={categoryFilter}
                onViewProduct={handleNavigateToDetail}
                onAddToCart={handleAddToCart}
                siteConfig={siteConfig}
              />
            </motion.div>
          )}

          {activeView === 'detail' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <ProductDetailView
                productId={selectedProductId}
                onAddToCart={handleAddToCart}
                siteConfig={siteConfig}
              />
            </motion.div>
          )}

          {activeView === 'page' && (
            <motion.div
              key="page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <CustomPageView
                pageSlug={currentPageSlug}
                siteConfig={siteConfig}
                onNavigateHome={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToShop={() => handleNavigateToShop('all')}
              />
            </motion.div>
          )}

          {activeView === 'seo' && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <SeoView
                siteConfig={siteConfig}
                onNavigateToView={(view) => {
                  setActiveView(view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                setCurrentPageSlug={setCurrentPageSlug}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Unified Footing Section */}
      <Footer
        setActiveView={setActiveView}
        siteConfig={siteConfig}
        currentPageSlug={currentPageSlug}
        setCurrentPageSlug={setCurrentPageSlug}
        onNavigateToShop={handleNavigateToShop}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        siteConfig={siteConfig}
      />
    </div>
  );
}
