import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, onSnapshot  } from "firebase/firestore";
import styles from '../../styles/YearCard.module.scss'
import SubjectCard from './SubjectCard'; 
export default function Semester({semesterNO, db}) {
    const [SubjectName, setSubjectName] = useState("")
    const [Credits, setCredits] = useState(0)
    const { user, addSubject  } = useAuth()
    const [subjects, setsubjects] = useState([])
    const [loading, setloading] = useState(true)


useEffect(() => {
  if(user){
  onSnapshot(collection(db,user.uid,('Semester ' + semesterNO), "Subjects"), (snapshot) => {
    setsubjects(snapshot.docs.map(doc => ({
        //generate array and populate with id and doc data
        ID: doc.id,
        ...doc.data(),
    })))
    setloading(false)})
  }
   
 
}, [user]);
   

   

  return (
    
    <>
    {
      loading ? loading :
    <>
          <h1>Semester {semesterNO}</h1>
          {subjects.map((subject) => {
              return <SubjectCard key={subject.ID} Mark={subject.Mark} semesterNO={semesterNO} Name={subject.Name} credits={subject.Credits} subjectID={subject.ID}></SubjectCard>;
            })}
         <form  className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          addSubject(semesterNO, SubjectName, Credits);
        } }>
          <h5>Add Subject</h5>

          <span>
          <p>Subject Name</p>
          <input name="subjectName" required onChange={e => setSubjectName(e.target.value)}></input>
          </span>

          <span>
          <p>Credits</p>
          <input name="Credits" required onChange={e => setCredits(e.target.value)}></input>
          </span>

          <button>Submit</button>
        </form>
    </>
    }
    </>
    
  )

      
}

