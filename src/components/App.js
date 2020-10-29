import React,{useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fBase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    //onAuthStateChanged()은  유저의 sign-in state에 변화가 감지될때마다 실행 되는 method
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true)  
      }else{
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing.... "}
    <footer>
      &copy;  {new Date().getFullYear()}Nwitter
    </footer>
    </>
  );
}

export default App;
