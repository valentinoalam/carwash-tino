// components/FullpageWithFramerMotion.js
'use client'; // Pastikan ini adalah Client Component

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './FullpageWithFramerMotion.module.css';

const FullpageWithFramerMotion = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Hitung seberapa jauh setiap section harus digeser
  const y1 = useTransform(scrollYProgress, [0, 1], ['0vh', '-200vh']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0vh', '-200vh']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0vh', '-200vh']);

  return (
    <div className={styles.fullpageContainer} ref={containerRef}>
      <motion.div
        className={styles.section}
        style={{ y: y1 }}
      >
        <h1>Section 1</h1>
        <p>Konten untuk bagian pertama.</p>
      </motion.div>
      <motion.div
        className={styles.section}
        style={{ y: y2 }}
      >
        <h1>Section 2</h1>
        <p>Konten untuk bagian kedua.</p>
      </motion.div>
      <motion.div
        className={styles.section}
        style={{ y: y3 }}
      >
        <h1>Section 3</h1>
        <p>Konten untuk bagian ketiga.</p>
      </motion.div>
    </div>
  );
};

export default FullpageWithFramerMotion;