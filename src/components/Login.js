import { useRef, useEffect, useState   } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import login from "../services/login";
const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ user, pwd });
    if (response.errorCode) errRef.current.focus();
    if (response?.errorCode === 401) return setErrMsg("Invalid Credentials");
    if (response?.errorCode === 400) return setErrMsg("Missing Username or Password");
    if (response?.errorCode === 500) return setErrMsg("No Server Response");
    //response success
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    if (accessToken) {
      setAuth({ user, pwd, roles, accessToken });
      setSuccess(true);
      setUser("");
      setPwd("");
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to={'/'}>Go to Home</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>SignIn</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              
            />
            <button>SigIn</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to={'/register'}>Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
