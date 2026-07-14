"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-premium bg-white">
      <Container>
        <div className="text-center">
          <p className="text-gold-500 text-7xl font-bold font-heading-en">!</p>
          <h1 className="mt-4 font-heading-ar text-3xl md:text-4xl font-semibold text-navy-900">
            Something went wrong
          </h1>
          <p className="mt-4 text-lg text-warm-600 max-w-md mx-auto">
            An unexpected error occurred. Please try again.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={reset}>
              Try again
            </Button>
            <Button variant="outline" size="lg" href="/">
              Return Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
