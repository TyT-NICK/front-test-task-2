import { useCallback, useEffect, useState } from 'react'

const STORAGE_NAME = 'userdata'

const useAuth = () => {
  const [login, setLogin] = useState(null)

  const signIn = useCallback((userdata) => {
    setLogin(userdata)

    localStorage.setItem(STORAGE_NAME, userdata)
  }, [])

  const signOut = () => {
    setLogin(null)

    localStorage.removeItem(STORAGE_NAME)
  }

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem(STORAGE_NAME))
    if (userdata) signIn(userdata)
  }, [])

  return { login, signIn, signOut }
}

export default useAuth
