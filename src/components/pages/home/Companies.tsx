'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export default function Companies() {
  const { data, isLoading } = useSWR('/companies?limit=5', fetcher, { revalidateOnFocus: false });
  const fetchedCompanies = data?.data || [];

  return (
    <section id="companies" className="bg-white py-10 sm:py-12">
      <div className="container mx-auto space-y-8">
        <p className="text-muted text-lg">Companies we helped grow</p>

        {isLoading ? (
          <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-md" />
            ))}
          </div>
        ) : fetchedCompanies.length === 0 ? (
          <p className="text-sm text-slate-400">No companies found.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16">
            {fetchedCompanies.map((company: any) => (
              <div key={company._id} className="flex items-center gap-3">
                {company.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={company.image_url}
                    alt={company.name}
                    className="h-8 max-h-8 w-fit object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-400 grayscale transition-all duration-300 hover:grayscale-0">
                    {company.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
