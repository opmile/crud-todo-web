import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between mb-2">
                    <TaskItem task={task} />
                </li>
            ))}
        </ul>
    )
}