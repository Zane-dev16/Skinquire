"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BurgerMenu.module.css";
import { motion } from "framer-motion";

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

  const burgerIconVariants = {
    initial: { scale: 1 },
    animate: { scale: 1 },
    whileHover: { scale: 1.1 },
  };

  return (
    <div className={styles.hamburgerMenu}>
      {isOpen && (
        <div
          className={`${styles.menuBackground}  ${
            isOpen ? styles.openMenu : styles.closeMenu
          }`}
        ></div>
      )}
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        variants={burgerIconVariants}
        transition={{ type: "spring", duration: 2, stiffness: 100 }}
        className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <motion.span
          animate={isOpen ? { rotate: "-45deg", y: "13.5px" } : {}}
          transition={{ duration: 0.1 }}
        ></motion.span>

        <motion.span animate={{ opacity: isOpen ? 0 : 1 }}></motion.span>
        <motion.span
          transition={{ duration: 0.1 }}
          animate={isOpen ? { rotate: "45deg", y: "-13.5px" } : {}}
        ></motion.span>
      </motion.div>
      {isOpen && (
        <ul className={styles.menuLinks}>
          {menuLinks.map((link, index) => (
            <li
              key={index}
              style={{
                animationDelay: `${getMenuLinkDelay(index)}s`,
              }}
            >
              <Link
                href={link.href}
                className={styles.link}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;
