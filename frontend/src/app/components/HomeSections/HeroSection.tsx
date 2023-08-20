import styles from "./HeroSection.module.css";
import { useScroll, motion, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 400]);
  const CTABackground = {
    initial: {
      rotate: "20deg",
      x: "-100%",
    },
    hover: {
      rotate: "0",

      x: 0,
      y: 0,
    },
  };
  const CTA = {
    hover: {
      color: "#fff",
      scale: 1.1,
      transition: { type: "spring", color: { delay: 0.1 } },
    },
    onTap: {
      scale: 1,
    },
  };
  return (
    <motion.div style={{ y }} className={styles.heroSection}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className={styles.heroText}
      >
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
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={CTA}
              className={styles.heroCTA}
              whileTap="onTap"
            >
              <motion.div
                className={styles.CTAHoverBackground}
                transition={{ duration: 0.4 }}
                variants={CTABackground}
              ></motion.div>
              <span>EXPLORE</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className={styles.heroImageContainer}
      >
        <Image
          src="/hero-image.jpg"
          alt="Dropping serum onto hand image for the hero of the home page"
          sizes="100vh"
          fill={true}
          quality={100}
          style={{
            objectFit: "cover",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
