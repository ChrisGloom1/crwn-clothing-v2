import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA-xW5Ms6X5yZUQZP0EVlqCXz1wATQ5j04",
  authDomain: "crwn-clothing-db-86322.firebaseapp.com",
  projectId: "crwn-clothing-db-86322",
  storageBucket: "crwn-clothing-db-86322.appspot.com",
  messagingSenderId: "149549418930",
  appId: "1:149549418930:web:22dd973502b9d2a71c7cab"
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()

export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider)

export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
if (!userAuth) return
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()
    try{
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log("Error creating the user", error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)