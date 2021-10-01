import { Segment, Grid, Button, Popup } from 'semantic-ui-react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import TestModal from './TestModal'
import Comments from './Comments'


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

                        <img alt='firstImage' className='imgCard' src={hike.hike_photos[0].img_url} floated='left' />
                        <ul>
                        {setDifficulty()}
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
                        <img alt='defaultImage' className='imgCard' floated='left' src='https://cdn.dribbble.com/users/97731/screenshots/14180216/mountain_4x.jpg' />

                        <ul>
                        {setDifficulty()}
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
                    {hike.hike_photos.map((photo) => {
                        return (
                            <TestModal key={photo.id} photo={photo} />
                        )
                    })
                    } </div>
            )
        }
        else {
            return (<p style={{textAlign: 'center'}}> Looks like this hike doesn't have any photos</p>)
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

    return(
        <div>
            <Grid padded verticalAlign='middle' textAlign='center'>
                <Grid.Column width={9}>
                    <div style={{paddingBottom: '100px'}}>
                    <Segment textAlign='left' className='mainCard'>
                        
                        <Popup content='delete this hike' trigger={
                                <Button color='olive'onClick={()=>handleDelete(hike.id)} floated='right'> X</Button>} />
                        <h1>{hike.title}</h1>
                            <h3>{`${hike.city}, ${hike.state}`}</h3>
                       
                        <Segment.Group widths='equal'>

                            <Segment style={{ height: '20%' }}>

                                {renderImage()}

                            </Segment>

                        </Segment.Group>

                        {visible ?
                        
                                <div>
                                    <Segment textAlign='center' className='cardSegments'>
                                        <h4>Directions:</h4>
                                        <p>{` ${hike.directions}`}</p>
                                        <h4>Extra Information: </h4>
                                        {hike.extra_info ? <p>{` ${hike.extra_info}`}</p> : <p>Looks like this hike doesn't have any extra information </p>}
                                    </Segment>
                                    <Segment className='picsSegment'>
                                        {imageMapping()}
                                    </Segment>
                                    <Segment className='cardSegments' textAlign ='left'>
                                        <Comments hike={hike} user={user}/>
                                    </Segment>
                                </div>
                            
                            : <> </>}
                        
                        <Button color='olive' style={{marginLeft: "38%"}} onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        
                        <Button color='olive' onClick={goToHike}>Edit this hike</Button>
                    </Segment>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default MyHikeCard