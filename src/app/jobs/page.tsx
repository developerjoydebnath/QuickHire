import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, MapPin, Search } from "lucide-react";
import Link from "next/link";

// Reuse the jobs static content for now
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
];

export default function JobsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-slate-600">
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Job title or keyword"
                className="pl-10 border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-md shadow-none"
              />
            </div>
            
            <div className="hidden md:block w-px bg-slate-200" />
            
            <div className="relative flex-1 flex items-center">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select className="flex h-10 w-full items-center justify-between rounded-md border-0 bg-transparent px-10 py-2 text-sm text-slate-700 ring-0 focus:ring-0 appearance-none shadow-none">
                <option value="florence">Florence, Italy</option>
                <option value="paris">Paris, France</option>
                <option value="berlin">Berlin, Germany</option>
              </select>
            </div>
            
            <Button size="lg" className="w-full md:w-auto mt-2 md:mt-0 px-8 py-6 text-md font-semibold">
              Search
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                Type of Employment
              </h3>
              <div className="space-y-3">
                {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="text-slate-600 font-medium cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                {["Design", "Sales", "Marketing", "Business", "Human Resource", "Finance", "Engineering", "Technology"].map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox id={`cat-${category}`} />
                    <Label htmlFor={`cat-${category}`} className="text-slate-600 font-medium cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
               <h3 className="text-lg font-bold mb-4">Salary Range</h3>
               {/* Simplified salary filter */}
               <div className="space-y-3">
                {["$700 - $1000", "$1000 - $1500", "$1500 - $2000", "$3000+"].map((salary) => (
                  <div key={salary} className="flex items-center space-x-3">
                    <Checkbox id={`sal-${salary}`} />
                    <Label htmlFor={`sal-${salary}`} className="text-slate-600 font-medium cursor-pointer">
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
                   <p className="text-slate-500 text-sm">Showing 73 results</p>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-medium text-slate-500">Sort by:</span>
                   <select className="border border-slate-200 rounded-md py-1.5 px-3 text-sm font-medium text-slate-700 bg-white">
                      <option>Most relevant</option>
                      <option>Newest</option>
                   </select>
                </div>
             </div>
             
             <div className="space-y-4">
                {/* Reusing job list UI */}
                {latestJobs.map((job, idx) => (
                <Link href={`/jobs/${idx + 1}`} key={idx} className="block">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-white border border-slate-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <div className={`w-14 h-14 shrink-0 rounded-lg flex items-center justify-center text-xl font-bold ${job.bg} ${job.color}`}>
                    {job.logo}
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-slate-500 font-medium">
                        <span>{job.company}</span>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{job.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-2 mt-4 sm:mt-0 border-t sm:border-0 pt-4 sm:pt-0 border-slate-100">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                        {job.type}
                    </span>
                    <div className="flex gap-2">
                    {job.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200 rounded-md">
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
