import { authService } from "fBase"
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

    const toggleAccount = () =>{setNewAccount((prev) => !prev)}
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
            <button> Continue with Google</button>
            <button> Continue with GitHub</button>
        </div>
    </div>
    )
}

export default Auth