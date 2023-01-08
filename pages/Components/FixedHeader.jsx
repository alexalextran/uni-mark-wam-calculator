import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from "../../styles/FixedHeader.module.scss";


const FixedHeader = () => {
    
const { logout, addSemester, wam } = useAuth()


    return (
        <div className={styles.main}>

    <span>
        <button onClick={() => {
            logout();
        }}>Signout</button>
        
        <button onClick={() => {
                        addSemester();
        }}>Add Semester</button>
    </span>  
        
        <h2>Current Weighted Average Mark: <span className={styles.orange}>{wam}</span></h2>
    </div>
    );
}

export default FixedHeader;
