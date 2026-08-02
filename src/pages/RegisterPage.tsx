import { Link } from 'react-router'
import RegisterForm from '../components/auth/RegisterForm'
import '../styles/auth.css'


function RegisterPage() {
    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Crear una cuenta</h1>
                <p>Regístrate para comenzar a organizar tus tareas.</p>
                <RegisterForm />
                <Link className="auth-link" to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
            </section>
        </main>

    )

}

export default RegisterPage    