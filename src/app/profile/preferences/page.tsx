"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PreferencesPage() {
  const categories = ["Technology", "Politics", "Sports", "Entertainment", "Science", "Business", "Health", "World"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Preferences</h1>
        <p className="text-muted-foreground mt-1">
          Customize your experience, news feed, and UI settings.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Content Interests</CardTitle>
          <CardDescription>
            Select the topics you want to see more of in your Discover feed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button 
                key={category} 
                variant={index % 3 === 0 ? "default" : "outline"} 
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Save Interests</Button>
        </CardFooter>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Manage what alerts and updates you receive via email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="font-medium">Daily Briefing</p>
              <p className="text-sm text-muted-foreground">Receive your personalized daily AI summary via email.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="font-medium">Breaking News Alerts</p>
              <p className="text-sm text-muted-foreground">Instant notifications for major global events.</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Marketing & Promotions</p>
              <p className="text-sm text-muted-foreground">Updates about new Khobor AI features and offers.</p>
            </div>
            <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
