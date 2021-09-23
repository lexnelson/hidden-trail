import { Segment, Grid, Image, Button, Modal, Checkbox } from 'semantic-ui-react'
import {useState} from 'react'

function HikeListCard({hl, user, handleDelete, itsCompleted, uncompleted}) {
    const [visible, setVisible]=useState(false)
    // const [isCompleted, setIsCompleted]=useState(false)
   
    function handleSeeMore(){
        setVisible(!visible)
    }

   
   

    return (
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={12}>
                    <Segment.Group>
                        <Segment textAlign='left'>
                            <h1>{hl.hike.title}</h1>
                        </Segment>
                        {/* <Image src={`${hike.hike_photos[0]}`} size='small'/> */}
                        <Segment.Group>
                            <Segment>{`${hl.hike.city}, ${hl.hike.state}`}</Segment>
                        </Segment.Group>
                        {visible ?
                            <div>
                                <p>{`Difficulty: ${hl.hike.difficulty}`}</p>
                                <p>{`${hl.hike.length} Miles`}</p>
                            </div>
                            : <> </>}
                            <p>Done this hike before? Mark it as completed</p>
                            {/* <Checkbox toggle label='Completed' checked={isCompleted} onChange={handleToggle}/> */}
                            {hl.completed ? 
                            <Button onClick={()=>uncompleted(hl)}>Remove Completion</Button> :
                            <Button onClick={()=>itsCompleted(hl)}>Mark as completed</Button>}
                        <Button onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        <Button onClick={()=> handleDelete(hl)}>Remove from List</Button>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default HikeListCard