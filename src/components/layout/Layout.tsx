import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../WhatsAppButton";
import { useGlobalGSAP } from "@/hooks/useGlobalGSAP";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Activate magnetic cursor + scroll progress bar site-wide
  useGlobalGSAP();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
