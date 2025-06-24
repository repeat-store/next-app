import SectionPage from '../../../../components/SectionPage';
import { API_BASE_URL } from '../../../../lib/domen';

// ✅ جلب البيانات مرة وحدة
async function getSectionData(name) {
  const res = await fetch(`${API_BASE_URL}/api/game?name=${name}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('فشل في تحميل البيانات');
  return res.json();
}

// ✅ metadata
export async function generateMetadata({ params }) {
  try {
    const data = await getSectionData(params.name);

    return {
      title: `شحن  ${data.nameAR} - متجر ريبيت استور`,
      description: `شحن ${data.nameAR} بأفضل الأسعار من ريبيت استور داخل السودان.`,
      openGraph: {
        title: `${data.nameAR} - متجر ريبيت استور`,
        description: `اشحن الآن ${data.nameAR} بأفضل الأسعار وخدمة موثوقة.`,
        images: [
          {
            url: `https://repeat-store.com/images/home/account/${params.name}.webp`,
            width: 1200,
            height: 630,
            alt: data.nameAR,
          },
        ],
        type: 'website',
        siteName: 'Repeat Store',
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  } catch {
    return {
      title: 'قسم غير موجود - ريبيت استور',
      description: 'عذرًا، لم نتمكن من تحميل بيانات هذا القسم.',
    };
  }
}

// ✅ صفحة القسم
export default async function Page({ params }) {
  const data = await getSectionData(params.name);

  return <SectionPage name={params.name} products={data.products} sectionName={data.nameAR} />;
}
