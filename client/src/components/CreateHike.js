import { Button, Form, Grid, Segment, Header, Dropdown, Message, Image } from 'semantic-ui-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function CreateHike({ user }) {
    const [petFriendly, setPetFriendly] = useState(false)
    const [title, setTitle] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [length, setLength] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [directions, setDirections] = useState('')
    const [info, setInfo] = useState()
    const [errors, setErrors] = useState()
    const [imgSrc, setImgSrc] = useState()
    const [caption, setCaption] = useState()


    let history = useHistory()

    const options = [
        { key: 'y', text: 'Yes', value: true },
        { key: 'n', text: 'No', value: false }
    ]

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/hikes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
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
            .then((res) => {
                if (res.ok) {
                    res.json().then((hike) => {
                        console.log(hike)
                        createImage(hike.id)
                        alert('Your hike was successfully added!')
                        history.push('/')
                    })
                }
                else {
                    res.json().then((hike) => {
                        setErrors(hike.errors)
                    })
                }
            })
    }
   
    function createImage(id){
        fetch("/hike_photos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               hike_id: id, 
               caption: caption, 
               img_url: imgSrc
            }),
        })
        .then(res=> res.json())
        .then(photo => console.log(photo))
    }


    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImgSrc(URL.createObjectURL(img))
        }
    }


    return (
        <div>
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
                <Grid.Column style={{ maxWidth: '800px' }}>
                    <Form onSubmit={handleSubmit}>
                        <Segment>
                            <Header>Add a new hike!</Header>
                        </Segment>
                        <Segment>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    type='text'
                                    label='Hike Name'
                                    placeholder='Hike Name'
                                    onChange={(e) => setTitle(e.target.value)} />
                                <Form.Input
                                    required
                                    type='text'
                                    label='City'
                                    placeholder='City'
                                    onChange={(e) => setCity(e.target.value)} />
                                <Form.Input
                                    required
                                    type='text'
                                    label='State'
                                    placeholder='State'
                                    onChange={(e) => setState(e.target.value)} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field required>
                                    <label>{`Length in miles`}</label>
                                    <input type='number'
                                        placeholder='0'
                                        onChange={(e) => setLength(e.target.value)} />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Difficulty from 1-5</label>
                                    <input type='number'
                                        placeholder='Ex: 1 (easiest)'
                                        onChange={(e) => setDifficulty(e.target.value)} />
                                </Form.Field>
                                <Form.Input required
                                    control={Dropdown}
                                    label='Pet Friendly?'
                                    placeholder='Please select...'
                                    options={options}
                                    onChange={((e, data) => setPetFriendly(data.value))} />
                            </Form.Group>
                            <Form.TextArea
                                required
                                label='Directions'
                                placeholder='Directions'
                                onChange={(e) => setDirections(e.target.value)} />
                            <Form.TextArea
                                label='Any extra information to know about this hike?'
                                placeholder='Ex: The trailhead is really hard to find...'
                                onChange={(e) => setInfo(e.target.value)} />
                            {imgSrc ? <Image src={imgSrc} alt='img' size='small' /> : <> </>}
                            <br />
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Upload a picture for this Hike!</label>
                                    <input type='file'
                                        placeholder='upload an image'
                                        onChange={handleChange} />
                                </Form.Field>
                                <Form.Input
                                    type='text'
                                    label='Image Caption'
                                    placeholder='Image Caption'
                                    onChange={(e) => setCaption(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Button floated='left'>Submit</Button>
                            </Form.Group>
                        </Segment>
                        {errors ? <Message style={{ color: 'black', backgroundColor: 'pink' }}>{errors.map(error => <p>{error}</p>)}</Message> : <> </>}
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default CreateHike