"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue text-eggshell px-6">
      <h1 className="text-6xl font-bold mb-6 text-eggshell text-center">
        Find your best match with
      </h1>
      <Image
        src="/images/tldrcropped.png"
        width={300}
        height={300}
        alt="Logo"
      />

      <p className="text-2xl text-eggshell text-center max-w-3xl mb-8">
        Our AI-powered system helps you find the best health insurance plans
        based on your unique needs. Get personalized recommendations in just a
        few steps!
      </p>
      <Link
        href="/user-form"
        className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-eggshell text-2xl font-bold rounded-lg shadow-md hover:bg-orange-600 transition"
      >
        Get Started <ArrowRight size={28} strokeWidth={2} />
      </Link>
    </div>
  );
}
