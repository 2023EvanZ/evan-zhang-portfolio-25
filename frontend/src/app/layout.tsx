import type { Metadata } from "next";
import { Newsreader, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ProgressBar from "../../components/ProgressBar";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Evan Zhang",
  description:
    "Computer science and statistics student at the University of Virginia. Software engineering, machine learning, and the unglamorous middle of the stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased bg-bg text-fg`}
      >
        <ProgressBar />

        {children}
      </body>
    </html>
  );
}
