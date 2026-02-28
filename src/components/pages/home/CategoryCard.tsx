import { ROUTES } from '@/constants/routes';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CategoryCard({
  category,
}: {
  category: { id: string; name: string; slug: string; count: number; icon: string };
}) {
  const Icon = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType;
  return (
    <Link prefetch={false} href={`${ROUTES.FIND_JOB}?category=${category.slug}`} className="block">
      <div className="group hover:border-primary hover:bg-primary border-border flex h-full cursor-pointer flex-row items-center gap-8 border bg-white p-4 transition-all duration-300 ease-in-out sm:p-8 md:flex-col md:items-start">
        <div className="">
          {Icon && (
            <Icon className="text-primary h-12 w-12 transition-all duration-300 ease-in-out group-hover:text-white" />
          )}
        </div>
        <div className="w-full flex-1 space-y-1 sm:space-y-3">
          <h3 className="font-clash-display text-text text-xl font-semibold transition-all duration-300 ease-in-out group-hover:text-white sm:text-2xl">
            {category.name}
          </h3>
          <p className="text-muted flex items-center justify-between gap-4 text-base font-medium transition-all duration-300 ease-in-out group-hover:text-white sm:text-lg md:justify-start">
            {category.count} jobs available
            <ArrowRight className="text-primary h-6 w-6 transition-all duration-300 ease-in-out group-hover:text-white" />
          </p>
        </div>
      </div>
    </Link>
  );
}
