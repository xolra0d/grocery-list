import type { Metadata } from "next";
import { Intel_One_Mono } from "next/font/google";
import { Container } from "./_components/container";
import { Header } from "./_components/header";

import "./globals.css";

const oneMono = Intel_One_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grocery list",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="32x32" href="/favicon-32x32.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.ico" />
      </head>
      <body className={`${oneMono.className} min-h-screen bg-olive-200`}>
        <main>
          <Container>
            <Header />
            {children}
          </Container>
        </main>
      </body>
    </html>
  );
}
