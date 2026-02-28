import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Calendar, HelpCircle, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", href: "/dashboard", active: true },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", href: "/dashboard/messages" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Company Profile", href: "/dashboard/profile" },
    { icon: <Users className="w-5 h-5" />, label: "All Applicants", href: "/dashboard/applicants" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Job Listing", href: "/dashboard/jobs" },
    { icon: <Calendar className="w-5 h-5" />, label: "My Schedule", href: "/dashboard/schedule" },
  ];

  const settingsItems = [
    { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/dashboard/settings" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help Center", href: "/dashboard/help" },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen hidden lg:flex flex-col sticky top-0 justify-between">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-transparent">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 text-white rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">JobHuntly</span>
          </Link>
        </div>

        <nav className="px-4 py-8 space-y-8">
          <div className="space-y-1">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Settings
            </div>
            <div className="space-y-1">
              {settingsItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200">
         <div className="flex items-center gap-3 p-2">
            <Avatar>
               <AvatarImage src="https://i.pravatar.cc/150?u=maria" />
               <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-slate-900 truncate">Maria Kelly</p>
               <p className="text-xs text-slate-500 truncate">MariaKlly@email.com</p>
            </div>
         </div>
      </div>
    </aside>
  );
}
