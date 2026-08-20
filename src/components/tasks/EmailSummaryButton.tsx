import { useState } from 'react'
import type { Task } from '../../types/task'

interface EmailSummaryButtonProps {
    tasks: Task[]
    userEmail: string
}

function buildTaskSummary(tasks: Task[]) {
    const pendingTasks = tasks.filter((task) => !task.completed)
    const completedTasks = tasks.filter((task) => task.completed)

    const pendingList =
        pendingTasks.map((task) => `- ${task.title}`).join('\n') || '- Ninguna'

    const completedList =
        completedTasks.map((task) => `- ${task.title}`).join('\n') || '- Ninguna'

    return `Resumen de tareas

Total: ${tasks.length}

Pendientes (${pendingTasks.length}):
${pendingList}

Completadas (${completedTasks.length}):
${completedList}`
}

function EmailSummaryButton({ tasks, userEmail }: EmailSummaryButtonProps) {
    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSendEmail() {
        setIsSending(true)
        setMessage('')

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: userEmail,
                    summary: buildTaskSummary(tasks),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'No fue posible enviar el correo.')
            }

            setMessage('Resumen enviado correctamente.')
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'No fue posible enviar el correo.'

            setMessage(errorMessage)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="email-summary-control">
            <button
                type="button"
                className="secondary"
                onClick={handleSendEmail}
                disabled={isSending || !userEmail}
            >
                {isSending ? 'Enviando resumen...' : 'Enviar resumen por email'}
            </button>

            {message && <p role="status">{message}</p>}
        </div>
    )
}

export default EmailSummaryButton