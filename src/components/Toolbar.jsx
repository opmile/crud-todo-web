import Form from "./Form"
import Modal from "./ui/Modal"

export default function Toolbar() {
    return (
      <Modal.Root>
        <Modal.Header/>
        <Modal.Body>
          {/* form shows mode-dependent hint and input */}
          <Form />
        </Modal.Body>
        <Modal.Footer />
      </Modal.Root>
    )
}

