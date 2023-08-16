// pages/index.js
import styles from "./HighlightsSection.module.css";
import ProductCategoryCard from "./ProductCategoryCard";
import { motion, easeIn, Variants } from "framer-motion";
import Link from "next/link";

const HighlightsSection = () => {
  const container: any = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const highlights = [
    "Highlight 1",
    "Highlight 2",
    "Highlight 3",
    "Highlight 4",
    "Highlight 5",
  ];
  return (
    <section className={styles.highlightsSection}>
      <div className={styles.titleContainer}>
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{
            ease: [0.18, 1.26, 0.78, 1.02],
            duration: 1.5,
          }}
          className={styles.title}
        >
          THIS WEEKS HIGHLIGHTS
        </motion.h2>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, x: "50%" }}
        transition={{ duration: 1.5, ease: easeIn }}
        className={styles.horizontalLine}
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className={styles.highlightsContainer}
      >
        {highlights.map((highlight, index) => (
          <HighlightCard key={index} title={highlight} />
        ))}
      </motion.div>
    </section>
  );
};

const HighlightCard = ({ title }: { title: string }) => {
  const card = {
    hidden: { x: "-150%" },
    show: { x: 0, transition: { duration: 1 } },
  };
  const line = {
    hidden: { y: "-100%" },
    show: { transition: { duration: 1 }, y: 0 },
  };
  return (
    <div className={styles.highlightCard}>
      <motion.div variants={card}>
        <div className={styles.highlightImage}></div>
        <h3 className={styles.highlightName}>{title}</h3>
        <Link href={"/"} className={styles.link}>
          VIEW DETAILS
        </Link>
      </motion.div>
      <motion.div variants={line} className={styles.separator}></motion.div>
    </div>
  );
};

export default HighlightsSection;
