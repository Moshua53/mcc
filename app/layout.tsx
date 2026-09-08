import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mercado VIVA — MVP Devolución Omnicanal (BORIS)",
  description: "Solución omnicanal para devolución de compras digitales en tiendas físicas construida en React, Next.js y Node.js para Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}