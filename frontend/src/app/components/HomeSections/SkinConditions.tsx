"use client";

import { FC } from "react";
import styles from "./SkinCondition.module.css";
import Image from "next/image";

const SkinConditionSection: FC = () => {
  const imageUrlList = [
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition-image-1.jpg",
  ];
  return (
    <section className={styles.skinConditionSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Skin Conditions</h2>
      </div>
      <div className={styles.carousel}>
        {imageUrlList.map((imageUrl: string, key) => (
          <div key={key} className={styles.skinCondition}>
            <div className={styles.imageContainer}>
              <Image
                className={styles.SkinConditionImage}
                src={`${imageUrl}`}
                alt={`skin-condition-image-${key}`}
                sizes="100vh"
                fill={true}
                quality={100}
                style={{}}
              />
              <h3 className={styles.skinConditionName}>
                {"Skin Condition".toUpperCase()} {key + 1}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkinConditionSection;
