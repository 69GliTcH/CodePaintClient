import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const cards = [
    {
      title: "Build & Test",
      color: "text-blue-400",
      content: `<h1>Build & Test</h1>
<p>
    Boost productivity by building 
    full projects or quickly testing 
    features and animations.
</p>`,
      tags: ["#html", "#css", "#javascript"],
    },
    {
      title: "Learn & Debug",
      color: "text-green-400",
      content: `body {
    Learn: Discover and Grow;
    live_code: true;
    testing: true;
    debugging: true;
}`,
      tags: ["#debugging", "#testing", "#learning"],
    },
    {
      title: "Share Your Work",
      color: "text-purple-400",
      content: `function greet(Welcome){
    console.log("Share Your Work");
    return\`Save and Share your code\`;
}`,
      tags: ["#save", "#share", "#showcase"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-60px)] bg-gradient-to-br from-cyan-950 via-indigo-900 to-purple-950 text-white flex flex-col items-center justify-start px-6 py-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl gap-6 md:gap-0 mb-10">
        <div className="flex items-center gap-4">
          <Palette size={50} className="text-white" />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-400 to-indigo-400">
            CodePaint
          </h1>
        </div>
        <Link to="/compiler">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-lg px-6 py-3 text-lg font-semibold">
            Start Compiling
          </Button>
        </Link>
      </header>

      {/* Subtitle + Cards Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center gap-10 mb-10">

        {/* Subtitle */}
        <p className="text-center md:text-left text-gray-300 md:w-1/2 text-sm md:text-base">
          The best place to build, test, and discover front-end code. CodePaint is a social development environment for front-end designers and developers. Build and deploy websites, showcase your work, create test cases to debug, and find inspiration.
        </p>

        {/* Glass Card Smooth Slider */}
        <div className="relative flex justify-center md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col mb-4"
              style={{ height: "250px", width: "335px", minWidth: "250px", maxWidth: "100%" }}
            >
              <h2 className={`text-lg font-bold mb-2 ${cards[currentIndex].color}`}>
                {cards[currentIndex].title}
              </h2>
              <pre className="text-white text-sm font-mono overflow-x-auto">
                {cards[currentIndex].content}
              </pre>
              {cards[currentIndex].tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {cards[currentIndex].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-teal-800/70 px-2 py-1 rounded-full text-xs md:text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm text-center">
        Developer's Credit{" "}
        <a
          href="https://sakshamverma.netlify.app"
          className="underline font-bold text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Saksham Verma
        </a>
        .
      </footer>
    </div>
  );
}
