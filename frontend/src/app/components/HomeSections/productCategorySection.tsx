// pages/index.js
import Head from "next/head";
import styles from "./ProductCategorySection.module.css";
import ProductCategoryCard from "./ProductCategoryCard";

const ProductCategorySection = () => {
  const ProductCategories = [
    "CLEANSER",
    "EXFOLIATOR",
    "MOISTURISER",
    "SUNSCREEN",
  ];
  return (
    <section className={styles.productCategorieSection}>
      <h3 className={styles.title}>SKINCARE 101</h3>
      <div className={styles.productCategories}>
        {ProductCategories.map((category) => (
          <ProductCategoryCard category={category}></ProductCategoryCard>
        ))}
      </div>
    </section>
  );
};

export default ProductCategorySection;
