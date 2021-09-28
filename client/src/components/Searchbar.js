import { useState } from 'react'
import { Divider, Input, Segment, Button, Form, Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function Searchbar({ onSearch, onDropdown, onLength }) {
    const [search, setSearch] = useState('')
    const [difficulty, setDifficulty] = useState('all')
    const [len, setLen] = useState('all')
    let history = useHistory()

    onLength(len)
    onSearch(search)
    onDropdown(difficulty)
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
            <Segment textAlign='center'>

                <Input icon='search'
                    iconPosition='left'
                    placeholder='Search by city...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <br />
                <br />
                <label>Filter by difficulty: </label>
                <Dropdown
                    placeholder='Filter hikes...'
                    options={options}
                    value={difficulty}
                    onChange={((e, data) => setDifficulty(data.value))} />
                <br />
                <br />
                <label>Filter by length: </label>
                <Dropdown
                    placeholder='Filter length...'
                    options={lengthOptions}
                    value={len}
                    onChange={((e, data) => setLen(data.value))} />


                <Divider horizontal >Or </Divider>

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