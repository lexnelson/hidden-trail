import { Segment, Grid, Button, Popup, Header } from 'semantic-ui-react'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import TestModal from './TestModal'


function MyHikeCard({user, handleDelete, hike}){
    const [visible, setVisible]=useState(false)
    let history = useHistory()

    function handleSeeMore(){
        setVisible(!visible)
    }
    function goToHike(){
        history.push(`/hike/${hike.id}`)
    }

    function renderImage() {
        if (hike.hike_photos.length > 0) {
            return (
                <div className='hikeCardSinglePhoto'>
                    <Segment vertical textAlign='center' className='nestedHikeCard'>

                        <img className='imgCard' src={hike.hike_photos[0].img_url} floated='left' />
                        <ul>
                            <h4>{`Difficulty: ${hike.difficulty}`}</h4>
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
            return (<p> Looks like this hike doesn't have any photos</p>)
        }
    }



    return(
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={9}>
                    <div style={{paddingBottom: '100px'}}>
                    <Segment.Group>
                        <Segment textAlign='left'>
                        <Popup content='delete this hike' trigger={
                                <Button color='olive'onClick={()=>handleDelete(hike.id)} floated='right'> X</Button>} />
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
                                        {hike.extra_info ? <p>{` ${hike.extra_info}`}</p> : <p>Looks like this hike doesn't have any extra information </p>}
                                    </Segment>
                                    <Segment className='picsSegment'>
                                        {imageMapping()}
                                    </Segment>
                                </div>
                            </Segment.Group>
                            : <> </>}
                        
                        <Button onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        
                        <Button onClick={goToHike}>Edit this hike</Button>
                    </Segment.Group>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default MyHikeCard