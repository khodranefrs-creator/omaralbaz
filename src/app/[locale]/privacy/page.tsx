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
    title: dict.footer.privacyPolicy,
    description: dict.meta.description,
  };
}

export default async function PrivacyPage({
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
          <SectionHeading title={dict.footer.privacyPolicy} light level={1} />
        </Container>
      </section>
      <section className="bg-white section-premium">
        <Container>
          <div className="max-w-3xl space-y-6 text-warm-600 leading-relaxed">
            <p>
              This Privacy Policy describes how Omar Al Baz Law Office &amp;
              Legal Consultancy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              collects, uses, and protects your personal information when you
              visit our website or use our services.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Information We Collect
            </h2>
            <p>
              We may collect personal information you voluntarily provide when
              filling out our contact or consultation forms, including your name,
              email address, phone number, and any details you share in your
              message.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect to respond to your inquiries,
              provide legal services, and communicate with you about your
              matters. We do not sell or share your personal information with
              third parties for marketing purposes.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your personal
              information. However, no method of transmission over the Internet
              is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h2 className="font-heading-ar text-2xl font-semibold text-navy-900 pt-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at lawyeromarelbaz1@gmail.com.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
