import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row pb-32 md:pb-0">

      {/* Left: Checkout Form */}
      <div className="w-full md:w-[60%] lg:w-[55%] min-h-screen flex flex-col pt-12 px-6 md:px-16 lg:px-24">
        <header className="mb-16">
          <Link href="/" className="inline-block text-xl md:text-2xl font-serif tracking-widest uppercase text-primary">
            Sent By Her
          </Link>
        </header>

        <nav className="flex items-center text-xs tracking-widest uppercase font-sans text-muted-foreground gap-2 mb-8">
          <Link href="/product/test-candle" className="hover:text-primary transition-colors">Information</Link>
          <span>/</span>
          <span className="text-primary font-medium">Shipping</span>
          <span>/</span>
          <span>Payment</span>
        </nav>

        <form className="flex flex-col gap-8 max-w-xl">

          {/* Contact info */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-serif uppercase tracking-widest">Contact Information</h2>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
            />
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="newsletter" className="accent-primary w-4 h-4 bg-transparent" />
              <label htmlFor="newsletter" className="text-xs text-muted-foreground tracking-widest uppercase font-sans">
                Email me with news and offers
              </label>
            </div>
          </section>

          {/* Shipping address */}
          <section className="flex flex-col gap-4 mt-6">
            <h2 className="text-xl font-serif uppercase tracking-widest">Shipping Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
            />

            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="col-span-1 w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
              />
              <select className="col-span-1 w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary text-muted-foreground">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
              <input
                type="text"
                placeholder="ZIP code"
                className="col-span-1 w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone"
              className="w-full bg-secondary/50 border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground mt-2"
            />
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 mt-8 border-t border-muted pt-8">
            <Link href="/product/test-candle" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Return to product
            </Link>

            <button
              type="button"
              className="w-full md:w-auto px-12 py-5 bg-primary text-background flex justify-center items-center uppercase tracking-widest text-xs font-sans hover:bg-white/80 transition-colors"
            >
              Continue to Shipping
            </button>
          </div>

        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full md:w-[40%] lg:w-[45%] bg-secondary min-h-screen pt-12 px-6 md:px-12 lg:px-16 border-t md:border-t-0 md:border-l border-muted flex flex-col">
        <div className="max-w-md w-full flex flex-col gap-8">

          {/* Items */}
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-24 bg-muted overflow-hidden rounded-xl border border-muted-foreground/20">
              <Image
                src="/assets/candle_wide.jpg"
                alt="The Signature Scent"
                fill
                className="object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-muted-foreground text-background w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans">
                1
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <h3 className="font-serif text-lg tracking-wider">The Signature Scent</h3>
              <p className="text-xs uppercase tracking-widest font-sans text-muted-foreground">Aromatherapy Blend</p>
            </div>
            <span className="font-sans font-light">$45.00</span>
          </div>

          <div className="w-full h-px bg-muted-foreground/20" />

          {/* Discount code */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Gift card or discount code"
              className="flex-1 bg-background border border-muted p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors text-primary placeholder-muted-foreground"
            />
            <button className="px-6 py-4 bg-muted text-muted-foreground uppercase tracking-widest text-xs font-sans hover:text-primary hover:bg-muted-foreground/20 transition-colors">
              Apply
            </button>
          </div>

          <div className="w-full h-px bg-muted-foreground/20" />

          {/* Subtotal */}
          <div className="flex flex-col gap-4 font-sans text-sm tracking-wider">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-primary">$45.00</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Shipping</span>
              <span className="text-xs uppercase tracking-widest">Calculated at next step</span>
            </div>
          </div>

          <div className="w-full h-px bg-muted-foreground/20" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="font-serif uppercase tracking-widest text-lg">Total</span>
            <div className="flex items-end gap-2">
              <span className="text-xs text-muted-foreground uppercase font-sans mb-1">USD</span>
              <span className="font-sans text-3xl font-light">$45.00</span>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
