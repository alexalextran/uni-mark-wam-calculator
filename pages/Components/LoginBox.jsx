import React, { useState } from "react";
import styles from "../../styles/LoginCard.module.scss";
import { useAuth } from '../../context/AuthContext'
const Login = ({handleOnClick, titlesize}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const { user, login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      alert(err.message)
    }
  };


  return (
    <main className={styles.main}>
      <form >
        <h1>Login</h1>
        <p>Email</p>
        <input
          name="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        ></input>
        <p>Password</p>
        <input
          name="password"
          required
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <br></br>
        <span>
           <button onClick={(e) => {
           handleLogin(e)
           }}>Login</button>
        <button onClick={() => {
          handleOnClick((Math.floor(Math.random() * titlesize)))
        }}> Don&#39;t have an account?</button>
        </span>
      </form>
    </main>
  );
};

export default Login;
