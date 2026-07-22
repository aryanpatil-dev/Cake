import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import strawberryCupcake from '../assets/strawberry-cupcake.png';
import styles from './SpecialHighlight.module.css';

const SpecialHighlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition' | 'reviews'>('ingredients');

  const content = {
    ingredients: [
      'Madagascar bourbon vanilla beans',
      'Fresh organic local strawberries',
      'Swiss pasture-raised butter & cream',
      'Organic soft pastry flour'
    ],
    nutrition: [
      'Calories: 280 kcal',
      'Gluten-Free option available',
      'No artificial preservatives',
      'Low sodium, naturally sweetened'
    ],
    reviews: [
      '"The frosting is light as a cloud!" — Sarah M.',
      '"Simply the best cupcake in town." — James K.',
      '"Perfect sweetness balance." — Elena P.',
      '"Beautifully detailed and tasty!" — David L.'
    ]
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 50, damping: 15 }
    }
  };

  return (
    <section id="highlight" className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Left Column: Image Showcase */}
        <motion.div 
          className={styles.imageWrapper}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className={styles.circleBg}></div>
          <motion.img 
            src={strawberryCupcake} 
            alt="Signature Strawberry Vanilla Cupcake" 
            className={styles.image}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Right Column: Text & Interactive Details */}
        <motion.div 
          className={styles.content}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Best Seller</span>
          </div>
          
          <h2 className={styles.title}>Signature Cupcakes</h2>
          <p className={styles.description}>
            A cloud-like swirl of freshly whipped strawberry cream perched atop our signature Madagascar vanilla bean cupcake, capped with a hand-selected strawberry.
          </p>

          {/* Interactive Detail Tabs */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'ingredients' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'nutrition' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Details
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              <motion.ul 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={styles.list}
              >
                {content[activeTab].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={styles.listItem}
                  >
                    <span className={styles.checkIcon}>
                      <Check size={12} />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <motion.a 
            href="#menu" 
            className={styles.ctaBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Order Cupcakes</span>
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialHighlight;
