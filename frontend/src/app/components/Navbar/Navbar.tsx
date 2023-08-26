import styles from "./Navbar.module.css";
import BurgerMenu from "./BurgerMenu";
import SearchBar from "../SearchBar/SearchBar";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

export default async function Navbar() {
  return (
    <>
      <Link href="/" className={styles.titleBar}>
        <h1 className={styles.pageTitle}>SKINQUIRE</h1>
      </Link>
      <div className={styles.navbar}>
        <BurgerMenu></BurgerMenu>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar></SearchBar>
        </Suspense>
        <div className={styles.navGroup}>
          <ProfileMenu></ProfileMenu>
          <Logo></Logo>
        </div>
      </div>
    </>
  );
}

function SearchBarFallback() {
  return (
    <Image src="/search-icon.svg" alt="search-icon" width={25} height={25} />
  );
}
