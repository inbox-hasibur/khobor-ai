import React from "react";
import { Zap } from "lucide-react";

interface LiveUpdate {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
}

interface LiveFeedSidebarProps {
  updates: LiveUpdate[];
}

const LiveFeedSidebar = ({ updates }: LiveFeedSidebarProps) => {
  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-12 bg-[#0c0c0e]/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
          <h2 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">Live Feed</h2>
        </div>

        <div className="space-y-10">
          {updates.map((update) => (
            <div key={update.id} className="group cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/10">
                  {update.category}
                </span>
                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                  {update.publishedAt}
                </span>
              </div>
              <h4 className="text-[16px] font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug mb-2">
                {update.title}
              </h4> {/* Fixed: Changed from </h3> to </h4> */}
              <p className="text-zinc-500 text-[13px] font-medium line-clamp-2 leading-relaxed">
                {update.summary}
              </p>
              <div className="h-[1px] w-full bg-white/5 mt-8 group-last:hidden" />
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[11px] font-black text-zinc-400 hover:text-white uppercase tracking-[0.2em] transition-all border border-white/5">
          View All Alerts
        </button>
      </div>
    </aside>
  );
};

export default LiveFeedSidebar;