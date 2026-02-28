'use client';

import MenuIcon from '@/components/icons/MenuIcon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Find Jobs', href: ROUTES.FIND_JOB },
  { label: 'Browse Companies', href: ROUTES.BROWSE_COMPANIES },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-xs">
      <div className="container flex h-[78px] items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link prefetch={false} href={ROUTES.HOME} className="flex items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="QuickHire"
              width={200}
              height={100}
              className="h-9 w-[152px] min-w-[152px]"
            />
            <h3 className="sr-only text-xl font-bold">QuichHire</h3>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {NAV_LINKS.map((item) => (
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
          {isLoading ? null : isAuthenticated && user ? (
            <>
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <Button size="lg" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" variant="outline" asChild>
                <Link prefetch={false} href={ROUTES.LOGIN}>
                  Login
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-[50px]!" />
              <Button size="lg" asChild>
                <Link prefetch={false} href={ROUTES.SIGNUP}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full [&_svg:not([class*='size-'])]:size-5" size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4">
              <SheetHeader className="mb-8 pl-0">
                <SheetTitle className="w-fit text-left">
                  <Link prefetch={false} href={ROUTES.HOME} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/images/Logo.png"
                      alt="QuickHire"
                      width={200}
                      height={100}
                      className="h-9 w-[152px] min-w-[152px]"
                    />
                    <h3 className="sr-only text-xl font-bold">QuichHire</h3>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((item) => (
                  <Link
                    prefetch={false}
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-text hover:text-primary font-epilogue text-lg font-medium transition-colors duration-200 ease-in-out"
                  >
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <div className="flex flex-col gap-4">
                  {isLoading ? null : isAuthenticated && user ? (
                    <>
                      <span className="text-sm font-medium">Hi, {user.name}</span>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="lg" variant="outline" className="w-full" asChild>
                        <Link prefetch={false} href={ROUTES.LOGIN}>
                          Login
                        </Link>
                      </Button>
                      <Button size="lg" className="w-full" asChild>
                        <Link prefetch={false} href={ROUTES.SIGNUP}>
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
