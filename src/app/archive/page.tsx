import React from "react";
import { getNewsFromDB } from "@/actions/newsActions";
import NewsCard from "@/components/NewsCard";
import { Archive as ArchiveIcon } from "lucide-react";

export default async function ArchivePage() {
  const news = await getNewsFromDB();

  return (
    <main className="max-w-[1300px] mx-auto px-4 md:px-6 pt-32 pb-32">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ArchiveIcon className="w-6 h-6 text-purple-500" />
            <h1 className="text-[32px] md:text-[40px] font-black text-white tracking-tight">Archive</h1>
          </div>
          <p className="text-zinc-500 max-w-[600px]">
            Browse through our history of news coverage. Every story we've curated, saved for your reference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {news.length > 0 ? (
            news.map((item: any) => (
              <NewsCard 
                key={item._id} 
                news={{
                  id: item._id,
                  title: item.title,
                  summary: item.summary,
                  source: item.source,
                  category: item.category,
                  priority: item.priority,
                  publishedAt: new Date(item.publishedAt).toLocaleDateString(),
                  imageUrl: item.imageUrl,
                  originalUrl: item.originalUrl
                }} 
              />
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-zinc-500 font-medium">Your archive is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
