import { CallToAction } from "@/components/shared/CallToAction";
import { Categories } from "@/components/shared/Categories";
import { FeaturedJobs } from "@/components/shared/FeaturedJobs";
import { Hero } from "@/components/shared/Hero";
import { LatestJobs } from "@/components/shared/LatestJobs";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-12 bg-white container mx-auto px-6 opacity-70 grayscale">
        <p className="text-sm text-slate-500 mb-6 font-medium uppercase tracking-widest text-center">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16">
          <div className="text-xl font-bold bg-slate-100 px-4 py-2 rounded-lg text-slate-800">Vodafone</div>
          <div className="text-xl font-bold bg-slate-100 px-4 py-2 rounded-lg text-slate-800">Intel</div>
          <div className="text-xl font-bold bg-slate-100 px-4 py-2 rounded-lg text-slate-800">Tesla</div>
          <div className="text-xl font-bold bg-slate-100 px-4 py-2 rounded-lg text-slate-800">AMD</div>
          <div className="text-xl font-bold bg-slate-100 px-4 py-2 rounded-lg text-slate-800">Talkit</div>
        </div>
      </div>
      <Categories />
      <FeaturedJobs />
      <LatestJobs />
      <CallToAction />
    </>
  );
}
