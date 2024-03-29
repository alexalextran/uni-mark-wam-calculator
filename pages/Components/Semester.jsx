import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "../../styles/SemesterCard.module.scss";
import SubjectCard from "./SubjectCard";
import { RxCross1 } from 'react-icons/rx';
import ConfirmationModal from "./ConfirmationModal.jsx";
import { useRouter } from 'next/router';

export default function Semester({ semesterNO, db, lastindex }) {
  const [SubjectName, setSubjectName] = useState("");
  const [Credits, setCredits] = useState(6);
  const [Mark, setMark] = useState(0);
  const { user, addSubject, wam, totalcredits } = useAuth();
  const [subjects, setsubjects] = useState([]);
  const [loading, setloading] = useState(true);
  const [confirm, setconfirm] = useState(false)
  const router = useRouter();

  useEffect(() => {

    if(!user) router.push('/')
var unsubscribe = () => {}


   try {
      unsubscribe = 
      onSnapshot(
        collection(db, user.uid, "Semester " + semesterNO, "Subjects"),
        (snapshot) => {
          setsubjects(
            snapshot.docs.map((doc) => ({
              //generate array and populate with id and doc data
              ID: doc.id,
              ...doc.data(),
            }))
          );
          setloading(false);
        }
      );}
      catch (error) {
    
      }
    
    return () => unsubscribe()
  }, [user]);

  let allmarks = 0;
  let allcredits = 0;
  //calcuate total mark and credits
  subjects.forEach((subject) => {
    allmarks += subject.Mark;
    allcredits += +subject.Credits;
  });

  var wamImpact = ( //formula for calulating wam impact for each semester
    wam - (wam * totalcredits - (allmarks / subjects.length) * allcredits) / (totalcredits - allcredits)).toFixed(3);
  return (
    <>
      {loading ? (
        <span>Loading</span>
      ) : (

         <>
           {confirm ? <ConfirmationModal semesterNO={semesterNO} setconfirm={setconfirm}/> : ""}
         
         <main className={styles.main}>
            <h1>Semester {semesterNO}{ lastindex ? <span className={styles.exitbutton}><RxCross1 onClick={() => setconfirm(true)} /></span> : <span></span>}</h1>
            {<p className={styles.wam}>
              Impact on wam for this semester:
              <span style={{ color: wamImpact > 0 ? "green" : "red" }}>
              { " "} {totalcredits - allcredits == 0
                  ? allmarks / subjects.length
                  : + wamImpact} 
              </span>
            </p>}

            {subjects.map((subject) => {
              return (
                <SubjectCard
                  key={subject.ID}
                  Mark={subject.Mark}
                  semesterNO={semesterNO}
                  Name={subject.Name}
                  credits={subject.Credits}
                  subjectID={subject.ID}
                ></SubjectCard>
              );
            })}

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                addSubject(semesterNO, SubjectName, Credits, Mark);
              } }
            >
              <h5>Add Subject</h5>

              <span>
                <p>Subject Name</p>
                <input
                  name="subjectName"
                  required
                  onChange={(e) => setSubjectName(e.target.value)}
                ></input>
              </span>


              <span>
                <p>Mark</p>
                <input
                  name="Mark"
                  onChange={(e) => 
                    { 
                      isNaN(e.target.value)
                      ? (
                        alert("Mark must only be a numeric value"),  e.target.value = ""
                      )
                      : setMark(e.target.value)
                    }
                }
                    
                ></input>
              </span>

              <span>
                <p>Credits</p>
                <input
                  name="Credits"
                  onChange={(e) =>{
                    isNaN(e.target.value)
                      ? (
                        alert("Credit must only be a numeric value"),  e.target.value = ""
                      )
                      : setCredits(e.target.value)
                  }}
                ></input>
              </span>

              <button>Submit</button>
            </form>
          </main></>
      )}
    
    </>
  );
}
