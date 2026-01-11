const inputText = "GitHub Models are powerful!";

async function generateEmbedding() {
  try {
    const response = await fetch(
      "https://models.github.ai/inference/embeddings",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/text-embedding-3-small",
          input: inputText,
        }),
      }
    );

    if (!response.ok) {
      console.error("HTTP Error:", response.status);
      console.error(await response.text());
      process.exit(1);
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;

    console.log("Input:", inputText);
    console.log("Embedding length:", embedding.length);
    console.log("First 10 values:", embedding.slice(0, 10));
    console.log("\nFull embedding vector:\n", embedding);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

generateEmbedding();
