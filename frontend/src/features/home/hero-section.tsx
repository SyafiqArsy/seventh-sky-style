import Link from "next/link";

import { Container } from "@/components/common/container";

export function HeroSection() {
  return (
    <section className="py-24">

      <Container>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">

            <div className="space-y-4">

              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                AI Fashion Recommendation
              </p>

              <h1 className="text-6xl font-bold leading-tight">

                Find Your
                <br />

                Perfect Style

              </h1>

              <p className="max-w-xl text-lg text-muted-foreground">

                Personalized outfit recommendations
                powered by Artificial Intelligence,
                tailored to your style, body type,
                favorite color, and budget.

              </p>

            </div>

            <div className="flex gap-4">

              <Link
                href="/style-on"
                className="px-6 py-3 bg-black text-white rounded-full"
              >
                Style On
              </Link>

            </div>

          </div>

          <div>

            <div className="grid grid-cols-2 gap-4">

              <div className="aspect-[3/4] rounded-3xl bg-zinc-200" />

              <div className="aspect-[3/4] rounded-3xl bg-zinc-300 mt-12" />

              <div className="aspect-[3/4] rounded-3xl bg-zinc-300 -mt-12" />

              <div className="aspect-[3/4] rounded-3xl bg-zinc-200" />

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}