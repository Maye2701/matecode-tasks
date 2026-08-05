import type { Task } from "../../types/task"
import TaskItem from "./TaskItem"

interface TaskListProps {
    tasks: Task[]
    onToggleTask: (id: string) => void
    onDeleteTask: (id: string) => void
    onUpdateTask: (id: string, title: string, description: string) => void
}

function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTask }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <p>Todavia no hay tareas</p>
        )
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                />
            ))}
        </ul>
    )
}

export default TaskList