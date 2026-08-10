import { useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext } from "./auth-context"
import type { User } from 'firebase/auth'
import { auth } from '../config/firebase'


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const value = { user, loading }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}







