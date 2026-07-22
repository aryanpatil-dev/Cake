import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Info Column */}
        <div className={styles.column}>
          <a href="#home" className={styles.logo}>Frem</a>
          <p className={styles.tagline}>
            Crafting premium, sweet memories through artisanal baking and high-grade specialty coffee.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hours Column */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Opening Hours</h3>
          <ul className={styles.hours}>
            <li>
              <span>Monday — Friday</span>
              <span className={styles.hoursDot}></span>
              <span>8:00 AM — 8:00 PM</span>
            </li>
            <li>
              <span>Saturday</span>
              <span className={styles.hoursDot}></span>
              <span>9:00 AM — 9:00 PM</span>
            </li>
            <li>
              <span>Sunday</span>
              <span className={styles.hoursDot}></span>
              <span>10:00 AM — 6:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Visit Us</h3>
          <ul className={styles.contacts}>
            <li>
              <MapPin size={16} />
              <span>456 Baker Sweet Street, Cake Town</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+1 (234) 567-890</span>
            </li>
            <li>
              <Mail size={16} />
              <span>hello@fremcakes.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Join Our Club</h3>
          <p className={styles.newsletterText}>
            Subscribe for exclusive recipes, seasonal menus, and baking tips.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.submitBtn} aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
          {submitted && (
            <motion.p 
              className={styles.successMsg}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Subscription successful! Check your inbox.
            </motion.p>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Frem. All rights reserved. Made with love for premium baking.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
