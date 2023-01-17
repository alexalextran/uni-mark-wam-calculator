import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import Semester from './Components/Semester';
import FixedHeader from './Components/FixedHeader';
import Head from 'next/head'

export default function Dashboard() {
  const { user, logout, addSemester, calulateWAM, wam } = useAuth()
  const router = useRouter();
  const [loading, setloading] = useState(true)
  const [semesters, setsemesters] = useState([])
  const db = getFirestore();


  useEffect(() => {
    
    if(!user) router.push('/')

  
      calulateWAM()
      var unsubscribe = () => {}


      try {
        unsubscribe = onSnapshot(collection(db, user.uid), (snapshot) => {
        setsemesters(snapshot.docs.map(doc => ({
          //generate array and populate with id and doc data
          ID: doc.id,
          ...doc.data(),
        })))

        setloading(false)
      })
    }
    catch{
      
    }


      return () => unsubscribe()
    
  }, [user])


  return (
    <div>

      <Head>
        <title>Wam&Mark Calulator🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/logofav.png" />
        <meta name="description" content="A online calulator which is used to calulate your Weighted average mark"></meta>
      </Head>

      {
        loading ? <p>Loading</p> : <FixedHeader/>
      }

      {
        loading && !user ? <p>Loading</p> : semesters.map((semester) => {
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
