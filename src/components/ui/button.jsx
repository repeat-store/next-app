export function Button({ children, onClick, className = '', type = 'button', variant = 'default' }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600",
    outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 focus:ring-gray-400 dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className} px-5 py-2.5`}
    >
      {children}
    </button>
  );
}
