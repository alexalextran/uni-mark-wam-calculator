import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { user, logout } = useAuth()
    const router = useRouter();

    useEffect(() => {
      (!user) ? router.push('/Dashboard') : console.log("User not logged in")
    }, [user])
    
  return (
    <div>
        <button onClick={() => {
            logout()
        }}>signout</button>
        Dashboard</div>
  )
}
