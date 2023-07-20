import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
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
        <ApolloWrapper>
          <Navbar></Navbar>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
