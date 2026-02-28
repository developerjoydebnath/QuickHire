import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Box, Briefcase, Code, Megaphone, PenTool, PieChart, Users } from "lucide-react";

const categories = [
  { name: "Design", count: 235, icon: <PenTool className="w-6 h-6 text-primary" /> },
  { name: "Sales", count: 756, icon: <BarChart className="w-6 h-6 text-primary" /> },
  { name: "Marketing", count: 140, icon: <Megaphone className="w-6 h-6 text-primary" /> },
  { name: "Finance", count: 325, icon: <PieChart className="w-6 h-6 text-primary" /> },
  { name: "Technology", count: 436, icon: <Code className="w-6 h-6 text-primary" /> },
  { name: "Engineering", count: 542, icon: <Box className="w-6 h-6 text-primary" /> },
  { name: "Business", count: 211, icon: <Briefcase className="w-6 h-6 text-primary" /> },
  { name: "Human Resource", count: 346, icon: <Users className="w-6 h-6 text-primary" /> },
];

export function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Explore by <span className="text-primary">category</span>
          </h2>
          <Button variant="outline" className="group rounded-full pl-6 pr-4 hover:border-primary hover:text-primary transition-colors">
            Show all jobs
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group border border-slate-100 p-8 rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 cursor-pointer transition-all bg-white flex flex-col items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-slate-500 flex items-center gap-2 text-sm font-medium">
                  {category.count} jobs available
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
