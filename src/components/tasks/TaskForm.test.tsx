import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
    it('envía el título y la descripción al crear una tarea', async () => {
        const user = userEvent.setup()
        const onCreateTask = vi.fn()

        render(<TaskForm onCreateTask={onCreateTask} />)

        await user.type(screen.getByLabelText(/titulo/i), 'Estudiar Vitest')
        await user.type(
            screen.getByLabelText(/descripcion/i),
            'Crear el primer test del proyecto',
        )

        await user.click(
            screen.getByRole('button', { name: /agregar tarea/i }),
        )

        expect(onCreateTask).toHaveBeenCalledWith(
            'Estudiar Vitest',
            'Crear el primer test del proyecto',
        )
    })
})