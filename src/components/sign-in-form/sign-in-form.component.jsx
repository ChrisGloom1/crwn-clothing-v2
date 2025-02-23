import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import Button from "../button/button.component"
import { 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils" 


const defaultFormFields = {
  email: "",
  password: ""
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch(error) {
      switch(error.code){
        case "auth/user-not-found":
          alert("Incorrect password for email")
          break;
        case "auth/wrong-password":
          alert("No user found with this email")
          break;
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormFields({...formFields, [name]:value})
  }

  return(
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          label="Email"
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email}
        />

        <FormInput 
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password}
        />

        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" onClick={signInWithGoogle} buttonType="google">Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm