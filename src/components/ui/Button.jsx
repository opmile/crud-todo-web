export default function Button({
  variant,
  onClick,
  children,
  className = "",
  ...props
}) {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-green-600 text-white hover:bg-green-700",
    cancel: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      variant="primary"
      onClick={onClick}
      className={`px-4 py-2 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 shadow-md text-sm ${className} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
