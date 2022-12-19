import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
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
};

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())
  // if user data doesn't exists
  // create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()
    try{
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt
      })
    } catch (error) {
      console.log("Error creating the user", error.message)
    }
  }
  // if user data exists
  // return userDocRef
  return userDocRef
}