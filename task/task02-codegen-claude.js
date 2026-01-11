const prompt = "Write a Python function to reverse a string.";

try {
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
            content: "You are a helpful coding assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 200,
      }),
    }
  );

  if (!response.ok) {
    console.error("HTTP Error:", response.status);
    console.error(await response.text());
    process.exit(1);
  }

  const data = await response.json();
  const code = data.choices[0].message.content.trim();

  console.log("Generated Python code:");
  console.log(code);
} catch (error) {
  console.error("❌ Error:", error.message);
}
