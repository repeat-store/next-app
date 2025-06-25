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
    icon: '/favicon.ico',
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
        <link rel="apple-touch-icon" href="/favicon.ico" />
 

        {/*  Favicon icon  */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />

          {/*  PNG Icons for various devices and screen sizes --> */}
          <link rel="icon" type="image/png" sizes="48x48" href="/.icons/48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/.icons/72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/.icons/96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/.icons/128x128.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/.icons/144x144.png" />
          <link rel="icon" type="image/png" sizes="152x152" href="/.icons/152x152.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/.icons/192x192.png" />


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
