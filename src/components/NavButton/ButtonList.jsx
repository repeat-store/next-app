'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faHeadset, faTrophy} from '@fortawesome/free-solid-svg-icons';
 

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isTournamentsPage = pathname?.startsWith('/pubg-battle');

//   const playSwordSound = () => {
//     const audio = new Audio();
//     audio.play();
//   };

  return (
    <div
      className="fixed bottom-0 left-0 w-full rounded-t-lg bg-gray-100 dark:bg-gray-950 flex justify-around items-center py-3 shadow-md border-t borderblack z-6"
      style={{ direction: 'rtl' }}
    >
      <Link
        href="/"
        className={`flex flex-col items-center text-xs font-medium transition-all ${
          pathname === '/'
            ? 'text-cyan-700 scale-110 dark:text-lime-400'
            : 'text-gray-600 hover:text-cyan-700 hover:dark:text-lime-400'
        }`}
      >
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="mt-1">الرئيسية</span>
      </Link>

      <Link
        href="/my_orders"
        className={`flex flex-col items-center text-xs font-medium transition-all ${
          pathname === '/my_orders'
            ? 'text-cyan-700 scale-110 dark:text-lime-400'
            : 'text-gray-600 hover:text-cyan-700 hover:dark:text-lime-400'
        }`}
      >
        <FontAwesomeIcon icon={faShoppingBag} size="lg" />
        <span className="mt-1">طلباتي</span>
      </Link>

      {/* <Link
        href="/my_orders"
        className={`flex flex-col items-center text-xs font-medium transition-all ${
          pathname === '/my_orders'
            ? 'text-cyan-700 scale-110 dark:text-lime-400'
            : 'text-gray-600 hover:text-cyan-700 hover:dark:text-lime-400'
        }`}
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
        <span className="mt-1">طلباتي</span>
      </Link> */}

<a
  href="https://wa.me/966575248673"      // ضع هنا رقم الواتساب مع رمز البلد بدون +
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center text-xs font-medium text-gray-600 hover:text-green-500 hover:dark:text-lime-400 transition-all"
>
  <FontAwesomeIcon icon={faHeadset} size="lg" />
  <span className="mt-1">الدعم</span>
</a>
       
      <div
        onClick={() => {
        //   playSwordSound();
          router.push('/pubg-battle');
        }}
        className={`flex flex-col items-center text-xs font-medium transition-all cursor-pointer ${
          isTournamentsPage
            ? 'text-cyan-700 scale-110 dark:text-lime-400'
            : 'text-gray-600 hover:text-cyan-700 hover:dark:text-lime-400'
        }`}
      >
        <FontAwesomeIcon icon={faTrophy} size="lg" />
        <span className="mt-1">بطولات ببجي</span>
      </div>
    </div>
  );
}
