import { useAuthContext } from "./useAuthContext"
import { useContext, useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const API_URL = import.meta.evn.VITE_API_URL;

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(API_URL + '/api/user/signup', {
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

  return { signup, isLoading, error }
}