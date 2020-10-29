import React from "react"
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter= ({isLoggedIn, userObj})=> {
    
    return(    
    <Router>
        {/*  <Navigation/> 보이려면 isLoggedIn 가 true여야한다 */}
        {isLoggedIn && <Navigation/>}
        <Switch>
            {isLoggedIn ?
               ( <>   
                <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route> 
                <Route exact path="/profile">
                    <Profile/>
                </Route>
               
                </>)
                : ( <>   
                <Route exact path="/">
                    <Auth/>
                </Route> 
                
                </>)}
        </Switch>
    </Router>
    )

}
export default AppRouter