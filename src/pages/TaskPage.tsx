import { useState } from 'react'
import type { Task } from '../types/task'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import '../styles/tasks.css'

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
            <div className="tasks-container">
                <header className="tasks-header">
                    <h1>Mis tareas</h1>
                    <p>Organiza y completa tus actividades diarias.</p>
                    <p> Total de tareas: {tasks.length} </p>
                </header>
                <TaskForm onCreateTask={handleCreateTask} />
                <section className='tasks-section'>
                    <h2>Lista de tareas</h2>
                    <TaskList
                        tasks={tasks}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                    />
                </section>
            </div>
        </main>
    )
}

export default TasksPage