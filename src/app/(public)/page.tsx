import { CallToAction } from '@/components/pages/home/CallToAction';
import { Categories } from '@/components/pages/home/Categories';
import Companies from '@/components/pages/home/Companies';
import { FeaturedJobs } from '@/components/pages/home/FeaturedJobs';
import { Hero } from '@/components/pages/home/Hero';
import { LatestJobs } from '@/components/pages/home/LatestJobs';

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <Categories />
      <CallToAction />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
