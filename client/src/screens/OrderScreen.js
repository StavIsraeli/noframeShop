import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../redux/actions/orderActions'
import { useParams } from 'react-router-dom';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants'





const OrderScreen = () => {

    const dispatch = useDispatch()
    const { id } = useParams();
    const [sdkReady, setSdkReady] = useState(false)


    const { error, order, loading } = useSelector( state => state.orderDetails)
    const { success: successPay, loading: loadingPay } = useSelector( state => state.orderPay)

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    if(!loading){

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
            }
        order.itemPrice = addDecimals(order.orderItems.reduce( ( total, item ) => total + item.price * item.qty, 0 ))
    }

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('http://localhost:8000/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if( successPay || !order || order._id !== id) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))
            console.log(order)

        } else if (!order.isPaid) {
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }

        }
    }, [order, id, dispatch, successPay]) 

  return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
  <>
  <h1> Order {order._id} </h1>

  <Row>
    <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
            <strong>Name: {order.user.name}</strong>
            </p>
            <p>
            Email: <a href={`malito:${order.user.email}`}>{order.user.email}</a>
            </p>

            <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}, 
                {order.shippingAddress.postalCode}{' '}
                {order.shippingAddress.country}
            </p>
            { order.isDelivered ? <Message variant='success'>Delivered on {order.DeliveredAt}</Message> :
                <Message variant='danger'>Not Delivered</Message> }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
                { order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                <Message variant='danger'>Not Paid</Message> }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items: </h2>
                { order.orderItems.length === 0 ? <Message>Order is empty</Message> : 
                (
                    <ListGroup variant='flush'>
                        {order.orderItems.map(( item, index ) => 
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price}₪ = {item.qty*item.price}₪
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                )}
            </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2> Order Summery </h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>{order.itemPrice}₪</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>{order.shippingPrice}₪</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>{order.taxPrice}₪</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>{order.totalPrice}₪</Col>
                        </Row>
                    </ListGroup.Item>

                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={handleSuccessPayment}/>
                            )}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
    
}

export default OrderScreen