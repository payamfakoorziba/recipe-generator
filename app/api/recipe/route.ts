import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { recipeSchema } from "../../../schemas/schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const dish = await req.json();

  const result = await streamObject({
    model: openai("gpt-4-turbo"),
    schema: recipeSchema,
    prompt:
      `Generate a recipe for this dish:` +
      dish +
      " .Use the most necceasary ingredients and steps.",
    onFinish({ usage }) {
      console.log("Token usage:", usage);
    },
  });

  return result.toTextStreamResponse();
}
