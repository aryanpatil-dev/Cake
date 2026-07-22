import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { cartCount, setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <a href="#home" className={styles.logo}>
          Frem
        </a>

        {/* Navigation Menu */}
        <nav className={styles.nav}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#categories" className={styles.navLink}>About</a>
          <a href="#highlight" className={styles.navLink}>Specials</a>
          <a href="#menu" className={styles.navLink}>Menu</a>
          <a href="#footer" className={styles.navLink}>Contact</a>
        </nav>

        {/* Actions (Cart and CTA) */}
        <div className={styles.actions}>
          <button 
            className={styles.cartBtn} 
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping cart containing ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          
          <a href="#menu" className={styles.orderBtn}>
            <span>Order Now</span>
            <ArrowRight size={14} className={styles.orderArrow} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
