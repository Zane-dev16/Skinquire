import styles from "./Logo.module.css";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.logoContainer}>
        <Image
          src="/skinquireLogo.png"
          alt="skinquire logo"
          width={64}
          height={50}
        ></Image>
      </div>
    </Link>
  );
};

export default Logo;
