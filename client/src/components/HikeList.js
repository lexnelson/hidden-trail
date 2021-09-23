import { useEffect, useState} from 'react'
import HikeListCard from './HikeListCard'

function HikeList({user}){
    const [hikeList, setHikeList]= useState([])

    useEffect(()=> {
        fetch(`/${user.id}/hike_lists`, { 
        method: 'GET', 
        headers: {
            'Content-type': 'application/json'
        }})
        .then(r => r.json())
        .then(hl => setHikeList(hl))
    },[])
//HikeList state to go in dependency arrray !!!
    // function getHikes(hikes){
    //     hikes.forEach(hike => {
    //         return fetch(`/hikes/${hike.hike_id}`, {
    //             method: "GET", 
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         })
    //         .then(r=> r.json())
    //         .then(hike => {
    //             // hikeList.push(hike)
    //             let arr = []
    //             arr.push(hike)
    //             setHikeList(arr)
    //         })
    //     })
    // }
    function handleDelete(hl){
        console.log(hl.id)
        fetch(`/hike_lists/${hl.id}`, {
            method: "DELETE"
        }).then(()=>{
            const filter = hikeList.filter((hlist)=> {
                return hlist.id !== hl.id
            })
            setHikeList(filter)
        })
        
    }
    
    function itsCompleted(hl){
        fetch(`/${user.username}/hike_lists/${hl.id}`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            }),
        })
        .then((r)=> r.json())
        .then(hl => setHikeList(hl))
    }

    function uncompleted(hl){
        fetch(`/${user.username}/hike_lists/${hl.id}`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: false
            }),
        })
        .then((r)=> r.json())
        .then(hl => setHikeList(hl))
    }
    console.log(hikeList)

    function mapping(){
        if (hikeList.length > 0){
            return (hikeList.map(hl => {
                return (<HikeListCard hl={hl} key={hl.id} user={user} itsCompleted={itsCompleted}
                     uncompleted={uncompleted} handleDelete={handleDelete}/>)
        }))} else {
            return (<> </>)
        }
    }
    return(
        <div>
            <h1>Hello</h1>
            {mapping()}
        </div>
    )
}

export default HikeList