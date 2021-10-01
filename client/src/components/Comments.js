import { Comment, Form, Button, Header } from 'semantic-ui-react'
import { useState, useEffect} from 'react'

function Comments({hike, user}) {
    const [comms, setComms]=useState([])
    const [newComment, setNewComment]=useState('')

    useEffect(() => {
        fetch(`/${hike.id}/comments`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(r => {
                if (r.ok){
                    r.json().then((comments)=>{
                        setComms(comments)
                    })
                }
                else {
                    console.log(r)
                }
            })
           
    }, [hike.id])
   
   
    function handleSubmit(e) {
        e.preventDefault()
        fetch("/add_a_comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               hike_id: hike.id, 
               user_id: user.id, 
               text: newComment
            }),
        })
        .then(res=> res.json())
        .then(comments => setComms(comments))
        setNewComment('')
    }

    function handleDelete(comment){
        // console.log(comment.id)
        fetch(`/comments/${comment.id}`, {
            method: "DELETE"
        }).then(()=>{
            const filter = comms.filter((comm)=> {
                return comm.id !== comment.id
            })
            setComms(filter)
        })
    }
    

    function mapComments(){
        if (comms.length > 0){
            return(
                comms.map((comment)=>{
                    return(
                        <div key={comment.id}>
                        <Comment>
                            <Comment.Author floated= 'left'>{comment.user.username}</Comment.Author>
                    <Comment.Text>{comment.text}</Comment.Text>
                    {comment.user.id === user.id ? 
                    <Button size='mini' onClick={()=> handleDelete(comment)}>delete</Button>: <> </>}
                </Comment>
                <br/>
                </div>
                    )
                })
            )
        } else{
            return (<p>This hike doesn't have any comments yet. Add one below!</p>)
        }
    }



    return (
        <div>
            <Comment.Group>
                <Header as='h3'>Comments</Header>
                {mapComments()}
                <Form onSubmit={handleSubmit}>
                    <Form.TextArea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <Button >Add comment</Button>
                </Form>
            </Comment.Group>
        </div>
    )
}

export default Comments