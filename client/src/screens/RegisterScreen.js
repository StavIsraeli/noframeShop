import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, userInfo } = useSelector( state => state.userRegister)


    useEffect(() => {
        if(userInfo)
        {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const handleSumbmit = (e) => {
        e.preventDefault()
        if (password!==confirmPassword) {
            setMessage('Passwords do not match')
        } else { 
            dispatch(register(name, email, password))
        }
    }

    return (
    <FormContainer>
        <h1>Sign Up</h1>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSumbmit}>
            <Form.Group className="mb-3" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Have an account?{' '} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen