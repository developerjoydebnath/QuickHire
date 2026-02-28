import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

// Reuse the jobs static content for now
const latestJobs = [
  {
    company: 'Nomad',
    location: 'Paris, France',
    title: 'Social Media Assistant',
    type: 'Full-Time',
    tags: ['Marketing', 'Design'],
    logo: 'N',
    bg: 'bg-orange-100',
    color: 'text-orange-600',
  },
  {
    company: 'Dropbox',
    location: 'San Fransisco, USA',
    title: 'Brand Designer',
    type: 'Full-Time',
    tags: ['Marketing', 'Design'],
    logo: 'D',
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    company: 'Terraform',
    location: 'Hamburg, Germany',
    title: 'Interactive Developer',
    type: 'Full-Time',
    tags: ['Marketing', 'Design'],
    logo: 'T',
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
  {
    company: 'Packer',
    location: 'Lucern, Switzerland',
    title: 'HR Manager',
    type: 'Full-Time',
    tags: ['Marketing', 'Design'],
    logo: 'P',
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    company: 'Netlify',
    location: 'Paris, France',
    title: 'Social Media Assistant',
    type: 'Full-Time',
    tags: ['Marketing', 'Design'],
    logo: 'N',
    bg: 'bg-teal-100',
    color: 'text-teal-600',
  },
];

export default function JobsPage() {
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
              className="text-md border-0 bg-transparent pl-10 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="hidden w-px bg-slate-200 md:block" />

          <div className="relative flex flex-1 items-center">
            <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <select className="flex h-10 w-full appearance-none items-center justify-between rounded-md border-0 bg-transparent px-10 py-2 text-sm text-slate-700 shadow-none ring-0 focus:ring-0">
              <option value="florence">Florence, Italy</option>
              <option value="paris">Paris, France</option>
              <option value="berlin">Berlin, Germany</option>
            </select>
          </div>

          <Button size="lg" className="text-md mt-2 w-full px-8 py-6 font-semibold md:mt-0 md:w-auto">
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Filter className="h-5 w-5 text-slate-400" />
                Type of Employment
              </h3>
              <div className="space-y-3">
                {['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'].map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="cursor-pointer font-medium text-slate-600">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Categories</h3>
              <div className="space-y-3">
                {[
                  'Design',
                  'Sales',
                  'Marketing',
                  'Business',
                  'Human Resource',
                  'Finance',
                  'Engineering',
                  'Technology',
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox id={`cat-${category}`} />
                    <Label htmlFor={`cat-${category}`} className="cursor-pointer font-medium text-slate-600">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Salary Range</h3>
              {/* Simplified salary filter */}
              <div className="space-y-3">
                {['$700 - $1000', '$1000 - $1500', '$1500 - $2000', '$3000+'].map((salary) => (
                  <div key={salary} className="flex items-center space-x-3">
                    <Checkbox id={`sal-${salary}`} />
                    <Label htmlFor={`sal-${salary}`} className="cursor-pointer font-medium text-slate-600">
                      {salary}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Jobs</h2>
                <p className="text-sm text-slate-500">Showing 73 results</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Sort by:</span>
                <select className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                  <option>Most relevant</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {/* Reusing job list UI */}
              {latestJobs.map((job, idx) => (
                <Link prefetch={false} href={`/jobs/${idx + 1}`} key={idx} className="block">
                  <div className="hover:border-primary/50 group flex cursor-pointer flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md sm:flex-row sm:items-center">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-xl font-bold ${job.bg} ${job.color}`}
                    >
                      {job.logo}
                    </div>

                    <div className="flex-1">
                      <h3 className="group-hover:text-primary mb-1 text-lg font-bold text-slate-900 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 md:gap-4">
                        <span>{job.company}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-center sm:gap-2 sm:border-0 sm:pt-0">
                      <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {job.type}
                      </span>
                      <div className="flex gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
