"use client";

import styles from "./ProfileMenu.module.css";

import { useState, FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../Form/LoginForm";
import Cookies from "js-cookie";
import { motion, AnimatePresence, spring } from "framer-motion";

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
      <AnimatePresence>
        {isOpen && <AuthModal handleClose={toggleMenu}></AuthModal>}
      </AnimatePresence>
    </>
  );
}

type AuthModalProps = {
  handleClose: () => void;
};

const AuthModal: FC<AuthModalProps> = ({ handleClose }) => {
  const router = useRouter();
  const isAuthenticated = !!Cookies.get("token");

  function handleLogout() {
    Cookies.remove("token");
    handleClose();
    router.refresh();
    router.push("/");
  }
  return (
    <div onClick={handleClose} className={styles.backdrop}>
      <div className={styles.profileMenuContainer}>
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.3,
          }}
          onClick={(e) => e.stopPropagation()}
          className={styles.profileMenu}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.3,
            }}
            className={styles.formContainer}
          >
            {!isAuthenticated && (
              <LoginForm closeForm={handleClose}></LoginForm>
            )}
            {isAuthenticated && (
              <div className={styles.logout}>
                <button onClick={handleLogout}>LOG OUT</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
