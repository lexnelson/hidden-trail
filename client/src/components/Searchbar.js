// import { useState } from 'react'
import { Divider, Input, Button, Dropdown, Grid } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function Searchbar({ onSearch, onDropdown, onLength, search, length, difficulty}) {
  
    let history = useHistory()

    const options = [
        { key: 'a', text: 'All', value: 'all' },
        { key: 'e', text: 'Easy', value: 'easy' },
        { key: 'm', text: 'Moderate', value: 'moderate' },
        { key: 'h', text: 'Hard', value: 'hard' }
    ]
    const lengthOptions = [
        { key: 'a', text: 'All', value: 'all' },
        { key: 'e', text: '1-3 miles', value: 'easy' },
        { key: 'm', text: '4-6 miles', value: 'moderate' },
        { key: 'h', text: '7-9 miles', value: 'hard' },
        { key: 'v', text: '10+ miles', value: 'veryHard' }
    ]
    
    function handleClick() {
        history.push('/create-a-hike')
    }
    



    return (
        <div>

            <Grid textAlign='center' style={{ paddingTop: '3%', paddingBottom: '1%' }}>
              
                <Input
                    placeholder='Search by city...'
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                />
                <br />
                <br />
                <label>Filter by difficulty: </label>
                <Dropdown
                    placeholder='Filter hikes...'
                    options={options}
                    value={difficulty}
                    onChange={((e, data) => onDropdown(data.value))} />
                <br />
                <br />
                <label>Filter by length: </label>
                <Dropdown
                    placeholder='Filter length...'
                    options={lengthOptions}
                    value={length}
                    onChange={((e, data) => onLength(data.value))} />

            </Grid>
            <Divider horizontal >Or </Divider>
          

            <Button
                color='olive'
                onClick={handleClick}
            >Add a New Hike</Button>
        </div>
    )
}

export default Searchbar