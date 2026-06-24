import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SITE = "https://wieedze.com"; // production domain (GitHub Pages custom domain)

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Maxime Saint-Joannis, builder, learning in public",
    template: "%s · Wieedze",
  },
  description:
    "Full-stack & smart-contract developer in the Intuition / crypto ecosystem. I build products in the open: Sofia, ARP, and more. An experimenter documenting the work as it happens.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Wieedze",
    title: "Maxime Saint-Joannis, builder, learning in public",
    description:
      "I build crypto products in public. Sofia (in prod), ARP, and continuous explorations.",
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
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
