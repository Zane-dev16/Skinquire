import React, { Dispatch, SetStateAction } from "react";
import styles from "./Form.module.css"; // Import the CSS module
import Image from "next/image";
import {
  UseFormRegister,
  FieldValues,
  useForm,
  SubmitHandler,
} from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

interface FormProps {
  title: string;
  buttonText: string;
  callback: (data: FormData) => void;
  error: string | null;
}

const Form: React.FC<FormProps> = ({ title, buttonText, callback, error }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => callback(data);

  return (
    <section>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h3>{title}</h3>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              name="password"
              placeholder="************"
              className={styles.input}
            />
          </div>
          {error && <div className={styles.error}>Error: {error}</div>}
          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
      </div>
      <a href="http://127.0.0.1:1337/api/connect/google">
        <div className={styles.googleButton}>
          <Image src="/google-icon.svg" alt="" width={20} height={20} />
          <span className={styles.googleText}>Continue with Google</span>
        </div>
      </a>
    </section>
  );
};

export default Form;
