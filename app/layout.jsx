import { Bangers } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bangers = Bangers({ subsets: ["latin"],
weight:"400"
});

export const metadata = {
  title: "Hand me the popcorn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bangers.className} style={{backgroundImage:"linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);"}}>
        <header className="bg-slate-800">
          <Link style={{ textDecoration: "none", color: "white" }} href={"/"}>
            <h1 className="p-4">LOGO</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
