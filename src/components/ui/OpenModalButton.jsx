import { useModal } from "../context/ModalProvider"
import Button from "./Button"

export default function OpenModalButton({ className = '' }) {
    const { openModal } = useModal()
    
    return (
        <Button
            onClick={openModal}
            className={`px-4 py-2 bg-green-600 text-white rounded-full transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 self-center ${className}`}
        >
            Open
        </Button>
    )
}