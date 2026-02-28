import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the job detail page based on Figma design layout expectations
  const job = {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    salary: "$15,000 - $25,000",
    datePosted: "Jul 10, 2021",
    logo: "N",
    bg: "bg-orange-100",
    color: "text-orange-600",
    description: "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
       "Community engagement to ensure that is supported and actively represented online",
       "Focus on social media content development and publication",
       "Marketing and strategy support",
       "Stay on top of trends on social media platforms, and suggest content ideas to the team",
       "Engage with online communities"
    ],
    requirements: [
        "You get energy from people and building the ideal work environment",
        "You have a sense for beautiful spaces and office experiences",
        "You are a confident office manager, ready for added responsibilities",
        "You're detail-oriented and creative",
        "You're a growth marketer and know how to run campaigns"
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to all jobs
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className={`w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center text-4xl font-bold ${job.bg} ${job.color} shadow-sm border border-white/50`}>
                    {job.logo}
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                   <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
                       <span>{job.company}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                       <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                       </div>
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                       <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-widest">
                          {job.type}
                       </span>
                   </div>
                </div>
            </div>
            
            <div className="flex gap-4">
                <Button variant="outline" size="lg" className="px-8 font-semibold">Save</Button>
                
                <Dialog>
                   <DialogTrigger asChild>
                      <Button size="lg" className="px-8 font-semibold">Apply Now</Button>
                   </DialogTrigger>
                   <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                         <DialogTitle className="text-2xl font-bold text-slate-900">Submit Application</DialogTitle>
                         <DialogDescription className="text-slate-500">
                           Apply for the <span className="font-semibold text-slate-800">{job.title}</span> role at {job.company}.
                         </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                         <div className="grid gap-2">
                            <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name *</Label>
                            <Input id="name" placeholder="E.g. Maria Kelly" className="border-slate-300 focus-visible:ring-primary" required />
                         </div>
                         <div className="grid gap-2">
                            <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address *</Label>
                            <Input id="email" type="email" placeholder="maria@example.com" className="border-slate-300 focus-visible:ring-primary" required />
                         </div>
                         <div className="grid gap-2">
                            <Label htmlFor="resume" className="text-slate-700 font-semibold">Resume URL *</Label>
                            <Input id="resume" type="url" placeholder="https://linkedin.com/in/... or Google Drive link" className="border-slate-300 focus-visible:ring-primary" required />
                         </div>
                         <div className="grid gap-2">
                            <Label htmlFor="coverNote" className="text-slate-700 font-semibold">Cover Note</Label>
                            <Textarea id="coverNote" placeholder="Why are you a good fit for this position?" className="h-32 border-slate-300 focus-visible:ring-primary" />
                         </div>
                      </div>
                      <div className="flex justify-end pt-4 border-t border-slate-100">
                         <Button type="submit" className="w-full sm:w-auto px-8 font-bold">Submit Application</Button>
                      </div>
                   </DialogContent>
                </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10 text-slate-700">
               <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Description</h3>
                  <p className="leading-relaxed">{job.description}</p>
               </section>

               <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Responsibilities</h3>
                  <ul className="space-y-3">
                     {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex gap-3">
                           <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                           <span className="leading-relaxed">{item}</span>
                        </li>
                     ))}
                  </ul>
               </section>

               <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Who You Are</h3>
                  <ul className="space-y-3">
                     {job.requirements.map((item, i) => (
                        <li key={i} className="flex gap-3">
                           <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                           <span className="leading-relaxed">{item}</span>
                        </li>
                     ))}
                  </ul>
               </section>
            </div>

            {/* Sidebar Overview */}
            <div className="lg:col-span-1">
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">About this role</h3>
                  
                  <div className="space-y-4">
                     <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                        <DollarSign className="w-6 h-6 text-primary mt-0.5" />
                        <div>
                           <p className="text-sm font-medium text-slate-500 mb-0.5">Salary</p>
                           <p className="font-bold text-slate-900">{job.salary}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                        <Briefcase className="w-6 h-6 text-primary mt-0.5" />
                        <div>
                           <p className="text-sm font-medium text-slate-500 mb-0.5">Job Type</p>
                           <p className="font-bold text-slate-900">{job.type}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                        <Calendar className="w-6 h-6 text-primary mt-0.5" />
                        <div>
                           <p className="text-sm font-medium text-slate-500 mb-0.5">Date Posted</p>
                           <p className="font-bold text-slate-900">{job.datePosted}</p>
                        </div>
                     </div>
                  </div>
                  
                  <hr className="my-6 border-slate-200" />
                  
                  <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Categories</h4>
                     <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Marketing</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Design</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
