import React, { use, useEffect, useRef, useState } from 'react'
import styles from '../../styles/SubjectCard.module.scss'
import { useAuth } from '../../context/AuthContext' 
import AddAssignments from './AddAssignment.jsx'; 
import { collection, onSnapshot, getFirestore, updateDoc, doc} from "firebase/firestore";
export default function SubjectCard({Name, credits, semesterNO, subjectID, Mark}) {
    const { user, deleteSubject, wam, totalcredits} = useAuth()
    const [showAssignments, setshowAssignments] = useState(false);
    var wamImpact = (wam  - (((wam*totalcredits) - (Mark*credits)) / (totalcredits-credits))).toFixed(3)
    const [Assignments, setAssignments] = useState([]);
    const db = getFirestore();
    const customMark = useRef();
    
    

   

    useEffect(() => {
      onSnapshot(collection(db,user.uid,('Semester ' + semesterNO), "Subjects", subjectID, "Assignments"), (snapshot) => {
          setAssignments(snapshot.docs.map(doc => ({
            ID: doc.id,
            ...doc.data(),
        })))
        })
      

        
        
    }, []);
    

    if(customMark.current != undefined){
    customMark.current.addEventListener("keyup", async (event) => {
      if (event.key === "Enter") {
        await updateDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID), {
          Mark: +customMark.current.value
        })
      }
    })
  }

  return (
    <>
    <main className={styles.main}>
    <h3>{Name}</h3>
    <p>Credits {credits}</p>
    <span className={styles.markform}>
      <p>Mark</p>
    <input ref={customMark} readOnly={Assignments.length != 0} defaultValue={Mark}></input></span>
    <p style={{color: wamImpact > 0  ? 'green' : 'red'}}>{ (totalcredits-credits == 0) ? Mark : wamImpact }</p>
    <button onClick={() => {
        setshowAssignments(!showAssignments)
    }}>Assignments</button>
    <button>Edit</button>
    <button onClick={() => {
    deleteSubject(semesterNO, subjectID)
    }}>Delete</button>
    </main>
    {
    showAssignments ? <AddAssignments key={subjectID} Assignments={Assignments} customMark={customMark.current} semesterNO={semesterNO} subjectID={subjectID} Name={Name}></AddAssignments> : <span></span>
    }
    </>
  )
}
