import { Button } from "@/components/ui/button";
import { BarChart, Box, Code, Megaphone, Monitor, PenTool } from "lucide-react";

const jobs = [
  {
    company: "Revolut",
    location: "Madrid, Spain",
    title: "Email Marketing",
    type: "Full Time",
    description: "Revolut is looking for Email Marketing to help team ma...",
    tags: ["Marketing", "Design"],
    icon: <Megaphone className="w-8 h-8 text-rose-500" />,
    color: "bg-rose-50 border-rose-100",
  },
  {
    company: "Dropbox",
    location: "San Fransisco, US",
    title: "Brand Designer",
    type: "Full Time",
    description: "Dropbox is looking for Brand Designer to help the team t...",
    tags: ["Design", "Business"],
    icon: <Box className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-50 border-blue-100",
  },
  {
    company: "Pitch",
    location: "Berlin, Germany",
    title: "Email Marketing",
    type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing t...",
    tags: ["Marketing", "Tech"],
    icon: <Monitor className="w-8 h-8 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    company: "Blinkist",
    location: "Granada, Spain",
    title: "Visual Designer",
    type: "Full Time",
    description: "Blinkist is looking for Visual Designer to help team desi...",
    tags: ["Marketing", "Design"],
    icon: <PenTool className="w-8 h-8 text-teal-500" />,
    color: "bg-teal-50 border-teal-100",
  },
  {
    company: "ClassPass",
    location: "Manchester, UK",
    title: "Product Designer",
    type: "Full Time",
    description: "ClassPass is looking for Product Designer to help us...",
    tags: ["Marketing", "Design"],
    icon: <Box className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-50 border-purple-100",
  },
  {
    company: "Canva",
    location: "Ontario, Canada",
    title: "Lead Designer",
    type: "Full Time",
    description: "Canva is looking for Lead Engineer to help develop n...",
    tags: ["Design", "Business"],
    icon: <PenTool className="w-8 h-8 text-cyan-500" />,
    color: "bg-cyan-50 border-cyan-100",
  },
  {
    company: "GoDaddy",
    location: "Marseille, France",
    title: "Brand Strategist",
    type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    tags: ["Marketing", "Tech"],
    icon: <BarChart className="w-8 h-8 text-green-500" />,
    color: "bg-green-50 border-green-100",
  },
  {
    company: "Twitter",
    location: "San Diego, US",
    title: "Data Analyst",
    type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team desi...",
    tags: ["Marketing", "Technology"],
    icon: <Code className="w-8 h-8 text-sky-500" />,
    color: "bg-sky-50 border-sky-100",
  },
];

export function FeaturedJobs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Button variant="outline" className="group rounded-full pl-6 pr-4 hover:border-primary hover:text-primary transition-colors bg-white">
            Show all jobs
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${job.color} border`}>
                  {job.icon}
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  {job.type}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              
              <div className="flex items-center text-sm text-slate-500 mb-4 font-medium gap-2">
                <span>{job.company}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{job.location}</span>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-2">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
                  >
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
