// pages/index.js
import Head from "next/head";
import styles from "./page.module.css";
import ProductCategoryCard from "./components/HomeSections/ProductCategoryCard";
import ProductCategorySection from "./components/HomeSections/productCategorySection";

const Home = () => {
  const ProductCategories = [
    "CLEANSER",
    "EXFOLIATOR",
    "MOISTURISER",
    "SUNSCREEN",
  ];
  return (
    <>
      <div className={styles.heroSection}>
        <div>
          <h1 className={styles.heroTitle}>Skinqu!re</h1>
        </div>
      </div>
      <ProductCategorySection></ProductCategorySection>
      <section className={styles.issue}></section>
    </>
  );
};

export default Home;
