import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import useRefreshToken from '../hooks/useRefreshToken'
const Persistlogin = () => {
  const [persist] = useLocalStorage('persist', false)
  const [IsLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const refresh = useRefreshToken()
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    !persist
      ? setIsLoading(false)
      : !auth.accessToken
          ? verifyRefreshToken()
          : setIsLoading(false)
  }, [])

  return (
    <>
      {!persist ? <Outlet /> : IsLoading ? <div>Loading...</div> : <Outlet />}
    </>
  )
}

export default Persistlogin
