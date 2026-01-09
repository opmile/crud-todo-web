export default function Section({ children }) {
    return (
        <section className="w-full bg-gray-100 rounded-lg shadow-md p-6 flex gap-10">
            {children}
        </section>
    )
}