import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails , updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UserEditScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, user } = useSelector( state => state.userDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector( state => state.userUpdate)


    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if(!user.name || user._id!==id){
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [dispatch, user, id, successUpdate, navigate])

    const handleSumbmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: id, name, email, isAdmin}))
        
    }

    return (
        <>
        <Link to='/admin/userlist' className='btn btn-ligth my-3'>Go Back</Link>
        <FormContainer>
        <h1>Edit User</h1>
        { loadingUpdate && <Loader/> }
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={handleSumbmit}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId='isAdmin'>
                    <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>

        )}
        </FormContainer>
        </>
  )
}

export default UserEditScreen