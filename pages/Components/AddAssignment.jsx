import React, {useState } from "react";
import styles from "../../styles/AddAssignment.module.scss";
import { useAuth } from "../../context/AuthContext";
import AssignmentCard from "./AssignmentCard.jsx";
import { useSpring, animated } from '@react-spring/web'
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
  const { addAssignment } = useAuth();

  const trans = useSpring({
    from: { y: -50, opacity: 0},
    to: { y: 0, opacity: 1},
    delay: Assignments.length*200
  })

  return (
    
    <main>
      {Assignments.sort(
        (a, b) => parseFloat(a.Index) - parseFloat(b.Index)
      ).map((Assignment, index) => {
        return (
          <>
            <AssignmentCard
              index={index}
              key={Assignment.ID}
              asID={Assignment.ID}
              Assignment={Assignment}
            >
              {" "}
            </AssignmentCard>
          </>
        );
      })}
    <animated.div style={trans}>
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
      </animated.div>
    </main>
   
  );
}
