import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import InsurancePlans from "@/app/data/InsurancePlans.json";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { healthHistory } = await request.json();
    const systemPrompt = `You are a helpful assistant that recommends health insurance plans based on the user's health history. You keep your sentences short, and like to answer questions in 1 or 2 questions.
    Below is the data for available health insurance plans:
    ${JSON.stringify(InsurancePlans)}
    Use this information to recommend the most suitable plan based on the user's health history.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `User health history: ${healthHistory}`,
        },
      ],
      store: true,
    });

    return NextResponse.json(
      { output: completion.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    if (error === 469) {
      return NextResponse.json(
        {
          error:
            "You are forbidden from using premium features as you have not chosen a subscription plan yet. Please refer to the billing section in your dashboard!",
        },
        { status: 469 }
      );
    } else {
      return NextResponse.json(
        { error: "An error occurred while processing your request." },
        { status: 500 }
      );
    }
  }
}
