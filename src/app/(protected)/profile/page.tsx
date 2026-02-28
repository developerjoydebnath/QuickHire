'use client';

import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export default function ProfilePage() {
  const { user } = useAuthStore();

  // Fetch applications
  const { data: applications, isLoading } = useSWR('/applications/my-applications', fetcher, {
    revalidateOnFocus: false,
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'hired':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-100';
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome{user ? `, ${user.name}` : ''}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your profile and track your job applications here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar / Profile Info */}
          <div className="md:col-span-1">
            {user && (
              <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">Your Info</h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="block font-semibold text-gray-900 dark:text-gray-200">Name</span>
                    {user.name}
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-900 dark:text-gray-200">Email</span>
                    {user.email}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content / Applications */}
          <div className="md:col-span-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-50">Application History</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="text-primary h-8 w-8 animate-spin" />
                </div>
              ) : !applications || applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <p className="mb-4">You haven&apos;t applied to any jobs yet.</p>
                  <Link href={ROUTES.FIND_JOB} className="text-primary font-medium hover:underline">
                    Browse open positions
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                  <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app: any) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                            {app.job ? (
                              <Link
                                href={`${ROUTES.FIND_JOB}/${app.job._id}`}
                                className="hover:text-primary transition-colors hover:underline"
                              >
                                {app.job.title}
                              </Link>
                            ) : (
                              <span className="text-gray-400 italic">Job Unavailable</span>
                            )}
                          </TableCell>
                          <TableCell>{app.job?.company?.name || 'Unknown'}</TableCell>
                          <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`font-medium capitalize ${getStatusColor(app.status)}`}
                            >
                              {app.status || 'Pending'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
