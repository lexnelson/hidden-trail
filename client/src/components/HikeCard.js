import { Segment, Grid, Image, Button, Modal } from 'semantic-ui-react'
import {useState} from 'react'

function HikeCard({ hike, user }) {
    // console.log(hike)
    console.log(user)
    const [visible, setVisible]=useState(false)
    const [added, setAdded]= useState(false)

    function handleSeeMore(){
        setVisible(!visible)
    }

    function handleAddToList(){
        setAdded(!added)
        fetch('/hike_lists', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                hike_id: hike.id, 
                completed: false, 
                username: user.username
            }),
        })
        .then((r)=> r.json())
        .then(hl=> console.log(hl))
    }

    return (
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={12}>
                    <Segment.Group>
                        <Segment textAlign='left'>
                            <h1>{hike.title}</h1>
                        </Segment>
                        {/* <Image src={`${hike.hike_photos[0]}`} size='small'/> */}
                        <Segment.Group>
                            <Segment>{`${hike.city}, ${hike.state}`}</Segment>
                        </Segment.Group>
                        {visible ? 
                        <div>
                        <p>{`Difficulty: ${hike.difficulty}`}</p> 
                        <p>{`${hike.length} Miles`}</p> 
                        </div>
                        : <> </>}
                        <Button onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        <Button onClick={handleAddToList}>{added? 'Added ✅':'Add to List'}</Button>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default HikeCard