import { useState, FC } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Form from "./Form";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { userExists } from "@/utils/usersAndPermissionsUtils";
import { motion } from "framer-motion";

type LoginFormProps = {
  closeForm: () => void;
};

type FormData = {
  email: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = ({ closeForm }) => {
  const [error, setError] = useState<string | null>(null); // Add error state
  const router = useRouter();

  const handleLogin = async (data: FormData) => {
    const { email, password } = data;
    const userDoesExist = await userExists(email);
    if (!userDoesExist) {
      setError("Email not registered. Please use a different email or sign up");
    } else {
      const query = `mutation  {
      login(input: { identifier: "${email}", password: "${password}" }) {
        jwt
        user {
          username
          email
        }
      }
    }`;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              query,
            }),
          }
        );
        const jsonRes = await res.json();
        if (res.ok && jsonRes?.data) {
          const data = jsonRes.data;
          Cookies.set("token", data.login.jwt);
          router.refresh();
          closeForm();
        } else {
          const errorMessage = jsonRes.errors[0].message;
          if (errorMessage == "Invalid identifier or password") {
            setError("Incorrect Email or Password");
          } else {
            setError(errorMessage || "Log In Failed");
          }
        }
      } catch (error) {
        setError(`Error: ${error}`);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        title="LOG INTO SKINQUIRE"
        buttonText="LOGIN"
        callback={handleLogin}
        error={error}
        isLoginForm
      ></Form>
      <div className={styles.signUp}>
        <span className={styles.newHereText}>New Here?</span>
        <Link
          className={styles.signUpLink}
          onClick={closeForm}
          href="/register"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              type: "spring",
            }}
            className={styles.signUpButton}
          >
            SIGN UP!
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
