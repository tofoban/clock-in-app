import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  const adminUser = {
    username: "admin",
    password: "admin1234",
  };

  // creating current date
  function date() {
    const hrs = new Date.getHours();
    const minutes = new Date.getMinutes();
    const seconds = new Date.getSeconds();
  }

  // creatinf a function for current
  function getCurrentDateString() {
    const date = new Date().getDate(); //current date
    const month = new Date().getMonth() + 1; //current month
    const year = new Date().getFullYear(); //current year
    const hours = new Date().getHours(); //current hours
    const min = new Date().getMinutes(); //current minutes
    const sec = new Date().getSeconds(); //current seconds

    return (
      date + "/" + month + "/" + year + "    " + hours + ":" + min + ":" + sec
    );
  }

  const [currentdate, setCurrentdate] = useState(getCurrentDateString());

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    window.localStorage.removeItem("isLoggedIn");

    if (expireTime < Date.now()) {
      console.log("log out");
      localStorage.clear();
      window.location.pathname = "/Login";
      setLoggedIn(false);
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 10000;

    // localStorage.setItem("expireTime", expireTime);
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

  // const events = [
  //   "load",
  //   "mousemove",
  //   "mousedown",
  //   "click",
  //   "scroll",
  //   "keypress",
  // ];

  const Login = (details) => {
    if (
      details.username == adminUser.username &&
      details.password == adminUser.password
    ) {
      console.log("logged in");
      // localStorage.setItem("isAuthenticated", "true");
      // window.location.pathname = "/";
      setUser({
        username: details.username,
        email: details.email,
      });
    } else {
      setError("Details do not match!");
    }
  };

  // useEffect(() => {
  //   Object.values(events).forEach((item) => {
  //     window.addEventListener(item, () => {
  //       resetTimer();
  //       handleTimer();
  //     });
  //   });
  // }, []);

  // const resetTimer = () => {
  //   if (timer) clearTimeout(timer);
  // };

  // const handleTimer = () => {
  //   timer = setTimeout(() => {
  //     resetTimer();
  //     Object.values(events).forEach((item) => {
  //       window.removeEventListener(item, resetTimer);
  //     });
  //     logoutAction();
  //   }, 10000);
  // };
  // time
  // user.date === { date }

  // const logoutAction = () => {
  //   localStorage.clear();
  //   window.location.pathname = "./LoginForm";
  // };

  const Logout = () => {
    // setUser({
    //   name: "",
    //   email: "",
    // });
    // localStorage.clear();
    // window.location.pathname = "/Login";
    window.alert("time you logout is " + { getCurrentDateString });
  };
  return (
    <div className="App">
      {user.email !== "" || user.date == { date } ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.username}</span>
          </h2>
          <p>
            Showing the current date and time you log in{" "}
            <span> {currentdate}</span>
          </p>
          logged In: {loggedIn.tostring}
          {/* {this.state.showMessage && <p>Hi</p>} */}
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
