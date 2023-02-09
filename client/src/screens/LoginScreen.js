import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, userInfo } = useSelector( state => state.userLogin)


    useEffect(() => {
        if(userInfo)
        {
            navigate(`${redirect}`)
        }
    }, [navigate, userInfo, redirect])

    const handleSumbmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSumbmit}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Button type='submit' variant='primary'> Sign In</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New Customer?{' '} <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen