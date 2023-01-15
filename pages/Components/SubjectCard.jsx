import React, { use, useEffect, useRef, useState } from "react";
import styles from "../../styles/SubjectCard.module.scss";
import { useAuth } from "../../context/AuthContext";
import AddAssignments from "./AddAssignment.jsx";
import {
  collection,
  onSnapshot,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import EditModal from "./EditModal";
export default function SubjectCard({
  Name,
  credits,
  semesterNO,
  subjectID,
  Mark,
}) {
  
  


  const { user, deleteSubject, wam, totalcredits } = useAuth();
  const [showAssignments, setshowAssignments] = useState(false);
  var wamImpact = (
    wam -
    (wam * totalcredits - Mark * credits) / (totalcredits - credits)
  ).toFixed(3);
  const [Assignments, setAssignments] = useState([]);
  const db = getFirestore();
  const customMark = useRef();
  const [edit, setedit] = useState(false);


  

  useEffect(() => {
    onSnapshot(
      collection(
        db,
        user.uid,
        "Semester " + semesterNO,
        "Subjects",
        subjectID,
        "Assignments"
      ),
      (snapshot) => {
        setAssignments(
          snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, []);

  if (customMark.current != undefined) {
    customMark.current.addEventListener("keyup", async (event) => {
      if (event.key === "Enter") {
        await updateDoc(
          doc(db, user.uid, "Semester " + semesterNO, "Subjects", subjectID),
          {
            Mark: +customMark.current.value,
          }
        );
      }
    });
  }

  const grading = (mark) => {
    
    switch (true) {
  case mark.Mark < 50:
     return "F"
      
  case mark.Mark < 65:
     return "P"
      
  case mark.Mark < 75:
     return "C"
       
  case mark.Mark < 85:
     return "D"
    
    default:
    return "HD"
   
}   
  }

  return (
    <>
      <main className={styles.main}>
        <h3>{Name}</h3>
        <p>Credits {credits}</p>
        <p>Mark {Mark}</p>
        <p>{grading({Mark})}</p>
        <p style={{ color: wamImpact > 0 ? "green" : "red" }}>
          {totalcredits - credits == 0 ? Mark : wamImpact}
        </p>
     

        <button style={{ backgroundColor: showAssignments ? "rgba(255,92,53, .7)" : "" }}
          onClick={() => {
            setshowAssignments(!showAssignments);
          }}
        >
          Assignments
        </button>

        <button
          onClick={() => {
            setedit(true);
          }}
        >
          Edit
        </button>

        <button
          onClick={() => {
            deleteSubject(semesterNO, subjectID);
          }}
        >
          Delete
        </button>

      </main>
      {
        edit ? <EditModal semesterNO={semesterNO} subjectID={subjectID} setedit={setedit} credits={credits} Name={Name}></EditModal> : <span></span>
      }

      {showAssignments ? (
        <AddAssignments
          key={subjectID}
          showAssignments={showAssignments}
          Assignments={Assignments}
          customMark={customMark.current}
          semesterNO={semesterNO}
          subjectID={subjectID}
          Name={Name}
        ></AddAssignments>
      ) : (
        <span></span>
      )}
    </>
  );
}
