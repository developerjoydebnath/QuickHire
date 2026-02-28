'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import { Briefcase, Building2, FileText, FolderKanban, LayoutDashboard, LogOut, MapPin, Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const SIDEBAR_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Job Categories', href: '/dashboard/job-categories', icon: Tags },
  { label: 'Locations', href: '/dashboard/locations', icon: MapPin },
  { label: 'Companies', href: '/dashboard/companies', icon: Building2 },
  { label: 'Job Types', href: '/dashboard/job-types', icon: FolderKanban },
  { label: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { label: 'Applications', href: '/dashboard/applications', icon: FileText },
];

export function DashboardSidebar({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className="bg-card flex h-full w-64 flex-col border-r">
      <div className="flex h-16 items-center px-6">
        <Link prefetch={false} href={ROUTES.HOME} className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="QuickHire"
            width={200}
            height={100}
            className="h-9 w-[152px] min-w-[152px]"
          />
          <h3 className="sr-only text-xl font-bold">QuichHire</h3>
        </Link>
      </div>
      <Separator />

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator />
      <div className="p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleLogout}>
          <LogOut size={14} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
