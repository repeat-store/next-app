import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-purple-800 via-indigo-900 to-black text-white dark:text-gray-200 px-6 py-12 text-right direction-rtl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-base">
        
        {/* عن المتجر */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-pink-300">
            🎮 Rebeat Store - ريبيت استور
          </h3>
          <p className="text-gray-100">
            ريبيت ستور هو متجر إلكتروني سوداني شغّال 24/7، متخصص في شحن الألعاب
            والبطاقات الرقمية زي شدات ببجي، جواهر فري فاير، وبطاقات جوجل بلاي.
          </p>
          <p className="mt-3 text-gray-100">
            عندنا طرق دفع مريحة زي بنكك، ماي كاشي، وPayPal للمشترين من الخارج.
            بنوفر دعم فوري، ونظام تذاكر للمشاركة في البطولات والفوز بجوايز ضخمة.
          </p>
        </div>

        {/* بطولات ببجي */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-yellow-400">
            🏆 بطولات ببجي (قريبًا)
          </h3>
          <p className="text-gray-100">
            قريب جداً حنبدأ بطولات ببجي بنظام الرومات، بجوايز زي الشدات
            والرويال باس.
          </p>
          <p className="mt-3 text-gray-100">
         طريقة المشاركة سهلة:  لما تشتري أي منتج من منتجات ببجي من المتجر،
            بتتحصل على تذاكر بتقدر تشارك بيها في الرومات للفوز بمزيد من الشدات 

          </p>
          <p className="mt-3 text-gray-100">
            تابعنا عشان تعرف مواعيد البطولات وتفاصيلها أول بأول.
          </p>
        </div>

        {/* رؤيتنا */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-cyan-400">
            🎯 رؤيتنا
          </h3>
          <p className="text-gray-100">
            هدفنا نكون الوجهة الأولى في السودان لشحن الألعاب والبطاقات الرقمية،
            ونوفر ليكم خدمة سريعة، مضمونة، وبأسلوب احترافي يناسب كل الزباين.
          </p>
        </div>

        {/* الأمان والحماية */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-green-400">
            🔒 الأمان والدعم
          </h3>
          <p className="text-gray-100">
             في ريبيت ستور، بنهتم بأمانك وخصوصيتك. عشان كدا بنستخدم شهادة SSL
            لتأمين الاتصال بينك وبين السيرفر، وكمان بنشفّر كلمات السر قبل ما
            تتبعت، عشان نضمن ليك حماية كاملة.

          </p>
        </div>
      </div>

      {/* خط فاصل + حقوق النشر */}
      <div className="mt-12 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Rebeat Store - جميع الحقوق محفوظة | متجر شحن ألعاب وبطاقات رقمية
      </div>
    </footer>
  );
};

export default Footer;
