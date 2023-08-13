import React, { Dispatch, SetStateAction } from "react";
import styles from "./Form.module.css"; // Import the CSS module

interface FormData {
  email: string;
  password: string;
}

interface FormProps {
  title: string;
  buttonText: string;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  callback: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; // Define the type for the async callback
  error: string | null;
}

const Form: React.FC<FormProps> = ({
  title,
  buttonText,
  formData,
  setFormData,
  callback,
  error,
}) => {
  return (
    <section>
      <div className={styles.formContainer}>
        <form onSubmit={callback} className={styles.form}>
          <h3>{title}</h3>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="************"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={styles.input}
            />
          </div>
          {error && <div className={styles.error}>Error: {error}</div>}
          <button type="submit" className={styles.button}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
