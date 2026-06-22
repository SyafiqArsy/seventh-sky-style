export function HowItWorks() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold">
          How It Works
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">
              01. Tell Us About Yourself
            </h3>

            <p className="mt-3 text-zinc-600">
              Input your style preferences,
              body profile, favorite colors,
              and occasion.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              02. AI Analysis
            </h3>

            <p className="mt-3 text-zinc-600">
              Gemini analyzes your profile
              and Recommendation Engine
              scores every outfit.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              03. Get Your Style
            </h3>

            <p className="mt-3 text-zinc-600">
              Receive fashion advice,
              outfit recommendations,
              and AI-generated visualization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}