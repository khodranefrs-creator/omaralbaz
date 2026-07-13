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
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-ar",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-en",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-en",
  weight: ["300", "400", "500", "600", "700"],
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
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
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
        <Header dict={dict} locale={locale} />
        <main className="flex-1">{children}</main>
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
