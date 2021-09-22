import { useEffect, useState} from 'react'

function MyHikes({ user }){
    const [myHikes, setMyHikes]=useState([])

    useEffect(()=> {
        fetch(`/${user.id}/hikes`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hikes => console.log(hikes))
    },[myHikes])


    return(
        <div>
            <h1>Create a new Hike</h1>
        </div>
    )
}

export default MyHikes