"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  query: z.string().min(1),
});

const ModifyRecipeInput = ({
  className,
  placeholders,
  dish,
  disabled,
}: {
  className: string;
  placeholders: string[];
  dish: string;
  disabled?: boolean;
}) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.query) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.replace(
        `/search/${encodeURIComponent(dish)}?modifications=${encodeURIComponent(
          data.query
        )}`
      );
    }, 300);
  }
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (placeholderIndex + 1) % placeholders.length;
      setPlaceholderIndex(nextIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [placeholderIndex]); // Depend on `index` to reset timer when it changes

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("relative md:text-xl", className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormControl>
              <input
                className="relative pl-6 pr-16 h-full w-full  font-light text-foreground focus:outline-none bg-white rounded-full disabled:opacity-80 disabled:cursor-not-allowed"
                // placeholder={placeholders[placeholderIndex]}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    form.setValue("query", placeholders[placeholderIndex]);
                  }
                }}
                autoFocus
                disabled={disabled}
                {...field}
              />
            </FormControl>
          )}
        />
        <AnimatePresence>
          {!form.watch("query") && (
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              style={{
                translateY: "-50%",
              }}
              className="absolute inset-y-0 top-1/2 translate-y-[calc(-50%)] left-6 h-fit select-none pointer-events-none text-muted-foreground font-light"
              key={placeholderIndex}
            >
              {placeholders[placeholderIndex]}
            </motion.p>
          )}
        </AnimatePresence>

        <button>
          <span
            className={cn(
              "absolute inset-y-2 right-2 bg-neutral-300 rounded-full flex items-center justify-center aspect-square group transition",
              !form.watch("query") ? "bg-neutral-300" : "bg-neutral-400"
            )}
          >
            <ArrowRight className="text-white size-4 md:size-5 group-hover:translate-x-0.5 transition" />
          </span>
        </button>
        <motion.div
          initial={{ filter: "blur(60px)" }}
          animate={submitted && { filter: "blur(100px)", opacity: 0, scale: 2 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-4 bg-black/60 rounded-full -z-10"
        />
      </form>
    </Form>
  );
};

export default ModifyRecipeInput;
