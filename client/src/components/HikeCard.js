import { Segment, Grid, Button, Popup, Header, Comment, Form } from 'semantic-ui-react'
import { useState } from 'react'
import TestModal from './TestModal'
import Comments from './Comments'

function HikeCard({ hike, user }) {

    const [visible, setVisible] = useState(false)
    const [added, setAdded] = useState(false)
   



    function handleSeeMore() {
        setVisible(!visible)
    }

    function handleAddToList() {
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
            .then((r) => r.json())
            .then(hl => console.log(hl))
    }
    function renderImage() {
        if (hike.hike_photos.length > 0) {
            return (
                <div className='hikeCardSinglePhoto'>
                    <Segment vertical textAlign='center' className='nestedHikeCard'>

                        <img className='imgCard' src={hike.hike_photos[0].img_url} floated='left' />
                        <ul>
                            {setDifficulty()}
                            {/* <h4>{`Difficulty: ${hike.difficulty}`}</h4> */}
                            <h4>{`Length: ${hike.length} miles`}</h4>
                            <h4>{hike.pet_friendly ? 'Pet friendly: yes' : 'Pet friendly: no'}</h4>
                        </ul>
                    </Segment>
                </div>
            )
        }
        else {
            return (
                <div className='hikeCardSinglePhoto'>
                    <Segment vertical textAlign='center' className='nestedHikeCard'>
                        <img className='imgCard' floated='left' src='https://www.shihoriobata.com/wp-content/uploads/2020/08/how-to-draw-mountains-thumbnail.jpg' />

                        <ul>
                            <h4>{`Difficulty: ${hike.difficulty}`}</h4>
                            <h4>{`Length: ${hike.length} miles`}</h4>
                            <h4>{hike.pet_friendly ? 'Pet friendly: yes' : 'Pet friendly: no'}</h4>
                        </ul>
                    </Segment>
                </div>
            )
        }
    }

    function imageMapping() {
        if (hike.hike_photos.length > 0) {
            return (
                <div className='nestedPhotosMap'>
                    <Header >Photos of this hike</Header>

                    {hike.hike_photos.map((photo) => {
                        return (
                            <TestModal key={photo.id} photo={photo} />
                        )
                    })
                    } </div>
            )
        }
        else {
            return (<> </>)
        }
    }

    function setDifficulty(){
        if (hike.difficulty <= 2){
            return(<h4>{`Difficulty: Easy`}</h4> )
        } else if (hike.difficulty === 3){
            return(<h4>{`Difficulty: Moderate`}</h4>)
        }else {
            return (<h4>{`Difficulty: Hard`}</h4>)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log('hi')
    }
  

    return (
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={9}>
                <div style={{paddingBottom: '40px'}}>
                    <Segment.Group>
                        <Segment textAlign='left'>
                            <Popup content='add to your list!' trigger={

                                <Button color='olive' onClick={handleAddToList} floated='right'>{added ? 'Added ' : '+'}</Button>} />
                            <h1>{hike.title}</h1>
                            <h3>{`${hike.city}, ${hike.state}`}</h3>
                        </Segment>
                        <Segment.Group widths='equal'>

                            <Segment style={{ height: '20%' }}>

                                {renderImage()}

                            </Segment>

                        </Segment.Group>

                        {visible ?
                            <Segment.Group>
                                <div>
                                    <Segment >
                                        <h4>Directions:</h4>
                                        <p>{` ${hike.directions}`}</p>
                                        <h4>Extra Information: </h4>
                                        {hike.extra_info ? <p>{` ${hike.extra_info}`}</p> : <> </>}
                                    </Segment>
                                    <Segment className='picsSegment'>
                                        {imageMapping()}
                                    </Segment>
                                    <Segment textAlign ='left'>
                                        <Comments hike={hike} user={user}/>
                                    </Segment>
                                </div>
                            </Segment.Group>
                            : <> </>}
                            
                        <Button onClick={handleSeeMore} > {visible ? 'See Less' : 'See More'}</Button>

                    </Segment.Group>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default HikeCard