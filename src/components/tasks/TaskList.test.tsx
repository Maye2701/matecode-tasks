import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TaskList from './TaskList'
import type { Task } from '../../types/task'

describe('TaskList', () => {
    it('muestra las tareas recibidas', () => {
        const tasks: Task[] = [
            {
                id: 'task-1',
                userId: 'user-1',
                title: 'Preparar entrega',
                description: 'Revisar el proyecto integrador',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]

        render(
            <TaskList
                tasks={tasks}
                onToggleTask={vi.fn()}
                onDeleteTask={vi.fn()}
                onUpdateTask={vi.fn()}
            />,
        )

        expect(screen.getByText('Preparar entrega')).toBeInTheDocument()
        expect(
            screen.getByText('Revisar el proyecto integrador'),
        ).toBeInTheDocument()
        expect(screen.getByText('Pendiente')).toBeInTheDocument()
    })
})