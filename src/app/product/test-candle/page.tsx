import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Minus, Plus } from "lucide-react";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background pb-32">
      {/* Header */}
      <header className="w-full py-8 px-6 md:px-12 flex justify-between items-center absolute top-0 z-50">
        <Link href="/" className="flex items-center gap-2 hover:text-muted-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs tracking-widest uppercase font-sans">Back</span>
        </Link>
        <h1 className="text-xl md:text-2xl font-serif tracking-widest uppercase text-primary">
          Sent By Her
        </h1>
        <div className="w-16"></div> {/* Spacer for center alignment */}
      </header>

      {/* Product Details Section */}
      <section className="pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary">
            <Image
              src="/assets/candle_wide.jpg"
              alt="The Signature Scent"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex gap-4">
            <div className="relative w-1/3 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer opacity-100 border border-muted-foreground/30">
              <Image src="/assets/candle_wide.jpg" alt="Thumbnail 1" fill className="object-cover" />
            </div>
            <div className="relative w-1/3 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
              <Image src="/assets/candle1.jpg" alt="Thumbnail 2" fill className="object-cover" />
            </div>
            <div className="relative w-1/3 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
              <Image src="/assets/candle2.jpeg" alt="Thumbnail 3" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 md:sticky md:top-32">

          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-serif text-primary uppercase">
              The Signature Scent
            </h2>
            <p className="text-sm tracking-widest uppercase text-muted-foreground font-sans">
              Aromatherapy Blend
            </p>
          </div>

          <div className="text-2xl font-sans font-light">
            $45.00
          </div>

          <div className="w-full h-px bg-muted" />

          <p className="text-lg md:text-xl font-serif leading-relaxed text-muted-foreground font-light">
            Crafted for moments that demand pause. The Signature Scent fills your space with an emotionally grounding, deep aroma. Poured by hand into an elegant minimalist jar, it speaks volumes without making a sound.
          </p>

          {/* Details toggle (mock) */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center py-4 border-b border-muted cursor-pointer hover:text-primary text-muted-foreground transition-colors">
              <span className="uppercase tracking-widest text-xs font-sans">Notes & Ingredients</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex justify-between items-center py-4 border-b border-muted cursor-pointer hover:text-primary text-muted-foreground transition-colors">
              <span className="uppercase tracking-widest text-xs font-sans">Shipping & Returns</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-8">
            <Link
              href="/checkout"
              className="w-full py-5 bg-primary text-background flex justify-center items-center uppercase tracking-widest text-xs font-sans hover:bg-white/80 transition-colors"
            >
              Add to Cart — $45.00
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
