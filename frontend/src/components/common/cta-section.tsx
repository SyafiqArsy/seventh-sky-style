import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-black p-16 text-center text-white">
          <h2 className="text-5xl font-bold">
            Ready To Discover
            Your Style?
          </h2>

          <p className="mt-6 text-zinc-300">
            Let AI become your personal fashion stylist.
          </p>

          <Link
            href="/style-on"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-black"
          >
            Start Style On
          </Link>
        </div>
      </div>
    </section>
  );
}