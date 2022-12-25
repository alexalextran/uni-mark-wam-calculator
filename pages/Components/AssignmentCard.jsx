import React from "react";
import styles from "../../styles/AssignmentCard.module.scss";
import { useAuth } from "../../context/AuthContext";
import { getFirestore } from "firebase/firestore";

const AssignmentCard = ({ Assignment, asID, getSubject }) => {
  const { deleteAssignment } = useAuth();
  //const db = getFirestore();
  

  return (
    <main className={styles.main}>
      <p>{Assignment.Name}</p>

      <p>Weighting: {Assignment.Weighting}%</p>

      <p>
        Mark - total grade{" "}
        {((Assignment.Mark / 100) * (Assignment.Weighting / 100) * 100).toFixed(
          1
        )}
        %
      </p>

      <button
        onClick={() => {
          deleteAssignment(Assignment.semesterNO, Assignment.SubjectID, asID).then(getSubject())
        }}
      >
        Delete
      </button>
    </main>
  );
};

export default AssignmentCard;
