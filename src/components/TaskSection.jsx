import { useTasksContext } from "./context/TaskProvider"
import Section from "./ui/Section"
import SectionColumn from "./ui/SectionColumn"

export default function TaskSection() {
    const { pendingTasks, completedTasks } = useTasksContext()

    return (
        <Section>
            <SectionColumn title="Pending Tasks" tasks={pendingTasks} />
            <SectionColumn title="Completed Tasks" tasks={completedTasks} />
        </Section>
    )
}