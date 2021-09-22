import {useState} from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

function Searchbar(){
    return(
        <div>
            <Search 
            placeholder='search by location...'></Search>
        </div>
    )
}

export default Searchbar