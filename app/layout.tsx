import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Sujitha's PC",
  description: 'A nostalgic Windows 95 inspired portfolio for Sujitha C B.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
