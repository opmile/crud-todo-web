import { useEffect, useState } from "react";
import { useModal } from "./context/ModalProvider";
import { useTasksContext } from "./context/TaskProvider";
import Input from "./ui/Input";
import Typography from "./ui/Typography";

export default function Form() {
    const { closeModal, mode, editableTask, isOpen } = useModal()
    const { createTask, updateTaskText } = useTasksContext()

    const [value, setValue] = useState("")

    useEffect(() => {
        // when modal closes, always clear the field
        if (!isOpen) {
            setValue("")
            return
        }

        // when modal opens, prefill only for edit mode
        if (mode === "edit" && editableTask) {
            setValue(editableTask.title ?? "")
        } else {
            setValue("")
        }
    }, [isOpen, mode, editableTask])

    const handleSubmit = (e) => {
        e.preventDefault()

        const trimmed = value.trim()
        if (!trimmed) return

        if (mode === "edit") {
            if (!editableTask) return
            updateTaskText(editableTask.id, trimmed)
        } else {
            createTask(trimmed)
        }

        closeModal()
    }

    const helpText = mode === "edit" 
    ? "update task description" 
    : "specify new task description"

    return (
        <form 
            id="task-form" 
            onSubmit={handleSubmit} 
            className="space-y-4"
            >
            <Typography className="text-sm text-gray-600">{helpText}</Typography>
            <Input
                name="taskDescription"
                id="taskDescription"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                    mode === "edit" 
                    ? "edit task..." 
                    : "new task..."}
                required
            />
        </form>
    )
}