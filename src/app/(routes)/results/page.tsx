"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Import reverting arrow

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 text-black">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
        Here&apos;s the Perfect Plan for You!
        </h1>
        <p className="text-lg font-semibold text-center text-gray-700">
          <span className="text-blue-600">EliteCare Premium Plan</span>
        </p>
        <p className="text-md text-gray-600 text-center mt-2">
          A comprehensive healthcare plan that provides extensive coverage, low 
          deductibles, and access to a wide network of specialists. Perfect for 
          individuals and families looking for reliable, cost-effective coverage.
        </p>
        
        {/* Bottom Right Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            <ArrowLeft size={20} /> Go Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
