import Sidebar from "@/components/Admin/SideBar/SideBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      
      <Sidebar />

      <main className="lg:ml-72 min-h-screen">
        {children}
      </main>

    </div>
  );
}