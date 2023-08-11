import React from "react";
import styles from "./BrandMarquee.module.css"; // Import your CSS module

const BrandMarquee = () => {
  const brandList = [
    "PAULA'S CHOICE",
    "CERAVE",
    "THE ORDINARY",
    "EUCERIN",
    "LA ROCHE POSAY",
    "THE ORDINARY",
  ];

  return (
    <div className={styles.brandMarquee}>
      {brandList.map((brand, index) => (
        <div key={index} className={`${styles.brandText} ${styles.brandItem}`}>
          {brand}
        </div>
      ))}
    </div>
  );
};

export default BrandMarquee;
