"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiLoaderCircle } from "react-icons/bi";

export default function Header() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className="fixed top-0 w-full h-[60px] bg-black/70 backdrop-blur-lg shadow-md border-b border-white/20 p-3 flex justify-between items-center z-50">
      {/* Logo Section */}
      <Link href="/" className="text-white text-xl font-extrabold tracking-widest hover:text-gray-300 transition-all duration-300">
        Dream<span className="text-blue-500">-Sketch</span>
      </Link>

      {/* Loading Indicator */}
      {initialLoading && status === "loading" ? (
        <BiLoaderCircle className="animate-spin text-blue-400 text-2xl" />
      ) : !session ? (
        <div>
          <Button 
            onClick={() => signIn("google")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          {/* Logout Button */}
          <Button 
            onClick={() => signOut()} 
            variant="destructive"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </Button>

          {/* Profile Avatar */}
          <Link href="/profile">
            <Avatar className="cursor-pointer transition-transform hover:scale-110 border-2 border-blue-500 shadow-lg">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="bg-gray-700 text-white">CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
    </div>
  );
}
