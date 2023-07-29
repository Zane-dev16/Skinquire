// pages/index.js
"use client";
import Head from "next/head";
import styles from "./page.module.css";
import ProductCategoryCard from "./components/HomeSections/ProductCategoryCard";
import ProductCategorySection from "./components/HomeSections/productCategorySection";
import HighlightsSection from "./components/HomeSections/HighlightsSection";
import {
  useViewportScroll,
  motion,
  useTransform,
  Variants,
} from "framer-motion";

const Home = () => {
  const ProductCategories = [
    "CLEANSER",
    "EXFOLIATOR",
    "MOISTURISER",
    "SUNSCREEN",
  ];

  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 400]);
  return (
    <>
      <motion.div style={{ y: y1 }} className={styles.heroSection}>
        {/* <motion.div  className={styles.titleContainer}> */}
        <AnimatedLetters title="SKINQUIRE"></AnimatedLetters>
      </motion.div>
      <ProductCategorySection></ProductCategorySection>
      <section className={styles.issue}></section>
      <HighlightsSection></HighlightsSection>
    </>
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

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({ title }) => {
  const { scrollY } = useViewportScroll();

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
