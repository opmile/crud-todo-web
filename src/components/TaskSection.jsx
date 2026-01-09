import { useTasksContext } from "./context/TaskProvider"
import Section from "./ui/Section"
import SectionColumn from "./ui/SectionColumn"

export default function TaskSection() {
    const { pendingTasks, completedTasks } = useTasksContext()

    return (
        <Section>
            <SectionColumn title="pending" tasks={pendingTasks} />
            <SectionColumn title="completed" tasks={completedTasks} />
        </Section>
    )
}