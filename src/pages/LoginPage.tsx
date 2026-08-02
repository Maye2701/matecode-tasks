import { Link } from 'react-router'
import LoginForm from '../components/auth/LoginForm'


function LoginPage() {
    return (
        <main className="welcome">
            <h1>Iniciar sesión</h1>
            <p>Ingresa a tu cuenta para administrar tus tareas.</p>
            <LoginForm />
            <Link to="/registro">¿No tienes una cuenta? Regístrate</Link>
        </main>

    )

}

export default LoginPage    