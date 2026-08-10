import { useState } from "react"
import { useNavigate } from "react-router"
import { logoutUser } from "../../services/authService";


function LogoutButton() {

    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

    async function handleLogout() {
        setIsLoggingOut(true)
        setErrorMessage("")

        try {
            await logoutUser()
            navigate("/login", { replace: true });
        } catch {
            setErrorMessage("Error al cerrar sesión")
        } finally {
            setIsLoggingOut(false)
        }
    }
    return (
        <div className="logout-control">
            <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="secondary">
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
            <p role="alert" className="error-message">{errorMessage}</p>
        </div>
    )

}
export default LogoutButton