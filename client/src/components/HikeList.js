import { useEffect, useState} from 'react'
import HikeListCard from './HikeListCard'
import { Header } from 'semantic-ui-react'
import SubMenu from './SubMenu'

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
            return (<Header color='grey' as='h4' >Hmmm... it looks like you don't have any hikes to explore. Why don't you <a href='/'>search</a> for a new one?</Header>)
        }
    }
    return(
        <div >
            <SubMenu/>
            
            {mapping()}
        </div>
    )
}

export default HikeList