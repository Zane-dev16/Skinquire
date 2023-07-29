// pages/index.js
import Head from "next/head";
import styles from "./ProductCategorySection.module.css";
import ProductCategoryCard from "./ProductCategoryCard";
import { motion } from "framer-motion";

const ProductCategorySection = () => {
  const ProductCategories = [
    "CLEANSER",
    "EXFOLIATOR",
    "MOISTURISER",
    "SUNSCREEN",
  ];
  return (
    <section className={styles.productCategorieSection}>
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 4, stiffness: 50 }}
        className={styles.title}
      >
        SKINCARE 101
      </motion.h3>
      <div className={styles.productCategories}>
        {ProductCategories.map((category) => (
          <ProductCategoryCard category={category}></ProductCategoryCard>
        ))}
      </div>
    </section>
  );
};

export default ProductCategorySection;
