import Icon from "./Icon"
import { useTasksContext } from "../context/TaskProvider"

export default function IconContainer({ taskId }) {
    const { deleteTask } = useTasksContext()

    return (
        <div className="ml-auto flex items-center gap-1">
            <Icon
                src="/trash-bin.png"
                alt="Delete Icon"
                onClick={() => deleteTask(taskId)}
            />
            <Icon src="/edit-icon.png" alt="Edit Icon" />
        </div>
    )
}