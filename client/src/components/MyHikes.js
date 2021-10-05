import { useEffect, useState} from 'react'
import MyHikeCard from './MyHikeCard'
import SubMenu from './SubMenu'

function MyHikes(){
    const [myHikes, setMyHikes]=useState([])
    const [user, setUser]=useState()


    useEffect(()=> {
        fetch('/me').then((r) => {
          if (r.ok){
            r.json().then((user)=> {
              setUser(user)
              fetch(`/${user.id}/hikes`, { 
                method: 'GET', 
                headers: {
                    'Content-type': 'application/json'
                }})
                .then(r => r.json())
                .then(hikes => setMyHikes(hikes))
            })
          }
        })
      },[])
 
    function handleDelete(id){
        fetch(`/hikes/${id}`, {
            method: "DELETE"
        }).then(()=>{
            const filter = myHikes.filter((hike)=> {
                return hike.id !== id
            })
            setMyHikes(filter)
        })
    }

    function mapping(){
        if (myHikes.length > 0){
            return (myHikes.map(hike => {
                return (<MyHikeCard hike={hike} key={hike.id} user={user} 
                      handleDelete={handleDelete}/>)
        }))} else {
            return (<div>
                <h3>It looks like you haven't created any hikes yet...</h3>
                <h4>Add a new one <a href='/create-a-hike'>here</a></h4>
                 </div>)
        }
    }

    return(
        <div>
            <SubMenu/>
            {mapping()}
        </div>
    )
}

export default MyHikes