"use client";
import styles from "./ProductCategoryCard.module.css";
import { useRef, useEffect } from "react";
import CircleType from "circletype";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCategoryCard = ({ category }: { category: string }) => {
  const curvedTextRef = useRef(null);

  useEffect(() => {
    if (curvedTextRef.current) {
      const circleType = new CircleType(curvedTextRef.current);
      circleType.radius(180); // Set the radius of the circle or ellipse
    }
  }, []);
  return (
    <div className={styles.card}>
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
        transition={{ type: "spring", duration: 4, stiffness: 50 }}
        className={styles.tallRectangle}
      ></motion.div>
      <Link href="/product-list">
        <button className={styles.button}>EXPLORE</button>
      </Link>
    </div>
  );
};

export default ProductCategoryCard;
