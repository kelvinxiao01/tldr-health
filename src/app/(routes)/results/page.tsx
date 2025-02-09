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

  if (predictionVal <= 3172) {
    var insurPlan = "ambetter bronze";
  } else if (predictionVal > 3172 && predictionVal <= 5155) {
    var insurPlan = "healthfirst bronze";
  } else if (predictionVal > 5155 && predictionVal <= 7139) {
    var insurPlan = "anthem bronze";
  } else if (predictionVal > 7139 && predictionVal <= 9122) {
    var insurPlan = "oscar bronze";
  } else if (predictionVal > 9122 && predictionVal <= 11106) {
    var insurPlan = "healthfirst silver";
  } else if (predictionVal > 11106 && predictionVal <= 13089) {
    var insurPlan = "anthem silver";
  } else if (predictionVal > 13089 && predictionVal <= 15073) {
    var insurPlan = "ambetter silver";
  } else if (predictionVal > 15073 && predictionVal <= 17056) {
    var insurPlan = "oscar silver";
  } else if (predictionVal > 17056 && predictionVal <= 19040) {
    var insurPlan = "healthfirst gold";
  } else if (predictionVal > 19040 && predictionVal <= 21023) {
    var insurPlan = "ambetter gold";
  } else if (predictionVal > 21023 && predictionVal <= 23007) {
    var insurPlan = "anthem gold";
  } else {
    var insurPlan = "oscar gold";
  }

  const smokeVal = Number(smokeParam) == 0 ? "No" : "Yes";

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue text-black">
      {predictionVal <= 3172 && (
        <Image
          src="/results-graphics/1.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 3172 && predictionVal <= 5155 && (
        <Image
          src="/results-graphics/2.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 5155 && predictionVal <= 7139 && (
        <Image
          src="/results-graphics/3.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 7139 && predictionVal <= 9122 && (
        <Image
          src="/results-graphics/4.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 9122 && predictionVal <= 11106 && (
        <Image
          src="/results-graphics/5.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 11106 && predictionVal <= 13089 && (
        <Image
          src="/results-graphics/6.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 13089 && predictionVal <= 15073 && (
        <Image
          src="/results-graphics/7.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 15073 && predictionVal <= 17056 && (
        <Image
          src="/results-graphics/8.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 17056 && predictionVal <= 19040 && (
        <Image
          src="/results-graphics/9.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 19040 && predictionVal <= 21023 && (
        <Image
          src="/results-graphics/10.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 21023 && predictionVal <= 23007 && (
        <Image
          src="/results-graphics/11.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}
      {predictionVal > 23007 && (
        <Image
          src="/results-graphics/12.png"
          width={2000}
          height={1000}
          alt="tier 1"
        />
      )}

      <Chatbot
        age={ageVal}
        sex={sexVal}
        bmi={bmiVal}
        smoke={smokeVal}
        insurPlan={insurPlan}
      />
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
