"use client";

import Container from "@/components/container";
import { experimental_useObject as useObject } from "ai/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { Pause } from "lucide-react";
import AnimateText from "@/components/animate-text";
import ModifyRecipeInput from "@/components/modify-recipe-input";
import { recipeSchema } from "@/schemas/schema";
import { useRecipeStore } from "@/hooks/use-recipe-store";

const placeholders = [
  "Make it gluten-free.",
  "Exclude nuts from the ingredients.",
  "Use only low-calorie options.",
  "Make this dish suitable for a keto diet.",
  "Substitute dairy with plant-based alternatives.",
];

const QueryResultPage = ({
  params: { query },
  searchParams: { modifications },
}: {
  params: { query: string };
  searchParams: { modifications?: string };
}) => {
  const recipe = useRecipeStore((state) => state.recipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const hasHydrated = useRecipeStore((state) => state._hasHydrated);

  const { object, submit, isLoading, stop } = useObject({
    api: !modifications ? "/api/generate-recipe" : "/api/modify-recipe",
    schema: recipeSchema,
    onFinish: (result) => {
      console.log("recipe generated", result.object);
      updateRecipe(result.object!);
    },
  });

  const dish = decodeURIComponent(query);

  const hasMounted = useRef<boolean>(false);
  useEffect(() => {
    if (!hasHydrated) return;
    if (!hasMounted.current) {
      if (modifications && recipe) {
        console.log({ recipe, modifications: modifications });
        submit({ recipe, modifications: modifications });
      } else {
        console.log({ dish });
        submit(dish);
      }
      hasMounted.current = true;
    }
  }, [hasHydrated, dish, modifications]);

  let [ref, { height }] = useMeasure();

  return (
    <Container className="py-16 sm:py-20 md:py-32 text-white">
      <div className="relative">
        <div ref={ref}>
          <h1 className="text-white font-medium text-4xl/normal sm:text-6xl/normal md:text-7xl/normal">
            <AnimateText>{object?.title}</AnimateText>
          </h1>
          {/* Manually control the generation */}
          {/* <div className="flex items-center gap-6 mt-4">
            <Button onClick={() => submit(query)} disabled={isLoading}>
              Generate
            </Button>
            <Button type="button" onClick={() => stop()}>
              Stop
            </Button>
          </div> */}

          <div className="flex flex-wrap gap-2 md:gap-4 mt-5">
            {object?.servings && (
              <Badge>🍽️&nbsp;{object?.servings} Servings</Badge>
            )}
            {object?.time && <Badge>🕒&nbsp;{object?.time} mins</Badge>}
            {object?.difficulty && (
              <Badge>
                ⭐️&nbsp;
                {object?.difficulty?.charAt(0).toUpperCase() +
                  object?.difficulty?.slice(1)}{" "}
                Difficulty
              </Badge>
            )}
            {object?.calories && <Badge>🔥&nbsp;{object?.calories} cal</Badge>}
          </div>

          <p className="max-w-screen-lg text-sm md:text-lg/relaxed mt-6 md:mt-10 text-pretty">
            <AnimateText>{object?.description}</AnimateText>
          </p>

          {object?.ingredients && (
            <>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mt-10">
                  <AnimateText>Ingredients</AnimateText>
                </h3>
                <Resizable className=" bg-white/10 border border-white/30  rounded-lg mt-6 md:mt-8">
                  <div className="flex flex-col gap-4 md:gap-6 p-6">
                    {object.ingredients.map((ingredient, index) => {
                      return (
                        <div
                          key={`ingredient ` + index}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            className="border-white rounded-none size-3 md:size-4"
                            id={`ingredient-${index}`}
                          />
                          <label
                            htmlFor={`ingredient-${index}`}
                            className="text-sm sm:text-base md:text-lg"
                          >
                            <AnimateText>{`${ingredient?.name ?? ""}${
                              ingredient?.quantity
                                ? ` [${ingredient?.quantity}]`
                                : ""
                            }`}</AnimateText>
                            &nbsp;
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </Resizable>
              </div>
            </>
          )}

          {object?.steps && (
            <>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mt-10">
                <AnimateText>Instructions</AnimateText>
              </h3>
              <div className="flex flex-col gap-6 mt-6 md:mt-8">
                {object.steps.map((step, index) => {
                  return (
                    <Resizable key={`step ` + index}>
                      <div className="bg-white/10 border border-white/30 p-6 flex flex-col md:flex-row items-start gap-6 rounded-lg">
                        <div className="relative bg-white/10 size-[32px] rounded-full flex-shrink-0">
                          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-medium">
                            {step?.title && step?.emoji && (
                              <AnimateText>
                                {`${step?.title ?? ""} ${step?.emoji ?? ""}`}
                              </AnimateText>
                            )}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed mt-2">
                            <AnimateText>{step?.description ?? ""}</AnimateText>
                          </p>
                        </div>
                      </div>
                    </Resizable>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {isLoading && (
          <motion.div
            animate={{ y: height }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            className="absolute top-10"
          >
            <Loading />
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 inset-x-0">
        <Container className="absolute left-1/2 -translate-x-1/2 flex items-center gap-x-4 bottom-4">
          <ModifyRecipeInput
            className="w-full h-9 md:h-12 text-sm md:text-base"
            placeholders={placeholders}
            dish={dish}
          />
          <Button
            disabled={!isLoading}
            type="button"
            onClick={() => stop()}
            className="size-9 md:size-12 p-2"
          >
            <Pause className="size-4" />
          </Button>
        </Container>
      </div>
    </Container>
  );
};

const Loading = () => {
  return (
    <motion.div className="flex space-x-2" layoutId="loading">
      <span className="sr-only">Loading...</span>
      <div className="size-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-1 bg-white rounded-full animate-bounce"></div>
    </motion.div>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ once: true }}
      className="px-2 py-1 bg-white/10 rounded-md text-xs sm:text-sm"
    >
      {children}
    </motion.div>
  );
};

const Resizable = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ opacity: 1, height }}
      className={cn("overflow-hidden", className)}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

export default QueryResultPage;
