"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus, Trash2 } from "lucide-react";

export default function APIManagementPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Management</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage API keys to access Khobor AI models programmatically.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Create New Key
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Do not share your API keys with others or expose them in client-side code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/20">
              <div>
                <p className="font-medium text-sm">Production Key</p>
                <p className="text-xs text-muted-foreground">Created on Jul 1, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">kh_live_8f9d...2a1b</span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/20">
              <div>
                <p className="font-medium text-sm">Development Key</p>
                <p className="text-xs text-muted-foreground">Created on Jul 5, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-mono text-muted-foreground">kh_test_3c4a...9f0e</span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
