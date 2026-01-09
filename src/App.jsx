import Container from "./components/Container"
import Typography from "./components/ui/Typography"
import Toolbar from "./components/Toolbar"
import TaskSection from "./components/TaskSection"

function App() {
  return (
    <Container>
      <div className="flex flex-col items-baseline gap-1">
        <Typography variant="h1">your tasks for today...</Typography>
        <Typography variant="body" className="self-center">all you need done in one simple page</Typography>
        <Toolbar/>  
      </div>


      <TaskSection/>
    </Container>
  )
}

export default App
