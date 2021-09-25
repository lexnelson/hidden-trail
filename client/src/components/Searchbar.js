import {useState} from 'react'
import { Divider, Input, Segment, Button } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'

function Searchbar({onSearch}){
    const [search, setSearch]=useState('')
    let history=useHistory()
    onSearch(search)

    function handleClick(){
        history.push('/create-a-hike')
    }

    return(
        <div>
            <Segment textAlign='center'>
                <Input icon='search'
                iconPosition='left'
                placeholder='Search by city...'
                value = {search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <Divider  horizontal >Or </Divider>
                
                    <Button
                    color='olive'
                    //  labelPosition='left'
                    onClick={handleClick}
                    >Add a New Hike</Button>
            </Segment>
        </div>
    )
}

export default Searchbar