"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Download, Database, Chrome, Monitor, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AIModelsPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-4 flex items-center justify-center gap-3">
          <Cpu className="w-10 h-10 text-primary" />
          AI <span className="text-primary">Models</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Download and integrate our raw AI models, datasets, and native apps to enhance your audio processing workflows.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Raw Sound Remover Model */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full bg-card/50 backdrop-blur-xl border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-4">
                <Terminal className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Raw Sound Remover Model</CardTitle>
              <CardDescription>Advanced neural network for separating vocals and instruments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Format</span> <span className="font-mono text-foreground">.onnx / .pt</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Size</span> <span className="font-mono text-foreground">1.2 GB</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Architecture</span> <span className="font-mono text-foreground">Transformer based</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 font-bold" variant="default">
                <Download className="w-4 h-4" /> Download Model Weights
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Dataset */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full bg-card/50 backdrop-blur-xl border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Training Dataset</CardTitle>
              <CardDescription>Open-source dataset used to train the Khobor AI models.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Format</span> <span className="font-mono text-foreground">.wav (44.1kHz) + JSON</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Size</span> <span className="font-mono text-foreground">45 GB</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>License</span> <span className="font-mono text-foreground">MIT Open Source</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1 gap-2 font-bold" variant="outline">
                View Demo Data
              </Button>
              <Button className="flex-1 gap-2 font-bold" variant="default">
                <Download className="w-4 h-4" /> Get Dataset
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Chrome Extension */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full bg-card/50 backdrop-blur-xl border-border hover:border-green-500/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center mb-4">
                <Chrome className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Chrome Web Extension</CardTitle>
              <CardDescription>Filter background music directly in your browser on YouTube, Spotify, and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Seamlessly integrates with your browser. Uses our lightweight WebAssembly model to process audio locally, ensuring privacy and zero latency.
              </p>
            </CardContent>
            <CardFooter>
              <a href="#" className="w-full">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-bold">
                  <Chrome className="w-4 h-4" /> Add to Chrome (Free)
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Desktop App */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="h-full bg-card/50 backdrop-blur-xl border-border hover:border-purple-500/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Kahf Sound Remover App</CardTitle>
              <CardDescription>Native desktop application for bulk audio processing.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Available for Windows, macOS, and Linux. Process gigabytes of audio using your system's GPU for maximum performance.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
                  <span className="font-bold text-xs">Windows</span>
                  <span className="text-[10px] text-muted-foreground">.exe</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
                  <span className="font-bold text-xs">Mac</span>
                  <span className="text-[10px] text-muted-foreground">.dmg</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
                  <span className="font-bold text-xs">Linux</span>
                  <span className="text-[10px] text-muted-foreground">.AppImage</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </main>
  );
}
