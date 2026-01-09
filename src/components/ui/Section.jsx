export default function Section({ children }) {
    return (
        <section className="w-full p-3 sm:p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8">
            {children}
        </section>
    )
}