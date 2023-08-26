import styles from "./Logo.module.css";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.logoContainer}>
        <Image
          src="/skinquireLogo1.png"
          alt="skinquire logo"
          width={60}
          height={45}
        ></Image>
      </div>
    </Link>
  );
};

export default Logo;
