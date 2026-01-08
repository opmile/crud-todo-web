import Form from "./Form"
import Modal from "./ui/Modal"
import Typography from "./ui/Typography"

export default function Toolbar() {
    return (
        <Modal.Root>
        <Modal.Header>
          <Typography variant="h2">for today</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="body">specify new task description</Typography>
          <Form/>
        </Modal.Body>
        <Modal.Footer/>
      </Modal.Root>
    )
}

