"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex justify-center items-center flex-col text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35 }}
          className="text-4xl sm:text-6xl font-extrabold drop-shadow-lg"
        >
          Dream-Sketch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, delay: 0.35 }}
          className="text-lg sm:text-xl text-white/60 mt-2"
        >
          Generate stunning images from text using AI models for free
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, delay: 0.7 }}
        >
          <Link href="/create">
            <Button className="mt-5 px-6 py-3 text-lg font-bold bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-lg shadow-lg hover:scale-105 hover:shadow-blue-500/50">
              Start Creating
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
