import { Link } from 'react-router'

function RegisterPage() {
    return (
        <main className="welcome">
            <h1>Crear una cuenta</h1>
            <p>Regístrate para comenzar a organizar tus tareas.</p>
            <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
        </main>

    )

}

export default RegisterPage    