"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  query: z.string().min(1),
});

const PromptInput = ({ className }: { className: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data.query);
    router.push(`/search/${encodeURIComponent(data.query)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("relative", className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormControl>
              <input
                className="relative pl-6 pr-16 h-full w-full md:text-xl font-light text-muted-foreground focus:outline-none bg-white shadow-xl rounded-full"
                placeholder="Spaghetti carbonara"
                autoFocus
                {...field}
              />
            </FormControl>
          )}
        ></FormField>
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
      </form>
    </Form>
  );
};

export default PromptInput;
