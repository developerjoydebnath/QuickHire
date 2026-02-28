'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { Filter, Loader2, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import useSWR from 'swr';

function JobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch); // Used for fetching
  const [location, setLocation] = useState(initialLocation);
  const [activeLocation, setActiveLocation] = useState(initialLocation); // Used for fetching

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch filter options
  const { data: locData } = useSWR('/locations?limit=100', fetcher, { revalidateOnFocus: false });
  const { data: typeData } = useSWR('/job-types?limit=100', fetcher, { revalidateOnFocus: false });
  const { data: catData } = useSWR('/job-categories?limit=100', fetcher, { revalidateOnFocus: false });

  const locations = locData?.data || [];
  const jobTypes = typeData?.data || [];
  const categories = catData?.data || [];

  // Fetch Jobs
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(activeSearch && { search: activeSearch }),
    ...(activeLocation !== 'all' && { location: activeLocation }),
    ...(selectedTypes.length > 0 && { job_type: selectedTypes.join(',') }), // Assuming backend can handle comma separated or we pick first. Currently backend expects single string. For multiple, we'll just send first for now or adapt if backend supports it. The backend uses `query.job_type = job_type`, so it expects a single one. We will just pass the first selected one if multiple. Wait, let's just use the first selected type and category for simplicity if backend doesn't support $in.
  });

  // Adjusting for backend currently taking single strings
  if (selectedTypes.length > 0) queryParams.set('job_type', selectedTypes[0]);
  if (selectedCategories.length > 0) queryParams.set('category', selectedCategories[0]);

  const { data: jobsData, isLoading } = useSWR(`/jobs?${queryParams.toString()}`, fetcher, {
    revalidateOnFocus: false,
  });

  const jobs = jobsData?.data || [];
  const total = jobsData?.pagination?.total || 0;
  const totalPages = jobsData?.pagination?.pages || 1;

  const handleSearchCommit = () => {
    setActiveSearch(search);
    setActiveLocation(location);
    setPage(1);
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]));
    setPage(1);
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) => (prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]));
    setPage(1);
  };

  const renderSidebarContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Filter className="h-5 w-5 text-slate-400" />
          Filters
        </h3>
        {(selectedTypes.length > 0 || selectedCategories.length > 0 || activeSearch || activeLocation !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('');
              setActiveSearch('');
              setLocation('all');
              setActiveLocation('all');
              setSelectedCategories([]);
              setSelectedTypes([]);
              router.push(ROUTES.FIND_JOB);
            }}
            className="h-8 px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="mb-4 text-sm font-bold tracking-wider text-slate-500 uppercase">Type of Employment</h4>
        <div className="space-y-3">
          {jobTypes.map((type: any) => (
            <div key={type._id} className="flex items-center space-x-3">
              <Checkbox
                id={`type-${type._id}`}
                checked={selectedTypes.includes(type._id)}
                onCheckedChange={() => toggleType(type._id)}
              />
              <Label htmlFor={`type-${type._id}`} className="cursor-pointer font-medium text-slate-600">
                {type.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold">Categories</h3>
        <div className="space-y-3">
          {categories.map((cat: any) => (
            <div key={cat._id} className="flex items-center space-x-3">
              <Checkbox
                id={`cat-${cat._id}`}
                checked={selectedCategories.includes(cat._id)}
                onCheckedChange={() => toggleCategory(cat._id)}
              />
              <Label htmlFor={`cat-${cat._id}`} className="cursor-pointer font-medium text-slate-600">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-slate-600">Find your next career at companies like HubSpot, Nike, and Dropbox</p>
        </div>

        <div className="mx-auto mb-12 flex max-w-4xl flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
          <div className="relative flex flex-1 items-center">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchCommit()}
              className="text-md border-0 bg-transparent pl-10 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="hidden w-px bg-slate-200 md:block" />

          <div className="relative flex flex-1 items-center">
            <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <select
              className="flex h-10 w-full appearance-none items-center justify-between rounded-md border-0 bg-transparent px-10 py-2 text-sm text-slate-700 shadow-none ring-0 focus:ring-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map((loc: any) => (
                <option key={loc._id} value={loc._id}>
                  {loc.state}, {loc.country}
                </option>
              ))}
            </select>
          </div>

          <Button
            size="lg"
            className="text-md mt-2 w-full px-8 py-6 font-semibold md:mt-0 md:w-auto"
            onClick={handleSearchCommit}
          >
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:col-span-1 lg:block">{renderSidebarContent()}</div>

          {/* Job List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Jobs</h2>
                <p className="text-sm text-slate-500">Showing {total} results</p>
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your job search.</SheetDescription>
                    </SheetHeader>
                    <div className="py-6">{renderSidebarContent()}</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center"
                  >
                    <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4 max-w-[300px]" />
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:mt-0 sm:items-end sm:border-0 sm:pt-0">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
                <Search className="mb-4 h-10 w-10 text-slate-300" />
                <h3 className="mb-2 text-lg font-bold text-slate-900">No jobs found</h3>
                <p className="text-slate-500">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch('');
                    setActiveSearch('');
                    setLocation('all');
                    setActiveLocation('all');
                    setSelectedCategories([]);
                    setSelectedTypes([]);
                    router.push(ROUTES.FIND_JOB);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: any) => (
                  <Link prefetch={false} href={ROUTES.JOB_DETAILS(job._id)} key={job._id} className="block">
                    <div className="hover:border-primary/50 group flex cursor-pointer flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md sm:flex-row sm:items-center">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                        {job.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={job.image_url} alt={job.title} className="h-full w-full object-cover" />
                        ) : job.company?.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={job.company.image_url}
                            alt={job.company.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-slate-400">{job.company?.name?.[0]}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="group-hover:text-primary mb-1 text-lg font-bold text-slate-900 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 md:gap-4">
                          <span>{job.company?.name}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span>{job.location ? `${job.location.state}, ${job.location.country}` : 'Remote'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-center sm:gap-2 sm:border-0 sm:pt-0">
                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {job.job_type?.name || 'Full-Time'}
                        </span>
                        <div className="flex flex-wrap justify-end gap-2 text-right">
                          {job.categories?.slice(0, 2).map((cat: any) => (
                            <span
                              key={cat._id}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Previous
                </Button>
                <div className="text-sm font-medium text-slate-600">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
