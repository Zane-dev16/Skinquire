"use client";
import styles from "./ProductCategoryCard.module.css";
import { useRef, useEffect } from "react";
import CircleType from "circletype";
import Link from "next/link";

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
      <p ref={curvedTextRef} className={styles.curvedText}>
        {category}
      </p>
      <div className={styles.tallRectangle}></div>
      <Link href="/product-list">
        <button className={styles.button}>EXPLORE</button>
      </Link>
    </div>
  );
};

export default ProductCategoryCard;
