import logo from '../logo.svg';
import '../App.css';
import { NavLink, Switch, Route, useHistory, Redirect } from "react-router-dom"
import { useState, useEffect } from "react";
import Register from './Register'
import Login from './Login'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import 'semantic-ui-css/semantic.min.css'



function App() {
  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
 
  let history = useHistory()

  useEffect(()=> {
    fetch('/me').then((r) => {
      if (r.ok){
        r.json().then((user)=> {
          setUser(user)
          setLoggedIn(true)
        })
      }
    })
  },[])

  function handleLogin(userObj){
    setUser(userObj)
    setLoggedIn(true)
  }


  function handleLogout(){
    setUser({})
    setLoggedIn(false)
  }
 

  return (
    <div className="App">
      {loggedIn? <Navbar loggedIn={loggedIn} handleLogout={handleLogout} /> : <> </>}
      <Switch>
       
        <Route exact path = '/'>
          { loggedIn? <Searchbar/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path = '/login'>
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route exact path = '/register'>
          <Register handleLogin={handleLogin}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
{/* <Login handleLogin={handleLogin}/> */}