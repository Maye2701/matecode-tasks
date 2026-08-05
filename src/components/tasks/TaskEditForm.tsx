import type { Task } from "../../types/task";
import { useState } from "react";
import type { FormEvent } from "react";

interface TaskEditFormProps {
    task: Task,
    onSaveTask: (id: string, title: string, description: string) => void
    onCancelEdit: () => void
}

function TaskEditForm({ task, onSaveTask, onCancelEdit }: TaskEditFormProps) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (title.trim() === '') {
            return
        }
        onSaveTask(task.id, title.trim(), description.trim())
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor={`title-edit-${task.id}`}>Título</label>
                <input
                    id={`title-edit-${task.id}`}
                    name="title"
                    maxLength={80}
                    required
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor={`description-edit-${task.id}`}>Descripción</label>
                <textarea
                    id={`description-edit-${task.id}`}
                    name="description"
                    rows={4}
                    maxLength={500}
                    required
                    placeholder="Descripción de la tarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button className="primary" type="submit">Guardar</button>
            <button className="secondary" type="button" onClick={onCancelEdit}>Cancelar</button>
        </form>

    )

}


export default TaskEditForm
