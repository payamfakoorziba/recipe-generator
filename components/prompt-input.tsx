"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const PromptInput = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="relative mt-9 max-w-lg md:max-w-2xl h-16 w-full">
      <input
        className="relative pl-6 pr-16 h-full w-full text-xl font-light text-muted-foreground focus:outline-none bg-white shadow-xl rounded-full"
        placeholder="Spaghetti carbonara"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>
        <span
          className={cn(
            "absolute inset-y-2 right-2 bg-neutral-300 rounded-full flex items-center justify-center aspect-square group transition",
            query.length === 0 ? "bg-neutral-300" : "bg-neutral-400"
          )}
        >
          <ArrowRight className="text-white size-5 group-hover:translate-x-0.5 transition" />
        </span>
      </button>
    </div>
  );
};

export default PromptInput;
