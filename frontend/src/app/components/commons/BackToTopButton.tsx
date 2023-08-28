"use client";
import styles from "./BackToTopButton.module.css";
import Image from "next/image";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={scrollToTop}>
        <Image
          src="/back-to-top-arrow.svg"
          alt="back-to-top-icon"
          width={35}
          height={35}
        />
        Back to Top
      </button>
    </div>
  );
};

export default BackToTopButton;
