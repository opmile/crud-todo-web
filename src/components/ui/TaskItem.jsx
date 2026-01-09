import { useTasksContext } from "../context/TaskProvider"
import Checkbox from "./Checkbox"

export default function TaskItem({ task }) {
    const { toggleTaskCompletion } = useTasksContext()

    return (
        <div className="flex items-center">
            <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.title}
            </span>
        </div>
    )
}