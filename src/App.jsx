import Container from "./components/Container"
import Typography from "./components/ui/Typography"
import Toolbar from "./components/Toolbar"

function App() {
  return (
    <Container>
      <Typography variant="h1">Welcome to the App</Typography>
      <Typography variant="body">This is a sample application.</Typography>

      <Toolbar/>
    </Container>
  )
}

export default App
