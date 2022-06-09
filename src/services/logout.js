import axios from "../api/axios";
const LOGOUT_URL = "/logout";
const logout = async () => {
  try {
    const response = await axios.get(LOGOUT_URL, { withCredentials: true });
    return response;
  } catch (err) {
    return {
      errorCode: parseInt(err?.message?.split(" ").splice(-1)[0])
        ? parseInt(err?.message?.split(" ").splice(-1)[0])
        : 500,
    };
  }
};

export default logout;
