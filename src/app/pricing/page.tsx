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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Choose Your Plan
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium">
            Join the personalized news ecosystem. Automate your daily briefings and enjoy an ad-free, halal audio experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full z-10">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-black border-slate-800 h-full flex flex-col rounded-[24px] overflow-hidden p-2">
              <CardHeader className="pb-8 pt-8 px-8">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">Perfect for getting started with automated news.</CardDescription>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  <span className="text-3xl mr-1 font-bold">৳</span>0
                  <span className="text-base text-slate-500 font-medium ml-2">/mo</span>
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
                  <Button variant="outline" className="w-full rounded-xl h-12 border-slate-800 bg-slate-950 hover:bg-slate-800 text-white font-medium" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full rounded-xl h-12 border-slate-800 bg-slate-950 hover:bg-slate-800 text-white font-medium">
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
            <Card className="bg-slate-950 border border-slate-800 h-full flex flex-col rounded-[24px] overflow-hidden relative p-2">
              <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <CardHeader className="pb-6 pt-6 px-8 relative overflow-hidden">
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                  <Star className="w-5 h-5" />
                  Premium
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2 font-medium max-w-[85%] relative z-10 leading-relaxed">
                  Unlock the full power of AI for your personalized news ecosystem.
                </CardDescription>

                {/* Minimalist Toggle Inside Card */}
                <div className="mt-6 mb-2">
                  <div className="relative flex w-56 h-10 bg-black rounded-full p-1 border border-slate-800">
                    <div 
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800 rounded-full transition-all duration-300 ease-in-out"
                      style={{ left: isYearly ? "calc(50%)" : "4px" }}
                    />
                    <button 
                      type="button"
                      onClick={() => setIsYearly(false)}
                      className={`relative z-10 flex-1 flex items-center justify-center text-xs font-medium transition-colors ${!isYearly ? "text-white" : "text-slate-400"}`}
                    >
                      Monthly
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsYearly(true)}
                      className={`relative z-10 flex-1 flex items-center justify-center text-xs font-medium transition-colors ${isYearly ? "text-white" : "text-slate-400"}`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline text-4xl font-bold relative z-10">
                  <span className="text-3xl mr-1 font-bold text-white">৳</span>{isYearly ? "4,999" : "499"}
                  <span className="text-base text-slate-400 font-medium ml-2">/{isYearly ? "yr" : "mo"}</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">Personalized News Generation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">Halal Mode (MDX-Net Filtering)</span>
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
                  <Button className="w-full bg-white text-black hover:bg-slate-200 h-12 rounded-xl font-bold text-[15px]">
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
