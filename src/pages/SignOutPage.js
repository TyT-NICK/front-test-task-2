import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import useAuth from '../hooks/auth.hook'

const SignOutPage = () => {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  }, [signOut])

  return <Redirect to="auth" />
}

export default SignOutPage
