import { Navigate, type RouteProps } from "react-router"
import { useAuth } from "../../hooks/userAuth"

export default function ProtectedRoute({ children }: RouteProps) {
    const { user, loading } = useAuth()
    if (loading) return <div>Cargando...</div>
    if (!user) return <Navigate to="/login" />
    return children


}