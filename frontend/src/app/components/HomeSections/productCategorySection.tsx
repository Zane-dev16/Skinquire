// pages/index.js
import Head from "next/head";
import styles from "./ProductCategorySection.module.css";
import ProductCategoryCard from "./ProductCategoryCard";
import { motion } from "framer-motion";

type CategoryData = {
  name: string;
  imageLink: string;
  link: string;
};

const ProductCategorySection = () => {
  const ProductCategories = [
    {
      name: "CLEANSER",
      imageLink: "/cleanser.jpg",
      link: "/product-list",
    },
    {
      name: "EXFOLIATOR",
      imageLink: "/serum.jpg",
      link: "/product-list",
    },
    {
      name: "MOISTURISER",
      imageLink: "/moisturizer.jpg",
      link: "/product-list",
    },
    {
      name: "SUNSCREEN",
      imageLink: "/sunscreen.jpg",
      link: "/product-list",
    },
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
        {ProductCategories.map((category: CategoryData, index) => (
          <ProductCategoryCard
            key={index}
            category={category.name}
            imageLink={category.imageLink}
            link={category.link}
          ></ProductCategoryCard>
        ))}
      </div>
    </section>
  );
};

export default ProductCategorySection;
