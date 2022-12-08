import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext' 
import { collection, onSnapshot,getFirestore  } from "firebase/firestore";
import Semester from './Components/Semester'; 

export default function Dashboard() {
    const { user, logout, addSemester, calulateWAM, wam } = useAuth()
    const router = useRouter();
    const [loading, setloading] = useState(true)
    const [semesters, setsemesters] = useState([])
    const db = getFirestore();

    
    useEffect(() => {
      (!user) ? router.push('/Login') : console.log("User logged in")
      if(user){
        calulateWAM()
      onSnapshot(collection(db, user.uid), (snapshot) => {
        setsemesters(snapshot.docs.map(doc => ({
            //generate array and populate with id and doc data
            ID: doc.id,
            ...doc.data(),
        })))
      
        setloading(false)})
 
     

        }
        console.log(wam)
    }, [user])

    
  return (
    <div>
        <button onClick={() => {
            logout()
        }}>signout</button>

        <button onClick={() => {
            addSemester()
        }}>Add Semester</button>

        {
          loading ? <p>Loading</p> : <p>wam {wam}</p>
        }

        {
           loading ?  <p>Loading</p> :  semesters.map((semester) =>{
            return   <Semester key={semester.ID} semesterNO={semester.semesterNO} db={db}>  </Semester> 
            })

        }
        

        </div>
  )
}
