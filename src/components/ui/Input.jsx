export default function Input({ ...props }) {
    return (
        <input 
            type="text" 
            placeholder="new task..." 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            {...props}
        />
    )
}