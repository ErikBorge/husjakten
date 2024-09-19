import "./styles/globals.css";

export const metadata = {
  title: "Husjakten",
  description: "Følg med på annonserte hus og hvordan priser endres.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
