import { useState, type FormEvent } from "react"
import { registerUser } from "../../services/authService"
import { useNavigate } from "react-router"


function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage("");
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden")
            return
        }

        setIsSubmitting(true)

        try {
            await registerUser(email, password)
            //Navega a la ruta /tasks
            navigate("/tareas")

        } catch {
            //Muestra el error en un estado
            setErrorMessage("Error al crear la cuenta")
        }
        finally {
            setIsSubmitting(false)
        }
    }



    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="register-email">Correo electrónico</label>
                <input
                    id="register-email"
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
                <label htmlFor="register-password">Contraseña</label>
                <input
                    id="register-password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Ingresa tu contraseña"
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="register-confirm-password">Confirmar contraseña</label>
                <input
                    id="register-confirm-password"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="Confirma tu contraseña"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="primary" disabled={isSubmitting}>{isSubmitting ? "Creando cuenta..." : "Crear cuenta"}</button>
            {errorMessage && <p role="alert" className="error-message">{errorMessage}</p>}
        </form>
    )
}

export default RegisterForm