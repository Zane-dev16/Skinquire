"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { userExists, getPasswordError } from "@/utils/usersAndPermissionsUtils";
import RegisterForm from "../components/Form/RegisterForm";
import styles from "./page.module.css";
import { asyncFetcher } from "@/utils/graphql";
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
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterRoute() {
  // const { setUser } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Add error state

  const registerUser = async (data: FormData) => {
    const { username, email, password, confirmPassword } = data;

    const userDoesExist = await userExists(email);
    const passwordError = getPasswordError(password, confirmPassword);
    if (userDoesExist) {
      setError(
        "Email already registered. Please use a different email or log in"
      );
    } else if (passwordError) {
      setError(passwordError);
    } else {
      try {
        const data: ResponseData = await asyncFetcher(`mutation {
          register(
            input: { username: "${username}", email: "${email}", password: "${password}" }
          ) {
            jwt
            user {
              username
              email
            }
          }
        }`);
        Cookies.set("token", data.register.jwt, {
          expires: 7, // Expires in 7 days
          secure: true,
          sameSite: "strict",
        });
        router.push("/product-list");
      } catch (error) {
        setError("Registration failed"); // Set error state on catch
        console.error("Error:", error);
      }
    }
  };

  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpFormContainer}>
        <div>
          <RegisterForm
            callback={registerUser}
            closeForm={() => {}}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
