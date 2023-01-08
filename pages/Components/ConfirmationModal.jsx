import React from 'react';
import styles from "../../styles/ConfirmationModal.module.scss";

const ConfirmationModal = ({setconfirm, semesterNO}) => {
    return (
        <main className={styles.main}>
           <div><h3>Are you sure you want to delete semester {semesterNO}?</h3>
           <span><button onClick={() => {setconfirm(false)}}>No</button>
           <button>Yes</button></span>
           </div> 
        </main>
    );
}

export default ConfirmationModal;
