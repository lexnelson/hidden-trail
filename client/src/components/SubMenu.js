import {Menu} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function SubMenu(){
    return (
        <div>
            <Menu secondary>
                <Menu.Item as={ NavLink } exact to='/myhikes'>Trails I want to hike</Menu.Item>
                <Menu.Item  as={ NavLink } exact to='/myhikes/completed'>Hikes I've completed</Menu.Item>
                <Menu.Item as={ NavLink } exact to='/myhikes/created'>Hikes I created</Menu.Item>
                {/* <Menu.Item as={ NavLink } exact to='/myhikes/tracker'>Hike Tracker</Menu.Item> */}
            </Menu>
        </div>
    )
}

export default SubMenu