import React, { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { getMyOrderList } from '../redux/actions/orderActions'
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
    const { orders, loading: loadingOrders, error: errorOrders } = useSelector( (state) => state.myOrderList)



    useEffect(() => {
        if(!userInfo)
        {
            navigate('/login')

        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrderList())
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
    <><Meta title={`Noframe | ${user.name}`} /><Row>
        <Col md={3} mb={6}>
          <h1>User Profile</h1>
          {error ? <Message variant='danger'>{error}</Message> : null}
          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
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

            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        </Col>

        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>}
        </Col>

      </Row></>
  )
}

export default ProfileScreen