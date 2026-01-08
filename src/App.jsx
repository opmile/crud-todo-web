import Container from "./components/Container"
import Typography from "./components/ui/Typography"
import Toolbar from "./components/Toolbar"

function App() {
  return (
    <Container>
      <Typography variant="h1">your tasks for today...</Typography>
      <Typography variant="body">all you need done in one simple page</Typography>

      <Toolbar/>
    </Container>
  )
}

export default App
