import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Login({ handleLogin}) {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors]=useState()
     let history= useHistory()
  
    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username, 
                password: password
            }),
        })
        .then((res)=> {
            if(res.ok){
                res.json().then((user) => {
                    handleLogin(user)
                    history.push('/')
                })
            }
            else{
                setErrors("Username or Password not found")
            }
        })
    }

    return (
        <div style={{height:'1000px'}}>
            <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: '500px'}}>
                <Segment className='mainCard'>
                        <Header  as='h1'>Hidden Trails Login</Header>
                        </Segment>
                    <Form onSubmit={handleSubmit}>
                        <Segment stacked className='mainCard'>
                            
                            <Form.Input
                                type='text'
                                name='username'
                                placeholder='Username'
                                onChange={(e) => setUsername(e.target.value)} />
                            <Form.Input
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)} />
                                <Button color='olive'>Submit</Button>
                        </Segment>
                        {errors? <Message style={{color: 'black', backgroundColor: 'pink'}}>{errors}</Message>: <> </>}
                    </Form>
                    <Message>Don't have an Account? <a href='/register'>Sign up</a></Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Login