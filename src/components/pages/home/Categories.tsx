import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from './CategoryCard';

const categories = [
  { name: 'Design', count: 235, icon: 'PenTool' },
  { name: 'Sales', count: 756, icon: 'BarChart' },
  { name: 'Marketing', count: 140, icon: 'Megaphone' },
  { name: 'Finance', count: 325, icon: 'PieChart' },
  { name: 'Technology', count: 436, icon: 'Code' },
  { name: 'Engineering', count: 542, icon: 'Box' },
  { name: 'Business', count: 211, icon: 'Briefcase' },
  { name: 'Human Resource', count: 346, icon: 'Users' },
];

export function Categories() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-14 lg:py-[72px]">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <h2 className="text-text font-clash-display text-[32px] font-semibold md:text-5xl">
            Explore by <span className="text-primary">category</span>
          </h2>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary hidden gap-4 text-base font-semibold md:flex"
            asChild
          >
            <Link href="#">
              Show all jobs
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        <Button
          variant="ghost"
          className="text-primary hover:text-primary mt-8 flex w-fit gap-4 text-base font-semibold md:hidden"
          asChild
        >
          <Link href="#">
            Show all jobs
            <ArrowRight className="size-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
