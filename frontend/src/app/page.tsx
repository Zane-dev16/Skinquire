// pages/index.js
"use client";
import Head from "next/head";
import styles from "./page.module.css";
import ProductCategoryCard from "./components/HomeSections/ProductCategoryCard";
import ProductCategorySection from "./components/HomeSections/productCategorySection";
import HighlightsSection from "./components/HomeSections/HighlightsSection";
import { useScroll, motion, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BrandMarquee from "./components/HomeSections/BlandMarquee";

const Home = () => {
  const ProductCategories = [
    "CLEANSER",
    "EXFOLIATOR",
    "MOISTURISER",
    "SUNSCREEN",
  ];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 400]);
  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            FIND THE BEST PRODDUCTS IN THE
            <span className={styles.ultimateText}> ULTIMATE</span> SKINCARE
            CATALOGUE
          </h1>
          <h2 className={styles.heroSubheader}>
            Whether you're looking for that perfect moisturizer to combat
            dryness or a serum to tackle those pesky skin concerns, Skinquire
            has you covered. With our comprehensive database, insightful
            reviews, and vibrant community, achieving your skincare goals has
            never been easier.
          </h2>
          <Link href="/product-list">
            <div className={styles.heroCTA}>EXPLORE</div>
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/hero-image3.jpg"
            alt="Dropping serum onto hand image for the hero of the home page"
            sizes="100vh"
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <BrandMarquee></BrandMarquee>
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
