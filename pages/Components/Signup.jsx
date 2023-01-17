import React, {useState } from 'react'
import styles from "../../styles/LoginCard.module.scss";
import { useAuth } from '../../context/AuthContext'
export default function Signup({handleOnClick, titlesize}) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState(null);
    const { signup } = useAuth()

 
     const handleSignup = async (e) => {
          e.preventDefault()
          try {
            await signup(email, password)
          } catch (err) {
            alert(err.message)
          }
        }
    


  return (

    <main className={styles.main}>
    <form>
    <h2>Uni Wam & Mark calulator</h2>
        <h2>Sign Up</h2>
        <p>Email</p>
        <input name="email" required value={email} onChange={e => setemail(e.target.value)}></input>
        <p>Password</p>
        <input name="password" required type="password" value={password} onChange={e => setpassword(e.target.value)}></input>
        <br></br>
        <span>

           <button onClick={(e) => {
            handleSignup(e)
           }}>Sign up</button>

        <button onClick={() => {
              handleOnClick((Math.floor(Math.random() * titlesize)))
        }}>Already have an account?</button>
        
        </span>
       
    </form>
    </main>
  )
}
