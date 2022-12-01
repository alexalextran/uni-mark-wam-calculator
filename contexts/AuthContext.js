import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
const [currentUser, setcurrentUser] = useState(null);
const [loading, setloading] = useState(true);

function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
}

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

function logout(){
    return auth.signOut()
}

useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged(user =>{
    setcurrentUser(user)
    setloading(false)
 
})
return unsubscribe
}, []);


const value = {
    currentUser,
    login,
    logout,
    signup,
    loading
}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}