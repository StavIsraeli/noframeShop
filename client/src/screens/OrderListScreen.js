import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderList } from '../redux/actions/orderActions'
import { useNavigate } from 'react-router-dom';

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrderList())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo ] )

    

  return (
    <>
    <h1>Orders</h1>
    {loading ? 
    (<Loader/> ): error? 
    (<Message variant='danger'>{error}</Message>) :
    (
        <Table responsive striped bordered hover className='table-sm'>
            <thead>
                <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                </tr>
            </thead>
            <tbody>
            {orders.map(( order ) => 
                <tr key={order._id}>
                    <td>{order._id}</td>                    
                    <td>{order.user.name}</td>                    
                    <td>{order.createdAt.substring(0, 10)}</td>                    
                    <td>{order.totalPrice}</td>  
                    <td>{order.isPaid ? (
                        <div>
                            <i className='fas fa-check' style={{color: 'green'}}></i>{' '}
                            {order.paidAt.substring(0, 10)} 
                        </div>
                        ) :
                    <i className='fas fa-times' style={{color: 'red'}}></i>}
                    </td> 
                    <td>{order.isDelivered ? 
                    (
                        <div>
                            <i className='fas fa-check' style={{color: 'green'}}></i>{' '}
                            {order.deliveredAt.substring(0, 10)} 
                        </div>
                        ) :
                    <i className='fas fa-times' style={{color: 'red'}}></i>}
                    </td>  
                    <td>
                     <LinkContainer to={`/order/${order._id}`}>
                     <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                     </LinkContainer>
                    </td>                  
                </tr>
            )}
            </tbody>

        </Table>
    )}
    </>
  )
}

export default OrderListScreen