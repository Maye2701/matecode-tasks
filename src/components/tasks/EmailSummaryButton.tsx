import { useState } from 'react'
import { buildTaskSummary } from '../../utils/taskSummary'
import type { Task } from '../../types/task'

interface EmailSummaryButtonProps {
    tasks: Task[]
    userEmail: string
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