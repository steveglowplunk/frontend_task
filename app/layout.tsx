import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';
import Navbar from "@/components/navbar";
import { CartProvider } from "./context/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Shop thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <CartProvider>
          <body className={inter.className}>
            <Navbar />
            <div className="h-4" />
            {children}
          </body>
        </CartProvider>
      </PrimeReactProvider>
    </html>
  );
}
