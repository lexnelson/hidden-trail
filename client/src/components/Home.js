import Searchbar from './Searchbar'
import HikeCard from './HikeCard'
import { useEffect, useState } from 'react'
import { Header, Button } from 'semantic-ui-react'

function Home({ user }) {
    const [search, setSearch] = useState('')
    const [allHikes, setAllHikes] = useState([])
    const [difficulty, setDifficulty] = useState('all')
    const [length, setLength] = useState('all')
    const [toggleView, setView]=useState(false)

    useEffect(() => {
        fetch('/hikes', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(hikes => setAllHikes(hikes))
    }, [])

    function onSearch(s) {
        setSearch(s)
    }

    function onDropdown(diff) {
        setDifficulty(diff)
    }

    function onLength(len) {
        setLength(len)
    }

    function mapping() {
        if (allHikes.length > 0) {
            if (sortedSearchedLength().length > 0){
            return (sortedSearchedLength().map(hike => {
                return (<HikeCard hike={hike} key={hike.id} user={user} />)
            }))
        } else {
            return (<Header as='h3' >It doesn't look like any hikes match your search</Header>)
        }}
        else {
            return (<> </>)
        }
    }

    const searchedResults = () => {
        if (search.length > 0) {
            return allHikes.filter((hike) => hike.city.toLowerCase().includes(search.toLowerCase() || hike.state.toLowerCase().includes(search.toLowerCase())))
        }
        else {
            return allHikes
        }
    }

    const sortedDifficulty = () => {
        switch (difficulty) {
            case 'all':
                return searchedResults()
            case 'easy':
                return searchedResults().filter((hike) => {
                    return hike.difficulty <= 2
                })
            case 'moderate':
                return searchedResults().filter((hike) => {
                    return hike.difficulty === 3
                })
            case 'hard':
                return searchedResults().filter((hike) => {
                    return hike.difficulty > 3
                })
             default: 
            return searchedResults()
        }
    }

    const sortedSearchedLength = () => {
        switch (length) {
            case 'all':
                return sortedDifficulty()
            case 'easy':
                return sortedDifficulty().filter((hike) => {
                    return hike.length <= 3
                })
            case 'moderate':
                return sortedDifficulty().filter((hike) => {
                    return hike.length >= 4 && hike.length <= 6
                })
            case 'hard':
                return sortedDifficulty().filter((hike) => {
                    return hike.length > 7 && hike.length <= 9
                })
            case 'veryHard':
                return sortedDifficulty().filter((hike) => {
                    return hike.length >= 10
                })
                default: 
                return sortedDifficulty()
        }
    }


    return (
        <div>
            <Searchbar onSearch={onSearch} onDropdown={onDropdown} onLength={onLength} search={search} length={length} difficulty={difficulty} />
            <Header as='h2' color='grey'>Find your next happy place... </Header>
            {mapping()}
        </div>
    )
}

export default Home