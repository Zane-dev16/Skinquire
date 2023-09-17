import styles from "../info.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Skinquire",
  description:
    "Our Privacy Policy outlines how we safeguard your personal information on Skinquire. Understand how your data is collected, used, and protected while engaging with our skincare product ratings and reviews community.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Privacy Policy</h1>

      <h2 className={styles.subheading}>Information We Collect</h2>
      <p className={styles.text}>
        We collect and store the following information from our users:
        <ul>
          <li>
            Account Information: When you create an account on Skinquire, we
            collect your username, email address, and password. This information
            is used solely for the purpose of user authentication and account
            management.
          </li>
          <li>
            User-Generated Content: If you choose to provide ratings and reviews
            for skincare products on our platform, we will collect and store
            this content. This information is used to provide valuable insights
            to the community and enhance the user experience.
          </li>
          <li>
            Authentication Data: We use cookies and JWT (JSON Web Tokens) to
            track the authentication state of users. This data is used to
            maintain your logged-in status while using our platform.
          </li>
        </ul>
      </p>

      <h2 className={styles.subheading}>Use of Data</h2>
      <p className={styles.text}>
        We use the collected data for the following purposes:
        <ul>
          <li>
            User Authentication and Account Management: Your account information
            is used to authenticate your access to our platform and manage your
            account.
          </li>
          <li>
            User-Generated Content: Ratings and reviews you provide are
            displayed on our platform to help other users make informed
            decisions about skincare products.
          </li>
          <li>
            Authentication Tracking: We use cookies and JWT to track the
            authentication state of users, ensuring a seamless and secure user
            experience.
          </li>
        </ul>
      </p>

      <h2 className={styles.subheading}>Data Security</h2>
      <p className={styles.text}>
        We are committed to protecting your data and have implemented security
        measures to prevent unauthorized access, disclosure, alteration, or
        destruction of your personal information. User data is stored on our
        managed database and Strapi, a content management system, and is
        accessible only by authorized personnel.
      </p>

      <h2 className={styles.subheading}>Affiliate Links</h2>
      <p className={styles.text}>
        We do not share user data with any third parties, affiliates, or
        advertisers. Your data is used solely within the Skinquire platform for
        the purposes mentioned above.
      </p>

      <h2 className={styles.subheading}>Data Sharing</h2>
      <p className={styles.text}>
        We do not share user data with any third parties, affiliates, or
        advertisers. Your data is used solely within the Skinquire platform for
        the purposes mentioned above.
      </p>

      <h2 className={styles.subheading}>Contact</h2>
      <p className={styles.text}>
        If you have any questions, concerns, or requests regarding your personal
        data, you can contact us at:
        <a className={styles.aboutLink} href="mailto:skinquiremi@gmail.com">
          skinquiremi@gmail.com
        </a>
      </p>

      <h2 className={styles.subheading}>Changes to Privacy Policy</h2>
      <p className={styles.text}>
        As Skinquire continues to grow and evolve, this Privacy Policy may be
        subject to change. We recommend reviewing this policy periodically for
        any updates.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
