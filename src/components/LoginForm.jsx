import React, { useState, useEffect } from "react";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
    // window.localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isLoggedIn", Json.strinify(Login));
  };

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      console.log("log out");
      localStorage.clear();
      window.location.pathname = "/Login";
      setLoggedIn(false);
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 10000;

    localStorage.setItem("expireTime", expireTime);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("scroll", updateExpireTime);
      window.addEventListener("mousemove", updateExpireTime);
    };
  }, []);
  return (
    <form onSubmit={submitHandler}>
            
      <div className="form-inner">
        <h2 id="Login">Login</h2>
        {/* {error != "" ? <div className="error">{error}</div> : ""} */}
        <div className="form-group">
          <label htmlFor="name">username:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            name="passowrd"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="Login" />
        {error && <p className="text-danger"> {error} </p>}
      </div>
    </form>
  );
}

export default LoginForm;
