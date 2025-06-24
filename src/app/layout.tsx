import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "../components/Header/ConditionalHeader";
import { CheckoutProvider } from '../components/Game_Top_Up_Components/CheckoutContext';
import { ThemeProvider } from "@/components/Header/ThemeContext";
import { Toaster } from 'react-hot-toast';
import TransitionProvider from '../components/TransitionProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'متجر ريبيت استور',
  description:
    'متجر ريبيت استور: متجر سوداني يوفر خدمة شحن مختلف الالعاب الالكترونية والبطاقات الرقمية باسعار منافسة وكمان بنوفر رومات ومسابقات يمكن من خلالها الفوز بشدات مجانا',
  metadataBase: new URL('https://repeat-store.com'),

  openGraph: {
    title: 'متجر ريبيت استور',
    description:
      'متجر ريبيت استور: متجر سوداني يوفر خدمة شحن مختلف الالعاب الالكترونية والبطاقات الرقمية باسعار منافسة وكمان بنوفر رومات ومسابقات يمكن من خلالها الفوز بشدات مجانا',
    url: 'https://repeat-store.com',
    siteName: 'Repeat Store',
    images: [
      {
        url: 'https://repeat-store.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Repeat Store',
      },
    ],
    locale: 'ar_SD',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
  },

  icons: {
    icon: '/r-s.png',
  },

  other: {
    facebook: 'https://www.facebook.com/profile.php?id=61576000674601',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <head>

        {/* ✅ Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5XBXT12TLK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5XBXT12TLK');
            `,
          }}
        />


        {/* ✅ Tags خاصة بالـ PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Repeat Store" />
        <meta name="application-name" content="Repeat Store" />
        <link rel="apple-touch-icon" href="/r-s.png" />
        <link rel="icon" href="/r-s.png" type="image/png" /> 
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TransitionProvider>
          <Toaster position="top-center" />
          <ThemeProvider>
            <ConditionalHeader />
            <CheckoutProvider>
              {children}
            </CheckoutProvider>
          </ThemeProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
