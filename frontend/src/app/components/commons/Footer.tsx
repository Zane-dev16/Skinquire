import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import BackToTopButton from "./BackToTopButton";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.footer}>
      <div className={styles.column}>
        <div>
          <Link className={styles.link} href="/">
            HOME
          </Link>
        </div>
        <div>
          <Link className={styles.link} href="/about">
            ABOUT
          </Link>
        </div>
        <div>
          <Link className={styles.link} href="/product-list">
            FIND A PRODUCT
          </Link>
        </div>
      </div>
      <Link href="/">
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <Image
              src="/skinquireLogo1.png"
              alt="skinquire logo"
              sizes="100vh"
              fill={true}
              quality={100}
              style={{
                objectFit: "contain",
              }}
            ></Image>
          </div>
        </div>
      </Link>
      <div className={styles.column}>
        <div>
          <Link className={styles.link} href="/terms-and-conditions">
            TERMS AND CONDITIONS
          </Link>
        </div>
        <div>
          <Link className={styles.link} href="/privacy-policy">
            PRIVACY POLICY
          </Link>
        </div>
        <BackToTopButton></BackToTopButton>
      </div>
    </div>
  );
};

export default Footer;
