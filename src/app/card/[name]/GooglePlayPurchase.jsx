'use client';

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from '../../../lib/domen';
import Checkout from "./Checkout";
import Cookies from 'js-cookie';
import AuthSection from '../../../components/AuthSection';

export default function GooglePlayPurchase() {
  const { name } = useParams();
  const [countries, setCountries] = useState([]);
  const [cards, setCards] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("whatsapp");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [selectedPaymentImage, setSelectedPaymentImage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const authRef = useRef();


  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/cards?name=${name}`);
        if (!res.ok) throw new Error("فشل الاتصال بالخادم");
        const data = await res.json();
        setCountries(data.countries);
        setCards(data.cards);

        
      // ✅ التحديد التلقائي للدولة إذا كانت واحدة فقط
      if (data.countries.length === 1) {
        setSelectedCountry(data.countries[0].code);
      }
       
      } catch (err) {
        toast.error("فشل تحميل بيانات البطاقة.");
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchCardData();
  }, [name]);

   useEffect(() => {
    const handleClickOutside = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) {
        setShowAuth(false)
      }
    }

    if (showAuth) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAuth])


  const handleSubmit = () => {
    if (!Cookies.get('refresh_token')) {
      setShowAuth(true)
      return
    }

    if (countries.length > 1 && !selectedCountry) return toast.error("يرجى اختيار الدولة");
    if (!selectedCard) return toast.error("يرجى اختيار البطاقة");
    if (!whatsapp.trim()) return toast.error("يرجى إدخال رقم الواتساب");
    if (deliveryMethod === "email" && !email.trim()) return toast.error("يرجى إدخال البريد الإلكتروني");
    if (!selectedPaymentImage) return toast.error("يرجى اختيار طريقة الدفع");

    toast.success("✅ تم التحقق من المدخلات بنجاح!");
    setShowSummary(true);
  };

  const formData = {
    countryCode: selectedCountry,
    countryName: countries.find((c) => c.code === selectedCountry)?.name || "",
    cardValue: selectedCard?.value,
    cardPrice: selectedCard?.price,
    card_id: selectedCard?.id,
    deliveryMethod,
    whatsapp,
    email,
    paymentMethod: selectedPaymentImage,
    name,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 text-center" dir="rtl">
        <motion.div
          className="flex space-x-2 rtl:space-x-reverse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-lg font-semibold text-gray-800 dark:text-gray-100"
        >
        </motion.p>
      </div>
    );
  }


  if (showSummary) {
    return <Checkout formData={formData} onBack={() => setShowSummary(false)} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-2 space-y-6 text-right transition-all duration-500 mt-20" dir="rtl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Image
          src={`/images/card/${name}.webp`}
          alt={`${name} Banner`}
          width={1200}
          height={400}
          className="rounded-2xl shadow-lg object-cover w-full"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
          <CardContent className="space-y-5 py-6">
            {/* اختيار الدولة */} 
            {countries.length > 1 && (
              <div className="relative">
                <label className="font-semibold block mb-1">{name === 'paypal' ? 'اختر العملة' : 'اختر الدولة'}</label>
                <Button variant="outline" className="w-full justify-between" onClick={() => setShowCountries((prev) => !prev)}>
                  {selectedCountry ? countries.find((c) => c.code === selectedCountry)?.name : name === 'paypal'
                      ? 'اختر العملة'
                      : 'اختر الدولة'}
                </Button>
                <AnimatePresence>
                  {showCountries && (
                    <motion.ul
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 80 }}
                      className="absolute w-full bg-background dark:bg-gray-800 mt-2 border rounded-md shadow-lg z-20"
                    >
                      {countries.map((c) => (
                        <li key={c.code}>
                          <button
                            className="w-full text-right px-4 py-2 hover:bg-muted dark:hover:bg-gray-700"
                            onClick={() => {
                              setSelectedCountry(c.code);
                              setSelectedCard(null);
                              setShowCountries(false);
                            }}
                          >
                            {c.name}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* البطاقات */}
            {(selectedCountry || countries.length === 1) && cards[selectedCountry || countries[0]?.code] && (
              <>
                <label className="font-semibold block mb-1 mt-2">اختر قيمة البطاقة</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {cards[selectedCountry || countries[0].code].map((card, idx) => (
                    <Button
                      key={idx}
                      variant={selectedCard === card ? "default" : "outline"}
                      onClick={() => setSelectedCard(card)}
                      className="text-sm"
                    >
                      {card.value}
                    </Button>
                  ))}
                </div>

                {/* عرض السعر */}
                {selectedCard?.price && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-center py-3 rounded-md font-bold text-lg"
                  >
                    السعر: {selectedCard.price.toLocaleString('en-US')} جنيه
                  </motion.div>
                )}
              </>
            )}

            {/* التحذير إذا كانت البطاقة Google Play */}
            {selectedCard && name.toLowerCase().includes("google-play") && (
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-100 p-3 rounded-md text-sm">
                ⚠️ تأكد أن الدولة المختارة هي نفس دولة حسابك في Google Play المتجر غير مسئول عن اي مشكلة بسبب اختلاف الدولة.
              </div>
            )}
            {selectedCard && name.toLowerCase().includes("apple-card") && (
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-100 p-3 rounded-md text-sm">
                ⚠️ تأكد أن الدولة المختارة هي نفس دولة حسابك  المتجر غير مسئول عن اي مشكلة بسبب اختلاف الدولة.
              </div>
            )}

            {/* باقي الحقول */}
            {selectedCard && (
              <>
                <div className="mt-3">
                  <label className="font-semibold block mb-2">طريقة استلام الكود</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setDeliveryMethod("whatsapp")}
                      className={`cursor-pointer p-4 rounded-xl border ${
                        deliveryMethod === "whatsapp" ? "bg-green-100 dark:bg-green-900 border-green-500" : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <PhoneIcon className="w-5 h-5 mx-auto" />
                      <span className="block text-center mt-1">واتساب</span>
                    </div>
                    <div
                      onClick={() => setDeliveryMethod("email")}
                      className={`cursor-pointer p-4 rounded-xl border ${
                        deliveryMethod === "email" ? "bg-blue-100 dark:bg-blue-900 border-blue-500" : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <MailIcon className="w-5 h-5 mx-auto" />
                      <span className="block text-center mt-1">الإيميل</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="font-semibold block mb-1">رقم الواتساب</label>
                  <Input type="text" placeholder="مثال: 249XXXXXXXX" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>

                {deliveryMethod === "email" && (
                  <div>
                    <label className="font-semibold block mb-1">البريد الإلكتروني</label>
                    <Input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                )}

                <div>
                  <label className="font-semibold block mb-2 mt-2">اختر طريقة الدفع</label>
                  <div className="grid grid-cols-3 gap-2 ">
                    {[{ id: "bankak", src: "/images/bank/bankak.png" },
                      { id: "mycashey", src: "/images/bank/Mycashey.png" },
                      { id: "forey", src: "/images/bank/forey.png" },
                    ].map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setSelectedPaymentImage(option.id)}
                        className={`cursor-pointer border-2 rounded-xl p-2  transition ${
                          selectedPaymentImage === option.id ? "border-green-500" : "border-gray-300"
                        }`}
                      >
                        <Image src={option.src} alt={option.id} width={300} height={200} className="rounded-md object-cover w-full h-20" />
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4" onClick={handleSubmit}>
                  المتابعة للدفع
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
      {showAuth && (
        // <div ref={authRef} className="inset-0 z-50">
          <AuthSection onClose={() => setShowAuth(false)}/>
        // </div>
      )}
    </div>
  );
}
