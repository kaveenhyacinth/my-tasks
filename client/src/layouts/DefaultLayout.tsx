import { Navbar } from "@/components/organisms/Navbar.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center py-3" />
    </div>
  );
}
