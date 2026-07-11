import { createContext, useContext, type ReactNode } from 'react'

interface AuthContextType {
  name: string
  email: string
  role: 'worker' | 'buyer' | 'admin'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  name,
  email,
  role,
  children,
}: {
  children: ReactNode
  name: string
  email: string
  role: 'worker' | 'buyer' | 'admin'
}) {
  return (
    <AuthContext.Provider value={{ name, email, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
