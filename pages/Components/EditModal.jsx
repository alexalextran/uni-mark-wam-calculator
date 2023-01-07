import React from 'react';
import styles from "../../styles/EditModal.module.scss";

const EditModal = ({setedit, Name, credits}) => {
    return (
        <main className={styles.main}>
            <div className={styles.modal}>
            <div>
                <form>

                 <span>
                    <h3>Name</h3>
                    <input defaultValue={Name}></input>
                 </span>

                 <span>
                    <h3>Credits</h3>
                    <input defaultValue={credits}></input>
                 </span>

               
                 
                 
                </form>
                <p>Note mark cannot be changed since it may conflict with the assignments if there are any</p>
            </div>
            <span>
               <button onClick={() => setedit(false)}>Cancel</button>
               <button>Submit</button> 
            </span>
            
                </div>
        </main>
    );
}

export default EditModal;
