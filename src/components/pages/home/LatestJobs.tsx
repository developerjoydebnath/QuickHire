'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import LatestJobCard from './LatestJobCard';

export function LatestJobs() {
  const { data, isLoading } = useSWR('/jobs?limit=10', fetcher, { revalidateOnFocus: false });
  const latestJobs = data?.data || [];

  return (
    <section className="relative py-20">
      {/* pattern image  */}
      <Image
        src="/images/Pattern.png"
        alt="Man"
        height={794}
        width={860}
        className="absolute right-0 bottom-0 -z-10 aspect-auto h-[1/2] w-fit object-cover lg:h-full"
      />

      {/* Top-left corner cut */}
      <div className="absolute top-0 left-0 z-30 h-64 w-[320px] overflow-hidden bg-transparent">
        <div className="relative h-full w-full">
          <div className="absolute -top-64 -left-72 z-10 h-80 w-[500px] rotate-155 bg-white" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <h2 className="text-text font-clash-display text-[32px] font-semibold md:text-5xl">
            Latest <span className="text-primary">jobs open</span>
          </h2>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary hidden w-fit gap-4 text-base font-semibold md:flex"
            asChild
          >
            <Link prefetch={false} href={ROUTES.FIND_JOB}>
              Show all jobs
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-start gap-6 bg-white px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:flex-row"
              >
                <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : latestJobs.length === 0 ? (
          <p className="py-12 text-center text-slate-500">No jobs found at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {latestJobs.map((job: any) => {
              // Map backend job to card format
              const cardData = {
                id: job._id,
                company: job.company?.name || 'Unknown',
                location: job.location ? `${job.location.state}, ${job.location.country}` : 'Remote',
                title: job.title,
                type: job.job_type?.name || 'Full Time',
                description: job.description.replace(/<[^>]+>/g, '').substring(0, 80) + '...', // Strip HTML for short desc
                tags: job.categories?.map((c: any) => c.name).slice(0, 2) || [],
                image: job.image_url || job.company?.image_url || '/images/company-placeholder.png', // Priority: job image -> company image -> fallback
              };
              return <LatestJobCard key={job._id} job={cardData as any} />;
            })}
          </div>
        )}

        <Button
          variant="ghost"
          className="text-primary hover:text-primary mt-8 flex w-fit gap-4 text-base font-semibold md:hidden"
          asChild
        >
          <Link prefetch={false} href={ROUTES.FIND_JOB}>
            Show all jobs
            <ArrowRight className="size-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
