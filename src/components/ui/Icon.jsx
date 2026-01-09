export default function Icon({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-4 h-4 object-contain hover:opacity-70 transition-opacity duration-400 cursor-pointer"
            loading="lazy"
            decoding="async"
        />
    )
}