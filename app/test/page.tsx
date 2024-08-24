"use client";

import { experimental_useObject as useObject } from "ai/react";
import { recipeSchema } from "@/schemas/schema";

export default function Page() {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/recipe",
    schema: recipeSchema,
  });

  return (
    <div className="text-white p-6">
      <div className="flex gap-6">
        <button onClick={() => submit("Pizza")} disabled={isLoading}>
          Generate notifications
        </button>
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      </div>

      {isLoading && (
        <div>
          <div>Loading...</div>
        </div>
      )}

      {/* <div className="flex flex-col gap-y-4 mt-4">
        {object?.notifications?.map((notification, index) => (
          <div
            key={index}
            className="p-4 border border-white/50 bg-white/10 rounded-2xl"
          >
            <p>{notification?.name}</p>
            <p>{notification?.message}</p>
          </div>
        ))}
      </div> */}
      {JSON.stringify(object)}
    </div>
  );
}
