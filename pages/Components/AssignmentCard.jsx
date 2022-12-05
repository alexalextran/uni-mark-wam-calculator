import React from 'react';
import styles from '../../styles/AssignmentCard.module.scss'
const AssignmentCard = ({Assignment}) => {
    return (
        <main className={styles.main}>
            <p>{Assignment.Name}</p>
            
             <p>Weighting: {Assignment.Weighting}%</p>
        
             <p>Mark - total grade {((Assignment.Mark/100)*(Assignment.Weighting/100)*100).toFixed(1)}%</p>

             <button>Delete</button>
        </main>
    );
}

export default AssignmentCard;
