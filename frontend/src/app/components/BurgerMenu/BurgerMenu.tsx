"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Image
        src="/burger.svg"
        alt="Menu"
        width={40}
        height={40}
        onClick={toggleMenu}
      />
      {isOpen && (
        <ul className={styles.menuLinks}>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      )}
    </>
  );
};
export default BurgerMenu;
