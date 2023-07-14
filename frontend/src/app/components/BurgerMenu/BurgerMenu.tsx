"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BurgerMenu.module.css";

interface MenuLink {
  label: string;
  href: string;
}

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getMenuLinkDelay = (index: number): number => {
    return index * 0.2; // Adjust the delay duration as needed
  };

  const menuLinks: MenuLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Product List", href: "/product-list" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className={styles.hamburgerMenu}>
      <div
        className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <>
          <div className={styles.menuBackground}></div>
          <ul className={styles.menuLinks}>
            {menuLinks.map((link, index) => (
              <li
                key={index}
                style={{
                  animationDelay: `${getMenuLinkDelay(index)}s`,
                }}
              >
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BurgerMenu;
