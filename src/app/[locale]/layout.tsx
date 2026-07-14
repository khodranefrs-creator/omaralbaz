import type { Metadata } from "next";
import {
  Noto_Naskh_Arabic,
  Noto_Sans_Arabic,
  Playfair_Display,
  Inter,
} from "next/font/google";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE_URL, CONTACT, SOCIAL } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-heading-ar",
  weight: ["400", "700"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-ar",
  weight: ["400", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-en",
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-en",
  weight: ["400", "700"],
  display: "swap",
});

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
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.title}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: SITE_URL,
      siteName: dict.meta.title,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/omarlogo.png`,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${SITE_URL}/images/omarlogo.png`],
    },
    alternates: {
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${notoNaskhArabic.variable} ${notoSansArabic.variable} ${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-warm-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:bg-gold-500 focus:text-navy-950 focus:px-4 focus:py-2 focus:font-semibold focus:outline-none"
        >
          Skip to content
        </a>
        <Header dict={dict} locale={locale} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer dict={dict} locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: dict.meta.title,
              description: dict.meta.description,
              url: SITE_URL,
              telephone: CONTACT.phone,
              email: CONTACT.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Riyadh",
                addressRegion: "Riyadh",
                addressCountry: "SA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: CONTACT.coordinates.lat,
                longitude: CONTACT.coordinates.lng,
              },
              sameAs: [
                SOCIAL.instagram,
                SOCIAL.facebook,
                SOCIAL.twitter,
                SOCIAL.googleBusiness,
              ],
              priceRange: "$$$",
              areaServed: {
                "@type": "Country",
                name: "Saudi Arabia",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
