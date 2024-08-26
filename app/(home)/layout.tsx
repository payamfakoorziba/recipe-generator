"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";
import background from "@/public/background.jpg";
import { useRecipeStore } from "@/hooks/use-recipe-store";

const HomeLayout = ({ children }: PropsWithChildren) => {
  const recipe = useRecipeStore((state) => state.recipe);
  const hueRotate = recipe?.hueRotate;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="background"
          fill
          priority
          placeholder="blur"
          className="object-cover"
          quality={100}
          style={{
            filter: `hue-rotate(${hueRotate}deg)`,
            transition: "filter 3s linear",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
