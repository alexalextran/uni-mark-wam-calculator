import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { collection, addDoc, getFirestore, setDoc, deleteDoc, doc, getDocs, updateDoc, query, where, collectionGroup  } from "firebase/firestore"; 

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [Contextsubjects, setContextsubjects] = useState([])
  const [Contextassignments, setContextassignments] = useState([])
  const [wam, setwam] = useState(0)
  const [totalcredits, settotalcredits] = useState(0)

//console.log(user)

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


  const calulateWAM =  async () => {
    const q = query(collectionGroup(db, "Subjects"), where("UID", "==",  `${user.uid}`));
    const querySnapshot = await getDocs(q);
    let totalmarks = 0
    let totalcredits = 0
  
    querySnapshot.forEach((doc) => {
  
     totalmarks += +doc.data().Mark * +doc.data().Credits
     totalcredits += +doc.data().Credits
  });
      settotalcredits(totalcredits)
      setwam((totalmarks/totalcredits).toFixed(2))
  }

   const addSemester = async () => {
  let semsters = await getDocs(collection(db, user.uid));

   await setDoc(doc(db, user.uid, ('Semester ' + (semsters.docs.length + 1))), {
    semesterNO: (semsters.docs.length + 1),
    UID: user.uid
   })
  }

  async function checkWeighting(weighting , subjectID){
    const q = query(collectionGroup(db, "Assignments"), where("SubjectID", "==",  `${subjectID}`));
    const querySnapshot = await getDocs(q);
    let totalWeighting = 0
    querySnapshot.forEach((doc) => {
      totalWeighting += +doc.data().Weighting
  });
  console.log(+totalWeighting + +weighting > 100)
    return(+totalWeighting + +weighting > 100) 
  }


  const addSubject = async (semesterNO, subjectName, credits, Mark) => {
    
      await addDoc(collection(db, user.uid, ('Semester ' + semesterNO), "Subjects"), {
        semesterNO: semesterNO,
        Name: subjectName,
        Credits: credits,
        UID: user.uid,
        Mark: +Mark
      });
   
  
    calulateWAM()
    }

    const deleteSubject = async (semesterNO, subjectID) => {
      await deleteDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID));

      calulateWAM()
      }


    const deleteAssignment = async (semesterNO, subjectID, assignmentID) => {
      await deleteDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID, "Assignments", assignmentID));

      let totalMark = 0;
      const assignments = await getDocs(collection(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID,  "Assignments"))
      assignments.forEach((doc) => {
        totalMark += (((+doc.data().Mark)*(+doc.data().Weighting))/100)
      })

      await updateDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID), {
        Mark: totalMark
      })

      calulateWAM()
      }

    const addAssignment = async (semesterNO, subjectName, subjectID, weighting, Asname, Mark, Index) => {
      try {

       if (await checkWeighting(weighting, subjectID)){
        throw new Error("Weighting for assignments should not add to more than 100, Please try again")
       }
      
      await addDoc(collection(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID,  "Assignments"), {
        semesterNO: semesterNO,
        Subject: subjectName,
        Weighting: +weighting,
        Name: Asname,
        Mark: Mark,
        UID: user.uid,
        SubjectID: subjectID,
        Index
      });

      let totalMark = 0;
      const assignments = await getDocs(collection(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID,  "Assignments"))
      assignments.forEach((doc) => {
        totalMark += (((+doc.data().Mark)*(+doc.data().Weighting))/100)
      })
     
      await updateDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID), {
        Mark: totalMark
      })} catch (error) {
        alert(error.message)
      }

      calulateWAM()
      }

  const modalchange = async (nameinput, creditinput, semesterNO, subjectID) => {
    await updateDoc(doc(db, user.uid, ('Semester ' + semesterNO), "Subjects", subjectID), {
      Credits: creditinput,
      Name: nameinput,
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
    <AuthContext.Provider value={{ user, login, signup, logout, addSemester, addSubject, addAssignment, deleteAssignment, Contextsubjects, setContextsubjects, Contextassignments, setContextassignments, calulateWAM, wam, deleteSubject, totalcredits, modalchange}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}