import Searchbar from './Searchbar'
import HikeCard from './HikeCard'
import { useEffect, useState } from 'react'

function Home({ user }){
    const [searchWord, setSearchWord] = useState('')
    const [allHikes, setAllHikes]= useState([])

    useEffect(()=> {
        fetch('/hikes', { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => setAllHikes(hikes))
    },[])

    function mapping(){
        if (allHikes.length > 0){
            return (allHikes.map(hike => {
                return (<HikeCard hike={hike} key={hike.id} user={user}/>)
        }))} else {
            return (<> </>)
        }
        // allHikes.map(hike => {
        //     return (<HikeCard hike={hike} key={hike.id} />)
        // })
    }
    console.log(allHikes)
    return(
        <div>
            <Searchbar/>
            <h1>Hello from Home </h1>
            {/* {allHikes.map(hike => {
                return (<HikeCard hike={hike} key={hike.id} />)
            })} */}
            {mapping()}
        </div>
    )
}

export default Home 