import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-primary-foreground/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left text-white">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Start posting jobs today
            </h2>
            <p className="text-lg text-primary-foreground/80 font-medium">
              Start posting jobs for only $10.
            </p>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
             <Button
                size="lg"
                variant="secondary"
                className="w-full md:w-auto px-10 py-7 text-lg font-bold text-primary hover:bg-white hover:scale-105 transition-all shadow-xl"
             >
                Sign Up For Free
             </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
