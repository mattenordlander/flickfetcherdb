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
      <body className="bg-no-repeat bg-cover" style={bangers.style}>
        <header className="bg-slate-800 flex p-3">
          <Link style={{ textDecoration: "none", color: "white" }} href={"/"}>
            <h1 className="py-2 px-3 text-xl border rounded">flick fetcher db</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
