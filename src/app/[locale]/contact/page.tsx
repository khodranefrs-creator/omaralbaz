import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CONTACT, SOCIAL } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import ContactForm from "@/components/sections/ContactForm";
import ConsultationForm from "@/components/sections/ConsultationForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={dict.contact.title}
            subtitle={dict.contact.subtitle}
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3 space-y-12">
              <ContactForm dict={dict} locale={locale} />

              <GoldDivider maxWidth="4rem" />

              <ConsultationForm dict={dict} locale={locale} />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="border border-warm-200 bg-white p-8">
                <h3 className="font-heading-ar text-2xl font-semibold text-navy-900 mb-6">
                  {dict.contact.officeTitle}
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-warm-500 mb-1">
                      {dict.contact.address}
                    </p>
                    <p className="text-warm-800">
                      {locale === "ar" ? CONTACT.address.ar : CONTACT.address.en}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-warm-500 mb-1">
                      {dict.contact.workingHours}
                    </p>
                    <p className="text-warm-800">{dict.contact.hours}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-warm-500 mb-1">
                      {dict.contact.phone}
                    </p>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-warm-800 hover:text-gold-700 transition-smooth"
                      dir="ltr"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-warm-500 mb-1">
                      {dict.contact.email}
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-warm-800 hover:text-gold-700 transition-smooth break-all"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-warm-200 overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d${CONTACT.coordinates.lng}!3d${CONTACT.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${CONTACT.coordinates.lat},${CONTACT.coordinates.lng}!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa`}
                  width="100%"
                  height={320}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title={dict.contact.officeTitle}
                />
              </div>

              <div>
                <h4 className="font-heading-ar text-lg font-semibold text-navy-900 mb-4">
                  {dict.contact.socialTitle}
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-warm-200 px-4 py-2.5 text-sm text-warm-700 hover:border-gold-600 hover:text-gold-700 transition-smooth"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-warm-200 px-4 py-2.5 text-sm text-warm-700 hover:border-gold-600 hover:text-gold-700 transition-smooth"
                  >
                    Facebook
                  </a>
                  <a
                    href={SOCIAL.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-warm-200 px-4 py-2.5 text-sm text-warm-700 hover:border-gold-600 hover:text-gold-700 transition-smooth"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href={SOCIAL.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-warm-200 px-4 py-2.5 text-sm text-warm-700 hover:border-gold-600 hover:text-gold-700 transition-smooth"
                  >
                    Google Business
                  </a>
                </div>
              </div>

              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-sm transition-smooth text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
