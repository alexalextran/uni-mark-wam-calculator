import React, {useState } from 'react'
import styles from "../../styles/LoginCard.module.scss";

export default function Signup() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState(null);


 
     const handleSignup = async (e) => {
          e.preventDefault()
          try {
            await signup(email, password)
          } catch (err) {
            console.log(err)
          }
        }
    


  return (

    <main className={styles.main}>
    <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>
        <p>Email</p>
        <input name="email" required value={email} onChange={e => setemail(e.target.value)}></input>
        <p>Password</p>
        <input name="password" required type="password" value={password} onChange={e => setpassword(e.target.value)}></input>
        <button>Login</button>
    </form>
    </main>
  )
}
