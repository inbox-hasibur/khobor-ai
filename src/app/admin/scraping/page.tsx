import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminScrapingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Scraping Pipeline Control</h1>
        <p className="text-muted-foreground mt-1">
          Monitor active scrapers and manually start or stop the pipeline.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Pipeline Status
            </CardTitle>
            <CardDescription>Current status of automated cron jobs.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-green-500 border-green-500/20 hover:bg-green-500/10">
              <Play className="w-4 h-4 mr-2" /> Start
            </Button>
            <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10">
              <Square className="w-4 h-4 mr-2" /> Stop
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            Live scraper logs and monitoring will be implemented here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
