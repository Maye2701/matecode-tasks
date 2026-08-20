import type { Task } from '../types/task'

export function buildTaskSummary(tasks: Task[]) {
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