import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext' 
import { collection, onSnapshot,getFirestore  } from "firebase/firestore";
import YearCard from './Components/YearCard'; 

export default function Dashboard() {
    const { user, logout, addYear, addSubject } = useAuth()
    const router = useRouter();
    const [loading, setloading] = useState(true)
    const [Years, setYears] = useState([])
    const db = getFirestore();

    useEffect(() => {
      (!user) ? router.push('/Login') : console.log("User logged in")
      onSnapshot(collection(db, user.uid), (snapshot) => {
        setYears(snapshot.docs.map(doc => ({
            //generate array and populate with id and doc data
            ID: doc.id,
            ...doc.data(),
        })))
        setloading(false)})
        

    }, [user])

    
  return (
    <div>
        <button onClick={() => {
            logout()
        }}>signout</button>

        <button onClick={() => {
            addYear()
        }}>Add Year</button>

        {
           loading ?  <p>Loading</p> :  Years.map((Year) =>{
            return   <YearCard key={Year.ID} YearNO={Year.Year} db={db}>  </YearCard> 
            })

        }
        

        Dashboard</div>
  )
}
