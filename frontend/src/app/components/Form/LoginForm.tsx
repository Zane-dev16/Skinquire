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

const LoginForm: FC<LoginFormProps> = ({ closeForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null); // Add error state
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
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
        formData={formData}
        setFormData={setFormData}
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
