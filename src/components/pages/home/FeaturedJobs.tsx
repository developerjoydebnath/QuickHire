import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <section className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <h2 className="text-text font-clash-display text-4xl font-semibold md:text-5xl">
            Featured <span className="text-primary">jobs</span>
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="group hover:border-primary-light flex cursor-pointer flex-col space-y-4 border bg-white p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Image src={job.image} alt={job.title} className="h-12 w-12 object-cover" width={100} height={100} />
                </div>
                <span className="leading[160%] border-primary text-primary border px-3 py-1 text-base">{job.type}</span>
              </div>

              <div className="space-y-2">
                <h3 className="group-hover:text-primary text-text text-lg leading-[160%] font-semibold transition-colors">
                  {job.title}
                </h3>

                <div className="leading[160%] text-muted-foreground flex items-center gap-2 text-base">
                  <span>{job.company}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{job.location}</span>
                </div>
              </div>

              <p className="leading[160%] text-muted line-clamp-2 flex-1 text-base">{job.description}</p>

              <div className="mt-auto flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
