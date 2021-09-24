import { useHistory, useParams } from 'react-router-dom'
import { Button, Form, Grid, Segment, Header, Dropdown, Message, Card, Image } from 'semantic-ui-react'
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
    const [photos, setPhotos] = useState()
    const [caption, setCaption] = useState()
    const [imgSrc, setImgSrc] = useState()

    let history = useHistory()

    console.log(hike)
    console.log(photos)

    const options = [
        { key: 'y', text: 'Yes', value: true },
        { key: 'n', text: 'No', value: false }
    ]

    function setStates(hike) {
        setHike(hike)
        setPetFriendly(hike.pet_friendly)
        setTitle(hike.title)
        setCity(hike.city)
        setState(hike.state)
        setDifficulty(hike.difficulty)
        setLength(hike.length)
        setDirections(hike.directions)
        setInfo(hike.extra_info)
        setPhotos(hike.hike_photos)
        setCaption('')
        setImgSrc('')

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

    function handleSubmit(e) {
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
            .then((r) => r.json())
            .then(hike => {
                setStates(hike)
                alert('Your hike was successfully updated!')
                history.push('/myhikes/created')
            })
    }

    function secondSubmit(e){
        e.preventDefault()
        fetch("/add_photos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               hike_id: hike.id, 
               caption: caption, 
               img_url: imgSrc
            }),
        })
        .then(res=> res.json())
        .then(hike => setStates(hike))
    }

    function phototCard() {
        if (photos.length > 0) {
            return (
                <div className='nestedEditPicsContainer'>
                    <Header as='h2' style={{ width: '750px'}}> Current photos for this hike</Header>
                {photos.map((photo) => {
                return (
                    <div className='editPics'>
                        <Card >
                            <Image src={photo.img_url} size='medium' />
                            <Card.Content>
                                <Card.Meta>{`Caption: ${photo.caption}`}</Card.Meta>
                            </Card.Content>
                        </Card>
                    </div>
                )
            })}
           </div> )
        }
        else {
            <p>Looks like your hike doesn't have any photos yet, upload a new one below!</p>
        }
    }

    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImgSrc(URL.createObjectURL(img))
        }
    }

    return (
        <div>

            {hike ?
                <Grid textAlign='center' verticalAlign='middle' style={{ height: '210vh' }}>
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
                                            onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>{`Current City: ${hike.city}`}</label>
                                        <input type='text'
                                            placeholder='New City'
                                            onChange={(e) => setCity(e.target.value)} />
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
                                        <label>{hike.pet_friendly ? 'Currently pet friendly!' : 'Currently not pet friendly'}</label>
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
                        <br />

                        <Form onSubmit={secondSubmit}>
                            <Segment>
                                <Header>Add Photos to your hike</Header>
                            </Segment>
                            <Segment>
                                <Form.Group>
                                    <Segment className='editPicsContainer'>
                                    {photos ? <div>{phototCard()}</div> : <> </>}
                                    </Segment>
                                </Form.Group>
                                <h3>Add a New Picture</h3>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Upload a file</label>
                                        <input type='file'
                                            value={imgSrc}
                                            placeholder='upload an image'
                                            onChange={handleChange} />
                                    </Form.Field>
                                    <Form.Input
                                        type='text'
                                        label='Image Caption'
                                        value={caption}
                                        placeholder='Image Caption'
                                        onChange={(e) => setCaption(e.target.value)} />

                                </Form.Group>
                                <Form.Group>
                                    <Button floated='left'>Submit</Button>
                                </Form.Group>
                            </Segment>
                        </Form>

                    </Grid.Column>
                </Grid>
                : <> </>}
        </div>
    )
}
export default EditHike