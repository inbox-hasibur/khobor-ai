"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, PlayCircle, Library } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    activeScrapers: 0,
    newsLibrary: 0
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAdminData() {
      const [usersRes, premiumRes, scrapersRes, newsRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('tier', 'premium'),
        supabase.from('scraping_sources').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('news_articles').select('*', { count: 'exact', head: true }),
      ]);
      
      const logsRes = await supabase.from('news_articles')
        .select('headline, published_at, source')
        .order('published_at', { ascending: false })
        .limit(5);

      setStats({
        totalUsers: usersRes.count || 0,
        premiumUsers: premiumRes.count || 0,
        activeScrapers: scrapersRes.count || 0,
        newsLibrary: newsRes.count || 0
      });

      if (logsRes.data) {
        setRecentLogs(logsRes.data);
      }
    }
    
    fetchAdminData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Platform overview, pipeline health, and user statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">{stats.premiumUsers} Premium Subscriptions</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Online</div>
            <p className="text-xs text-muted-foreground">Inngest pipelines active</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scrapers</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeScrapers}</div>
            <p className="text-xs text-muted-foreground">Running scheduled jobs</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Library</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsLibrary}</div>
            <p className="text-xs text-muted-foreground">Processed Articles</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>System Activity Log</CardTitle>
          <CardDescription>Recent automated events and scraped articles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.length > 0 ? recentLogs.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="max-w-[70%]">
                  <p className="text-sm font-medium truncate">{log.headline}</p>
                  <p className="text-xs text-muted-foreground">Scraped from {log.source}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(log.published_at).toLocaleDateString()}
                </div>
              </div>
            )) : (
              <div className="text-sm text-muted-foreground py-4 text-center">No recent activity found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
