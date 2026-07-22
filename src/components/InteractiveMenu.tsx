import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import styles from './InteractiveMenu.module.css';

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

const InteractiveMenu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? productsData
    : productsData.filter((item) => item.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 } 
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section id="menu" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Our Dessert Menu</h2>
          <p className={styles.subtitle}>Savor our selection of oven-fresh pastries and custom specialty drinks.</p>
        </div>

        {/* Categories Tabs Filter */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tabBtn} ${selectedCategory === cat.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
                {selectedCategory === cat.id && (
                  <motion.div
                    className={styles.activeTabLine}
                    layoutId="activeTabLine"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const displayImage = imageMap[product.image] || strawberryCupcake;
              return (
                <motion.div
                  key={product.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={styles.card}
                  whileHover={{ y: -6 }}
                >
                  {/* Rating Badge */}
                  <div className={styles.ratingBadge}>
                    <Star size={12} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Product Image */}
                  <div className={styles.imageContainer}>
                    <img 
                      src={displayImage} 
                      alt={product.name} 
                      className={styles.image} 
                    />
                  </div>

                  {/* Product Info */}
                  <div className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    
                    {/* Price and Cart Action */}
                    <div className={styles.footer}>
                      <span className={styles.price}>${product.price.toFixed(2)}</span>
                      <motion.button
                        className={styles.addBtn}
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMenu;
