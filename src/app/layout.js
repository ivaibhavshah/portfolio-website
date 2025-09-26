import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import portfolio from "../data/portfolio";
import GlobalLoader from "../components/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: portfolio.meta.title,
  description: portfolio.meta.description,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: portfolio.meta.title,
    description: portfolio.meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.meta.title,
    description: portfolio.meta.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalLoader minMs={1200} />
        {children}
      </body>
    </html>
  );
}
