import { Segment, Grid, Button, Header, Popup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import TestModal from './TestModal'
import Comments from './Comments'

function CompletedCard({ hl, user, handleDelete, uncompleted }) {
    const [visible, setVisible] = useState(false)
    const [photos, setPhotos] = useState()


    function handleSeeMore() {
        setVisible(!visible)
    }

    //fetches photos
    useEffect(() => {
        fetch(`/${hl.hike.id}/photos`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(photos => setPhotos(photos))
    }, [])


    function renderImage() {
        if (photos) {
            return (
                <div className='hikeCardSinglePhoto'>
                    <Segment vertical textAlign='center' className='nestedHikeCard'>

                        <img className='imgCard' src={photos[0].img_url} floated='left' />
                        <ul>
                        {setDifficulty()}
                            {/* <h4>{`Difficulty: ${hl.hike.difficulty}`}</h4> */}
                            <h4>{`Length: ${hl.hike.length} miles`}</h4>
                            <h4>{hl.hike.pet_friendly ? 'Pet friendly: yes' : 'Pet friendly: no'}</h4>
                        </ul>
                    </Segment>
                </div>
            )
        }
        else {
            return (
                <div className='hikeCardSinglePhoto'>
                    <Segment vertical textAlign='center' className='nestedHikeCard'>
                        <img className='imgCard' floated='left' src='https://cdn.dribbble.com/users/97731/screenshots/14180216/mountain_4x.jpg' />

                        <ul>
                            <h4>{setDifficulty()}</h4>
                            <h4>{`Length: ${hl.hike.length} miles`}</h4>
                            <h4>{hl.hike.pet_friendly ? 'Pet friendly: yes' : 'Pet friendly: no'}</h4>
                        </ul>
                    </Segment>
                </div>
            )
        }
    }

    function imageMapping() {
        if (photos.length > 0) {
            return (
                <div className='nestedPhotosMap'>
                    {photos.map((photo) => {
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
        if (hl.hike.difficulty <= 2){
            return(<h4>{`Difficulty: Easy`}</h4> )
        } else if (hl.hike.difficulty === 3){
            return(<h4>{`Difficulty: Moderate`}</h4>)
        }else {
            return (<h4>{`Difficulty: Hard`}</h4>)
        }
    }

    return (
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={9}>
                    <div style={{ paddingBottom: '40px' }}>
                        <Segment textAlign='left' className='mainCard'>
                            <Popup content='remove from list' trigger={
                                <Button color='olive' onClick={() => handleDelete(hl)} floated='right'> X</Button>} />
                            <h1>{hl.hike.title}</h1>
                            <h3>{`${hl.hike.city}, ${hl.hike.state}`}</h3>
                            <Segment.Group widths='equal'>
                                <Segment style={{ height: '20%' }}>
                                    {renderImage()}
                                </Segment>
                            </Segment.Group>
                            {visible ?
                                
                                    <div>
                                        <Segment textAlign='center' className='cardSegments'>
                                            <h4>Directions:</h4>
                                            <p>{` ${hl.hike.directions}`}</p>
                                            <h4>Extra Information: </h4>
                                            {hl.hike.extra_info ? <p>{` ${hl.hike.extra_info}`}</p> : <> </>}
                                        </Segment>
                                        <Segment className='picsSegment' textAlign='center'>
                                        <Header >Photos of this hike</Header>
                                            {imageMapping()}
                                        </Segment>
                                        <Segment className='cardSegments' textAlign='left'>
                                            <Comments hike={hl.hike} user={user} />
                                        </Segment>
                                    </div>
                                
                                : <> </>}
                            <p style={{ textAlign: "center" }}>Haven't hiked this trail before? Mark it as not hiked yet. </p>
                            <Button style={{ marginLeft: "38%" }} color='olive' onClick={() => uncompleted(hl)}>Not hiked yet</Button>
                            <Button style={{ marginRignt: '38%' }} color='olive' onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        </Segment>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default CompletedCard