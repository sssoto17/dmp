import Footer from "@/components/globals/Footer";
import Header from "@/components/globals/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: Readonly<LayoutProps>) {
  return (
    <body data-layout="public">
      <Header />
      {children}
      <Footer />
    </body>
  );
}
