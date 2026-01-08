export default function Button({ onClick, children, className = '', ...props }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}