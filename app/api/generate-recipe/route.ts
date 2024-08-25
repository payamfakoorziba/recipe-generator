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
