'use client';

import { JobApplyForm } from '@/components/pages/jobs/JobApplyForm';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { ArrowLeft, Briefcase, Calendar, DollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import useSWR from 'swr';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: job, isLoading } = useSWR(`/jobs/${id}`, fetcher, { revalidateOnFocus: false });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <div className="border-b border-slate-200 bg-slate-50 py-12">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 w-32">
              <Skeleton className="h-5 w-full" />
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-6">
                <Skeleton className="h-24 w-24 shrink-0 rounded-2xl" />
                <div className="space-y-3 pl-2">
                  <Skeleton className="h-8 w-64" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-12 w-32 rounded-md" />
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-12 max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="space-y-6 lg:col-span-1">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Job Not Found</h2>
        <Link href={ROUTES.FIND_JOB} className="text-primary hover:underline">
          Go back to jobs
        </Link>
      </div>
    );
  }

  // JobApplyForm handles submission logic internally

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-slate-50 py-12">
        <div className="container mx-auto max-w-5xl px-6">
          <Link
            prefetch={false}
            href={ROUTES.FIND_JOB}
            className="hover:text-primary mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all jobs
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {job?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={job.image_url} alt={job.company.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-slate-400">{job.company?.name?.[0]}</span>
                )}
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold text-slate-900">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 font-medium text-slate-500">
                  <span>{job.company?.name || 'Unknown Company'}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location ? `${job.location.state}, ${job.location.country}` : 'Remote'}</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-bold tracking-widest text-green-700 uppercase">
                    {job.job_type?.name || 'Full Time'}
                  </span>
                </div>
              </div>
            </div>

            <JobApplyForm jobId={job._id} jobTitle={job.title} companyName={job.company?.name || 'Unknown Company'} />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-10 text-slate-700 lg:col-span-2">
            <section>
              <h3 className="mb-4 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900">Description</h3>
              {/* Render rich text content */}
              <div
                className="prose prose-slate prose-p:mb-4 prose-p:mt-0 prose-ul:list-disc prose-ul:ml-5 prose-ol:list-decimal prose-ol:ml-5 prose-li:mb-1 prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-xl prose-h2:font-bold prose-h2:mb-3 prose-h3:text-lg prose-h3:font-bold prose-h3:mb-2 max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>
          </div>

          {/* Sidebar Overview */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-6 text-lg font-bold text-slate-900">About this role</h3>

              <div className="space-y-4">
                {job.salary_range && (
                  <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                    <DollarSign className="text-primary mt-0.5 h-6 w-6" />
                    <div>
                      <p className="mb-0.5 text-sm font-medium text-slate-500">Salary</p>
                      <p className="font-bold text-slate-900">{job.salary_range}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <Briefcase className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Job Type</p>
                    <p className="font-bold text-slate-900">{job.job_type?.name || '-'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <Calendar className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Date Posted</p>
                    <p className="font-bold text-slate-900">
                      {new Date(job.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <Calendar className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Deadline</p>
                    <p className="font-bold text-slate-900">
                      {new Date(job.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-slate-200" />

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {job.categories?.map((cat: any) => (
                    <span
                      key={cat._id}
                      className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700"
                    >
                      {cat.name}
                    </span>
                  ))}
                  {!job.categories?.length && <span className="text-sm text-slate-500">No categories</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
