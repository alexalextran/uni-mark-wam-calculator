import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import Semester from './Components/Semester';
import FixedHeader from './Components/FixedHeader';

export default function Dashboard() {
  const { user, logout, addSemester, calulateWAM, wam } = useAuth()
  const router = useRouter();
  const [loading, setloading] = useState(true)
  const [semesters, setsemesters] = useState([])
  const db = getFirestore();


  useEffect(() => {
    
    (!user) ? router.push('/') : console.log("User logged in")
    if (user) {
      calulateWAM()
      onSnapshot(collection(db, user.uid), (snapshot) => {
        setsemesters(snapshot.docs.map(doc => ({
          //generate array and populate with id and doc data
          ID: doc.id,
          ...doc.data(),
        })))

        setloading(false)
      })



    }
  }, [user])


  return (
    <div>

      {
        loading ? <p>Loading</p> : <FixedHeader/>
      }

      {
        loading ? <p>Loading</p> : semesters.map((semester) => {
          var lastindex = false
         
          if(+semester.semesterNO == +semesters.length){
            lastindex = true
          }

          return <Semester key={semester.ID} lastindex={lastindex} semesterNO={semester.semesterNO} db={db}>  </Semester>
        })

      }


    </div>
  )
}
