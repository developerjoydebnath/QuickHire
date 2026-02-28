import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-briefcase"
            >
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="text-xl font-bold tracking-tight">JobHuntly</span>
          </Link>
          <p className="text-sm max-w-xs text-slate-400">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">About</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Companies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Advice
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Help Docs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Updates
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-white font-semibold">Get job notifications</h4>
          <p className="text-sm text-slate-400">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button className="w-full">Subscribe</Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>2021 © JobHuntly. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
           {/* Social Icons would go here */}
        </div>
      </div>
    </footer>
  );
}
