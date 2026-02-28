import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

type Job = {
  id?: string | null;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  tags: string[];
  image: string;
};

export default function FeatureJobCard({ job }: { job: Job }) {
  return (
    <Link href={ROUTES.JOB_DETAILS(job.id)}>
      <div className="group hover:border-primary-light flex cursor-pointer flex-col space-y-4 border bg-white p-6 transition-all duration-300 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
            <Image src={job.image} alt={job.title} className="h-full w-full object-cover" width={100} height={100} />
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
          {job.tags.map((tag: string) => (
            <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
