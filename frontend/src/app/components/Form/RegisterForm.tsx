import React, { Dispatch, SetStateAction, useState } from "react";
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
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormProps {
  callback: (data: FormData) => void;
  closeForm: () => void;
  error: string | null;
}

const RegisterForm: React.FC<FormProps> = ({ callback, closeForm, error }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    callback(data);
  };
  const togglePass = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section>
      <div className={styles.formContainer}>
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error} role="alert">
              {error}
            </p>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={styles.form}
        >
          <h3 className={styles.title}>SIGN UP</h3>
          <motion.input
            whileFocus={{ backgroundColor: "#50443A", color: "#fffbed" }}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3, // Minimum length for the username
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20, // Maximum length for the username
                message: "Username cannot exceed 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/, // Regular expression pattern for alphanumeric characters and underscores
                message:
                  "Username must only contain letters, numbers, and underscores",
              },
            })}
            id="username"
            type="text"
            name="username"
            placeholder="USERNAME"
            className={styles.input}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
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
          {errors.email && (
            <p className={styles.error} role="alert">
              Please enter a valid email
            </p>
          )}
          <div className={styles.inputContainer}>
            <motion.input
              whileFocus={{ backgroundColor: "#50443A", color: "#fffbed" }}
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              className={styles.input}
            />
            <div className={styles.eyeIcon} onClick={togglePass}>
              {showPassword ? (
                <Image
                  src="/openEye.svg"
                  alt="Open Eye Icon"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src="/closedEye.svg"
                  alt="Open Eye Icon"
                  width={30}
                  height={30}
                />
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <motion.input
              whileFocus={{ backgroundColor: "#50443A", color: "#fffbed" }}
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              className={styles.input}
            />
            <div className={styles.eyeIcon} onClick={toggleConfirmPass}>
              {showConfirmPassword ? (
                <Image
                  src="/openEye.svg"
                  alt="Open Eye Icon"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src="/closedEye.svg"
                  alt="Open Eye Icon"
                  width={30}
                  height={30}
                />
              )}
            </div>
          </div>
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
            Sign Up
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

export default RegisterForm;
