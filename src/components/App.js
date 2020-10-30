import React,{useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fBase";

function App() {
  const [init, setInit] = useState(false) 
  const [userObj, setUserObj] = useState(null) //모든 route에서 user정보가 필요하기때문에 최상위에 위치함

  useEffect(()=>{
    //onAuthStateChanged()은  유저의 sign-in state에 변화가 감지될때마다 실행 되는 method
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj(user);
      }
      setInit(true) //init 이 항상 true인 이유는 언제든지 자동로그인을 위해서
    })
  },[])
  return (
    <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "initializing.... "}
    <footer>
      &copy;  {new Date().getFullYear()}Nwitter
    </footer>
    </>
  );
}

export default App;
