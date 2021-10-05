import { Button, Form, Grid, Segment, Header, Dropdown, Message, Image, Input } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'

function LogForm({ user, setToggle, setEntries }) {
    const [date, setDate] = useState()
    const [trail, setTrail] = useState()
    const [location, setLocation] = useState()
    const [distance, setDistance] = useState()
    const [rating, setRating] = useState()
    const [weather, setWeather] = useState('')
    const [notes, setNotes] = useState('')

    let history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        fetch("/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                date: date, 
                trail_name: trail, 
                location: location,
                distance: distance, 
                rating: rating,
                weather: weather, 
                notes: notes
               
            }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((entries) => {
                        setEntries(entries)
                       setToggle(false)
                    })
                }
                else {
                    res.json().then((hike) => {
                        console.log(hike.errors)
                    })
                }
            })
    }
    console.log(date)


    return (
        <div style={{paddingTop: '37px'}}>
            <Form onSubmit={handleSubmit} >

                <Segment className='mainCard'>
                    <Header textAlign='center'>New Entry</Header>
                    <Form.Group widths='equal'>
                        <Form.Input required
                            type='date'
                            label='Date'
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Form.Input
                            required
                            type='text'
                            label='Trail Name'
                            placeholder='Trail Name'
                            onChange={(e) => setTrail(e.target.value)} />

                        <Form.Input
                            required
                            type='text'
                            label='Location'
                            placeholder='Location'
                            onChange={(e) => setLocation(e.target.value)} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input required
                            type='number'
                            label='Length'
                            placeholder='Length in miles'
                            onChange={(e) => setDistance(e.target.value)}
                        />
                       <Form.Input required
                            type='number'
                            label='Rating from 1-5'
                            placeholder='Ex: 5 ( great hike)'
                            onChange={(e) => setRating(e.target.value)}
                        />

                        <Form.Input
                            type='text'
                            label='Weather'
                            placeholder='Weather'
                            onChange={(e) => setWeather(e.target.value)} />
                    </Form.Group>
                    <Form.TextArea
                            type='text'
                            label='Notes'
                            placeholder='Notes...'
                            onChange={(e) => setNotes(e.target.value)} />
                            <Button color='olive' type='submit'>Submit</Button>
                </Segment>
            </Form>
        </div>
    )
}

export default LogForm