import { useState } from "react";
import { Watermark } from "@/components/Logo";
import { CheckIcon } from "@/components/Icons";

/** Demo only — the form does not send or store anything. */
export default function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full border border-ink/25 bg-transparent px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-ink focus:outline-none";
  return (
    <main className="relative overflow-hidden bg-ivory pb-24 pt-36 text-ink sm:pt-44">
      <Watermark variant="monogram" tone="dark" className="-right-28 top-16 h-[34rem] w-[34rem]" />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div>
          <p className="eyebrow anim-up text-bronze-dark">Contact</p>
          <h1 className="display anim-up mt-5 text-[clamp(3rem,7vw,6rem)]" style={{ animationDelay: "0.1s" }}>
            GET IN <span className="italic">TOUCH.</span>
          </h1>
          <p className="anim-up mt-7 max-w-md text-[15px] leading-relaxed text-ink/65" style={{ animationDelay: "0.2s" }}>
            Questions about a piece, an order or working together? Contact details will be added when the store goes live.
          </p>
        </div>
        <div>
          {sent ? (
            <div className="anim-pop border border-ink/20 p-8">
              <CheckIcon className="h-6 w-6 text-bronze-dark" />
              <p className="mt-4 font-serif text-3xl">Message noted.</p>
              <p className="mt-2 text-sm text-ink/60">Demo concept — nothing was sent or stored.</p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input className={field} placeholder="Your name" aria-label="Your name" />
              <input className={field} type="email" placeholder="Your email address" aria-label="Your email address" required />
              <textarea className={`${field} min-h-40`} placeholder="Message" aria-label="Message" />
              <button className="btn btn-dark" type="submit">
                Send message
              </button>
              <p className="text-xs text-ink/40">Demo form — submissions are not sent anywhere.</p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
