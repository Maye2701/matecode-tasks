import { useState, type FormEvent } from 'react'



function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setMessage("Enviando formulario...")
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
            <button type="submit" className="primary">Iniciar sesión</button>
            {message && <p role="status">{message}</p>}
        </form>
    )
}

export default LoginForm