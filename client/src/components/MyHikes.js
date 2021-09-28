import { useEffect, useState} from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useHistory } from 'react-router-dom'
import MyHikeCard from './MyHikeCard'
function MyHikes({ user }){
    const [myHikes, setMyHikes]=useState([])

    useEffect(()=> {
        fetch(`/${user.id}/hikes`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => setMyHikes(hikes))
    },[])

    function handleDelete(id){
        fetch(`/hikes/${id}`, {
            method: "DELETE"
        }).then(()=>{
            const filter = myHikes.filter((hike)=> {
                return hike.id !== id
            })
            setMyHikes(filter)
        })
    }

    function mapping(){
        if (myHikes.length > 0){
            return (myHikes.map(hike => {
                return (<MyHikeCard hike={hike} key={hike.id} user={user} 
                      handleDelete={handleDelete}/>)
        }))} else {
            return (<div>
                <h3>It looks like you haven't created any hikes yet...</h3>
                <h4>Add a new one <a href='/create-a-hike'>here</a></h4>
                 </div>)
        }
    }

    return(
        <div>
            <Menu secondary>
                <Menu.Item as={ NavLink } exact to='/myhikes'>Trails I want to hike</Menu.Item>
                <Menu.Item  as={ NavLink } exact to='/myhikes/completed'>Hikes I've completed</Menu.Item>
                <Menu.Item as={ NavLink } exact to='/myhikes/created'>Hikes I created</Menu.Item>
            </Menu>
            {mapping()}
        </div>
    )
}

export default MyHikes