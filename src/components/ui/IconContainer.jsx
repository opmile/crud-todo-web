import Icon from "./Icon"
import { useTasksContext } from "../context/TaskProvider"
import { useModal } from "../context/ModalProvider"

export default function IconContainer({ taskId, currentTitle }) {
    const { deleteTask } = useTasksContext()
    const { openEditModal } = useModal()

    return (
        <div className="ml-auto flex items-center gap-3 sm:gap-2">
            <Icon
                src="/trash-bin.png"
                alt="Delete Icon"
                onClick={() => deleteTask(taskId)}
                className="w-5 h-5 sm:w-4 sm:h-4"
            />
            <Icon
                src="/edit-icon.png"
                alt="Edit Icon"
                onClick={() => openEditModal({ id: taskId, title: currentTitle })}
                className="w-5 h-5 sm:w-4 sm:h-4"
            />
        </div>
    )
}