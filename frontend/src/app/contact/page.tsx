import React from "react";

import styles from "./page.module.css";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactHeading}>Get in Touch with Skinquire</h1>
      <p className={styles.contactDescription}>
        We&apos;re here to listen and engage with you. Whether you have
        questions, feedback, suggestions, or just want to say hello, we&apos;d
        love to hear from you!
      </p>

      <div className={styles.contactMethods}>
        <div className={styles.contactMethod}>
          <h2 className={styles.methodHeading}>Email Us</h2>
          <p className={styles.methodDescription}>
            For any inquiries or messages, you can reach us at:
          </p>
          <a className={styles.methodLink} href="mailto:skinquiremi@gmail.com">
            skinquiremi@gmail.com
          </a>
        </div>

        <div className={styles.contactMethod}>
          <h2 className={styles.methodHeading}>Connect on Social Media</h2>
          <ul className={styles.socialLinks}>
            <li>
              <a
                className={styles.socialLink}
                href="https://www.instagram.com/skinquire"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className={styles.socialLink}
                href="https://www.facebook.com/skinquire"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.contactClosing}>
        We&apos;re excited to connect with you and continue building our
        skincare community. Your thoughts and feedback are valuable to us!
      </p>
    </div>
  );
};

export default Contact;
