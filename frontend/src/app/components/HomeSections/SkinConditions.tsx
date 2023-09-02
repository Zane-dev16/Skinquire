"use client";

import { FC, useState, useRef, useEffect } from "react";
import { useScroll, useMotionValue } from "framer-motion";
import styles from "./SkinCondition.module.css";
import Image from "next/image";

const SkinConditionSection: FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollXValue, setScrollXValue] = useState<number>(1);
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

  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel container
  const { scrollX } = useScroll({
    container: carouselRef,
  });
  // Function to scroll left
  const paginate = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.scrollLeft;

      carouselRef.current.scrollTo({
        top: 0,
        left: scrollAmount + direction * 500,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollX.onChange((v) => setScrollXValue(v));
  }, [scrollX]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 700,
          fontFamily: "monospace",
          fontWeight: 600,
          zIndex: 50,
        }}
      >
        {" | x: " + scrollXValue}
      </div>
      <section className={styles.skinConditionSection}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Skin Conditions</h2>
        </div>
        <div className={styles.carousel} ref={carouselRef}>
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
        {scrollX.get() > 0 && (
          <div
            onClick={() => paginate(-1)}
            className={`${styles.button} ${styles.leftButton}`}
          ></div>
        )}

        <div
          onClick={() => paginate(1)}
          className={`${styles.button} ${styles.rightButton}`}
        ></div>
      </section>
    </>
  );
};

export default SkinConditionSection;
