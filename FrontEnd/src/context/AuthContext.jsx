import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [name, setName] = useState(localStorage.getItem('name') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)

  const login = (token, name, role) => {
    setToken(token)
    setName(name)
    setRole(role)
    localStorage.setItem('token', token)
    localStorage.setItem('name', name)
    localStorage.setItem('role', role)
  }

  const logout = () => {
    setToken(null)
    setName(null)
    setRole(null)
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
  }

  const isAdmin = role === 'admin'

  return (
    <AuthContext.Provider value={{ token, name, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}