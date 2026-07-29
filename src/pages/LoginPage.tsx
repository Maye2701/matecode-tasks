import { Link } from 'react-router'


function LoginPage() {
    return (
        <main className="welcome">
            <h1>Iniciar sesión</h1>
            <p>Ingresa a tu cuenta para administrar tus tareas.</p>
            <Link to="/registro">¿No tienes una cuenta? Registrate</Link>
        </main>

    )

}

export default LoginPage    