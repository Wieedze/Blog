import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const SITE = "https://wieedze.com"; // production domain (GitHub Pages custom domain)

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Maxime Saint-Joannis, builder, learning in public",
    template: "%s · Wieedze",
  },
  description:
    "Full-stack & web3 junior developer. I build products in the open across the Intuition and Circles ecosystems: Sofia, OurGlass, TheKitty, ARP, and more. An experimenter documenting the work as it happens.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Wieedze",
    title: "Maxime Saint-Joannis, builder, learning in public",
    description:
      "I build web3 products in public: Sofia, OurGlass, TheKitty, ARP, and more. Documenting the work as it happens.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@MoodzMaxime",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // suppressHydrationWarning: the Sofia extension injects data-sofia-extension
  // on <html> before hydration; only attribute diffs on this tag are ignored.
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
