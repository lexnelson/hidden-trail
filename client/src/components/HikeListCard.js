import { Segment, Grid, Button, Header, Popup } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import TestModal from './TestModal'

function HikeListCard({ hl, user, handleDelete, itsCompleted }) {
    const [visible, setVisible] = useState(false)
    const [photos, setPhotos] = useState()


    function handleSeeMore() {
        setVisible(!visible)
    }

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
                            <h4>{`Difficulty: ${hl.hike.difficulty}`}</h4>
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
                        <img className='imgCard' floated='left' src='https://www.shihoriobata.com/wp-content/uploads/2020/08/how-to-draw-mountains-thumbnail.jpg' />

                        <ul>
                            <h4>{`Difficulty: ${hl.hike.difficulty}`}</h4>
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
                    <Header >Photos of this hike</Header>

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

    return (
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={9}>
                    <Segment.Group>
                        <Segment textAlign='left'>
                            <Popup content='remove from list' trigger={
                                <Button color='olive' onClick={() => handleDelete(hl)} floated='right'> X</Button>} />
                            <h1>{hl.hike.title}</h1>
                            <h3>{`${hl.hike.city}, ${hl.hike.state}`}</h3>
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
                                        <p>{` ${hl.hike.directions}`}</p>
                                        <h4>Extra Information: </h4>
                                        {hl.hike.extra_info ? <p>{` ${hl.hike.extra_info}`}</p> : <> </>}
                                    </Segment>
                                    <Segment className='picsSegment'>
                                        {imageMapping()}
                                    </Segment>
                                </div>
                            </Segment.Group>
                            : <> </>}
                        <p>Done this hike before? Mark it as completed</p>
                        <Button onClick={() => itsCompleted(hl)}>Mark as completed</Button>
                        <Button onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default HikeListCard