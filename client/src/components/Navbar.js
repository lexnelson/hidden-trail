import { Menu, Segment, Header, Button } from 'semantic-ui-react'
import { NavLink, useHistory } from 'react-router-dom'

function Navbar( {handleLogout } ) {

    let history = useHistory()
  

    function handleClick(){
        fetch('/logout', {
            method: "DELETE"
        }).then(()=> {
            handleLogout();
            history.push('/login')
        })
    }
    return (
        <div>
            {/* <Segment> */}
                <Header style={{paddingTop: '3%'}} as='h1'>
                    Hidden Trails
                </Header>
            {/* </Segment> */}
            <Menu pointing secondary>
                <Menu.Item as={ NavLink } exact to='/'>
                    Search for a Hike
                </Menu.Item>
                <Menu.Item as={ NavLink } to='/myhikes'>
                    My Hikes
                </Menu.Item>
                
                <Menu.Item position='right' as={ Button } onClick={handleClick}>
                    Logout
                </Menu.Item> 
               
            </Menu>
        </div>
    )
}

export default Navbar