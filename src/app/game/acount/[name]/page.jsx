// app/section/[name]/page.tsx
import SectionPage from '../../../../components/SectionPage';

export default async function Page({ params }) {
  const resolvedParams = await params; // فك الـ Promise لو params هو Promise
  return <SectionPage name={resolvedParams.name} />;
}
