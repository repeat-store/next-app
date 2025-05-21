import GameProductsPage from '../../../../components/GameproductsPage'; // عدّل المسار حسب مكان الملف

export default function Page({ params }) {
  return <GameProductsPage gameId={params.id} />;
}
