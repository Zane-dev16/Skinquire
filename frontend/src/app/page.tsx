// pages/index.js
import { Metadata } from "next";
import styles from "./page.module.css";
import ProductCategorySection from "./components/HomeSections/productCategorySection";
import HighlightsSection from "./components/HomeSections/HighlightsSection";
import HeroSection from "./components/HomeSections/HeroSection";
import BrandMarquee from "./components/HomeSections/BrandMarquee";
import Footer from "./components/HomeSections/Footer";

export const metadata: Metadata = {
  title:
    "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
  description:
    "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
  openGraph: {
    title:
      "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
    description:
      "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
    url: "https://www.skinquire.net",
    siteName: "Skinquire",
    images: [
      {
        url: "https://skinquire-bucket.s3.amazonaws.com/Skinquire_Logo_8a2b219732.png",
        width: 800,
        height: 600,
        alt: "Skinquire Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
    description:
      "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
    images: {
      url: "https://skinquire-bucket.s3.amazonaws.com/Skinquire_Logo_8a2b219732.png",
      width: 800,
      height: 600,
      alt: "Skinquire Logo",
    },
  },
};
const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <BrandMarquee></BrandMarquee>
      <ProductCategorySection></ProductCategorySection>
      <section className={styles.issue}></section>
      <HighlightsSection></HighlightsSection>
    </div>
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
