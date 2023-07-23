import styles from "./Navbar.module.css";
import BurgerMenu from "./BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import ProfileMenu from "./ProfileMenu";

export default async function Navbar() {
  return (
    <div className={styles.navbar}>
      <BurgerMenu></BurgerMenu>
      <SearchBar></SearchBar>
      <ProfileMenu></ProfileMenu>
    </div>
  );
}
