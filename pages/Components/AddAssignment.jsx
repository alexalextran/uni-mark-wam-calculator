import React, { useEffect, useState } from 'react'
import styles from '../../styles/AddAssignment.module.scss'
import { useAuth } from '../../context/AuthContext' 
import { collection, onSnapshot,getFirestore  } from "firebase/firestore";
export default function AddAssignment({Year, Name, subjectID}) {
    const [AsName, setAsName] = useState("")
    const [weighting, setweigthing] = useState()
    const [Mark, setMark] = useState()
    const [OutOf, setOutOf] = useState()
    const { addAssignment, user } = useAuth()
    const [Assignments, setAssignments] = useState([])
    const [loading, setloading] = useState(true)
    const db = getFirestore();


    useEffect(() => {
        onSnapshot(collection(db,user.uid,('Year ' + Year), "Subjects", subjectID, "Assignments"), (snapshot) => {
            setAssignments(snapshot.docs.map(doc => ({
              //generate array and populate with id and doc data
              ID: doc.id,
              ...doc.data(),
          })))
          setloading(false)})
         
       
      }, []);
    
  return (
    <main  >
        
        {

        Assignments.map((Assignment) =>{
             return <>
              <p>{Assignment.Name}</p>
              <br></br>
             <p>{Assignment.Weighting}%</p>
             <br></br>
             <p>{((Assignment.Mark/100)*(Assignment.Weighting/100)*100)}%</p>
             </>
        })
        }


        <form  className={styles.form} onSubmit={(e) => {
            e.preventDefault();

            addAssignment(Year, Name, subjectID, weighting, AsName, (((+Mark)/(+OutOf))*100))
        }}>
          <h5>Add Assignment</h5>

          <span>
          <p>Assignment Name</p>
          <input name="AssignmentName" required onChange={e => setAsName(e.target.value)}></input>
          </span>

          <span>
          <p>Weighting</p>
          <input name="Weighting" required onChange={e => setweigthing(e.target.value)}></input>
          </span>

          <span>
          <p>Mark</p>
          <input name="Mark" required onChange={e => setMark(e.target.value)}></input>
          /
          <input name="OutOf" required onChange={e => setOutOf(e.target.value)}></input>
          </span>


          <button>Submit</button>
        </form>
    </main>
  )
}