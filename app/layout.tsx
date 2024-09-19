import localFont from "next/font/local";
import "./globals.css";

const FinnTypeLight = localFont({
  src: "./fonts/FINNTypeStrippet-Light.woff2",
  variable: "--font-finn-light",
  weight: "300",
});
const FinnTypeMedium = localFont({
  src: "./fonts/FINNTypeStrippet-Medium.woff2",
  variable: "--font-finn-medium",
  weight: "500",
});

export const metadata = {
  title: "Husjakten",
  description: "Følg med på annonserte hus og hvordan priser endres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FinnTypeLight.variable} ${FinnTypeMedium.variable}`}>
        {children}
      </body>
    </html>
  );
}
