"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Import arrow icon

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-black">
      <h1 className="text-5xl font-bold mb-4 text-black text-center">
        Welcome to Our Insurance Finder
      </h1>
      <p className="text-lg text-black text-center max-w-2xl mb-6">
        Our AI-powered system helps you find the best health insurance plans 
        based on your unique needs. Get personalized recommendations in just a few steps!
      </p>
      <button
        onClick={() => router.push("/user-form")}
        className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition"
      >
        Get Started <ArrowRight size={20} />
      </button>
    </div>
  );
}
