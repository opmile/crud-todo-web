import TaskList from "./TaskList";
import Typography from "./Typography";

export default function SectionColumn({ title, tasks }) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-2">
        <Typography variant="h3" className="mb-4">
          {title}
        </Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </Typography>
      </div>
      {tasks.length === 0 && (
        <Typography className="text-gray-500">no tasks available</Typography>
      )}
      <TaskList tasks={tasks} />
    </div>
  );
}
