import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from './useAxiosPrivate'

const useUsers = () => {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [users, setUsers] = useState([])
  const location = useLocation()
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        })
        isMounted && setUsers(response.data)
      } catch (error) {
        console.error(error)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  return [users, setUsers]
}

export default useUsers
