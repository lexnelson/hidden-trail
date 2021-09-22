import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Register({ handleLogin}){
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
        <div>
           <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                <Grid.Column style={{maxWidth: '500px'}}>
                    <Form onSubmit={handleSubmit}>
                        {/* <Segment>Sign Up</Segment> */}
                        <Segment stacked>
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
                                <Button>Submit</Button>
                        </Segment>
                        {errors? <Message style={{color: 'black', backgroundColor: 'pink'}}>{errors.map(error => <p>{error}</p>)}</Message>: <> </>}
                    </Form>
                    <Message>Already have an Account? <a href='/login'>Login</a></Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Register