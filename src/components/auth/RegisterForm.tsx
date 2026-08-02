import { useState, type FormEvent } from "react"


function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden")
            return
        }
        setMessage("Formulario preparado para crear la cuenta.")
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
            <button type="submit" className="primary">Registrarse</button>
            {message && <p role="status" className="status-message">{message}</p>}
        </form>
    )
}

export default RegisterForm