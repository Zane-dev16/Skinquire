import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <BurgerMenu></BurgerMenu>
    </div>
  );
};

export default Navbar;
