import { useEffect, useRef } from "react" 
import { useModal } from "../context/ModalProvider" 
import Button from "./Button" 
import OpenModalButton from "./OpenModalButton" 
import Typography from "./Typography" 

const Root = ({ children }) => {
  return (
    <>
      <OpenModalButton />
      <ModalContent>{children}</ModalContent>
    </>
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
        onCancel={(e) => {
          // prevent browser default which can desync state in some cases
          e.preventDefault() 
          closeModal() 
        }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0 m-0 border-0 rounded-xl shadow-2xl w-11/12 max-w-lg backdrop:bg-black/40 backdrop:backdrop-blur-xs"
      >
        {children}
      </dialog>
    </div>
  ) 
} 

const Header = () => {
  const { mode } = useModal() 
  const defaultTitle = mode === "edit" ? "edit task" : "for today" 

  return (
    <div className="p-4 border-b border-gray-300">
      <Typography variant="h2">{defaultTitle}</Typography>
    </div>
  )
}

const Body = ({ children }) => {
  return <div className="p-4 flex flex-col gap-2">{children}</div>
}

const Footer = () => {
  const { closeModal, mode } = useModal() 
  const primaryLabel = mode === "edit" ? "save" : "add" 

  return (
    <div className="p-4 border-t border-gray-300 flex justify-end space-x-2">
      <Button variant="cancel" onClick={closeModal}>
        cancel
      </Button>
      <Button variant="secondary" type="submit" form="task-form">
        {primaryLabel}
      </Button>
    </div>
  )
}

const Modal = {
  Root,
  Header,
  Body,
  Footer,
} 

export default Modal 
