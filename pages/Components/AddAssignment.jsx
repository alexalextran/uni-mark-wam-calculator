import React, { useEffect, useState } from "react";
import styles from "../../styles/AddAssignment.module.scss";
import { useAuth } from "../../context/AuthContext";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import AssignmentCard from "./AssignmentCard.jsx";
export default function AddAssignment({
  semesterNO,
  Name,
  subjectID,
  Assignments,
}) {
  const [AsName, setAsName] = useState("");
  const [weighting, setweigthing] = useState();
  const [Mark, setMark] = useState();
  const [OutOf, setOutOf] = useState();
  const { addAssignment, user } = useAuth();
  const db = getFirestore();

  // useEffect(() => {
  //     onSnapshot(collection(db,user.uid,('Semester ' + semesterNO), "Subjects", subjectID, "Assignments"), (snapshot) => {
  //         setAssignments(snapshot.docs.map(doc => ({
  //           //generate array and populate with id and doc data
  //           ID: doc.id,
  //           ...doc.data(),
  //       })))
  //       setloading(false)})

  //   }, []);

  return (
    <main>
      {Assignments.sort(
        (a, b) => parseFloat(a.Index) - parseFloat(b.Index)
      ).map((Assignment) => {
        return (
          <>
            <AssignmentCard
              key={Assignment.ID}
              asID={Assignment.ID}
              Assignment={Assignment}
            >
              {" "}
            </AssignmentCard>
          </>
        );
      })}

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addAssignment(
            semesterNO,
            Name,
            subjectID,
            weighting,
            AsName,
            (+Mark / +OutOf) * 100,
            Assignments.length + 1
          );
          //todo retrieve the updated mark from db and set the input value to that new mark
        }}
      >
        <h5>Add Assignment</h5>

        <span>
          <p>Assignment Name</p>
          <input
            name="AssignmentName"
            required
            onChange={(e) => setAsName(e.target.value)}
          ></input>
        </span>

        <span>
          <p>Weighting</p>
          <input
            name="Weighting"
            required
            onChange={(e) => setweigthing(e.target.value)}
          ></input>
        </span>

        <span>
          <p>Mark</p>
          <input
            name="Mark"
            required
            onChange={(e) => setMark(e.target.value)}
          ></input>
          /
          <input
            name="OutOf"
            required
            onChange={(e) => setOutOf(e.target.value)}
          ></input>
        </span>

        <button>Submit</button>
      </form>
    </main>
  );
}
