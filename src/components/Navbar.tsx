"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-transparent shadow w-full">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo Section */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Website Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Right-side Navigation */}
        <div className="hidden md:flex items-center space-x-6"></div>
      </div>
    </nav>
  );
}
