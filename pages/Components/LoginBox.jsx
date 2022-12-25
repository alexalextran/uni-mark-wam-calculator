import React, { useState, useEffect } from 'react'

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
          await login(email, password)
        } catch (err) {
          console.log(err)
        }
      }


    return (
    <>
    <form onSubmit={handleLogin}>
    <h1>Login</h1>
    <p>Email</p>
    <input name="email" required value={email} onChange={e => setemail(e.target.value)}></input>
    <p>Password</p>
      <input name="password" required type="password" value={password} onChange={e => setpassword(e.target.value)}></input>
      <button disabled={loading}>Login</button>
      </form></>  
       
    );
}

export default Login;
