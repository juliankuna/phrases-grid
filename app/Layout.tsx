import Header from "@organisms/Header";
import Footer from "@organisms/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-6 max-w-6xl px-6 mt-8 mb-8">{children}</main>
      <Footer />
    </div>
  );
}
