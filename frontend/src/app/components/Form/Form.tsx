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
  isLoginForm: boolean;
}

const Form: React.FC<FormProps> = ({
  title,
  buttonText,
  callback,
  error,
  isLoginForm,
}) => {
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={styles.form}
        >
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
                  message: "Please enter a valid email",
                },
              })}
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
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {errors.email && !isLoginForm && (
            <p className={styles.error} role="alert">
              {errors.email?.message}
            </p>
          )}

          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
        <a
          className={styles.googleLink}
          href="http://localhost:1337/api/connect/google"
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
