import { authService, firebaseInstance } from "fBase"
import React,{useState} from "react"

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error,setError] = useState("")

    const onChange = (event) =>{
       const {target:{name, value}} = event
       if(name === "email"){
           setEmail(value)
       }else if(name === "password") {
            setPassword(value)
       }
    }
    const onSubmit = async(event)=>{
        event.preventDefault()
        let data
       try{
        if(newAccount){
            // create account
          data = await authService.createUserWithEmailAndPassword(email,password)
        }else{
            // log in
            data =  await authService.signInWithEmailAndPassword(email,password)
        }
        console.log(data)
       } catch(error){
           setError(error.message)
       }
    }

    //newAccount의 true를 인자로 받아 false로 바꾸는 것
    const toggleAccount = () =>{setNewAccount((prev) => !prev)}

    const onSolcialClick = async(event) =>{
        const {target:{name}} = event;
        let provider;

        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input 
            name="email" 
            type="email" 
            placeholder="E-MAIL"
            required 
            value={email} 
            onChange={onChange}/>

            <input 
            name="password" 
            type="password" 
            placeholder="PASSWORD" 
            required 
            value={password} 
            onChange={onChange}/>

            <input type="submit" value={newAccount ? "create Account" : "sign In"}  />
            {error}
        </form>
    <span onClick={toggleAccount}>{newAccount? "sign in": "create Account"}</span>
        <div>
            <button name="google" onClick={onSolcialClick}> Continue with Google</button>
            <button name="github" onClick={onSolcialClick}> Continue with GitHub</button>
        </div>
    </div>
    )
}

export default Auth