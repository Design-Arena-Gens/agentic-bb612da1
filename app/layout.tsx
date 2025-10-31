import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const openSans = Open_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: "Mohammad Reza Shah's International Travels",
  description: "Interactive map visualizing the international diplomatic journeys of Mohammad Reza Shah Pahlavi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${openSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
