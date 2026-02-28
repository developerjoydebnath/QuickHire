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
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Explore by <span className="text-primary">category</span>
          </h2>
          <Button variant="ghost" className="text-primary hover:text-primary gap-4 text-base font-semibold" asChild>
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
      </div>
    </section>
  );
}
