import { useEffect, useRef } from "react"
import ModalProvider, { useModal } from "../context/ModalProvider"
import Button from "./Button"
import OpenModalButton from "./OpenModalButton"

const Root = ({ children }) => {
    return (
        <ModalProvider>
            <OpenModalButton/>
            <ModalContent>{children}</ModalContent>
        </ModalProvider>
    )
}

const ModalContent = ({ children }) => {
    const { isOpen, closeModal } = useModal()

    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) return
        isOpen ? dialog.showModal() : dialog.close()
    }, [isOpen])

   return (
    <div>
        <dialog
            ref={dialogRef}
            onClose={closeModal}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0 m-0 border-0 rounded-lg shadow-lg w-11/12 max-w-lg"
            >
            {children}
        </dialog>
    </div>
   )
}

const Header = ({ children }) => {
    return (
        <div className="p-4 border-b border-gray-300">
            {children}
        </div>
    )
}

const Body = ({ children }) => {
    return (
        <div className="p-4">
            {children}
        </div>
    )
}

const Footer = ({ children }) => {
    const { closeModal } = useModal()
    
    return (
        <div className="p-4 border-t border-gray-300 flex justify-end space-x-2">
            <Button onClick={closeModal}>Close</Button>
            {children}
        </div>
    )
}

const Modal = {
    Root,
    Header,
    Body,
    Footer
}

export default Modal