import { cn } from '@/lib/utils';
import Image from 'next/image';

type Job = {
  company: string;
  location: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
};

export default function LatestJobCard({ job }: { job: Job }) {
  return (
    <div className="group flex cursor-pointer flex-col items-start gap-6 bg-white px-4 py-4 transition-all hover:shadow-md sm:px-6 sm:py-6 md:px-10 lg:flex-row">
      <div>
        <Image src={job.image} alt={job.title} className="h-16 w-16 object-cover" width={100} height={100} />
      </div>

      <div className="space-y-2">
        <div className="space-y-2">
          <h3 className="group-hover:text-primary text-text line-clamp-1 text-xl leading-[160%] font-semibold transition-colors">
            {job.title}
          </h3>

          <div className="leading[160%] text-muted-foreground line-clamp-1 flex items-center gap-2 text-base">
            <span>{job.company}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <span className="rounded-full border border-emerald-50 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-500">
            {job.type}
          </span>
          <span className="bg-border h-6 w-px" />
          <div className="flex gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx + tag}
                className={cn(
                  'white rounded-full border px-2.5 py-1.5 text-xs font-semibold',
                  idx === 0 ? 'border-yellow-500 text-yellow-500' : 'border-blue-500 text-blue-500'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
