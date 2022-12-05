import React from 'react';
import styles from '../../styles/AssignmentCard.module.scss'
import { useAuth } from '../../context/AuthContext'
 
const AssignmentCard = ({Assignment, asID}) => {
    const { deleteAssignment } = useAuth()
    return (
        <main className={styles.main}>
            <p>{Assignment.Name}</p>
            
             <p>Weighting: {Assignment.Weighting}%</p>
        
             <p>Mark - total grade {((Assignment.Mark/100)*(Assignment.Weighting/100)*100).toFixed(1)}%</p>

             <button onClick={() => {
                deleteAssignment(Assignment.YearNO, Assignment.SubjectID, asID)
             }}>Delete</button>
        </main>
    );
}

export default AssignmentCard;
