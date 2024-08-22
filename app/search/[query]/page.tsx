"use client";

import Container from "@/components/container";
import { experimental_useObject as useObject } from "ai/react";
import { recipeSchema } from "@/app/api/recipe/schema";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const QueryResultPage = ({
  params: { query },
}: {
  params: { query: string };
}) => {
  const dish = decodeURIComponent(query);
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/recipe",
    schema: recipeSchema,
  });

  const hasMounted = useRef<boolean>(false);
  useEffect(() => {
    if (!hasMounted.current) {
      submit(query);
      hasMounted.current = true;
    }
  }, []);

  return (
    <Container className="py-32 text-white">
      <h1 className="text-white font-medium text-7xl">{dish}</h1>

      {/* <div className="flex items-center gap-6 mt-4">
        <Button onClick={() => submit(query)} disabled={isLoading}>
          Generate
        </Button>
        <Button type="button" onClick={() => stop()}>
          Stop
        </Button>

        {isLoading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="size-6 text-gray-200/40 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div> */}

      <div className="flex gap-4 mt-5">
        {object?.servings && <Badge>🍽️&nbsp;{object?.servings} Servings</Badge>}
        {object?.time && <Badge>🕒&nbsp;{object?.time} mins</Badge>}
        {object?.difficulty && (
          <Badge>⭐️&nbsp;{object?.difficulty} Difficulty</Badge>
        )}
        {object?.calories && <Badge>🔥&nbsp;{object?.calories} cal</Badge>}
      </div>

      <p className="max-w-screen-lg text-lg/relaxed mt-10 text-pretty">
        {object?.description}
      </p>

      {object?.ingredients && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
        >
          <h3 className="text-[32px] font-medium mt-10">Ingredients</h3>
          <div className="bg-white/20 border border-white/30 p-6 flex flex-col gap-6 rounded-lg mt-8">
            {object.ingredients.map((ingredient, index) => {
              return (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    className="border-white rounded-none"
                    id={`ingredient-${index}`}
                  />
                  <label htmlFor={`ingredient-${index}`} className="text-lg">
                    {ingredient?.name} ({ingredient?.quantity})
                  </label>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {object?.steps && (
        <>
          <h3 className="text-[32px] font-medium mt-10">Ingredients</h3>
          {object.steps.map((step, index) => {
            return (
              <div
                key={step?.title}
                className="bg-white/20 border border-white/30 p-6 flex items-start gap-6 rounded-lg mt-8"
              >
                <div className="relative bg-white/20 size-[32px] rounded-full flex-shrink-0">
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-lg">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium">
                    {step?.title}&nbsp;{step?.emoji}
                  </h4>
                  <p className="leading-relaxed mt-2">{step?.description}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </Container>
  );
};

const ingredients = [
  "200g Spaghetti",
  "100g Pancetta (diced)",
  "2 Large Eggs",
  "50g Parmesan Cheese (grated)",
  "2 Garlic Cloves (minced)",
  "Salt & Black Pepper (to taste)",
  "Fresh Parsley (chopped, for garnish)",
];

const recipe = [
  {
    emoji: "🍝",
    title: "Cook the Spaghetti",
    description:
      "Boil the spaghetti in salted water according to package instructions. Reserve 1/2 cup of pasta water before draining.",
  },
  {
    emoji: "🥓",
    title: "Prepare the Pancetta",
    description:
      "While the pasta cooks, heat a large pan over medium heat. Add the diced pancetta and cook until crispy. Add minced garlic and cook for another 1-2 minutes.",
  },
  {
    emoji: "🥄",
    title: "Mix the Sauce",
    description:
      "In a bowl, whisk the eggs and grated Parmesan together. Season with a pinch of salt and a generous amount of black pepper.",
  },
  {
    emoji: "🔄",
    title: "Combine",
    description:
      "Lower the heat on the pan. Add the cooked spaghetti to the pancetta and garlic, tossing to coat. Remove from heat, then slowly pour in the egg mixture, tossing quickly to prevent the eggs from scrambling. If the sauce is too thick, add some reserved pasta water until you reach your desired consistency.",
  },
  {
    emoji: "🍽️",
    title: "Serve",
    description:
      "Plate the spaghetti carbonara, garnish with fresh parsley, and add extra Parmesan on top if desired.",
  },
];

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ once: true }}
      className="px-2 py-1 bg-white/20 rounded-md text-sm"
    >
      {children}
    </motion.div>
  );
};

export default QueryResultPage;
