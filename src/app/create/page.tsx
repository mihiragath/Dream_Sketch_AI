"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { BiLoaderCircle } from "react-icons/bi";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be at least 7 characters long!" }),
});

export default function Page() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOutputImg(data.url);
      } else {
        toast({ variant: "destructive", description: data.error });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[72px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Heading Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Create Stunning AI Art
        </h1>
        <p className="text-white/60 mt-2">Generate Images from Text for FREE</p>
      </div>

      {/* Main Container */}
      <div className="flex w-full max-w-5xl gap-6 mt-8 flex-col md:flex-row">
        {/* Form Section */}
        <div className="flex-1 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
          <p className="text-white/80 text-sm mb-4">
            Type your prompt below to create any image you can imagine!
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g. A futuristic city at sunset..."
                        className="w-full border border-white/30 bg-transparent text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                loading={loading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition-all flex items-center justify-center"
              >
                {loading ? (
                  <BiLoaderCircle className="animate-spin text-xl" />
                ) : (
                  "Generate"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Output Image Section */}
        <div className="flex-1 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 min-h-[300px] relative overflow-hidden">
          {outputImg ? (
            <Image
              alt="Generated Output"
              className="w-full h-full object-contain rounded-lg"
              src={outputImg}
              width={300}
              height={300}
            />
          ) : (
            <div className="text-white/60 text-center p-6">
              Enter a prompt and hit generate!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
