'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import FeatureJobCard from './FeatureJobCard';

export function FeaturedJobs() {
  const { data, isLoading } = useSWR('/jobs?isFeatured=true&limit=8', fetcher, { revalidateOnFocus: false });
  const featuredJobs = data?.data || [];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <h2 className="text-text font-clash-display text-[32px] font-semibold md:text-5xl">
            Featured <span className="text-primary">jobs</span>
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4 border bg-white p-6">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
                <div className="mt-2 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <Skeleton className="mt-4 h-10 w-full" />
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredJobs.length === 0 ? (
          <p className="py-12 text-center text-slate-500">No featured jobs found at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredJobs.map((job: any) => {
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
              return <FeatureJobCard key={job._id} job={cardData as any} />;
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
