import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import latteCoffee from '../assets/latte-coffee.png';
import chocolateCake from '../assets/chocolate-cake.png';
import lemonPastry from '../assets/lemon-pastry.png';
import styles from './Categories.module.css';

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const Categories: React.FC = () => {
  const categories: CategoryCard[] = [
    {
      id: 'drinks',
      title: 'Artisanal Coffee',
      description: 'Slow-drip specialty espresso and cream-infused lattes.',
      image: latteCoffee,
      link: '#menu'
    },
    {
      id: 'cakes',
      title: 'Signature Cakes',
      description: 'Stunning multi-layered creations for your celebrations.',
      image: chocolateCake,
      link: '#menu'
    },
    {
      id: 'pastries',
      title: 'Daily Pastries',
      description: 'Fresh tarts, scones, and danishes baked fresh daily.',
      image: lemonPastry,
      link: '#menu'
    }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 60, damping: 15 } 
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 60, damping: 15 } 
    }
  };

  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.title}>Handcrafted Delights</h2>
          <p className={styles.subtitle}>Explore our signature categories, made with premium handpicked ingredients.</p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((cat) => (
            <motion.a 
              href={cat.link}
              key={cat.id} 
              className={styles.card}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(54, 33, 20, 0.08)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Image Showcase */}
              <div className={styles.imageContainer}>
                <img src={cat.image} alt={cat.title} className={styles.cardImage} />
              </div>
              
              {/* Card Text & Action Button */}
              <div className={styles.cardFooter}>
                <div className={styles.textWrapper}>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <span className={styles.cardLink}>View Menu</span>
                </div>
                
                <motion.div 
                  className={styles.arrowBtn}
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
