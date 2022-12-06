import React, { useState } from 'react'
import styles from '../../styles/SubjectCard.module.scss'
import { useAuth } from '../../context/AuthContext' 
import AddAssignments from './AddAssignment.jsx'; 
export default function SubjectCard({Name, credits, semesterNO, subjectID, Mark}) {
    const { user, addAssignment } = useAuth()
    const [showAssignments, setshowAssignments] = useState(false);
    
  return (
    <>
    <main className={styles.main}>
    <h3>{Name}</h3>
    <p>Credits {credits}</p>
    <p>Current Mark {Mark}</p>
    <button onClick={() => {
        //addAssignment(Year, Name, subjectID)
        setshowAssignments(!showAssignments)
    }}>Assignments</button>
    <button>Edit</button>
    </main>
    {
    showAssignments ? <AddAssignments key={subjectID} semesterNO={semesterNO} subjectID={subjectID} Name={Name}></AddAssignments> : <span></span>
    }
    </>
  )
}
