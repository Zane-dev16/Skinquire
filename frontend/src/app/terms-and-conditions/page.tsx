import styles from "../info.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Skinquire",
  description:
    "Skinquire&apos;s Terms and Conditions. Understand the guidelines that shape our platform, promoting a respectful and collaborative space for sharing insights and experiences related to skincare products.",
};

const page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <p className={styles.text}>
        Welcome to Skinquire&apos;s Terms and Conditions. These terms outline
        the rules, guidelines, and responsibilities that govern your use of our
        platform. By accessing and using skinquire.net, you agree to abide by
        these terms. They are designed to promote a safe, respectful, and
        engaging community for skincare enthusiasts. Please read these terms
        carefully before using our website.
      </p>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>Copyright Notice</h2>
        <p className={styles.text}>
          All content, including text, graphics, images, and other materials on
          skinquire.net, is protected by copyright laws. Users are prohibited
          from reproducing, distributing, or using any content from the website
          without explicit authorization. Unauthorized copying, reproduction,
          distribution, transmission, display, or modification of content on
          skinquire.net is strictly prohibited and may result in legal action.
          If you have any questions or concerns about copyright issues related
          to skinquire.net, please contact us at:{" "}
          <a className={styles.aboutLink} href="mailto:skinquiremi@gmail.com">
            skinquiremi@gmail.com
          </a>
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>
          Website Functionality and User Interaction
        </h2>
        <h3>Purpose of the Website</h3>
        <p className={styles.text}>
          Welcome to skinquire, a dynamic platform designed to empower skincare
          enthusiasts with a centralized space for sharing, discovering, and
          learning about skincare products. Our primary goal is to foster a
          vibrant community where users can collaboratively contribute their
          insights and experiences, enabling others to make informed decisions
          when incorporating skincare products into their routines.
        </p>
        <h3>Product Ratings and Reviews</h3>
        <p className={styles.text}>
          At skinquire.net, we emphasize user engagement through a
          straightforward and interactive system. On individual product pages,
          users are encouraged to evaluate skincare products using a scale
          ranging from 1 to 10 and to provide detailed reviews based on their
          personal experiences. This collective input forms the foundation of
          our community-driven ratings and reviews. To ensure meaningful
          contributions and authentic engagement, users must be logged into
          their accounts to submit ratings and reviews. For those who are not
          yet registered, our platform offers a seamless registration process
          accessible via the profile icon in the navigation bar. Upon
          registration, users can fully participate in shaping the skincare
          discourse and community.
        </p>
        <h3>User Account Creation</h3>
        <p className={styles.text}>
          Creating an account on skinquire.net is easy and inclusive. Click on
          the profile icon in the navigation bar to access a comprehensive
          profile menu. Existing users can conveniently log in using their
          credentials. Newcomers can navigate to the registration page through
          the prompts within the profile menu.
        </p>
        <p className={styles.text}></p>

        <h3>Engage and Contribute</h3>
        <p className={styles.text}>
          Upon logging in, users can actively rate and review products,
          fostering a sense of ownership within the skincare community. For
          those who prefer not to contribute content, public users can still
          consult reviews, ratings, and aggregated product scores, catering to
          diverse preferences.
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>User Conduct and Responsibility</h2>
        <p className={styles.text}>
          At skinquire.net, we believe in fostering a respectful, informative,
          and collaborative environment for all users. By accessing and using
          our platform, you agree to adhere to the following user conduct and
          responsibilities:
        </p>
        <h3>Honest and Respectful Engagement</h3>
        <p className={styles.text}>
          When participating in discussions, providing ratings, and submitting
          reviews, users are expected to communicate honestly and respectfully.
          Users must comply with all applicable laws, regulations, and these
          terms and conditions while using skinquire.net. This includes
          refraining from publishing unlawful, defamatory, or harmful content.
          Content must be free of offensive, discriminatory, or harmful
          language. Use respectful and inclusive language.Content should not be
          promotional or commercial in nature. Avoid overt self-promotion,
          advertising, or endorsements.Contributions must align with
          skinquire.net&apos;s community guidelines. Content that violates these
          guidelines may be subject to removal.
        </p>
        <h3>Authentic User Input</h3>
        <p className={styles.text}>
          All product ratings are based on the genuine experiences and opinions
          of users. Ratings should reflect individual perceptions and outcomes
          without influence from external entities or sponsoring companies. When
          providing reviews, ensure that the information shared reflects
          personal experiences
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>
          Ownership of User-Generated Content
        </h2>
        <p className={styles.text}>
          Users retain ownership of the content (reviews, ratings) they submit
          to skinquire.net. However, by submitting content, users grant the
          website a non-exclusive, perpetual, and irrevocable license to use,
          display, and distribute the content in connection with the
          website&apos;s services.
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>Data Handling and Privacy</h2>

        <p className={styles.text}>
          User data, including usernames and reviews, is collected and stored in
          accordance with our Privacy Policy. This data is used to provide and
          improve the website&apos;s services and to support the skincare
          community.
        </p>
        <h3>Third-Party Affiliate Programs</h3>
        <p className={styles.text}>
          The website participates in affiliate programs, and products may be
          marketed through affiliate links. Users should refer to the Privacy
          Policy for information on how user data may be shared with affiliate
          partners.
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>
          Content Moderation and Account Termination
        </h2>

        <p className={styles.text}>
          All content submitted by users is subject to moderation. The website
          reserves the right to remove or modify any content that violates the
          content guidelines, terms of service, or community standards. The
          website may terminate user accounts for violations of terms and
          conditions, abusive behavior, fraudulent activities, or any other
          reason deemed necessary by the website administrators.
        </p>
      </div>
      <div className={styles.sections}>
        <h2 className={styles.subheading}>Changes to Terms and Conditions</h2>
        <p className={styles.text}>
          As skinquire.net continues to grow and evolve, the terms and
          conditions may be updated from time to time. Users are encouraged to
          regularly review the terms and conditions to stay informed about any
          changes that may affect their use of the website.
        </p>
      </div>
    </div>
  );
};

export default page;
