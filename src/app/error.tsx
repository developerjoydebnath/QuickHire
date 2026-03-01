'use client';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="size-12 text-red-600 dark:text-red-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl font-bold tracking-tighter text-gray-900 sm:text-6xl dark:text-gray-50">500</h1>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-700 sm:text-3xl dark:text-gray-300">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[500px]">
          We apologize for the inconvenience. An unexpected error occurred while processing your request.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href={ROUTES.HOME}>Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
