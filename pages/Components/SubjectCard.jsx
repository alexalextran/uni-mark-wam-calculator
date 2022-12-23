import React, { useState } from 'react'
import styles from '../../styles/SubjectCard.module.scss'
import { useAuth } from '../../context/AuthContext' 
import AddAssignments from './AddAssignment.jsx'; 
export default function SubjectCard({Name, credits, semesterNO, subjectID, Mark}) {
    const { user, deleteSubject, wam, totalcredits} = useAuth()
    const [showAssignments, setshowAssignments] = useState(false);
    
    var wamImpact = (wam  - (((wam*totalcredits) - (Mark*credits)) / (totalcredits-credits))).toFixed(3)
  return (
    <>
    <main className={styles.main}>
    <h3>{Name}</h3>
    <p>Credits {credits}</p>
    <span className={styles.markform}>
      <p>Mark</p>
    <input defaultValue={Mark} readOnly={false}></input></span>
    <p style={{color: wamImpact > 0  ? 'green' : 'red'}}>{ (totalcredits-credits == 0) ? Mark : wamImpact }</p>
    <button onClick={() => {
        //addAssignment(Year, Name, subjectID)
        setshowAssignments(!showAssignments)
    }}>Assignments</button>
    <button>Edit</button>
    <button onClick={() => {
    deleteSubject(semesterNO, subjectID)
    }}>Delete</button>
    </main>
    {
    showAssignments ? <AddAssignments key={subjectID} semesterNO={semesterNO} subjectID={subjectID} Name={Name}></AddAssignments> : <span></span>
    }
    </>
  )
}
