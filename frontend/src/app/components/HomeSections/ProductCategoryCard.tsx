"use client";
import styles from "./ProductCategoryCard.module.css";
import { useRef, useEffect, FC } from "react";
import CircleType from "circletype";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type ProductCategoryCardProps = {
  category: string;
  imageLink: string;
  link: string;
};

const ProductCategoryCard: FC<ProductCategoryCardProps> = ({
  category,
  imageLink,
  link,
}) => {
  const curvedTextRef = useRef(null);
  const buttonBackgroundVariants = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    whileHover: { scale: 3 },
  };
  const buttonVariants = {
    whileHover: {
      color: "#fff",
      scale: 1.1,
      transition: { type: "spring", color: { delay: 0.1 } },
    },
  };
  const cardVariants = {
    whileHover: { scale: 1.05 },
  };

  useEffect(() => {
    if (curvedTextRef.current) {
      const circleType = new CircleType(curvedTextRef.current);
      circleType.radius(180); // Set the radius of the circle or ellipse
    }
  }, []);
  return (
    <Link href={link}>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        variants={cardVariants}
        className={styles.card}
      >
        <motion.p
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: -100, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          ref={curvedTextRef}
          className={styles.curvedText}
        >
          {category}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          className={styles.tallRectangle}
        >
          <Image
            src={imageLink}
            alt={`Picture of ${category}`}
            fill={true}
            quality={100}
            style={{
              objectFit: "cover",
            }}
          ></Image>
        </motion.div>
        <div className={styles.buttonContainer}>
          <motion.button variants={buttonVariants} className={styles.button}>
            <motion.div
              variants={buttonBackgroundVariants}
              className={styles.buttonHoverBackground}
              transition={{ duration: 0.5 }}
            ></motion.div>
            <span>EXPLORE</span>
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCategoryCard;
