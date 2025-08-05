// src/hooks/auth/useLogin.jsx
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(API_URL + '/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Update auth context
      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false);
    }
  }

  return { login, isLoading, error }
}