import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
