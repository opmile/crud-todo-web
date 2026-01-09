import { useModal } from "../context/ModalProvider"
import Button from "./Button"

export default function OpenModalButton({ className = '' }) {
    const { openCreateModal } = useModal()
    
    return (
        <Button
            onClick={openCreateModal}
            variant="primary"
            className="self-center"
            >
            + new task
        </Button>
    )
}