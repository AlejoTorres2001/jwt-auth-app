import { useRef, useEffect, useState } from "react";
const Login = () => {
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

  }
  return (
    <>
    { success ? (
      <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
              <a href="#">Go to Home</a>
          </p>
      </section>
  ) :(
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
        <a href="#">Sign Up</a>
      </span>
    </p>
  </section>
  )}
  </>
  )
};

export default Login;
