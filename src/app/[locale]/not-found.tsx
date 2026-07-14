import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section-premium bg-white">
      <Container>
        <div className="text-center">
          <p className="text-gold-500 text-7xl font-bold font-heading-en">404</p>
          <h1 className="mt-4 font-heading-ar text-3xl md:text-4xl font-semibold text-navy-900">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg text-warm-600 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href="/">
              Return Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
