"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Image from "next/image";

import Cookie from "js-cookie";
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

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  /* const [error, setError] = useState<ApolloError | undefined>(undefined); */

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    const { data } = await registerMutation({
      variables: { username: email, email: email, password },
    });
    if (data?.register.user) {
      // setUser(data.register.user);
      router.push("/product-list");
      Cookie.set("token", data.register.jwt);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <div>
        <Form
          title="Sign Up"
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          callback={handleRegister}
          error={error}
        />
        <a href="http://127.0.0.1:1337/api/connect/google">
          <div className={styles.googleSignIn}>
            <Image src="/google-icon.svg" alt="" width={20} height={20} />
            <span className={styles.googleText}>Continue with Google</span>
          </div>
        </a>
      </div>
    </div>
  );
}
