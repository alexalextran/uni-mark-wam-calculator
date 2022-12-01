import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'

export default function Signup() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(null);
    const { user, signup } = useAuth()

 
     const handleSignup = async (e) => {
          e.preventDefault()
      
          try {
            await signup(email, password)
          } catch (err) {
            console.log(err)
          }
      
        
        }
    


  return (

    <>
    <form onSubmit={handleSignup}>
        <h1>Login</h1>
        <p>Email</p>
        <input name="email" required value={email} onChange={e => setemail(e.target.value)}></input>
        <p>Password</p>
        <input name="password" required type="password" value={password} onChange={e => setpassword(e.target.value)}></input>
        <button disabled={loading}>Login</button>
    </form>
    </>
  )
}
