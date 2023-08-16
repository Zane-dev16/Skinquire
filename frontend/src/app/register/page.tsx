"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

import { userExists } from "@/utils/usersAndPermissionsUtils";
import Form from "../components/Form/Form";
import styles from "./page.module.css";

interface ResponseData {
  register: {
    jwt: string;
    user: {
      username: string;
      email: string;
    };
  };
}

interface FormData {
  email: string;
  password: string;
}
export default function RegisterRoute() {
  // const { setUser } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Add error state
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return false;
    }
    return true;
  };

  const registerUser = async (data: FormData) => {
    const { email, password } = data;

    const userDoesExist = await userExists(email);
    if (userDoesExist) {
      setError(
        "Email already registered. Please use a different email or log in"
      );
    } else if (validatePassword(password)) {
      const query = `mutation {
      register(
        input: { username: "${email}", email: "${email}", password: "${password}" }
      ) {
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
        if (res.ok && jsonRes?.data != null) {
          console.log(jsonRes.data);
          Cookies.set("token", jsonRes.data.register.jwt);
          router.push("/product-list");
        } else {
          const errorMessage = jsonRes.errors[0].message;
          if (errorMessage == "Email or Username are already taken") {
            setError("Email Already taken");
          } else {
            setError(errorMessage || "Registration Failed");
          }
        }
      } catch (error) {
        setError("Registration failed"); // Set error state on catch
        console.log(error);
      }
    }
  };

  return (
    <main className={styles.signUpPage}>
      <motion.div layout className={styles.signUpFormContainer}>
        <motion.div>
          <Form
            title="Sign Up"
            buttonText="Sign Up"
            callback={registerUser}
            error={error}
            isLoginForm={false}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
