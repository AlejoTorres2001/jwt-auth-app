import axios from '../api/axios'

const LOGIN_URL = '/auth'

const login = async ({ user, pwd }) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      JSON.stringify({ user, password: pwd }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    return response
  } catch (err) {
    return {
      errorCode: parseInt(err?.message?.split(' ').splice(-1)[0])
        ? parseInt(err?.message?.split(' ').splice(-1)[0])
        : 500
    }
  }
}

export default login
