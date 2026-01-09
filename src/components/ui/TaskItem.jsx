import { useTasksContext } from "../context/TaskProvider"
import Checkbox from "./Checkbox"
import IconContainer from "./IconContainer"

export default function TaskItem({ task }) {
    const { toggleTaskCompletion } = useTasksContext()

    return (
        <div className="flex items-center justify-around gap-4 w-full">
            <div className="flex items-center">
                <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                />
                <span
                    className={`leading-none ${task.completed ? "line-through text-gray-500" : ""}`}
                >
                    {task.title}
                </span>
            </div>
            <IconContainer taskId={task.id} currentTitle={task.title} />
        </div>
    )
}