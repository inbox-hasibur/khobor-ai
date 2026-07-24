"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Database, Play, Square, Link as LinkIcon, Settings, Key, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function AdminScrapingPage() {
  const [isActive, setIsActive] = useState(false);
  const [urlToIngest, setUrlToIngest] = useState("");
  const [ingestCategory, setIngestCategory] = useState("General");
  const [isIngesting, setIsIngesting] = useState(false);

  const [sources, setSources] = useState<any[]>([]);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [newSourceCat, setNewSourceCat] = useState("General");

  const [autoApprove, setAutoApprove] = useState(true);
  const [apiKeys, setApiKeys] = useState<string[]>([""]);
  const [isTriggeringRss, setIsTriggeringRss] = useState(false);
  const [scrapeLogs, setScrapeLogs] = useState<string[]>([]);

  const supabase = createClient();

  const CATEGORIES = ["জাতীয়", "রাজনীতি", "অর্থনীতি", "খেলাধুলা", "প্রযুক্তি", "আন্তর্জাতিক", "General"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: sourcesData } = await supabase.from("scraping_sources").select("*");
    if (sourcesData) setSources(sourcesData);

    const { data: settingsData } = await supabase.from("system_settings").select("*");
    if (settingsData) {
      const autoSetting = settingsData.find(s => s.setting_key === "auto_approve_news");
      if (autoSetting) setAutoApprove(autoSetting.setting_value === "true");

      const keySetting = settingsData.find(s => s.setting_key === "global_gemini_api_keys");
      if (keySetting) {
        try {
          const parsed = JSON.parse(keySetting.setting_value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setApiKeys(parsed);
          } else {
            setApiKeys([""]);
          }
        } catch (e) {
          setApiKeys([""]);
        }
      }
    }
  };

  const handleDirectIngest = async () => {
    if (!urlToIngest) return;
    setIsIngesting(true);
    try {
      const res = await fetch("/api/ingest/direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToIngest, category: ingestCategory }),
      });
      if (res.ok) {
        alert("Processing started for this URL!");
        setUrlToIngest("");
      } else {
        alert("Failed to start processing.");
      }
    } catch (e) {
      console.error(e);
    }
    setIsIngesting(false);
  };

  const handleAddSource = async () => {
    if (!newSourceName || !newSourceUrl) return;
    const { error } = await supabase.from("scraping_sources").insert({
      name: newSourceName, url: newSourceUrl, category: newSourceCat, is_active: true
    });
    if (!error) {
      setNewSourceName("");
      setNewSourceUrl("");
      fetchData();
    }
  };

  const handleDeleteSource = async (id: string) => {
    await supabase.from("scraping_sources").delete().eq("id", id);
    fetchData();
  };

  const handleToggleSource = async (id: string, current: boolean) => {
    await supabase.from("scraping_sources").update({ is_active: !current }).eq("id", id);
    fetchData();
  };

  const saveSetting = async (key: string, value: string) => {
    const { data } = await supabase.from("system_settings").select("id").eq("setting_key", key).single();
    if (data) {
      await supabase.from("system_settings").update({ setting_value: value }).eq("id", data.id);
    } else {
      await supabase.from("system_settings").insert({ setting_key: key, setting_value: value });
    }
  };

  const handleSaveSettings = async () => {
    await saveSetting("auto_approve_news", autoApprove.toString());
    
    // Save keys as JSON array
    const validKeys = apiKeys.filter(k => k.trim() !== "");
    await saveSetting("global_gemini_api_keys", JSON.stringify(validKeys));
    
    // Ensure at least one empty input stays if all were deleted/empty
    if (validKeys.length === 0) setApiKeys([""]);
    else setApiKeys(validKeys);
    
    alert("Settings saved!");
  };

  const handleTriggerEmergencyScrape = async () => {
    setIsTriggeringRss(true);
    setScrapeLogs(["Connecting to scraping pipeline..."]);
    
    try {
      const response = await fetch("/api/ingest/trigger-rss");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.message) {
                setScrapeLogs((prev) => [...prev, data.message]);
              }
            } catch(e) {}
          }
        }
      }
    } catch (e: any) {
      console.error(e);
      setScrapeLogs((prev) => [...prev, `Error: ${e.message}`]);
    } finally {
      setIsTriggeringRss(false);
    }
  };

  const handleLoadDefaultSources = async () => {
    const defaults = [
      { name: "Prothom Alo (RSS)", url: "https://www.prothomalo.com/feed", category: "General", is_active: true },
      { name: "Jugantor (RSS)", url: "https://www.jugantor.com/feed", category: "General", is_active: true },
      { name: "Jamuna TV (RSS)", url: "https://www.jamuna.tv/feed", category: "General", is_active: true },
      { name: "Daily Star (Bangla)", url: "https://bangla.thedailystar.net/feed", category: "General", is_active: true },
      { name: "Dhaka Tribune", url: "https://www.dhakatribune.com/feed", category: "General", is_active: true },
      { name: "Somoy News", url: "https://www.somoynews.tv/rss", category: "General", is_active: true },
      { name: "Bangla Tribune", url: "https://www.banglatribune.com/feed", category: "General", is_active: true },
      { name: "BBC Bangla", url: "https://www.bbc.com/bengali/index.xml", category: "General", is_active: true }
    ];
    
    let errorCount = 0;
    for (const src of defaults) {
      const { error } = await supabase.from("scraping_sources").insert(src);
      if (error) errorCount++;
    }
    if (errorCount === 0) {
      alert("Default sources loaded!");
    } else {
      alert(`Loaded sources, but ${errorCount} failed. They might already exist or you don't have permission.`);
    }
    fetchData();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Scraping & Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage automated scraping, direct URL ingestion, and system API settings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Direct URL Ingestion */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Direct URL Ingestion
            </CardTitle>
            <CardDescription>Manually trigger the scraper for a specific article URL.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Article URL</Label>
              <Input 
                placeholder="https://example.com/news/123" 
                value={urlToIngest}
                onChange={e => setUrlToIngest(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex gap-2">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={CATEGORIES.includes(ingestCategory) ? ingestCategory : "Custom"}
                  onChange={(e) => {
                    if (e.target.value !== "Custom") setIngestCategory(e.target.value);
                    else setIngestCategory("");
                  }}
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="Custom">Custom...</option>
                </select>
                {!CATEGORIES.includes(ingestCategory) && (
                  <Input 
                    placeholder="Custom Category" 
                    value={ingestCategory}
                    onChange={e => setIngestCategory(e.target.value)}
                  />
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDirectIngest} disabled={isIngesting || !urlToIngest} className="w-full">
              {isIngesting ? "Starting..." : "Start Scraping"}
            </Button>
          </CardFooter>
        </Card>

        {/* Global Settings */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Global Scraper Settings
            </CardTitle>
            <CardDescription>Configure global API keys and approval flow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Approve Scraped News</Label>
                <p className="text-xs text-muted-foreground">If disabled, news will be saved as Draft and require manual review.</p>
              </div>
              <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
            </div>

            <div className="space-y-3 pt-2">
              <Label>Global Gemini API Keys</Label>
              {apiKeys.map((key, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    placeholder="AIzaSy..." 
                    value={key}
                    onChange={e => {
                      const newKeys = [...apiKeys];
                      newKeys[index] = e.target.value;
                      setApiKeys(newKeys);
                    }}
                    className="font-mono text-xs flex-1"
                  />
                  {apiKeys.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setApiKeys(apiKeys.filter((_, i) => i !== index))} 
                      className="text-red-500 hover:text-red-400 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setApiKeys([...apiKeys, ""])} 
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Another API Key
              </Button>
              <p className="text-xs text-muted-foreground pt-1">Used for background scraping if user BYOK is not available.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="w-full bg-white text-black hover:bg-slate-200">
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>

        {/* Pipeline Terminal View (Shows during scrape) */}
        {(isTriggeringRss || scrapeLogs.length > 0) && (
          <Card className="bg-black/90 backdrop-blur-sm border-border mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-green-400 font-mono text-sm">
                <Play className="w-4 h-4" /> Live Scraping Pipeline Output
                {isTriggeringRss && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-y-auto font-mono text-xs text-green-300 space-y-1 p-2 bg-black rounded border border-green-900/30">
                {scrapeLogs.map((log, i) => (
                  <div key={i}>
                    <span className="text-muted-foreground mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
                {isTriggeringRss && <div className="animate-pulse">_</div>}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Sources Management */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Automated Scraping Sources (RSS / DDG)
              </CardTitle>
              <CardDescription>Manage sources for the hourly/daily background cron jobs.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadDefaultSources}>
                Load Default Sources
              </Button>
              <Button variant="destructive" size="sm" onClick={handleTriggerEmergencyScrape} disabled={isTriggeringRss}>
                <Play className="w-4 h-4 mr-1" /> 
                {isTriggeringRss ? "Triggering..." : "Scrap Now (5 News)"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-1">
              <Label className="text-xs">Source Name</Label>
              <Input placeholder="e.g. Prothom Alo" value={newSourceName} onChange={e => setNewSourceName(e.target.value)} />
            </div>
            <div className="flex-[2] space-y-1">
              <Label className="text-xs">Feed URL or DDG Query</Label>
              <Input placeholder="https://.../feed" value={newSourceUrl} onChange={e => setNewSourceUrl(e.target.value)} />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-xs">Category</Label>
              <div className="flex gap-2">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={CATEGORIES.includes(newSourceCat) ? newSourceCat : "Custom"}
                  onChange={(e) => {
                    if (e.target.value !== "Custom") setNewSourceCat(e.target.value);
                    else setNewSourceCat("");
                  }}
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="Custom">Custom...</option>
                </select>
                {!CATEGORIES.includes(newSourceCat) && (
                  <Input placeholder="Custom" value={newSourceCat} onChange={e => setNewSourceCat(e.target.value)} />
                )}
              </div>
            </div>
            <Button onClick={handleAddSource} disabled={!newSourceName || !newSourceUrl}>
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">URL</th>
                  <th className="px-4 py-2 font-medium">Category</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map(source => (
                  <tr key={source.id} className="border-t border-border">
                    <td className="px-4 py-2">{source.name}</td>
                    <td className="px-4 py-2 font-mono text-xs max-w-[200px] truncate" title={source.url}>{source.url}</td>
                    <td className="px-4 py-2">{source.category}</td>
                    <td className="px-4 py-2">
                      <Switch 
                        checked={source.is_active} 
                        onCheckedChange={() => handleToggleSource(source.id, source.is_active)} 
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400" onClick={() => handleDeleteSource(source.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {sources.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-muted-foreground">No sources configured.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
