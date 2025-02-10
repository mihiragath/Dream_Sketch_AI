"use client";

import { Post } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/image");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 pt-20 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <BiLoaderCircle className="animate-spin text-blue-500 text-5xl" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {posts.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: index * 0.07 }}
              className="w-full h-fit border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl p-4 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              key={post.id}
            >
              <Image
                alt={post.prompt}
                src={post.url}
                width={280}
                height={280}
                className="object-cover w-full rounded-lg"
              />
              <p className="text-white/90 mt-3 text-center text-sm font-semibold">
                {post.prompt}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}