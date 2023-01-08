import React, { useState } from 'react';
import styles from "../../styles/EditModal.module.scss";
import { useAuth } from "../../context/AuthContext";

const EditModal = ({setedit, Name, credits, semesterNO, subjectID}) => {
    const [nameInput, setnameInput] = useState(Name)
    const [creditsInput, setcreditsInput] = useState(credits)
    const {modalchange } = useAuth();
    return (
        <main className={styles.main}>
            <div className={styles.modal}>
            <div>
                <form>

                 <span>
                    <h3>Name</h3>
                    <input onChange={(e) => setnameInput(e.target.value)} defaultValue={Name}></input>
                 </span>

                 <span>
                    <h3>Credits</h3>
                    <input onChange={(e) => setcreditsInput(e.target.value)} defaultValue={credits}></input>
                 </span>

               
                 
                 
                </form>
                <p>Note mark cannot be changed since it may conflict with the assignments if there are any</p>
            </div>
            <span>
               <button onClick={() => setedit(false)}>Cancel</button>
               <button onClick={() => {
                modalchange(nameInput, creditsInput.toString(), semesterNO,  subjectID)
                setedit(false)
               }}>Submit</button> 
            </span>
            
                </div>
        </main>
    );
}

export default EditModal;
