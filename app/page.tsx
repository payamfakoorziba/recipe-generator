import Appear from "@/components/appear";
import BlurAppear from "@/components/blur-appear";
import PromptInput from "@/components/prompt-input";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className=" h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
        <BlurAppear staggerDelay={0.05}>
          What are you in the mood for?
        </BlurAppear>
      </h1>
      <Appear
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h2 className="text-white text-xl md:text-2xl">
          Enter it here for a recipe.
        </h2>
      </Appear>

      <PromptInput />
    </main>
  );
}
