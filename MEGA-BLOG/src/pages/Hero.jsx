import React from "react";
import { Link } from "react-router-dom";
import hero from '../assets/hero.png'
function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.2) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
            Welcome to <span className="text-purple-600">Inkspiration</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 leading-relaxed">
            Your daily dose of stories, ideas, and inspirations.
            Read, write, and share blogs that matter.
          </p>
          <div className="flex justify-center md:justify-start gap-6 flex-wrap">
            <Link
              to="/"
              className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
            >
              Start Reading
            </Link>
            <Link
              to="/"
              className="border border-purple-600 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              Write a Post
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Blog Illustration"
            className="w-72 sm:w-96 md:w-[450px] drop-shadow-xl"
          />
        </div>
      </div>
    </section>
    
  );
}

export default Hero;
