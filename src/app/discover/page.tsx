import React from "react";
import { getNewsFromDB } from "@/actions/newsActions";
import NewsCard from "@/components/NewsCard";
import { Globe, Search } from "lucide-react";

export default async function DiscoverPage() {
  const news = await getNewsFromDB();

  return (
    <main className="max-w-[1300px] mx-auto px-4 md:px-6 pt-32 pb-32">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-500" />
            <h1 className="text-[32px] md:text-[40px] font-black text-white tracking-tight">Discover</h1>
          </div>
          <p className="text-zinc-500 max-w-[600px]">
            Explore the latest news and updates from across Bangladesh. Our AI filters the noise to bring you what matters most.
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
                  publishedAt: new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  imageUrl: item.imageUrl,
                  originalUrl: item.originalUrl
                }} 
              />
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-zinc-500 font-medium">No news found to discover.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
