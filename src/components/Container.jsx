export default function Container({ children }) {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 flex flex-col justify-start items-start gap-2">
            {children}
        </div>
    )
}