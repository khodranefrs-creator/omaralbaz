import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.footer.termsOfUse,
    description: dict.meta.description,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading title={dict.footer.termsOfUse} light />
        </Container>
      </section>
      <section className="bg-white section-premium">
        <Container>
          <div className="max-w-3xl space-y-6 text-warm-600 leading-relaxed">
            <p>
              Welcome to the Omar Al Baz Law Office &amp; Legal Consultancy
              website. By accessing or using this website, you agree to be bound
              by these Terms of Use.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              No Legal Advice
            </h2>
            <p>
              The content on this website is for general informational purposes
              only and does not constitute legal advice. You should not rely on
              any information on this website as a substitute for professional
              legal advice.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              images, is the property of Omar Al Baz Law Office &amp; Legal
              Consultancy and is protected by applicable intellectual property
              laws.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Limitation of Liability
            </h2>
            <p>
              We shall not be liable for any damages arising from your use of
              this website or reliance on any information provided herein.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Contact
            </h2>
            <p>
              For questions regarding these Terms of Use, please contact us at
              lawyeromarelbaz1@gmail.com.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
