import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Heart, MapPin } from 'lucide-react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={`${styles.container} container`}>
        {/* Left Column: Text Content */}
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
            Sweet Moments <br />
            <span>Start Here</span>
          </motion.h1>
          
          <motion.p className={styles.description} variants={itemVariants}>
            Indulge in artisanal cakes and pastries handcrafted daily with organic, premium ingredients. Designed to celebrate life's most delicious moments.
          </motion.p>
          
          <motion.div className={styles.actions} variants={itemVariants}>
            <motion.a 
              href="#menu" 
              className={styles.primaryBtn}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Now
            </motion.a>
            <motion.a 
              href="#highlight" 
              className={styles.secondaryBtn}
              whileHover={{ x: 5 }}
            >
              <span>Explore Today's Special</span>
              <ArrowRight size={16} />
            </motion.a>
          </motion.div>

          {/* Social / Feature Icons below text as shown in the layout */}
          <motion.div className={styles.features} variants={itemVariants}>
            <a href="tel:+123456789" className={styles.featureIcon} aria-label="Call Us">
              <Phone size={18} />
            </a>
            <a href="mailto:hello@frem.com" className={styles.featureIcon} aria-label="Email Us">
              <Mail size={18} />
            </a>
            <span className={styles.divider}></span>
            <button className={styles.featureIcon} aria-label="Favorites">
              <Heart size={18} />
            </button>
            <a href="#footer" className={styles.featureIcon} aria-label="Our Location">
              <MapPin size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Empty spacer for background image positioning */}
        <div className={styles.imageSpacer}></div>
      </div>
    </section>
  );
};

export default Hero;
