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
  closeForm: () => void;
  error: string | null;
  isLoginForm: boolean;
}

const Form: React.FC<FormProps> = ({
  title,
  buttonText,
  callback,
  closeForm,
  error,
  isLoginForm,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
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
          <motion.input
            whileFocus={{ backgroundColor: "#50443A", color: "#fffbed" }}
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
          <motion.input
            whileFocus={{ backgroundColor: "#50443A", color: "#fffbed" }}
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
            }}
            transition={{
              type: "spring",
            }}
            type="submit"
            className={styles.button}
          >
            {buttonText}
          </motion.button>
        </form>
        <a
          className={styles.googleLink}
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/google`}
        >
          <motion.button
            onClick={closeForm}
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
