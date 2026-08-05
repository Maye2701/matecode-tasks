import type { Task } from "../../types/task"
import { useState } from 'react'
import TaskEditForm from "./TaskEditForm"


interface TaskItemProps {
    task: Task
    onToggleTask: (id: string) => void
    onDeleteTask: (id: string) => void
    onUpdateTask: (id: string, title: string, description: string) => void


}

function TaskItem({ task, onToggleTask, onDeleteTask, onUpdateTask }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)

    function handleSaveTask(id: string, title: string, description: string) {
        onUpdateTask(id, title, description)
        setIsEditing(false)

    }

    function handleDeleteClick() {
        if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
            onDeleteTask(task.id)
        }
    }

    if (isEditing) {
        return (
            <li>
                <TaskEditForm
                    task={task}
                    onSaveTask={handleSaveTask}
                    onCancelEdit={() => setIsEditing(false)}
                />
            </li>
        )
    }

    return (
        <li className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {task.completed ? <span className="completed">Completada</span> : <span className="pending">Pendiente</span>}
            <button type="button" className="danger" onClick={handleDeleteClick}>Eliminar</button>
            <button onClick={() => onToggleTask(task.id)}>{task.completed ? "Pendiente" : "Completada"}</button>
            <button onClick={() => setIsEditing(true)}>Editar</button>
        </li>
    )
}

export default TaskItem
