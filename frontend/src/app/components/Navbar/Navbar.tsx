import styles from "./Navbar.module.css";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <BurgerMenu></BurgerMenu>
      <SearchBar></SearchBar>
      <div>Profile section</div>
    </div>
  );
};

export default Navbar;
