"use client";
import { useState } from "react";

import styles from "./ProfileMenu.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Image
        className={`${styles.profileAvatar} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        src="/profile-user.svg"
        alt="profile-avatar"
        width={30}
        height={30}
      ></Image>
      {isOpen && (
        <div className={styles.profileMenu}>
          <form>
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <button type="submit">LOG IN</button>
          </form>
          <a href="http://127.0.0.1:1337/api/connect/google">
            <div className={styles.googleSignIn}>
              <Image src="/google-icon.svg" alt="" width={20} height={20} />
              <span className={styles.googleText}>Continue with Google</span>
            </div>
          </a>

          <div className={styles.signUp}>
            <span className={styles.newHereText}>New Here?</span>
            <Link
              className={styles.signUpLink}
              onClick={toggleMenu}
              href="/register"
            >
              Sign Up!
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
