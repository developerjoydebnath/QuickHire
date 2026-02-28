import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constants/routes';
import { Dribbble, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ABOUT_LINKS = [
  { label: 'Companies', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Advice', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const RESOURCES_LINKS = [
  { label: 'Help Docs', href: '#' },
  { label: 'Guide', href: '#' },
  { label: 'Updates', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook', fill: true },
  { icon: Instagram, href: '#', label: 'Instagram', fill: false },
  { icon: Dribbble, href: '#', label: 'Dribbble', fill: false },
  { icon: Linkedin, href: '#', label: 'LinkedIn', fill: true },
  { icon: Twitter, href: '#', label: 'Twitter', fill: true },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#202430] py-12 text-slate-300 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-4 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Description */}
          <div className="col-span-4 space-y-6 lg:pr-8">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <Image
                src="/images/Logo2.png"
                alt="QuickHire"
                width={200}
                height={100}
                className="h-9 w-[152px] min-w-[152px]"
              />
              <h3 className="sr-only text-xl font-bold">QuichHire</h3>
            </Link>
            <p className="max-w-sm text-base leading-relaxed text-slate-400">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Links */}
          <div className="col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-white">About</h4>
            <ul className="space-y-4 text-base text-slate-400">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-2 space-y-6">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-4 text-base text-slate-400">
              {RESOURCES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription */}
          <div className="col-span-4 max-w-xl space-y-4 sm:space-y-6">
            <h4 className="text-lg font-semibold text-white">Get job notifications</h4>
            <p className="text-base leading-relaxed text-slate-400">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-col gap-2 shadow-sm sm:flex-row">
              <Input
                type="email"
                placeholder="Email Address"
                className="h-12! rounded-none border-0 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
              <Button size="lg" className="w-fit">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-700/50 pt-8 text-sm text-slate-400 sm:mt-12 sm:gap-6 md:mt-16 md:flex-row">
          <p>2021 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  {social.fill ? (
                    <Icon className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
