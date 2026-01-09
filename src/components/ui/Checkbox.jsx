export default function Checkbox({ checked, onChange }) {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mr-2 w-3 h-3 cursor-pointer hover:scale-110 transition-transform duration-400"
        />
    )
}