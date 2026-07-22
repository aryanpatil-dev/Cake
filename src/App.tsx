import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import SpecialHighlight from './components/SpecialHighlight';
import InteractiveMenu from './components/InteractiveMenu';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <SpecialHighlight />
        <InteractiveMenu />
      </main>
      <Footer />
      <CartDrawer />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '24px',
              zIndex: 1000,
              backgroundColor: 'var(--color-primary)',
              color: 'var(--text-white)',
              padding: '16px 24px',
              borderRadius: '30px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <Info size={16} style={{ color: 'var(--color-accent-light)' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
