import { useTasksContext } from "./context/TaskProvider";
import Divisor from "./ui/Divisor";
import EmptyState from "./ui/EmptyState";
import Section from "./ui/Section";
import SectionColumn from "./ui/SectionColumn";

export default function TaskSection() {
  const { pendingTasks, completedTasks } = useTasksContext();

  const isEmpty = pendingTasks.length === 0 && completedTasks.length === 0

  return (
    <Section>
      {isEmpty ? (
        <EmptyState/>
      ) : (
        <>
          <SectionColumn title="pending" tasks={pendingTasks} />
          <Divisor />
          <SectionColumn title="completed" tasks={completedTasks} />
        </>
      )}
    </Section>
  );
}
