import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/HomeSections/Footer";

export const metadata: Metadata = {
  keywords: [
    "skin care",
    "skincare products",
    "product ratings",
    "skincare product ratings",
    "skincare product reviews",
    "skincare product reviews",
    "reviews",
    "skin issues",
    "community reviews",
    "skin care community",
    "skin rating",
    "skin care ratings",
    "skin care reviews",
  ],
  authors: [{ name: "Irell Zane" }, { name: "Márcia Dias" }],
  creator: "Irell Zane & Márcia Dias",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-53MKF5GRFY"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-53MKF5GRFY');
          </script>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </>
  );
}
