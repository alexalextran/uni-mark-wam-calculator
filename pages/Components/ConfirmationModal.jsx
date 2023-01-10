import React from 'react';
import styles from "../../styles/ConfirmationModal.module.scss";
import { useAuth } from "../../context/AuthContext";

const ConfirmationModal = ({setconfirm, semesterNO}) => {
    const { deleteSemester } = useAuth();
    return (
        <main className={styles.main}>
           <div><h3>Are you sure you want to delete semester {semesterNO}?</h3>
           <span><button onClick={() => {setconfirm(false)}}>No</button>
           <button onClick={() => {deleteSemester(semesterNO)}}>Yes</button></span>
           </div> 
        </main>
    );
}

export default ConfirmationModal;
