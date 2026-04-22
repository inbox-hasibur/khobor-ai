import React from "react";
import { getNewsById } from "@/actions/newsActions";
import { notFound } from "next/navigation";
import { Clock, Globe, ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await getNewsById(params.id);

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="max-w-[800px] mx-auto px-4 md:px-6 pt-32 pb-32">
      <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Feed</span>
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">
            {newsItem.category}
          </span>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-2 text-zinc-500">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
              {new Date(newsItem.publishedAt).toLocaleDateString("en-BD", { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        <h1 className="text-[32px] md:text-[48px] font-black text-white leading-[1.1] tracking-tight mb-8">
          {newsItem.title}
        </h1>

        <div className="relative w-full aspect-video rounded-[32px] overflow-hidden mb-12 border border-white/5">
          <img 
            src={newsItem.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop"} 
            alt={newsItem.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Listen to this story</p>
                <p className="text-white font-bold">AI Voice Briefing</p>
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full font-black px-8">
              PLAY NOW
            </Button>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-zinc-300 font-medium whitespace-pre-wrap">
              {newsItem.summary}
            </p>
          </div>

          <div className="h-px bg-white/5 my-4" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <Globe className="w-4 h-4 text-zinc-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Source</p>
                <p className="text-white font-bold">{newsItem.source}</p>
              </div>
            </div>

            <a 
              href={newsItem.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-white border border-white/10 rounded-full font-black text-[13px] hover:bg-white hover:text-black transition-all active:scale-95"
            >
              READ ORIGINAL ARTICLE
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
