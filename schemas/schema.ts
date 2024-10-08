import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1).describe("Name of the dish, capitalized"),
  servings: z.number().int().positive().describe("Number of servings"),
  time: z.number().int().positive().describe("Time in minutes"),
  difficulty: z.enum(["easy", "medium", "hard"]).describe("Difficulty level"),
  calories: z.number().int().positive().describe("Calories"),
  description: z.string().min(1).describe("Description of the dish"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1).describe("Name of the ingredient"),
        quantity: z
          .string()
          .min(1)
          .describe("Quantity of the ingredient")
          .optional(),
      })
    )
    .describe("List of ingredients"),
  steps: z.array(
    z.object({
      emoji: z.string().min(1).describe("Emoji for the step"),
      title: z.string().min(1).describe("Title of the step"),
      description: z.string().min(1).describe("Description of the step"),
    })
  ),
  hueRotate: z
    .number()
    .int()
    .min(0)
    .max(360)
    .describe("Degrees to rotate the hue of the background image"),
});
