"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Key, LayoutGrid, Settings, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <main className="max-w-[1000px] mx-auto px-3 md:px-6 lg:px-8 pt-24 md:pt-36 pb-32 md:pb-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-display text-foreground font-serif flex items-center gap-4">
            <User className="w-10 h-10 text-primary" />
            আপনার <span className="text-primary">প্রোফাইল</span>
          </h1>
          <p className="text-body text-muted-foreground mt-2">
            আপনার সেটিংস, এপিআই কি (BYOK) এবং ব্যক্তিগত পছন্দসমূহ পরিচালনা করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Nav */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" /> সাধারণ সেটিংস
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <Key className="w-4 h-4" /> এপিআই কি (BYOK)
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <LayoutGrid className="w-4 h-4" /> পছন্দনীয় ক্যাটাগরি
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" /> নিরাপত্তা
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Bring Your Own Key (BYOK)</CardTitle>
                <CardDescription>
                  আপনার নিজস্ব এপিআই কি ব্যবহার করে প্রিমিয়াম এআই ফিচারসমূহ আনলক করুন।
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gemini API Key</label>
                  <Input type="password" placeholder="AIzaSy..." className="font-mono text-sm" />
                  <p className="text-xs text-muted-foreground">
                    আপনার কি শুধুমাত্র আপনার ব্রাউজারে লোকালি সেভ থাকবে।
                  </p>
                </div>
                <Button>সেভ করুন</Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>পার্সোনালাইজেশন</CardTitle>
                <CardDescription>
                  আপনার পছন্দের খবরের বিষয় নির্বাচন করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["জাতীয়", "রাজনীতি", "খেলাধুলা", "প্রযুক্তি", "অর্থনীতি", "আন্তর্জাতিক"].map((category) => (
                    <Button key={category} variant="outline" className="rounded-full">
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
