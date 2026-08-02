import { Link } from 'react-router'
import LoginForm from '../components/auth/LoginForm'
import '../styles/auth.css'


function LoginPage() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Iniciar sesión</h1>
                <p>Ingresa a tu cuenta para administrar tus tareas.</p>
                <LoginForm />
                <Link className="auth-link" to="/registro">¿No tienes una cuenta? Regístrate</Link>
            </section>
        </main>

    )

}

export default LoginPage    