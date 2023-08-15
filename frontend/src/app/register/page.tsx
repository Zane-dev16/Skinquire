"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import { useSWRConfig } from "swr";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useForm, SubmitHandler } from "react-hook-form";

import Cookies from "js-cookie";
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

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function RegisterRoute() {
  // const { setUser } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Add error state
  const registerUser = async (data: FormData) => {
    const { email, password } = data;
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
      if (res.ok) {
        const data = jsonRes.data;
        Cookies.set("token", data.register.jwt);
        router.push("/product-list");
      } else {
        setError(jsonRes.errors[0].message || "Registration failed"); // Set error state
      }
    } catch (error) {
      setError("Registration failed"); // Set error state on catch
      console.error("Registration Failed", error);
    }
  };

  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpFormContainer}>
        <Form
          title="Sign Up"
          buttonText="Sign Up"
          callback={registerUser}
          error={error}
        />
      </div>
    </main>
  );
}
