import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <SearchX className="size-12 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-bold tracking-tighter text-gray-900 sm:text-7xl dark:text-gray-50">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-700 sm:text-3xl dark:text-gray-300">
          Page not found
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[500px]">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or is
          temporarily out of service.
        </p>
      </div>
      <div className="mt-4">
        <Button asChild size="lg">
          <Link href={ROUTES.HOME}>Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
