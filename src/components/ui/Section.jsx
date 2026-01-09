export default function Section({ children }) {
    return (
        <section className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            {children}
        </section>
    )
}