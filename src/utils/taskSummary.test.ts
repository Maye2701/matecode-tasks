import { describe, expect, it } from 'vitest'
import type { Task } from '../types/task'
import { buildTaskSummary } from './taskSummary'

describe('buildTaskSummary', () => {
    it('crea un resumen con tareas pendientes y completadas', () => {
        const tasks: Task[] = [
            {
                id: 'task-1',
                userId: 'user-1',
                title: 'Estudiar React',
                description: 'Revisar componentes',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 'task-2',
                userId: 'user-1',
                title: 'Enviar proyecto',
                description: 'Subir entrega',
                completed: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]

        const summary = buildTaskSummary(tasks)

        expect(summary).toContain('Total: 2')
        expect(summary).toContain('Pendientes (1):')
        expect(summary).toContain('- Estudiar React')
        expect(summary).toContain('Completadas (1):')
        expect(summary).toContain('- Enviar proyecto')
    })
})