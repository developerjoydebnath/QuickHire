import { MapPin } from "lucide-react";

const latestJobs = [
  {
    company: "Nomad",
    location: "Paris, France",
    title: "Social Media Assistant",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "N",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    company: "Dropbox",
    location: "San Fransisco, USA",
    title: "Brand Designer",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "D",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    company: "Terraform",
    location: "Hamburg, Germany",
    title: "Interactive Developer",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "T",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    company: "Packer",
    location: "Lucern, Switzerland",
    title: "HR Manager",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "P",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    company: "Netlify",
    location: "Paris, France",
    title: "Social Media Assistant",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "N",
    bg: "bg-teal-100",
    color: "text-teal-600",
  },
  {
    company: "Maze",
    location: "San Fransisco, USA",
    title: "Brand Designer",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "M",
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    company: "Udacity",
    location: "Hamburg, Germany",
    title: "Interactive Developer",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "U",
    bg: "bg-rose-100",
    color: "text-rose-600",
  },
  {
    company: "Webflow",
    location: "Lucern, Switzerland",
    title: "HR Manager",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    logo: "W",
    bg: "bg-sky-100",
    color: "text-sky-600",
  },
];

export function LatestJobs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Latest <span className="text-primary">jobs open</span>
          </h2>
          <a href="#" className="flex items-center text-primary font-medium hover:underline">
            Show all jobs
            <span className="ml-2">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestJobs.map((job, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div
                className={`w-16 h-16 shrink-0 rounded-xl flex items-center justify-center text-2xl font-bold ${job.bg} ${job.color}`}
              >
                {job.logo}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                  <span>{job.company}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                  {job.type}
                </span>
                <div className="flex gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/5 text-primary text-xs font-medium rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
