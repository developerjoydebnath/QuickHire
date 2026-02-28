'use client';

import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-dvh bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="sticky top-0 hidden h-dvh lg:flex">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Bar */}
        <header className="bg-card sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <DashboardSidebar onLinkClick={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <span className="text-muted-foreground text-sm">Hi, {user?.name}</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
