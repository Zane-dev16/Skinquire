import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Skinquire - Skinquire",
  description:
    "At Skinquire, we believe in the power of collective wisdom. Explore our journey and mission to provide you with the most reliable skincare advice, fueled by skin care community.",
};

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutHeading}>About</h1>
      <p className={styles.aboutText}>
        Welcome to Skinquire.net, your ultimate destination for skincare product
        ratings and reviews! Are you tired of sifting through conflicting
        recommendations and product claims? We were too, and that&apos;s why we
        embarked on a journey to create a centralized platform that simplifies
        your skincare choices.
      </p>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>Our Inspiration</h2>
        <p className={styles.aboutText}>
          Like many of you, we&apos;ve been there – spending hours online,
          searching for the perfect skincare products amidst a sea of
          conflicting opinions. It became clear that there was a need for a
          reliable source of information, just like IMDb helps us find the best
          movies. And so, Skinquire.net was born – a platform dedicated to
          providing you with accurate and community-driven skincare product
          ratings.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>Empowering the Community</h2>
        <p className={styles.aboutText}>
          What sets us apart is our unwavering belief in the power of the
          community. Our unique approach involves gathering insights from real
          users like you. Dermatologist recommendations are valuable, but with
          the ever-expanding array of options, finding what truly works can be a
          challenge. That&apos;s where our community steps in. Every rating and
          review you find on Skinquire.net comes from genuine users who&apos;ve
          experienced these products firsthand.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>
          Unbiased Ratings, Genuine Reviews
        </h2>
        <p className={styles.aboutText}>
          We take pride in maintaining the integrity of our ratings and reviews.
          Our algorithm is driven by user experiences, ensuring that no review
          is fabricated or influenced by monetary interests. Our commitment to
          transparency means you&apos;re getting the real scoop on what works
          and what doesn&apos;t.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>
          Your Skincare Journey, Simplified
        </h2>
        <p className={styles.aboutText}>
          Navigating the world of skincare can be overwhelming, but it
          doesn&apos;t have to be. At Skinquire.net, we&apos;ve curated a
          diverse range of products, each with a reliable rating and review to
          guide you. Whether you&apos;re looking to address specific concerns or
          simply enhance your skincare routine, we&apos;re here to make your
          journey smoother.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>Join Our Community</h2>
        <p className={styles.aboutText}>
          We&apos;re more than just a ratings platform – we&apos;re a vibrant
          community of skincare enthusiasts. Share your experiences, connect
          with like-minded individuals, and contribute to a knowledge hub
          that&apos;s fueled by the passion for healthier, glowing skin.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutSubheading}>Get Involved</h2>
        <p className={styles.aboutText}>
          Ready to embark on your skincare journey with us? Here&apos;s how you
          can get started:
        </p>

        <ul className={styles.aboutList}>
          <li>
            <strong>Explore the Product List:</strong> Dive into our curated
            selection of skincare products, each accompanied by honest ratings
            and reviews from the community.
            <Link className={styles.aboutLink} href="/product-list">
              Explore
            </Link>
          </li>
          <li>
            <strong>Contact Us:</strong> Have questions, suggestions, or
            partnership inquiries? We&apos;re here to listen. Reach out to us at{" "}
            <a className={styles.aboutLink} href="mailto:skinquiremi@gmail.com">
              skinquiremi@gmail.com
            </a>
            .
          </li>
        </ul>
      </div>

      <p className={styles.aboutText}>
        At Skinquire.net, we&apos;re excited to be your skincare companion,
        offering you a reliable source of information and a warm community to be
        a part of. Let&apos;s embark on this journey to better skin together!
      </p>
    </div>
  );
};

export default About;
