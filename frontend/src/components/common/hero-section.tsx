import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            AI Fashion Recommendation
          </p>

          <h1 className="mt-6 text-6xl font-bold leading-tight">
            Find Your
            <br />
            Perfect Style
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-zinc-600">
            Personalized outfit recommendations powered by
            Artificial Intelligence, tailored to your style,
            body type, favorite color, and budget.
          </p>

          <div className="mt-10">
            <Link
              href="/style-on"
              className="rounded-full bg-black px-8 py-4 text-white"
            >
              Style On
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}