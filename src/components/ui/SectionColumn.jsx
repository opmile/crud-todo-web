import TaskList from "./TaskList";
import Typography from "./Typography";

export default function SectionColumn({ title, tasks }) {
    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
            <Typography variant="h2" className="mb-4">{title}</Typography>
            <TaskList tasks={tasks} />
        </div>
    )
}