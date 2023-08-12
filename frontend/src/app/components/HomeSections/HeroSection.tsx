import styles from "./HeroSection.module.css";
import { useScroll, motion, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 400]);
  return (
    <motion.div style={{ y }} className={styles.heroSection}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>
          FIND THE BEST PRODUCTS IN THE
          <span className={styles.ultimateText}> ULTIMATE</span> SKINCARE
          CATALOGUE
        </h1>
        <h2 className={styles.heroSubheader}>
          Whether you're looking for that perfect moisturizer to combat dryness
          or a serum to tackle those pesky skin concerns, Skinquire has you
          covered. With our comprehensive database, insightful reviews, and
          vibrant community, achieving your skincare goals has never been
          easier.
        </h2>
        <div className={styles.CTAwrapper}>
          <Link href="/product-list">
            <div className={styles.heroCTA}>EXPLORE</div>
          </Link>
        </div>
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
    </motion.div>
  );
};

export default HeroSection;
