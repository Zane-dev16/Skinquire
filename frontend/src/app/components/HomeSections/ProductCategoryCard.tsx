"use client";
import styles from "./ProductCategoryCard.module.css";
import { useRef, useEffect, FC } from "react";
import CircleType from "circletype";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type ProductCategoryCardProps = {
  category: string;
  imageLink: string;
  link: string;
};

const ProductCategoryCard: FC<ProductCategoryCardProps> = ({
  category,
  imageLink,
  link,
}) => {
  const curvedTextRef = useRef(null);

  const buttonBackgroundVariants = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    whileHover: { scale: 3 },
  };
  const buttonVariants = {
    whileHover: {
      color: "#fff",
      scale: 1.1,
      transition: { type: "spring", color: { delay: 0.1 } },
    },
  };
  const cardVariants = {
    whileHover: { y: -10 },
  };

  const imageVariants = {
    whileInView: { opacity: 1, y: 0 },
  };
  const textVariants = {
    whileInView: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    if (curvedTextRef.current) {
      const circleType = new CircleType(curvedTextRef.current);
      circleType.radius(180); // Set the radius of the circle or ellipse
    }
  }, []);
  return (
    <Link href={link}>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        whileInView="whileInView"
        variants={cardVariants}
        className={styles.card}
      >
        <motion.p
          initial={{ y: "500%", opacity: 0 }}
          variants={textVariants}
          transition={{ duration: 0.8, delay: 0.3, opacity: { delay: 0.7 } }}
          ref={curvedTextRef}
          className={styles.curvedText}
        >
          {category}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          variants={imageVariants}
          transition={{ type: "spring" }}
          className={styles.tallRectangle}
        >
          <Image
            src={imageLink}
            alt={`Picture of ${category}`}
            sizes="(max-width: 270px) 100vw"
            fill={true}
            quality={100}
            style={{
              objectFit: "cover",
            }}
          ></Image>
        </motion.div>
        <div className={styles.buttonContainer}>
          <motion.button variants={buttonVariants} className={styles.button}>
            <motion.div
              variants={buttonBackgroundVariants}
              className={styles.buttonHoverBackground}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <span>EXPLORE</span>
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCategoryCard;
