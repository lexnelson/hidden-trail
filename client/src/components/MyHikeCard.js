import { Segment, Grid, Image, Button, Modal } from 'semantic-ui-react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'


function MyHikeCard({user, handleDelete, hike}){
    const [visible, setVisible]=useState(false)
    let history = useHistory()

    function handleSeeMore(){
        setVisible(!visible)
    }
    function goToHike(){
        history.push(`/myhikes/hike/${hike.id}`)
    }


    return(
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
                        <Button onClick={()=>handleDelete(hike.id)}>Delete X</Button>
                        <Button onClick={goToHike}>Edit this hike</Button>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default MyHikeCard