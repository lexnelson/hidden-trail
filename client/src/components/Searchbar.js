import {useState} from 'react'
import { Divider, Input, Segment, Button } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'

function Searchbar(){
    let history=useHistory()

    function handleClick(){
        history.push('/create-a-hike')
    }

    return(
        <div>
            <Segment textAlign='center'>
                <Input icon='search'
                iconPosition='left'
                placeholder='Search by location...'
                />
                <Divider  horizontal >Or </Divider>
                
                    <Button
                    color='olive'
                    icon='add'
                    //  labelPosition='left'
                    onClick={handleClick}
                    >Add a New Hike</Button>
                   
           
                  
            </Segment>
            
           
        </div>
    )
}

export default Searchbar