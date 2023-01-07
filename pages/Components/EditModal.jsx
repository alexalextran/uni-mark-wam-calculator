import React from 'react';
import styles from "../../styles/EditModal.module.scss";

const EditModal = () => {
    return (
        <main className={styles.main}>
            <div className={styles.modal}>
            <div>
                <form>
                 <span>
                    <p>Name</p>
                    <input></input>
                 </span>
                 
                 
                </form>
            </div>
            <span>
               <button>Cancel</button>
               <button>Submit</button> 
            </span>
            
                </div>
        </main>
    );
}

export default EditModal;
