import { useModal } from "./context/ModalProvider";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function Form({ children }) {
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();
        // form submission: logic can be added here   
        // task context needs to be created to handle tasks submissions (add task)

        closeModal()
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="taskDescription"
                id="taskDescription"
                required
            />
            <Button type="submit" className="ml-1 rounded-xl">Add Task</Button>
        </form>
    )
}