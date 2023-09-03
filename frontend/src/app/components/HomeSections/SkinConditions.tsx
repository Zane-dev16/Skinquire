"use client";

import { FC, useState, useRef, useEffect } from "react";
import { useScroll, useMotionValue } from "framer-motion";
import styles from "./SkinCondition.module.css";
import Image from "next/image";
import Link from "next/link";
import { createSearchQueryWithTitleUrl } from "@/utils/filterUtils";
import { ReadonlyURLSearchParams } from "next/navigation";

const SkinConditionSection: FC = () => {
  const [scrollXValue, setScrollXValue] = useState<number>(1);
  const imageUrlList = [
    "/skin-condition2.jpg",
    "/skin-condition3.jpg",
    "/skin-condition-4.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition2.jpg",
    "/skin-condition3.jpg",
    "/skin-condition-4.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition2.jpg",
    "/skin-condition3.jpg",
    "/skin-condition-4.jpg",
    "/skin-condition-image-1.jpg",
    "/skin-condition2.jpg",
    "/skin-condition3.jpg",
    "/skin-condition-4.jpg",
  ];

  const SkinConditionData = [
    {
      name: "Acne",
      imageUrl: "/skin-condition-image-1.jpg",
    },
    {
      name: "Dryness",
      imageUrl: "/skin-condition2.jpg",
    },
    {
      name: "Oily Skin",
      imageUrl: "/skin-condition2.jpg",
    },
    {
      name: "Rosacea",
      imageUrl: "/skin-condition3.jpg",
    },
    {
      name: "Pigmentation",
      imageUrl: "/skin-condition-4.jpg",
    },
    {
      name: "Dark Circles",
      imageUrl: "/skin-condition-image-1.jpg",
    },
    {
      name: "Redness",
      imageUrl: "/skin-condition3.jpg",
    },
    {
      name: "Sunburn",
      imageUrl: "/skin-condition-4.jpg",
    },
    {
      name: "Eczema",
      imageUrl: "/skin-condition2.jpg",
    },
    {
      name: "Psoriasis",
      imageUrl: "/skin-condition-image-1.jpg",
    },
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
  const params = new URLSearchParams() as any as ReadonlyURLSearchParams;
  return (
    <section className={styles.skinConditionSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Skin Conditions</h2>
      </div>
      <div className={styles.carousel} ref={carouselRef}>
        {SkinConditionData.map((skinConditionItem, key) => (
          <Link
            href={createSearchQueryWithTitleUrl(
              "/product-list",
              params,
              "skinConditions",
              JSON.stringify([skinConditionItem.name]),
              skinConditionItem.name
            )}
          >
            <div key={key} className={styles.skinCondition}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.SkinConditionImage}
                  src={`${skinConditionItem.imageUrl}`}
                  alt={`skin-condition-image-${key + 1}`}
                  sizes="100vh"
                  fill={true}
                  quality={100}
                  style={{}}
                />
                <h3 className={styles.skinConditionName}>
                  {skinConditionItem.name.toUpperCase()}
                </h3>
              </div>
            </div>
          </Link>
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
  );
};

export default SkinConditionSection;
