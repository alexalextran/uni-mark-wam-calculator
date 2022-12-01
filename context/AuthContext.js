import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { collection, addDoc, getFirestore, setDoc, updateDoc, doc, getDocs  } from "firebase/firestore"; 
const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const db = getFirestore();

   const addYear = async () => {
  let years = await getDocs(collection(db, "Years"));

   await addDoc(collection(db, "Years"), {
    Year: (years.docs.length + 1),
    UID: user.uid
   })
  }

  const addSubject = async (yearID, subjectName, credits) => {
    await addDoc(collection(db,"Years",yearID, "Subjects"), {
      YearID: yearID,
      Name: subjectName,
      Credits: credits
    });
    }

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addYear, addSubject }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}