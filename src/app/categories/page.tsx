import React from "react";
import { getNewsFromDB } from "@/actions/newsActions";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
  const news = await getNewsFromDB();
  
  // Extract unique categories and counts
  const categoryCounts = news.reduce((acc: any, item: any) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts).map(name => ({
    name,
    count: categoryCounts[name],
    color: name === "National" ? "bg-blue-500" : 
           name === "Sports" ? "bg-green-500" :
           name === "Economy" ? "bg-amber-500" :
           name === "Weather" ? "bg-cyan-500" : "bg-zinc-500"
  }));

  return (
    <main className="max-w-[1300px] mx-auto px-4 md:px-6 pt-32 pb-32">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-6 h-6 text-emerald-500" />
            <h1 className="text-[32px] md:text-[40px] font-black text-white tracking-tight">Categories</h1>
          </div>
          <p className="text-zinc-500 max-w-[600px]">
            Browse news by topic. From national alerts to sports highlights, find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat.name} className="group relative bg-white/5 border border-white/5 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer">
                <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <LayoutGrid className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{cat.name}</h3>
                <p className="text-zinc-500 font-bold">{cat.count} Stories Available</p>
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white">→</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-zinc-500 font-medium">No categories available yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
