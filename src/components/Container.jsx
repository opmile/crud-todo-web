export default function Container({ children }) {
    return (
        <div className="mt-10 p-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
            {children}
        </div>
    )
}