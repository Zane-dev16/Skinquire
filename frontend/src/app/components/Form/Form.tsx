import React, { Dispatch, SetStateAction } from "react";
import styles from "./Form.module.css"; // Import the CSS module
import { ErrorMessage } from "@hookform/error-message";
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    callback(data);
  };

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
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>
          {errors.email && (
            <p className={styles.error} role="alert">
              {errors.email?.message}
            </p>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              id="password"
              type="password"
              name="password"
              placeholder="************"
              className={styles.input}
            />
          </div>
          {error && <div className={styles.error}>Error: {error}</div>}
          {errors.password && (
            <p className={styles.error} role="alert">
              {errors.password?.message}
            </p>
          )}

          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
        <a
          className={styles.googleLink}
          href="http://127.0.0.1:1337/api/connect/google"
        >
          <button className={styles.googleButton}>
            <Image src="/google-icon.svg" alt="" width={20} height={20} />
            <span className={styles.googleText}>Continue with Google</span>
          </button>
        </a>
      </div>
    </section>
  );
};

export default Form;
