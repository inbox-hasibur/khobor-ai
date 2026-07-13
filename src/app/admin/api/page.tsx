import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Link as LinkIcon } from "lucide-react";

export default function AdminAPIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API & Source Management</h1>
        <p className="text-muted-foreground mt-1">
          Monitor API usage status and add or remove source URL lists.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              API Usage Status
            </CardTitle>
            <CardDescription>Monitor platform-wide API usage limits.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              API usage charts will be displayed here.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              URL Sources
            </CardTitle>
            <CardDescription>Manage RSS and scraping targets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              Source URL list management will be implemented here.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
