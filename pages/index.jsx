import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import Signup from './Components/Signup';
import LoginBox from './Components/LoginBox';
export default function Index() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [toggleSignup, settoggleSignup] = useState(false)
    const { user, login } = useAuth()

    useEffect(() => {
        (user) ? router.push('/Dashboard') : console.log("User has not logged in")
      }, [user])

 
   
    

  return (
    <>
    <button onClick={() => {
            settoggleSignup(!toggleSignup);
          } }>Swtich</button>
    {
      toggleSignup ? <Signup/> : <LoginBox/>
    }
  
    </>
  )
}
