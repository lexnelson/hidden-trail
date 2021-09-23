import { useEffect, useState} from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useHistory } from 'react-router-dom'
function MyHikes({ user }){
    const [myHikes, setMyHikes]=useState([])

    useEffect(()=> {
        fetch(`/${user.id}/hikes`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => console.log(hikes))
    },[myHikes])


    return(
        <div>
            <Menu secondary>
                <Menu.Item as={ NavLink } exact to='/myhikes'>Trails I want to explore</Menu.Item>
                <Menu.Item  as={ NavLink } exact to='/myhikes/completed'>Hikes I've been on</Menu.Item>
                <Menu.Item as={ NavLink } exact to='/myhikes/created'>Hikes I created</Menu.Item>
            </Menu>
        </div>
    )
}

export default MyHikes