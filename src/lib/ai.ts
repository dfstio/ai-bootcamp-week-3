"use server";

import { error } from "console";
import OpenAI from "openai";

// generate completion with OpenAI

const baseURL = process.env.AI_BASE_URL;

export async function describe(image: string): Promise<string> {
  try {
    const openai = new OpenAI({ baseURL });
    const messages: any[] = [
      {
        role: "system",
        content:
          "You are a helpful assistant, knowing very well how describe an image in the art professor style. Strictly describe only details about the elements, style, details, and colors of the image",
        name: "system",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe the image. ",
          },
          {
            type: "image_url",
            image_url: { url: image },
          },
        ],
      },
    ];
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });
    console.log("ChatGPT full log", completion);

    const answer = completion?.choices[0]?.message.content;
    console.log("ChatGPT answer", answer);
    return (
      answer ??
      "ChatGPT could not generate a description for this image. Please try again."
    );
  } catch (error: any) {
    return "ChatGPT could not generate a description for this image. Please try again." +
      error.message
      ? error.message
      : "";
  }
}

export async function generateImage(params: {
  prompt: string;
  size?: string;
  quality?: string;
  style?: string;
}): Promise<{ image?: string; error?: any }> {
  try {
    const { prompt } = params;
    const sizes = ["1024x1024", "1792x1024", "1024x1792", "256x256"];
    const size: "1024x1024" | "1792x1024" | "1024x1792" | "256x256" =
      sizes.includes(params.size ?? "1024x1024")
        ? ((params.size ?? "1024x1024") as
            | "1024x1024"
            | "1792x1024"
            | "1024x1792"
            | "256x256")
        : "1024x1024";
    const quality: "hd" | "standard" =
      params.quality?.toLowerCase() === "hd" ? "hd" : "standard";
    const style: "vivid" | "natural" =
      params.style?.toLowerCase() === "vivid" ? "vivid" : "natural";

    const openai = new OpenAI({ baseURL });
    const imageParams = {
      model: "dall-e-3",
      prompt,
      size,
      quality,
      style,
      user: "ai-bootcamp-week-3",
    };

    const image = await openai.images.generate(imageParams);
    return { image: image?.data[0]?.url };
  } catch (error) {
    return { image: undefined, error };
  }
}

export async function evaluate(joke: string): Promise<string> {
  const openai = new OpenAI({ baseURL });
  const messages: any[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Evaluate if the joke is funny or not",
      name: "system",
    },
    { role: "user", content: joke, name: "user" },
  ];
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });
  console.log("ChatGPT full log", completion);

  const answer = completion?.choices[0]?.message.content;
  console.log("ChatGPT answer", answer);
  return answer ?? "ChatGPT could not evaluate a joke. Please try again.";
}
