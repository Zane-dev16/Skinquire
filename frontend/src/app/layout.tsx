import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/HomeSections/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  other: { "ir-site-verification-token": "-442249946" },
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GPJSCM6C85"></Script>
<Script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GPJSCM6C85');
</Script>
          </Script>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </>
  );
}
