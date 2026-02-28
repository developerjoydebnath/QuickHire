"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar, MoveRight, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mockChartData = [
  { day: 'Mon', views: 80, applied: 40 },
  { day: 'Tue', views: 120, applied: 50 },
  { day: 'Wed', views: 90, applied: 60 },
  { day: 'Thu', views: 240, applied: 100 },
  { day: 'Fri', views: 180, applied: 80 },
  { day: 'Sat', views: 130, applied: 50 },
  { day: 'Sun', views: 100, applied: 45 },
];

const jobUpdates = [
  {
     title: "Social Media Assistant",
     type: "Full-Time",
     tags: ["Marketing", "Design"],
     icon: "N",
     color: "bg-orange-100 text-orange-600",
     location: "Paris, France",
     applied: 5,
     capacity: 10,
  },
  {
     title: "Brand Designer",
     type: "Full-Time",
     tags: ["Business", "Design"],
     icon: "D",
     color: "bg-blue-100 text-blue-600",
     location: "San Fransisco, USA",
     applied: 5,
     capacity: 10,
  },
  {
     title: "Interactive Developer",
     type: "Full-Time",
     tags: ["Marketing", "Design"],
     icon: "T",
     color: "bg-purple-100 text-purple-600",
     location: "Berlin, Germany",
     applied: 8,
     capacity: 10,
  },
  {
     title: "Product Designer",
     type: "Full-Time",
     tags: ["Business", "Design"],
     icon: "C",
     color: "bg-emerald-100 text-emerald-600",
     location: "Berlin, Germany",
     applied: 10,
     capacity: 10,
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Greeting row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Good morning, Maria</h1>
           <p className="text-slate-500 font-medium">Here is your job listings statistic report from July 19 - July 25.</p>
        </div>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 bg-white cursor-pointer shadow-sm">
           <span className="text-sm font-semibold text-slate-700">Jul 19 - Jul 25</span>
           <Calendar className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
               <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">76</h2>
                  <p className="text-slate-600 font-medium text-sm">New candidates to review</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
               </div>
            </CardContent>
         </Card>
         <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between bg-green-500 text-white rounded-xl">
               <div>
                  <h2 className="text-4xl font-bold mb-2">3</h2>
                  <p className="text-green-50 font-medium text-sm">Schedule for today</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
               </div>
            </CardContent>
         </Card>
         <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
               <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">24</h2>
                  <p className="text-slate-600 font-medium text-sm">Messages received</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
               </div>
            </CardContent>
         </Card>
      </div>

      {/* Main Analysis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm">
               <CardHeader className="flex flex-row items-center justify-between pb-6">
                  <div>
                     <CardTitle className="text-xl font-bold">Job statistics</CardTitle>
                     <CardDescription className="text-sm mt-1">Showing Jobstatistic Jul 19-25</CardDescription>
                  </div>
                  <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm font-semibold bg-slate-50">
                     <button className="px-4 py-1.5 bg-white text-slate-900 shadow-sm">Week</button>
                     <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900">Month</button>
                     <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900">Year</button>
                  </div>
               </CardHeader>
               <CardContent>
                  <Tabs defaultValue="overview" className="mb-6">
                    <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start overflow-x-auto rounded-none p-0 h-auto">
                      <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2 font-semibold">Overview</TabsTrigger>
                      <TabsTrigger value="views" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2 font-semibold">Jobs View</TabsTrigger>
                      <TabsTrigger value="applied" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2 font-semibold">Jobs Applied</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="h-[300px] w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <defs>
                              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                           <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                           <Area type="monotone" dataKey="views" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>

                  {/* Summary Metric Footer inside Chart Card */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                           <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-xl font-bold text-slate-900">2,342</div>
                           <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                              Job Views 
                              <span className="text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">+6.4%</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                           <Users className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-xl font-bold text-slate-900">654</div>
                           <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                              Job Applied
                              <span className="text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">+0.5%</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-6">
             <Card className="border-slate-200 shadow-sm bg-blue-900 text-white">
               <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 opacity-90">Job Open</h3>
                  <div className="text-4xl font-bold mb-1">12</div>
                  <div className="text-blue-200 font-medium text-sm">Jobs Opened</div>
               </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
               <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Applicants Summary</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-end gap-2 mb-6">
                     <div className="text-4xl font-bold text-slate-900">67</div>
                     <div className="text-slate-500 font-medium text-sm mb-1">Applicants</div>
                  </div>
                  
                  {/* Mock Donut Chart using CSS */}
                  <div className="flex justify-center mb-8">
                     <div className="relative w-40 h-40">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                           <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="4"></circle>
                           
                           {/* Full Time: 45 / 67 ~ 67% */}
                           <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="67 100" strokeDashoffset="0"></circle>
                           
                           {/* Part Time: 24 (represented as offset here for visual pie cut) */}
                           <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-67"></circle>
                           
                           <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="13 100" strokeDashoffset="-87"></circle>
                        </svg>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-2 text-slate-600">
                           <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Full Time
                        </div>
                        <span className="font-bold text-slate-900">45</span>
                     </div>
                     <div className="flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-2 text-slate-600">
                           <div className="w-3 h-3 rounded-full bg-amber-500"></div> Part-Time
                        </div>
                        <span className="font-bold text-slate-900">24</span>
                     </div>
                     <div className="flex items-center justify-between text-sm font-medium">
                        <div className="flex items-center gap-2 text-slate-600">
                           <div className="w-3 h-3 rounded-full bg-red-500"></div> Remote
                        </div>
                        <span className="font-bold text-slate-900">22</span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>

      {/* Job Updates List */}
      <div className="pt-4">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Job Updates</h2>
            <Button variant="outline" className="text-sm font-semibold group bg-white">
               View All
               <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
         </div>

         <div className="space-y-4">
            {jobUpdates.map((job, idx) => {
               const percentage = (job.applied / job.capacity) * 100;
               return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                     <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-xl font-bold ${job.color} shadow-sm border border-black/5`}>
                           {job.icon}
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
                           <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 font-medium">
                              <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-full">Nomad</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                              <span className="text-slate-500">{job.location}</span>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-2 md:w-32 lg:w-48 shrink-0">
                        {job.tags.map(tag => (
                           <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 rounded-md">
                              {tag}
                           </span>
                        ))}
                     </div>

                     <div className="hidden lg:flex md:w-48 shrink-0">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-widest">
                           {job.type}
                        </span>
                     </div>

                     <div className="md:w-64 shrink-0 space-y-2">
                        <div className="flex items-center justify-between text-sm font-semibold">
                           <span className="text-slate-900">{job.applied} applied</span>
                           <span className="text-slate-500">of {job.capacity} capacity</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                           <div 
                              className={`h-full rounded-full ${percentage >= 100 ? 'bg-green-500' : 'bg-primary'}`} 
                              style={{ width: `${percentage}%` }}
                           ></div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
    </div>
  );
}
