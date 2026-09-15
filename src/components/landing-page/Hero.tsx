"use client";

import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";
import { Reveal } from "./Reveal";

const stats = [
  { label: "Luxury Rooms", value: 150 },
  { label: "Happy Guests", value: 999 },
  { label: "Awards Won", value: 25 },
  { label: "Years Experience", value: 15 },
];

export function Hero() {
  return (
    <section className="relative flex  items-start overflow-hidden bg-particles">
      <div className="container relative z-10 mx-auto flex items-center gap-16 px-4">

        <Reveal className="flex-2 py-20 animate-slide-in-left">
          <div className="mb-8">
            <h1 className="mb-4 font-heading text-5xl font-black gradient-text-rainbow neon-pulse sm:text-7xl ">Welcome to</h1>
            <h2 className="font-heading text-4xl font-bold gradient-text sm:text-6xl">
              <TypeAnimation sequence={["Hotel Rose", 2000, "Luxury Redefined", 2000, "Your Paradise", 2000, "Dream Destination", 2000]} speed={60} repeat={Infinity} />
            </h2>
          </div>

          <p className="mb-12 max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300 md:text-2xl">Experience luxury redefined with cutting-edge technology, breathtaking views, and unparalleled service. Your journey to extraordinary begins here.</p>

          <div className="mb-16 flex flex-col gap-6 sm:flex-row">
            <a href="#rooms" className="btn-futuristic hover-glow"><span className="relative z-10 flex items-center gap-3"><span>Explore Rooms</span><ArrowRight className="h-6 w-6" /></span></a>

            <button type="button" className="btn-outline hover-lift"><span className="flex items-center gap-3"><Video className="h-6 w-6" /><span>Virtual Tour</span></span></button>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

            {stats.map((stat, index) => 
            <Reveal key={stat.label} delay={index * 0.1}><div className="card-3d glass-morphism neon-border hover-lift rounded-3xl p-6 text-center"><div className="card-3d-inner"><p className="mb-3 text-sm text-gray-600 dark:text-gray-300 lg:text-base">{stat.label}</p><p className="text-3xl font-black gradient-text md:text-4xl lg:text-5xl"><CountUp end={stat.value} duration={2} /></p></div></div></Reveal>)}

          </div>
        </Reveal>

        <Reveal className="hidden flex-1 justify-center animate-slide-in-right lg:flex">
          <div className="relative">
            <div className="hologram glass-morphism-strong neon-border-strong relative z-10 h-96 w-80 overflow-hidden rounded-3xl"><Image src="/TempPictures/hero-1.jpeg" alt="Luxury Suite" width={640} height={768} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" /></div>
            <div className="floating glass-morphism neon-border absolute -right-10 -top-10 h-32 w-32 overflow-hidden rounded-2xl [animation-delay:1s]"><Image src="/TempPictures/hero-1.jpeg" alt="Pool View" width={256} height={256} className="h-full w-full object-cover" /></div>
            <div className="floating glass-morphism neon-border absolute -bottom-10 -left-10 h-40 w-40 overflow-hidden rounded-2xl [animation-delay:2s]"><Image src="/TempPictures/hero-1.jpeg" alt="Restaurant" width={320} height={320} className="h-full w-full object-cover" /></div>
            <div className="floating glass-morphism neon-border absolute -right-20 top-1/2 h-24 w-24 overflow-hidden rounded-full [animation-delay:3s]"><Image src="/TempPictures/hero-1.jpeg" alt="Spa" width={192} height={192} className="h-full w-full object-cover" /></div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
