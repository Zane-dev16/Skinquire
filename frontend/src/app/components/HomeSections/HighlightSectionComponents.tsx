"use client";
import styles from "./HighlightsSection.module.css";
import { motion, easeIn, Variants } from "framer-motion";
import Link from "next/link";
import { FC } from "react";

export function HighlightTitle() {
  return (
    <>
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
    </>
  );
}

type HighlightItem = {
  id: number;
  attributes: {
    name: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

type HighlightListProps = {
  highlights: HighlightItem[];
};

export const HighlightList: FC<HighlightListProps> = ({ highlights }) => {
  const highlights1 = [
    "Highlight 1",
    "Highlight 2",
    "Highlight 3",
    "Highlight 4",
    "Highlight 5",
  ];
  const container: any = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      className={styles.highlightsContainer}
    >
      {highlights.map((highlight, index) => (
        <HighlightCard key={index} highlight={highlight} />
      ))}
    </motion.div>
  );
};

type HighlightCardProps = {
  highlight: HighlightItem;
};

const HighlightCard: FC<HighlightCardProps> = ({ highlight }) => {
  const card = {
    hidden: { x: "-150%" },
    show: { x: 0, transition: { duration: 1 } },
  };
  const line = {
    hidden: { y: "-100%" },
    show: { transition: { duration: 1 }, y: 0 },
  };

  const title = highlight.attributes.name;
  const productId = highlight.id;
  const imageUrl = highlight.attributes.image?.data?.attributes.url ?? "";
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";

  const buttonBackgroundVariants = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    whileHover: { scale: 2 },
  };
  const buttonVariants = {
    whileHover: {
      color: "#fff",
      scale: 1.1,
      transition: { type: "spring" },
    },
  };

  const imageVariants = {
    initial: { x: "-50%" },
    whileHover: { y: -10 },
  };

  return (
    <div className={styles.highlightCard}>
      <Link href={`/product-list/${productId}`}>
        <motion.div initial="initial" whileHover="whileHover" variants={card}>
          <div className={styles.imageContainer}>
            <motion.div
              className={styles.highlightImage}
              style={{ backgroundImage: `url(${mediaUrl}${imageUrl})` }}
              variants={imageVariants}
            ></motion.div>
          </div>
          <h3 className={styles.highlightName}>{title}</h3>
          <motion.button variants={buttonVariants} className={styles.button}>
            <motion.div
              variants={buttonBackgroundVariants}
              className={styles.buttonHoverBackground}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <span>VIEW DETAILS</span>
          </motion.button>
        </motion.div>
      </Link>

      <motion.div variants={line} className={styles.separator}></motion.div>
    </div>
  );
};
