import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext' 

export default function Year({YearID,YearNO}) {
    const [SubjectName, setSubjectName] = useState("")
    const [Credits, setCredits] = useState(0)
    const {addSubject } = useAuth()
  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
        addSubject(YearID, SubjectName, Credits)
    }}>
        <h1>{YearNO}</h1>
        <h1>Add Subject</h1>
        <p>Subject Name</p>
        <input name="subjectName" required onChange={e => setSubjectName(e.target.value)}></input>
        <p>Credits</p>
        <input name="Credits" required onChange={e => setCredits(e.target.value)}></input>
        <button>Submit</button>
    </form>
    </>
  )
}
