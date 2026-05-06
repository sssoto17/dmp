import Footer from "@/components/globals/Footer";
import Header from "@/components/globals/Header";
import Sidebar from "@/components/globals/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body data-layout="auth">
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </body>
  );
}
