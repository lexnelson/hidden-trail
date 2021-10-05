import { Header } from 'semantic-ui-react'
import { useEffect, useState} from 'react'
import CompletedCard from './CompletedCard'
import SubMenu from './SubMenu'

function Completed(){
    const [hikeList, setHikeList]= useState([])
    const [user, setUser]=useState()

    useEffect(()=> {
        fetch('/me').then((r) => {
          if (r.ok){
            r.json().then((user)=> {
              setUser(user)
              fetch(`/${user.id}/hike_lists/completed`, { 
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
    //     fetch(`/${user.id}/hike_lists/completed`, { 
    //     method: 'GET', 
    //     headers: {
    //         'Content-type': 'application/json'
    //     }})
    //     .then(r => r.json())
    //     .then(hl => setHikeList(hl))
    // },[user.id])

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

    function uncompleted(hl){
        fetch(`/${user.username}/hike_lists/${hl.id}/false`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: false
            }),
        })
        .then((r)=> r.json())
        .then(hl => setHikeList(hl))
    }

    function mapping(){
        if (hikeList.length > 0){
            return (hikeList.map(hl => {
                return (<CompletedCard hl={hl} key={hl.id} user={user} uncompleted={uncompleted}
                      handleDelete={handleDelete}/>)
        }))} else {
            return (<Header as='h4' color='grey'> It doesn't look like you've completed any hikes yet</Header>)
        }
    }

    return(
        <div >
             <SubMenu/>
            {mapping()}
        </div>
    )
}

export default Completed