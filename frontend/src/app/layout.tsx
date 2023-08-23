import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
  description:
    "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
  keywords: [
    "skin care",
    "skincare products",
    "product ratings",
    "reviews",
    "skin issues",
    "community reviews",
  ],
  authors: [{ name: "Irell Zane" }, { name: "Márcia Dias" }],
  creator: "Irell Zane & Márcia Dias",
  metadataBase: new URL("https://acme.com"),

  openGraph: {
    title:
      "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
    description:
      "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
    url: "https://skinquire.net",
    siteName: "Skinquire",
    images: [
      {
        url: "https://skinquire-bucket.s3.amazonaws.com/Skinquire_Logo_8a2b219732.png",
        width: 800,
        height: 600,
        alt: "Skinquire Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",

    title:
      "Skinquire - Skin Care Product Ratings and Reviews, Find the Best Skin Care Products",
    description:
      "The Platform for Skin Care Product Ratings and Reviews. Find the best Skin Care Products with Community Driven Ratings and Reviews, Guiding You to Discover and Elevate Your Skin Care Routine",
    images: [
      {
        url: "https://skinquire-bucket.s3.amazonaws.com/Skinquire_Logo_8a2b219732.png",
        width: 800,
        height: 600,
        alt: "Skinquire Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Head>
            <title>My page title</title>
          </Head>
          <Navbar></Navbar>
          {children}
        </body>
      </html>
    </>
  );
}
