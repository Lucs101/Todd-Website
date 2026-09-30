import { useState } from "react";
import { Reveal } from "./Reveal";
import { Watermark } from "./Logo";
import { CheckIcon } from "./Icons";

/** Demo only: nothing is sent or stored. */
export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-umber py-24 text-ivory sm:py-32">
      <Watermark variant="monogram" tone="light" className="-left-20 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow text-bronze">The List</p>
          <h2 className="display mt-5 text-[3.2rem] sm:text-7xl">KEEP YOUR EDGE.</h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/65">
            New arrivals, considered edits, and occasional inspiration — delivered without the noise.
          </p>
        </Reveal>
        <Reveal delay={150}>
          {done ? (
            <p className="anim-pop mx-auto mt-10 inline-flex items-center gap-3 border border-bronze/50 px-6 py-4 text-sm text-ivory/85">
              <CheckIcon className="h-4 w-4 text-bronze" /> You're on the list. (Demo — nothing was saved.)
            </p>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label className="sr-only" htmlFor="nl-email">
                Your email address
              </label>
              <input
                id="nl-email"
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 border border-ivory/25 bg-transparent px-5 py-4 text-sm text-ivory placeholder:text-ivory/40 focus:border-bronze focus:outline-none"
              />
              <button type="submit" className="btn btn-solid">
                Join the list
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
