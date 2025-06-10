import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import AdminSidebar from '@/components/layout/admin/sidebar/admin-sidebar';
import Navbar from '@/components/layout/general/navbar';
import Footer from '@/components/layout/general/footer';
import { Toaster } from '@/components/ui/shadcn/sonner';
import '@/app/globals.css';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <div className="flex w-full flex-col px-2 py-2 md:px-0 md:pr-2">
        <Navbar />
        <main className="flex flex-1 flex-col px-1 pt-2 md:px-0">
          {children}
          <Toaster richColors position="top-right" />
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
