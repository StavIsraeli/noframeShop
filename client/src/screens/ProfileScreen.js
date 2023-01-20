import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'



const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, user } = useSelector( (state) => state.userDetails)
    const { userInfo } = useSelector( (state) => state.userLogin)
    const { success } = useSelector( (state) => state.userUpdateProfile)



    useEffect(() => {
        if(!userInfo)
        {
            navigate('/login')

        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, dispatch, user, userInfo, success])

    const handleSumbmit = (e) => {
        e.preventDefault()
        if (password!==confirmPassword) {
            setMessage('Passwords do not match')
        } else { 
            dispatch(updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    return (
    <Row>
        <Col md={3} mb={6}>
        <h1>User Profile</h1>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSumbmit} >
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

            <Button type='submit' variant='primary'>Update</Button>
        </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>

    </Row>
  )
}

export default ProfileScreen