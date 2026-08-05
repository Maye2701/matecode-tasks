import { useState } from 'react'
import type { Task } from '../types/task'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'

function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([])

    function handleUpdateTask(id: string, newTitle: string, newDescription: string) {
        setTasks(currentTasks => currentTasks.map(task =>
            task.id === id
                ? { ...task, title: newTitle, description: newDescription, updatedAt: new Date() }
                : task
        ))
    }

    function handleCreateTask(title: string, description: string) {
        const fechaCreacion = new Date()
        const newTask: Task = {
            id: crypto.randomUUID(),
            userId: "local-user",
            title: title,
            description: description,
            completed: false,
            createdAt: fechaCreacion,
            updatedAt: fechaCreacion,
        }

        setTasks(currentTasks => [newTask, ...currentTasks])
    }

    function handleToggleTask(id: string) {
        setTasks(currentTasks => currentTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date() } : task
        ))
    }


    function handleDeleteTask(id: string) {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
    }

    return (
        <main className="tasks-page">
            <h1>Mis tareas</h1>
            <TaskForm onCreateTask={handleCreateTask} />
            <p> Total de tareas: {tasks.length} </p>
            <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
        </main>
    )
}

export default TasksPage