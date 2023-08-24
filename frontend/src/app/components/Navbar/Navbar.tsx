import styles from "./Navbar.module.css";
import BurgerMenu from "./BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import ProfileMenu from "./ProfileMenu";

export default async function Navbar() {
  return (
    <>
      <div className={styles.titleBar}>
        <h1 className={styles.pageTitle}>SKINQUIRE</h1>
      </div>
      <div className={styles.navbar}>
        <div className={styles.navItems}>
          <BurgerMenu></BurgerMenu>
          <SearchBar></SearchBar>
          <ProfileMenu></ProfileMenu>
        </div>
      </div>
    </>
  );
}
