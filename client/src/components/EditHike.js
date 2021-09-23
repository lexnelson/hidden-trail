import { useHistory, useParams } from 'react-router-dom'
import { Button, Form, Grid, Segment, Header, Dropdown, Message } from 'semantic-ui-react'
import { useEffect, useState } from 'react'


function EditHike({ }) {
    const { id } = useParams()
    const [hike, setHike] = useState()
    const [petFriendly, setPetFriendly] = useState('')
    const [title, setTitle] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [length, setLength] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [directions, setDirections] = useState('')
    const [info, setInfo] = useState()

    let history =useHistory()

    const options = [
        { key: 'y', text: 'Yes', value: true },
        { key: 'n', text: 'No', value: false }
    ]

    function setStates(hike){
        setHike(hike)
        setPetFriendly(hike.pet_friendly)
        setTitle(hike.title)
        setCity(hike.city)
        setState(hike.state)
        setDifficulty(hike.difficulty)
        setLength(hike.length)
        setDirections(hike.directions)
        setInfo(hike.extra_info)

    }

    useEffect(() => {
        fetch(`/hikes/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(hike => {
                setStates(hike)
                
            })
            
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/hikes/${id}`, {
            method: "PATCH", 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                pet_friendly: petFriendly, 
                length: length, 
                difficulty: difficulty, 
                city: city, 
                state: state, 
                directions: directions, 
                extra_info: info, 
                title: title
            }),
        })
        .then((r)=> r.json())
        .then(hike => {
            setStates(hike)
            alert('Your hike was successfully updated!')
                    history.push('/myhikes/created') 
        })

     
    }

    return (
        <div>
           
            {hike ?
             <Grid textAlign='center' verticalAlign='middle' style={{ height: '85vh' }}>
             <Grid.Column style={{ maxWidth: '800px' }}>
                 <Form onSubmit={handleSubmit}>
                     <Segment>
                         <Header>Edit this hike</Header>
                     </Segment>
                     <Segment>
                         <Form.Group widths='equal'>
                             <Form.Field>
                             <label>{`Current Hike Name: ${hike.title}`}</label>
                               <input type='text'
                                 placeholder='New Name'
                                 onChange={(e) => setTitle(e.target.value)}/>
                             </Form.Field>
                            <Form.Field>
                            <label>{`Current City: ${hike.city}`}</label>
                               <input type='text'
                                placeholder='New City'
                                onChange={(e) => setCity(e.target.value)}/>
                            </Form.Field>
                            <Form.Field>
                            <label>{`Current State: ${hike.state}`}</label>
                                <input type='text'
                                placeholder='New State'
                                onChange={(e) => setState(e.target.value)} />
                            </Form.Field>
                         </Form.Group>
                         <Form.Group widths='equal'>
                             <Form.Field>
                             <label>{`Current Length: ${hike.length} Miles`}</label>
                                <input type='number'
                                placeholder='New Length in miles'
                                onChange={(e) => setLength(e.target.value)} />
                             </Form.Field>
                             <Form.Field>
                             <label>{`Current Difficulty: ${hike.difficulty}`}</label>
                                 <input type='number'
                                placeholder='New Difficulty' 
                                onChange={(e) => setDifficulty(e.target.value)} />
                             </Form.Field>
                            <Form.Field>
                            <label>{hike.dog_friendly? 'Currently dog friendly!': 'Currently not dog friendly'}</label>
                             <Form.Input
                                 control={Dropdown}
                                 placeholder='Please select...'
                                 options={options}
                                 onChange={((e, data) => setPetFriendly(data.value))} />
                                 </Form.Field>
                         </Form.Group>

                        <Form.Field>
                        <label>{`Current Directions: `}</label>
                                 <p>{hike.directions}</p>
                                 <textarea type='text'
                                placeholder='New Directions'
                                onChange={(e) => setDirections(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                        <label>{`Current Extra Information: `}</label>
                                 <p>{hike.extra_info}</p>
                                 <textarea type='text'
                                placeholder='New Information'
                                onChange={(e) => setInfo(e.target.value)} />

                        </Form.Field>
                             <Form.Group>
                             <Button floated='left'>Submit</Button>
                             </Form.Group>
                     </Segment>
                 </Form>
             </Grid.Column>
         </Grid>
            // <Segment>
            //      <Header>Edit this Hike</Header>
            //     <Grid>
            //         <Grid.Column width={7}>
                           
            //                 <Form>
            //                     <label>{`Current Hike Name: ${hike.title}`}</label>
            //                     <input type='text'
            //                     placeholder='New Name'></input>
                                
            //                     <Button size='small' >Update</Button>
            //                 </Form>
                            
            //                 <br/>
            //                 <Form>
            //                     <label>{`Current City: ${hike.city}`}</label>
            //                     <input type='text'
            //                     placeholder='New City'></input>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
            //                 <br/>
            //                 <Form>
            //                     <label>{`Current Length: ${hike.length} Miles`}</label>
            //                     <input type='number'
            //                     placeholder='New Length in miles'></input>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
            //                 <br/>
            //                 <Form>
            //                     <label>{`Current Directions: `}</label>
            //                     <p>{hike.directions}</p>
            //                     <textarea type='text'
            //                     placeholder='New Directions'></textarea>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
                       
            //             </Grid.Column>
            //             <Grid.Column width={7}>
                            
            //                 <Form>
            //                     <label>{`Current State: ${hike.state}`}</label>
            //                     <input type='text'
            //                     placeholder='New State'></input>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
            //                 <br/>
            //                 <Form>
            //                     <label>{`Current Difficulty: ${hike.difficulty}`}</label>
            //                     <input type='number'
            //                     placeholder='New Difficulty'></input>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
            //                 <br/>
            //                 <Form >
            //                     <label>{hike.dog_friendly? 'Currently dog friendly!': 'Currently not dog friendly'}</label>
            //                 <Form.Input
            //                         control={Dropdown}
                                    
            //                         placeholder='Please select...'
            //                         options={options}
            //                         onChange={((e, data) => setPetFriendly(data.value))} />
            //                 </Form>
                            
            //                 <br/>
            //                 <Form>
            //                     <label>{`Current Extra Information: `}</label>
            //                     <p>{hike.extra_info}</p>
            //                     <textarea type='text'
            //                     placeholder='New Information'></textarea>
            //                     <Button size='small' >Update</Button>
            //                 </Form>
            //         </Grid.Column>
            //     </Grid>
            //     </Segment>
                : <> </>}
        </div>
    )
}
export default EditHike