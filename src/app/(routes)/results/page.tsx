"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Chatbot from "@/components/Chatbot"; // Adjust the path as needed

function ResultsContent() {
  const searchParams = useSearchParams();
  const predictionParam = searchParams.get("prediction");
  const ageParam = searchParams.get("age");
  const sexParam = searchParams.get("sex");
  const bmiParam = searchParams.get("bmi");

  const smokeParam = searchParams.get("smoke");
  const predictionVal = predictionParam ? Number(predictionParam) : 0;
  const ageVal = ageParam ? `I am ${Number(ageParam)} years old` : 0;
  const sexVal = Number(sexParam) == 1 ? "I am female" : "I am a male";
  const bmiVal = bmiParam ? `My bmi is ${Number(bmiParam)}` : 0;

  const smokeVal = Number(smokeParam) == 0 ? "No" : "Yes";

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue text-black">
      {predictionVal > 16640 && (
        <Image
          src="/results-graphics/1.jpg"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal <= 16640 && predictionVal > 4640 && (
        <Image
          src="/results-graphics/2.jpg"
          width={2000}
          height={1000}
          alt="tier 2"
        />
      )}
      {predictionVal <= 4640 && (
        <Image
          src="/results-graphics/3.jpg"
          width={2000}
          height={1000}
          alt="tier 3"
        />
      )}
      <Chatbot age={ageVal} sex={sexVal} bmi={bmiVal} smoke={smokeVal} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResultsContent />
      </Suspense>
    </>
  );
}
