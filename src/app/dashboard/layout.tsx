import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Plus } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Dashboard Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-xl cursor-default">
               N
             </div>
             <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Company</p>
                <div className="flex items-center gap-2 cursor-pointer">
                   <h2 className="text-lg font-bold text-slate-900">Nomad</h2>
                   <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 border-r border-slate-200 pr-6">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                   <Bell className="w-6 h-6" />
                   <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
             </div>
             <Button className="font-semibold px-6 shadow-md hover:shadow-lg transition-all hidden md:flex" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Post a job
             </Button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
