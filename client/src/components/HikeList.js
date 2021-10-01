import { useEffect, useState} from 'react'
import HikeListCard from './HikeListCard'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function HikeList(){
    const [hikeList, setHikeList]= useState([])
    const [user, setUser]=useState()

    useEffect(()=> {
        fetch('/me').then((r) => {
          if (r.ok){
            r.json().then((user)=> {
              setUser(user)
              fetch(`/${user.id}/hike_lists/uncompleted`, { 
                method: 'GET', 
                headers: {
                    'Content-type': 'application/json'
                }})
                .then(r => r.json())
                .then(hl => setHikeList(hl))
            })
          }
        })
      },[])

    // useEffect(()=> {
       
    // },[])

    function handleDelete(hl){
        
        fetch(`/hike_lists/${hl.id}`, {
            method: "DELETE"
        }).then(()=>{
            const filter = hikeList.filter((hlist)=> {
                return hlist.id !== hl.id
            })
            setHikeList(filter)
        })
        
    }
    
    function itsCompleted(hl){
        fetch(`/${user.username}/hike_lists/${hl.id}`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            }),
        })
        .then((r)=> r.json())
        .then(hl => setHikeList(hl))
    }

  
  

    function mapping(){
        if (hikeList.length > 0){
            return (hikeList.map(hl => {
                return (<HikeListCard hl={hl} key={hl.id} user={user} itsCompleted={itsCompleted}
                      handleDelete={handleDelete}/>)
        }))} else {
            return (<div style={{height:'900px'}}>Hmmm...looks like you don't have any hikes to explore. Why don't you search for a new one?</div>)
        }
    }
    return(
        <div >
            <Menu secondary>
                <Menu.Item as={ NavLink } exact to='/myhikes'>Trails I want to hike</Menu.Item>
                <Menu.Item  as={ NavLink } exact to='/myhikes/completed'>Hikes I've completed</Menu.Item>
                <Menu.Item as={ NavLink } exact to='/myhikes/created'>Hikes I created</Menu.Item>
            </Menu>
            
            {mapping()}
        </div>
    )
}

export default HikeList