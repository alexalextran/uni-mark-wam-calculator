import React from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from "../../styles/FixedHeader.module.scss";


const FixedHeader = () => {
    
const { logout, addSemester, wam, user } = useAuth()


    return (
        <div className={styles.main}>

    
       
        <ul>
            <span>
            <li>Fail 0 - 49</li>
            <li>Pass 50 - 64</li>
            <li>Credit 65 - 74</li>
            <li>Disctinction 75 - 84</li>
            <li>High Distinction: 85+</li>
            </span>
        </ul>

        <span className={styles.userinfo}>
            <p>Current User: <span>{user.email}</span></p>
        </span>
    

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
