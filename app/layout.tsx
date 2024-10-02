import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FinnTypeLight.variable} ${FinnTypeMedium.variable} bg-gray-100 min-h-screen`}
      >
        <main className="max-w-[1000px] mx-auto p-4 min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
