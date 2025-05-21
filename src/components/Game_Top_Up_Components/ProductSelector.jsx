'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import QuantityCounter from './Counter';

export default function ProductSelector({ products, onSelect, selected }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // الكمية

  useEffect(() => {
    onSelect(null)
    setQuantity(1)
  }, [products])

  const options = Array.isArray(products)
    ? products.map(product => ({
        label: product.value,
        price: product.price,
        id: product.productID,
        tickets: product.tickets
      }))
    : [];

  const handleSelect = (option) => {
    setOpen(false);
    const fullData = {
      ...option,
      quantity,
      total: option.price * quantity
    };

    if (onSelect) {
      onSelect(fullData);
    }
  };

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
    if (selected?.label && selected?.price && onSelect) {
      onSelect({
        label: selected.label,
        tickets: selected.tickets,
        price: selected.price,
        quantity: newQty,
        total: selected.price * newQty,
        id: selected.id
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-950 dark:bg-blue-900 text-white p-3 rounded-lg mb-2.5"
      >
        {selected ? `الفئة: ${selected.label}` : "اختر المنتج"}
        <FontAwesomeIcon icon={faAngleLeft} className="mr-3 -rotate-90 duration-200" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              style={{ backgroundColor: "#000000c9" }}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 rounded-t-3xl p-6 z-50 max-h-[70vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 40 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold dark:text-white">اختر المنتج</h2>
                <button onClick={() => setOpen(false)} className="text-2xl dark:text-gray-100">&times;</button>
              </div>

              {options.map((option, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b dark:border-gray-500">
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="product"
                      checked={selected?.label === option.label}
                      onChange={() => handleSelect(option)}
                      className="accent-pink-600 w-5 h-5"
                    />
                    <div className="flex-1 text-right dark:text-gray-50" dir='ltr'>
                      {option.tickets > 0 ? `🎟️${option.tickets} + ${option.label}` : option.label}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">{option.price} جنيه</div>
                  </label>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {selected && (
        <div className="mt-4 dark:text-gray-50">
          <p>
            الفئة المختارة :
            <strong dir="ltr">
              {selected.tickets > 0 ? ` 🎟️${selected.tickets} + ${selected.label}` : ` ${selected.label}`}
            </strong>
          </p>
          <p>السعر : <strong>{selected.price} جنيه</strong></p>
          <QuantityCounter value={quantity} onChange={handleQuantityChange} />
          <p className="mt-2">الإجمالي : <strong>{selected.price * quantity} جنيه</strong></p>
        </div>
      )}
    </div>
  );
}
