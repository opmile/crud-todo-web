import Typography from "./Typography";

export default function EmptyState() {
    return (
        <div className="w-full h-full mt-5 flex flex-col items-center justify-center opacity-60 py-10 text-center ">
            <Typography variant="h2" className="mb-2">
                no tasks available
            </Typography>
            <Typography className="mb-4 font-bold text-lg">
                add a new task to get started
            </Typography>
            <Typography className="max-w-sm">
                you can create tasks using the "new task" button. once you have tasks, they will appear here for you to manage and track your progress.
            </Typography>
        </div>
    )
}