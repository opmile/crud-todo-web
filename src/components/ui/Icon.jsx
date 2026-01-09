export default function Icon({ src, alt, onClick, className = "" }) {

    return (
        <img
            src={src}
            alt={alt}
            className={`object-contain hover:opacity-90 opacity-50 transition-opacity duration-400 cursor-pointer ${className || "w-4 h-4"}`}
            loading="lazy"
            decoding="async"
            onClick={onClick}
        />
    )
}