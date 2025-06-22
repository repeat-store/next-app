export function Input({ type = 'text', value, onChange, placeholder, className = '', ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex w-full h-11 rounded-xl border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 ${className}`}
      {...rest}
    />
  );
}
