import React from "react";
import styles from "../../styles/AssignmentCard.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useSpring, animated } from '@react-spring/web'


const AssignmentCard = ({ Assignment, asID, index }) => {
  const { deleteAssignment } = useAuth();
  
  const trans = useSpring({
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: index*150
  })


  return (

    <animated.div style={trans}>
 
    <main className={styles.main}>
      <p>{Assignment.Name}</p>

      <p>Weighting: {Assignment.Weighting}%</p>

      <p>
        Mark - total grade{" "} 
        {((Assignment.Mark / 100) * (Assignment.Weighting / 100) * 100).toFixed( //formula for calculating wam impact
          1
        )}
        %
      </p>

      <button
        onClick={() => {
          deleteAssignment(Assignment.semesterNO, Assignment.SubjectID, asID)
        }}
      >
        Delete
      </button>
    </main>
      </animated.div>
  );
};

export default AssignmentCard;
