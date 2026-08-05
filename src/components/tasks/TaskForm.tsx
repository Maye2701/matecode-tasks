import { useState, type FormEvent } from "react"

export interface TaskFormProps {
    onCreateTask: (
        title: string,
        description: string)
        => void
}

function TaskForm({ onCreateTask }: TaskFormProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (title.trim() === "") {
            return
        }
        onCreateTask(title.trim(), description.trim())
        setTitle("")
        setDescription("")

    }

    return (
        <section className="task-form-card">
            <h2>Agregar tarea</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="title">Titulo</label>
                    <input
                        id="title"
                        name="title"
                        maxLength={80}
                        required
                        type="text"
                        placeholder="Titulo de la tarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Descripcion</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        maxLength={500}
                        required
                        placeholder="Descripcion de la tarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="primary" type="submit">Agregar tarea</button>
            </form>
        </section>
    )
}

export default TaskForm