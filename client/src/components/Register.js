import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form, Grid, Message, Segment, Header } from 'semantic-ui-react'

function Register({ handleLogin, setIsClicked, isClicked}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors]=useState()
    let history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username, 
                password: password, 
                password_confirmation: passwordConfirmation,
                name: name
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
                res.json().then((user)=>{
                    setErrors(user.errors)
                })
            }
        })
    }

    return (
        <div style={{height:'1000px'}}>
           <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: '500px'}}>
                <Segment className='mainCard'>
                        <Header color='grey' as='h1'>Hidden Trails</Header>
                        </Segment>
                    <Form onSubmit={handleSubmit}>
                        
                        <Segment stacked className='mainCard'>
                        <Header color='grey'>Sign Up</Header>
                            <Form.Input
                            type ='text'
                            name='firstname'
                            placeholder='First Name'
                            onChange={(e)=> setName(e.target.value)}/>
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
                                <Form.Input
                                name='passwordConfirmation'
                                type='password'
                                placeholder='Password Confirmation'
                                onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                <Button color='olive'>Submit</Button>
                        </Segment>
                        {errors? <Message style={{color: 'black', backgroundColor: 'pink'}}>{errors.map(error => <p>{error}</p>)}</Message>: <> </>}
                    </Form>
                    <Segment className='mainCard'>
                        <Header as='h4' > Already have an account?   
                        <Button size='tiny' color='olive' style={{marginLeft: '20px'}} onClick={e=> setIsClicked(!isClicked)}>Login here</Button>
                        </Header>
                        </Segment>
                    {/* <Message >  <Button size='mini' color='olive' onClick={e=> setIsClicked(!isClicked)}>Login</Button></Message> */}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Register