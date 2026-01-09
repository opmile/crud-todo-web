import { useModal } from "../context/ModalProvider"
import Button from "./Button"

export default function OpenModalButton({ className = '' }) {
    const { openModal } = useModal()
    
    return (
        <Button
            onClick={openModal}
            className={`text-sm bg-blue-600 text-white rounded-full transition-all duration-400 hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-500 self-center ${className}`}
        >
            add new
        </Button>
    )
}