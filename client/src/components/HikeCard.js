import { Segment, Grid, Image, Button, Modal } from 'semantic-ui-react'
import {useState} from 'react'

function HikeCard({ hike, user }) {
   
    const [visible, setVisible]=useState(false)
    const [added, setAdded]= useState(false)

    // console.log(hike)

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
        function renderImages(){
            if (hike.hike_photos.length > 0){
                return(
                    hike.hike_photos.map((photo)=>{
                        return(
                            <div key={photo.id}>
                                <Image size='small' src={photo.img_url} />
                            </div>
                        )
                    })
                )
            }
            else {
                return(
                    <div>
                        <Image size ='small' src='https://www.shihoriobata.com/wp-content/uploads/2020/08/how-to-draw-mountains-thumbnail.jpg'/> 
                    </div>
                )
            }
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
                        <Segment.Group widths='equal'>
                            {renderImages()}
                            <Segment>
                                <h3>{`${hike.city}, ${hike.state}`}</h3>
                                <h2>Difficulty</h2>
                                </Segment>
                                <Segment>
                                    
                                </Segment>
                        </Segment.Group>
                        {visible ? 
                        <div>
                        <p>{`Difficulty: ${hike.difficulty}`}</p> 
                        <p>{`${hike.length} Miles`}</p> 
                        </div>
                        : <> </>}
                        <Button onClick={handleSeeMore}> {visible ? 'See Less' : 'See More'}</Button>
                        <Button onClick={handleAddToList}>{added? 'Added ✅':'Add to My Hikes'}</Button>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default HikeCard