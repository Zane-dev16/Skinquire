import React, { FC } from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  name: string;
  rating: number;
  brand: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  price: number;
}

const ProductCard: FC<ProductCardProps> = ({
  image,
  name,
  rating,
  brand,
  price,
}) => {
  const imageUrl = image?.data?.attributes.url ?? "";
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";

  return (
    <motion.div whileHover={{ scale: 1.05 }} className={styles["product-card"]}>
      <div className={styles["image-container"]}>
        <img
          src={`${mediaUrl}${imageUrl}`}
          alt={`${name} product image`}
          className={styles["product-image"]}
        />
      </div>

      <div className={styles["product-content"]}>
        <h3 className={styles["product-name"]}>{name}</h3>
        <div className={styles["product-brand"]}>
          {brand.data.attributes.name}
        </div>
        <div className={styles["product-price"]}>{price}€</div>
        <div className={styles["product-rating"]}>
          <Image src="/rating-star.svg" alt="rating:" width={20} height={20} />
          <div className={styles["rating"]}>{rating} </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
