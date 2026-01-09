import { createContext, useContext, useState } from "react" 

const TaskContext = createContext(null) 

export function useTasksContext() { // open a portal for the task (consumers will use this hook to access the context)
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("useTask must be used within TaskProvider")
    }

    return context
}

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]) 

    const pendingTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)

    const addTask = (task) => 
        setTasks((prevTasks) => {
            const maxId = prevTasks.reduce((max, t) => Math.max(max, t.id), 0)
            return [...prevTasks, { id: maxId + 1, ...task }]
        }) 

    const removeTask = (taskId) => setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)) 

    const toggleTaskCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const createTask = (title) => {
        const newTask = {
            title,
            completed: false,
        }
        addTask(newTask)
    }

    const deleteTask = (id) => {
        removeTask(id)
    }

    const updateTaskText = (id, title) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title } : task
            )
        )
    }
    
    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                toggleTaskCompletion,
                createTask,
                deleteTask,
                updateTaskText,
                pendingTasks,
                completedTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    ) 
}

export default TaskProvider