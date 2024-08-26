# AI Recipe Generator

An AI recipe generator app that generates an easy-to-follow recipe for your favourite dish! You can then modify the dish based on your dietary needs (e.g. keto diet, or vegan diet).

## Installation

To run it locally, get an OpenAI API key and create an Upstash redis instance. Store your API keys and redis environemnt variables in a `.env.local` file as follows:

```
OPENAI_API_KEY=XXXX
UPSTASH_REDIS_REST_URL=XXXX
UPSTASH_REDIS_REST_TOKEN=XXXX
```

And then run `npm install`, `npm run dev` to start a development server. Go to `http://localhost:3000`.
