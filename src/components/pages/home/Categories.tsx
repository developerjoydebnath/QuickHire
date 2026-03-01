'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import CategoryCard from './CategoryCard';

export function Categories() {
  const { data, isLoading } = useSWR('/job-categories?limit=8', fetcher, { revalidateOnFocus: false });
  const fetchedCategories = data?.data || [];
  return (
    <section className="bg-white py-10 sm:py-12 md:py-14 lg:py-[72px]">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <h2 className="text-text font-clash-display text-[32px] font-semibold md:text-5xl">
            Explore by <span className="text-primary">category</span>
          </h2>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary hidden gap-4 text-base font-semibold md:flex"
            asChild
          >
            <Link prefetch={false} href={ROUTES.FIND_JOB}>
              Show all jobs
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border-border flex h-full flex-row items-center gap-8 border bg-white p-4 sm:p-8 md:flex-col md:items-start"
              >
                <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
                <div className="w-full flex-1 space-y-2 py-2 sm:space-y-4">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchedCategories.length === 0 ? (
          <p className="py-12 text-center text-slate-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fetchedCategories.map((category: any) => (
              <CategoryCard
                key={category._id}
                category={{
                  id: category._id,
                  name: category.name,
                  slug: category.slug, // To pass to Search filter later
                  count: category.count || 0, // Fallback if backend doesn't aggregate job counts yet
                  icon: category.icon_name || 'Briefcase',
                }}
              />
            ))}
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
