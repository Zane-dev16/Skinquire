"use client";
import React from "react";
import styles from "./BrandMarquee.module.css"; // Import your CSS module
import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

const BrandMarquee = () => {
  const baseVelocity = -5;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => {
    const max = 0;
    const min = -50;
    const rangeSize = max - min;
    return `${((((v - min) % rangeSize) + rangeSize) % rangeSize) + min}%`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const brandList = [
    "PAULA'S CHOICE",
    "CERAVE",
    "THE ORDINARY",
    "EUCERIN",
    "LA ROCHE POSAY",
    "THE ORDINARY",
  ];

  const doubledBrandList = [...brandList, ...brandList];

  return (
    <div className={styles.marqueeContainer}>
      <Link href="/product-list">
        <motion.div
          style={{ x }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className={styles.brandMarquee}
        >
          {doubledBrandList.map((brand, index) => (
            <div key={index} className={styles.brandContainer}>
              <Image
                src="/brandMarqueeStar.svg"
                alt="star separator between brands on marquee"
                width={50}
                height={50}
                className={styles.marqueeIcon}
              ></Image>
              <div className={`${styles.brandText}`}>{brand}</div>
            </div>
          ))}
        </motion.div>
      </Link>
    </div>
  );
};

export default BrandMarquee;
