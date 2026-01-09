export default function Container({ children }) {
    return (
        <div className="mt-6 sm:mt-8 md:mt-10 p-3 sm:p-4 max-w-4xl mx-auto w-full flex flex-col items-center gap-6">
            {children}
        </div>
    )
}