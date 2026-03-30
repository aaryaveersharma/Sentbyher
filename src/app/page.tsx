import Image from "next/image";
import Link from "next/link";
import AnimatedTextSection from "@/components/AnimatedTextSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background relative selection:bg-primary selection:text-background pb-32">
      {/* Header */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-center items-center absolute top-0 z-50">
        <h1 className="text-xl md:text-2xl font-serif tracking-widest uppercase text-primary">
          Sent By Her
        </h1>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-8 lg:px-16 overflow-hidden">

        {/* Title positioned above images, blending cleanly */}
        <div className="z-10 text-center mb-12 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary tracking-tight font-light uppercase">
            Premium Candles
          </h2>
          <p className="mt-4 text-sm md:text-base font-sans text-muted-foreground tracking-widest uppercase max-w-md">
            Light up every moment with intention
          </p>
        </div>

        {/* Masonry-like image grid with logo in center */}
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center md:items-stretch h-auto md:h-[60vh]">

          {/* Left Small Image */}
          <div className="relative w-full md:w-1/4 h-64 md:h-full rounded-t-full rounded-b-full overflow-hidden shrink-0 mt-0 md:mt-12">
            <Image
              src="/assets/candle1.jpg"
              alt="Luxury Candle Setup"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>

          {/* Center Wide Image */}
          <div className="relative w-full md:w-2/4 h-80 md:h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden shrink-0">
            <Image
              src="/assets/candle_wide.jpg"
              alt="Premium Candle Collection"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Dark overlay for better logo contrast if needed */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          </div>

          {/* Right Small Image */}
          <div className="relative w-full md:w-1/4 h-64 md:h-full rounded-t-full rounded-b-full overflow-hidden shrink-0 mt-0 md:mt-12">
            <Image
              src="/assets/candle2.jpeg"
              alt="Aromatherapy Candle"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>

          {/* Center Logo - positioned absolutely in the middle of the grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 md:w-48 aspect-square pointer-events-none drop-shadow-2xl">
            <Image
              src="/assets/logo.png"
              alt="Sent By Her Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 128px, 192px"
              priority
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
          <span className="text-xs uppercase tracking-widest font-sans">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-primary/50 overflow-hidden relative">
            <div className="w-full h-full bg-primary absolute top-0 left-0 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Our Collection / Test Product Section */}
      <section className="w-full max-w-7xl mx-auto py-32 px-6 md:px-12 flex flex-col items-center">
        <h3 className="text-3xl md:text-5xl font-serif text-primary text-center uppercase mb-16">
          Our Collection
        </h3>

        <Link href="/product/test-candle" className="group block w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-secondary/50">
              <Image
                src="/assets/candle_wide.jpg"
                alt="Signature Scent Candle"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-6 py-3 border border-white text-white rounded-full text-sm uppercase tracking-widest backdrop-blur-sm">
                  View Product
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-serif text-primary group-hover:text-muted-foreground transition-colors">
                  The Signature Scent
                </h4>
                <p className="text-sm font-sans text-muted-foreground mt-1 uppercase tracking-wider">
                  Aromatherapy Blend
                </p>
              </div>
              <span className="text-lg font-sans text-primary">$45.00</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Animated Text Sections (Brand, Mission, Vision) */}
      <section className="w-full mt-12 flex flex-col gap-12">
        <AnimatedTextSection>
          Brand Introduction – Sent By Her. Light up every moment.
          <br /><br />
          <span className="text-lg md:text-2xl font-light">
            Sent By Her is a luxury gifting brand built on emotion, understanding, and intention. Founded by three young creators, we believe that every feeling deserves to be expressed in the right way—without overthinking or waiting for the perfect words.
            What makes us different is our instinct to understand what you need, even when you don’t say it. Every product is thoughtfully curated to reflect emotions, preferences, and moments that matter.
            Because sometimes, you don’t need a shoulder—you just need something that truly understands you. And that’s exactly what we send.
          </span>
        </AnimatedTextSection>

        <AnimatedTextSection>
          Mission
          <br /><br />
          <span className="text-lg md:text-2xl font-light">
            To help people express their emotions effortlessly through thoughtful, premium gifts that feel personal and truly understood.
          </span>
        </AnimatedTextSection>

        <AnimatedTextSection>
          Vision
          <br /><br />
          <span className="text-lg md:text-2xl font-light">
            To become a go-to luxury brand that connects deeply with emotions and turns everyday moments into something meaningful and memorable.
          </span>
        </AnimatedTextSection>
      </section>
    </main>
  );
}
