import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Edit3 } from "lucide-react";

export default function AdminLibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">News Library Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage generated news articles and curated VODs.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Library className="w-5 h-5 text-primary" />
            Content Library
          </CardTitle>
          <CardDescription>CRUD operations for published news and videos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            Library management interface will be implemented here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
