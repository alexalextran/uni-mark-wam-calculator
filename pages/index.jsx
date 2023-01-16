import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import Signup from './Components/Signup';
import LoginBox from './Components/LoginBox';
import styles from "../styles/IndexBG.module.scss";
import useWindowDimensions from '../Hooks/useWindowDimensions';
import anime from 'animejs';

export default function Index() {

    const router = useRouter();
    const [error, setError] = useState(null);
    const [toggleLogIn, settoggleLogIn] = useState(true)
    const { user, login } = useAuth()
    const { height, width } = useWindowDimensions();

    
let rows = Math.floor(height/50)
let columns = Math.floor(width/50)
let tilesize = new Array(columns*rows).fill(0)

    useEffect(() => {
        if(user) router.push('/Dashboard')
      }, [user])

const handleOnClick = index => {
  settoggleLogIn(!toggleLogIn)
  let animation = anime({
    targets: `#tiles`,
    opacity: toggleLogIn ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
   
  }); 
}

  return (
    <main className={styles.mainwrapper}>
      <div className={styles.main}>
   
    <div id={styles.tile} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}}>
    {
      

      tilesize.map((bruh, index) => {
        return ( (
        
        
          <div
             id="tiles" key={index} className={styles.tiles} onClick={() => { handleOnClick(index); } }>
          </div>
      
        
        ))
      })
    }

      {
        toggleLogIn ? <LoginBox handleOnClick={handleOnClick} titlesize={tilesize.length}/> : <Signup handleOnClick={handleOnClick} titlesize={tilesize.length}/>
      }
    </div>
      </div>

    </main>
  )
}
