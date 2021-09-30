import { Menu } from 'semantic-ui-react'
import { NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState} from 'react'
import CompletedCard from './CompletedCard'

function Completed({user}){
    const [hikeList, setHikeList]= useState([])
    

    useEffect(()=> {
        fetch(`/${user.id}/hike_lists/completed`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hl => setHikeList(hl))
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
            return (<div style={{height:'900px'}}> Sorry you have no Completed hikes</div>)
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

export default Completed