import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import Signup from './Components/Signup';
import LoginBox from './Components/LoginBox';
import styles from "../styles/IndexBG.module.scss";
import useWindowDimensions from '../Hooks/useWindowDimensions';
export default function Index() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [toggleSignup, settoggleSignup] = useState(false)
    const { user, login } = useAuth()
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        (user) ? router.push('/Dashboard') : console.log("User has not logged in")
      }, [user])


let rows = Math.floor(height/50)
let columns = Math.floor(width/50)
console.log(columns, rows)
let tilesize = new Array(columns*rows).fill(0)



  return (
    <main className={styles.main}>
    {/* <button onClick={() => {
            settoggleSignup(!toggleSignup);
          } }>Swtich</button>
    {
      toggleSignup ? <Signup/> : <LoginBox/>
    } */}
    <div id={styles.tile} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}}>
    {
      tilesize.map((bruh, index) => {
        return ( (<div  key={index} className={styles.tiles}> </div>))
      })
    }
    </div>


    </main>
  )
}
