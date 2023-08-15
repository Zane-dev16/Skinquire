"use client";

import styles from "./ProfileMenu.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../Form/LoginForm";
import Cookies from "js-cookie";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isAuthenticated = !!Cookies.get("token");

  function handleLogout() {
    Cookies.remove("token");
    router.refresh();
    router.push("/");
  }

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
          {
            !isAuthenticated && (
              <LoginForm closeForm={() => setIsOpen(false)}></LoginForm>
            )

            /*                         <div>
              <form onSubmit={handleLogin}>
                <input
                  id="email"
                  className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  id="password"
                  className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button type="submit">LOG IN</button>
              </form>
              <a href="http://127.0.0.1:1337/api/connect/google">
                <div className={styles.googleSignIn}>
                  <Image src="/google-icon.svg" alt="" width={20} height={20} />
                  <span className={styles.googleText}>
                    Continue with Google
                  </span>
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
            </div> */
          }

          {isAuthenticated && (
            <div className={styles.logout}>
              <button onClick={handleLogout}>LOG OUT</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
