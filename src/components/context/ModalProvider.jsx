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

    const openModal = () => setIsOpen(true)  
    const closeModal = () => setIsOpen(false)  

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )  
}

export default ModalProvider  