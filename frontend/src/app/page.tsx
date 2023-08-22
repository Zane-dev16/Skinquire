// pages/index.js
"use client";
import Head from "next/head";
import styles from "./page.module.css";
import ProductCategorySection from "./components/HomeSections/productCategorySection";
import HighlightsSection from "./components/HomeSections/HighlightsSection";
import HeroSection from "./components/HomeSections/HeroSection";

import BrandMarquee from "./components/HomeSections/BrandMarquee";

const Home = () => {
  return (
    <main>
      <HeroSection></HeroSection>
      <BrandMarquee></BrandMarquee>
      <ProductCategorySection></ProductCategorySection>
      <section className={styles.issue}></section>
      <HighlightsSection></HighlightsSection>
    </main>
  );
};
export default Home;

interface AnimatedLettersProps {
  title: string;
}

const banner = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterAnimation = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};
/* 
const AnimatedLetters: React.FC<AnimatedLettersProps> = ({ title }) => {
  const { scrollY } = useScroll();

  const y2 = useTransform(scrollY, [0, 800], [0, -200]);

  return (
    <motion.div
      variants={banner}
      initial="initial"
      animate="animate"
      style={{ y: y2 }}
      className={styles.heroTitle}
    >
      {[...title].map((letter, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          className={styles.titleLetter}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
 */
