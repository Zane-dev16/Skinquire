import styles from "./Navbar.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";

export default async function Navbar() {
  return (
    <div className={styles.navbar}>
      <BurgerMenu></BurgerMenu>
      <SearchBar></SearchBar>
      <div>Profile section</div>
    </div>
  );
}
