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
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-GPJSCM6C85" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-GPJSCM6C85');
        `}
          </Script>
          <Script id="impact-radius">
            {`
(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A4734627-80d5-4500-881a-8b588c513ce91.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');
        `}
          </Script>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </>
  );
}
