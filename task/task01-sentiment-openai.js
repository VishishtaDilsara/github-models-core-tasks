const inputText = "I regret trying this. It was disappointing and irritating.";

const response = await fetch(
  "https://models.github.ai/inference/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis assistant.",
        },
        {
          role: "user",
          content: `Classify the sentiment of the following text as Positive, Negative, or Neutral:\n"${inputText}"`,
        },
      ],
      temperature: 0,
      max_tokens: 10,
    }),
  }
);

if (!response.ok) {
  console.error("HTTP Error:", response.status);
  console.error(await response.text());
  process.exit(1);
}

const data = await response.json();
const sentiment = data.choices[0].message.content.trim();

console.log("Sentiment:", sentiment);
