
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

// we use layout page because it shows navbar and footer in every subpage we have created

export const metadata = {
  title: "Give-Me-A-Chai",
  description: "For donation purpose",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white inset-0 -z-10 h-full w-full items-center   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <SessionWrapper>
      <Navbar />
      <div className="min-h-screen">
        
        {children}
        </div>
      <Footer />
      </SessionWrapper>
    </body>
    </html >
  );
}
