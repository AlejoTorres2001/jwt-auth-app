import { useNavigate } from 'react-router-dom'
import logout from '../services/logout'
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await logout()
    if (response.status === 204 || response.status === 200) {
      setAuth({})
      navigate('/login', { replace: true })
    }
    if (response?.errorCode) {
      console.error('logout failed')
    }
  }
  return { logout: handleLogout }
}

export default useLogout
