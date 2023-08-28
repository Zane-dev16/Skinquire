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
      <div className={styles.logoContainer}>
        <Image
          src="/skinquireLogo1.png"
          alt="skinquire logo"
          width={150}
          height={120}
        ></Image>
      </div>
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
