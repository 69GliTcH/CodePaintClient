import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-60px)] text-white flex justify-center items-center flex-row bg-cyan-950">
      <div className="text-white flex justify-center items-center flex-col gap-3 w-[50%]">
        <div className="flex flex-row">
          <Palette size={50} className="text-white" />
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-8xl font-bold">CodePaint</h1>
        </div>
        <p className=" text-gray-400 text-center p-3">The best place to build, test, and discover front-end code.</p>
        <p className=" text-center pb-3">CodePen is a social development environment for front-end designers <br />
          and developers. Build and deploy a website, show off your work, build <br />
          test cases to learn and debug, and find inspiration.</p>
        <Link to="/compiler" className="animate-pulse">
          <Button variant="default">Start Compiling</Button>
        </Link>
        <p className="text-gray-400">Developed by <a href="https://sakshamverma.netlify.app" className="font-bold text-white">Saksham Verma</a>.</p>
      </div>
      <div className="w-[50%] ">
        <div className="mx-20 flex flex-col gap-3">

          <div className="cursor-pointer hover:scale-105 transition ease-in-out">
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-indigo-950">
              <div className="px-6 py-2">
                <div className=" text-lg mb-2 text-white"><span className="text-gray-400">&lt;</span><span className="text-red-600">h1</span><span className="text-gray-400">&gt;</span><span className="font-bold text-xl mb-2 text-white">Build & Test</span>&lt;<span className="text-red-600">/h1</span><span className="text-gray-400">&gt;</span></div>
                <p className="text-white text-base font-semibold">
                  &#160;&#160;&#160;&#160;&#160; <span className="text-gray-400">&lt;</span><span className="text-lime-500">p</span><span className="text-gray-400">&gt;</span><br />  &#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160; Get work done quicker by building out<br /> &#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160; entire projects or isolating code to test<br /> &#160;&#160;&#160;&#160;&#160; &#160;&#160;&#160;&#160;&#160; features and animations. <br /> &#160;&#160;&#160;&#160;&#160;<span className="text-gray-400">&lt;</span><span className="text-lime-500">/p</span><span className="text-gray-400">&gt;</span>
                </p>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block text-white bg-teal-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#html</span>
                <span className="inline-block text-white bg-teal-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#css</span>
                <span className="inline-block text-white bg-teal-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#javascript</span>
              </div>
            </div>

          </div>

          <div className="mx-[150px] cursor-pointer hover:scale-105 transition ease-in-out">
            <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-indigo-950">
              <div className="px-6 py-2">
                <div className=" text-lg mb-2 text-white"><span className="text-cyan-400">body</span><span className="text-gray-400">&#123;</span><br /><span className="font-bold text-xl mb-2 text-white">&#160;&#160;&#160;&#160;&#160;Learn: Discover;</span></div>
                <p className="text-white text-base font-semibold">
                  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<span className="text-blue-300">live_code</span><span className="text-gray-400">:</span> true<span className="text-gray-400">;</span><br />&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<span className="text-blue-300">testing</span><span className="text-gray-400">:</span> true<span className="text-gray-400">;</span><br />&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;<span className="text-blue-300">debugging</span><span className="text-gray-400">:</span> true<span className="text-gray-400">;</span><br />
                </p>
                <p className=" text-lg mb-2 text-white"><span className="text-gray-400">&#125;</span></p>
              </div>
            </div>
          </div>


          <div className="cursor-pointer hover:scale-105 transition ease-in-out">
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-indigo-950">
              <div className="px-6 py-2">
                <div className=" text-lg mb-2 text-white"><span className="text-cyan-400">function</span> <span className="text-lime-500">greet</span><span className="text-gray-400">&#40;</span>Welcome<span className="text-gray-400">&#41;</span><span className="text-gray-400">&#123;</span><br />console<span className="text-gray-400">.</span><span className="text-cyan-400">log</span><span className="text-gray-400">&#40;</span><span className="font-bold text-xl mb-2 text-white">Share Your Work</span><span className="text-gray-400">&#41;;</span></div>
                <p className="text-white text-base font-semibold">
                  <span className="text-orange-500">//Show your code directly in the browser.</span> <br />
                  <span className="text-red-600">return</span> <span className="text-gray-400">`</span>Save and Share your code<span className="text-gray-400">`;</span>
                </p>
                <p className=" text-lg mb-2 text-black"><span className="text-gray-400">&#125;</span></p>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}
