import Image from 'next/image';

export default function Companies() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container mx-auto space-y-8">
        <p className="text-muted text-lg">Companies we helped grow</p>
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16">
          <Image src="/images/vodafone.png" alt="Vodafone" width={400} height={100} className="h-10 max-h-10 w-fit" />
          <Image src="/images/intel.png" alt="Intel" width={400} height={100} className="h-8 max-h-8 w-fit" />
          <Image src="/images/tesla.png" alt="Tesla" width={400} height={100} className="h-6 max-h-6 w-fit" />
          <Image src="/images/amd.png" alt="AMD" width={400} height={100} className="h-7 max-h-7 w-fit" />
          <Image src="/images/talkit.png" alt="Talkit" width={400} height={100} className="h-8 max-h-8 w-fit" />
        </div>
      </div>
    </section>
  );
}
