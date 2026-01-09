import { useModal } from "./context/ModalProvider";
import { useTasksContext } from "./context/TaskProvider";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function Form({ children }) {
    const { closeModal } = useModal()
    const { createTask } = useTasksContext()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const taskDescription = formData.get("taskDescription");

        createTask(taskDescription);
        e.target.reset();

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