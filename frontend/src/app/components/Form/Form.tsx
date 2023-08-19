import React, { Dispatch, SetStateAction } from "react";
import styles from "./Form.module.css"; // Import the CSS module
import { motion } from "framer-motion";
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
      <div className={styles.errorContainer}>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {errors.email && (
          <p className={styles.error} role="alert">
            Please enter a valid email
          </p>
        )}
      </div>

      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={styles.form}
        >
          <h3 className={styles.title}>{title}</h3>
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
            placeholder="EMAIL"
            className={styles.input}
          />
          <input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            placeholder="PASSWORD"
            className={styles.input}
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fffbed",
              color: "#50443A",
            }}
            transition={{
              type: "spring",
              backgroundColor: { ease: "linear" },
              color: { ease: "linear" },
            }}
            type="submit"
            className={styles.button}
          >
            {buttonText}
          </motion.button>
        </form>
        <a
          className={styles.googleLink}
          href="http://localhost:1337/api/connect/google"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
            className={`${styles.button} ${styles.googleButton}`}
          >
            <Image src="/google-icon.svg" alt="" width={20} height={20} />
            <span className={styles.googleText}>CONTINUE WITH GOOGLE</span>
          </motion.button>
        </a>
      </div>
    </section>
  );
};

export default Form;
