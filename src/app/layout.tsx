import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flag Review Oversight DashboardX",
  description: "Case flag review tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
