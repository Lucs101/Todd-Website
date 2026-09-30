import { Link } from "@/router";
import { Watermark } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-char px-6 text-center text-ivory">
      <Watermark variant="monogram" tone="light" className="left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative">
        <p className="eyebrow text-bronze">404</p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">OFF THE EDIT.</h1>
        <p className="mt-5 text-ivory/60">That page doesn't exist in this demo.</p>
        <Link to="/shop" className="btn btn-solid mt-10">
          Back to the collection
        </Link>
      </div>
    </main>
  );
}
