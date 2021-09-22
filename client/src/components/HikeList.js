import { useEffect, useState} from 'react'

function HikeList({user}){
    const [hikeList, setHikeList]= useState([])

    useEffect(()=> {
        fetch(`/${user.id}/hike_lists`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => getHikes(hikes))
    },[])

    function getHikes(hikes){
        hikes.forEach(hike => {
            return fetch(`/hikes/${hike.hike_id}`, {
                method: "GET", 
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(r=> r.json())
            .then(hike => console.log(hike))
        })
    }

//add an each do loop for the hike list by changing console.log to a new function that will take in the array and dp a loop of get requests
    return(
        <div>Hello from Hike List</div>
    )
}

export default HikeList