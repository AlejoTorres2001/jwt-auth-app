import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useLocalStorage from "../hooks/useLocalStorage";
import login from "../services/login";
const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [pwd, setPwd] = useState("");
  const [user, resetUser,userAttributes] = useInput('user',"");
  const [errMsg, setErrMsg] = useState("");

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
    if (response?.errorCode === 400)
      return setErrMsg("Missing Username or Password");
    if (response?.errorCode === 500) return setErrMsg("No Server Response");
    //response success
    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    if (accessToken) {
      setAuth({ user, pwd, roles, accessToken });
      resetUser("");
      setPwd("");
      navigate(from, { replace: true });
    }
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  return (
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
          {...userAttributes}
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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={(e) => setPersist((prev) => !prev)}
            checked={persist}
          />
          <label htmlFor="persist">Trust this Device?</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
