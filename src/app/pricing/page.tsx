"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { status } = useSession();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-4 md:px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div className="text-center max-w-3xl mx-auto mb-16 z-10" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Choose Your <span className="text-primary">Plan</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium">
            Join the personalized news ecosystem. Automate your daily briefings and enjoy an ad-free, halal audio experience.
          </p>
          
          <div className="flex items-center justify-center mt-10 gap-3">
            <span className={`text-sm font-bold ${!isYearly ? "text-white" : "text-slate-500"}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors"
            >
              <div 
                className="w-6 h-6 bg-primary rounded-full transition-transform duration-300 ease-in-out shadow-lg"
                style={{ transform: isYearly ? "translateX(32px)" : "translateX(0)" }}
              />
            </button>
            <span className={`text-sm font-bold ${isYearly ? "text-white" : "text-slate-500"}`}>
              Yearly <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full ml-1">Save 16%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full z-10">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl h-full flex flex-col rounded-3xl overflow-hidden hover:border-slate-700 transition-all duration-300">
              <CardHeader className="pb-8 pt-8 px-8">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">Perfect for getting started with automated news.</CardDescription>
                <div className="mt-6 flex items-baseline text-5xl font-black">
                  $0
                  <span className="text-lg text-slate-500 font-medium ml-2">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">Platform-generated daily news summaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">Access to General Podcast Archive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">Basic text-to-speech audio playback</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <HelpCircle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <span className="text-slate-500 text-sm">No personalized topics</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <HelpCircle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <span className="text-slate-500 text-sm">No Halal Mode (Music filtering)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-8 pb-8 pt-4">
                {status === "authenticated" ? (
                  <Button variant="outline" className="w-full rounded-xl h-12 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full rounded-xl h-12 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold">
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </motion.div>

          {/* Premium Tier */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary via-primary/50 to-purple-600 rounded-3xl opacity-50 blur-[2px]" />
            <Card className="bg-slate-900 border-0 backdrop-blur-xl h-full flex flex-col rounded-3xl overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>
              <CardHeader className="pb-8 pt-8 px-8">
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
                  <Star className="w-5 h-5 fill-primary" />
                  Premium
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">Unlock the full power of AI for your news ecosystem.</CardDescription>
                <div className="mt-6 flex items-baseline text-5xl font-black">
                  ${isYearly ? "49.99" : "4.99"}
                  <span className="text-lg text-slate-500 font-medium ml-2">/{isYearly ? "yr" : "mo"}</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">Personalized News Generation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">Halal Mode (MDX-Net Music Filtering)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">BYOK (Bring Your Own Key) Integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">Personalized Podcast Archive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">Priority AI Processing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-8 pb-8 pt-4">
                <Link href={status === "authenticated" ? "/profile" : "/register"} className="w-full">
                  <Button className="w-full rounded-xl h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold shadow-lg shadow-primary/25">
                    {status === "authenticated" ? "Upgrade Now" : "Get Premium"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
