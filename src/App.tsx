import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegistrePage'
import TaskPage from './pages/TaskPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/tareas" element={<TaskPage />} />
    </Routes>
  )
}

export default App
