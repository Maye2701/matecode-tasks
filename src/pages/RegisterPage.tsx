import { Link } from 'react-router'
import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
    return (
        <main className="welcome">
            <h1>Crear una cuenta</h1>
            <p>Regístrate para comenzar a organizar tus tareas.</p>
            <RegisterForm />
            <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
        </main>

    )

}

export default RegisterPage    