import Modal from "./ui/Modal"
import Typography from "./ui/Typography"

export default function Toolbar() {
    return (
        <Modal.Root>
        <Modal.Header>
          <Typography variant="h2">Modal Title</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="body">This is the content of the modal.</Typography>
        </Modal.Body>
        <Modal.Footer/>
      </Modal.Root>
    )
}

