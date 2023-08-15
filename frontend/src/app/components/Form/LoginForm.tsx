import { useState, FC } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Form from "./Form";
import styles from "./LoginForm.module.css";
import Link from "next/link";

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
      const json = await res.json();
      if (res.ok) {
        const data = json.data;
        Cookies.set("token", data.login.jwt);
        router.refresh();
        closeForm();
      } else {
        setError(json.errors[0].message || "Registration failed"); // Set error state
      }
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        title="Log In"
        buttonText="Log In"
        callback={handleLogin}
        error={error}
      ></Form>
      {error && <div className={styles.error}>Error: {error}</div>}
      <div className={styles.signUp}>
        <span className={styles.newHereText}>New Here?</span>
        <Link
          className={styles.signUpLink}
          onClick={closeForm}
          href="/register"
        >
          Sign Up!
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
