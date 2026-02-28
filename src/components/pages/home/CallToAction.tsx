import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="bg-white pt-10 pb-0 sm:pt-20 sm:pb-0 lg:pt-24 lg:pb-24">
      <div className="container mx-auto">
        <div className="bg-primary relative flex flex-col overflow-hidden xl:flex-row">
          {/* Top-left corner cut */}
          <div className="absolute top-0 left-0 z-30 h-64 w-[320px] overflow-hidden bg-transparent">
            <div className="relative h-full w-full">
              <div className="absolute -top-64 -left-72 z-10 h-80 w-[500px] rotate-155 bg-white sm:-top-56 sm:-left-64" />
            </div>
          </div>

          {/* Bottom-right corner cut */}
          <div className="absolute right-0 bottom-0 z-30 h-80 w-[420px] overflow-hidden bg-transparent">
            <div className="relative h-full w-full">
              <div className="absolute top-64 -right-72 z-10 h-80 w-[500px] rotate-155 bg-white sm:top-56 sm:-right-64" />
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-center pt-16 pb-4 text-white sm:px-16 lg:pl-28 xl:w-[50%] xl:items-start xl:pt-24 xl:pb-24">
            {/* texts  */}
            <h2 className="font-clash-display mb-4 text-center text-4xl text-[32px] leading-[1.1] font-semibold md:text-5xl xl:text-left">
              Start posting <br className="hidden xl:block" /> jobs <br className="xl:hidden" /> today
            </h2>
            <p className="mb-4 text-base font-medium text-white/90 sm:text-xl md:mb-8">
              Start posting jobs for only $10.
            </p>
            <div className="flex w-full justify-center px-4 xl:justify-start">
              <Button
                size="lg"
                variant="secondary"
                className="text-primary w-full flex-1 bg-white px-8 text-lg font-bold hover:bg-white/90 sm:w-auto sm:flex-none"
                asChild
              >
                <Link href={ROUTES.SIGN_UP}>Sign Up For Free</Link>
              </Button>
            </div>
          </div>

          <div className="right-20 bottom-0 z-30 flex justify-end pb-24 pl-4 xl:absolute xl:pb-0 xl:pl-0">
            <Image
              src="/images/dashboard.png"
              alt="Dashboard"
              height={500}
              width={800}
              className="h-fit object-cover xl:max-w-[530px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
