'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';
import { Briefcase, Building2, FileText, FolderKanban, MapPin, Tags } from 'lucide-react';
import useSWR from 'swr';

const STAT_CARDS = [
  { key: 'categories', label: 'Job Categories', icon: Tags, color: 'text-blue-600 bg-blue-50' },
  { key: 'locations', label: 'Locations', icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
  { key: 'companies', label: 'Companies', icon: Building2, color: 'text-violet-600 bg-violet-50' },
  { key: 'jobTypes', label: 'Job Types', icon: FolderKanban, color: 'text-orange-600 bg-orange-50' },
  { key: 'jobs', label: 'Jobs', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50' },
  { key: 'applications', label: 'Applications', icon: FileText, color: 'text-rose-600 bg-rose-50' },
];

export default function DashboardPage() {
  const { data, isLoading } = useSWR('/stats', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAT_CARDS.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = stat.color.split(' ');
          return (
            <Card key={stat.key}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">{stat.label}</CardTitle>
                <div className={`flex size-10 items-center justify-center rounded-lg ${colorClasses[1]}`}>
                  <Icon size={20} className={colorClasses[0]} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{data?.[stat.key] ?? 0}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Application Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Applications by Status</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 flex-1" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(data?.applicationsByStatus || []).map((s: any) => (
                <div key={s._id} className="rounded-lg border p-4 text-center">
                  <p className="text-muted-foreground mb-1 text-xs font-medium capitalize">{s._id}</p>
                  <p className="text-2xl font-bold">{s.count}</p>
                </div>
              ))}
              {(!data?.applicationsByStatus || data.applicationsByStatus.length === 0) && (
                <p className="text-muted-foreground col-span-full text-center text-sm">No applications yet.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
