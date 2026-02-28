import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FeatureJobCard from './FeatureJobCard';

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

export function FeaturedJobs() {
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
            <Link href="#">
              Show all jobs
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job, idx) => (
            <FeatureJobCard key={idx} job={job} />
          ))}
        </div>

        <Button
          variant="ghost"
          className="text-primary hover:text-primary mt-8 flex w-fit gap-4 text-base font-semibold md:hidden"
          asChild
        >
          <Link href="#">
            Show all jobs
            <ArrowRight className="size-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
