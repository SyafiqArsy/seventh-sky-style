import Image from "next/image";

export function GallerySection() {
  return (
    <section className="pb-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Image
            src="/fashion/fashion-1.jpg"
            alt=""
            width={800}
            height={1000}
            className="rounded-3xl object-cover"
          />

          <Image
            src="/fashion/fashion-2.jpg"
            alt=""
            width={800}
            height={1000}
            className="rounded-3xl object-cover"
          />

          <Image
            src="/fashion/fashion-3.jpg"
            alt=""
            width={800}
            height={1000}
            className="rounded-3xl object-cover"
          />

          <Image
            src="/fashion/fashion-4.jpg"
            alt=""
            width={800}
            height={1000}
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}