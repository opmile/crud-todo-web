import { useModal } from "../context/ModalProvider"
import Button from "./Button"

export default function OpenModalButton({ className = '' }) {
    const { openModal } = useModal()
    
    return (
        <Button
            onClick={openModal}
            className={`px-4 py-2 ml-1 bg-blue-600 text-white rounded-full transition-all duration-400 hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-500 ${className}`}
        >
            add
        </Button>
    )
}