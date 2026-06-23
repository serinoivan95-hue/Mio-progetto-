import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NOVA — Agenzia Web & Digital Marketing",
  description:
    "Trasformiamo le tue idee in risultati digitali. Sviluppo web e digital marketing per brand ambiziosi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${syne.variable} font-inter`}>
        {children}
      </body>
    </html>
  );
}
