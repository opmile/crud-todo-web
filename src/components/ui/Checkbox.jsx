export default function Checkbox({ ...props }) {
    // remember to import states:
    // 1. checked={isChecked}
    // 2. onChange={(e) => setIsChecked(e.target.checked)} == toggle function

    return (
        <input 
            type="checkbox" 
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            {...props}
        />
    )
}