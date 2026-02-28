import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, DollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the job detail page based on Figma design layout expectations
  const job = {
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    type: 'Full-Time',
    salary: '$15,000 - $25,000',
    datePosted: 'Jul 10, 2021',
    logo: 'N',
    bg: 'bg-orange-100',
    color: 'text-orange-600',
    description:
      'Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.',
    responsibilities: [
      'Community engagement to ensure that is supported and actively represented online',
      'Focus on social media content development and publication',
      'Marketing and strategy support',
      'Stay on top of trends on social media platforms, and suggest content ideas to the team',
      'Engage with online communities',
    ],
    requirements: [
      'You get energy from people and building the ideal work environment',
      'You have a sense for beautiful spaces and office experiences',
      'You are a confident office manager, ready for added responsibilities',
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-slate-50 py-12">
        <div className="container mx-auto max-w-5xl px-6">
          <Link
            prefetch={false}
            href="/jobs"
            className="hover:text-primary mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all jobs
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <div
                className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-4xl font-bold ${job.bg} ${job.color} border border-white/50 shadow-sm`}
              >
                {job.logo}
              </div>
              <div>
                <h1 className="mb-2 text-3xl font-bold text-slate-900">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 font-medium text-slate-500">
                  <span>{job.company}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-bold tracking-widest text-green-700 uppercase">
                    {job.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="px-8 font-semibold">
                Save
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 font-semibold">
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900">Submit Application</DialogTitle>
                    <DialogDescription className="text-slate-500">
                      Apply for the <span className="font-semibold text-slate-800">{job.title}</span> role at{' '}
                      {job.company}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="font-semibold text-slate-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="E.g. Maria Kelly"
                        className="focus-visible:ring-primary border-slate-300"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="font-semibold text-slate-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="maria@example.com"
                        className="focus-visible:ring-primary border-slate-300"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="resume" className="font-semibold text-slate-700">
                        Resume URL *
                      </Label>
                      <Input
                        id="resume"
                        type="url"
                        placeholder="https://linkedin.com/in/... or Google Drive link"
                        className="focus-visible:ring-primary border-slate-300"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coverNote" className="font-semibold text-slate-700">
                        Cover Note
                      </Label>
                      <Textarea
                        id="coverNote"
                        placeholder="Why are you a good fit for this position?"
                        className="focus-visible:ring-primary h-32 border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-slate-100 pt-4">
                    <Button type="submit" className="w-full px-8 font-bold sm:w-auto">
                      Submit Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-10 text-slate-700 lg:col-span-2">
            <section>
              <h3 className="mb-4 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900">Description</h3>
              <p className="leading-relaxed">{job.description}</p>
            </section>

            <section>
              <h3 className="mb-4 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900">Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900">Who You Are</h3>
              <ul className="space-y-3">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar Overview */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-6 text-lg font-bold text-slate-900">About this role</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <DollarSign className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Salary</p>
                    <p className="font-bold text-slate-900">{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <Briefcase className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Job Type</p>
                    <p className="font-bold text-slate-900">{job.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-white">
                  <Calendar className="text-primary mt-0.5 h-6 w-6" />
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-slate-500">Date Posted</p>
                    <p className="font-bold text-slate-900">{job.datePosted}</p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-slate-200" />

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    Marketing
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
