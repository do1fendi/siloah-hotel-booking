import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Siloah",
  description: "Hotel booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`text-gray-600`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
