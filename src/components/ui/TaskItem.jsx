import { useTasksContext } from "../context/TaskProvider"
import Checkbox from "./Checkbox"
import Icon from "./Icon"

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
            <div className="ml-auto flex items-center gap-1">
                <Icon src="/trash-bin.png" alt="Delete Icon" />
                <Icon src="/edit-icon.png" alt="Edit Icon" />
            </div>
        </div>
    )
}