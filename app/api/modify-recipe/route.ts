import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { recipeSchema } from "@/schemas/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "30 s"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "ip";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    console.log("Ratelimited!");
    return new Response("Ratelimited!", { status: 429 });
  }

  const body = await req.json();

  console.log(body);

  const prompt =
    `Apply the following modifications to ${JSON.stringify(body.recipe)}:` +
    body.modifications +
    " .Use the most necessary ingredients and steps. Include the modification in the title of the recipe.";

  console.log("Prompt:", prompt);

  const result = await streamObject({
    model: openai("gpt-4-turbo"),
    schema: recipeSchema,
    prompt,
    onFinish({ usage }) {
      console.log("Token usage:", usage);
    },
  });

  return result.toTextStreamResponse();
}
