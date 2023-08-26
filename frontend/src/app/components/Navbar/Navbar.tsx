import styles from "./Navbar.module.css";
import BurgerMenu from "./BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";
import Link from "next/link";

export default async function Navbar() {
  return (
    <>
      <Link href="/" className={styles.titleBar}>
        <h1 className={styles.pageTitle}>SKINQUIRE</h1>
      </Link>
      <div className={styles.navbar}>
        <BurgerMenu></BurgerMenu>
        <SearchBar></SearchBar>
        <div className={styles.navGroup}>
          <ProfileMenu></ProfileMenu>
          <Logo></Logo>
        </div>
      </div>
    </>
  );
}
