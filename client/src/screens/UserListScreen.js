import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, users } = useSelector(state => state.userList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success: successDelete } = useSelector(state => state.userDelete)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete ] )

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
          }
      }

  return (
    <>
    <h1>Users</h1>
    {loading ? 
    (<Loader/> ): error? 
    (<Message variant='danger'>{error}</Message>) :
    (
        <Table responsive striped bordered hover className='table-sm'>
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                </tr>
            </thead>
            <tbody>
            {users.map(( user ) => 
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`email to: ${user.email}`}>{user.email}</a></td>
                    <td>{user.isAdmin ? 
                    (<i className='fas fa-check' style={{color: 'green'}}></i>) :
                    <i className='fas fa-times' style={{color: 'red'}}></i>}
                    </td>
                    <td>
                     <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                        </Button>
                     </LinkContainer>
                     <Button variant='danger' className='btn-sm' onClick={() => handleDeleteUser(user._id)}>
                        <i className='fas fa-trash'></i>
                     </Button>
                    </td>
                </tr>
            )}
            </tbody>

        </Table>
    )}
    </>
  )
}

export default UserListScreen