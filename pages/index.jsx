import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import Signup from './Components/Signup';
import LoginBox from './Components/LoginBox';
import styles from "../styles/IndexBG.module.scss";
import useWindowDimensions from '../Hooks/useWindowDimensions';
import anime from 'animejs';

export default function Index() {
  const {Anime} = anime
  const animation = useRef(null);

    const router = useRouter();
    const [error, setError] = useState(null);
    const [toggleSignup, settoggleSignup] = useState(false)
    const { user, login } = useAuth()
    const { height, width } = useWindowDimensions();

    
let rows = Math.floor(height/50)
let columns = Math.floor(width/50)
console.log(columns, rows)
let tilesize = new Array(columns*rows).fill(0)

    useEffect(() => {
        (user) ? router.push('/Dashboard') : console.log("User has not logged in")
      }, [user])




const colors = [
  "rgb(229, 57, 53)",
  "rgb(253, 216, 53)",
  "rgb(156, 39, 176)",
  "rgb(2, 2, 2)",
  "rgb(156, 156, 156)",
]

let count =  - 1

const handleOnClick = index => {
  count = count + 1
  let animation = anime({
    targets: `#tiles`,
    backgroundColor: colors[count % (colors.length - 1)],
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
   
  }); 
}

  return (
    <main className={styles.main}>
    {/* <button onClick={() => {
            settoggleSignup(!toggleSignup);
          } }>Swtich</button>
    {
      toggleSignup ? <Signup/> : <LoginBox/>
    } */}
    <p className='nice'>Nice</p>
    <div id={styles.tile} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}}>
    {
      
      tilesize.map((bruh, index) => {
        return ( (
          <>
        
          <div
            key={index} id="tiles" className={styles.tiles} onClick={() => { handleOnClick(index); } }>
          </div>
        
          </>
        
        ))
      })
    }
    </div>


    </main>
  )
}
