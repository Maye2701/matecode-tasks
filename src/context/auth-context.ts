import { createContext } from 'react'
import type { User } from "firebase/auth"


export interface AuthContextValueType {
    user: User | null
    loading: boolean
}


export const AuthContext = createContext<AuthContextValueType | undefined>(undefined)




