import { useCallback, useState } from 'react'
import userData from '../userdata.json'

const STORAGE_NAME = 'currentUser'

const useAuth = () => {
  const [userLogin, setUserLogin] = useState(localStorage.getItem(STORAGE_NAME))

  const signIn = useCallback((login, password) => {
    const user = userData.find((x) => x.login === login)

    if (!user) throw new Error(`Неверный логин`)
    if (user.password !== password) throw new Error(`Неверный пароль`)

    setUserLogin(login)
    localStorage.setItem(STORAGE_NAME, login)
  }, [])

  const signOut = () => {
    setUserLogin(null)

    localStorage.removeItem(STORAGE_NAME)
  }

  return { login: userLogin, signIn, signOut }
}

export default useAuth
