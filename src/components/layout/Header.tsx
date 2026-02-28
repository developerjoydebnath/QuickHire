'use client';

import MenuIcon from '@/components/icons/MenuIcon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="container flex h-[78px] items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="QuickHire"
              width={200}
              height={100}
              className="h-9 w-[152px] min-w-[152px]"
            />
            <h3 className="sr-only text-xl font-bold">QuichHire</h3>
          </div>

          <nav className="hidden items-center gap-4 lg:flex">
            {[
              { label: 'Find Jobs', href: ROUTES.FIND_JOB },
              { label: 'Browse Companies', href: ROUTES.BROWSE_COMPANIES },
            ].map((item) => (
              <Link
                prefetch={false}
                key={item.href}
                href={item.href}
                className="text-text hover:text-primary font-epilogue text-base font-medium transition-colors duration-200 ease-in-out"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <Button size="lg" variant="outline">
            Get Started
          </Button>
          <Separator orientation="vertical" className="h-[50px]!" />
          <Button size="lg">Login</Button>
        </div>

        <Button className="rounded-full lg:hidden [&_svg:not([class*='size-'])]:size-5" size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
}
