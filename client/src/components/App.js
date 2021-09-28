
import '../App.css';
import { Switch, Route, Redirect, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Register from './Register'
import Login from './Login'
import Navbar from './Navbar'
// import Searchbar from './Searchbar'
import Home from './Home'
import MyHikes from './MyHikes'
import HikeList from './HikeList'
import 'semantic-ui-css/semantic.min.css'
import Completed from './Completed'
import CreateHike from './CreateHike'
import EditHike from './EditHike'




function App() {
  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
 
 

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
          { loggedIn? <Home user={user}/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path = '/login'>
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route exact path ='/create-a-hike'>
          <CreateHike user={user}/>
        </Route>
        <Route exact path='/hike/:id'>
          <EditHike />
        </Route>
        <Route exact path = '/register'>
          <Register handleLogin={handleLogin}/>
        </Route>
        <Route exact path ='/myhikes/completed'>
          <Completed user={user}/>
        </Route>
        <Route exact path ='/myhikes/created'>
          <MyHikes user={user}/>
        </Route>
        <Route path ='/myhikes'>
          <HikeList user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
{/* <Login handleLogin={handleLogin}/> */}