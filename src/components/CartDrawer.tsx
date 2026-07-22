import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

// Import images to map them dynamically
import heroCake from '../assets/hero-cake.png';
import latteCoffee from '../assets/latte-coffee.png';
import chocolateCake from '../assets/chocolate-cake.png';
import lemonPastry from '../assets/lemon-pastry.png';
import strawberryCupcake from '../assets/strawberry-cupcake.png';

const imageMap: Record<string, string> = {
  'hero-cake.png': heroCake,
  'latte-coffee.png': latteCoffee,
  'chocolate-cake.png': chocolateCake,
  'lemon-pastry.png': lemonPastry,
  'strawberry-cupcake.png': strawberryCupcake,
};

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    cartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    clearCart
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    if (cartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cartOpen, setCartOpen]);

  // Reset checkout states when cart is closed
  useEffect(() => {
    if (!cartOpen) {
      setTimeout(() => {
        setIsCheckingOut(false);
        setCheckoutSuccess(false);
      }, 300);
    }
  }, [cartOpen]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API Call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 2000);
  };

  const deliveryFee = cartTotal > 30 || cartTotal === 0 ? 0 : 4.99;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Cart Sidebar */}
          <motion.div 
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <ShoppingBag size={20} />
                <span>Your Order</span>
              </div>
              <button 
                className={styles.closeBtn} 
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Switcher */}
            <div className={styles.content}>
              {checkoutSuccess ? (
                /* Checkout Success Page */
                <motion.div 
                  className={styles.successWrapper}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 size={64} className={styles.successIcon} />
                  <h3 className={styles.successTitle}>Sweet Success!</h3>
                  <p className={styles.successText}>
                    Your order has been received. Our chefs are preparing your delicious baked treats now!
                  </p>
                  <button 
                    className={styles.successBtn} 
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Exploring
                  </button>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className={styles.emptyState}>
                  <ShoppingBag size={48} className={styles.emptyIcon} />
                  <p className={styles.emptyText}>Your cart is currently empty.</p>
                  <button 
                    className={styles.shopBtn} 
                    onClick={() => setCartOpen(false)}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className={styles.itemList}>
                  {cartItems.map((item) => {
                    const displayImg = imageMap[item.image] || strawberryCupcake;
                    return (
                      <motion.div 
                        key={item.id} 
                        className={styles.item}
                        layout
                        exit={{ opacity: 0, x: 50 }}
                      >
                        <img src={displayImg} alt={item.name} className={styles.itemImage} />
                        
                        <div className={styles.itemDetails}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                          
                          {/* Quantity Selector */}
                          <div className={styles.quantityControls}>
                            <button 
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className={styles.qtyVal}>{item.quantity}</span>
                            <button 
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Remove Action */}
                        <button 
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer Summary */}
            {!checkoutSuccess && cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className={styles.deliveryTip}>
                    Add ${(30 - cartTotal).toFixed(2)} more for Free Delivery!
                  </p>
                )}
                
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <button 
                  className={`${styles.checkoutBtn} ${isCheckingOut ? styles.loading : ''}`}
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                >
                  {isCheckingOut ? (
                    <span className={styles.loader}>Preparing Order...</span>
                  ) : (
                    <span>Proceed to Checkout</span>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
