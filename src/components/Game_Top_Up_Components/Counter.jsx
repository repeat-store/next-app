"use client"
 

export default function QuantityCounter({ value = 1, onChange }) {
  // const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (value < 10) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      onChange( value - 1);
    }
  };

  return (
    <div className="flex items-center justify-center m-auto mt-2.5 mb-5 space-x-4 bg-gray-200 dark:bg-gray-700 rounded-3xl p-1 w-fit mx-auto">
      <button
        onClick={increment}
        className="text-xl h-7 w-7 rounded-full bg-white dark:bg-gray-900 shadow hover:bg-gray-300 active:scale-95 transition-transform duration-150 ease-in-out overflow-hidden"
      >
        +
      </button>

      <span className="text-xl font-semibold">{value}</span>

      <button
        onClick={decrement}
        className="text-xl h-7 w-7  rounded-full bg-white shadow dark:bg-gray-900 hover:bg-gray-300 active:scale-100 transition-transform duration-150 ease-in-out"
      >
        -
      </button>
    </div>
  );
}
