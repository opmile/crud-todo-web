import { createContext, useContext, useState } from "react"  

const ModalContext = createContext(null)

export function useModal() { // open a portal for the modal (consumers will use this hook to access the context)
    const context = useContext(ModalContext) 

    if (!context) {
        throw new Error("useModal must be used within Modal.Root")
    }

    return context
}

const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    // 'create' | 'edit'
    const [mode, setMode] = useState("create")
    // { id, title } | null
    const [editableTask, setEditableTask] = useState(null) // set the current task being edited

    const openCreateModal = () => {
        setMode("create")
        setEditableTask(null)
        setIsOpen(true)
    }

    const openEditModal = (task) => {
        setMode("edit")
        setEditableTask(task)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setMode("create")
        setEditableTask(null)
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                mode,
                editableTask,
                openCreateModal,
                openEditModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    )  
}

export default ModalProvider