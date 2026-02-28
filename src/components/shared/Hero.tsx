import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function Hero() {
  return (
    <section id="hero" className="relative h-[calc(100vh-80px)]">
      {/* pattern image  */}
      <Image
        src="/images/Pattern.png"
        alt="Man"
        height={794}
        width={860}
        className="absolute right-0 bottom-0 -z-10 aspect-auto h-[1/2] w-fit object-cover lg:h-full"
      />

      {/* corner box  */}
      <div className="absolute right-0 bottom-0 hidden h-80 w-[420] overflow-hidden bg-transparent lg:block">
        <div className="relative">
          <div className="absolute top-44 -right-32 z-10 h-80 w-[500px] rotate-150 bg-white" />
        </div>
      </div>

      <div className="container h-full">
        <div className="relative flex h-full flex-col justify-center gap-6">
          {/* hero image  */}
          <Image
            src="/images/man.png"
            alt="Man"
            height={700}
            width={500}
            className="absolute top-0 right-0 -z-10 hidden aspect-auto h-full w-fit object-cover lg:flex"
          />

          {/* title and sub title  */}
          <div className="z-20 max-w-[520px]">
            <h1 className="font-clash-display text-text text-5xl leading-[110%] font-semibold sm:text-6xl md:text-7xl">
              Discover <br /> more than <br />
              <span className="text-primary-light">5000+ Jobs</span>
            </h1>
            <Image src="/images/lines.png" alt="Logo" width={500} height={100} className="h-10 w-[455px]" />
          </div>

          <h4 className="text-muted-foreground max-w-[520px] text-base leading-[160%] font-normal sm:text-lg md:text-xl">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </h4>

          {/* job search section  */}
          <div className="space-y-4">
            <div className="grid w-full max-w-[885px] gap-6 bg-white p-4 md:grid-cols-3">
              <div className="flex h-full w-full items-center gap-4">
                <Search className="h-6 min-h-6 w-6 min-w-6" />
                <Input
                  type="text"
                  placeholder="Job title or keyword"
                  className="placeholder:text-muted h-[50px] rounded-none border-0 border-b p-0 text-base! shadow-none outline-none focus-visible:ring-0"
                />
              </div>
              <div className="flex h-full w-full items-center gap-4">
                <MapPin className="h-6 min-h-6 w-6 min-w-6" />
                <Select>
                  <SelectTrigger className="focus-visible:border-ring h-[50px]! w-full rounded-none border-0 border-b p-0 text-base! shadow-none ring-0 outline-none focus-visible:ring-0">
                    <SelectValue className="text-base!" placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-none">
                    <SelectItem className="cursor-pointer rounded-none py-2 text-base" value="italy">
                      FLorence, Italy
                    </SelectItem>
                    <SelectItem className="cursor-pointer rounded-none py-2 text-base" value="italyd">
                      FLorence, Italy
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button size="lg">Search my job</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="">Popular : </p>
              <p className="">UI Designer, UX Researcher, Android, Admin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
