import { useState, useEffect } from 'react'
import { Segment, Divider, Grid, Image, Header, Container, Button, Popup } from 'semantic-ui-react'
import LogForm from './LogForm'

function Tracker() {
    const [user, setUser] = useState()
    const [entries, setEntries] = useState([])
    const [toggle, setToggle]=useState(false)
    const [click, setClick]=useState()


    useEffect(() => {
        fetch('/me').then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    fetch(`/${user.id}/logs`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(r => r.json())
                        .then(logs => setEntries(logs))
                })
            }
        })
    }, [])


    function rowMap() {
        if (entries.length > 0) {
            return (entries.map((entry) => {
                return (
                    <tr key={entry.id} onClick={e=> setClick(entry)}>
                        <td data-label='Date'>{getFormattedDate(entry.date)}</td>
                        <td data-label='Trail Name'>{entry.trail_name}</td>
                        <td data-label='Location'>{entry.location}</td>
                        <td data-label='Length'>{`${entry.distance} Miles`}</td>
                        <td data-label='Rating'>{entry.rating}</td>
                        
                    </tr>)
            })

            )
        }
    }

    function getFormattedDate(date) {
        let year = date.split('').slice(0, 4).join('')
        let month = date.split('').slice(5, 7).join('')
         let day = date.split('').slice(8, 10).join('')
        return month + '/' + day + '/' + year;
    }


    return (
        <div>
            <Grid textAlign='center'  style={{paddingTop: '50px'}}>
                <Grid.Column width={7}>

                    <Header> Hike Logbook</Header>
                    <Button floated='right' onClick={e=> setToggle(!toggle)}> New Entry</Button>
                    <br/>
                    <div>
                        {toggle? 
                        <LogForm user={user} setToggle={setToggle} setEntries={setEntries}/> : <div style={{paddingTop: '20px'}}> </div> }
                        <table  className='ui selectable celled padded table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Trail Name </th>
                                    <th>Location </th>
                                    <th>Length </th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowMap()}
                            </tbody>

                        </table>
                    </div>

                </Grid.Column>
                <Grid.Column width={6}>
                    <div style={{marginTop: '90px'}}>
                    {click ? 
                    <Segment className='mainCard' >
                         <Popup content='close' trigger={
                                <Button color='olive' onClick={() => setClick()} floated='right'> X</Button>} />
                        <Header as='h1'>{click.trail_name}</Header>
                        <div className='hikeCardSinglePhoto'>
                        <Segment  className='nestedHikeCard'>
                            <img className='imgCard' src={click.photo ? click.photo : 'https://cdn.dribbble.com/users/97731/screenshots/14180216/mountain_4x.jpg'} floated='left'/>
                        <ul floated='right'>
                            <h4>{click.location}</h4>
                            <h4>{getFormattedDate(click.date)}</h4>
                            <h4>{`Length: ${click.distance} miles`}</h4>
                            <h4>{`Rating: ${click.rating} /5`}</h4>
                            <h4>{`Weather: ${click.weather}`}</h4>
                        </ul>
                        </Segment>
                        </div>
                        <Segment>
                        <h4>Notes:</h4>
                        <p>{click.notes}</p>
                        </Segment>
                    </Segment>
                    :
                    <div><Header>Click on a hike to see your entry!</Header></div>}
                         </div>   
                </Grid.Column>
                
            </Grid>
        </div>
    )
}

export default Tracker