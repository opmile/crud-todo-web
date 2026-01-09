export default function Checkbox({ checked, onChange }) {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
    )
}