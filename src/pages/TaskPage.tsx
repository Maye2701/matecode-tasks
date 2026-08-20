import { useState, useEffect } from 'react'
import type { Task } from '../types/task'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import '../styles/tasks.css'
import LogoutButton from '../components/auth/LogoutButton'
import { useAuth } from '../hooks/userAuth'
import { subscribeToTasks, createTask, updateTask, toggleTaskCompletion, deleteTask } from '../services/taskService'
import EmailSummaryButton from '../components/tasks/EmailSummaryButton'

function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loadingTasks, setLoadingTasks] = useState(true)
    const [taskError, setTaskError] = useState('')

    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            setLoadingTasks(false)
            setTasks([])
            return
        }
        setLoadingTasks(true)
        setTaskError('')

        const unsubscribe = subscribeToTasks(
            user.uid,
            (tasks) => {
                setTasks(tasks)
                setLoadingTasks(false)
                setTaskError('')
            },
            (error) => {
                setTaskError('No fue posible cargar las tareas.')
                console.error(error)
                setLoadingTasks(false)
            }
        )
        return unsubscribe

    }, [user])




    async function handleUpdateTask(id: string, newTitle: string, newDescription: string) {
        setTaskError('')
        try {
            await updateTask(id, newTitle, newDescription)
        } catch {
            setTaskError('No fue posible actualizar la tarea.')
        }
    }

    async function handleCreateTask(title: string, description: string) {
        if (!user) return
        setTaskError('')
        try {
            await createTask(user.uid, title, description)
        } catch {
            setTaskError('No fue posible crear la tarea.')
        }
    }

    async function handleToggleTask(id: string) {

        const task = tasks.find(t => t.id === id)
        if (!task) return

        setTaskError('')
        try {
            await toggleTaskCompletion(id, !task.completed)
        } catch {
            setTaskError('No fue posible cambiar el estado de la tarea.')
        }
    }


    async function handleDeleteTask(id: string) {
        setTaskError('')
        try {
            await deleteTask(id)
        } catch {
            setTaskError('No fue posible eliminar la tarea.')
        }
    }

    return (
        <main className="tasks-page">
            <div className="tasks-container">
                <header className="tasks-header">
                    <h1>Mis tareas</h1>
                    <p>Organiza y completa tus actividades diarias.</p>
                    <p className='task-counter'> Total de tareas: {tasks.length} </p>
                    <LogoutButton />
                    {user?.email && (
                        <EmailSummaryButton
                            tasks={tasks}
                            userEmail={user.email}
                        />
                    )}
                </header>
                <TaskForm onCreateTask={handleCreateTask} />
                <section className='tasks-section'>
                    <h2>Lista de tareas</h2>
                    {loadingTasks && <p>Cargando tareas...</p>}
                    {taskError && <p role="alert">{taskError}</p>}
                    {!loadingTasks && (
                        <TaskList
                            tasks={tasks}
                            onToggleTask={handleToggleTask}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                    )}
                </section>
            </div>
        </main>
    )
}

export default TasksPage