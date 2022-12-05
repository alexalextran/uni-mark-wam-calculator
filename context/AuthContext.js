import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { collection, addDoc, getFirestore, setDoc, deleteDoc, doc, getDocs, updateDoc  } from "firebase/firestore"; 
const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
console.log(user)

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
  let years = await getDocs(collection(db, user.uid));

   await setDoc(doc(db, user.uid, ('Year ' + (years.docs.length + 1))), {
    Year: (years.docs.length + 1),
    UID: user.uid
   })
  }

  const addSubject = async (YearNO, subjectName, credits) => {
    await addDoc(collection(db, user.uid, ('Year ' + YearNO), "Subjects"), {
      YearNO: YearNO,
      Name: subjectName,
      Credits: credits,
      UID: user.uid,
      Mark: 0
    });
    }

    const deleteAssignment = async (YearNO, subjectID, assignmentID) => {
      await deleteDoc(doc(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID, "Assignments", assignmentID));

      let totalMark = 0;
      const assignments = await getDocs(collection(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID,  "Assignments"))
      assignments.forEach((doc) => {
        totalMark += (((+doc.data().Mark)*(+doc.data().Weighting))/100)
      })

      await updateDoc(doc(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID), {
        Mark: totalMark
      })
      
      }

    const addAssignment = async (YearNO, subjectName, subjectID, weighting, Asname, Mark) => {
      await addDoc(collection(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID,  "Assignments"), {
        YearNO: YearNO,
        Subject: subjectName,
        Weighting: +weighting,
        Name: Asname,
        Mark: Mark,
        UID: user.uid,
        SubjectID: subjectID
      });

      let totalMark = 0;
      const assignments = await getDocs(collection(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID,  "Assignments"))
      assignments.forEach((doc) => {
        totalMark += (((+doc.data().Mark)*(+doc.data().Weighting))/100)
      })
      console.log(totalMark)

      await updateDoc(doc(db, user.uid, ('Year ' + YearNO), "Subjects", subjectID), {
        Mark: totalMark
      })
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
    <AuthContext.Provider value={{ user, login, signup, logout, addYear, addSubject, addAssignment, deleteAssignment }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}