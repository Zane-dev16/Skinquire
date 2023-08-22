import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skinquire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt USD-442249946 ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
