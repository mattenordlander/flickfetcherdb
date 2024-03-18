import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hand me the popcorn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header
          style={{
            width: "100%",
            backgroundColor: "hotpink",
            padding: "0.2em 1rem",
            marginBottom: "1rem",
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} href={"/"}>
            <h1>LOGO</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
