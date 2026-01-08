import Container from "./components/Container"
import Modal from "./components/ui/Modal"
import Typography from "./components/ui/Typography"
import OpenModalButton from "./components/ui/OpenModalButton"

function App() {
  return (
    <Container>
      <Typography variant="h1">Welcome to the App</Typography>
      <Typography variant="body">This is a sample application.</Typography>


      <Modal.Root>
        <Modal.Header>
          <Typography variant="h2">Modal Title</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="body">This is the content of the modal.</Typography>
        </Modal.Body>
        <Modal.Footer/>
      </Modal.Root>
    </Container>
  )
}

export default App
