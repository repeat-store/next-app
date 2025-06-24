
import GooglePlayPurchase from './GooglePlayPurchase';

export async function generateMetadata({ params }) {
  const name = decodeURIComponent(params.name);
  const cardNameArabic = {
    "google-play": "بطاقات قوقل بلاي",
    "apple-card": "بطاقات آبل",
    "amazon": "بطاقات امازون ",
    "noon": "بطاقات نون ",
    "roblox": "بطاقات روبلوكس ",
    "playstation": "بطاقات بلاستيشن ",
    "paypal": "رصيد باي بال",
    // أضف ترجمات أخرى حسب البطاقات
  }[name] || `بطاقة ${name}`;

  const title = `شراء ${cardNameArabic} في السودان - أسعار منافسة وتوصيل فوري`;
  const description = `اشترِ ${cardNameArabic}  بأسعار منافسة في السودان 💳، ادفع عبر بنكك أو ماي كاشي أو فوري، واستلم الكود فورًا عبر واتساب أو الإيميل او من الموقع مباشرة.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'ar_SD',
      type: 'website',
      url: `https://repeat-store.com/card/${name}`, // غيّر الرابط حسب موقعك
      images: [
        {
          url: `/images/card/${name}.webp`,
          width: 1200,
          height: 630,
          alt: `${cardNameArabic} في السودان`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/card/${name}.webp`],
    },
    metadataBase: new URL('https://repeat-store.com'), // غيّرها للدومين الحقيقي
  };
}


export default function Page() {
  return <GooglePlayPurchase />;
}
