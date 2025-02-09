"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const predictionParam = searchParams.get("prediction");
  const predictionVal = predictionParam ? Number(predictionParam) : 0;
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
    </div>
  );
}
