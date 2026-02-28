import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LatestJobCard from './LatestJobCard';

const jobs = [
  {
    company: 'Revolut',
    location: 'Madrid, Spain',
    title: 'Email Marketing',
    type: 'Full Time',
    description: 'Revolut is looking for Email Marketing to help team ma...',
    tags: ['Marketing', 'Design'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-rose-50 border-rose-100',
  },
  {
    company: 'Dropbox',
    location: 'San Fransisco, US',
    title: 'Brand Designer',
    type: 'Full Time',
    description: 'Dropbox is looking for Brand Designer to help the team t...',
    tags: ['Design', 'Business'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    company: 'Pitch',
    location: 'Berlin, Germany',
    title: 'Email Marketing',
    type: 'Full Time',
    description: 'Pitch is looking for Customer Manager to join marketing t...',
    tags: ['Marketing', 'Tech'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-indigo-50 border-indigo-100',
  },
  {
    company: 'Blinkist',
    location: 'Granada, Spain',
    title: 'Visual Designer',
    type: 'Full Time',
    description: 'Blinkist is looking for Visual Designer to help team desi...',
    tags: ['Marketing', 'Design'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-teal-50 border-teal-100',
  },
  {
    company: 'ClassPass',
    location: 'Manchester, UK',
    title: 'Product Designer',
    type: 'Full Time',
    description: 'ClassPass is looking for Product Designer to help us...',
    tags: ['Marketing', 'Design'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-purple-50 border-purple-100',
  },
  {
    company: 'Canva',
    location: 'Ontario, Canada',
    title: 'Lead Designer',
    type: 'Full Time',
    description: 'Canva is looking for Lead Engineer to help develop n...',
    tags: ['Design', 'Business'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-cyan-50 border-cyan-100',
  },
  {
    company: 'GoDaddy',
    location: 'Marseille, France',
    title: 'Brand Strategist',
    type: 'Full Time',
    description: 'GoDaddy is looking for Brand Strategist to join the team...',
    tags: ['Marketing', 'Tech'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-green-50 border-green-100',
  },
  {
    company: 'Twitter',
    location: 'San Diego, US',
    title: 'Data Analyst',
    type: 'Full Time',
    description: 'Twitter is looking for Data Analyst to help team desi...',
    tags: ['Marketing', 'Technology'],
    image: 'https://as2.ftcdn.net/v2/jpg/05/32/20/03/1000_F_532200355_odKN9Ou3WB6iHWJTFIElFtJbTuzJspY6.webp',
    color: 'bg-sky-50 border-sky-100',
  },
];

export function LatestJobs() {
  return (
    <section className="relative py-20">
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
            className="text-primary hover:text-primary w-fit gap-4 text-base font-semibold"
            asChild
          >
            <Link href="#">
              Show all jobs
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {jobs.map((job, idx) => (
            <LatestJobCard key={idx} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
