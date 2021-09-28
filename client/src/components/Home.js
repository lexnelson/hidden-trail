import Searchbar from './Searchbar'
import HikeCard from './HikeCard'
import { useEffect, useState } from 'react'

function Home({ user }){
    const [search, setSearch] = useState('')
    const [allHikes, setAllHikes]= useState([])

    // console.log(search)

    useEffect(()=> {
        fetch('/hikes', { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => setAllHikes(hikes))
    },[])

    function onSearch(s){
        setSearch(s)
    }

    function mapping(){
        if (allHikes.length > 0){
            return (searchedResults().map(hike => {
                return (<HikeCard hike={hike} key={hike.id} user={user}/>)
        }))} else {
            return (<> </>)
        }
    }

    const searchedResults = () => {
        if(search.length > 0 ) {
            return allHikes.filter((hike) => hike.city.toLowerCase().includes(search.toLowerCase() || hike.state.toLowerCase().includes(search.toLowerCase())))
        }
        else{
            return allHikes
        }
    }
    
    return(
        <div>
            <Searchbar onSearch={onSearch}/>
            <h1>Find your next happy place... </h1>
            {mapping()}
        </div>
    )
}

export default Home 