"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  // Handle sticky blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 md:px-12 flex justify-between items-center z-50 transition-all ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-subtle" : "bg-transparent border-b border-transparent"}`}
    >
      <Link
        href="#home"
        className="type-logo text-2xl md:text-3xl drop-shadow-lg tracking-widest text-[var(--text-primary)]"
      >
        prep<span className="text-calm">nexus</span>
      </Link>

      <div className="hidden md:flex gap-8 items-center type-option text-sm tracking-wide">
        <Link href="#home" className="hover:text-primary transition-colors">
          Home
        </Link>
        <Link href="#about" className="hover:text-primary transition-colors">
          About
        </Link>
        <Link
          href="#create-quiz"
          className="hover:text-primary transition-colors"
        >
          Create Quiz
        </Link>
        <Link href="#contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
      </div>

   
    </nav>
  );
}
