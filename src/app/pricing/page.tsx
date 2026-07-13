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
          
          <div className="flex items-center justify-center mt-10 gap-4">
            <span className={`text-sm md:text-base font-bold transition-colors ${!isYearly ? "text-white" : "text-slate-500"}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-20 h-10 bg-slate-800/80 backdrop-blur-sm rounded-full p-1.5 border border-slate-700/50 shadow-inner hover:bg-slate-700 transition-all cursor-pointer"
            >
              <div 
                className="w-7 h-7 bg-gradient-to-br from-primary to-purple-600 rounded-full transition-transform duration-300 ease-out shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                style={{ transform: isYearly ? "translateX(40px)" : "translateX(0)" }}
              />
            </button>
            <div className="flex flex-col items-start relative">
              <span className={`text-sm md:text-base font-bold transition-colors ${isYearly ? "text-white" : "text-slate-500"}`}>
                Yearly
              </span>
              <span className="absolute -top-6 -right-12 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-bold border border-emerald-400/20 shadow-sm whitespace-nowrap rotate-[-5deg]">
                Save 16%
              </span>
            </div>
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
                <div className="mt-6 flex items-baseline text-5xl font-black font-sans">
                  <span className="text-3xl mr-1 font-bold">৳</span>0
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
            <div className="absolute -inset-[2px] bg-gradient-to-br from-primary via-purple-500 to-amber-500 rounded-3xl opacity-75 blur-md" />
            <Card className="bg-slate-900 border border-slate-700 backdrop-blur-xl h-full flex flex-col rounded-3xl overflow-hidden relative shadow-2xl z-10">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-amber-500/20 border border-amber-400/30">
                Most Popular
              </div>
              <CardHeader className="pb-8 pt-8 px-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <CardTitle className="text-3xl font-black flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                  <Star className="w-7 h-7 fill-amber-400 text-amber-400 drop-shadow-md" />
                  Premium
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm mt-3 font-medium max-w-[90%] relative z-10 leading-relaxed">
                  Unlock the full power of AI for your personalized news ecosystem.
                </CardDescription>
                <div className="mt-6 flex items-baseline text-5xl font-black font-sans relative z-10">
                  <span className="text-3xl mr-1 font-bold text-amber-500">৳</span>{isYearly ? "4,999" : "499"}
                  <span className="text-lg text-slate-400 font-medium ml-2">/{isYearly ? "yr" : "mo"}</span>
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
