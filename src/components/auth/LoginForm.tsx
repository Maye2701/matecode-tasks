import { useState, type FormEvent } from 'react'
import { loginUser } from '../../services/authService'
import { useNavigate } from "react-router"



function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage("")
        setIsSubmitting(true)


        try {
            await loginUser(email, password)
            //Navega a la ruta /tasks
            navigate("/tareas")

        } catch {
            //Muestra el error en un estado
            setErrorMessage("No fue posible iniciar sesión. Revisa tus credenciales.")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="login-email">Correo electrónico</label>
                <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="nombre@ejemplo.com"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="login-password">Contraseña</label>
                <input
                    id="login-password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Ingresa tu contraseña"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="primary" disabled={isSubmitting}>{isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}</button>
            {errorMessage && <p role="alert" className="error-message">{errorMessage}</p>}
        </form>
    )
}

export default LoginForm