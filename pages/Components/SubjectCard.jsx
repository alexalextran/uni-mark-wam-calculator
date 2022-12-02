import React from 'react'
import styles from '../../styles/SubjectCard.module.scss'
import { useAuth } from '../../context/AuthContext' 
export default function SubjectCard({Name, credits, Year, subjectID}) {
    const { user, addAssignment } = useAuth()
  return (
    <main className={styles.main}>
    <h3>{Name}</h3>
    <p>Credits {credits}</p>
    <p>Current Mark</p>
    <button onClick={() => {
        addAssignment(Year, Name, subjectID)
    }}>Assignments</button>
    <button>Edit</button>
    </main>
  )
}
